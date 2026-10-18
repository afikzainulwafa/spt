import re

def update_app_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        code = f.read()

    # 1. Categories definition with 16 canonical categories
    canonical_16_categories = """  // Centralized 16 Canonical Problem Categories Mapping (Master tnke_spt_problem_master_16.json)
  window.SPT_PROBLEM_CATEGORIES = {
    'pasar pikul semak': { id: 'SPT-01', code: 'pasar_pikul_semak', name: 'Pasar Pikul Semak', unit: 'm', icon: '🌿', color: '#2563EB', bgColor: '#DBEAFE', borderColor: '#93C5FD' },
    'underpruning': { id: 'SPT-02', code: 'underpruning', name: 'Underpruning', unit: 'pokok', icon: '🪓', color: '#EA580C', bgColor: '#FFEDD5', borderColor: '#FDBA74' },
    'areal banjir / tergenang': { id: 'SPT-03', code: 'areal_banjir_tergenang', name: 'Areal Banjir / Tergenang', unit: 'ha', icon: '💧', color: '#0284C7', bgColor: '#E0F2FE', borderColor: '#7DD3FC' },
    'areal banjir': { id: 'SPT-03', code: 'areal_banjir_tergenang', name: 'Areal Banjir / Tergenang', unit: 'ha', icon: '💧', color: '#0284C7', bgColor: '#E0F2FE', borderColor: '#7DD3FC' },
    'titi panen kurang / rusak': { id: 'SPT-04', code: 'titi_panen_kurang_rusak', name: 'Titi Panen Kurang / Rusak', unit: 'unit', icon: '🪵', color: '#7C3AED', bgColor: '#F3E8FF', borderColor: '#D8B4FE' },
    'piringan semak': { id: 'SPT-05', code: 'piringan_semak', name: 'Piringan Semak', unit: 'pokok', icon: '⭕', color: '#059669', bgColor: '#D1FAE5', borderColor: '#6EE7B7' },
    'tph bermasalah': { id: 'SPT-06', code: 'tph_bermasalah', name: 'TPH Bermasalah', unit: 'titik', icon: '🧺', color: '#0891B2', bgColor: '#CFFAFE', borderColor: '#67E8F9' },
    'gawangan semak': { id: 'SPT-07', code: 'gawangan_semak', name: 'Gawangan Semak', unit: 'ha', icon: '🌾', color: '#D97706', bgColor: '#FEF3C7', borderColor: '#FCD34D' },
    'defisiensi hara': { id: 'SPT-08', code: 'defisiensi_hara', name: 'Defisiensi Hara', unit: 'pokok', icon: '🍃', color: '#CA8A04', bgColor: '#FEF9C3', borderColor: '#FDE047' },
    'titik kosong': { id: 'SPT-09', code: 'titik_kosong', name: 'Titik Kosong', unit: 'titik', icon: '⚪', color: '#64748B', bgColor: '#F1F5F9', borderColor: '#CBD5E1' },
    'hpt': { id: 'SPT-10', code: 'hpt', name: 'HPT', unit: 'pokok', icon: '🐛', color: '#E11D48', bgColor: '#FFE4E6', borderColor: '#FDA4AF' },
    'konektiviti teras / pasar pikul': { id: 'SPT-11', code: 'konektiviti_teras_pasar_pikul', name: 'Konektiviti Teras / Pasar Pikul', unit: 'm', icon: '🛤️', color: '#4F46E5', bgColor: '#EEF2FF', borderColor: '#C7D2FE' },
    'pokok abnormal': { id: 'SPT-12', code: 'pokok_abnormal', name: 'Pokok Abnormal', unit: 'pokok', icon: '🌴', color: '#9333EA', bgColor: '#FAF5FF', borderColor: '#E9D5FF' },
    'semak di gawangan (bambu)': { id: 'SPT-13', code: 'semak_di_gawangan_bambu', name: 'Semak di Gawangan (Bambu)', unit: 'ha', icon: '🎋', color: '#475569', bgColor: '#F8FAFC', borderColor: '#E2E8F0' },
    'semak di gawangan (pisang)': { id: 'SPT-14', code: 'semak_di_gawangan_pisang', name: 'Semak di Gawangan (Pisang)', unit: 'ha', icon: '🍌', color: '#D946EF', bgColor: '#FDF4FF', borderColor: '#F5D0FE' },
    'gorong-gorong': { id: 'SPT-15', code: 'gorong_gorong', name: 'Gorong-gorong', unit: 'unit', icon: '🕳️', color: '#F97316', bgColor: '#FFF7ED', borderColor: '#FED7AA' },
    'jembatan / box culvert': { id: 'SPT-16', code: 'jembatan_box_culvert', name: 'Jembatan / Box culvert', unit: 'unit', icon: '🌉', color: '#DB2777', bgColor: '#FDF2F8', borderColor: '#FBCFE8' }
  };
  window.getProblemCategoryConfig = function(problemNormalized) {
    var raw = String(problemNormalized || '').toLowerCase().trim().replace(/\\s+/g, ' ');
    if (raw === 'uderpruning') raw = 'underpruning';
    if (raw === 'areal banjir') raw = 'areal banjir / tergenang';
    if (window.SPT_PROBLEM_CATEGORIES[raw]) {
      return window.SPT_PROBLEM_CATEGORIES[raw];
    }
    for (var k in window.SPT_PROBLEM_CATEGORIES) {
      var item = window.SPT_PROBLEM_CATEGORIES[k];
      if (item.id && item.id.toLowerCase() === raw) return item;
      if (item.name && item.name.toLowerCase() === raw) return item;
    }
    return {
      id: raw.replace(/\\s+/g, '_'),
      name: problemNormalized || 'Problem',
      unit: 'titik',
      icon: '⚠️',
      color: '#64748B',
      bgColor: '#F1F5F9',
      borderColor: '#E2E8F0'
    };
  };"""

    # Replace window.SPT_PROBLEM_CATEGORIES definition blocks
    cat_pattern = r'window\.SPT_PROBLEM_CATEGORIES\s*=\s*\{[\s\S]*?\};\s*window\.getProblemCategoryConfig\s*=\s*function\(problemNormalized\)\s*\{[\s\S]*?\};'
    code = re.sub(cat_pattern, lambda m: canonical_16_categories, code)

    # 2. Add mapMode & problemCategory to state
    if 'mapMode:' not in code:
        code = code.replace(
            "estate: 'TNKE',",
            "mapMode: 'coverage',\n    problemCategory: 'all',\n    problemMaster: null,\n    actionPlanMockup: null,\n    problemAnalytics: null,\n    estate: 'TNKE',"
        )

    # 3. Analytics helper and switchMapMode methods
    analytics_logic = """
  // =========================================================================
  // SMART PROBLEM TAGGING - 16-CATEGORY ANALYTICS & DUAL-MODE ENGINE
  // =========================================================================
  var PROBLEM_WORKFLOW_COLORS = {
    no_tagging: '#A3A3A3',
    belum_ada_action_plan: '#EF4444',
    on_progress: '#F2C94C',
    closed: '#39A66B'
  };

  function createSPTProblemAnalytics(opts) {
    var tagGeojson = opts.tagGeojson;
    var tnkePolygons = opts.tnkePolygons;
    var problemMaster = opts.problemMaster;
    var actionPlanMockup = opts.actionPlanMockup;

    var categories = (problemMaster && problemMaster.categories) ? problemMaster.categories : [];
    var ALL_VALUES = { '': true, 'all': true, 'semua': true, 'semua blok': true, 'semua divisi': true, 'semua permasalahan': true, '*': true };
    function isAll(val) {
      if (val == null) return true;
      var s = String(val).trim().toLowerCase();
      return !!ALL_VALUES[s];
    }
    function normStr(v) {
      return String(v == null ? '' : v).trim().toLowerCase().replace(/\\s+/g, ' ');
    }
    function normProb(v) {
      var n = normStr(v);
      if (n === 'uderpruning') return 'underpruning';
      if (n === 'areal banjir') return 'areal banjir / tergenang';
      return n;
    }
    function safeNum(v) {
      var n = Number(v);
      return Number.isFinite(n) ? n : 0;
    }
    function volumeOf(p) {
      return safeNum(p.ringan) + safeNum(p.sedang) + safeNum(p.berat);
    }

    var byCanonicalName = {};
    var byCategoryId = {};
    categories.forEach(function (c) {
      byCanonicalName[normStr(c.name)] = c;
      byCategoryId[c.id.toLowerCase()] = c;
    });

    var allPolygons = (tnkePolygons && tnkePolygons.data && tnkePolygons.data.features) || (tnkePolygons && tnkePolygons.features) || [];
    var areaByBlock = {};
    allPolygons.forEach(function (feature) {
      var p = feature.properties || {};
      if (!p.blok || p.blok === '-') return;
      areaByBlock[p.blok] = { estate: p.estate || 'TNKE', divisi: p.divisi || 'DIVISI 1', blok: p.blok };
    });

    var statuses = (actionPlanMockup && actionPlanMockup.statuses) ? actionPlanMockup.statuses : [];
    var byStatusId = {};
    statuses.forEach(function (s) {
      byStatusId[s.tag_id] = s;
    });

    var allowedStatuses = { 'belum_ada_action_plan': true, 'on_progress': true, 'closed': true };
    var ptFeatures = (tagGeojson && tagGeojson.features) ? tagGeojson.features : [];
    var data = [];

    ptFeatures.forEach(function (feature) {
      var p = feature.properties || {};
      var tagId = p.tag_id || feature.id;
      var rawP = p.problem_normalized || p.problem;
      var cat = byCanonicalName[normProb(rawP)] || byCategoryId[normStr(rawP)];
      if (!cat) return;
      var area = areaByBlock[p.blok];
      if (!area) return;
      var actionPlan = byStatusId[tagId];
      var status = (actionPlan && allowedStatuses[actionPlan.action_plan_status]) ? actionPlan.action_plan_status : 'belum_ada_action_plan';
      data.push({
        tagId: tagId,
        source: feature,
        estate: area.estate,
        divisi: area.divisi,
        blok: area.blok,
        categoryId: cat.id,
        categoryName: cat.name,
        unit: cat.unit,
        quantity: volumeOf(p),
        ringan: safeNum(p.ringan),
        sedang: safeNum(p.sedang),
        berat: safeNum(p.berat),
        status: status,
        actionPlan: actionPlan,
        date: String(p.date || '')
      });
    });

    function filterRecords(filters) {
      filters = filters || {};
      var est = filters.estate || 'TNKE';
      var div = filters.divisi || 'All';
      var blk = filters.blok || 'All';
      var catId = filters.categoryId || 'All';
      var yr = filters.year != null ? Number(filters.year) : null;
      var mo = filters.month != null ? Number(filters.month) : null;
      var catObj = null;
      if (!isAll(catId)) {
        catObj = byCategoryId[normStr(catId)] || byCanonicalName[normProb(catId)];
      }

      return data.filter(function (t) {
        if (!isAll(est) && t.estate !== est) return false;
        if (!isAll(div) && t.divisi !== div) return false;
        if (!isAll(blk) && t.blok !== blk) return false;
        if (catObj && t.categoryId !== catObj.id) return false;
        if (yr != null || mo != null) {
          var parts = /^(\\d{4})-(\\d{2})-(\\d{2})$/.exec(t.date);
          if (!parts) return false;
          if (yr != null && Number(parts[1]) !== yr) return false;
          if (mo != null && Number(parts[2]) !== mo) return false;
        }
        return true;
      });
    }

    function getMapMetrics(filters) {
      filters = filters || {};
      var selected = filterRecords(filters);
      var catObj = null;
      if (!isAll(filters.categoryId)) {
        catObj = byCategoryId[normStr(filters.categoryId)] || byCanonicalName[normProb(filters.categoryId)];
      }
      var denominator = catObj ? selected.reduce(function (n, t) { return n + t.quantity; }, 0) : null;
      var byBlock = {};
      selected.forEach(function (item) {
        var k = item.estate + '|' + item.divisi + '|' + item.blok;
        if (!byBlock[k]) byBlock[k] = [];
        byBlock[k].push(item);
      });

      var metrics = {};
      allPolygons.forEach(function (polygon) {
        var p = polygon.properties || {};
        if (!p.blok || p.blok === '-') return;
        if (!isAll(filters.estate) && p.estate !== filters.estate) return;
        if (!isAll(filters.divisi) && p.divisi !== filters.divisi) return;
        if (!isAll(filters.blok) && p.blok !== filters.blok) return;
        var k = (p.estate || 'TNKE') + '|' + (p.divisi || 'DIVISI 1') + '|' + p.blok;
        var tags = byBlock[k] || [];
        var status = 'no_tagging';
        if (tags.length > 0) {
          if (tags.some(function (t) { return t.status === 'belum_ada_action_plan'; })) {
            status = 'belum_ada_action_plan';
          } else if (tags.some(function (t) { return t.status === 'on_progress'; })) {
            status = 'on_progress';
          } else {
            status = 'closed';
          }
        }
        var quantity = catObj ? tags.reduce(function (n, t) { return n + t.quantity; }, 0) : null;
        var contributionPct = (catObj && denominator > 0) ? (quantity / denominator * 100) : null;
        var label = '';
        if (catObj) {
          var pctStr = (contributionPct == null) ? '—' : (contributionPct.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%');
          label = p.blok + '\\n' + pctStr;
        } else {
          label = p.blok + '\\n' + tags.length + ' tagging';
        }
        metrics[k] = {
          blok: p.blok,
          estate: p.estate,
          divisi: p.divisi,
          status: status,
          color: PROBLEM_WORKFLOW_COLORS[status],
          tagCount: tags.length,
          quantity: quantity,
          unit: catObj ? catObj.unit : null,
          contributionPct: contributionPct,
          denominator: denominator,
          label: label,
          tags: tags
        };
      });

      return {
        visibleTagging: selected,
        metrics: {
          get: function (k) { return metrics[k]; },
          all: metrics
        },
        category: catObj,
        denominator: denominator
      };
    }

    return {
      categories: categories,
      taggingRecords: data,
      filterRecords: filterRecords,
      getMapMetrics: getMapMetrics
    };
  }

  function switchMapMode(mode) {
    state.mapMode = mode === 'problem' ? 'problem' : 'coverage';
    var btnCov = document.getElementById('btnMapModeCoverage');
    var btnPrb = document.getElementById('btnMapModeProblem');
    var catWrap = document.getElementById('problemCategoryMapWrap');
    var titleEl = document.getElementById('mapTitleText');
    var subEl = document.getElementById('mapSubtitleText');
    var covTabs = document.getElementById('legendTabsWrap');
    var prbHeader = document.getElementById('problemLegendHeaderTitle');
    var covLegend = document.getElementById('legendContentBody');
    var prbLegend = document.getElementById('problemLegendBody');

    if (state.mapMode === 'problem') {
      if (btnCov) { btnCov.classList.remove('active'); btnCov.setAttribute('aria-selected', 'false'); }
      if (btnPrb) { btnPrb.classList.add('active'); btnPrb.setAttribute('aria-selected', 'true'); }
      if (catWrap) catWrap.style.display = 'inline-flex';
      if (titleEl) titleEl.textContent = 'Peta Status Permasalahan & Action Plan';
      if (subEl) subEl.textContent = 'Status alur kerja action plan · Prioritas: Belum ada > On Progress > Closed';
      if (covTabs) covTabs.style.display = 'none';
      if (prbHeader) prbHeader.style.display = 'flex';
      if (covLegend) covLegend.style.display = 'none';
      if (prbLegend) prbLegend.style.display = 'flex';
    } else {
      if (btnCov) { btnCov.classList.add('active'); btnCov.setAttribute('aria-selected', 'true'); }
      if (btnPrb) { btnPrb.classList.remove('active'); btnPrb.setAttribute('aria-selected', 'false'); }
      if (catWrap) catWrap.style.display = 'none';
      if (titleEl) titleEl.textContent = 'Peta Coverage Observasi Blok';
      if (subEl) subEl.textContent = 'Choropleth polygon TNKE aktual · Nama & % coverage dalam polygon';
      if (covTabs) covTabs.style.display = 'flex';
      if (prbHeader) prbHeader.style.display = 'none';
      if (covLegend) covLegend.style.display = 'flex';
      if (prbLegend) prbLegend.style.display = 'none';
    }

    if (state.geoJsonData) {
      renderGeoJsonLayers(state.geoJsonData);
    }
    renderProblemTagMarkers();
  }

  function changeProblemCategory(catId) {
    state.problemCategory = catId || 'all';
    var selMap = document.getElementById('selProblemCategoryMap');
    if (selMap && selMap.value !== state.problemCategory) {
      selMap.value = state.problemCategory;
    }
    if (state.geoJsonData) {
      renderGeoJsonLayers(state.geoJsonData);
    }
    renderProblemTagMarkers();
    if (state.isDrawerOpen && state.selectedBlockKey) {
      var parts = state.selectedBlockKey.split('|');
      var bData = window.tnkeStore ? window.tnkeStore.getBlockData(parts[0], parts[1], parts[2], state.activeActivityFilter) : null;
      if (bData) populateDrawer(bData);
    }
  }

  function populateProblemCategoryDropdowns() {
    var categories = (state.problemMaster && state.problemMaster.categories) || [];
    var selMap = document.getElementById('selProblemCategoryMap');
    if (selMap) {
      selMap.innerHTML = '<option value="all">Semua Permasalahan</option>';
      categories.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.name + ' (' + c.unit + ')';
        selMap.appendChild(opt);
      });
      selMap.value = state.problemCategory || 'all';
    }

    var selProb = document.getElementById('filterProblem');
    if (selProb) {
      var currentProbVal = selProb.value;
      selProb.innerHTML = '<option value="all">Semua Problem (16)</option>';
      categories.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = c.name + ' (' + c.unit + ')';
        selProb.appendChild(opt);
      });
      if (currentProbVal && currentProbVal !== 'all') selProb.value = currentProbVal;
    }

    var selAct = document.getElementById('filterProblemAction');
    if (selAct) {
      var currentActVal = selAct.value;
      selAct.innerHTML = '<option value="all">Semua Problem (16)</option>';
      categories.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = c.name + ' (' + c.unit + ')';
        selAct.appendChild(opt);
      });
      if (currentActVal && currentActVal !== 'all') selAct.value = currentActVal;
    }
  }
"""

    if 'function createSPTProblemAnalytics(' not in code:
        code = code.replace("async function initMaps() {", analytics_logic + "\n  async function initMaps() {")

    # 4. In loadGeoJsonData: load master and action plan sidecar
    load_replacement = """      // Load problem tags GeoJSON (fetch ./tnke_problem_tags.geojson or ./tracking/tnke_problem_tags.geojson)
      try {
        var tagsResp = await fetch('./tnke_problem_tags.geojson');
        if (!tagsResp.ok) tagsResp = await fetch('./tracking/tnke_problem_tags.geojson');
        if (tagsResp.ok) {
          state.problemTagsGeoJson = await tagsResp.json();
          window.TNKE_PROBLEM_TAGS_GEOJSON = state.problemTagsGeoJson;
        } else if (window.TNKE_PROBLEM_TAGS_GEOJSON && window.TNKE_PROBLEM_TAGS_GEOJSON.features) {
          state.problemTagsGeoJson = window.TNKE_PROBLEM_TAGS_GEOJSON;
        }
      } catch (ptErr) {
        if (window.TNKE_PROBLEM_TAGS_GEOJSON && window.TNKE_PROBLEM_TAGS_GEOJSON.features) {
          state.problemTagsGeoJson = window.TNKE_PROBLEM_TAGS_GEOJSON;
        } else {
          console.warn('Could not load problem tags geojson:', ptErr);
        }
      }

      // Load 16 canonical problem categories master
      try {
        var masterResp = await fetch('./tnke_spt_problem_master_16.json');
        if (masterResp.ok) {
          state.problemMaster = await masterResp.json();
        } else if (window.TNKE_SPT_PROBLEM_MASTER_16) {
          state.problemMaster = window.TNKE_SPT_PROBLEM_MASTER_16;
        }
      } catch (mErr) {
        if (window.TNKE_SPT_PROBLEM_MASTER_16) state.problemMaster = window.TNKE_SPT_PROBLEM_MASTER_16;
      }

      // Load action plan workflow sidecar
      try {
        var actionResp = await fetch('./tnke_action_plan_mockup.json');
        if (actionResp.ok) {
          state.actionPlanMockup = await actionResp.json();
        } else if (window.TNKE_ACTION_PLAN_MOCKUP) {
          state.actionPlanMockup = window.TNKE_ACTION_PLAN_MOCKUP;
        }
      } catch (aErr) {
        if (window.TNKE_ACTION_PLAN_MOCKUP) state.actionPlanMockup = window.TNKE_ACTION_PLAN_MOCKUP;
      }

      // Initialize SPT Problem Analytics Engine
      if (state.problemTagsGeoJson && state.problemMaster && state.actionPlanMockup) {
        state.problemAnalytics = createSPTProblemAnalytics({
          tagGeojson: state.problemTagsGeoJson,
          tnkePolygons: geojson,
          problemMaster: state.problemMaster,
          actionPlanMockup: state.actionPlanMockup
        });
        populateProblemCategoryDropdowns();
      }"""

    code = re.sub(
        r'// Load problem tags GeoJSON[\s\S]*?renderProblemTagMarkers\(\);\s*\}\s*\}',
        lambda m: load_replacement + """
      // Bind layer toggle checkbox
      var chkTags = document.getElementById('chkToggleProblemTags');
      if (chkTags) {
        chkTags.onchange = function () {
          state.showProblemTags = chkTags.checked;
          renderProblemTagMarkers();
        };
      }""",
        code
    )

    # 5. Update renderGeoJsonLayers
    new_render_geojson = """  function renderGeoJsonLayers(geojson) {
    if (!state.mapsInitialized || !geojson) return;
    var mapEl = state.mapAssessment || state.mapBccr || state.mapProblem;
    if (!mapEl) return;
    if (state.assessmentGeoJsonLayer) {
      mapEl.removeLayer(state.assessmentGeoJsonLayer);
    }
    if (state.polygonLabelsLayerGroup) {
      mapEl.removeLayer(state.polygonLabelsLayerGroup);
    }
    state.featureLayersByKey = {};
    state.polygonLabelsLayerGroup = L.layerGroup().addTo(mapEl);

    var metricsRes = null;
    if (state.mapMode === 'problem' && state.problemAnalytics) {
      metricsRes = state.problemAnalytics.getMapMetrics({
        estate: state.estate,
        divisi: state.division,
        blok: state.block,
        categoryId: state.problemCategory || 'all',
        month: 9,
        year: 2026
      });
    }

    state.assessmentGeoJsonLayer = L.geoJSON(geojson, {
      style: function (feature) {
        var p = feature.properties || {};
        var est = p.estate || 'TNKE';
        var div = p.divisi || 'DIVISI 1';
        var blk = p.blok || 'ALL';
        if (blk === '-') {
          return {
            fillColor: '#808080',
            weight: 1.0,
            opacity: 0.4,
            color: '#666666',
            fillOpacity: 0.15,
            interactive: false
          };
        }
        var compositeKey = est + '|' + div + '|' + blk;
        var matchDiv = state.division === 'all' || div === state.division;
        var matchBlk = state.block === 'all' || blk === state.block;
        var isSelected = state.selectedBlockKey === compositeKey || (state.block !== 'all' && blk === state.block);

        if (state.mapMode === 'problem') {
          var pMetric = metricsRes ? metricsRes.metrics.get(compositeKey) : null;
          var pColor = pMetric ? pMetric.color : '#A3A3A3';
          var isVisible = matchDiv && matchBlk;
          var fillOpacity = isVisible ? (isSelected ? 0.85 : 0.65) : 0.08;
          var opacity = isVisible ? (isSelected ? 1.0 : 0.85) : 0.15;
          var weight = isSelected ? 3.5 : 1.2;
          var strokeColor = isSelected ? '#1D4ED8' : '#1E293B';
          return {
            fillColor: pColor,
            weight: weight,
            opacity: opacity,
            color: strokeColor,
            fillOpacity: fillOpacity
          };
        }

        // Coverage mode (default)
        var bData = window.tnkeStore ? window.tnkeStore.getBlockData(est, div, blk, state.activeActivityFilter) : { coveragePct: 0 };
        var pct = bData.coveragePct;
        var color = getAssessmentColor(pct);
        var matchLegend = matchesLegendFilter(pct, state.activeLegendFilter);
        var isVisible = matchDiv && matchBlk && matchLegend;
        var fillOpacity = isVisible ? (isSelected ? 0.85 : 0.55) : 0.08;
        var opacity = isVisible ? (isSelected ? 1.0 : 0.85) : 0.15;
        var weight = isSelected ? 3.5 : 1.2;
        var strokeColor = isSelected ? '#1D4ED8' : '#1E293B';
        return {
          fillColor: color,
          weight: weight,
          opacity: opacity,
          color: strokeColor,
          fillOpacity: fillOpacity
        };
      },
      onEachFeature: function (feature, layer) {
        var p = feature.properties || {};
        var est = p.estate || 'TNKE';
        var div = p.divisi || 'DIVISI 1';
        var blk = p.blok || 'ALL';
        if (blk === '-') return;
        var compositeKey = est + '|' + div + '|' + blk;
        state.featureLayersByKey[compositeKey] = layer;
        var bData = window.tnkeStore ? window.tnkeStore.getBlockData(est, div, blk, state.activeActivityFilter) : { totalArea: 0, assessedHa: 0, coveragePct: 0, statusText: 'Belum Diobservasi', tagCount: 0 };

        if (state.mapMode === 'problem') {
          var pMetric = metricsRes ? metricsRes.metrics.get(compositeKey) : null;
          var statusLabels = {
            'no_tagging': 'Tidak Ada Temuan',
            'belum_ada_action_plan': 'Belum Ada Action Plan',
            'on_progress': 'Action Plan On Progress',
            'closed': 'Action Plan Closed'
          };
          var statusText = pMetric ? (statusLabels[pMetric.status] || pMetric.status) : 'Tidak Ada Temuan';
          var statusColor = pMetric ? pMetric.color : '#A3A3A3';
          var tagCount = pMetric ? pMetric.tagCount : 0;
          var volText = (pMetric && pMetric.quantity != null) ? (pMetric.quantity + ' ' + pMetric.unit) : '-';
          var contText = (pMetric && pMetric.contributionPct != null) ? (pMetric.contributionPct.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%') : '-';
          var denomText = (pMetric && pMetric.denominator != null) ? (' (dari total ' + pMetric.denominator + ' ' + pMetric.unit + ')') : '';

          var tooltipHtml = '<div style="font-family:sans-serif;font-size:11.5px;line-height:1.4;">' +
            '<strong style="font-size:12.5px;color:#0F172A;">Blok ' + blk + ' · ' + div + '</strong><br/>' +
            '<span>Status Alur Kerja: <strong style="color:' + statusColor + ';">' + statusText + '</strong></span><br/>' +
            '<span>Total Temuan: <strong>' + tagCount + ' titik tagging</strong></span><br/>';
          if (pMetric && pMetric.quantity != null) {
            tooltipHtml += '<span>Volume Masalah: <strong>' + volText + '</strong></span><br/>' +
              '<span>Kontribusi Wilayah: <strong>' + contText + '</strong>' + denomText + '</span>';
          }
          tooltipHtml += '</div>';
          layer.bindTooltip(tooltipHtml, { sticky: true, direction: 'auto' });
        } else {
          var geojsonTags = state.problemTagsGeoJson || window.TNKE_PROBLEM_TAGS_GEOJSON;
          var tagCountDisplay = bData.tagCount || 0;
          if (geojsonTags && geojsonTags.features) {
            var matchedGeoTags = geojsonTags.features.filter(function (f) {
              return f.properties && f.properties.blok === blk;
            });
            if (matchedGeoTags.length > 0) {
              tagCountDisplay = matchedGeoTags.length;
            }
          }
          var tooltipHtml = '<div style="font-family:sans-serif;font-size:11.5px;line-height:1.4;">' +
            '<strong style="font-size:12.5px;color:#0F172A;">Blok ' + blk + ' · ' + div + '</strong><br/>' +
            '<span>Luas Operasional: <strong>' + formatNum(bData.totalArea, 1) + ' ha</strong></span><br/>' +
            '<span>Sudah Diobservasi: <strong>' + formatNum(bData.assessedHa, 1) + ' dari ' + formatNum(bData.totalArea, 1) + ' ha</strong></span><br/>' +
            '<span>Coverage Observasi: <strong style="color:' + getAssessmentColor(bData.coveragePct) + ';">' + formatNum(bData.coveragePct, 1) + '%</strong> (' + bData.statusText + ')</span><br/>' +
            '<span>Temuan: <strong>' + (tagCountDisplay > 0 ? tagCountDisplay + ' temuan' : 'Belum ada temuan') + '</strong></span>' +
            '</div>';
          layer.bindTooltip(tooltipHtml, { sticky: true, direction: 'auto' });
        }

        layer.on('click', function () {
          selectBlock(est, div, blk, layer);
        });
        layer.on('mouseover', function () {
          if (state.selectedBlockKey !== compositeKey) {
            layer.setStyle({ weight: 2.5, fillOpacity: 0.8 });
          }
        });
        layer.on('mouseout', function () {
          if (state.assessmentGeoJsonLayer) {
            state.assessmentGeoJsonLayer.resetStyle(layer);
          }
        });

        // Direct 2-Line Polygon Label
        try {
          var interiorPt = getFeatureInteriorPoint(feature);
          var subLineText = '';
          if (state.mapMode === 'problem') {
            var pMetric = metricsRes ? metricsRes.metrics.get(compositeKey) : null;
            if (pMetric) {
              if (metricsRes.category) {
                subLineText = pMetric.contributionPct != null
                  ? (pMetric.contributionPct.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%')
                  : '—';
              } else {
                subLineText = pMetric.tagCount + ' tagging';
              }
            } else {
              subLineText = '—';
            }
          } else {
            subLineText = formatNum(bData.coveragePct, 1) + '%';
          }
          var labelHtml = '<div class="polygon-block-label">' +
            '<div class="pbl-name">' + blk + '</div>' +
            '<div class="pbl-pct">' + subLineText + '</div>' +
            '</div>';
          var labelIcon = L.divIcon({
            className: 'polygon-block-label-icon',
            html: labelHtml,
            iconSize: null
          });
          var labelMarker = L.marker(interiorPt, { icon: labelIcon, interactive: false });
          state.polygonLabelsLayerGroup.addLayer(labelMarker);
        } catch (lErr) {
          console.warn('Label placement error for block ' + blk + ':', lErr);
        }
      }
    }).addTo(mapEl);
    updateMapZoomClasses();
    try {
      fitMapToScope(mapEl);
    } catch (e) {}
    renderTrackingLayers();
    updateAssessmentSummaryCards();
  }"""

    code = re.sub(
        r'function renderGeoJsonLayers\(geojson\)\s*\{[\s\S]*?renderTrackingLayers\(\);\s*updateAssessmentSummaryCards\(\);\s*\}',
        lambda m: new_render_geojson,
        code
    )

    # 6. Update renderProblemTagMarkers
    new_render_markers = """  function renderProblemTagMarkers() {
    var mapEl = state.mapAssessment || state.mapBccr || state.mapProblem;
    if (!mapEl) return;
    if (!state.problemTagsLayerGroup) {
      state.problemTagsLayerGroup = L.layerGroup().addTo(mapEl);
    } else {
      state.problemTagsLayerGroup.clearLayers();
    }
    if (state.showProblemTags === false) return;

    var geojson = state.problemTagsGeoJson || window.TNKE_PROBLEM_TAGS_GEOJSON;
    if (!geojson || !geojson.features) return;

    var targetBlokCode = null;
    if (state.selectedBlockKey) {
      var parts = state.selectedBlockKey.split('|');
      targetBlokCode = parts[2];
    } else if (state.block && state.block !== 'all') {
      targetBlokCode = state.block;
    }

    // In Coverage mode, pins only show when a specific block is selected
    if (state.mapMode !== 'problem' && (!targetBlokCode || targetBlokCode === 'all')) {
      return;
    }

    var activeCatFilter = state.problemCategory || 'all';
    var activeFilterDate = state.selectedHistoryDate || (state.selectedTrackingKey ? state.selectedTrackingKey.split('|')[0] : null);

    geojson.features.forEach(function (feat) {
      var props = feat.properties || {};
      var coords = feat.geometry ? feat.geometry.coordinates : null;
      if (!coords || coords.length < 2) return;
      var tagBlok = props.blok;

      // Filter by block if selected
      if (targetBlokCode && targetBlokCode !== 'all' && tagBlok !== targetBlokCode) {
        return;
      }

      // Filter by division in Problem mode when all blocks are viewed
      if (state.mapMode === 'problem' && (!targetBlokCode || targetBlokCode === 'all')) {
        if (state.division && state.division !== 'all') {
          var div = getBlockDivisi ? getBlockDivisi(tagBlok) : null;
          if (div && div !== state.division) return;
        }
      }

      var tagDate = props.date || '2026-09-07';
      var normProb = props.problem_normalized || props.problem;
      var catConfig = window.getProblemCategoryConfig(normProb);

      // Filter by category in Problem mode
      if (state.mapMode === 'problem' && activeCatFilter !== 'all') {
        var matchCat = (catConfig.id && catConfig.id.toLowerCase() === activeCatFilter.toLowerCase()) ||
                       (catConfig.name && catConfig.name.toLowerCase() === activeCatFilter.toLowerCase());
        if (!matchCat) return;
      }

      var isSelected = state.selectedTagId === props.tag_id;
      var isDateMatch = !activeFilterDate || tagDate === activeFilterDate;
      var opacityStyle = isDateMatch ? '1.0' : '0.4';
      var markerClass = 'spt-problem-tag-pin' + (isSelected ? ' selected' : '');
      var iconHtml = '<div class="' + markerClass + '" style="background:' + catConfig.color + '; opacity:' + opacityStyle + ';" data-tag-id="' + props.tag_id + '">' +
        '<span class="pin-icon">' + catConfig.icon + '</span>' +
        '</div>';
      var customIcon = L.divIcon({
        className: 'spt-problem-tag-wrapper',
        html: iconHtml,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
      var marker = L.marker([coords[1], coords[0]], {
        icon: customIcon,
        zIndexOffset: isSelected ? 3000 : (isDateMatch ? 2000 : 1000)
      });
      var dateFormatted = formatDateText(tagDate);
      var tooltipContent = '<div class="spt-tag-tooltip">' +
        '<div class="tag-title" style="color:' + catConfig.color + ';">' + catConfig.icon + ' ' + catConfig.name + '</div>' +
        '<div class="tag-meta">' + tagBlok + ' · ' + dateFormatted + '</div>' +
        '<div class="tag-quantities">Ringan: <strong>' + (props.ringan || 0) + '</strong> | Sedang: <strong>' + (props.sedang || 0) + '</strong> | Berat: <strong>' + (props.berat || 0) + '</strong> (' + catConfig.unit + ')</div>' +
        '</div>';
      marker.bindTooltip(tooltipContent, {
        sticky: true,
        direction: 'top',
        className: 'spt-problem-tooltip-wrap'
      });
      marker.on('click', function (e) {
        if (e && e.originalEvent) e.originalEvent.stopPropagation();
        selectProblemTagMarker(props.tag_id, feat);
      });
      state.problemTagsLayerGroup.addLayer(marker);
    });

    try {
      if (state.problemTagsLayerGroup && state.problemTagsLayerGroup.eachLayer) {
        state.problemTagsLayerGroup.eachLayer(function (l) {
          if (l.bringToFront) l.bringToFront();
        });
      }
    } catch (zErr) {}
  }"""

    code = re.sub(
        r'function renderProblemTagMarkers\(\)\s*\{[\s\S]*?if \(l\.bringToFront\) l\.bringToFront\(\);\s*\}\);\s*\}\s*\}\s*catch \(zErr\) \{\}\s*\}',
        lambda m: new_render_markers,
        code
    )

    # 7. Update populateBlockFilter default option to 'All'
    code = code.replace(
        "blkSelect.innerHTML = '<option value=\"all\">Semua Blok</option>';",
        "blkSelect.innerHTML = '<option value=\"all\">All</option>';"
    )

    # 8. Update bindFilters for estate change
    old_bind_est = "var divSelect = document.getElementById('divisionFilter');"
    new_bind_est = """var estSelect = document.getElementById('estateFilter');
    if (estSelect) {
      estSelect.addEventListener('change', function () {
        state.estate = estSelect.value;
        state.division = 'all';
        state.block = 'all';
        var dSel = document.getElementById('divisionFilter');
        if (dSel) dSel.value = 'all';
        populateBlockFilter();
        onFilterChanged();
      });
    }
    var divSelect = document.getElementById('divisionFilter');"""
    if 'var estSelect = document.getElementById' not in code:
        code = code.replace(old_bind_est, new_bind_est, 1)

    # 9. Update drawer tagging section with category contribution metrics
    drawer_tag_pattern = r'// Tagging Summary & List[\s\S]*?tagWrap\.innerHTML = tHtml;\s*\}\s*\}'
    new_drawer_tag = """// Tagging Summary & List
    var tagWrap = document.getElementById('drawerTaggingWrap');
    if (tagWrap) {
      var geojson = state.problemTagsGeoJson || window.TNKE_PROBLEM_TAGS_GEOJSON;
      var blockTags = [];
      if (geojson && geojson.features) {
        blockTags = geojson.features.filter(function (f) {
          return f.properties && f.properties.blok === d.blok;
        });
      }
      if (blockTags.length === 0 && (!d.tagItems || d.tagItems.length === 0)) {
        tagWrap.innerHTML = '<p class="empty-state-text">Belum ada masalah yang di-tag pada blok ini.</p>';
      } else {
        var categoryCounts = {};
        var categorySeverity = {};
        blockTags.forEach(function (f) {
          var props = f.properties;
          var catConfig = window.getProblemCategoryConfig ? window.getProblemCategoryConfig(props.problem_normalized) : { name: props.problem_normalized, color: '#3b82f6', icon: '📍' };
          var catName = catConfig.name;
          categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
          if (!categorySeverity[catName]) {
            categorySeverity[catName] = { ringan: 0, sedang: 0, berat: 0, color: catConfig.color, icon: catConfig.icon, unit: catConfig.unit || 'titik', id: catConfig.id };
          }
          categorySeverity[catName].ringan += (props.ringan || 0);
          categorySeverity[catName].sedang += (props.sedang || 0);
          categorySeverity[catName].berat += (props.berat || 0);
        });
        var numCategories = Object.keys(categoryCounts).length;
        var tHtml = '';

        // Highlight Scope & Contribution Metrics if in Problem mode with active category
        if (state.mapMode === 'problem' && state.problemAnalytics && state.problemCategory !== 'all') {
          var pMetrics = state.problemAnalytics.getMapMetrics({
            estate: state.estate,
            divisi: state.division,
            blok: state.block,
            categoryId: state.problemCategory,
            month: 9,
            year: 2026
          });
          var bMetric = pMetrics.metrics.get((d.estate || state.estate) + '|' + (d.divisi || state.division) + '|' + d.blok);
          if (bMetric && pMetrics.category) {
            var catName = pMetrics.category.name;
            var cColor = bMetric.color || '#EF4444';
            var contStr = bMetric.contributionPct != null ? (bMetric.contributionPct.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%') : '—';
            var volStr = bMetric.quantity != null ? (bMetric.quantity + ' ' + bMetric.unit) : '0';
            var denomStr = bMetric.denominator != null ? (bMetric.denominator + ' ' + bMetric.unit) : '-';
            var statusMap = {
              'belum_ada_action_plan': 'Belum Ada Action Plan (Prioritas)',
              'on_progress': 'Action Plan On Progress',
              'closed': 'Action Plan Closed',
              'no_tagging': 'Tidak Ada Temuan'
            };
            var statText = statusMap[bMetric.status] || bMetric.status;

            tHtml += '<div class="drawer-problem-scope-card" style="background:#FFF5F5;border:1px solid #FED7D7;border-left:4px solid ' + cColor + ';border-radius:6px;padding:8px 10px;margin-bottom:10px;">' +
              '<div style="font-weight:700;font-size:12px;color:#9B1C1C;display:flex;justify-content:space-between;align-items:center;">' +
                '<span>' + (window.getProblemCategoryConfig(catName).icon || '⚠️') + ' ' + catName + ' (Kategori Terpilih)</span>' +
                '<span style="font-size:10.5px;background:' + cColor + ';color:#fff;padding:1px 6px;border-radius:4px;">' + statText + '</span>' +
              '</div>' +
              '<div style="display:flex;justify-content:space-between;margin-top:5px;font-size:11.5px;color:#1E293B;">' +
                '<span>Volume Blok: <strong>' + volStr + '</strong></span>' +
                '<span>Kontribusi Scope: <strong style="color:' + cColor + ';font-size:13px;">' + contStr + '</strong></span>' +
              '</div>' +
              '<div style="font-size:10px;color:#64748B;margin-top:3px;">' +
                'Denominator: ' + volStr + ' dari total ' + denomStr + ' terinventarisasi di ' + (state.division !== 'all' ? state.division : state.estate) + ' (' + (state.period || 'September 2026') + ')' +
              '</div>' +
            '</div>';
          }
        }

        tHtml += '<div style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-weight:600;font-size:12px;color:#1e293b;">Total Temuan: <strong>' + blockTags.length + ' titik tagging</strong> (' + numCategories + ' kategori)</span>' +
          '</div>';
        tHtml += '<div class="tag-category-summary" style="margin-bottom:12px;display:grid;grid-template-columns:repeat(auto-fill, minmax(130px, 1fr));gap:6px;">';
        Object.keys(categoryCounts).forEach(function (cat) {
          var sev = categorySeverity[cat];
          var totalVol = sev.ringan + sev.sedang + sev.berat;
          tHtml += '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid ' + sev.color + ';border-radius:6px;padding:6px 8px;font-size:11px;">' +
            '<div style="font-weight:600;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="' + cat + '">' + sev.icon + ' ' + cat + '</div>' +
            '<div style="font-size:12px;font-weight:700;color:' + sev.color + ';margin-top:2px;">' + categoryCounts[cat] + ' titik (' + totalVol + ' ' + sev.unit + ')</div>' +
            '<div style="color:#64748b;font-size:10px;margin-top:1px;">R: ' + sev.ringan + ' | S: ' + sev.sedang + ' | B: ' + sev.berat + '</div>' +
            '</div>';
        });
        tHtml += '</div>';
        tHtml += '<div class="tag-item-list" style="max-height:280px;overflow-y:auto;padding-right:2px;">';
        blockTags.forEach(function (f) {
          var props = f.properties;
          var catConfig = window.getProblemCategoryConfig ? window.getProblemCategoryConfig(props.problem_normalized) : { name: props.problem_normalized, color: '#3b82f6', icon: '📍' };
          var isSelected = state.selectedTagId === props.tag_id;
          var dateTxt = props.tanggal + ' ' + (props.bulan || 'September') + ' 2026';
          var cardStyle = isSelected ? 'border:2px solid #2563eb;background:#eff6ff;' : 'border:1px solid #e2e8f0;background:#ffffff;';
          var apStatus = 'belum_ada_action_plan';
          if (state.actionPlanMockup && state.actionPlanMockup.statuses) {
            var st = state.actionPlanMockup.statuses.find(function(s){ return s.tag_id === props.tag_id; });
            if (st) apStatus = st.action_plan_status;
          }
          var apBadge = apStatus === 'closed' ? '<span style=\"background:#39A66B;color:#fff;padding:1px 5px;border-radius:3px;font-size:9.5px;font-weight:700;\">Closed</span>' :
                       (apStatus === 'on_progress' ? '<span style=\"background:#F2C94C;color:#000;padding:1px 5px;border-radius:3px;font-size:9.5px;font-weight:700;\">On Progress</span>' :
                       '<span style=\"background:#EF4444;color:#fff;padding:1px 5px;border-radius:3px;font-size:9.5px;font-weight:700;\">Belum Ada AP</span>');

          tHtml += '<div class="tag-item-card ' + (isSelected ? 'selected-tag-card' : '') + '" data-tag-id="' + props.tag_id + '" style="' + cardStyle + 'border-radius:6px;padding:8px;margin-bottom:6px;cursor:pointer;transition:all 0.15s ease;" onclick="window.SPT_APP.selectProblemTagMarker(\'' + props.tag_id + '\')">' +
            '<div class="tag-item-header" style="display:flex;justify-content:space-between;align-items:center;">' +
              '<span class="tag-item-id" style="font-weight:700;font-size:11px;color:#2563eb;">' + props.tag_id + '</span>' +
              '<div style="display:flex;align-items:center;gap:4px;">' + apBadge + '<span style="font-size:11px;color:#64748b;font-weight:500;">📅 ' + dateTxt + '</span></div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:6px;margin-top:4px;">' +
              '<span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:' + catConfig.color + ';color:#fff;font-size:11px;">' + catConfig.icon + '</span>' +
              '<span style="font-weight:600;font-size:12px;color:#0f172a;">' + catConfig.name + '</span>' +
            '</div>' +
            '<div style="font-size:11px;color:#64748b;margin-top:4px;display:flex;justify-content:space-between;align-items:center;">' +
              '<span>Sumber: <em>' + (props.problem || catConfig.name) + '</em></span>' +
              '<span style="font-weight:600;color:#334155;">Ringan: ' + (props.ringan || 0) + ' | Sedang: ' + (props.sedang || 0) + ' | Berat: ' + (props.berat || 0) + ' (' + catConfig.unit + ')</span>' +
            '</div>' +
            '</div>';
        });
        tHtml += '</div>';
        tagWrap.innerHTML = tHtml;
      }
    }"""
    code = re.sub(drawer_tag_pattern, lambda m: new_drawer_tag, code)

    # 10. Expose switchMapMode & changeProblemCategory on window.SPT_APP
    old_app_export = "renderProblemDashboardDetail: renderProblemDashboardDetail,"
    new_app_export = """renderProblemDashboardDetail: renderProblemDashboardDetail,
    switchMapMode: switchMapMode,
    changeProblemCategory: changeProblemCategory,
    createSPTProblemAnalytics: createSPTProblemAnalytics,
    populateProblemCategoryDropdowns: populateProblemCategoryDropdowns,"""
    if 'switchMapMode: switchMapMode' not in code:
        code = code.replace(old_app_export, new_app_export, 1)

    with open('app.js', 'w', encoding='utf-8') as f:
        f.write(code)

    print('Successfully updated app.js with SPT incremental improvements.')

if __name__ == '__main__':
    update_app_js()
