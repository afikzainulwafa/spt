/**
 * SMART PROBLEM TAGGING - Core Application Controller
 * PT SMART Tbk / Corporate Sinarmas-inspired Agronomy Operations Mockup
 */
(function () {
  'use strict';
  try {
    window.__APP_JS_LOADED__ = true;
  // Configuration Constants
  var CONFIG = {
    BLOCK_ZOOM_THRESHOLD: 15, // Zoom >= 15 & Fullscreen shows micro placemarks
    LABEL_ZOOM_THRESHOLD: 14  // Zoom >= 14 shows block name labels
  };
  // Centralized Problem Categories Mapping (Normalized)
    // Centralized 16 Canonical Problem Categories Mapping (Master tnke_spt_problem_master_16.json)
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
    var raw = String(problemNormalized || '').toLowerCase().trim().replace(/\s+/g, ' ');
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
      id: raw.replace(/\s+/g, '_'),
      name: problemNormalized || 'Problem',
      unit: 'titik',
      icon: '⚠️',
      color: '#64748B',
      bgColor: '#F1F5F9',
      borderColor: '#E2E8F0'
    };
  };
  // Global State
  var state = {
    mapMode: 'coverage',
    problemCategory: 'all',
    problemMaster: null,
    actionPlanMockup: null,
    problemAnalytics: null,
    estate: 'TNKE',
    division: 'DIVISI 2',
    block: 'all',
    period: 'September 2026',
    activeLegendFilter: null,
    selectedBlockKey: null,
    isDrawerOpen: false,
    currentView: 'dashboard',
    trendMode: 'monthly',
    trendMetric: 'moving',
    currentDocIndex: 0,
    geoJsonData: null,
    indexedGeoData: null,
    allFindings: [],
    mapsInitialized: false,
    mapAssessment: null,
    mapBccr: null,
    mapProblem: null,
    assessmentGeoJsonLayer: null,
    assessmentLabelsLayer: null,
    featureLayersByKey: {},
    bccrGeoJsonLayer: null,
    problemGeoJsonLayer: null,
    bccrLabelsLayer: null,
    problemLabelsLayer: null,
    mapProblemSummaryLayer: null,
    problemMicroMarkersLayer: null,
    problemTagsLayerGroup: null,
    problemTagsGeoJson: null,
    showProblemTags: true,
    selectedTagId: null,
    selectedHistoryDate: null,
    problemFilterDivision: 'all',
    problemFilterCategory: 'all',
    problemFilterSensitivity: 'all',
    problemFilterStatus: 'all',
    problemFilterTimeframe: 'all',
    problemFilterBlock: 'all',
    bccrFilterRange: 'all',
    focusedBlock: null,
    isFullscreenBccr: false,
    isFullscreenProblem: false,
    addFindingMode: false,
    pendingFinding: null,
    asesmenFilterDivision: 'all',
    asesmenFilterStatus: 'all',
    asesmenFilterVerif: 'all',
    polygonLabelsLayerGroup: null,
    activeActivityFilter: 'all',
    trackingGeoJson: null,
    trackingBufferLayerGroup: null,
    trackingLineLayerGroup: null,
    selectedTrackingKey: null,
    cachedTrackingBuffers: {}
  };
  // =========================================================================
  // UTILITY HELPERS
  // =========================================================================
  function showToast(message, duration) {
    var container = document.getElementById('toastContainer');
    if (!container) return;
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<span>ℹ️</span><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 200);
    }, duration || 2600);
  }
  function formatNum(val, decimals) {
    if (val === null || val === undefined || isNaN(val)) return '-';
    return Number(val).toLocaleString('id-ID', {
      minimumFractionDigits: decimals !== undefined ? decimals : 2,
      maximumFractionDigits: decimals !== undefined ? decimals : 2
    });
  }
  // =========================================================================
  // INITIALIZATION & ROUTING
  // =========================================================================
  // =========================================================================
  // PROGRESS ASSESSMENT BLOK HELPERS & DATA CONTROLLER
  // =========================================================================
  function getAssessmentColor(pct) {
    if (pct <= 0) return '#9E9E9E';  // 0%: Abu-abu (Belum di-assess)
    if (pct <= 25) return '#EF5350'; // >0-25%: Merah lembut
    if (pct <= 50) return '#FFA726'; // >25-50%: Oranye
    if (pct <= 75) return '#FFEE58'; // >50-75%: Kuning
    if (pct < 100) return '#9CCC65'; // >75-<100%: Hijau muda
    return '#2E7D32';                // 100%: Hijau tua (Lengkap)
  }
  function matchesLegendFilter(pct, filterRange) {
    if (!filterRange || filterRange === 'all') return true;
    if (filterRange === '0') return pct === 0;
    if (filterRange === '>0-25') return pct > 0 && pct <= 25;
    if (filterRange === '>25-50') return pct > 25 && pct <= 50;
    if (filterRange === '>50-75') return pct > 50 && pct <= 75;
    if (filterRange === '>75-<100') return pct > 75 && pct < 100;
    if (filterRange === '100') return pct === 100;
    return true;
  }
  function pointInPolygon(point, vs) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
  function getFeatureCentroid(feature) {
    var coords = [];
    if (!feature || !feature.geometry) return [0, 0];
    if (feature.geometry.type === 'Polygon') {
      coords = feature.geometry.coordinates[0];
    } else if (feature.geometry.type === 'MultiPolygon') {
      var maxLen = 0, maxIdx = 0;
      feature.geometry.coordinates.forEach(function(poly, idx) {
        if (poly[0] && poly[0].length > maxLen) {
          maxLen = poly[0].length;
          maxIdx = idx;
        }
      });
      coords = feature.geometry.coordinates[maxIdx] ? feature.geometry.coordinates[maxIdx][0] : [];
    }
    if (!coords || coords.length === 0) return [0, 0];
    var sumLng = 0, sumLat = 0;
    for (var i = 0; i < coords.length; i++) {
      sumLng += coords[i][0];
      sumLat += coords[i][1];
    }
    return [sumLat / coords.length, sumLng / coords.length];
  }
  function getFeatureInteriorPoint(feature) {
    var center = getFeatureCentroid(feature);
    var centerPt = [center[1], center[0]]; // [lng, lat]
    var outerRing = [];
    if (!feature || !feature.geometry) return [center[0], center[1]];
    if (feature.geometry.type === 'Polygon') {
      outerRing = feature.geometry.coordinates[0];
    } else if (feature.geometry.type === 'MultiPolygon') {
      var maxLen = 0, maxIdx = 0;
      feature.geometry.coordinates.forEach(function(poly, idx) {
        if (poly[0] && poly[0].length > maxLen) {
          maxLen = poly[0].length;
          maxIdx = idx;
        }
      });
      outerRing = feature.geometry.coordinates[maxIdx] ? feature.geometry.coordinates[maxIdx][0] : [];
    }
    if (outerRing && outerRing.length > 0 && pointInPolygon(centerPt, outerRing)) {
      return [center[0], center[1]]; // [lat, lng]
    }
    if (outerRing && outerRing.length > 0) {
      var minX = outerRing[0][0], maxX = outerRing[0][0];
      var minY = outerRing[0][1], maxY = outerRing[0][1];
      for (var i = 1; i < outerRing.length; i++) {
        if (outerRing[i][0] < minX) minX = outerRing[i][0];
        if (outerRing[i][0] > maxX) maxX = outerRing[i][0];
        if (outerRing[i][1] < minY) minY = outerRing[i][1];
        if (outerRing[i][1] > maxY) maxY = outerRing[i][1];
      }
      var testY = (minY + maxY) / 2;
      var stepX = (maxX - minX) / 20;
      for (var x = minX + stepX; x < maxX; x += stepX) {
        if (pointInPolygon([x, testY], outerRing)) {
          return [testY, x]; // [lat, lng]
        }
      }
    }
    return [center[0], center[1]];
  }
  function updateAssessmentSummaryCards() {
    if (!window.tnkeStore) return;
    var summary = window.tnkeStore.getAggregatedObservation(state.estate, state.division, state.activeActivityFilter);
    if (!summary) return;
    var cardTotalVal = document.getElementById('cardTotalLuasValue');
    var cardTotalSub = document.getElementById('cardTotalLuasSubtext');
    var cardSudahVal = document.getElementById('cardSudahAssessValue');
    var cardSudahSub = document.getElementById('cardSudahAssessSubtext');
    var cardCompleteVal = document.getElementById('cardCompleteValue');
    var cardCompleteSub = document.getElementById('cardCompleteSubtext');
    var cardTemuanVal = document.getElementById('cardTemuanValue');
    var cardTemuanSub = document.getElementById('cardTemuanSubtext');
    if (cardTotalVal) cardTotalVal.textContent = formatNum(summary.totalLuasBlokHa, 1);
    if (cardTotalSub) cardTotalSub.textContent = summary.totalBlokCount + ' blok dalam scope';
    if (cardSudahVal) cardSudahVal.textContent = formatNum(summary.totalUniqueDiassessHa, 1);
    if (cardSudahSub) cardSudahSub.textContent = formatNum(summary.totalCoveragePct, 1) + '% dari total luas';
    if (cardCompleteVal) cardCompleteVal.textContent = summary.assessmentLengkapBlokCount;
    if (cardCompleteSub) cardCompleteSub.textContent = 'dari ' + summary.totalBlokCount + ' blok dalam filter';
    if (cardTemuanVal) cardTemuanVal.textContent = summary.totalKunjunganCount;
    if (cardTemuanSub) cardTemuanSub.textContent = 'Catatan Sesi Kunjungan Lapangan';
  }
  function renderProductionTrendLineChart(mode) {
    state.prodChartMode = mode || state.prodChartMode || 'yield';
    var btnYield = document.getElementById('btnToggleYield');
    var btnBccr = document.getElementById('btnToggleBccr');
    if (btnYield && btnBccr) {
      if (state.prodChartMode === 'yield') {
        btnYield.classList.add('active');
        btnBccr.classList.remove('active');
      } else {
        btnBccr.classList.add('active');
        btnYield.classList.remove('active');
      }
    }
    var wrapper = document.getElementById('prodChartWrapper');
    var svgEl = document.getElementById('prodLineChartSvg');
    if (!wrapper && !svgEl) return;
    var estate = state.estate || 'TNKE';
    var division = state.division || 'all';
    var periodStr = state.period || 'September 2026';
    var captionEl = document.getElementById('chartMovingCaption');
    if (captionEl) {
      var unitTxt = state.prodChartMode === 'yield' ? 'Yield Moving (ton/ha)' : 'Rasio BCCR (%)';
      captionEl.textContent = 'Metrik: ' + unitTxt + ' · Moving 12 Bulan · Cut-off: ' + periodStr;
    }
    var parts = periodStr.split(' ');
    var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    var cutoffMonthIdx = 8;
    var cutoffYear = 2026;
    if (parts.length >= 2) {
      var idx = monthNames.findIndex(function (m) { return m.toLowerCase() === parts[0].toLowerCase(); });
      if (idx !== -1) cutoffMonthIdx = idx;
      var y = parseInt(parts[1], 10);
      if (!isNaN(y)) cutoffYear = y;
    }
    var points = [];
    var startMonth = cutoffMonthIdx - 11;
    var startYear = cutoffYear;
    if (startMonth < 0) {
      startMonth += 12;
      startYear -= 1;
    }
    for (var i = 0; i < 24; i++) {
      var curM = (startMonth + i) % 12;
      var curY = startYear + Math.floor((startMonth + i) / 12);
      var labelShort = shortMonths[curM] + ' ' + (curY % 100);
      var labelFull = monthNames[curM] + ' ' + curY;
      var isCutoff = (i === 11);
      var isProjection = (i > 11);
      points.push({
        idx: i,
        month: curM,
        year: curY,
        labelShort: labelShort,
        labelFull: labelFull,
        isCutoff: isCutoff,
        isProjection: isProjection
      });
    }
    var divScale = (division === 'all') ? 1.0 : (division === 'DIVISI 1' ? 0.98 : division === 'DIVISI 2' ? 1.02 : 0.96);
    var minY, maxY, unit;
    var actualData = [];
    var potensiData = [];
    var projectionData = [];
    if (state.prodChartMode === 'yield') {
      minY = 15.0;
      maxY = 28.0;
      unit = ' ton/ha';
      var baseActual = [18.2, 18.5, 18.9, 19.3, 19.1, 19.8, 20.2, 20.6, 21.0, 21.5, 21.9, 22.4];
      var basePotensi = [25.5, 25.5, 25.6, 25.6, 25.7, 25.7, 25.8, 25.8, 26.0, 26.0, 26.1, 26.1, 26.2, 26.2, 26.3, 26.3, 26.4, 26.4, 26.5, 26.5, 26.5, 26.5, 26.5, 26.5];
      var baseProj = [22.4, 22.7, 23.0, 23.3, 23.6, 23.8, 24.1, 24.3, 24.5, 24.7, 24.8, 24.9, 25.0];
      actualData = baseActual.map(function (v) { return +(v * divScale).toFixed(1); });
      potensiData = basePotensi.map(function (v) { return +(v * divScale).toFixed(1); });
      projectionData = baseProj.map(function (v) { return +(v * divScale).toFixed(1); });
    } else {
      minY = 70.0;
      maxY = 100.0;
      unit = '%';
      var baseActual = [81.2, 82.0, 82.8, 83.5, 84.0, 84.8, 85.5, 86.2, 87.0, 87.6, 88.1, 88.5];
      var basePotensi = [95.0, 95.0, 95.2, 95.2, 95.5, 95.5, 95.5, 95.8, 95.8, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 96.0];
      var baseProj = [88.5, 89.1, 89.6, 90.2, 90.8, 91.3, 91.8, 92.2, 92.6, 92.9, 93.1, 93.3, 93.5];
      actualData = baseActual.map(function (v) { return +(v * Math.min(1.02, divScale)).toFixed(1); });
      potensiData = basePotensi;
      projectionData = baseProj.map(function (v) { return +(v * Math.min(1.02, divScale)).toFixed(1); });
    }
    var width = 940, height = 310;
    var padL = 50, padR = 25, padT = 35, padB = 50;
    var plotW = width - padL - padR;
    var plotH = height - padT - padB;
    function getX(i) {
      return padL + (i / 23) * plotW;
    }
    function getY(v) {
      var norm = (v - minY) / (maxY - minY);
      return padT + plotH - Math.max(0, Math.min(1, norm)) * plotH;
    }
    var svgHtml = '';
    // Shaded area for projection after cut-off
    var xCutoff = getX(11);
    var xEnd = getX(23);
    svgHtml += '<rect x="' + xCutoff + '" y="' + padT + '" width="' + (xEnd - xCutoff) + '" height="' + plotH + '" fill="rgba(249, 115, 22, 0.05)" rx="4"/>';
    // Gridlines & Y-Axis Labels
    var steps = 4;
    for (var k = 0; k <= steps; k++) {
      var valTick = minY + (k / steps) * (maxY - minY);
      var yPos = getY(valTick);
      svgHtml += '<line x1="' + padL + '" y1="' + yPos + '" x2="' + (width - padR) + '" y2="' + yPos + '" stroke="#F1F5F9" stroke-width="1"/>';
      svgHtml += '<text x="' + (padL - 8) + '" y="' + (yPos + 3) + '" text-anchor="end" fill="#94A3B8" font-size="10" font-weight="600">' + valTick.toFixed(1) + (unit === '%' ? '%' : '') + '</text>';
    }
    // Cut-off Vertical Line
    svgHtml += '<line x1="' + xCutoff + '" y1="' + padT + '" x2="' + xCutoff + '" y2="' + (padT + plotH) + '" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4,4"/>';
    var cutoffLabel = 'Cut-off: ' + points[11].labelShort;
    svgHtml += '<g transform="translate(' + xCutoff + ', ' + (padT - 12) + ')">';
    svgHtml += '<rect x="-45" y="-10" width="90" height="18" rx="4" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1"/>';
    svgHtml += '<text x="0" y="2" text-anchor="middle" fill="#475569" font-size="10" font-weight="700">' + cutoffLabel + '</text>';
    svgHtml += '</g>';
    // X-Axis Labels
    for (var i = 0; i < 24; i++) {
      var pt = points[i];
      var xp = getX(i);
      var yp = padT + plotH + 18;
      var fillClr = pt.isCutoff ? '#0F172A' : (pt.isProjection ? '#EA580C' : '#64748B');
      var fontWeight = pt.isCutoff ? '800' : '600';
      svgHtml += '<text x="' + xp + '" y="' + yp + '" text-anchor="middle" fill="' + fillClr + '" font-size="9.5" font-weight="' + fontWeight + '">' + pt.labelShort + '</text>';
    }
    // Potensi Line (Solid Grey)
    var potPath = '';
    for (var i = 0; i < 24; i++) {
      var xp = getX(i);
      var yp = getY(potensiData[i]);
      potPath += (i === 0 ? 'M' : 'L') + xp + ',' + yp + ' ';
    }
    svgHtml += '<path d="' + potPath + '" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>';
    for (var i = 0; i < 24; i++) {
      var xp = getX(i);
      var yp = getY(potensiData[i]);
      svgHtml += '<circle cx="' + xp + '" cy="' + yp + '" r="2.5" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5"/>';
    }
    // Aktual Line (Solid Red)
    var actPath = '';
    for (var i = 0; i <= 11; i++) {
      var xp = getX(i);
      var yp = getY(actualData[i]);
      actPath += (i === 0 ? 'M' : 'L') + xp + ',' + yp + ' ';
    }
    svgHtml += '<path d="' + actPath + '" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round"/>';
    for (var i = 0; i <= 11; i++) {
      var xp = getX(i);
      var yp = getY(actualData[i]);
      svgHtml += '<circle cx="' + xp + '" cy="' + yp + '" r="3.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.5"/>';
    }
    // Proyeksi Skenario Line (Dashed Orange)
    var projPath = '';
    for (var i = 11; i < 24; i++) {
      var projIdx = i - 11;
      var xp = getX(i);
      var yp = getY(projectionData[projIdx]);
      projPath += (i === 11 ? 'M' : 'L') + xp + ',' + yp + ' ';
    }
    svgHtml += '<path d="' + projPath + '" fill="none" stroke="#EA580C" stroke-width="2.5" stroke-dasharray="6,4" stroke-linecap="round"/>';
    for (var i = 11; i < 24; i++) {
      var projIdx = i - 11;
      var xp = getX(i);
      var yp = getY(projectionData[projIdx]);
      svgHtml += '<circle cx="' + xp + '" cy="' + yp + '" r="3.5" fill="#EA580C" stroke="#FFFFFF" stroke-width="1.5"/>';
    }
    // Hover Indicator
    svgHtml += '<line id="hoverGuideLine" x1="0" y1="' + padT + '" x2="0" y2="' + (padT + plotH) + '" stroke="#475569" stroke-width="1" stroke-dasharray="2,2" style="display:none;"/>';
    svgEl.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    var wrapper = document.getElementById('prodChartWrapper');
    if (wrapper) {
      wrapper.innerHTML = '<svg id="prodLineChartSvg" viewBox="0 0 540 210" class="prod-line-svg" preserveAspectRatio="none">' + svgHtml + '</svg>' +
        '<div class="prod-chart-tooltip" id="prodChartTooltip" style="display:none;"></div>';
    } else if (svgEl) {
      svgEl.innerHTML = svgHtml;
    }
    // Tooltip hover interactions
    var tooltipEl = document.getElementById('prodChartTooltip');
    var wrapperEl = document.getElementById('prodChartWrapper');
    if (wrapperEl && tooltipEl) {
      wrapperEl.onmousemove = function (e) {
        var rect = wrapperEl.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var relX = (mouseX / rect.width) * width;
        var closestIdx = 0;
        var minDist = 999999;
        for (var i = 0; i < 24; i++) {
          var dist = Math.abs(getX(i) - relX);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = i;
          }
        }
        var pt = points[closestIdx];
        var pX = getX(closestIdx);
        var guideLine = document.getElementById('hoverGuideLine');
        if (guideLine) {
          guideLine.setAttribute('x1', pX);
          guideLine.setAttribute('x2', pX);
          guideLine.style.display = 'block';
        }
        var valTxt = '';
        var valClr = '#DC2626';
        var tagStatus = pt.isCutoff ? ' (Cut-off)' : (pt.isProjection ? ' (Proyeksi)' : ' (Historis)');
        if (closestIdx <= 11) {
          valTxt = actualData[closestIdx] + unit;
          valClr = '#DC2626';
        } else {
          valTxt = projectionData[closestIdx - 11] + unit;
          valClr = '#EA580C';
        }
        var potTxt = potensiData[closestIdx] + unit;
        tooltipEl.style.display = 'block';
        tooltipEl.style.left = (pX / width * 100) + '%';
        tooltipEl.style.top = Math.max(10, (getY(closestIdx <= 11 ? actualData[closestIdx] : projectionData[closestIdx - 11]) / height * 100) - 5) + '%';
        tooltipEl.innerHTML =
          '<div style="font-weight:700;margin-bottom:3px;color:#F8FAFC;">' + pt.labelFull + tagStatus + '</div>' +
          '<div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">' +
            '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + valClr + ';"></span>' +
            '<span>' + (closestIdx <= 11 ? 'Aktual' : 'Proyeksi Skenario') + ': <strong>' + valTxt + '</strong></span>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:6px;">' +
            '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#94A3B8;"></span>' +
            '<span>Potensi: <strong>' + potTxt + '</strong></span>' +
          '</div>';
      };
      wrapperEl.onmouseleave = function () {
        var guideLine = document.getElementById('hoverGuideLine');
        if (guideLine) guideLine.style.display = 'none';
        if (tooltipEl) tooltipEl.style.display = 'none';
      };
    }
  }
    // =========================================================================
  // OBSERVASI ENHANCEMENTS: SIKLUS, 4 KPIS, 4 TABS, DONUT & DIVISION COMP
  // =========================================================================
  state.selectedDonutActivity = 'all';
  state.divTableUnit = 'pct';
  state.activeObsTab = 'kegiatanDivisi';

  function switchObsTab(tabId) {
    if (tabId === 'petaCakupan') {
      switchView('mapCoverage', true);
      return;
    }
    state.activeObsTab = tabId;
    var tabs = ['kegiatanDivisi', 'targetRealisasi', 'aktivitasHarian'];
    var tabMap = {
      kegiatanDivisi: { btn: 'tabBtnKegiatanDivisi', panel: 'obsTabKegiatanDivisi' },
      targetRealisasi: { btn: 'tabBtnTargetRealisasi', panel: 'obsTabTargetRealisasi' },
      aktivitasHarian: { btn: 'tabBtnAktivitasHarian', panel: 'obsTabAktivitasHarian' }
    };

    tabs.forEach(function (t) {
      var info = tabMap[t];
      var btn = document.getElementById(info.btn);
      var panel = document.getElementById(info.panel);
      if (btn) {
        if (t === tabId) btn.classList.add('active');
        else btn.classList.remove('active');
      }
      if (panel) {
        panel.style.display = (t === tabId) ? 'block' : 'none';
        if (t === tabId) panel.classList.add('active');
        else panel.classList.remove('active');
      }
    });

    if (tabId === 'aktivitasHarian') {
      renderDailyActivityView();
    }
  }

  function renderSummaryDashboardCards() {
    var cycle = window.tnkeStore ? window.tnkeStore.getObservasiCycleData() : null;
    if (!cycle) return;

    // CARD 1: OBSERVASI (ACTIVE CARD)
    var elObsPct = document.getElementById('kpiObsPct');
    if (elObsPct) elObsPct.textContent = formatNum(cycle.actualPct, 1) + '%';

    var elObsFraction = document.getElementById('kpiObsFraction');
    if (elObsFraction) {
      elObsFraction.textContent = formatNum(cycle.combinedUniqueCoverageHa, 1) + ' / ' + formatNum(cycle.totalLuasEstateHa, 1) + ' ha';
    }

    var elObsProgressFill = document.getElementById('kpiObsProgressFill');
    if (elObsProgressFill) {
      elObsProgressFill.style.width = cycle.actualPct.toFixed(1) + '%';
    }

    var elObsStatusText = document.getElementById('kpiObsStatusText');
    if (elObsStatusText) {
      var diffHa = Math.abs(cycle.gapHa);
      elObsStatusText.textContent = (cycle.gapHa < 0 ? 'Tertinggal ' : 'Surplus ') + formatNum(diffHa, 1) + ' ha';
    }

    // CARD 2: PROBLEM
    var elProbCount = document.getElementById('kpiProbCount');
    if (elProbCount) elProbCount.textContent = '7';
    var elProbSubtext = document.getElementById('kpiProbSubtext');
    if (elProbSubtext) elProbSubtext.textContent = '2 belum ada action plan · 11 total temuan';

    // CARD 3: ACTION PLAN
    var elActPct = document.getElementById('kpiActPct');
    if (elActPct) elActPct.textContent = '44,4%';
    var elActLabel = document.getElementById('kpiActLabel');
    if (elActLabel) elActLabel.textContent = '4 dari 9 selesai';
    var elActOverdueCount = document.getElementById('kpiActOverdueCount');
    if (elActOverdueCount) elActOverdueCount.textContent = '1';

    // CARD 4: PRODUKSI
    var elProdBccr = document.getElementById('kpiProdBccr');
    if (elProdBccr) elProdBccr.textContent = '85,0%';
    var elProdSubtext = document.getElementById('kpiProdSubtext');
    if (elProdSubtext) elProdSubtext.textContent = 'Proyeksi 95,0% · Potensi 100%';

    // RENDER TAB 1: DONUT & DIVISION COMPARISON
    renderActivityDonut();
    renderDivisionComparisonTable();
  }

  function renderActivityDonut() {
    var svg = document.getElementById('activityDonutSvg');
    var legendTbody = document.getElementById('donutLegendTableBody');
    if (!svg || !window.tnkeStore) return;

    var cycle = window.tnkeStore.getObservasiCycleData();
    var acts = cycle.activityCoverage || [];
    var totalHa = cycle.totalActivityCoverageHa || 2738.0;

    // Center metrics
    var elCenterHa = document.getElementById('donutCenterHa');
    if (elCenterHa) elCenterHa.textContent = formatNum(totalHa, 1) + ' ha';
    var elCenterLbl = document.getElementById('donutCenterLbl');
    if (elCenterLbl) elCenterLbl.textContent = 'Total cakupan kegiatan';

    // Build SVG Arcs for 160x160 viewBox (Compact 145-155px)
    var cx = 80;
    var cy = 80;
    var R = 70;
    var r = 44;
    var rMid = 57;
    var curAngle = -Math.PI / 2; // Start at 12 o'clock

    var svgHtml = '';
    acts.forEach(function (act) {
      var pct = act.sharePct / 100.0;
      var angle = pct * 2 * Math.PI;
      var startA = curAngle;
      var endA = curAngle + angle;
      curAngle = endA;

      var x1 = cx + R * Math.cos(startA);
      var y1 = cy + R * Math.sin(startA);
      var x2 = cx + R * Math.cos(endA);
      var y2 = cy + R * Math.sin(endA);

      var x3 = cx + r * Math.cos(endA);
      var y3 = cy + r * Math.sin(endA);
      var x4 = cx + r * Math.cos(startA);
      var y4 = cy + r * Math.sin(startA);

      var largeArc = angle > Math.PI ? 1 : 0;
      var d = 'M ' + x1.toFixed(2) + ' ' + y1.toFixed(2) +
        ' A ' + R + ' ' + R + ' 0 ' + largeArc + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2) +
        ' L ' + x3.toFixed(2) + ' ' + y3.toFixed(2) +
        ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 0 ' + x4.toFixed(2) + ' ' + y4.toFixed(2) + ' Z';

      var midA = startA + angle / 2;
      var tx = cx + rMid * Math.cos(midA);
      var ty = cy + rMid * Math.sin(midA) + 3;

      var isSelected = (state.selectedDonutActivity === act.id);
      var isAnySelected = (state.selectedDonutActivity !== 'all');
      var opacity = (!isAnySelected || isSelected) ? '1' : '0.35';
      var stroke = isSelected ? '#FFFFFF' : 'none';
      var strokeWidth = isSelected ? '2' : '1';

      svgHtml += '<g class="donut-slice-group" data-activity="' + act.id + '" style="cursor:pointer;"' +
        ' onmouseover="window.SPT_APP.showDonutTooltip(event, \'' + act.id + '\')"' +
        ' onmousemove="window.SPT_APP.moveDonutTooltip(event)"' +
        ' onmouseout="window.SPT_APP.hideDonutTooltip()"' +
        ' onclick="window.SPT_APP.selectDonutActivity(\'' + act.id + '\')">' +
        '<path d="' + d + '" fill="' + act.color + '" opacity="' + opacity + '" stroke="' + stroke + '" stroke-width="' + strokeWidth + '" class="donut-slice ' + (isSelected ? 'active-slice' : '') + '"/>' +
        '<text x="' + tx.toFixed(2) + '" y="' + ty.toFixed(2) + '" fill="#FFFFFF" font-size="9" font-weight="700" text-anchor="middle" pointer-events="none" opacity="' + opacity + '">' + formatNum(act.sharePct, 1) + '%</text>' +
        '</g>';
    });

    svg.innerHTML = svgHtml;

    // Build Legend Table
    if (legendTbody) {
      var lHtml = '';
      acts.forEach(function (act) {
        var isSelected = (state.selectedDonutActivity === act.id);
        var rowClass = isSelected ? 'selected-legend-row' : '';
        lHtml += '<tr class="' + rowClass + '" style="cursor:pointer;" onclick="window.SPT_APP.selectDonutActivity(\'' + act.id + '\')">' +
          '<td style="text-align:left;">' +
            '<span class="legend-dot" style="display:inline-block;width:9px;height:9px;border-radius:50%;background:' + act.color + ';margin-right:6px;vertical-align:middle;"></span>' +
            '<strong style="vertical-align:middle;color:#1E293B;font-size:11px;">' + act.name + '</strong>' +
          '</td>' +
          '<td style="text-align:right;font-weight:600;color:#0F172A;font-size:11px;">' + formatNum(act.coverageHa, 1) + ' ha</td>' +
          '<td style="text-align:right;font-weight:700;color:#2563EB;font-size:11px;">' + formatNum(act.sharePct, 1) + '%</td>' +
          '</tr>';
      });
      legendTbody.innerHTML = lHtml;
    }
  }

  function showDonutTooltip(evt, actId) {
    var tooltip = document.getElementById('donutTooltip');
    if (!tooltip || !window.tnkeStore) return;
    var cycle = window.tnkeStore.getObservasiCycleData();
    var act = (cycle.activityCoverage || []).find(function (a) { return a.id === actId; });
    if (!act) return;

    tooltip.innerHTML = '<div style="font-weight:700;margin-bottom:3px;color:' + act.color + ';">' + act.name + '</div>' +
      '<div>Luas cakupan: <strong>' + formatNum(act.coverageHa, 1) + ' ha</strong></div>' +
      '<div>Proporsi: <strong>' + formatNum(act.sharePct, 1) + '%</strong></div>';
    tooltip.style.display = 'block';
    moveDonutTooltip(evt);
  }

  function moveDonutTooltip(evt) {
    var tooltip = document.getElementById('donutTooltip');
    if (!tooltip) return;
    var parent = tooltip.parentElement;
    if (!parent) return;
    var rect = parent.getBoundingClientRect();
    var x = evt.clientX - rect.left + 10;
    var y = evt.clientY - rect.top + 10;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }

  function hideDonutTooltip() {
    var tooltip = document.getElementById('donutTooltip');
    if (tooltip) tooltip.style.display = 'none';
  }

  function selectDonutActivity(actId) {
    if (state.selectedDonutActivity === actId) {
      state.selectedDonutActivity = 'all';
    } else {
      state.selectedDonutActivity = actId;
    }

    var sel = document.getElementById('divCompActivityFilter');
    if (sel) sel.value = state.selectedDonutActivity;

    var globAct = document.getElementById('activityFilter');
    if (globAct) {
      globAct.value = state.selectedDonutActivity;
      state.activeActivityFilter = state.selectedDonutActivity;
    }

    renderActivityDonut();
    renderDivisionComparisonTable();
  }

  function onDivCompActivityChange(actVal) {
    state.selectedDonutActivity = actVal;
    var globAct = document.getElementById('activityFilter');
    if (globAct) {
      globAct.value = actVal;
      state.activeActivityFilter = actVal;
    }
    renderActivityDonut();
    renderDivisionComparisonTable();
  }

  function setDivTableUnit(unit) {
    state.divTableUnit = unit;
    var btnPct = document.getElementById('btnUnitPct');
    var btnHa = document.getElementById('btnUnitHa');
    if (btnPct && btnHa) {
      if (unit === 'pct') {
        btnPct.classList.add('active');
        btnHa.classList.remove('active');
      } else {
        btnHa.classList.add('active');
        btnPct.classList.remove('active');
      }
    }
    renderDivisionComparisonTable();
  }

  function renderDivisionComparisonTable() {
    var tbody = document.getElementById('divCompTableBody');
    if (!tbody || !window.tnkeStore) return;

    var cycle = window.tnkeStore.getObservasiCycleData();
    var isAll = (state.selectedDonutActivity === 'all');
    var actKey = state.selectedDonutActivity;
    var unit = state.divTableUnit || 'pct';

    var rows = cycle.divisionComparison || [];
    var actBreakdown = cycle.activityDivisionBreakdown ? cycle.activityDivisionBreakdown[actKey] : null;

    var html = '';
    var totalObsHa = 0;
    var totalAreaHa = 3303.3;

    rows.forEach(function (d) {
      var dObsHa = d.observedHa;
      var dPct = d.coveragePct;
      var dStatus = d.status;

      if (!isAll && actBreakdown && actBreakdown[d.divisi]) {
        dObsHa = actBreakdown[d.divisi].observedHa;
        dPct = actBreakdown[d.divisi].coveragePct;
        dStatus = '-';
      }

      totalObsHa += dObsHa;

      var barWidth = Math.min(100, Math.max(0, dPct));
      var statusBadgeHtml = '';
      if (isAll) {
        if (dStatus === 'Sesuai target') {
          statusBadgeHtml = '<span class="badge-div-sesuai">Sesuai target</span>';
        } else {
          statusBadgeHtml = '<span class="badge-div-tertinggal">Tertinggal</span>';
        }
      } else {
        statusBadgeHtml = '<span style="color:#64748B;">-</span>';
      }

      var progLabel = (unit === 'pct') ? (formatNum(dPct, 1) + '%') : (formatNum(dObsHa, 1) + ' ha');
      var targetTickHtml = isAll ? '<div class="div-target-tick" style="left: 60.0%;" title="Target Evaluasi 60,0%"></div>' : '';

      html += '<tr data-divisi="' + d.divisi + '" style="cursor:pointer;" onclick="window.SPT_APP.selectDivisionFromTable(\'' + d.divisi + '\')">' +
        '<td style="text-align:left;"><strong>' + d.divisi + '</strong></td>' +
        '<td style="text-align:right;color:#475569;">' + formatNum(d.totalAreaHa, 1) + ' ha</td>' +
        '<td style="text-align:right;font-weight:600;color:#0F172A;">' + formatNum(dObsHa, 1) + ' ha</td>' +
        '<td style="text-align:left;">' +
          '<div class="div-progress-wrapper">' +
            '<div class="div-progress-track">' +
              '<div class="div-progress-fill" style="width:' + barWidth.toFixed(1) + '%;"></div>' +
              targetTickHtml +
            '</div>' +
            '<span class="div-progress-val">' + progLabel + '</span>' +
          '</div>' +
        '</td>' +
        '<td style="text-align:center;">' + statusBadgeHtml + '</td>' +
        '</tr>';
    });

    // FOOTER ROW: TOTAL
    var totalPct = isAll ? cycle.actualPct : (totalObsHa / totalAreaHa * 100);
    var totalProgLabel = (unit === 'pct') ? (formatNum(totalPct, 1) + '%') : (formatNum(isAll ? cycle.combinedUniqueCoverageHa : totalObsHa, 1) + ' ha');
    var totalTargetTick = isAll ? '<div class="div-target-tick" style="left: 60.0%;" title="Target Evaluasi 60,0%"></div>' : '';
    var totalStatusHtml = isAll ? '<span class="badge-div-tertinggal">Tertinggal</span>' : '<span style="color:#64748B;">-</span>';

    html += '<tr class="div-table-tnke-row div-row-total" style="background:#F8FAFC;font-weight:700;border-top:1.5px solid #CBD5E1;">' +
      '<td style="text-align:left;"><strong>Total</strong></td>' +
      '<td style="text-align:right;"><strong>' + formatNum(totalAreaHa, 1) + ' ha</strong></td>' +
      '<td style="text-align:right;color:#0D9488;"><strong>' + formatNum(isAll ? cycle.combinedUniqueCoverageHa : totalObsHa, 1) + ' ha</strong></td>' +
      '<td style="text-align:left;">' +
        '<div class="div-progress-wrapper">' +
          '<div class="div-progress-track">' +
            '<div class="div-progress-fill bg-teal" style="width:' + totalPct.toFixed(1) + '%;"></div>' +
            totalTargetTick +
          '</div>' +
          '<span class="div-progress-val" style="font-weight:800;color:#0D9488;">' + totalProgLabel + '</span>' +
        '</div>' +
      '</td>' +
      '<td style="text-align:center;">' + totalStatusHtml + '</td>' +
      '</tr>';

    tbody.innerHTML = html;

    // Update footer labels
    var elUnitDesc = document.getElementById('divFooterUnitDesc');
    if (elUnitDesc) {
      elUnitDesc.textContent = (unit === 'pct') ? '% dari luas masing-masing divisi' : 'Hektare diobservasi dari luas divisi';
    }
    var elTargetSep = document.getElementById('divFooterTargetSep');
    var elTargetText = document.getElementById('divFooterTargetText');
    if (elTargetSep && elTargetText) {
      if (isAll) {
        elTargetSep.style.display = 'inline';
        elTargetText.style.display = 'inline';
      } else {
        elTargetSep.style.display = 'none';
        elTargetText.style.display = 'none';
      }
    }
  }

  function selectDivisionFromTable(divName) {
    state.division = divName;
    var dSelect = document.getElementById('divisionFilter');
    if (dSelect) dSelect.value = divName;
    var dTableSel = document.getElementById('divCompDivisionSelect');
    if (dTableSel) dTableSel.value = divName;
    switchObsTab('petaCakupan');
    if (state.geoJsonData) {
      renderGeoJsonLayers(state.geoJsonData);
    }
  }

  function onDivCompDivisionSelect(divVal) {
    state.division = divVal;
    var dSelect = document.getElementById('divisionFilter');
    if (dSelect) dSelect.value = divVal;

    var rows = document.querySelectorAll('.div-comp-table tbody tr');
    rows.forEach(function (r) {
      var dName = r.getAttribute('data-divisi');
      if (!dName) return; // total row
      if (divVal === 'all' || dName === divVal) {
        r.style.display = '';
        if (dName === divVal) {
          r.classList.add('selected-act');
        } else {
          r.classList.remove('selected-act');
        }
      } else {
        r.style.display = 'none';
      }
    });
  }

  function handleOpsSummaryClick(action) {
    if (action === 'sisaArea') {
      switchObsTab('petaCakupan');
    } else if (action === 'kebutuhan') {
      switchObsTab('targetRealisasi');
    } else if (action === 'perhatian') {
      var rows = document.querySelectorAll('.div-comp-table tbody tr');
      rows.forEach(function (r) {
        var dName = r.getAttribute('data-divisi');
        if (dName === 'DIVISI 2' || dName === 'DIVISI 3' || dName === 'DIVISI 6') {
          r.classList.add('row-attention-highlight');
        } else {
          r.classList.remove('row-attention-highlight');
        }
      });
      setTimeout(function () {
        rows.forEach(function (r) { r.classList.remove('row-attention-highlight'); });
      }, 4000);
    }
  }

  function openCycleModal() {
    var modal = document.getElementById('modalCycleSetup');
    if (modal) modal.style.display = 'flex';
  }

  function closeCycleModal() {
    var modal = document.getElementById('modalCycleSetup');
    if (modal) modal.style.display = 'none';
  }

  function saveCycleSetup(e) {
    if (e && e.preventDefault) e.preventDefault();
    closeCycleModal();
    showToast('Pengaturan siklus observasi berhasil diperbarui');
  }

  /* ==========================================================================
     PROBLEM DASHBOARD DETAIL CONTROLLER (SPT MULTI-UNIT & EXPOSURE ENGINE)
     ========================================================================== */

  state.activeDashCard = 'observasi';
  state.problemMeasurementBasis = 'luas';
  state.activeProbTab = 'kategoriDivisi';

  var SPT_PROBLEM_DENOMINATORS = {
    'total_agronomic_area': {
      label: 'Total luas agronomi',
      unit: 'ha',
      'DIVISI 1': 799.5,
      'DIVISI 2': 854.04,
      'DIVISI 3': 797.9,
      'DIVISI 5': 478.3,
      'DIVISI 6': 373.6,
      'all': 3303.3
    },
    'total_pasar_pikul_length': {
      label: 'Total panjang pasar pikul',
      unit: 'meter',
      'DIVISI 1': 14200,
      'DIVISI 2': 12000,
      'DIVISI 3': 13500,
      'DIVISI 5': 8400,
      'DIVISI 6': 6800,
      'all': 54900
    },
    'total_productive_trees': {
      label: 'Total populasi pokok',
      unit: 'pokok',
      'DIVISI 1': 108700,
      'DIVISI 2': 116100,
      'DIVISI 3': 108500,
      'DIVISI 5': 65000,
      'DIVISI 6': 50800,
      'all': 449100
    },
    'total_bridge_assets': {
      label: 'Total aset jembatan sejenis',
      unit: 'unit',
      'DIVISI 1': 2,
      'DIVISI 2': 3,
      'DIVISI 3': 2,
      'DIVISI 5': 1,
      'DIVISI 6': 0,
      'all': 8
    },
    'total_culvert_assets': {
      label: 'Total aset gorong-gorong',
      unit: 'unit',
      'DIVISI 1': 10,
      'DIVISI 2': 12,
      'DIVISI 3': 11,
      'DIVISI 5': 5,
      'DIVISI 6': 4,
      'all': 42
    },
    'total_titi_panen_assets': {
      label: 'Total aset titi panen',
      unit: 'unit',
      'DIVISI 1': 110,
      'DIVISI 2': 130,
      'DIVISI 3': 115,
      'DIVISI 5': 70,
      'DIVISI 6': 55,
      'all': 480
    },
    'total_tph_assets': {
      label: 'Total aset TPH',
      unit: 'unit',
      'DIVISI 1': 80,
      'DIVISI 2': 90,
      'DIVISI 3': 75,
      'DIVISI 5': 45,
      'DIVISI 6': 30,
      'all': 320
    }
  };

  var SPT_PROBLEM_MASTER_CONFIG = {
    // --- LUAS ---
    'gawangan_semak': {
      id: 'gawangan_semak',
      problemCategory: 'Gawangan Semak',
      basis: 'luas',
      measurementUnit: 'ha',
      denominatorType: 'total_agronomic_area',
      aggregationRule: 'union_polygon_ha',
      businessCriticality: 'medium',
      slaDays: 7,
      warningThreshold: 2.0,
      criticalThreshold: 3.5,
      priorityTier: 'P3',
      defaultActionPlan: 'Semprot gawangan',
      divisions: {
        'DIVISI 1': { uniqueVol: '28,1 ha', exposurePct: 2.8, taggingCount: 4, open: 2, inProgress: 1, closed: 1 },
        'DIVISI 2': { uniqueVol: '24,5 ha', exposurePct: 3.4, taggingCount: 3, open: 2, inProgress: 1, closed: 0 },
        'DIVISI 3': { uniqueVol: '18,2 ha', exposurePct: 2.0, taggingCount: 3, open: 1, inProgress: 1, closed: 1 },
        'DIVISI 5': { uniqueVol: '12,7 ha', exposurePct: 2.7, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 6': { uniqueVol: '8,4 ha', exposurePct: 1.8, taggingCount: 2, open: 1, inProgress: 0, closed: 1 }
      },
      totalEstate: { uniqueVol: '89,9 ha', exposurePct: 3.0, taggingCount: 14 }
    },
    'areal_banjir': {
      id: 'areal_banjir',
      problemCategory: 'Areal Banjir / Tergenang',
      basis: 'luas',
      measurementUnit: 'ha',
      denominatorType: 'total_agronomic_area',
      aggregationRule: 'union_polygon_ha',
      businessCriticality: 'critical',
      slaDays: 3,
      warningThreshold: 1.5,
      criticalThreshold: 2.5,
      priorityTier: 'P1',
      defaultActionPlan: 'Tanggul, individual bund, cuci parit, atau continuous bund',
      divisions: {
        'DIVISI 1': { uniqueVol: '12,3 ha', exposurePct: 1.2, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 2': { uniqueVol: '18,6 ha', exposurePct: 2.1, taggingCount: 3, open: 2, inProgress: 1, closed: 0 },
        'DIVISI 3': { uniqueVol: '8,1 ha', exposurePct: 1.0, taggingCount: 2, open: 1, inProgress: 0, closed: 1 },
        'DIVISI 5': { uniqueVol: '7,5 ha', exposurePct: 1.6, taggingCount: 1, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 6': { uniqueVol: '5,1 ha', exposurePct: 1.1, taggingCount: 1, open: 0, inProgress: 1, closed: 0 }
      },
      totalEstate: { uniqueVol: '51,6 ha', exposurePct: 1.6, taggingCount: 9 }
    },
    'semak_gawangan_bambu': {
      id: 'semak_gawangan_bambu',
      problemCategory: 'Semak Gawangan Bambu',
      basis: 'luas',
      measurementUnit: 'ha',
      denominatorType: 'total_agronomic_area',
      aggregationRule: 'union_polygon_ha',
      businessCriticality: 'low',
      slaDays: 14,
      warningThreshold: 1.0,
      criticalThreshold: 2.0,
      priorityTier: 'P4',
      defaultActionPlan: 'Pengendalian chemist',
      divisions: {
        'DIVISI 1': { uniqueVol: '7,8 ha', exposurePct: 0.8, taggingCount: 1, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 2': { uniqueVol: '9,4 ha', exposurePct: 1.1, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 3': { uniqueVol: '6,2 ha', exposurePct: 0.8, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 5': { uniqueVol: '5,0 ha', exposurePct: 1.0, taggingCount: 1, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 6': { uniqueVol: '3.6 ha', exposurePct: 0.7, taggingCount: 1, open: 0, inProgress: 0, closed: 1 }
      },
      totalEstate: { uniqueVol: '32,0 ha', exposurePct: 1.0, taggingCount: 6 }
    },
    'semak_gawangan_pisang': {
      id: 'semak_gawangan_pisang',
      problemCategory: 'Semak Gawangan Pisang',
      basis: 'luas',
      measurementUnit: 'ha',
      denominatorType: 'total_agronomic_area',
      aggregationRule: 'union_polygon_ha',
      businessCriticality: 'low',
      slaDays: 14,
      warningThreshold: 1.0,
      criticalThreshold: 2.0,
      priorityTier: 'P4',
      defaultActionPlan: 'Pengendalian chemist',
      divisions: {
        'DIVISI 1': { uniqueVol: '5,1 ha', exposurePct: 0.5, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 2': { uniqueVol: '8,2 ha', exposurePct: 1.0, taggingCount: 2, open: 1, inProgress: 0, closed: 1 },
        'DIVISI 3': { uniqueVol: '4,7 ha', exposurePct: 0.6, taggingCount: 1, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 5': { uniqueVol: '4,1 ha', exposurePct: 0.9, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 6': { uniqueVol: '3,8 ha', exposurePct: 0.8, taggingCount: 1, open: 0, inProgress: 0, closed: 1 }
      },
      totalEstate: { uniqueVol: '25,9 ha', exposurePct: 0.8, taggingCount: 6 }
    },

    // --- PANJANG ---
    'pasar_pikul_semak': {
      id: 'pasar_pikul_semak',
      problemCategory: 'Pasar Pikul Semak',
      basis: 'panjang',
      measurementUnit: 'm/km',
      denominatorType: 'total_pasar_pikul_length',
      aggregationRule: 'union_line_segment',
      businessCriticality: 'high',
      slaDays: 5,
      warningThreshold: 5.0,
      criticalThreshold: 8.0,
      priorityTier: 'P2',
      defaultActionPlan: 'Semprot pasar pikul',
      divisions: {
        'DIVISI 1': { uniqueVol: '1,15 km', exposurePct: 8.1, taggingCount: 3, open: 1, inProgress: 1, closed: 1 },
        'DIVISI 2': { uniqueVol: '1,20 km', exposurePct: 10.0, taggingCount: 4, open: 2, inProgress: 1, closed: 1 },
        'DIVISI 3': { uniqueVol: '1,30 km', exposurePct: 9.6, taggingCount: 3, open: 1, inProgress: 1, closed: 1 },
        'DIVISI 5': { uniqueVol: '720 m', exposurePct: 8.6, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 6': { uniqueVol: '480 m', exposurePct: 7.1, taggingCount: 1, open: 1, inProgress: 0, closed: 0 }
      },
      totalEstate: { uniqueVol: '4,85 km', exposurePct: 8.8, taggingCount: 13 }
    },
    'konektivitas_pasar_pikul': {
      id: 'konektivitas_pasar_pikul',
      problemCategory: 'Konektivitas Teras/Pasar Pikul',
      basis: 'panjang',
      measurementUnit: 'm/km',
      denominatorType: 'total_pasar_pikul_length',
      aggregationRule: 'union_line_segment',
      businessCriticality: 'high',
      slaDays: 7,
      warningThreshold: 3.0,
      criticalThreshold: 5.0,
      priorityTier: 'P2',
      defaultActionPlan: 'Perbaikan akses',
      divisions: {
        'DIVISI 1': { uniqueVol: '340 m', exposurePct: 2.4, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 2': { uniqueVol: '520 m', exposurePct: 4.3, taggingCount: 2, open: 1, inProgress: 0, closed: 1 },
        'DIVISI 3': { uniqueVol: '380 m', exposurePct: 2.8, taggingCount: 1, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 5': { uniqueVol: '210 m', exposurePct: 2.5, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 6': { uniqueVol: '170 m', exposurePct: 2.5, taggingCount: 1, open: 0, inProgress: 0, closed: 1 }
      },
      totalEstate: { uniqueVol: '1,62 km', exposurePct: 3.0, taggingCount: 7 }
    },

    // --- POKOK ---
    'underpruning': {
      id: 'underpruning',
      problemCategory: 'Underpruning',
      basis: 'pokok',
      measurementUnit: 'pokok',
      denominatorType: 'total_productive_trees',
      aggregationRule: 'unique_tree_id',
      businessCriticality: 'medium',
      slaDays: 10,
      warningThreshold: 2.0,
      criticalThreshold: 4.0,
      priorityTier: 'P3',
      defaultActionPlan: 'Penambahan HK pruning / Borongan',
      divisions: {
        'DIVISI 1': { uniqueVol: '2.800 pkk', exposurePct: 2.6, taggingCount: 4, open: 2, inProgress: 1, closed: 1 },
        'DIVISI 2': { uniqueVol: '4.250 pkk', exposurePct: 3.7, taggingCount: 5, open: 2, inProgress: 2, closed: 1 },
        'DIVISI 3': { uniqueVol: '2.950 pkk', exposurePct: 2.7, taggingCount: 3, open: 1, inProgress: 1, closed: 1 },
        'DIVISI 5': { uniqueVol: '1.450 pkk', exposurePct: 2.2, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 6': { uniqueVol: '1.000 pkk', exposurePct: 2.0, taggingCount: 2, open: 1, inProgress: 0, closed: 1 }
      },
      totalEstate: { uniqueVol: '12.450 pkk', exposurePct: 2.8, taggingCount: 16 }
    },
    'defisiensi_hara': {
      id: 'defisiensi_hara',
      problemCategory: 'Defisiensi Hara',
      basis: 'pokok',
      measurementUnit: 'pokok',
      denominatorType: 'total_productive_trees',
      aggregationRule: 'unique_tree_id',
      businessCriticality: 'medium',
      slaDays: 14,
      warningThreshold: 1.5,
      criticalThreshold: 3.0,
      priorityTier: 'P3',
      defaultActionPlan: 'Semprot defisiensi',
      divisions: {
        'DIVISI 1': { uniqueVol: '1.620 pkk', exposurePct: 1.5, taggingCount: 2, open: 1, inProgress: 0, closed: 1 },
        'DIVISI 2': { uniqueVol: '2.340 pkk', exposurePct: 2.0, taggingCount: 3, open: 1, inProgress: 1, closed: 1 },
        'DIVISI 3': { uniqueVol: '1.480 pkk', exposurePct: 1.4, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 5': { uniqueVol: '980 pkk', exposurePct: 1.5, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 6': { uniqueVol: '700 pkk', exposurePct: 1.4, taggingCount: 1, open: 1, inProgress: 0, closed: 0 }
      },
      totalEstate: { uniqueVol: '7.120 pkk', exposurePct: 1.6, taggingCount: 9 }
    },
    'titik_kosong': {
      id: 'titik_kosong',
      problemCategory: 'Titik Kosong',
      basis: 'pokok',
      measurementUnit: 'pokok',
      denominatorType: 'total_productive_trees',
      aggregationRule: 'unique_tree_id',
      businessCriticality: 'low',
      slaDays: 30,
      warningThreshold: 1.0,
      criticalThreshold: 2.0,
      priorityTier: 'P4',
      defaultActionPlan: 'Penyisipan',
      divisions: {
        'DIVISI 1': { uniqueVol: '1.100 pkk', exposurePct: 1.0, taggingCount: 2, open: 1, inProgress: 0, closed: 1 },
        'DIVISI 2': { uniqueVol: '1.550 pkk', exposurePct: 1.3, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 3': { uniqueVol: '1.050 pkk', exposurePct: 1.0, taggingCount: 2, open: 1, inProgress: 0, closed: 1 },
        'DIVISI 5': { uniqueVol: '690 pkk', exposurePct: 1.1, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 6': { uniqueVol: '500 pkk', exposurePct: 1.0, taggingCount: 1, open: 0, inProgress: 0, closed: 1 }
      },
      totalEstate: { uniqueVol: '4.890 pkk', exposurePct: 1.1, taggingCount: 8 }
    },
    'pokok_abnormal': {
      id: 'pokok_abnormal',
      problemCategory: 'Pokok Abnormal',
      basis: 'pokok',
      measurementUnit: 'pokok',
      denominatorType: 'total_productive_trees',
      aggregationRule: 'unique_tree_id',
      businessCriticality: 'medium',
      slaDays: 14,
      warningThreshold: 0.5,
      criticalThreshold: 1.0,
      priorityTier: 'P3',
      defaultActionPlan: 'Tumbang pokok abnormal',
      divisions: {
        'DIVISI 1': { uniqueVol: '620 pkk', exposurePct: 0.6, taggingCount: 1, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 2': { uniqueVol: '890 pkk', exposurePct: 0.8, taggingCount: 2, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 3': { uniqueVol: '580 pkk', exposurePct: 0.5, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 5': { uniqueVol: '350 pkk', exposurePct: 0.5, taggingCount: 1, open: 0, inProgress: 0, closed: 1 },
        'DIVISI 6': { uniqueVol: '240 pkk', exposurePct: 0.5, taggingCount: 1, open: 1, inProgress: 0, closed: 0 }
      },
      totalEstate: { uniqueVol: '2.680 pkk', exposurePct: 0.6, taggingCount: 6 }
    },

    // --- INFRASTRUKTUR ---
    'jembatan': {
      id: 'jembatan',
      problemCategory: 'Jembatan / Box Culvert',
      basis: 'infrastruktur',
      measurementUnit: 'unit',
      denominatorType: 'total_bridge_assets',
      aggregationRule: 'unique_asset_id',
      businessCriticality: 'critical',
      slaDays: 2,
      warningThreshold: 5.0,
      criticalThreshold: 10.0,
      priorityTier: 'P1',
      defaultActionPlan: 'Pemasangan jembatan',
      divisions: {
        'DIVISI 1': { uniqueVol: '0 unit', exposurePct: 0.0, taggingCount: 0, open: 0, inProgress: 0, closed: 0 },
        'DIVISI 2': { uniqueVol: '1 unit', exposurePct: 33.3, taggingCount: 3, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 3': { uniqueVol: '0 unit', exposurePct: 0.0, taggingCount: 0, open: 0, inProgress: 0, closed: 0 },
        'DIVISI 5': { uniqueVol: '0 unit', exposurePct: 0.0, taggingCount: 0, open: 0, inProgress: 0, closed: 0 },
        'DIVISI 6': { uniqueVol: '0 unit', exposurePct: 0.0, taggingCount: 0, open: 0, inProgress: 0, closed: 0 }
      },
      totalEstate: { uniqueVol: '1 unit', exposurePct: 12.5, taggingCount: 3 }
    },
    'gorong_gorong': {
      id: 'gorong_gorong',
      problemCategory: 'Gorong-gorong',
      basis: 'infrastruktur',
      measurementUnit: 'unit',
      denominatorType: 'total_culvert_assets',
      aggregationRule: 'unique_asset_id',
      businessCriticality: 'high',
      slaDays: 4,
      warningThreshold: 5.0,
      criticalThreshold: 8.0,
      priorityTier: 'P2',
      defaultActionPlan: 'Pemasangan gorong-gorong',
      divisions: {
        'DIVISI 1': { uniqueVol: '1 unit', exposurePct: 10.0, taggingCount: 2, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 2': { uniqueVol: '1 unit', exposurePct: 8.3, taggingCount: 2, open: 1, inProgress: 0, closed: 0 },
        'DIVISI 3': { uniqueVol: '1 unit', exposurePct: 9.1, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 5': { uniqueVol: '0 unit', exposurePct: 0.0, taggingCount: 0, open: 0, inProgress: 0, closed: 0 },
        'DIVISI 6': { uniqueVol: '0 unit', exposurePct: 0.0, taggingCount: 0, open: 0, inProgress: 0, closed: 0 }
      },
      totalEstate: { uniqueVol: '3 unit', exposurePct: 7.1, taggingCount: 5 }
    },
    'titi_panen': {
      id: 'titi_panen',
      problemCategory: 'Titi Panen Kurang/Rusak',
      basis: 'infrastruktur',
      measurementUnit: 'unit',
      denominatorType: 'total_titi_panen_assets',
      aggregationRule: 'unique_asset_id',
      businessCriticality: 'high',
      slaDays: 5,
      warningThreshold: 2.0,
      criticalThreshold: 4.0,
      priorityTier: 'P2',
      defaultActionPlan: 'Penambahan titi panen',
      divisions: {
        'DIVISI 1': { uniqueVol: '3 unit', exposurePct: 2.7, taggingCount: 4, open: 2, inProgress: 1, closed: 0 },
        'DIVISI 2': { uniqueVol: '5 unit', exposurePct: 3.8, taggingCount: 5, open: 2, inProgress: 2, closed: 1 },
        'DIVISI 3': { uniqueVol: '3 unit', exposurePct: 2.6, taggingCount: 3, open: 1, inProgress: 1, closed: 1 },
        'DIVISI 5': { uniqueVol: '2 unit', exposurePct: 2.8, taggingCount: 2, open: 1, inProgress: 0, closed: 1 },
        'DIVISI 6': { uniqueVol: '1 unit', exposurePct: 1.9, taggingCount: 1, open: 0, inProgress: 1, closed: 0 }
      },
      totalEstate: { uniqueVol: '14 unit', exposurePct: 2.9, taggingCount: 15 }
    },
    'tph_bermasalah': {
      id: 'tph_bermasalah',
      problemCategory: 'TPH Bermasalah',
      basis: 'infrastruktur',
      measurementUnit: 'unit',
      denominatorType: 'total_tph_assets',
      aggregationRule: 'unique_asset_id',
      businessCriticality: 'medium',
      slaDays: 7,
      warningThreshold: 2.0,
      criticalThreshold: 3.5,
      priorityTier: 'P3',
      defaultActionPlan: 'Semprot TPH',
      divisions: {
        'DIVISI 1': { uniqueVol: '2 unit', exposurePct: 2.5, taggingCount: 3, open: 1, inProgress: 1, closed: 0 },
        'DIVISI 2': { uniqueVol: '3 unit', exposurePct: 3.3, taggingCount: 4, open: 2, inProgress: 1, closed: 0 },
        'DIVISI 3': { uniqueVol: '2 unit', exposurePct: 2.6, taggingCount: 2, open: 1, inProgress: 0, closed: 1 },
        'DIVISI 5': { uniqueVol: '1 unit', exposurePct: 2.0, taggingCount: 1, open: 0, inProgress: 1, closed: 0 },
        'DIVISI 6': { uniqueVol: '1 unit', exposurePct: 2.5, taggingCount: 1, open: 1, inProgress: 0, closed: 0 }
      },
      totalEstate: { uniqueVol: '9 unit', exposurePct: 2.8, taggingCount: 11 }
    }
  };

  window.SPT_PROBLEM_MASTER_CONFIG = SPT_PROBLEM_MASTER_CONFIG;
  window.SPT_PROBLEM_DENOMINATORS = SPT_PROBLEM_DENOMINATORS;

  function switchDashCard(cardKey) {
    state.activeDashCard = cardKey;
    var cardObs = document.getElementById('cardSummaryObs');
    var cardProb = document.getElementById('cardSummaryProb');
    var contObs = document.getElementById('obsMainContainer');
    var contProb = document.getElementById('probMainContainer');

    if (cardKey === 'problem') {
      if (cardObs) cardObs.classList.remove('active-card');
      if (cardProb) cardProb.classList.add('active-card', 'active-prob-card');
      if (contObs) contObs.style.display = 'none';
      if (contProb) contProb.style.display = 'block';
      renderProblemDashboardDetail();
    } else {
      // observasi
      if (cardProb) cardProb.classList.remove('active-card', 'active-prob-card');
      if (cardObs) cardObs.classList.add('active-card');
      if (contProb) contProb.style.display = 'none';
      if (contObs) contObs.style.display = 'block';
    }
  }

  function switchProbTab(tabName) {
    state.activeProbTab = tabName;
    var tabs = ['kategoriDivisi', 'trenTemuan', 'prioritas'];
    var tabMap = {
      kategoriDivisi: { btn: 'tabProbKategoriDivisi', panel: 'probTabKategoriDivisi' },
      trenTemuan: { btn: 'tabProbTrenTemuan', panel: 'probTabTrenTemuan' },
      prioritas: { btn: 'tabProbPrioritas', panel: 'probTabPrioritas' }
    };
    tabs.forEach(function (t) {
      var btn = document.getElementById(tabMap[t].btn);
      var panel = document.getElementById(tabMap[t].panel);
      if (btn) {
        if (t === tabName) btn.classList.add('active');
        else btn.classList.remove('active');
      }
      if (panel) {
        panel.style.display = (t === tabName) ? 'block' : 'none';
      }
    });

    if (tabName === 'trenTemuan') {
      renderProblemTrendView();
    } else if (tabName === 'prioritas') {
      renderProblemPriorityFullTable();
    } else {
      renderProblemDashboardDetail();
    }
  }

  function setProblemMeasurementBasis(basisKey) {
    state.problemMeasurementBasis = basisKey;
    var bases = ['luas', 'panjang', 'pokok', 'infrastruktur'];
    var btnMap = {
      luas: 'btnBasisLuas',
      panjang: 'btnBasisPanjang',
      pokok: 'btnBasisPokok',
      infrastruktur: 'btnBasisInfrastruktur'
    };
    bases.forEach(function (b) {
      var btn = document.getElementById(btnMap[b]);
      if (btn) {
        if (b === basisKey) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });

    renderProblemRankingBars();
    renderProblemHeatmapTable();
  }

  function getProblemCategoriesByBasis(basis) {
    var result = [];
    for (var k in SPT_PROBLEM_MASTER_CONFIG) {
      if (SPT_PROBLEM_MASTER_CONFIG[k].basis === basis) {
        result.push(SPT_PROBLEM_MASTER_CONFIG[k]);
      }
    }
    return result;
  }

  function renderProblemRankingBars() {
    var container = document.getElementById('probBarsContainer');
    var titleEl = document.getElementById('probRankingTitle');
    var scaleEl = document.getElementById('probScaleNote');
    var noteEl = document.getElementById('probRankingNote');
    if (!container) return;

    var basis = state.problemMeasurementBasis || 'luas';
    var cats = getProblemCategoriesByBasis(basis);

    var titles = {
      luas: 'Exposure kategori berbasis luas',
      panjang: 'Exposure kategori berbasis panjang',
      pokok: 'Exposure kategori berbasis populasi pokok',
      infrastruktur: 'Exposure kategori berbasis unit infrastruktur'
    };
    var scales = {
      luas: { label: 'Skala 0-5%', max: 5.0 },
      panjang: { label: 'Skala 0-12%', max: 12.0 },
      pokok: { label: 'Skala 0-5%', max: 5.0 },
      infrastruktur: { label: 'Skala 0-15%', max: 15.0 }
    };
    var notes = {
      luas: 'Volume unik menggunakan union polygon; tagging overlap tidak dihitung dua kali.',
      panjang: 'Volume unik menggunakan union segment line; overlap tidak dihitung dua kali.',
      pokok: 'Volume unik berbasis unique tree ID; tagging berulang pada pokok yang sama tidak menambah volume.',
      infrastruktur: 'Volume unik berbasis unique asset ID; multi-laporan atas aset yang sama dihitung 1 aset terdampak.'
    };

    if (titleEl) titleEl.textContent = titles[basis] || titles.luas;
    if (scaleEl) scaleEl.textContent = scales[basis] ? scales[basis].label : 'Skala 0-5%';
    if (noteEl) noteEl.textContent = notes[basis] || notes.luas;

    var maxScale = scales[basis] ? scales[basis].max : 5.0;

    var html = '';
    cats.forEach(function (cat) {
      var pct = cat.totalEstate.exposurePct;
      var fillW = Math.min(100, Math.max(8, (pct / maxScale) * 100));

      // Bar color sequential red
      var barBg = '#B91C1C';
      if (pct < 1.0) barBg = '#FECACA';
      else if (pct < 1.5) barBg = '#FCA5A5';
      else if (pct < 2.5) barBg = '#EF4444';

      var barTextColor = (pct >= 1.5) ? '#FFFFFF' : '#991B1B';

      html += '<div class="prob-bar-row" onclick="window.SPT_APP.goToProblemTaggingWithFilters({ category: \'' + cat.problemCategory + '\' })" title="Klik untuk drill-down ke Problem Tagging">';
      html += '  <span class="prob-bar-cat-name">' + cat.problemCategory + '</span>';
      html += '  <div class="prob-bar-track">';
      html += '    <div class="prob-bar-fill" style="width:' + fillW.toFixed(1) + '%;background:' + barBg + ';color:' + barTextColor + ';">';
      html += '      <span>' + formatNum(pct, 1) + '%</span>';
      html += '    </div>';
      html += '  </div>';
      html += '  <span class="prob-bar-vol-lbl">' + cat.totalEstate.uniqueVol + ' unik</span>';
      html += '</div>';
    });

    container.innerHTML = html;
  }

  function getHeatmapBgColor(pct) {
    if (pct === 0) return '#F8FAFC';
    if (pct < 0.8) return '#FEE2E2';
    if (pct < 1.5) return '#FECACA';
    if (pct < 2.3) return '#FCA5A5';
    if (pct < 3.0) return '#F87171';
    return '#B91C1C';
  }

  function getHeatmapTextColor(pct) {
    if (pct >= 2.5) return '#FFFFFF';
    return '#0F172A';
  }

  function renderProblemHeatmapTable() {
    var tbody = document.getElementById('probHeatmapTableBody');
    var unitNote = document.getElementById('probHeatmapUnitNote');
    if (!tbody) return;

    var basis = state.problemMeasurementBasis || 'luas';
    var cats = getProblemCategoriesByBasis(basis);

    var unitNotes = {
      luas: 'Luas unik · ha dan % area',
      panjang: 'Panjang unik · m/km dan % panjang',
      pokok: 'Pokok unik dan % populasi',
      infrastruktur: 'Unit aset unik dan % terhadap total aset sejenis'
    };
    if (unitNote) unitNote.textContent = unitNotes[basis] || unitNotes.luas;

    var divisions = ['DIVISI 1', 'DIVISI 2', 'DIVISI 3', 'DIVISI 5', 'DIVISI 6'];
    var html = '';

    cats.forEach(function (cat) {
      html += '<tr>';
      html += '  <td class="cell-cat-name" onclick="window.SPT_APP.goToProblemTaggingWithFilters({ category: \'' + cat.problemCategory + '\' })" title="Filter seluruh ' + cat.problemCategory + '">' + cat.problemCategory + '</td>';

      divisions.forEach(function (divName) {
        var dInfo = cat.divisions[divName] || { uniqueVol: '0', exposurePct: 0.0, taggingCount: 0, open: 0, inProgress: 0, closed: 0 };
        var bg = getHeatmapBgColor(dInfo.exposurePct);
        var fg = getHeatmapTextColor(dInfo.exposurePct);

        html += '  <td style="background:' + bg + ';color:' + fg + ';" ' +
          'onmouseenter="window.SPT_APP.showProblemHeatmapTooltip(event, \'' + cat.id + '\', \'' + divName + '\')" ' +
          'onmousemove="window.SPT_APP.moveProblemHeatmapTooltip(event)" ' +
          'onmouseleave="window.SPT_APP.hideProblemHeatmapTooltip()" ' +
          'onclick="window.SPT_APP.goToProblemTaggingWithFilters({ category: \'' + cat.problemCategory + '\', division: \'' + divName + '\' })" ' +
          'title="Klik untuk lihat temuan ' + cat.problemCategory + ' di ' + divName + '">';
        html += '    <strong class="hm-vol">' + dInfo.uniqueVol + '</strong>';
        html += '    <span class="hm-pct">' + formatNum(dInfo.exposurePct, 1) + '%</span>';
        html += '  </td>';
      });

      html += '</tr>';
    });

    tbody.innerHTML = html;
  }

  function showProblemHeatmapTooltip(e, catId, divName) {
    var tt = document.getElementById('probHeatmapTooltip');
    var cat = SPT_PROBLEM_MASTER_CONFIG[catId];
    if (!tt || !cat) return;

    var dInfo = cat.divisions[divName] || { uniqueVol: '0', exposurePct: 0.0, taggingCount: 0, open: 0, inProgress: 0, closed: 0 };
    var denomObj = SPT_PROBLEM_DENOMINATORS[cat.denominatorType];
    var denomVal = denomObj ? (denomObj[divName] || denomObj.all) : null;
    var denomUnit = denomObj ? denomObj.unit : '';
    var denomLabel = denomObj ? denomObj.label : 'Denominator';

    var html = '<div class="tt-title">' + cat.problemCategory + '</div>';
    html += '<div class="tt-div">' + divName + ' · TNKE ESTATE</div>';
    html += '<div class="tt-row"><span class="tt-lbl">Unique affected volume:</span><span class="tt-val">' + dInfo.uniqueVol + '</span></div>';

    if (denomVal) {
      html += '<div class="tt-row"><span class="tt-lbl">' + denomLabel + ':</span><span class="tt-val">' + formatNum(denomVal, 1) + ' ' + denomUnit + '</span></div>';
      html += '<div class="tt-row"><span class="tt-lbl">Exposure rate:</span><span class="tt-val" style="color:#F87171;">' + formatNum(dInfo.exposurePct, 1) + '%</span></div>';
    } else {
      html += '<div class="tt-row" style="color:#FBBF24;"><span>Exposure belum dapat dihitung — master denominator belum tersedia</span></div>';
    }

    html += '<div class="tt-row"><span class="tt-lbl">Jumlah tagging laporan:</span><span class="tt-val">' + dInfo.taggingCount + ' titik</span></div>';
    html += '<div class="tt-row"><span class="tt-lbl">Status workflow:</span><span class="tt-val">' + dInfo.open + ' Open · ' + dInfo.inProgress + ' In Progress</span></div>';

    tt.innerHTML = html;
    tt.style.display = 'block';
    moveProblemHeatmapTooltip(e);
  }

  function moveProblemHeatmapTooltip(e) {
    var tt = document.getElementById('probHeatmapTooltip');
    if (!tt || tt.style.display === 'none') return;
    var x = e.clientX + 14;
    var y = e.clientY + 14;
    if (x + 270 > window.innerWidth) x = e.clientX - 280;
    if (y + 160 > window.innerHeight) y = e.clientY - 170;
    tt.style.left = x + 'px';
    tt.style.top = y + 'px';
  }

  function hideProblemHeatmapTooltip() {
    var tt = document.getElementById('probHeatmapTooltip');
    if (tt) tt.style.display = 'none';
  }

  function renderProblemTrendView() {
    var box = document.getElementById('probTrendChartBox');
    if (!box) return;

    // SVG Weekly Trend Line Chart
    var w = 820;
    var h = 260;
    var padL = 40;
    var padR = 20;
    var padT = 30;
    var padB = 40;

    var weeks = [
      { name: 'Minggu 1', date: '01–07 Sep', open: 3, prog: 2, done: 1 },
      { name: 'Minggu 2', date: '08–14 Sep', open: 2, prog: 3, done: 2 },
      { name: 'Minggu 3', date: '15–21 Sep', open: 4, prog: 2, done: 3 },
      { name: 'Minggu 4', date: '22–30 Sep', open: 2, prog: 2, done: 3 }
    ];

    var chartW = w - padL - padR;
    var chartH = h - padT - padB;
    var maxVal = 6;

    var svg = '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;height:100%;font-family:Inter,sans-serif;">';

    // Grid lines
    for (var g = 0; g <= maxVal; g += 2) {
      var gy = padT + chartH - (g / maxVal) * chartH;
      svg += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy + '" stroke="#F1F5F9" stroke-width="1"/>';
      svg += '<text x="' + (padL - 8) + '" y="' + (gy + 4) + '" fill="#94A3B8" font-size="10" text-anchor="end">' + g + '</text>';
    }

    // Stacked Bars or Grouped Bars
    var stepW = chartW / weeks.length;
    var barW = 20;

    weeks.forEach(function (wk, idx) {
      var cx = padL + idx * stepW + stepW / 2;

      // Open (Red)
      var hOpen = (wk.open / maxVal) * chartH;
      var yOpen = padT + chartH - hOpen;
      svg += '<rect x="' + (cx - barW * 1.6) + '" y="' + yOpen + '" width="' + barW + '" height="' + hOpen + '" rx="3" fill="#DC2626"/>';
      svg += '<text x="' + (cx - barW * 1.6 + barW / 2) + '" y="' + (yOpen - 4) + '" font-size="10" font-weight="700" fill="#DC2626" text-anchor="middle">' + wk.open + '</text>';

      // In Progress (Orange)
      var hProg = (wk.prog / maxVal) * chartH;
      var yProg = padT + chartH - hProg;
      svg += '<rect x="' + (cx - barW * 0.5) + '" y="' + yProg + '" width="' + barW + '" height="' + hProg + '" rx="3" fill="#F59E0B"/>';
      svg += '<text x="' + (cx - barW * 0.5 + barW / 2) + '" y="' + (yProg - 4) + '" font-size="10" font-weight="700" fill="#F59E0B" text-anchor="middle">' + wk.prog + '</text>';

      // Selesai (Green)
      var hDone = (wk.done / maxVal) * chartH;
      var yDone = padT + chartH - hDone;
      svg += '<rect x="' + (cx + barW * 0.6) + '" y="' + yDone + '" width="' + barW + '" height="' + hDone + '" rx="3" fill="#16A34A"/>';
      svg += '<text x="' + (cx + barW * 0.6 + barW / 2) + '" y="' + (yDone - 4) + '" font-size="10" font-weight="700" fill="#16A34A" text-anchor="middle">' + wk.done + '</text>';

      // X Label
      svg += '<text x="' + cx + '" y="' + (h - padB + 16) + '" font-size="11" font-weight="700" fill="#1E293B" text-anchor="middle">' + wk.name + '</text>';
      svg += '<text x="' + cx + '" y="' + (h - padB + 30) + '" font-size="9.5" fill="#64748B" text-anchor="middle">' + wk.date + '</text>';
    });

    svg += '</svg>';
    box.innerHTML = svg;
  }

  function renderProblemPriorityFullTable() {
    var tbody = document.getElementById('probPriorityFullTableBody');
    if (!tbody) return;

    var priorities = [
      {
        tier: 'P1',
        badgeClass: 'p1-badge',
        name: 'Jembatan / Box Culvert',
        criteria: 'Akses transportasi panen terputus total; risiko keselamatan & evakuasi',
        sla: '2 Hari',
        volume: '1 unit (Divisi 2)',
        actionPlan: 'Pemasangan jembatan darurat / box culvert permanen',
        categoryKey: 'jembatan'
      },
      {
        tier: 'P1',
        badgeClass: 'p1-badge',
        name: 'Areal Banjir / Tergenang',
        criteria: 'Genangan air menutupi piringan & pasar pikul; belum ada action plan',
        sla: '3 Hari',
        volume: '25,0 ha unik',
        actionPlan: 'Tanggul individual, cuci parit kolektor, continuous bund',
        categoryKey: 'areal banjir'
      },
      {
        tier: 'P2',
        badgeClass: 'p2-badge',
        name: 'Pasar Pikul Semak',
        criteria: 'Rintis tertutup gulma pekat; action plan overdue > 5 hari',
        sla: '5 Hari',
        volume: '1,2 km (Divisi 2)',
        actionPlan: 'Semprot pasar pikul borongan / chemist intensif',
        categoryKey: 'pasar pikul semak'
      },
      {
        tier: 'P2',
        badgeClass: 'p2-badge',
        name: 'Gorong-gorong Amblas',
        criteria: 'Drainase tersumbat, aliran air meluap ke badan jalan panen',
        sla: '4 Hari',
        volume: '3 unit (Div 1, 2, 3)',
        actionPlan: 'Pembersihan sedimentasi & pemasangan gorong-gorong baru',
        categoryKey: 'gorong-gorong'
      },
      {
        tier: 'P2',
        badgeClass: 'p2-badge',
        name: 'Titi Panen Kurang / Rusak',
        criteria: 'Pemanen memutar rute; penurunan output tonase per HK',
        sla: '5 Hari',
        volume: '14 unit (Estate TNKE)',
        actionPlan: 'Penambahan titi panen kayu ulin / beton',
        categoryKey: 'titi panen'
      },
      {
        tier: 'P3',
        badgeClass: 'p3-badge',
        name: 'Underpruning',
        criteria: 'Pelepah sengkleh dan buah terjepit; mengganggu efisiensi panen',
        sla: '10 Hari',
        volume: '12.450 pokok',
        actionPlan: 'Penambahan HK pruning / borongan bertahap',
        categoryKey: 'underpruning'
      },
      {
        tier: 'P3',
        badgeClass: 'p3-badge',
        name: 'Gawangan Semak',
        criteria: 'Gulma gulma kelas B menutupi antar pokok; potensi inang hama',
        sla: '7 Hari',
        volume: '89,9 ha',
        actionPlan: 'Semprot gawangan rutin',
        categoryKey: 'gawangan semak'
      },
      {
        tier: 'P4',
        badgeClass: 'p4-badge',
        name: 'Titik Kosong & Sisipan',
        criteria: 'Populasi pokok kurang dari standar SPH; pekerjaan jangka panjang',
        sla: '30 Hari',
        volume: '4.890 pokok',
        actionPlan: 'Sensus pokok sisipan & penanaman ulang',
        categoryKey: 'titik kosong'
      }
    ];

    var html = '';
    priorities.forEach(function (p) {
      html += '<tr>';
      html += '  <td><span class="prob-p-badge ' + p.badgeClass + '">' + p.tier + '</span></td>';
      html += '  <td><strong>' + p.name + '</strong></td>';
      html += '  <td><span style="font-size:11px;color:#475569;">' + p.criteria + '</span></td>';
      html += '  <td><strong style="color:#0F172A;">' + p.sla + '</strong></td>';
      html += '  <td><span style="font-weight:700;color:#DC2626;">' + p.volume + '</span></td>';
      html += '  <td><span style="font-size:11px;color:#1E293B;">' + p.actionPlan + '</span></td>';
      html += '  <td style="text-align:center;">' +
        '<button type="button" class="btn-secondary" style="font-size:10.5px;padding:3px 8px;" ' +
        'onclick="window.SPT_APP.goToProblemTaggingWithFilters({ category: \'' + p.categoryKey + '\', priority: \'' + p.tier + '\' })">' +
        'Detail &rarr;</button></td>';
      html += '</tr>';
    });

    tbody.innerHTML = html;
  }

  function goToProblemTaggingWithFilters(opts) {
    opts = opts || {};
    switchView('tagging', true);

    // Ensure inventory or queue subtab is displayed
    var subtabAllBtn = document.querySelector('[data-subtab="subtabTaggingAll"]');
    if (subtabAllBtn) {
      subtabAllBtn.click();
    }

    if (opts.category) {
      var catSelect = document.getElementById('filterProblem');
      if (catSelect) {
        var found = false;
        for (var i = 0; i < catSelect.options.length; i++) {
          if (catSelect.options[i].text.toLowerCase().indexOf(opts.category.toLowerCase()) !== -1) {
            catSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found && catSelect.options.length > 0) {
          catSelect.value = 'all';
        }
      }
      state.problemFilterCategory = opts.category;
    }

    if (opts.division) {
      state.division = opts.division;
      state.problemFilterDivision = opts.division;
      var estSelect = document.getElementById('estateFilter');
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
    var divSelect = document.getElementById('divisionFilter');
      if (divSelect) divSelect.value = opts.division;
    }

    if (opts.priority) {
      var sensSelect = document.getElementById('filterSensitivity');
      if (sensSelect) {
        sensSelect.value = opts.priority === 'P1' ? 'Major' : 'all';
      }
    }

    try {
      renderActionPlanTable();
    } catch (e) {}

    showToast('Menampilkan data Problem Tagging' + (opts.category ? ' (' + opts.category + ')' : ''));
  }

  function renderProblemDashboardDetail() {
    renderProblemRankingBars();
    renderProblemHeatmapTable();
  }


    function bindAssessmentLegendEvents() {
    var legend = document.getElementById('assessmentLegend');
    if (legend) {
      var items = legend.querySelectorAll('.legend-item');
      items.forEach(function (item) {
        item.addEventListener('click', function () {
          var range = item.getAttribute('data-range');
          if (state.activeLegendFilter === range) {
            state.activeLegendFilter = null;
            item.classList.remove('active-filter');
          } else {
            items.forEach(function (el) { el.classList.remove('active-filter'); });
            state.activeLegendFilter = range;
            item.classList.add('active-filter');
          }
          var statusWrap = document.getElementById('legendFilterStatus');
          var statusText = document.getElementById('legendFilterText');
          if (state.activeLegendFilter) {
            if (statusWrap) statusWrap.style.display = 'flex';
            if (statusText) statusText.textContent = range + '%';
          } else {
            if (statusWrap) statusWrap.style.display = 'none';
          }
          if (state.geoJsonData) {
            renderGeoJsonLayers(state.geoJsonData);
          }
        });
      });
    }
    var btnReset = document.getElementById('btnResetLegendFilter');
    if (btnReset) {
      btnReset.addEventListener('click', function () {
        state.activeLegendFilter = null;
        var legendItems = document.querySelectorAll('.assessment-legend-bar .legend-item');
        legendItems.forEach(function (el) { el.classList.remove('active-filter'); });
        var statusWrap = document.getElementById('legendFilterStatus');
        if (statusWrap) statusWrap.style.display = 'none';
        if (state.geoJsonData) {
          renderGeoJsonLayers(state.geoJsonData);
        }
      });
    }
    var btnCloseDr = document.getElementById('btnCloseDrawer');
    if (btnCloseDr) {
      btnCloseDr.addEventListener('click', closeDrawer);
    }
    var btnFit = document.getElementById('btnFitMapBounds');
    if (btnFit) {
      btnFit.addEventListener('click', function () {
        fitMapToScope(state.mapAssessment || state.mapBccr);
      });
    }
  }
  function selectBlock(estate, divisi, blok, layer) {
    var compositeKey = (estate || 'TNKE') + '|' + (divisi || 'DIVISI 1') + '|' + (blok || 'ALL');
    state.selectedBlockKey = compositeKey;
    state.block = blok;
    state.division = divisi;
    var divSelect = document.getElementById('divisionFilter');
    if (divSelect) divSelect.value = divisi;
    populateBlockFilter();
    var blkSelect = document.getElementById('blockFilter');
    if (blkSelect) blkSelect.value = blok;
    if (state.assessmentGeoJsonLayer) {
      state.assessmentGeoJsonLayer.eachLayer(function (l) {
        state.assessmentGeoJsonLayer.resetStyle(l);
      });
    }
    var targetLayer = layer || (state.featureLayersByKey ? state.featureLayersByKey[compositeKey] : null);
    if (targetLayer) {
      try {
        targetLayer.setStyle({ weight: 3.5, color: '#1D4ED8', fillOpacity: 0.85 });
        var mapEl = state.mapAssessment || state.mapBccr;
        if (mapEl) {
          mapEl.fitBounds(targetLayer.getBounds(), { padding: [50, 260], maxZoom: 15 });
        }
      } catch (e) {}
    }
    if (window.tnkeStore) {
      var data = window.tnkeStore.getBlockData(estate, divisi, blok, state.activeActivityFilter);
      populateDrawer(data);
      openDrawer();
    } else if (window.TNKEAssessmentStore) {
      var data = window.TNKEAssessmentStore.getBlockData(estate, divisi, blok, state.activeActivityFilter);
      populateDrawer(data);
      openDrawer();
    }
    // Update tracking and problem tag pins immediately for the newly clicked block
    renderTrackingLayers();
    renderProblemTagMarkers();
  }
    function populateDrawer(d) {
    if (!d) return;
    var codeEl = document.getElementById('drawerBlockCode');
    var estDivSubEl = document.getElementById('drawerEstateDiv');
    var dBlokCode = document.getElementById('dBlokCode');
    var dEstateDiv = document.getElementById('dEstateDiv');
    var dTotalArea = document.getElementById('dTotalArea');
    var dPeriod = document.getElementById('dPeriod');
    if (codeEl) codeEl.textContent = 'Blok ' + d.blok;
    if (estDivSubEl) estDivSubEl.textContent = d.estate + ' · ' + d.divisi;
    if (dBlokCode) dBlokCode.textContent = d.blok;
    if (dEstateDiv) dEstateDiv.textContent = d.estate + ' / ' + d.divisi;
    if (dTotalArea) dTotalArea.textContent = formatNum(d.totalArea, 1) + ' ha';
    if (dPeriod) dPeriod.textContent = 'September 2026';
    var dProgressPct = document.getElementById('dProgressPct');
    var dStatusBadge = document.getElementById('dStatusBadge');
    var dProgressBarFill = document.getElementById('dProgressBarFill');
    var dAssessedHa = document.getElementById('dAssessedHa');
    var dUnassessedHa = document.getElementById('dUnassessedHa');
    var dLastDate = document.getElementById('dLastDate');
    if (dProgressPct) dProgressPct.textContent = formatNum(d.progressPct, 1) + '%';
    if (dProgressBarFill) dProgressBarFill.style.width = Math.min(100, Math.max(0, d.progressPct)) + '%';
    if (dAssessedHa) dAssessedHa.textContent = formatNum(d.assessedHa, 1) + ' ha';
    if (dUnassessedHa) dUnassessedHa.textContent = formatNum(d.unassessedHa, 1) + ' ha';
    if (dLastDate) dLastDate.textContent = d.lastAssessmentDate || '-';
    if (dStatusBadge) {
      dStatusBadge.textContent = d.statusText;
      dStatusBadge.className = 'status-badge';
      if (d.progressPct === 100) {
        dStatusBadge.classList.add('complete');
      } else if (d.progressPct > 0) {
        dStatusBadge.classList.add('in-progress');
      } else {
        dStatusBadge.classList.add('not-started');
      }
    }
    // Breakdown 5 Kegiatan
    var actWrap = document.getElementById('drawerActivityBreakdownWrap') || document.getElementById('drawerActivityBreakdown');
    if (actWrap) {
      var defaultActsF59 = {
        pengancakan: { observedHa: 8.6, coveragePct: 31.2 },
        ipdPanen: { observedHa: 5.8, coveragePct: 21.0 },
        inspeksiPupuk: { observedHa: 2.8, coveragePct: 10.1 },
        inspeksiUpkeep: { observedHa: 2.6, coveragePct: 9.4 },
        blokChecklist: { observedHa: 2.9, coveragePct: 10.5 }
      };
      var actsData = (d.activities && Object.keys(d.activities).length > 0) ? d.activities : defaultActsF59;
      var aHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:6px;margin-top:6px;">';
      var actList = [
        { key: 'pengancakan', label: 'Pengancakan', color: '#2563EB' },
        { key: 'ipdPanen', label: 'IPD Panen', color: '#059669' },
        { key: 'inspeksiPupuk', label: 'Inspeksi Pemupukan', color: '#7C3AED' },
        { key: 'inspeksiUpkeep', label: 'Inspeksi Upkeep', color: '#D97706' },
        { key: 'blokChecklist', label: 'Blok Checklist', color: '#DC2626' }
      ];
      actList.forEach(function (a) {
        var actData = actsData[a.key] || { observedHa: 0, coveragePct: 0 };
        aHtml += '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-left:3px solid ' + a.color + ';border-radius:6px;padding:6px 8px;font-size:11px;">' +
          '<div style="color:#64748B;font-size:10.5px;font-weight:600;">' + a.label + '</div>' +
          '<div style="font-weight:700;color:#0F172A;font-size:12px;margin-top:2px;">' + formatNum(actData.observedHa, 1) + ' ha</div>' +
          '<div style="font-size:10.5px;color:' + a.color + ';font-weight:600;">' + formatNum(actData.coveragePct, 1) + '% cov</div>' +
          '</div>';
      });
      aHtml += '</div>';
      actWrap.innerHTML = aHtml;
    }
    // Riwayat Observasi Table (Fixed Layout, No Overflow)
    var historyWrap = document.getElementById('drawerHistoryWrap');
    if (historyWrap) {
      if (!d.visits || d.visits.length === 0) {
        historyWrap.innerHTML = '<p class="empty-state-text">Belum ada riwayat observasi pada blok ini.</p>';
      } else {
        var hHtml = '<div class="drawer-history-table-container"><table class="compact-history-table">' +
          '<thead><tr>' +
            '<th style="min-width:88px;width:88px;text-align:left;">Tanggal</th>' +
            '<th style="min-width:96px;width:96px;text-align:left;">Petugas</th>' +
            '<th style="min-width:92px;width:92px;text-align:left;">Kegiatan</th>' +
            '<th style="min-width:48px;width:48px;text-align:right;">Luas</th>' +
            '<th style="min-width:52px;width:52px;text-align:right;">Kum.</th>' +
            '<th style="min-width:48px;width:48px;text-align:right;">Cov %</th>' +
          '</tr></thead><tbody>';
        d.visits.forEach(function (v) {
          var vIsoDate = formatDateIso(v.date);
          var vActNorm = normalizeActivityId(v.activityId || v.activityName);
          var isRowActive = state.selectedTrackingKey === (vIsoDate + '|' + vActNorm);
          var rowClass = isRowActive ? 'active-history-row' : '';
          var rowStyle = isRowActive ? 'background:#EFF6FF;border-left:3px solid #2563EB;cursor:pointer;' : 'cursor:pointer;border-bottom:1px solid #F1F5F9;';
          var staffShort = v.staffName ? v.staffName.replace(' (Asisten Divisi 2)', '').replace(' (Asisten)', '').replace(' (Asis Div 2)', '') : 'Asisten';
          hHtml += '<tr class="' + rowClass + '" style="' + rowStyle + '" onclick="window.SPT_APP.toggleHistoryHighlight(\'' + d.estate + '\', \'' + d.divisi + '\', \'' + d.blok + '\', \'' + v.date + '\', \'' + vActNorm + '\')">' +
            '<td style="white-space:nowrap;font-weight:600;color:#1E293B;">' + v.date + '</td>' +
            '<td style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:96px;" title="' + (v.staffName || 'Asisten') + '">' + staffShort + '</td>' +
            '<td><span class="badge-activity" style="font-size:9.5px;padding:2px 5px;white-space:nowrap;' + (isRowActive ? 'background:#2563EB;color:#FFF;' : '') + '">' + (v.activityName || 'Observasi') + '</span></td>' +
            '<td style="text-align:right;white-space:nowrap;">' + formatNum(v.addHa, 1) + ' ha</td>' +
            '<td style="text-align:right;white-space:nowrap;">' + formatNum(v.cumHa, 1) + ' ha</td>' +
            '<td style="text-align:right;font-weight:700;color:#2563eb;white-space:nowrap;">' + formatNum(v.progressPct, 1) + '%</td>' +
            '</tr>';
        });
        hHtml += '</tbody></table></div>';
        historyWrap.innerHTML = hHtml;
      }
    }
    // Perencanaan Observasi Lanjutan (Jadwal & Target Scheduler)
    var schWrap = document.getElementById('drawerScheduleWrap');
    if (schWrap) {
      if (!state.scheduledSessions) state.scheduledSessions = {};
      var blockSchedules = state.scheduledSessions[d.blok] || [];
      var unassessed = d.unassessedHa || 4.9;
      var sHtml = '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:10px;margin-bottom:8px;">' +
        '<div style="font-size:11px;color:#64748B;margin-bottom:6px;">Target area tersisa: <strong style="color:#0F172A;">' + formatNum(unassessed, 1) + ' ha</strong></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px;">' +
          '<div><label style="font-size:10px;font-weight:700;color:#475569;display:block;">Target (ha):</label><input type="number" id="schTargetHa" value="' + formatNum(unassessed, 1) + '" step="0.5" max="' + unassessed + '" style="width:100%;padding:4px 6px;border:1px solid #CBD5E1;border-radius:4px;font-size:11px;font-weight:700;"></div>' +
          '<div><label style="font-size:10px;font-weight:700;color:#475569;display:block;">Tgl Rencana:</label><input type="date" id="schDateInput" value="2026-10-12" style="width:100%;padding:4px 6px;border:1px solid #CBD5E1;border-radius:4px;font-size:11px;"></div>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">' +
          '<div><label style="font-size:10px;font-weight:700;color:#475569;display:block;">Petugas:</label><select id="schStaffInput" style="width:100%;padding:4px 6px;border:1px solid #CBD5E1;border-radius:4px;font-size:11px;"><option>Hendra Budiono (Asis Div 2)</option><option>Budi Santoso (Asis Div 1)</option><option>Mandor Upkeep TNKE</option></select></div>' +
          '<div><label style="font-size:10px;font-weight:700;color:#475569;display:block;">Kegiatan:</label><select id="schActInput" style="width:100%;padding:4px 6px;border:1px solid #CBD5E1;border-radius:4px;font-size:11px;"><option value="Pengancakan">Pengancakan</option><option value="IPD Panen">IPD Panen</option><option value="Inspeksi Pupuk">Inspeksi Pupuk</option></select></div>' +
        '</div>' +
        '<button type="button" class="btn-primary" onclick="window.SPT_APP.addObservationSchedule(\'' + d.blok + '\')" style="width:100%;background:#2563EB;color:#FFF;border:none;padding:6px;border-radius:6px;font-size:11.5px;font-weight:700;cursor:pointer;">➕ Buat Jadwal &amp; Set Reminder</button>' +
      '</div>';
      if (blockSchedules.length > 0) {
        sHtml += '<div style="margin-top:6px;"><span style="font-size:11px;font-weight:700;color:#334155;">📌 Sesi Terjadwal:</span>';
        blockSchedules.forEach(function (sch) {
          sHtml += '<div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;padding:6px 8px;margin-top:4px;font-size:11px;display:flex;justify-content:space-between;align-items:center;">' +
            '<div><strong>📅 ' + sch.date + '</strong> · ' + sch.staff + '<br/><span style="color:#1E40AF;font-weight:600;">Target: ' + sch.targetHa + ' ha (' + sch.activity + ')</span></div>' +
            '<span style="background:#1E40AF;color:#FFF;padding:2px 6px;border-radius:10px;font-size:10px;font-weight:700;">Terjadwal</span>' +
            '</div>';
        });
        sHtml += '</div>';
      }
      schWrap.innerHTML = sHtml;
    }
    // Tagging Summary & List
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
          var apBadge = apStatus === 'closed' ? '<span style="background:#39A66B;color:#fff;padding:1px 5px;border-radius:3px;font-size:9.5px;font-weight:700;">Closed</span>' :
                       (apStatus === 'on_progress' ? '<span style="background:#F2C94C;color:#000;padding:1px 5px;border-radius:3px;font-size:9.5px;font-weight:700;">On Progress</span>' :
                       '<span style="background:#EF4444;color:#fff;padding:1px 5px;border-radius:3px;font-size:9.5px;font-weight:700;">Belum Ada AP</span>');

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
    }
    // Visitor Reports
    var visWrap = document.getElementById('drawerVisitorWrap');
    if (visWrap) {
      if (!d.visitorReports || d.visitorReports.length === 0) {
        visWrap.innerHTML = '<p class="empty-state-text">Tidak ada laporan visitor menunggu review.</p>';
      } else {
        var vHtml = '<div class="visitor-reports-list">';
        d.visitorReports.forEach(function (vr) {
          vHtml += '<div style="border:1px solid #fed7aa;background:#fff7ed;border-radius:6px;padding:8px;margin-bottom:6px;font-size:12px;">' +
            '<div style="display:flex;justify-content:space-between;font-weight:600;">' +
              '<span>' + vr.visitorName + ' (' + vr.role + ')</span>' +
              '<span style="color:#c2410c;">' + vr.status + '</span>' +
            '</div>' +
            '<div style="margin-top:2px;color:#475569;">' + vr.date + ' · ' + vr.note + '</div>' +
            '</div>';
        });
        vHtml += '</div>';
        visWrap.innerHTML = vHtml;
      }
    }
    // BCCR & Production
    var dBccrPeriod = document.getElementById('dBccrPeriod');
    var dBccrActual = document.getElementById('dBccrActual');
    var dBccrPotency = document.getElementById('dBccrPotency');
    var dBccrPct = document.getElementById('dBccrPct');
    var dBccrGap = document.getElementById('dBccrGap');
    if (dBccrPeriod) dBccrPeriod.textContent = 'Periode: ' + (d.bccrPeriod || 'September 2026');
    if (dBccrActual) dBccrActual.textContent = formatNum(d.actualTon, 0) + ' ton';
    if (dBccrPotency) dBccrPotency.textContent = formatNum(d.potentialTon, 0) + ' ton';
    if (dBccrPct) dBccrPct.textContent = d.potentialTon > 0 ? formatNum(d.bccrPct, 1) + '%' : '—';
    if (dBccrGap) dBccrGap.textContent = d.gapText || '-';
  }
  function openDrawer() {
    var drawer = document.getElementById('blockDetailDrawer');
    if (drawer) {
      drawer.classList.add('open');
      state.isDrawerOpen = true;
    }
  }
  function closeDrawer() {
    var drawer = document.getElementById('blockDetailDrawer');
    if (drawer) {
      drawer.classList.remove('open');
      state.isDrawerOpen = false;
    }
    state.selectedBlockKey = null;
    state.selectedTagId = null;
    state.selectedTrackingKey = null;
    state.block = 'all';
    var blkSelect = document.getElementById('blockFilter');
    if (blkSelect) blkSelect.value = 'all';
    if (state.assessmentGeoJsonLayer) {
      state.assessmentGeoJsonLayer.eachLayer(function (l) {
        state.assessmentGeoJsonLayer.resetStyle(l);
      });
    }
    renderTrackingLayers();
    renderProblemTagMarkers();
  }
  function initApp() {
    // 1. Bind all controls and events FIRST so user interactions never fail
    bindNavigation();
    bindSubtabs();
    bindFilters();
    populateBlockFilter();
    bindMapFullscreenControls();
    bindMapProblemFilters();
    bindMapBccrFilters();
    bindAddFindingWorkflow();
    bindResetManualConfirmModal();
    bindBccrDetailModal();
    bindActionPlanFilters();
    bindActionDrawer();
    bindDocControls();
    bindTrendToggles();
    bindMockExportButtons();
    bindAsesmenControls();
    renderProblemLegendDrawer();
    bindAssessmentLegendEvents();
    // 2. Defensive Render of All Views (isolated try-catch so one widget never breaks another)
    try { renderSummaryDashboardCards(); } catch (e) { console.error('Summary dashboard render error:', e); }
    try { renderDashboardWidgets(); } catch (e) { console.error('Dashboard render error:', e); }
    try { renderBccrMatrix(); } catch (e) { console.error('BCCR matrix render error:', e); }
    try { renderActionPlanTable(); } catch (e) { console.error('Action plan render error:', e); }
    try { renderTrendChart(); } catch (e) { console.error('Trend chart render error:', e); }
    try { renderAnalysisTable(); } catch (e) { console.error('Analysis table render error:', e); }
    try { renderDivisionView(); } catch (e) { console.error('Division view render error:', e); }
    try { renderDocViewer(); } catch (e) { console.error('Doc viewer render error:', e); }
    try { renderAsesmenView(); } catch (e) { console.error('Asesmen view render error:', e); }
    // 3. Read initial URL hash
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    // 4. Read initial URL params for direct state deep-linking
    var params = new URLSearchParams(window.location.search);
    var focusBlk = params.get('focus_block');
    if (focusBlk) {
      state.focusedBlock = focusBlk;
      state.problemFilterBlock = focusBlk;
      state.block = focusBlk;
    }
    // 5. Initialize Leaflet maps immediately
    initMaps();
    if (params.get('fullscreen_problem') === '1') {
      toggleFullscreenProblem(true);
    }
    if (params.get('fullscreen_bccr') === '1') {
      toggleFullscreenBccr(true);
    }
    if (focusBlk) {
      var blkSelect = document.getElementById('blockFilter');
      if (blkSelect) blkSelect.value = focusBlk;
    }
    var openIss = params.get('open_issue');
    if (openIss) {
      setTimeout(function () {
        openActionDrawer(openIss);
      }, 100);
    }
  }
  function handleHashChange() {
    var rawHash = window.location.hash.replace('#', '');
    var hash = rawHash.toLowerCase() || 'dashboard';
    // Hash command flags
    if (hash.indexOf('fullscreen_problem') !== -1) {
      setTimeout(function () { toggleFullscreenProblem(true); }, 200);
    }
    if (hash.indexOf('focus_') !== -1) {
      var blkMatch = rawHash.match(/focus_([A-Za-z0-9\-]+)/);
      if (blkMatch && blkMatch[1]) {
        var blk = blkMatch[1].toUpperCase();
        state.focusedBlock = blk;
        state.problemFilterBlock = blk;
        state.block = blk;
        setTimeout(function () {
          if (state.problemGeoJsonLayer) {
            state.problemGeoJsonLayer.eachLayer(function (layer) {
              var p = layer.feature ? layer.feature.properties : {};
              if (p.blok === blk) {
                focusBlockOnProblemMap(p.divisi, blk, layer.getBounds());
              }
            });
          }
          if (state.bccrGeoJsonLayer) {
            state.bccrGeoJsonLayer.eachLayer(function (layer) {
              var p = layer.feature ? layer.feature.properties : {};
              if (p.blok === blk) {
                state.mapBccr.fitBounds(layer.getBounds(), { maxZoom: 16, padding: [30, 30] });
                updateBccrLabelsVisibility();
              }
            });
          }
        }, 300);
      }
    }
    if (hash.indexOf('issue_') !== -1) {
      var issMatch = rawHash.match(/issue_([A-Za-z0-9\-]+)/);
      if (issMatch && issMatch[1]) {
        setTimeout(function () { openActionDrawer(issMatch[1]); }, 250);
      }
    }
    var validViews = ['dashboard', 'map-coverage', 'mapcoverage', 'map', 'tagging', 'action', 'reports', 'production', 'admin', 'bccr', 'trend', 'analysis', 'division', 'docs', 'asesmen'];
    var targetView = 'dashboard';
    validViews.forEach(function (v) {
      if (hash.indexOf(v) !== -1) targetView = v;
    });
    if (targetView === 'map-coverage' || targetView === 'mapcoverage' || targetView === 'map') {
      targetView = 'mapCoverage';
    }
    switchView(targetView, false);
  }
  function fitMapToScope(mapInstance) {
    var mapEl = mapInstance || state.mapAssessment || state.mapBccr || state.mapProblem;
    if (!mapEl) return;
    try {
      if (typeof mapEl.invalidateSize === 'function') {
        mapEl.invalidateSize();
      }
      // 1. Specific block selected (not 'all')
      if (state.block && state.block !== 'all') {
        var key = (state.estate || 'TNKE') + '|' + (state.division || 'DIVISI 1') + '|' + state.block;
        var targetL = state.featureLayersByKey ? state.featureLayersByKey[key] : null;
        if (!targetL && state.featureLayersByKey) {
          Object.keys(state.featureLayersByKey).forEach(function (k) {
            if (k.indexOf('|' + state.block) >= 0) {
              targetL = state.featureLayersByKey[k];
            }
          });
        }
        if (targetL && targetL.getBounds) {
          mapEl.fitBounds(targetL.getBounds(), {
            paddingTopLeft: [50, 50],
            paddingBottomRight: [state.isDrawerOpen ? 320 : 50, 50],
            maxZoom: 16
          });
          return;
        }
      }
      // 2. Specific division selected (not 'all')
      if (state.division && state.division !== 'all') {
        var divBounds = L.latLngBounds([]);
        if (state.featureLayersByKey && Object.keys(state.featureLayersByKey).length > 0) {
          Object.keys(state.featureLayersByKey).forEach(function (k) {
            if (k.indexOf('|' + state.division + '|') >= 0 && state.featureLayersByKey[k].getBounds) {
              divBounds.extend(state.featureLayersByKey[k].getBounds());
            }
          });
        }
        if (!divBounds.isValid() && window.TNKE_GEOJSON && window.TNKE_GEOJSON.features) {
          window.TNKE_GEOJSON.features.forEach(function (feat) {
            if (feat.properties && feat.properties.divisi === state.division) {
              var tempL = L.geoJSON(feat);
              if (tempL.getBounds().isValid()) {
                divBounds.extend(tempL.getBounds());
              }
            }
          });
        }
        if (divBounds.isValid()) {
          mapEl.fitBounds(divBounds, { padding: [30, 30] });
          return;
        }
      }
      // 3. Estate level / All Division / All Block -> Fit entire Estate GeoJSON Layer
      if (state.assessmentGeoJsonLayer && state.assessmentGeoJsonLayer.getBounds) {
        var bounds = state.assessmentGeoJsonLayer.getBounds();
        if (bounds.isValid()) {
          mapEl.fitBounds(bounds, { padding: [25, 25] });
          return;
        }
      }
      if (window.TNKE_GEOJSON && window.TNKE_GEOJSON.features) {
        var tempL = L.geoJSON(window.TNKE_GEOJSON);
        if (tempL.getBounds().isValid()) {
          mapEl.fitBounds(tempL.getBounds(), { padding: [25, 25] });
        }
      }
    } catch (err) {
      console.warn('fitMapToScope error:', err);
    }
  }
  function switchView(viewName, updateHash) {
    // Map legacy shortcuts/aliases to main menus and subtabs
    var viewAliases = {
      map: { main: 'mapCoverage' },
      'map-coverage': { main: 'mapCoverage' },
      mapCoverage: { main: 'mapCoverage' },
      bccr: { main: 'production', subtab: 'subtabProdBccr' },
      trend: { main: 'production', subtab: 'subtabProdYield' },
      analysis: { main: 'production', subtab: 'subtabProdAnalysis' },
      division: { main: 'reports', subtab: 'subtabReportsDivision' },
      docs: { main: 'action', subtab: 'subtabActionDocs' },
      asesmen: { main: 'tagging', subtab: 'subtabTaggingAsesmen' }
    };
    var activeMain = viewName;
    var targetSubtab = null;
    if (viewAliases[viewName]) {
      activeMain = viewAliases[viewName].main;
      targetSubtab = viewAliases[viewName].subtab;
    }
    if (viewName === 'dashboard' && !targetSubtab) {
      targetSubtab = state.activeObsTab || 'kegiatanDivisi';
    }
    state.currentView = activeMain;
    if (updateHash !== false) {
      window.location.hash = activeMain === 'mapCoverage' ? '#map-coverage' : ('#' + viewName);
    }
    // Update active navbar
    var navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    navItems.forEach(function (btn) {
      var dView = btn.getAttribute('data-view');
      if (dView === activeMain || (activeMain === 'mapCoverage' && (dView === 'mapCoverage' || dView === 'map'))) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    // Update active view panel
    var panels = document.querySelectorAll('.view-panel');
    panels.forEach(function (panel) {
      panel.classList.remove('active-view');
    });
    var targetPanelId = 'view' + activeMain.charAt(0).toUpperCase() + activeMain.slice(1);
    var targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
      targetPanel.classList.add('active-view');
    }
    // Invalidate and fit map if switching to standalone Map & Coverage view
    if (activeMain === 'mapCoverage') {
      setTimeout(function () {
        if (state.mapAssessment) {
          state.mapAssessment.invalidateSize();
          fitMapToScope(state.mapAssessment);
        }
      }, 80);
    }
    // Switch Observasi tabs if on Dashboard
    if (activeMain === 'dashboard' && targetSubtab) {
      switchObsTab(targetSubtab);
    }
    // Switch subtab inside the active panel if present
    if (targetPanel) {
      var bar = targetPanel.querySelector('.view-subtabs-bar');
      if (bar) {
        var subtabBtns = bar.querySelectorAll('.subtab-btn');
        var matchingBtn = null;
        if (targetSubtab) {
          matchingBtn = bar.querySelector('[data-subtab="' + targetSubtab + '"]');
        }
        if (!matchingBtn && subtabBtns.length > 0) {
          matchingBtn = subtabBtns[0];
          targetSubtab = matchingBtn.getAttribute('data-subtab');
        }
        if (matchingBtn) {
          subtabBtns.forEach(function (b) { b.classList.remove('active'); });
          matchingBtn.classList.add('active');
          targetPanel.querySelectorAll('.subtab-content').forEach(function (content) {
            content.style.display = content.id === targetSubtab ? 'block' : 'none';
          });
        }
      }
    }
    // Update Breadcrumb and Header Title
    var crumb = document.getElementById('headerCrumb');
    var title = document.getElementById('pageTitle');
    var titles = {
      dashboard: { crumb: (state.estate || 'TNKE') + ' ESTATE · RINGKASAN OPERASIONAL', title: 'Dashboard' },
      mapCoverage: { crumb: (state.estate || 'TNKE') + ' ESTATE · VISUALISASI MAP & COVERAGE', title: 'Map & Coverage Observasi' },
      'map-coverage': { crumb: (state.estate || 'TNKE') + ' ESTATE · VISUALISASI MAP & COVERAGE', title: 'Map & Coverage Observasi' },
      map: { crumb: (state.estate || 'TNKE') + ' ESTATE · VISUALISASI MAP & COVERAGE', title: 'Map & Coverage Observasi' },
      tagging: { crumb: 'VERIFIKASI & MONITORING · PROBLEM TAGGING', title: 'Problem Tagging & Antrean Verifikasi' },
      action: { crumb: 'OPERASIONAL · ACTION PLAN MANAGEMENT', title: 'Perencanaan, Realisasi & Verifikasi Action Plan' },
      reports: { crumb: 'ANALITIK & REKAPITULASI · REPORTS & ANALYTICS', title: 'Laporan Komprehensif & Analisis Tren Masalah' },
      production: { crumb: 'PRODUKSI & KINERJA · PRODUCTION & BCCR LINKAGE', title: 'Kinerja Produksi, BCCR & Proyeksi Pemulihan' },
      admin: { crumb: 'PENGATURAN SISTEM · ADMINISTRATION', title: 'Master Data Standar & Integrasi Sistem' },
      // Aliases
      bccr: { crumb: 'PRODUKSI & KINERJA · REKAP BCCR', title: 'Rekap Distribusi BCCR YTD' },
      trend: { crumb: 'PRODUKSI · TIMELINE 24 BULAN', title: 'Trend Produksi & Proyeksi' },
      analysis: { crumb: 'AGRONOMI · ANALISA BLOK', title: 'Detail Analisa BCCR & Rotasi' },
      division: { crumb: 'REPORTS & ANALYTICS · KOMPARASI DIVISI', title: 'Rekap Pekerjaan per Divisi' },
      docs: { crumb: 'ACTION PLAN · DOKUMENTASI LAPANGAN', title: 'Dokumentasi Sebelum vs Sesudah' },
      asesmen: { crumb: 'PROBLEM TAGGING · ASESMEN BLOK', title: 'Asesmen Blok & Pasar Pikul' }
    };
    if (titles[viewName] || titles[activeMain]) {
      var info = titles[viewName] || titles[activeMain];
      if (crumb) crumb.textContent = info.crumb;
      if (title) title.textContent = info.title;
    }
    // Toggle header filter items for Block & Activity when on Dashboard vs Map & Coverage
    var blkFilterEl = document.getElementById('blockFilter');
    var actFilterEl = document.getElementById('activityFilter');
    var blkItem = blkFilterEl ? blkFilterEl.closest('.filter-item') : null;
    var actItem = actFilterEl ? actFilterEl.closest('.filter-item') : null;
    if (activeMain === 'dashboard') {
      if (blkItem) blkItem.style.display = 'none';
      if (actItem) actItem.style.display = 'none';
    } else {
      if (blkItem) blkItem.style.display = '';
      if (actItem) actItem.style.display = '';
    }
    // Render / refresh view data if needed
    if (activeMain === 'dashboard') {
      try { renderSummaryDashboardCards(); } catch (e) { }
    }
    if (activeMain === 'tagging' || viewName === 'asesmen') {
      try { renderAsesmenView(); } catch (e) { }
    }
    if (activeMain === 'reports' || viewName === 'division') {
      try { renderDivisionView(); } catch (e) { }
    }
    if (activeMain === 'production') {
      try { renderBccrMatrix(); } catch (e) { }
      try { renderAnalysisTable(); } catch (e) { }
      if (window.SPT_YIELD && window.SPT_YIELD.renderTrendTimeline) {
        try { window.SPT_YIELD.renderTrendTimeline(state.block || 'S-28'); } catch (e) { }
      }
    }
    // Trigger Leaflet invalidateSize when switching back to dashboard or map views
    if (activeMain === 'dashboard' || activeMain === 'mapCoverage' || activeMain === 'map') {
      setTimeout(function () {
        if (state.mapAssessment) state.mapAssessment.invalidateSize();
        if (state.mapProblem) state.mapProblem.invalidateSize();
        // mapBCCR lives inside subtabMapBccr – invalidate only if that subtab is active
        var mapBccrEl = document.getElementById('subtabMapBccr');
        if (state.mapBccr && mapBccrEl && mapBccrEl.style.display !== 'none') {
          state.mapBccr.invalidateSize();
        }
      }, 150);
    }
  }
  function bindSubtabs() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.subtab-btn');
      if (!btn) return;
      var bar = btn.closest('.view-subtabs-bar');
      var container = btn.closest('.view-panel');
      if (!bar || !container) return;
      var targetId = btn.getAttribute('data-subtab');
      bar.querySelectorAll('.subtab-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      // Dashboard: Coverage Bulanan <-> Aktivitas Harian (wrappers are not .subtab-content)
      if (btn.id === 'subtabCoverageBulanan' || btn.id === 'subtabAktivitasHarian') {
        var isDaily = btn.id === 'subtabAktivitasHarian';
        var wMonthly = document.getElementById('wrapperCoverageBulanan');
        var wDaily = document.getElementById('wrapperAktivitasHarian');
        if (wMonthly) wMonthly.style.display = isDaily ? 'none' : 'flex';
        if (wDaily) wDaily.style.display = isDaily ? 'flex' : 'none';
        if (isDaily) {
          try { renderDailyActivityView(); } catch (err) { console.error('renderDailyActivityView failed:', err); }
        } else {
          setTimeout(function () { if (state.mapAssessment) state.mapAssessment.invalidateSize(); }, 60);
        }
        return;
      }
      container.querySelectorAll('.subtab-content').forEach(function (panel) {
        panel.style.display = panel.id === targetId ? 'block' : 'none';
      });
      // Special re-renders when switching subtabs
      if (targetId === 'subtabProdYield' && window.SPT_YIELD && window.SPT_YIELD.renderTrendTimeline) {
        setTimeout(function () { window.SPT_YIELD.renderTrendTimeline(state.block || 'S-28'); }, 60);
      }
      if (targetId === 'subtabProdBccr') {
        setTimeout(function () { renderBccrMatrix(); }, 60);
      }
      if (targetId === 'subtabProdAnalysis') {
        setTimeout(function () { renderAnalysisTable(); }, 60);
      }
      if (targetId === 'subtabTaggingAsesmen') {
        setTimeout(function () { renderAsesmenView(); }, 60);
      }
      if (targetId === 'subtabTaggingAll') {
        setTimeout(function () { renderActionPlanTable(); }, 60);
      }
      if (targetId === 'subtabReportsDivision') {
        setTimeout(function () { renderDivisionView(); }, 60);
      }
      if (targetId === 'subtabReportsSummary') {
        setTimeout(function () { renderReportSummary && renderReportSummary(); }, 60);
      }
      if (targetId === 'subtabActionDocs') {
        setTimeout(function () { renderDocViewer(); }, 60);
      }
      if (targetId === 'subtabActionList') {
        setTimeout(function () { renderActionPlanTable(); }, 60);
      }
      if (targetId === 'subtabMapBccr') {
        setTimeout(function () {
          if (state.mapBccr) { state.mapBccr.invalidateSize(); }
        }, 150);
      }
    });
  }
  function bindNavigation() {
    var navBtns = document.querySelectorAll('[data-view]');
    navBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetView = btn.getAttribute('data-view');
        if (targetView) {
          switchView(targetView, true);
        }
      });
    });
  }
  function getBlockDivisi(blok) {
    if (window.TNKE_GEOJSON && window.TNKE_GEOJSON.features) {
      for (var i = 0; i < window.TNKE_GEOJSON.features.length; i++) {
        var p = window.TNKE_GEOJSON.features[i].properties;
        if (p && p.blok === blok) return p.divisi || 'DIVISI 1';
      }
    }
    return 'DIVISI 1';
  }
  function bindFilters() {
    var actFilter = document.getElementById('activityFilter');
    if (actFilter) {
      actFilter.addEventListener('change', function () {
        state.activeActivityFilter = actFilter.value;
        if (state.geoJsonData) {
          renderGeoJsonLayers(state.geoJsonData);
        }
        updateAssessmentSummaryCards();
        renderDailyActivityView();
      });
    }
    var dStaffFilter = document.getElementById('dailyStaffFilter');
    if (dStaffFilter) {
      dStaffFilter.addEventListener('change', function () { renderDailyActivityView(); });
    }
    var dDateFilter = document.getElementById('dailyDateFilter');
    if (dDateFilter) {
      dDateFilter.addEventListener('change', function () { renderDailyActivityView(); });
    }
    var divSelect = document.getElementById('divisionFilter');
    var blkSelect = document.getElementById('blockFilter');
    var periodSelect = document.getElementById('periodFilter');
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
    if (divSelect) {
      divSelect.value = state.division;
      divSelect.addEventListener('change', function () {
        state.division = divSelect.value;
        state.block = 'all';
        populateBlockFilter();
        onFilterChanged();
      });
    }
    if (blkSelect) {
      blkSelect.addEventListener('change', function () {
        state.block = blkSelect.value;
        onFilterChanged();
        if (state.block !== 'all') {
          var div = state.division !== 'all' ? state.division : getBlockDivisi(state.block);
          selectBlock(state.estate, div, state.block);
        }
      });
    }
    if (periodSelect) {
      periodSelect.addEventListener('change', function () {
        state.period = periodSelect.value;
        onFilterChanged();
      });
    }
    var btnGoDetail = document.getElementById('btnGoToMapCoverage');
    if (btnGoDetail) {
      btnGoDetail.addEventListener('click', function () {
        var actFilterEl = document.getElementById('activityFilter');
        if (actFilterEl) {
          actFilterEl.value = 'all';
          state.activeActivityFilter = 'all';
        }
        switchView('mapCoverage', true);
        var btnCoverage = document.getElementById('subtabCoverageBulanan');
        if (btnCoverage) {
          btnCoverage.click();
        }
        if (state.block !== 'all') {
          state.block = 'all';
          var blkSel = document.getElementById('blockFilter');
          if (blkSel) blkSel.value = 'all';
        }
        onFilterChanged();
        fitMapToScope(state.mapAssessment || state.mapBccr);
      });
    }
  }
    function populateBlockFilter() {
    var blkSelect = document.getElementById('blockFilter');
    if (!blkSelect) return;
    var currentVal = state.block;
    blkSelect.innerHTML = '<option value="all">All</option>';
    if (!window.TNKE_GEOJSON || !window.TNKE_GEOJSON.features) return;
    var uniqueBloks = {};
    window.TNKE_GEOJSON.features.forEach(function (feat) {
      var p = feat.properties || {};
      var div = p.divisi || 'DIVISI 1';
      var blk = p.blok || 'ALL';
      if (state.division !== 'all' && div !== state.division) return;
      if (!uniqueBloks[blk]) {
        uniqueBloks[blk] = div;
      }
    });
    var sortedBloks = Object.keys(uniqueBloks).sort(function (a, b) {
      return a.localeCompare(b, undefined, { numeric: true });
    });
    sortedBloks.forEach(function (blk) {
      var opt = document.createElement('option');
      opt.value = blk;
      opt.textContent = blk + ' (' + uniqueBloks[blk] + ')';
      blkSelect.appendChild(opt);
    });
    if (sortedBloks.indexOf(currentVal) !== -1) {
      blkSelect.value = currentVal;
    } else {
      blkSelect.value = 'all';
      state.block = 'all';
    }
  }
  function onFilterChanged() {
    updateAssessmentSummaryCards();
    renderSummaryDashboardCards();
    if (state.geoJsonData) {
      renderGeoJsonLayers(state.geoJsonData);
    }
    if (state.isDrawerOpen && state.selectedBlockKey) {
      var parts = state.selectedBlockKey.split('|');
      var selDiv = parts[1];
      var selBlk = parts[2];
      if ((state.division !== 'all' && selDiv !== state.division) || (state.block !== 'all' && selBlk !== state.block)) {
        closeDrawer();
      }
    }
    if (state.currentView === 'mapCoverage' || state.currentView === 'map') {
      fitMapToScope(state.mapAssessment || state.mapBccr);
    }
  }
  // =========================================================================
  // VIEW 1: DASHBOARD RENDERING
  // =========================================================================
  function getFilteredBlocks() {
    var all = window.SPT_DATA.ALL_BLOCKS || [];
    if (state.division === 'all' && state.block === 'all') return all;
    if (state.division !== 'all' && state.block === 'all') {
      return all.filter(function (b) { return b.divisi === state.division; });
    }
    if (state.block !== 'all') {
      return all.filter(function (b) { return b.blok === state.block; });
    }
    return all;
  }
  function getFilteredIssues() {
    var all = (state.allFindings && state.allFindings.length > 0)
      ? state.allFindings
      : (window.SPT_DATA ? window.SPT_DATA.ACTION_PLANS || [] : []);
    if (state.division === 'all' && state.block === 'all') return all;
    if (state.division !== 'all' && state.block === 'all') {
      return all.filter(function (iss) { return iss.divisi === state.division; });
    }
    if (state.block !== 'all') {
      return all.filter(function (iss) { return iss.blok === state.block; });
    }
    return all;
  }
  function renderDashboardWidgets() {
    if (!window.SPT_DATA) return;
    var blocks = getFilteredBlocks();
    var issues = getFilteredIssues();
    // 1. Calculate Aggregate KPIs
    var totalActual = 0;
    var totalPotency = 0;
    var totalLuas = 0;
    blocks.forEach(function (b) {
      totalActual += b.actualYTD * b.luas;
      totalPotency += b.potencyYTD * b.luas;
      totalLuas += b.luas;
    });
    var avgActual = totalLuas > 0 ? totalActual / totalLuas : 0;
    var avgPotency = totalLuas > 0 ? totalPotency / totalLuas : 0;
    var bccrPct = avgPotency > 0 ? (avgActual / avgPotency) * 100 : 0;
    var gapVal = avgActual - avgPotency;
    var openCount = issues.filter(function (i) { return i.status !== 'Selesai'; }).length;
    var overdueCount = issues.filter(function (i) { return i.overdue; }).length;
    var verifiedProgressSum = 0;
    issues.forEach(function (i) {
      verifiedProgressSum += i.progress;
    });
    var avgActionProgress = issues.length > 0 ? verifiedProgressSum / issues.length : 100;
    // Update Top 4 Cards
    var bccrValEl = document.getElementById('kpiBccrValue');
    var bccrBadgeEl = document.getElementById('kpiBccrBadge');
    var bccrSubEl = document.getElementById('kpiBccrSubtext');
    var bccrGaugeEl = document.getElementById('bccrGaugePath');
    if (bccrValEl) bccrValEl.textContent = formatNum(bccrPct, 1) + '%';
    if (bccrBadgeEl) {
      bccrBadgeEl.textContent = window.SPT_DATA.getBCCRLegendLabel(bccrPct);
      bccrBadgeEl.style.backgroundColor = window.SPT_DATA.getBCCRColor(bccrPct);
      bccrBadgeEl.style.color = (bccrPct >= 80 && bccrPct < 90) || (bccrPct >= 70 && bccrPct < 80) ? '#000' : '#fff';
    }
    if (bccrSubEl) {
      bccrSubEl.textContent = 'Gap: ' + (gapVal >= 0 ? '+' : '') + formatNum(gapVal, 2) + ' ton/ha vs potensi';
    }
    if (bccrGaugeEl) {
      var dash = Math.min(100, Math.max(0, bccrPct));
      bccrGaugeEl.setAttribute('stroke-dasharray', dash + ', 100');
      bccrGaugeEl.setAttribute('stroke', window.SPT_DATA.getBCCRColor(bccrPct));
    }
    var actualEl = document.getElementById('kpiActualValue');
    var potencyEl = document.getElementById('kpiPotencyValue');
    if (actualEl) actualEl.textContent = formatNum(avgActual, 2);
    if (potencyEl) potencyEl.textContent = formatNum(avgPotency, 2);
    var openEl = document.getElementById('kpiOpenIssuesValue');
    var overdueEl = document.getElementById('kpiOverdueBadge');
    if (openEl) openEl.textContent = openCount;
    if (overdueEl) {
      overdueEl.textContent = overdueCount + ' Overdue';
      overdueEl.style.display = overdueCount > 0 ? 'inline-block' : 'none';
    }
    var actionEl = document.getElementById('kpiActionValue');
    if (actionEl) actionEl.textContent = formatNum(avgActionProgress, 1) + '%';
    // 2. Action Plan Prioritas (Ranked Horizontal Bars)
    renderActionPriorityList(issues);
    // 3. YPH YTD 3-Year Comparison
    renderYphComparison(avgActual);
    // 4. Permasalahan Utama (Top Issues)
    renderTopIssuesList(issues);
    // 5. Mini Production Outlook Chart
    renderMiniOutlookChart();
  }
  function renderActionPriorityList(issues) {
    var container = document.getElementById('actionPriorityList');
    if (!container || !window.SPT_DATA) return;
    // Group issues by Problem and compute progress
    var map = {};
    issues.forEach(function (iss) {
      if (!map[iss.problem]) {
        map[iss.problem] = {
          problem: iss.problem,
          unit: iss.unit,
          count: 0,
          totalProgress: 0,
          volInv: 0,
          volReal: 0,
          sensitivity: iss.sensitivity
        };
      }
      map[iss.problem].count += 1;
      map[iss.problem].totalProgress += iss.progress;
      map[iss.problem].volInv += iss.volumeInventarisasi;
      map[iss.problem].volReal += iss.realisasiTerverifikasi;
    });
    var list = Object.values(map);
    list.sort(function (a, b) {
      // Prioritize Major then lower progress
      if (a.sensitivity === 'Major' && b.sensitivity !== 'Major') return -1;
      if (a.sensitivity !== 'Major' && b.sensitivity === 'Major') return 1;
      return (a.totalProgress / a.count) - (b.totalProgress / b.count);
    });
    var html = '';
    list.slice(0, 5).forEach(function (item) {
      var avgProg = Math.round(item.totalProgress / item.count);
      var progClass = avgProg >= 80 ? 'high' : (avgProg >= 60 ? 'mid' : '');
      html += '<div class="priority-action-row">' +
        '<div class="action-row-meta">' +
          '<span class="action-name" title="' + item.problem + '">' + item.problem + '</span>' +
          '<span class="action-vol">' + formatNum(item.volReal, 0) + ' / ' + formatNum(item.volInv, 0) + ' ' + item.unit + ' (' + avgProg + '%)</span>' +
        '</div>' +
        '<div class="bar-track">' +
          '<div class="bar-progress ' + progClass + '" style="width: ' + avgProg + '%"></div>' +
        '</div>' +
      '</div>';
    });
    if (list.length === 0) {
      html = '<div style="padding:10px;text-align:center;color:var(--text-muted);font-size:11px;">Tidak ada temuan aktif pada filter ini.</div>';
    }
    container.innerHTML = html;
  }
  function renderYphComparison(currentActual) {
    var container = document.getElementById('yphComparisonChart');
    if (!container) return;
    // 3-Year Cut-off comparison: 2024, 2025, 2026
    var data = [
      { year: '2024 (Agu)', val: 16.4, color: '#9CA3AF' },
      { year: '2025 (Agu)', val: 17.1, color: '#6B7280' },
      { year: '2026 (Agu)', val: currentActual || 18.2, color: '#C90016' }
    ];
    var maxVal = 24.0;
    var svg = '<svg width="100%" height="100%" viewBox="0 0 280 110" preserveAspectRatio="none">';
    svg += '<line x1="20" y1="90" x2="265" y2="90" stroke="#E5E7EB" stroke-width="1"/>';
    svg += '<line x1="20" y1="50" x2="265" y2="50" stroke="#F3F4F6" stroke-dasharray="3,3" stroke-width="1"/>';
    svg += '<text x="18" y="52" fill="#9CA3AF" font-size="8" text-anchor="end">12</text>';
    svg += '<text x="18" y="15" fill="#9CA3AF" font-size="8" text-anchor="end">24</text>';
    var barWidth = 42;
    var spacing = 80;
    data.forEach(function (d, i) {
      var x = 40 + (i * spacing);
      var h = (d.val / maxVal) * 75;
      var y = 90 - h;
      svg += '<rect x="' + x + '" y="' + y + '" width="' + barWidth + '" height="' + h + '" fill="' + d.color + '" rx="3"/>';
      svg += '<text x="' + (x + barWidth / 2) + '" y="' + (y - 4) + '" fill="#1F2937" font-size="9.5" font-weight="700" text-anchor="middle">' + formatNum(d.val, 1) + '</text>';
      svg += '<text x="' + (x + barWidth / 2) + '" y="102" fill="#4B5563" font-size="9" font-weight="600" text-anchor="middle">' + d.year + '</text>';
    });
    svg += '</svg>';
    container.innerHTML = svg;
  }
  function renderTopIssuesList(issues) {
    var container = document.getElementById('dashboardTopIssues');
    if (!container) return;
    // Filter open, sort by Overdue, then Major
    var openIssues = issues.filter(function (i) { return i.status !== 'Selesai'; });
    openIssues.sort(function (a, b) {
      if (a.overdue && !b.overdue) return -1;
      if (!a.overdue && b.overdue) return 1;
      if (a.sensitivity === 'Major' && b.sensitivity !== 'Major') return -1;
      if (a.sensitivity !== 'Major' && b.sensitivity === 'Major') return 1;
      return 0;
    });
    var html = '';
    openIssues.slice(0, 5).forEach(function (iss) {
      var badgeClass = iss.sensitivity === 'Major' ? 'issue-badge-major' : 'issue-badge-minor';
      html += '<div class="issue-compact-item" data-id="' + iss.id + '">' +
        '<div class="issue-left">' +
          '<span class="' + badgeClass + '">' + iss.sensitivity + '</span>' +
          '<div class="issue-info">' +
            '<span class="issue-name" title="' + iss.problem + '">' + iss.problem + '</span>' +
            '<span class="issue-loc">' + iss.divisi + ' · Blok ' + iss.blok + ' (' + iss.volumeInventarisasi + ' ' + iss.unit + ')</span>' +
          '</div>' +
        '</div>' +
        '<div class="issue-right">' +
          (iss.overdue ? '<span class="badge-overdue-sm">Overdue</span>' : '') +
          '<span style="font-size:10px;font-weight:700;color:var(--text-secondary);">' + iss.progress + '%</span>' +
        '</div>' +
      '</div>';
    });
    if (openIssues.length === 0) {
      html = '<div style="padding:10px;text-align:center;color:var(--text-muted);font-size:11px;">Tidak ada temuan terbuka.</div>';
    }
    container.innerHTML = html;
    // Bind click to open drawer
    var items = container.querySelectorAll('.issue-compact-item');
    items.forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.getAttribute('data-id');
        openActionDrawer(id);
      });
    });
  }
  function renderMiniOutlookChart() {
    var container = document.getElementById('miniOutlookChart');
    if (!container) return;
    var yieldData = (window.SPT_YIELD && window.SPT_YIELD.getYieldTimeline)
      ? window.SPT_YIELD.getYieldTimeline(state.division, state.block)
      : null;
    var timeline = yieldData ? yieldData.timeline : [];
    if (!timeline || timeline.length === 0) return;
    var bccrVal = yieldData.cutoffBccr || 0;
    var bccrColor = (window.SPT_DATA && window.SPT_DATA.getBCCRColor) ? window.SPT_DATA.getBCCRColor(bccrVal) : '#339966';
    var bccrTextColor = (bccrVal >= 70 && bccrVal < 90) ? '#0F172A' : '#FFFFFF';
    var allVals = [];
    timeline.forEach(function (pt) {
      if (pt.actualMoving !== null) allVals.push(pt.actualMoving);
      if (pt.projectionMoving !== null) allVals.push(pt.projectionMoving);
      if (pt.potencyMoving !== null) allVals.push(pt.potencyMoving);
    });
    var dataMin = allVals.length > 0 ? Math.min.apply(null, allVals) : 16.0;
    var dataMax = allVals.length > 0 ? Math.max.apply(null, allVals) : 32.0;
    var minVal = Math.max(0, Math.floor((dataMin - 1.5) / 4) * 4);
    if (minVal > 12.0) minVal = 12.0;
    var maxVal = Math.max(32.0, Math.ceil((dataMax + 1.5) / 4) * 4);
    var w = 310;
    var h = 94;
    var padLeft = 24;
    var padRight = 8;
    var padBottom = 16;
    var padTop = 6;
    var chartW = w - padLeft - padRight;
    var chartH = h - padBottom - padTop;
    function clampMiniY(val) {
      var y = padTop + chartH - (((val - minVal) / (maxVal - minVal)) * chartH);
      return Math.max(padTop, Math.min(padTop + chartH, y));
    }
    var svg = '<svg width="100%" height="100%" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">';
    // Grid Lines
    var gridVals = [];
    for (var g = minVal; g <= maxVal; g += 4) {
      gridVals.push(g);
    }
    gridVals.forEach(function (gVal) {
      var gY = clampMiniY(gVal);
      svg += '<line x1="' + padLeft + '" y1="' + gY + '" x2="' + (w - padRight) + '" y2="' + gY + '" stroke="#E2E8F0" stroke-width="0.8"/>';
      svg += '<text x="' + (padLeft - 3) + '" y="' + (gY + 2.5) + '" fill="#94A3B8" font-size="6.5" font-weight="600" text-anchor="end">' + gVal + '</text>';
    });
    var step = chartW / (timeline.length - 1);
    var cutoffX = padLeft + (11 * step);
    // Shaded regions
    var synthW = 4 * step; // Aug 25 - Dec 25
    svg += '<rect x="' + padLeft + '" y="' + padTop + '" width="' + synthW + '" height="' + chartH + '" fill="rgba(100, 116, 139, 0.04)"/>';
    svg += '<rect x="' + cutoffX + '" y="' + padTop + '" width="' + (chartW - (11 * step)) + '" height="' + chartH + '" fill="rgba(245, 158, 11, 0.08)"/>';
    var actPoints = [];
    var prjPoints = [];
    var potPoints = [];
    timeline.forEach(function (pt, i) {
      var x = padLeft + (i * step);
      var potY = clampMiniY(pt.potencyMoving);
      potPoints.push(x + ',' + potY);
      if (pt.actualMoving !== null) {
        var actY = clampMiniY(pt.actualMoving);
        actPoints.push(x + ',' + actY);
        if (pt.isCutoff) {
          prjPoints.push(x + ',' + actY);
        }
      } else if (pt.projectionMoving !== null) {
        var prjY = clampMiniY(pt.projectionMoving);
        prjPoints.push(x + ',' + prjY);
      }
    });
    // Polylines
    svg += '<polyline points="' + potPoints.join(' ') + '" fill="none" stroke="#64748B" stroke-width="1.5"/>';
    svg += '<polyline points="' + actPoints.join(' ') + '" fill="none" stroke="#C90016" stroke-width="2.2"/>';
    svg += '<polyline points="' + prjPoints.join(' ') + '" fill="none" stroke="#F59E0B" stroke-width="2.2" stroke-dasharray="3.5,2.5"/>';
    // Cut-off Vertical Line
    svg += '<line x1="' + cutoffX + '" y1="' + padTop + '" x2="' + cutoffX + '" y2="' + (chartH + padTop) + '" stroke="#111827" stroke-width="1.4" stroke-dasharray="2.5,2"/>';
    // Interactive Dots
    timeline.forEach(function (pt, i) {
      var x = padLeft + (i * step);
      if (pt.actualMoving !== null) {
        var actY = clampMiniY(pt.actualMoving);
        var isSynth = pt.provenance === 'syntheticHistorical';
        var r = pt.isCutoff ? 4.5 : (isSynth ? 2.5 : 3.0);
        var fill = pt.isCutoff ? '#C90016' : (isSynth ? '#F8FAFC' : '#C90016');
        var stroke = pt.isCutoff ? '#FDE047' : (isSynth ? '#64748B' : '#FFFFFF');
        var strokeW = pt.isCutoff ? 2.0 : (isSynth ? 1.2 : 1.0);
        svg += '<circle cx="' + x + '" cy="' + actY + '" r="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + strokeW + '" style="cursor:pointer;">' +
          '<title>' + pt.monthLabel + ' (' + pt.monthKey + ')\nActual Moving: ' + formatNum(pt.actualMoving, 2) + ' Ton/Ha\nPotensi: ' + formatNum(pt.potencyMoving, 2) + ' Ton/Ha\nBCCR: ' + formatNum(pt.bccrRatio, 2) + '%\nAsal: ' + pt.provenanceLabel + '</title>' +
        '</circle>';
      } else if (pt.projectionMoving !== null) {
        var prjY = clampMiniY(pt.projectionMoving);
        svg += '<circle cx="' + x + '" cy="' + prjY + '" r="3.0" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.0" style="cursor:pointer;">' +
          '<title>' + pt.monthLabel + ' (' + pt.monthKey + ')\nProyeksi Moving: ' + formatNum(pt.projectionMoving, 2) + ' Ton/Ha\nPotensi: ' + formatNum(pt.potencyMoving, 2) + ' Ton/Ha\nBCCR: ' + formatNum(pt.bccrRatio, 2) + '%\nAsal: ' + pt.provenanceLabel + '</title>' +
        '</circle>';
      }
    });
    // Month X-Labels
    svg += '<text x="' + padLeft + '" y="' + (h - 2) + '" fill="#64748B" font-size="7.5" font-weight="600">Agu 25</text>';
    svg += '<text x="' + cutoffX + '" y="' + (h - 2) + '" fill="#C90016" font-size="7.5" font-weight="800" text-anchor="middle">Jul 26 (Cut-off)</text>';
    svg += '<text x="' + (w - padRight) + '" y="' + (h - 2) + '" fill="#D97706" font-size="7.5" font-weight="700" text-anchor="end">Jul 27</text>';
    svg += '</svg>';
    var html = '<div style="display:flex;flex-direction:column;height:100%;justify-content:space-between;">' +
      // Stat Chip Row
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:3px;padding:2px 6px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:4px;">' +
        '<span style="font-size:9.5px;font-weight:700;color:#1E293B;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="' + yieldData.title + '">' +
          yieldData.title +
        '</span>' +
        '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">' +
          '<span style="font-size:9px;color:#64748B;">Cut-off: <strong style="color:#C90016;">' + formatNum(yieldData.cutoffActual, 1) + '</strong> / <span style="color:#475569;">' + formatNum(yieldData.cutoffPotency, 1) + '</span></span>' +
          '<span style="font-size:8.5px;font-weight:800;padding:1px 5px;border-radius:3px;background:' + bccrColor + ';color:' + bccrTextColor + ';">' + formatNum(yieldData.cutoffBccr, 1) + '%</span>' +
        '</div>' +
      '</div>' +
      // Mini Legend
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:0 2px;margin-bottom:2px;font-size:8.5px;font-weight:600;color:#64748B;">' +
        '<span style="display:inline-flex;align-items:center;gap:3px;"><i style="display:inline-block;width:10px;height:2.5px;background:#C90016;"></i>Aktual</span>' +
        '<span style="display:inline-flex;align-items:center;gap:3px;"><i style="display:inline-block;width:10px;height:2px;background:#64748B;"></i>Potensi</span>' +
        '<span style="display:inline-flex;align-items:center;gap:3px;"><i style="display:inline-block;width:10px;height:2.5px;background:#F59E0B;border-top:1px dashed #F59E0B;"></i>Proyeksi</span>' +
        '<span style="display:inline-flex;align-items:center;gap:3px;"><i style="display:inline-block;width:2px;height:8px;background:#111827;"></i>Cut-off</span>' +
      '</div>' +
      // SVG Chart Container
      '<div style="flex:1;min-height:72px;position:relative;">' + svg + '</div>' +
    '</div>';
    container.innerHTML = html;
  }
  // =========================================================================
  // VIEW 2: REKAP BCCR MATRIX RENDERING
  // =========================================================================
  function renderBccrMatrix() {
    var table = document.getElementById('bccrMatrixTable');
    if (!table || !window.SPT_DATA) return;
    var rekap = window.SPT_DATA.REKAP_BCCR;
    if (!rekap) {
      console.warn('REKAP_BCCR data belum siap');
      return;
    }
    var divKey = state.division === 'all' ? 'ALL' : state.division;
    var matrixData = rekap[divKey] || rekap['ALL'];
    if (!matrixData || !Array.isArray(matrixData.months)) return;
    var html = '<thead><tr><th class="col-1 sticky-col">Range BCCR</th>';
    matrixData.months.forEach(function (m) {
      html += '<th>' + m + '</th>';
    });
    html += '</tr></thead><tbody>';
    matrixData.rows.forEach(function (r, rIdx) {
      html += '<tr><td class="col-1 sticky-col"><span class="matrix-range-header"><i style="background:' + r.color + '"></i>' + r.range + '</span></td>';
      r.months.forEach(function (val, cIdx) {
        html += '<td class="matrix-cell" data-range="' + r.range + '" data-month="' + matrixData.months[cIdx] + '">' + val + '</td>';
      });
      html += '</tr>';
    });
    // Total Row
    html += '<tr style="font-weight:700;background:#F1F5F9;"><td class="col-1 sticky-col">Total Blok</td>';
    for (var c = 0; c < matrixData.months.length; c++) {
      html += '<td style="text-align:center;">' + matrixData.totalBlocks + '</td>';
    }
    html += '</tr>';
    // U80 Row
    html += '<tr style="font-weight:700;background:#FEF2F2;color:#991B1B;"><td class="col-1 sticky-col">U80 (&lt;80%)</td>';
    matrixData.u80.forEach(function (item) {
      html += '<td style="text-align:center;">' + item.count + ' <small>(' + item.pct + '%)</small></td>';
    });
    html += '</tr>';
    // A80 Row
    html += '<tr style="font-weight:700;background:#F0FDF4;color:#166534;"><td class="col-1 sticky-col">A80 (≥80%)</td>';
    matrixData.a80.forEach(function (item) {
      html += '<td style="text-align:center;">' + item.count + ' <small>(' + item.pct + '%)</small></td>';
    });
    html += '</tr>';
    html += '</tbody>';
    table.innerHTML = html;
    // Bind cell click drilldown
    var cells = table.querySelectorAll('.matrix-cell');
    cells.forEach(function (td) {
      td.addEventListener('click', function () {
        var range = td.getAttribute('data-range');
        var month = td.getAttribute('data-month');
        openBccrCellDrilldown(range, month);
      });
    });
  }
  function openBccrCellDrilldown(range, month) {
    var drillCard = document.getElementById('bccrCellDrilldown');
    var titleEl = document.getElementById('drilldownTitle');
    var contentEl = document.getElementById('drilldownContent');
    if (!drillCard || !titleEl || !contentEl) return;
    titleEl.textContent = 'Daftar Blok pada Rentang ' + range + ' (' + month + ') — ' + (state.division === 'all' ? 'Semua Divisi' : state.division);
    var filtered = getFilteredBlocks().filter(function (b) {
      return b.bccrRange === range;
    });
    if (filtered.length === 0) {
      contentEl.innerHTML = '<p style="font-size:12px;color:var(--text-muted);">Tidak ada data blok pada rentang ini.</p>';
    } else {
      var html = '<div class="drilldown-tags">';
      filtered.forEach(function (b) {
        html += '<button class="block-tag-btn" data-blok="' + b.blok + '" data-divisi="' + b.divisi + '">' +
          '<i style="width:8px;height:8px;border-radius:2px;background:' + b.bccrColor + ';display:inline-block;"></i>' +
          b.divisi + ' · ' + b.blok + ' (' + b.bccrYTD + '%)' +
        '</button>';
      });
      html += '</div>';
      contentEl.innerHTML = html;
      // Bind click on tag to filter block
      var btns = contentEl.querySelectorAll('.block-tag-btn');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var blk = btn.getAttribute('data-blok');
          var div = btn.getAttribute('data-divisi');
          state.division = div;
          state.block = blk;
          var divSelect = document.getElementById('divisionFilter');
          if (divSelect) divSelect.value = div;
          populateBlockFilter();
          var blkSelect = document.getElementById('blockFilter');
          if (blkSelect) blkSelect.value = blk;
          onFilterChanged();
          switchView('analysis', true);
          showToast('Filter diarahkan ke Blok ' + blk);
        });
      });
    }
    drillCard.style.display = 'block';
  }
  // =========================================================================
  // VIEW 3: MONITORING ACTION PLAN TABLE
  // =========================================================================
  function bindActionPlanFilters() {
    var probFilter = document.getElementById('filterProblem');
    var sensFilter = document.getElementById('filterSensitivity');
    var statFilter = document.getElementById('filterStatus');
    var overFilter = document.getElementById('filterOverdue');
    var searchInput = document.getElementById('searchActionInput');
    if (probFilter && window.SPT_DATA) {
      probFilter.innerHTML = '<option value="all">Semua Problem (16)</option>';
      window.SPT_DATA.MASTER_PROBLEMS.forEach(function (p) {
        var opt = document.createElement('option');
        opt.value = p.problem;
        opt.textContent = p.problem;
        probFilter.appendChild(opt);
      });
      probFilter.addEventListener('change', renderActionPlanTable);
    }
    if (sensFilter) sensFilter.addEventListener('change', renderActionPlanTable);
    if (statFilter) statFilter.addEventListener('change', renderActionPlanTable);
    if (overFilter) overFilter.addEventListener('change', renderActionPlanTable);
    if (searchInput) searchInput.addEventListener('input', renderActionPlanTable);
  }
  function renderActionPlanTable() {
    var tbody = document.getElementById('actionPlanTableBody');
    var countBadge = document.getElementById('actionTableCountBadge');
    if (!tbody || !window.SPT_DATA) return;
    var issues = getFilteredIssues();
    var probVal = document.getElementById('filterProblem') ? document.getElementById('filterProblem').value : 'all';
    var sensVal = document.getElementById('filterSensitivity') ? document.getElementById('filterSensitivity').value : 'all';
    var statVal = document.getElementById('filterStatus') ? document.getElementById('filterStatus').value : 'all';
    var overVal = document.getElementById('filterOverdue') ? document.getElementById('filterOverdue').value : 'all';
    var query = document.getElementById('searchActionInput') ? document.getElementById('searchActionInput').value.toLowerCase().trim() : '';
    var filtered = issues.filter(function (iss) {
      if (probVal !== 'all' && iss.problem !== probVal) return false;
      if (sensVal !== 'all' && iss.sensitivity !== sensVal) return false;
      if (statVal !== 'all' && iss.status !== statVal) return false;
      if (overVal === 'overdue' && !iss.overdue) return false;
      if (overVal === 'on-schedule' && iss.overdue) return false;
      if (query) {
        var match = (iss.id + ' ' + iss.blok + ' ' + iss.pic + ' ' + iss.actionPlan).toLowerCase();
        if (match.indexOf(query) === -1) return false;
      }
      return true;
    });
    if (countBadge) countBadge.textContent = 'Menampilkan ' + filtered.length + ' temuan';
    var html = '';
    filtered.forEach(function (iss) {
      var statusClass = 'status-belum';
      if (iss.status === 'Selesai') statusClass = 'status-selesai';
      else if (iss.status === 'Dalam Pengerjaan') statusClass = 'status-pengerjaan';
      else if (iss.status === 'Menunggu Verifikasi') statusClass = 'status-verifikasi';
      var sensBadge = iss.sensitivity === 'Major'
        ? '<span class="issue-badge-major">Major</span>'
        : '<span class="issue-badge-minor">Minor</span>';
      html += '<tr data-id="' + iss.id + '" style="cursor:pointer;">' +
        '<td><strong>' + iss.id + '</strong></td>' +
        '<td>' + iss.divisi + ' · <strong>' + iss.blok + '</strong></td>' +
        '<td>' + iss.problem + '</td>' +
        '<td>' + iss.actionPlan + '</td>' +
        '<td>' + sensBadge + '</td>' +
        '<td>' + iss.timeframe + '</td>' +
        '<td>' + formatNum(iss.volumeInventarisasi, 0) + ' ' + iss.unit + '</td>' +
        '<td>' + formatNum(iss.realisasiTerverifikasi, 0) + ' ' + iss.unit + '</td>' +
        '<td>' +
          '<div style="display:flex;align-items:center;gap:6px;">' +
            '<div class="bar-track" style="width:60px;">' +
              '<div class="bar-progress ' + (iss.progress >= 80 ? 'high' : '') + '" style="width:' + iss.progress + '%"></div>' +
            '</div>' +
            '<span>' + iss.progress + '%</span>' +
          '</div>' +
        '</td>' +
        '<td>' + iss.pic + '</td>' +
        '<td>' + iss.tanggalIdentifikasi + '</td>' +
        '<td>' +
          iss.targetSelesai +
          (iss.overdue ? ' <span class="badge-overdue-sm">Overdue</span>' : '') +
        '</td>' +
        '<td><span class="badge-status ' + statusClass + '">' + iss.status + '</span></td>' +
        '<td><button class="btn-secondary btn-detail-row" data-id="' + iss.id + '" style="padding:2px 6px;font-size:11px;">Detail →</button></td>' +
      '</tr>';
    });
    if (filtered.length === 0) {
      html = '<tr><td colspan="14" style="text-align:center;padding:24px;color:var(--text-muted);">Tidak ada temuan yang cocok dengan kriteria filter.</td></tr>';
    }
    tbody.innerHTML = html;
    // Bind row click & button click
    var rows = tbody.querySelectorAll('tr[data-id]');
    rows.forEach(function (r) {
      r.addEventListener('click', function (e) {
        var id = r.getAttribute('data-id');
        openActionDrawer(id);
      });
    });
  }
  // =========================================================================
  // ACTION PLAN SIDE DRAWER
  // =========================================================================
  function bindActionDrawer() {
    var closeBtn = document.getElementById('btnCloseActionDrawer') || document.getElementById('btnCloseDrawer');
    var backdrop = document.getElementById('drawerBackdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeActionDrawer);
    if (backdrop) backdrop.addEventListener('click', closeActionDrawer);
  }
  function openActionDrawer(issueId) {
    if (!window.SPT_DATA) return;
    var all = window.SPT_DATA.ACTION_PLANS || [];
    var iss = all.find(function (item) { return item.id === issueId; });
    if (!iss) return;
    var drawer = document.getElementById('actionDrawer');
    var backdrop = document.getElementById('drawerBackdrop');
    var idBadge = document.getElementById('drawerIdBadge');
    var titleEl = document.getElementById('drawerTitle');
    var body = document.getElementById('drawerBody');
    if (!drawer || !backdrop || !body) return;
    idBadge.textContent = iss.id;
    titleEl.textContent = iss.problem;
    var statusClass = 'status-belum';
    if (iss.status === 'Selesai') statusClass = 'status-selesai';
    else if (iss.status === 'Dalam Pengerjaan') statusClass = 'status-pengerjaan';
    else if (iss.status === 'Menunggu Verifikasi') statusClass = 'status-verifikasi';
    var html = '<div class="drawer-section">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
        '<span class="badge-status ' + statusClass + '" style="font-size:11.5px;padding:3px 8px;">' + iss.status + '</span>' +
        (iss.overdue ? '<span class="badge-overdue-sm" style="font-size:11px;padding:3px 8px;">Melewati Target (Overdue)</span>' : '') +
      '</div>' +
      '<div class="drawer-grid-2">' +
        '<div class="drawer-box"><small>Estate / Divisi / Blok</small><strong>' + iss.estate + ' · ' + iss.divisi + ' · ' + iss.blok + '</strong></div>' +
        '<div class="drawer-box"><small>Sensitivitas / Timeframe</small><strong>' + iss.sensitivity + ' · ' + iss.timeframe + '</strong></div>' +
      '</div>' +
    '</div>';
    html += '<div class="drawer-section">' +
      '<span class="drawer-section-title">Action Plan Terpilih</span>' +
      '<div class="drawer-box" style="border-left:3px solid var(--primary-red);">' +
        '<strong>' + iss.actionPlan + '</strong>' +
        '<p style="font-size:11.5px;color:var(--text-secondary);margin-top:4px;">' + (iss.catatan || iss.notes || ('Rekomendasi teknis agronomi: ' + iss.actionPlan + '.')) + '</p>' +
      '</div>' +
    '</div>';
    html += '<div class="drawer-section">' +
      '<span class="drawer-section-title">Target & Realisasi Volume Fisik</span>' +
      '<div class="drawer-grid-2">' +
        '<div class="drawer-box"><small>Volume Inventarisasi</small><strong>' + formatNum(iss.volumeInventarisasi, 0) + ' ' + iss.unit + '</strong></div>' +
        '<div class="drawer-box"><small>Realisasi Terverifikasi</small><strong style="color:var(--status-green);">' + formatNum(iss.realisasiTerverifikasi, 0) + ' ' + iss.unit + ' (' + iss.progress + '%)</strong></div>' +
      '</div>' +
      '<div class="bar-track" style="height:8px;margin-top:4px;">' +
        '<div class="bar-progress ' + (iss.progress >= 80 ? 'high' : '') + '" style="width:' + iss.progress + '%"></div>' +
      '</div>' +
    '</div>';
    html += '<div class="drawer-section">' +
      '<span class="drawer-section-title">Petugas Lapangan & Jadwal</span>' +
      '<div class="drawer-grid-2">' +
        '<div class="drawer-box"><small>Penanggung Jawab (PIC)</small><strong>' + iss.pic + '</strong></div>' +
        '<div class="drawer-box"><small>Tenggat Selesai</small><strong>' + iss.targetSelesai + '</strong></div>' +
      '</div>' +
    '</div>';
    // Dokumentasi Lapangan (Sebelum vs Sesudah)
    var isDone = iss.status === 'Selesai';
    html += '<div class="drawer-section">' +
      '<span class="drawer-section-title">Dokumentasi Lapangan: Sebelum vs Sesudah</span>' +
      '<div class="drawer-photos-grid">' +
        // Card Sebelum
        '<div class="drawer-photo-card">' +
          '<div class="drawer-photo-tag before">FOTO SEBELUM (KONDISI AWAL)</div>' +
          '<div class="drawer-photo-img-wrap">' +
            getFieldSvg(iss.problem, false) +
          '</div>' +
          '<div class="drawer-photo-meta">' +
            '<strong>Inspeksi: ' + (iss.fotoSebelumDate || iss.tanggalLaporText || '02 Agu 2026') + '</strong><br>' +
            '<span>Survei Trabas · ' + iss.pic + '</span>' +
          '</div>' +
        '</div>' +
        // Card Sesudah
        '<div class="drawer-photo-card">' +
          '<div class="drawer-photo-tag after">' + (isDone ? 'FOTO SESUDAH (TERVERIFIKASI)' : 'FOTO SESUDAH (STATUS)') + '</div>' +
          (isDone
            ? '<div class="drawer-photo-img-wrap">' +
                getFieldSvg(iss.problem, true) +
              '</div>' +
              '<div class="drawer-photo-meta">' +
                '<strong style="color:var(--status-green);">Selesai: ' + (iss.fotoSesudahDate || '24 Agu 2026') + '</strong><br>' +
                '<span>Verifikator: ' + (iss.verifiedBy || 'Asisten Agronomi SKDE') + '</span>' +
              '</div>'
            : '<div class="photo-pending-card">' +
                '<span class="pending-icon">⏳</span>' +
                '<strong>Foto Sesudah Belum Tersedia</strong>' +
                '<p>Status: ' + iss.status + '<br>Target: ' + iss.targetSelesai + '<br>Foto verifikasi akan diunggah setelah pekerjaan fisik tuntas.</p>' +
              '</div>'
          ) +
        '</div>' +
      '</div>' +
    '</div>';
    // Riwayat Status & Verifikasi
    var histList = (iss.history && iss.history.length > 0) ? iss.history : [
      { date: iss.tanggalLaporText || '02 Agu 2026', user: iss.pic, status: 'Temuan Teridentifikasi', note: iss.notes || ('Temuan titik masalah ' + iss.problem + ' hasil survei Trabas.') }
    ];
    if (isDone && histList.length === 1) {
      histList.push({ date: iss.fotoSesudahDate || '24 Agu 2026', user: iss.verifiedBy || 'Wahyu Pratama (Asisten Agronomi)', status: 'Selesai Terverifikasi', note: 'Realisasi fisik lapangan telah selesai dan terverifikasi sesuai standar teknis agronomi PT SMART Tbk.' });
    }
    html += '<div class="drawer-section">' +
      '<span class="drawer-section-title">Riwayat Status & Catatan Verifikator</span>' +
      '<div class="drawer-timeline">';
    histList.forEach(function (h) {
      html += '<div class="timeline-item">' +
        '<span>' + h.date + ' · ' + h.user + '</span>' +
        '<strong>' + h.status + '</strong>' +
        '<p>' + h.note + '</p>' +
      '</div>';
    });
    html += '</div></div>';
    // Tombol Action Demo
    html += '<div style="margin-top:14px;display:flex;gap:8px;">' +
      '<button class="btn-primary" id="btnDrawerUpdate" style="flex:1;">Update Progress →</button>' +
      '<button class="btn-secondary" id="btnDrawerLocate" style="flex:1;">📍 Sorot di Peta</button>' +
    '</div>';
    body.innerHTML = html;
    drawer.classList.add('open');
    backdrop.classList.add('open');
    // Bind locate button
    var locateBtn = document.getElementById('btnDrawerLocate');
    if (locateBtn) {
      locateBtn.addEventListener('click', function () {
        closeActionDrawer();
        switchView('dashboard', true);
        if (state.mapProblem && iss.lat && iss.lng) {
          state.mapProblem.setView([iss.lat, iss.lng], 15);
          showToast('Menyorot temuan ' + iss.id + ' pada Blok ' + iss.blok);
        }
      });
    }
    var updateBtn = document.getElementById('btnDrawerUpdate');
    if (updateBtn) {
      updateBtn.addEventListener('click', function () {
        showToast('Fitur mockup: Simulasi perubahan status temuan tersimpan');
      });
    }
  }
  function closeActionDrawer() {
    var drawer = document.getElementById('actionDrawer');
    var backdrop = document.getElementById('drawerBackdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }
  // =========================================================================
  // VIEW 4: TREND PRODUKSI (24 BULAN) — SKALA BULANAN (MONTHLY)
  // =========================================================================
  // VIEW 4: TREND PRODUKSI (24 BULAN) — YIELD MOVING & RASIO BCCR
  // =========================================================================
  function bindTrendToggles() {
    var btnMoving = document.getElementById('btnMetricMoving');
    var btnBccr = document.getElementById('btnMetricBccr');
    if (btnMoving) {
      btnMoving.addEventListener('click', function () {
        state.trendMetric = 'moving';
        btnMoving.classList.add('active');
        btnMoving.style.background = '#FFFFFF';
        btnMoving.style.color = '#0F172A';
        btnMoving.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        if (btnBccr) {
          btnBccr.classList.remove('active');
          btnBccr.style.background = 'transparent';
          btnBccr.style.color = '#64748B';
          btnBccr.style.boxShadow = 'none';
        }
        renderTrendChart();
      });
    }
    if (btnBccr) {
      btnBccr.addEventListener('click', function () {
        state.trendMetric = 'bccr';
        btnBccr.classList.add('active');
        btnBccr.style.background = '#FFFFFF';
        btnBccr.style.color = '#0F172A';
        btnBccr.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        if (btnMoving) {
          btnMoving.classList.remove('active');
          btnMoving.style.background = 'transparent';
          btnMoving.style.color = '#64748B';
          btnMoving.style.boxShadow = 'none';
        }
        renderTrendChart();
      });
    }
    var btnExpTrend = document.getElementById('btnExportTrendCsv');
    if (btnExpTrend) {
      btnExpTrend.addEventListener('click', exportTrendCsv);
    }
    var btnExpTrend2 = document.getElementById('btnExportTrendCsv2');
    if (btnExpTrend2) {
      btnExpTrend2.addEventListener('click', exportTrendCsv);
    }
  }
  function exportTrendCsv() {
    var yieldData = (window.SPT_YIELD && window.SPT_YIELD.getYieldTimeline)
      ? window.SPT_YIELD.getYieldTimeline(state.division, state.block)
      : null;
    if (!yieldData || !yieldData.timeline) return;
    var rows = [
      ['Bulan', 'Label_Bulan', 'Horizon', 'Kategori_Periode', 'Actual_Moving_TonHa', 'Proyeksi_Moving_TonHa', 'Potensi_Moving_TonHa', 'Rasio_BCCR_Persen', 'Gap_TonHa', 'Asal_Data']
    ];
    yieldData.timeline.forEach(function (pt) {
      rows.push([
        pt.monthKey,
        pt.monthLabel,
        pt.horizon,
        pt.isCutoff ? 'Cut-off' : (pt.isForecast ? 'Forecast' : 'Historical'),
        pt.actualMoving !== null ? pt.actualMoving.toFixed(2) : '',
        pt.projectionMoving !== null ? pt.projectionMoving.toFixed(2) : '',
        pt.potencyMoving.toFixed(4),
        pt.bccrRatio.toFixed(2),
        pt.gap.toFixed(2),
        '"' + pt.provenanceLabel + '"'
      ]);
    });
    var csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + rows.map(function (e) { return e.join(','); }).join('\n');
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    var scopeName = (state.block !== 'all' ? state.block : (state.division !== 'all' ? state.division : 'SKDE_Seluruh_Divisi')).replace(/[^a-zA-Z0-9]/g, '_');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SPT_Yield_Moving_24Bulan_' + scopeName + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Tabel 24 Bulan Trailing Yield Moving berhasil diunduh (CSV)');
  }
  function exportBccrCsv() {
    if (!window.SPT_DATA || !window.SPT_DATA.REKAP_BCCR) return;
    var rekap = window.SPT_DATA.REKAP_BCCR;
    var divKey = state.division === 'all' ? 'ALL' : state.division;
    var matrixData = rekap[divKey] || rekap['ALL'];
    if (!matrixData || !matrixData.months) return;
    var rows = [
      ['Range_BCCR'].concat(matrixData.months)
    ];
    matrixData.rows.forEach(function (r) {
      rows.push(['"' + r.range + '"'].concat(r.months));
    });
    var csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + rows.map(function (e) { return e.join(','); }).join('\n');
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    var scopeName = (state.division !== 'all' ? state.division : 'SKDE_Seluruh_Divisi').replace(/[^a-zA-Z0-9]/g, '_');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SPT_Rekap_BCCR_Bulanan_' + scopeName + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data Rekap BCCR berhasil diunduh (CSV)');
  }
  function renderTrendChart() {
    var container = document.getElementById('trendChartSvgContainer');
    var tableContainer = document.getElementById('trendTableContainer');
    var tableTitle = document.getElementById('trendTableTitle');
    if (!container) return;
    var yieldData = (window.SPT_YIELD && window.SPT_YIELD.getYieldTimeline)
      ? window.SPT_YIELD.getYieldTimeline(state.division, state.block)
      : null;
    if (!yieldData || !yieldData.timeline || yieldData.timeline.length === 0) return;
    var timeline = yieldData.timeline;
    var isBccrMode = state.trendMetric === 'bccr';
    if (tableTitle) {
      tableTitle.textContent = 'Tabel 24 Bulan Trailing Yield Moving (' + (isBccrMode ? 'Rasio BCCR %' : 'Ton/Ha') + ') — ' + yieldData.title;
    }
    var allVals = [];
    timeline.forEach(function (pt) {
      if (isBccrMode) {
        if (pt.bccrRatio !== null && pt.bccrRatio !== undefined) allVals.push(pt.bccrRatio);
      } else {
        if (pt.actualMoving !== null) allVals.push(pt.actualMoving);
        if (pt.projectionMoving !== null) allVals.push(pt.projectionMoving);
        if (pt.potencyMoving !== null) allVals.push(pt.potencyMoving);
      }
    });
    var dataMin = allVals.length > 0 ? Math.min.apply(null, allVals) : (isBccrMode ? 70 : 16);
    var dataMax = allVals.length > 0 ? Math.max.apply(null, allVals) : (isBccrMode ? 100 : 32);
    var minVal, maxVal, ySteps;
    if (isBccrMode) {
      minVal = Math.max(0, Math.floor((dataMin - 5) / 10) * 10);
      if (minVal > 60.0) minVal = 60.0;
      maxVal = Math.max(110.0, Math.ceil((dataMax + 5) / 10) * 10);
      ySteps = Math.round((maxVal - minVal) / 10);
    } else {
      minVal = Math.max(0, Math.floor((dataMin - 1.5) / 4) * 4);
      if (minVal > 12.0) minVal = 12.0;
      maxVal = Math.max(32.0, Math.ceil((dataMax + 1.5) / 4) * 4);
      ySteps = Math.round((maxVal - minVal) / 4);
    }
    var w = 860;
    var h = 310;
    var padLeft = 50;
    var padRight = 25;
    var padTop = 28;
    var padBottom = 34;
    var chartW = w - padLeft - padRight;
    var chartH = h - padTop - padBottom;
    function clampTrendY(val) {
      var rawY = padTop + chartH - (((val - minVal) / (maxVal - minVal)) * chartH);
      return Math.max(padTop, Math.min(padTop + chartH, rawY));
    }
    var svg = '<svg width="100%" height="100%" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">';
    // Horizontal Grid Lines
    for (var s = 0; s <= ySteps; s++) {
      var yVal = minVal + ((maxVal - minVal) / ySteps) * s;
      var yPos = clampTrendY(yVal);
      var strokeColor = (isBccrMode && yVal === 100.0) ? 'rgba(16, 185, 129, 0.4)' : '#E2E8F0';
      var strokeWidth = (isBccrMode && yVal === 100.0) ? '1.5' : '1';
      svg += '<line x1="' + padLeft + '" y1="' + yPos + '" x2="' + (w - padRight) + '" y2="' + yPos + '" stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '"/>';
      var unitText = isBccrMode ? '%' : '';
      svg += '<text x="' + (padLeft - 8) + '" y="' + (yPos + 3.5) + '" fill="' + ((isBccrMode && yVal === 100.0) ? '#059669' : '#64748B') + '" font-size="10" font-weight="600" text-anchor="end">' + yVal.toFixed(0) + unitText + '</text>';
    }
    if (isBccrMode) {
      // 100% Target Reference Line Label
      var y100Pos = clampTrendY(100.0);
      svg += '<text x="' + (w - padRight - 6) + '" y="' + (y100Pos - 4) + '" fill="#059669" font-size="8.5" font-weight="700" text-anchor="end">TARGET POTENSI 100%</text>';
    }
    var step = chartW / (timeline.length - 1);
    var cutoffX = padLeft + (11 * step);
    var synthW = 4 * step; // Aug 25 - Dec 25
    // Shaded synthetic historical area
    svg += '<rect x="' + padLeft + '" y="' + padTop + '" width="' + synthW + '" height="' + chartH + '" fill="rgba(100, 116, 139, 0.04)"/>';
    svg += '<text x="' + (padLeft + 8) + '" y="' + (padTop + 14) + '" fill="#64748B" font-size="8.5" font-weight="700">SINTETIS HISTORIS (ESTIMASI)</text>';
    // Shaded forecast area
    svg += '<rect x="' + cutoffX + '" y="' + padTop + '" width="' + (chartW - (11 * step)) + '" height="' + chartH + '" fill="rgba(245, 158, 11, 0.07)"/>';
    svg += '<text x="' + (cutoffX + 10) + '" y="' + (padTop + 14) + '" fill="#D97706" font-size="8.5" font-weight="700">AREA PROYEKSI SKENARIO (EASING)</text>';
    var actPoints = [];
    var prjPoints = [];
    var potPoints = [];
    timeline.forEach(function (pt, i) {
      var x = padLeft + (i * step);
      if (isBccrMode) {
        var bccrVal = pt.bccrRatio;
        var bccrY = clampTrendY(bccrVal);
        if (pt.actualMoving !== null) {
          actPoints.push(x + ',' + bccrY);
          if (pt.isCutoff) {
            prjPoints.push(x + ',' + bccrY);
          }
        } else if (pt.projectionMoving !== null) {
          prjPoints.push(x + ',' + bccrY);
        }
      } else {
        var potY = clampTrendY(pt.potencyMoving);
        potPoints.push(x + ',' + potY);
        if (pt.actualMoving !== null) {
          var actY = clampTrendY(pt.actualMoving);
          actPoints.push(x + ',' + actY);
          if (pt.isCutoff) {
            prjPoints.push(x + ',' + actY);
          }
        } else if (pt.projectionMoving !== null) {
          var prjY = clampTrendY(pt.projectionMoving);
          prjPoints.push(x + ',' + prjY);
        }
      }
      // X Axis Month Labels
      if (i % 2 === 0 || pt.isCutoff || i === timeline.length - 1) {
        var fontWeight = pt.isCutoff ? '800' : '500';
        var fillColor = pt.isCutoff ? '#C90016' : '#64748B';
        svg += '<text x="' + x + '" y="' + (h - padBottom + 16) + '" fill="' + fillColor + '" font-size="9.5" font-weight="' + fontWeight + '" text-anchor="middle">' + pt.monthLabel + '</text>';
      }
    });
    // Render lines
    if (!isBccrMode) {
      // Potency Solid Slate Line
      svg += '<polyline points="' + potPoints.join(' ') + '" fill="none" stroke="#64748B" stroke-width="2"/>';
    }
    // Actual Solid Corporate Red Line
    svg += '<polyline points="' + actPoints.join(' ') + '" fill="none" stroke="#C90016" stroke-width="2.8"/>';
    // Projection Dashed Orange Line
    svg += '<polyline points="' + prjPoints.join(' ') + '" fill="none" stroke="#F59E0B" stroke-width="2.8" stroke-dasharray="5,4"/>';
    // Dots & Tooltip on Points
    timeline.forEach(function (pt, i) {
      var x = padLeft + (i * step);
      var isSynth = pt.provenance === 'syntheticHistorical';
      var yCoord = null;
      if (isBccrMode) {
        yCoord = clampTrendY(pt.bccrRatio);
      } else {
        if (pt.actualMoving !== null) {
          yCoord = clampTrendY(pt.actualMoving);
        } else if (pt.projectionMoving !== null) {
          yCoord = clampTrendY(pt.projectionMoving);
        }
      }
      if (yCoord === null) return;
      if (pt.actualMoving !== null) {
        var dotColor = pt.isCutoff ? '#C90016' : (isSynth ? '#F8FAFC' : '#C90016');
        var dotStroke = pt.isCutoff ? '#FFE066' : (isSynth ? '#64748B' : '#FFFFFF');
        var dotR = pt.isCutoff ? 5.5 : (isSynth ? 3.0 : 3.8);
        var dotStrokeW = pt.isCutoff ? 2.5 : (isSynth ? 1.5 : 1.8);
        svg += '<circle cx="' + x + '" cy="' + yCoord + '" r="' + dotR + '" fill="' + dotColor + '" stroke="' + dotStroke + '" stroke-width="' + dotStrokeW + '" style="cursor:pointer;">' +
          '<title>' + pt.monthLabel + ' (' + pt.monthKey + ')\nActual Moving: ' + formatNum(pt.actualMoving, 2) + ' Ton/Ha\nPotency Moving: ' + formatNum(pt.potencyMoving, 2) + ' Ton/Ha\nRasio BCCR: ' + formatNum(pt.bccrRatio, 2) + '%\nAsal Data: ' + pt.provenanceLabel + '</title>' +
        '</circle>';
      } else if (pt.projectionMoving !== null) {
        svg += '<circle cx="' + x + '" cy="' + yCoord + '" r="3.8" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.8" style="cursor:pointer;">' +
          '<title>' + pt.monthLabel + ' (' + pt.monthKey + ')\nProyeksi Moving: ' + formatNum(pt.projectionMoving, 2) + ' Ton/Ha\nPotency Moving: ' + formatNum(pt.potencyMoving, 2) + ' Ton/Ha\nRasio BCCR: ' + formatNum(pt.bccrRatio, 2) + '%\nAsal Data: ' + pt.provenanceLabel + '</title>' +
        '</circle>';
      }
    });
    // Cut-off Vertical Line
    svg += '<line x1="' + cutoffX + '" y1="' + (padTop - 8) + '" x2="' + cutoffX + '" y2="' + (chartH + padTop) + '" stroke="#111827" stroke-width="2" stroke-dasharray="3,3"/>';
    svg += '<rect x="' + (cutoffX - 46) + '" y="' + (padTop - 25) + '" width="92" height="18" fill="#111827" rx="3"/>';
    svg += '<text x="' + cutoffX + '" y="' + (padTop - 13) + '" fill="#FFFFFF" font-size="8.5" font-weight="700" text-anchor="middle">CUT-OFF (JUL 2026)</text>';
    svg += '</svg>';
    container.innerHTML = svg;
    // Render Data Table in #trendTableContainer
    if (tableContainer) {
      var tblHtml = '<table class="trend-data-table">' +
        '<thead><tr>' +
          '<th>Bulan</th>' +
          '<th>Horizon</th>' +
          '<th>Actual Moving</th>' +
          '<th>Proyeksi Moving</th>' +
          '<th>Potensi Moving</th>' +
          '<th>Rasio BCCR</th>' +
          '<th>Gap vs Potensi</th>' +
          '<th>Asal Data (Provenance)</th>' +
        '</tr></thead><tbody>';
      timeline.forEach(function (pt) {
        var rowClass = pt.isCutoff ? 'cutoff-row' : '';
        var provBadge = '<span class="provenance-tag ' + (pt.provenance === 'syntheticHistorical' ? 'synthetic' : (pt.provenance === 'observed' ? 'observed' : 'forecast')) + '">' + pt.provenanceLabel + '</span>';
        var bccrColor = pt.bccrRatio >= 100 ? '#009900' : (pt.bccrRatio >= 90 ? '#339966' : (pt.bccrRatio >= 80 ? '#99CC00' : (pt.bccrRatio >= 70 ? '#FFCC00' : '#FF0000')));
        tblHtml += '<tr class="' + rowClass + '">' +
          '<td><strong>' + pt.monthLabel + '</strong> <small style="color:var(--text-muted);">' + pt.monthKey + '</small></td>' +
          '<td>' + (pt.horizon < 0 ? 'Historis (' + pt.horizon + ')' : (pt.horizon === 0 ? 'Cut-off (0)' : 'Forecast (+' + pt.horizon + ')')) + '</td>' +
          '<td>' + (pt.actualMoving !== null ? '<strong>' + formatNum(pt.actualMoving, 2) + '</strong>' : '—') + '</td>' +
          '<td>' + (pt.projectionMoving !== null ? '<strong style="color:#D97706;">' + formatNum(pt.projectionMoving, 2) + '</strong>' : '—') + '</td>' +
          '<td>' + formatNum(pt.potencyMoving, 4) + '</td>' +
          '<td><strong style="color:' + bccrColor + ';">' + formatNum(pt.bccrRatio, 2) + '%</strong></td>' +
          '<td style="color:' + (pt.gap >= 0 ? '#16A34A' : '#DC2626') + ';">' + (pt.gap >= 0 ? '+' : '') + formatNum(pt.gap, 2) + '</td>' +
          '<td>' + provBadge + '</td>' +
        '</tr>';
      });
      tblHtml += '</tbody></table>';
      tableContainer.innerHTML = tblHtml;
    }
  }
  // =========================================================================
  // VIEW 5: DETAIL ANALISA BCCR (ROTASI PANEN & BLOK)
  // =========================================================================
  function renderAnalysisTable() {
    var tbody = document.getElementById('analysisTableBody');
    if (!tbody || !window.SPT_DATA) return;
    var blocks = getFilteredBlocks();
    var html = '';
    blocks.forEach(function (b) {
      var bccrColor = b.bccrColor;
      var estColor = b.estimasi.color;
      var trendIcon = b.estimasi.trend === 'up' ? '↗' : '↘';
      var trendColor = b.estimasi.trend === 'up' ? 'var(--status-green)' : 'var(--status-red)';
      html += '<tr>' +
        '<td class="col-1 sticky-col">' + b.divisi + '</td>' +
        '<td class="col-2 sticky-col"><strong>' + b.blok + '</strong></td>' +
        '<td style="text-align:right;">' + formatNum(b.luas, 1) + '</td>' +
        '<td style="text-align:center;">' + b.tahunTanam + '</td>' +
        '<td style="text-align:right;">' + formatNum(b.potencyYTD, 2) + '</td>' +
        '<td style="text-align:right;"><strong>' + formatNum(b.actualYTD, 2) + '</strong></td>' +
        '<td style="text-align:center;"><span class="bccr-cell-badge" style="background:' + bccrColor + ';color:' + (b.bccrYTD >= 70 && b.bccrYTD < 90 ? '#000' : '#fff') + '">' + formatNum(b.bccrYTD, 1) + '%</span></td>' +
        '<td style="text-align:right;">' + b.rotasi.rot1.jjg + '</td><td style="text-align:right;">' + formatNum(b.rotasi.rot1.ton, 1) + '</td><td style="text-align:right;">' + b.rotasi.rot1.sisa + '</td>' +
        '<td style="text-align:right;">' + b.rotasi.rot2.jjg + '</td><td style="text-align:right;">' + formatNum(b.rotasi.rot2.ton, 1) + '</td><td style="text-align:right;">' + b.rotasi.rot2.sisa + '</td>' +
        '<td style="text-align:right;">' + b.rotasi.rot3.jjg + '</td><td style="text-align:right;">' + formatNum(b.rotasi.rot3.ton, 1) + '</td><td style="text-align:right;">' + b.rotasi.rot3.sisa + '</td>' +
        '<td style="text-align:right;">' + b.rotasi.rot4.jjg + '</td><td style="text-align:right;">' + formatNum(b.rotasi.rot4.ton, 1) + '</td><td style="text-align:right;">' + b.rotasi.rot4.sisa + '</td>' +
        '<td style="text-align:right;font-weight:700;">' + b.mtd.jjg + '</td><td style="text-align:right;font-weight:700;">' + formatNum(b.mtd.ton, 1) + '</td><td style="text-align:right;font-weight:700;">' + formatNum(b.mtd.tonHa, 2) + '</td>' +
        '<td style="text-align:center;"><span class="bccr-cell-badge" style="background:' + estColor + ';color:' + (b.estimasi.bccr >= 70 && b.estimasi.bccr < 90 ? '#000' : '#fff') + '">' + formatNum(b.estimasi.bccr, 1) + '%</span></td>' +
        '<td style="text-align:right;">' + formatNum(b.estimasi.tonHa, 2) + '</td>' +
        '<td style="text-align:center;font-weight:800;color:' + trendColor + ';">' + trendIcon + '</td>' +
        '<td style="text-align:right;">' + (b.estimasi.gap >= 0 ? '+' : '') + formatNum(b.estimasi.gap, 2) + '</td>' +
      '</tr>';
    });
    if (blocks.length === 0) {
      html = '<tr><td colspan="25" style="text-align:center;padding:20px;color:var(--text-muted);">Tidak ada data blok.</td></tr>';
    }
    tbody.innerHTML = html;
  }
  // =========================================================================
  // VIEW 6: REKAP ANALISA DIVISI
  // =========================================================================
  function renderDivisionView() {
    var chartContainer = document.getElementById('divisionGroupedBarChart');
    var listContainer = document.getElementById('divisionPriorityList');
    if (!chartContainer || !listContainer || !window.SPT_DATA) return;
    var data = window.SPT_DATA.DIVISION_SUMMARIES || [];
    // 1. Grouped Bar Chart: Budget YTD vs Actual YTD
    var maxVal = 26.0;
    var w = 460;
    var h = 260;
    var padLeft = 35;
    var padBottom = 35;
    var chartW = w - padLeft - 20;
    var chartH = h - padBottom - 20;
    var svg = '<svg width="100%" height="100%" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">';
    svg += '<line x1="' + padLeft + '" y1="' + (chartH + 20) + '" x2="' + (w - 20) + '" y2="' + (chartH + 20) + '" stroke="#E5E7EB" stroke-width="1"/>';
    // Grid lines
    for (var s = 0; s <= 4; s++) {
      var val = (maxVal / 4) * s;
      var yPos = 20 + chartH - ((val / maxVal) * chartH);
      svg += '<line x1="' + padLeft + '" y1="' + yPos + '" x2="' + (w - 20) + '" y2="' + yPos + '" stroke="#F3F4F6" stroke-width="1"/>';
      svg += '<text x="' + (padLeft - 6) + '" y="' + (yPos + 3) + '" fill="#9CA3AF" font-size="9" text-anchor="end">' + val + '</text>';
    }
    var groupW = chartW / data.length;
    var barW = 20;
    data.forEach(function (d, i) {
      var groupX = padLeft + (i * groupW);
      var bH = (d.budgetYTD / maxVal) * chartH;
      var aH = (d.actualYTD / maxVal) * chartH;
      var bY = 20 + chartH - bH;
      var aY = 20 + chartH - aH;
      // Budget Bar (Blue/Gray)
      svg += '<rect x="' + (groupX + (groupW / 2) - barW - 2) + '" y="' + bY + '" width="' + barW + '" height="' + bH + '" fill="#94A3B8" rx="2"/>';
      // Actual Bar (Corporate Red)
      svg += '<rect x="' + (groupX + (groupW / 2) + 2) + '" y="' + aY + '" width="' + barW + '" height="' + aH + '" fill="#C90016" rx="2"/>';
      // Values on top
      svg += '<text x="' + (groupX + (groupW / 2) - barW / 2 - 2) + '" y="' + (bY - 4) + '" fill="#475569" font-size="8" font-weight="600" text-anchor="middle">' + formatNum(d.budgetYTD, 1) + '</text>';
      svg += '<text x="' + (groupX + (groupW / 2) + barW / 2 + 2) + '" y="' + (aY - 4) + '" fill="#C90016" font-size="8" font-weight="700" text-anchor="middle">' + formatNum(d.actualYTD, 1) + '</text>';
      // Label Divisi
      svg += '<text x="' + (groupX + groupW / 2) + '" y="' + (h - padBottom + 16) + '" fill="#1F2937" font-size="9.5" font-weight="700" text-anchor="middle">' + d.divisi + '</text>';
    });
    // Chart Legend
    svg += '<rect x="' + (w - 180) + '" y="4" width="10" height="10" fill="#94A3B8" rx="2"/>';
    svg += '<text x="' + (w - 166) + '" y="12" fill="#4B5563" font-size="9" font-weight="600">Budget YTD</text>';
    svg += '<rect x="' + (w - 95) + '" y="4" width="10" height="10" fill="#C90016" rx="2"/>';
    svg += '<text x="' + (w - 81) + '" y="12" fill="#C90016" font-size="9" font-weight="700">Aktual YTD</text>';
    svg += '</svg>';
    chartContainer.innerHTML = svg;
    // 2. Division Priority Cards
    var listHtml = '';
    data.forEach(function (d) {
      var prioClass = 'prio-normal';
      if (d.priority === 'Sangat Kritis') prioClass = 'prio-kritis';
      else if (d.priority === 'Tinggi') prioClass = 'prio-tinggi';
      else if (d.priority === 'Sedang') prioClass = 'prio-sedang';
      listHtml += '<div class="division-card-item" data-divisi="' + d.divisi + '">' +
        '<div class="div-card-top">' +
          '<span class="div-card-name">' + d.divisi + '</span>' +
          '<span class="div-priority-badge ' + prioClass + '">' + d.priority + '</span>' +
        '</div>' +
        '<div class="div-card-metrics">' +
          '<div class="div-metric-item"><small>Action Plan</small><strong>' + d.actionCompletion + '% Selesai</strong></div>' +
          '<div class="div-metric-item"><small>Temuan Aktif</small><strong>' + d.openProblems + ' (' + d.overdue + ' Overdue)</strong></div>' +
          '<div class="div-metric-item"><small>Production Gap</small><strong style="color:var(--status-red);">' + d.productionGap + ' ton/ha</strong></div>' +
        '</div>' +
      '</div>';
    });
    listContainer.innerHTML = listHtml;
    // Bind click on division card to drill down
    var cards = listContainer.querySelectorAll('.division-card-item');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var div = card.getAttribute('data-divisi');
        state.division = div;
        state.block = 'all';
        var divSelect = document.getElementById('divisionFilter');
        if (divSelect) divSelect.value = div;
        populateBlockFilter();
        onFilterChanged();
        switchView('analysis', true);
        showToast('Menampilkan analisa blok untuk ' + div);
      });
    });
  }
  // =========================================================================
  // VIEW 7: DOKUMENTASI SEBELUM-SESUDAH
  // =========================================================================
  function bindDocControls() {
    var prevBtn = document.getElementById('btnPrevDoc');
    var nextBtn = document.getElementById('btnNextDoc');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (!window.SPT_DATA) return;
        var docs = window.SPT_DATA.DOCS_BEFORE_AFTER || [];
        state.currentDocIndex = (state.currentDocIndex - 1 + docs.length) % docs.length;
        renderDocViewer();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (!window.SPT_DATA) return;
        var docs = window.SPT_DATA.DOCS_BEFORE_AFTER || [];
        state.currentDocIndex = (state.currentDocIndex + 1) % docs.length;
        renderDocViewer();
      });
    }
  }
  function getFieldSvg(type, isAfter) {
    var bg = isAfter ? '#D1FAE5' : '#FEF3C7';
    var text = isAfter ? 'KONDISI BERSIH SETELAH APLIKASI' : 'SEMAK / GULMA / RUSAK SEBELUM APLIKASI';
    var iconColor = isAfter ? '#059669' : '#DC2626';
    return '<svg width="100%" height="100%" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="320" height="180" fill="' + bg + '"/>' +
      // Palm tree row silhouettes
      '<path d="M40 140 L70 50 L100 140 Z M130 140 L160 45 L190 140 Z M220 140 L250 55 L280 140 Z" fill="' + (isAfter ? '#10B981' : '#9CA3AF') + '" opacity="0.3"/>' +
      (isAfter
        // Neat clean ground and path
        ? '<rect x="20" y="130" width="280" height="30" fill="#34D399" opacity="0.4" rx="4"/>' +
          '<line x1="30" y1="145" x2="290" y2="145" stroke="#059669" stroke-width="4" stroke-dasharray="8,6"/>' +
          '<circle cx="160" cy="85" r="28" fill="#FFFFFF" stroke="#059669" stroke-width="3"/>' +
          '<path d="M150 85 L158 93 L172 75" fill="none" stroke="#059669" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
        // Messy bushes, weeds, broken path
        : '<path d="M30 155 Q50 110 70 155 Q90 120 110 155 Q130 100 150 155 Q170 115 190 155 Q210 95 230 155 Q250 110 270 155 Q290 120 300 155 Z" fill="#B45309" opacity="0.5"/>' +
          '<circle cx="160" cy="85" r="28" fill="#FFFFFF" stroke="#DC2626" stroke-width="3"/>' +
          '<line x1="148" y1="73" x2="172" y2="97" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>' +
          '<line x1="172" y1="73" x2="148" y2="97" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>'
      ) +
      '<rect x="20" y="15" width="280" height="24" fill="rgba(0,0,0,0.55)" rx="3"/>' +
      '<text x="160" y="31" fill="#FFFFFF" font-size="10" font-weight="700" text-anchor="middle" letter-spacing="0.5">' + text + '</text>' +
    '</svg>';
  }
  function renderDocViewer() {
    if (!window.SPT_DATA) return;
    var docs = window.SPT_DATA.DOCS_BEFORE_AFTER || [];
    if (docs.length === 0) return;
    var doc = docs[state.currentDocIndex];
    var counterEl = document.getElementById('docCounterText');
    if (counterEl) counterEl.textContent = 'Kasus ' + (state.currentDocIndex + 1) + ' dari ' + docs.length;
    var beforePhotoEl = document.getElementById('docPhotoBefore');
    var afterPhotoEl = document.getElementById('docPhotoAfter');
    var beforeDateEl = document.getElementById('docDateBefore');
    var afterDateEl = document.getElementById('docDateAfter');
    if (beforePhotoEl) beforePhotoEl.innerHTML = getFieldSvg(doc.beforeType, false);
    if (afterPhotoEl) {
      if (doc.isDone) {
        afterPhotoEl.innerHTML = getFieldSvg(doc.afterType, true);
      } else {
        afterPhotoEl.innerHTML = '<div class="photo-pending-card" style="height:100%;min-height:160px;">' +
          '<span class="pending-icon">⏳</span>' +
          '<strong>Foto Sesudah Belum Tersedia</strong>' +
          '<p>Pekerjaan fisik masih berlangsung di lapangan (' + doc.statusVerifikasi + '). Target penyelesaian: ' + doc.tglFollowUp + '.</p>' +
        '</div>';
      }
    }
    if (beforeDateEl) beforeDateEl.textContent = doc.tglIdentifikasi + ' WITA';
    if (afterDateEl) {
      afterDateEl.textContent = doc.isDone ? (doc.tglFollowUp + ' WITA') : ('Belum Selesai (Target: ' + doc.tglFollowUp + ')');
    }
    var locEl = document.getElementById('docLocationText');
    var probEl = document.getElementById('docProblemText');
    var actEl = document.getElementById('docActionText');
    var statusEl = document.getElementById('docStatusBadge');
    var noteEl = document.getElementById('docVerifierNote');
    if (locEl) locEl.textContent = doc.estate + ' · ' + doc.divisi + ' · Blok ' + doc.blok;
    if (probEl) probEl.textContent = doc.problem;
    if (actEl) actEl.textContent = doc.action;
    if (statusEl) {
      statusEl.textContent = doc.statusVerifikasi;
      statusEl.className = 'badge-status-lg ' + doc.statusBadgeClass;
    }
    if (noteEl) noteEl.textContent = doc.catatan;
  }
  function bindMockExportButtons() {
    var btnExp = document.getElementById('btnExportBccr');
    var btnPrt = document.getElementById('btnPrintBccr');
    if (btnExp) {
      btnExp.addEventListener('click', function () {
        exportBccrCsv();
      });
    }
    if (btnPrt) {
      btnPrt.addEventListener('click', function () {
        window.print();
      });
    }
  }
  // =========================================================================
  // VIEW 8: ASESMEN BLOK & VERIFIKASI ASKEP / MANAGER
  // =========================================================================
  var cachedAsesmenData = null;
  function getAsesmenDataset() {
    if (cachedAsesmenData) return cachedAsesmenData;
    var allBlocks = (window.SPT_DATA && window.SPT_DATA.ALL_BLOCKS) ? window.SPT_DATA.ALL_BLOCKS.slice() : [];
    if (allBlocks.length === 0) return [];
    var divMap = {
      'DIVISI 1': { asisten: 'Wahyu Pratama (Asisten Agronomi)', askep: 'Ir. Sudirman (Askep Rayon A)', blocks: [] },
      'DIVISI 2': { asisten: 'Dedy Kurniawan (Asisten Divisi 2)', askep: 'Ir. Sudirman (Askep Rayon A)', blocks: [] },
      'DIVISI 3': { asisten: 'Bambang S. (Asisten Divisi 3)', askep: 'H. Prasetyo Utomo (Askep Rayon B)', blocks: [] },
      'DIVISI 4': { asisten: 'Hendra Budiono (Asisten Divisi 4)', askep: 'H. Prasetyo Utomo (Askep Rayon B)', blocks: [] },
      'DIVISI 5': { asisten: 'Rian Hidayat (Asisten Divisi 5)', askep: 'H. Prasetyo Utomo (Askep Rayon B)', blocks: [] }
    };
    allBlocks.forEach(function (b) {
      if (divMap[b.divisi]) {
        divMap[b.divisi].blocks.push(b);
      }
    });
    var divSpecs = {
      'DIVISI 1': { approved: 14, pending: 3, revision: 1, progress: 4, outstanding: 2 },
      'DIVISI 2': { approved: 12, pending: 3, revision: 1, progress: 4, outstanding: 3 },
      'DIVISI 3': { approved: 13, pending: 2, revision: 2, progress: 3, outstanding: 2 },
      'DIVISI 4': { approved: 8,  pending: 3, revision: 1, progress: 4, outstanding: 4 },
      'DIVISI 5': { approved: 6,  pending: 3, revision: 2, progress: 4, outstanding: 5 }
    };
    var dataset = [];
    var findings = (state.allFindings && state.allFindings.length > 0)
      ? state.allFindings
      : (window.SPT_DATA ? window.SPT_DATA.ACTION_PLANS || [] : []);
    Object.keys(divMap).forEach(function (divName) {
      var dObj = divMap[divName];
      var spec = divSpecs[divName];
      var blist = dObj.blocks;
      blist.sort(function (a, b) {
        return a.blok.localeCompare(b.blok, undefined, { numeric: true });
      });
      var idx = 0;
      blist.forEach(function (b) {
        var statusAsisten = 'Sudah Diases';
        var verifAskep = 'Approved';
        var luasHa = (b.luas !== undefined && b.luas !== null) ? Number(b.luas) : 24.5;
        // Proporsi Pasar Pikul: ~2,2 Pasar Pikul per 1 Hektar (contoh: 10 Ha = 22 PP)
        var ppTotal = Math.max(1, Math.round(luasHa * 2.2));
        var ppCovered = ppTotal;
        var tglAsesmen = '10 Agu 2026';
        var samplingPP = Math.max(1, Math.ceil(ppTotal * 0.2)); // Standar Uji Petik Askep/Manager min. 20% PP
        var samplingPct = Math.round((samplingPP / ppTotal) * 100);
        var catatanAskep = '';
        if (idx < spec.approved) {
          statusAsisten = 'Sudah Diases';
          verifAskep = 'Approved';
          ppCovered = ppTotal;
          var day = 4 + (idx % 8);
          tglAsesmen = (day < 10 ? '0' : '') + day + ' Agu 2026';
          catatanAskep = 'Uji petik ' + samplingPct + '% PP (' + samplingPP + '/' + ppTotal + ' PP) valid · Seluruh temuan di blok disetujui otomatis (Cascade Approved).';
        } else if (idx < spec.approved + spec.pending) {
          statusAsisten = 'Sudah Diases';
          verifAskep = 'Pending';
          ppCovered = ppTotal;
          var day = 15 + (idx % 4);
          tglAsesmen = day + ' Agu 2026';
          samplingPP = 0;
          samplingPct = 0;
          var targetSampling = Math.max(1, Math.ceil(ppTotal * 0.2));
          catatanAskep = 'Asesmen tuntas 100% oleh Asisten (' + ppTotal + ' PP). Menunggu antrean jadwal uji petik lapangan Askep/Manager (target sampling min. 20% / ' + targetSampling + ' PP).';
        } else if (idx < spec.approved + spec.pending + spec.revision) {
          statusAsisten = 'Sudah Diases';
          verifAskep = 'Revision';
          ppCovered = Math.max(1, Math.round(ppTotal * 0.85));
          tglAsesmen = '14 Agu 2026';
          catatanAskep = 'Uji petik ' + samplingPct + '% PP (' + samplingPP + '/' + ppTotal + ' PP): 1 tagging (#02 Underpruning) perlu revisi volume fisik · Temuan lainnya valid disetujui.';
        } else if (idx < spec.approved + spec.pending + spec.revision + spec.progress) {
          statusAsisten = 'Dalam Pengerjaan';
          verifAskep = 'None';
          ppCovered = Math.max(1, Math.round(ppTotal * 0.45));
          tglAsesmen = 'Sedang berjalan';
          samplingPP = 0;
          samplingPct = 0;
          catatanAskep = 'Tim Asisten sedang melakukan tagging pasar pikul bertahap di lapangan (' + ppCovered + '/' + ppTotal + ' PP).';
        } else {
          statusAsisten = 'Outstanding';
          verifAskep = 'None';
          ppCovered = 0;
          tglAsesmen = 'Belum diases';
          samplingPP = 0;
          samplingPct = 0;
          catatanAskep = 'Belum dilakukan asesmen (terjadwal pada rotasi minggu depan · estimasi ' + ppTotal + ' PP).';
        }
        idx++;
        var blkIssues = findings.filter(function (f) { return f.blok === b.blok; });
        var majorCount = 0;
        var minorCount = 0;
        blkIssues.forEach(function (f) {
          if (f.sensitivity === 'Major') majorCount++;
          else minorCount++;
        });
        if (statusAsisten === 'Outstanding') {
          majorCount = 0;
          minorCount = 0;
        }
        dataset.push({
          estate: b.estate || 'SKDE',
          divisi: b.divisi,
          blok: b.blok,
          luas: luasHa,
          lat: b.lat,
          lng: b.lng,
          statusAsisten: statusAsisten,
          verifAskep: verifAskep,
          asistenPic: dObj.asisten,
          askepPic: dObj.askep,
          tglAsesmen: tglAsesmen,
          ppCovered: ppCovered,
          ppTotal: ppTotal,
          ppPct: Math.round((ppCovered / ppTotal) * 100),
          samplingPP: samplingPP,
          samplingPct: samplingPct,
          majorCount: majorCount,
          minorCount: minorCount,
          totalIssues: majorCount + minorCount,
          catatanAskep: catatanAskep
        });
      });
    });
    cachedAsesmenData = dataset;
    return dataset;
  }
  function renderAsesmenView() {
    var allData = getAsesmenDataset();
    if (!allData || allData.length === 0) return;
    // Connect seamlessly with top header filters
    var activeDivision = state.division || 'all';
    var activeBlock = state.block || 'all';
    // Synchronize in-page division select dropdown
    var divSelect = document.getElementById('asesmenDivFilter');
    if (divSelect && divSelect.value !== activeDivision) {
      divSelect.value = activeDivision;
    }
    state.asesmenFilterDivision = activeDivision;
    var statFilter = state.asesmenFilterStatus || 'all';
    var verifFilter = state.asesmenFilterVerif || 'all';
    var search = (state.asesmenSearchQuery || '').toLowerCase().trim();
    var filtered = allData.filter(function (item) {
      if (activeDivision !== 'all' && item.divisi !== activeDivision) return false;
      if (activeBlock !== 'all' && item.blok !== activeBlock) return false;
      if (statFilter !== 'all' && item.statusAsisten !== statFilter) return false;
      if (verifFilter !== 'all' && item.verifAskep !== verifFilter) return false;
      if (search) {
        var str = (item.divisi + ' ' + item.blok + ' ' + item.asistenPic + ' ' + item.catatanAskep + ' ' + item.verifAskep).toLowerCase();
        if (str.indexOf(search) === -1) return false;
      }
      return true;
    });
    var totalBlocks = filtered.length;
    var assessedCount = 0;
    var progressCount = 0;
    var outstandingCount = 0;
    var approvedCount = 0;
    var pendingCount = 0;
    var revisionCount = 0;
    var totalPP = 0;
    var coveredPP = 0;
    var totalHa = 0;
    var assessedHa = 0;
    var totalIssues = 0;
    filtered.forEach(function (item) {
      totalHa += item.luas;
      totalPP += item.ppTotal;
      coveredPP += item.ppCovered;
      totalIssues += item.totalIssues;
      if (item.statusAsisten === 'Sudah Diases') {
        assessedCount++;
        assessedHa += item.luas;
        if (item.verifAskep === 'Approved') approvedCount++;
        else if (item.verifAskep === 'Pending') pendingCount++;
        else if (item.verifAskep === 'Revision') revisionCount++;
      } else if (item.statusAsisten === 'Dalam Pengerjaan') {
        progressCount++;
      } else {
        outstandingCount++;
      }
    });
    var pctAssessed = totalBlocks > 0 ? ((assessedCount / totalBlocks) * 100).toFixed(1) : '0.0';
    var pctProgress = totalBlocks > 0 ? ((progressCount / totalBlocks) * 100).toFixed(1) : '0.0';
    var pctOutstanding = totalBlocks > 0 ? ((outstandingCount / totalBlocks) * 100).toFixed(1) : '0.0';
    var pctApprovedOfAssessed = assessedCount > 0 ? ((approvedCount / assessedCount) * 100).toFixed(1) : '0.0';
    var pctPP = totalPP > 0 ? ((coveredPP / totalPP) * 100).toFixed(1) : '0.0';
    var pctLuas = totalHa > 0 ? ((assessedHa / totalHa) * 100).toFixed(1) : '0.0';
    var elTotalAssessed = document.getElementById('asesmenKpiTotalAssessed');
    var elPctAssessed = document.getElementById('asesmenKpiPctAssessed');
    var elBarAssessed = document.getElementById('asesmenBarAssessed');
    var elBarProgress = document.getElementById('asesmenBarProgress');
    var elBarOutstanding = document.getElementById('asesmenBarOutstanding');
    var elSubAssessed = document.getElementById('asesmenKpiSubAssessed');
    if (elTotalAssessed) elTotalAssessed.textContent = assessedCount;
    if (elPctAssessed) elPctAssessed.textContent = pctAssessed + '%';
    if (elBarAssessed) elBarAssessed.style.width = pctAssessed + '%';
    if (elBarProgress) elBarProgress.style.width = pctProgress + '%';
    if (elBarOutstanding) elBarOutstanding.style.width = pctOutstanding + '%';
    if (elSubAssessed) elSubAssessed.textContent = progressCount + ' In Progress · ' + outstandingCount + ' Outstanding';
    var elApproved = document.getElementById('asesmenKpiApproved');
    var elApprovedPct = document.getElementById('asesmenKpiApprovedPct');
    var elPillApp = document.getElementById('pillApprovedCount');
    var elPillPen = document.getElementById('pillPendingCount');
    var elPillRev = document.getElementById('pillRevisionCount');
    if (elApproved) elApproved.textContent = approvedCount;
    if (elApprovedPct) elApprovedPct.textContent = pctApprovedOfAssessed + '%';
    if (elPillApp) elPillApp.textContent = '✓ ' + approvedCount + ' Approved';
    if (elPillPen) elPillPen.textContent = '⏳ ' + pendingCount + ' Menunggu';
    if (elPillRev) elPillRev.textContent = '⚠️ ' + revisionCount + ' Revisi';
    var elPP = document.getElementById('asesmenKpiPP');
    var elTotalPP = document.getElementById('asesmenKpiTotalPP');
    var elPPPct = document.getElementById('asesmenKpiPPPct');
    var elBarPP = document.getElementById('asesmenBarPP');
    var elPPSub = document.getElementById('asesmenKpiPPSub');
    if (elPP) elPP.textContent = coveredPP.toLocaleString('id-ID');
    if (elTotalPP) elTotalPP.textContent = totalPP.toLocaleString('id-ID');
    if (elPPPct) elPPPct.textContent = pctPP + '%';
    if (elBarPP) elBarPP.style.width = pctPP + '%';
    if (elPPSub) {
      var sisaPP = totalPP - coveredPP;
      elPPSub.textContent = 'Sisa ' + sisaPP.toLocaleString('id-ID') + ' PP Outstanding · Rasio ~2,2 PP/Ha';
    }
    var elIssues = document.getElementById('asesmenKpiIssues');
    if (elIssues) elIssues.textContent = totalIssues;
    var elLuas = document.getElementById('asesmenKpiLuas');
    var elLuasTotal = document.getElementById('asesmenKpiLuasTotal');
    var elLuasSub = document.getElementById('asesmenKpiLuasSub');
    if (elLuas) elLuas.textContent = assessedHa.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    if (elLuasTotal) elLuasTotal.textContent = totalHa.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    if (elLuasSub) {
      elLuasSub.textContent = pctLuas + '% dari total luas areal ' + (activeDivision !== 'all' ? activeDivision : 'konsesi SKDE');
    }
    var elCount = document.getElementById('asesmenResultCount');
    if (elCount) {
      var filterDesc = '';
      if (activeBlock !== 'all') filterDesc = ' (Blok ' + activeBlock + ')';
      else if (activeDivision !== 'all') filterDesc = ' (' + activeDivision + ')';
      elCount.textContent = 'Menampilkan ' + filtered.length + ' dari ' + allData.length + ' Blok' + filterDesc;
    }
    renderAsesmenDivisionCards(allData);
    renderAsesmenTableRows(filtered);
  }
  function renderAsesmenDivisionCards(allData) {
    var container = document.getElementById('asesmenDivisionGrid');
    if (!container) return;
    var divs = ['DIVISI 1', 'DIVISI 2', 'DIVISI 3', 'DIVISI 4', 'DIVISI 5'];
    var currentFilter = state.division || 'all';
    var html = '';
    divs.forEach(function (divName) {
      var dItems = allData.filter(function (x) { return x.divisi === divName; });
      var totalBlk = dItems.length;
      var assessed = 0;
      var approved = 0;
      var pending = 0;
      var revision = 0;
      var ppCovered = 0;
      var ppTotal = 0;
      var pic = dItems.length > 0 ? dItems[0].asistenPic.split(' ')[0] + ' ' + dItems[0].asistenPic.split(' ')[1] : '-';
      dItems.forEach(function (x) {
        ppTotal += x.ppTotal;
        ppCovered += x.ppCovered;
        if (x.statusAsisten === 'Sudah Diases') {
          assessed++;
          if (x.verifAskep === 'Approved') approved++;
          else if (x.verifAskep === 'Pending') pending++;
          else if (x.verifAskep === 'Revision') revision++;
        }
      });
      var ppPct = ppTotal > 0 ? Math.round((ppCovered / ppTotal) * 100) : 0;
      var assessedPct = totalBlk > 0 ? Math.round((assessed / totalBlk) * 100) : 0;
      var isSelected = currentFilter === divName;
      html += '<div class="asesmen-div-card ' + (isSelected ? 'active-div' : '') + '" onclick="window.SPT_APP.setAsesmenDivFilter(\'' + divName + '\')" title="Klik untuk filter ' + divName + '">' +
        '<div class="div-card-top">' +
          '<span class="div-card-name">' + divName + '</span>' +
          '<span class="div-card-badge">' + ppPct + '% PP</span>' +
        '</div>' +
        '<span class="div-card-pic">' + pic + '</span>' +
        '<div class="asesmen-mini-bar" style="margin:4px 0 2px 0;">' +
          '<div class="bar-fill bar-assessed" style="width:' + assessedPct + '%;"></div>' +
          '<div class="bar-fill bar-outstanding" style="width:' + (100 - assessedPct) + '%;"></div>' +
        '</div>' +
        '<div class="div-card-stats-row">' +
          '<span>Diases: <strong>' + assessed + '/' + totalBlk + '</strong></span>' +
          '<span>Approved: <strong style="color:var(--status-green);">' + approved + '</strong></span>' +
          '<span>Revisi: <strong style="color:var(--status-orange);">' + revision + '</strong></span>' +
        '</div>' +
      '</div>';
    });
    container.innerHTML = html;
  }
  function renderAsesmenTableRows(items) {
    var tbody = document.getElementById('asesmenTableBody');
    if (!tbody) return;
    if (items.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:24px;color:var(--text-muted);font-size:12px;">Tidak ditemukan data asesmen blok yang sesuai filter.</td></tr>';
      return;
    }
    var html = '';
    items.forEach(function (row) {
      var statusBadge = '';
      if (row.statusAsisten === 'Sudah Diases') {
        statusBadge = '<span class="badge-status-diases">✓ Sudah Diases</span>';
      } else if (row.statusAsisten === 'Dalam Pengerjaan') {
        statusBadge = '<span class="badge-status-progress">⏳ Pengerjaan</span>';
      } else {
        statusBadge = '<span class="badge-status-outstanding">○ Outstanding</span>';
      }
      var verifBadge = '';
      if (row.verifAskep === 'Approved') {
        verifBadge = '<div><span class="badge-verif-approved" title="Pimpinan mengesahkan level blok · Seluruh temuan otomatis disetujui">✓ Disetujui (Blok)</span><div style="font-size:9.5px;color:#047857;margin-top:2px;font-weight:600;">Uji Petik ' + row.samplingPct + '% PP · Auto-Approved</div></div>';
      } else if (row.verifAskep === 'Pending') {
        verifBadge = '<div><span class="badge-verif-pending" title="Menunggu jadwal uji petik lapangan oleh Askep/Manager">⏳ Menunggu Verifikasi</span><div style="font-size:9.5px;color:#1D4ED8;margin-top:2px;">Target Uji Petik ≥20% PP</div></div>';
      } else if (row.verifAskep === 'Revision') {
        verifBadge = '<div><span class="badge-verif-revision" title="Ditemukan ketidaksesuaian spesifik pada tagging temuan saat uji petik">⚠️ Perlu Revisi</span><div style="font-size:9.5px;color:#B45309;margin-top:2px;font-weight:600;">Uji Petik ' + row.samplingPct + '% · Flag Revisi</div></div>';
      } else {
        verifBadge = '<span class="badge-verif-none">-</span>';
      }
      var ppBarColor = row.ppPct >= 80 ? '#10B981' : (row.ppPct >= 40 ? '#3B82F6' : '#94A3B8');
      html += '<tr>' +
        '<td style="font-weight:700;color:var(--text-secondary);">' + row.divisi + '</td>' +
        '<td style="font-weight:800;color:var(--primary-red);">' + row.blok + '</td>' +
        '<td style="text-align:right;">' + (row.luas ? row.luas.toFixed(2) : '-') + '</td>' +
        '<td>' + statusBadge + '</td>' +
        '<td>' + verifBadge + '</td>' +
        '<td><div style="font-weight:600;font-size:11px;">' + row.asistenPic.split(' (')[0] + '</div><div style="font-size:9.5px;color:var(--text-muted);">' + row.tglAsesmen + '</div></td>' +
        '<td>' +
          '<div class="pp-progress-cell">' +
            '<div class="pp-progress-text"><strong>' + row.ppCovered + '/' + row.ppTotal + ' PP</strong><span style="color:var(--text-muted);">' + row.ppPct + '%</span></div>' +
            '<div class="pp-bar-track"><div class="pp-bar-fill" style="width:' + row.ppPct + '%;background:' + ppBarColor + ';"></div></div>' +
          '</div>' +
        '</td>' +
        '<td style="text-align:center;">' +
          (row.totalIssues > 0
            ? '<span class="summary-pill major" style="font-size:9.5px;padding:1px 5px;">M ' + row.majorCount + '</span> <span class="summary-pill minor" style="font-size:9.5px;padding:1px 5px;">m ' + row.minorCount + '</span>'
            : '<span style="color:var(--text-muted);font-size:10px;">-</span>') +
        '</td>' +
        '<td style="font-size:11px;color:var(--text-secondary);line-height:1.3;">' + row.catatanAskep + '</td>' +
        '<td style="text-align:center;white-space:nowrap;">' +
          '<button type="button" class="btn-table-action btn-action-map" onclick="window.SPT_APP.jumpToBlockMap(\'' + row.divisi + '\', \'' + row.blok + '\')" title="Lihat di Peta Permasalahan">🗺️ Peta</button> ' +
          '<a href="tagging_blok.html?blok=' + row.blok + '" class="btn-table-action btn-action-sim" title="Buka Simulasi Pasar Pikul">📋 Simulasi</a>' +
        '</td>' +
      '</tr>';
    });
    tbody.innerHTML = html;
  }
  function exportAsesmenCsv() {
    var allData = getAsesmenDataset();
    var activeDivision = state.division || 'all';
    var activeBlock = state.block || 'all';
    var statFilter = state.asesmenFilterStatus || 'all';
    var verifFilter = state.asesmenFilterVerif || 'all';
    var search = (state.asesmenSearchQuery || '').toLowerCase().trim();
    var filtered = allData.filter(function (item) {
      if (activeDivision !== 'all' && item.divisi !== activeDivision) return false;
      if (activeBlock !== 'all' && item.blok !== activeBlock) return false;
      if (statFilter !== 'all' && item.statusAsisten !== statFilter) return false;
      if (verifFilter !== 'all' && item.verifAskep !== verifFilter) return false;
      if (search) {
        var str = (item.divisi + ' ' + item.blok + ' ' + item.asistenPic + ' ' + item.catatanAskep + ' ' + item.verifAskep).toLowerCase();
        if (str.indexOf(search) === -1) return false;
      }
      return true;
    });
    var csv = '\uFEFF';
    csv += 'Estate,Divisi,Blok,Luas_Ha,Status_Asisten,Verifikasi_Askep_Manager,Asisten_PIC,Askep_PIC,Tanggal_Asesmen,PP_Terases,Total_PP,Persen_PP,Temuan_Major,Temuan_Minor,Catatan_Verifikasi\r\n';
    filtered.forEach(function (r) {
      var row = [
        r.estate,
        r.divisi,
        r.blok,
        r.luas,
        '"' + r.statusAsisten + '"',
        '"' + (r.verifAskep === 'Approved' ? 'Disetujui' : (r.verifAskep === 'Pending' ? 'Menunggu Verifikasi' : (r.verifAskep === 'Revision' ? 'Perlu Revisi' : '-'))) + '"',
        '"' + r.asistenPic + '"',
        '"' + r.askepPic + '"',
        '"' + r.tglAsesmen + '"',
        r.ppCovered,
        r.ppTotal,
        r.ppPct + '%',
        r.majorCount,
        r.minorCount,
        '"' + r.catatanAskep.replace(/"/g, '""') + '"'
      ];
      csv += row.join(',') + '\r\n';
    });
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'rekap_asesmen_blok_skde_' + (new Date().toISOString().slice(0, 10)) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Berhasil mengekspor data ' + filtered.length + ' blok ke CSV');
  }
  function bindAsesmenControls() {
    var divSelect = document.getElementById('asesmenDivFilter');
    var statusSelect = document.getElementById('asesmenStatusFilter');
    var verifSelect = document.getElementById('asesmenVerifFilter');
    var searchInput = document.getElementById('asesmenSearchInput');
    var clearBtn = document.getElementById('btnResetAsesmenFilter');
    var exportBtn = document.getElementById('btnExportAsesmenCsv');
    if (divSelect) {
      divSelect.addEventListener('change', function () {
        var val = divSelect.value;
        state.division = val;
        state.block = 'all';
        var topDiv = document.getElementById('divisionFilter');
        if (topDiv) topDiv.value = val;
        populateBlockFilter();
        onFilterChanged();
      });
    }
    if (statusSelect) {
      statusSelect.addEventListener('change', function () {
        state.asesmenFilterStatus = statusSelect.value;
        renderAsesmenView();
      });
    }
    if (verifSelect) {
      verifSelect.addEventListener('change', function () {
        state.asesmenFilterVerif = verifSelect.value;
        renderAsesmenView();
      });
    }
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        state.asesmenSearchQuery = searchInput.value;
        if (clearBtn) {
          clearBtn.style.display = searchInput.value ? 'block' : 'none';
        }
        renderAsesmenView();
      });
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        state.asesmenSearchQuery = '';
        state.division = 'all';
        state.block = 'all';
        state.asesmenFilterStatus = 'all';
        state.asesmenFilterVerif = 'all';
        var topDiv = document.getElementById('divisionFilter');
        if (topDiv) topDiv.value = 'all';
        populateBlockFilter();
        var inDiv = document.getElementById('asesmenDivFilter');
        if (inDiv) inDiv.value = 'all';
        var inStat = document.getElementById('asesmenStatusFilter');
        if (inStat) inStat.value = 'all';
        var inVerif = document.getElementById('asesmenVerifFilter');
        if (inVerif) inVerif.value = 'all';
        clearBtn.style.display = 'none';
        onFilterChanged();
      });
    }
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        exportAsesmenCsv();
      });
    }
  }
  function triggerMapsResize() {
    setTimeout(function () {
      if (state.mapAssessment) {
        state.mapAssessment.invalidateSize();
      }
      if (state.mapBccr && state.mapBccr !== state.mapAssessment) {
        state.mapBccr.invalidateSize();
      }
      if (state.mapProblem && state.mapProblem !== state.mapAssessment) {
        state.mapProblem.invalidateSize();
      }
    }, 100);
  }
  function onLoginSuccess() {
    setTimeout(function () {
      if (!state.mapsInitialized) {
        initMaps();
      } else {
        triggerMapsResize();
      }
    }, 150);
  }
    function updateMapZoomClasses() {
    if (!state.mapAssessment) return;
    try {
      var mapEl = state.mapAssessment.getContainer();
      if (!mapEl) return;
      var z = state.mapAssessment.getZoom();
      mapEl.classList.remove('zoom-estate', 'zoom-divisi', 'zoom-blok');
      if (z < 14) {
        mapEl.classList.add('zoom-estate');
      } else if (z >= 14 && z < 16) {
        mapEl.classList.add('zoom-divisi');
      } else {
        mapEl.classList.add('zoom-blok');
      }
    } catch (e) {}
  }
  
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
      return String(v == null ? '' : v).trim().toLowerCase().replace(/\s+/g, ' ');
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
          var parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.date);
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
          label = p.blok + '\n' + pctStr;
        } else {
          label = p.blok + '\n' + tags.length + ' tagging';
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
    if (!state.problemAnalytics && typeof createSPTProblemAnalytics === 'function' && state.problemTagsGeoJson && state.geoJsonData) {
      state.problemAnalytics = createSPTProblemAnalytics({
        tagGeojson: state.problemTagsGeoJson,
        tnkePolygons: state.geoJsonData,
        problemMaster: state.problemMaster || window.TNKE_SPT_PROBLEM_MASTER_16,
        actionPlanMockup: state.actionPlanMockup || window.TNKE_ACTION_PLAN_MOCKUP
      });
    }
    var toggleGroup = document.getElementById('mapModeToggleGroup');
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
      if (toggleGroup) toggleGroup.classList.add('problem-active');
      if (btnCov) {
        btnCov.classList.remove('active', 'coverage-active');
        btnCov.setAttribute('aria-selected', 'false');
      }
      if (btnPrb) {
        btnPrb.classList.add('active', 'problem-active');
        btnPrb.setAttribute('aria-selected', 'true');
      }
      if (catWrap) catWrap.style.display = 'inline-flex';
      if (titleEl) titleEl.textContent = 'Peta Status Permasalahan & Action Plan';
      if (subEl) subEl.textContent = 'Status masalah dan tindak lanjut per blok (Belum ada > On Progress > Closed)';
      if (covTabs) covTabs.style.display = 'none';
      if (prbHeader) prbHeader.style.display = 'flex';
      if (covLegend) covLegend.style.display = 'none';
      if (prbLegend) prbLegend.style.display = 'flex';
    } else {
      if (toggleGroup) toggleGroup.classList.remove('problem-active');
      if (btnCov) {
        btnCov.classList.add('active', 'coverage-active');
        btnCov.setAttribute('aria-selected', 'true');
      }
      if (btnPrb) {
        btnPrb.classList.remove('active', 'problem-active');
        btnPrb.setAttribute('aria-selected', 'false');
      }
      if (catWrap) catWrap.style.display = 'none';
      if (titleEl) titleEl.textContent = 'Peta Coverage Observasi Blok';
      if (subEl) subEl.textContent = 'Visualisasi cakupan observasi per blok';
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
    var categories = (state.problemMaster && state.problemMaster.categories) ||
                     (window.TNKE_SPT_PROBLEM_MASTER_16 && window.TNKE_SPT_PROBLEM_MASTER_16.categories) ||
                     [];
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

  async function initMaps() {
    if (state.mapsInitialized) {
      triggerMapsResize();
      return;
    }
    if (typeof L === 'undefined') {
      console.warn('Leaflet not loaded');
      return;
    }
    var defaultCenter = [0.5317, 111.7834]; // TNKE Bounding Box Center
    var defaultZoom = 12;
    var tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    var tileOptions = {
      maxZoom: 18,
      attribution: 'OpenStreetMap'
    };
    try {
      var mapEl = document.getElementById('mapAssessment') || document.getElementById('mapBCCR') || document.getElementById('mapProblem');
      if (mapEl) {
        state.mapAssessment = L.map(mapEl.id, {
          center: defaultCenter,
          zoom: defaultZoom,
          zoomControl: false,
          attributionControl: false,
          preferCanvas: true
        });
        state.mapBccr = state.mapAssessment;
        state.mapProblem = state.mapAssessment;
        // Dual basemap options: OpenStreetMap & ArcGIS World Imagery
        state.basemapOsm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors'
        });
        state.basemapArcgis = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 19,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });
        
        // Default to ArcGIS satellite imagery as requested
        state.activeBasemap = 'arcgis';
        try {
          state.basemapArcgis.addTo(state.mapAssessment);
        } catch (tileErr) {
          console.warn('ArcGIS tile layer error, fallback to OSM:', tileErr);
          state.basemapOsm.addTo(state.mapAssessment);
          state.activeBasemap = 'osm';
        }
        try {
          L.control.zoom({ position: 'topleft' }).addTo(state.mapAssessment);
        } catch (zErr) {}
        updateMapZoomClasses();
        state.mapAssessment.on('zoomend', function () {
          updateMapZoomClasses();
          renderTrackingLayers();
        });
      }
      state.mapsInitialized = true;
      await loadGeoJsonData();
    } catch (err) {
      console.error('Map initialization failed:', err);
    }
  }

  function setBasemapLayer(layerType) {
    state.activeBasemap = layerType || 'arcgis';
    if (!state.mapAssessment) return;
    try {
      if (state.basemapOsm && state.mapAssessment.hasLayer(state.basemapOsm)) {
        state.mapAssessment.removeLayer(state.basemapOsm);
      }
      if (state.basemapArcgis && state.mapAssessment.hasLayer(state.basemapArcgis)) {
        state.mapAssessment.removeLayer(state.basemapArcgis);
      }
      if (state.activeBasemap === 'arcgis') {
        if (!state.basemapArcgis) {
          state.basemapArcgis = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          });
        }
        state.basemapArcgis.addTo(state.mapAssessment);
        if (state.basemapArcgis.bringToBack) state.basemapArcgis.bringToBack();
      } else {
        if (!state.basemapOsm) {
          state.basemapOsm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
          });
        }
        state.basemapOsm.addTo(state.mapAssessment);
        if (state.basemapOsm.bringToBack) state.basemapOsm.bringToBack();
      }
      var btnOsm = document.getElementById('btnBasemapOsm');
      var btnArcgis = document.getElementById('btnBasemapArcgis');
      if (btnOsm) {
        if (state.activeBasemap === 'osm') {
          btnOsm.classList.add('active');
          btnOsm.setAttribute('aria-pressed', 'true');
        } else {
          btnOsm.classList.remove('active');
          btnOsm.setAttribute('aria-pressed', 'false');
        }
      }
      if (btnArcgis) {
        if (state.activeBasemap === 'arcgis') {
          btnArcgis.classList.add('active');
          btnArcgis.setAttribute('aria-pressed', 'true');
        } else {
          btnArcgis.classList.remove('active');
          btnArcgis.setAttribute('aria-pressed', 'false');
        }
      }
    } catch (e) {
      console.warn('setBasemapLayer error:', e);
    }
  }
  async function loadGeoJsonData() {
    var bccrLoading = document.getElementById('mapAssessmentLoading') || document.getElementById('mapBccrLoading');
    function hideLoaders() {
      if (bccrLoading) {
        bccrLoading.classList.add('hidden');
        bccrLoading.style.display = 'none';
      }
    }
    try {
      var geojson = null;
      if (window.TNKE_GEOJSON && window.TNKE_GEOJSON.features && window.TNKE_GEOJSON.features.length > 0) {
        geojson = window.TNKE_GEOJSON;
      } else {
        var response = await fetch('./TNKE.json');
        if (!response.ok) throw new Error('HTTP status ' + response.status);
        var payload = await response.json();
        geojson = payload.data ?? payload;
      }
      if (!geojson || geojson.type !== 'FeatureCollection' || !Array.isArray(geojson.features)) {
        throw new Error('Format GeoJSON TNKE tidak valid');
      }
      window.TNKE_GEOJSON = geojson;
      if (window.tnkeStore) {
        window.tnkeStore.ensureInitialized(geojson);
      }
      state.geoJsonData = geojson;
      // Load tracking GeoJSON (fetch ./tracking/tnke_tracking.geojson, fallback to window.TNKE_TRACKING_GEOJSON)
      try {
        var trackingResp = await fetch('./tracking/tnke_tracking.geojson');
        if (trackingResp.ok) {
          state.trackingGeoJson = await trackingResp.json();
          window.TNKE_TRACKING_GEOJSON = state.trackingGeoJson;
        } else if (window.TNKE_TRACKING_GEOJSON && window.TNKE_TRACKING_GEOJSON.features) {
          state.trackingGeoJson = window.TNKE_TRACKING_GEOJSON;
        }
      } catch (tErr) {
        if (window.TNKE_TRACKING_GEOJSON && window.TNKE_TRACKING_GEOJSON.features) {
          state.trackingGeoJson = window.TNKE_TRACKING_GEOJSON;
        } else {
          console.warn('Could not load tracking geojson:', tErr);
        }
      }
      // Load problem tags GeoJSON (fetch ./tracking/tnke_problem_tags.geojson, fallback to window.TNKE_PROBLEM_TAGS_GEOJSON)
      try {
        var tagsResp = await fetch('./tracking/tnke_problem_tags.geojson');
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
      // Load problem master 16 (fetch ./tnke_spt_problem_master_16.json, fallback to window.TNKE_SPT_PROBLEM_MASTER_16)
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
      var chkTags = document.getElementById('chkToggleProblemTags');
      if (chkTags) {
        chkTags.onchange = function () {
          state.showProblemTags = chkTags.checked;
          renderProblemTagMarkers();
        };
      }
      populateBlockFilter();
      renderGeoJsonLayers(geojson);
      hideLoaders();
      triggerMapsResize();
      updateAssessmentSummaryCards();
    } catch (err) {
      console.error('Gagal memuat TNKE.json:', err);
      hideLoaders();
      showToast('⚠️ Gagal memuat TNKE.json: ' + err.message, 5000);
    }
  }
  // =========================================================================
  // MAPS & GEOSPATIAL CONTROLLER (BCCR CHOROPLETH & TRABAS SEBARAN MASALAH)
  // =========================================================================
  function bindMapFullscreenControls() {
    // 1. Fullscreen BCCR Map (Icon button & Exit button)
    var btnFsBccr = document.getElementById('btnFullscreenBccr');
    var btnExitFsBccr = document.getElementById('btnExitFullscreenBccr');
    if (btnFsBccr) {
      btnFsBccr.onclick = function (e) {
        if (e) e.stopPropagation();
        toggleFullscreenBccr();
      };
    }
    if (btnExitFsBccr) {
      btnExitFsBccr.onclick = function (e) {
        if (e) e.stopPropagation();
        toggleFullscreenBccr(false);
      };
    }
    // 2. Fullscreen Problem Map (Icon button, floating map button & Exit button)
    var btnFsProb = document.getElementById('btnFullscreenProblem');
    var btnFloatFsProb = document.getElementById('btnFloatFullscreenProblem');
    var btnExitFsProb = document.getElementById('btnExitFullscreenProblem');
    if (btnFsProb) {
      btnFsProb.onclick = function (e) {
        if (e) e.stopPropagation();
        toggleFullscreenProblem();
      };
    }
    if (btnFloatFsProb) {
      btnFloatFsProb.onclick = function (e) {
        if (e) e.stopPropagation();
        toggleFullscreenProblem();
      };
    }
    if (btnExitFsProb) {
      btnExitFsProb.onclick = function (e) {
        if (e) e.stopPropagation();
        toggleFullscreenProblem(false);
      };
    }
    // 3. Toggle 16 Categories Legend Drawer
    var btnLegProb = document.getElementById('btnToggleLegendProblem');
    var btnLegHud = document.getElementById('btnToggleLegendHud');
    var btnCloseLeg = document.getElementById('btnCloseLegendDrawer');
    var legDrawer = document.getElementById('mapProblemLegendDrawer');
    function toggleLegendDrawer(force) {
      if (!legDrawer) return;
      var isOpen = legDrawer.style.display !== 'none';
      var willOpen = force !== undefined ? force : !isOpen;
      legDrawer.style.display = willOpen ? 'flex' : 'none';
      if (btnLegProb) btnLegProb.classList.toggle('active', willOpen);
      if (btnLegHud) btnLegHud.classList.toggle('active', willOpen);
    }
    if (btnLegProb) btnLegProb.addEventListener('click', function () { toggleLegendDrawer(); });
    if (btnLegHud) btnLegHud.addEventListener('click', function () { toggleLegendDrawer(); });
    if (btnCloseLeg) btnCloseLeg.addEventListener('click', function () { toggleLegendDrawer(false); });
    // 4. Keyboard Escape to exit Fullscreen, Add Mode, or Legend
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        if (state.addFindingMode) {
          cancelAddFindingMode();
          return;
        }
        if (legDrawer && legDrawer.style.display !== 'none') {
          toggleLegendDrawer(false);
          return;
        }
        if (state.isFullscreenProblem) toggleFullscreenProblem(false);
        if (state.isFullscreenBccr) toggleFullscreenBccr(false);
      }
    });
    // 5. Native Fullscreen API Event Listener
    document.addEventListener('fullscreenchange', function () {
      var fsEl = document.fullscreenElement;
      if (!fsEl) {
        if (state.isFullscreenBccr) {
          state.isFullscreenBccr = false;
          var pBccr = document.getElementById('panelMapBccr');
          if (pBccr) pBccr.classList.remove('panel-fullscreen');
          var hudBccr = document.getElementById('hudMapBccr');
          if (hudBccr) hudBccr.style.display = 'none';
          if (state.mapBccr) state.mapBccr.invalidateSize();
        }
        if (state.isFullscreenProblem) {
          state.isFullscreenProblem = false;
          var pProb = document.getElementById('panelMapProblem');
          if (pProb) pProb.classList.remove('panel-fullscreen');
          var hudProb = document.getElementById('hudMapProblem');
          if (hudProb) hudProb.style.display = 'none';
          var exitBtn = document.getElementById('btnExitFullscreenProblem');
          if (exitBtn) exitBtn.style.display = 'none';
          if (state.mapProblem) {
            state.mapProblem.invalidateSize();
            updateProblemMapSemanticZoom();
          }
        }
        document.body.classList.remove('has-fullscreen-map');
      }
    });
  }
  function toggleFullscreenBccr(forceState) {
    var panel = document.getElementById('panelMapBccr');
    var hud = document.getElementById('hudMapBccr');
    if (!panel) return;
    var willBeFull = forceState !== undefined ? forceState : !state.isFullscreenBccr;
    state.isFullscreenBccr = willBeFull;
    if (willBeFull) {
      if (state.isFullscreenProblem) toggleFullscreenProblem(false);
      panel.classList.add('panel-fullscreen');
      document.body.classList.add('has-fullscreen-map');
      if (hud) hud.style.display = 'flex';
      syncBccrHudFilters();
      try {
        if (!document.fullscreenElement && panel.requestFullscreen) {
          panel.requestFullscreen().catch(function () {});
        }
      } catch (e) {}
      showToast('Mode Layar Penuh Peta BCCR aktif [Tekan Esc untuk keluar]');
    } else {
      panel.classList.remove('panel-fullscreen');
      document.body.classList.remove('has-fullscreen-map');
      if (hud) hud.style.display = 'none';
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(function () {});
        }
      } catch (e) {}
    }
    setTimeout(function () {
      if (state.mapBccr) state.mapBccr.invalidateSize();
    }, 60);
    setTimeout(function () {
      if (state.mapBccr) state.mapBccr.invalidateSize();
    }, 220);
  }
  function toggleFullscreenProblem(forceState) {
    var panel = document.getElementById('panelMapProblem');
    var hud = document.getElementById('hudMapProblem');
    var exitBtn = document.getElementById('btnExitFullscreenProblem');
    if (!panel) return;
    var willBeFull = forceState !== undefined ? forceState : !state.isFullscreenProblem;
    state.isFullscreenProblem = willBeFull;
    if (willBeFull) {
      if (state.isFullscreenBccr) toggleFullscreenBccr(false);
      panel.classList.add('panel-fullscreen');
      document.body.classList.add('has-fullscreen-map');
      if (hud) hud.style.display = 'flex';
      if (exitBtn) exitBtn.style.display = 'inline-flex';
      syncHudFilters();
      try {
        if (!document.fullscreenElement && panel.requestFullscreen) {
          panel.requestFullscreen().catch(function () {});
        }
      } catch (e) {}
      showToast('Mode Layar Penuh Peta Sebaran Masalah aktif');
    } else {
      panel.classList.remove('panel-fullscreen');
      document.body.classList.remove('has-fullscreen-map');
      if (hud) hud.style.display = 'none';
      if (exitBtn) exitBtn.style.display = 'none';
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(function () {});
        }
      } catch (e) {}
    }
    setTimeout(function () {
      if (state.mapProblem) {
        state.mapProblem.invalidateSize();
        updateProblemMapSemanticZoom();
      }
    }, 60);
    setTimeout(function () {
      if (state.mapProblem) {
        state.mapProblem.invalidateSize();
        updateProblemMapSemanticZoom();
      }
    }, 220);
  }
  function syncHudFilters() {
    var hudDiv = document.getElementById('hudFilterDivision');
    if (hudDiv) hudDiv.value = state.division || 'all';
    populateHudBlockFilter(state.division);
    var hudBlk = document.getElementById('hudFilterBlock');
    if (hudBlk) hudBlk.value = state.block || 'all';
    var hudCat = document.getElementById('hudFilterCategory');
    if (hudCat) hudCat.value = state.problemFilterCategory || 'all';
    var hudSens = document.getElementById('hudFilterSensitivity');
    if (hudSens) hudSens.value = state.problemFilterSensitivity || 'all';
    var hudStat = document.getElementById('hudFilterStatus');
    if (hudStat) hudStat.value = state.problemFilterStatus || 'all';
    var hudTf = document.getElementById('hudFilterTimeframe');
    if (hudTf) hudTf.value = state.problemFilterTimeframe || 'all';
    syncResetManualButton();
  }
  function syncBccrHudFilters() {
    var hudDiv = document.getElementById('hudBccrFilterDivision');
    if (hudDiv) hudDiv.value = state.division || 'all';
    populateBccrHudBlockFilter(state.division);
    var hudBlk = document.getElementById('hudBccrFilterBlock');
    if (hudBlk) hudBlk.value = state.block || 'all';
    var hudRange = document.getElementById('hudBccrFilterRange');
    if (hudRange) hudRange.value = state.bccrFilterRange || 'all';
  }
  function populateHudBlockFilter(selectedDiv) {
    var blkSelect = document.getElementById('hudFilterBlock');
    if (!blkSelect || !window.SPT_DATA) return;
    var allBlks = window.SPT_DATA.ALL_BLOCKS || [];
    var filteredBlks = allBlks;
    if (selectedDiv && selectedDiv !== 'all') {
      filteredBlks = allBlks.filter(function (b) { return b.divisi === selectedDiv; });
    }
    var blkHtml = '<option value="all">Semua Blok (' + filteredBlks.length + ')</option>';
    filteredBlks.forEach(function (b) {
      blkHtml += '<option value="' + b.blok + '">' + b.blok + ' (' + b.openProblems + ' temuan)</option>';
    });
    blkSelect.innerHTML = blkHtml;
    blkSelect.value = state.block && filteredBlks.some(function(b){ return b.blok === state.block; }) ? state.block : 'all';
  }
  function populateBccrHudBlockFilter(selectedDiv) {
    var blkSelect = document.getElementById('hudBccrFilterBlock');
    if (!blkSelect || !window.SPT_DATA) return;
    var allBlks = window.SPT_DATA.ALL_BLOCKS || [];
    var filteredBlks = allBlks;
    if (selectedDiv && selectedDiv !== 'all') {
      filteredBlks = allBlks.filter(function (b) { return b.divisi === selectedDiv; });
    }
    var blkHtml = '<option value="all">Semua Blok (' + filteredBlks.length + ')</option>';
    filteredBlks.forEach(function (b) {
      blkHtml += '<option value="' + b.blok + '">' + b.blok + ' (' + b.bccrYTD + '%)</option>';
    });
    blkSelect.innerHTML = blkHtml;
    blkSelect.value = state.block && filteredBlks.some(function(b){ return b.blok === state.block; }) ? state.block : 'all';
  }
  function syncResetManualButton() {
    var btnReset = document.getElementById('btnResetManualFindings');
    if (!btnReset || !window.SPT_DATA) return;
    var manuals = window.SPT_DATA.getManualFindings();
    if (manuals.length > 0) {
      btnReset.style.display = 'inline-flex';
      btnReset.title = 'Reset ' + manuals.length + ' temuan manual lokal';
    } else {
      btnReset.style.display = 'none';
    }
  }
  function bindMapBccrFilters() {
    var divSelect = document.getElementById('hudBccrFilterDivision');
    var blkSelect = document.getElementById('hudBccrFilterBlock');
    var rangeSelect = document.getElementById('hudBccrFilterRange');
    var fitBtn = document.getElementById('btnBccrFitBounds');
    var resetBtn = document.getElementById('btnBccrResetFilter');
    if (divSelect) {
      divSelect.addEventListener('change', function () {
        state.division = divSelect.value;
        state.block = 'all';
        var mainDiv = document.getElementById('divisionFilter');
        if (mainDiv) mainDiv.value = divSelect.value;
        populateBlockFilter();
        populateBccrHudBlockFilter(divSelect.value);
        onFilterChanged();
        updateMapHighlight();
      });
    }
    if (blkSelect) {
      blkSelect.addEventListener('change', function () {
        state.block = blkSelect.value;
        var mainBlk = document.getElementById('blockFilter');
        if (mainBlk) mainBlk.value = blkSelect.value;
        onFilterChanged();
        updateMapHighlight();
        if (state.block !== 'all' && state.mapBccr && state.bccrGeoJsonLayer) {
          state.bccrGeoJsonLayer.eachLayer(function (layer) {
            var p = layer.feature ? layer.feature.properties : {};
            if (p.blok === state.block) {
              state.mapBccr.fitBounds(layer.getBounds(), { maxZoom: 16, padding: [30, 30] });
            }
          });
        }
      });
    }
    if (rangeSelect) {
      rangeSelect.addEventListener('change', function () {
        state.bccrFilterRange = rangeSelect.value;
        updateMapHighlight();
      });
    }
    if (fitBtn) {
      fitBtn.addEventListener('click', function () {
        if (state.mapBccr && state.bccrGeoJsonLayer) {
          state.mapBccr.fitBounds(state.bccrGeoJsonLayer.getBounds(), { padding: [20, 20] });
        }
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        state.division = 'all';
        state.block = 'all';
        state.bccrFilterRange = 'all';
        if (divSelect) divSelect.value = 'all';
        if (blkSelect) blkSelect.value = 'all';
        if (rangeSelect) rangeSelect.value = 'all';
        var mainDiv = document.getElementById('divisionFilter');
        if (mainDiv) mainDiv.value = 'all';
        populateBlockFilter();
        populateBccrHudBlockFilter('all');
        onFilterChanged();
        if (state.mapBccr && state.bccrGeoJsonLayer) {
          state.mapBccr.fitBounds(state.bccrGeoJsonLayer.getBounds(), { padding: [20, 20] });
        }
        showToast('Filter BCCR direset ke seluruh estate');
      });
    }
  }
  function bindMapProblemFilters() {
    // 1. Division Select in HUD
    var hudDiv = document.getElementById('hudFilterDivision');
    if (hudDiv) {
      hudDiv.value = state.division || 'DIVISI 3';
      hudDiv.addEventListener('change', function () {
        state.division = hudDiv.value;
        state.problemFilterDivision = hudDiv.value;
        state.block = 'all';
        state.problemFilterBlock = 'all';
        state.focusedBlock = null;
        var mainDiv = document.getElementById('divisionFilter');
        if (mainDiv) mainDiv.value = hudDiv.value;
        populateBlockFilter();
        populateHudBlockFilter(hudDiv.value);
        onFilterChanged();
        var locText = document.getElementById('hudProblemLocationText');
        if (locText) {
          locText.textContent = hudDiv.value === 'all' ? 'Estate SKDE · Semua Divisi' : ('Estate SKDE · ' + hudDiv.value);
        }
        updateProblemMapSemanticZoom();
        showToast('Filter Divisi: ' + (hudDiv.value === 'all' ? 'Semua Divisi' : hudDiv.value));
      });
    }
    // 2. Block select in HUD
    populateHudBlockFilter(state.division || 'DIVISI 3');
    var blkSelect = document.getElementById('hudFilterBlock');
    if (blkSelect) {
      blkSelect.addEventListener('change', function () {
        var blk = blkSelect.value;
        state.problemFilterBlock = blk;
        state.block = blk;
        state.focusedBlock = blk === 'all' ? null : blk;
        var mainBlk = document.getElementById('blockFilter');
        if (mainBlk) mainBlk.value = blk;
        var locText = document.getElementById('hudProblemLocationText');
        if (locText) {
          locText.textContent = blk === 'all'
            ? ('Estate SKDE · ' + (state.division === 'all' ? 'Semua Divisi' : state.division))
            : ('Estate SKDE · ' + (state.division === 'all' ? '' : state.division + ' · ') + 'Blok ' + blk);
        }
        updateProblemMapSemanticZoom();
        if (blk !== 'all' && state.mapProblem && state.problemGeoJsonLayer) {
          state.problemGeoJsonLayer.eachLayer(function (layer) {
            var p = layer.feature ? layer.feature.properties : {};
            if (p.blok === blk) {
              state.mapProblem.flyToBounds(layer.getBounds(), { maxZoom: 16, padding: [40, 40] });
            }
          });
        }
      });
    }
    // 3. Category select (16 master problems)
    var catSelect = document.getElementById('hudFilterCategory');
    if (catSelect && window.SPT_DATA) {
      var probs = window.SPT_DATA.MASTER_PROBLEMS || [];
      var catHtml = '<option value="all">Semua Permasalahan (16)</option>';
      probs.forEach(function (p) {
        catHtml += '<option value="' + p.problem + '">' + p.no + '. ' + p.problem + '</option>';
      });
      catSelect.innerHTML = catHtml;
      catSelect.addEventListener('change', function () {
        state.problemFilterCategory = catSelect.value;
        updateProblemMapSemanticZoom();
        showToast('Filter Masalah: ' + (catSelect.value === 'all' ? 'Semua (16)' : catSelect.value));
      });
    }
    // 4. Sensitivity Select
    var sensSelect = document.getElementById('hudFilterSensitivity');
    if (sensSelect) {
      sensSelect.addEventListener('change', function () {
        state.problemFilterSensitivity = sensSelect.value;
        updateProblemMapSemanticZoom();
      });
    }
    // 5. Status Select
    var statusSelect = document.getElementById('hudFilterStatus');
    if (statusSelect) {
      statusSelect.addEventListener('change', function () {
        state.problemFilterStatus = statusSelect.value;
        updateProblemMapSemanticZoom();
      });
    }
    // 6. Timeframe Select
    var tfSelect = document.getElementById('hudFilterTimeframe');
    if (tfSelect) {
      tfSelect.addEventListener('change', function () {
        state.problemFilterTimeframe = tfSelect.value;
        updateProblemMapSemanticZoom();
      });
    }
    // 7. Fit Wilayah
    var fitBtn = document.getElementById('btnProblemFitBounds');
    if (fitBtn) {
      fitBtn.addEventListener('click', function () {
        if (state.mapProblem && state.problemGeoJsonLayer) {
          state.mapProblem.fitBounds(state.problemGeoJsonLayer.getBounds(), { padding: [20, 20] });
        }
      });
    }
    // 8. Reset Filter
    var resetBtn = document.getElementById('btnProblemResetFilter');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        state.problemFilterDivision = 'all';
        state.division = 'all';
        state.problemFilterBlock = 'all';
        state.block = 'all';
        state.problemFilterCategory = 'all';
        state.problemFilterSensitivity = 'all';
        state.problemFilterStatus = 'all';
        state.problemFilterTimeframe = 'all';
        state.focusedBlock = null;
        if (hudDiv) hudDiv.value = 'all';
        if (blkSelect) blkSelect.value = 'all';
        if (catSelect) catSelect.value = 'all';
        if (sensSelect) sensSelect.value = 'all';
        if (statusSelect) statusSelect.value = 'all';
        if (tfSelect) tfSelect.value = 'all';
        var mainDiv = document.getElementById('divisionFilter');
        if (mainDiv) mainDiv.value = 'all';
        populateBlockFilter();
        populateHudBlockFilter('all');
        onFilterChanged();
        if (state.mapProblem && state.problemGeoJsonLayer) {
          state.mapProblem.fitBounds(state.problemGeoJsonLayer.getBounds(), { padding: [20, 20] });
        }
        updateProblemMapSemanticZoom();
        showToast('Filter Peta Masalah direset');
      });
    }
  }
  function renderProblemLegendDrawer() {
    var container = document.getElementById('legendCategoriesGrid');
    if (!container || !window.SPT_DATA) return;
    var probs = window.SPT_DATA.MASTER_PROBLEMS || [];
    var html = '';
    probs.forEach(function (p) {
      var sensClass = p.sensitivity === 'Major' ? 'badge-major' : 'badge-minor';
      var pinSymbolIcon = p.pinType === 'drop' ? '💧' : '📍';
      html += '<div class="legend-category-row" data-category="' + p.problem + '" title="Klik untuk filter kategori ' + p.problem + '">' +
        '<div class="legend-cat-left">' +
          '<span class="legend-pin-sample" style="background:' + p.color + ';"></span>' +
          '<span class="legend-cat-name">' + p.no + '. ' + p.problem + ' <small style="color:var(--text-muted);">(' + (p.pinType === 'drop' ? 'Drop' : 'Klasik') + ')</small></span>' +
        '</div>' +
        '<span class="legend-cat-badge ' + sensClass + '">' + p.sensitivity + ' · ' + p.unit + '</span>' +
      '</div>';
    });
    container.innerHTML = html;
    var rows = container.querySelectorAll('.legend-category-row');
    rows.forEach(function (r) {
      r.addEventListener('click', function () {
        var cat = r.getAttribute('data-category');
        var sel = document.getElementById('hudFilterCategory');
        if (sel) {
          sel.value = cat;
          state.problemFilterCategory = cat;
          updateProblemMapSemanticZoom();
          showToast('Filter Kategori: ' + cat);
        }
      });
    });
  }
  function updateBccrLabelsVisibility() {
    if (!state.mapBccr || !state.bccrLabelsLayer) return;
    var zoom = state.mapBccr.getZoom();
    if (zoom >= CONFIG.LABEL_ZOOM_THRESHOLD) {
      if (!state.mapBccr.hasLayer(state.bccrLabelsLayer)) {
        state.mapBccr.addLayer(state.bccrLabelsLayer);
      }
    } else {
      if (state.mapBccr.hasLayer(state.bccrLabelsLayer)) {
        state.mapBccr.removeLayer(state.bccrLabelsLayer);
      }
    }
  }
  function getFilteredFindings() {
    var all = (state.allFindings && state.allFindings.length > 0)
      ? state.allFindings
      : (window.SPT_DATA ? window.SPT_DATA.ACTION_PLANS || [] : []);
    var activeDiv = state.problemFilterDivision || state.division;
    var activeBlk = state.problemFilterBlock || state.block;
    var cat = state.problemFilterCategory;
    var sens = state.problemFilterSensitivity;
    var stat = state.problemFilterStatus;
    var tf = state.problemFilterTimeframe;
    return all.filter(function (iss) {
      if (activeDiv && activeDiv !== 'all' && iss.divisi !== activeDiv) return false;
      if (activeBlk && activeBlk !== 'all' && iss.blok !== activeBlk) return false;
      if (cat && cat !== 'all' && iss.problem !== cat && iss.category !== cat) return false;
      if (sens && sens !== 'all' && iss.sensitivity !== sens) return false;
      if (stat && stat !== 'all') {
        if (stat === 'Belum Ditangani' && (iss.status === 'Belum Ditangani' || iss.status === 'Belum Dikerjakan' || iss.status === 'Open')) {
          // match
        } else if (iss.status !== stat) {
          return false;
        }
      }
      if (tf && tf !== 'all' && iss.timeframe !== tf) return false;
      return true;
    });
  }
  /**
   * SEMANTIC ZOOM & VIEWPORT CULLING CONTROLLER
   * Hard Rule: Overview / Non-fullscreen shows dual Major/Minor summary badges per block.
   * Fullscreen AND Zoom >= 15 shows individual micro placemarks with viewport culling.
   * Summary markers and individual pins NEVER appear simultaneously.
   */
  function updateProblemMapSemanticZoom() {
    if (!state.mapProblem) return;
    var zoom = state.mapProblem.getZoom();
    var isMicroMode = state.isFullscreenProblem && zoom >= CONFIG.BLOCK_ZOOM_THRESHOLD;
    if (isMicroMode) {
      // 1. Remove and clear summary markers layer completely
      if (state.mapProblemSummaryLayer) {
        state.mapProblemSummaryLayer.clearLayers();
        if (state.mapProblem.hasLayer(state.mapProblemSummaryLayer)) {
          state.mapProblem.removeLayer(state.mapProblemSummaryLayer);
        }
      }
      // 2. Add micro markers layer if not present
      if (state.problemMicroMarkersLayer && !state.mapProblem.hasLayer(state.problemMicroMarkersLayer)) {
        state.mapProblem.addLayer(state.problemMicroMarkersLayer);
      }
      // 3. Render viewport culled individual placemarks
      updateViewportCulledPins();
    } else {
      // 1. Remove and clear micro markers layer completely
      if (state.problemMicroMarkersLayer) {
        state.problemMicroMarkersLayer.clearLayers();
        if (state.mapProblem.hasLayer(state.problemMicroMarkersLayer)) {
          state.mapProblem.removeLayer(state.problemMicroMarkersLayer);
        }
      }
      // 2. Add summary markers layer if not present
      if (state.mapProblemSummaryLayer && !state.mapProblem.hasLayer(state.mapProblemSummaryLayer)) {
        state.mapProblem.addLayer(state.mapProblemSummaryLayer);
      }
      // 3. Render single Major/Minor summary badge per block
      renderSummaryMarkers();
    }
    // Block labels visibility based on zoom threshold 14
    if (zoom >= CONFIG.LABEL_ZOOM_THRESHOLD) {
      if (state.problemLabelsLayer && !state.mapProblem.hasLayer(state.problemLabelsLayer)) {
        state.mapProblem.addLayer(state.problemLabelsLayer);
      }
    } else {
      if (state.problemLabelsLayer && state.mapProblem.hasLayer(state.problemLabelsLayer)) {
        state.mapProblem.removeLayer(state.problemLabelsLayer);
      }
    }
    // Floating status readout
    var indText = document.getElementById('mapFloatingText');
    if (indText) {
      if (isMicroMode) {
        indText.textContent = 'Level Blok (Zoom ' + zoom + ') · Mode Layar Penuh: Menampilkan titik temuan individual per blok';
      } else if (state.isFullscreenProblem) {
        indText.textContent = 'Level Ringkasan (Zoom ' + zoom + ') · Perbesar peta ke zoom ≥ ' + CONFIG.BLOCK_ZOOM_THRESHOLD + ' untuk melihat titik individual';
      } else {
        indText.textContent = 'Level Ringkasan Blok · Aktifkan Fullscreen & Zoom In (≥ ' + CONFIG.BLOCK_ZOOM_THRESHOLD + ') untuk analisa titik individual';
      }
    }
  }
  function updateViewportCulledPins() {
    if (!state.mapProblem || !state.problemMicroMarkersLayer) return;
    state.problemMicroMarkersLayer.clearLayers();
    var bounds = state.mapProblem.getBounds().pad(0.12);
    var filtered = getFilteredFindings();
    var visibleCount = 0;
    filtered.forEach(function (iss) {
      if (!iss.lat || !iss.lng) return;
      var latLng = L.latLng(iss.lat, iss.lng);
      if (bounds.contains(latLng)) {
        visibleCount++;
        var marker = createPlacemarkMarker(iss);
        state.problemMicroMarkersLayer.addLayer(marker);
      }
    });
    var countText = document.getElementById('hudCountText');
    if (countText) {
      countText.textContent = visibleCount + ' / ' + filtered.length + ' Titik Terlihat';
    }
  }
  function renderSummaryMarkers() {
    if (!state.mapProblem || !state.mapProblemSummaryLayer || !state.indexedGeoData) return;
    state.mapProblemSummaryLayer.clearLayers();
    var filtered = getFilteredFindings();
    var blockFindings = {};
    filtered.forEach(function (iss) {
      var key = (iss.estate || 'SKDE') + ':' + iss.divisi + ':' + iss.blok;
      if (!blockFindings[key]) {
        blockFindings[key] = { major: 0, minor: 0, total: 0 };
      }
      if (iss.sensitivity === 'Major') blockFindings[key].major++;
      else blockFindings[key].minor++;
      blockFindings[key].total++;
    });
    var blocks = state.indexedGeoData.blocks;
    var activeDiv = state.problemFilterDivision || state.division;
    var activeBlk = state.problemFilterBlock || state.block;
    Object.keys(blocks).forEach(function (key) {
      var blk = blocks[key];
      if (activeDiv && activeDiv !== 'all' && blk.divisi !== activeDiv) return;
      if (activeBlk && activeBlk !== 'all' && blk.blok !== activeBlk) return;
      var counts = blockFindings[key];
      if (!counts || counts.total === 0) return;
      var majorPill = counts.major > 0 ? '<span class="summary-pill major">Major ' + counts.major + '</span>' : '';
      var minorPill = counts.minor > 0 ? '<span class="summary-pill minor">Minor ' + counts.minor + '</span>' : '';
      var cardHtml = '<div class="block-summary-card" data-block="' + blk.blok + '" data-divisi="' + blk.divisi + '">' +
        majorPill + minorPill +
      '</div>';
      var sumIcon = L.divIcon({
        className: 'spt-summary-marker-icon',
        html: cardHtml,
        iconSize: [80, 24],
        iconAnchor: [40, 12]
      });
      var pos = blk.interiorPoint || blk.bounds.getCenter();
      var marker = L.marker([pos.lat, pos.lng], { icon: sumIcon, interactive: true });
      marker.on('click', function () {
        focusBlockOnProblemMap(blk.divisi, blk.blok, blk.bounds);
      });
      state.mapProblemSummaryLayer.addLayer(marker);
    });
    var countText = document.getElementById('hudCountText');
    if (countText) {
      countText.textContent = filtered.length + ' Total Temuan (' + Object.keys(blockFindings).length + ' Blok)';
    }
  }
  function createPlacemarkMarker(iss) {
    var probMaster = (window.SPT_DATA.MASTER_PROBLEMS || []).find(function (m) {
      return m.no === iss.no || m.problem === iss.problem;
    });
    var pinType = (probMaster && probMaster.pinType) ? probMaster.pinType : (iss.pinType || 'classic');
    var color = iss.color || (probMaster ? probMaster.color : '#DC2626');
    var severityClass = iss.sensitivity === 'Major' ? 'major' : 'minor';
    var svgContent = '';
    if (pinType === 'drop') {
      // Pin Drop (Teardrop shape for IDs 11-16)
      svgContent = '<svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M12 2C7.03 2 3 6.03 3 11C3 17.5 12 30 12 30C12 30 21 17.5 21 11C21 6.03 16.97 2 12 2Z" fill="' + color + '" stroke="#FFFFFF" stroke-width="1.8"/>' +
        '<circle cx="12" cy="11" r="4" fill="#FFFFFF"/>' +
      '</svg>';
    } else {
      // Pin Klasik (Circular head + inner dot + vertical needle for IDs 01-10)
      svgContent = '<svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="12" cy="11" r="9" fill="' + color + '" stroke="#FFFFFF" stroke-width="2"/>' +
        '<circle cx="12" cy="11" r="3.5" fill="#FFFFFF"/>' +
        '<path d="M12 20 L12 30" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>' +
        '<circle cx="12" cy="30" r="1.5" fill="#1E293B"/>' +
      '</svg>';
    }
    var pinHtml = '<div class="spt-pin-svg-wrap ' + severityClass + '" id="pin-' + iss.id + '" title="' + iss.no + '. ' + iss.problem + ' (' + iss.sensitivity + ')">' +
      svgContent +
    '</div>';
    var customIcon = L.divIcon({
      className: 'spt-leaflet-placemark-div',
      html: pinHtml,
      iconSize: [24, 32],
      iconAnchor: [12, 30],
      popupAnchor: [0, -30]
    });
    var marker = L.marker([iss.lat, iss.lng], { icon: customIcon });
    // Lazy popup on click
    marker.bindPopup(function () {
      return buildPinPopupHtml(iss);
    });
    return marker;
  }
  function buildPinPopupHtml(iss) {
    var statusBadgeClass = 'status-belum';
    if (iss.status === 'Selesai') statusBadgeClass = 'status-selesai';
    else if (iss.status === 'Dalam Pengerjaan') statusBadgeClass = 'status-pengerjaan';
    else if (iss.status === 'Menunggu Verifikasi') statusBadgeClass = 'status-verifikasi';
    var isDone = iss.status === 'Selesai';
    var photoSection = '<div class="map-popup-photo-row">' +
      '<div class="map-popup-photo-card">' +
        '<div class="thumb-tag" style="background:#FEF3C7;color:#92400E;">FOTO SEBELUM</div>' +
        '<div class="map-popup-photo-thumb">' +
          (iss.customPhoto
            ? '<img src="' + iss.customPhoto + '" style="width:100%;height:100%;object-fit:cover;" alt="Foto Lapangan">'
            : getFieldSvg(iss.problem, false)) +
        '</div>' +
        '<div style="padding:3px 5px;font-size:9px;color:#64748B;">' + (iss.fotoSebelumDate || iss.tanggalLaporText || iss.tanggalIdentifikasi || '02 Agu 2026') + '</div>' +
      '</div>' +
      '<div class="map-popup-photo-card">' +
        '<div class="thumb-tag" style="' + (isDone ? 'background:#D1FAE5;color:#065F46;' : 'background:#F1F5F9;color:#64748B;') + '">' + (isDone ? 'FOTO SESUDAH' : 'FOTO SESUDAH') + '</div>' +
        (isDone
          ? '<div class="map-popup-photo-thumb">' + getFieldSvg(iss.problem, true) + '</div>' +
            '<div style="padding:3px 5px;font-size:9px;color:#059669;font-weight:700;">Selesai ' + (iss.fotoSesudahDate || '24 Agu 2026') + '</div>'
          : '<div style="height:55px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#F8FAFC;padding:4px;text-align:center;color:#64748B;font-size:8.5px;line-height:1.2;"><span>⏳ Belum Tersedia</span><span style="color:#94A3B8;font-size:8px;margin-top:2px;">Target: ' + iss.targetSelesai + '</span></div>'
        ) +
      '</div>' +
    '</div>';
    return '<div class="map-popup-header" style="background:' + iss.color + ';">' +
      '<strong>' + iss.no + '. ' + iss.problem + '</strong>' +
      '<span>' + iss.divisi + ' · Blok ' + iss.blok + ' (' + iss.id + ') · Sumber: ' + (iss.source || 'Trabas') + '</span>' +
    '</div>' +
    '<div class="map-popup-body">' +
      '<div class="popup-metric-row"><span>Sensitivitas:</span><strong style="color:' + (iss.sensitivity === 'Major' ? 'var(--status-red)' : 'var(--status-orange)') + ';">' + iss.sensitivity + ' (' + iss.timeframe + ')</strong></div>' +
      '<div class="popup-metric-row"><span>Rekomendasi:</span><strong>' + iss.actionPlan + '</strong></div>' +
      '<div class="popup-metric-row"><span>Volume Inventarisasi:</span><strong>' + formatNum(iss.volumeInventarisasi, 0) + ' ' + iss.unit + '</strong></div>' +
      '<div class="popup-metric-row"><span>Realisasi Fisik:</span><strong>' + formatNum(iss.realisasiTerverifikasi, 0) + ' ' + iss.unit + ' (' + iss.progress + '%)</strong></div>' +
      '<div class="popup-metric-row"><span>Status:</span><span class="badge-status ' + statusBadgeClass + '" style="font-size:10px;padding:2px 6px;">' + iss.status + '</span></div>' +
      photoSection +
      '<div style="margin-top:6px;"><button class="btn-primary" onclick="window.SPT_APP.openActionDrawer(\'' + iss.id + '\')" style="width:100%;padding:5px;font-size:11px;">Buka Detail &amp; Dokumentasi →</button></div>' +
    '</div>';
  }
        function renderGeoJsonLayers(geojson) {
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
            '<span>Temuan: <strong>' + (tagCountDisplay > 0 ? tagCountDisplay + ' temuan' : 'Tidak ada temuan') + '</strong></span>' +
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
  }
  // =========================================================================
  // TRACKING & 24M GEOGRAPHIC BUFFER CONTROLLER
  // =========================================================================
  var TRACKING_ACTIVITY_MAP = {
    1: { id: 'blok_checklist', name: 'Blok Checklist', color: '#795548' },
    2: { id: 'ipd_panen', name: 'IPD Panen', color: '#AD3CDB' },
    3: { id: 'pengancakan', name: 'Pengancakan', color: '#268BF2' },
    4: { id: 'inspeksi_upkeep', name: 'Inspeksi Upkeep', color: '#20A3A7' },
    5: { id: 'inspeksi_pupuk', name: 'Inspeksi Pemupukan', color: '#FF6900' }
  };
  function normalizeActivityId(act) {
    if (!act) return 'all';
    if (act === 'ipdPanen' || act === 'ipd_panen' || act === 2 || act === '2') return 'ipd_panen';
    if (act === 'inspeksiPupuk' || act === 'inspeksi_pupuk' || act === 'inspeksi_pemupukan' || act === 5 || act === '5') return 'inspeksi_pupuk';
    if (act === 'inspeksiUpkeep' || act === 'inspeksi_upkeep' || act === 4 || act === '4') return 'inspeksi_upkeep';
    if (act === 'blokChecklist' || act === 'blok_checklist' || act === 1 || act === '1') return 'blok_checklist';
    if (act === 'pengancakan' || act === 3 || act === '3') return 'pengancakan';
    return act;
  }
  function formatDateIso(dateStr) {
    if (!dateStr) return '';
    if (dateStr.indexOf('-') >= 0) return dateStr;
    var p = dateStr.trim().split(' ');
    if (p.length < 3) return dateStr;
    var day = parseInt(p[0], 10);
    var dayStr = day < 10 ? '0' + day : '' + day;
    var monthMap = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'Mei': '05', 'Jun': '06', 'Jul': '07', 'Agu': '08', 'Sep': '09', 'Okt': '10', 'Nov': '11', 'Des': '12' };
    var mStr = monthMap[p[1]] || '09';
    var yr = p[2] || '2026';
    return yr + '-' + mStr + '-' + dayStr;
  }
  function formatDateText(isoDateStr) {
    if (!isoDateStr) return '';
    if (isoDateStr.indexOf('-') < 0) return isoDateStr;
    var p = isoDateStr.split('-');
    if (p.length < 3) return isoDateStr;
    var day = parseInt(p[2], 10);
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    var mIdx = parseInt(p[1], 10) - 1;
    var dayStr = day < 10 ? '0' + day : '' + day;
    return dayStr + ' ' + (monthNames[mIdx] || 'Sep') + ' ' + p[0];
  }
  function renderTrackingLayers() {
    var mapEl = state.mapAssessment || state.mapBccr;
    if (!mapEl) return;
    if (!state.trackingBufferLayerGroup) {
      state.trackingBufferLayerGroup = L.layerGroup().addTo(mapEl);
    }
    if (!state.trackingLineLayerGroup) {
      state.trackingLineLayerGroup = L.layerGroup().addTo(mapEl);
    }
    state.trackingBufferLayerGroup.clearLayers();
    state.trackingLineLayerGroup.clearLayers();
    var targetBlokCode = null;
    if (state.selectedBlockKey) {
      var parts = state.selectedBlockKey.split('|');
      targetBlokCode = parts[2];
    } else if (state.block && state.block !== 'all') {
      targetBlokCode = state.block;
    }
    // Tracking and tagging are ONLY visible when a specific block is clicked / selected
    if (!targetBlokCode || targetBlokCode === 'all' || !state.trackingGeoJson || !state.trackingGeoJson.features) {
      renderProblemTagMarkers();
      return;
    }
    var activeActId = normalizeActivityId(state.activeActivityFilter);
    if (!state.cachedTrackingBuffers) {
      state.cachedTrackingBuffers = {};
    }
    state.trackingGeoJson.features.forEach(function (feat) {
      var props = feat.properties || {};
      var featBlok = props.blok;
      if (targetBlokCode && featBlok !== targetBlokCode) {
        return;
      }
      var actInfo = TRACKING_ACTIVITY_MAP[props.activity_id] || {
        id: normalizeActivityId(props.activity_name),
        name: props.activity_name,
        color: '#268BF2'
      };
      if (activeActId !== 'all' && actInfo.id !== activeActId) {
        return;
      }
      var isoDate = props.date;
      var trackId = props.track_id;
      var featKey = isoDate + '|' + actInfo.id;
      var isHighlighted = null;
      if (state.selectedTrackingKey) {
        isHighlighted = (state.selectedTrackingKey === featKey || state.selectedTrackingKey === trackId);
      }
      // 1. Geographic Buffer Polygon (Scaled with buffer_m)
      var bufferM = typeof props.buffer_m === 'number' ? props.buffer_m : 24;
      var bufKey = trackId + '_' + bufferM;
      var bufGeo = state.cachedTrackingBuffers[bufKey];
      if (!bufGeo && window.SPT_GEO && window.SPT_GEO.createLineBuffer) {
        bufGeo = window.SPT_GEO.createLineBuffer(feat.geometry.coordinates, bufferM);
        state.cachedTrackingBuffers[bufKey] = bufGeo;
      }
      if (bufGeo) {
        var fillOpacity = 0.35;
        var strokeOpacity = 0.65;
        var weight = 1.2;
        if (isHighlighted === true) {
          fillOpacity = 0.60;
          strokeOpacity = 0.90;
          weight = 2.5;
        } else if (isHighlighted === false) {
          fillOpacity = 0.08;
          strokeOpacity = 0.20;
          weight = 0.5;
        }
        var bufFeature = {
          type: 'Feature',
          properties: props,
          geometry: { type: 'Polygon', coordinates: bufGeo }
        };
        var bufLayer = L.geoJSON(bufFeature, {
          style: {
            fillColor: actInfo.color,
            fillOpacity: fillOpacity,
            color: actInfo.color,
            weight: weight,
            opacity: strokeOpacity,
            interactive: false
          }
        });
        state.trackingBufferLayerGroup.addLayer(bufLayer);
      }
      // 2. LineString Centerline Layer (Proportional to buffer_m or line_width/weight prop)
      var baseWeight = 3.5;
      if (typeof props.line_width === 'number') {
        baseWeight = props.line_width;
      } else if (typeof props.weight === 'number') {
        baseWeight = props.weight;
      } else if (typeof props.stroke_width === 'number') {
        baseWeight = props.stroke_width;
      } else {
        // Skala proporsional: 24 meter = 3.5px base stroke
        baseWeight = Math.max(2, Math.round((bufferM / 24) * 3.5 * 10) / 10);
      }
      var lineWeight = baseWeight;
      var lineOpacity = 0.90;
      if (isHighlighted === true) {
        lineWeight = Math.round(baseWeight * 1.7 * 10) / 10;
        lineOpacity = 1.0;
      } else if (isHighlighted === false) {
        lineWeight = Math.max(1.0, Math.round(baseWeight * 0.45 * 10) / 10);
        lineOpacity = 0.25;
      }
      var lineLayer = L.geoJSON(feat, {
        style: {
          color: actInfo.color,
          weight: lineWeight,
          opacity: lineOpacity
        }
      });
      var dateDisplay = formatDateText(props.date);
      var tooltipContent = '<div style="font-family:sans-serif;font-size:11px;line-height:1.3;">' +
        '<strong style="color:' + actInfo.color + ';">' + actInfo.name + '</strong> (' + dateDisplay + ')<br/>' +
        '<span>Segmen: <code>' + trackId + '</code></span><br/>' +
        '<span style="color:#64748B;font-size:10px;">Ilustrasi jangkauan observasi 24 m di setiap sisi lintasan.</span>' +
        '</div>';
      lineLayer.bindTooltip(tooltipContent, { sticky: true });
      state.trackingLineLayerGroup.addLayer(lineLayer);
    });
    try {
      if (state.trackingBufferLayerGroup && state.trackingBufferLayerGroup.eachLayer) {
        state.trackingBufferLayerGroup.eachLayer(function (l) {
          if (l.bringToFront) l.bringToFront();
        });
      }
      if (state.trackingLineLayerGroup && state.trackingLineLayerGroup.eachLayer) {
        state.trackingLineLayerGroup.eachLayer(function (l) {
          if (l.bringToFront) l.bringToFront();
        });
      }
    } catch (zErr) {}
    renderProblemTagMarkers();
  }
    function renderProblemTagMarkers() {
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
  }
  function selectProblemTagMarker(tagId, feature) {
    if (state.selectedTagId === tagId) {
      state.selectedTagId = null;
    } else {
      state.selectedTagId = tagId;
    }
    renderProblemTagMarkers();
    var geojson = state.problemTagsGeoJson || window.TNKE_PROBLEM_TAGS_GEOJSON;
    var targetFeat = feature;
    if (!targetFeat && geojson && geojson.features) {
      geojson.features.forEach(function (f) {
        if (f.properties && f.properties.tag_id === tagId) targetFeat = f;
      });
    }
    if (targetFeat && targetFeat.geometry && targetFeat.geometry.coordinates) {
      var coords = targetFeat.geometry.coordinates;
      var mapEl = state.mapAssessment || state.mapBccr || state.mapProblem;
      if (mapEl) {
        mapEl.panTo([coords[1], coords[0]], { animate: true });
      }
    }
    var props = targetFeat ? targetFeat.properties : null;
    var tagBlok = props ? props.blok : 'F-59';
    if (state.selectedBlockKey !== 'TNKE|DIVISI 2|' + tagBlok) {
      selectBlock('TNKE', 'DIVISI 2', tagBlok);
    }
    setTimeout(function () {
      var cardEl = document.querySelector('.tag-item-card[data-tag-id="' + tagId + '"]');
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        document.querySelectorAll('.tag-item-card').forEach(function (c) {
          c.classList.remove('selected-tag-card');
        });
        if (state.selectedTagId === tagId) {
          cardEl.classList.add('selected-tag-card');
        }
      }
    }, 200);
  }
  function toggleHistoryHighlight(estate, divisi, blok, dateStr, actIdRaw) {
    var isoDate = formatDateIso(dateStr);
    var actId = normalizeActivityId(actIdRaw);
    var matchingFeatures = [];
    if (state.trackingGeoJson && state.trackingGeoJson.features) {
      matchingFeatures = state.trackingGeoJson.features.filter(function (f) {
        var p = f.properties || {};
        var normAct = normalizeActivityId(p.activity_id || p.activity_name);
        return p.blok === blok && p.date === isoDate && normAct === actId;
      });
    }
    if (matchingFeatures.length === 0) {
      showToast('Tracking belum tersedia untuk kegiatan ini', 3000);
      return;
    }
    var targetKey = isoDate + '|' + actId;
    if (state.selectedTrackingKey === targetKey) {
      state.selectedTrackingKey = null;
      state.selectedHistoryDate = null;
    } else {
      state.selectedTrackingKey = targetKey;
      state.selectedHistoryDate = isoDate;
    }
    if (window.tnkeStore) {
      var d = window.tnkeStore.getBlockData(estate, divisi, blok, state.activeActivityFilter);
      populateDrawer(d);
    }
    renderTrackingLayers();
    if (state.selectedTrackingKey && matchingFeatures.length > 0) {
      var bounds = L.latLngBounds([]);
      matchingFeatures.forEach(function (f) {
        f.geometry.coordinates.forEach(function (c) {
          bounds.extend([c[1], c[0]]);
        });
      });
      if (bounds.isValid()) {
        var mapEl = state.mapAssessment || state.mapBccr;
        if (mapEl) {
          mapEl.fitBounds(bounds, { padding: [80, 320], maxZoom: 17 });
        }
      }
    }
  }
  function renderDailyActivityView() {
    if (!window.tnkeStore) return;
    var staffSel = document.getElementById('dailyOfficerSelect') || document.getElementById('dailyStaffFilter');
    var dateSel = document.getElementById('dailyDateSelect') || document.getElementById('dailyDateFilter');
    var staff = staffSel ? staffSel.value : 'all';
    var date = dateSel ? dateSel.value : '12 Sep 2026';
    var dailyData = window.tnkeStore.getDailyActivitySummary(staff, date);
    if (!dailyData) return;

    // New Tab 4 elements
    var elDist = document.getElementById('dailyDistanceKm') || document.getElementById('dailyEstDistanceKm');
    var elTargetDist = document.getElementById('dailyTargetDistanceKm');
    var elNominalHa = document.getElementById('dailyTotalHa') || document.getElementById('dailyTotalActivityHa');
    var elNetHa = document.getElementById('dailyAddedUniqueHa') || document.getElementById('dailyNetCoverageAddHa');

    if (elDist) elDist.textContent = '5,28 km (105,6%)';
    if (elTargetDist) elTargetDist.textContent = '5,00 km/hari';
    if (elNominalHa) elNominalHa.textContent = '25,344 ha';
    if (elNetHa) elNetHa.textContent = '+6,5 ha';

    // Legacy elements if present
    var elHa = document.getElementById('dailyTotalActivityHa');
    var elBlk = document.getElementById('dailyUniqueBlocks');
    var elSesi = document.getElementById('dailyVisitCount');
    var elPct = document.getElementById('dailyDistanceTargetPct');
    if (elHa) elHa.textContent = '25,344 ha';
    if (elBlk) elBlk.textContent = (dailyData.uniqueBlocksCount || 7) + ' blok';
    if (elSesi) elSesi.textContent = (dailyData.totalVisitSessionsCount || 8) + ' sesi';
    if (elPct) elPct.textContent = '105,6% target (5,00 km/hari)';

    // Table Render
    var tableWrap = document.getElementById('dailyVisitsTableWrap');
    var tbody = document.getElementById('dailyActivityTableBody');
    var sessions = dailyData.visitSessions || [];

    var tableHtml = '<div class="div-table-wrapper"><table class="schedule-table"><thead><tr>' +
      '<th>Waktu</th>' +
      '<th>Petugas</th>' +
      '<th>Blok</th>' +
      '<th>Kegiatan</th>' +
      '<th style="text-align:right;">Tracking Polyline</th>' +
      '<th style="text-align:right;">Coverage Nominal (48m)</th>' +
      '<th style="text-align:right;">Coverage Efektif Unik</th>' +
      '<th style="text-align:center;">Aksi</th>' +
      '</tr></thead><tbody>';

    if (sessions.length === 0) {
      tableHtml += '<tr><td colspan="8" class="text-center" style="padding:16px;color:#64748b;">Tidak ada data sesi untuk filter ini.</td></tr>';
    } else {
      sessions.forEach(function (s) {
        var bCode = s.blok || s.blockCode || 'H-49';
        var divName = s.divisi || s.divisionName || 'DIVISI 2';
        var actName = s.activityName || 'IPD Panen';
        var actHa = s.areaHa || s.nominalCoverageHa || 3.168;
        var trackM = s.trackingDistanceM || 660;
        var effectiveHa = s.addedUniqueHa !== undefined ? s.addedUniqueHa : 0.8;
        var staffName = s.staffName || 'Hendra Budiono';
        var staffRole = s.staffRole || 'Asisten';
        var timeStr = s.time || '08:00 - 10:30';

        tableHtml += '<tr>' +
          '<td>' + timeStr + '</td>' +
          '<td><strong>' + staffName + '</strong> (' + staffRole + ')</td>' +
          '<td><span class="badge-block" style="font-weight:700;">' + bCode + '</span> (' + divName + ')</td>' +
          '<td><span style="font-size:11px;font-weight:600;padding:2px 6px;border-radius:4px;background:#F1F5F9;color:#0F172A;">' + actName + '</span></td>' +
          '<td style="text-align:right;font-weight:600;color:#2563EB;">' + trackM + ' m</td>' +
          '<td style="text-align:right;font-weight:600;">' + formatNum(actHa, 3) + ' ha</td>' +
          '<td style="text-align:right;color:#059669;font-weight:700;">+' + formatNum(effectiveHa, 1) + ' ha</td>' +
          '<td style="text-align:center;"><button type="button" class="btn-sm btn-outline" onclick="window.SPT_APP.selectBlock(\'TNKE\', \'' + divName + '\', \'' + bCode + '\')" style="font-size:10.5px;padding:2px 6px;">Buka Peta Blok →</button></td>' +
          '</tr>';
      });
    }

    tableHtml += '</tbody></table></div>';

    if (tableWrap) {
      tableWrap.innerHTML = tableHtml;
    } else if (tbody) {
      tbody.innerHTML = tableHtml;
    }
  }
  function focusBlockOnProblemMap(divisi, blok, bounds) {
    state.focusedBlock = blok;
    state.problemFilterBlock = blok;
    var blkSelect = document.getElementById('hudFilterBlock');
    if (blkSelect) blkSelect.value = blok;
    var locText = document.getElementById('hudProblemLocationText');
    if (locText) {
      locText.textContent = 'Estate SKDE · ' + divisi + ' · Blok ' + blok;
    }
    if (state.mapProblem && bounds) {
      state.mapProblem.fitBounds(bounds, { maxZoom: 16, padding: [30, 30] });
    }
    updateProblemMapSemanticZoom();
    showToast('Fokus Blok ' + blok + ' · Memuat titik temuan masalah');
  }
  // =========================================================================
  // SIMULASI TAMBAH TEMUAN MANUAL & MODAL WORKFLOW
  // =========================================================================
  function bindAddFindingWorkflow() {
    var addBtn = document.getElementById('btnAddFinding');
    var cancelBannerBtn = document.getElementById('btnCancelAddMode');
    var cancelModalBtn = document.getElementById('btnCancelAddFinding');
    var closeModalBtn = document.getElementById('btnCloseModalAddFinding');
    var submitBtn = document.getElementById('btnSubmitAddFinding');
    var catSelect = document.getElementById('addFindingCategory');
    var photoInput = document.getElementById('addFindingPhotoInput');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        startAddFindingMode();
      });
    }
    if (cancelBannerBtn) {
      cancelBannerBtn.addEventListener('click', function () {
        cancelAddFindingMode();
      });
    }
    if (cancelModalBtn) {
      cancelModalBtn.addEventListener('click', function () {
        closeAddFindingModal();
      });
    }
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', function () {
        closeAddFindingModal();
      });
    }
    // Populate category dropdown
    if (catSelect && window.SPT_DATA) {
      var probs = window.SPT_DATA.MASTER_PROBLEMS || [];
      var html = '';
      probs.forEach(function (p) {
        html += '<option value="' + p.id + '">' + p.no + '. ' + p.problem + ' (' + p.sensitivity + ' · ' + p.unit + ')</option>';
      });
      catSelect.innerHTML = html;
      catSelect.addEventListener('change', function () {
        onAddFindingCategoryChange();
      });
    }
    // Photo input preview
    if (photoInput) {
      photoInput.addEventListener('change', function () {
        var file = photoInput.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var wrap = document.getElementById('addFindingPhotoPreviewWrap');
            var img = document.getElementById('addFindingPhotoPreview');
            if (wrap && img) {
              img.src = e.target.result;
              wrap.style.display = 'block';
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
    // Submit form
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        submitAddFinding();
      });
    }
  }
  function startAddFindingMode() {
    state.addFindingMode = true;
    var mapEl = document.getElementById('mapProblem');
    if (mapEl) mapEl.classList.add('map-crosshair-mode');
    var banner = document.getElementById('mapAddModeBanner');
    if (banner) banner.style.display = 'flex';
    showToast('Mode Tambah Temuan Aktif: Klik lokasi di dalam blok kebun pada peta');
  }
  function cancelAddFindingMode() {
    state.addFindingMode = false;
    var mapEl = document.getElementById('mapProblem');
    if (mapEl) mapEl.classList.remove('map-crosshair-mode');
    var banner = document.getElementById('mapAddModeBanner');
    if (banner) banner.style.display = 'none';
  }
  function onAddFindingCategoryChange() {
    var catSelect = document.getElementById('addFindingCategory');
    if (!catSelect || !window.SPT_DATA) return;
    var catId = catSelect.value;
    var prob = window.SPT_DATA.MASTER_PROBLEMS.find(function (p) { return p.id === catId; });
    if (!prob) return;
    var actionInput = document.getElementById('addFindingAction');
    if (actionInput) actionInput.value = prob.defaultAction || (prob.actions && prob.actions[0]) || '';
    var unitLabel = document.getElementById('addFindingUnitLabel');
    if (unitLabel) unitLabel.textContent = prob.unit;
  }
  function openAddFindingModal(lat, lng, blockObj) {
    state.pendingFinding = { lat: lat, lng: lng, block: blockObj };
    var overlay = document.getElementById('modalAddFinding');
    var locInput = document.getElementById('addFindingLocation');
    var latInput = document.getElementById('addFindingLat');
    var lngInput = document.getElementById('addFindingLng');
    var keyInput = document.getElementById('addFindingBlockKey');
    var estInput = document.getElementById('addFindingEstate');
    var divInput = document.getElementById('addFindingDivision');
    var blkInput = document.getElementById('addFindingBlock');
    var coordInput = document.getElementById('addFindingCoordinates');
    var previewWrap = document.getElementById('addFindingPhotoPreviewWrap');
    var photoInput = document.getElementById('addFindingPhotoInput');
    if (locInput) locInput.value = (blockObj.estate || 'SKDE') + ' · ' + (blockObj.divisi || 'DIVISI 3') + ' · Blok ' + (blockObj.blok || '-');
    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;
    if (keyInput) keyInput.value = (blockObj.estate || 'SKDE') + ':' + blockObj.divisi + ':' + blockObj.blok;
    if (estInput) estInput.value = blockObj.estate || 'SKDE';
    if (divInput) divInput.value = blockObj.divisi || 'DIVISI 3';
    if (blkInput) blkInput.value = blockObj.blok || '-';
    if (coordInput) coordInput.value = lat.toFixed(5) + ', ' + lng.toFixed(5);
    if (previewWrap) previewWrap.style.display = 'none';
    if (photoInput) photoInput.value = '';
    onAddFindingCategoryChange();
    if (overlay) overlay.style.display = 'flex';
  }
  function closeAddFindingModal() {
    var overlay = document.getElementById('modalAddFinding');
    if (overlay) overlay.style.display = 'none';
    state.pendingFinding = null;
  }
  function submitAddFinding() {
    if (!state.pendingFinding) return;
    var catSelect = document.getElementById('addFindingCategory');
    var volInput = document.getElementById('addFindingVolume');
    var statusSelect = document.getElementById('addFindingStatus');
    var targetInput = document.getElementById('addFindingTargetDate');
    var actionInput = document.getElementById('addFindingAction');
    var picSelect = document.getElementById('addFindingPic');
    var notesInput = document.getElementById('addFindingNotes');
    var previewImg = document.getElementById('addFindingPhotoPreview');
    var previewWrap = document.getElementById('addFindingPhotoPreviewWrap');
    var vol = parseFloat(volInput ? volInput.value : 1);
    if (isNaN(vol) || vol <= 0) {
      showToast('⚠️ Masukkan volume temuan yang valid (angka > 0)');
      return;
    }
    var catId = catSelect ? catSelect.value : '01';
    var prob = window.SPT_DATA.MASTER_PROBLEMS.find(function (p) { return p.id === catId; }) || window.SPT_DATA.MASTER_PROBLEMS[0];
    var status = statusSelect ? statusSelect.value : 'Belum Ditangani';
    var pic = picSelect ? picSelect.value : 'Wahyu Pratama (Asisten Agronomi)';
    var targetDate = targetInput ? targetInput.value : '28 Agu 2026';
    var action = actionInput ? actionInput.value : prob.defaultAction;
    var notes = notesInput ? notesInput.value : '';
    var customPhoto = (previewWrap && previewWrap.style.display !== 'none' && previewImg) ? previewImg.src : null;
    var blk = state.pendingFinding.block;
    var randomId = Math.floor(1000 + Math.random() * 9000);
    var idStr = 'SPT-M-' + blk.blok + '-' + randomId;
    var realized = (status === 'Selesai') ? vol : (status === 'Dalam Pengerjaan' ? Math.round(vol * 0.4 * 10) / 10 : 0);
    var progress = (status === 'Selesai') ? 100 : (status === 'Dalam Pengerjaan' ? 40 : 0);
    var newFinding = {
      id: idStr,
      blockKey: (blk.estate || 'SKDE') + ':' + blk.divisi + ':' + blk.blok,
      estate: blk.estate || 'SKDE',
      divisi: blk.divisi,
      blok: blk.blok,
      categoryId: prob.id,
      no: prob.no,
      problem: prob.problem,
      category: prob.category,
      timeframe: prob.timeframe,
      sensitivity: prob.sensitivity,
      unit: prob.unit,
      color: prob.color,
      pinType: prob.pinType,
      symbolName: prob.symbolName,
      action: action,
      actionPlan: action,
      lat: state.pendingFinding.lat,
      lng: state.pendingFinding.lng,
      volume: vol,
      volumeInventarisasi: vol,
      realizedVolume: realized,
      realisasiFisik: realized,
      realisasiTerverifikasi: realized,
      verifiedVolume: realized,
      progress: progress,
      status: status,
      overdue: false,
      pic: pic,
      tanggalIdentifikasi: '16 Agu 2026',
      reportedAt: '16 Agu 2026',
      targetSelesai: targetDate,
      targetAt: targetDate,
      notes: notes || ('Temuan manual lapangan pada Blok ' + blk.blok),
      catatan: notes || ('Temuan manual lapangan pada Blok ' + blk.blok),
      customPhoto: customPhoto,
      isManual: true,
      source: 'Manual (Simulasi)'
    };
    // Save finding to sessionStorage
    window.SPT_DATA.addManualFinding(newFinding);
    // Refresh allFindings
    state.allFindings = window.SPT_DATA.getAllFindings(state.indexedGeoData);
    // Refresh UI
    closeAddFindingModal();
    syncResetManualButton();
    renderDashboardWidgets();
    renderActionPlanTable();
    updateProblemMapSemanticZoom();
    showToast('Temuan manual ' + idStr + ' berhasil ditambahkan di Blok ' + blk.blok + '!');
  }
  // =========================================================================
  // RESET MANUAL FINDINGS MODAL
  // =========================================================================
  function bindResetManualConfirmModal() {
    var btnOpen = document.getElementById('btnResetManualFindings');
    var modal = document.getElementById('modalResetManualConfirm');
    var btnClose = document.getElementById('btnCloseModalReset');
    var btnCancel = document.getElementById('btnCancelResetManual');
    var btnConfirm = document.getElementById('btnConfirmResetManual');
    function closeModal() {
      if (modal) modal.style.display = 'none';
    }
    if (btnOpen) {
      btnOpen.addEventListener('click', function () {
        if (modal) modal.style.display = 'flex';
      });
    }
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);
    if (btnConfirm) {
      btnConfirm.addEventListener('click', function () {
        window.SPT_DATA.resetManualFindings();
        state.allFindings = window.SPT_DATA.getAllFindings(state.indexedGeoData);
        closeModal();
        syncResetManualButton();
        renderDashboardWidgets();
        renderActionPlanTable();
        updateProblemMapSemanticZoom();
        showToast('Seluruh temuan manual simulasi telah dihapus');
      });
    }
  }
  // =========================================================================
  // BCCR DETAIL MODAL
  // =========================================================================
  function bindBccrDetailModal() {
    var modal = document.getElementById('modalBccrDetail');
    var btnClose = document.getElementById('btnCloseModalBccrDetail');
    var btnClose2 = document.getElementById('btnCloseBccrDetail');
    var btnAnalysis = document.getElementById('btnGoToBccrAnalysis');
    function closeModal() {
      if (modal) modal.style.display = 'none';
    }
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnClose2) btnClose2.addEventListener('click', closeModal);
    if (btnAnalysis) {
      btnAnalysis.addEventListener('click', function () {
        closeModal();
        switchView('analysis', true);
      });
    }
  }
  function openBccrDetailModal(estate, divisi, blok) {
    var modal = document.getElementById('modalBccrDetail');
    var body = document.getElementById('modalBccrDetailBody');
    var title = document.getElementById('modalBccrDetailTitle');
    if (!modal || !body || !window.SPT_DATA) return;
    var blk = blok;
    var blkInfo = window.SPT_DATA.BLOCKS[blok] || {
      actualYTD: 18.0,
      potencyYTD: 22.8,
      bccrYTD: 78.9,
      bccrColor: '#FFCC00',
      productionGap: -4.8,
      openProblems: 3,
      actionProgress: 75.0,
      luas: 28.5,
      sph: 136,
      tt: 2012
    };
    var yieldBlock = (window.SPT_YIELD && window.SPT_YIELD.getYieldTimeline)
      ? window.SPT_YIELD.getYieldTimeline(divisi, blok)
      : null;
    if (yieldBlock && yieldBlock.cutoffActual !== undefined && yieldBlock.cutoffActual !== null) {
      blkInfo = Object.assign({}, blkInfo, {
        actualYTD: yieldBlock.cutoffActual,
        potencyYTD: yieldBlock.cutoffPotency,
        bccrYTD: yieldBlock.cutoffBccr,
        productionGap: yieldBlock.cutoffActual - yieldBlock.cutoffPotency,
        bccrColor: window.SPT_DATA.getBCCRColor(yieldBlock.cutoffBccr),
        luas: yieldBlock.area || blkInfo.luas
      });
    }
    var bKey = estate + ':' + divisi + ':' + blok;
    var blockFindings = (state.allFindings || []).filter(function (iss) {
      return iss.blok === blok && iss.divisi === divisi;
    });
    var majorCount = blockFindings.filter(function (iss) { return iss.sensitivity === 'Major'; }).length;
    var minorCount = blockFindings.filter(function (iss) { return iss.sensitivity === 'Minor'; }).length;
    if (title) {
      title.textContent = '📊 Detail Capaian BCCR Blok ' + blok + ' (' + divisi + ')';
    }
    var html = '<div style="margin-bottom:12px;">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;background:#F8FAFC;border:1px solid #E2E8F0;padding:8px 12px;border-radius:6px;">' +
        '<div>' +
          '<div style="font-size:10px;color:#64748B;font-weight:700;text-transform:uppercase;">Status BCCR YTD</div>' +
          '<div style="font-size:18px;font-weight:800;color:' + blkInfo.bccrColor + ';">' + formatNum(blkInfo.bccrYTD, 1) + '% <span style="font-size:11px;font-weight:600;color:#64748B;">(' + window.SPT_DATA.getBCCRLegendLabel(blkInfo.bccrYTD) + ')</span></div>' +
        '</div>' +
        '<div style="text-align:right;">' +
          '<div style="font-size:10px;color:#64748B;font-weight:700;text-transform:uppercase;">Gap Produksi</div>' +
          '<div style="font-size:14px;font-weight:700;color:' + (blkInfo.productionGap >= 0 ? '#16A34A' : '#DC2626') + ';">' + (blkInfo.productionGap >= 0 ? '+' : '') + formatNum(blkInfo.productionGap, 2) + ' Ton/Ha</div>' +
        '</div>' +
      '</div>' +
    '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">' +
      '<div style="border:1px solid #E2E8F0;border-radius:6px;padding:8px;"><span style="font-size:10px;color:#64748B;display:block;">Aktual YTD</span><strong style="font-size:13px;color:#0F172A;">' + formatNum(blkInfo.actualYTD, 2) + ' Ton/Ha</strong></div>' +
      '<div style="border:1px solid #E2E8F0;border-radius:6px;padding:8px;"><span style="font-size:10px;color:#64748B;display:block;">Potensi YTD</span><strong style="font-size:13px;color:#0F172A;">' + formatNum(blkInfo.potencyYTD, 2) + ' Ton/Ha</strong></div>' +
      '<div style="border:1px solid #E2E8F0;border-radius:6px;padding:8px;"><span style="font-size:10px;color:#64748B;display:block;">Luas Areal</span><strong style="font-size:13px;color:#0F172A;">' + formatNum(blkInfo.luas || 28.5, 1) + ' Ha</strong></div>' +
      '<div style="border:1px solid #E2E8F0;border-radius:6px;padding:8px;"><span style="font-size:10px;color:#64748B;display:block;">SPH / Thn Tanam</span><strong style="font-size:13px;color:#0F172A;">' + (blkInfo.sph || 136) + ' pkk · ' + (blkInfo.tt || 2012) + '</strong></div>' +
    '</div>';
    html += '<div style="border:1px solid #E2E8F0;border-radius:6px;padding:10px;background:#FAFAFC;">' +
      '<div style="font-size:11px;font-weight:700;color:#0F172A;margin-bottom:6px;">Temuan Masalah Operasional Teridentifikasi</div>' +
      '<div style="display:flex;gap:6px;margin-bottom:8px;">' +
        '<span class="summary-pill major" style="font-size:11px;padding:3px 8px;">Major ' + majorCount + '</span>' +
        '<span class="summary-pill minor" style="font-size:11px;padding:3px 8px;">Minor ' + minorCount + '</span>' +
        '<span style="font-size:11px;color:#64748B;align-self:center;margin-left:auto;">Realisasi Action: <strong>' + blkInfo.actionProgress + '%</strong></span>' +
      '</div>' +
      '<button type="button" class="btn-primary" onclick="window.SPT_APP.focusBlockOnProblemMap(\'' + divisi + '\', \'' + blok + '\'); document.getElementById(\'modalBccrDetail\').style.display=\'none\';" style="width:100%;font-size:11px;padding:6px;">Lihat Sebaran Masalah Blok Ini di Peta →</button>' +
    '</div>';
    body.innerHTML = html;
    modal.style.display = 'flex';
  }
  function selectBlockFromMap(divisi, blok) {
    state.division = divisi;
    state.block = blok;
    var divSelect = document.getElementById('divisionFilter');
    if (divSelect) divSelect.value = divisi;
    populateBlockFilter();
    var blkSelect = document.getElementById('blockFilter');
    if (blkSelect) blkSelect.value = blok;
    onFilterChanged();
    showToast('Filter aktif: ' + divisi + ' · Blok ' + blok);
  }
  function updateMapHighlight() {
    if (!state.bccrGeoJsonLayer) return;
    state.bccrGeoJsonLayer.eachLayer(function (layer) {
      var p = layer.feature ? layer.feature.properties : {};
      var blk = p.blok || '';
      var blkInfo = window.SPT_DATA ? window.SPT_DATA.BLOCKS[blk] : null;
      var bccrRange = blkInfo ? blkInfo.bccrRange : 'Belum ada data';
      var matchDiv = state.division === 'all' || p.divisi === state.division;
      var matchBlk = state.block === 'all' || p.blok === state.block;
      var matchRange = state.bccrFilterRange === 'all' || bccrRange === state.bccrFilterRange;
      if (matchDiv && matchBlk && matchRange) {
        layer.setStyle({
          fillOpacity: 0.85,
          weight: state.block !== 'all' ? 3 : 1.5,
          color: state.block !== 'all' ? '#FFE066' : '#FFFFFF'
        });
      } else {
        layer.setStyle({
          fillOpacity: 0.16,
          weight: 0.8,
          color: '#FFFFFF'
        });
      }
    });
  }
  function addObservationSchedule(blok) {
    var b = blok || (state.selectedBlockKey ? state.selectedBlockKey.split('|')[2] : 'F-59');
    var targetHa = document.getElementById('schTargetHa') ? document.getElementById('schTargetHa').value : '4.9';
    var dateVal = document.getElementById('schDateInput') ? document.getElementById('schDateInput').value : '2026-10-12';
    var staffVal = document.getElementById('schStaffInput') ? document.getElementById('schStaffInput').value : 'Hendra Budiono';
    var actVal = document.getElementById('schActInput') ? document.getElementById('schActInput').value : 'Pengancakan';
    if (!state.scheduledSessions) state.scheduledSessions = {};
    if (!state.scheduledSessions[b]) state.scheduledSessions[b] = [];
    state.scheduledSessions[b].push({
      date: dateVal,
      targetHa: targetHa,
      staff: staffVal,
      activity: actVal
    });
    if (window.tnkeStore) {
      var d = window.tnkeStore.getBlockData('TNKE', 'DIVISI 2', b, state.activeActivityFilter);
      populateDrawer(d);
    }
    showToast('Jadwal Observasi Lanjutan Blok ' + b + ' (' + targetHa + ' ha) berhasil disimpan!');
  }
  function switchMapLegendTab(tab) {
    var bCov = document.getElementById('btnLegendTabCoverage');
    var bTrk = document.getElementById('btnLegendTabTracking');
    var bTag = document.getElementById('btnLegendTabTagging');
    var body = document.getElementById('legendContentBody');
    if (!body) return;
    if (bCov) bCov.className = 'legend-tab-btn' + (tab === 'coverage' ? ' active' : '');
    if (bTrk) bTrk.className = 'legend-tab-btn' + (tab === 'tracking' ? ' active' : '');
    if (bTag) bTag.className = 'legend-tab-btn' + (tab === 'tagging' ? ' active' : '');
    body.style.display = 'flex';
    if (tab === 'coverage') {
      body.innerHTML = '<span class="legend-item" data-range="0"><i style="background:#9E9E9E"></i>0% (Belum)</span>' +
        '<span class="legend-item" data-range=">0-25"><i style="background:#EF5350"></i>&gt;0–25% (Merah)</span>' +
        '<span class="legend-item" data-range=">25-50"><i style="background:#FFA726"></i>&gt;25–50% (Oranye)</span>' +
        '<span class="legend-item" data-range=">50-75"><i style="background:#FFEE58;color:#1E293B"></i>&gt;50–75% (Kuning)</span>' +
        '<span class="legend-item" data-range=">75-<100"><i style="background:#9CCC65;color:#1E293B"></i>&gt;75–&lt;100% (Hijau Muda)</span>' +
        '<span class="legend-item" data-range="100"><i style="background:#2E7D32"></i>100% (Lengkap)</span>';
    } else if (tab === 'tracking') {
      body.innerHTML = '<span style="font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px;"><i style="display:inline-block;width:12px;height:3px;background:#2563EB;"></i> Pengancakan</span>' +
        '<span style="font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px;"><i style="display:inline-block;width:12px;height:3px;background:#059669;"></i> IPD Panen</span>' +
        '<span style="font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px;"><i style="display:inline-block;width:12px;height:3px;background:#7C3AED;"></i> Inspeksi Pemupukan</span>' +
        '<span style="font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px;"><i style="display:inline-block;width:12px;height:3px;background:#D97706;"></i> Inspeksi Upkeep</span>' +
        '<span style="font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px;"><i style="display:inline-block;width:12px;height:3px;background:#DC2626;"></i> Blok Checklist</span>';
    } else if (tab === 'tagging') {
      var cats = window.SPT_PROBLEM_CATEGORIES || {};
      var tHtml = '';
      Object.keys(cats).forEach(function (k) {
        var c = cats[k];
        tHtml += '<span style="font-size:10.5px;font-weight:600;background:' + c.bgColor + ';color:' + c.color + ';padding:2px 6px;border-radius:10px;border:1px solid ' + c.borderColor + ';display:inline-flex;align-items:center;gap:3px;">' +
          '<span>' + c.icon + '</span> ' + c.name +
          '</span>';
      });
      body.innerHTML = tHtml;
    }
  }
  function toggleLegendVisibility() {
    var legWrap = document.getElementById('assessmentLegend');
    var btn = document.getElementById('btnToggleLegendVisibility');
    var covBody = document.getElementById('legendContentBody');
    var prbBody = document.getElementById('problemLegendBody');
    if (!legWrap || !btn) return;
    var isCollapsed = legWrap.classList.contains('legend-collapsed');
    if (isCollapsed) {
      legWrap.classList.remove('legend-collapsed');
      if (state.mapMode === 'problem') {
        if (prbBody) prbBody.style.display = 'flex';
      } else {
        if (covBody) covBody.style.display = 'flex';
      }
      btn.textContent = '👁️ Sembunyikan';
    } else {
      legWrap.classList.add('legend-collapsed');
      if (covBody) covBody.style.display = 'none';
      if (prbBody) prbBody.style.display = 'none';
      btn.textContent = '👁️ Tampilkan';
    }
  }
  // =========================================================================
  // GLOBAL PUBLIC API
  // =========================================================================
  window.SPT_APP = {
    switchObsTab: switchObsTab,
    renderActivityDonut: renderActivityDonut,
    showDonutTooltip: showDonutTooltip,
    moveDonutTooltip: moveDonutTooltip,
    hideDonutTooltip: hideDonutTooltip,
    selectDonutActivity: selectDonutActivity,
    onDivCompActivityChange: onDivCompActivityChange,
    onDivCompDivisionSelect: onDivCompDivisionSelect,
    setDivTableUnit: setDivTableUnit,
    renderDivisionComparisonTable: renderDivisionComparisonTable,
    selectDivisionFromTable: selectDivisionFromTable,
    handleOpsSummaryClick: handleOpsSummaryClick,
    openCycleModal: openCycleModal,
    closeCycleModal: closeCycleModal,
    saveCycleSetup: saveCycleSetup,
    renderSummaryDashboardCards: renderSummaryDashboardCards,
    renderProductionTrendLineChart: renderProductionTrendLineChart,
    fitMapToScope: fitMapToScope,
    switchView: switchView,
    onLoginSuccess: function () {
      try {
        switchView(state.currentView || 'dashboard', false);
        renderSummaryDashboardCards();
        if (state.mapAssessment) {
          setTimeout(function () {
            state.mapAssessment.invalidateSize();
            fitMapToScope(state.mapAssessment);
          }, 100);
        }
      } catch (e) {
        console.warn('onLoginSuccess error:', e);
      }
    },
    initOrRefresh: function () {
      try {
        renderSummaryDashboardCards();
      } catch (e) { }
    },
    initApp: initApp,
    selectBlock: selectBlock,
    renderGeoJsonLayers: renderGeoJsonLayers,
    renderDailyActivityView: renderDailyActivityView,
    updateAssessmentSummaryCards: updateAssessmentSummaryCards,
    populateDrawer: populateDrawer,
    toggleHistoryHighlight: toggleHistoryHighlight,
    renderTrackingLayers: renderTrackingLayers,
    renderProblemTagMarkers: renderProblemTagMarkers,
    selectProblemTagMarker: selectProblemTagMarker,
    addObservationSchedule: addObservationSchedule,
    switchMapLegendTab: switchMapLegendTab,
    toggleLegendVisibility: toggleLegendVisibility,
    switchDashCard: switchDashCard,
    switchProbTab: switchProbTab,
    setProblemMeasurementBasis: setProblemMeasurementBasis,
    renderProblemDashboardDetail: renderProblemDashboardDetail,
    switchMapMode: switchMapMode,
    setBasemapLayer: setBasemapLayer,
    changeProblemCategory: changeProblemCategory,
    createSPTProblemAnalytics: createSPTProblemAnalytics,
    populateProblemCategoryDropdowns: populateProblemCategoryDropdowns,
    goToProblemTaggingWithFilters: goToProblemTaggingWithFilters,
    showProblemHeatmapTooltip: showProblemHeatmapTooltip,
    moveProblemHeatmapTooltip: moveProblemHeatmapTooltip,
    hideProblemHeatmapTooltip: hideProblemHeatmapTooltip,
    getMap: function () { return state.mapAssessment; },
    getState: function () { return state; }
  };
  console.log("REACHED END OF APP.JS", window.SPT_APP);
  // Launch on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
  } catch (topErr) {
    console.error("TOP LEVEL ERROR IN APP.JS:", topErr);
    window.__TOP_ERR__ = topErr.toString() + "\n" + (topErr.stack || '');
  }
})();
