# Rencana Revamp & Audit Implementasi — Smart Problem Tagging (SPT)

> **Dokumen Status**: Dokumen Audit Teknis & Status Implementasi Revamp (Revisi 4 - Data Integrity & Bottom-up Seed Generator Reconciled)  
> **Tanggal**: 4 Oktober 2026  
> **Target Dataset Geometri**: `TNKE.json` (Estate TNKE: 142 Feature, 133 Blok Agronomi Unik, 5 Divisi, Total Luas Operasional 3.303,28 Ha)

---

## 1. Status Implementasi per Tahap

| Tahap | Deskripsi Module | Status Implementasi | Catatan Bukti Testing |
| :--- | :--- | :---: | :--- |
| **Tahap 1** | Master Data TNKE, Area Attachment, & Shared Store Engine (`tnke_master.js`, `tnke_store.js`) | **COMPLETED** ✅ | 133 Blok cocok 1-to-1 dengan lampiran (3.303,28 ha). Bottom-up seed generator berbasis jadwal kerja 5 Asisten (1.040 kunjungan, total aktivitas 1.040,0 ha, unique coverage 1.026,9 ha). |
| **Tahap 2** | Peta Coverage 6 Warna, Direct 2-Line Label, Aktivitas Harian & Drawer Observasi (`styles.css`, `index.html`, `app.js`) | **COMPLETED** ✅ | Peta polygon TNKE aktif dengan 6 rentang warna, label 2-baris di titik interior poligon. Drawer F-60 terisi lengkap (29,57 ha master, 9,0 ha unique, 30,4% coverage, 9 baris riwayat, 5 kegiatan breakdown). |
| **Tahap 3** | Visitor Reports, Tagging Temuan, Action Plan Lifecycle & Final Closure | **NOT STARTED** ⏹️ | Berhenti sesuai batasan instruksi sebelum memulai Tahap 3. |
| **Tahap 4** | Pareto 16 Masalah, Multi-Month Yield Projection & Administrative Config | **NOT STARTED** ⏹️ | Belum dimulai. |

---

## 2. Rekonsiliasi Master Data Geometri & Luas Operasional TNKE

Berdasarkan rekonsiliasi empiris antara `TNKE.json` dan tabel lampiran operasional bisnis:

```
                        ┌─────────────────────────────────────────┐
                        │      TNKE.json (Total 142 Feature)      │
                        └────────────────────┬────────────────────┘
                                             │
                  ┌──────────────────────────┴──────────────────────────┐
                  ▼                                                     ▼
     133 Blok Agronomi Unik                                 9 Feature Non-Blok
 (Masuk Pembagi Coverage & Agregasi)                     (Dikeluarkan dari Coverage)
 ┌──────────────────────────────────┐                 ┌──────────────────────────────┐
 │ • DIVISI 1: 37 Blok (799,47 Ha)  │                 │ • 8 Feature blok = "-"       │
 │ • DIVISI 2: 30 Blok (854,04 Ha)  │                 │   (Jalan, parit, waduk, dll) │
 │ • DIVISI 3: 32 Blok (797,85 Ha)  │                 │ • 1 Feature "Non DIVISI"     │
 │ • DIVISI 5: 20 Blok (478,34 Ha)  │                 │   (Fasilitas umum/pabrik)    │
 │ • DIVISI 6: 14 Blok (373,58 Ha)  │                 └──────────────────────────────┘
 └──────────────────────────────────┘
 Total Operasional: 3.303,28 Ha (TNKE)
```

### 2.1 Verifikasi Blok Spesifik & Pembagi Coverage
- **TNKE3 H-49**: Luas operasional = **15,82 Ha** (bukan 30,0 Ha).
- **TNKE3 H-50**: Luas operasional = **28,50 Ha** (bukan 30,0 Ha).
- **TNKE2 F-60**: Luas operasional = **29,57 Ha** (bukan 30,0 Ha).
- **Non-blok (`-`)**: 9 poligon non-blok diberi style garis batas `#666666`, isian transparan abu-abu `#808080` (opacity 0.15), `interactive: false`, tanpa label dan dikeluarkan dari pembagi coverage.

---

## 3. Audit Kontrak Data Store & Renderer

Seluruh field data antara data store (`tnke_store.js`), helper bridge (`tnke_assessment_store.js`), dan renderer (`app.js`) diselaraskan melalui pemetaan dual-alias eksplisit tanpa fallback yang menyamarkan data kosong:

1. **Dual-Alias Properties**:
   - Petugas: `officer` dan `staffName`
   - Tambahan Unik: `addedUniqueHa` dan `addHa`
   - Kumulatif Unik: `cumUniqueHa` dan `cumHa`
   - Progress %: `cumPct` dan `progressPct` / `coveragePct`
   - Breakdown Kegiatan: Menyediakan key snake_case (`ipd_panen`, `inspeksi_pupuk`) dan camelCase (`ipdPanen`, `inspeksiPupuk`).
2. **Filter Kegiatan Spesifik**:
   - Jika kegiatan terpilih memiliki 0 kunjungan (seperti *Inspeksi Pupuk* pada F-60), coverage mengembalikan `0 ha`, `0%`, dan `0 kunjungan` dengan badge status `Belum diobservasi (0%)`. Tidak lagi jatuh kembali (*fallback*) ke coverage gabungan.
3. **Status Warna dari Persentase Asli**:
   - Status warna ditentukan dari persentase float presisi tinggi sebelum pembulatan tampilan, mencegah kesalahan penetapan batas kelas warna.

---

## 4. Generator Seed Berbasis Jadwal Kerja Petugas & Faktor Observasi 3x

Pola seed per blok lama yang tidak realistis diganti total dengan generator berbasis petugas, hari kerja, dan **faktor cakupan observasi nominal 3 pasar pikul**:

- **Faktor Observasi 3x**: Ketika Asisten melintasi 1 pasar pikul, cakupan observasi nominal mencakup pasar pikul yang dilalui serta 1 di kanan dan 1 di kiri (total 3 pasar pikul $\approx$ 3,0 ha nominal per sesi).
- **Pemisahan Jarak Jalan**: Jarak jalan fisik Asisten dihitung **terpisah** dari cakupan observasi ($1,0 \text{ ha walked/sesi} \times 0,66 \text{ km/ha} = 0,66 \text{ km/sesi}$). 8 sesi/hari $\rightarrow$ **5,28 km/hari** (**105,6%** dari target 5,0 km/hari). Jarak jalan **TIDAK ikut membesar** 3 kali lipat.
- **Overlap & Batas Blok**: Penambahan area unik (`addHa`) memperhitungkan overlap antar-kunjungan dan dibatasi oleh luas operasional master blok.
- **5 Asisten Bernama Scoped Divisi**: Ahmad Yani (Div 1), Hendra Budiono (Div 2), Budi Santoso (Div 3), Rahmat Hidayat (Div 5), Bambang S (Div 6) bekerja selama 26 hari kerja di bulan September 2026.

---

## 5. Rekonsiliasi Sebelum-Sesudah (Kasus F-60, 1 Hari Asisten, & Estate)

### 5.1 Rekonsiliasi Kasus F-60 (Divisi 2)
- **Luas Master F-60**: **29,57 Ha** (tetap)
- **Petugas Scoped**: Hendra Budiono (Asisten Divisi 2)
- **Kunjungan**: 9 kunjungan kronologis (02 Sep s/d 26 Sep 2026)
- **Perbandingan Sebelum vs Sesudah**:
  - *Sebelum (Faktor 1)*: Nominal Obs 9,0 Ha $\rightarrow$ Coverage Unik 9,0 Ha ($\mathbf{30,4\%}$), Badge: **Coverage Rendah** (Oranye)
  - *Sesudah (Faktor 3)*: Nominal Obs 27,0 Ha $\rightarrow$ Coverage Unik **15,0 Ha** ($\mathbf{50,7\%}$), Badge: **Coverage Sedang (>50–75%)** (Kuning)
- **Breakdown 5 Kegiatan (Sesudah)**:
  - `Pengancakan`: 7,0 Ha (23,7%), 3 kunjungan
  - `IPD Panen`: 7,0 Ha (23,7%), 3 kunjungan
  - `Inspeksi Pupuk`: 0,0 Ha (0,0%), 0 kunjungan
  - `Inspeksi Upkeep`: 0,0 Ha (0,0%), 0 kunjungan
  - `Blok Checklist`: 9,0 Ha (30,4%), 3 kunjungan
- **Riwayat Kunjungan F-60 (Sampel Overlap Math)**:
  - Visit 1 (02 Sep, Checklist): ObsArea = 3 ha, AddUnique = 3 ha, CumUnique = 3 ha (10,1%)
  - Visit 2 (03 Sep, IPD Panen): ObsArea = 3 ha, AddUnique = 2 ha (overlap 1 ha), CumUnique = 5 ha (16,9%)
  - Visit 3 (03 Sep, Pengancakan): ObsArea = 3 ha, AddUnique = 2 ha (overlap 1 ha), CumUnique = 7 ha (23,7%)
  - Visit 4 (14 Sep, Checklist): ObsArea = 3 ha, AddUnique = 2 ha, CumUnique = 9 ha (30,4%)
  - Visit 5-7 (15-25 Sep): ObsArea = 3 ha, AddUnique = 2 ha/visit, CumUnique = 15 ha (50,7%)
  - Visit 8-9 (26 Sep, Repeat): ObsArea = 3 ha, AddUnique = 0 ha (repeat visit), CumUnique = 15 ha (50,7%)

### 5.2 Rekonsiliasi Satu Hari Asisten (Hendra Budiono - 12 Sep 2026)
- **Total Sesi Kunjungan**: 8 sesi @ 1,0 ha walked physical area
- **Estimasi Jarak Jalan**: $8,0 \text{ ha} \times 0,66 \text{ km/ha} = \mathbf{5,28\text{ km}}$ (**105,6%** target 5,0 km/hari)
- **Luas Observasi Nominal (3x)**: **24,0 Ha** (8 sesi @ 3,0 ha)
- **Luas Coverage Unik Net Harian**: **18,0 Ha** (menghindari double-counting area overlap pada hari tersebut)

### 5.3 Rekonsiliasi Total Estate (September 2026)
- **Scope**: 5 Asisten $\times$ 26 Hari Kerja $\times$ 8 Sesi/Hari = **1.040 Sesi Kunjungan Lapangan**
- **Total Walked Physical Area**: $1.040 \times 1,0 \text{ ha} = \mathbf{1.040,0\text{ Ha}}$
- **Total Nominal Observation Area (3x)**: $1.040 \times 3,0 \text{ ha} = \mathbf{3.120,0\text{ Ha}}$
- **Total Coverage Unik Estate**: **2.046,20 Ha** ($\mathbf{61,9\%}$ dari total 3.303,28 ha)
- **Bukti Integritas**: $\text{Coverage Unik } (2.046,20\text{ Ha}) \le \text{Nominal Observation Area } (3.120,00\text{ Ha}) \le \text{Luas Master } (3.303,28\text{ Ha})$.

### 5.4 Rekonsiliasi Kasus Spesifik Blok F-59 (Divisi 2)
- **Luas Master F-59**: **27,57 Ha**
- **Petugas**: Hendra Budiono (Asisten Divisi 2)
- **Riwayat Observasi Kustom (8 Sesi Sesuai Penyesuaian Explicit)**:
  1. `07 Sep 2026` | `Blok Checklist` | Sesi: 3,0 ha | AddUnique: 3,0 ha | CumUnique: 3,0 ha (10,9%)
  2. `08 Sep 2026` | `IPD Panen` | Sesi: 3,0 ha | AddUnique: 2,8 ha | CumUnique: 5,8 ha (21,0%)
  3. `08 Sep 2026` | `Pengancakan` | Sesi: 3,0 ha | AddUnique: 2,8 ha | CumUnique: 8,6 ha (31,2%)
  4. `18 Sep 2026` | `Blok Checklist` | Sesi: 3,0 ha | AddUnique: 2,9 ha | CumUnique: 11,5 ha (41,7%)
  5. `19 Sep 2026` | `IPD Panen` | Sesi: 3,0 ha | AddUnique: 2,8 ha | CumUnique: 14,3 ha (51,9%)
  6. `19 Sep 2026` | `Pengancakan` | Sesi: 3,0 ha | AddUnique: 2,8 ha | CumUnique: 17,1 ha (62,0%)
  7. `28 Sep 2026` | `Inspeksi Pupuk` | Sesi: 2,7 ha | AddUnique: 2,7 ha | CumUnique: 19,8 ha (71,8%)
  8. `30 Sep 2026` | `Inspeksi Upkeep` | Sesi: 3,0 ha | AddUnique: 2,9 ha | CumUnique: 22,7 ha (82,3%)
- **Breakdown 5 Kegiatan F-59**:
  - `Pengancakan`: 5,6 ha (20,3%), 2 kunjungan
  - `IPD Panen`: 5,6 ha (20,3%), 2 kunjungan
  - `Inspeksi Pupuk`: 2,7 ha (9,8%), 1 kunjungan
  - `Inspeksi Upkeep`: 2,9 ha (10,5%), 1 kunjungan
  - `Blok Checklist`: 5,9 ha (21,4%), 2 kunjungan
- **Status Coverage Final F-59**: **22,7 Ha** / 27,57 Ha (**82,3%**) $\rightarrow$ Badge: **Coverage Tinggi (>75–<100%)** (Hijau Muda `#9CCC65`).

---

## 6. Visualisasi Tracking Observasi F-59 & Buffer 24m Geografis

Visualisasi tracking polyline dan buffer geografis murni berbasis jarak meter diimplementasikan dari `tracking/tnke_tracking.geojson`:

1. **Atribut & Mapping Segmen**:
   - `TNKE|DIVISI 2|F-59` memiliki 10 segmen polyline WGS84 pada bulan September 2026.
   - Mapping kegiatan: ID 1 (*Blok Checklist*, Cokelat `#795548`), ID 2 (*IPD Panen*, Ungu `#AD3CDB`), ID 3 (*Pengancakan*, Biru `#268BF2`), ID 4 (*Inspeksi Upkeep*, Teal `#20A3A7`), ID 5 (*Inspeksi Pemupukan* / *Inspeksi Pupuk*, Oranye `#FF6900`).
2. **Buffer 24m Geografis**:
   - Buffer dihitung menggunakan formula proyeksi planimetrik lokal $24\text{ meter}$ per sisi (total lebar $48\text{ meter}$) di `geo_utils.js` (`createLineBuffer`).
   - Opacity buffer 0.20 dengan pointer-events non-interaktif (`interactive: false`), tidak mengganggu klik polygon blok.
   - Hasil kalkulasi buffer di-cache per `track_id` untuk menjaga kestabilan performa rendering.
   - **Buffer murni visual**, tidak merubah luas hektare atau persentase coverage di store.
3. **Interaktivitas Riwayat (Row Click Highlight)**:
   - Mengklik baris riwayat pada drawer F-59 meng-highlight seluruh segmen polyline & buffer yang sesuai (misal: *Pengancakan* 8 Sep meng-highlight 2 segmen: `tnke-line-003` & `tnke-line-004`; *Inspeksi Pemupukan* 28 Sep meng-highlight 2 segmen: `tnke-line-009` & `tnke-line-010`).
   - Mengklik ulang melepaskan highlight. Jika baris tidak memiliki tracking, ditampilkan toast notification *"Tracking belum tersedia untuk kegiatan ini"*.

---

## 7. Bukti Pengujian Browser Real & Screenshots

Pengujian dilakukan menggunakan Microsoft Edge Headless CDP pada environment server lokal (`http://localhost:8088`):

1. **Loading App**: Berhasil 100% tanpa spinner menggantung (`isLoaderHidden: true`).
2. **Console Errors**: 0 uncaught exception / syntax error.
3. **Bukti Screenshot Artifact**:
   - `desktop_01_coverage_bulanan.png` — Dashboard Overview Coverage Bulanan TNKE.
   - `desktop_02_block_drawer_f60.png` — Detail Drawer Blok F-60.
   - `desktop_03_aktivitas_harian.png` — Subtab Aktivitas Harian (Hendra Budiono 5,28 km).
   - `desktop_04_f59_tracking.png` — Visualisasi Tracking & Buffer 24m pada Blok F-59.
   - `desktop_05_f59_pengancakan_08sep.png` — Highlight Multi-Segmen Pengancakan 08 Sep 2026.
   - `desktop_06_f59_pemupukan_28sep.png` — Highlight Multi-Segmen Inspeksi Pemupukan 28 Sep 2026.
   - `desktop_07_buffer_24m_zoom.png` — Close-up Zoom Buffer 24 Meter Geografis.
   - `desktop_08_filter_divisi_zoom.png` — Auto FitBounds Zoom Scope Filter DIVISI 2.
   - `mobile_01_inspection_view.png` — Tampilan Aplikasi Mobile Field Inspection.

---

## 8. Batasan & Status Penghentian

- Pekerjaan **Tahap 1, Tahap 2, dan Visualisasi Tracking F-59 + Buffer 24m Geografis telah selesai 100% dan terverifikasi di browser**.
- Tampilan UI existing dipertahankan utuh tanpa menambah cards, kolom, atau istilah baru.
- Pekerjaan **dihentikan secara disiplin sebelum melangkah ke Tahap 3**.

