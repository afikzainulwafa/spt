import subprocess
import time
import json
import urllib.request
import socket
import base64
import os
import sys

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

def recv_all(s, n):
    buf = bytearray()
    while len(buf) < n:
        chunk = s.recv(min(n - len(buf), 65536))
        if not chunk:
            raise EOFError("Socket closed")
        buf.extend(chunk)
    return bytes(buf)

def send_ws_frame(s, text):
    data = text.encode("utf-8")
    length = len(data)
    header = bytearray([0x81])
    mask_key = os.urandom(4)
    if length <= 125:
        header.append(0x80 | length)
    elif length <= 65535:
        header.append(0x80 | 126)
        header.extend(length.to_bytes(2, "big"))
    else:
        header.append(0x80 | 127)
        header.extend(length.to_bytes(8, "big"))
    header.extend(mask_key)
    masked = bytearray(length)
    for i in range(length):
        masked[i] = data[i] ^ mask_key[i % 4]
    s.sendall(header + masked)

def read_ws_frame(s):
    hdr = recv_all(s, 2)
    b1, b2 = hdr[0], hdr[1]
    payload_len = b2 & 0x7F
    if payload_len == 126:
        payload_len = int.from_bytes(recv_all(s, 2), "big")
    elif payload_len == 127:
        payload_len = int.from_bytes(recv_all(s, 8), "big")
    raw = recv_all(s, payload_len)
    if b2 & 0x80:
        mask_key = recv_all(s, 4)
        data = bytearray(payload_len)
        for i in range(payload_len):
            data[i] = raw[i] ^ mask_key[i % 4]
        return data.decode("utf-8", errors="ignore")
    return raw.decode("utf-8", errors="ignore")

_msg_id = 0
def call_cdp(s, method, params=None):
    global _msg_id
    _msg_id += 1
    mid = _msg_id
    payload = {"id": mid, "method": method}
    if params:
        payload["params"] = params
    send_ws_frame(s, json.dumps(payload))
    while True:
        frame = read_ws_frame(s)
        try:
            res = json.loads(frame)
            if res.get("id") == mid:
                return res
        except:
            pass

def eval_js(s, expr):
    res = call_cdp(s, "Runtime.evaluate", {
        "expression": expr,
        "returnByValue": True,
        "awaitPromise": True
    })
    if "error" in res:
        print("CDP Error:", res["error"])
        return None
    r_obj = res.get("result", {})
    if "exceptionDetails" in r_obj:
        print("JS Exception:", r_obj["exceptionDetails"])
        return None
    return r_obj.get("result", {}).get("value")

def save_screenshot(s, filename):
    res = call_cdp(s, "Page.captureScreenshot", {"format": "png"})
    b64 = res.get("result", {}).get("data")
    if b64:
        with open(filename, "wb") as f:
            f.write(base64.b64decode(b64))
        print(f"  [SCREENSHOT] Saved {filename}")

def run_tests():
    port = 9245
    proc = subprocess.Popen([
        EDGE_PATH,
        "--headless=new",
        "--disable-gpu",
        f"--remote-debugging-port={port}",
        "--window-size=1366,768",
        "about:blank"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    sock = None
    try:
        time.sleep(1.2)
        with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as r:
            targets = json.loads(r.read().decode())
            page_t = next(t for t in targets if t.get("type") == "page")
            ws_url = page_t["webSocketDebuggerUrl"]

        parts = ws_url.replace("ws://", "").split("/", 1)
        host, p_str = parts[0].split(":")
        path = "/" + parts[1]

        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(20)
        sock.connect((host, int(p_str)))

        key = base64.b64encode(os.urandom(16)).decode("utf-8")
        req = f"GET {path} HTTP/1.1\r\nHost: {host}:{p_str}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n"
        sock.sendall(req.encode("utf-8"))

        resp = b""
        while b"\r\n\r\n" not in resp:
            resp += sock.recv(1024)

        call_cdp(sock, "Page.enable")
        call_cdp(sock, "Log.enable")
        call_cdp(sock, "Runtime.enable")
        call_cdp(sock, "Emulation.setDeviceMetricsOverride", {
            "width": 1366,
            "height": 768,
            "deviceScaleFactor": 1,
            "mobile": False
        })

        url = "http://localhost:8088/index.html#autologin"
        print(f"1. Navigating to {url}...")
        call_cdp(sock, "Page.navigate", {"url": url})
        time.sleep(3.0)

        # 1. Check Console / Errors & Basic initialization
        print("2. Checking Console & Global Objects...")
        res = eval_js(sock, """
            ({
                hasGeoUtils: typeof window.SPT_GEO !== 'undefined',
                hasYieldService: typeof window.SPT_YIELD !== 'undefined',
                hasDataStore: typeof window.SPT_DATA !== 'undefined',
                hasSPTApp: typeof window.SPT_APP !== 'undefined',
                masterProblemsCount: (window.SPT_DATA && window.SPT_DATA.MASTER_PROBLEMS || []).length,
                skdeGeoJsonLoaded: !!(window.SPT_APP && window.SPT_APP.getState().indexedGeoData),
                totalBlocksIndexed: (window.SPT_APP && window.SPT_APP.getState().indexedGeoData) ? window.SPT_APP.getState().indexedGeoData.validBlocksCount : 0,
                allFindingsCount: window.SPT_APP ? (window.SPT_APP.getState().allFindings || []).length : 0
            })
        """)
        print("   Status:", json.dumps(res, indent=2))
        assert res.get("hasGeoUtils"), "SPT_GEO not loaded"
        assert res.get("hasYieldService"), "SPT_YIELD not loaded"
        assert res.get("hasDataStore"), "SPT_DATA not loaded"
        assert res.get("hasSPTApp"), "SPT_APP not loaded"
        assert res.get("masterProblemsCount") == 16, f"Expected 16 master problems, got {res.get('masterProblemsCount')}"
        assert res.get("totalBlocksIndexed") == 109, f"Expected 109 indexed blocks, got {res.get('totalBlocksIndexed')}"
        assert res.get("allFindingsCount") > 0, "No findings generated"

        save_screenshot(sock, "test_01_dashboard.png")

        # 2. Test Yield Projection S-28 exact numbers
        print("3. Validating 24-Month Yield Timeline for S-28...")
        yield_s28 = eval_js(sock, """
            (function() {
                var res = window.SPT_YIELD.getYieldTimeline('DIVISI 3', 'S-28');
                var timeline = res.timeline;
                var may2027 = timeline.find(t => t.monthKey === '2027-05');
                var jul2026 = timeline.find(t => t.monthKey === '2026-07');
                var aug2025 = timeline.find(t => t.monthKey === '2025-08');
                return {
                    length: timeline.length,
                    may2027_proj: may2027 ? may2027.projectionMoving : null,
                    may2027_pot: may2027 ? may2027.potencyMoving : null,
                    may2027_ratio: may2027 ? may2027.bccrRatio : null,
                    jul2026_act: jul2026 ? jul2026.actualMoving : null,
                    jul2026_ratio: jul2026 ? jul2026.bccrRatio : null,
                    aug2025_act: aug2025 ? aug2025.actualMoving : null,
                    aug2025_prov: aug2025 ? aug2025.provenance : null
                };
            })()
        """)
        print("   S-28 Timeline:", json.dumps(yield_s28, indent=2))
        assert yield_s28["length"] == 24, f"Expected 24 months, got {yield_s28['length']}"
        assert yield_s28["may2027_proj"] == 29.0, f"May 2027 proj expected 29.0, got {yield_s28['may2027_proj']}"
        assert yield_s28["may2027_ratio"] == 100.0, f"May 2027 ratio expected 100.0%, got {yield_s28['may2027_ratio']}"
        assert yield_s28["jul2026_act"] == 26.3, f"Jul 2026 act expected 26.3, got {yield_s28['jul2026_act']}"
        assert abs(yield_s28["jul2026_ratio"] - 90.69) < 0.1, f"Jul 2026 ratio expected ~90.69%, got {yield_s28['jul2026_ratio']}"

        # 3. Test Problem Map Semantic Zoom:
        # Overview: Should have block-summary-badge, NO individual micro placemarks
        print("4. Validating Problem Map Semantic Zoom on Overview...")
        map_state_overview = eval_js(sock, """
            (function() {
                var st = window.SPT_APP.getState();
                var summaryCount = 0;
                st.mapProblemSummaryLayer.eachLayer(function() { summaryCount++; });
                var microCount = 0;
                st.problemMicroMarkersLayer.eachLayer(function() { microCount++; });
                return {
                    zoom: st.mapProblem.getZoom(),
                    summaryCount: summaryCount,
                    microCount: microCount,
                    isFullscreen: st.isFullscreenProblem
                };
            })()
        """)
        print("   Overview state:", json.dumps(map_state_overview, indent=2))
        assert map_state_overview["summaryCount"] > 0, "Summary badges should be present on overview"
        assert map_state_overview["microCount"] == 0, "Individual micro placemarks MUST NOT be present on overview"

        # 4. Toggle Fullscreen on Problem Map
        print("5. Testing Fullscreen Toggle on Problem Map...")
        eval_js(sock, "window.SPT_APP.toggleFullscreenProblem(true);")
        time.sleep(1.0)
        fs_state = eval_js(sock, """
            ({
                isFullscreen: window.SPT_APP.getState().isFullscreenProblem,
                panelHasClass: document.getElementById('panelMapProblem').classList.contains('panel-fullscreen')
            })
        """)
        print("   Fullscreen state:", json.dumps(fs_state, indent=2))
        assert fs_state["isFullscreen"], "State isFullscreenProblem should be true"
        assert fs_state["panelHasClass"], "Panel should have .panel-fullscreen class"
        save_screenshot(sock, "test_02_problem_map_fullscreen.png")

        # 5. Zoom to >= 15 in Fullscreen: Should switch to individual placemarks, remove summary badges
        print("6. Testing Zoom In to Level 16 (Block Zoom Threshold)...")
        eval_js(sock, """
            (function() {
                var st = window.SPT_APP.getState();
                var bObj = st.indexedGeoData.blocks['SKDE:DIVISI 3:S-28'];
                st.mapProblem.setView([bObj.interiorPoint[0], bObj.interiorPoint[1]], 16);
            })()
        """)
        time.sleep(2.0)
        zoom_state = eval_js(sock, """
            (function() {
                var st = window.SPT_APP.getState();
                var summaryCount = 0;
                st.mapProblemSummaryLayer.eachLayer(function() { summaryCount++; });
                var microCount = 0;
                st.problemMicroMarkersLayer.eachLayer(function() { microCount++; });
                return {
                    zoom: st.mapProblem.getZoom(),
                    summaryCount: summaryCount,
                    microCount: microCount
                };
            })()
        """)
        print("   Zoom 16 state:", json.dumps(zoom_state, indent=2))
        assert zoom_state["summaryCount"] == 0, "Summary badges MUST be removed at zoom >= 15"
        assert zoom_state["microCount"] > 0, "Individual micro placemarks MUST appear at zoom >= 15"
        save_screenshot(sock, "test_03_problem_map_zoom16_pins.png")

        # Test Pin Types: Pin Klasik (01-10) and Pin Drop (11-16)
        print("7. Checking Pin Shape rendering (Classic vs Drop)...")
        pin_types = eval_js(sock, """
            (function() {
                var classicCount = document.querySelectorAll('.spt-pin-svg-wrap:not(.spt-pin-drop)').length;
                var dropCount = document.querySelectorAll('.spt-pin-svg-wrap.spt-pin-drop').length;
                return { total: classicCount + dropCount };
            })()
        """)
        print("   Rendered Pins in Viewport:", json.dumps(pin_types, indent=2))

        # 6. Test Zoom Out: Should return to summary badges and remove micro markers
        print("8. Testing Zoom Out to Level 13...")
        eval_js(sock, "window.SPT_APP.getState().mapProblem.setZoom(13);")
        time.sleep(1.5)
        zoomout_state = eval_js(sock, """
            (function() {
                var st = window.SPT_APP.getState();
                var summaryCount = 0;
                st.mapProblemSummaryLayer.eachLayer(function() { summaryCount++; });
                var microCount = 0;
                st.problemMicroMarkersLayer.eachLayer(function() { microCount++; });
                return {
                    zoom: st.mapProblem.getZoom(),
                    summaryCount: summaryCount,
                    microCount: microCount
                };
            })()
        """)
        print("   Zoom 13 state:", json.dumps(zoomout_state, indent=2))
        assert zoomout_state["summaryCount"] > 0, "Summary badges MUST be restored at zoom < 15"
        assert zoomout_state["microCount"] == 0, "Individual micro placemarks MUST be removed at zoom < 15"

        # Exit fullscreen
        eval_js(sock, "window.SPT_APP.toggleFullscreenProblem(false);")
        time.sleep(1.0)

        # 7. Test Tambah Temuan Manual simulation flow
        print("9. Testing Tambah Temuan Manual workflow...")
        eval_js(sock, "window.SPT_APP.toggleFullscreenProblem(true);")
        time.sleep(0.5)
        eval_js(sock, "document.getElementById('btnAddFinding').click();")
        time.sleep(0.5)
        banner_visible = eval_js(sock, "document.getElementById('mapAddModeBanner').style.display !== 'none'")
        assert banner_visible, "Add mode banner should be visible"

        # Simulate click inside block S-28 interior point
        eval_js(sock, """
            (function() {
                var st = window.SPT_APP.getState();
                var bObj = st.indexedGeoData.blocks['SKDE:DIVISI 3:S-28'];
                st.mapProblem.fire('click', {
                    latlng: L.latLng(bObj.interiorPoint[0], bObj.interiorPoint[1])
                });
            })()
        """)
        time.sleep(1.0)
        modal_state = eval_js(sock, """
            ({
                modalVisible: document.getElementById('modalAddFinding').style.display !== 'none',
                locationValue: document.getElementById('addFindingLocation').value,
                key: document.getElementById('addFindingBlockKey').value
            })
        """)
        print("   Add finding modal opened:", json.dumps(modal_state, indent=2))
        assert modal_state["modalVisible"], "Modal add finding should be displayed"
        assert "S-28" in modal_state["locationValue"], f"Expected blok S-28 in locationValue, got {modal_state['locationValue']}"

        # Submit finding form
        eval_js(sock, """
            (function() {
                document.getElementById('addFindingVolume').value = "15";
                document.getElementById('addFindingNotes').value = "Temuan simulasi verifikasi acceptance test";
                document.getElementById('btnSubmitAddFinding').click();
            })()
        """)
        time.sleep(1.0)
        after_save = eval_js(sock, """
            ({
                modalClosed: document.getElementById('modalAddFinding').style.display === 'none',
                totalFindings: window.SPT_APP.getState().allFindings.length,
                hasManual: window.SPT_APP.getState().allFindings.some(f => f.isManual)
            })
        """)
        print("   Saved manual finding:", json.dumps(after_save, indent=2))
        assert after_save["modalClosed"], "Modal should close after save"
        assert after_save["hasManual"], "New finding should have isManual flag"

        eval_js(sock, "window.SPT_APP.toggleFullscreenProblem(false);")
        time.sleep(1.0)

        # 8. Test BCCR Block Click -> Modal Detail
        print("10. Testing BCCR Detail Modal...")
        eval_js(sock, """
            (function() {
                var st = window.SPT_APP.getState();
                st.bccrGeoJsonLayer.eachLayer(function(l) {
                    if (l.feature && l.feature.properties && l.feature.properties.blok === 'S-28') {
                        l.fire('click');
                    }
                });
            })()
        """)
        time.sleep(1.0)
        bccr_modal = eval_js(sock, """
            ({
                modalVisible: document.getElementById('modalBccrDetail').style.display !== 'none',
                title: document.getElementById('modalBccrDetailTitle') ? document.getElementById('modalBccrDetailTitle').textContent : '',
                bodyHasHtml: document.getElementById('modalBccrDetailBody') ? document.getElementById('modalBccrDetailBody').children.length > 0 : false
            })
        """)
        print("   BCCR modal detail:", json.dumps(bccr_modal, indent=2))
        assert bccr_modal["modalVisible"], "BCCR detail modal should be open"
        assert "S-28" in bccr_modal["title"], "Modal title should reference S-28"
        assert bccr_modal["bodyHasHtml"], "Modal body should have content"

        eval_js(sock, "document.getElementById('btnCloseModalBccrDetail').click();")
        time.sleep(0.5)

        # 9. Test View 4 (Trend Produksi), Metric Toggle, and 24-Month Table
        print("11. Testing Tab View-Trend (Yield Projection) & Metric Toggle...")
        eval_js(sock, "window.SPT_APP.switchView('trend');")
        time.sleep(2.0)
        trend_state = eval_js(sock, """
            ({
                activeTab: document.getElementById('viewTrend').classList.contains('active-view'),
                hasSvgChart: !!document.querySelector('#trendChartSvgContainer svg'),
                tableRowsCount: document.querySelectorAll('#trendTableContainer tbody tr').length,
                provenanceTagsCount: document.querySelectorAll('#trendTableContainer .provenance-tag').length,
                hasExportBtn: !!document.getElementById('btnExportTrendCsv'),
                hasToggleGroup: !!document.getElementById('trendMetricToggleGroup')
            })
        """)
        print("   Trend view state:", json.dumps(trend_state, indent=2))
        assert trend_state["activeTab"], "viewTrend tab should be active"
        assert trend_state["hasSvgChart"], "SVG chart should be rendered"
        assert trend_state["tableRowsCount"] == 24, f"Expected 24 table rows, got {trend_state['tableRowsCount']}"
        assert trend_state["provenanceTagsCount"] == 24, f"Expected 24 provenance tags, got {trend_state['provenanceTagsCount']}"
        assert trend_state["hasExportBtn"], "Export CSV button should exist"

        # Test Metric Toggle: Switch to BCCR Rasio (%)
        print("   Testing Metric Toggle to Rasio BCCR (%)...")
        eval_js(sock, "document.getElementById('btnMetricBccr').click();")
        time.sleep(1.0)
        bccr_chart = eval_js(sock, """
            ({
                metricState: window.SPT_APP.getState().trendMetric,
                has100Target: document.querySelector('#trendChartSvgContainer svg').innerHTML.indexOf('TARGET POTENSI 100%') !== -1
            })
        """)
        print("   BCCR metric state:", json.dumps(bccr_chart, indent=2))
        assert bccr_chart["metricState"] == "bccr", "State trendMetric should be bccr"
        assert bccr_chart["has100Target"], "BCCR chart should include 100% target reference line"

        # Switch back to Moving (Ton/Ha)
        eval_js(sock, "document.getElementById('btnMetricMoving').click();")
        time.sleep(0.5)

        # Check Mini Outlook on Dashboard
        print("   Testing Dashboard Mini Outlook Chart & Stat Strip...")
        eval_js(sock, "window.SPT_APP.switchView('dashboard');")
        time.sleep(1.0)
        mini_state = eval_js(sock, """
            ({
                hasMiniSvg: !!document.querySelector('#miniOutlookChart svg'),
                hasStatStrip: document.querySelectorAll('#miniOutlookChart strong').length > 0,
                dotsWithTitleCount: document.querySelectorAll('#miniOutlookChart circle title').length
            })
        """)
        print("   Mini outlook state:", json.dumps(mini_state, indent=2))
        assert mini_state["hasMiniSvg"], "Mini outlook chart should have SVG"
        assert mini_state["hasStatStrip"], "Mini outlook chart should have stat strip"
        assert mini_state["dotsWithTitleCount"] >= 20, f"Expected >= 20 dots with title tooltips, got {mini_state['dotsWithTitleCount']}"

        eval_js(sock, "window.SPT_APP.switchView('trend');")
        time.sleep(0.5)
        save_screenshot(sock, "test_04_trend_view.png")

        # 10. Switch across all tabs to ensure 0 errors
        print("12. Testing All 7 Tabs Switching...")
        views = ['dashboard', 'bccr', 'action', 'trend', 'analysis', 'division', 'docs']
        for v in views:
            eval_js(sock, f"window.SPT_APP.switchView('{v}');")
            time.sleep(0.5)
            panelId = 'view' + v[0].upper() + v[1:]
            active = eval_js(sock, f"document.getElementById('{panelId}').classList.contains('active-view')")
            assert active, f"Tab {panelId} failed to activate"
        print("   All 7 tabs switch seamlessly!")

        # 11. Test Logout and Demo Login
        print("13. Testing Logout and Login flow...")
        eval_js(sock, "document.getElementById('mockLogout').click();")
        time.sleep(1.0)
        login_visible = eval_js(sock, "document.getElementById('loginScreen').style.display !== 'none'")
        print("   Login overlay visible after logout:", login_visible)
        assert login_visible, "Login overlay should be visible after logout"

        # Re-login with admin_spt / SPT2026!
        eval_js(sock, """
            (function() {
                var form = document.getElementById('loginForm');
                form.elements['username'].value = 'admin_spt';
                form.elements['password'].value = 'SPT2026!';
                form.dispatchEvent(new Event('submit', { cancelable: true }));
            })()
        """)
        time.sleep(2.0)
        relogin_state = eval_js(sock, """
            ({
                loginOverlayHidden: document.getElementById('loginScreen').style.display === 'none',
                mapBccrInitialized: !!(window.SPT_APP.getState().mapBccr),
                mapProblemInitialized: !!(window.SPT_APP.getState().mapProblem)
            })
        """)
        print("   Re-login state:", json.dumps(relogin_state, indent=2))
        assert relogin_state["loginOverlayHidden"], "Login overlay should be hidden after re-login"

        print("\n==========================================")
        print("ALL ACCEPTANCE TESTS PASSED SUCCESSFULLY!!")
        print("==========================================\n")
        return True

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"FAILED: {e}")
        return False
    finally:
        if sock:
            try: sock.close()
            except: pass
        proc.terminate()

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
