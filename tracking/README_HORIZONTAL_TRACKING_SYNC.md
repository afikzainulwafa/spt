# TNKE SPT — Horizontal Tracking & Store Date Sync

## What changed

- `tnke_tracking.geojson` has **630 LineString features**. The **original 10 F-59 tracking records are copied unchanged**, including dates, geometry, properties and their order.
- The other **620 simulated features are now EAST–WEST (horizontal)** instead of North–South:
  - 372 IPD Panen (60% of newly generated lines), mostly full-width, up to 300 m.
  - 92 Inspeksi Pemupukan, horizontal partial lines.
  - 92 Inspeksi Upkeep, horizontal partial lines.
  - 55 Blok Checklist, slightly zigzag horizontal lines.
  - 9 Pengancakan, horizontal U-turn loops in D-49, D-55, E-55, F-49, and F-53 only. U lengths ~605–611 m.
- All new geometry is clipped/validated to original TNKE polygons. In narrow or irregular geometries, some lines are shorter than 300 m (median IPD Panen ~298 m).
- Each generated record has `visit_id` matching a `visitId` in the supplied `tnke_store.js`, and `date`, `tanggal`, `activity_id`, `blok` are checked against it.
- **12 supplemental mock visits** were needed where a block+activity pair was missing in the old store. They are added idempotently to `tnke_store.js`. They do NOT change existing visit records, F-59, or combined unique observation coverage/percentages.
- The first ten F-59 tracking lines still have their original properties, so they do not have the new `visit_id` or `tracking_distance_m` fields. This is intentional.

## Files to replace in Antigravity

1. Replace the existing map tracking GeoJSON with `tnke_tracking.geojson`.
2. Replace the existing `tnke_store.js` with the supplied patched version, **after reconciling with changes in your current project**. This copy is based on the uploaded October 18 source and must not overwrite newer Antigravity-specific changes blindly.
3. No change to `TNKE.json`, `tnke_problem_tags.geojson`, polygon coverage percentages, or the curated F-59 records.

## Important implementation notes

- **Tracking lines are visual mock data; the real coverage source of truth is still `tnke_store.js` monthlyAssessment.** Do not recompute percentages from number of lines or buffer union.
- 300 m ≈ 1.3 ha, and 600 m U ≈ 2.7 ha are **planning assumptions**, not surveyed area. For irregular polygons, a full horizontal run can be shorter.
- `visit_id` may repeat across several LineString features. One visit can contain multiple routes; there is no one-to-one assumption.
- `is_supplemental_visit: true` only appears on the 12 generated tracking features that need a new matching store visit.
- `tnke_store.js` now migrates both fresh demo state and existing localStorage state. It checks `visitId` first to avoid adding supplemental visits twice.
- **The GeoJSON itself is a September 2026 snapshot, not a live browser-side generator.** For live response to changing coverage %, have Antigravity implement a state-aware line subset or regenerate tracks, using existing store values. Do not overwrite the exact F-59 routes.

## How to regenerate

Install Python 3.10+ and dependencies:

```bash
pip install -r requirements.txt
python rebuild_horizontal_tracking.py
python patch_tnke_store.py
python verify_tracking.py
```

The generator is deterministic and uses the included previous 60% tracking dataset, TNKE polygons and extracted store visit schedule. `patch_tnke_store.py` works from `tnke_store_original.js` and the generated supplemental JSON.

## Validation performed

- 630 unique feature IDs.
- Preserved 10 F-59 source features exactly.
- All 620 new lines remain inside the intended polygons.
- All 620 generated `visit_id` values match the revised store on block, activity and date.
- 372/620 = 60% IPD Panen.
- All 9 generated U tracks are on five specified blocks only.
- All original combinedUniqueHa, combinedUniquePct, remainingHa and totalAreaHa are unchanged, including F-59.
- 12 additional visit records in the supplied store, 0 duplicated original visits.

