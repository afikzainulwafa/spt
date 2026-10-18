import json
import re

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Updates for S-28, S-29, T-29
updates = {
    "S-28": {
        "luas": 33.54,
        "potencyYTD": 29.00,
        "actualYTD": 26.30,
        "bccrYTD": 90.7,
        "bccrColor": "#339966",
        "bccrRange": "90–<100%",
        "productionGap": -2.70
    },
    "S-29": {
        "luas": 26.94,
        "potencyYTD": 29.00,
        "actualYTD": 30.60,
        "bccrYTD": 105.5,
        "bccrColor": "#009900",
        "bccrRange": "≥100%",
        "productionGap": 1.60
    },
    "T-29": {
        "luas": 29.75,
        "potencyYTD": 28.90,
        "actualYTD": 28.00,
        "bccrYTD": 96.9,
        "bccrColor": "#339966",
        "bccrRange": "90–<100%",
        "productionGap": -0.90
    }
}

# 1. Update in BLOCKS dictionary
for blk, vals in updates.items():
    # Find block entry in BLOCKS
    pattern = re.compile(r'("' + blk + r'":\s*\{[^}]+?"luas":\s*)[0-9.]+(,[^}]+?"potencyYTD":\s*)[0-9.]+(,[^}]+?"actualYTD":\s*)[0-9.]+(,[^}]+?"bccrYTD":\s*)[0-9.]+(,[^}]+?"bccrColor":\s*")[^"]+("[^}]+?"bccrRange":\s*")[^"]+("[^}]+?"productionGap":\s*)[-0-9.]+', re.DOTALL)
    
    def repl(m, v=vals):
        return (m.group(1) + str(v["luas"]) +
                m.group(2) + str(v["potencyYTD"]) +
                m.group(3) + str(v["actualYTD"]) +
                m.group(4) + str(v["bccrYTD"]) +
                m.group(5) + v["bccrColor"] +
                m.group(6) + v["bccrRange"] +
                m.group(7) + str(v["productionGap"]))
    
    new_text, count = pattern.subn(repl, text)
    print(f"BLOCKS {blk} updated: {count} match(es)")
    text = new_text

# 2. Update in ALL_BLOCKS array
for blk, vals in updates.items():
    pattern = re.compile(r'(\{\s*"estate":\s*"SKDE",\s*"divisi":\s*"DIVISI 3",\s*"blok":\s*"' + blk + r'",\s*"luas":\s*)[0-9.]+(,[^}]+?"potencyYTD":\s*)[0-9.]+(,[^}]+?"actualYTD":\s*)[0-9.]+(,[^}]+?"bccrYTD":\s*)[0-9.]+(,[^}]+?"bccrColor":\s*")[^"]+("[^}]+?"bccrRange":\s*")[^"]+("[^}]+?"productionGap":\s*)[-0-9.]+', re.DOTALL)
    
    def repl_arr(m, v=vals):
        return (m.group(1) + str(v["luas"]) +
                m.group(2) + str(v["potencyYTD"]) +
                m.group(3) + str(v["actualYTD"]) +
                m.group(4) + str(v["bccrYTD"]) +
                m.group(5) + v["bccrColor"] +
                m.group(6) + v["bccrRange"] +
                m.group(7) + str(v["productionGap"]))
    
    new_text, count = pattern.subn(repl_arr, text)
    print(f"ALL_BLOCKS {blk} updated: {count} match(es)")
    text = new_text

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("data.js successfully synchronized with S-28, S-29, T-29 reference values!")
