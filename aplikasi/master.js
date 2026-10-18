/**
 * SMART PROBLEM TAGGING - MOBILE APP MASTER DATA
 * Master 16 Permasalahan Lapangan Trabas, Actions, & Persona Configuration
 * Reference: ANTIGRAVITY_Aplikasi_Mobile_Prompt.md
 */

(function () {
  'use strict';

  var MASTER_PROBLEMS = [
    {
      id: '01',
      name: 'Pasar Pikul Semak',
      timeframe: 'Short Term',
      sensitivity: 'Major',
      unit: 'Meter',
      unitType: 'decimal',
      symbolType: 'classic',
      color: '#268BF2',
      badgeClass: 'badge-major',
      description: 'Pasar pikul tertutup semak/rumput tebal menghambat mobilitas panen dan angkut buah.',
      severityCriteria: {
        Ringan: 'Semak ringan setinggi lutut pada sebagian pasar pikul.',
        Sedang: 'Semak lebat setinggi paha, menghambat jalan ancak.',
        Berat: 'Semak menutup penuh pasar pikul setinggi dada, tidak dapat dilewati beko/angkut.'
      },
      allowedActions: ['Semprot pasar pikul']
    },
    {
      id: '02',
      name: 'Underpruning',
      timeframe: 'Short Term',
      sensitivity: 'Major',
      unit: 'Pkk',
      unitType: 'integer',
      symbolType: 'classic',
      color: '#008247',
      badgeClass: 'badge-major',
      description: 'Pelepah sawit menggantung di bawah tandan matang tanpa dipruning sesuai standar.',
      severityCriteria: {
        Ringan: '1–2 pelepah tua belum ditunas per pokok.',
        Sedang: 'Pelepah rapat menutupi tandan buah di piringan.',
        Berat: 'Songgo pelepah tidak terbentuk, tandan terjepit dan buah busuk tidak terpanen.'
      },
      allowedActions: ['Penambahan HK pruning', 'Borongan']
    },
    {
      id: '03',
      name: 'Areal Banjir / Tergenang',
      timeframe: 'Short Term',
      sensitivity: 'Major',
      unit: 'Ha',
      unitType: 'decimal',
      symbolType: 'classic',
      color: '#494949',
      badgeClass: 'badge-major',
      description: 'Genangan air menutupi piringan dan pasar rintis akibat luapan parit atau rawa.',
      severityCriteria: {
        Ringan: 'Genangan air semata kaki pada sebagian piringan.',
        Sedang: 'Air menggenangi jalan rintis dan piringan hingga setinggi lutut.',
        Berat: 'Banjir menenggelamkan pangkal batang sawit >50 cm, panen lumpuh total.'
      },
      allowedActions: [
        'Pembuatan bendungan/tanggul',
        'Pembuatan Individual Bund (Pungguhan) untuk areal banjir',
        'Pembuatan / Cuci Parit',
        'Pembuatan continuous bund untuk banjir'
      ]
    },
    {
      id: '04',
      name: 'Titi Panen Kurang / Rusak',
      timeframe: 'Short Term',
      sensitivity: 'Major',
      unit: 'Unit',
      unitType: 'integer',
      symbolType: 'classic',
      color: '#7861EF',
      badgeClass: 'badge-major',
      description: 'Jembatan kayu/beton penyeberangan parit ancak panen patah, lapuk, atau belum terpasang.',
      severityCriteria: {
        Ringan: 'Titi panen goyang atau bergeser namun masih bisa dilewati manual.',
        Sedang: 'Titi panen patah sebagian, tidak dapat dilewati angkong.',
        Berat: 'Titi panen putus/hanyut, penyeberangan parit terputus sama sekali.'
      },
      allowedActions: ['Penambahan Titi Panen']
    },
    {
      id: '05',
      name: 'Piringan Semak',
      timeframe: 'Short Term',
      sensitivity: 'Minor',
      unit: 'Pkk',
      unitType: 'integer',
      symbolType: 'classic',
      color: '#FF6900',
      badgeClass: 'badge-minor',
      description: 'Piringan pokok sawit tertutup gulma/rumput sehingga brondolan sulit dikutip.',
      severityCriteria: {
        Ringan: 'Gulma lunak tipis di radius 1 meter dari pokok.',
        Sedang: 'Gulma berkayu/anak sawit tumbuh di piringan.',
        Berat: 'Piringan tertutup semak tebal, brondolan terperangkap dan tidak terkutip.'
      },
      allowedActions: ['Semprot Piringan']
    },
    {
      id: '06',
      name: 'TPH Bermasalah',
      timeframe: 'Short Term',
      sensitivity: 'Minor',
      unit: 'Ha',
      unitType: 'decimal',
      symbolType: 'classic',
      color: '#FC387D',
      badgeClass: 'badge-minor',
      description: 'Tempat Pengumpulan Hasil kotor, becek, tiang nomor roboh, atau semak.',
      severityCriteria: {
        Ringan: 'Nomor TPH buram atau rumput liar di tepi TPH.',
        Sedang: 'Lantai TPH berlubang/becek saat hujan, buah kotor.',
        Berat: 'TPH amblas/tertutup semak total, truk buah tidak dapat menaikkan TBS.'
      },
      allowedActions: ['Semprot TPH']
    },
    {
      id: '07',
      name: 'Gawangan Semak',
      timeframe: 'Long Term',
      sensitivity: 'Minor',
      unit: 'Pkk',
      unitType: 'integer',
      symbolType: 'classic',
      color: '#AD3CDB',
      badgeClass: 'badge-minor',
      description: 'Gulma dan semak di ruang antar barisan tanaman (gawangan) melebihi batas toleransi.',
      severityCriteria: {
        Ringan: 'Gulma setinggi pinggang di gawangan mati.',
        Sedang: 'Liana/pakis merambat ke tajuk pokok sawit di gawangan.',
        Berat: 'Gawangan tertutup vegetasi liar tebal, menghalangi sirkulasi udara dan sanitasi.'
      },
      allowedActions: ['Semprot Gawangan']
    },
    {
      id: '08',
      name: 'Defisiensi Hara',
      timeframe: 'Very Long Term',
      sensitivity: 'Major',
      unit: 'Ha',
      unitType: 'decimal',
      symbolType: 'classic',
      color: '#F52424',
      badgeClass: 'badge-major',
      description: 'Gejala kekurangan unsur hara N, P, K, Mg, atau Boron terlihat jelas pada daun/pelepah.',
      severityCriteria: {
        Ringan: 'Klorosis ringan pada 1–2 pelepah bawah (daun tua).',
        Sedang: 'Pelepah menguning meluas ke daun muda (gejala Magnesium/Nitrogen defisiensi).',
        Berat: 'Orange spotting berat atau pelepah patah menggantung (defisiensi Kalium/Boron kritis).'
      },
      allowedActions: ['Semprot Defisiensi']
    },
    {
      id: '09',
      name: 'Titik Kosong',
      timeframe: 'Very Long Term',
      sensitivity: 'Major',
      unit: 'Pkk',
      unitType: 'integer',
      symbolType: 'classic',
      color: '#20A3A7',
      badgeClass: 'badge-major',
      description: 'Titik tanam kosong akibat pokok mati tersambar petir, tumbang, atau tidak tertanam.',
      severityCriteria: {
        Ringan: '1–2 titik kosong terpisah dalam satu blok.',
        Sedang: 'Spot 3–5 titik kosong berurutan dalam satu baris.',
        Berat: 'Spot kosong meluas (>10 titik kosong berdekatan) menurunkan kerapatan populasi per Ha.'
      },
      allowedActions: ['Penyisipan']
    },
    {
      id: '10',
      name: 'HPT',
      timeframe: 'Very Long Term',
      sensitivity: 'Major',
      unit: 'Ha',
      unitType: 'decimal',
      symbolType: 'classic',
      color: '#FFC315',
      badgeClass: 'badge-major',
      description: 'Serangan Hama & Penyakit Tanaman seperti Ulat Api, Tikus, Rayap, atau Ganoderma.',
      severityCriteria: {
        Ringan: 'Gejala awal daun terpotong sebagian atau liang tikus terdeteksi.',
        Sedang: 'Defoliasi daun mencapai 15–30%, tajuk mulai melidi.',
        Berat: 'Pohon terserang busuk pangkal batang (Ganoderma stadium lanjut) atau defoliasi >50%.'
      },
      allowedActions: ['Pengendalian HPT']
    },
    {
      id: '11',
      name: 'Konektiviti Teras / Pasar Pikul',
      timeframe: 'Short Term',
      sensitivity: 'Major',
      unit: 'Meter',
      unitType: 'decimal',
      symbolType: 'drop',
      color: '#268BF2',
      badgeClass: 'badge-major',
      description: 'Konektivitas teras kontur di areal berbukit terputus akibat longsoran atau jalur terjal.',
      severityCriteria: {
        Ringan: 'Tanah longsor tipis menutup 30% lebar teras kontur.',
        Sedang: 'Teras kontur retak dan amblas, hanya dapat dilalui pejalan kaki tanpa beban.',
        Berat: 'Teras putus total tergerus jurang/erosi, ancak di bukit terisolasi.'
      },
      allowedActions: ['Perbaikan Akses Teras / Pasar Pikul']
    },
    {
      id: '12',
      name: 'Pokok Abnormal',
      timeframe: 'Very Long Term',
      sensitivity: 'Minor',
      unit: 'Pkk',
      unitType: 'integer',
      symbolType: 'drop',
      color: '#008247',
      badgeClass: 'badge-minor',
      description: 'Pokok kerdil, steril, berdaun mahkota (crown disease), atau genetik kerdil tidak produktif.',
      severityCriteria: {
        Ringan: 'Pertumbuhan agak lambat dibanding pokok sekitarnya.',
        Sedang: 'Pokok steril memproduksi buah partenokarpi (tanpa inti) terus-menerus.',
        Berat: 'Pokok kerdil berpenyakit menahun, memakan hara tanpa menghasilkan TBS.'
      },
      allowedActions: ['Tumbang Pokok Abnormal']
    },
    {
      id: '13',
      name: 'Semak di Gawangan (Bambu)',
      timeframe: 'Long Term',
      sensitivity: 'Minor',
      unit: 'Ha',
      unitType: 'decimal',
      symbolType: 'drop',
      color: '#494949',
      badgeClass: 'badge-minor',
      description: 'Rumpun bambu liar tumbuh subur di dalam areal gawangan sawit.',
      severityCriteria: {
        Ringan: 'Rumpun rebung muda berdiameter <1 meter di pinggir gawangan.',
        Sedang: 'Rumpun bambu dewasa berdiameter 2–4 meter mengganggu tajuk sawit.',
        Berat: 'Rumpun bambu raksasa melingkari beberapa pokok sawit, akar merusak perakaran sawit.'
      },
      allowedActions: ['Pengendalian Chemist']
    },
    {
      id: '14',
      name: 'Semak di Gawangan (Pisang)',
      timeframe: 'Long Term',
      sensitivity: 'Minor',
      unit: 'Ha',
      unitType: 'decimal',
      symbolType: 'drop',
      color: '#7861EF',
      badgeClass: 'badge-minor',
      description: 'Rumpun pisang liar (pisang hutan/monyet) berkembang biak di gawangan sawit.',
      severityCriteria: {
        Ringan: '1–2 batang pisang hutan muda tumbuh soliter.',
        Sedang: 'Rumpun pisang 5–8 batang menghalangi jalan rintis gawangan.',
        Berat: 'Koloni pisang hutan masif menutupi setengah gawangan dan menjadi sarang hama tikus.'
      },
      allowedActions: ['Pengendalian Chemist']
    },
    {
      id: '15',
      name: 'Gorong-gorong',
      timeframe: 'Short Term',
      sensitivity: 'Major', // Default selectable per item: Major or Minor
      sensitivityEditable: true,
      unit: 'Unit',
      unitType: 'integer',
      symbolType: 'drop',
      color: '#FF6900',
      badgeClass: 'badge-major',
      description: 'Pipa beton saluran air di persimpangan jalan atau parit tersumbat, amblas, atau pecah.',
      severityCriteria: {
        Ringan: 'Endapan lumpur menyumbat 20–30% penampang gorong-gorong.',
        Sedang: 'Gorong-gorong tersumbat sampah batang >60%, air meluap ke badan jalan.',
        Berat: 'Pipa gorong-gorong hancur/amblas di tengah jalan, jalan terancam putus.'
      },
      allowedActions: ['Pemasangan Gorong-gorong']
    },
    {
      id: '16',
      name: 'Jembatan / Box culvert',
      timeframe: 'Short Term',
      sensitivity: 'Major', // Default selectable per item: Major or Minor
      sensitivityEditable: true,
      unit: 'Unit',
      unitType: 'integer',
      symbolType: 'drop',
      color: '#FC387D',
      badgeClass: 'badge-major',
      description: 'Jembatan utama atau box culvert saluran primer/sekunder retak atau struktur labil.',
      severityCriteria: {
        Ringan: 'Oprit jembatan berlubang kecil atau guardrail bengkok.',
        Sedang: 'Abutment jembatan tergerus arus air, bantalan lantai kayu mulai longgar.',
        Berat: 'Gelagar atau lantai box culvert retak patah, truk bermuatan TBS dilarang melintas.'
      },
      allowedActions: ['Pemasangan Jembatan']
    }
  ];

  var PERSONAS = {
    asisten: {
      id: 'asisten',
      title: 'Asisten Divisi',
      roleTitle: 'Asisten Divisi',
      name: 'Budi Santoso',
      role: 'Asisten',
      estate: 'SKDE',
      division: 'DIVISI 3',
      scopeDesc: 'Estate SKDE · DIVISI 3',
      scopeLabel: 'DIVISI 3',
      description: 'Bertanggung jawab atas inventarisasi temuan lapangan dan perencanaan action plan.',
      canTag: true,
      canVerifyAssessment: false,
      canInspectRealization: true,
      canVerifyFinal: false,
      permissions: {
        canTag: true,
        canVerifyAssessment: false,
        canInspectRealization: true,
        canFinalVerifyRealization: false,
        canVerifyFinal: false
      },
      badgeColor: '#2563EB',
      avatarText: 'BS'
    },
    mandor: {
      id: 'mandor',
      title: 'Mandor Perawatan',
      roleTitle: 'Mandor Perawatan',
      name: 'Kuswanto',
      role: 'Mandor',
      estate: 'SKDE',
      division: 'DIVISI 3',
      scopeDesc: 'Estate SKDE · DIVISI 3',
      scopeLabel: 'DIVISI 3',
      description: 'Memeriksa pekerjaan fisik di lapangan dan mencatat bukti foto after.',
      canTag: false,
      canVerifyAssessment: false,
      canInspectRealization: true,
      canVerifyFinal: false,
      permissions: {
        canTag: false,
        canVerifyAssessment: false,
        canInspectRealization: true,
        canFinalVerifyRealization: false,
        canVerifyFinal: false
      },
      badgeColor: '#059669',
      avatarText: 'KW'
    },
    askep: {
      id: 'askep',
      title: 'Kepala Kebun (Askep)',
      roleTitle: 'Kepala Kebun (Askep)',
      name: 'Hendra Gunawan',
      role: 'Askep',
      estate: 'SKDE',
      division: 'all',
      scopeDesc: 'Estate SKDE (Seluruh Divisi)',
      scopeLabel: 'SKDE Estate',
      description: 'Memverifikasi assessment temuan dan melakukan verifikasi akhir realisasi.',
      canTag: false,
      canVerifyAssessment: true,
      canInspectRealization: false,
      canVerifyFinal: true,
      permissions: {
        canTag: false,
        canVerifyAssessment: true,
        canInspectRealization: false,
        canFinalVerifyRealization: true,
        canVerifyFinal: true
      },
      badgeColor: '#7C3AED',
      avatarText: 'HG'
    },
    manager: {
      id: 'manager',
      title: 'Estate Manager',
      roleTitle: 'Estate Manager',
      name: 'Mursal',
      role: 'Manager',
      estate: 'SKDE',
      division: 'all',
      scopeDesc: 'Estate SKDE (Estate Overview)',
      scopeLabel: 'SKDE Estate',
      description: 'Melihat ringkasan eksekutif seluruh estate dan verifikasi assessment.',
      canTag: false,
      canVerifyAssessment: true,
      canInspectRealization: false,
      canVerifyFinal: false,
      permissions: {
        canTag: false,
        canVerifyAssessment: true,
        canInspectRealization: false,
        canFinalVerifyRealization: false,
        canVerifyFinal: false
      },
      badgeColor: '#C90016',
      avatarText: 'AZ'
    }
  };

  // Demo quality policies
  var QUALITY_CONFIG = {
    maxGpsAgeSeconds: 10,
    maxAccuracyMeters: 20.0,
    demoModeDisclaimer: 'SIMULASI — bukan bukti lapangan'
  };

  window.SPT_MOBILE_MASTER = {
    PROBLEMS: MASTER_PROBLEMS,
    PERSONAS: PERSONAS,
    QUALITY_CONFIG: QUALITY_CONFIG,
    getProblemById: function (id) {
      for (var i = 0; i < MASTER_PROBLEMS.length; i++) {
        if (MASTER_PROBLEMS[i].id === id) return MASTER_PROBLEMS[i];
      }
      return null;
    },
    getProblemByName: function (name) {
      for (var i = 0; i < MASTER_PROBLEMS.length; i++) {
        if (MASTER_PROBLEMS[i].name === name) return MASTER_PROBLEMS[i];
      }
      return null;
    }
  };

  // Aliases for clean router & controller consumption
  window.SPTMaster = window.SPT_MOBILE_MASTER;
  window.SPTMaster.CATEGORIES = MASTER_PROBLEMS;
  window.SPTMaster.getCategory = function (id) {
    return window.SPTMaster.getProblemById(id) || {
      id: id,
      name: 'Masalah Lapangan',
      timeframe: 'Short Term',
      sensitivity: 'Major',
      unit: 'Unit',
      markerSymbol: 'classic',
      markerColor: '#C90016'
    };
  };
  window.SPTMaster.getAllowedActions = function (id) {
    var p = window.SPTMaster.getCategory(id);
    return (p && p.allowedActions) ? p.allowedActions : ['Tindak lanjut penanganan'];
  };
  window.SPTMaster.canPersona = function (roleKey, cap) {
    var p = PERSONAS[roleKey];
    return p && (p[cap] === true || (p.permissions && p.permissions[cap] === true));
  };
})();

