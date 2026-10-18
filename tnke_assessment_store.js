/**
 * TNKE Observation Store Bridge & Helper Utilities
 * Smart Problem Tagging (SPT) — Coverage Observasi Blok
 */

(function () {
  'use strict';

  function getBlockData(estate, divisi, blok, activityFilter) {
    if (window.tnkeStore) {
      return window.tnkeStore.getBlockData(estate, divisi, blok, activityFilter);
    }
    var est = estate || 'TNKE';
    var div = divisi || 'DIVISI 1';
    var blk = blok || 'F-40';
    var key = est + '|' + div + '|' + blk;
    var masterInfo = window.TNKEMaster ? window.TNKEMaster.ATTACHMENT_DATA[key] : null;
    var totalArea = masterInfo ? masterInfo.areaHa : 25.0;

    return {
      compositeKey: key, blockKey: key, estate: est, divisi: div, blok: blk,
      totalArea: totalArea, areaHa: totalArea, assessedHa: 0, diobservasiHa: 0, unassessedHa: totalArea, remainingHa: totalArea,
      progressPct: 0, coveragePct: 0, statusText: 'Belum diobservasi (0%)', lastAssessmentDate: '-', lastDate: '-',
      visits: [], tagItems: [], findings: [], tagCount: 0, visitsCount: 0, activityBreakdown: {}, activities: {}
    };
  }

  window.TNKEAssessmentStore = {
    getBlockData: getBlockData,
    getAssessmentSummary: function (estateFilter, divisiFilter, blockFilter, activityFilter) {
      if (window.tnkeStore) {
        return window.tnkeStore.getAggregatedObservation(estateFilter, divisiFilter, activityFilter);
      }
      return {
        totalLuasBlokHa: 0,
        totalUniqueDiobservasiHa: 0,
        totalCoveragePct: 0,
        observasiLengkapBlokCount: 0,
        totalKunjunganCount: 0,
        totalBlokCount: 0
      };
    }
  };
})();
