# Smart Problem Tagging (SPT) — System Concept & Architecture Specification

> **Document Purpose**: This comprehensive specification documents the complete architecture, agronomic data models, dual-interface workflows (Desktop Control Room & Mobile Field App), formulas, master problem taxonomy, and state machines of the **Smart Problem Tagging (SPT)** system for oil palm plantation operations (PT SMART Tbk — Estate SKDE).
> 
> **For ChatGPT / AI Prompting**: Use this document as the full background context of the current system concept and mockup implementation. You can feed this entire document to ChatGPT to request gap analysis, feature enhancements, UX improvements, or structured instruction prompts to be executed back by Antigravity.

---

## 1. Executive Overview & Business Objectives

### 1.1 Background & Core Objective
In oil palm plantation management, field agronomic problems (such as overgrown harvesting paths, underpruning, flood inundation, nutrient deficiency, or damaged bridges) directly impact yield realization and Block Condition & Capacity Rating (BCCR). 

The **Smart Problem Tagging (SPT)** system provides an end-to-end geospatial and operational platform that connects **field supervisors (Asisten & Mandor)** with **executive management (Askep & Manager)**. 

### 1.2 Core Pillars
1. **Rapid Field Problem Tagging**: Mobile app with camera shutter lock, browser GPS validation, and point-in-polygon block identification.
2. **Immutable Photo & Spatial Evidence**: Geotagged before/after photo evidence locked against tampering.
3. **Two-Phase Lifecycle Workflow**: Structured 2-phase approval cycles (Assessment Verification & Physical Realization Authorization).
4. **Corporate Control Room Dashboard**: Interactive geospatial map with semantic zoom, BCCR analytics, and 24-month yield moving average projection.
5. **Predictive Recovery & Yield Projection**: S-curve polynomial easing model predicting block yield recovery up to 100% potential.

---

## 2. System Architecture & Dual-Application Architecture

The system consists of two tightly integrated front-end applications built with Vanilla HTML5, CSS3, and JavaScript ES6+ (zero external runtime dependencies, 100% static local execution).

```
smartproblemtagging/
├── index.html                           # Desktop Control Room Dashboard (7 Tabs + Viewport HUD)
├── styles.css                           # Corporate Sinarmas Design System (#C90016 Red Palette)
├── app.js                               # Desktop Main Controller & Leaflet Semantic Zoom Engine
├── geo_utils.js                         # Ray-Casting Point-in-Polygon & Mulberry32 PRNG
├── yield_service.js                     # Trailing 12-Month Yield Moving & S-28 Easing Projection
├── data.js                              # Master Data (16 Problems, BCCR Categories, Data Generators)
├── login.js                             # Overlay Authentication Controller (sessionStorage)
├── skde_geojson.js                      # Pre-bundled GeoJSON Polygon (109 Blocks SKDE)
│
├── aplikasi/                            # Mobile Field Web Application (PWA / Mobile-First)
│   ├── index.html                       # Mobile Single-Page App Shell & Desktop Frame Wrapper
│   ├── styles.css                       # Mobile UI System (390px/412px responsive frame)
│   ├── master.js                        # Master Problem Definitions & Action Plan Catalog
│   ├── store.js                         # Centralized State Store & 14 Deterministic Seeds
│   ├── app.js                           # Client-side Router (23 Routes) & Component Renderers
│   └── geo.js                           # Mobile GPS Sensor Utilities & Distance Calculators
│
└── scripts/                             # Quality Assurance & CDP Test Suite
    ├── verify_acceptance.py             # E2E Automated Acceptance Tests (Headless Edge CDP)
    └── generate_data.py                 # Synthetic Data Generator Scripts
```

---

## 3. Master Agronomic Problem Taxonomy (16 Trabas Categories)

The system normalizes all field issues into **16 Standardized Trabas Categories**, categorized by Timeframe, Sensitivity, Unit of Measurement, and Custom SVG Geospatial Pins:

| ID | Problem Category Name | Timeframe | Sensitivity | Unit | Pin Symbol | Color Code | Standard Action Plans |
| :---: | :--- | :--- | :--- | :---: | :--- | :---: | :--- |
| **01** | Pasar Pikul Semak | Short Term | Major | Meter | Classic Needle | `#268BF2` | Semprot pasar pikul |
| **02** | Underpruning | Short Term | Major | Pkk | Classic Needle | `#008247` | Penambahan HK pruning, Borongan |
| **03** | Areal Banjir / Tergenang | Short Term | Major | Ha | Classic Needle | `#494949` | Pembuatan bendungan/tanggul, Individual Bund, Cuci Parit |
| **04** | Titi Panen Kurang / Rusak | Short Term | Major | Unit | Classic Needle | `#7861EF` | Penambahan Titi Panen |
| **05** | Piringan Semak | Short Term | Minor | Pkk | Classic Needle | `#FF6900` | Semprot piringan, Manual piringan |
| **06** | TPH Bermasalah | Short Term | Minor | Ha | Classic Needle | `#FC387D` | Perbaikan TPH, Pemasangan papan TPH |
| **07** | Gawangan Semak | Long Term | Minor | Pkk | Classic Needle | `#AD3CDB` | Tebas bayas gawangan, Semprot gulma |
| **08** | Defisiensi Hara | Very Long Term | Major | Ha | Classic Needle | `#F52424` | Pemupukan susulan ekstra, Dosis khusus |
| **09** | Titik Kosong | Very Long Term | Major | Pkk | Classic Needle | `#20A3A7` | Sisip tanaman baru |
| **10** | HPT (Hama & Penyakit) | Very Long Term | Major | Ha | Classic Needle | `#FFC315` | Sani-injeksi, Fogging, Kutip ulat |
| **11** | Konektiviti Teras / Pasar | Short Term | Major | Meter | Teardrop | `#268BF2` | Pembuatan jalan rintis baru |
| **12** | Pokok Abnormal | Very Long Term | Minor | Pkk | Teardrop | `#008247` | Sanitasi pokok, Kastrasi, Eradiksasi |
| **13** | Semak Gawangan (Bambu) | Long Term | Minor | Ha | Teardrop | `#494949` | Rumpuk & tebas rumpun bambu |
| **14** | Semak Gawangan (Pisang) | Long Term | Minor | Ha | Teardrop | `#7861EF` | Eradiksasi pisang hutan |
| **15** | Gorong-gorong | Short Term | Major/Minor | Unit | Teardrop | `#FF6900` | Pasang/ganti gorong-gorong beton |
| **16** | Jembatan / Box Culvert | Short Term | Major/Minor | Unit | Teardrop | `#FC387D` | Perbaikan fondasi & gelagar jembatan |

### Visual Pin Distinction Engine
- **IDs 01–10**: Rendered as **Classic Needle Pins** (circular head + central white dot + vertical needle stem).
- **IDs 11–16**: Rendered as **Teardrop Pins** (sleek water-drop geometry + central white dot).
- **Severity Pulse**: `.major` problems exhibit an animated red halo glow, while `.minor` problems display an amber halo glow.

---

## 4. Desktop Control Room Dashboard Specification

### 4.1 7-Tab Navigation Structure
The desktop dashboard (`index.html`) operates within a single viewport layout (1366×768 optimized) without vertical page scroll, featuring 7 dedicated operational views:

1. **Dashboard (Overview Control Room)**:
   - 4 Top KPI Cards: BCCR YTD (%), Actual vs Potency Yield YTD (Ton/Ha), Active Findings & Overdue Count, Verified Action Plan Completion.
   - Dual Main Panels: Interactive Leaflet BCCR Block Map & Top Problem Distribution Breakdown.
2. **Rekap BCCR**: Matrix distribution of blocks categorized across BCCR achievement tiers.
3. **Action Plan**: Comprehensive progress tracking table of action plans per division/block.
4. **Trend Produksi (Yield Moving Projection)**:
   - Interactive 24-month timeline chart (Aug 2025 – Jul 2027) with cut-off line (Jul 2026).
   - Toggle metrics between `Yield Moving (Ton/Ha)` and `Rasio BCCR Moving (%)`.
   - CSV export capability for 24-month projection datasets.
5. **Analisa BCCR**: Detailed agronomic gap analysis between block potential and actual output.
6. **Rekap Divisi**: Aggregated division performance breakdown across Estate SKDE.
7. **Dokumentasi**: Photo comparison gallery of before-finding vs after-realization.

---

### 4.2 Geospatial Map & Semantic Zoom Rules

The interactive Leaflet map renders 109 polygon blocks (226 features) from `SKDE.json`. To eliminate visual clutter, the system enforces **Semantic Zooming**:

```
                  ┌───────────────────────────────────────────┐
                  │          Leaflet Map Rendering            │
                  └─────────────────────┬─────────────────────┘
                                        │
                         Zoom Level Evaluation (Threshold = 15)
                                        │
                ┌───────────────────────┴───────────────────────┐
                ▼                                               ▼
     Overview Mode (Zoom < 15)                      Micro Mode (Zoom ≥ 15)
 ┌───────────────────────────────┐              ┌───────────────────────────────┐
 │ • Hide micro point pins       │              │ • Remove block summary badges │
 │ • Render Block Summary Badges │              │ • Render micro placemarks     │
 │   (`Major n` & `Minor n`)     │              │ • Enforce Viewport Culling    │
 │ • Show Block Labels (Zoom ≥14)│              │ • Interactive Pin Popups      │
 └───────────────────────────────┘              └───────────────────────────────┘
```

#### Manual Finding Addition (Point-in-Polygon Engine)
- Users can click `+ Tambah Temuan` in Fullscreen HUD Mode.
- The map captures the latitude/longitude click coordinate.
- The system executes a **Ray-Casting Point-in-Polygon Algorithm** (`geo_utils.js`) against all GeoJSON block polygons (supporting MultiPolygons & holes).
- If valid, the system auto-fills Estate, Division, and Block into a modal dialog; if outside any block perimeter, entry is safely rejected with a toast warning.

---

### 4.3 Yield Moving Average & S-28 Easing Projection Model

To model realistic agronomic recovery following field intervention, the system implements a **Trailing 12-Month Moving Average** over a **24-Month Horizon** (August 2025 to July 2027) with a historical **cut-off at July 2026**.

#### S-28 Reference Benchmark Case
- **Block**: SKDE, Division 3, Block S-28 (Area: 33.54 Ha).
- **Potency Moving**: 29.33 Ton/Ha (Aug 2025), stabilizing at 29.00 Ton/Ha.
- **Actual Moving at Cut-off (Jul 2026)**: 26.30 Ton/Ha (BCCR Ratio = 90.69%).

#### S-Curve Polynomial Easing Formula (Post Cut-off Aug 2026 – Jul 2027)
$$\text{startRatio} = \frac{\text{actualMovingAtCutoff}}{\text{potencyMovingAtCutoff}}$$

$$u = \min\left(\frac{\text{horizonMonth}}{\text{recoveryMonth}}, 1\right)$$

$$\text{easing} = 3u^2 - 2u^3 \quad \text{(Smooth S-curve cubic easing)}$$

$$\text{projectionRatio} = \text{startRatio} + (1 - \text{startRatio}) \times \text{easing}$$

$$\text{projectedYield}(t) = \text{potencyMoving}(t) \times \text{projectionRatio}$$

> **Result**: Block S-28 achieves exactly **29.00 Ton/Ha (100.00% BCCR)** at **May 2027** (Month 10 of projection), remaining flat at 100% through June–July 2027.

#### Area-Weighted Aggregation (Division & Estate Level)
$$\text{aggregateYield}(t) = \frac{\sum_{i} \left(\text{blockYield}_i(t) \times \text{area}_i\right)}{\sum_{i} \text{area}_i}$$

$$\text{aggregateBCCR}(t) = 100 \times \frac{\sum_{i} \left(\text{actualMoving}_i(t) \times \text{area}_i\right)}{\sum_{i} \text{potencyMoving}_i(t) \times \text{area}_i}$$

#### Data Provenance Transparency
Every monthly data point carries explicit origin tags:
- `Sintetis historis`: Estimated historical data (Aug 2025 – Dec 2025).
- `Moving sumber`: Benchmark observation moving actuals (Jan 2026 – Jul 2026).
- `Proyeksi skenario`: Agronomic easing recovery scenario (Aug 2026 – Jul 2027).

---

## 5. Mobile Field Web Application Specification (`/aplikasi/`)

The mobile application is designed for field usage on smartphones, equipped with a **Desktop Frame Wrapper** for previewing on desktop browsers (`390x844` iPhone / `412x915` Android viewport).

### 5.1 Multi-Role Persona & Permission Matrix

The application strictly enforces a 4-tier role hierarchy across all features:

| Role | Penugasan (Scope) | Tagging Assessment | Verifikasi Assessment | Periksa Realisasi | Verifikasi & Sahkan Realisasi | Penutupan Temuan (Closed) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Asisten** | DIVISI 3 | ✅ Create / Edit / Submit | ❌ | ✅ Submit Batch Progress | ❌ | ❌ |
| **Mandor** | DIVISI 3 | ❌ | ❌ | ✅ Submit Batch Progress | ❌ | ❌ |
| **Askep** | SKDE Estate | ❌ (Review Only) | ✅ Approve / Revise / Reject | ❌ (Review Only) | ✅ Authorize Volume & Finalize | ✅ Close Finding |
| **Manager** | SKDE Estate | ❌ (Review Only) | ✅ Approve / Revise / Reject | ❌ (Review Only) | ❌ (Review Only) | ❌ (Review Only) |

---

### 5.2 Immutable Photo-GPS Evidence Quality Policy

To prevent fraud or inaccurate tagging, all field observations must pass GPS sensor quality checks:

1. **Coordinate Locking**: Geolocation is captured at shutter button tap.
2. **Block Validation Policy**:
   - GPS position must lie **within the boundary** of the target block (validated via Point-in-Polygon).
   - Sensor accuracy must be **$\le 20$ meters**.
3. **Rejection Handling**: If accuracy $> 20\text{m}$ or coordinate is outside the block perimeter, shutter submission is blocked with actionable user feedback (e.g., "Move away from heavy canopy / Wait for GPS lock").
4. **Immutable Evidence Record**: Photo metadata (Lat, Lng, Accuracy, Timestamp, User, Detected Block) is permanently linked to the finding and cannot be retroactively modified.

---

### 5.3 2-Phase Lifecycle Workflow (State Machine)

The finding lifecycle follows two distinct approval cycles:

```
[ PHASE 1: ASSESSMENT CYCLE ]
  Asisten creates Draft Finding + Photo Before
          │
  Submit Assessment (State: In Review)
          │
  Askep / Manager Review ──────► Decision: Minta Revisi ──► Asisten Re-edits & Resubmits
          │
  Decision: Approved
          │
          ▼
[ PHASE 2: REALIZATION & CLOSURE CYCLE ]
  Action Plan Created & Target Volume Locked
          │
  Mandor / Asisten Submits Realization Batch (Photo After + Completed Volume)
          │
  Realization Batch Submitted (State: Submitted)
          │
  Askep Verifies Field Execution ──► Authorizes Verified Volume (e.g., 600m / 1000m)
          │
  Problem Condition Updated: "Sebagian teratasi" or "Teratasi sepenuhnya"
          │
  If 100% Target Authorized & Fully Resolved ──► Askep Closes Finding (State: Closed)
```

---

### 5.4 Complete 23 Mobile Application Routes

| No | Route | Page Description & Key Functionality |
| :---: | :--- | :--- |
| 1 | `#/login` | Demo authentication overlay |
| 2 | `#/account` | Persona switcher & scope indicator |
| 3 | `#/beranda` | Role-tailored operational home & quick action shortcuts |
| 4 | `#/blok` | Block list overview & finding counters |
| 5 | `#/blok/:key` | Block detail, GeoJSON polygon summary, active pins list |
| 6 | `#/assessment/baru` | Assessment initiation wizard per block round |
| 7 | `#/temuan/baru` | Multi-step field problem tagging form |
| 8 | `#/capture` | Camera shutter view, live GPS locking & accuracy check |
| 9 | `#/temuan/:id` | Detailed finding breakdown, before photo, decision history |
| 10 | `#/assessment/:id/review` | Draft review before submitting block assessment batch |
| 11 | `#/tugas` | Pending task queues categorized by user role |
| 12 | `#/assessment/:id/verifikasi` | Askep/Manager assessment approval form (Approve/Revise/Reject) |
| 13 | `#/temuan/:id/revisi` | Revision update form for Asisten |
| 14 | `#/action/:id` | Action plan monitor, progress bar & authorized volume formula |
| 15 | `#/action/:id/periksa` | Realization entry form (Photo After + Volume execution) |
| 16 | `#/realisasi/:id` | Realization batch breakdown details |
| 17 | `#/realisasi/:id/verifikasi` | Askep physical volume authorization form |
| 18 | `#/dokumentasi/:id` | Side-by-side Before vs After photo comparison viewer |
| 19 | `#/riwayat` | Historical audit log of all verifications |
| 20 | `#/notifikasi` | Role notification center & pending task alerts |
| 21 | `#/draft-sinkronisasi` | Offline draft queue & sync status monitor |
| 22 | `#/profil` | User profile, role switcher, state reset, logout |
| 23 | `#/bantuan` | Technical guidelines, formulas, DevTools sensor guide |

---

## 6. Data Models, State Persistence, & Deterministic Simulation

### 6.1 State Persistence Architecture
- Desktop Dashboard: Uses `sessionStorage` (`spt_auth_session`) for session state and manual finding storage.
- Mobile Field App: Uses `sessionStorage` / `localStorage` (`spt_mobile_state_v1`) to persist state across reloads.
- Reset Trigger: Both apps feature a "Reset Data Demo" option to restore clean deterministic seed state.

### 6.2 Deterministic Seed Dataset
The mobile app initializes with **14 Deterministic Seed Findings** covering all stages of the lifecycle (Draft, In Review, Revision Requested, Approved, Realization In Progress, Closed) across Estate SKDE Division 3 blocks (S-28, S-29, T-31, T-32, etc.), ensuring immediate testability.

---

## 7. Automated Acceptance & Quality Assurance

The system is equipped with an automated end-to-end test suite (`scripts/verify_acceptance.py`) utilizing Headless Microsoft Edge Chrome DevTools Protocol (CDP).

### Verified Acceptance Test Criteria:
1. ✅ **Global Controller Verification**: Ensures `geo_utils`, `yield_service`, `dataStore`, and `sptApp` are loaded.
2. ✅ **S-28 Yield Model Validation**: Confirms 24-month timeline accuracy, cut-off value at 26.30 Ton/Ha, and exact May 2027 recovery to 29.00 Ton/Ha (100%).
3. ✅ **Semantic Zoom Culling**: Verifies 0 micro placemarks render during Overview mode ($Z < 15$) and summary badges swap to micro placemarks upon zooming to Level 16 ($Z \ge 15$).
4. ✅ **Fullscreen HUD Map & Polygon Click**: Validates Leaflet canvas resizing and point-in-polygon form triggers.
5. ✅ **Manual Finding Addition**: Validates Ray-Casting algorithm and data persistence.
6. ✅ **7-Tab Switchability & UI Integrity**: Confirms error-free execution across all 7 views.
7. ✅ **Mobile App 23-Route Navigation & State Machine**: Validates role switching, approval steps, and authorization math.

---

## 8. Guidance for ChatGPT: How to Prompt for Enhancements

If you are giving this document to ChatGPT to generate instructions for enhancing the current system, here are recommended prompt strategies you can ask ChatGPT:

### Sample Prompt Requests for ChatGPT:
1. **AI Field Assistant Integration**: *"Based on Section 3 (16 Trabas Problems) and Section 5 (Mobile Field App), design an AI Computer Vision feature that auto-detects problem type and estimates volume directly from camera photo captures."*
2. **Drone & Satellite Overlay Integration**: *"Based on Section 4 (Desktop Control Room), write instructions for adding an NDVI / Multispectral Drone Heatmap layer to the Leaflet map for early stress detection."*
3. **Work Order & ERP Integration**: *"Based on Section 5.3 (2-Phase Lifecycle), design the API contract and schema to sync approved Action Plans into SAP / Oracle ERP Work Orders."*
4. **Offline Sync & PWA Service Worker**: *"Based on Section 6, formulate a detailed migration plan from sessionStorage to IndexedDB with background service worker synchronization."*

---
*End of System Concept Documentation — Smart Problem Tagging (SPT)*
