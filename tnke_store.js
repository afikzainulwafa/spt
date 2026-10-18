/**
 * TNKE Centralized Shared Data Store & Observation Engine
 * Smart Problem Tagging (SPT) — Revamp Phase 1 & 2
 * Shared between Desktop Control Room & Mobile Field Web Application
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'spt_tnke_state_v7_reconciled';

  var ACTIVITIES = [
    { id: 'pengancakan', name: 'Pengancakan', color: '#268BF2', icon: 'compass', desc: 'Pemeriksaan ancak panen awal' },
    { id: 'ipd_panen', name: 'IPD Panen', color: '#AD3CDB', icon: 'scissors', desc: 'Inspeksi Penataan Dapur / Mutu Panen' },
    { id: 'inspeksi_pupuk', name: 'Inspeksi Pemupukan', color: '#FF6900', icon: 'box', desc: 'Verifikasi mutu & aplikasi pemupukan' },
    { id: 'inspeksi_upkeep', name: 'Inspeksi Upkeep', color: '#20A3A7', icon: 'tool', desc: 'Pemeriksaan tebas, piringan & pasar pikul' },
    { id: 'blok_checklist', name: 'Blok Checklist', color: '#795548', icon: 'check-square', desc: 'Pemeriksaan komprehensif rutin blok' }
  ];

  var COVERAGE_RANGES = [
    { min: 0, max: 0, label: 'Belum diobservasi (0%)', color: '#9E9E9E', badgeClass: 'cov-0' },
    { min: 0.00001, max: 25, label: 'Coverage Sangat Rendah (>0–25%)', color: '#EF5350', badgeClass: 'cov-25' },
    { min: 25.00001, max: 50, label: 'Coverage Rendah (>25–50%)', color: '#FFA726', badgeClass: 'cov-50' },
    { min: 50.00001, max: 75, label: 'Coverage Sedang (>50–75%)', color: '#FFEE58', badgeClass: 'cov-75' },
    { min: 75.00001, max: 99.99999, label: 'Coverage Tinggi (>75–<100%)', color: '#9CCC65', badgeClass: 'cov-99' },
    { min: 100, max: 100, label: 'Coverage Observasi 100%', color: '#2E7D32', badgeClass: 'cov-100' }
  ];

  function getCoverageStatus(pct) {
    if (pct <= 0) return COVERAGE_RANGES[0];
    if (pct >= 100) return COVERAGE_RANGES[5];
    if (pct <= 25) return COVERAGE_RANGES[1];
    if (pct <= 50) return COVERAGE_RANGES[2];
    if (pct <= 75) return COVERAGE_RANGES[3];
    return COVERAGE_RANGES[4];
  }

  function hashStr(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function generateSeedData(masterData) {
    var blocks = masterData.blocks;
    var period = '2026-09';
    var visits = [];

    var OFFICERS = [
      { id: 'off_div1', name: 'Ahmad Yani', role: 'Asisten Divisi 1', divisi: 'DIVISI 1' },
      { id: 'off_div2', name: 'Hendra Budiono', role: 'Asisten Divisi 2', divisi: 'DIVISI 2' },
      { id: 'off_div3', name: 'Budi Santoso', role: 'Asisten Divisi 3', divisi: 'DIVISI 3' },
      { id: 'off_div5', name: 'Rahmat Hidayat', role: 'Asisten Divisi 5', divisi: 'DIVISI 5' },
      { id: 'off_div6', name: 'Bambang S', role: 'Asisten Divisi 6', divisi: 'DIVISI 6' }
    ];

    var WORKDAYS = [];
    for (var d = 1; d <= 30; d++) {
      if (d === 6 || d === 13 || d === 20 || d === 27) continue;
      var dayStr = d < 10 ? '0' + d : '' + d;
      WORKDAYS.push({ dayNum: d, dateStr: dayStr + ' Sep 2026' });
    }

    var blockState = {};
    blocks.forEach(function (b) {
      blockState[b.key] = {
        block: b,
        masterArea: b.areaHa,
        visitedPlotsCombined: {},
        visitedPlotsAct: {
          pengancakan: {},
          ipd_panen: {},
          inspeksi_pupuk: {},
          inspeksi_upkeep: {},
          blok_checklist: {}
        },
        visits: []
      };
    });

    var divBlocks = {};
    blocks.forEach(function (b) {
      if (!divBlocks[b.divisi]) divBlocks[b.divisi] = [];
      divBlocks[b.divisi].push(b);
    });

    var globalVisitSeq = 1;

    OFFICERS.forEach(function (officer) {
      var list = divBlocks[officer.divisi] || [];
      if (list.length === 0) return;

      WORKDAYS.forEach(function (wd, dayIdx) {
        var startIdx = (dayIdx * 3) % list.length;

        var dailyPattern = [
          { actId: 'ipd_panen', blkOffset: 0 },
          { actId: 'pengancakan', blkOffset: 0 },
          { actId: 'ipd_panen', blkOffset: 1 },
          { actId: 'pengancakan', blkOffset: 1 },
          { actId: 'inspeksi_pupuk', blkOffset: 2 },
          { actId: 'inspeksi_upkeep', blkOffset: 3 },
          { actId: 'blok_checklist', blkOffset: 4 },
          { actId: 'blok_checklist', blkOffset: 5 }
        ];

        dailyPattern.forEach(function (item) {
          var targetBlock = list[(startIdx + item.blkOffset) % list.length];
          if (targetBlock.key === 'TNKE|DIVISI 2|F-59') return;

          var bSt = blockState[targetBlock.key];
          var act = ACTIVITIES.filter(function (a) { return a.id === item.actId; })[0];
          var totalPlots = Math.max(1, Math.ceil(targetBlock.areaHa));

          var startPlot = (bSt.visits.length * 2 % totalPlots) + 1;

          if (targetBlock.blok === 'H-49' && targetBlock.divisi === 'DIVISI 3') {
            startPlot = (bSt.visits.length % 2) + 1;
          } else if (targetBlock.blok === 'H-50' && targetBlock.divisi === 'DIVISI 3') {
            startPlot = (bSt.visits.length * 2 % 14) + 1;
          } else if (targetBlock.blok === 'F-60' && targetBlock.divisi === 'DIVISI 2') {
            startPlot = (bSt.visits.length * 2 % 13) + 1;
          }

          var visitedPlotKeys = [];
          for (var p = 0; p < 3; p++) {
            var pIdx = ((startPlot - 1 + p) % totalPlots) + 1;
            visitedPlotKeys.push('P' + pIdx);
          }

          // Walked activity distance area = 1.0 ha per session (distance math = 1.0 ha * 0.66 km/ha)
          var walkedAreaHa = 1.0;
          // Nominal observation coverage area for 3 paths, capped by block master area
          var nominalObsAreaHa = Math.min(targetBlock.areaHa, 3.0);

          var newActPlots = 0;
          var newCombinedPlots = 0;

          visitedPlotKeys.forEach(function (pKey) {
            if (!bSt.visitedPlotsAct[act.id][pKey]) {
              newActPlots++;
              bSt.visitedPlotsAct[act.id][pKey] = true;
            }
            if (!bSt.visitedPlotsCombined[pKey]) {
              newCombinedPlots++;
              bSt.visitedPlotsCombined[pKey] = true;
            }
          });

          var addHaCombined = Math.min(nominalObsAreaHa, Math.round(newCombinedPlots * 1.0 * 100) / 100);
          var addHaAct = Math.min(nominalObsAreaHa, Math.round(newActPlots * 1.0 * 100) / 100);

          var uniqueCombinedCount = Object.keys(bSt.visitedPlotsCombined).length;
          var cumUniqueHa = Math.min(targetBlock.areaHa, Math.round(uniqueCombinedCount * 1.0 * 100) / 100);
          var cumPct = Math.round((cumUniqueHa / targetBlock.areaHa) * 1000) / 10;

          var officerLabel = officer.name + ' (' + officer.role + ')';

          var visitObj = {
            visitId: 'VST-' + String('00000' + globalVisitSeq++).slice(-5),
            blockKey: targetBlock.key,
            estate: targetBlock.estate,
            divisi: targetBlock.divisi,
            blok: targetBlock.blok,
            periode: '2026-09',
            date: wd.dateStr,
            officer: officerLabel,
            staffName: officerLabel,
            activityId: act.id,
            activityName: act.name,
            activityColor: act.color,
            walkedAreaHa: walkedAreaHa,
            visitAreaHa: nominalObsAreaHa,
            vHa: nominalObsAreaHa,
            addedUniqueHa: addHaCombined,
            addHa: addHaCombined,
            addedUniqueHaActivity: addHaAct,
            cumUniqueHa: cumUniqueHa,
            cumHa: cumUniqueHa,
            progressPct: cumPct,
            cumPct: cumPct,
            notes: 'Inspeksi ' + act.name + ' 3 jalur (pasar pikul utama & 2 berdampingan)'
          };

          bSt.visits.push(visitObj);
          visits.push(visitObj);
        });
      });
    });

    // Explicit customization for F-59 as requested by user
    var f59Block = blocks.filter(function (b) { return b.key === 'TNKE|DIVISI 2|F-59'; })[0];
    if (f59Block) {
      var bStF59 = blockState['TNKE|DIVISI 2|F-59'];
      var f59Officer = 'Hendra Budiono (Asisten Divisi 2)';
      var f59VisitsData = [
        { date: '07 Sep 2026', actId: 'blok_checklist', actName: 'Blok Checklist', actColor: '#795548', vHa: 3.0, addHa: 3.0, cumHa: 3.0, pct: 10.9, plots: ['P1','P2','P3'] },
        { date: '08 Sep 2026', actId: 'ipd_panen', actName: 'IPD Panen', actColor: '#AD3CDB', vHa: 3.0, addHa: 2.8, cumHa: 5.8, pct: 21.0, plots: ['P4','P5','P6'] },
        { date: '08 Sep 2026', actId: 'pengancakan', actName: 'Pengancakan', actColor: '#268BF2', vHa: 3.0, addHa: 2.8, cumHa: 8.6, pct: 31.2, plots: ['P7','P8','P9'] },
        { date: '18 Sep 2026', actId: 'blok_checklist', actName: 'Blok Checklist', actColor: '#795548', vHa: 3.0, addHa: 2.9, cumHa: 11.5, pct: 41.7, plots: ['P10','P11','P12'] },
        { date: '19 Sep 2026', actId: 'ipd_panen', actName: 'IPD Panen', actColor: '#AD3CDB', vHa: 3.0, addHa: 2.8, cumHa: 14.3, pct: 51.9, plots: ['P13','P14','P15'] },
        { date: '19 Sep 2026', actId: 'pengancakan', actName: 'Pengancakan', actColor: '#268BF2', vHa: 3.0, addHa: 2.8, cumHa: 17.1, pct: 62.0, plots: ['P16','P17','P18'] },
        { date: '28 Sep 2026', actId: 'inspeksi_pupuk', actName: 'Inspeksi Pupuk', actColor: '#FF6900', vHa: 2.7, addHa: 2.7, cumHa: 19.8, pct: 71.8, plots: ['P19','P20','P21'] },
        { date: '30 Sep 2026', actId: 'inspeksi_upkeep', actName: 'Inspeksi Upkeep', actColor: '#20A3A7', vHa: 3.0, addHa: 2.9, cumHa: 22.7, pct: 82.3, plots: ['P22','P23','P24'] }
      ];

      f59VisitsData.forEach(function (vd) {
        vd.plots.forEach(function (pKey) {
          bStF59.visitedPlotsAct[vd.actId][pKey] = true;
          bStF59.visitedPlotsCombined[pKey] = true;
        });

        var visitObj = {
          visitId: 'VST-' + String('00000' + globalVisitSeq++).slice(-5),
          blockKey: 'TNKE|DIVISI 2|F-59',
          estate: 'TNKE',
          divisi: 'DIVISI 2',
          blok: 'F-59',
          periode: '2026-09',
          date: vd.date,
          officer: f59Officer,
          staffName: f59Officer,
          activityId: vd.actId,
          activityName: vd.actName,
          activityColor: vd.actColor,
          walkedAreaHa: 1.0,
          visitAreaHa: vd.vHa,
          vHa: vd.vHa,
          addedUniqueHa: vd.addHa,
          addHa: vd.addHa,
          addedUniqueHaActivity: vd.addHa,
          cumUniqueHa: vd.cumHa,
          cumHa: vd.cumHa,
          progressPct: vd.pct,
          cumPct: vd.pct,
          notes: 'Inspeksi ' + vd.actName + ' 3 jalur (pasar pikul utama & 2 berdampingan)'
        };

        bStF59.visits.push(visitObj);
        visits.push(visitObj);
      });
    }

    var monthlyAssessment = {};
    blocks.forEach(function (b) {
      var bSt = blockState[b.key];

      if (b.key === 'TNKE|DIVISI 2|F-59') {
        var f59CombinedUniqueHa = 22.7;
        var f59CombinedUniquePct = 82.3;
        var f59RemainingHa = 4.87;

        var f59ActBreakdown = {};
        ACTIVITIES.forEach(function (act) {
          var uHa = 0;
          if (act.id === 'pengancakan') uHa = 5.6;
          if (act.id === 'ipd_panen') uHa = 5.6;
          if (act.id === 'inspeksi_pupuk') uHa = 2.7;
          if (act.id === 'inspeksi_upkeep') uHa = 2.9;
          if (act.id === 'blok_checklist') uHa = 5.9;

          var uPct = Math.round((uHa / b.areaHa) * 1000) / 10;
          var actVisitsCount = bSt.visits.filter(function (v) { return v.activityId === act.id; }).length;

          var bObj = {
            activityId: act.id,
            activityName: act.name,
            color: act.color,
            uniqueHa: uHa,
            observedHa: uHa,
            pct: uPct,
            coveragePct: uPct,
            visitCount: actVisitsCount,
            count: actVisitsCount
          };

          f59ActBreakdown[act.id] = bObj;
          var camelKey = act.id;
          if (act.id === 'ipd_panen') camelKey = 'ipdPanen';
          if (act.id === 'inspeksi_pupuk') camelKey = 'inspeksiPupuk';
          if (act.id === 'inspeksi_upkeep') camelKey = 'inspeksiUpkeep';
          if (act.id === 'blok_checklist') camelKey = 'blokChecklist';
          f59ActBreakdown[camelKey] = bObj;
        });

        monthlyAssessment[b.key] = {
          blockKey: b.key,
          estate: b.estate,
          divisi: b.divisi,
          blok: b.blok,
          totalAreaHa: b.areaHa,
          combinedUniqueHa: f59CombinedUniqueHa,
          combinedUniquePct: f59CombinedUniquePct,
          remainingHa: f59RemainingHa,
          status: getCoverageStatus(f59CombinedUniquePct),
          activityBreakdown: f59ActBreakdown
        };
        return;
      }

      var uniqueCombinedCount = Object.keys(bSt.visitedPlotsCombined).length;
      var combinedUniqueHa = Math.min(b.areaHa, Math.round(uniqueCombinedCount * 100) / 100);
      var combinedUniquePct = b.areaHa > 0 ? Math.round((combinedUniqueHa / b.areaHa) * 1000) / 10 : 0;
      var remainingHa = Math.max(0, Math.round((b.areaHa - combinedUniqueHa) * 100) / 100);

      var actBreakdown = {};
      ACTIVITIES.forEach(function (act) {
        var uPlots = Object.keys(bSt.visitedPlotsAct[act.id]).length;
        var uHa = Math.min(b.areaHa, Math.round(uPlots * 100) / 100);
        var uPct = b.areaHa > 0 ? Math.round((uHa / b.areaHa) * 1000) / 10 : 0;
        var actVisitsCount = bSt.visits.filter(function (v) { return v.activityId === act.id; }).length;

        var bObj = {
          activityId: act.id,
          activityName: act.name,
          color: act.color,
          uniqueHa: uHa,
          observedHa: uHa,
          pct: uPct,
          coveragePct: uPct,
          visitCount: actVisitsCount,
          count: actVisitsCount
        };

        actBreakdown[act.id] = bObj;

        var camelKey = act.id;
        if (act.id === 'ipd_panen') camelKey = 'ipdPanen';
        if (act.id === 'inspeksi_pupuk') camelKey = 'inspeksiPupuk';
        if (act.id === 'inspeksi_upkeep') camelKey = 'inspeksiUpkeep';
        if (act.id === 'blok_checklist') camelKey = 'blokChecklist';
        actBreakdown[camelKey] = bObj;
      });

      monthlyAssessment[b.key] = {
        blockKey: b.key,
        estate: b.estate,
        divisi: b.divisi,
        blok: b.blok,
        totalAreaHa: b.areaHa,
        combinedUniqueHa: combinedUniqueHa,
        combinedUniquePct: combinedUniquePct,
        remainingHa: remainingHa,
        status: getCoverageStatus(combinedUniquePct),
        activityBreakdown: actBreakdown
      };
    });

    // Seed Findings linked to TNKE Blocks
    var findings = [
      {
        id: 'FND-TNKE-001',
        blockKey: 'TNKE|DIVISI 3|H-49',
        estate: 'TNKE',
        divisi: 'DIVISI 3',
        blok: 'H-49',
        categoryId: '01',
        categoryName: 'Pasar Pikul Semak',
        sensitivitas: 'Major',
        severity: 'Berat',
        volume: 600,
        unit: 'Meter',
        statusAssessment: 'Approved',
        statusAction: 'PIC Assigned',
        assignedPIC: 'Mandor Joko',
        verifiedVolume: 600,
        statusRealisasi: 'Dalam Proses',
        problemCondition: 'Sebagian teratasi',
        notes: 'Pasar pikul jalur ancak 12-18 tertutup gulma pekat.',
        createdBy: 'Budi Santoso (Asisten)',
        createdAt: '2026-09-05T08:30:00Z',
        beforePhotoColor: '#268BF2'
      },
      {
        id: 'FND-TNKE-002',
        blockKey: 'TNKE|DIVISI 3|H-49',
        estate: 'TNKE',
        divisi: 'DIVISI 3',
        blok: 'H-49',
        categoryId: '02',
        categoryName: 'Underpruning',
        sensitivitas: 'Major',
        severity: 'Sedang',
        volume: 400,
        unit: 'Pkk',
        statusAssessment: 'Approved',
        statusAction: 'Disetujui Askep',
        assignedPIC: 'Mandor Slamet',
        verifiedVolume: 400,
        statusRealisasi: 'Selesai Fisik 100%',
        fieldVerification: 'Verified Passed',
        statusClosure: 'Closed',
        closedBy: 'Hendra Gunawan (Askep)',
        closedAt: '2026-09-20T14:00:00Z',
        problemCondition: 'Teratasi sepenuhnya',
        notes: 'Pelepah menggantung 2 tingkat di baris 4-10.',
        createdBy: 'Budi Santoso (Asisten)',
        createdAt: '2026-09-04T09:15:00Z',
        beforePhotoColor: '#008247'
      },
      {
        id: 'FND-TNKE-003',
        blockKey: 'TNKE|DIVISI 3|H-54',
        estate: 'TNKE',
        divisi: 'DIVISI 3',
        blok: 'H-54',
        categoryId: '03',
        categoryName: 'Areal Banjir / Tergenang',
        sensitivitas: 'Major',
        severity: 'Berat',
        volume: 2.5,
        unit: 'Ha',
        statusAssessment: 'Approved',
        statusAction: 'Disetujui Askep',
        assignedPIC: 'Mandor Wawan',
        verifiedVolume: 2.5,
        statusRealisasi: 'Belum Mulai',
        problemCondition: 'Belum teratasi',
        notes: 'Genangan air saluran drainase tersumbat.',
        createdBy: 'Budi Santoso (Asisten)',
        createdAt: '2026-09-10T11:00:00Z',
        beforePhotoColor: '#EF5350'
      }
    ];

    // Seed Visitor Reports (waiting review)
    var visitorReports = [
      {
        id: 'RPT-VIS-001',
        blockKey: 'TNKE|DIVISI 3|H-49',
        estate: 'TNKE',
        divisi: 'DIVISI 3',
        blok: 'H-49',
        reporterName: 'Ir. Ahmad Fauzi (General Manager Inspection)',
        reportDate: '15 Sep 2026',
        categoryName: 'Aplikasi Pupuk Tidak Merata',
        notes: 'Ditemukan gumpalan pupuk urea di piringan baris 15-20.',
        status: 'Menunggu Review Asisten',
        photoColor: '#FFA726'
      }
    ];

    return {
      version: 7,
      auth: {
        username: 'admin_spt',
        role: 'Asisten',
        name: 'Hendra Budiono (Asisten Divisi 2)',
        estate: 'TNKE',
        divisi: 'DIVISI 2'
      },
      filters: {
        activeEstate: 'TNKE',
        activeDivision: 'DIVISI 2',
        activeBlockKey: 'TNKE|DIVISI 2|F-60',
        activePeriod: '2026-09',
        activeActivityFilter: 'all',
        activeOfficerFilter: 'Hendra Budiono (Asisten Divisi 2)',
        activeDateFilter: '12 Sep 2026'
      },
      monthlyAssessment: monthlyAssessment,
      visits: visits,
      findings: findings,
      visitorReports: visitorReports
    };
  }

  // Mockup tracking date alignment: 12 additional visits required to match
  // tnke_tracking.geojson, while keeping existing F-59 data and combined coverage unchanged.
  // Generated from the tracking file; intentionally stored separately from original visits.
  var TRACKING_SUPPLEMENTAL_VISITS = [
  {
    "visitId": "TRK-SUP-tnke-line-029",
    "blockKey": "TNKE|DIVISI 2|E-55",
    "blok": "E-55",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "01 Sep 2026",
    "trackId": "tnke-line-029"
  },
  {
    "visitId": "TRK-SUP-tnke-line-030",
    "blockKey": "TNKE|DIVISI 2|E-55",
    "blok": "E-55",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "pengancakan",
    "activityName": "Pengancakan",
    "date": "01 Sep 2026",
    "trackId": "tnke-line-030"
  },
  {
    "visitId": "TRK-SUP-tnke-line-083",
    "blockKey": "TNKE|DIVISI 2|F-58",
    "blok": "F-58",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "01 Sep 2026",
    "trackId": "tnke-line-083"
  },
  {
    "visitId": "TRK-SUP-tnke-line-138",
    "blockKey": "TNKE|DIVISI 2|E-59",
    "blok": "E-59",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "02 Sep 2026",
    "trackId": "tnke-line-138"
  },
  {
    "visitId": "TRK-SUP-tnke-line-200",
    "blockKey": "TNKE|DIVISI 2|F-56",
    "blok": "F-56",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "03 Sep 2026",
    "trackId": "tnke-line-200"
  },
  {
    "visitId": "TRK-SUP-tnke-line-298",
    "blockKey": "TNKE|DIVISI 2|F-53",
    "blok": "F-53",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "04 Sep 2026",
    "trackId": "tnke-line-298"
  },
  {
    "visitId": "TRK-SUP-tnke-line-299",
    "blockKey": "TNKE|DIVISI 2|F-53",
    "blok": "F-53",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "pengancakan",
    "activityName": "Pengancakan",
    "date": "04 Sep 2026",
    "trackId": "tnke-line-299"
  },
  {
    "visitId": "TRK-SUP-tnke-line-359",
    "blockKey": "TNKE|DIVISI 2|E-56",
    "blok": "E-56",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "05 Sep 2026",
    "trackId": "tnke-line-359"
  },
  {
    "visitId": "TRK-SUP-tnke-line-439",
    "blockKey": "TNKE|DIVISI 2|E-51",
    "blok": "E-51",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "07 Sep 2026",
    "trackId": "tnke-line-439"
  },
  {
    "visitId": "TRK-SUP-tnke-line-576",
    "blockKey": "TNKE|DIVISI 2|E-57",
    "blok": "E-57",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "08 Sep 2026",
    "trackId": "tnke-line-576"
  },
  {
    "visitId": "TRK-SUP-tnke-line-590",
    "blockKey": "TNKE|DIVISI 2|D-51",
    "blok": "D-51",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "09 Sep 2026",
    "trackId": "tnke-line-590"
  },
  {
    "visitId": "TRK-SUP-tnke-line-630",
    "blockKey": "TNKE|DIVISI 2|E-54",
    "blok": "E-54",
    "estate": "TNKE",
    "divisi": "DIVISI 2",
    "activityId": "ipd_panen",
    "activityName": "IPD Panen",
    "date": "10 Sep 2026",
    "trackId": "tnke-line-630"
  }
];

  function reconcileTrackingSupplementalVisits(state) {
    if (!state || !state.visits || !state.monthlyAssessment) return false;
    var changed = false;
    var already = {};
    state.visits.forEach(function(v) { already[v.visitId] = true; });
    var colorByAct = {
      'ipd_panen': '#AD3CDB', 'pengancakan': '#268BF2',
      'inspeksi_pupuk': '#FF6900', 'inspeksi_upkeep': '#20A3A7', 'blok_checklist': '#795548'
    };
    TRACKING_SUPPLEMENTAL_VISITS.forEach(function(s) {
      if (s.blok === 'F-59' || already[s.visitId]) return;
      var bAss = state.monthlyAssessment[s.blockKey];
      if (!bAss) return;
      var cumHa = bAss.combinedUniqueHa || 0;
      var totalHa = bAss.totalAreaHa || 0;
      var pct = totalHa > 0 ? Math.round(cumHa / totalHa * 1000) / 10 : 0;
      var simulatedVisit = {
        visitId: s.visitId, blockKey: s.blockKey,
        estate: s.estate, divisi: s.divisi, blok: s.blok,
        periode: '2026-09', date: s.date,
        officer: s.divisi === 'DIVISI 2' ? 'Hendra Budiono (Asisten Divisi 2)' : 'Asisten TNKE',
        staffName: s.divisi === 'DIVISI 2' ? 'Hendra Budiono (Asisten Divisi 2)' : 'Asisten TNKE',
        activityId: s.activityId, activityName: s.activityName,
        activityColor: colorByAct[s.activityId] || '#268BF2',
        walkedAreaHa: 0, visitAreaHa: 0, vHa: 0,
        addedUniqueHa: 0, addHa: 0, addedUniqueHaActivity: 0,
        cumUniqueHa: cumHa, cumHa: cumHa, progressPct: pct, cumPct: pct,
        trackId: s.trackId, isSimulation: true,
        trackingSupplemental: true,
        notes: 'Kunjungan simulasi tambahan untuk menyamakan tanggal dan aktivitas line tracking; coverage gabungan tidak berubah.'
      };
      state.visits.push(simulatedVisit);
      if (!bAss.activityBreakdown) bAss.activityBreakdown = {};
      var minimalHa = s.activityId === 'pengancakan' ? 2.7 : 1.3;
      var old = bAss.activityBreakdown[s.activityId];
      // Only fill missing per-activity representation. Never change combined
      // area/pct, any other existing activity, or F-59.
      if (!old || !old.uniqueHa) {
        var roundedArea = Math.min(totalHa, minimalHa);
        var blockAct = {
          activityId: s.activityId, activityName: s.activityName,
          color: colorByAct[s.activityId], uniqueHa: roundedArea,
          observedHa: roundedArea,
          pct: totalHa ? Math.round(1000 * roundedArea / totalHa) / 10 : 0,
          coveragePct: totalHa ? Math.round(1000 * roundedArea / totalHa) / 10 : 0,
          visitCount: 1, count: 1
        };
        bAss.activityBreakdown[s.activityId] = blockAct;
        if (s.activityId === 'ipd_panen') bAss.activityBreakdown.ipdPanen = blockAct;
      }
      already[s.visitId] = true;
      changed = true;
    });
    return changed;
  }

  function TNKEStore() {
    this.masterData = null;
    this.state = null;
    this.init();
  }

  TNKEStore.prototype.init = function () {
    if (window.TNKEMaster && window.TNKE_GEOJSON) {
      this.masterData = window.TNKEMaster.process(window.TNKE_GEOJSON);
    } else {
      console.warn('TNKEStore: TNKEMaster or TNKE_GEOJSON not loaded yet.');
    }

    var saved = null;
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) saved = JSON.parse(raw);
    } catch (e) {
      console.warn('TNKEStore: Failed to parse localStorage.', e);
    }

    if (saved && saved.version === 7 && saved.monthlyAssessment && saved.auth) {
      this.state = saved;
    } else if (this.masterData) {
      this.state = generateSeedData(this.masterData);
      this.saveState();
    }
    if (reconcileTrackingSupplementalVisits(this.state)) this.saveState();
  };

  TNKEStore.prototype.ensureInitialized = function (geojson) {
    if (geojson) {
      window.TNKE_GEOJSON = geojson;
    }
    if (geojson && window.TNKEMaster && (!this.masterData || !this.state)) {
      this.masterData = window.TNKEMaster.process(geojson);
      var saved = null;
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) saved = JSON.parse(raw);
      } catch (e) {
        console.warn('TNKEStore: Failed to parse localStorage.', e);
      }
      if (saved && saved.version === 7 && saved.monthlyAssessment && saved.auth) {
        this.state = saved;
      } else {
        this.state = generateSeedData(this.masterData);
        this.saveState();
      }
    }
    if (reconcileTrackingSupplementalVisits(this.state)) this.saveState();
    return this.state;
  };

  TNKEStore.prototype.saveState = function () {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      var evt = new CustomEvent('spt_tnke_state_changed', { detail: this.state });
      window.dispatchEvent(evt);
    } catch (e) {
      console.error('TNKEStore: Save state failed.', e);
    }
  };

  TNKEStore.prototype.resetDemo = function () {
    if (this.masterData) {
      this.state = generateSeedData(this.masterData);
      reconcileTrackingSupplementalVisits(this.state);
      this.saveState();
    }
  };

  // Aggregated Observation Metrics for Selected Division / Estate Scope
  TNKEStore.prototype.getAggregatedObservation = function (estateFilter, divisionFilter, activityFilter) {
    if (!this.state || !this.masterData) return null;

    var blocks = this.masterData.blocks;
    if (divisionFilter && divisionFilter !== 'all') {
      blocks = blocks.filter(function (b) { return b.divisi === divisionFilter; });
    }

    var totalLuasBlokHa = 0;
    var totalUniqueDiobservasiHa = 0;
    var observasiLengkapBlokCount = 0;
    var totalKunjunganCount = 0;

    var monthly = this.state.monthlyAssessment;
    var visits = this.state.visits || [];

    blocks.forEach(function (b) {
      totalLuasBlokHa += b.areaHa;

      var bAss = monthly[b.key];
      if (bAss) {
        var uHa = bAss.combinedUniqueHa;
        if (activityFilter && activityFilter !== 'all' && bAss.activityBreakdown && bAss.activityBreakdown[activityFilter]) {
          uHa = bAss.activityBreakdown[activityFilter].uniqueHa;
        }

        totalUniqueDiobservasiHa += uHa;
        if ((uHa / bAss.totalAreaHa) >= 0.999) {
          observasiLengkapBlokCount++;
        }
      }
    });

    totalLuasBlokHa = Math.round(totalLuasBlokHa * 10) / 10;
    totalUniqueDiobservasiHa = Math.round(totalUniqueDiobservasiHa * 10) / 10;

    var totalCoveragePct = totalLuasBlokHa > 0 ? Math.round((totalUniqueDiobservasiHa / totalLuasBlokHa) * 10000) / 100 : 0;

    // Count total visits in scope
    totalKunjunganCount = visits.filter(function (v) {
      if (divisionFilter && divisionFilter !== 'all' && v.divisi !== divisionFilter) return false;
      if (activityFilter && activityFilter !== 'all' && v.activityId !== activityFilter) return false;
      return true;
    }).length;

    return {
      totalLuasBlokHa: totalLuasBlokHa,
      totalUniqueDiassessHa: totalUniqueDiobservasiHa, // Backward compat
      totalUniqueDiobservasiHa: totalUniqueDiobservasiHa,
      totalCoveragePct: totalCoveragePct,
      assessmentLengkapBlokCount: observasiLengkapBlokCount, // Backward compat
      observasiLengkapBlokCount: observasiLengkapBlokCount,
      totalKunjunganCount: totalKunjunganCount,
      totalBlokCount: blocks.length
    };
  };

  TNKEStore.prototype.getAggregatedAssessment = TNKEStore.prototype.getAggregatedObservation;

  TNKEStore.prototype.getBlockData = function (estate, divisi, blok, activityFilter) {
    if (estate && typeof estate === 'string' && estate.indexOf('|') >= 0) {
      var parts = estate.split('|');
      activityFilter = divisi; // If activityFilter was passed as 2nd arg
      estate = parts[0];
      divisi = parts[1];
      blok = parts[2];
    }

    if (!divisi || !blok) {
      return {
        compositeKey: '', blockKey: '', estate: estate || 'TNKE', divisi: '', blok: '',
        areaHa: 0, totalArea: 0, diobservasiHa: 0, assessedHa: 0, unassessedHa: 0, remainingHa: 0,
        coveragePct: 0, progressPct: 0, statusText: 'Belum diobservasi (0%)', statusObj: COVERAGE_RANGES[0],
        lastAssessmentDate: '-', lastDate: '-', activityBreakdown: {}, activities: {},
        visits: [], tagItems: [], findings: [], visitsCount: 0, tagCount: 0, categorySummary: {}, visitorReports: [],
        bmPct: 0, tonHa: 0, potentialTon: 0, actualTon: 0, bccrPct: 0, gapText: '-', bccrPeriod: 'September 2026', bccrText: 'Simulasi BCCR'
      };
    }

    var est = estate || 'TNKE';
    var key = est + '|' + divisi + '|' + blok;
    var blockMap = this.masterData ? (this.masterData.blockMap || {}) : {};
    var bMaster = blockMap[key] || {};
    var areaHa = bMaster.areaHa || 0;

    var bAss = this.state.monthlyAssessment ? this.state.monthlyAssessment[key] : null;

    var allVisits = (this.state.visits || []).filter(function (v) { return v.blockKey === key; });
    var blockFindings = (this.state.findings || []).filter(function (f) {
      return f.blockKey === key || (f.divisi === divisi && f.blok === blok);
    });

    var diobservasiHa = 0;
    var rawPct = 0;

    var isFiltered = activityFilter && activityFilter !== 'all';
    var normActFilter = activityFilter;
    if (normActFilter === 'ipdPanen') normActFilter = 'ipd_panen';
    if (normActFilter === 'inspeksiPupuk') normActFilter = 'inspeksi_pupuk';
    if (normActFilter === 'inspeksiUpkeep') normActFilter = 'inspeksi_upkeep';
    if (normActFilter === 'blokChecklist') normActFilter = 'blok_checklist';

    var filteredVisits = allVisits;

    if (isFiltered) {
      filteredVisits = allVisits.filter(function (v) {
        return v.activityId === normActFilter || v.activityId === activityFilter;
      });

      if (bAss && bAss.activityBreakdown && bAss.activityBreakdown[normActFilter]) {
        diobservasiHa = bAss.activityBreakdown[normActFilter].uniqueHa || 0;
      } else {
        diobservasiHa = 0;
      }
    } else {
      diobservasiHa = bAss ? (bAss.combinedUniqueHa || 0) : 0;
    }

    rawPct = areaHa > 0 ? (diobservasiHa / areaHa) * 100 : 0;
    if (rawPct > 100) rawPct = 100;

    // Use raw unrounded percentage for exact status determination
    var statusObj = getCoverageStatus(rawPct);
    var coveragePct = Math.round(rawPct * 10) / 10;

    var lastDate = filteredVisits.length > 0 ? filteredVisits[filteredVisits.length - 1].date : '-';

    // BCCR / Production calculations directly from master
    var bmPct = bMaster.bmPct || 0;
    var tonHa = bMaster.tonHa || 0;
    var potentialTon = Math.round(areaHa * tonHa * 10) / 10;
    var actualTon = Math.round(potentialTon * (bmPct / 100) * 10) / 10;
    var bccrPct = potentialTon > 0 ? Math.round((actualTon / potentialTon) * 1000) / 10 : 0;
    var gapText = Math.round((actualTon - potentialTon) * 10) / 10 + ' ton (' + (bccrPct - 100).toFixed(1) + '%)';

    var actBreakdown = bAss ? bAss.activityBreakdown : {};

    return {
      compositeKey: key,
      blockKey: key,
      estate: est,
      divisi: divisi,
      blok: blok,
      areaHa: areaHa,
      totalArea: areaHa,
      diobservasiHa: diobservasiHa,
      assessedHa: diobservasiHa,
      unassessedHa: Math.max(0, Math.round((areaHa - diobservasiHa) * 100) / 100),
      remainingHa: Math.max(0, Math.round((areaHa - diobservasiHa) * 100) / 100),
      coveragePct: coveragePct,
      progressPct: coveragePct,
      statusText: statusObj.label,
      statusObj: statusObj,
      lastAssessmentDate: lastDate,
      lastDate: lastDate,
      activityBreakdown: actBreakdown,
      activities: actBreakdown,
      visits: filteredVisits,
      tagItems: blockFindings,
      findings: blockFindings,
      visitsCount: filteredVisits.length,
      tagCount: blockFindings.length,
      categorySummary: bMaster.categorySummary || {},
      visitorReports: bMaster.visitorReports || [],

      // BCCR & Production Fields
      bmPct: bmPct,
      tonHa: tonHa,
      potentialTon: potentialTon,
      actualTon: actualTon,
      bccrPct: bccrPct,
      gapText: gapText,
      bccrPeriod: 'September 2026',
      bccrText: 'Simulasi BCCR (Data Master & Lampiran Ops)'
    };
  };

  TNKEStore.prototype.getBlockAssessment = TNKEStore.prototype.getBlockData;
  TNKEStore.prototype.getBlockObservation = TNKEStore.prototype.getBlockData;

  TNKEStore.prototype.getDailyActivitySummary = function (officerName, dateStr) {
    var defaultOfficer = officerName || 'Hendra Budiono (Asisten Divisi 2)';
    var defaultDate = dateStr || '12 Sep 2026';

    var visits = (this.state.visits || []).filter(function (v) {
      return (v.officer.indexOf(officerName) >= 0 || v.staffName.indexOf(officerName) >= 0 || v.officer === defaultOfficer) &&
             v.date === defaultDate;
    });

    if (visits.length === 0) {
      visits = (this.state.visits || []).filter(function (v) {
        return v.date === defaultDate;
      }).slice(0, 8);
    }

    var totalActivityHa = 0; // Nominal observation area (buffer 48m)
    var totalWalkedHa = 0;
    var uniqueBlockSet = {};
    var actBreakdown = {};
    var addedUniqueHaToday = 0;

    // Daily tracking distance strictly from polyline (target 5 km, dummy actual 5.28 km)
    // 8 sessions total = 5.280 meters (averaging 660m per tracking session)
    var sessionDistances = [660, 680, 640, 670, 650, 660, 670, 650];

    var enhancedSessions = visits.map(function (s, idx) {
      var trackDistM = sessionDistances[idx % sessionDistances.length] || 660;
      var nominalHa = Math.round((trackDistM * 48 / 10000.0) * 1000) / 1000; // trackDistM * 48m / 10,000 = ha
      var addHa = typeof s.addedUniqueHa === 'number' ? s.addedUniqueHa : (idx === 0 ? 1.5 : (idx < 6 ? 1.0 : 0.0));
      
      totalActivityHa += nominalHa;
      addedUniqueHaToday += addHa;
      uniqueBlockSet[s.blockKey] = true;

      var actId = s.activityId;
      var actName = s.activityName;
      if (actName === 'Inspeksi Pupuk') actName = 'Inspeksi Pemupukan';
      if (!actBreakdown[actId]) {
        actBreakdown[actId] = { name: actName, color: s.activityColor || '#2563EB', areaHa: 0, count: 0 };
      }
      actBreakdown[actId].areaHa += nominalHa;
      actBreakdown[actId].count += 1;

      return Object.assign({}, s, {
        activityName: actName,
        trackingDistanceM: trackDistM,
        nominalCoverageHa: nominalHa,
        addedUniqueHa: addHa,
        bufferWidthM: 48
      });
    });

    var trackingDistanceM = 5280; // 5,28 km total actual tracking length
    var targetDistanceM = 5000;   // 5,00 km minimum target per assistant per day
    var estimatedDistanceKm = 5.28;
    var targetKm = 5.0;
    var achievementPct = 105.6;   // 5,28 km / 5,00 km = 105,6%
    var estimatedActivityCoverageHa = 25.344; // 5.280 m × 48 m = 253.440 m² = 25,344 ha
    var combinedUniqueCoverageHa = 6.5;       // +6,5 ha effective unique coverage after overlap/clipping

    var uniqueBlocksCount = Object.keys(uniqueBlockSet).length || 7;

    return {
      officerName: defaultOfficer,
      dateStr: defaultDate,
      uniqueBlocksCount: uniqueBlocksCount,
      totalVisitSessionsCount: enhancedSessions.length || 8,
      // 3 separate metrics as explicitly required by SPT concept
      trackingDistanceM: trackingDistanceM,
      estimatedActivityCoverageHa: estimatedActivityCoverageHa,
      combinedUniqueCoverageHa: combinedUniqueCoverageHa,
      // Display helpers
      totalActivityHa: estimatedActivityCoverageHa,
      addedUniqueHaToday: combinedUniqueCoverageHa,
      estimatedDistanceKm: estimatedDistanceKm,
      targetKm: targetKm,
      achievementPct: achievementPct,
      activityBreakdown: actBreakdown,
      visitSessions: enhancedSessions,
      simulationTooltip: 'Jarak Asisten (5,28 km) berasal dari panjang tracking polyline (105,6% target 5,0 km). Coverage nominal = 5.280 m × 48 m buffer = 25,344 ha. Coverage efektif unik (+6,5 ha) memperhitungkan reduksi overlap dan batas polygon blok.'
    };
  };

  // Observasi Cycle Data Model (Standard SPT Deterministic Model)
  TNKEStore.prototype.getObservasiCycleData = function () {
    return {
      cycleName: 'Siklus Observasi Rutin 2 - 2026',
      startDate: '2026-09-01',
      endDate: '2026-10-20',
      evalDate: '2026-09-30',
      estate: 'TNKE',
      divisionsInScope: ['DIVISI 1', 'DIVISI 2', 'DIVISI 3', 'DIVISI 5', 'DIVISI 6'],
      totalLuasEstateHa: 3303.3,
      combinedUniqueCoverageHa: 1914.8,
      actualPct: 58.0,
      targetCoverageHa: 1982.0,
      targetPct: 60.0,
      gapHa: -67.2,
      status: 'Tertinggal',
      remainingAreaHa: 1388.5,
      remainingPct: 42.0,
      remainingDays: 20,
      requiredDailyRateHa: 69.4,
      attentionDivisionsCount: 3,
      totalDivisionsCount: 5,
      attentionDivisionsList: ['DIVISI 2', 'DIVISI 3', 'DIVISI 6'],
      totalActivityCoverageHa: 2738.0,
      activityCoverage: [
        { id: 'ipd_panen', name: 'IPD Panen', activityId: 2, coverageHa: 905.4, sharePct: 33.1, color: '#8B5CF6' },
        { id: 'pengancakan', name: 'Pengancakan', activityId: 3, coverageHa: 612.8, sharePct: 22.4, color: '#2563EB' },
        { id: 'blok_checklist', name: 'Blok Checklist', activityId: 1, coverageHa: 535.0, sharePct: 19.5, color: '#795548' },
        { id: 'inspeksi_upkeep', name: 'Inspeksi Upkeep', activityId: 4, coverageHa: 403.6, sharePct: 14.7, color: '#0D9488' },
        { id: 'inspeksi_pupuk', name: 'Inspeksi Pemupukan', activityId: 5, coverageHa: 281.2, sharePct: 10.3, color: '#EA580C' }
      ],
      divisionComparison: [
        { divisi: 'DIVISI 1', totalAreaHa: 799.5, observedHa: 495.7, coveragePct: 62.0, status: 'Sesuai target' },
        { divisi: 'DIVISI 2', totalAreaHa: 854.0, observedHa: 449.7, coveragePct: 52.7, status: 'Tertinggal' },
        { divisi: 'DIVISI 3', totalAreaHa: 797.9, observedHa: 462.8, coveragePct: 58.0, status: 'Tertinggal' },
        { divisi: 'DIVISI 5', totalAreaHa: 478.3, observedHa: 334.8, coveragePct: 70.0, status: 'Sesuai target' },
        { divisi: 'DIVISI 6', totalAreaHa: 373.6, observedHa: 171.8, coveragePct: 46.0, status: 'Tertinggal' }
      ],
      // Per-activity division distributions
      activityDivisionBreakdown: {
        ipd_panen: {
          'DIVISI 1': { observedHa: 163.9, coveragePct: 20.5 },
          'DIVISI 2': { observedHa: 234.8, coveragePct: 27.5 },
          'DIVISI 3': { observedHa: 219.4, coveragePct: 27.5 },
          'DIVISI 5': { observedHa: 185.5, coveragePct: 38.8 },
          'DIVISI 6': { observedHa: 101.8, coveragePct: 27.2 }
        },
        pengancakan: {
          'DIVISI 1': { observedHa: 147.9, coveragePct: 18.5 },
          'DIVISI 2': { observedHa: 153.7, coveragePct: 18.0 },
          'DIVISI 3': { observedHa: 143.6, coveragePct: 18.0 },
          'DIVISI 5': { observedHa: 100.4, coveragePct: 21.0 },
          'DIVISI 6': { observedHa: 67.2, coveragePct: 18.0 }
        },
        blok_checklist: {
          'DIVISI 1': { observedHa: 127.9, coveragePct: 16.0 },
          'DIVISI 2': { observedHa: 136.6, coveragePct: 16.0 },
          'DIVISI 3': { observedHa: 135.6, coveragePct: 17.0 },
          'DIVISI 5': { observedHa: 76.5, coveragePct: 16.0 },
          'DIVISI 6': { observedHa: 58.4, coveragePct: 15.6 }
        },
        inspeksi_upkeep: {
          'DIVISI 1': { observedHa: 95.9, coveragePct: 12.0 },
          'DIVISI 2': { observedHa: 102.5, coveragePct: 12.0 },
          'DIVISI 3': { observedHa: 99.7, coveragePct: 12.5 },
          'DIVISI 5': { observedHa: 60.3, coveragePct: 12.6 },
          'DIVISI 6': { observedHa: 45.2, coveragePct: 12.1 }
        },
        inspeksi_pupuk: {
          'DIVISI 1': { observedHa: 67.2, coveragePct: 8.4 },
          'DIVISI 2': { observedHa: 70.0, coveragePct: 8.2 },
          'DIVISI 3': { observedHa: 68.6, coveragePct: 8.6 },
          'DIVISI 5': { observedHa: 43.0, coveragePct: 9.0 },
          'DIVISI 6': { observedHa: 32.4, coveragePct: 8.7 }
        }
      }
    };
  };

  window.ACTIVITIES = ACTIVITIES;
  window.COVERAGE_RANGES = COVERAGE_RANGES;
  window.getCoverageStatus = getCoverageStatus;
  window.tnkeStore = new TNKEStore();

})();
