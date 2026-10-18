import json
import hashlib

def get_hash(s):
    return int(hashlib.md5(s.encode('utf-8')).hexdigest(), 16)

with open('TNKE.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

feats = raw['data']['features']
print(f"Total features in TNKE: {len(feats)}")

grouped_blocks = {}
for feat in feats:
    props = feat['properties']
    estate = props.get('estate', 'TNKE')
    divisi = props.get('divisi', 'DIVISI 1')
    blok = props.get('blok', 'D-01')
    key = f"{estate}|{divisi}|{blok}"
    if key not in grouped_blocks:
        grouped_blocks[key] = {
            'estate': estate,
            'divisi': divisi,
            'blok': blok,
            'features': []
        }
    grouped_blocks[key]['features'].append(feat)

print(f"Total unique TNKE logical blocks: {len(grouped_blocks)}")

# Let's inspect distribution of generated assessment progress
progress_buckets = {
    '0% (Belum)': 0,
    '>0-25% (Merah)': 0,
    '>25-50% (Oranye)': 0,
    '>50-75% (Kuning)': 0,
    '>75-<100% (Hijau Muda)': 0,
    '100% (Hijau Tua)': 0
}

for i, (key, bdata) in enumerate(sorted(grouped_blocks.items())):
    h = get_hash(key)
    # deterministic area between 22.0 and 38.0 ha
    total_area = round(22.0 + (h % 160) / 10.0, 1)
    
    # bucket selection based on modulo
    bucket_mod = h % 100
    if bucket_mod < 15:
        pct = 0.0
    elif bucket_mod < 30:
        pct = round(5.0 + (h % 200) / 10.0, 1) # 5 - 25%
    elif bucket_mod < 50:
        pct = round(26.0 + (h % 240) / 10.0, 1) # 26 - 50%
    elif bucket_mod < 70:
        pct = round(51.0 + (h % 240) / 10.0, 1) # 51 - 75%
    elif bucket_mod < 85:
        pct = round(76.0 + (h % 230) / 10.0, 1) # 76 - 99%
    else:
        pct = 100.0

    if pct == 0:
        progress_buckets['0% (Belum)'] += 1
    elif pct <= 25:
        progress_buckets['>0-25% (Merah)'] += 1
    elif pct <= 50:
        progress_buckets['>25-50% (Oranye)'] += 1
    elif pct <= 75:
        progress_buckets['>50-75% (Kuning)'] += 1
    elif pct < 100:
        progress_buckets['>75-<100% (Hijau Muda)'] += 1
    else:
        progress_buckets['100% (Hijau Tua)'] += 1

print("\nAssessment Progress Distribution across 139 blocks:")
print(json.dumps(progress_buckets, indent=2))
