/**
 * SMART PROBLEM TAGGING - MOBILE APP DATA STORE & STATE MANAGEMENT
 * Deterministic seed, immutable evidence models, state transitions, & storage
 * Reference: ANTIGRAVITY_Aplikasi_Mobile_Prompt.md
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'spt_mobile_state_v1';

  var DEFAULT_STATE = {
    auth: {
      isLoggedIn: true,
      username: 'admin_spt',
      role: 'asisten',
      lastLogin: new Date().toISOString()
    },
    ui: {
      simulationMode: true,
      offlineSimulated: false,
      activeFilterDivision: 'DIVISI 3',
      activeFilterBlock: 'all'
    },
    draftFinding: null,
    tempEvidence: null,
    assessments: [],
    findings: [],
    actionPlans: [],
    realizationBatches: [],
    notifications: [],
    syncQueue: [],
    auditLogs: []
  };

  // 14 Deterministic Seed Findings covering all cycles and states
  function getInitialSeed() {
    var now = new Date('2026-08-15T09:30:00Z').toISOString();
    var past1 = new Date('2026-08-10T14:15:00Z').toISOString();
    var past2 = new Date('2026-08-05T10:00:00Z').toISOString();
    var past3 = new Date('2026-07-28T08:45:00Z').toISOString();

    var findings = [
      // 1. Approved & Multi-batch Realization In Progress (Benchmark block S-28)
      {
        id: 'FND-2026-001',
        assessmentId: 'ASM-SKDE-D3-S28-01',
        blockKey: 'SKDE:DIVISI 3:S-28',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-28',
        categoryId: '01',
        categoryName: 'Pasar Pikul Semak',
        timeframe: 'Short Term',
        sensitivity: 'Major',
        severity: 'Berat',
        volume: 1000,
        unit: 'Meter',
        assessmentState: 'Approved',
        problemCondition: 'Sebagian teratasi',
        notes: 'Pasar pikul jalur ancak 12-18 tertutup gulma pekat setinggi 1.5 meter.',
        createdAt: past3,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past2,
          state: 'Approved',
          notes: 'Disetujui untuk penanganan chemist intensif.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-001-B',
          phase: 'before',
          lat: 1.258412,
          lng: 116.124560,
          accuracyMeters: 6.4,
          capturedAt: past3,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-28',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#268BF2',
          caption: 'Kondisi awal pasar pikul semak tebal jalur 12-18'
        }
      },

      // 2. Draft finding (Asisten)
      {
        id: 'FND-2026-002',
        assessmentId: 'ASM-SKDE-D3-S28-02',
        blockKey: 'SKDE:DIVISI 3:S-28',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-28',
        categoryId: '05',
        categoryName: 'Piringan Semak',
        timeframe: 'Short Term',
        sensitivity: 'Minor',
        severity: 'Sedang',
        volume: 350,
        unit: 'Pkk',
        assessmentState: 'Draft',
        problemCondition: 'Belum teratasi',
        notes: 'Piringan pokok baris 5-15 ditumbuhi anak sawit liar dan pakis.',
        createdAt: now,
        createdBy: 'Budi Santoso (Asisten)',
        primaryEvidence: {
          evidenceId: 'EVD-002-B',
          phase: 'before',
          lat: 1.259110,
          lng: 116.125200,
          accuracyMeters: 8.2,
          capturedAt: now,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-28',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#FF6900',
          caption: 'Piringan bersemak di pokok baris 5'
        }
      },

      // 3. Submitted finding waiting for Askep/Manager review
      {
        id: 'FND-2026-003',
        assessmentId: 'ASM-SKDE-D3-S29-01',
        blockKey: 'SKDE:DIVISI 3:S-29',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-29',
        categoryId: '02',
        categoryName: 'Underpruning',
        timeframe: 'Short Term',
        sensitivity: 'Major',
        severity: 'Berat',
        volume: 480,
        unit: 'Pkk',
        assessmentState: 'Submitted',
        problemCondition: 'Belum teratasi',
        notes: 'Pelepah sengkleh menggantung rapat pada TM muda umur 8 tahun.',
        createdAt: past1,
        createdBy: 'Budi Santoso (Asisten)',
        primaryEvidence: {
          evidenceId: 'EVD-003-B',
          phase: 'before',
          lat: 1.261200,
          lng: 116.128450,
          accuracyMeters: 5.5,
          capturedAt: past1,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#008247',
          caption: 'Pelepah menggantung menutupi buah'
        }
      },

      // 4. Revision Requested finding
      {
        id: 'FND-2026-004',
        assessmentId: 'ASM-SKDE-D3-S29-01',
        blockKey: 'SKDE:DIVISI 3:S-29',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-29',
        categoryId: '03',
        categoryName: 'Areal Banjir / Tergenang',
        timeframe: 'Short Term',
        sensitivity: 'Major',
        severity: 'Sedang',
        volume: 6.5,
        unit: 'Ha',
        assessmentState: 'Revision Requested',
        problemCondition: 'Belum teratasi',
        notes: 'Genangan air pasang surut parit batas.',
        createdAt: past2,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past1,
          state: 'Revision Requested',
          notes: 'Luas 6.5 Ha terlalu tinggi dibanding peta parit; mohon ukur ulang titik banjir terparah dan perbarui foto.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-004-B',
          phase: 'before',
          lat: 1.262500,
          lng: 116.129100,
          accuracyMeters: 7.1,
          capturedAt: past2,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#494949',
          caption: 'Areal tergenang air limpasan parit'
        }
      },

      // 5. Rejected finding
      {
        id: 'FND-2026-005',
        assessmentId: 'ASM-SKDE-D3-T29-01',
        blockKey: 'SKDE:DIVISI 3:T-29',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'T-29',
        categoryId: '07',
        categoryName: 'Gawangan Semak',
        timeframe: 'Long Term',
        sensitivity: 'Minor',
        severity: 'Ringan',
        volume: 120,
        unit: 'Pkk',
        assessmentState: 'Rejected',
        problemCondition: 'Belum teratasi',
        notes: 'Gulma lunak di gawangan mati.',
        createdAt: past3,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Ir. Afik Zainul Wafa (Manager)',
          decidedAt: past2,
          state: 'Rejected',
          notes: 'Vegetasi merupakan penutup tanah lunak (legume cover crop) yang sengaja dipertahankan untuk konservasi tanah.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-005-B',
          phase: 'before',
          lat: 1.254100,
          lng: 116.121300,
          accuracyMeters: 5.0,
          capturedAt: past3,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:T-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#AD3CDB',
          caption: 'Kacangan penutup tanah di gawangan'
        }
      },

      // 6. Titi Panen Kurang / Rusak (Approved, Pending Verification Batch)
      {
        id: 'FND-2026-006',
        assessmentId: 'ASM-SKDE-D3-T29-01',
        blockKey: 'SKDE:DIVISI 3:T-29',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'T-29',
        categoryId: '04',
        categoryName: 'Titi Panen Kurang / Rusak',
        timeframe: 'Short Term',
        sensitivity: 'Major',
        severity: 'Berat',
        volume: 12,
        unit: 'Unit',
        assessmentState: 'Approved',
        problemCondition: 'Belum teratasi',
        notes: 'Titi panen kayu patah di ancak baris 20-32 akibat angkong berat.',
        createdAt: past2,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past1,
          state: 'Approved',
          notes: 'Segera pasang titi panen beton pra-cetak.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-006-B',
          phase: 'before',
          lat: 1.255300,
          lng: 116.122100,
          accuracyMeters: 4.8,
          capturedAt: past2,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:T-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#7861EF',
          caption: 'Titi panen patah di parit sekunder'
        }
      },

      // 7. Defisiensi Hara (Approved, In Progress)
      {
        id: 'FND-2026-007',
        assessmentId: 'ASM-SKDE-D3-S28-01',
        blockKey: 'SKDE:DIVISI 3:S-28',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-28',
        categoryId: '08',
        categoryName: 'Defisiensi Hara',
        timeframe: 'Very Long Term',
        sensitivity: 'Major',
        severity: 'Berat',
        volume: 10.8,
        unit: 'Ha',
        assessmentState: 'Approved',
        problemCondition: 'Belum teratasi',
        notes: 'Gejala defisiensi Magnesium dan Boron pada daun pelepah 9-17.',
        createdAt: past3,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past2,
          state: 'Approved',
          notes: 'Aplikasi pupuk kieserite dan borate sesuai rekomendasi R&D.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-007-B',
          phase: 'before',
          lat: 1.257200,
          lng: 116.123800,
          accuracyMeters: 6.0,
          capturedAt: past3,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-28',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#F52424',
          caption: 'Daun menguning bercak oranye pekat'
        }
      },

      // 8. HPT Serangan Tikus & Ulat Api (Approved)
      {
        id: 'FND-2026-008',
        assessmentId: 'ASM-SKDE-D3-T29-01',
        blockKey: 'SKDE:DIVISI 3:T-29',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'T-29',
        categoryId: '10',
        categoryName: 'HPT',
        timeframe: 'Very Long Term',
        sensitivity: 'Major',
        severity: 'Sedang',
        volume: 9.1,
        unit: 'Ha',
        assessmentState: 'Approved',
        problemCondition: 'Belum teratasi',
        notes: 'Serangan ulat api Darna trima mencapai ambang batas 5 ulat/pelepah.',
        createdAt: past2,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Ir. Afik Zainul Wafa (Manager)',
          decidedAt: past1,
          state: 'Approved',
          notes: 'Lakukan fogging dan pelepasan musuh alami Sycanus.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-008-B',
          phase: 'before',
          lat: 1.253900,
          lng: 116.120500,
          accuracyMeters: 5.2,
          capturedAt: past2,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:T-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#FFC315',
          caption: 'Daun melidi akibat gigitan ulat api'
        }
      },

      // 9. Gorong-gorong (Editable sensitivity: Major)
      {
        id: 'FND-2026-009',
        assessmentId: 'ASM-SKDE-D3-S28-01',
        blockKey: 'SKDE:DIVISI 3:S-28',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-28',
        categoryId: '15',
        categoryName: 'Gorong-gorong',
        timeframe: 'Short Term',
        sensitivity: 'Major',
        severity: 'Berat',
        volume: 2,
        unit: 'Unit',
        assessmentState: 'Approved',
        problemCondition: 'Belum teratasi',
        notes: 'Pipa beton gorong-gorong amblas terinjak truk tronton di simpang utama.',
        createdAt: past3,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past2,
          state: 'Approved',
          notes: 'Segera ganti dengan gorong-gorong beton K-300.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-009-B',
          phase: 'before',
          lat: 1.258900,
          lng: 116.126100,
          accuracyMeters: 4.5,
          capturedAt: past3,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-28',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#FF6900',
          caption: 'Gorong-gorong amblas retak di badan jalan'
        }
      },

      // 10. Jembatan / Box Culvert (Closed / Selesai dengan Dokumen Before-After)
      {
        id: 'FND-2026-010',
        assessmentId: 'ASM-SKDE-D3-S29-01',
        blockKey: 'SKDE:DIVISI 3:S-29',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-29',
        categoryId: '16',
        categoryName: 'Jembatan / Box culvert',
        timeframe: 'Short Term',
        sensitivity: 'Major',
        severity: 'Sedang',
        volume: 1,
        unit: 'Unit',
        assessmentState: 'Approved',
        problemCondition: 'Teratasi',
        closure: {
          closedAt: past1,
          closedBy: 'Hendra Gunawan (Askep)',
          notes: 'Pekerjaan pemasangan box culvert tuntas 100%, saluran air lancar dan akses transportasi pulih.'
        },
        notes: 'Box culvert utama perbatasan S-28 dan S-29 retak oprit.',
        createdAt: past3,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past2,
          state: 'Approved',
          notes: 'Disetujui perbaikan cor beton.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-010-B',
          phase: 'before',
          lat: 1.260500,
          lng: 116.127800,
          accuracyMeters: 4.0,
          capturedAt: past3,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#FC387D',
          caption: 'Box culvert retak sebelum perbaikan'
        },
        afterEvidence: {
          evidenceId: 'EVD-010-A',
          phase: 'after',
          lat: 1.260505,
          lng: 116.127808,
          accuracyMeters: 4.2,
          capturedAt: past1,
          capturedBy: 'Kuswanto (Mandor)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#059669',
          caption: 'Box culvert beton baru terpasang kokoh'
        }
      },

      // 11. Titik Kosong (Approved)
      {
        id: 'FND-2026-011',
        assessmentId: 'ASM-SKDE-D3-S28-01',
        blockKey: 'SKDE:DIVISI 3:S-28',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-28',
        categoryId: '09',
        categoryName: 'Titik Kosong',
        timeframe: 'Very Long Term',
        sensitivity: 'Major',
        severity: 'Sedang',
        volume: 45,
        unit: 'Pkk',
        assessmentState: 'Approved',
        problemCondition: 'Belum teratasi',
        notes: 'Titik tanam kosong akibat pokok tersambar petir 3 bulan lalu.',
        createdAt: past3,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past2,
          state: 'Approved',
          notes: 'Lakukan sisipan dengan bibit siap salur umur 14 bulan.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-011-B',
          phase: 'before',
          lat: 1.256800,
          lng: 116.122900,
          accuracyMeters: 5.8,
          capturedAt: past3,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-28',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#20A3A7',
          caption: 'Titik kosong bekas pokok hangus tersambar petir'
        }
      },

      // 12. Konektiviti Teras / Pasar Pikul (Approved)
      {
        id: 'FND-2026-012',
        assessmentId: 'ASM-SKDE-D3-T29-01',
        blockKey: 'SKDE:DIVISI 3:T-29',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'T-29',
        categoryId: '11',
        categoryName: 'Konektiviti Teras / Pasar Pikul',
        timeframe: 'Short Term',
        sensitivity: 'Major',
        severity: 'Sedang',
        volume: 240,
        unit: 'Meter',
        assessmentState: 'Approved',
        problemCondition: 'Belum teratasi',
        notes: 'Longsoran lereng teras kontur di areal curam blok T-29.',
        createdAt: past2,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past1,
          state: 'Approved',
          notes: 'Perbaiki teras kontur dan buat rorak penahan erosi.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-012-B',
          phase: 'before',
          lat: 1.252800,
          lng: 116.119800,
          accuracyMeters: 6.2,
          capturedAt: past2,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:T-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#268BF2',
          caption: 'Teras kontur longsor menghalangi jalan panen'
        }
      },

      // 13. Pokok Abnormal (Approved, Completed tapi masalah masih sebagian)
      {
        id: 'FND-2026-013',
        assessmentId: 'ASM-SKDE-D3-S29-01',
        blockKey: 'SKDE:DIVISI 3:S-29',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-29',
        categoryId: '12',
        categoryName: 'Pokok Abnormal',
        timeframe: 'Very Long Term',
        sensitivity: 'Minor',
        severity: 'Ringan',
        volume: 18,
        unit: 'Pkk',
        assessmentState: 'Approved',
        problemCondition: 'Sebagian teratasi', // Action 100% done, but problem not fully closed
        notes: 'Pokok steril kerdil berbuah parthenocarpy di blok S-29.',
        createdAt: past3,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Ir. Afik Zainul Wafa (Manager)',
          decidedAt: past2,
          state: 'Approved',
          notes: 'Tumbang dan lakukan sanitasi lubang tanam.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-013-B',
          phase: 'before',
          lat: 1.261800,
          lng: 116.128900,
          accuracyMeters: 5.1,
          capturedAt: past3,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#008247',
          caption: 'Pokok steril mahkota kerdil'
        }
      },

      // 14. Semak di Gawangan (Bambu) (Approved)
      {
        id: 'FND-2026-014',
        assessmentId: 'ASM-SKDE-D3-S28-01',
        blockKey: 'SKDE:DIVISI 3:S-28',
        estate: 'SKDE',
        divisi: 'DIVISI 3',
        blok: 'S-28',
        categoryId: '13',
        categoryName: 'Semak di Gawangan (Bambu)',
        timeframe: 'Long Term',
        sensitivity: 'Minor',
        severity: 'Sedang',
        volume: 1.2,
        unit: 'Ha',
        assessmentState: 'Approved',
        problemCondition: 'Belum teratasi',
        notes: 'Rumpun bambu hutan berakar padat di pinggir gawangan barat.',
        createdAt: past3,
        createdBy: 'Budi Santoso (Asisten)',
        decision: {
          decidedBy: 'Hendra Gunawan (Askep)',
          decidedAt: past2,
          state: 'Approved',
          notes: 'Pengendalian chemist dengan injeksi herbisida sistemik.'
        },
        primaryEvidence: {
          evidenceId: 'EVD-014-B',
          phase: 'before',
          lat: 1.257700,
          lng: 116.123200,
          accuracyMeters: 5.9,
          capturedAt: past3,
          capturedBy: 'Budi Santoso (Asisten)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-28',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#494949',
          caption: 'Rumpun bambu liar lebat di gawangan'
        }
      }
    ];

    // Corresponding Action Plans for approved findings
    var actionPlans = [
      // AP-001 for Finding 001 (Pasar Pikul Semak 1.000 Meter)
      // Spec requirement: 1.000m target: batch 1 approved 600m; batch 2 submitted 250m; sisa 150m!
      {
        id: 'ACT-2026-001',
        findingId: 'FND-2026-001',
        blockKey: 'SKDE:DIVISI 3:S-28',
        actionType: 'Semprot pasar pikul',
        targetCoverage: 1000,
        coverageUnit: 'Meter',
        pic: 'Kuswanto (Mandor)',
        dueDate: '2026-08-30',
        state: 'In Progress',
        acceptedVolume: 600,
        pendingVolume: 250,
        remainingVolume: 150,
        progressPercent: 60, // 600/1000 = 60%
        createdAt: past2
      },

      // AP-006 for Finding 006 (Titi Panen 12 Unit)
      {
        id: 'ACT-2026-006',
        findingId: 'FND-2026-006',
        blockKey: 'SKDE:DIVISI 3:T-29',
        actionType: 'Penambahan Titi Panen',
        targetCoverage: 12,
        coverageUnit: 'Unit',
        pic: 'Kuswanto (Mandor)',
        dueDate: '2026-08-25',
        state: 'Pending Verification',
        acceptedVolume: 8,
        pendingVolume: 4,
        remainingVolume: 0,
        progressPercent: 66.7,
        createdAt: past1
      },

      // AP-007 for Finding 007 (Defisiensi Hara 10.8 Ha)
      {
        id: 'ACT-2026-007',
        findingId: 'FND-2026-007',
        blockKey: 'SKDE:DIVISI 3:S-28',
        actionType: 'Semprot Defisiensi',
        targetCoverage: 10.8,
        coverageUnit: 'Ha',
        pic: 'Kuswanto (Mandor)',
        dueDate: '2026-09-10',
        state: 'Planned',
        acceptedVolume: 0,
        pendingVolume: 0,
        remainingVolume: 10.8,
        progressPercent: 0,
        createdAt: past2
      },

      // AP-008 for Finding 008 (HPT 9.1 Ha)
      {
        id: 'ACT-2026-008',
        findingId: 'FND-2026-008',
        blockKey: 'SKDE:DIVISI 3:T-29',
        actionType: 'Pengendalian HPT',
        targetCoverage: 9.1,
        coverageUnit: 'Ha',
        pic: 'Kuswanto (Mandor)',
        dueDate: '2026-08-20',
        state: 'Planned',
        acceptedVolume: 0,
        pendingVolume: 0,
        remainingVolume: 9.1,
        progressPercent: 0,
        createdAt: past1
      },

      // AP-009 for Finding 009 (Gorong-gorong 2 Unit)
      {
        id: 'ACT-2026-009',
        findingId: 'FND-2026-009',
        blockKey: 'SKDE:DIVISI 3:S-28',
        actionType: 'Pemasangan Gorong-gorong',
        targetCoverage: 2,
        coverageUnit: 'Unit',
        pic: 'Kuswanto (Mandor)',
        dueDate: '2026-08-28',
        state: 'In Progress',
        acceptedVolume: 1,
        pendingVolume: 0,
        remainingVolume: 1,
        progressPercent: 50,
        createdAt: past2
      },

      // AP-010 for Finding 010 (Jembatan 1 Unit - Completed)
      {
        id: 'ACT-2026-010',
        findingId: 'FND-2026-010',
        blockKey: 'SKDE:DIVISI 3:S-29',
        actionType: 'Pemasangan Jembatan',
        targetCoverage: 1,
        coverageUnit: 'Unit',
        pic: 'Kuswanto (Mandor)',
        dueDate: '2026-08-10',
        state: 'Completed',
        acceptedVolume: 1,
        pendingVolume: 0,
        remainingVolume: 0,
        progressPercent: 100,
        createdAt: past3
      },

      // AP-013 for Finding 013 (Pokok Abnormal 18 Pkk - Completed 100% tapi masalah belum tuntas)
      {
        id: 'ACT-2026-013',
        findingId: 'FND-2026-013',
        blockKey: 'SKDE:DIVISI 3:S-29',
        actionType: 'Tumbang Pokok Abnormal',
        targetCoverage: 18,
        coverageUnit: 'Pkk',
        pic: 'Kuswanto (Mandor)',
        dueDate: '2026-08-12',
        state: 'Completed',
        acceptedVolume: 18,
        pendingVolume: 0,
        remainingVolume: 0,
        progressPercent: 100,
        createdAt: past2
      }
    ];

    // Realization Batches
    var realizationBatches = [
      // Batch 1 for ACT-001 (Approved 600m)
      {
        id: 'BAT-2026-001',
        actionId: 'ACT-2026-001',
        batchNumber: 1,
        submittedVolume: 600,
        acceptedVolume: 600,
        qualityOutcome: 'Sesuai Standar',
        proposedCondition: 'Sebagian teratasi',
        notes: 'Penyemprotan herbisida sistemik jalur 12-15 telah tuntas disahkan.',
        state: 'Approved',
        inspectedBy: 'Kuswanto (Mandor)',
        inspectedAt: past2,
        verifiedBy: 'Hendra Gunawan (Askep)',
        verifiedAt: past1,
        afterEvidence: {
          evidenceId: 'EVD-BAT-001-A',
          phase: 'after',
          lat: 1.258450,
          lng: 116.124600,
          accuracyMeters: 5.5,
          capturedAt: past2,
          capturedBy: 'Kuswanto (Mandor)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-28',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#059669',
          caption: 'Pasar pikul bersih setelah disemprot jalur 12-15'
        }
      },

      // Batch 2 for ACT-001 (Submitted 250m - Menunggu Verifikasi Askep)
      {
        id: 'BAT-2026-002',
        actionId: 'ACT-2026-001',
        batchNumber: 2,
        submittedVolume: 250,
        acceptedVolume: 0,
        qualityOutcome: 'Sesuai Standar',
        proposedCondition: 'Sebagian teratasi',
        notes: 'Penyemprotan lanjutan pasar pikul jalur 16-17 selesai dikerjakan.',
        state: 'Pending Verification',
        inspectedBy: 'Kuswanto (Mandor)',
        inspectedAt: now,
        afterEvidence: {
          evidenceId: 'EVD-BAT-002-A',
          phase: 'after',
          lat: 1.258510,
          lng: 116.124680,
          accuracyMeters: 6.0,
          capturedAt: now,
          capturedBy: 'Kuswanto (Mandor)',
          detectedBlockKey: 'SKDE:DIVISI 3:S-28',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#10B981',
          caption: 'Pekerjaan semprot pasar pikul jalur 16-17'
        }
      },

      // Batch 1 for ACT-006 (Approved 8 unit)
      {
        id: 'BAT-2026-003',
        actionId: 'ACT-2026-006',
        batchNumber: 1,
        submittedVolume: 8,
        acceptedVolume: 8,
        qualityOutcome: 'Sesuai Standar',
        proposedCondition: 'Sebagian teratasi',
        notes: '8 unit titi panen telah terpasang rapi.',
        state: 'Approved',
        inspectedBy: 'Kuswanto (Mandor)',
        inspectedAt: past1,
        verifiedBy: 'Hendra Gunawan (Askep)',
        verifiedAt: past1,
        afterEvidence: {
          evidenceId: 'EVD-BAT-003-A',
          phase: 'after',
          lat: 1.255320,
          lng: 116.122130,
          accuracyMeters: 4.5,
          capturedAt: past1,
          capturedBy: 'Kuswanto (Mandor)',
          detectedBlockKey: 'SKDE:DIVISI 3:T-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#7861EF',
          caption: 'Titi panen beton terpasang di 8 titik'
        }
      },

      // Batch 2 for ACT-006 (Submitted 4 unit - Menunggu Verifikasi)
      {
        id: 'BAT-2026-004',
        actionId: 'ACT-2026-006',
        batchNumber: 2,
        submittedVolume: 4,
        acceptedVolume: 0,
        qualityOutcome: 'Sesuai Standar',
        proposedCondition: 'Teratasi',
        notes: '4 unit sisa titi panen terpasang di parit tengah.',
        state: 'Pending Verification',
        inspectedBy: 'Kuswanto (Mandor)',
        inspectedAt: now,
        afterEvidence: {
          evidenceId: 'EVD-BAT-004-A',
          phase: 'after',
          lat: 1.255400,
          lng: 116.122200,
          accuracyMeters: 5.0,
          capturedAt: now,
          capturedBy: 'Kuswanto (Mandor)',
          detectedBlockKey: 'SKDE:DIVISI 3:T-29',
          source: 'simulation',
          validationStatus: 'valid',
          photoPlaceholderColor: '#10B981',
          caption: '4 unit titi panen terakhir siap verifikasi'
        }
      }
    ];

    // Notifications
    var notifications = [
      {
        id: 'NOTIF-001',
        type: 'assessment',
        title: 'Assessment Butuh Verifikasi',
        body: 'Asisten mengajukan 2 temuan baru di Blok S-29 untuk verifikasi.',
        targetRoute: '#/assessment/ASM-SKDE-D3-S29-01/verifikasi',
        time: past1,
        isRead: false,
        forRoles: ['askep', 'manager']
      },
      {
        id: 'NOTIF-002',
        type: 'revision',
        title: 'Permintaan Revisi Temuan',
        body: 'Askep meminta revisi volume dan foto temuan Areal Banjir di Blok S-29.',
        targetRoute: '#/temuan/FND-2026-004/revisi',
        time: past1,
        isRead: false,
        forRoles: ['asisten']
      },
      {
        id: 'NOTIF-003',
        type: 'realization',
        title: 'Batch Realisasi Menunggu Pengesahan',
        body: 'Mandor melaporkan batch 250m Pasar Pikul di Blok S-28 siap disahkan.',
        targetRoute: '#/realisasi/BAT-2026-002/verifikasi',
        time: now,
        isRead: false,
        forRoles: ['askep']
      }
    ];

    return {
      findings: findings,
      actionPlans: actionPlans,
      realizationBatches: realizationBatches,
      notifications: notifications
    };
  }

  function loadState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        var parsed = JSON.parse(saved);
        if (parsed && parsed.findings && parsed.findings.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Gagal membaca localStorage, memuat seed default:', e);
    }

    var seed = getInitialSeed();
    var state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    state.findings = seed.findings;
    state.actionPlans = seed.actionPlans;
    state.realizationBatches = seed.realizationBatches;
    state.notifications = seed.notifications;
    saveState(state);
    return state;
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Storage quota exceeded / save failure:', e);
    }
  }

  var _state = loadState();

  // Public Store API
  window.SPT_MOBILE_STORE = {
    getState: function () {
      return _state;
    },

    setPersona: function (roleKey) {
      if (window.SPT_MOBILE_MASTER && window.SPT_MOBILE_MASTER.PERSONAS[roleKey]) {
        _state.auth.role = roleKey;
        saveState(_state);
      }
    },

    getActivePersona: function () {
      var roleKey = _state.auth.role || 'asisten';
      return (window.SPT_MOBILE_MASTER && window.SPT_MOBILE_MASTER.PERSONAS[roleKey])
        ? window.SPT_MOBILE_MASTER.PERSONAS[roleKey]
        : window.SPT_MOBILE_MASTER.PERSONAS.asisten;
    },

    getFindings: function (filterFn) {
      return filterFn ? _state.findings.filter(filterFn) : _state.findings;
    },

    getFindingById: function (id) {
      for (var i = 0; i < _state.findings.length; i++) {
        if (_state.findings[i].id === id) return _state.findings[i];
      }
      return null;
    },

    getActionPlanById: function (id) {
      for (var i = 0; i < _state.actionPlans.length; i++) {
        if (_state.actionPlans[i].id === id) return _state.actionPlans[i];
      }
      return null;
    },

    getActionPlansForFinding: function (findingId) {
      return _state.actionPlans.filter(function (a) { return a.findingId === findingId; });
    },

    getBatchById: function (id) {
      for (var i = 0; i < _state.realizationBatches.length; i++) {
        if (_state.realizationBatches[i].id === id) return _state.realizationBatches[i];
      }
      return null;
    },

    getBatchesForAction: function (actionId) {
      return _state.realizationBatches.filter(function (b) { return b.actionId === actionId; });
    },

    saveFindingDraft: function (draft) {
      _state.draftFinding = draft;
      saveState(_state);
    },

    setTempEvidence: function (evd) {
      _state.tempEvidence = evd;
    },

    getTempEvidence: function () {
      return _state.tempEvidence;
    },

    // Submit new finding assessment
    submitFinding: function (findingData, actionData) {
      var newId = 'FND-2026-' + String(_state.findings.length + 1).padStart(3, '0');
      var now = new Date().toISOString();
      var persona = window.SPT_MOBILE_STORE.getActivePersona();

      var finding = Object.assign({}, findingData, {
        id: newId,
        createdAt: now,
        createdBy: persona.name + ' (' + persona.role + ')',
        assessmentState: 'Submitted',
        problemCondition: 'Belum teratasi'
      });

      _state.findings.unshift(finding);

      if (actionData && actionData.actionType) {
        var actId = 'ACT-2026-' + String(_state.actionPlans.length + 1).padStart(3, '0');
        var ap = {
          id: actId,
          findingId: newId,
          blockKey: finding.blockKey,
          actionType: actionData.actionType,
          targetCoverage: actionData.targetCoverage || finding.volume,
          coverageUnit: finding.unit,
          pic: actionData.pic || 'Kuswanto (Mandor)',
          dueDate: actionData.dueDate || '2026-09-15',
          state: 'Planned',
          acceptedVolume: 0,
          pendingVolume: 0,
          remainingVolume: actionData.targetCoverage || finding.volume,
          progressPercent: 0,
          createdAt: now
        };
        _state.actionPlans.push(ap);
      }

      _state.draftFinding = null;
      _state.tempEvidence = null;

      // Add Notification
      _state.notifications.unshift({
        id: 'NOTIF-' + Date.now(),
        type: 'assessment',
        title: 'Assessment Baru Diajukan',
        body: persona.role + ' mengajukan temuan ' + finding.categoryName + ' di Blok ' + finding.blok,
        targetRoute: '#/temuan/' + newId,
        time: now,
        isRead: false,
        forRoles: ['askep', 'manager']
      });

      saveState(_state);
      return finding;
    },

    // Askep / Manager verify finding assessment
    verifyAssessmentFinding: function (findingId, decisionState, notes) {
      var finding = window.SPT_MOBILE_STORE.getFindingById(findingId);
      if (!finding) return false;
      var persona = window.SPT_MOBILE_STORE.getActivePersona();
      var now = new Date().toISOString();

      finding.assessmentState = decisionState; // 'Approved' | 'Revision Requested' | 'Rejected'
      finding.decision = {
        decidedBy: persona.name + ' (' + persona.role + ')',
        decidedAt: now,
        state: decisionState,
        notes: notes || ''
      };

      // If approved, activate any planned action plans
      if (decisionState === 'Approved') {
        var aps = window.SPT_MOBILE_STORE.getActionPlansForFinding(findingId);
        aps.forEach(function (a) {
          if (a.state === 'Planned') a.state = 'In Progress';
        });
      }

      saveState(_state);
      return true;
    },

    // Submit a realization batch (Asisten / Mandor)
    submitRealizationBatch: function (actionId, batchData) {
      var ap = window.SPT_MOBILE_STORE.getActionPlanById(actionId);
      if (!ap) return null;
      var persona = window.SPT_MOBILE_STORE.getActivePersona();
      var now = new Date().toISOString();
      var batchId = 'BAT-2026-' + String(_state.realizationBatches.length + 1).padStart(3, '0');

      var existingBatches = window.SPT_MOBILE_STORE.getBatchesForAction(actionId);
      var subVol = parseFloat(batchData.submittedVolume) || 0;

      var batch = {
        id: batchId,
        actionId: actionId,
        batchNumber: existingBatches.length + 1,
        submittedVolume: subVol,
        acceptedVolume: 0,
        qualityOutcome: batchData.qualityOutcome || 'Sesuai Standar',
        proposedCondition: batchData.proposedCondition || 'Sebagian teratasi',
        notes: batchData.notes || '',
        state: 'Pending Verification',
        inspectedBy: persona.name + ' (' + persona.role + ')',
        inspectedAt: now,
        afterEvidence: batchData.afterEvidence || null
      };

      _state.realizationBatches.push(batch);

      // Recalculate Action Plan numbers:
      ap.pendingVolume = (ap.pendingVolume || 0) + subVol;
      ap.remainingVolume = Math.max(0, ap.targetCoverage - ap.acceptedVolume - ap.pendingVolume);
      ap.state = 'Pending Verification';

      saveState(_state);
      return batch;
    },

    // Askep verify realization batch
    verifyRealizationBatch: function (batchId, decision, acceptedVol, notes) {
      var batch = window.SPT_MOBILE_STORE.getBatchById(batchId);
      if (!batch) return false;
      var ap = window.SPT_MOBILE_STORE.getActionPlanById(batch.actionId);
      if (!ap) return false;
      var persona = window.SPT_MOBILE_STORE.getActivePersona();
      var now = new Date().toISOString();

      var accVol = (decision === 'Approved')
        ? (parseFloat(acceptedVol) !== undefined ? parseFloat(acceptedVol) : batch.submittedVolume)
        : 0;

      batch.state = decision; // 'Approved' | 'Rework Required' | 'Rejected'
      batch.acceptedVolume = accVol;
      batch.verifiedBy = persona.name + ' (' + persona.role + ')';
      batch.verifiedAt = now;
      batch.decisionNotes = notes || '';

      // Update Action Plan progress
      // Remove this batch from pendingVolume
      ap.pendingVolume = Math.max(0, (ap.pendingVolume || 0) - batch.submittedVolume);
      if (decision === 'Approved') {
        ap.acceptedVolume = (ap.acceptedVolume || 0) + accVol;
      }
      ap.remainingVolume = Math.max(0, ap.targetCoverage - ap.acceptedVolume - ap.pendingVolume);
      ap.progressPercent = Math.min(100, Math.round((ap.acceptedVolume / ap.targetCoverage) * 100));

      if (ap.acceptedVolume >= ap.targetCoverage) {
        ap.state = 'Completed';
      } else {
        ap.state = 'In Progress';
      }

      saveState(_state);
      return true;
    },

    // Close finding (Hanya Askep saat seluruh action 100% dan kondisi masalah Teratasi)
    closeFinding: function (findingId, notes) {
      var finding = window.SPT_MOBILE_STORE.getFindingById(findingId);
      if (!finding) return { success: false, message: 'Temuan tidak ditemukan' };
      var persona = window.SPT_MOBILE_STORE.getActivePersona();

      if (persona.role !== 'Askep') {
        return { success: false, message: 'Hanya Askep yang berwenang melakukan verifikasi akhir dan menutup temuan.' };
      }

      var aps = window.SPT_MOBILE_STORE.getActionPlansForFinding(findingId);
      var allCompleted = aps.length > 0 && aps.every(function (a) { return a.acceptedVolume >= a.targetCoverage; });
      if (!allCompleted) {
        return { success: false, message: 'Seluruh action plan harus selesai 100% dan disahkan sebelum temuan dapat ditutup.' };
      }

      finding.problemCondition = 'Teratasi';
      finding.closure = {
        closedBy: persona.name + ' (' + persona.role + ')',
        closedAt: new Date().toISOString(),
        notes: notes || 'Seluruh pekerjaan tuntas disahkan dan masalah operasional telah teratasi.'
      };

      saveState(_state);
      return { success: true };
    },

    resetDemoData: function () {
      localStorage.removeItem(STORAGE_KEY);
      _state = loadState();
      return _state;
    }
  };

  // Aliases for clean router & controller consumption
  window.SPTStore = window.SPT_MOBILE_STORE;
  window.SPTStore.isLoggedIn = function () {
    return _state.auth && _state.auth.isLoggedIn === true;
  };
  window.SPTStore.login = function (u, p) {
    if (u === 'admin_spt' && p === 'SPT2026!') {
      _state.auth.isLoggedIn = true;
      saveState(_state);
      return true;
    }
    return false;
  };
  window.SPTStore.logout = function () {
    _state.auth.isLoggedIn = false;
    saveState(_state);
  };
  window.SPTStore.getCurrentPersona = window.SPT_MOBILE_STORE.getActivePersona;
  window.SPTStore.getCurrentAccount = window.SPT_MOBILE_STORE.getActivePersona;
  window.SPTStore.setAccount = window.SPT_MOBILE_STORE.setPersona;
  window.SPTStore.getUnreadNotificationsCount = function () {
    return _state.notifications ? _state.notifications.filter(function (n) { return !n.isRead; }).length : 0;
  };
  window.SPTStore.getNotifications = function () {
    return _state.notifications || [];
  };
  window.SPTStore.markAllNotificationsRead = function () {
    if (_state.notifications) {
      _state.notifications.forEach(function (n) { n.isRead = true; });
      saveState(_state);
    }
  };
  window.SPTStore.getSummaryStats = function () {
    var f = _state.findings || [];
    var major = 0, minor = 0, pendingAsm = 0;
    f.forEach(function (x) {
      if (x.sensitivity === 'Major') major++;
      if (x.sensitivity === 'Minor') minor++;
      if (x.assessmentState === 'Submitted') pendingAsm++;
    });
    var act = _state.actionPlans || [];
    var actCompleted = act.filter(function (a) { return a.state === 'Completed'; }).length;
    var pendingReal = (_state.realizationBatches || []).filter(function (b) { return b.state === 'Pending Verification'; }).length;
    return {
      totalFindings: f.length,
      majorCount: major,
      minorCount: minor,
      pendingAssessment: pendingAsm,
      activeActions: act.length,
      completedActions: actCompleted,
      pendingRealization: pendingReal
    };
  };
  window.SPTStore.getFindingsByBlock = function (blockKey) {
    return (_state.findings || []).filter(function (x) { return x.blockKey === blockKey; });
  };
  window.SPTStore.getActionByFindingId = function (findingId) {
    var aps = window.SPT_MOBILE_STORE.getActionPlansForFinding(findingId);
    return aps.length > 0 ? aps[0] : null;
  };
  window.SPTStore.getActionById = window.SPT_MOBILE_STORE.getActionPlanById;
  window.SPTStore.getActionSummary = function (actionId) {
    var a = window.SPT_MOBILE_STORE.getActionPlanById(actionId);
    if (!a) return { acceptedVolume: 0, pendingVolume: 0, remainingUnapproved: 0, percentAccepted: 0, percentPending: 0, unit: '' };
    var acc = a.acceptedVolume || 0;
    var pnd = a.pendingVolume || 0;
    var tot = a.targetCoverage || 1;
    var rem = Math.max(0, tot - acc - pnd);
    return {
      acceptedVolume: acc,
      pendingVolume: pnd,
      remainingUnapproved: rem,
      percentAccepted: Math.min(100, Math.round((acc / tot) * 100)),
      percentPending: Math.min(100, Math.round((pnd / tot) * 100)),
      unit: a.coverageUnit || ''
    };
  };
  window.SPTStore.getPendingAssessments = function () {
    var map = {};
    (_state.findings || []).forEach(function (f) {
      if (f.assessmentState === 'Submitted') {
        if (!map[f.assessmentId]) {
          map[f.assessmentId] = {
            id: f.assessmentId,
            blockKey: f.blockKey,
            round: 'Agustus 2026',
            findingsCount: 0
          };
        }
        map[f.assessmentId].findingsCount++;
      }
    });
    return Object.values(map);
  };
  window.SPTStore.getPendingRealizationBatches = function () {
    return (_state.realizationBatches || []).filter(function (b) { return b.state === 'Pending Verification'; });
  };
  window.SPTStore.getDraftFindings = function () {
    return (_state.findings || []).filter(function (f) { return f.assessmentState === 'Draft'; });
  };
  window.SPTStore.getFindingsByAssessmentId = function (asmId) {
    return (_state.findings || []).filter(function (f) { return f.assessmentId === asmId; });
  };
  window.SPTStore.getRealizationBatchById = window.SPT_MOBILE_STORE.getBatchById;
  window.SPTStore.getAllDecisions = function () {
    var list = [];
    (_state.findings || []).forEach(function (f) {
      if (f.decision) {
        list.push({
          recordId: f.id,
          actor: f.decision.decidedBy,
          role: 'Verifier',
          decision: f.decision.state,
          reason: f.decision.notes,
          timestamp: f.decision.decidedAt
        });
      }
    });
    (_state.realizationBatches || []).forEach(function (b) {
      if (b.decision) {
        list.push({
          recordId: b.id,
          actor: b.decision.verifiedBy,
          role: 'Askep',
          decision: b.decision.state,
          reason: b.decision.notes,
          timestamp: b.decision.verifiedAt
        });
      }
    });
    return list;
  };
  window.SPTStore.getDecisionsByRecord = function (recordId) {
    return window.SPTStore.getAllDecisions().filter(function (d) { return d.recordId === recordId; });
  };
  window.SPTStore.getSyncQueue = function () {
    return [
      { id: 'Q-1', title: 'Draft Offline Penugasan S-28', createdAt: new Date().toISOString(), status: 'Synced-Demo' },
      { id: 'Q-2', title: 'Snapshot Geometri Blok S-29', createdAt: new Date().toISOString(), status: 'Synced-Demo' }
    ];
  };
  window.SPTStore.addFinding = function (f, a) {
    window.SPT_MOBILE_STORE.submitFinding(f, a);
  };
  window.SPTStore.decideAssessmentFinding = function (findingId, decision, reason) {
    window.SPT_MOBILE_STORE.verifyAssessmentFinding(findingId, decision, reason);
  };
  window.SPTStore.updateFindingRevision = function (findingId, newVol, newNotes) {
    var f = window.SPT_MOBILE_STORE.getFindingById(findingId);
    if (f) {
      f.volume = newVol;
      f.notes = newNotes;
      f.assessmentState = 'Submitted';
      saveState(_state);
    }
  };
  window.SPTStore.addRealizationBatch = function (actionId, vol, qual, cond) {
    window.SPT_MOBILE_STORE.submitRealizationBatch(actionId, {
      submittedVolume: vol,
      qualityOutcome: qual,
      proposedCondition: cond
    });
  };
  window.SPTStore.verifyRealizationBatch = function (batchId, acceptedVol, cond, notes) {
    window.SPT_MOBILE_STORE.verifyRealizationBatch(batchId, {
      acceptedVolume: acceptedVol,
      decisionState: 'Approved',
      finalCondition: cond,
      notes: notes
    });
  };
})();

