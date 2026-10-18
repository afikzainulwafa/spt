# Dokumen Referensi Produksi & Yield Moving SKDE
**Sumber Rujukan:** Data Operasional Trailing 12-Month Yield Moving Estate SKDE (Jan–Jul 2026) & Proyeksi Easing 2026–2027.

---

## 1. Parameter Utama & Asumsi Normalisasi

- **Estate Target:** SKDE (109 Blok Valid terpetakan pada `SKDE.json`).
- **Periode Window:** 24 Bulan Kontinu (Agustus 2025 – Juli 2027).
- **Cut-Off Observasi:** Juli 2026 (Bulan ke-12).
- **Periode Historis:** 12 Bulan (Agu 2025 – Jul 2026).
  - 5 Bulan Sintetis Historis: Agu 2025 – Des 2025.
  - 7 Bulan Moving Observasi Sumber: Jan 2026 – Jul 2026.
- **Periode Proyeksi:** 12 Bulan (Agu 2026 – Jul 2027) berbasis kurva pemulihan Hermite easing menuju 100% potensi agronomis pada bulan ke-9 sampai ke-12.

---

## 2. Blok Contoh Publikasi Resmi (Benchmark)

### A. Blok S-28 (SKDE / DIVISI 3)
- **Luas Sumber:** 33,54 Ha
- **Target Pemulihan (Recovery Month):** Bulan ke-10 (Mei 2027)
- **Potensi Moving:** 29,33 Ton/Ha (Agu 2025) → 29,00 Ton/Ha stabil (Des 2025 – Jul 2027)
- **Aktual Moving:** 20,20 Ton/Ha (Agu 2025) → 26,30 Ton/Ha (Jul 2026)
- **Rasio BCCR Cut-off:** 90,69% (Masuk kategori 90–<100%, Hijau `#339966`)
- **Hasil Proyeksi:**
  - Agu 2026: 26,38 Ton/Ha (90,95%)
  - Mei 2027 (Bulan ke-10): Tepat 29,00 Ton/Ha (100,00% Potensi)
  - Jun–Jul 2027: Mengikuti potensi pada 29,00 Ton/Ha (100,00%)

### B. Blok S-29 (SKDE / DIVISI 3)
- **Luas Sumber:** 26,94 Ha
- **Potensi Moving:** 29,00 Ton/Ha
- **Aktual Moving Jan–Jul 2026:** 22,2; 23,4; 22,3; 24,5; 25,8; 26,5; 30,6 Ton/Ha
- **Rasio BCCR Cut-off:** 105,52% (Masuk kategori ≥100%, Hijau Tua `#009900`)
- **Skenario Proyeksi:** Di atas potensi (Maintain / Above Potency scenario).

### C. Blok T-29 (SKDE / DIVISI 3)
- **Luas Sumber:** 29,75 Ha
- **Potensi Moving:** 28,90 Ton/Ha
- **Aktual Moving Jan–Jul 2026:** 22,5; 22,6; 23,8; 25,2; 24,9; 26,8; 28,0 Ton/Ha
- **Rasio BCCR Cut-off:** 96,89% (Masuk kategori 90–<100%, Hijau `#339966`)
- **Target Pemulihan:** Bulan ke-11 (Jun 2027).

---

## 3. Formula Agregasi Tertimbang (Area-Weighted Aggregation)

Untuk tingkat Divisi dan Estate, yield tidak boleh dirata-ratakan aritmatika sederhana. Digunakan pembobotan luas areal:

$$\text{aggregateYield}(t) = \frac{\sum (\text{blockYield}(t) \times \text{area})}{\sum \text{area}}$$

$$\text{aggregateBCCR}(t) = 100 \times \frac{\sum (\text{actualMoving}(t) \times \text{area})}{\sum (\text{potencyMoving}(t) \times \text{area})}$$
