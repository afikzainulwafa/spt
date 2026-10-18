# Smart Problem Tagging (SPT) — Corporate Control Room Mockup

**Interactive Static Mockup** untuk operasional perkebunan kelapa sawit PT SMART Tbk (Sinarmas corporate-inspired).
Mockup ini digunakan untuk validasi konsep agronomi operasional, demo pemangku kepentingan eksekutif, dan simulasi penelusuran masalah berbasis geospasial.

---

## 1. Setup & Cara Menjalankan

Aplikasi ini dibangun menggunakan arsitektur **front-end statis** (Vanilla HTML5, CSS3, JavaScript murni) tanpa ketergantungan framework runtime, Node server, maupun database backend. Seluruh dependensi (Leaflet JS/CSS) tersimpan secara lokal di folder proyek.

### Cara Menjalankan:

#### Opsi A: Menggunakan Python Local HTTP Server (Direkomendasikan)
Buka terminal di folder project ini dan jalankan:
```bash
python -m http.server 8088
```
Buka peramban (browser) di alamat:
```
http://localhost:8088/index.html#autologin
```
*(atau buka `http://localhost:8088` untuk login manual)*

#### Opsi B: Menggunakan Any Static Local Web Server (VS Code Live Server / npx serve)
```bash
npx -y serve .
```

> [!IMPORTANT]
> Jangan membuka file langsung melalui `file:///index.html` karena pembatasan keamanan browser (CORS) mencegah `fetch('./SKDE.json')`. Gunakan local HTTP server seperti di atas.

---

## 2. Kredensial Akses Mockup

Mockup dilengkapi overlay autentikasi statis berbasis `sessionStorage`:

| Parameter | Nilai Demo |
|---|---|
| **Username** | `admin_spt` |
| **Password** | `SPT2026!` |
| **Penyimpanan Session** | `sessionStorage` (otomatis reset saat browser ditutup) |
| **Status Akses** | `STATIC MOCKUP ACCESS` |

---

## 3. Struktur File Project

```
smartproblemtagging/
├── ANTIGRAVITY_Map_Enhancement_Prompt.md         # Spesifikasi enhancement peta & semantic zoom
├── ANTIGRAVITY_Yield_Projection_Enhancement.md   # Spesifikasi 24-month yield moving & proyeksi SKDE
├── index.html                                    # Single-page layout 7 tab + modal HUD + overlay
├── styles.css                                    # Corporate design system, responsive HUD, pins & charts
├── app.js                                        # Main controller, Leaflet lifecycle, semantic zoom, chart
├── geo_utils.js                                  # Ray-casting point-in-polygon, Mulberry32 PRNG, BBox index
├── yield_service.js                              # Trailing 12-mo yield moving, S-28 easing recovery, provenance
├── data.js                                       # 16 Master problems, BCCR categories, deterministic generator
├── login.js                                      # Authentication controller demo sessionStorage
├── leaflet.js / leaflet.css                      # Leaflet library v1.9.4 lokal (zero external CDN)
├── skde_geojson.js                               # Pre-bundled GeoJSON polygon SKDE (109 blok, 226 fitur)
├── SKDE.json                                     # Raw GeoJSON polygon blok Estate SKDE
├── SKDE.sample.json                              # Fallback sampel GeoJSON
├── scripts/
│   ├── verify_acceptance.py                      # Automated acceptance test suite via Headless Edge CDP
│   └── capture_page.py                           # CDP screenshot capture script
└── README.md                                     # Dokumentasi lengkap
```

---

## 4. Enhancement Peta Geospasial & Semantic Zoom

### A. Semantic Zoom & Viewport Culling
- **Overview Mode (Dashboard / Fullscreen Zoom < 15)**:
  - Setiap blok hanya menampilkan **satu kartu ringkasan** berisi badge ganda `Major n` (merah) dan `Minor n` (amber).
  - Titik mikro individual **TIDAK PERNAH** muncul bersamaan dengan kartu ringkasan.
- **Micro Mode (Fullscreen AND Zoom ≥ 15)**:
  - Kartu ringkasan otomatis dibersihkan.
  - Menampilkan placemark individual dari temuan lapangan yang lolos filter dan berada di dalam viewport aktif (*viewport culling*).
  - Teks label nama blok otomatis muncul saat Zoom ≥ 14.

### B. Master 16 Kategori & Simbol Pin
Bentuk pin dibedakan secara geometris untuk mencegah ambiguitas warna:
- **Pin Klasik (Jarum / Needle)**: IDs 01–10 (Kepala lingkaran + dot putih + jarum vertikal).
- **Pin Drop (Tetesan Air / Teardrop)**: IDs 11–16 (Bentuk teardrop elegan + dot putih).
- Severity cincin pendar: `.major` (pendar merah) vs `.minor` (amber).

### C. Simulasi Tambah Temuan Manual
- Tombol `+ Tambah Temuan` di toolbar HUD fullscreen.
- Kursor berubah menjadi crosshair dengan banner instruksi.
- Klik pada peta divalidasi dengan algoritma **Ray-Casting Point-in-Polygon** terhadap geometri asli GeoJSON (mendukung MultiPolygon dan lubang/holes).
- Titik di luar blok ditolak secara otomatis dengan pesan informatif.
- Titik valid membuka form modal dengan estate/divisi/blok terisi otomatis.
- Data tersimpan di `sessionStorage` dan langsung tersinkronisasi ke marker, counter, dan rekap tanpa reload.
- Tombol `Reset Temuan Manual` tersedia dengan konfirmasi dialog.

### D. Modal Detail BCCR Blok
- Mengklik blok pada Peta BCCR membuka modal komprehensif berisi:
  - Status BCCR YTD (dengan warna kategori standar dan label tier).
  - Gap Produksi (+/- Ton/Ha).
  - Aktual YTD vs Potensi YTD.
  - Luas Areal (Ha), SPH (pkk/ha), Tahun Tanam.
  - Tally temuan masalah operasional (Major/Minor) dan progress action plan.
  - Tombol pintas untuk langsung fokus ke blok tersebut di Peta Sebaran Temuan Masalah.

---

## 5. Yield Moving, Potency, dan Proyeksi SKDE 24 Bulan

### A. Metrik & Trailing 12-Month Moving
- **Timeline 24 Bulan**: Agustus 2025 s/d Juli 2027.
- **Batas Cut-off**: Juli 2026.
- **Yield Actual Moving**: Jumlah yield aktual 12 bulan trailing (Ton/Ha) untuk periode historis (Agu 2025 – Jul 2026).
- **Yield Potency Moving**: Jumlah potensi yield 12 bulan trailing (Ton/Ha) sepanjang 24 bulan.
- **Proyeksi Skenario Easing**: Proyeksi pemulihan pasca cut-off (Agu 2026 – Jul 2027) menuju 100% potensi agronomis.

### B. Reproduksi Eksak Kasus Referensi S-28
- **Luas Blok**: 33,54 Ha (Estate SKDE, Divisi 3, Blok S-28).
- **Potensi Moving**: 29,33 Ton/Ha (Agu 25), stabil di 29,00 Ton/Ha (Des 25 – Jul 27).
- **Aktual Moving**: 20,20 Ton/Ha (Agu 25 sintetis) s/d 26,30 Ton/Ha (Jul 26 sumber, Rasio BCCR = 90,69%).
- **Formula Easing**:
  $$\text{startRatio} = \frac{\text{actualMovingAtCutoff}}{\text{potencyMovingAtCutoff}}$$
  $$u = \min\left(\frac{\text{horizonMonth}}{\text{recoveryMonth}}, 1\right)$$
  $$\text{easing} = 3u^2 - 2u^3$$
  $$\text{projectionRatio} = \text{startRatio} + (1 - \text{startRatio}) \times \text{easing}$$
- **Hasil S-28**: Mencapai tepat 29,00 Ton/Ha (100,00%) pada **Mei 2027** (Bulan proyeksi ke-10), kemudian stabil 100% pada Jun–Jul 2027.

### C. Provenance Tracking (Asal Data)
Setiap titik data bulanan memiliki label provenance yang jujur dan transparan:
- `Sintetis historis`: Data historis estimasi (Agu 2025 – Des 2025).
- `Moving sumber`: Data observasi moving aktual dari referensi (Jan 2026 – Jul 2026).
- `Proyeksi skenario`: Skenario pemulihan agronomis easing (Agu 2026 – Jul 2027).

### D. Agregasi Tertimbang (Area-Weighted Aggregation)
Untuk level Divisi dan Estate, yield dihitung dengan bobot luas areal:
$$\text{aggregateYield}(t) = \frac{\sum (\text{blockYield}(t) \times \text{area})}{\sum \text{area}}$$
$$\text{aggregateBCCR}(t) = 100 \times \frac{\sum (\text{actualMoving}(t) \times \text{area})}{\sum (\text{potencyMoving}(t) \times \text{area})}$$

### E. Fitur Tambahan & Interaktivitas Grafik
- **Mini Outlook Dashboard (Panel 6)**:
  - Header stat strip menampilkan lokasi aktif, angka cut-off aktual vs potensi, dan badge warna BCCR.
  - Grafik SVG 24 bulan dilengkapi titik interaktif dengan tooltip `<title>` berisi detail metrik dan asal data saat di-hover.
- **Toggle Metrik View 4 (Trend Produksi)**:
  - Tombol `Yield Moving (Ton/Ha)`: Skala ton/ha (16–32) dengan garis Potensi, Aktual, dan Proyeksi.
  - Tombol `Rasio BCCR Moving (%)`: Skala persentase (60–110%) dengan garis acuan 100% Target Potensi.
- **Export Data CSV Langsung**:
  - Tombol `Export CSV (24 Bulan)` pada View 4 mengunduh file `.csv` lengkap 24 baris data timeline dan provenance.
  - Tombol `Export Rekap` pada View 2 mengunduh file `.csv` matriks distribusi BCCR.
- **File Referensi & Data Pre-computed**:
  - `production-reference.md`: Catatan acuan normalisasi dan parameter benchmark.
  - `yield-data.json`: Hasil normalisasi 24 bulan untuk seluruh 109 blok SKDE.

## 6. Hasil Pengujian Otomatis (Automated Acceptance Tests)

Suite pengujian end-to-end otomatis tersedia di `scripts/verify_acceptance.py`.
Jalankan melalui command line:
```bash
python scripts/verify_acceptance.py
```

### Hasil Eksekusi Nyata:
```text
1. Navigating to http://localhost:8088/index.html#autologin...
2. Checking Console & Global Objects...
   Status: {
     "hasGeoUtils": true,
     "hasYieldService": true,
     "hasDataStore": true,
     "hasSPTApp": true,
     "masterProblemsCount": 16,
     "skdeGeoJsonLoaded": true,
     "totalBlocksIndexed": 109,
     "allFindingsCount": 509
   }
3. Validating 24-Month Yield Timeline for S-28...
   S-28 Timeline: 24 bulan, Mei 2027 Proj = 29.0 Ton/Ha (100%), Jul 2026 Act = 26.3 Ton/Ha (90.69%) -> LULUS
4. Validating Problem Map Semantic Zoom on Overview...
   Overview: 22 summary badges, 0 micro placemarks -> LULUS
5. Testing Fullscreen Toggle on Problem Map...
   Fullscreen .panel-fullscreen aktif -> LULUS
6. Testing Zoom In to Level 16 (Block Zoom Threshold)...
   Zoom 16: 0 summary badges, 43 micro placemarks (viewport culled) -> LULUS
7. Checking Pin Shape rendering (Classic vs Drop)...
   Rendered Pins: 43 placemarks SVG -> LULUS
8. Testing Zoom Out to Level 13...
   Zoom 13: 22 summary badges, 0 micro placemarks -> LULUS
9. Testing Tambah Temuan Manual workflow...
   Modal terbuka di "SKDE · DIVISI 3 · Blok S-28", submit volume 15, tersimpan 510 total -> LULUS
10. Testing BCCR Detail Modal...
   Modal terbuka menampilkan Capaian BCCR Blok S-28, Gap, Luas, SPH, Action Plan -> LULUS
11. Testing Tab View-Trend (Yield Projection)...
   Tab active-view, SVG chart ter-render, tabel 24 bulan + 24 provenance tags -> LULUS
12. Testing All 7 Tabs Switching...
   Seluruh 7 tab berganti tanpa error -> LULUS
13. Testing Logout and Demo Login...
   Logout menampilkan loginScreen, login admin_spt / SPT2026! berhasil tanpa map collision -> LULUS

==========================================
ALL ACCEPTANCE TESTS PASSED SUCCESSFULLY!!
==========================================
```

---

## 7. Screenshot Hasil Uji Visual

1. **Dashboard Utama & Mini Outlook Chart**:
   ![Dashboard Macro](test_01_dashboard.png)
2. **Fullscreen Problem Map (Overview Summary Badges)**:
   ![Problem Map Fullscreen](test_02_problem_map_fullscreen.png)
3. **Level Blok Zoom 16 (Placemark Individual & Viewport Culling)**:
   ![Problem Map Zoom 16 Pins](test_03_problem_map_zoom16_pins.png)
4. **Trend Produksi 24 Bulan & Tabel Provenance**:
   ![Trend Produksi 24 Bulan](test_04_trend_view.png)
