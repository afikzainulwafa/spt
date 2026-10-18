import subprocess
import time
import json
import urllib.request
import socket
import base64
import sys
import os

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

def call_cdp(s, msg_id, method, params=None):
    payload = {"id": msg_id, "method": method}
    if params:
        payload["params"] = params
    send_ws_frame(s, json.dumps(payload))
    while True:
        frame = read_ws_frame(s)
        try:
            res = json.loads(frame)
            if res.get("id") == msg_id:
                return res
        except:
            pass

def capture(url, output_path, wait_seconds=3, eval_js=None):
    port = 9230
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
        time.sleep(1.0)
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
            
        call_cdp(sock, 1, "Page.enable")
        call_cdp(sock, 2, "Emulation.setDeviceMetricsOverride", {
            "width": 1366,
            "height": 768,
            "deviceScaleFactor": 1,
            "mobile": False
        })
        call_cdp(sock, 3, "Page.navigate", {"url": url})
        time.sleep(wait_seconds)
        
        if eval_js:
            call_cdp(sock, 4, "Runtime.evaluate", {"expression": eval_js})
            time.sleep(1.5)
            
        res = call_cdp(sock, 5, "Page.captureScreenshot", {"format": "png"})
        b64 = res.get("result", {}).get("data")
        if b64:
            with open(output_path, "wb") as f:
                f.write(base64.b64decode(b64))
            print(f"SUCCESS wrote {output_path}")
            return True
        else:
            print("ERROR: No screenshot data")
            return False
    except Exception as e:
        print(f"Exception: {e}")
        return False
    finally:
        if sock:
            try: sock.close()
            except: pass
        proc.terminate()

if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "macro"
    base = "http://localhost:8088/index.html#autologin"
    
    if mode == "macro":
        capture(base, "dashboard_macro.png", wait_seconds=3.0)
    elif mode == "fullscreen_click":
        capture(base, "fullscreen_screen.png", wait_seconds=2.5, eval_js="document.getElementById('btnFullscreenProblem').click();")
    elif mode == "fullscreen":
        capture(base, "fullscreen_screen.png", wait_seconds=2.5, eval_js="window.SPT_APP.toggleFullscreenProblem(true);")
    elif mode == "zoom_block":
        zoom_script = """
            (function() {
                var st = window.SPT_APP.getState();
                st.problemGeoJsonLayer.eachLayer(function(l) {
                    if (l.feature && l.feature.properties && l.feature.properties.blok === 'T-32') {
                        l.fire('click');
                    }
                });
                st.bccrGeoJsonLayer.eachLayer(function(l) {
                    if (l.feature && l.feature.properties && l.feature.properties.blok === 'T-32') {
                        l.fire('click');
                    }
                });
                setTimeout(function() {
                    var count = 0;
                    st.problemMicroMarkersLayer.eachLayer(function(m) {
                        if (count === 0) {
                            m.openPopup();
                            count++;
                        }
                    });
                }, 400);
            })();
        """
        capture(base, "zoom_block_screen.png", wait_seconds=3.0, eval_js=zoom_script)
    elif mode == "drawer_finished":
        capture(base, "drawer_finished.png", wait_seconds=2.5, eval_js="window.SPT_APP.openActionDrawer('SPT-SKDE-2026-001');")
    elif mode == "drawer_unfinished":
        capture(base, "drawer_unfinished.png", wait_seconds=2.5, eval_js="window.SPT_APP.openActionDrawer('SPT-SKDE-2026-002');")
    elif mode == "drawer":
        capture(base, "action_drawer_screen.png", wait_seconds=2.5, eval_js="window.SPT_APP.openActionDrawer('SPT-SKDE-2026-001');")
