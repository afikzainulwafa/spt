# Antigravity IDE — Mockup Mobile Smart Problem Tagging

Salin seluruh prompt ini ke Antigravity pada project smartproblemtagging existing. Ini spesifikasi terpadu untuk aplikasi mobile, bukan tambahan kecil pada dashboard.

---

## 1. Mandat dan batas project

Bangun **mockup aplikasi mobile Smart Problem Tagging** di folder baru **smartproblemtagging/aplikasi**. Jangan menyebut Smart Agriculture. Dashboard existing tetap utuh, tidak diganti, dan tidak diubah tanpa kebutuhan yang dijelaskan. Jangan membuat backend/database/cloud/upload sungguhan atau mengklaim production security.

User akan membuat folder aplikasi. Audit stack, struktur routing, dan lokasi SKDE.json terlebih dahulu, lalu jelaskan file yang akan dibuat. Semua kode aplikasi baru harus berada dalam folder aplikasi; boleh membaca master/assets/GeoJSON parent secara read-only. Jika parent adalah app bundler, jelaskan cara menjalankan entry baru tanpa merusak parent. Jangan memberi instruksi Live Server untuk file JSX yang belum dibuild.

Default termudah bila parent mendukung static: aplikasi/index.html + CSS/JS modular kecil + data mock lokal. Serve dari root smartproblemtagging, buka /aplikasi/. Gunakan hash routes supaya refresh halaman detail tidak memerlukan server rewrite. Bila parent Vite/React, buat entry/routing sesuai arsitektur aktual dengan perubahan minimum yang dijelaskan; jangan mengarang konfigurasi.

Target portrait mobile 360–430px lebar, contoh 390×844 dan 412×915. Pada desktop tampilkan app dalam frame maksimal sekitar 430px dengan background netral dan label Preview mobile. Pada layar HP pakai lebar penuh, bukan frame berlapis. Ini web mobile mockup, bukan APK/native app. Vertical scrolling wajar untuk form/detail; larangan scroll panjang dashboard tidak berlaku pada seluruh form mobile.

UI bahasa Indonesia, corporate red #C90016/#A80014, putih dan abu-abu. Hijau untuk status sesuai makna saja. Gunakan ikon konsisten, huruf terbaca, target sentuh minimal sekitar 44px, kontras baik, safe-area inset, sticky header/footer yang tidak menutup konten maupun keyboard. Dilarang tombol dekoratif tanpa fungsi.

## 2. Empat tahap dalam dua siklus

Siklus assessment: **Asisten tagging → Askep/Manager verifikasi assessment**.

Siklus realisasi: **Asisten/Mandor memeriksa realisasi action plan → Askep memverifikasi akhir**.

Asumsi workflow mockup yang dipakai karena belum ada keputusan detail:

- Askep ATAU Manager dapat menyetujui assessment; bukan wajib dua approval berjenjang. Simpan siapa yang memutuskan dan hindari approve dua kali.
- Asisten ATAU Mandor dapat mengirim pemeriksaan realisasi langsung ke Askep, dengan identitas pemeriksa tercatat; tidak ada tahap tambahan wajib Asisten setelah Mandor.
- Askep saja yang melakukan verifikasi akhir; Manager melihat hasil, tidak otomatis memperoleh hak final approval.
- Aturan ini dijelaskan dalam halaman Bantuan dan dijadikan konfigurasi kecil agar mudah diganti, bukan di-hardcode di setiap layar.
- Ini pemeriksaan hasil pekerjaan yang sudah dikerjakan, bukan aplikasi BKM atau pencatatan produktivitas tenaga kerja.

## 3. Role dan akses demo

Gunakan satu akun demo **admin_spt / SPT2026!**. Setelah login, pilih persona Asisten, Mandor, Askep, Manager. Role switcher hanya untuk demonstrasi dan jelas diberi label Mode demo; bukan hak akses production.

| Persona | Tagging | Verifikasi assessment | Periksa realisasi | Verifikasi akhir | Riwayat |
| --- | --- | --- | --- | --- | --- |
| Asisten | Buat/edit draft sendiri, kirim | Tidak | Ya | Tidak | Sesuai scope |
| Mandor | Lihat temuan disetujui | Tidak | Ya | Tidak | Sesuai scope |
| Askep | Lihat | Setujui/revisi/tolak | Lihat | Ya | Sesuai scope |
| Manager | Lihat | Setujui/revisi/tolak | Lihat | Tidak | Sesuai scope |

Scope demo: estate SKDE, beberapa divisi/blok aktual. Asisten/Mandor scope divisi penugasan; Askep/Manager scope estate. Tampilkan scope pada profil dan filter. Jangan menganggap UI hiding sebagai keamanan. Guard route dan mutation mengikuti persona untuk simulasi konsisten. Session akun terpisah dari identity record pembuat/verifier; pergantian persona tidak mengubah audit log lama. Logout menghentikan kamera/GPS dan menghapus sesi, bukan menghapus seluruh draft diam-diam.

## 4. Master masalah: satu sumber kebenaran

Rujuk daftar user, bukan daftar kategori generik. Bila master/dashboard existing berbeda, laporkan lalu gunakan daftar berikut sebagai acuan. **Severity ≠ sensitivity**.

| ID | Nama permasalahan | Timeframe | Sensitivity | Unit | Simbol |
| --- | --- | --- | --- | --- | --- |
| 01 | Pasar Pikul Semak | Short Term | Major | Meter | Pin klasik biru #268BF2 |
| 02 | Underpruning | Short Term | Major | Pkk | Pin klasik hijau #008247 |
| 03 | Areal Banjir / Tergenang | Short Term | Major | Ha | Pin klasik abu-abu #494949 |
| 04 | Titi Panen Kurang / Rusak | Short Term | Major | Unit | Pin klasik indigo #7861EF |
| 05 | Piringan Semak | Short Term | Minor | Pkk | Pin klasik orange #FF6900 |
| 06 | TPH Bermasalah | Short Term | Minor | Ha | Pin klasik pink #FC387D |
| 07 | Gawangan Semak | Long Term | Minor | Pkk | Pin klasik purple #AD3CDB |
| 08 | Defisiensi Hara | Very Long Term | Major | Ha | Pin klasik merah #F52424 |
| 09 | Titik Kosong | Very Long Term | Major | Pkk | Pin klasik teal #20A3A7 |
| 10 | HPT | Very Long Term | Major | Ha | Pin klasik kuning #FFC315 |
| 11 | Konektiviti Teras / Pasar Pikul | Short Term | Major | Meter | Pin drop biru #268BF2 |
| 12 | Pokok Abnormal | Very Long Term | Minor | Pkk | Pin drop hijau #008247 |
| 13 | Semak di Gawangan (Bambu) | Long Term | Minor | Ha | Pin drop abu-abu #494949 |
| 14 | Semak di Gawangan (Pisang) | Long Term | Minor | Ha | Pin drop indigo #7861EF |
| 15 | Gorong-gorong | Short Term | Major / Minor | Unit | Pin drop orange #FF6900 |
| 16 | Jembatan / Box culvert | Short Term | Major / Minor | Unit | Pin drop pink #FC387D |

Source seluruh kategori: Trabas, mengikuti master yang dikirim user. Pkk=jumlah pokok; boleh tampil sebagai Pkk (pokok), jangan diubah menjadi ha. Ha untuk TPH tetap mengikuti master meskipun tampak berbeda dari praktik lain; jangan koreksi sepihak. ID 15–16 sensitivity dipilih per temuan; kategori lain read-only otomatis. Sensitivity tidak berubah hanya karena severity Berat.

Severity per temuan: **Ringan, Sedang, Berat**. Contoh Minor + Berat valid. Tampilkan keduanya dengan badge terpisah. Panduan severity per kategori harus diberi label Contoh kriteria—belum distandardisasi. Gunakan deskripsi kualitatif, jangan mengarang threshold agronomi resmi. Timeframe bukan deadline/status/severity.

Master action:

| Masalah | Action yang boleh dipilih |
| --- | --- |
| Pasar Pikul Semak | Semprot pasar pikul |
| Underpruning | Penambahan HK pruning; Borongan |
| Areal Banjir / Tergenang | Pembuatan bendungan/tanggul; Pembuatan Individual Bund (Pungguhan) untuk areal banjir; Pembuatan / Cuci Parit; Pembuatan continuous bund untuk banjir |
| Titi Panen Kurang / Rusak | Penambahan Titi Panen |
| Piringan Semak | Semprot Piringan |
| TPH Bermasalah | Semprot TPH |
| Gawangan Semak | Semprot Gawangan |
| Defisiensi Hara | Semprot Defisiensi |
| Titik Kosong | Penyisipan |
| HPT | Pengendalian HPT |
| Konektiviti Teras / Pasar Pikul | Perbaikan Akses Teras / Pasar Pikul |
| Pokok Abnormal | Tumbang Pokok Abnormal |
| Semak di Gawangan (Bambu) | Pengendalian Chemist |
| Semak di Gawangan (Pisang) | Pengendalian Chemist |
| Gorong-gorong | Pemasangan Gorong-gorong |
| Jembatan / Box culvert | Pemasangan Jembatan |

Jangan tambahkan Jalan Rusak, Worker, Pencurian, Alat Berat karena belum masuk master masalah ini. Action wording adalah label user, bukan rekomendasi agronomi baru. Satu masalah boleh mempunyai beberapa action relevan dengan target masing-masing; jangan otomatis membuat semua alternatif menjadi pekerjaan wajib.

## 5. Aturan wajib: foto sebagai sumber koordinat tagging

**Lokasi temuan berasal dari koordinat perangkat pada saat foto utama sebelum diambil. Bukan klik peta, pin manual, center viewport, lokasi saat submit, atau titik GPS terbaru setelah kamera ditutup.**

Implementasi browser nyata bila didukung: buka live camera dengan getUserMedia dan rear-facing preference; mulai watchPosition dengan high accuracy setelah izin. Saat shutter ditekan, ambil frame dan snapshot fix GPS terdekat pada saat itu sebagai satu evidence record. API tidak menjamin GPS dan shutter tersinkron sempurna: simpan keduanya dan selisih waktunya; jangan mengklaim precision absolut.

Metadata evidence minimal: evidenceId, before/after, photo blob/ref, capturedAt, GPS position timestamp, latitude, longitude, accuracyMeters, deltaGpsCaptureMs, coordinateSource, captureMode, capturedBy, detectedBlockKey, validation status. Simpan waktu ISO UTC dan tampilkan zona lokal berlabel; jangan mengandalkan string tanggal tanpa timezone.

Quality config contoh mockup: fix age maksimal 10 detik, akurasi maksimum 20 meter untuk enable shutter/submit, dan configurable. Angka ini kebijakan contoh, bukan standar resmi. Jika akurasi buruk, izin ditolak, lokasi timeout, atau fix stale: tampilkan status/retry, jangan fallback diam-diam ke dummy atau 0,0. Draft tanpa bukti valid boleh disimpan, tetapi tidak boleh dikirim sebagai assessment lengkap.

Setelah foto: preview dengan koordinat, waktu, akurasi, mini-map, estate/divisi/blok hasil containment. Pin locked, tidak draggable. Foto tambahan masing-masing punya capture metadata; pilih satu foto sebagai bukti utama lokasi. Mengganti foto utama dengan retake memperbarui lokasi serta block validation secara eksplisit dan tercatat; bukti asli submission sebelumnya tidak ditimpa diam-diam.

Foto galeri tidak otomatis memiliki GPS. Input capture hint tidak menjamin foto baru maupun timestamp shutter. Jangan menempelkan GPS saat file galeri dipilih lalu menyebutnya GPS saat foto diambil. Untuk primary tagging gunakan live capture atau mode simulasi eksplisit. Gallery dapat dipakai bukti pendukung dengan label Lokasi saat pengambilan tidak terverifikasi. EXIF, jika tersedia, bukan bukti kebenaran otomatis dan bukan dependency wajib mockup.

Foto sesudah pemeriksaan realisasi juga merekam koordinat saat capture. Simpan lokasi after terpisah dari lokasi awal; jangan memindahkan temuan ke koordinat after. After di luar blok yang dinilai ditolak/minta retake; jarak ke titik before ditampilkan sebagai informasi, bukan otomatis bukti pekerjaan gagal, karena masalah dapat mencakup garis/area.

Mode demo wajib tersedia untuk testing di laptop: tombol Gunakan simulasi kamera & GPS, banner permanen **SIMULASI—bukan bukti lapangan**, foto ilustratif lokal, koordinat dummy valid dalam blok aktual, dan metadata source=simulation. Satu capture demo membuat satu snapshot pasangan foto/lokasi; tidak berpindah saat render/reload/filter. Jangan meminta user berjalan ke SKDE untuk mencoba mockup. Simulasi tidak boleh menyamar sebagai live GPS. Sediakan skenario izin ditolak, GPS tidak akurat, stale fix, dan lokasi luar blok.

Stop stream tracks/watchPosition ketika keluar capture, logout, atau page tidak lagi membutuhkan sensor; preview image tetap tersedia. Cegah double shutter/submission. Kamera tidak diaktifkan otomatis pada login.

## 6. GeoJSON dan batas blok

Gunakan SKDE.json aktual. Bila file ada di root smartproblemtagging, URL static aplikasi adalah ../SKDE.json; jika public/bundler, sesuaikan base URL aktual. README harus menyebut lokasi pasti, bukan path ambigu.

Fetch benar: cek response.ok → await response.json() → payload.data ?? payload → validasi FeatureCollection. Dukung wrapper {success,data}, Polygon, MultiPolygon, holes. Properties aktual estate, divisi, blok; composite key bukan blok saja. GeoJSON [lng,lat], Leaflet [lat,lng]. Group bagian polygon dengan key sama. Exclude blok '-' / kosong dari penugasan/tagging dan jelaskan kenapa.

Location containment wajib pada geometri asli termasuk holes. Raw centroid/bounds center tidak cukup. Titik di boundary ambigu jangan diassign sembarang. Visualisasi accuracy circle; jika circle bersinggungan beberapa blok, tampilkan peringatan kualitas/boundary dan minta fix lebih baik atau retake—jangan menggeser koordinat. GPS coordinate sendiri bukan jaminan block identity presisi.

Pilih blok sebelumnya hanya untuk penugasan/navigasi. Sesudah foto, detected block harus cocok dengan selected block/scope; mismatch minta retake/lokasi ulang atau perubahan penugasan yang eksplisit, bukan edit pin. Jangan mengizinkan submission di luar polygon/scope. Untuk mockup titik mewakili lokasi foto, bukan extent seluruh volume masalah. Mode garis/area pengukuran boleh ditulis future enhancement; tidak perlu menambah editor berat.

Leaflet lokal/existing, Google basemap sesuai konfigurasi yang tersedia dan berizin. Jangan membuat endpoint tidak resmi sebagai workaround atau menaruh credential rahasia. Basemap unavailable tidak menghilangkan boundary, evidence pins, atau form. Tampilkan fallback netral dan pesan spesifik. GeoJSON cache sekali, peta refresh ukuran saat container berubah; jangan recreate berulang tanpa cleanup.

## 7. Daftar lengkap halaman/route

Setiap halaman berikut harus bisa dibuka dan mempunyai interaksi nyata. Page boleh berbentuk route atau sub-step, bukan harus file HTML terpisah.

| No | Route contoh | Isi dan aksi utama |
| --- | --- | --- |
| 01 | #/login | Judul, kredensial demo, validasi, login |
| 02 | #/persona | Pilih Asisten/Mandor/Askep/Manager dan scope demo |
| 03 | #/beranda | Tugas saya per tahap, overdue, draft/belum sinkron, quick actions sesuai role |
| 04 | #/blok | Estate/divisi/blok cascading, search, list/peta toggle, jumlah temuan dan status assessment |
| 05 | #/blok/:key | Nama blok, peta, summary Major/Minor dan severity, assessment aktif, list temuan, mulai assessment |
| 06 | #/assessment/baru | Pilih blok penugasan, tanggal/round assessment, daftar temuan, tambah temuan |
| 07 | #/temuan/baru | Step pilih kategori → capture foto/lokasi → severity/sensitivity/volume → usulan action → review |
| 08 | #/capture | Kamera live/demo, GPS quality, shutter/retake/cancel, preview evidence immutable |
| 09 | #/temuan/:id | Tab Permasalahan, Action Plan & Realisasi, Riwayat Verifikasi; evidence sebelum + peta |
| 10 | #/assessment/:id/review | Review seluruh draft temuan blok, validasi kelengkapan, kirim assessment |
| 11 | #/tugas | Tabs sesuai role: Assessment, Realisasi, Verifikasi akhir; filter/search dan counter konsisten |
| 12 | #/assessment/:id/verifikasi | Askep/Manager review per temuan, before foto/lokasi, setuju/revisi/tolak, alasan, selesaikan review blok |
| 13 | #/temuan/:id/revisi | Asisten lihat alasan/field changes, edit permitted fields, retake bila lokasi salah, kirim ulang versi baru |
| 14 | #/action/:id | Action, target unit/volume, due date/PIC, approved vs submitted progress, sisa, riwayat batch |
| 15 | #/action/:id/periksa | Asisten/Mandor cek pekerjaan: incremental realisasi, tanggal, after capture, hasil kualitas, kondisi masalah, review/kirim |
| 16 | #/realisasi/:id | Detail batch, before–after, foto/GPS, volume, notes, status verifikasi |
| 17 | #/realisasi/:id/verifikasi | Askep sahkan volume terverifikasi atau minta perbaikan, alasan dan keputusan penutupan temuan |
| 18 | #/dokumentasi/:id | Before–after dengan captions tanggal/petugas/lokasi, pinch/enlarge, pilih batch, notes |
| 19 | #/riwayat | Timeline assessment/action/approval, search/filter, buka detail read-only |
| 20 | #/notifikasi | List tugas, revisi, disahkan, jatuh tempo; deep link ke record, mark read |
| 21 | #/draft-sinkronisasi | Draft lokal, queued/failed/synced simulated, retry, detail error, jangan menghapus diam-diam |
| 22 | #/profil | Persona/scope, akun demo, ubah persona, bantuan, logout, reset demo dengan konfirmasi |
| 23 | #/bantuan | Empat tahap, definisi unit/severity/sensitivity, quality GPS, offline demo, panduan preview Chrome |

Bottom navigation: **Beranda · Peta/Blok · Tugas · Riwayat**. Profil/notifikasi via header. Saat capture/wizard, hindari navigasi yang membuang form tanpa konfirmasi. Back memakai history yang jelas dan fallback route aman. Direct link invalid ID/unauthorized role menunjukkan halaman informatif, bukan crash.

## 8. Detail input assessment

Assessment satu blok per round mempunyai ID dan beberapa findings; revisi menghasilkan version history, tidak menghapus bukti lama. User dapat menambah beberapa kategori dan beberapa titik satu blok. Form finding berisi:

- Master kategori, source Trabas, timeframe otomatis.
- Severity Ringan/Sedang/Berat dengan guidance contoh.
- Sensitivity otomatis kecuali kategori 15/16.
- Volume positif dan unit read-only; Pkk/Unit integer; Meter/Ha desimal. Jangan sum unit berbeda. Bila luas masalah Ha melebihi luas produksi known, warning dan alasan—jangan memakai luas GeoJSON sebagai standar bisnis otomatis.
- Catatan kondisi, foto before utama mandatory untuk submit, tambahan opsional.
- Capture coordinates locked, timestamp, accuracy, block verification dan source live/demo.
- Usulan action dari master, PIC mock, target selesai; minimal satu action saat assessment dikirim pada skenario ini.
- Target terukur per action. Default target cakupan penanganan memakai unit masalah untuk mockup; jika action fisik memakai unit berbeda (banjir Ha vs parit Meter), simpan work output terpisah dan jangan dibandingkan langsung atau diubah otomatis. Jelaskan target cakupan masalah vs output pekerjaan pada UI.

Step review memperlihatkan seluruh info dan membedakan editable form vs immutable evidence. Submit disabled bila invalid, error inline jelas. Draft tidak mensyaratkan semua field. Warning possible duplicate berdasarkan kategori/blok/kedekatan/tanggal, tidak auto-delete karena beberapa temuan kategori sama valid.

## 9. Assessment approval dan revisi

Finding assessment state: Draft → Submitted → Approved / Revision Requested / Rejected. Revisi dikirim ulang sebagai version baru → Submitted. Submission adalah snapshot; perubahan draft tidak mengubah record yang sedang direview.

Askep/Manager memberi keputusan per finding, bukan satu tombol approve seluruh blok tanpa pengecekan. Revisi/tolak wajib alasan. Correction volume/severity oleh verifier boleh diusulkan dengan old/new/reason lalu dikonfirmasi pada review; hanya final approved revision menjadi basis action. Evidence coordinates/image/timestamp tidak dapat diedit verifier; lokasi salah berarti retake/revisi oleh Asisten.

Assessment container memisahkan reviewComplete, jumlah Approved/Revision Requested/Rejected/Pending. Review complete bukan semua findings approved. Action hanya aktif untuk temuan approved; temuan revisi/tolak tidak menghasilkan tugas realisasi aktif. Tombol Selesaikan review blok enabled setelah semua submitted findings diberi keputusan. Jangan otomatis menandai seluruh blok selesai masalah karena assessment selesai.

Simulasikan record sudah diputus persona lain: tampilkan keputusan terbaru dan cegah double approval; guard mutation memeriksa current state/version. Jangan klaim server concurrency production.

## 10. Realisasi bertahap dan verifikasi akhir

Action state: Planned → In Progress → Pending Verification → Completed atau Rework Required. Satu action punya beberapa incremental realization batches. Pengiriman batch tidak otomatis Completed. Simpan submitted, accepted, dan pending volumes terpisah.

Contoh Pasar Pikul 1.000 Meter: batch pertama approved 600; batch kedua submitted 250; tampilkan **Disahkan 600/1.000 (60%), Menunggu 250, Sisa belum disahkan 400**. Jangan menampilkan 85% sebagai approved progress. Batasi input baru terhadap target minus accepted minus pending supaya tidak double-count. Setelah batch ditolak/perbaikan, volume tidak masuk accepted. Setiap batch punya ID, actor, after evidence, dates, quality outcome, notes, dan decision log. Resubmission memperbarui versi batch yang sama, tidak menambah volume ganda.

Asisten/Mandor memeriksa realisasi, memilih sesuai/perlu perbaikan, mencatat volume incremental dan bukti after. Askep dapat mengesahkan accepted volume ≤ submitted; bila hanya sebagian diterima, catat rejected remainder/alasan. Accepted total tidak melampaui target. Realisasi pekerjaan yang belum sesuai tetap terlihat sebagai pemeriksaan gagal/rework, bukan dihapus.

Kondisi permasalahan berbeda dari pekerjaan: **Teratasi / Sebagian teratasi / Belum teratasi**. Kondisi yang diajukan pemeriksa belum final sampai Askep sahkan. Action plan 100% tidak otomatis menutup finding. Tombol Tutup temuan hanya ketika required actions selesai/disahkan DAN Askep menyatakan masalah Teratasi. Bila pekerjaan lengkap tetapi masalah belum teratasi, temuan tetap Monitoring/Perlu tindak lanjut; boleh usulkan action tambahan lewat approval yang jelas. Reopened mencatat alasan, bukan mengedit closure lama.

Jangan menggabungkan target alternatif action menjadi volume tunggal atau menghitung progress finding dengan average persentase sembarang. Untuk mockup awal tampilkan progress per action dan count actions selesai/total; jangan sum kuantitas lintas unit/action yang tumpang tindih.

## 11. Dummy skenario wajib dan tally

Data deterministic dengan tanggal/ID/actors konsisten. Gunakan nama blok SKDE GeoJSON aktual, misalnya DIVISI 3 / S-28, S-29, T-29 setelah memastikan feature ada. Evidence dummy coordinates point-in-polygon dengan holes; seeded sekali, tidak rerandomize pada navigasi. Foto lokal ilustratif dan watermark Simulasi; jangan gunakan foto palsu sebagai before–after lapangan asli.

Minimal 12 temuan pada ≥3 blok, mencakup Major/Minor, seluruh severity, classic/drop marker, Draft, Submitted, Approved, Revision Requested, Rejected, action bertahap, batch pending, partial accepted, rework, action completed tetapi masalah belum teratasi, dan finding closed. Master lengkap 16 kategori dapat dipilih meskipun seed tidak menggunakan semua.

Sediakan demo journey siap klik:

1. Asisten draft Piringan Semak Minor/Berat → before capture demo valid → kirim assessment.
2. Askep review volume → minta revisi → Asisten revise → Manager approve assessment.
3. Asisten/Mandor kirim batch realisasi → Askep partial accept → correction/resubmit tanpa double count.
4. Action selesai 100% tetapi masalah masih sebagian → tidak closed otomatis.
5. Seluruh required action selesai dan masalah teratasi → Askep tutup temuan → riwayat before–after.
6. GPS deny/bad/stale/outside block → draft boleh, submit tidak; explicit demo recovery.

Card counters, map summaries, task queue, filters, detail, history dan notifications mengambil store/selectors yang sama. Bedakan summary sensitivity Major/Minor dari severity Ringan/Sedang/Berat, bukan chart campur kategori.

## 12. Offline dan penyimpanan mockup

Backend tidak ada. Badge Online/offline mengikuti browser atau toggle demo berlabel; **Tersinkron simulasi tidak berarti terkirim ke server**. Implementasikan queue mock dengan deterministic outcomes, status Draft/Queued/Failed/Synced-demo dan retry idempotent. Simulasi submit ketika offline menunggu; approval lintas persona terjadi pada store lokal demo saja.

Persist metadata dan foto blob dalam IndexedDB bila implementasi feasible; sessionStorage hanya sesi login. Jangan menaruh foto base64 atau GeoJSON besar ke localStorage. Bila persist foto belum diimplementasi, katakan foto preview session-only dan draft incomplete setelah reload, bukan menjanjikan saved evidence. Tangani quota/storage failure tanpa kehilangan bukti diam-diam. Limit/kompres thumbnail gambar dengan ukuran reasonable; retain capture metadata. Object URLs bukan URL durable; create dari blob lalu revoke saat cleanup.

Jangan implementasikan service worker hanya agar label offline tampak canggih. Bedakan draft offline, cached map readiness, dan tile offline. Tanpa service worker/cache seluruh assets, cold-start offline tidak dijamin; tulis keterbatasannya. Reset demo konfirmasi dan scoped pada database/storage aplikasi, jangan menghapus storage dashboard.

## 13. Model data dan audit minimal

MasterCategory; DemoPersona/Scope; Assessment(id,blockKey,round,version,creator,statusSummary); Finding(id,assessmentId,categoryId,severity,sensitivity,volume,unit,notes,primaryEvidenceId,assessmentState,problemCondition,closure); Evidence(metadata foto/GPS); ActionPlan(id,findingId,actionType,targetCoverage,coverageUnit,optionalOutputUnit,pic,dueDate,state); RealizationBatch(id,actionId,submittedVolume,acceptedVolume,evidenceIds,quality,proposedCondition,state,version); Decision(actor,role,time,reason,old/new,recordVersion); Notification; SyncQueueItem.

Gunakan reducer/state transition utility terpusat. Approval/status/perhitungan tidak dibuat di render component. ID unique/stable, referential integrity, validation input, persisted schema version. Sanitize notes via textContent/safe render; jangan innerHTML input mentah. Jangan log foto sensitif/GPS detail ke console tanpa alasan. Routing/permissions tetap simulasi, tidak ada enkripsi/access security claim.

## 14. UI state dan performance

Semua layar punya loading/empty/error/offline/success yang relevan. Skeleton singkat bukan perpetual spinner. Disabled CTA menjelaskan alasan. Toast + detail state, bukan toast saja. Modal konfirmasi reject/reset/leave unsaved. Save draft responsif, double click guard, pending operation indicator. Tidak ada dialog browser berulang mengganggu.

Map summary pada estate/divisi, detail pins saat blok cukup zoom; filters kategori/sensitivity/severity/status, legend accessible, fullscreen/collapse, locked evidence preview. Jangan menampilkan ribuan detail pins dan semua gambar bersamaan. Fetch GeoJSON sekali, visible layers/markers, stable callbacks/cleanup/invalidateSize. Form tidak hilang saat kembali dari kamera. Back tidak selalu ke beranda.

## 15. Cara mencoba di komputer/HP: wajib README

Antigravity harus memberi langkah tepat sesuai stack yang benar-benar dibuat dan URL/port yang tampil setelah menjalankan server.

Untuk static: jalankan Live Server dari root smartproblemtagging atau `python -m http.server 8000` di root, buka `http://localhost:8000/aplikasi/`. Jangan membuka index.html lewat double click/file:// karena fetch data tidak andal. Untuk bundler, berikan command start/build aktual dan URL entry aplikasi; jangan menebak.

Chrome Windows preview:

1. Buka URL app, klik kanan Inspect atau F12.
2. Aktifkan Toggle device toolbar (ikon HP/tablet) atau Ctrl+Shift+M saat DevTools terbuka.
3. Pilih Responsive, set 390×844 atau 412×915, portrait; refresh bila perlu.
4. Coba login, pilih persona, dan seluruh demo journey. Gunakan mode simulasi kamera/GPS untuk foto di blok SKDE.
5. Untuk menguji geolocation browser: DevTools More tools → Sensors → custom latitude/longitude yang diambil dari koordinat valid seed SKDE, bukan koordinat kota default. Sediakan contoh koordinat aktual dari seed project di README. Device toolbar sendiri tidak memindahkan GPS ke SKDE.
6. GPS/camera nyata memerlukan permission dan secure context (HTTPS atau localhost yang sesuai). Device Mode bukan emulator Android penuh, tidak menjamin rear camera/behavior native. Jika membuka dari HP via `http://IP-komputer:port`, jangan janji sensor bekerja seperti localhost; gunakan HTTPS yang sesuai atau mode simulasi untuk mockup.

Jangan meminta inspect/edit CSS manual untuk membuat app portrait: desain sudah responsive, Device Mode hanya preview. Beri screenshot nyata setidaknya login, beranda tiap role, tagging capture, assessment verification, realization, final approval, before–after, dan empty/error states.

Referensi teknis untuk implementasi dan README:

- https://developer.chrome.com/docs/devtools/device-mode
- https://developer.chrome.com/docs/devtools/sensors
- https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

## 16. Tahapan implementasi yang wajib

1. Audit root dan pilih entry aplikasi; master 16 categories/action, scope dan workflow config.
2. Build mobile shell, route seluruh page, login/persona guards, seed/store/selectors; semua navigation bekerja.
3. GeoJSON/block validation + capture demo immutable. Tuntaskan happy/error path sebelum sensor live.
4. Live camera/GPS jika didukung, quality metadata/permission handling, cleanup, draft/form submission.
5. Assessment per-finding review, revision versioning, approved action activation.
6. Incremental realization, after capture, Askep partial/full approval, problem condition/closure.
7. Persistence/queue simulasi, notifications/history/documentation, regression/performance/README.

Setiap tahap jalankan build/lint/tests yang tersedia dan browser checks sebelum lanjut. Jangan menyatakan selesai karena UI screenshot saja; semua CTA harus bekerja. Jangan menambah state/dependency berat sebelum membuktikan kebutuhan.

## 17. Acceptance checklist wajib

- Seluruh 23 route/halaman tersedia dengan back/deep-link/invalid ID handling; no blank screens.
- Empat persona mendapatkan tugas/aksi sesuai matrix; route dan mutation forbidden blocked. Logout menghentikan sensor, refresh memulihkan state demo sesuai kebijakan.
- Master 16 nama/unit/sensitivity/timeframe/source persis; Minor+Berat valid; ID15/16 Major/Minor editable; unit otomatis, integer/decimal valid.
- Before primary coordinate snapshot sama dengan capture evidence, tidak berubah setelah submit/filter/map pan/zoom; pin tidak draggable. Retake explicit menghasilkan evidence/version baru.
- GPS permission deny/stale/bad accuracy/outside/hole/wrong scope/boundary ambiguity semuanya ditangani; tidak fallback 0,0 atau dummy hidden. Simulation mode jelas, seed valid di polygon asli.
- Gallery tanpa verified capture metadata tidak menjadi primary live evidence. Camera cleanup, GPS cleanup, duplicate shutter/submit guard bekerja.
- Review assessment per finding dengan alasan revisi/tolak; all decisions sebelum reviewComplete; approved only mengaktifkan action; verifier tidak mengedit immutable GPS.
- Batch 1.000 Meter /600 approved /250 pending menunjukkan accepted 60%, pending 250, remaining unapproved 400. Retry/resubmit tidak double-count; partial accept ≤submitted; total ≤target; tidak sum Ha+Meter+Pkk+Unit.
- After metadata terpisah dari before, tidak memindahkan finding; foto/waktu/actor muncul di documentation/history.
- Action 100% tidak otomatis closed; final closure hanya Askep + required actions selesai + condition Teratasi. Manager tidak final approve.
- Semua card/map/task counters tally dengan filtered store; role switch tidak mengubah history actors.
- Draft incomplete boleh disimpan, invalid submit ditolak dengan alasan. Storage failure/quota/photo reload keterbatasan jelas. Queue mock idempotent, label synced-demo jujur.
- GeoJSON/tile failure tidak merusak form dan app shell; root dashboard/login/pages tidak berubah/rusak; CSS/storage tidak bocor ke parent.
- 360×800,390×844,412×915,430px dan desktop preview: no horizontal overflow, keyboard tidak menutup CTA permanen, scrolling/header/footer/touch targets sesuai.
- Build/lint/tests/browser console diperiksa; screenshot dan demo journey disertakan. Test yang belum dilakukan disebut belum, bukan fabricated pass.

## 18. Handoff

Berikan daftar file dibuat/diubah, command start aktual, URL aplikasi, akun demo/persona/scope, lokasi GeoJSON, cara Device Mode portrait, seed demo journey, hasil test nyata, keterbatasan browser/sensor/offline/security, serta screenshot halaman. Pastikan user cukup mengikuti README tanpa mengedit coding atau inspect CSS untuk mencoba.

Definisi sukses: mockup mobile corporate yang nyaman, seluruh proses empat tahap lengkap dan saling terhubung; foto menjadi sumber coordinate tagging yang locked/bermetadata; master unit/sensitivity benar; severity terpisah; verifikasi bertahap/tally/riwayat benar; semua page navigable; dapat dicoba di laptop portrait lewat Device Mode dengan simulasi eksplisit; project dashboard parent tetap aman dan utuh.
