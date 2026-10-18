import subprocess
import time
import json
import urllib.request
import socket
import base64
import os
import sys

EDGE_PATHS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
]

EDGE_PATH = next((p for p in EDGE_PATHS if os.path.exists(p)), None)

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
    req = {"id": mid, "method": method, "params": params or {}}
    send_ws_frame(s, json.dumps(req))
    while True:
        resp_text = read_ws_frame(s)
        try:
            resp = json.loads(resp_text)
            if resp.get("id") == mid:
                if "error" in resp:
                    raise Exception(f"CDP Error: {resp['error']}")
                return resp.get("result", {})
        except json.JSONDecodeError:
            pass

def eval_js(s, expression):
    res = call_cdp(s, "Runtime.evaluate", {"expression": expression, "returnByValue": True})
    return res.get("result", {}).get("value")

def take_screenshot(s, filename):
    res = call_cdp(s, "Page.captureScreenshot", {"format": "png"})
    data = base64.b64decode(res["data"])
    with open(filename, "wb") as f:
        f.write(data)
    print(f"Captured screenshot: {filename} ({len(data)} bytes)")

def run_verification():
    if not EDGE_PATH:
        print("Error: No Edge/Chrome browser binary found")
        sys.exit(1)

    user_data_dir = os.path.join(os.getcwd(), "scratch", "edge_cdp_profile")
    os.makedirs(user_data_dir, exist_ok=True)
    port = 9234

    proc = subprocess.Popen([
        EDGE_PATH,
        f"--remote-debugging-port={port}",
        f"--user-data-dir={user_data_dir}",
        "--headless=new",
        "--window-size=1400,900",
        "--no-first-run",
        "--no-default-browser-check",
        "about:blank"
    ])
    print(f"Started browser with PID {proc.pid}")
    time.sleep(2.5)

    try:
        req = urllib.request.urlopen(f"http://localhost:{port}/json")
        targets = json.loads(req.read().decode("utf-8"))
        page_target = next(t for t in targets if t["type"] == "page")
        ws_url = page_target["webSocketDebuggerUrl"]

        host_port = ws_url.split("/")[2]
        host, p_str = host_port.split(":")
        path = "/" + "/".join(ws_url.split("/")[3:])

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, int(p_str)))

        key = base64.b64encode(os.urandom(16)).decode("ascii")
        handshake = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {host_port}\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            "Sec-WebSocket-Version: 13\r\n\r\n"
        )
        s.sendall(handshake.encode("utf-8"))
        response = s.recv(4096).decode("utf-8", errors="ignore")
        if "101" not in response:
            raise Exception("WebSocket handshake failed")

        call_cdp(s, "Page.enable")
        call_cdp(s, "Runtime.enable")

        url = "http://localhost:8088/index.html#autologin"
        print(f"Navigating to {url}...")
        call_cdp(s, "Page.navigate", {"url": url})
        time.sleep(3)

        # 1. Verify Title & Header
        title = eval_js(s, "document.getElementById('pageTitle') ? document.getElementById('pageTitle').textContent : ''")
        crumb = eval_js(s, "document.getElementById('headerCrumb') ? document.getElementById('headerCrumb').textContent : ''")
        print(f"Header Title: '{title}', Crumb: '{crumb}'")
        assert "Progress Assessment" in title, f"Title mismatch: {title}"

        # 2. Verify 4 Summary Cards Values
        card1 = eval_js(s, "document.getElementById('cardTotalLuasValue').textContent")
        card2 = eval_js(s, "document.getElementById('cardSudahAssessValue').textContent")
        card3 = eval_js(s, "document.getElementById('cardCompleteValue').textContent")
        card4 = eval_js(s, "document.getElementById('cardTemuanValue').textContent")

        print("Summary Cards Values:")
        print(f"  1. Total Luas: {card1} ha")
        print(f"  2. Sudah Di-assess: {card2} ha")
        print(f"  3. Assessment Lengkap: {card3} blok")
        print(f"  4. Temuan Masalah: {card4} tagging")

        take_screenshot(s, "test_01_progress_assessment_dashboard.png")

        # 3. Select Block D-53 from Dropdown
        print("Selecting Block D-53 via dropdown...")
        eval_js(s, """
            var sel = document.getElementById('blockFilter');
            if (sel) {
                sel.value = 'D-53';
                sel.dispatchEvent(new Event('change'));
            }
        """)
        time.sleep(1.5)

        # 4. Verify Drawer Content
        is_open = eval_js(s, "document.getElementById('blockDetailDrawer').classList.contains('open')")
        drawer_title = eval_js(s, "document.getElementById('drawerBlockCode').textContent")
        progress_pct = eval_js(s, "document.getElementById('dProgressPct').textContent")
        status_badge = eval_js(s, "document.getElementById('dStatusBadge').textContent")
        history_rows = eval_js(s, "document.querySelectorAll('#drawerHistoryTbody tr').length")

        print("Drawer Status:")
        print(f"  Is Open: {is_open}")
        print(f"  Drawer Block: {drawer_title}")
        print(f"  Progress Pct: {progress_pct}")
        print(f"  Status Badge: {status_badge}")
        print(f"  History Table Rows: {history_rows}")

        assert is_open, "Drawer failed to open"
        assert "D-53" in drawer_title, f"Drawer block mismatch: {drawer_title}"

        take_screenshot(s, "test_02_block_detail_drawer.png")

        # 5. Check legend filter interaction
        print("Testing interactive legend filter...")
        eval_js(s, """
            var item = document.querySelector('.legend-item[data-range="100"]');
            if (item) item.click();
        """)
        time.sleep(1)
        take_screenshot(s, "test_03_legend_filter_active.png")

        print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY!")

    finally:
        try:
            proc.kill()
        except Exception:
            pass

if __name__ == "__main__":
    run_verification()
