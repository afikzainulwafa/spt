# Prompt untuk Antigravity

Bangun sebuah **static interactive mockup** bernama **Smart Problem Tagging** untuk operasional perkebunan kelapa sawit. Jangan gunakan nama “Smart Agriculture”. Mockup ini dipakai untuk validasi konsep dan presentasi internal, bukan production system.

## 1. Target dan teknologi

- Buat sebagai static front-end yang bisa dijalankan secara lokal.
- Gunakan HTML, CSS, dan JavaScript biasa atau Vite vanilla JavaScript. Jangan membutuhkan backend atau database.
- Gunakan Leaflet untuk peta.
- Gunakan Google Satellite basemap dengan URL:
  `https://mt0.google.com/vt/lyrs=s&hl=id&x={x}&y={y}&z={z}`
- Simpan dependency Leaflet secara lokal di project. Jangan bergantung pada CDN untuk file Leaflet JS/CSS.
- Buat data produksi, BCCR, masalah, progress, dan action plan sebagai realistic dummy data yang terpusat di satu file/module agar mudah diganti.
- Semua angka dummy harus diberi keterangan `Data contoh` atau `Mockup`.
- Website harus responsive, tetapi desain desktop 1366×768 menjadi prioritas.
- Dashboard utama harus muat dalam satu viewport desktop tanpa vertical scrolling. Halaman detail boleh memiliki internal scroll pada tabel.

## 2. Struktur file dan GeoJSON

Saya akan meletakkan file bernama **`SKDE.json`** dalam folder yang sama dengan `index.html` atau pada folder `public/` bila memakai Vite. Jangan hard-code geometry blok ke JavaScript.

File memiliki wrapper berikut:

```js
const response = await fetch('./SKDE.json');
const payload = await response.json();
const geojson = payload.data ?? payload;
```

Setiap feature mempunyai properties:

- `estate`: contoh `SKDE`
- `divisi`: contoh `DIVISI 3`
- `blok`: contoh `T-32`

Gunakan properties tersebut untuk filter Estate → Divisi → Blok. Isi dropdown harus dibentuk secara dinamis dari GeoJSON. Abaikan feature dengan nilai blok kosong atau `-` pada pilihan blok, tetapi geometry-nya boleh tetap ditampilkan sebagai konteks jika diperlukan.

PENTING: jangan menjalankan seluruh render aplikasi setelah GeoJSON berhasil. Render KPI, tabel, chart, dan shell UI terlebih dahulu. Muat peta secara terpisah dalam `try/catch`. Jika GeoJSON gagal dimuat, dashboard selain peta harus tetap berfungsi dan tampilkan pesan `GeoJSON SKDE belum dapat dimuat` di area peta. Jika Google tile gagal, polygon GeoJSON harus tetap terlihat di atas background netral.

## 3. Akses mockup

Buat halaman/login overlay static dengan satu akun:

- Username: `admin_spt`
- Password: `SPT2026!`

Ketentuan:

- Setelah login berhasil, simpan status session mockup di `sessionStorage`, bukan `localStorage`.
- Tambahkan tombol `Keluar` yang menghapus session dan kembali ke login.
- Tampilkan label jelas `STATIC MOCKUP ACCESS` pada login.
- Jangan menyebut login ini aman atau production-ready.
- Tambahkan komentar di source bahwa kredensial front-end dapat dilihat pengguna dan harus diganti dengan autentikasi backend/SSO pada production.
- Jangan membuat fitur registrasi, lupa password, OTP, atau role management.

## 4. Identitas visual

- Gunakan gaya corporate Sinarmas-inspired tanpa menyalin aset/logo berhak cipta yang tidak disediakan.
- Warna utama: merah korporat `#C90016` dan dark red `#A80014`.
- Background: off-white/grey `#F4F5F7`.
- Card: putih dengan border abu tipis, radius 6–8 px, shadow sangat ringan.
- Typography: Manrope untuk heading dan DM Sans/Inter untuk UI.
- Jangan dominan hijau. Hijau hanya untuk status positif dan range BCCR.
- Buat sidebar merah di kiri dan header putih yang compact.
- Hindari dashboard yang terlihat seperti template generik: gunakan hierarchy tegas, data density yang rapi, label unit jelas, dan spacing konsisten.

## 5. Global navigation dan filter

Sidebar harus memiliki menu:

1. Dashboard
2. Rekap BCCR
3. Action Plan
4. Trend Produksi
5. Analisa BCCR
6. Rekap Divisi
7. Dokumentasi
8. Keluar

Header setiap halaman memuat cascading filter:

- Estate
- Divisi
- Blok
- Periode/cut-off

Semua card, tabel, chart, dan peta harus merespons filter yang sama. Klik polygon blok pada peta juga harus mengubah filter Blok dan memperbarui komponen lain.

## 6. Dashboard utama — satu viewport

Susun dashboard utama sebagai control room ringkas dengan empat KPI di atas:

1. BCCR YTD: persentase aktual terhadap potency.
2. Produksi aktual YTD dalam ton/ha dan potency YTD.
3. Temuan aktif dan jumlah overdue.
4. Realisasi action plan yang telah selesai terverifikasi.

Di bawah KPI tampilkan:

- **Peta BCCR per blok** menggunakan polygon SKDE dan range warna resmi.
- **Action plan prioritas**, berupa ranked horizontal progress bar.
- **YPH YTD comparison** untuk tiga tahun pada cut-off bulan yang sama.
- **Peta masalah**, memakai polygon SKDE dan pin kategori.
- **Daftar masalah utama**, diurutkan berdasarkan Major, overdue, dan dampak.
- **Mini production outlook**, 12 bulan historis + 12 bulan proyeksi.

Dashboard tidak boleh membutuhkan scroll vertikal pada desktop 1366×768. Gunakan ukuran label minimal 12 px untuk metadata dan 14 px untuk informasi operasional penting.

## 7. Standar range BCCR

Gunakan tepat range berikut untuk warna polygon:

| BCCR | Warna |
|---|---|
| `<60%` | Merah `#FF0000` |
| `60–<70%` | Oranye `#FF9900` |
| `70–<80%` | Kuning `#FFCC00` |
| `80–<90%` | Hijau muda `#99CC00` |
| `90–<100%` | Hijau `#339966` |
| `≥100%` | Hijau tua `#009900` |
| Tidak ada data | Abu-abu `#A4A8AC` |

Nilai polygon = `actual YTD / potency YTD × 100%`. Popup polygon berisi Estate, Divisi, Blok, actual YTD, potency YTD, BCCR, production gap, jumlah masalah aktif, dan action plan progress.

## 8. Master problem dan action plan

Gunakan hanya 16 problem master berikut. Jangan menambahkan problem lain ke mockup ini.

| Problem | Unit | Sensitivity | Timeframe | Action Plan |
|---|---|---|---|---|
| Pasar Pikul Semak | Meter | Major | Short Term | Semprot pasar pikul |
| Underpruning | Pkk | Major | Short Term | Penambahan HK pruning; Borongan |
| Areal Banjir / Tergenang | Ha | Major | Short Term | Pembuatan bendungan/tanggul; Individual Bund/Pungguhan; Pembuatan/Cuci Parit; Continuous bund |
| Titi Panen Kurang / Rusak | Unit | Major | Short Term | Penambahan Titi Panen |
| Piringan Semak | Pkk | Minor | Short Term | Semprot Piringan |
| TPH Bermasalah | Ha | Minor | Short Term | Semprot TPH |
| Gawangan Semak | Pkk | Minor | Long Term | Semprot Gawangan |
| Defisiensi Hara | Ha | Major | Very Long Term | Semprot Defisiensi |
| Titik Kosong | Pkk | Major | Very Long Term | Penyisipan |
| HPT | Ha | Major | Very Long Term | Pengendalian HPT |
| Konektiviti Teras / Pasar Pikul | Meter | Major | Short Term | Perbaikan Akses Teras / Pasar Pikul |
| Pokok Abnormal | Pkk | Minor | Very Long Term | Tumbang Pokok Abnormal |
| Semak di Gawangan (Bambu) | Ha | Minor | Long Term | Pengendalian Chemist |
| Semak di Gawangan (Pisang) | Ha | Minor | Long Term | Pengendalian Chemist |
| Gorong-gorong | Unit | Major / Minor | Short Term | Pemasangan Gorong-gorong |
| Jembatan / Box culvert | Unit | Major / Minor | Short Term | Pemasangan Jembatan |

Untuk kategori Major / Minor, tentukan sensitivity per temuan pada dummy data. Warna pin boleh mengikuti master simbol kategori, tetapi jangan gunakan warna pin sebagai status. Status ditampilkan dengan badge terpisah.

Progress setiap kategori harus dihitung berdasarkan unit yang sama:

`progress = volume selesai terverifikasi / volume terinventarisir × 100%`

Jangan menjumlahkan Meter, Pkk, Ha, dan Unit menjadi satu volume. KPI overall dapat memakai weighted completion atau persentase jumlah temuan selesai, tetapi rumusnya harus ditulis pada tooltip.

## 9. Page: Rekap BCCR

Tampilkan tabel bulanan dengan baris enam range BCCR dan kolom 12–14 bulan. Isi setiap cell adalah jumlah blok pada range tersebut. Tambahkan:

- Total blok.
- U80: jumlah dan persentase blok dengan BCCR <80%.
- A80: jumlah dan persentase blok dengan BCCR ≥80%.
- Sticky header dan first column.
- Export/print button dummy dengan toast `Fitur mockup`.
- Klik cell memfilter daftar blok terkait.

## 10. Page: Monitoring Action Plan

Tabel harus memuat:

- ID temuan
- Estate / Divisi / Blok
- Problem
- Action plan terpilih
- Sensitivity
- Timeframe
- Volume inventarisasi + unit
- Target volume
- Realisasi terverifikasi
- Progress
- PIC
- Tanggal identifikasi
- Target selesai
- Status: Belum Ditangani, Dalam Pengerjaan, Menunggu Verifikasi, Selesai
- Overdue

Sediakan filter Problem, Action, Sensitivity, Timeframe, Status, PIC, dan Overdue. Klik baris membuka side drawer berisi detail, foto, riwayat status, serta catatan verifikator.

## 11. Page: Trend Produksi

Tampilkan satu timeline kontinu 24 bulan:

- 12 bulan ke belakang: Actual solid merah + Potency dashed abu-abu.
- Garis vertikal `Current Cut-off`.
- 12 bulan ke depan: Projection solid oranye + Potency dashed abu-abu.
- Tambahkan toggle Monthly, Rolling 3M, dan Cumulative YTD.
- Tooltip menampilkan bulan, actual, potency, projection, gap, serta BCCR.
- Beri label bahwa projection adalah data ilustratif dan belum merupakan model agronomis tervalidasi.

Definisi harus konsisten:

- Actual = produksi terealisasi.
- Potency = potensi agronomis.
- Projection = estimasi berdasarkan kondisi saat ini.
- Target = komitmen manajemen jika tersedia.

## 12. Page: Detail Analisa BCCR

Buat dense analytical table per blok yang tetap mudah dibaca. Kolom minimal:

- Divisi, Blok, Luas Ha, Tahun Tanam.
- BCCR aktual %, actual ton/ha, gap JJG/rotasi.
- Rotasi 1–4: JJG, ton, sisa.
- Month-to-date: JJG, ton, ton/ha.
- Estimasi BCCR %, ton/ha, range color.
- Trend arrow dan gap terhadap estimasi.

Gunakan sticky multi-level header, freeze kolom Divisi dan Blok, serta conditional formatting mengikuti range BCCR.

## 13. Page: Rekap Analisa Pekerjaan per Divisi

Tampilkan:

- Grouped bar chart budget YTD versus actual YTD per divisi.
- Action plan completion per divisi.
- Open problem, overdue, dan estimated production gap.
- Tabel ringkas prioritas divisi.
- Klik divisi melakukan drill-down ke daftar blok.

## 14. Page: Dokumentasi Sebelum–Sesudah

Tampilkan dua foto besar berdampingan:

- Sebelum
- Sesudah

Di bawahnya tampilkan Estate, Divisi, Blok, kategori, action, tanggal identifikasi, tanggal follow-up, PIC, status verifikasi, dan catatan. Tambahkan tombol Previous/Next untuk berpindah dokumentasi dan placeholder yang rapi apabila foto belum tersedia.

## 15. Interaction dan robustness

- Seluruh navigasi harus berfungsi tanpa reload penuh.
- Update URL hash agar halaman dapat dibookmark, contoh `#action-plan`.
- Sediakan loading state khusus peta, empty state, dan error state.
- Jangan gunakan satu global `try/catch` yang membuat seluruh aplikasi gagal bila satu widget error.
- Error pada chart tidak boleh menghilangkan tabel.
- Error pada Google tile tidak boleh menghilangkan polygon.
- Error pada GeoJSON tidak boleh menghilangkan KPI dan dummy data.
- Hindari race condition saat mengganti filter sebelum peta selesai dimuat.
- Panggil `map.invalidateSize()` setelah kembali ke dashboard atau membuka tab peta.
- Lakukan validasi bahwa GeoJSON merupakan FeatureCollection dan memiliki properties estate/divisi/blok.

## 16. Acceptance criteria

Mockup dianggap selesai bila:

1. Login static bekerja menggunakan satu akun demo dan logout mengakhiri session.
2. Dashboard utama muat satu viewport desktop.
3. Semua tujuh menu membuka page yang benar.
4. `SKDE.json` terbaca dari folder project tanpa geometry hard-coded.
5. Filter Divisi dan Blok dibuat dari GeoJSON serta saling terhubung.
6. Polygon memiliki warna sesuai range BCCR dan popup informatif.
7. Pin problem dan popup dapat diklik.
8. Semua tabel, chart, KPI, dan list tetap muncul ketika peta atau basemap gagal.
9. Seluruh 16 problem dan action plan sesuai master di atas.
10. Tidak ada penyebutan “Smart Agriculture”.
11. Tidak ada unresolved placeholder, broken button, atau blank card.
12. Source diberi komentar singkat untuk mengganti dummy data dengan API pada tahap berikutnya.

## 17. Output yang diminta dari Antigravity

Berikan:

- Seluruh source code project yang dapat langsung dijalankan.
- `README.md` berisi setup, struktur data, akun mockup, dan troubleshooting.
- Sample `SKDE.sample.json` kecil untuk fallback development; jangan menimpa `SKDE.json` milik saya.
- Daftar file yang dibuat atau diubah.
- Checklist acceptance criteria dan hasil pengecekan.
- Jangan hanya membuat screenshot; hasil harus berupa interactive static website.
