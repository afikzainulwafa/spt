import subprocess
import time
import json
import urllib.request
import socket
import base64
import os

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
ARTIFACT_DIR = r"C:\Users\23000984\.gemini\antigravity-ide\brain\bc85764b-cd2c-487a-bbf5-67b21fbc15b1"

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

def save_screen(s, filename, msg_id):
    s_resp = cdp_send(s, "Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False}, msg_id)
    if "result" in s_resp and "data" in s_resp["result"]:
        out_img = os.path.join(ARTIFACT_DIR, filename)
        with open(out_img, "wb") as f:
            f.write(base64.b64decode(s_resp["result"]["data"]))
        print(f"Saved: {filename}")

def main():
    profile = os.path.join(os.getcwd(), "scratch", "edge_capture")
    os.makedirs(profile, exist_ok=True)
    
    proc = subprocess.Popen([
        EDGE_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9270",
        f"--user-data-dir={profile}",
        "--window-size=1440,900",
        "--no-first-run",
        "about:blank"
    ])
    time.sleep(2.5)

    try:
        req = urllib.request.urlopen("http://127.0.0.1:9270/json")
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
        cdp_send(s, "Page.navigate", {"url": "http://localhost:8088/index.html"}, msg_id); msg_id += 1
        time.sleep(3.5)
        
        # Login
        cdp_send(s, "Runtime.evaluate", {"expression": "var btn = document.getElementById('btnLogin'); if(btn) btn.click();"}, msg_id); msg_id += 1
        time.sleep(2.0)
        
        # Map & Coverage
        cdp_send(s, "Runtime.evaluate", {"expression": "var btn = document.getElementById('navMap'); if(btn) btn.click();"}, msg_id); msg_id += 1
        time.sleep(2.0)
        
        # Screen 1: Coverage mode with DIVISI 2
        cdp_send(s, "Runtime.evaluate", {"expression": "var div = document.getElementById('divisionFilter'); if(div) { div.value = 'DIVISI 2'; div.dispatchEvent(new Event('change')); }"}, msg_id); msg_id += 1
        time.sleep(1.5)
        save_screen(s, "spt_01_coverage_divisi2.png", msg_id); msg_id += 1
        
        # Screen 2: Problem mode with Semua Permasalahan
        cdp_send(s, "Runtime.evaluate", {"expression": "window.SPT_APP.switchMapMode('problem');"}, msg_id); msg_id += 1
        time.sleep(2.0)
        save_screen(s, "spt_02_problem_all_categories.png", msg_id); msg_id += 1
        
        # Screen 3: Problem mode with Underpruning (SPT-02)
        cdp_send(s, "Runtime.evaluate", {"expression": "window.SPT_APP.changeProblemCategory('SPT-02');"}, msg_id); msg_id += 1
        time.sleep(2.0)
        save_screen(s, "spt_03_problem_underpruning_12pct.png", msg_id); msg_id += 1
        
        # Screen 4: F-59 Drawer
        cdp_send(s, "Runtime.evaluate", {"expression": "window.SPT_APP.selectBlock('TNKE', 'DIVISI 2', 'F-59');"}, msg_id); msg_id += 1
        time.sleep(1.5)
        save_screen(s, "spt_04_drawer_f59_underpruning.png", msg_id); msg_id += 1
        
        print("ALL SCREENSHOTS CAPTURED!")
    finally:
        proc.terminate()

if __name__ == "__main__":
    main()
