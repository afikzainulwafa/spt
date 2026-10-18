import subprocess
import time
import json
import urllib.request
import socket
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PORT = 9253

def run():
    proc = subprocess.Popen([
        EDGE_PATH, f"--remote-debugging-port={PORT}", "--headless=new", "--disable-gpu", "--no-sandbox",
        "--no-first-run", "--no-default-browser-check",
        "--user-data-dir=C:\\Users\\23000984\\.gemini\\antigravity-ide\\scratch\\edge_diag2",
        "http://localhost:8088/aplikasi/index.html"
    ])
    time.sleep(3)
    try:
        req = urllib.request.urlopen(f"http://localhost:{PORT}/json")
        tabs = json.loads(req.read().decode("utf-8"))
        target = [t for t in tabs if "aplikasi" in t.get("url", "")][0]
        ws_url = target["webSocketDebuggerUrl"]
        parts = ws_url.replace("ws://", "").split("/")
        host, port = parts[0].split(":")
        path = "/" + "/".join(parts[1:])

        import verify_mobile_app as v
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, int(port)))
        s.sendall(f"GET {path} HTTP/1.1\r\nHost: {host}:{port}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\nSec-WebSocket-Version: 13\r\n\r\n".encode("utf-8"))
        resp = s.recv(4096).decode("utf-8", errors="ignore")

        v.call_cdp(s, "Runtime.enable")
        v.call_cdp(s, "Log.enable")
        print("typeof window.SPTApp =>", v.eval_js(s, "typeof window.SPTApp"))


        # Run handleRoute and inspect errors
        res = v.call_cdp(s, "Runtime.evaluate", {
            "expression": """
                (() => {
                    try {
                        const hash = window.location.hash || '#/beranda';
                        window.location.hash = hash;
                        // Check if container exists
                        const c = document.getElementById('appContentContainer');
                        return { hash, containerExists: !!c, contentLen: c ? c.innerHTML.length : 0 };
                    } catch (e) {
                        return { error: e.toString(), stack: e.stack };
                    }
                })()
            """,
            "returnByValue": True
        })
        print("Test container:", res.get("result", {}).get("result", {}).get("value"))

        res2 = v.call_cdp(s, "Runtime.evaluate", {
            "expression": """
                (() => {
                    try {
                        window.SPTApp.handleRoute();
                        const c = document.getElementById('appContentContainer');
                        return { ok: true, contentLen: c ? c.innerHTML.length : 0, snippet: c ? c.innerHTML.slice(0, 100) : '' };
                    } catch (e) {
                        return { ok: false, error: e.toString(), stack: e.stack };
                    }
                })()
            """,
            "returnByValue": True
        })
        print("Direct call to SPTApp.handleRoute:", res2.get("result", {}).get("result", {}).get("value"))

    finally:
        proc.kill()

if __name__ == "__main__":
    run()
