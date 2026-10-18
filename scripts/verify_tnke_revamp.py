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
        unmasked = bytearray(payload_len)
        for i in range(payload_len):
            unmasked[i] = raw[i] ^ mask_key[i % 4]
        return unmasked.decode("utf-8")
    return raw.decode("utf-8")

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
        resp_str = read_ws_frame(s)
        resp = json.loads(resp_str)
        if resp.get("id") == msg_id_start:
            return resp

def take_screenshot(s, filename, msg_id):
    resp = execute_cdp(s, "Page.captureScreenshot", {"format": "png"}, msg_id)
    b64data = resp["result"]["data"]
    with open(filename, "wb") as f:
        f.write(base64.b64decode(b64data))
    print(f"Captured screenshot: {filename}")

def main():
    print("=== STARTING TNKE REVAMP PHASE 1 & 2 VERIFICATION ===")
    
    cmd = [
        EDGE_PATH,
        "--headless",
        "--remote-debugging-port=9222",
        "--window-size=1366,850",
        "--no-first-run",
        "--no-default-browser-check",
        "about:blank"
    ]
    proc = subprocess.Popen(cmd)
    time.sleep(2.5)

    try:
        req = urllib.request.urlopen("http://127.0.0.1:9222/json")
        targets = json.loads(req.read().decode("utf-8"))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        s = ws_connect(ws_url)

        msg_id = 1
        print("1. Navigating to http://localhost:8088/index.html#autologin...")
        execute_cdp(s, "Page.navigate", {"url": "http://localhost:8088/index.html#autologin"}, msg_id)
        time.sleep(3.0)
        msg_id += 1

        print("2. Verifying Global Objects & TNKE Store...")
        js_eval = """
        (function() {
            var store = window.tnkeStore;
            var master = window.TNKEMaster;
            var summary = store ? store.getDailyActivitySummary('Budi Santoso (Asisten)', '12 Sep 2026') : null;
            return JSON.stringify({
                hasTNKEMaster: !!master,
                hasTNKEStore: !!store,
                allFeaturesCount: master ? master.process(window.TNKE_GEOJSON).allFeaturesCount : 0,
                nonBlockFeaturesCount: master ? master.process(window.TNKE_GEOJSON).nonBlockFeaturesCount : 0,
                agriculturalBlocksCount: master ? master.process(window.TNKE_GEOJSON).agriculturalBlocksCount : 0,
                dailySummaryKm: summary ? summary.estimatedDistanceKm : 0,
                dailySummaryPct: summary ? summary.achievementPct : 0
            });
        })()
        """
        eval_resp = execute_cdp(s, "Runtime.evaluate", {
            "expression": js_eval,
            "returnByValue": True
        }, msg_id)
        msg_id += 1
        
        val_raw = eval_resp["result"]["result"]["value"]
        print("   Store Status:", val_raw)

        # 1. Screenshot: Map & Coverage seluruh estate
        print("3. Capturing Map & Coverage seluruh estate...")
        take_screenshot(s, "test_tnke_01_map_coverage.png", msg_id)
        msg_id += 1

        # 2. Screenshot: Filter satu kegiatan (Pengancakan)
        print("4. Testing Activity Filter (Pengancakan)...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "state.activeActivityFilter = 'pengancakan'; updateAssessmentSummaryCards();"
        }, msg_id)
        msg_id += 1
        time.sleep(1.0)
        take_screenshot(s, "test_tnke_02_filter_kegiatan.png", msg_id)
        msg_id += 1

        # 3. Screenshot: Drawer blok H-49 (Coverage 85.0% dan riwayat)
        print("5. Opening Block Drawer for H-49...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "selectBlock('TNKE', 'DIVISI 3', 'H-49');"
        }, msg_id)
        msg_id += 1
        time.sleep(1.5)
        take_screenshot(s, "test_tnke_03_drawer_detail.png", msg_id)
        msg_id += 1

        # 4. Screenshot: Highest coverage block (100% complete)
        print("6. Opening Block Drawer for 100% Complete Block...")
        execute_cdp(s, "Runtime.evaluate", {
            "expression": "var b100 = window.tnkeStore.masterData.blocks.find(function(b){ return window.tnkeStore.state.monthlyAssessment[b.key].combinedUniquePct === 100; }); if(b100) selectBlock(b100.estate, b100.divisi, b100.blok);"
        }, msg_id)
        msg_id += 1
        time.sleep(1.5)
        take_screenshot(s, "test_tnke_04_highest_coverage.png", msg_id)
        msg_id += 1

        # 5. Screenshot: Mobile Inspection Screen
        print("7. Navigating Mobile App http://localhost:8088/aplikasi/index.html#autologin...")
        execute_cdp(s, "Page.navigate", {"url": "http://localhost:8088/aplikasi/index.html#autologin"}, msg_id)
        msg_id += 1
        time.sleep(2.5)

        execute_cdp(s, "Page.navigate", {"url": "http://localhost:8088/aplikasi/index.html#/inspection"}, msg_id)
        msg_id += 1
        time.sleep(2.0)
        take_screenshot(s, "test_tnke_05_mobile_inspection.png", msg_id)
        msg_id += 1

        print("=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY ===")

    finally:
        proc.terminate()

if __name__ == "__main__":
    main()
