import subprocess

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update loadGeoJsonData to load master, mockup, create problemAnalytics, and populate dropdowns
target_load = """      // Bind layer toggle checkbox
      var chkTags = document.getElementById('chkToggleProblemTags');"""

repl_load = """      // Load problem master 16 (fetch ./tnke_spt_problem_master_16.json, fallback to window.TNKE_SPT_PROBLEM_MASTER_16)
      try {
        var pmResp = await fetch('./tnke_spt_problem_master_16.json');
        if (pmResp.ok) {
          state.problemMaster = await pmResp.json();
        } else if (window.TNKE_SPT_PROBLEM_MASTER_16) {
          state.problemMaster = window.TNKE_SPT_PROBLEM_MASTER_16;
        }
      } catch (pmErr) {
        if (window.TNKE_SPT_PROBLEM_MASTER_16) {
          state.problemMaster = window.TNKE_SPT_PROBLEM_MASTER_16;
        }
      }

      // Load action plan mockup (fetch ./tnke_action_plan_mockup.json, fallback to window.TNKE_ACTION_PLAN_MOCKUP)
      try {
        var apResp = await fetch('./tnke_action_plan_mockup.json');
        if (apResp.ok) {
          state.actionPlanMockup = await apResp.json();
        } else if (window.TNKE_ACTION_PLAN_MOCKUP) {
          state.actionPlanMockup = window.TNKE_ACTION_PLAN_MOCKUP;
        }
      } catch (apErr) {
        if (window.TNKE_ACTION_PLAN_MOCKUP) {
          state.actionPlanMockup = window.TNKE_ACTION_PLAN_MOCKUP;
        }
      }

      // Initialize problem analytics engine
      if (typeof createSPTProblemAnalytics === 'function' && state.problemTagsGeoJson && geojson) {
        state.problemAnalytics = createSPTProblemAnalytics({
          tagGeojson: state.problemTagsGeoJson,
          tnkePolygons: geojson,
          problemMaster: state.problemMaster || window.TNKE_SPT_PROBLEM_MASTER_16,
          actionPlanMockup: state.actionPlanMockup || window.TNKE_ACTION_PLAN_MOCKUP
        });
      }
      populateProblemCategoryDropdowns();

      // Bind layer toggle checkbox
      var chkTags = document.getElementById('chkToggleProblemTags');"""

if target_load in code:
    code = code.replace(target_load, repl_load, 1)
    print("Step 1 (loadGeoJsonData) replaced successfully!")
else:
    print("Step 1 target not found!")

# 2. Update populateProblemCategoryDropdowns to fallback to window.TNKE_SPT_PROBLEM_MASTER_16
target_pop = """  function populateProblemCategoryDropdowns() {
    var categories = (state.problemMaster && state.problemMaster.categories) || [];"""

repl_pop = """  function populateProblemCategoryDropdowns() {
    var categories = (state.problemMaster && state.problemMaster.categories) ||
                     (window.TNKE_SPT_PROBLEM_MASTER_16 && window.TNKE_SPT_PROBLEM_MASTER_16.categories) ||
                     [];"""

if target_pop in code:
    code = code.replace(target_pop, repl_pop, 1)
    print("Step 2 (populateProblemCategoryDropdowns) replaced successfully!")
else:
    print("Step 2 target not found!")

# 3. Add event listeners in bindFilters
target_bind = """    var periodSelect = document.getElementById('periodFilter');
    if (divSelect) {"""

repl_bind = """    var periodSelect = document.getElementById('periodFilter');
    var btnMapCov = document.getElementById('btnMapModeCoverage');
    if (btnMapCov) {
      btnMapCov.addEventListener('click', function () { switchMapMode('coverage'); });
    }
    var btnMapPrb = document.getElementById('btnMapModeProblem');
    if (btnMapPrb) {
      btnMapPrb.addEventListener('click', function () { switchMapMode('problem'); });
    }
    var selMapCat = document.getElementById('selProblemCategoryMap');
    if (selMapCat) {
      selMapCat.addEventListener('change', function () { changeProblemCategory(selMapCat.value); });
    }
    if (divSelect) {"""

if target_bind in code:
    code = code.replace(target_bind, repl_bind, 1)
    print("Step 3 (bindFilters event listeners) replaced successfully!")
else:
    print("Step 3 target not found!")

# 4. Ensure switchMapMode initializes problemAnalytics defensively if null
target_switch = """  function switchMapMode(mode) {
    state.mapMode = mode === 'problem' ? 'problem' : 'coverage';"""

repl_switch = """  function switchMapMode(mode) {
    state.mapMode = mode === 'problem' ? 'problem' : 'coverage';
    if (!state.problemAnalytics && typeof createSPTProblemAnalytics === 'function' && state.problemTagsGeoJson && state.geoJsonData) {
      state.problemAnalytics = createSPTProblemAnalytics({
        tagGeojson: state.problemTagsGeoJson,
        tnkePolygons: state.geoJsonData,
        problemMaster: state.problemMaster || window.TNKE_SPT_PROBLEM_MASTER_16,
        actionPlanMockup: state.actionPlanMockup || window.TNKE_ACTION_PLAN_MOCKUP
      });
    }"""

if target_switch in code:
    code = code.replace(target_switch, repl_switch, 1)
    print("Step 4 (switchMapMode defensive analytics) replaced successfully!")
else:
    print("Step 4 target not found!")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)

res = subprocess.run(['node', '-c', 'app.js'], capture_output=True, text=True)
if res.returncode == 0:
    print("app.js syntax check passed 100%!")
else:
    print("Syntax error in app.js:", res.stderr)
