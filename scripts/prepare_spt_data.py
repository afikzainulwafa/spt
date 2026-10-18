import shutil
import json
import os

src_dir = 'TNKE_SPT_Antigravity_Incremental_Update'

# 1. Copy JSONs
shutil.copyfile(os.path.join(src_dir, 'tnke_spt_problem_master_16.json'), 'tnke_spt_problem_master_16.json')
shutil.copyfile(os.path.join(src_dir, 'tnke_action_plan_mockup.json'), 'tnke_action_plan_mockup.json')
shutil.copyfile(os.path.join(src_dir, 'tnke_problem_tags.geojson'), 'tnke_problem_tags.geojson')
shutil.copyfile(os.path.join(src_dir, 'tnke_problem_tags.geojson'), os.path.join('tracking', 'tnke_problem_tags.geojson'))

# 2. Generate tnke_problem_tags_geojson.js
with open('tnke_problem_tags.geojson', 'r', encoding='utf-8') as f:
    tags_data = json.load(f)
with open('tnke_problem_tags_geojson.js', 'w', encoding='utf-8') as f:
    f.write('(function () {\n  "use strict";\n  window.TNKE_PROBLEM_TAGS_GEOJSON = ')
    json.dump(tags_data, f)
    f.write(';\n  window.tnkeProblemTagsGeoJson = window.TNKE_PROBLEM_TAGS_GEOJSON;\n})();\n')

# 3. Generate tnke_spt_problem_master_16.js
with open('tnke_spt_problem_master_16.json', 'r', encoding='utf-8') as f:
    master_data = json.load(f)
with open('tnke_spt_problem_master_16.js', 'w', encoding='utf-8') as f:
    f.write('(function () {\n  "use strict";\n  window.TNKE_SPT_PROBLEM_MASTER_16 = ')
    json.dump(master_data, f)
    f.write(';\n})();\n')

# 4. Generate tnke_action_plan_mockup.js
with open('tnke_action_plan_mockup.json', 'r', encoding='utf-8') as f:
    action_data = json.load(f)
with open('tnke_action_plan_mockup.js', 'w', encoding='utf-8') as f:
    f.write('(function () {\n  "use strict";\n  window.TNKE_ACTION_PLAN_MOCKUP = ')
    json.dump(action_data, f)
    f.write(';\n})();\n')

print('Successfully copied files and generated JS wrappers.')
