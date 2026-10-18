import subprocess

with open('test_app_clean.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = "onclick=\"window.SPT_APP.selectProblemTagMarker('' + props.tag_id + '')\""
replacement = "onclick=\"window.SPT_APP.selectProblemTagMarker(\\'" + "' + props.tag_id + '" + "\\')\""

if target in code:
    code = code.replace(target, replacement)
    print("Found and replaced target!")
else:
    print("Target not found directly, checking variations...")
    # let's find the line containing selectProblemTagMarker
    for line in code.split('\n'):
        if 'selectProblemTagMarker(' in line:
            print("Found line:", line[:120])

with open('test_app_clean.js', 'w', encoding='utf-8') as f:
    f.write(code)

res = subprocess.run(['node', '-c', 'test_app_clean.js'], capture_output=True, text=True)
if res.returncode == 0:
    print("SUCCESS: test_app_clean.js syntax passed completely!")
else:
    print("Node syntax check error:")
    print(res.stderr)
