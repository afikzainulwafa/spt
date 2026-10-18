# TNKE Smart Problem Tagging — Dummy Tracking 5 Activities

## Hasil

620 tracking baru; 630 total termasuk 10 track asli F-59.

| Kegiatan | Track baru | Proporsi track baru |
|---|---:|---:|
| IPD Panen | 372 | 60,00% |
| Inspeksi Pemupukan | 92 | 14,84% |
| Inspeksi Upkeep | 92 | 14,84% |
| Blok Checklist | 55 | 8,87% |
| Pengancakan | 9 | 1,45% |

**F-59 tidak berubah:** sepuluh features dari `tnke_tracking_F59_original.geojson` disalin sama persis, termasuk coordinates dan properties-nya. Persentase di tabel dihitung **hanya untuk tracking baru**, bukan 10 tracking lama F-59.

## Geometri

- IPD Panen: jalur penuh/tembus blok.
- Inspeksi Pemupukan: jalur terputus/parsial dengan panjang berbeda.
- Inspeksi Upkeep: jalur sebagian/bervariasi.
- Blok Checklist: jalur inspeksi berbelok/zigzag halus.
- Pengancakan: jalur masuk lalu berbalik (U), **hanya D-49, D-55, E-55, F-49, F-53** di DIVISI 2. Pengancakan lama di F-59 adalah data original dan tetap ada tanpa perubahan.

Seluruh jalur baru berada dalam polygon blok bersangkutan. Jumlah jalur tiap blok mengikuti besaran perkiraan activity-coverage dari logika simulasi `tnke_store.js`, dihitung melalui skrip dasar. Distribusi jenis tracking dibuat sehingga 60% dari **track baru** bertipe IPD Panen.

Asumsi visual: **satu jalur normal kira-kira 1,3 ha**, **satu jalur U kira-kira 2,7 ha**. Ini faktor perencanaan visual, bukan pengukuran area nyata berdasarkan buffer dan geometri. Banyak jalur dan coverage yang direpresentasikan tidak harus sama dengan area unik hasil union buffer, karena overlap dan panjang jalur bervariasi.

### Pakai di Antigravity

1. Ganti `tnke_tracking.geojson` yang dipakai map dengan `tnke_tracking.geojson` yang ada di paket ini.
2. Tetap gunakan kategori filter yang sudah ada (berdasarkan `activity_id` / `activity_name`), jangan infer kegiatan dari warna/ID.
3. Gunakan style legend map yang sudah ada untuk warna kegiatan. Tidak perlu mengubah data tagging dan F-59.
4. Persentase coverage sumber jangan dihitung ulang dari jumlah polyline. Gunakan `tnke_store.js` sebagai source of truth; line dummy hanyalah visualisasi.
5. Jika coverage yang ditetapkan di antarmuka berubah, lakukan update jumlah jalur atau subset jalur yang terlihat secara dinamis. GeoJSON ini adalah **snapshot** September 2026; tidak otomatis berubah sendiri ketika state browser berganti.

### Menjalankan ulang generator

Python 3.10+:

```bash
pip install -r requirements.txt
python generate_tnke_tracking_proportional.py
```

Dua script harus ada bersama `TNKE(1).json` dan `tnke_tracking_F59_original.geojson`. Generator menggandakan pola coverage simulasi source JS lama dan menyebarkan jenis aktivitas dengan kuota 60% IPD. Output `tnke_tracking_5_activities.geojson` dan CSV per blok bisa dibuat menggunakan `--output` dan `--summary` untuk nama custom.

**Catatan khusus E-55 dan F-53:** skrip baseline sebelumnya mempunyai nilai activity coverage 0 dalam dummy store untuk kegiatan tertentu; jalur Pengancakan/IPD ditambahkan sebagai pengecualian mockup. Samakan simulasi coverage app bila nanti diperlukan konsistensi angka per aktivitas 1:1.
