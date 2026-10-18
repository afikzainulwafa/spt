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

def log(msg):
    print(msg)
    sys.stdout.flush()

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

def read_ws_message(s):
    message_bytes = bytearray()
    while True:
        hdr = recv_all(s, 2)
        b1, b2 = hdr[0], hdr[1]
        fin = (b1 & 0x80) != 0
        has_mask = (b2 & 0x80) != 0
        payload_len = b2 & 0x7F
        if payload_len == 126:
            payload_len = int.from_bytes(recv_all(s, 2), "big")
        elif payload_len == 127:
            payload_len = int.from_bytes(recv_all(s, 8), "big")
        
        mask_key = None
        if has_mask:
            mask_key = recv_all(s, 4)
            
        payload = recv_all(s, payload_len)
        if has_mask and mask_key:
            unmasked = bytearray(payload_len)
            for i in range(payload_len):
                unmasked[i] = payload[i] ^ mask_key[i % 4]
            message_bytes.extend(unmasked)
        else:
            message_bytes.extend(payload)
            
        if fin:
            break
    return message_bytes.decode("utf-8")

def ws_connect(ws_url):
    parts = ws_url.replace("ws://", "").split("/")
    host_port = parts[0].split(":")
    host = host_port[0]
    port = int(host_port[1])
    path = "/" + "/".join(parts[1:])
    
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, port))
    
    key = base64.b64encode(os.urandom(16)).decode("utf-8")
    req = (
        f"GET {path} HTTP/1.1\r\n"
        f"Host: {host}:{port}\r\n"
        f"Upgrade: websocket\r\n"
        f"Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        f"Sec-WebSocket-Version: 13\r\n\r\n"
    )
    s.sendall(req.encode("utf-8"))
    res = s.recv(4096).decode("utf-8")
    if "101" not in res:
        raise RuntimeError("Handshake failed: " + res)
    return s

def execute_cdp(s, method, params=None, msg_id_start=1):
    msg = {"id": msg_id_start, "method": method, "params": params or {}}
    send_ws_frame(s, json.dumps(msg))
    while True:
        resp_str = read_ws_message(s)
        resp = json.loads(resp_str)
        if resp.get("id") == msg_id_start:
            return resp

def take_screenshot(s, filename, msg_id):
    out_path = os.path.join(ARTIFACT_DIR, filename)
    log(f"Requesting screenshot {filename} (id={msg_id})...")
    resp = execute_cdp(s, "Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False}, msg_id)
    if "result" in resp and "data" in resp["result"]:
        b64data = resp["result"]["data"]
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(b64data))
        log(f"[OK] Screenshot saved: {out_path} ({len(b64data)} bytes)")
    else:
        log(f"[ERROR] Failed screenshot: {resp}")

def main():
    log("=== STARTING SPT INCREMENTAL VERIFICATION ===")
    
    profile_dir = os.path.join(os.getcwd(), "scratch", "edge_cdp_spt_test")
    os.makedirs(profile_dir, exist_ok=True)

    cmd = [
        EDGE_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9258",
        f"--user-data-dir={profile_dir}",
        "--window-size=1440,900",
        "--no-first-run",
        "--no-default-browser-check",
        "about:blank"
    ]
    proc = subprocess.Popen(cmd)
    log("Launching Edge on port 9258...")
    time.sleep(3.0)

    try:
        req = urllib.request.urlopen("http://127.0.0.1:9258/json")
        targets = json.loads(req.read().decode("utf-8"))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        log(f"Connected to CDP WebSocket: {ws_url}")
        s = ws_connect(ws_url)

        msg_id = 1
        execute_cdp(s, "Runtime.enable", {}, msg_id)
        msg_id += 1

        log("1. Navigating to http://localhost:8088/index.html#autologin...")
        execute_cdp(s, "Page.navigate", {"url": "http://localhost:8088/index.html#autologin"}, msg_id)
        msg_id += 1
        time.sleep(4.0)

        # Check console errors if any
        check_err_js = "window.__TOP_ERR__ || (window.__APP_JS_LOADED__ ? 'OK' : 'APP_NOT_LOADED')"
        eval_resp = execute_cdp(s, "Runtime.evaluate", {"expression": check_err_js, "returnByValue": True}, msg_id)
        msg_id += 1
        log(f"   App JS Status: {eval_resp['result']['result']['value']}")

        # Navigate to Map & Coverage view
        log("2. Navigating to Map & Coverage view...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "var btn = document.getElementById('navMap') || document.getElementById('btnGoToMapCoverage'); if(btn) btn.click();"
        }, msg_id)
        msg_id += 1
        time.sleep(2.5)

        # Check Header dropdowns
        header_check_js = """
        (function() {
            var est = document.getElementById('estateFilter');
            var div = document.getElementById('divisionFilter');
            var blk = document.getElementById('blockFilter');
            var per = document.getElementById('periodFilter');
            var act = document.getElementById('activityFilter');
            return JSON.stringify({
                estateVal: est ? est.value : null,
                divisionVal: div ? div.value : null,
                blockVal: blk ? blk.value : null,
                periodVal: per ? per.value : null,
                hasActivityFilter: !!act
            });
        })()
        """
        eval_resp = execute_cdp(s, "Runtime.evaluate", {"expression": header_check_js, "returnByValue": True}, msg_id)
        msg_id += 1
        log(f"   Header dropdown state: {eval_resp['result']['result']['value']}")

        # Set filter to DIVISI 2
        log("3. Setting Division filter to DIVISI 2...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "var div = document.getElementById('divisionFilter'); if(div) { div.value = 'DIVISI 2'; div.dispatchEvent(new Event('change')); }"
        }, msg_id)
        msg_id += 1
        time.sleep(2.0)

        # Capture Coverage mode screenshot
        take_screenshot(s, "spt_step01_coverage_mode_div2.png", msg_id)
        msg_id += 1

        # Check toggle button and switch to Problem mode
        log("4. Switching to Problem Map Mode...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "window.SPT_APP.switchMapMode('problem');"
        }, msg_id)
        msg_id += 1
        time.sleep(2.5)

        # Check problem analytics state
        check_problem_mode_js = """
        (function() {
            var state = window.SPT_APP.getState();
            var catSel = document.getElementById('selProblemCategoryMap');
            var optCount = catSel ? catSel.options.length : 0;
            var mode = state.mapMode;
            var analytics = state.problemAnalytics;
            return JSON.stringify({
                mapMode: mode,
                categoryDropdownOptions: optCount,
                hasAnalytics: !!analytics,
                totalTags: analytics ? analytics.totalTags : 0,
                underpruningDiv2Vol: analytics ? analytics.getScopeVolume('TNKE', 'DIVISI 2', 'all', 'September 2026', 'SPT-02') : 0
            });
        })()
        """
        eval_resp = execute_cdp(s, "Runtime.evaluate", {"expression": check_problem_mode_js, "returnByValue": True}, msg_id)
        msg_id += 1
        log(f"   Problem Mode State (All categories): {eval_resp['result']['result']['value']}")

        take_screenshot(s, "spt_step02_problem_mode_all_categories.png", msg_id)
        msg_id += 1

        # Select Underpruning category (SPT-02)
        log("5. Selecting Category: Underpruning (SPT-02)...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "window.SPT_APP.changeProblemCategory('SPT-02');"
        }, msg_id)
        msg_id += 1
        time.sleep(2.5)

        # Validate Mandatory Acceptance Criteria:
        # F-59 = 5 tagging, 102 pokok. Total DIVISI 2 = 846 pokok. F-59 map label = 12,1%.
        validate_f59_js = """
        (function() {
            var state = window.SPT_APP.getState();
            var analytics = state.problemAnalytics;
            var f59Data = analytics.getBlockCategorySummary('TNKE', 'DIVISI 2', 'F-59', 'September 2026', 'SPT-02');
            var div2Vol = analytics.getScopeVolume('TNKE', 'DIVISI 2', 'all', 'September 2026', 'SPT-02');
            
            // Check polygon label for F-59 in DOM
            var labelTexts = [];
            var labels = document.querySelectorAll('.polygon-block-label');
            labels.forEach(function(l) {
                if (l.textContent.includes('F-59')) {
                    labelTexts.push(l.textContent.trim().replace(/\\s+/g, ' '));
                }
            });

            return JSON.stringify({
                block: 'F-59',
                category: 'SPT-02 (Underpruning)',
                tagCount: f59Data.tagCount,
                volume: f59Data.volume,
                unit: f59Data.unit,
                status: f59Data.status,
                scopeTotalVolume: div2Vol,
                pct: f59Data.pct,
                pctFormatted: f59Data.pctFormatted,
                foundDomLabels: labelTexts
            });
        })()
        """
        eval_resp = execute_cdp(s, "Runtime.evaluate", {"expression": validate_f59_js, "returnByValue": True}, msg_id)
        msg_id += 1
        log(f"   Validation Result for F-59 Underpruning: {eval_resp['result']['result']['value']}")

        take_screenshot(s, "spt_step03_problem_mode_underpruning.png", msg_id)
        msg_id += 1

        # Select Block F-59 to open Drawer and inspect details
        log("6. Clicking Block F-59 to open Drawer...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "window.SPT_APP.selectBlock('TNKE', 'DIVISI 2', 'F-59');"
        }, msg_id)
        msg_id += 1
        time.sleep(2.0)

        # Inspect Drawer Content
        check_drawer_js = """
        (function() {
            var drawerCode = document.getElementById('drawerBlockCode');
            var drawerTagWrap = document.getElementById('drawerTaggingWrap');
            return JSON.stringify({
                drawerBlock: drawerCode ? drawerCode.textContent : null,
                hasTagWrap: !!drawerTagWrap,
                tagWrapPreview: drawerTagWrap ? drawerTagWrap.textContent.slice(0, 200).trim().replace(/\\s+/g, ' ') : ''
            });
        })()
        """
        eval_resp = execute_cdp(s, "Runtime.evaluate", {"expression": check_drawer_js, "returnByValue": True}, msg_id)
        msg_id += 1
        log(f"   Drawer State: {eval_resp['result']['result']['value']}")

        take_screenshot(s, "spt_step04_drawer_f59_underpruning.png", msg_id)
        msg_id += 1

        # Switch back to Coverage mode to verify non-destructive toggle
        log("7. Switching back to Coverage mode to verify non-destructive behavior...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "window.SPT_APP.switchMapMode('coverage');"
        }, msg_id)
        msg_id += 1
        time.sleep(2.0)

        take_screenshot(s, "spt_step05_switch_back_coverage.png", msg_id)
        msg_id += 1

        log("=== SPT VERIFICATION COMPLETE ===")

    finally:
        proc.terminate()

if __name__ == "__main__":
    main()
