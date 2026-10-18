# ANTIGRAVITY — SMART PROBLEM TAGGING / INCREMENTAL UPDATE

## Context and highest-priority instruction

You are working on my **EXISTING Smart Problem Tagging (SPT) mockup**, not a new project. **Antigravity has already made visual/UI adjustments since the earlier instructions.** First inspect the actual CURRENT source code, existing page state, map layers, design, filters, components and any uncommitted changes. **Preserve all improvements already in the app** and implement only the missing or incorrect requirements below. Do not rebuild a new layout from the screenshot, do not revert previous UI changes, do not replace working map libraries, and do not overwrite current polygon/coverage/observation logic.

Apply a targeted enhancement to the existing **Map & Coverage Observasi** page and any shared Problem Tagging/filter code. The latest app implementation has priority as the baseline for appearance and responsive behavior; the specification below defines the features and correctness criteria to merge into it.

## 1 — Supplied files and required filenames

1. **`tnke_problem_tags.geojson`** — NEW authoritative tagging point file. This exact filename must be used in the app. It has **424 GeoJSON Point features** (402 simulated QGIS points + 22 original curated F-59 points) covering **16 canonical problem categories**. The `FeatureCollection` and each feature's properties **intentionally use the original, minimal legacy schema**. It must not gain extra `zone`, `scenario`, `estate`, `divisi`, `problem_category_id`, `satuan`, `action_plan_status`, or analytics columns.
2. **`tnke_spt_problem_master_16.json`** — source of truth for canonical 16 categories, IDs, display labels and example measurement units; unit values are **mockup assumptions** pending business validation.
3. **`tnke_action_plan_mockup.json`** — SEPARATE synthetic action-plan data keyed by `tag_id`; supplies `action_plan_status` and optional progress fields. Do not merge these fields back into the tagging GeoJSON. If the current app has a functional action-plan system, integrate it sensibly without replacing real records; use the sidecar for mockup fallback only.
4. **`spt_problem_map_analytics_clean.mjs`** — tested standalone reference implementation that reads the clean schema, the category master, the status sidecar, and existing TNKE polygons, then calculates map status and contribution metrics. Adapt its pure functions into existing state/framework; do not introduce two conflicting implementations.
5. Keep the existing **`TNKE.json`** polygon layer already in the project. It is the authoritative source for `estate`, `divisi`, `blok` and geometry. Some installations wrap the feature collection in `.data.features`.

**Important compatibility:** Older prompts mentioned `tnke_problem_tags_all.geojson` / `tnke_problem_tags_all_v2.geojson` and relied on `problem_category_id`, `estate`, `divisi`, `satuan`, `action_plan_status` embedded within point properties. **Those assumptions are obsolete. Do not use those older files or add those columns to the new `tnke_problem_tags.geojson`.**

### Exact point schema to preserve

The properties keys are exactly:

`id`, `problem`, `ringan`, `sedang`, `berat`, `blok`, `tanggal`, `bulan`, `tag_id`, `problem_normalized`, `date`, `year_assumed`, `is_simulation`.

Each feature also has top-level `type`, `id`, `properties` and `geometry: {type:'Point', coordinates:[longitude,latitude]}`. Root fields are `type`, `name`, `metadata` and `features`.

Normalize and enrich **in the frontend / derived state only**: calculate canonical category ID and unit using `problem_normalized` (fallback `problem`) + master; derive division/estate from `TNKE.json` polygon membership or the current block-index mapping; join status from external file using `tag_id`. Keep original spelling (`uderpruning`, uppercase/lowercase) and original values in source. Use stable `tag_id`/feature ID for markers; numeric source IDs are NOT globally unique for curated F-59.

## 2 — Preserve Antigravity's existing UI adjustments

- Inspect the live/current UI before changing it and determine what has already been completed.
- Keep the current polished red sidebar, branding, active menu, map dimensions, control placement, colors, typography (Poppins), drawers, popups, fit-to-area controls, current zoom/pan and coverage heatmap. Do not undo existing spacing/alignment improvements.
- If Coverage / Problem mode, dropdowns, summary cards or legends were already implemented, **fix and reuse those components** rather than render a second toolbar, a duplicate filter, or a parallel page.
- Do not reset local work, revert commits or regenerate the entire page. Make minimal, reviewable changes and report which requirements were already satisfied versus newly implemented.

## 3 — Correct all 16 problem categories, everywhere

The frontend currently may still expose only 10 categories. Replace stale hardcoded lists/mappings across page filters, Problem Tagging, modal/edit forms, tooltips, charts, summaries and reports with the 16 items from `tnke_spt_problem_master_16.json`. Always show all 16 options in the category dropdown, even if some have zero findings after filters. Never build the list solely from raw case-sensitive `problem` strings.

Canonical categories:

1. Pasar Pikul Semak (m)
2. Underpruning (pokok)
3. Areal Banjir / Tergenang (ha)
4. Titi Panen Kurang / Rusak (unit)
5. Piringan Semak (pokok)
6. TPH Bermasalah (titik)
7. Gawangan Semak (ha)
8. Defisiensi Hara (pokok)
9. Titik Kosong (titik)
10. HPT (pokok)
11. Konektiviti Teras / Pasar Pikul (m)
12. Pokok Abnormal (pokok)
13. Semak di Gawangan (Bambu) (ha)
14. Semak di Gawangan (Pisang) (ha)
15. Gorong-gorong (unit)
16. Jembatan / Box culvert (unit)

Aliases include `uderpruning` → `Underpruning`, and `areal banjir` → `Areal Banjir / Tergenang`. Preserve the original source values while grouping/filtering canonically.

## 4 — Compact global header, without extra text labels

In the current layout, arrange the existing four global dropdowns as:

`[ TNKE ▾ ] [ DIVISI 2 ▾ ] [ All ▾ ] [ September 2026 ▾ ]`

Do NOT print the separate prefix captions **Estate / Divisi / Blok / Periode** alongside these dropdowns. When division or block has no selection, show **All**. Remove the **Kegiatan** dropdown from the global header (if needed for Coverage, place it only within Coverage controls). Keep the title, Mockup indicator and profile area aligned; no overlap or horizontal overflow. Maintain Poppins and responsive design. On estate change reset division/block to All; on division change reset block to All. Preserve global admin/period filters when switching map modes. Use accessible aria-labels on controls.

If this header adjustment is already in place, DO NOT restyle it gratuitously—only fix incomplete behaviors.

## 5 — One map, two modes; Coverage must be default

Put a compact segmented control in the EXISTING map card toolbar:

`[ Coverage ] [ Problem ]`

- **Coverage** is the default on page load. **Preserve current observation coverage calculations, polygon fill, in-polygon block/coverage% labels, legend, marker visibility, map controls and click actions.** No regression.
- **Problem** uses the SAME existing TNKE polygon layer and map instance. Restyle polygons based on filtered **action-plan statuses from the external sidecar**:
  - Gray `#A3A3A3` — no tagging for the active filter.
  - Red `#EF4444` — at least one relevant tagging is `belum_ada_action_plan`.
  - Yellow `#F2C94C` — no relevant unplanned tagging, but at least one is `on_progress`.
  - Green `#39A66B` — all relevant tagging are `closed`.
  - Precedence: **red > yellow > green**, gray only when there are no applicable tags. Don't silently treat a missing workflow record as closed or unplanned: surface it as a data validation issue.
- Swap the legend for each mode; avoid showing both legends together.
- Keep the existing marker toggle and Fit Wilayah / zoom / marker popup / block drawer.
- Don't remount the map needlessly; restyle its polygon and marker layers to avoid losing zoom and center.

## 6 — Problem mode: category filter, markers and block percentages

In the Problem-mode map card toolbar (NOT global header) add/use the category dropdown:

`[ Semua Permasalahan ▾ ]` plus all 16 canonical categories. It affects both markers and polygon status. Use `tag_id` for stable marker identity, and the original point coordinates for placement. Keep the existing visibility toggle independent of the category filter.

When **one category** is selected, calculate and show inside each polygon the block's share of the total **same-category volume, same-unit** in the current admin + month/year filter scope:

```
block_volume = Σ(ringan + sedang + berat) of matching tags in block
scope_volume = Σ(ringan + sedang + berat) of matching tags in all filtered blocks
block_contribution_percent = 100 * block_volume / scope_volume
```

Label example (two lines) `F-59` / `12,1%`. The denominator is the entire filtered administrative scope, NOT the current zoom/viewport, NOT planted palms in the block, NOT block area/observasi coverage, and NOT action-plan completion. A single-block filter may legitimately show 100%.

If **Semua Permasalahan** is selected, NEVER sum mixed measurement units or show misleading aggregate volume percentages; use `F-59` / `<N> tagging` instead. On zero matching volume show `—` or `0%` consistently and gray fill when no matching tags. In block popup/drawer show tag count, matching volume + unit, action status mix and denominator explanation; mark mocked data as simulations.

**Mandatory numerical check** for `TNKE` / `DIVISI 2` / `All` blocks / `September 2026` / `Underpruning`:

- F-59: **5 tags, 102 pokok**.
- DIVISI 2: **846 pokok**.
- F-59 polygon label: **12,1%**.

This check uses the supplied minimal-schema GeoJSON and the 16-category master, not the obsolete enriched GeoJSON.

## 7 — Data rules, no-surprises behavior

- Load ONLY the current new `tnke_problem_tags.geojson` for the TNKE demo. Resolve duplicated/obsolete loader paths or stale cache imports if needed.
- Preserve all **424 tagging** and all original coordinates and block assignments; **22 curated F-59** features must stay byte-for-byte-equivalent at feature level (original problem labels, quantities, dates, IDs, coordinates). No QGIS F-59 extras and no four unnamed-block points should be reintroduced.
- Maintain existing TNKE block polygon geometry unchanged.
- Source tags intentionally **do not** store `divisi`, `estate`, units, workflow status or south-zone metadata. Build those in runtime derived state without mutating or rewriting the GeoJSON.
- Keep all global period filters working. Parse `properties.date` in YYYY-MM-DD form; do not infer month from the browser time. Correctly filter at least September 2026 and show empty cases cleanly.
- Coverage and Problem mode must use the SAME filtered geographic scope. Switching modes should not reset estate/division/block/period without an explicit user action.
- Keep simulating problem/action plan metrics only for mockup; do not display them as confirmed field observations.
- Avoid CSS regressions, duplicated toolbars, stale state, and unwanted map resize/recentering. Ensure Leaflet or similar `invalidateSize` behavior as needed.

## 8 — Acceptance tests and implementation report

Before you finish, execute the relevant checks using the actual project and provide a brief changed-file report:

1. Confirm `tnke_problem_tags.geojson` has 424 Point features, original minimal property keys, no zone/scenario fields and all 22 F-59 originals unchanged.
2. Confirm **16** canonical category menu options throughout the frontend (plus optional `Semua Permasalahan`) and at least one tag in each category in the demo.
3. Default Coverage page looks and behaves exactly as the currently improved implementation; Coverage legend and observed percentages still function.
4. Problem mode works on the SAME map: colors gray/red/yellow/green honor status precedence from `tnke_action_plan_mockup.json`.
5. Underpruning / DIVISI 2 / September 2026 gives F-59 **102/846 pokok = 12,1%** and shows correct quantity/severity in the drawer.
6. All Categories uses tagging counts only; filters affect both markers and status fills; inactive category/period shows sensible zero state.
7. Header shows only four compact values/dropdowns with no Estate/Divisi/Blok/Periode prefix text and no global Kegiatan dropdown.
8. Verify the current polished UI, sidebar, click handlers, right-hand panels, legends, marker toggle and Fit Wilayah are preserved; no new console errors, no overflow, no broken navigation.

Please **implement** these as a minimal incremental update to the existing Antigravity project, run tests/build as available, and share which existing components were reused, which files changed, and which checks passed. Do not return just a mockup or a plan.
