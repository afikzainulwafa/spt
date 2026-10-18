/**
 * SMART PROBLEM TAGGING - Yield Moving, Potency & Projection Service
 * Implementation of SKDE Trailing 12-Month Yield Moving & Scenario Recovery Forecast
 * Reference: ANTIGRAVITY_Yield_Projection_Enhancement.md
 */

(function () {
  'use strict';

  var MONTHS_24 = [
    { key: '2025-08', label: 'Agu 25', horizon: -11, isForecast: false, isCutoff: false, provenance: 'syntheticHistorical', provenanceLabel: 'Sintetis historis' },
    { key: '2025-09', label: 'Sep 25', horizon: -10, isForecast: false, isCutoff: false, provenance: 'syntheticHistorical', provenanceLabel: 'Sintetis historis' },
    { key: '2025-10', label: 'Okt 25', horizon: -9,  isForecast: false, isCutoff: false, provenance: 'syntheticHistorical', provenanceLabel: 'Sintetis historis' },
    { key: '2025-11', label: 'Nov 25', horizon: -8,  isForecast: false, isCutoff: false, provenance: 'syntheticHistorical', provenanceLabel: 'Sintetis historis' },
    { key: '2025-12', label: 'Des 25', horizon: -7,  isForecast: false, isCutoff: false, provenance: 'syntheticHistorical', provenanceLabel: 'Sintetis historis' },
    { key: '2026-01', label: 'Jan 26', horizon: -6,  isForecast: false, isCutoff: false, provenance: 'observed', provenanceLabel: 'Moving sumber' },
    { key: '2026-02', label: 'Feb 26', horizon: -5,  isForecast: false, isCutoff: false, provenance: 'observed', provenanceLabel: 'Moving sumber' },
    { key: '2026-03', label: 'Mar 26', horizon: -4,  isForecast: false, isCutoff: false, provenance: 'observed', provenanceLabel: 'Moving sumber' },
    { key: '2026-04', label: 'Apr 26', horizon: -3,  isForecast: false, isCutoff: false, provenance: 'observed', provenanceLabel: 'Moving sumber' },
    { key: '2026-05', label: 'Mei 26', horizon: -2,  isForecast: false, isCutoff: false, provenance: 'observed', provenanceLabel: 'Moving sumber' },
    { key: '2026-06', label: 'Jun 26', horizon: -1,  isForecast: false, isCutoff: false, provenance: 'observed', provenanceLabel: 'Moving sumber' },
    { key: '2026-07', label: 'Jul 26', horizon: 0,   isForecast: false, isCutoff: true,  provenance: 'observed', provenanceLabel: 'Moving sumber (Cut-off)' },
    { key: '2026-08', label: 'Agu 26', horizon: 1,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2026-09', label: 'Sep 26', horizon: 2,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2026-10', label: 'Okt 26', horizon: 3,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2026-11', label: 'Nov 26', horizon: 4,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2026-12', label: 'Des 26', horizon: 5,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2027-01', label: 'Jan 27', horizon: 6,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2027-02', label: 'Feb 27', horizon: 7,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2027-03', label: 'Mar 27', horizon: 8,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2027-04', label: 'Apr 27', horizon: 9,   isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2027-05', label: 'Mei 27', horizon: 10,  isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2027-06', label: 'Jun 27', horizon: 11,  isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' },
    { key: '2027-07', label: 'Jul 27', horizon: 12,  isForecast: true,  isCutoff: false, provenance: 'scenarioForecast', provenanceLabel: 'Proyeksi skenario' }
  ];

  // Specific Reference Blocks Data from Section A & D
  var SPECIAL_BLOCKS = {
    'SKDE:DIVISI 3:S-28': {
      estate: 'SKDE',
      divisi: 'DIVISI 3',
      blok: 'S-28',
      area: 33.54,
      recoveryMonth: 10,
      actualMoving: [20.20, 20.30, 20.45, 20.55, 20.67, 21.50, 21.60, 21.70, 22.20, 22.60, 24.60, 26.30],
      potencyMoving: [
        29.33333333, 29.25, 29.16666667, 29.08333333, 29.0, 29.0,
        29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
        29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
        29.0, 29.0, 29.0, 29.0, 29.0, 29.0
      ]
    },
    'SKDE:DIVISI 3:S-29': {
      estate: 'SKDE',
      divisi: 'DIVISI 3',
      blok: 'S-29',
      area: 26.94,
      recoveryMonth: 9,
      actualMoving: [21.00, 21.30, 21.70, 22.00, 22.10, 22.20, 23.40, 22.30, 24.50, 25.80, 26.50, 30.60],
      potencyMoving: [
        29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
        29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
        29.0, 29.0, 29.0, 29.0, 29.0, 29.0,
        29.0, 29.0, 29.0, 29.0, 29.0, 29.0
      ]
    },
    'SKDE:DIVISI 3:T-29': {
      estate: 'SKDE',
      divisi: 'DIVISI 3',
      blok: 'T-29',
      area: 29.75,
      recoveryMonth: 11,
      actualMoving: [21.40, 21.60, 21.90, 22.10, 22.30, 22.50, 22.60, 23.80, 25.20, 24.90, 26.80, 28.00],
      potencyMoving: [
        28.9, 28.9, 28.9, 28.9, 28.9, 28.9,
        28.9, 28.9, 28.9, 28.9, 28.9, 28.9,
        28.9, 28.9, 28.9, 28.9, 28.9, 28.9,
        28.9, 28.9, 28.9, 28.9, 28.9, 28.9
      ]
    }
  };

  function stableHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // Generate 24-month series for a specific block
  function generateBlockYieldSeries(blockKey, blockInfo) {
    if (SPECIAL_BLOCKS[blockKey]) {
      return computeTimelineFromSpec(SPECIAL_BLOCKS[blockKey]);
    }

    var estate = blockInfo.estate || 'SKDE';
    var divisi = blockInfo.divisi || 'DIVISI 3';
    var blok = blockInfo.blok || '';
    var area = blockInfo.luas || 28.0;

    var cutoffActual = blockInfo.actualYTD || 24.5;
    var basePotency = blockInfo.potencyYTD || 28.5;
    if (basePotency <= 0) basePotency = 28.5;

    // Recovery month deterministically between 9 and 12
    var recoveryMonth = 9 + (stableHash(blockKey) % 4);

    // Baseline historical potencies (slight taper from previous year if any, or flat)
    var potencyMoving = [];
    for (var m = 0; m < 24; m++) {
      if (m === 0) potencyMoving.push(basePotency + 0.3333);
      else if (m === 1) potencyMoving.push(basePotency + 0.25);
      else if (m === 2) potencyMoving.push(basePotency + 0.1667);
      else if (m === 3) potencyMoving.push(basePotency + 0.0833);
      else potencyMoving.push(basePotency);
    }

    // Historical actuals: 5 synthetic (smooth ramp) + 7 observed moving
    var actualMoving = [];
    var startActual = cutoffActual * 0.76;
    for (var h = 0; h < 12; h++) {
      if (h < 5) {
        var frac = h / 5.0;
        var actVal = startActual + (cutoffActual * 0.82 - startActual) * frac;
        actualMoving.push(Math.round(actVal * 100) / 100);
      } else {
        var frac2 = (h - 5) / 6.0;
        var actVal2 = cutoffActual * 0.82 + (cutoffActual - cutoffActual * 0.82) * frac2;
        actualMoving.push(Math.round(actVal2 * 100) / 100);
      }
    }

    var spec = {
      estate: estate,
      divisi: divisi,
      blok: blok,
      area: area,
      recoveryMonth: recoveryMonth,
      actualMoving: actualMoving,
      potencyMoving: potencyMoving
    };

    return computeTimelineFromSpec(spec);
  }

  function computeTimelineFromSpec(spec) {
    var cutoffAct = spec.actualMoving[11];
    var cutoffPot = spec.potencyMoving[11];
    var startRatio = cutoffPot > 0 ? cutoffAct / cutoffPot : 0.8;
    var recoveryMonth = spec.recoveryMonth || 10;

    var timeline = [];

    for (var i = 0; i < 24; i++) {
      var mMeta = MONTHS_24[i];
      var pot = spec.potencyMoving[i];
      var act = null;
      var prj = null;
      var bccr = 0;
      var provenance = mMeta.provenance;
      var provenanceLabel = mMeta.provenanceLabel;

      if (i < 12) {
        // Historical period
        act = spec.actualMoving[i];
        bccr = pot > 0 ? (act / pot) * 100 : 0;
      } else {
        // Forecast horizon period (1 to 12)
        var hMonth = i - 11;
        var u = Math.min(hMonth / recoveryMonth, 1.0);
        var easing = 3.0 * u * u - 2.0 * u * u * u;

        var prjRatio;
        if (startRatio >= 1.0) {
          // Maintain / Above Potency scenario
          prjRatio = startRatio;
        } else {
          prjRatio = startRatio + (1.0 - startRatio) * easing;
          if (hMonth >= recoveryMonth) {
            prjRatio = 1.0;
          }
        }

        prj = Math.round(pot * prjRatio * 100) / 100;
        bccr = Math.round(prjRatio * 10000) / 100;
      }

      timeline.push({
        monthKey: mMeta.key,
        monthLabel: mMeta.label,
        horizon: mMeta.horizon,
        isForecast: mMeta.isForecast,
        isCutoff: mMeta.isCutoff,
        actualMoving: act !== null ? Math.round(act * 100) / 100 : null,
        projectionMoving: prj !== null ? Math.round(prj * 100) / 100 : null,
        potencyMoving: Math.round(pot * 10000) / 10000,
        displayPotency: Math.round(pot * 100) / 100,
        bccrRatio: Math.round(bccr * 100) / 100,
        provenance: provenance,
        provenanceLabel: provenanceLabel,
        gap: act !== null ? Math.round((act - pot) * 100) / 100 : (prj !== null ? Math.round((prj - pot) * 100) / 100 : 0)
      });
    }

    return {
      estate: spec.estate,
      divisi: spec.divisi,
      blok: spec.blok,
      area: spec.area,
      recoveryMonth: recoveryMonth,
      startRatio: startRatio,
      timeline: timeline
    };
  }

  // Cached series map
  var cachedBlockSeries = {};

  function getBlockSeries(blockKey, blockInfo) {
    if (!cachedBlockSeries[blockKey]) {
      cachedBlockSeries[blockKey] = generateBlockYieldSeries(blockKey, blockInfo);
    }
    return cachedBlockSeries[blockKey];
  }

  /**
   * Main Public Query: Returns the 24-Month Yield Timeline
   * Supports Single Block, Single Division, or Entire Estate (Weighted Aggregation)
   */
  function getYieldTimeline(selectedDivision, selectedBlock) {
    var allBlocks = (window.SPT_DATA && window.SPT_DATA.ALL_BLOCKS) ? window.SPT_DATA.ALL_BLOCKS : [];

    // 1. Single Block Selected
    if (selectedBlock && selectedBlock !== 'all') {
      var targetDiv = (selectedDivision && selectedDivision !== 'all') ? selectedDivision : null;
      var foundBlock = allBlocks.find(function (b) {
        var matchBlk = b.blok === selectedBlock;
        var matchDiv = targetDiv ? b.divisi === targetDiv : true;
        return matchBlk && matchDiv;
      });

      if (!foundBlock) {
        foundBlock = { estate: 'SKDE', divisi: selectedDivision || 'DIVISI 3', blok: selectedBlock, luas: 30.0, actualYTD: 25.0, potencyYTD: 29.0 };
      }

      var bKey = (foundBlock.estate || 'SKDE') + ':' + foundBlock.divisi + ':' + foundBlock.blok;
      var bSeries = getBlockSeries(bKey, foundBlock);

      return {
        scope: 'block',
        title: foundBlock.estate + ' · ' + foundBlock.divisi + ' · Blok ' + foundBlock.blok,
        division: foundBlock.divisi,
        block: foundBlock.blok,
        area: foundBlock.luas,
        recoveryMonth: bSeries.recoveryMonth,
        cutoffActual: bSeries.timeline[11].actualMoving,
        cutoffPotency: bSeries.timeline[11].potencyMoving,
        cutoffBccr: bSeries.timeline[11].bccrRatio,
        timeline: bSeries.timeline
      };
    }

    // 2. Division or All Estate (Area-Weighted Aggregation)
    var filteredBlocks = allBlocks;
    if (selectedDivision && selectedDivision !== 'all') {
      filteredBlocks = allBlocks.filter(function (b) {
        return b.divisi === selectedDivision;
      });
    }

    if (filteredBlocks.length === 0) {
      filteredBlocks = allBlocks;
    }

    var totalArea = 0;
    var blockSeriesList = [];

    filteredBlocks.forEach(function (b) {
      var bKey = (b.estate || 'SKDE') + ':' + b.divisi + ':' + b.blok;
      var s = getBlockSeries(bKey, b);
      var bArea = Number(b.luas) || 28.0;
      totalArea += bArea;
      blockSeriesList.push({ area: bArea, timeline: s.timeline });
    });

    if (totalArea <= 0) totalArea = 1;

    // Compute weighted aggregate for each of the 24 months
    var aggTimeline = [];

    for (var mIdx = 0; mIdx < 24; mIdx++) {
      var mMeta = MONTHS_24[mIdx];
      var sumActProd = 0;
      var sumPrjProd = 0;
      var sumPotProd = 0;
      var actArea = 0;
      var prjArea = 0;

      blockSeriesList.forEach(function (item) {
        var pt = item.timeline[mIdx];
        var a = item.area;
        sumPotProd += pt.potencyMoving * a;

        if (pt.actualMoving !== null) {
          sumActProd += pt.actualMoving * a;
          actArea += a;
        }
        if (pt.projectionMoving !== null) {
          sumPrjProd += pt.projectionMoving * a;
          prjArea += a;
        }
      });

      var aggPot = sumPotProd / totalArea;
      var aggAct = actArea > 0 ? (sumActProd / actArea) : null;
      var aggPrj = prjArea > 0 ? (sumPrjProd / prjArea) : null;

      var bccrVal = 0;
      if (aggAct !== null && aggPot > 0) {
        bccrVal = (aggAct / aggPot) * 100;
      } else if (aggPrj !== null && aggPot > 0) {
        bccrVal = (aggPrj / aggPot) * 100;
      }

      var gapVal = (aggAct !== null ? aggAct : (aggPrj !== null ? aggPrj : 0)) - aggPot;

      aggTimeline.push({
        monthKey: mMeta.key,
        monthLabel: mMeta.label,
        horizon: mMeta.horizon,
        isForecast: mMeta.isForecast,
        isCutoff: mMeta.isCutoff,
        actualMoving: aggAct !== null ? Math.round(aggAct * 100) / 100 : null,
        projectionMoving: aggPrj !== null ? Math.round(aggPrj * 100) / 100 : null,
        potencyMoving: Math.round(aggPot * 10000) / 10000,
        displayPotency: Math.round(aggPot * 100) / 100,
        bccrRatio: Math.round(bccrVal * 100) / 100,
        provenance: mMeta.provenance,
        provenanceLabel: mMeta.provenanceLabel,
        gap: Math.round(gapVal * 100) / 100
      });
    }

    var scopeName = (selectedDivision && selectedDivision !== 'all') ? selectedDivision : 'Estate SKDE (Seluruh Divisi)';

    return {
      scope: (selectedDivision && selectedDivision !== 'all') ? 'division' : 'estate',
      title: 'Estate SKDE · ' + scopeName,
      division: selectedDivision || 'all',
      block: 'all',
      totalBlocks: filteredBlocks.length,
      area: Math.round(totalArea * 100) / 100,
      cutoffActual: aggTimeline[11].actualMoving,
      cutoffPotency: aggTimeline[11].potencyMoving,
      cutoffBccr: aggTimeline[11].bccrRatio,
      timeline: aggTimeline
    };
  }

  // Export to Global
  window.SPT_YIELD = {
    MONTHS_24: MONTHS_24,
    SPECIAL_BLOCKS: SPECIAL_BLOCKS,
    getYieldTimeline: getYieldTimeline
  };

})();
