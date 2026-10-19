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

def execute_cdp(s, method, params=None, msg_id=1):
    msg = {"id": msg_id, "method": method, "params": params or {}}
    send_ws_frame(s, json.dumps(msg))
    while True:
        resp_str = read_ws_message(s)
        resp = json.loads(resp_str)
        if resp.get("id") == msg_id:
            return resp

def eval_js(s, js_code, msg_id):
    resp = execute_cdp(s, "Runtime.evaluate", {"expression": js_code, "returnByValue": True}, msg_id)
    if "result" in resp:
        res = resp["result"]
        if "exceptionDetails" in res:
            return f"EXCEPTION: {res['exceptionDetails']}"
        if "result" in res and "value" in res["result"]:
            return res["result"]["value"]
    return str(resp)

def capture_screen(s, filename, msg_id):
    res = execute_cdp(s, "Page.captureScreenshot", {"format": "png"}, msg_id)
    b64 = res["result"]["data"]
    path = os.path.join(ARTIFACT_DIR, filename)
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    log(f"Captured: {path}")

def main():
    profile = os.path.join(os.getcwd(), "scratch", "edge_verify_dashboard_v4")
    os.makedirs(profile, exist_ok=True)
    
    cmd = [
        EDGE_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9288",
        f"--user-data-dir={profile}",
        "--window-size=1560,980",
        "--no-first-run",
        "--no-default-browser-check",
        "about:blank"
    ]
    proc = subprocess.Popen(cmd)
    time.sleep(2.5)

    try:
        req = urllib.request.urlopen("http://127.0.0.1:9288/json")
        targets = json.loads(req.read().decode("utf-8"))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        s = ws_connect(ws_url)
        
        msg_id = 1
        execute_cdp(s, "Runtime.enable", {}, msg_id); msg_id += 1
        execute_cdp(s, "Page.enable", {}, msg_id); msg_id += 1
        
        log("Navigating to http://localhost:8088/index.html#autologin...")
        execute_cdp(s, "Page.navigate", {"url": "http://localhost:8088/index.html#autologin"}, msg_id); msg_id += 1
        time.sleep(3.5)
        
        # 1. Check Estate 'all' values
        js_all = """
        (function() {
            var divSel = document.getElementById('divisionFilter');
            if (divSel) { divSel.value = 'all'; divSel.dispatchEvent(new Event('change')); }
            return {
                obsPct: document.getElementById('kpiObsPct') ? document.getElementById('kpiObsPct').textContent : null,
                obsFraction: document.getElementById('kpiObsFraction') ? document.getElementById('kpiObsFraction').textContent : null,
                obsStatus: document.getElementById('kpiObsStatusText') ? document.getElementById('kpiObsStatusText').textContent : null,
                stripTargetHa: document.getElementById('stripKpiTargetHa') ? document.getElementById('stripKpiTargetHa').textContent : null,
                stripActualHa: document.getElementById('stripKpiActualHa') ? document.getElementById('stripKpiActualHa').textContent : null,
                stripActualSub: document.getElementById('stripKpiActualSub') ? document.getElementById('stripKpiActualSub').textContent : null,
                donutCenterHa: document.getElementById('donutCenterHa') ? document.getElementById('donutCenterHa').textContent : null
            };
        })()
        """
        log(f"Estate All Check: {eval_js(s, js_all, msg_id)}"); msg_id += 1
        capture_screen(s, "spt_v4_01_dashboard_all_estate.png", msg_id); msg_id += 1
        time.sleep(1.0)

        # 2. Check DIVISI 1 filter
        js_div1 = """
        (function() {
            var divSel = document.getElementById('divisionFilter');
            if (divSel) { divSel.value = 'DIVISI 1'; divSel.dispatchEvent(new Event('change')); }
            return {
                obsPct: document.getElementById('kpiObsPct') ? document.getElementById('kpiObsPct').textContent : null,
                obsFraction: document.getElementById('kpiObsFraction') ? document.getElementById('kpiObsFraction').textContent : null,
                obsStatus: document.getElementById('kpiObsStatusText') ? document.getElementById('kpiObsStatusText').textContent : null,
                stripTargetHa: document.getElementById('stripKpiTargetHa') ? document.getElementById('stripKpiTargetHa').textContent : null,
                stripActualHa: document.getElementById('stripKpiActualHa') ? document.getElementById('stripKpiActualHa').textContent : null,
                stripActualSub: document.getElementById('stripKpiActualSub') ? document.getElementById('stripKpiActualSub').textContent : null,
                stripKebutuhanRate: document.getElementById('stripKpiKebutuhanRate') ? document.getElementById('stripKpiKebutuhanRate').textContent : null,
                stripKebutuhanSisa: document.getElementById('stripKpiKebutuhanSisa') ? document.getElementById('stripKpiKebutuhanSisa').textContent : null,
                donutCenterHa: document.getElementById('donutCenterHa') ? document.getElementById('donutCenterHa').textContent : null,
                donutCenterLbl: document.getElementById('donutCenterLbl') ? document.getElementById('donutCenterLbl').textContent : null
            };
        })()
        """
        log(f"Divisi 1 Filter Check: {eval_js(s, js_div1, msg_id)}"); msg_id += 1
        time.sleep(1.0)
        capture_screen(s, "spt_v4_02_dashboard_divisi_1.png", msg_id); msg_id += 1

        # 3. Check Tab 2 (Target & Realisasi) schedule table
        eval_js(s, "window.SPT_APP.switchObsTab('targetRealisasi');", msg_id); msg_id += 1
        time.sleep(1.0)
        js_sched = """
        (function() {
            var rows = document.querySelectorAll('#scheduleTableBody tr');
            var data = [];
            rows.forEach(function(r) {
                var cols = r.querySelectorAll('td');
                if (cols.length >= 6) {
                    data.push({
                        minggu: cols[0].textContent.trim(),
                        targetMingguan: cols[2].textContent.trim(),
                        targetKumulatif: cols[3].textContent.trim(),
                        realisasi: cols[4].textContent.trim(),
                        deviasi: cols[5].textContent.trim(),
                        status: cols[6].textContent.trim()
                    });
                }
            });
            return data;
        })()
        """
        log(f"Schedule Table Rows (Divisi 1): {eval_js(s, js_sched, msg_id)}"); msg_id += 1
        capture_screen(s, "spt_v4_03_schedule_divisi_1.png", msg_id); msg_id += 1

        # 4. Check Problem card detail
        eval_js(s, "window.SPT_APP.switchObsTab('ringkasanObservasi'); window.SPT_APP.switchDashCard('problem');", msg_id); msg_id += 1
        time.sleep(1.0)
        js_prob = """
        (function() {
            var rows = document.querySelectorAll('#probHeatmapTableBody tr');
            var firstRow = null;
            if (rows.length > 0) {
                var cells = rows[0].querySelectorAll('td');
                firstRow = {
                    cat: cells[0] ? cells[0].textContent.trim() : '',
                    div1: cells[1] ? cells[1].textContent.trim() : '',
                    div2: cells[2] ? cells[2].textContent.trim() : '',
                    div3: cells[3] ? cells[3].textContent.trim() : '',
                    div5: cells[4] ? cells[4].textContent.trim() : '',
                    div6: cells[5] ? cells[5].textContent.trim() : ''
                };
            }
            return {
                prioritasBtnExists: !!document.getElementById('tabProbPrioritas'),
                prioritasPanelExists: !!document.getElementById('probTabPrioritas'),
                rankingTitle: document.getElementById('probRankingTitle') ? document.getElementById('probRankingTitle').textContent : null,
                scaleNote: document.getElementById('probScaleNote') ? document.getElementById('probScaleNote').textContent : null,
                heatmapTitle: document.querySelector('.prob-panel-heatmap .prob-panel-title') ? document.querySelector('.prob-panel-heatmap .prob-panel-title').textContent : null,
                heatmapUnitNote: document.getElementById('probHeatmapUnitNote') ? document.getElementById('probHeatmapUnitNote').textContent : null,
                firstBar: document.querySelector('.prob-bar-row') ? {
                    cat: document.querySelector('.prob-bar-row .prob-bar-cat-name').textContent,
                    val: document.querySelector('.prob-bar-row .prob-bar-fill span').textContent,
                    vol: document.querySelector('.prob-bar-row .prob-bar-vol-lbl').textContent
                } : null,
                firstHeatmapRow: firstRow
            };
        })()
        """
        log(f"Problem Detail Check: {eval_js(s, js_prob, msg_id)}"); msg_id += 1
        capture_screen(s, "spt_v4_04_problem_card_detail.png", msg_id); msg_id += 1

        s.close()
    finally:
        proc.terminate()

if __name__ == "__main__":
    main()
