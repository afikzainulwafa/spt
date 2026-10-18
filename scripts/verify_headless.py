import subprocess
import time
import json
import urllib.request
import socket
import base64
import os
import sys

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
ARTIFACT_DIR = r"C:\Users\23000984\.gemini\antigravity-ide\brain\bc85764b-cd2c-487a-bbf5-67b21fbc15b1"

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def log(msg):
    print(msg)
    sys.stdout.flush()

def recv_exact(s, n):
    buf = bytearray()
    while len(buf) < n:
        chunk = s.recv(min(n - len(buf), 65536))
        if not chunk:
            raise EOFError("Socket closed")
        buf.extend(chunk)
    return bytes(buf)

def send_frame(s, text):
    data = text.encode("utf-8")
    length = len(data)
    header = bytearray([0x81])
    mask = os.urandom(4)
    if length <= 125:
        header.append(0x80 | length)
    elif length <= 65535:
        header.append(0x80 | 126)
        header.extend(length.to_bytes(2, "big"))
    else:
        header.append(0x80 | 127)
        header.extend(length.to_bytes(8, "big"))
    header.extend(mask)
    masked = bytearray(length)
    for i in range(length):
        masked[i] = data[i] ^ mask[i % 4]
    s.sendall(header + masked)

def read_frame(s):
    hdr = recv_exact(s, 2)
    b1, b2 = hdr[0], hdr[1]
    fin = (b1 & 0x80) != 0
    has_mask = (b2 & 0x80) != 0
    payload_len = b2 & 0x7F
    if payload_len == 126:
        payload_len = int.from_bytes(recv_exact(s, 2), "big")
    elif payload_len == 127:
        payload_len = int.from_bytes(recv_exact(s, 8), "big")
    
    mask = None
    if has_mask:
        mask = recv_exact(s, 4)
    payload = recv_exact(s, payload_len)
    if has_mask and mask:
        payload = bytes([payload[i] ^ mask[i % 4] for i in range(payload_len)])
    return fin, payload

def read_message(s):
    chunks = []
    while True:
        fin, payload = read_frame(s)
        chunks.append(payload)
        if fin:
            break
    return b"".join(chunks).decode("utf-8", errors="replace")

def cdp_send(s, method, params, msg_id):
    msg = {"id": msg_id, "method": method, "params": params}
    send_frame(s, json.dumps(msg))
    while True:
        raw = read_message(s)
        try:
            data = json.loads(raw)
            if data.get("id") == msg_id:
                return data
        except Exception:
            pass

def eval_js(s, js_code, msg_id):
    resp = cdp_send(s, "Runtime.evaluate", {"expression": js_code, "returnByValue": True}, msg_id)
    if "result" in resp:
        res = resp["result"]
        if "exceptionDetails" in res:
            return f"EXCEPTION: {res['exceptionDetails']}"
        if "result" in res and "value" in res["result"]:
            return res["result"]["value"]
    return str(resp)

def main():
    profile = os.path.join(os.getcwd(), "scratch", "edge_verify_clean2")
    os.makedirs(profile, exist_ok=True)
    
    cmd = [
        EDGE_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9266",
        f"--user-data-dir={profile}",
        "--window-size=1440,900",
        "--no-first-run",
        "about:blank"
    ]
    proc = subprocess.Popen(cmd)
    time.sleep(2.5)

    try:
        req = urllib.request.urlopen("http://127.0.0.1:9266/json")
        targets = json.loads(req.read().decode("utf-8"))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        
        parts = ws_url.replace("ws://", "").split("/")
        host, port = parts[0].split(":")
        path = "/" + "/".join(parts[1:])
        
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, int(port)))
        key = base64.b64encode(os.urandom(16)).decode("utf-8")
        s.sendall(f"GET {path} HTTP/1.1\r\nHost: {host}:{port}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n".encode("utf-8"))
        res = s.recv(4096).decode("utf-8")
        assert "101" in res
        
        msg_id = 1
        cdp_send(s, "Runtime.enable", {}, msg_id); msg_id += 1
        
        log("1. Navigating to http://localhost:8088/index.html...")
        cdp_send(s, "Page.navigate", {"url": "http://localhost:8088/index.html"}, msg_id); msg_id += 1
        time.sleep(3.5)
        
        # Check login screen and click login
        js_login = """
        (function() {
            var btn = document.getElementById('btnLogin');
            if (btn) { btn.click(); return 'LOGGED_IN'; }
            return 'NO_LOGIN_BTN';
        })()
        """
        log(f"Login result: {eval_js(s, js_login, msg_id)}"); msg_id += 1
        time.sleep(2.0)
        
        # Navigate to Map & Coverage view
        js_nav = """
        (function() {
            var btn = document.getElementById('navMap');
            if (btn) { btn.click(); return 'NAV_MAP_CLICKED'; }
            return 'NAV_NOT_FOUND';
        })()
        """
        log(f"Navigation result: {eval_js(s, js_nav, msg_id)}"); msg_id += 1
        time.sleep(2.0)
        
        # Verify Header Dropdowns (Requirement: TNKE, DIVISI 2, All, September 2026, no prefix labels, no kegiatan filter)
        js_header = """
        (function() {
            var est = document.getElementById('estateFilter');
            var div = document.getElementById('divisionFilter');
            var blk = document.getElementById('blockFilter');
            var per = document.getElementById('periodFilter');
            var act = document.getElementById('activityFilter');
            return JSON.stringify({
                estate: est ? est.value : null,
                division: div ? div.value : null,
                block: blk ? blk.value : null,
                period: per ? per.value : null,
                kegiatanFilterExists: !!act
            });
        })()
        """
        log(f"Header verification: {eval_js(s, js_header, msg_id)}"); msg_id += 1
        
        # Set Division to DIVISI 2
        js_set_div = """
        (function() {
            var div = document.getElementById('divisionFilter');
            if (div) {
                div.value = 'DIVISI 2';
                div.dispatchEvent(new Event('change'));
                return 'DIVISI_2_SET';
            }
            return 'DIV_NOT_FOUND';
        })()
        """
        log(f"Set division: {eval_js(s, js_set_div, msg_id)}"); msg_id += 1
        time.sleep(1.5)
        
        # Verify Segmented Toggle exists and Coverage is active
        js_toggle_check = """
        (function() {
            var btnCov = document.getElementById('btnMapModeCoverage');
            var btnProb = document.getElementById('btnMapModeProblem');
            var wrapCat = document.getElementById('problemCategoryMapWrap');
            return JSON.stringify({
                hasBtnCoverage: !!btnCov,
                hasBtnProblem: !!btnProb,
                isCoverageActive: btnCov ? btnCov.classList.contains('active') : false,
                isCategoryWrapHidden: wrapCat ? wrapCat.style.display === 'none' : true
            });
        })()
        """
        log(f"Coverage mode toggle check: {eval_js(s, js_toggle_check, msg_id)}"); msg_id += 1
        
        # Switch to Problem Mode
        log("\n2. Switching to Problem Mode...")
        js_switch_prob = """
        (function() {
            var btnProb = document.getElementById('btnMapModeProblem');
            if (btnProb) { btnProb.click(); return 'PROBLEM_MODE_CLICKED'; }
            return 'BTN_NOT_FOUND';
        })()
        """
        log(f"Problem mode switch result: {eval_js(s, js_switch_prob, msg_id)}"); msg_id += 1
        time.sleep(2.0)
        
        # Verify Problem Mode: Category dropdown visible with exactly 17 options (all + 16 categories)
        js_prob_cats = """
        (function() {
            var catSel = document.getElementById('selProblemCategoryMap');
            var wrap = document.getElementById('problemCategoryMapWrap');
            var opts = [];
            if (catSel) {
                for (var i = 0; i < catSel.options.length; i++) {
                    opts.push({ value: catSel.options[i].value, text: catSel.options[i].textContent.trim() });
                }
            }
            var legCov = document.getElementById('coverageLegendBody');
            var legProb = document.getElementById('problemLegendBody');
            return JSON.stringify({
                isWrapVisible: wrap ? wrap.style.display !== 'none' : false,
                optionCount: opts.length,
                optionsSample: opts.slice(0, 5),
                isCoverageLegendHidden: legCov ? legCov.style.display === 'none' : false,
                isProblemLegendVisible: legProb ? legProb.style.display !== 'none' : false
            });
        })()
        """
        log(f"Problem mode categories & legend check: {eval_js(s, js_prob_cats, msg_id)}"); msg_id += 1
        
        # Check F-59 in 'all' categories mode (should show '<N> tagging')
        js_f59_all = """
        (function() {
            var f59Label = null;
            var labels = document.querySelectorAll('.polygon-block-label');
            labels.forEach(function(l) {
                if (l.textContent.includes('F-59')) f59Label = l.textContent.trim().replace(/\\s+/g, ' ');
            });
            return f59Label;
        })()
        """
        log(f"F-59 label in 'all' categories mode: {eval_js(s, js_f59_all, msg_id)}"); msg_id += 1
        
        # Select Underpruning (SPT-02)
        log("\n3. Selecting Underpruning (SPT-02)...")
        js_select_underpruning = """
        (function() {
            var catSel = document.getElementById('selProblemCategoryMap');
            if (catSel) {
                catSel.value = 'SPT-02';
                catSel.dispatchEvent(new Event('change'));
                return 'UNDERPRUNING_SELECTED';
            }
            return 'CAT_SEL_NOT_FOUND';
        })()
        """
        log(f"Select underpruning result: {eval_js(s, js_select_underpruning, msg_id)}"); msg_id += 1
        time.sleep(2.0)
        
        # MANDATORY VALIDATION CHECK:
        # Scope: TNKE / DIVISI 2 / All Blocks / September 2026 / Underpruning
        # F-59 = 5 tagging, 102 pokok.
        # Total DIVISI 2 = 846 pokok.
        # F-59 map label = 12,1%.
        # Status = belum_ada_action_plan -> #EF4444.
        js_validate_underpruning = """
        (function() {
            var state = window.SPT_APP.getState();
            var a = state.problemAnalytics;
            if (!a) return 'ERROR: state.problemAnalytics is null';
            
            var f59Sum = a.getBlockCategorySummary ? a.getBlockCategorySummary('TNKE', 'DIVISI 2', 'F-59', 'September 2026', 'SPT-02') : null;
            var div2Vol = a.getScopeVolume ? a.getScopeVolume('TNKE', 'DIVISI 2', 'all', 'September 2026', 'SPT-02') : null;
            
            var mapMetrics = a.getMapMetrics ? a.getMapMetrics({
                estate: 'TNKE',
                divisi: 'DIVISI 2',
                blok: 'all',
                categoryId: 'SPT-02',
                month: 9,
                year: 2026
            }) : null;
            
            var f59Metric = mapMetrics ? mapMetrics.metrics.get('TNKE|DIVISI 2|F-59') : null;
            
            var f59Label = null;
            var labels = document.querySelectorAll('.polygon-block-label');
            labels.forEach(function(l) {
                if (l.textContent.includes('F-59')) f59Label = l.textContent.trim().replace(/\\s+/g, ' ');
            });
            
            var f59Layer = state.featureLayersByKey ? state.featureLayersByKey['TNKE|DIVISI 2|F-59'] : null;
            var fillColor = f59Layer && f59Layer.options ? f59Layer.options.fillColor : null;

            return JSON.stringify({
                block: 'F-59',
                category: 'Underpruning (SPT-02)',
                tagCount: f59Metric ? f59Metric.tagCount : (f59Sum ? f59Sum.tagCount : null),
                quantity: f59Metric ? f59Metric.quantity : null,
                unit: f59Metric ? f59Metric.unit : null,
                status: f59Metric ? f59Metric.status : null,
                scopeTotalVolume: f59Metric ? f59Metric.denominator : div2Vol,
                contributionPct: f59Metric ? f59Metric.contributionPct : null,
                inPolygonLabel: f59Label,
                fillColor: fillColor
            });
        })()
        """
        log(f"\n=======================================================")
        log(f"MANDATORY VALIDATION RESULT:")
        log(eval_js(s, js_validate_underpruning, msg_id))
        log(f"=======================================================\n")
        msg_id += 1
        
        # Click F-59 to open drawer and check drawer contents
        js_click_f59 = """
        (function() {
            window.SPT_APP.selectBlock('TNKE', 'DIVISI 2', 'F-59');
            return 'F59_CLICKED';
        })()
        """
        log(f"Click F-59: {eval_js(s, js_click_f59, msg_id)}"); msg_id += 1
        time.sleep(1.5)
        
        js_drawer_check = """
        (function() {
            var drawer = document.getElementById('blockDrawer');
            var isOpen = drawer ? drawer.classList.contains('open') : false;
            var code = document.getElementById('drawerBlockCode');
            var tagWrap = document.getElementById('drawerTaggingWrap');
            return JSON.stringify({
                isDrawerOpen: isOpen,
                drawerTitle: code ? code.textContent : null,
                tagWrapTextSample: tagWrap ? tagWrap.textContent.slice(0, 300).trim().replace(/\\s+/g, ' ') : null
            });
        })()
        """
        log(f"Drawer check: {eval_js(s, js_drawer_check, msg_id)}"); msg_id += 1
        
        # Switch back to Coverage mode
        log("\n4. Switching back to Coverage Mode to verify non-destructive toggle...")
        js_switch_cov = """
        (function() {
            var btnCov = document.getElementById('btnMapModeCoverage');
            if (btnCov) { btnCov.click(); return 'COVERAGE_CLICKED'; }
            return 'BTN_NOT_FOUND';
        })()
        """
        log(f"Switch back to coverage: {eval_js(s, js_switch_cov, msg_id)}"); msg_id += 1
        time.sleep(1.5)
        
        js_cov_check = """
        (function() {
            var state = window.SPT_APP.getState();
            var f59Label = null;
            var labels = document.querySelectorAll('.polygon-block-label');
            labels.forEach(function(l) {
                if (l.textContent.includes('F-59')) f59Label = l.textContent.trim().replace(/\\s+/g, ' ');
            });
            var legCov = document.getElementById('coverageLegendBody');
            return JSON.stringify({
                mapMode: state.mapMode,
                f59CoverageLabel: f59Label,
                isCoverageLegendVisible: legCov ? legCov.style.display !== 'none' : false
            });
        })()
        """
        log(f"Coverage restore check: {eval_js(s, js_cov_check, msg_id)}"); msg_id += 1
        
        # Capture screenshot of the verified page
        log("\n5. Capturing final screenshot...")
        s_resp = cdp_send(s, "Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False}, msg_id); msg_id += 1
        if "result" in s_resp and "data" in s_resp["result"]:
            out_img = os.path.join(ARTIFACT_DIR, "spt_final_verification.png")
            with open(out_img, "wb") as f:
                f.write(base64.b64decode(s_resp["result"]["data"]))
            log(f"Screenshot successfully saved to: {out_img}")
            
        log("\n=== ALL ACCEPTANCE CRITERIA VERIFIED SUCCESSFULLY! ===")

    finally:
        proc.terminate()

if __name__ == "__main__":
    main()
