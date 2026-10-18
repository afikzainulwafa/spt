import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update initApp to call bindAssessmentLegendEvents()
code = code.replace(
    "bindAsesmenControls();\n    renderProblemLegendDrawer();",
    "bindAsesmenControls();\n    renderProblemLegendDrawer();\n    bindAssessmentLegendEvents();"
)

# 2. Add Progress Assessment helper functions before initApp
helpers_code = """
  // =========================================================================
  // PROGRESS ASSESSMENT BLOK HELPERS & DATA CONTROLLER
  // =========================================================================
  function getAssessmentColor(pct) {
    if (pct === 0) return '#6B7280'; // Abu-abu — Belum di-assess
    if (pct <= 25) return '#FCA5A5'; // Merah lembut
    if (pct <= 50) return '#FDBA74'; // Oranye
    if (pct <= 75) return '#FDE047'; // Kuning
    if (pct < 100) return '#86EFAC'; // Hijau muda
    return '#16A34A';                // Hijau tua (100% lengkap)
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

  function updateAssessmentSummaryCards() {
    if (!window.TNKEAssessmentStore) return;
    var summary = window.TNKEAssessmentStore.getAssessmentSummary(state.estate, state.division, state.block);

    var cardTotalVal = document.getElementById('cardTotalLuasValue');
    var cardTotalSub = document.getElementById('cardTotalLuasSubtext');
    var cardSudahVal = document.getElementById('cardSudahAssessValue');
    var cardSudahSub = document.getElementById('cardSudahAssessSubtext');
    var cardCompleteVal = document.getElementById('cardCompleteValue');
    var cardCompleteSub = document.getElementById('cardCompleteSubtext');
    var cardTemuanVal = document.getElementById('cardTemuanValue');
    var cardTemuanSub = document.getElementById('cardTemuanSubtext');

    if (cardTotalVal) cardTotalVal.textContent = formatNum(summary.totalArea, 1);
    if (cardTotalSub) cardTotalSub.textContent = summary.totalBlocks + ' blok terpilih';

    if (cardSudahVal) cardSudahVal.textContent = formatNum(summary.assessedHa, 1);
    if (cardSudahSub) cardSudahSub.textContent = formatNum(summary.progressPct, 1) + '% dari total luas';

    if (cardCompleteVal) cardCompleteVal.textContent = summary.completeBlocks;
    if (cardCompleteSub) cardCompleteSub.textContent = 'dari ' + summary.totalBlocks + ' blok dalam filter';

    if (cardTemuanVal) cardTemuanVal.textContent = summary.totalTags;
    if (cardTemuanSub) cardTemuanSub.textContent = 'Total tagging aktif di wilayah';
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
        var mapEl = state.mapAssessment || state.mapBccr;
        if (mapEl && state.assessmentGeoJsonLayer) {
          try {
            mapEl.fitBounds(state.assessmentGeoJsonLayer.getBounds(), { padding: [20, 20] });
          } catch (e) {}
        }
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

    if (window.TNKEAssessmentStore) {
      var data = window.TNKEAssessmentStore.getBlockData(estate, divisi, blok);
      populateDrawer(data);
      openDrawer();
    }
  }

  function populateDrawer(d) {
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
    if (dLastDate) dLastDate.textContent = d.lastAssessmentDate;

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

    var historyWrap = document.getElementById('drawerHistoryWrap');
    if (historyWrap) {
      if (!d.visits || d.visits.length === 0) {
        historyWrap.innerHTML = '<p class="empty-state-text">Belum ada riwayat assessment</p>';
      } else {
        var hHtml = '<table class="compact-history-table"><thead><tr><th>Tanggal</th><th>Tambahan (ha)</th><th>Kumulatif (ha)</th><th>Progress (%)</th></tr></thead><tbody>';
        d.visits.forEach(function (v) {
          hHtml += '<tr>' +
            '<td>' + v.date + (v.note ? '<span class="history-note-tag">(' + v.note + ')</span>' : '') + '</td>' +
            '<td>' + formatNum(v.addHa, 1) + ' ha</td>' +
            '<td>' + formatNum(v.cumHa, 1) + ' ha</td>' +
            '<td><strong>' + formatNum(v.progressPct, 1) + '%</strong></td>' +
            '</tr>';
        });
        hHtml += '</tbody></table>';
        historyWrap.innerHTML = hHtml;
      }
    }

    var tagWrap = document.getElementById('drawerTaggingWrap');
    if (tagWrap) {
      if (!d.tagItems || d.tagItems.length === 0) {
        tagWrap.innerHTML = '<p class="empty-state-text">Belum ada masalah yang di-tag.</p>';
      } else {
        var tHtml = '<div class="tag-category-summary">';
        Object.keys(d.categorySummary).forEach(function (cat) {
          tHtml += '<span class="tag-cat-badge">' + cat + ': ' + d.categorySummary[cat] + ' temuan</span>';
        });
        tHtml += '</div><div class="tag-item-list">';

        d.tagItems.forEach(function (t) {
          var stClass = t.status === 'Selesai' ? 'selesai' : (t.status === 'Dalam proses' ? 'proses' : 'open');
          tHtml += '<div class="tag-item-card">' +
            '<div class="tag-item-header">' +
              '<span class="tag-item-id">' + t.id + ' · ' + t.date + '</span>' +
              '<span class="tag-status-pill ' + stClass + '">' + t.status + '</span>' +
            '</div>' +
            '<div class="tag-item-title">' + t.problemName + ' (' + t.category + ')</div>' +
            '<div class="tag-item-desc">' + t.description + '</div>' +
            '</div>';
        });
        tHtml += '</div>';
        tagWrap.innerHTML = tHtml;
      }
    }

    var dBccrPeriod = document.getElementById('dBccrPeriod');
    var dBccrActual = document.getElementById('dBccrActual');
    var dBccrPotency = document.getElementById('dBccrPotency');
    var dBccrPct = document.getElementById('dBccrPct');
    var dBccrGap = document.getElementById('dBccrGap');

    if (dBccrPeriod) dBccrPeriod.textContent = 'Periode: ' + d.bccrPeriod;
    if (dBccrActual) dBccrActual.textContent = formatNum(d.actualTon, 0) + ' ton';
    if (dBccrPotency) dBccrPotency.textContent = formatNum(d.potentialTon, 0) + ' ton';
    if (dBccrPct) dBccrPct.textContent = d.potentialTon > 0 ? formatNum(d.bccrPct, 1) + '%' : '—';
    if (dBccrGap) dBccrGap.textContent = d.gapText;
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
  }
"""

code = code.replace("function initApp() {", helpers_code + "\n  function initApp() {")

# 3. Update populateBlockFilter
new_populate = """  function populateBlockFilter() {
    var blkSelect = document.getElementById('blockFilter');
    if (!blkSelect) return;

    var currentVal = state.block;
    blkSelect.innerHTML = '<option value="all">Semua Blok</option>';

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
  }"""

code = re.sub(r'function populateBlockFilter\(\)\s*\{[\s\S]*?\n  \}', new_populate, code, count=1)

# 4. Update onFilterChanged
new_onfilter = """  function onFilterChanged() {
    updateAssessmentSummaryCards();
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
  }"""

code = re.sub(r'function onFilterChanged\(\)\s*\{[\s\S]*?\n  \}', new_onfilter, code, count=1)

# 5. Update initMaps and loadGeoJsonData
new_maps_code = """  async function initMaps() {
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
        L.control.zoom({ position: 'topright' }).addTo(state.mapAssessment);

        try {
          L.tileLayer(tileUrl, tileOptions).addTo(state.mapAssessment);
        } catch (tileErr) {
          console.warn('Tile layer error:', tileErr);
        }
      }

      state.mapsInitialized = true;
      await loadGeoJsonData();

    } catch (err) {
      console.error('Map initialization failed:', err);
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

      state.geoJsonData = geojson;
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
  }"""

code = re.sub(r'async function initMaps\(\)[\s\S]*?async function loadGeoJsonData\(\)[\s\S]*?\n  \}', new_maps_code, code, count=1)

# 6. Update renderGeoJsonLayers
new_render_geojson = """  function renderGeoJsonLayers(geojson) {
    if (!state.mapsInitialized || !geojson) return;

    var mapEl = state.mapAssessment || state.mapBccr || state.mapProblem;
    if (!mapEl) return;

    if (state.assessmentGeoJsonLayer) {
      mapEl.removeLayer(state.assessmentGeoJsonLayer);
    }

    state.featureLayersByKey = {};

    state.assessmentGeoJsonLayer = L.geoJSON(geojson, {
      style: function (feature) {
        var p = feature.properties || {};
        var est = p.estate || 'TNKE';
        var div = p.divisi || 'DIVISI 1';
        var blk = p.blok || 'ALL';

        var bData = window.TNKEAssessmentStore.getBlockData(est, div, blk);
        var pct = bData.progressPct;

        var color = getAssessmentColor(pct);

        var matchDiv = state.division === 'all' || div === state.division;
        var matchBlk = state.block === 'all' || blk === state.block;
        var matchLegend = matchesLegendFilter(pct, state.activeLegendFilter);

        var compositeKey = est + '|' + div + '|' + blk;
        var isSelected = state.selectedBlockKey === compositeKey || (state.block !== 'all' && blk === state.block);

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
        var compositeKey = est + '|' + div + '|' + blk;

        state.featureLayersByKey[compositeKey] = layer;

        var bData = window.TNKEAssessmentStore.getBlockData(est, div, blk);

        var tooltipHtml = '<div style="font-family:sans-serif;font-size:11.5px;line-height:1.4;">' +
          '<strong style="font-size:12.5px;color:#0F172A;">Blok ' + blk + ' · ' + div + '</strong><br/>' +
          '<span>Luas Blok: <strong>' + formatNum(bData.totalArea, 1) + ' ha</strong></span><br/>' +
          '<span>Sudah Di-assess: <strong>' + formatNum(bData.assessedHa, 1) + ' dari ' + formatNum(bData.totalArea, 1) + ' ha</strong></span><br/>' +
          '<span>Progress: <strong style="color:' + getAssessmentColor(bData.progressPct) + ';">' + formatNum(bData.progressPct, 1) + '%</strong> (' + bData.statusText + ')</span><br/>' +
          '<span>Temuan: <strong>' + (bData.tagCount > 0 ? bData.tagCount + ' temuan' : 'Belum ada temuan') + '</strong></span>' +
          '</div>';

        layer.bindTooltip(tooltipHtml, { sticky: true, direction: 'auto' });

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
      }
    }).addTo(mapEl);

    try {
      if (state.block !== 'all' && state.featureLayersByKey[state.estate + '|' + state.division + '|' + state.block]) {
        var targetL = state.featureLayersByKey[state.estate + '|' + state.division + '|' + state.block];
        mapEl.fitBounds(targetL.getBounds(), { padding: [50, 260], maxZoom: 15 });
      } else if (state.assessmentGeoJsonLayer) {
        mapEl.fitBounds(state.assessmentGeoJsonLayer.getBounds(), { padding: [20, 20] });
      }
    } catch (e) {}

    updateAssessmentSummaryCards();
  }"""

code = re.sub(r'function renderGeoJsonLayers\(geojson\)[\s\S]*?\n  \}', new_render_geojson, code, count=1)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Patched app.js successfully.")
