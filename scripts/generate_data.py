import json
import random
import os

# Load SKDE GeoJSON from skde_geojson.js
geojson_path = 'skde_geojson.js'
with open(geojson_path, 'r', encoding='utf-8') as f:
    raw_js = f.read().strip()
    if raw_js.startswith('window.SKDE_GEOJSON = '):
        raw_js = raw_js[len('window.SKDE_GEOJSON = '):]
    if raw_js.endswith(';'):
        raw_js = raw_js[:-1]
    fc = json.loads(raw_js)

div_blocks = {}
block_centroids = {}
block_polygons = {}
block_bounds = {}

def get_all_rings(geom):
    rings = []
    g_type = geom.get('type')
    coords = geom.get('coordinates', [])
    if g_type == 'Polygon':
        if coords and len(coords[0]) >= 3:
            rings.append(coords[0])
    elif g_type == 'MultiPolygon':
        for poly in coords:
            if poly and len(poly[0]) >= 3:
                rings.append(poly[0])
    return rings

for f in fc['features']:
    props = f.get('properties', {})
    div = props.get('divisi')
    blk = props.get('blok')
    if div and blk and blk != '-':
        if div not in div_blocks:
            div_blocks[div] = []
        if blk not in div_blocks[div]:
            div_blocks[div].append(blk)
        
        rings = get_all_rings(f.get('geometry', {}))
        if rings:
            block_polygons[blk] = rings
            # calculate centroid and bounds from largest ring
            largest_ring = max(rings, key=len)
            lons = [p[0] for p in largest_ring]
            lats = [p[1] for p in largest_ring]
            c_lon = sum(lons) / len(lons)
            c_lat = sum(lats) / len(lats)
            block_centroids[blk] = (round(c_lat, 6), round(c_lon, 6))
            block_bounds[blk] = (min(lats), max(lats), min(lons), max(lons))

random.seed(2026)

# 16 Master Problems from user reference table (Screenshot 1)
master_problems = [
    {
        "id": "P01", "no": 1, "problem": "Pasar Pikul Semak", "timeframe": "Short Term",
        "sensitivity": "Major", "unit": "Meter", "source": "Trabas",
        "color": "#00C0FF", "symbolName": "Cyan Pin", "category": "Akses Panen",
        "actions": ["Semprot pasar pikul", "Babat manual pasar pikul", "Pembersihan gawangan panen"]
    },
    {
        "id": "P02", "no": 2, "problem": "Underpruning", "timeframe": "Short Term",
        "sensitivity": "Major", "unit": "Pkk", "source": "Trabas",
        "color": "#16A34A", "symbolName": "Green Pin", "category": "Kultur Teknis",
        "actions": ["Penambahan HK pruning", "Borongan pruning pelepah sengsar", "Penataan pelepah gawangan mati"]
    },
    {
        "id": "P03", "no": 3, "problem": "Areal Banjir / Tergenang", "timeframe": "Short Term",
        "sensitivity": "Major", "unit": "Ha", "source": "Trabas",
        "color": "#1E293B", "symbolName": "Dark Slate Pin", "category": "Drainase Tata Air",
        "actions": ["Pembuatan bendungan/tanggul", "Individual Bund/Pungguhan", "Pembuatan/Cuci Parit", "Continuous bund"]
    },
    {
        "id": "P04", "no": 4, "problem": "Titi Panen Kurang / Rusak", "timeframe": "Short Term",
        "sensitivity": "Major", "unit": "Unit", "source": "Trabas",
        "color": "#818CF8", "symbolName": "Periwinkle Pin", "category": "Infrastruktur Panen",
        "actions": ["Penambahan Titi Panen", "Penggantian Titi Beton", "Perbaikan titi kayu ulin"]
    },
    {
        "id": "P05", "no": 5, "problem": "Piringan Semak", "timeframe": "Short Term",
        "sensitivity": "Minor", "unit": "Pkk", "source": "Trabas",
        "color": "#F97316", "symbolName": "Orange Pin", "category": "Sanitasi Pokok",
        "actions": ["Semprot Piringan Glifosat", "Manual Weeding Piringan", "Garu piringan pokok"]
    },
    {
        "id": "P06", "no": 6, "problem": "TPH Bermasalah", "timeframe": "Short Term",
        "sensitivity": "Minor", "unit": "Ha", "source": "Trabas",
        "color": "#FB7185", "symbolName": "Coral Pink Pin", "category": "Infrastruktur Panen",
        "actions": ["Semprot TPH", "Perataan & Pembuatan Nomor TPH", "Pembersihan semak sekitar TPH"]
    },
    {
        "id": "P07", "no": 7, "problem": "Gawangan Semak", "timeframe": "Long Term",
        "sensitivity": "Minor", "unit": "Pkk", "source": "Trabas",
        "color": "#A855F7", "symbolName": "Purple Pin", "category": "Akses Panen",
        "actions": ["Semprot Gawangan", "Roller Gawangan", "Babat semak selektif"]
    },
    {
        "id": "P08", "no": 8, "problem": "Defisiensi Hara", "timeframe": "Very long term",
        "sensitivity": "Major", "unit": "Ha", "source": "Trabas",
        "color": "#EF4444", "symbolName": "Red Pin", "category": "Agronomi Nutrisi",
        "actions": ["Aplikasi Pupuk Ekstra MOP/Urea", "Pemupukan Mikronutrien Borate", "Aplikasi Kieserite korektif"]
    },
    {
        "id": "P09", "no": 9, "problem": "Titik Kosong", "timeframe": "Very long term",
        "sensitivity": "Major", "unit": "Pkk", "source": "Trabas",
        "color": "#14B8A6", "symbolName": "Teal Pin", "category": "Kerapatan Pokok",
        "actions": ["Penyisipan Bibit Unggul Dami Mas", "Pembuatan Lubang Tanam & Pemupukan Dasar"]
    },
    {
        "id": "P10", "no": 10, "problem": "HPT", "timeframe": "Very long term",
        "sensitivity": "Major", "unit": "Ha", "source": "Trabas",
        "color": "#EAB308", "symbolName": "Yellow Pin", "category": "Proteksi Tanaman",
        "actions": ["Pengendalian HPT / Fogging Ulat Api", "Injeksi Batang Acephate", "Pemasangan Barn Owl Box (Tikus)"]
    },
    {
        "id": "P11", "no": 11, "problem": "Konektiviti Teras / Pasar Pikul", "timeframe": "Short Term",
        "sensitivity": "Major", "unit": "Meter", "source": "Trabas",
        "color": "#2563EB", "symbolName": "Royal Blue Pin", "category": "Akses Panen",
        "actions": ["Perbaikan Akses Teras / Pasar Pikul", "Rintisan Jalan Rintis Sambung", "Perataan teras kontur"]
    },
    {
        "id": "P12", "no": 12, "problem": "Pokok Abnormal", "timeframe": "Very long term",
        "sensitivity": "Minor", "unit": "Pkk", "source": "Trabas",
        "color": "#065F46", "symbolName": "Forest Green Pin", "category": "Kultur Teknis",
        "actions": ["Tumbang Pokok Abnormal Kerdil/Steril", "Eradikasi Pokok Crown Disease", "Sensus pokok abnormal"]
    },
    {
        "id": "P13", "no": 13, "problem": "Semak di Gawangan (Bambu)", "timeframe": "Long Term",
        "sensitivity": "Minor", "unit": "Ha", "source": "Trabas",
        "color": "#374151", "symbolName": "Charcoal Pin", "category": "Vegetasi Spesifik",
        "actions": ["Pengendalian Chemist Khusus Rumpun Bambu", "Pemberantasan Rumpun Bambu Manual"]
    },
    {
        "id": "P14", "no": 14, "problem": "Semak di Gawangan (Pisang)", "timeframe": "Long Term",
        "sensitivity": "Minor", "unit": "Ha", "source": "Trabas",
        "color": "#7C3AED", "symbolName": "Lavender Pin", "category": "Vegetasi Spesifik",
        "actions": ["Pengendalian Chemist Pisang Hutan", "Pemberantasan bonggol pisang liar"]
    },
    {
        "id": "P15", "no": 15, "problem": "Gorong-gorong", "timeframe": "Short Term",
        "sensitivity": "Major / Minor", "unit": "Unit", "source": "Trabas",
        "color": "#D97706", "symbolName": "Amber Pin", "category": "Infrastruktur Jalan",
        "actions": ["Pemasangan Gorong-gorong Beton Ø60cm", "Pembersihan Sedimen Gorong-gorong", "Perbaikan inlet/outlet"]
    },
    {
        "id": "P16", "no": 16, "problem": "Jembatan / Box culvert", "timeframe": "Short Term",
        "sensitivity": "Major / Minor", "unit": "Unit", "source": "Trabas",
        "color": "#D946EF", "symbolName": "Magenta Pin", "category": "Infrastruktur Jalan",
        "actions": ["Pemasangan Jembatan Beton", "Perbaikan Box Culvert Ambles", "Penggantian gelagar kayu"]
    }
]

bccr_ranges = [
    {"label": "<60%", "min": 0, "max": 60, "color": "#FF0000", "text": "white", "desc": "Sangat Kritis"},
    {"label": "60–<70%", "min": 60, "max": 70, "color": "#FF9900", "text": "black", "desc": "Kritis"},
    {"label": "70–<80%", "min": 70, "max": 80, "color": "#FFCC00", "text": "black", "desc": "Perlu Perhatian"},
    {"label": "80–<90%", "min": 80, "max": 90, "color": "#99CC00", "text": "black", "desc": "Cukup Baik"},
    {"label": "90–<100%", "min": 90, "max": 100, "color": "#339966", "text": "white", "desc": "Baik Sesuai Potensi"},
    {"label": "≥100%", "min": 100, "max": 9999, "color": "#009900", "text": "white", "desc": "Melampaui Potensi"}
]

def get_bccr_range(val):
    if val is None:
        return "#A4A8AC", "Tidak ada data"
    if val < 60: return "#FF0000", "<60%"
    if val < 70: return "#FF9900", "60–<70%"
    if val < 80: return "#FFCC00", "70–<80%"
    if val < 90: return "#99CC00", "80–<90%"
    if val < 100: return "#339966", "90–<100%"
    return "#009900", "≥100%"

# Ray-casting point-in-polygon algorithm
def point_in_poly(x, y, poly):
    n = len(poly)
    inside = False
    p1x, p1y = poly[0]
    for i in range(n + 1):
        p2x, p2y = poly[i % n]
        if y > min(p1y, p2y) and y <= max(p1y, p2y):
            if x <= max(p1x, p2x):
                if p1y != p2y:
                    xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                if p1x == p2x or x <= xinters:
                    inside = not inside
        p1x, p1y = p2x, p2y
    return inside

def generate_interior_points(rings, count):
    if not rings:
        return []
    largest_ring = max(rings, key=len)
    xs = [p[0] for p in largest_ring]
    ys = [p[1] for p in largest_ring]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    
    # generate candidates
    pts = []
    attempts = 0
    while len(pts) < count and attempts < 1500:
        attempts += 1
        rx = random.uniform(min_x, max_x)
        ry = random.uniform(min_y, max_y)
        # check inside any ring
        for ring in rings:
            if point_in_poly(rx, ry, ring):
                pts.append((round(ry, 6), round(rx, 6)))
                break
    
    # Fallback to centroid with tiny jitter if polygon was too sliver
    if not pts:
        c_x = sum(xs) / len(xs)
        c_y = sum(ys) / len(ys)
        for _ in range(count):
            pts.append((round(c_y + random.uniform(-0.0003, 0.0003), 6), round(c_x + random.uniform(-0.0003, 0.0003), 6)))
            
    return pts

blocks_dict = {}
all_blocks_list = []

# Generate realistic block data
for div, blks in sorted(div_blocks.items()):
    for idx, blk in enumerate(blks):
        luas = round(random.uniform(22.0, 32.5), 2)
        thn_tanam = random.choice([2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016])
        potency = round(random.uniform(18.0, 23.5), 2)
        
        # BCCR target distribution
        bccr_target = random.choices(
            [55, 66, 75, 84, 93, 103],
            weights=[15, 20, 25, 22, 12, 6]
        )[0] + random.uniform(-4, 4)
        bccr_target = max(48.0, min(112.0, bccr_target))
        actual = round(potency * (bccr_target / 100.0), 2)
        bccr_pct = round((actual / potency) * 100.0, 1)
        color, range_lbl = get_bccr_range(bccr_pct)
        gap = round(actual - potency, 2)
        
        bjb_weight = round(random.uniform(16.5, 22.0), 1)
        jjg_rot1 = int(random.uniform(650, 1100))
        ton_rot1 = round((jjg_rot1 * bjb_weight) / 1000.0, 2)
        sisa_rot1 = int(random.uniform(20, 90))
        
        jjg_rot2 = int(random.uniform(700, 1150))
        ton_rot2 = round((jjg_rot2 * bjb_weight) / 1000.0, 2)
        sisa_rot2 = int(random.uniform(15, 75))
        
        jjg_rot3 = int(random.uniform(680, 1120))
        ton_rot3 = round((jjg_rot3 * bjb_weight) / 1000.0, 2)
        sisa_rot3 = int(random.uniform(10, 60))
        
        jjg_rot4 = int(random.uniform(720, 1200))
        ton_rot4 = round((jjg_rot4 * bjb_weight) / 1000.0, 2)
        sisa_rot4 = int(random.uniform(5, 50))
        
        mtd_jjg = jjg_rot1 + jjg_rot2 + jjg_rot3 + jjg_rot4
        mtd_ton = round(ton_rot1 + ton_rot2 + ton_rot3 + ton_rot4, 2)
        mtd_ton_ha = round(mtd_ton / luas, 2)
        
        est_bccr = round(bccr_pct + random.uniform(-3.5, 3.5), 1)
        est_color, _ = get_bccr_range(est_bccr)
        est_ton_ha = round(potency * (est_bccr / 100.0), 2)
        trend_arrow = "up" if est_bccr >= bccr_pct else "down"
        
        centroid = block_centroids.get(blk, (-0.694, 115.52))
        
        block_obj = {
            "estate": "SKDE",
            "divisi": div,
            "blok": blk,
            "luas": luas,
            "tahunTanam": thn_tanam,
            "potencyYTD": potency,
            "actualYTD": actual,
            "bccrYTD": bccr_pct,
            "bccrColor": color,
            "bccrRange": range_lbl,
            "productionGap": gap,
            "lat": centroid[0],
            "lng": centroid[1],
            "rotasi": {
                "rot1": {"jjg": jjg_rot1, "ton": ton_rot1, "sisa": sisa_rot1},
                "rot2": {"jjg": jjg_rot2, "ton": ton_rot2, "sisa": sisa_rot2},
                "rot3": {"jjg": jjg_rot3, "ton": ton_rot3, "sisa": sisa_rot3},
                "rot4": {"jjg": jjg_rot4, "ton": ton_rot4, "sisa": sisa_rot4}
            },
            "mtd": {
                "jjg": mtd_jjg,
                "ton": mtd_ton,
                "tonHa": mtd_ton_ha
            },
            "estimasi": {
                "bccr": est_bccr,
                "tonHa": est_ton_ha,
                "color": est_color,
                "trend": trend_arrow,
                "gap": round(actual - est_ton_ha, 2)
            },
            "openProblems": 0,
            "actionProgress": 0
        }
        blocks_dict[blk] = block_obj
        all_blocks_list.append(block_obj)

pics = [
    "Ahmad Fauzi (Mandor 1)", "Dedi Prasetyo (Asisten Divisi)", "Hendri Susanto (Mandor Panen)",
    "Bambang Irawan (Mandor Rawat)", "Rudi Hartono (Askep Wilayah)", "Agus Supriyadi (Mandor Chemist)",
    "Samsul Bahri (Asisten Tanaman)", "Heri Wibowo (Mandor Infrastruktur)", "Zulkifli (Mandor Rawat)",
    "Wahyu Pratama (Asisten Agronomi)"
]

statuses = ["Belum Ditangani", "Dalam Pengerjaan", "Menunggu Verifikasi", "Selesai"]
status_weights = [25, 35, 15, 25]

# Generate high-density realistic problem points (5-12 points per block)
issues_list = []
issue_counter = 1

# Pick active blocks across divisions with high concentration in Divisi 3 (Control room default)
active_blocks = []
for div, blks in div_blocks.items():
    if div == 'DIVISI 3':
        # All blocks in Divisi 3 have active findings
        active_blocks.extend([(div, b) for b in blks])
    else:
        # 12 to 18 blocks per other division
        sample_count = min(len(blks), 14)
        active_blocks.extend([(div, b) for b in random.sample(blks, sample_count)])

for div, blk in active_blocks:
    rings = block_polygons.get(blk, [])
    b_obj = blocks_dict.get(blk)
    if not rings or not b_obj:
        continue
    
    # 5 to 11 points per block
    n_points = random.randint(6, 11) if div == 'DIVISI 3' else random.randint(5, 8)
    interior_pts = generate_interior_points(rings, n_points)
    
    # select a diversified subset of the 16 problems for this block
    sampled_probs = random.choices(master_problems, k=len(interior_pts))
    
    for pt_idx, pt in enumerate(interior_pts):
        prob = sampled_probs[pt_idx]
        action_plan = random.choice(prob["actions"])
        status = random.choices(statuses, weights=status_weights)[0]
        
        if prob["sensitivity"] == "Major / Minor":
            sens = random.choice(["Major", "Minor"])
        else:
            sens = prob["sensitivity"]
            
        unit = prob["unit"]
        if unit == "Meter":
            vol_inv = random.randint(120, 1600)
        elif unit == "Pkk":
            vol_inv = random.randint(35, 520)
        elif unit == "Ha":
            vol_inv = round(random.uniform(1.2, min(b_obj["luas"], 14.0)), 1)
        else:
            vol_inv = random.randint(1, 8)
            
        ident_day = random.randint(1, 28)
        ident_month = random.choice(["06", "07", "08"])
        tgl_lapor = f"{ident_day:02d}/{ident_month}/2026"
        tgl_lapor_text = f"{ident_day} {'Jul' if ident_month=='07' else ('Jun' if ident_month=='06' else 'Agu')} 2026"
        
        if status == "Selesai":
            realisasi = vol_inv
            progress = 100.0
            overdue = False
            finish_day = min(28, ident_day + random.randint(4, 16))
            finish_month = "08"
            tgl_selesai_text = f"{finish_day} Agu 2026"
            target_selesai = f"28/08/2026"
            foto_sebelum_date = tgl_lapor_text
            foto_sesudah_date = tgl_selesai_text
            verified_by = "Wahyu Pratama (Asisten Agronomi SKDE)"
        elif status == "Menunggu Verifikasi":
            realisasi = vol_inv if isinstance(vol_inv, int) else round(vol_inv, 1)
            progress = 95.0
            overdue = random.choice([True, False, False])
            target_selesai = "30/08/2026"
            foto_sebelum_date = tgl_lapor_text
            foto_sesudah_date = None
            verified_by = None
        elif status == "Dalam Pengerjaan":
            ratio = random.uniform(0.3, 0.8)
            realisasi = int(vol_inv * ratio) if isinstance(vol_inv, int) else round(vol_inv * ratio, 1)
            progress = round((realisasi / vol_inv) * 100.0, 1)
            overdue = random.choice([True, False, False])
            target_selesai = "31/08/2026"
            foto_sebelum_date = tgl_lapor_text
            foto_sesudah_date = None
            verified_by = None
        else: # Belum Ditangani
            realisasi = 0
            progress = 0.0
            overdue = random.choice([True, False])
            target_selesai = "05/09/2026"
            foto_sebelum_date = tgl_lapor_text
            foto_sesudah_date = None
            verified_by = None
            
        issue_id = f"SPT-SKDE-2026-{issue_counter:03d}"
        issue_counter += 1
        
        issue_item = {
            "id": issue_id,
            "estate": "SKDE",
            "divisi": div,
            "blok": blk,
            "lat": pt[0],
            "lng": pt[1],
            "problem": prob["problem"],
            "no": prob["no"],
            "category": prob["category"],
            "sensitivity": sens,
            "timeframe": prob["timeframe"],
            "unit": unit,
            "color": prob["color"],
            "source": "Trabas",
            "actionPlan": action_plan,
            "volumeInventarisasi": vol_inv,
            "realisasiTerverifikasi": realisasi,
            "progress": progress,
            "status": status,
            "overdue": overdue,
            "tanggalLapor": tgl_lapor,
            "tanggalLaporText": tgl_lapor_text,
            "targetSelesai": target_selesai,
            "pic": random.choice(pics),
            "fotoSebelumDate": foto_sebelum_date,
            "fotoSesudahDate": foto_sesudah_date,
            "verifiedBy": verified_by,
            "notes": f"Temuan titik masalah {prob['problem']} pada baris tanaman/pasar pikul Blok {blk} hasil survei Trabas."
        }
        issues_list.append(issue_item)

# Re-calculate block openProblems and actionProgress
for blk, b_obj in blocks_dict.items():
    blk_issues = [i for i in issues_list if i["blok"] == blk]
    if blk_issues:
        open_c = sum(1 for i in blk_issues if i["status"] != "Selesai")
        avg_prog = sum(i["progress"] for i in blk_issues) / len(blk_issues)
        b_obj["openProblems"] = open_c
        b_obj["actionProgress"] = round(avg_prog, 1)
        b_obj["totalProblems"] = len(blk_issues)

# 6 Highlighted Documentation Cases for View 7
docs_before_after = [
    {
        "id": "DOC-001",
        "estate": "SKDE",
        "divisi": "DIVISI 3",
        "blok": "T-32",
        "lat": -0.6975,
        "lng": 115.5019,
        "problem": "Pasar Pikul Semak",
        "beforeType": "semak_parah",
        "afterType": "bersih_standar",
        "tglIdentifikasi": "02/08/2026 09:14",
        "tglFollowUp": "14/08/2026 15:30",
        "action": "Babat manual & semprot pasar pikul 1.200 Mtr",
        "statusVerifikasi": "SELESAI - TERVERIFIKASI",
        "statusBadgeClass": "status-selesai",
        "isDone": True,
        "catatan": "Akses ancak panen kembali lancar, pengangkutan TBS tidak lagi terhambat vegetasi pakisan."
    },
    {
        "id": "DOC-002",
        "estate": "SKDE",
        "divisi": "DIVISI 3",
        "blok": "S-30",
        "lat": -0.6925,
        "lng": 115.5065,
        "problem": "Underpruning",
        "beforeType": "pelepah_sengsar",
        "afterType": "songgo_dua",
        "tglIdentifikasi": "05/08/2026 10:45",
        "tglFollowUp": "18/08/2026 14:10",
        "action": "Pruning standar songgo 2 sebanyak 450 Pokok",
        "statusVerifikasi": "SELESAI - TERVERIFIKASI",
        "statusBadgeClass": "status-selesai",
        "isDone": True,
        "catatan": "Pelepah sengsar berhasil diturunkan dan disusun rapi di gawangan mati."
    },
    {
        "id": "DOC-003",
        "estate": "SKDE",
        "divisi": "DIVISI 3",
        "blok": "T-34",
        "lat": -0.6948,
        "lng": 115.5078,
        "problem": "Titi Panen Kurang / Rusak",
        "beforeType": "titi_patah",
        "afterType": "titi_beton",
        "tglIdentifikasi": "08/08/2026 11:20",
        "tglFollowUp": "22/08/2026 16:45",
        "action": "Pemasangan 4 unit titi panen plat beton bertulang",
        "statusVerifikasi": "SELESAI - TERVERIFIKASI",
        "statusBadgeClass": "status-selesai",
        "isDone": True,
        "catatan": "Arus angkut lori/angkong panen antar parit tersambung mulus."
    },
    {
        "id": "DOC-004",
        "estate": "SKDE",
        "divisi": "DIVISI 3",
        "blok": "U-31",
        "lat": -0.7065,
        "lng": 115.5042,
        "problem": "Areal Banjir / Tergenang",
        "beforeType": "genangan_air",
        "afterType": "parit_lancar",
        "tglIdentifikasi": "10/08/2026 08:30",
        "tglFollowUp": "Target: 31/08/2026",
        "action": "Cuci parit outlet & normalisasi tanggul 800 Mtr",
        "statusVerifikasi": "DALAM PENGERJAAN (65%)",
        "statusBadgeClass": "status-pengerjaan",
        "isDone": False,
        "catatan": "Excavator mini sedang melakukan pendalaman parit sekunder, genangan surut 40%."
    },
    {
        "id": "DOC-005",
        "estate": "SKDE",
        "divisi": "DIVISI 3",
        "blok": "U-33",
        "lat": -0.7102,
        "lng": 115.5085,
        "problem": "Defisiensi Hara",
        "beforeType": "daun_kuning",
        "afterType": "daun_hijau",
        "tglIdentifikasi": "12/08/2026 14:00",
        "tglFollowUp": "Target: 05/09/2026",
        "action": "Aplikasi pupuk ekstra MOP & Kieserite 8.5 Ha",
        "statusVerifikasi": "MENUNGGU VERIFIKASI (95%)",
        "statusBadgeClass": "status-verifikasi",
        "isDone": False,
        "catatan": "Aplikasi pupuk tuntas, menunggu inspeksi visual sampling daun oleh tim Agronomi."
    },
    {
        "id": "DOC-006",
        "estate": "SKDE",
        "divisi": "DIVISI 3",
        "blok": "V-41",
        "lat": -0.7205,
        "lng": 115.5285,
        "problem": "TPH Bermasalah",
        "beforeType": "tph_semak",
        "afterType": "tph_bersih",
        "tglIdentifikasi": "15/08/2026 09:10",
        "tglFollowUp": "24/08/2026 11:30",
        "action": "Pembersihan semak, perataan lantai & penomoran TPH 12 unit",
        "statusVerifikasi": "SELESAI - TERVERIFIKASI",
        "statusBadgeClass": "status-selesai",
        "isDone": True,
        "catatan": "TPH bersih, buah tersusun rapi memudahkan pemuatan dump truck."
    }
]

# Estate Summary
estate_summary = {
    "estate": "SKDE",
    "totalBlok": len(all_blocks_list),
    "totalLuas": round(sum(b["luas"] for b in all_blocks_list), 2),
    "avgActualYTD": round(sum(b["actualYTD"] * b["luas"] for b in all_blocks_list) / sum(b["luas"] for b in all_blocks_list), 2),
    "avgPotencyYTD": round(sum(b["potencyYTD"] * b["luas"] for b in all_blocks_list) / sum(b["luas"] for b in all_blocks_list), 2),
    "totalIssues": len(issues_list),
    "openIssues": sum(1 for i in issues_list if i["status"] != "Selesai"),
    "overdueIssues": sum(1 for i in issues_list if i["overdue"]),
    "avgActionProgress": round(sum(i["progress"] for i in issues_list) / len(issues_list), 1)
}
estate_summary["avgBccrYTD"] = round((estate_summary["avgActualYTD"] / estate_summary["avgPotencyYTD"]) * 100.0, 1)

# Division Summaries
division_summaries = []
for div in ["DIVISI 1", "DIVISI 2", "DIVISI 3", "DIVISI 4", "DIVISI 5"]:
    div_blks = [b for b in all_blocks_list if b["divisi"] == div]
    if not div_blks:
        continue
    total_l = sum(b["luas"] for b in div_blks)
    avg_act = round(sum(b["actualYTD"] * b["luas"] for b in div_blks) / total_l, 2)
    avg_pot = round(sum(b["potencyYTD"] * b["luas"] for b in div_blks) / total_l, 2)
    div_issues = [i for i in issues_list if i["divisi"] == div]
    open_iss = sum(1 for i in div_issues if i["status"] != "Selesai")
    od_iss = sum(1 for i in div_issues if i["overdue"])
    avg_prog = round(sum(i["progress"] for i in div_issues) / len(div_issues), 1) if div_issues else 75.0
    gap = round(avg_act - avg_pot, 2)
    prio = "Sangat Kritis" if gap < -4.2 else ("Tinggi" if gap < -3.2 else "Sedang")
    division_summaries.append({
        "divisi": div,
        "budgetYTD": avg_pot,
        "actualYTD": avg_act,
        "productionGap": gap,
        "actionCompletion": avg_prog,
        "openProblems": open_iss,
        "overdue": od_iss,
        "priority": prio
    })

# 24-Month Continuous Production Timeline
months_24 = [
    ("Sep 25", "actual", 1.85, 1.48, None, 80.0, -0.37),
    ("Okt 25", "actual", 1.95, 1.55, None, 79.5, -0.40),
    ("Nov 25", "actual", 2.05, 1.62, None, 79.0, -0.43),
    ("Des 25", "actual", 2.10, 1.68, None, 80.0, -0.42),
    ("Jan 26", "actual", 1.90, 1.50, None, 78.9, -0.40),
    ("Feb 26", "actual", 1.80, 1.42, None, 78.9, -0.38),
    ("Mar 26", "actual", 1.95, 1.56, None, 80.0, -0.39),
    ("Apr 26", "actual", 2.00, 1.58, None, 79.0, -0.42),
    ("Mei 26", "actual", 2.10, 1.64, None, 78.1, -0.46),
    ("Jun 26", "actual", 2.15, 1.70, None, 79.1, -0.45),
    ("Jul 26", "actual", 2.20, 1.75, None, 79.5, -0.45),
    ("Agu 26", "cutoff", 2.25, 1.80, None, 80.0, -0.45),
    ("Sep 26", "projection", 2.10, None, 1.74, 82.9, -0.36),
    ("Okt 26", "projection", 2.15, None, 1.82, 84.7, -0.33),
    ("Nov 26", "projection", 2.20, None, 1.90, 86.4, -0.30),
    ("Des 26", "projection", 2.25, None, 1.98, 88.0, -0.27),
    ("Jan 27", "projection", 2.05, None, 1.84, 89.8, -0.21),
    ("Feb 27", "projection", 1.95, None, 1.78, 91.3, -0.17),
    ("Mar 27", "projection", 2.10, None, 1.95, 92.9, -0.15),
    ("Apr 27", "projection", 2.15, None, 2.02, 94.0, -0.13),
    ("Mei 27", "projection", 2.20, None, 2.09, 95.0, -0.11),
    ("Jun 27", "projection", 2.25, None, 2.16, 96.0, -0.09),
    ("Jul 27", "projection", 2.30, None, 2.23, 97.0, -0.07),
    ("Agu 27", "projection", 2.35, None, 2.30, 97.9, -0.05),
]
production_timeline = [
    {
        "month": m[0],
        "type": m[1],
        "potency": m[2],
        "actual": m[3],
        "projection": m[4],
        "bccr": m[5],
        "gap": m[6]
    }
    for m in months_24
]

# Rekap BCCR Matrix (14 Months)
rekap_months = ["Jul 25", "Agu 25", "Sep 25", "Okt 25", "Nov 25", "Des 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "Mei 26", "Jun 26", "Jul 26", "Agu 26"]
rekap_bccr = {}
for target_key in ["ALL", "DIVISI 1", "DIVISI 2", "DIVISI 3", "DIVISI 4", "DIVISI 5"]:
    if target_key == "ALL":
        target_blks = all_blocks_list
    else:
        target_blks = [b for b in all_blocks_list if b["divisi"] == target_key]
    
    n_blks = len(target_blks)
    curr_counts = [0, 0, 0, 0, 0, 0]
    for b in target_blks:
        p = b["bccrYTD"]
        if p < 60: curr_counts[0] += 1
        elif p < 70: curr_counts[1] += 1
        elif p < 80: curr_counts[2] += 1
        elif p < 90: curr_counts[3] += 1
        elif p < 100: curr_counts[4] += 1
        else: curr_counts[5] += 1
    
    rows_counts = [[], [], [], [], [], []]
    for m_idx in range(14):
        factor = (13 - m_idx) / 13.0
        c0 = max(0, int(round(curr_counts[0] + factor * 3)))
        c1 = max(0, int(round(curr_counts[1] + factor * 2)))
        c2 = max(0, int(round(curr_counts[2] + factor * 2)))
        c3 = max(0, int(round(curr_counts[3] - factor * 2)))
        c4 = max(0, int(round(curr_counts[4] - factor * 2)))
        c5 = max(0, int(round(curr_counts[5] - factor * 3)))
        s = c0 + c1 + c2 + c3 + c4 + c5
        diff = n_blks - s
        c2 += diff
        for ri, c_val in enumerate([c0, c1, c2, c3, c4, c5]):
            rows_counts[ri].append(max(0, c_val))
    
    range_defs = [
        ("<60%", "#FF0000"),
        ("60–<70%", "#FF9900"),
        ("70–<80%", "#FFCC00"),
        ("80–<90%", "#99CC00"),
        ("90–<100%", "#339966"),
        ("≥100%", "#009900"),
    ]
    matrix_rows = []
    for ri, (r_name, r_color) in enumerate(range_defs):
        matrix_rows.append({
            "range": r_name,
            "color": r_color,
            "months": rows_counts[ri]
        })
    
    u80_list = []
    a80_list = []
    for m_idx in range(14):
        u_cnt = rows_counts[0][m_idx] + rows_counts[1][m_idx] + rows_counts[2][m_idx]
        a_cnt = rows_counts[3][m_idx] + rows_counts[4][m_idx] + rows_counts[5][m_idx]
        u_pct = round((u_cnt / n_blks) * 100, 1) if n_blks else 0
        a_pct = round((a_cnt / n_blks) * 100, 1) if n_blks else 0
        u80_list.append({"count": u_cnt, "pct": u_pct})
        a80_list.append({"count": a_cnt, "pct": a_pct})
    
    rekap_bccr[target_key] = {
        "totalBlocks": n_blks,
        "months": rekap_months,
        "rows": matrix_rows,
        "u80": u80_list,
        "a80": a80_list
    }

# Compile to JavaScript
js_output = f"""/**
 * SMART PROBLEM TAGGING - Static Data Store (Dataset SKDE Aktual)
 * Total Blok: {estate_summary['totalBlok']} | Total Titik Masalah: {estate_summary['totalIssues']} | Kategori: 16 Master Problem
 */

(function () {{
  'use strict';

  var MASTER_PROBLEMS = {json.dumps(master_problems, ensure_ascii=False, indent=2)};

  var BCCR_RANGES = {json.dumps(bccr_ranges, ensure_ascii=False, indent=2)};

  var BLOCKS = {json.dumps(blocks_dict, ensure_ascii=False, indent=2)};

  var ALL_BLOCKS = {json.dumps(all_blocks_list, ensure_ascii=False, indent=2)};

  var ACTION_PLANS = {json.dumps(issues_list, ensure_ascii=False, indent=2)};

  var DOCS_BEFORE_AFTER = {json.dumps(docs_before_after, ensure_ascii=False, indent=2)};

  var ESTATE_SUMMARY = {json.dumps(estate_summary, ensure_ascii=False, indent=2)};

  var DIVISION_SUMMARIES = {json.dumps(division_summaries, ensure_ascii=False, indent=2)};

  var PRODUCTION_TIMELINE = {json.dumps(production_timeline, ensure_ascii=False, indent=2)};

  var REKAP_BCCR = {json.dumps(rekap_bccr, ensure_ascii=False, indent=2)};

  function getBCCRColor(pct) {{
    if (pct === null || pct === undefined || isNaN(pct)) return '#A4A8AC';
    if (pct < 60) return '#FF0000';
    if (pct < 70) return '#FF9900';
    if (pct < 80) return '#FFCC00';
    if (pct < 90) return '#99CC00';
    if (pct < 100) return '#339966';
    return '#009900';
  }}

  function getBCCRLegendLabel(pct) {{
    if (pct === null || pct === undefined || isNaN(pct)) return 'No data';
    if (pct < 60) return '<60%';
    if (pct < 70) return '60–<70%';
    if (pct < 80) return '70–<80%';
    if (pct < 90) return '80–<90%';
    if (pct < 100) return '90–<100%';
    return '≥100%';
  }}

  window.SPT_DATA = {{
    MASTER_PROBLEMS: MASTER_PROBLEMS,
    BCCR_RANGES: BCCR_RANGES,
    BLOCKS: BLOCKS,
    ALL_BLOCKS: ALL_BLOCKS,
    ACTION_PLANS: ACTION_PLANS,
    DOCS_BEFORE_AFTER: DOCS_BEFORE_AFTER,
    ESTATE_SUMMARY: ESTATE_SUMMARY,
    DIVISION_SUMMARIES: DIVISION_SUMMARIES,
    PRODUCTION_TIMELINE: PRODUCTION_TIMELINE,
    REKAP_BCCR: REKAP_BCCR,
    getBCCRColor: getBCCRColor,
    getBCCRLegendLabel: getBCCRLegendLabel
  }};
}})();
"""

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print(f"data.js generated successfully! Total blocks: {len(all_blocks_list)}, Total issues: {len(issues_list)}")

