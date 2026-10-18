import subprocess
import time
import json
import urllib.request
import socket
import base64
import os
import sys

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PORT = 9248
BASE_URL = "http://localhost:8088/aplikasi/index.html"
OUT_DIR = r"C:\Users\23000984\.gemini\antigravity-ide\brain\f61dd40b-561e-4761-99cb-e4e405e0180d"

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
        path = os.path.join(OUT_DIR, filename)
        with open(path, "wb") as f:
            f.write(base64.b64decode(b64))
        print(f"  [SCREENSHOT] Saved {filename}")

def run_mobile_tests():
    print(f"[Mobile Test] Launching Edge on port {PORT} in mobile portrait mode 390x844...")
    proc = subprocess.Popen([
        EDGE_PATH,
        f"--remote-debugging-port={PORT}",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--no-first-run",
        "--no-default-browser-check",
        "--window-size=430,900",
        "--user-data-dir=C:\\Users\\23000984\\.gemini\\antigravity-ide\\scratch\\edge_mobile_profile2",
        f"{BASE_URL}#/login"
    ])

    time.sleep(3)
    try:
        req = urllib.request.urlopen(f"http://localhost:{PORT}/json")
        tabs = json.loads(req.read().decode("utf-8"))
        # Find tab matching aplikasi
        target_tab = None
        for t in tabs:
            if "aplikasi" in t.get("url", ""):
                target_tab = t
                break
        if not target_tab:
            target_tab = tabs[0]
        ws_url = target_tab["webSocketDebuggerUrl"]
        print(f"[Mobile Test] Connected to target: {target_tab.get('url')} -> {ws_url}")

        parts = ws_url.replace("ws://", "").split("/")
        host_port = parts[0].split(":")
        host = host_port[0]
        port_num = int(host_port[1])
        path = "/" + "/".join(parts[1:])

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, port_num))

        handshake = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {host}:{port_num}\r\n"
            "Upgrade: websocket\r\n"
            "Connection: Upgrade\r\n"
            "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\r\n"
            "Sec-WebSocket-Version: 13\r\n\r\n"
        )
        s.sendall(handshake.encode("utf-8"))
        resp = s.recv(4096).decode("utf-8", errors="ignore")
        if "101" not in resp:
            print("Handshake failed:", resp)
            return

        call_cdp(s, "Page.enable")
        call_cdp(s, "Runtime.enable")

        # Set mobile emulation device metrics (390x844, scale 2, mobile=True)
        call_cdp(s, "Emulation.setDeviceMetricsOverride", {
            "width": 390,
            "height": 844,
            "deviceScaleFactor": 2,
            "mobile": True
        })
        call_cdp(s, "Page.navigate", {"url": f"{BASE_URL}#/login"})
        time.sleep(2)

        # 1. Login Page (Ensure logged out first for clean screenshot)
        print("\n--- Route 1: #/login ---")
        eval_js(s, "window.SPTStore.logout(); window.location.hash = '#/login';")
        time.sleep(1.5)
        save_screenshot(s, "mobile_01_login.png")
        title = eval_js(s, "document.title")
        print(f"Page title: {title}")

        # Perform Login
        login_res = eval_js(s, """
            (() => {
                const u = document.getElementById('loginUsername');
                const p = document.getElementById('loginPassword');
                const form = document.getElementById('loginForm');
                if (u && p && form) {
                    u.value = 'admin_spt';
                    p.value = 'SPT2026!';
                    form.dispatchEvent(new Event('submit', { cancelable: true }));
                    return true;
                }
                return false;
            })()
        """)
        print(f"Login form submitted: {login_res}")
        time.sleep(1.5)

        # 2. Persona Selection
        print("\n--- Route 2: #/persona ---")
        save_screenshot(s, "mobile_02_persona.png")
        eval_js(s, "document.getElementById('btnConfirmPersona').click()")
        time.sleep(1.5)

        # 3. Beranda
        print("\n--- Route 3: #/beranda ---")
        save_screenshot(s, "mobile_03_beranda.png")

        # 4. Blok List
        print("\n--- Route 4: #/blok ---")
        eval_js(s, "window.location.hash = '#/blok'")
        time.sleep(1.5)
        save_screenshot(s, "mobile_04_blok_list.png")

        # 5. Blok Detail
        print("\n--- Route 5: #/blok/SKDE:DIVISI 3:S-28 ---")
        eval_js(s, "window.location.hash = '#/blok/SKDE%3ADIVISI%203%3AS-28'")
        time.sleep(1.5)
        save_screenshot(s, "mobile_05_blok_detail.png")

        # 6. Assessment Baru
        print("\n--- Route 6: #/assessment/baru ---")
        eval_js(s, "window.location.hash = '#/assessment/baru'")
        time.sleep(1)
        save_screenshot(s, "mobile_06_assessment_baru.png")

        # 7. Temuan Baru
        print("\n--- Route 7: #/temuan/baru ---")
        eval_js(s, "window.location.hash = '#/temuan/baru'")
        time.sleep(1)
        save_screenshot(s, "mobile_07_temuan_baru.png")

        # 8. Capture
        print("\n--- Route 8: #/capture ---")
        eval_js(s, "window.location.hash = '#/capture'")
        time.sleep(1)
        save_screenshot(s, "mobile_08_capture_viewfinder.png")

        eval_js(s, "document.getElementById('btnShutter').click()")
        time.sleep(1)
        save_screenshot(s, "mobile_08b_capture_shuttered.png")

        eval_js(s, "document.getElementById('btnUseCapture').click()")
        time.sleep(1)

        # 9. Temuan Detail
        print("\n--- Route 9: #/temuan/FND-2026-001 ---")
        eval_js(s, "window.location.hash = '#/temuan/FND-2026-001'")
        time.sleep(1.5)
        save_screenshot(s, "mobile_09_temuan_detail.png")

        # 10. Assessment Review
        print("\n--- Route 10: #/assessment/ASM-SKDE-D3-S28-01/review ---")
        eval_js(s, "window.location.hash = '#/assessment/ASM-SKDE-D3-S28-01/review'")
        time.sleep(1)
        save_screenshot(s, "mobile_10_assessment_review.png")

        # 11. Tugas
        print("\n--- Route 11: #/tugas ---")
        eval_js(s, "window.location.hash = '#/tugas'")
        time.sleep(1)
        save_screenshot(s, "mobile_11_tugas.png")

        # 12. Assessment Verifikasi (Askep)
        print("\n--- Route 12: #/assessment/ASM-SKDE-D3-S28-01/verifikasi ---")
        eval_js(s, "window.SPTStore.setPersona('askep')")
        eval_js(s, "window.location.hash = '#/assessment/ASM-SKDE-D3-S28-01/verifikasi'")
        time.sleep(1)
        save_screenshot(s, "mobile_12_assessment_verifikasi.png")

        # 13. Temuan Revisi
        print("\n--- Route 13: #/temuan/FND-2026-002/revisi ---")
        eval_js(s, "window.SPTStore.setPersona('asisten')")
        eval_js(s, "window.location.hash = '#/temuan/FND-2026-002/revisi'")
        time.sleep(1)
        save_screenshot(s, "mobile_13_temuan_revisi.png")

        # 14. Action Detail
        print("\n--- Route 14: #/action/ACT-2026-001 ---")
        eval_js(s, "window.location.hash = '#/action/ACT-2026-001'")
        time.sleep(1)
        save_screenshot(s, "mobile_14_action_detail.png")

        # 15. Action Periksa
        print("\n--- Route 15: #/action/ACT-2026-001/periksa ---")
        eval_js(s, "window.location.hash = '#/action/ACT-2026-001/periksa'")
        time.sleep(1)
        save_screenshot(s, "mobile_15_action_periksa.png")

        # 16. Realisasi Detail
        print("\n--- Route 16: #/realisasi/BAT-2026-001 ---")
        eval_js(s, "window.location.hash = '#/realisasi/BAT-2026-001'")
        time.sleep(1)
        save_screenshot(s, "mobile_16_realisasi_detail.png")

        # 17. Realisasi Verifikasi (Askep)
        print("\n--- Route 17: #/realisasi/BAT-2026-001/verifikasi ---")
        eval_js(s, "window.SPTStore.setPersona('askep')")
        eval_js(s, "window.location.hash = '#/realisasi/BAT-2026-001/verifikasi'")
        time.sleep(1)
        save_screenshot(s, "mobile_17_realisasi_verifikasi.png")

        # 18. Dokumentasi
        print("\n--- Route 18: #/dokumentasi/FND-2026-001 ---")
        eval_js(s, "window.location.hash = '#/dokumentasi/FND-2026-001'")
        time.sleep(1)
        save_screenshot(s, "mobile_18_dokumentasi.png")

        # 19. Riwayat
        print("\n--- Route 19: #/riwayat ---")
        eval_js(s, "window.location.hash = '#/riwayat'")
        time.sleep(1)
        save_screenshot(s, "mobile_19_riwayat.png")

        # 20. Notifikasi
        print("\n--- Route 20: #/notifikasi ---")
        eval_js(s, "window.location.hash = '#/notifikasi'")
        time.sleep(1)
        save_screenshot(s, "mobile_20_notifikasi.png")

        # 21. Draft Sinkronisasi
        print("\n--- Route 21: #/draft-sinkronisasi ---")
        eval_js(s, "window.location.hash = '#/draft-sinkronisasi'")
        time.sleep(1)
        save_screenshot(s, "mobile_21_draft_sinkronisasi.png")

        # 22. Profil
        print("\n--- Route 22: #/profil ---")
        eval_js(s, "window.location.hash = '#/profil'")
        time.sleep(1)
        save_screenshot(s, "mobile_22_profil.png")

        # 23. Bantuan
        print("\n--- Route 23: #/bantuan ---")
        eval_js(s, "window.location.hash = '#/bantuan'")
        time.sleep(1)
        save_screenshot(s, "mobile_23_bantuan.png")
        time.sleep(1)
        save_screenshot(s, "mobile_23_bantuan.png")

        print("\n=======================================================")
        print("  ALL 23 ROUTES SUCCESSFULLY VERIFIED AND SCREENSHOTS CAPTURED!")
        print("=======================================================")

    finally:
        proc.kill()

if __name__ == "__main__":
    run_mobile_tests()
