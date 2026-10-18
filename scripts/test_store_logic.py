import json
import hashlib

def get_hash(s):
    return int(hashlib.md5(s.encode('utf-8')).hexdigest(), 16)

with open('TNKE.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

feats = raw['data']['features']

grouped = {}
for feat in feats:
    p = feat['properties']
    estate = p.get('estate', 'TNKE')
    divisi = p.get('divisi', 'DIVISI 1')
    blok = p.get('blok', 'D-01')
    key = f"{estate}|{divisi}|{blok}"
    if key not in grouped:
        grouped[key] = {
            'estate': estate,
            'divisi': divisi,
            'blok': blok
        }

blocks_data = {}
for key, binfo in grouped.items():
    h = get_hash(key)
    estate = binfo['estate']
    divisi = binfo['divisi']
    blok = binfo['blok']
    
    total_area = round(22.0 + (h % 160) / 10.0, 1)
    
    bucket_mod = h % 100
    if bucket_mod < 15:
        target_pct = 0.0
    elif bucket_mod < 30:
        target_pct = round(5.0 + (h % 200) / 10.0, 1)
    elif bucket_mod < 50:
        target_pct = round(26.0 + (h % 240) / 10.0, 1)
    elif bucket_mod < 70:
        target_pct = round(51.0 + (h % 240) / 10.0, 1)
    elif bucket_mod < 85:
        target_pct = round(76.0 + (h % 230) / 10.0, 1)
    else:
        target_pct = 100.0

    if target_pct == 0:
        assessed_ha = 0.0
    elif target_pct == 100:
        assessed_ha = total_area
    else:
        assessed_ha = min(total_area, round(total_area * (target_pct / 100.0), 1))
    
    unassessed_ha = round(total_area - assessed_ha, 1)
    pct = round((assessed_ha / total_area) * 100.0, 1) if total_area > 0 else 0.0
    
    # Visits generator
    visits = []
    if pct > 0:
        if pct == 100:
            v1 = round(assessed_ha * 0.4, 1)
            v2 = round(assessed_ha * 0.35, 1)
            v3 = round(assessed_ha - v1 - v2, 1)
            visits = [
                {'date': '04 Sep 2026', 'add_ha': v1, 'cum_ha': v1, 'pct': round((v1/total_area)*100, 1)},
                {'date': '12 Sep 2026', 'add_ha': v2, 'cum_ha': round(v1+v2, 1), 'pct': round(((v1+v2)/total_area)*100, 1)},
                {'date': '20 Sep 2026', 'add_ha': v3, 'cum_ha': assessed_ha, 'pct': 100.0, 'note': 'Assessment selesai 100%'}
            ]
            if (h % 3) == 0: # Add re-visit
                visits.append({'date': '25 Sep 2026', 'add_ha': 0.0, 'cum_ha': assessed_ha, 'pct': 100.0, 'note': 'Assessment ulang (Cakupan +0 ha)'})
        else:
            v1 = round(assessed_ha * 0.5, 1)
            v2 = round(assessed_ha - v1, 1)
            visits = [
                {'date': '08 Sep 2026', 'add_ha': v1, 'cum_ha': v1, 'pct': round((v1/total_area)*100, 1)},
                {'date': '18 Sep 2026', 'add_ha': v2, 'cum_ha': assessed_ha, 'pct': pct}
            ]
            if (h % 4) == 0: # Add re-visit
                visits.append({'date': '24 Sep 2026', 'add_ha': 0.0, 'cum_ha': assessed_ha, 'pct': pct, 'note': 'Assessment ulang (Cakupan +0 ha)'})

    last_date = visits[-1]['date'] if visits else '-'
    
    # Tagging generator (0-4 tags)
    tag_count = (h % 5)
    
    blocks_data[key] = {
        'total_area': total_area,
        'assessed_ha': assessed_ha,
        'unassessed_ha': unassessed_ha,
        'pct': pct,
        'visits': visits,
        'last_date': last_date,
        'tag_count': tag_count
    }

print("Sample Block (TNKE|DIVISI 2|D-53):", json.dumps(blocks_data.get('TNKE|DIVISI 2|D-53'), indent=2))

# Calculate Overall Summary
tot_area = sum(b['total_area'] for b in blocks_data.values())
tot_ass = sum(b['assessed_ha'] for b in blocks_data.values())
tot_pct = round((tot_ass / tot_area) * 100, 1)
tot_complete = sum(1 for b in blocks_data.values() if b['pct'] == 100.0)
tot_tags = sum(b['tag_count'] for b in blocks_data.values())

print(f"\nOverall Estate TNKE Summary:")
print(f"Total Luas: {tot_area:.1f} ha across {len(blocks_data)} blocks")
print(f"Sudah Di-assess: {tot_ass:.1f} ha ({tot_pct}%)")
print(f"Assessment Lengkap: {tot_complete} dari {len(blocks_data)} blok")
print(f"Temuan Masalah: {tot_tags} temuan")
