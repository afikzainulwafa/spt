import json

with open('TNKE.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

data = raw['data']
features = data['features']

print(f"Total features: {len(features)}")

# Group features by composite key (estate + divisi + blok)
grouped = {}
for feat in features:
    props = feat.get('properties', {})
    estate = props.get('estate', 'TNKE')
    divisi = props.get('divisi', 'DIVISI 1')
    blok = props.get('blok', 'ALL')
    key = f"{estate}|{divisi}|{blok}"
    if key not in grouped:
        grouped[key] = []
    grouped[key].append(feat)

print(f"Total unique blocks (composite keys): {len(grouped)}")

divisi_counts = {}
for key in grouped:
    estate, divisi, blok = key.split('|')
    divisi_counts[divisi] = divisi_counts.get(divisi, 0) + 1

print("Blocks count per division:", json.dumps(divisi_counts, indent=2))

multi_parts = {k: len(v) for k, v in grouped.items() if len(v) > 1}
if multi_parts:
    print("Blocks with multiple polygon features:", multi_parts)
