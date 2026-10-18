import json

with open('TNKE.json', 'r', encoding='utf-8') as f:
    raw = json.load(f)

# raw has {"success": true, "data": { "type": "FeatureCollection", "features": [...] }}
data = raw.get('data', raw)

js_content = f"// TNKE GeoJSON Bundled Asset for Smart Problem Tagging\nwindow.TNKE_GEOJSON = {json.dumps(data)};\n"

with open('tnke_geojson.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Created tnke_geojson.js successfully. File size:", len(js_content), "bytes.")
