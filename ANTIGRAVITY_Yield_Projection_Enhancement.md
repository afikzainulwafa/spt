# Prompt tambahan Antigravity — Yield Moving, Potency, dan Proyeksi SKDE

Gunakan sebagai enhancement setelah prompt peta. Jangan rebuild project, mengubah fullscreen, login, atau master kategori yang sudah bekerja. Tetap static mockup **Smart Problem Tagging**.

## A. Hasil eksplorasi referensi

File Pasted markdown.md berisi tabel 95 kolom dan 838 baris data, termasuk STHE 127 blok dan **SKDE 109 blok unik**. Seluruh 109 blok SKDE cocok dengan composite key GeoJSON setelah normalisasi penamaan. Prioritaskan data SKDE aktual dalam file ini; STHE hanya referensi pola bila data SKDE tidak tersedia.

Contoh mapping: SKDE3S-28 → estate SKDE, divisi DIVISI 3, blok S-28. SKDE3S-29 → DIVISI 3 / S-29. Jangan menggunakan nama blok saja untuk join. Geometri tetap dari SKDE.json. Untuk blok peta tanpa data sumber, beri label data sintetis atau belum tersedia, jangan menyebutnya aktual sumber.

Tabel memiliki header bertingkat yang rusak/bergeser saat diekspor ke markdown. Header paling atas pada posisi 33–37 bukan batas kelompok kolom yang benar. Berdasarkan baris header bulan dan pola isi, indeks **zero-based** yang digunakan:

| Indeks | Makna |
| --- | --- |
| 0–4 | Region, Estate, Divisi, Complex, Block |
| 7 | Area ha |
| 8–10 | Yield Actual baseline, Yield Potency baseline, Achievement |
| 21–27 | Achievement/target tahunan 2024–2030 |
| 28–34 | Potensi tahunan 2024–2030 |
| 35–46 | Progress action plan Jan–Dec 2026 |
| 47–58 | Yield produksi bulanan Jan–Dec 2026 |
| 59–70 | BCCR/Colour Moving Jan–Dec 2026 |
| 71–82 | Yield Actual Moving Jan–Dec 2026 |
| 83–94 | Yield Potency Moving Jan–Dec 2026 |

Kolom 47–53 dan 71–77 berisi Jan–Jul 2026 pada contoh yang diperiksa; bulan setelah itu berisi '-' dan BCCR 'CEK'. '-' / 'CEK' / kosong adalah missing, bukan nol. Periksa kelengkapan per blok, jangan menganggap seluruh dataset sama.

Contoh sumber:

| Blok SKDE Divisi 3 | Luas ha sumber | Actual moving Jan–Jul 2026, ton/ha | Potency moving Jan–Jul |
| --- | --- | --- | --- |
| S-28 | 33,54 | 21,5; 21,6; 21,7; 22,2; 22,6; 24,6; 26,3 | 29,0 setiap bulan |
| S-29 | 26,94 | 22,2; 23,4; 22,3; 24,5; 25,8; 26,5; 30,6 | 29,0 setiap bulan |
| T-29 | 29,75 | 22,5; 22,6; 23,8; 25,2; 24,9; 26,8; 28,0 | 28,9 setiap bulan |

Jangan menghilangkan penurunan pada T-29/S-29 atau nilai S-29 di atas potency. Realistis bukan berarti seluruh aktual monoton naik. Moving mengurangi fluktuasi, tetapi tidak menjamin selalu naik.

## B. Bedakan metrik sebelum menggambar

- Yield Actual Moving: metrik yield dalam ton/ha, bukan persentase BCCR.
- Yield Potency Moving: potensi yield moving dalam ton/ha.
- BCCR Moving mockup = actual moving / potency moving × 100%. Sebut sebagai definisi yang disimpulkan dari rasio referensi, bukan formula bisnis resmi yang sudah diverifikasi.
- Yield produksi bulanan, Yield YTD, dan Moving tidak boleh dicampur menjadi satu seri dengan label sama.
- Contoh sumber S-28 Jul: 26,3 / 29,0 × 100 = 90,689655…%. Pembulatan sumber membuat rasio hitung bisa sedikit berbeda dari persentase tabel. Hitung dari presisi yang tersedia dan dokumentasikan toleransi; jangan membuat angka independen untuk memaksa cocok.

Untuk data mentah lengkap dan area tetap, asumsi mockup moving adalah trailing 12-month yield:

    actualMoving(t) = sum(monthlyActualYield(t-11 … t))
    potencyMoving(t) = sum(monthlyPotencyYield(t-11 … t))
    bccrMoving(t) = 100 × actualMoving(t) / potencyMoving(t)

Ini jumlah yield bulanan 12 bulan, BUKAN mean 12 bulan, dan BUKAN monthly yield ×12. Jika formula moving resmi berbeda, pertahankan published moving dari referensi dan beri label formula belum diverifikasi. File markdown berisi nilai hasil, bukan formula spreadsheet; jangan mengklaim formula aslinya telah dibaca.

Jika area berubah, jangan menjumlahkan rasio yield dengan denominator berbeda secara sembarang: tampilkan published moving atau gunakan aturan area resmi yang didokumentasikan. Untuk mockup pertama, gunakan luas sumber konstan per blok sepanjang window.

## C. Window grafik utama

Gunakan cut-off default **Jul 2026**, karena contoh sumber tersedia sampai bulan tersebut, bukan tanggal komputer saat app dijalankan.

- 12 titik historis: Aug 2025–Jul 2026.
- 12 titik forecast: Aug 2026–Jul 2027.
- 24 titik potency moving: Aug 2025–Jul 2027.
- Aktual bernilai null sesudah cut-off; proyeksi bernilai null pada periode historis.
- Garis forecast boleh menyertakan satu anchor tambahan Jul 2026 hanya untuk menyambung garis. Anchor bukan bulan forecast ke-13, bukan record produksi kedua.

Sumber tidak menyediakan seluruh 12 titik historis moving. Aug–Dec 2025 harus diberi flag **synthetic historical**, bukan dianggap data aktual hasil pengukuran. Jan–Jul 2026 tetap menggunakan nilai moving sumber tanpa smoothing yang mengubah angka. Jangan mengisi 12 bulan dengan menyalin tujuh angka berulang.

## D. Contoh realistis siap implementasi: SKDE / DIVISI 3 / S-28

Contoh di bawah memakai 7 titik moving sumber; 5 titik historis sintetis; 12 titik proyeksi skenario. Label UI: **Contoh SKDE — sebagian historis sintetis, forecast skenario**.

Potensi tahunan S-28 pada sumber: 2024=30,0; 2025=29,0; 2026=29,0; 2027=29,0 ton/ha. Gunakan asumsi alokasi bulanan seragam annualPotency(year)/12 untuk contoh awal. Moving potency kemudian dijumlahkan pada trailing 12 bulan. Karena itu Aug 2025 masih memasukkan Sep–Dec 2024: potency moving = 4×30/12 + 8×29/12 = 29,333333…; turun perlahan sampai 29,0 di Dec 2025, kemudian flat. Tidak perlu memaksakan potency naik jika sumber flat atau menurun.

Hitung memakai presisi penuh; tabel potency dibulatkan empat desimal untuk display. Uniform monthly allocation adalah asumsi mockup, bukan model agronomi resmi. Jangan menambahkan seasonality potency acak agar terlihat menarik.

| Bulan | Actual moving ton/ha | Projection moving ton/ha | Potency moving ton/ha | Rasio BCCR | Asal |
| --- | --- | --- | --- | --- | --- |
| 2025-08 | 20.20 | — | 29.3333 | 68.86% | Sintetis historis |
| 2025-09 | 20.30 | — | 29.2500 | 69.40% | Sintetis historis |
| 2025-10 | 20.45 | — | 29.1667 | 70.11% | Sintetis historis |
| 2025-11 | 20.55 | — | 29.0833 | 70.66% | Sintetis historis |
| 2025-12 | 20.67 | — | 29.0000 | 71.28% | Sintetis historis |
| 2026-01 | 21.50 | — | 29.0000 | 74.14% | Moving sumber |
| 2026-02 | 21.60 | — | 29.0000 | 74.48% | Moving sumber |
| 2026-03 | 21.70 | — | 29.0000 | 74.83% | Moving sumber |
| 2026-04 | 22.20 | — | 29.0000 | 76.55% | Moving sumber |
| 2026-05 | 22.60 | — | 29.0000 | 77.93% | Moving sumber |
| 2026-06 | 24.60 | — | 29.0000 | 84.83% | Moving sumber |
| 2026-07 | 26.30 | — | 29.0000 | 90.69% | Moving sumber |
| 2026-08 | — | 26.38 | 29.0000 | 90.95% | Proyeksi skenario |
| 2026-09 | — | 26.58 | 29.0000 | 91.66% | Proyeksi skenario |
| 2026-10 | — | 26.88 | 29.0000 | 92.70% | Proyeksi skenario |
| 2026-11 | — | 27.25 | 29.0000 | 93.97% | Proyeksi skenario |
| 2026-12 | — | 27.65 | 29.0000 | 95.34% | Proyeksi skenario |
| 2027-01 | — | 28.05 | 29.0000 | 96.72% | Proyeksi skenario |
| 2027-02 | — | 28.42 | 29.0000 | 97.99% | Proyeksi skenario |
| 2027-03 | — | 28.72 | 29.0000 | 99.03% | Proyeksi skenario |
| 2027-04 | — | 28.92 | 29.0000 | 99.74% | Proyeksi skenario |
| 2027-05 | — | 29.00 | 29.0000 | 100.00% | Proyeksi skenario |
| 2027-06 | — | 29.00 | 29.0000 | 100.00% | Proyeksi skenario |
| 2027-07 | — | 29.00 | 29.0000 | 100.00% | Proyeksi skenario |

Angka sintetis Aug–Dec 2025 adalah contoh desain, bukan hasil rekonstruksi dari bulanan. Nilai baseline sumber S-28 adalah 20,67; penggunaan sebagai anchor akhir 2025 adalah asumsi konteks contoh, jangan menyatakan tanggal baseline pasti bila header asli tidak memastikan.

Forecast adalah skenario pemulihan menuju **100% potency pada bulan forecast ke-9 sampai ke-12 setelah cut-off**. Bulan forecast ke-1 adalah bulan setelah cut-off; bukan bulan kalender September. Gunakan kurva easing ringan dalam ruang rasio terhadap potency agar setelah mencapai target, yield mengikuti potency pada setiap bulan:

    startRatio = actualMovingAtCutoff / potencyMovingAtCutoff
    recoveryMonth = 10               // contoh S-28; valid 9, 10, 11, 12
    u = min(horizonMonth / recoveryMonth, 1)  // horizonMonth = 1…12
    easing = 3*u*u - 2*u*u*u
    projectionRatio = startRatio + (1-startRatio)*easing
    projectionMoving = potencyMovingAtMonth * projectionRatio

- Tetapkan recoveryMonth per composite block key secara deterministik, misalnya 9 + (stableHash(blockKey) % 4), dengan override eksplisit S-28=10 untuk mereproduksi contoh. Nilai tidak berubah saat reload, zoom, atau filter; simpan dalam metadata.
- Contoh S-28: start 26,3 ton/ha pada Jul 2026; mencapai 29,0 ton/ha atau 100% potency pada **May 2027 (bulan forecast ke-10)**; Jun–Jul 2027 tetap 100% potency.
- Sesudah recoveryMonth, set projectionRatio tepat 1. Yield mengikuti potency bulan terkait, bukan membekukan angka yield ketika potency berubah. Jangan memaksa potency naik hanya agar forecast tampak naik.
- Untuk potency flat pada contoh ini, yield projection naik halus menuju target. Jika potency berubah, prioritas konsistensi rasio dan model potency; jangan memaksakan yield absolut monoton dengan mengubah sumber.
- Jika startRatio sudah 1 atau lebih, jangan memakai rumus pemulihan dari bawah, memaksa yield naik lagi, atau mengubah actual sumber. Gunakan skenario terpisah berlabel Maintain/Above Potency: rasio awal dipertahankan terhadap potency sebagai asumsi awal. Aturan mencapai 100% pada bulan 9–12 berlaku untuk blok yang masih di bawah 100%.
- Jika potency cut-off nol/missing atau actual missing, rasio tidak valid: tampilkan belum dapat diproyeksikan, bukan membagi nol atau mengarang anchor.

Pencapaian 100% adalah **asumsi skenario target pemulihan**, bukan prediksi statistik, jaminan hasil, atau actual BCCR masa depan. Target sumber S-28 adalah 85% pada 2026 dan 100% pada 2027; actual moving Jul sudah melampaui 85%, jadi jangan paksa forecast turun ke target 2026. Pisahkan target tahunan sumber dari scenario endpoint. Jelaskan moving vs achievement tahunan belum tentu basis yang sama.

Tidak perlu ML/model forecasting berat. Jangan mengaitkan 90% action plan selesai dengan tambahan yield 90% secara otomatis. Jika tersedia model kontribusi action dan lag resmi, itu enhancement terpisah.

## E. Perhitungan potency dan kebutuhan data

Untuk menghitung 24 titik moving dari yield bulanan, diperlukan **35 bulan** input bulanan: 24 bulan display + 11 bulan warm-up. Window contoh memerlukan Sep 2024–Jul 2027 untuk potency bulanan. Published actual moving yang ada boleh langsung dipakai, sehingga tidak perlu mengarang monthly actual untuk mereproduksi angka sumber.

- Gunakan annual potency sumber → monthly allocation terdokumentasi → rolling sum.
- Bila annual potency tahun yang dibutuhkan missing, tampilkan missing atau assumption eksplisit; jangan diam-diam nol atau extrapolate.
- Jika nanti monthly produksi/proyeksi juga ditampilkan, dataset harus punya monthly series tersendiri dan konsisten dengan moving. Jangan memperoleh monthly yield dengan membagi moving/12 lalu menyebutnya produksi aktual.
- Pisahkan observed, syntheticHistorical, scenarioForecast, dan calculatedFromAssumption dalam metadata per record. Tabel/popup/download harus mempertahankan provenance ini.

## F. Nama blok, luas, dan agregasi

Semua block name/division mengikuti GeoJSON SKDE aktual. Luas produksi berasal dari kolom Area sumber, bukan luas polygon otomatis jika basisnya belum diverifikasi.

Untuk filter multi-blok/divisi/estate, gunakan weighted yield:

    aggregateYield(t) = sum(blockYield(t) × blockArea) / sum(blockArea)
    aggregateBCCR(t) = 100 × sum(actualMoving(t) × area)
                            / sum(potencyMoving(t) × area)

Jangan mengambil average persentase BCCR atau menjumlahkan ton/ha antar blok. Gunakan kelompok blok dan denominator sama untuk actual/potency ratio. Bila sebagian blok missing pada bulan tertentu, tampilkan coverage jumlah blok/ha dan jangan diam-diam mengubah populasi tanpa informasi.

Jika data memuat beberapa action/problem pada blok sama, deduplikasi produksi per composite block key, bukan count yield berkali-kali. Nilai konflik harus dilaporkan, tidak di-average sembarang.

Jangan memaksakan data referensi hanya agar distribusi peta tetap merah/orange seperti dummy lama. Warna BCCR peta mengikuti rasio sumber di cut-off; contoh S-28 Jul masuk 90–<100%. Source S-29 Jul di atas 100% tetap masuk ≥100%, tidak di-clamp.

## G. Grafik corporate, ringan, dan jujur

- Judul: **Yield Moving: Aktual, Proyeksi & Potensi**; subtitle **Trailing 12 bulan · ton/ha · Cut-off Jul 2026**.
- Actual moving: garis solid merah corporate. Projection moving: garis dashed orange/warna kontras. Potency moving: garis slate/abu-abu gelap sepanjang 24 bulan.
- Shade area forecast dan vertical cut-off line; label Historis / Proyeksi. Jangan pakai double y-axis karena ketiga seri unit sama.
- Untuk 5 historical dummy, bedakan style/tooltip dari observed; tooltip menyebut asal angka dan basis kalkulasi.
- Gunakan interpolation monotone yang tidak overshoot, atau garis linear jika chart existing tidak mendukung. Smoothing visual tidak boleh mengubah point values, mengganti data sumber, atau menghasilkan puncak di atas semua titik.
- Grafik yield jangan dibuat cumulative YTD supaya tampak naik. Jangan ganti metric tanpa label. Data bulanan asli dapat fluktuatif dan ditampilkan lewat toggle/page detail terpisah.
- Dashboard tetap ringkas. Detail Trend Produksi memiliki chart lebih besar, tabel 24 bulan, toggle Moving/Bulanan bila data tersedia, source/assumption notes, dan export bila existing mendukung.
- Tooltip: bulan, blok/divisi, actual/projection, potency, BCCR actual atau scenario ratio, provenance. Jangan menyebut rasio forecast sebagai BCCR aktual.
- Existing card/map/rekap BCCR/detail analisa memakai selector dataset yang sama dan cut-off sama; jangan membuat tiga sumber dummy berbeda.

## H. Cara penyerahan file lokal

Untuk static HTML: index.html, SKDE.json, dan data yield hasil normalisasi berada pada folder project yang sesuai. Sarankan nama input referensi tanpa spasi **production-reference.md** (copy file Pasted markdown.md, jangan mengubah sumber tanpa kebutuhan). Antigravity harus membaca input lalu menghasilkan JSON normalisasi kecil, misalnya yield-data.json; jangan parsing tabel 95 kolom ulang pada setiap filter/zoom.

Untuk Vite: data runtime di public/SKDE.json dan public/yield-data.json; referensi markdown boleh disimpan di folder data/source. README menjelaskan local server/Live Server, loading failure, serta bahwa membuka file:// tidak menjamin fetch bekerja.

Jangan membuat dependency ke file di komputer developer yang tidak ikut project. Jangan menyimpan JSON GeoJSON besar ke sessionStorage. Jangan mengubah login demo menjadi klaim secure production.

## I. Tahapan dan acceptance tests

1. Parse reference, validasi 95 kolom, identifikasi kelompok bulan, normalisasi 109 blok SKDE, dan laporkan join/missing/conflict.
2. Bangun data contoh S-28 tepat seperti tabel; pastikan Jan–Jul source tidak berubah.
3. Implementasikan potency calculated, forecast easing, provenance dan weighted aggregation.
4. Hubungkan chart/card/map/rekap via selector sama; pertahankan fitur peta fullscreen dan manual findings.
5. Uji UI, build/lint bila tersedia, console, dan error handling.

Tests wajib: 24 bulan unik urut; 12 actual slots + 12 forecast slots; 7 observed + 5 synthetic historical pada S-28; potency lengkap 24; nilai null tidak menjadi nol; warm-up 11 bulan cukup; source missing tidak berubah menjadi actual; rasio S-28 Jul ≈90,69%; S-28 pertama mencapai tepat 100% pada forecast ke-10/May 2027 dengan yield 29,0, lalu Jun–Jul mengikuti potency pada 100%; seluruh blok recovery di bawah 100% mempunyai recoveryMonth integer 9–12 dan tidak mencapai target sebelum bulan tersebut; sesudah target rasio tetap 1 walaupun potency berubah; startRatio≥1 memakai skenario terpisah tanpa mengubah actual; potency nol/missing tidak menghasilkan NaN/Infinity; potency Aug25≈29,333333 dan Dec25=29; recoveryMonth dan hasil reload/filter sama; agregasi weighted; BCCR≥100 tidak di-clamp; block ID sesuai map; warna peta selaras chart; forecast bridge tidak double-count; tidak ada overshoot visual; semua page/login/fullscreen tetap bekerja. Pengujian rasio menggunakan presisi penuh, bukan angka yang telah dibulatkan pada tabel.

Laporkan asumsi dan keterbatasan. Ini contoh yang realistis berdasarkan referensi, bukan data produksi SKDE lengkap yang telah tervalidasi. Jangan mengatakan semua historis aktual atau forecast pasti benar.
