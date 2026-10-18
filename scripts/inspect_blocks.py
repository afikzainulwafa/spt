import sys
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

for blk in ['S-28', 'S-29', 'T-29']:
    pattern = f'"{blk}": {{'
    idx = text.find(pattern)
    if idx != -1:
        print(f"=== {blk} in BLOCKS ===")
        print(text[idx:idx+300])
        print()

for blk in ['S-28', 'S-29', 'T-29']:
    pattern = f'"blok": "{blk}"'
    idx = text.find(pattern)
    if idx != -1:
        start = text.rfind('{', 0, idx)
        print(f"=== {blk} in ALL_BLOCKS ===")
        print(text[start:start+350])
        print()
