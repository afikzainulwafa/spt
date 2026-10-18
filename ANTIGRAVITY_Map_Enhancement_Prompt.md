# Prompt Antigravity — Enhancement Peta Smart Problem Tagging

Salin seluruh instruksi di bawah ke Antigravity IDE pada project existing. Letakkan SKDE.json di folder yang sama dengan index.html; untuk project Vite gunakan public/SKDE.json. Ini enhancement mockup, bukan permintaan rebuild atau backend production.

---

Anda bertugas meningkatkan project existing **Smart Problem Tagging**. Implementasikan perubahan secara bertahap, uji setiap tahap, dan pertahankan seluruh page serta fungsi existing yang sudah bekerja. Jangan langsung mengganti seluruh arsitektur atau menambahkan framework/dependency berat.

## 1. Batasan dan tujuan

- Static mockup dengan data contoh, bukan aplikasi production. Tidak memerlukan backend, database, service geospatial, atau login sungguhan.
- Pertahankan judul Smart Problem Tagging, corporate red Sinarmas-inspired, white/gray background, serta dashboard desktop ringkas tanpa scroll panjang. Hijau hanya untuk indikator yang memang membutuhkan hijau.
- Pertahankan page Dashboard, Rekap BCCR, Monitoring Action Plan, Trend Produksi, Detail Analisa BCCR, Rekap Pekerjaan per Divisi, dan Dokumentasi Before–After.
- Jangan rusak login/logout demo. Jika belum ada, buat satu user static admin_spt / SPT2026!, dengan sessionStorage untuk sesi demo. Tampilkan bahwa ini akses simulasi; kredensial frontend tidak memberikan keamanan production.
- Fokus enhancement pada dua peta: **Pemetaan BCCR Blok** dan **Sebaran Temuan**. Keduanya memiliki tombol fullscreen dengan ikon expand empat arah, tooltip, dan accessible label.
- Gunakan Leaflet existing. Jangan pasang library baru apabila fungsi kecil dapat diimplementasikan dengan aman menggunakan utility yang jelas. Utility point-in-polygon harus benar-benar diuji; boleh gunakan modul geospatial kecil yang sesuai stack existing jika diperlukan, bukan seluruh suite berat.

## 2. Mulai dengan audit singkat

Sebelum coding, periksa struktur project, lokasi initialization Leaflet, sumber data, filter, dan lifecycle setiap peta. Laporkan rencana singkat dan file yang akan disentuh. Jangan mengarang nama properti GeoJSON: baca file aktual terlebih dahulu.

SKDE.json berada bersama index.html. Muat satu kali dan cache hasil normalisasi. Jika memakai Vite, file berada di public/SKDE.json dan diakses melalui /SKDE.json. Perhatikan huruf besar/kecil nama file.

Contoh parsing yang benar:

```js
const response = await fetch('./SKDE.json');
if (!response.ok) throw new Error(`GeoJSON HTTP ${response.status}`);
const payload = await response.json();
const geojson = payload.data ?? payload;
if (geojson.type !== 'FeatureCollection' || !Array.isArray(geojson.features)) {
  throw new Error('Format GeoJSON tidak valid');
}
```

Jangan menggunakan Response.data atau fetch(...).data. Sesuaikan URL dengan stack project, bukan mengganti path secara acak.

- Dukung GeoJSON langsung maupun wrapper { success, data: FeatureCollection }.
- Identifikasi estate, divisi, blok dari properties aktual. Gunakan composite block key estate + divisi + blok; nama blok saja tidak cukup unik.
- Jika satu block key memiliki beberapa feature/polygon, perlakukan sebagai satu blok dengan seluruh bagian geometrinya. Tidak perlu melakukan geometric union mahal jika pemeriksaan membership pada seluruh bagian sudah cukup.
- Dukung Polygon, MultiPolygon, dan holes. GeoJSON memakai [longitude, latitude], Leaflet memakai [latitude, longitude].
- Blok kosong atau bernama '-' tidak diberi dummy temuan; beri laporan jumlah feature yang dilewati. Jangan mengubah file sumber.
- Jalankan menggunakan local HTTP server/Live Server, bukan mengandalkan fetch dari file://. README harus menjelaskan ini.
- Loading/error peta tidak boleh membuat angka dan widget dashboard lain hilang. Sediakan pesan error spesifik dan tombol retry tanpa reload seluruh aplikasi.

## 3. Perilaku tampilan dan zoom: wajib jelas

| Peta | Dashboard biasa | Fullscreen, zoom estate/divisi | Fullscreen, zoom level blok |
| --- | --- | --- | --- |
| BCCR | Polygon berwarna sesuai BCCR | Polygon + filter + legenda | Polygon + nama blok + tooltip detail BCCR |
| Sebaran temuan | Satu ringkasan Major/Minor per blok | Satu ringkasan Major/Minor per blok + filter | Nama blok + placemark individual + popup detail |

Pada peta temuan, ringkasan dan placemark individual **tidak tampil bersamaan**. Dashboard ringkas tetap menggunakan ringkasan. Individual findings hanya muncul saat fullscreen DAN zoom level blok sudah memadai.

Gunakan satu konfigurasi threshold zoom, bukan angka tersebar dalam banyak file. Nilai awal boleh sekitar zoom 16 tetapi harus disesuaikan dengan ukuran blok SKDE aktual. Uji hasil visual: blok cukup besar untuk membaca lokasi individual. Block labels memiliki threshold tersendiri bila diperlukan.

Nama blok muncul otomatis ketika cukup zoom, tidak selalu dipaksakan pada seluruh estate. Gunakan tooltip permanen/label ringan pada blok yang terlihat, posisi di dalam polygon, teks kontras, dan hindari overlap berlebihan. Ringkasan diklik akan fitBounds ke blok tersebut dan, jika fullscreen, beralih ke detail bila threshold tercapai. Jangan memaksakan detail jika ukuran blok masih terlalu kecil di layar.

## 4. Fullscreen yang stabil

- Fullscreen pada wrapper peta, termasuk toolbar, filter, legenda, popup, dan panel detail. Bukan hanya layer tile.
- Pertahankan Leaflet instance yang sama untuk setiap peta: jangan membuat map baru, fetch ulang GeoJSON, atau generate ulang dummy saat fullscreen berubah.
- Gunakan Fullscreen API setelah klik pengguna. Jika tidak tersedia/ditolak, sediakan CSS overlay fullscreen dengan position fixed dan z-index terkelola.
- Tombol berubah menjadi Keluar fullscreen; Escape berfungsi pada native maupun fallback. Pulihkan scroll halaman dan fokus tombol ketika keluar.
- Simpan filter, center, zoom, dan selected finding. Keluar fullscreen tidak mereset pilihan pengguna.
- Gunakan fullscreenchange/ResizeObserver dan map.invalidateSize() setelah ukuran benar-benar berubah. Hindari rangkaian timeout acak sebagai solusi layout.
- Cleanup listener/observer sesuai lifecycle existing. Tidak ada duplikasi event handler setelah bolak-balik fullscreen.
- Toolbar tetap nyaman di laptop, dropdown tidak terpotong, tombol close selalu dapat diakses. Perubahan fullscreen tidak menimbulkan horizontal scroll dashboard.

## 5. Pemetaan BCCR blok

Filter fullscreen: Estate, Divisi, Blok, Periode, kategori BCCR multi-select, Reset, dan Fit wilayah. Filter cascading harus konsisten dengan dashboard.

| BCCR | Warna |
| --- | --- |
| <60% | #FF0000 |
| 60–<70% | #FF9900 |
| 70–<80% | #FFCC00 |
| 80–<90% | #99CC00 |
| 90–<100% | #339966 |
| ≥100% | #009900 |
| Belum ada data | #A4A8AC |

Boundary harus tepat: 60 masuk kelompok kedua, 70 ketiga, 80 keempat, 90 kelima, 100 keenam. Nilai kosong bukan 0%. Jangan clamp BCCR di 100%. Bedakan styling selection/hover dari kategori BCCR tanpa mengganti arti warna.

Klik blok membuka detail: estate/divisi/blok, luas jika tersedia, periode, produksi aktual, potensi pada periode yang sama, BCCR, kategori, dan tombol ke Detail Analisa BCCR. Semua data dummy diberi label. Jangan membandingkan aktual YTD dengan potensi setahun penuh lalu menyebutnya BCCR YTD. Jika formula bisnis belum tersedia, tandai formula mockup yang dipakai dan jangan mengklaim sebagai formula resmi.

## 6. Master kategori temuan: gunakan persis ini

Warna kategori berbeda makna dari sensitivity/status. Pin klasik dan pin drop harus dibedakan bentuknya karena beberapa warna berulang. Gunakan SVG kecil melalui L.divIcon atau assets lokal; tidak perlu ikon gambar besar atau emoji yang tampil berbeda antar platform.

| ID | Kategori | Timeframe | Sensitivity | Unit | Simbol/warna |
| --- | --- | --- | --- | --- | --- |
| 01 | Pasar Pikul Semak | Short Term | Major | Meter | Klasik biru #268BF2 |
| 02 | Underpruning | Short Term | Major | Pkk | Klasik hijau #008247 |
| 03 | Areal Banjir / Tergenang | Short Term | Major | Ha | Klasik abu-abu #494949 |
| 04 | Titi Panen Kurang / Rusak | Short Term | Major | Unit | Klasik indigo #7861EF |
| 05 | Piringan Semak | Short Term | Minor | Pkk | Klasik orange #FF6900 |
| 06 | TPH Bermasalah | Short Term | Minor | Ha | Klasik pink #FC387D |
| 07 | Gawangan Semak | Long Term | Minor | Pkk | Klasik purple #AD3CDB |
| 08 | Defisiensi Hara | Very Long Term | Major | Ha | Klasik merah #F52424 |
| 09 | Titik Kosong | Very Long Term | Major | Pkk | Klasik teal #20A3A7 |
| 10 | HPT | Very Long Term | Major | Ha | Klasik kuning #FFC315 |
| 11 | Konektiviti Teras / Pasar Pikul | Short Term | Major | Meter | Drop biru #268BF2 |
| 12 | Pokok Abnormal | Very Long Term | Minor | Pkk | Drop hijau #008247 |
| 13 | Semak di Gawangan (Bambu) | Long Term | Minor | Ha | Drop abu-abu #494949 |
| 14 | Semak di Gawangan (Pisang) | Long Term | Minor | Ha | Drop indigo #7861EF |
| 15 | Gorong-gorong | Short Term | Major / Minor | Unit | Drop orange #FF6900 |
| 16 | Jembatan / Box culvert | Short Term | Major / Minor | Unit | Drop pink #FC387D |

Sensitivity menjadi klasifikasi severity utama Major/Minor. Jangan otomatis mengubah kategori Minor menjadi Major. Pada ID 15–16, severity dipilih per temuan. Timeframe bukan status pengerjaan dan bukan deadline otomatis. Jangan menambahkan kategori Jalan Rusak/Worker/Pencurian dll pada peta ini tanpa persetujuan karena tidak termasuk master 16 kategori.

Action mapping: Pasar Pikul → Semprot pasar pikul; Underpruning → Penambahan HK pruning atau Borongan; Banjir → Bendungan/tanggul, Individual Bund/Pungguhan, Pembuatan/Cuci Parit, atau continuous bund; Titi Panen → Penambahan Titi Panen; Piringan → Semprot Piringan; TPH → Semprot TPH; Gawangan → Semprot Gawangan; Defisiensi → Semprot Defisiensi; Titik Kosong → Penyisipan; HPT → Pengendalian HPT; Konektiviti → Perbaikan Akses Teras/Pasar Pikul; Pokok Abnormal → Tumbang Pokok Abnormal; Bambu/Pisang → Pengendalian Chemist; Gorong-gorong → Pemasangan Gorong-gorong; Jembatan → Pemasangan Jembatan. Ini label mockup dari user, bukan rekomendasi agronomi baru.

## 7. Dummy findings presisi: generate sekali, bukan saat render

- Generate deterministik menggunakan seeded PRNG berdasarkan composite block key. Hasil harus tetap sama setelah zoom, filter, fullscreen, dan reload dengan seed yang sama.
- Target awal 3–6 temuan per blok valid, dengan 2–4 kategori berbeda bila memungkinkan. Beberapa temuan satu kategori dalam satu blok boleh ada. Tidak perlu seluruh 16 kategori di setiap blok.
- Sampling koordinat di dalam polygon asli: kandidat dari bounding box, lalu validasi point-in-polygon. Untuk MultiPolygon, pilih bagian secara proporsional luas bila utility mendukung. Wajib memperhitungkan holes.
- Batasi retry. Jika gagal, gunakan point-on-surface yang tervalidasi di bagian polygon, atau laporkan kegagalan dan skip. Jangan fallback ke centroid/bounds center tanpa validasi.
- Titik tidak berada di hole, di luar estate, pada blok lain, atau ditaruh di posisi acak sekitar center. Hindari titik tepat di boundary yang ambigu.
- Geometry untuk validasi memakai GeoJSON asli, bukan geometry yang disederhanakan untuk render.
- Koordinat disimpan satu kali di record. Dilarang menggeser titik/jitter/randomize saat render atau filter. Lokasi adalah lokasi sintetis valid, bukan hasil survei lapangan.
- Ringkasan per blok juga memakai interior point tervalidasi. Satu marker ringkasan berisi dua badge Major n dan Minor n. Jangan membuat dua pin yang digeser ke luar blok. Jika blok kecil, tooltip boleh memuat angka lengkap.

Minimal record: id unik, blockKey, estate, divisi, blok, categoryId, sensitivity, longitude, latitude, volume, unit, status, reportedAt, targetAt, action, realizedVolume, verifiedVolume, notes, photoRef. Semua field tampil konsisten pada popup/list/action plan.

Status mockup: Open, In Progress, Pending Verification, Completed. Gunakan variasi yang realistis dan tetap deterministik. Quantity Pkk/Unit integer; Meter/Ha dapat desimal. Volume positif; 0 ≤ verifiedVolume ≤ realizedVolume ≤ volume. Completed berarti seluruh volume sudah diverifikasi; Pending Verification belum selesai diverifikasi. Persentase progress memiliki definisi dan tidak diacak terpisah dari volume.

Jangan menjumlahkan Ha + Meter + Pkk + Unit menjadi satu total volume. Count Major/Minor dihitung dari jumlah record, bukan kuantitas. Volume hanya ditotal per unit/kategori. Foto menggunakan placeholder lokal berlabel Foto dummy/ilustratif; tidak mengandalkan URL eksternal yang rentan gagal.

## 8. Filter sebaran temuan dan popup

Fullscreen memiliki filter Estate, Divisi, Blok, kategori multi-select (semua 16), Major/Minor, status, timeframe, Reset, Fit wilayah, serta counter jumlah temuan hasil filter. Search kategori boleh ringan dan native.

- Filter diterapkan pada dataset yang sama untuk marker, ringkasan, counter, legenda aktif, dan list terkait. Satu fungsi/selectors untuk logika filtering, bukan salinan berbeda di tiap widget.
- Saat estate/divisi zoom-out, ringkasan Major/Minor per blok dihitung ulang dari hasil filter. Blok dengan nol hasil tidak menampilkan summary marker, tetapi boundary dapat tetap terlihat dengan style netral.
- Saat level blok fullscreen, tampilkan hanya individual findings yang lolos filter dan berada dalam viewport (boleh tambah margin kecil). Jumlah seluruh hasil filter tetap terpisah dari jumlah marker terlihat di viewport.
- Jangan membuat seluruh temuan di seluruh estate sebagai DOM marker aktif ketika hanya beberapa blok terlihat.
- Klik pin membuka popup/panel ringan: ID, kategori dan simbol, estate/divisi/blok, severity, volume/unit, status, progress realisasi/verifikasi, action, tanggal, notes, foto dummy, dan tautan dokumentasi/action plan existing.
- Nama blok otomatis tampil pada zoom level blok. Detail seluruh titik tidak ditampilkan sebagai label permanen; buka melalui klik/tooltip agar tidak penuh teks.
- Bedakan kategori dengan warna/bentuk pin; severity dan status ditampilkan sebagai badge/outline/teks yang dijelaskan legenda, bukan mengganti seluruh warna kategori.

## 9. Tambah temuan manual (simulasi)

Di fullscreen peta temuan, sediakan tombol Tambah temuan. Alur eksplisit: masuk mode tambah → pilih lokasi di level blok → form → validasi → simpan. Klik biasa tetap membuka detail; tidak boleh tiba-tiba menambah titik.

- Identifikasi blok dari polygon yang berisi lokasi klik, lalu isi estate/divisi/blok otomatis. Jika ambigu di boundary atau luar seluruh blok, tolak dengan pesan yang jelas dan minta lokasi lain.
- Jika pengguna sudah memilih satu blok, lokasi harus berada dalam blok itu. Jangan mengganti blok diam-diam agar validasi lolos.
- Form: kategori dari master, severity sesuai master, volume dengan unit otomatis, status, action yang sesuai kategori, tanggal, notes, dan foto opsional untuk preview lokal.
- Sanitasi teks popup melalui textContent/safe escaping; jangan masukkan input pengguna ke HTML mentah. Validasi koordinat finite, kategori valid, volume positif, tanggal, dan konsistensi status/volume.
- Setelah simpan, marker, ringkasan, counter, dan list langsung sinkron. Jika filter menyembunyikan temuan baru, tampilkan pemberitahuan bukan diam-diam menghapus filter.
- Simpan metadata manual kecil di sessionStorage dengan schema version; jangan menyimpan GeoJSON besar atau foto base64 ke storage. Foto upload preview memakai object URL dan diberi catatan tidak bertahan setelah reload; revoke object URL bila tidak lagi dipakai.
- Sediakan Cancel dan Reset temuan manual dengan konfirmasi. Jangan menghapus dummy atau GeoJSON sumber saat reset. Ini simulasi lokal, bukan upload/database sungguhan.

## 10. Basemap dan keandalan

Pertahankan basemap existing. Jika Google satellite sudah dikonfigurasi dengan integrasi yang sesuai, jangan menggantinya. Jangan menggunakan endpoint tile Google tidak resmi sebagai workaround. Bila membutuhkan key/config/izin yang belum ada, jelaskan blocker; mockup tetap harus menampilkan polygon dan titik pada background netral dengan pemberitahuan basemap unavailable, bukan halaman kosong. Tidak perlu menjadikan konfigurasi Google sebagai penghalang enhancement geometri.

Data GeoJSON dan dummy findings independen dari keberhasilan tile. Layer control, attribution, dan error state tetap bekerja. Jangan mencantumkan key rahasia dalam prompt/README.

## 11. Performance dan struktur kode

- Gunakan existing stack. Pisahkan secukupnya master kategori, geo normalization/membership, dummy generator, filtering/selectors, dan map controller. Jangan membuat puluhan abstraksi atau global state baru.
- GeoJSON diparse/index sekali; dummy dibuat sekali. Gunakan bbox index per blok sebagai prefilter untuk point-in-polygon.
- Update layer style untuk filter BCCR bila cukup; hindari rebuild polygon dan reattach handler setiap zoom.
- Marker detail hanya untuk viewport pada mode detail. Gunakan stable ID untuk diff/update dan cleanup marker yang tidak terlihat.
- Gunakan zoomend/moveend, debounce kecil untuk refresh viewport bila perlu; jangan render seluruh dataset pada setiap frame zoom/mousemove.
- Map overview/detail berpindah layer secara eksplisit, tanpa marker duplikat atau event listener bertumpuk. Tile/polygon/label/marker pane z-index diatur jelas.
- Hindari dependency clustering tambahan bila semantic block summaries sudah memadai. Jangan menaruh seluruh foto dalam marker popup sejak awal; load thumbnail saat popup dibuka.
- Data dan filter tidak dimutasi oleh render. Tidak ada network call baru saat fullscreen toggle. Jangan mengklaim performa tanpa pengujian.

## 12. Implementasi bertahap: jangan sekaligus

1. Audit, parsing GeoJSON, block index, dan render boundary existing; pastikan widget lain tetap hidup.
2. Fullscreen kedua peta, fallback, Escape, resize, restore state. Uji toggle berulang sebelum lanjut.
3. Filter BCCR, boundary kategori, block labels, dan detail BCCR.
4. Master kategori + generator deterministik + validasi containment + per-block summaries. Uji sebelum membuat individual markers.
5. Semantic zoom, viewport individual markers, filter temuan, popup dan sinkronisasi counter.
6. Form tambah manual, validasi lokasi, penyimpanan simulasi, cancel/reset, dan sinkronisasi.
7. Regression test seluruh page/login/logout, error states, performa, dan README.

Pada setiap tahap: jalankan app/build/lint/test yang tersedia, periksa console/browser, perbaiki error sebelum lanjut. Jangan menyatakan selesai hanya karena build lolos. Jangan mengubah file unrelated atau menghapus fitur working.

## 13. Acceptance tests wajib

- SKDE.json normal dan wrapped dapat dimuat; path salah/JSON rusak menunjukkan error lokal pada peta, widget lain tetap tampil.
- Test point-in-polygon: polygon sederhana, polygon concave dengan centroid di luar, polygon dengan hole, MultiPolygon, titik di luar, boundary ambigu.
- Seluruh dummy record memiliki kategori valid, composite block key valid, dan koordinat di dalam geometri blok terkait. Cetak laporan jumlah valid/invalid/skipped; invalid wajib 0 untuk dataset yang dirender.
- Generate seed sama dua kali menghasilkan ID/koordinat sama. Zoom/filter/fullscreen tidak mengubah koordinat.
- BCCR tepat pada 60/70/80/90/100 dan null diklasifikasikan benar.
- Fullscreen masing-masing peta masuk/keluar minimal 10 kali tanpa duplicate map initialization, listener, refetch, atau perubahan kamera/filter yang tidak diminta.
- Overview tidak berisi detail pin. Fullscreen zoom-out tetap summary. Fullscreen zoom level blok menampilkan labels dan individual pins, tidak summary duplikat. Zoom-out kembali summary.
- Pilih satu kategori, satu divisi, Major, dan satu status: pin/list/counter/summary cocok. Untuk setiap blok, Major + Minor sama dengan count record hasil filter blok itu.
- Pkk/Meter/Ha/Unit tidak digabung menjadi satu volume. Popup progress sama dengan record/action plan yang ditampilkan.
- Tambah di lokasi valid berhasil; luar polygon/hole/blok lain ditolak. Cancel tidak menambah record. Category menentukan unit/severity/action dengan benar.
- Basemap offline tidak menyembunyikan polygon, summaries, pins, atau data dashboard.
- Logout lalu login demo berfungsi dan tidak memunculkan map already initialized. Seluruh detail page tetap bisa dibuka.
- Uji ukuran laptop sekitar 1366×768 dan desktop 1920×1080: dashboard tetap ringkas, fullscreen toolbar tidak terpotong, Escape/close/focus berfungsi.
- Laporkan jumlah blok/temuan/marker aktif, waktu initial load dan refresh viewport di mesin uji. Jika lambat, identifikasi bottleneck sebelum menambah dependency.

## 14. Hasil akhir yang diminta

Berikan project yang dapat dijalankan lokal, README singkat lokasi SKDE.json dan local server, daftar file diubah, pengaturan threshold zoom/seed, screenshot overview/fullscreen/detail, serta hasil pengujian nyata dan keterbatasan yang tersisa. Tandai pengujian yang belum dilakukan; jangan mengarang hasil.

Definisi sukses: dua peta fullscreen stabil; BCCR dapat difilter dan nama blok muncul saat zoom; overview temuan hanya Major/Minor per blok; fullscreen level blok menampilkan detail placemark yang benar-benar berada dalam polygon; dummy deterministik dan tally; tambah manual tervalidasi; semua page existing tetap bekerja. Prioritaskan correctness dan ringan sebelum menambahkan efek visual.
