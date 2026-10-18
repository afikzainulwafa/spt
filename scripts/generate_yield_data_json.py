import json
import math
import sys

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Read data.js to get BLOCKS and ALL_BLOCKS
with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract ALL_BLOCKS JSON
start_idx = text.find('var ALL_BLOCKS = [')
end_idx = text.find('];', start_idx) + 1
all_blocks_str = text[start_idx + len('var ALL_BLOCKS = '):end_idx]
all_blocks = json.loads(all_blocks_str)

MONTHS_24 = [
    {"key": "2025-08", "label": "Agu 25", "horizon": -11, "isForecast": False, "isCutoff": False, "provenance": "syntheticHistorical", "provenanceLabel": "Sintetis historis"},
    {"key": "2025-09", "label": "Sep 25", "horizon": -10, "isForecast": False, "isCutoff": False, "provenance": "syntheticHistorical", "provenanceLabel": "Sintetis historis"},
    {"key": "2025-10", "label": "Okt 25", "horizon": -9,  "isForecast": False, "isCutoff": False, "provenance": "syntheticHistorical", "provenanceLabel": "Sintetis historis"},
    {"key": "2025-11", "label": "Nov 25", "horizon": -8,  "isForecast": False, "isCutoff": False, "provenance": "syntheticHistorical", "provenanceLabel": "Sintetis historis"},
    {"key": "2025-12", "label": "Des 25", "horizon": -7,  "isForecast": False, "isCutoff": False, "provenance": "syntheticHistorical", "provenanceLabel": "Sintetis historis"},
    {"key": "2026-01", "label": "Jan 26", "horizon": -6,  "isForecast": False, "isCutoff": False, "provenance": "observed", "provenanceLabel": "Moving sumber"},
    {"key": "2026-02", "label": "Feb 26", "horizon": -5,  "isForecast": False, "isCutoff": False, "provenance": "observed", "provenanceLabel": "Moving sumber"},
    {"key": "2026-03", "label": "Mar 26", "horizon": -4,  "isForecast": False, "isCutoff": False, "provenance": "observed", "provenanceLabel": "Moving sumber"},
    {"key": "2026-04", "label": "Apr 26", "horizon": -3,  "isForecast": False, "isCutoff": False, "provenance": "observed", "provenanceLabel": "Moving sumber"},
    {"key": "2026-05", "label": "Mei 26", "horizon": -2,  "isForecast": False, "isCutoff": False, "provenance": "observed", "provenanceLabel": "Moving sumber"},
    {"key": "2026-06", "label": "Jun 26", "horizon": -1,  "isForecast": False, "isCutoff": False, "provenance": "observed", "provenanceLabel": "Moving sumber"},
    {"key": "2026-07", "label": "Jul 26", "horizon": 0,   "isForecast": False, "isCutoff": True,  "provenance": "observed", "provenanceLabel": "Moving sumber (Cut-off)"},
    {"key": "2026-08", "label": "Agu 26", "horizon": 1,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2026-09", "label": "Sep 26", "horizon": 2,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2026-10", "label": "Okt 26", "horizon": 3,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2026-11", "label": "Nov 26", "horizon": 4,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2026-12", "label": "Des 26", "horizon": 5,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2027-01", "label": "Jan 27", "horizon": 6,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2027-02", "label": "Feb 27", "horizon": 7,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2027-03", "label": "Mar 27", "horizon": 8,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2027-04", "label": "Apr 27", "horizon": 9,   "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2027-05", "label": "Mei 27", "horizon": 10,  "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2027-06", "label": "Jun 27", "horizon": 11,  "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"},
    {"key": "2027-07", "label": "Jul 27", "horizon": 12,  "isForecast": True,  "isCutoff": False, "provenance": "scenarioForecast", "provenanceLabel": "Proyeksi skenario"}
]

SPECIAL_BLOCKS = {
    'SKDE:DIVISI 3:S-28': {
        'estate': 'SKDE',
        'divisi': 'DIVISI 3',
        'blok': 'S-28',
        'area': 33.54,
        'recoveryMonth': 10,
        'actualMoving': [20.20, 20.30, 20.45, 20.55, 20.67, 21.50, 21.60, 21.70, 22.20, 22.60, 24.60, 26.30],
        'potencyMoving': [
            29.33333333, 29.25, 29.16666667, 29.08333333, 29.0, 29.0,
            29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
            29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
            29.0, 29.0, 29.0, 29.0, 29.0, 29.0
        ]
    },
    'SKDE:DIVISI 3:S-29': {
        'estate': 'SKDE',
        'divisi': 'DIVISI 3',
        'blok': 'S-29',
        'area': 26.94,
        'recoveryMonth': 9,
        'actualMoving': [21.00, 21.30, 21.70, 22.00, 22.10, 22.20, 23.40, 22.30, 24.50, 25.80, 26.50, 30.60],
        'potencyMoving': [
            29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
            29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
            29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
            29.0, 29.0, 29.0, 29.0, 29.0, 29.0
        ]
    },
    'SKDE:DIVISI 3:T-29': {
        'estate': 'SKDE',
        'divisi': 'DIVISI 3',
        'blok': 'T-29',
        'area': 29.75,
        'recoveryMonth': 11,
        'actualMoving': [21.40, 21.60, 21.90, 22.10, 22.30, 22.50, 22.60, 23.80, 25.20, 24.90, 26.80, 28.00],
        'potencyMoving': [
            28.9, 28.9, 28.9, 28.9, 28.9, 28.9,
            28.9, 28.9, 28.9, 28.9, 28.9, 28.9,
            28.9, 28.9, 28.9, 28.9, 28.9, 28.9,
            28.9, 28.9, 28.9, 28.9, 28.9, 28.9
        ]
    }
}

def stable_hash(s):
    h = 0
    for ch in s:
        h = ((h << 5) - h) + ord(ch)
        h &= 0xFFFFFFFF
    if h >= 0x80000000:
        h -= 0x100000000
    return abs(h)

def compute_timeline(spec):
    cutoff_act = spec['actualMoving'][11]
    cutoff_pot = spec['potencyMoving'][11]
    start_ratio = cutoff_act / cutoff_pot if cutoff_pot > 0 else 0.8
    rec_month = spec.get('recoveryMonth', 10)
    
    timeline = []
    for i in range(24):
        m = MONTHS_24[i]
        pot = spec['potencyMoving'][i]
        act = None
        prj = None
        
        if i < 12:
            act = spec['actualMoving'][i]
            bccr = (act / pot * 100) if pot > 0 else 0
        else:
            h_month = i - 11
            u = min(h_month / rec_month, 1.0)
            easing = 3.0 * u * u - 2.0 * u * u * u
            
            if start_ratio >= 1.0:
                prj_ratio = start_ratio
            else:
                prj_ratio = start_ratio + (1.0 - start_ratio) * easing
                if h_month >= rec_month:
                    prj_ratio = 1.0
            
            prj = round(pot * prj_ratio, 2)
            bccr = round(prj_ratio * 100, 2)
        
        gap = (act - pot) if act is not None else ((prj - pot) if prj is not None else 0)
        
        timeline.append({
            "monthKey": m["key"],
            "monthLabel": m["label"],
            "horizon": m["horizon"],
            "isForecast": m["isForecast"],
            "isCutoff": m["isCutoff"],
            "actualMoving": round(act, 2) if act is not None else None,
            "projectionMoving": round(prj, 2) if prj is not None else None,
            "potencyMoving": round(pot, 4),
            "bccrRatio": round(bccr, 2),
            "provenance": m["provenance"],
            "provenanceLabel": m["provenanceLabel"],
            "gap": round(gap, 2)
        })
        
    return {
        "estate": spec["estate"],
        "divisi": spec["divisi"],
        "blok": spec["blok"],
        "area": spec["area"],
        "recoveryMonth": rec_month,
        "timeline": timeline
    }

blocks_output = {}

for b in all_blocks:
    b_key = f"{b.get('estate', 'SKDE')}:{b['divisi']}:{b['blok']}"
    if b_key in SPECIAL_BLOCKS:
        spec = SPECIAL_BLOCKS[b_key]
    else:
        cutoff_act = b.get('actualYTD', 24.5)
        base_pot = b.get('potencyYTD', 28.5)
        rec_month = 9 + (stable_hash(b_key) % 4)
        
        pot_moving = []
        for m_idx in range(24):
            if m_idx == 0: pot_moving.append(base_pot + 0.3333)
            elif m_idx == 1: pot_moving.append(base_pot + 0.25)
            elif m_idx == 2: pot_moving.append(base_pot + 0.1667)
            elif m_idx == 3: pot_moving.append(base_pot + 0.0833)
            else: pot_moving.append(base_pot)
            
        act_moving = []
        start_act = cutoff_act * 0.76
        for h in range(12):
            if h < 5:
                frac = h / 5.0
                v = start_act + (cutoff_act * 0.82 - start_act) * frac
                act_moving.append(round(v, 2))
            else:
                frac2 = (h - 5) / 6.0
                v2 = cutoff_act * 0.82 + (cutoff_act - cutoff_act * 0.82) * frac2
                act_moving.append(round(v2, 2))
                
        spec = {
            "estate": b.get("estate", "SKDE"),
            "divisi": b["divisi"],
            "blok": b["blok"],
            "area": b.get("luas", 28.0),
            "recoveryMonth": rec_month,
            "actualMoving": act_moving,
            "potencyMoving": pot_moving
        }
        
    blocks_output[b_key] = compute_timeline(spec)

output_data = {
    "metadata": {
        "title": "Normalized Yield Moving 24-Month Data",
        "estate": "SKDE",
        "totalBlocks": len(blocks_output),
        "cutoff": "2026-07",
        "months": [m["key"] for m in MONTHS_24]
    },
    "blocks": blocks_output
}

with open('yield-data.json', 'w', encoding='utf-8') as out_f:
    json.dump(output_data, out_f, indent=2)

print(f"yield-data.json created successfully with {len(blocks_output)} blocks!")
