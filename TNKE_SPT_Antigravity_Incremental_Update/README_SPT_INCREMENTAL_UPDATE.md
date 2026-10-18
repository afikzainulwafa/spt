# SPT TNKE: 16 Kategori / Integrasi Antigravity (Incremental)

## Folder input / output

- `tnke_problem_tags.geojson`: GeoJSON clean yang memakai schema persis 13 properti original, 424 titik dan 16 kategori, tanpa zone/scenario/workflow. **File inilah yang digunakan aplikasi sebagai sumber marker.**
- `tnke_spt_problem_master_16.json`: 16 kategori kanonik beserta satuan asumsi untuk simulasi.
- `tnke_action_plan_mockup.json`: status penyelesaian mockup, terpisah dan di-link memakai `tag_id`.
- `spt_problem_map_analytics_clean.mjs`: helper reference untuk menerjemahkan schema GeoJSON lama ke agregasi peta tanpa mengubah input. Memerlukan object `TNKE.json` sebagai referensi polygon yang ada di project.
- `ANTIGRAVITY_PROMPT_SPT_INCREMENTAL_UPDATE.md`: instruksi lengkap khusus untuk mempertahankan adjustment UI Antigravity sebelumnya dan menyempurnakan fungsinya.
- `TNKE_SPT_validation_report.json`: hasil audit data dan acceptance test.

## Cara menggunakan

1. Extract ZIP, lalu berikan semua file ke Antigravity.
2. Copy prompt di `ANTIGRAVITY_PROMPT_SPT_INCREMENTAL_UPDATE.md`.
3. Minta Antigravity bekerja di project **existing**, bukan membuat ulang website. Pastikan data loader hanya menunjuk pada `tnke_problem_tags.geojson`.
4. `TNKE.json` yang sudah ada di project **tetap dipakai**, jangan ditimpa.
5. Data workflow status hanya simulasi dan tidak boleh dianggap status operasional aktual.

## Validasi cepat

- Total 424 point: 402 QGIS + 22 F-59 curated.
- 16 kategori tersedia dan masing-masing punya setidaknya 1 tagging.
- Skema `properties` tidak berubah dari 22 titik lama.
- F-59 Underpruning: 5 tagging, 102 pokok.
- DIVISI 2 Underpruning September 2026: 846 pokok. Kontribusi F-59 = 12,1%.
- Semua data awal F-59 (termasuk ejaan `uderpruning` pada data asli) tetap asli; normalisasi untuk UI dilakukan saat runtime.
