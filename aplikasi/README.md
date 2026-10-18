# Panduan Penggunaan & Pengujian Mockup Mobile SPT (Smart Problem Tagging)

Mockup aplikasi web mobile **Smart Problem Tagging** untuk operasional lapangan perkebunan kelapa sawit PT SMART Tbk (Estate SKDE). Aplikasi ini berfokus pada kecepatan inventarisasi masalah, penguncian koordinat berbasis bukti foto (immutable evidence), dan verifikasi bertahap dua siklus (Assessment & Realisasi).

---

## 1. Akses & URL Aplikasi

Aplikasi mobile disajikan sebagai web mobile statis yang berjalan di atas server lokal:

- **URL Aplikasi Mobile:** [http://localhost:8088/aplikasi/](http://localhost:8088/aplikasi/)
- **URL Dashboard Desktop:** [http://localhost:8088/index.html](http://localhost:8088/index.html)
- **Kredensial Demo Resmi:** `admin_spt` / `SPT2026!`

> **Catatan:** Dashboard control room desktop di root project tetap utuh dan berfungsi penuh tanpa gangguan.

---

## 2. Cara Menguji Tampilan Mobile di Komputer (Chrome / Edge DevTools)

Aplikasi telah dilengkapi dengan **Desktop Frame Wrapper** otomatis (tampilan HP di layar komputer). Namun untuk pengalaman simulasi sentuh terbaik:

1. Buka [http://localhost:8088/aplikasi/](http://localhost:8088/aplikasi/) di browser Chrome atau Edge.
2. Tekan **F12** untuk membuka Developer Tools.
3. Tekan **Ctrl + Shift + M** (atau klik ikon **Toggle Device Toolbar** di pojok kiri atas DevTools).
4. Pilih preset ukuran layar:
   - **iPhone 12/13/14 Pro:** `390 × 844`
   - **Samsung Galaxy / Pixel:** `412 × 915`
5. Atur orientasi ke **Portrait**.
6. Refresh halaman jika diperlukan.

### Menguji Sensor GPS Peramban (Sensors Tab)
Jika ingin menguji geolokasi asli browser:
1. Di DevTools, klik menu **Titik Tiga (⋮) › More tools › Sensors**.
2. Pada bagian *Location*, pilih **Other...** dan masukkan koordinat blok aktual SKDE:
   - **Latitude:** `1.258400`
   - **Longitude:** `116.124500`
3. Aplikasi juga menyediakan tombol **"Simulasi Preset"** bawaan pada layar kamera, sehingga pengujian dapat dilakukan langsung tanpa konfigurasi sensor manual.

---

## 3. Empat Account & Matriks Wewenang

Setelah login, pengguna dapat beralih account demo secara bebas melalui menu **Profil** atau tombol account di header:

| Account | Scope Demo | Tagging Assessment | Verifikasi Assessment | Periksa Realisasi | Verifikasi Akhir Realisasi |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Asisten** | DIVISI 3 | ✅ Buat / Edit / Kirim | ❌ | ✅ Kirim Batch | ❌ |
| **Mandor** | DIVISI 3 | ❌ | ❌ | ✅ Kirim Batch | ❌ |
| **Askep** | SKDE Estate | ❌ (Lihat) | ✅ Setuju / Revisi / Tolak | ❌ (Lihat) | ✅ Sahkan Volume & Tutup |
| **Manager** | SKDE Estate | ❌ (Lihat) | ✅ Setuju / Revisi / Tolak | ❌ (Lihat) | ❌ (Hanya Review) |

---

## 4. Master 16 Masalah Trabas (Satu Sumber Kebenaran)

Aplikasi mengimplementasikan 16 kategori Trabas dengan satuan, sensitivitas, dan simbol presisi:

| ID | Kategori Masalah | Timeframe | Sensitivity | Satuan Resmi | Simbol Pin |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **01** | Pasar Pikul Semak | Short Term | Major | Meter | Pin klasik biru `#268BF2` |
| **02** | Underpruning | Short Term | Major | Pkk | Pin klasik hijau `#008247` |
| **03** | Areal Banjir / Tergenang | Short Term | Major | Ha | Pin klasik abu-abu `#494949` |
| **04** | Titi Panen Kurang / Rusak | Short Term | Major | Unit | Pin klasik indigo `#7861EF` |
| **05** | Piringan Semak | Short Term | Minor | Pkk | Pin klasik orange `#FF6900` |
| **06** | TPH Bermasalah | Short Term | Minor | Ha | Pin klasik pink `#FC387D` |
| **07** | Gawangan Semak | Long Term | Minor | Pkk | Pin klasik purple `#AD3CDB` |
| **08** | Defisiensi Hara | Very Long Term | Major | Ha | Pin klasik merah `#F52424` |
| **09** | Titik Kosong | Very Long Term | Major | Pkk | Pin klasik teal `#20A3A7` |
| **10** | HPT | Very Long Term | Major | Ha | Pin klasik kuning `#FFC315` |
| **11** | Konektiviti Teras / Pasar Pikul | Short Term | Major | Meter | Pin drop biru `#268BF2` |
| **12** | Pokok Abnormal | Very Long Term | Minor | Pkk | Pin drop hijau `#008247` |
| **13** | Semak di Gawangan (Bambu) | Long Term | Minor | Ha | Pin drop abu-abu `#494949` |
| **14** | Semak di Gawangan (Pisang) | Long Term | Minor | Ha | Pin drop indigo `#7861EF` |
| **15** | Gorong-gorong | Short Term | Major / Minor | Unit | Pin drop orange `#FF6900` |
| **16** | Jembatan / Box culvert | Short Term | Major / Minor | Unit | Pin drop pink `#FC387D` |

---

## 5. Enam Skenario Demo Siap Uji (Demo Journeys)

1. **Tagging Assessment Baru (Asisten):**
   - Buka menu Beranda › klik *"1. Tagging Baru (Asisten)"*.
   - Pilih kategori masalah (misal *Piringan Semak*).
   - Buka kamera, jepret foto shutter. Koordinat terkunci pada `1.258400, 116.124500` (Blok S-28).
   - Isi volume & pilih usulan action plan › Submit assessment.
2. **Verifikasi Assessment (Askep / Manager):**
   - Beralih account ke **Askep**.
   - Buka Tugas › Verifikasi Assessment Blok S-29.
   - Pilih *"Minta Revisi"* dan masukkan catatan perbaikan.
   - Beralih ke Asisten untuk mengirim revisi versi baru, lalu Askep dapat menyetujui (*Approved*).
3. **Pemeriksaan Realisasi Bertahap (Asisten / Mandor):**
   - Buka Action Plan *Pasar Pikul Semak 1.000m* (Blok S-28).
   - Perhatikan formula: *Disahkan 600m (60%), Menunggu 250m, Sisa 400m*.
   - Mandor dapat menginput batch pemeriksaan baru hingga batas sisa target.
4. **Pengesahan Realisasi Fisik (Askep):**
   - Buka Tugas › Verifikasi Realisasi.
   - Askep dapat mengesahkan volume terverifikasi ($\le$ volume diajukan) dan menetapkan kondisi masalah (*Sebagian teratasi*).
5. **Penutupan Temuan (Closed):**
   - Jika seluruh action plan selesai dan kondisi dinyatakan *Teratasi Sepenuhnya*, tombol *Tutup Temuan* aktif untuk Askep.
   - Riwayat foto Before vs After dapat ditinjau di halaman Dokumentasi.
6. **Validasi GPS Quality Policy:**
   - Pada layar shutter kamera, ganti preset ke *"Akurasi Buruk >20m"* atau *"Luar Blok"*.
   - Tombol shutter menolak submission dan memberikan instruksi perbaikan sinyal yang jelas.

---

## 6. Daftar Lengkap 23 Rute Aplikasi

| No | Rute | Deskripsi Halaman |
| :---: | :--- | :--- |
| 1 | `#/login` | Autentikasi akun demo |
| 2 | `#/account` (alias `#/persona`) | Pemilihan peran/account demo & scope penugasan |
| 3 | `#/beranda` | Dashboard operasional & quick actions role |
| 4 | `#/blok` | Peta sebaran blok & ringkasan temuan |
| 5 | `#/blok/:key` | Detail poligon blok, perimeter, & daftar titik |
| 6 | `#/assessment/baru` | Wizard inisiasi assessment blok per round |
| 7 | `#/temuan/baru` | Formulir multi-step tagging temuan lapangan |
| 8 | `#/capture` | Viewfinder kamera shutter & penguncian koordinat |
| 9 | `#/temuan/:id` | Detail temuan (Permasalahan, Action, Audit Log) |
| 10 | `#/assessment/:id/review`| Review draft temuan sebelum pengiriman blok |
| 11 | `#/tugas` | Antrean tugas per tahap sesuai account |
| 12 | `#/assessment/:id/verifikasi` | Evaluasi & keputusan verifier per temuan |
| 13 | `#/temuan/:id/revisi` | Formulir perbaikan revisi oleh Asisten |
| 14 | `#/action/:id` | Detail action plan & visualisasi formula realisasi |
| 15 | `#/action/:id/periksa` | Input pemeriksaan fisik & bukti after |
| 16 | `#/realisasi/:id` | Rincian batch pengajuan realisasi |
| 17 | `#/realisasi/:id/verifikasi` | Pengesahan volume terverifikasi oleh Askep |
| 18 | `#/dokumentasi/:id` | Komparasi foto Before vs After |
| 19 | `#/riwayat` | Kronologi seluruh keputusan verifikasi |
| 20 | `#/notifikasi` | Daftar pemberitahuan & pengingat tugas |
| 21 | `#/draft-sinkronisasi` | Antrean sinkronisasi & status penyimpanan lokal |
| 22 | `#/profil` | Info akun, ganti account, reset data demo, logout |
| 23 | `#/bantuan` | Petunjuk teknis, formula, dan tata cara DevTools |
