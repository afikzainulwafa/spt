(function () {
  'use strict';
  window.TNKE_TRACKING_GEOJSON = {
  "type": "FeatureCollection",
  "name": "tnke_tracking",
  "metadata": {
    "source": "line.shp + line.shx + line.dbf + line.prj + line.cpg",
    "coordinate_system": "WGS 84 longitude, latitude",
    "date_note": "Year 2026 assumed from demo context; source contains day and month only.",
    "scope_note": "Existing F-59 paths preserved exactly; other TNKE paths are proportionally generated simulation tracks.",
    "buffer_note": "24 meters each side; visual only; no area derived.",
    "generation_note": "60% of generated LineString features are IPD Panen; rest split across Inspeksi Pemupukan, Inspeksi Upkeep, Blok Checklist, and Pengancakan in five permitted blocks.",
    "line_assumption": "Full pass approximately 1.3 ha; U-pattern approximately 2.7 ha. These are mockup planning weights, not surveyed geospatial coverage.",
    "coverage_source": "Based on simulated TNKE Store coverage logic (Sept 2026). Rerun script after source coverage changes.",
    "preserved_block": "F-59"
  },
  "features": [
    {
      "type": "Feature",
      "id": "tnke-line-001",
      "properties": {
        "id": 1,
        "blok": "F-59",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-001",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8506386759577,
            0.5357109654376334
          ],
          [
            111.85116292619456,
            0.5356976938598522
          ],
          [
            111.851488094063,
            0.5356711507042029
          ],
          [
            111.85193934743144,
            0.5356711507042029
          ],
          [
            111.85233087608937,
            0.5356645149152726
          ],
          [
            111.85266268003676,
            0.5356645149152726
          ],
          [
            111.85295466751047,
            0.5356844222820418
          ],
          [
            111.85327319929996,
            0.5356976938598522
          ],
          [
            111.85329974361575,
            0.53526636756631
          ],
          [
            111.85300112006311,
            0.535253095987566
          ],
          [
            111.85269586043148,
            0.53526636756631
          ],
          [
            111.8522777874578,
            0.53526636756631
          ],
          [
            111.85185971448409,
            0.5352730033556711
          ],
          [
            111.85145491366828,
            0.5353128180916878
          ],
          [
            111.85112310972087,
            0.5352597317769415
          ],
          [
            111.85083112224716,
            0.535253095987566
          ],
          [
            111.85069176458927,
            0.53526636756631
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-002",
      "properties": {
        "id": 2,
        "blok": "F-59",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-002",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8506386759577,
            0.5344568012103943
          ],
          [
            111.85113638187879,
            0.5344501654201508
          ],
          [
            111.85176017329985,
            0.5344236222591043
          ],
          [
            111.85226451529988,
            0.534436893839642
          ],
          [
            111.85270913258941,
            0.5344501654201508
          ],
          [
            111.8531537498789,
            0.5344501654201508
          ],
          [
            111.85335283224734,
            0.5344501654201508
          ],
          [
            111.85332628793155,
            0.5340387464110433
          ],
          [
            111.85288167064206,
            0.5340652895737525
          ],
          [
            111.8525963192473,
            0.5340254748296458
          ],
          [
            111.85231096785252,
            0.5340453822017314
          ],
          [
            111.85203888861565,
            0.5340453822017314
          ],
          [
            111.85158099916826,
            0.534071925364412
          ],
          [
            111.85116292619458,
            0.5340652895737525
          ],
          [
            111.85087093872086,
            0.534085196945709
          ],
          [
            111.8506585841945,
            0.534078561155064
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-003",
      "properties": {
        "id": 3,
        "blok": "F-59",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-003",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.85335946832633,
            0.5336804137032549
          ],
          [
            111.85262286356313,
            0.5336804137032549
          ],
          [
            111.8521517019578,
            0.533673777912173
          ],
          [
            111.85203225253673,
            0.5335277905065606
          ],
          [
            111.85205879685253,
            0.5332358156849458
          ],
          [
            111.85207206901042,
            0.5330500135185255
          ],
          [
            111.85215833803674,
            0.5331429146024366
          ],
          [
            111.85252332237884,
            0.5331694577690107
          ],
          [
            111.85287503456308,
            0.5331561861857379
          ],
          [
            111.85312056948418,
            0.5331429146024366
          ],
          [
            111.85328647145788,
            0.5331429146024366
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-004",
      "properties": {
        "id": 3,
        "blok": "F-59",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-004",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.85327319929996,
            0.5349677570376242
          ],
          [
            111.85277549337887,
            0.5349743928273084
          ],
          [
            111.85229105961567,
            0.5349810286169855
          ],
          [
            111.85209197724723,
            0.5347819549235522
          ],
          [
            111.85213179372091,
            0.5346492391243428
          ],
          [
            111.85225124314199,
            0.5346160601740925
          ],
          [
            111.8525166862999,
            0.5346757822844143
          ],
          [
            111.85302102829992,
            0.5346359675442645
          ],
          [
            111.85325992714205,
            0.534662510704393
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-005",
      "properties": {
        "id": 1,
        "blok": "F-59",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-005",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8506386759577,
            0.5325656007011476
          ],
          [
            111.85147482190509,
            0.5325257859473409
          ],
          [
            111.85227115137886,
            0.5325523291165738
          ],
          [
            111.85289494279994,
            0.5325656007011476
          ],
          [
            111.85324001890523,
            0.5325125143626814
          ],
          [
            111.85318693027364,
            0.5319551077811938
          ],
          [
            111.85265604395782,
            0.5319551077811938
          ],
          [
            111.85205879685253,
            0.5319816509528833
          ],
          [
            111.8515411826946,
            0.5319020214374732
          ],
          [
            111.85126246737876,
            0.5319816509528833
          ],
          [
            111.85077139753662,
            0.5319551077811938
          ],
          [
            111.85066522027348,
            0.5319551077811938
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-006",
      "properties": {
        "id": 2,
        "blok": "F-59",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-006",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.85309402516837,
            0.5313313432136456
          ],
          [
            111.85254986669466,
            0.5313977011493581
          ],
          [
            111.85223133490514,
            0.5313711579751585
          ],
          [
            111.85147482190509,
            0.5313180716264176
          ],
          [
            111.85108992932611,
            0.5314242443234435
          ],
          [
            111.85067849243136,
            0.5313446148008452
          ],
          [
            111.85063867595768,
            0.5309995535243934
          ],
          [
            111.85069176458927,
            0.5308933808200713
          ],
          [
            111.85085103048401,
            0.5308801092319029
          ],
          [
            111.85122265090507,
            0.5308801092319029
          ],
          [
            111.851488094063,
            0.5308933808200713
          ],
          [
            111.8517800815367,
            0.5309199239963229
          ],
          [
            111.85199243606301,
            0.5308801092319029
          ],
          [
            111.8524171451157,
            0.5308668376437059
          ],
          [
            111.85286839848413,
            0.5308402944672267
          ],
          [
            111.85310729732625,
            0.5308668376437059
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-007",
      "properties": {
        "id": 3,
        "blok": "F-59",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-007",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.85308075301045,
            0.5302696161453739
          ],
          [
            111.85170044858931,
            0.5302961593243017
          ],
          [
            111.85160754348404,
            0.5300970854795714
          ],
          [
            111.85159427132614,
            0.5298980116284415
          ],
          [
            111.85158099916825,
            0.5296856661801851
          ],
          [
            111.85188625879984,
            0.529712209361615
          ],
          [
            111.85228442353672,
            0.5297387525429313
          ],
          [
            111.85281530985253,
            0.529712209361615
          ],
          [
            111.85302766437886,
            0.529712209361615
          ],
          [
            111.85300112006306,
            0.5290751729759307
          ],
          [
            111.8523109678525,
            0.5290751729759307
          ],
          [
            111.85167390427351,
            0.5291017161599738
          ],
          [
            111.85167390427351,
            0.528915913869287
          ],
          [
            111.85172699290511,
            0.5286770252016594
          ],
          [
            111.85215170195775,
            0.5285973956437408
          ],
          [
            111.85265604395781,
            0.528783197943962
          ],
          [
            111.85289494279992,
            0.5287301115730377
          ],
          [
            111.85292148711571,
            0.5287035683874052
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-008",
      "properties": {
        "id": 4,
        "blok": "F-59",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-008",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.85330637969467,
            0.5362418285253167
          ],
          [
            111.85152791053667,
            0.5362418285253167
          ],
          [
            111.850851030484,
            0.5362418285253167
          ],
          [
            111.85063867595764,
            0.5360560264498618
          ],
          [
            111.8507315810629,
            0.5358702243687696
          ],
          [
            111.85127573953663,
            0.5359498538327849
          ],
          [
            111.85191280311564,
            0.5359100391009066
          ],
          [
            111.85254986669463,
            0.5359100391009066
          ],
          [
            111.85297457574727,
            0.5359498538327849
          ],
          [
            111.85333292401045,
            0.5359233106782282
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-009",
      "properties": {
        "id": 5,
        "blok": "F-59",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-009",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.85309402516837,
            0.5305615911073166
          ],
          [
            111.85216497411568,
            0.5305615911073166
          ],
          [
            111.85179335369462,
            0.530588134284992
          ],
          [
            111.85139518895774,
            0.5305748626961684
          ],
          [
            111.85098375206299,
            0.5306677638173345
          ],
          [
            111.85065194811557,
            0.5306146774625531
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-010",
      "properties": {
        "id": 5,
        "blok": "F-59",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-010",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.85299448398418,
            0.529373783789869
          ],
          [
            111.85271576866835,
            0.5294069627683079
          ],
          [
            111.8524967780631,
            0.5294003269726341
          ],
          [
            111.85219815451045,
            0.5293936911769536
          ],
          [
            111.85183317016829,
            0.5293936911769536
          ],
          [
            111.85149473014198,
            0.529373783789869
          ],
          [
            111.85112310972089,
            0.5293936911769536
          ],
          [
            111.85085103048405,
            0.5293538764027201
          ],
          [
            111.85061876772085,
            0.5293804195855707
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-011",
      "properties": {
        "id": 6,
        "blok": "D-53",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-011",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.833601498002,
            0.547241861112
          ],
          [
            111.833601498002,
            0.549390973375
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-012",
      "properties": {
        "id": 7,
        "blok": "D-53",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-012",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834025507052,
            0.546900677241
          ],
          [
            111.834025507052,
            0.549528395987
          ],
          [
            111.834025507052,
            0.552156114733
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-013",
      "properties": {
        "id": 8,
        "blok": "D-53",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-013",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834449516102,
            0.546044438535
          ],
          [
            111.834449516102,
            0.555165480168
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-014",
      "properties": {
        "id": 9,
        "blok": "D-53",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-014",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834873525151,
            0.546098378347
          ],
          [
            111.834873525151,
            0.55516171466
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-015",
      "properties": {
        "id": 10,
        "blok": "D-53",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-015",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.835297534201,
            0.546139986778
          ],
          [
            111.835297534201,
            0.555158827786
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-016",
      "properties": {
        "id": 11,
        "blok": "D-53",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-016",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.835721543251,
            0.547763676419
          ],
          [
            111.835721543251,
            0.55078228002
          ],
          [
            111.835721543251,
            0.55380088362
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-017",
      "properties": {
        "id": 12,
        "blok": "D-53",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-017",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8361455523,
            0.547816916132
          ],
          [
            111.8361455523,
            0.555159624
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-018",
      "properties": {
        "id": 13,
        "blok": "E-49",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-018",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823318791799,
            0.537067978163
          ],
          [
            111.823318791799,
            0.546141318571
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-019",
      "properties": {
        "id": 14,
        "blok": "E-49",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-019",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823611993473,
            0.538122211149
          ],
          [
            111.823646993473,
            0.539688017092
          ],
          [
            111.823576993473,
            0.541538515024
          ],
          [
            111.823646993473,
            0.543104320968
          ],
          [
            111.823611993473,
            0.54523951089
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-020",
      "properties": {
        "id": 15,
        "blok": "E-49",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-020",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823905195146,
            0.537064927148
          ],
          [
            111.823905195146,
            0.546131767042
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-021",
      "properties": {
        "id": 16,
        "blok": "E-49",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-021",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.82419839682,
            0.53706340164
          ],
          [
            111.82419839682,
            0.546126991278
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-022",
      "properties": {
        "id": 17,
        "blok": "E-49",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-022",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824491598494,
            0.537061876133
          ],
          [
            111.824491598494,
            0.546122215513
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-023",
      "properties": {
        "id": 18,
        "blok": "E-49",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-023",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824784800167,
            0.538230526554
          ],
          [
            111.824819800167,
            0.539822780956
          ],
          [
            111.824749800167,
            0.541704536157
          ],
          [
            111.824819800167,
            0.543296790559
          ],
          [
            111.824784800167,
            0.545468046561
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-024",
      "properties": {
        "id": 19,
        "blok": "E-49",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-024",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.825078001841,
            0.537036770595
          ],
          [
            111.825078001841,
            0.5461126641
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-025",
      "properties": {
        "id": 20,
        "blok": "H-49",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-025",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823404195756,
            0.509910074032
          ],
          [
            111.823404195756,
            0.516878983589
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-026",
      "properties": {
        "id": 21,
        "blok": "H-49",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-026",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823964700997,
            0.510184385317
          ],
          [
            111.823964700997,
            0.515123337416
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-027",
      "properties": {
        "id": 22,
        "blok": "H-49",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-027",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824525206238,
            0.509899989674
          ],
          [
            111.824525206238,
            0.516591121669
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-028",
      "properties": {
        "id": 23,
        "blok": "E-55",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-028",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840589121706,
            0.538311391384
          ],
          [
            111.840589121706,
            0.546539460703
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-029",
      "properties": {
        "id": 24,
        "blok": "E-55",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-029",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.841374737085,
            0.53697631607
          ],
          [
            111.841374737085,
            0.547019373307
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-030",
      "properties": {
        "id": 25,
        "blok": "E-55",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-030",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840981929395,
            0.537840467101
          ],
          [
            111.840981929395,
            0.54283528422
          ],
          [
            111.841359024777,
            0.54283528422
          ],
          [
            111.841359024777,
            0.537840467101
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-031",
      "properties": {
        "id": 26,
        "blok": "H-54",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-031",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.837620141542,
            0.509842289548
          ],
          [
            111.837620141542,
            0.518909129958
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-032",
      "properties": {
        "id": 27,
        "blok": "H-54",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-032",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838260476451,
            0.510713171868
          ],
          [
            111.838295476451,
            0.512229879911
          ],
          [
            111.838225476451,
            0.514022353053
          ],
          [
            111.838295476451,
            0.515539061097
          ],
          [
            111.838260476451,
            0.517607299338
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-033",
      "properties": {
        "id": 28,
        "blok": "H-54",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-033",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83890081136,
            0.509848509565
          ],
          [
            111.83890081136,
            0.518897218727
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-034",
      "properties": {
        "id": 29,
        "blok": "H-54",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-034",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.839541146269,
            0.515672845829
          ],
          [
            111.839576146269,
            0.515906199324
          ],
          [
            111.839506146269,
            0.516181980727
          ],
          [
            111.839576146269,
            0.516415334222
          ],
          [
            111.839541146269,
            0.516733543533
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-035",
      "properties": {
        "id": 30,
        "blok": "H-54",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-035",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840181481178,
            0.515591636181
          ],
          [
            111.840181481178,
            0.51766150046
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-036",
      "properties": {
        "id": 31,
        "blok": "H-51",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-036",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.828826680226,
            0.509881212006
          ],
          [
            111.828826680226,
            0.513851703086
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-037",
      "properties": {
        "id": 32,
        "blok": "H-51",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-037",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829221889759,
            0.510036106847
          ],
          [
            111.829221889759,
            0.512525222137
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-038",
      "properties": {
        "id": 33,
        "blok": "H-51",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-038",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829617099292,
            0.50987096973
          ],
          [
            111.829617099292,
            0.512860831788
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-039",
      "properties": {
        "id": 34,
        "blok": "H-51",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-039",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.830012308826,
            0.515200807523
          ],
          [
            111.830012308826,
            0.518008142698
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-040",
      "properties": {
        "id": 35,
        "blok": "H-51",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-040",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.830407518359,
            0.514753987507
          ],
          [
            111.830407518359,
            0.518950364896
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-041",
      "properties": {
        "id": 36,
        "blok": "E-38",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-041",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.79297876614,
            0.537054631904
          ],
          [
            111.79297876614,
            0.544905253369
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-042",
      "properties": {
        "id": 37,
        "blok": "E-38",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-042",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.793374842063,
            0.537605322035
          ],
          [
            111.793374842063,
            0.543369242619
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-043",
      "properties": {
        "id": 38,
        "blok": "E-38",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-043",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.793770917985,
            0.53705031986
          ],
          [
            111.793770917985,
            0.545051946121
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-044",
      "properties": {
        "id": 39,
        "blok": "E-38",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-044",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.794166993908,
            0.538165464024
          ],
          [
            111.794166993908,
            0.544657628191
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-045",
      "properties": {
        "id": 40,
        "blok": "E-38",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-045",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.79456306983,
            0.537049512685
          ],
          [
            111.79456306983,
            0.54544744742
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-046",
      "properties": {
        "id": 41,
        "blok": "F-48",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-046",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.820748044763,
            0.528491367146
          ],
          [
            111.820748044763,
            0.537079171378
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-047",
      "properties": {
        "id": 42,
        "blok": "F-48",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-047",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821207700495,
            0.529364740578
          ],
          [
            111.821207700495,
            0.532026258631
          ],
          [
            111.821207700495,
            0.534687776683
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-048",
      "properties": {
        "id": 43,
        "blok": "F-48",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-048",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821667356227,
            0.528175543421
          ],
          [
            111.821667356227,
            0.537075379973
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-049",
      "properties": {
        "id": 44,
        "blok": "F-48",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-049",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822127011959,
            0.529260111554
          ],
          [
            111.822127011959,
            0.531859224841
          ],
          [
            111.822127011959,
            0.534458338128
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-050",
      "properties": {
        "id": 45,
        "blok": "F-48",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-050",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.82258666769,
            0.528159169286
          ],
          [
            111.82258666769,
            0.53707158768
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-051",
      "properties": {
        "id": 46,
        "blok": "E-48",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-051",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.820663624399,
            0.537079519495
          ],
          [
            111.820663624399,
            0.546143021065
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-052",
      "properties": {
        "id": 47,
        "blok": "E-48",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-052",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821055744033,
            0.538669938833
          ],
          [
            111.821055744033,
            0.541694445135
          ],
          [
            111.821055744033,
            0.544718951437
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-053",
      "properties": {
        "id": 48,
        "blok": "E-48",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-053",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821447863667,
            0.537076284984
          ],
          [
            111.821447863667,
            0.546145315975
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-054",
      "properties": {
        "id": 49,
        "blok": "E-48",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-054",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821839983301,
            0.53824311526
          ],
          [
            111.821839983301,
            0.540933356396
          ],
          [
            111.821839983301,
            0.543623597533
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-055",
      "properties": {
        "id": 50,
        "blok": "E-48",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-055",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822232102935,
            0.537073050697
          ],
          [
            111.822232102935,
            0.546147611364
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-056",
      "properties": {
        "id": 51,
        "blok": "F-46",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-056",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.815482612737,
            0.528179108542
          ],
          [
            111.815482612737,
            0.537107568409
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-057",
      "properties": {
        "id": 52,
        "blok": "F-46",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-057",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.816097581396,
            0.529143056107
          ],
          [
            111.816097581396,
            0.531646396125
          ],
          [
            111.816097581396,
            0.534149736144
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-058",
      "properties": {
        "id": 53,
        "blok": "F-46",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-058",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.816712550055,
            0.52817378076
          ],
          [
            111.816712550055,
            0.537098500727
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-059",
      "properties": {
        "id": 54,
        "blok": "F-46",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-059",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.817327518715,
            0.528373928633
          ],
          [
            111.817327518715,
            0.528895709802
          ],
          [
            111.817327518715,
            0.52941749097
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-060",
      "properties": {
        "id": 55,
        "blok": "F-46",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-060",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.817942487374,
            0.528164491778
          ],
          [
            111.817942487374,
            0.529218286253
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-061",
      "properties": {
        "id": 56,
        "blok": "D-33",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-061",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.778603051702,
            0.544107225501
          ],
          [
            111.783245562632,
            0.544107225501
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-062",
      "properties": {
        "id": 57,
        "blok": "D-33",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-062",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.778626047918,
            0.546104684658
          ],
          [
            111.780529189329,
            0.546104684658
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-063",
      "properties": {
        "id": 58,
        "blok": "F-34",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-063",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.781197901215,
            0.529320997289
          ],
          [
            111.785539999379,
            0.529320997289
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-064",
      "properties": {
        "id": 59,
        "blok": "F-34",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-064",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.783196152852,
            0.530722624933
          ],
          [
            111.786900949401,
            0.530722624933
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-065",
      "properties": {
        "id": 60,
        "blok": "D-49",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-065",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822364103306,
            0.54963737671
          ],
          [
            111.822364103306,
            0.551266998707
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-066",
      "properties": {
        "id": 61,
        "blok": "D-49",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-066",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822786489715,
            0.549468950816
          ],
          [
            111.822786489715,
            0.550156860431
          ],
          [
            111.822786489715,
            0.550844770046
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-067",
      "properties": {
        "id": 62,
        "blok": "D-49",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-067",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823208876124,
            0.546143108913
          ],
          [
            111.823208876124,
            0.555220575122
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-068",
      "properties": {
        "id": 63,
        "blok": "D-49",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-068",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823631262533,
            0.546136228946
          ],
          [
            111.823631262533,
            0.555212968421
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-069",
      "properties": {
        "id": 64,
        "blok": "D-49",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-069",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824053648943,
            0.546129348978
          ],
          [
            111.824053648943,
            0.555213588385
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-070",
      "properties": {
        "id": 65,
        "blok": "D-49",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-070",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824476035352,
            0.5474558811
          ],
          [
            111.824476035352,
            0.550278936122
          ],
          [
            111.824476035352,
            0.553101991144
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-071",
      "properties": {
        "id": 66,
        "blok": "D-49",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-071",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824898421761,
            0.546115589356
          ],
          [
            111.824898421761,
            0.555199427076
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-072",
      "properties": {
        "id": 67,
        "blok": "D-49",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-072",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822786489715,
            0.549181346177
          ],
          [
            111.822786489715,
            0.551057816226
          ],
          [
            111.823327144319,
            0.551057816226
          ],
          [
            111.823327144319,
            0.54683540366
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-073",
      "properties": {
        "id": 68,
        "blok": "D-49",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-073",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823631262533,
            0.54683540366
          ],
          [
            111.823631262533,
            0.551057816226
          ],
          [
            111.824171917137,
            0.551057816226
          ],
          [
            111.824171917137,
            0.54683540366
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-074",
      "properties": {
        "id": 69,
        "blok": "D-49",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-074",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824476035352,
            0.54683540366
          ],
          [
            111.824476035352,
            0.551057816226
          ],
          [
            111.825016689956,
            0.551057816226
          ],
          [
            111.825016689956,
            0.54683540366
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-075",
      "properties": {
        "id": 70,
        "blok": "E-50",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-075",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826100945264,
            0.537037276562
          ],
          [
            111.826100945264,
            0.546098909911
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-076",
      "properties": {
        "id": 71,
        "blok": "E-50",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-076",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826411655381,
            0.538037191651
          ],
          [
            111.826446655381,
            0.539586361481
          ],
          [
            111.826376655381,
            0.541417198554
          ],
          [
            111.826446655381,
            0.542966368384
          ],
          [
            111.826411655381,
            0.545078872699
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-077",
      "properties": {
        "id": 72,
        "blok": "E-50",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-077",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826722365498,
            0.537040864397
          ],
          [
            111.826722365498,
            0.546096623461
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-078",
      "properties": {
        "id": 73,
        "blok": "E-50",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-078",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827033075615,
            0.538123156722
          ],
          [
            111.827068075615,
            0.539693590825
          ],
          [
            111.826998075615,
            0.541549558401
          ],
          [
            111.827068075615,
            0.543119992504
          ],
          [
            111.827033075615,
            0.545261493553
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-079",
      "properties": {
        "id": 74,
        "blok": "E-50",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-079",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827343785732,
            0.537039407984
          ],
          [
            111.827343785732,
            0.546094360149
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-080",
      "properties": {
        "id": 75,
        "blok": "E-50",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-080",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827654495849,
            0.537773909134
          ],
          [
            111.827689495849,
            0.539258148868
          ],
          [
            111.827619495849,
            0.541012250372
          ],
          [
            111.827689495849,
            0.542496490107
          ],
          [
            111.827654495849,
            0.544520453381
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-081",
      "properties": {
        "id": 76,
        "blok": "E-50",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-081",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827965205966,
            0.537037951571
          ],
          [
            111.827965205966,
            0.543143324046
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-082",
      "properties": {
        "id": 77,
        "blok": "F-58",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-082",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.848820884369,
            0.528779552019
          ],
          [
            111.848820884369,
            0.535334276151
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-083",
      "properties": {
        "id": 78,
        "blok": "F-58",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-083",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.849606606145,
            0.528106365488
          ],
          [
            111.849606606145,
            0.536939469042
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-084",
      "properties": {
        "id": 79,
        "blok": "E-60",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-084",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.85388410178,
            0.536926071609
          ],
          [
            111.85388410178,
            0.544269382436
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-085",
      "properties": {
        "id": 80,
        "blok": "E-60",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-085",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.854178631334,
            0.538071822856
          ],
          [
            111.854178631334,
            0.540346711829
          ],
          [
            111.854178631334,
            0.542621600802
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-086",
      "properties": {
        "id": 81,
        "blok": "E-60",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-086",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.854473160889,
            0.536920925932
          ],
          [
            111.854473160889,
            0.543918266532
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-087",
      "properties": {
        "id": 82,
        "blok": "E-60",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-087",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.854767690443,
            0.537516362752
          ],
          [
            111.854767690443,
            0.539312090617
          ],
          [
            111.854767690443,
            0.541107818482
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-088",
      "properties": {
        "id": 83,
        "blok": "E-60",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-088",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.855062219997,
            0.536914961258
          ],
          [
            111.855062219997,
            0.543370379296
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-089",
      "properties": {
        "id": 84,
        "blok": "E-60",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-089",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.855356749551,
            0.537958236985
          ],
          [
            111.855356749551,
            0.539916415789
          ],
          [
            111.855356749551,
            0.541874594592
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-090",
      "properties": {
        "id": 85,
        "blok": "E-60",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-090",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.855651279105,
            0.537151499493
          ],
          [
            111.855651279105,
            0.543039934497
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-091",
      "properties": {
        "id": 86,
        "blok": "F-60",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-091",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.853642746544,
            0.528080303644
          ],
          [
            111.853642746544,
            0.536928179947
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-092",
      "properties": {
        "id": 87,
        "blok": "F-60",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-092",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.854097656692,
            0.528807335344
          ],
          [
            111.854132656692,
            0.530261487079
          ],
          [
            111.854062656692,
            0.53198003004
          ],
          [
            111.854132656692,
            0.533434181775
          ],
          [
            111.854097656692,
            0.53541711596
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-093",
      "properties": {
        "id": 88,
        "blok": "F-60",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-093",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.854552566839,
            0.528068980293
          ],
          [
            111.854552566839,
            0.536920232288
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-094",
      "properties": {
        "id": 89,
        "blok": "F-60",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-094",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.855007476987,
            0.529172474066
          ],
          [
            111.855042476987,
            0.530719920839
          ],
          [
            111.854972476987,
            0.532548721571
          ],
          [
            111.855042476987,
            0.534096168345
          ],
          [
            111.855007476987,
            0.536206323036
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-095",
      "properties": {
        "id": 90,
        "blok": "F-60",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-095",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.855462387135,
            0.528059915123
          ],
          [
            111.855462387135,
            0.537057603039
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-096",
      "properties": {
        "id": 91,
        "blok": "G-45",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-096",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.81228891092,
            0.519063655231
          ],
          [
            111.81228891092,
            0.528197689499
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-097",
      "properties": {
        "id": 92,
        "blok": "G-45",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-097",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.812696918338,
            0.519722859382
          ],
          [
            111.812696918338,
            0.522024278299
          ],
          [
            111.812696918338,
            0.524325697215
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-098",
      "properties": {
        "id": 93,
        "blok": "G-45",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-098",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.813104925756,
            0.519059789787
          ],
          [
            111.813104925756,
            0.528196658542
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-099",
      "properties": {
        "id": 94,
        "blok": "G-45",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-099",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.813512933174,
            0.520260579763
          ],
          [
            111.813512933174,
            0.522986062727
          ],
          [
            111.813512933174,
            0.525711545692
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-100",
      "properties": {
        "id": 95,
        "blok": "G-45",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-100",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.813920940592,
            0.519057012312
          ],
          [
            111.813920940592,
            0.528189302708
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-101",
      "properties": {
        "id": 96,
        "blok": "F-17",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-101",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735088259096,
            0.527907001977
          ],
          [
            111.735088259096,
            0.537106641528
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-102",
      "properties": {
        "id": 97,
        "blok": "F-17",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-102",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735436106105,
            0.529223474471
          ],
          [
            111.735436106105,
            0.532056726203
          ],
          [
            111.735436106105,
            0.534889977935
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-103",
      "properties": {
        "id": 98,
        "blok": "F-17",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-103",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735783953115,
            0.527904979148
          ],
          [
            111.735783953115,
            0.537106049163
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-104",
      "properties": {
        "id": 99,
        "blok": "F-17",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-104",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736131800125,
            0.52922354371
          ],
          [
            111.736131800125,
            0.532056557655
          ],
          [
            111.736131800125,
            0.5348895716
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-105",
      "properties": {
        "id": 100,
        "blok": "F-17",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-105",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736479647135,
            0.5279073453
          ],
          [
            111.736479647135,
            0.537105456754
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-106",
      "properties": {
        "id": 101,
        "blok": "F-17",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-106",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736827494144,
            0.529754778662
          ],
          [
            111.736827494144,
            0.532222550892
          ],
          [
            111.736827494144,
            0.534690323121
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-107",
      "properties": {
        "id": 102,
        "blok": "F-17",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-107",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.737175341154,
            0.529716240121
          ],
          [
            111.737175341154,
            0.537104864249
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-108",
      "properties": {
        "id": 103,
        "blok": "D-11",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-108",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.722786301791,
            0.545418515587
          ],
          [
            111.725240984481,
            0.545418515587
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-109",
      "properties": {
        "id": 104,
        "blok": "D-11",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-109",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.723494665099,
            0.546117605481
          ],
          [
            111.724204485669,
            0.546117605481
          ],
          [
            111.72491430624,
            0.546117605481
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-110",
      "properties": {
        "id": 105,
        "blok": "D-11",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-110",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.721984870213,
            0.546816695376
          ],
          [
            111.72620506819,
            0.546816695376
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-111",
      "properties": {
        "id": 106,
        "blok": "D-11",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-111",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.721734123874,
            0.547515785271
          ],
          [
            111.72620850201,
            0.547515785271
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-112",
      "properties": {
        "id": 107,
        "blok": "D-11",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-112",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.719621157598,
            0.548214875166
          ],
          [
            111.726215562397,
            0.548214875166
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-113",
      "properties": {
        "id": 108,
        "blok": "D-11",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-113",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.719989196134,
            0.54891396506
          ],
          [
            111.720608792385,
            0.54891396506
          ],
          [
            111.721228388636,
            0.54891396506
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-114",
      "properties": {
        "id": 109,
        "blok": "D-11",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-114",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72394824889,
            0.549613054955
          ],
          [
            111.726234603838,
            0.549613054955
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-115",
      "properties": {
        "id": 110,
        "blok": "D-14",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-115",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72645439062,
            0.545164638504
          ],
          [
            111.728355987978,
            0.545164638504
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-116",
      "properties": {
        "id": 111,
        "blok": "D-14",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-116",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726567527615,
            0.546163511609
          ],
          [
            111.728840511959,
            0.546163511609
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-117",
      "properties": {
        "id": 112,
        "blok": "D-14",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-117",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726207852545,
            0.547162384714
          ],
          [
            111.72966390625,
            0.547162384714
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-118",
      "properties": {
        "id": 113,
        "blok": "D-14",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-118",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72637065442,
            0.548161257818
          ],
          [
            111.728654729134,
            0.548161257818
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-119",
      "properties": {
        "id": 114,
        "blok": "D-14",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-119",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72622256602,
            0.549160130923
          ],
          [
            111.728127346178,
            0.549160130923
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-120",
      "properties": {
        "id": 115,
        "blok": "J-18",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-120",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736223884062,
            0.489403083326
          ],
          [
            111.741611727756,
            0.489403083326
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-121",
      "properties": {
        "id": 116,
        "blok": "J-18",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-121",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736871815236,
            0.489841790906
          ],
          [
            111.740326310101,
            0.489841790906
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-122",
      "properties": {
        "id": 117,
        "blok": "J-18",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-122",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736820120225,
            0.490280498485
          ],
          [
            111.740967158949,
            0.490280498485
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-123",
      "properties": {
        "id": 118,
        "blok": "J-18",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-123",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736896875897,
            0.490719206064
          ],
          [
            111.740176979534,
            0.490719206064
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-124",
      "properties": {
        "id": 119,
        "blok": "J-18",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-124",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.737386609279,
            0.491157913644
          ],
          [
            111.739793230405,
            0.491157913644
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-125",
      "properties": {
        "id": 120,
        "blok": "J-18",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-125",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.737143626374,
            0.491596621223
          ],
          [
            111.740559970333,
            0.491596621223
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-126",
      "properties": {
        "id": 121,
        "blok": "J-18",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-126",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.738885358916,
            0.492035328803
          ],
          [
            111.74100714071,
            0.492035328803
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-127",
      "properties": {
        "id": 122,
        "blok": "J-18",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-127",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.739695914607,
            0.492474036382
          ],
          [
            111.741967908287,
            0.492474036382
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-128",
      "properties": {
        "id": 123,
        "blok": "J-18",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-128",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.740300268828,
            0.492912743962
          ],
          [
            111.742396152068,
            0.492912743962
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-129",
      "properties": {
        "id": 124,
        "blok": "J-26",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-129",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.761266604465,
            0.490229367535
          ],
          [
            111.763266719388,
            0.490229367535
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-130",
      "properties": {
        "id": 125,
        "blok": "J-26",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-130",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.761469841141,
            0.490672793378
          ],
          [
            111.763115758559,
            0.490672793378
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-131",
      "properties": {
        "id": 126,
        "blok": "J-26",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-131",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.761046998005,
            0.49111621922
          ],
          [
            111.76368274198,
            0.49111621922
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-132",
      "properties": {
        "id": 127,
        "blok": "J-26",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-132",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.759752085625,
            0.491559645062
          ],
          [
            111.763709694916,
            0.491559645062
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-133",
      "properties": {
        "id": 128,
        "blok": "J-26",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-133",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.759411078952,
            0.492003070905
          ],
          [
            111.76483309834,
            0.492003070905
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-134",
      "properties": {
        "id": 129,
        "blok": "J-26",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-134",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.759411291436,
            0.492446496747
          ],
          [
            111.764493896158,
            0.492446496747
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-135",
      "properties": {
        "id": 130,
        "blok": "J-26",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-135",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.760025645513,
            0.49288992259
          ],
          [
            111.763943666304,
            0.49288992259
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-136",
      "properties": {
        "id": 131,
        "blok": "J-26",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-136",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.759411717422,
            0.493333348432
          ],
          [
            111.762078682668,
            0.493333348432
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-137",
      "properties": {
        "id": 132,
        "blok": "E-59",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-137",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.851609941863,
            0.537849739789
          ],
          [
            111.851609941863,
            0.544526573855
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-138",
      "properties": {
        "id": 133,
        "blok": "E-59",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-138",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.852394735499,
            0.53693407239
          ],
          [
            111.852394735499,
            0.546189254415
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-139",
      "properties": {
        "id": 134,
        "blok": "H-53",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-139",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83439298235,
            0.510836999965
          ],
          [
            111.83439298235,
            0.518924009954
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-140",
      "properties": {
        "id": 135,
        "blok": "H-53",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-140",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834814397231,
            0.511113387226
          ],
          [
            111.834814397231,
            0.513870174061
          ],
          [
            111.834814397231,
            0.516626960896
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-141",
      "properties": {
        "id": 136,
        "blok": "H-53",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-141",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.835235812112,
            0.509853149459
          ],
          [
            111.835235812112,
            0.518921686326
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-142",
      "properties": {
        "id": 137,
        "blok": "H-53",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-142",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.835657226993,
            0.511385640907
          ],
          [
            111.835657226993,
            0.514369560071
          ],
          [
            111.835657226993,
            0.517353479234
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-143",
      "properties": {
        "id": 138,
        "blok": "H-53",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-143",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.836078641875,
            0.50984479509
          ],
          [
            111.836078641875,
            0.518919362698
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-144",
      "properties": {
        "id": 139,
        "blok": "I-56",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-144",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.842522380064,
            0.501267466861
          ],
          [
            111.842522380064,
            0.509835251015
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-145",
      "properties": {
        "id": 140,
        "blok": "I-56",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-145",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.842945818113,
            0.501873837485
          ],
          [
            111.842945818113,
            0.504025788377
          ],
          [
            111.842945818113,
            0.506177739269
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-146",
      "properties": {
        "id": 141,
        "blok": "I-56",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-146",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.843369256162,
            0.501259096981
          ],
          [
            111.843369256162,
            0.509834129695
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-147",
      "properties": {
        "id": 142,
        "blok": "I-56",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-147",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.843792694211,
            0.502410891159
          ],
          [
            111.843792694211,
            0.504994692537
          ],
          [
            111.843792694211,
            0.507578493915
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-148",
      "properties": {
        "id": 143,
        "blok": "I-56",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-148",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.84421613226,
            0.501250727648
          ],
          [
            111.84421613226,
            0.509832755507
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-149",
      "properties": {
        "id": 144,
        "blok": "G-49",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-149",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.820747409475,
            0.525467151858
          ],
          [
            111.820747409475,
            0.528197352552
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-150",
      "properties": {
        "id": 145,
        "blok": "G-49",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-150",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821604541513,
            0.525685422589
          ],
          [
            111.821639541513,
            0.526143434506
          ],
          [
            111.821569541513,
            0.526684721317
          ],
          [
            111.821639541513,
            0.527142733234
          ],
          [
            111.821604541513,
            0.527767294938
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-151",
      "properties": {
        "id": 146,
        "blok": "G-49",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-151",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822461673551,
            0.525602885455
          ],
          [
            111.822461673551,
            0.528160595924
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-152",
      "properties": {
        "id": 147,
        "blok": "G-49",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-152",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8232863053,
            0.523572106842
          ],
          [
            111.823353805588,
            0.52494011323
          ],
          [
            111.823318805588,
            0.526874659462
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-153",
      "properties": {
        "id": 148,
        "blok": "G-49",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-153",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824175937626,
            0.519636986307
          ],
          [
            111.824175937626,
            0.528144874337
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-154",
      "properties": {
        "id": 149,
        "blok": "C-29",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-154",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.767516368767,
            0.563598786326
          ],
          [
            111.767516368767,
            0.565370408726
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-155",
      "properties": {
        "id": 150,
        "blok": "C-29",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-155",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.768109114022,
            0.562593389031
          ],
          [
            111.768109114022,
            0.563663198789
          ],
          [
            111.768109114022,
            0.564733008547
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-156",
      "properties": {
        "id": 151,
        "blok": "C-29",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-156",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.768701859278,
            0.560839877939
          ],
          [
            111.768701859278,
            0.565362231358
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-157",
      "properties": {
        "id": 152,
        "blok": "C-29",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-157",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.769294604533,
            0.56244819645
          ],
          [
            111.769294604533,
            0.563682376678
          ],
          [
            111.769294604533,
            0.564916556907
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-158",
      "properties": {
        "id": 153,
        "blok": "C-29",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-158",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.769887349788,
            0.56071097285
          ],
          [
            111.769887349788,
            0.563864112596
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-159",
      "properties": {
        "id": 154,
        "blok": "D-45",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-159",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.812796242328,
            0.538051678602
          ],
          [
            111.812831242328,
            0.540168374862
          ],
          [
            111.812761242328,
            0.542669924987
          ],
          [
            111.812831242328,
            0.544786621247
          ],
          [
            111.812796242328,
            0.547673025238
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-160",
      "properties": {
        "id": 155,
        "blok": "D-45",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-160",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.813618164557,
            0.537118917396
          ],
          [
            111.813618164557,
            0.550128455499
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-161",
      "properties": {
        "id": 156,
        "blok": "E-17",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-161",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735009407599,
            0.537106708669
          ],
          [
            111.735009407599,
            0.546171156595
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-162",
      "properties": {
        "id": 157,
        "blok": "E-17",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-162",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735301496354,
            0.538763595395
          ],
          [
            111.735301496354,
            0.541839449081
          ],
          [
            111.735301496354,
            0.544915302768
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-163",
      "properties": {
        "id": 158,
        "blok": "E-17",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-163",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735593585109,
            0.53710621125
          ],
          [
            111.735593585109,
            0.546172347973
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-164",
      "properties": {
        "id": 159,
        "blok": "E-17",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-164",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735885673864,
            0.537105962553
          ],
          [
            111.735885673864,
            0.546172943662
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-165",
      "properties": {
        "id": 160,
        "blok": "E-17",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-165",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736177762619,
            0.537105713856
          ],
          [
            111.736177762619,
            0.546173539351
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-166",
      "properties": {
        "id": 161,
        "blok": "E-17",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-166",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.736469851375,
            0.538730570751
          ],
          [
            111.736469851375,
            0.541781724753
          ],
          [
            111.736469851375,
            0.544832878755
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-167",
      "properties": {
        "id": 162,
        "blok": "E-17",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-167",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73676194013,
            0.537105216332
          ],
          [
            111.73676194013,
            0.545481194274
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-168",
      "properties": {
        "id": 163,
        "blok": "G-51",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-168",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.828860486004,
            0.518947697887
          ],
          [
            111.828860486004,
            0.528131609932
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-169",
      "properties": {
        "id": 164,
        "blok": "G-51",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-169",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829253609236,
            0.520172168086
          ],
          [
            111.829253609236,
            0.522928895439
          ],
          [
            111.829253609236,
            0.525685622793
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-170",
      "properties": {
        "id": 165,
        "blok": "G-51",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-170",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829646732468,
            0.518948783124
          ],
          [
            111.829646732468,
            0.52812374998
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-171",
      "properties": {
        "id": 166,
        "blok": "G-51",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-171",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8300398557,
            0.519661082927
          ],
          [
            111.8300398557,
            0.522006145998
          ],
          [
            111.8300398557,
            0.524351209069
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-172",
      "properties": {
        "id": 167,
        "blok": "G-51",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-172",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.830432978932,
            0.518950177558
          ],
          [
            111.830432978932,
            0.52812469043
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-173",
      "properties": {
        "id": 168,
        "blok": "F-50",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-173",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826027651522,
            0.528130543281
          ],
          [
            111.826027651522,
            0.537036412164
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-174",
      "properties": {
        "id": 169,
        "blok": "F-50",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-174",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826324061125,
            0.529043078763
          ],
          [
            111.826324061125,
            0.531498878621
          ],
          [
            111.826324061125,
            0.533954678479
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-175",
      "properties": {
        "id": 170,
        "blok": "F-50",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-175",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826620470727,
            0.528131025778
          ],
          [
            111.826620470727,
            0.537041103206
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-176",
      "properties": {
        "id": 171,
        "blok": "F-50",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-176",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826916880329,
            0.529631566454
          ],
          [
            111.826916880329,
            0.532552873948
          ],
          [
            111.826916880329,
            0.535474181442
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-177",
      "properties": {
        "id": 172,
        "blok": "F-50",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-177",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827213289932,
            0.528131960689
          ],
          [
            111.827213289932,
            0.537039713825
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-178",
      "properties": {
        "id": 173,
        "blok": "F-50",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-178",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827509699534,
            0.529386880991
          ],
          [
            111.827509699534,
            0.53211259896
          ],
          [
            111.827509699534,
            0.534838316929
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-179",
      "properties": {
        "id": 174,
        "blok": "F-50",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-179",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827806109136,
            0.528133837954
          ],
          [
            111.827806109136,
            0.537038324444
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-180",
      "properties": {
        "id": 175,
        "blok": "F-57",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-180",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.845571409866,
            0.52814675701
          ],
          [
            111.845571409866,
            0.533778391024
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-181",
      "properties": {
        "id": 176,
        "blok": "F-57",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-181",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.845865172951,
            0.528556325946
          ],
          [
            111.845900172951,
            0.529511300196
          ],
          [
            111.845830172951,
            0.530639906127
          ],
          [
            111.845900172951,
            0.531594880376
          ],
          [
            111.845865172951,
            0.532897117989
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-182",
      "properties": {
        "id": 177,
        "blok": "F-57",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-182",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.846158936035,
            0.528136255448
          ],
          [
            111.846158936035,
            0.534400885095
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-183",
      "properties": {
        "id": 178,
        "blok": "F-57",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-183",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.84645269912,
            0.529045849312
          ],
          [
            111.84648769912,
            0.53054232675
          ],
          [
            111.84641769912,
            0.532310890995
          ],
          [
            111.84648769912,
            0.533807368433
          ],
          [
            111.84645269912,
            0.535848019485
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-184",
      "properties": {
        "id": 179,
        "blok": "F-57",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-184",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.846746462205,
            0.52812575376
          ],
          [
            111.846746462205,
            0.536958364477
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-185",
      "properties": {
        "id": 180,
        "blok": "F-57",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-185",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.847040225289,
            0.528653539336
          ],
          [
            111.847075225289,
            0.530054737117
          ],
          [
            111.847005225289,
            0.53171069813
          ],
          [
            111.847075225289,
            0.533111895911
          ],
          [
            111.847040225289,
            0.535022620158
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-186",
      "properties": {
        "id": 181,
        "blok": "F-57",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-186",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.847333988374,
            0.528115251801
          ],
          [
            111.847333988374,
            0.536939714002
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-187",
      "properties": {
        "id": 182,
        "blok": "H-47",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-187",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.817817659512,
            0.509944151667
          ],
          [
            111.817817659512,
            0.519037225806
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-188",
      "properties": {
        "id": 183,
        "blok": "H-47",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-188",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.818249335615,
            0.511590350024
          ],
          [
            111.818249335615,
            0.514668540145
          ],
          [
            111.818249335615,
            0.517746730265
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-189",
      "properties": {
        "id": 184,
        "blok": "H-47",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-189",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.818681011719,
            0.509935886726
          ],
          [
            111.818681011719,
            0.517931618988
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-190",
      "properties": {
        "id": 185,
        "blok": "H-47",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-190",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.819112687822,
            0.511172559588
          ],
          [
            111.819112687822,
            0.513601819602
          ],
          [
            111.819112687822,
            0.516031079615
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-191",
      "properties": {
        "id": 186,
        "blok": "H-47",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-191",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.819544363925,
            0.509935026756
          ],
          [
            111.819544363925,
            0.517264484765
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-192",
      "properties": {
        "id": 187,
        "blok": "G-46",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-192",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.815092025898,
            0.519048002713
          ],
          [
            111.815092025898,
            0.528182085238
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-193",
      "properties": {
        "id": 188,
        "blok": "G-46",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-193",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.815475107618,
            0.520082554223
          ],
          [
            111.815475107618,
            0.522677341895
          ],
          [
            111.815475107618,
            0.525272129568
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-194",
      "properties": {
        "id": 189,
        "blok": "G-46",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-194",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.815858189338,
            0.519049105638
          ],
          [
            111.815858189338,
            0.528176120368
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-195",
      "properties": {
        "id": 190,
        "blok": "G-46",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-195",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.816241271058,
            0.519826292138
          ],
          [
            111.816241271058,
            0.522221596991
          ],
          [
            111.816241271058,
            0.524616901844
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-196",
      "properties": {
        "id": 191,
        "blok": "G-46",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-196",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.816624352778,
            0.519044640118
          ],
          [
            111.816624352778,
            0.528173996986
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-197",
      "properties": {
        "id": 192,
        "blok": "E-36",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-197",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.788834374438,
            0.53742005659
          ],
          [
            111.788869374438,
            0.538006618964
          ],
          [
            111.788799374438,
            0.538699829042
          ],
          [
            111.788869374438,
            0.539286391416
          ],
          [
            111.788834374438,
            0.540086249198
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-198",
      "properties": {
        "id": 193,
        "blok": "E-36",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-198",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.790382135093,
            0.537050145015
          ],
          [
            111.790382135093,
            0.543421606319
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-199",
      "properties": {
        "id": 194,
        "blok": "F-56",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-199",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.843081493581,
            0.529219980549
          ],
          [
            111.843081493581,
            0.536109896641
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-200",
      "properties": {
        "id": 195,
        "blok": "F-56",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-200",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.844474597043,
            0.528162107052
          ],
          [
            111.844474597043,
            0.53696913499
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-201",
      "properties": {
        "id": 196,
        "blok": "H-52",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-201",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.831772835887,
            0.509865559563
          ],
          [
            111.831772835887,
            0.518940319548
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-202",
      "properties": {
        "id": 197,
        "blok": "H-52",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-202",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832315910596,
            0.510547018653
          ],
          [
            111.832350910596,
            0.512019027921
          ],
          [
            111.832280910596,
            0.513758675238
          ],
          [
            111.832350910596,
            0.515230684507
          ],
          [
            111.832315910596,
            0.517237969873
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-203",
      "properties": {
        "id": 198,
        "blok": "H-52",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-203",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832858985304,
            0.509867271113
          ],
          [
            111.832858985304,
            0.518932327512
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-204",
      "properties": {
        "id": 199,
        "blok": "H-52",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-204",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.833402060012,
            0.510648122914
          ],
          [
            111.833437060012,
            0.512143905451
          ],
          [
            111.833367060012,
            0.513911648449
          ],
          [
            111.833437060012,
            0.515407430986
          ],
          [
            111.833402060012,
            0.517447134445
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-205",
      "properties": {
        "id": 200,
        "blok": "H-52",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-205",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.833945134721,
            0.509866519826
          ],
          [
            111.833945134721,
            0.510841731008
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-206",
      "properties": {
        "id": 201,
        "blok": "D-48",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-206",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.82067752784,
            0.546143061747
          ],
          [
            111.82067752784,
            0.555257285307
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-207",
      "properties": {
        "id": 202,
        "blok": "D-48",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-207",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821074406641,
            0.546793153989
          ],
          [
            111.821074406641,
            0.549080362143
          ],
          [
            111.821074406641,
            0.551367570297
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-208",
      "properties": {
        "id": 203,
        "blok": "D-48",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-208",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821471285441,
            0.546145384574
          ],
          [
            111.821471285441,
            0.555255640674
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-209",
      "properties": {
        "id": 204,
        "blok": "D-48",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-209",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821868164242,
            0.551319551053
          ],
          [
            111.821868164242,
            0.552591592957
          ],
          [
            111.821868164242,
            0.553863634862
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-210",
      "properties": {
        "id": 205,
        "blok": "D-48",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-210",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822265043043,
            0.551199401658
          ],
          [
            111.822265043043,
            0.555245821421
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-211",
      "properties": {
        "id": 206,
        "blok": "E-15",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-211",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.729479359962,
            0.537128335896
          ],
          [
            111.729479359962,
            0.539819493524
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-212",
      "properties": {
        "id": 207,
        "blok": "E-15",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-212",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72977472154,
            0.537355173605
          ],
          [
            111.72977472154,
            0.540042062756
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-213",
      "properties": {
        "id": 208,
        "blok": "E-15",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-213",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.730070083118,
            0.537124455698
          ],
          [
            111.730070083118,
            0.54120875123
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-214",
      "properties": {
        "id": 209,
        "blok": "E-15",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-214",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.730365444697,
            0.537122008915
          ],
          [
            111.730365444697,
            0.542107242381
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-215",
      "properties": {
        "id": 210,
        "blok": "E-15",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-215",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.730660806275,
            0.537122661562
          ],
          [
            111.730660806275,
            0.542367459368
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-216",
      "properties": {
        "id": 211,
        "blok": "E-15",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-216",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.730956167853,
            0.537725046293
          ],
          [
            111.730956167853,
            0.541793106
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-217",
      "properties": {
        "id": 212,
        "blok": "E-15",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-217",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.731251529432,
            0.537120012677
          ],
          [
            111.731251529432,
            0.546177554148
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-218",
      "properties": {
        "id": 213,
        "blok": "I-51",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-218",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.82898646989,
            0.501319503409
          ],
          [
            111.82898646989,
            0.509879125885
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-219",
      "properties": {
        "id": 214,
        "blok": "I-51",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-219",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829333742157,
            0.502292454324
          ],
          [
            111.829333742157,
            0.508938400109
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-220",
      "properties": {
        "id": 215,
        "blok": "I-51",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-220",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829681014425,
            0.501314239097
          ],
          [
            111.829681014425,
            0.509870146912
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-221",
      "properties": {
        "id": 216,
        "blok": "I-51",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-221",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.830028286693,
            0.50181656603
          ],
          [
            111.830028286693,
            0.508039544779
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-222",
      "properties": {
        "id": 217,
        "blok": "I-51",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-222",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83037555896,
            0.501309766443
          ],
          [
            111.83037555896,
            0.509869907956
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-223",
      "properties": {
        "id": 218,
        "blok": "I-52",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-223",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.831575084246,
            0.501304629783
          ],
          [
            111.831575084246,
            0.509864314396
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-224",
      "properties": {
        "id": 219,
        "blok": "I-52",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-224",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832006411731,
            0.502010801088
          ],
          [
            111.832041411731,
            0.503418258428
          ],
          [
            111.831971411731,
            0.505081617102
          ],
          [
            111.832041411731,
            0.506489074442
          ],
          [
            111.832006411731,
            0.50840833445
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-225",
      "properties": {
        "id": 220,
        "blok": "I-52",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-225",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832437739216,
            0.501298534149
          ],
          [
            111.832437739216,
            0.509869401858
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-226",
      "properties": {
        "id": 221,
        "blok": "I-52",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-226",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832869066701,
            0.501844147155
          ],
          [
            111.832904066701,
            0.503214197762
          ],
          [
            111.832834066701,
            0.504833348479
          ],
          [
            111.832904066701,
            0.506203399086
          ],
          [
            111.832869066701,
            0.508071649913
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-227",
      "properties": {
        "id": 222,
        "blok": "I-52",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-227",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.833300394186,
            0.501284765443
          ],
          [
            111.833300394186,
            0.509869996502
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-228",
      "properties": {
        "id": 223,
        "blok": "G-50",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-228",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826085241347,
            0.518973118868
          ],
          [
            111.826085241347,
            0.528130590153
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-229",
      "properties": {
        "id": 224,
        "blok": "G-50",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-229",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826491500518,
            0.520305646592
          ],
          [
            111.826491500518,
            0.523143499139
          ],
          [
            111.826491500518,
            0.525981351686
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-230",
      "properties": {
        "id": 225,
        "blok": "G-50",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-230",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826897759689,
            0.518968549683
          ],
          [
            111.826897759689,
            0.528131251465
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-231",
      "properties": {
        "id": 226,
        "blok": "G-50",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-231",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827304018859,
            0.52016535265
          ],
          [
            111.827304018859,
            0.522902138926
          ],
          [
            111.827304018859,
            0.525638925202
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-232",
      "properties": {
        "id": 227,
        "blok": "G-50",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-232",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.82771027803,
            0.518956945021
          ],
          [
            111.82771027803,
            0.528133534488
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-233",
      "properties": {
        "id": 228,
        "blok": "D-34",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-233",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.784310571962,
            0.537515516932
          ],
          [
            111.784310571962,
            0.540778822071
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-234",
      "properties": {
        "id": 229,
        "blok": "D-34",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-234",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.785434266502,
            0.535832150464
          ],
          [
            111.785434266502,
            0.540966332048
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-235",
      "properties": {
        "id": 230,
        "blok": "E-43",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-235",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.807565443805,
            0.537762087885
          ],
          [
            111.807565443805,
            0.541850151927
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-236",
      "properties": {
        "id": 231,
        "blok": "E-43",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-236",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.808801067675,
            0.537348657454
          ],
          [
            111.808801067675,
            0.541282583469
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-237",
      "properties": {
        "id": 232,
        "blok": "I-50",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-237",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826420585461,
            0.50195775476
          ],
          [
            111.826455585461,
            0.50334262472
          ],
          [
            111.826385585461,
            0.504979289218
          ],
          [
            111.826455585461,
            0.506364159178
          ],
          [
            111.826420585461,
            0.508252618214
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-238",
      "properties": {
        "id": 233,
        "blok": "I-50",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-238",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827336853433,
            0.501334749218
          ],
          [
            111.827336853433,
            0.509913738017
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-239",
      "properties": {
        "id": 234,
        "blok": "G-52",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-239",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832376057583,
            0.519977880855
          ],
          [
            111.832376057583,
            0.522089319091
          ],
          [
            111.832376057583,
            0.524200757327
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-240",
      "properties": {
        "id": 235,
        "blok": "G-52",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-240",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.833443219633,
            0.518928028636
          ],
          [
            111.833443219633,
            0.52357566168
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-241",
      "properties": {
        "id": 236,
        "blok": "G-48",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-241",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.819240166576,
            0.521414801323
          ],
          [
            111.819240166576,
            0.523930363213
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-242",
      "properties": {
        "id": 237,
        "blok": "G-48",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-242",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.819971534977,
            0.520484122831
          ],
          [
            111.819971534977,
            0.521772611689
          ],
          [
            111.819971534977,
            0.523061100548
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-243",
      "properties": {
        "id": 238,
        "blok": "G-48",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-243",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.820702903378,
            0.519776807628
          ],
          [
            111.820702903378,
            0.525474683514
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-244",
      "properties": {
        "id": 239,
        "blok": "G-48",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-244",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821434271779,
            0.519953526423
          ],
          [
            111.821434271779,
            0.521409142045
          ],
          [
            111.821434271779,
            0.522864757666
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-245",
      "properties": {
        "id": 240,
        "blok": "G-48",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-245",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822165640181,
            0.519399096386
          ],
          [
            111.822165640181,
            0.525750579343
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-246",
      "properties": {
        "id": 241,
        "blok": "J-28",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-246",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.765475856896,
            0.490050826656
          ],
          [
            111.765475856896,
            0.491539887149
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-247",
      "properties": {
        "id": 242,
        "blok": "J-28",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-247",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.765984657154,
            0.492204027999
          ],
          [
            111.765984657154,
            0.493128699539
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-248",
      "properties": {
        "id": 243,
        "blok": "J-28",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-248",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.766493457412,
            0.491036915019
          ],
          [
            111.766493457412,
            0.493770272017
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-249",
      "properties": {
        "id": 244,
        "blok": "J-28",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-249",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.767002257669,
            0.490476574926
          ],
          [
            111.767002257669,
            0.494358195093
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-250",
      "properties": {
        "id": 245,
        "blok": "J-28",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-250",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.767511057927,
            0.489972234678
          ],
          [
            111.767511057927,
            0.494147120712
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-251",
      "properties": {
        "id": 246,
        "blok": "J-28",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-251",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.768019858185,
            0.48966224104
          ],
          [
            111.768019858185,
            0.496797148823
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-252",
      "properties": {
        "id": 247,
        "blok": "J-28",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-252",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.768528658442,
            0.489680344918
          ],
          [
            111.768528658442,
            0.497300453406
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-253",
      "properties": {
        "id": 248,
        "blok": "J-28",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-253",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.7690374587,
            0.490388714106
          ],
          [
            111.7690374587,
            0.496357526103
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-254",
      "properties": {
        "id": 249,
        "blok": "J-28",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-254",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.769546258958,
            0.48971655216
          ],
          [
            111.769546258958,
            0.497320284726
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-255",
      "properties": {
        "id": 250,
        "blok": "E-11",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-255",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.717813897901,
            0.532149334713
          ],
          [
            111.717813897901,
            0.533055091201
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-256",
      "properties": {
        "id": 251,
        "blok": "E-11",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-256",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.719134222158,
            0.535459001992
          ],
          [
            111.719134222158,
            0.540084860228
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-257",
      "properties": {
        "id": 252,
        "blok": "E-11",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-257",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.720454546415,
            0.536419912921
          ],
          [
            111.720454546415,
            0.540401965085
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-258",
      "properties": {
        "id": 253,
        "blok": "E-11",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-258",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.721774870672,
            0.527547073916
          ],
          [
            111.721774870672,
            0.528469650777
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-259",
      "properties": {
        "id": 254,
        "blok": "E-11",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-259",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72309519493,
            0.535780028545
          ],
          [
            111.72309519493,
            0.54088581258
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-260",
      "properties": {
        "id": 255,
        "blok": "E-22",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-260",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.751126580788,
            0.537369489326
          ],
          [
            111.751126580788,
            0.539753739856
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-261",
      "properties": {
        "id": 256,
        "blok": "E-22",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-261",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.752152317388,
            0.537889928478
          ],
          [
            111.752152317388,
            0.537921286732
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-262",
      "properties": {
        "id": 257,
        "blok": "E-22",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-262",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.753178053988,
            0.538341434333
          ],
          [
            111.753178053988,
            0.538538543372
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-263",
      "properties": {
        "id": 258,
        "blok": "E-22",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-263",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.754203790588,
            0.539835894554
          ],
          [
            111.754203790588,
            0.540346309656
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-264",
      "properties": {
        "id": 259,
        "blok": "E-22",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-264",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.755229527188,
            0.542977549472
          ],
          [
            111.755229527188,
            0.543142811397
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-265",
      "properties": {
        "id": 260,
        "blok": "F-44",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-265",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.81024034695,
            0.533269774643
          ],
          [
            111.81024034695,
            0.535862704876
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-266",
      "properties": {
        "id": 261,
        "blok": "F-44",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-266",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.811022790809,
            0.532964805071
          ],
          [
            111.811057790809,
            0.53359896825
          ],
          [
            111.810987790809,
            0.534348433824
          ],
          [
            111.811057790809,
            0.534982597003
          ],
          [
            111.811022790809,
            0.535847364974
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-267",
      "properties": {
        "id": 262,
        "blok": "F-44",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-267",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.811805234669,
            0.528189646272
          ],
          [
            111.811805234669,
            0.537127555162
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-268",
      "properties": {
        "id": 263,
        "blok": "F-44",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-268",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.812587678528,
            0.528943881963
          ],
          [
            111.812622678528,
            0.530412387527
          ],
          [
            111.812552678528,
            0.532147894102
          ],
          [
            111.812622678528,
            0.533616399666
          ],
          [
            111.812587678528,
            0.535618907253
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-269",
      "properties": {
        "id": 264,
        "blok": "F-44",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-269",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.813370122387,
            0.528195818309
          ],
          [
            111.813370122387,
            0.537120108928
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-270",
      "properties": {
        "id": 265,
        "blok": "E-52",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-270",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.82937895146,
            0.540758297712
          ],
          [
            111.82937895146,
            0.54706526591
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-271",
      "properties": {
        "id": 266,
        "blok": "E-52",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-271",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829962581047,
            0.54043915845
          ],
          [
            111.829962581047,
            0.541631003189
          ],
          [
            111.829962581047,
            0.542822847928
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-272",
      "properties": {
        "id": 267,
        "blok": "E-52",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-272",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.830546210635,
            0.539497115158
          ],
          [
            111.830546210635,
            0.543339025509
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-273",
      "properties": {
        "id": 268,
        "blok": "E-52",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-273",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.831129840222,
            0.539044295447
          ],
          [
            111.831129840222,
            0.543715209631
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-274",
      "properties": {
        "id": 269,
        "blok": "E-52",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-274",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83171346981,
            0.537089206929
          ],
          [
            111.83171346981,
            0.545324044695
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-275",
      "properties": {
        "id": 270,
        "blok": "E-52",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-275",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832297099397,
            0.540076110904
          ],
          [
            111.832297099397,
            0.541848459708
          ],
          [
            111.832297099397,
            0.543620808512
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-276",
      "properties": {
        "id": 271,
        "blok": "E-52",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-276",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832880728985,
            0.539719092386
          ],
          [
            111.832880728985,
            0.545481609261
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-277",
      "properties": {
        "id": 272,
        "blok": "E-41",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-277",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.801459791442,
            0.540344273015
          ],
          [
            111.801459791442,
            0.544328598626
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-278",
      "properties": {
        "id": 273,
        "blok": "E-41",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-278",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.803212943048,
            0.538697398077
          ],
          [
            111.803212943048,
            0.545134967877
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-279",
      "properties": {
        "id": 274,
        "blok": "E-40",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-279",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.79837171784,
            0.53928787385
          ],
          [
            111.801642109431,
            0.53928787385
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-280",
      "properties": {
        "id": 275,
        "blok": "E-40",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-280",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.797899406819,
            0.541036611642
          ],
          [
            111.798681102548,
            0.541036611642
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-281",
      "properties": {
        "id": 276,
        "blok": "E-58",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-281",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.848366424618,
            0.536936583322
          ],
          [
            111.848366424618,
            0.544180675417
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-282",
      "properties": {
        "id": 277,
        "blok": "E-58",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-282",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.848661600097,
            0.537871913543
          ],
          [
            111.848696600097,
            0.539156725916
          ],
          [
            111.848626600097,
            0.540675140538
          ],
          [
            111.848696600097,
            0.54195995291
          ],
          [
            111.848661600097,
            0.543711969782
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-283",
      "properties": {
        "id": 278,
        "blok": "E-58",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-283",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.848956775576,
            0.536937956982
          ],
          [
            111.848956775576,
            0.54448428675
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-284",
      "properties": {
        "id": 279,
        "blok": "E-58",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-284",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.849251951055,
            0.537897748009
          ],
          [
            111.849286951055,
            0.539243994153
          ],
          [
            111.849216951055,
            0.540835012324
          ],
          [
            111.849286951055,
            0.542181258468
          ],
          [
            111.849251951055,
            0.544017048664
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-285",
      "properties": {
        "id": 280,
        "blok": "E-58",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-285",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.849547126534,
            0.536939330642
          ],
          [
            111.849547126534,
            0.544827122556
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-286",
      "properties": {
        "id": 281,
        "blok": "E-58",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-286",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.849842302013,
            0.537889975573
          ],
          [
            111.849877302013,
            0.539259871962
          ],
          [
            111.849807302013,
            0.540878840422
          ],
          [
            111.849877302013,
            0.542248736811
          ],
          [
            111.849842302013,
            0.544116777342
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-287",
      "properties": {
        "id": 282,
        "blok": "E-58",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-287",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.850137477492,
            0.536940704302
          ],
          [
            111.850137477492,
            0.544835575916
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-288",
      "properties": {
        "id": 283,
        "blok": "G-20",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-288",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744507887026,
            0.520062871547
          ],
          [
            111.746490403721,
            0.520062871547
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-289",
      "properties": {
        "id": 284,
        "blok": "G-20",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-289",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.74478926986,
            0.520607306566
          ],
          [
            111.7471949032,
            0.520607306566
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-290",
      "properties": {
        "id": 285,
        "blok": "G-20",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-290",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744896155613,
            0.521151741585
          ],
          [
            111.749415986112,
            0.521151741585
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-291",
      "properties": {
        "id": 286,
        "blok": "G-20",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-291",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744590884264,
            0.521696176604
          ],
          [
            111.748975468672,
            0.521696176604
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-292",
      "properties": {
        "id": 287,
        "blok": "G-20",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-292",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744604840267,
            0.522240611623
          ],
          [
            111.747526083488,
            0.522240611623
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-293",
      "properties": {
        "id": 288,
        "blok": "G-20",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-293",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744589649486,
            0.522785046642
          ],
          [
            111.747958435673,
            0.522785046642
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-294",
      "properties": {
        "id": 289,
        "blok": "G-20",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-294",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744964034602,
            0.523329481661
          ],
          [
            111.748372329694,
            0.523329481661
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-295",
      "properties": {
        "id": 290,
        "blok": "G-20",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-295",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.752983984718,
            0.52387391668
          ],
          [
            111.755158176795,
            0.52387391668
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-296",
      "properties": {
        "id": 291,
        "blok": "G-20",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-296",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.746175343646,
            0.5244183517
          ],
          [
            111.748092143427,
            0.5244183517
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-297",
      "properties": {
        "id": 292,
        "blok": "F-53",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-297",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834899758275,
            0.528979970393
          ],
          [
            111.834899758275,
            0.535646280363
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-298",
      "properties": {
        "id": 293,
        "blok": "F-53",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-298",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83573507187,
            0.528180077668
          ],
          [
            111.83573507187,
            0.5370119493
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-299",
      "properties": {
        "id": 294,
        "blok": "F-53",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-299",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.835317415073,
            0.528882141913
          ],
          [
            111.835317415073,
            0.532968049937
          ],
          [
            111.835718365598,
            0.532968049937
          ],
          [
            111.835718365598,
            0.528882141913
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-300",
      "properties": {
        "id": 295,
        "blok": "D-20",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-300",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743044497044,
            0.547283419775
          ],
          [
            111.744880369545,
            0.547283419775
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-301",
      "properties": {
        "id": 296,
        "blok": "D-20",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-301",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743232064906,
            0.547968038049
          ],
          [
            111.744313993087,
            0.547968038049
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-302",
      "properties": {
        "id": 297,
        "blok": "D-20",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-302",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.742731993408,
            0.548652656324
          ],
          [
            111.74646126362,
            0.548652656324
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-303",
      "properties": {
        "id": 298,
        "blok": "D-20",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-303",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743474155469,
            0.549337274599
          ],
          [
            111.746727723562,
            0.549337274599
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-304",
      "properties": {
        "id": 299,
        "blok": "D-20",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-304",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.742877625429,
            0.550021892873
          ],
          [
            111.747263131722,
            0.550021892873
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-305",
      "properties": {
        "id": 300,
        "blok": "H-19",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-305",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.740429330724,
            0.515795702122
          ],
          [
            111.740429330724,
            0.515840878756
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-306",
      "properties": {
        "id": 301,
        "blok": "H-19",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-306",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.741267938207,
            0.514776717002
          ],
          [
            111.741267938207,
            0.516391523334
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-307",
      "properties": {
        "id": 302,
        "blok": "H-19",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-307",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.742106545691,
            0.515259751882
          ],
          [
            111.742106545691,
            0.517092888531
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-308",
      "properties": {
        "id": 303,
        "blok": "H-19",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-308",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.742945153174,
            0.514230749663
          ],
          [
            111.742945153174,
            0.517812506916
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-309",
      "properties": {
        "id": 304,
        "blok": "H-19",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-309",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743783760657,
            0.513355849152
          ],
          [
            111.743783760657,
            0.515543598273
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-310",
      "properties": {
        "id": 305,
        "blok": "H-19",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-310",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.74462236814,
            0.509860102824
          ],
          [
            111.74462236814,
            0.515409626603
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-311",
      "properties": {
        "id": 306,
        "blok": "H-19",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-311",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.745460975623,
            0.513146219022
          ],
          [
            111.745460975623,
            0.517001051679
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-312",
      "properties": {
        "id": 307,
        "blok": "H-19",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-312",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.746299583106,
            0.514762474021
          ],
          [
            111.746299583106,
            0.517532438017
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-313",
      "properties": {
        "id": 308,
        "blok": "H-19",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-313",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.74713819059,
            0.515901535947
          ],
          [
            111.74713819059,
            0.517267661947
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-314",
      "properties": {
        "id": 309,
        "blok": "D-32",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-314",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.77419802203,
            0.545002107046
          ],
          [
            111.778345797544,
            0.545002107046
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-315",
      "properties": {
        "id": 310,
        "blok": "D-32",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-315",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.773545911252,
            0.545794510832
          ],
          [
            111.775001194232,
            0.545794510832
          ],
          [
            111.776456477212,
            0.545794510832
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-316",
      "properties": {
        "id": 311,
        "blok": "D-32",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-316",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.772875533295,
            0.546586914618
          ],
          [
            111.778503793122,
            0.546586914618
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-317",
      "properties": {
        "id": 312,
        "blok": "D-32",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-317",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.773098875243,
            0.547379318404
          ],
          [
            111.774408822445,
            0.547379318404
          ],
          [
            111.775718769647,
            0.547379318404
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-318",
      "properties": {
        "id": 313,
        "blok": "D-32",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-318",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.772684858654,
            0.54817172219
          ],
          [
            111.775169530253,
            0.54817172219
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-319",
      "properties": {
        "id": 314,
        "blok": "H-22",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-319",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.749843075178,
            0.51072427937
          ],
          [
            111.751526551864,
            0.51072427937
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-320",
      "properties": {
        "id": 315,
        "blok": "H-22",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-320",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.749939489355,
            0.511630344484
          ],
          [
            111.750720550375,
            0.511630344484
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-321",
      "properties": {
        "id": 316,
        "blok": "H-22",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-321",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.749306327356,
            0.512536409599
          ],
          [
            111.75074835909,
            0.512536409599
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-322",
      "properties": {
        "id": 317,
        "blok": "H-22",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-322",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.748457273412,
            0.513442474713
          ],
          [
            111.750039210262,
            0.513442474713
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-323",
      "properties": {
        "id": 318,
        "blok": "H-22",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-323",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.750803736048,
            0.514348539827
          ],
          [
            111.751880118189,
            0.514348539827
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-324",
      "properties": {
        "id": 319,
        "blok": "H-22",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-324",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.748547100809,
            0.515254604942
          ],
          [
            111.749459847153,
            0.515254604942
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-325",
      "properties": {
        "id": 320,
        "blok": "H-22",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-325",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.755634417013,
            0.516160670056
          ],
          [
            111.756753111787,
            0.516160670056
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-326",
      "properties": {
        "id": 321,
        "blok": "H-22",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-326",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.755594227447,
            0.51706673517
          ],
          [
            111.757046648247,
            0.51706673517
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-327",
      "properties": {
        "id": 322,
        "blok": "H-22",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-327",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.755772193651,
            0.517972800285
          ],
          [
            111.760347537043,
            0.517972800285
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-328",
      "properties": {
        "id": 323,
        "blok": "F-42",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-328",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.804416863035,
            0.531867943121
          ],
          [
            111.804451863035,
            0.532909770702
          ],
          [
            111.804381863035,
            0.534141021481
          ],
          [
            111.804451863035,
            0.535182849063
          ],
          [
            111.804416863035,
            0.536603523038
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-329",
      "properties": {
        "id": 324,
        "blok": "F-42",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-329",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.806135282107,
            0.530895363292
          ],
          [
            111.806135282107,
            0.536553218228
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-330",
      "properties": {
        "id": 325,
        "blok": "H-55",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-330",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840369033527,
            0.510183741845
          ],
          [
            111.840369033527,
            0.51439929495
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-331",
      "properties": {
        "id": 326,
        "blok": "H-55",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-331",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.841509275106,
            0.509840888505
          ],
          [
            111.841509275106,
            0.518933097343
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-332",
      "properties": {
        "id": 327,
        "blok": "D-52",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-332",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.831663788142,
            0.545296268039
          ],
          [
            111.831663788142,
            0.555199928721
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-333",
      "properties": {
        "id": 328,
        "blok": "D-52",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-333",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83196027707,
            0.546916840235
          ],
          [
            111.83196027707,
            0.550001884305
          ],
          [
            111.83196027707,
            0.553086928375
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-334",
      "properties": {
        "id": 329,
        "blok": "D-52",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-334",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832256765998,
            0.545475051186
          ],
          [
            111.832256765998,
            0.555195400412
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-335",
      "properties": {
        "id": 330,
        "blok": "D-52",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-335",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832553254926,
            0.545475626665
          ],
          [
            111.832553254926,
            0.555188078417
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-336",
      "properties": {
        "id": 331,
        "blok": "D-52",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-336",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832849743854,
            0.5454733384
          ],
          [
            111.832849743854,
            0.555181336969
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-337",
      "properties": {
        "id": 332,
        "blok": "D-52",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-337",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.833146232782,
            0.54982025239
          ],
          [
            111.833146232782,
            0.551538650922
          ],
          [
            111.833146232782,
            0.553257049455
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-338",
      "properties": {
        "id": 333,
        "blok": "D-52",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-338",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83344272171,
            0.54933418684
          ],
          [
            111.83344272171,
            0.555183060455
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-339",
      "properties": {
        "id": 334,
        "blok": "E-19",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-339",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.740620235514,
            0.537115287113
          ],
          [
            111.740620235514,
            0.545079740856
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-340",
      "properties": {
        "id": 335,
        "blok": "E-19",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-340",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.741019160749,
            0.538249634325
          ],
          [
            111.741019160749,
            0.544748307129
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-341",
      "properties": {
        "id": 336,
        "blok": "E-19",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-341",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.741418085984,
            0.5371231493
          ],
          [
            111.741418085984,
            0.544661243421
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-342",
      "properties": {
        "id": 337,
        "blok": "E-19",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-342",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.741817011219,
            0.537918094226
          ],
          [
            111.741817011219,
            0.543476764153
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-343",
      "properties": {
        "id": 338,
        "blok": "E-19",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-343",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.742215936453,
            0.537131011488
          ],
          [
            111.742215936453,
            0.544043299412
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-344",
      "properties": {
        "id": 339,
        "blok": "F-18",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-344",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.738181269049,
            0.530168357223
          ],
          [
            111.738181269049,
            0.537104216075
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-345",
      "properties": {
        "id": 340,
        "blok": "F-18",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-345",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73871643967,
            0.530580271546
          ],
          [
            111.73871643967,
            0.532461202312
          ],
          [
            111.73871643967,
            0.534342133077
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-346",
      "properties": {
        "id": 341,
        "blok": "F-18",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-346",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73925161029,
            0.52972008012
          ],
          [
            111.73925161029,
            0.537105102685
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-347",
      "properties": {
        "id": 342,
        "blok": "F-18",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-347",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.739786780911,
            0.530103569248
          ],
          [
            111.739786780911,
            0.532143138376
          ],
          [
            111.739786780911,
            0.534182707505
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-348",
      "properties": {
        "id": 343,
        "blok": "F-18",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-348",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.740321951532,
            0.528937409982
          ],
          [
            111.740321951532,
            0.530056967129
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-349",
      "properties": {
        "id": 344,
        "blok": "F-18",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-349",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.740857122153,
            0.528112219035
          ],
          [
            111.740857122153,
            0.528467940295
          ],
          [
            111.740857122153,
            0.528823661555
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-350",
      "properties": {
        "id": 345,
        "blok": "F-18",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-350",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.741392292774,
            0.527980009227
          ],
          [
            111.741392292774,
            0.528984958077
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-351",
      "properties": {
        "id": 346,
        "blok": "D-50",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-351",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826114159307,
            0.546098861259
          ],
          [
            111.826114159307,
            0.555216491823
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-352",
      "properties": {
        "id": 347,
        "blok": "D-50",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-352",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826409047006,
            0.547276132407
          ],
          [
            111.826444047006,
            0.548879519228
          ],
          [
            111.826374047006,
            0.550774430925
          ],
          [
            111.826444047006,
            0.552377817746
          ],
          [
            111.826409047006,
            0.554564254319
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-353",
      "properties": {
        "id": 348,
        "blok": "D-50",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-353",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826703934705,
            0.546096690589
          ],
          [
            111.826703934705,
            0.555220010715
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-354",
      "properties": {
        "id": 349,
        "blok": "D-50",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-354",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826998822404,
            0.546095616561
          ],
          [
            111.826998822404,
            0.555218612329
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-355",
      "properties": {
        "id": 350,
        "blok": "D-50",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-355",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827293710103,
            0.546094542532
          ],
          [
            111.827293710103,
            0.555214987376
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-356",
      "properties": {
        "id": 351,
        "blok": "D-50",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-356",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827588597802,
            0.546870618381
          ],
          [
            111.827623597802,
            0.548374859468
          ],
          [
            111.827553597802,
            0.550152598934
          ],
          [
            111.827623597802,
            0.551656840021
          ],
          [
            111.827588597802,
            0.553708077867
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-357",
      "properties": {
        "id": 352,
        "blok": "D-50",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-357",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827883485501,
            0.546092870544
          ],
          [
            111.827883485501,
            0.555214904502
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-358",
      "properties": {
        "id": 353,
        "blok": "E-56",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-358",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.844120483673,
            0.537842883401
          ],
          [
            111.844120483673,
            0.543017744303
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-359",
      "properties": {
        "id": 354,
        "blok": "E-56",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-359",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.845508642843,
            0.54596536885
          ],
          [
            111.845508642843,
            0.546824692367
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-360",
      "properties": {
        "id": 355,
        "blok": "H-56",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-360",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.842971544461,
            0.513506593889
          ],
          [
            111.842971544461,
            0.515923931447
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-361",
      "properties": {
        "id": 356,
        "blok": "H-56",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-361",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.843863206175,
            0.509830811439
          ],
          [
            111.843863206175,
            0.512329491859
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-362",
      "properties": {
        "id": 357,
        "blok": "F-19",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-362",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.741046832395,
            0.52913363417
          ],
          [
            111.741046832395,
            0.537119490889
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-363",
      "properties": {
        "id": 358,
        "blok": "F-19",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-363",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.741569228366,
            0.529565400568
          ],
          [
            111.741604228366,
            0.530911234302
          ],
          [
            111.741534228366,
            0.532501765079
          ],
          [
            111.741604228366,
            0.533847598814
          ],
          [
            111.741569228366,
            0.535682826633
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-364",
      "properties": {
        "id": 359,
        "blok": "F-19",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-364",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.742091624337,
            0.528637740742
          ],
          [
            111.742091624337,
            0.53712978649
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-365",
      "properties": {
        "id": 360,
        "blok": "F-19",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-365",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.742614020308,
            0.529044674042
          ],
          [
            111.742649020308,
            0.530625314548
          ],
          [
            111.742579020308,
            0.532493344236
          ],
          [
            111.742649020308,
            0.534073984742
          ],
          [
            111.742614020308,
            0.536229403613
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-366",
      "properties": {
        "id": 361,
        "blok": "F-19",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-366",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743136416279,
            0.529174552522
          ],
          [
            111.743136416279,
            0.536480518686
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-367",
      "properties": {
        "id": 362,
        "blok": "F-19",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-367",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.74365881225,
            0.530571913764
          ],
          [
            111.74369381225,
            0.53173926075
          ],
          [
            111.74362381225,
            0.533118852642
          ],
          [
            111.74369381225,
            0.534286199628
          ],
          [
            111.74365881225,
            0.535878036427
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-368",
      "properties": {
        "id": 363,
        "blok": "F-19",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-368",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744181208221,
            0.533763031126
          ],
          [
            111.744181208221,
            0.536476945256
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-369",
      "properties": {
        "id": 364,
        "blok": "F-55",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-369",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838572676963,
            0.528978706745
          ],
          [
            111.838572676963,
            0.530226815504
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-370",
      "properties": {
        "id": 365,
        "blok": "F-55",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-370",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83936612204,
            0.528726852882
          ],
          [
            111.83936612204,
            0.529421841274
          ],
          [
            111.83936612204,
            0.530116829666
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-371",
      "properties": {
        "id": 366,
        "blok": "F-55",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-371",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840159567118,
            0.530987224262
          ],
          [
            111.840159567118,
            0.536977195225
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-372",
      "properties": {
        "id": 367,
        "blok": "F-55",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-372",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840953012195,
            0.527847747708
          ],
          [
            111.840953012195,
            0.530800903181
          ],
          [
            111.840953012195,
            0.533754058655
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-373",
      "properties": {
        "id": 368,
        "blok": "F-55",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-373",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.841746457273,
            0.530684935522
          ],
          [
            111.841746457273,
            0.536976047137
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-374",
      "properties": {
        "id": 369,
        "blok": "F-16",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-374",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.732281378218,
            0.528099030931
          ],
          [
            111.732281378218,
            0.537112523228
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-375",
      "properties": {
        "id": 370,
        "blok": "F-16",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-375",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.732696717685,
            0.529307440398
          ],
          [
            111.732696717685,
            0.536467263594
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-376",
      "properties": {
        "id": 371,
        "blok": "F-16",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-376",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.733112057153,
            0.528073061
          ],
          [
            111.733112057153,
            0.537108717719
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-377",
      "properties": {
        "id": 372,
        "blok": "F-16",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-377",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73352739662,
            0.529012616115
          ],
          [
            111.73352739662,
            0.536221886057
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-378",
      "properties": {
        "id": 373,
        "blok": "F-16",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-378",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.733942736087,
            0.527901191764
          ],
          [
            111.733942736087,
            0.537105585646
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-379",
      "properties": {
        "id": 374,
        "blok": "G-55",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-379",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840235369728,
            0.518851270674
          ],
          [
            111.840235369728,
            0.526691452997
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-380",
      "properties": {
        "id": 375,
        "blok": "G-55",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-380",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840711266138,
            0.519864708438
          ],
          [
            111.840711266138,
            0.522160368854
          ],
          [
            111.840711266138,
            0.52445602927
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-381",
      "properties": {
        "id": 376,
        "blok": "G-55",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-381",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.841187162548,
            0.51892553608
          ],
          [
            111.841187162548,
            0.526662734389
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-382",
      "properties": {
        "id": 377,
        "blok": "G-55",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-382",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.841663058957,
            0.52033818137
          ],
          [
            111.841663058957,
            0.522957857724
          ],
          [
            111.841663058957,
            0.525577534077
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-383",
      "properties": {
        "id": 378,
        "blok": "G-55",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-383",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.842138955367,
            0.518959048481
          ],
          [
            111.842138955367,
            0.526325992361
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-384",
      "properties": {
        "id": 379,
        "blok": "F-36",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-384",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.787761433382,
            0.528626861565
          ],
          [
            111.787761433382,
            0.531322494762
          ],
          [
            111.787761433382,
            0.534018127959
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-385",
      "properties": {
        "id": 380,
        "blok": "F-36",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-385",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.789409904199,
            0.527514605893
          ],
          [
            111.789409904199,
            0.530686471734
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-386",
      "properties": {
        "id": 381,
        "blok": "E-21",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-386",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.745597471674,
            0.541967157955
          ],
          [
            111.748965694904,
            0.541967157955
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-387",
      "properties": {
        "id": 382,
        "blok": "E-21",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-387",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.745812953383,
            0.542415694364
          ],
          [
            111.748756950578,
            0.542415694364
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-388",
      "properties": {
        "id": 383,
        "blok": "E-21",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-388",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.745603206755,
            0.542864230774
          ],
          [
            111.750952708925,
            0.542864230774
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-389",
      "properties": {
        "id": 384,
        "blok": "E-21",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-389",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.746225040858,
            0.543312767184
          ],
          [
            111.750299722661,
            0.543312767184
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-390",
      "properties": {
        "id": 385,
        "blok": "E-21",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-390",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.746826090387,
            0.543761303594
          ],
          [
            111.750651698202,
            0.543761303594
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-391",
      "properties": {
        "id": 386,
        "blok": "F-37",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-391",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.789477310293,
            0.530639492273
          ],
          [
            111.789477310293,
            0.534871698512
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-392",
      "properties": {
        "id": 387,
        "blok": "F-37",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-392",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.790345563779,
            0.52895853044
          ],
          [
            111.790380563779,
            0.530520061418
          ],
          [
            111.790310563779,
            0.532365507119
          ],
          [
            111.790380563779,
            0.533927038097
          ],
          [
            111.790345563779,
            0.536056398522
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-393",
      "properties": {
        "id": 388,
        "blok": "F-37",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-393",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.791213817266,
            0.527941966182
          ],
          [
            111.791213817266,
            0.537051581785
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-394",
      "properties": {
        "id": 389,
        "blok": "F-37",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-394",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.792082070752,
            0.526290150887
          ],
          [
            111.792117070752,
            0.528397285985
          ],
          [
            111.792047070752,
            0.530887536554
          ],
          [
            111.792117070752,
            0.532994671652
          ],
          [
            111.792082070752,
            0.535868037694
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-395",
      "properties": {
        "id": 390,
        "blok": "F-37",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-395",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.792950324239,
            0.525449550046
          ],
          [
            111.792950324239,
            0.526928496233
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-396",
      "properties": {
        "id": 391,
        "blok": "F-15",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-396",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726360473031,
            0.526792667536
          ],
          [
            111.726360473031,
            0.527830912719
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-397",
      "properties": {
        "id": 392,
        "blok": "F-15",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-397",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.727052620784,
            0.527060426297
          ],
          [
            111.727087620784,
            0.52720201077
          ],
          [
            111.727017620784,
            0.527369337875
          ],
          [
            111.727087620784,
            0.527510922348
          ],
          [
            111.727052620784,
            0.527703992084
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-398",
      "properties": {
        "id": 393,
        "blok": "F-15",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-398",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.727744768538,
            0.527229312693
          ],
          [
            111.727744768538,
            0.528393524598
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-399",
      "properties": {
        "id": 394,
        "blok": "F-15",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-399",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.728436916292,
            0.527215979534
          ],
          [
            111.728436916292,
            0.528969085996
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-400",
      "properties": {
        "id": 395,
        "blok": "F-15",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-400",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.729129064046,
            0.528207672764
          ],
          [
            111.729129064046,
            0.537129289875
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-401",
      "properties": {
        "id": 396,
        "blok": "F-15",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-401",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.729821211799,
            0.529239860921
          ],
          [
            111.729856211799,
            0.530703415324
          ],
          [
            111.729786211799,
            0.532433070528
          ],
          [
            111.729856211799,
            0.533896624931
          ],
          [
            111.729821211799,
            0.535892380935
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-402",
      "properties": {
        "id": 397,
        "blok": "F-15",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-402",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.730513359553,
            0.528374278242
          ],
          [
            111.730513359553,
            0.537122335756
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-403",
      "properties": {
        "id": 398,
        "blok": "F-13",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-403",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.724690071251,
            0.533687222125
          ],
          [
            111.724690071251,
            0.537135392035
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-404",
      "properties": {
        "id": 399,
        "blok": "F-13",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-404",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72545628223,
            0.533722383955
          ],
          [
            111.72545628223,
            0.536643449076
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-405",
      "properties": {
        "id": 400,
        "blok": "F-13",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-405",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726222493209,
            0.532764154761
          ],
          [
            111.726222493209,
            0.537133643073
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-406",
      "properties": {
        "id": 401,
        "blok": "F-13",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-406",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726988704188,
            0.532758506771
          ],
          [
            111.726988704188,
            0.536498171722
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-407",
      "properties": {
        "id": 402,
        "blok": "F-13",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-407",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.727754915166,
            0.532245524377
          ],
          [
            111.727754915166,
            0.537128803676
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-408",
      "properties": {
        "id": 403,
        "blok": "E-32",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-408",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.779196710747,
            0.53985374031
          ],
          [
            111.779982837179,
            0.53981874031
          ],
          [
            111.780911895689,
            0.53988874031
          ],
          [
            111.781698022121,
            0.53981874031
          ],
          [
            111.78277001271,
            0.53985374031
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-409",
      "properties": {
        "id": 404,
        "blok": "E-32",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-409",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.778990503749,
            0.542023124834
          ],
          [
            111.781429112396,
            0.542023124834
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-410",
      "properties": {
        "id": 405,
        "blok": "G-15",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-410",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.729823312285,
            0.518021832663
          ],
          [
            111.729823312285,
            0.522938063889
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-411",
      "properties": {
        "id": 406,
        "blok": "G-15",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-411",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73032509347,
            0.51820563671
          ],
          [
            111.73032509347,
            0.522178561554
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-412",
      "properties": {
        "id": 407,
        "blok": "G-15",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-412",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.730826874655,
            0.517901942048
          ],
          [
            111.730826874655,
            0.52357636699
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-413",
      "properties": {
        "id": 408,
        "blok": "G-15",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-413",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73132865584,
            0.518037646407
          ],
          [
            111.73132865584,
            0.523478542385
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-414",
      "properties": {
        "id": 409,
        "blok": "G-15",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-414",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.731830437025,
            0.518624035255
          ],
          [
            111.731830437025,
            0.522311143751
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-415",
      "properties": {
        "id": 410,
        "blok": "G-15",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-415",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73233221821,
            0.517674937742
          ],
          [
            111.73233221821,
            0.522822576354
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-416",
      "properties": {
        "id": 411,
        "blok": "G-15",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-416",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.732833999395,
            0.517743619635
          ],
          [
            111.732833999395,
            0.523098987444
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-417",
      "properties": {
        "id": 412,
        "blok": "G-15",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-417",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73333578058,
            0.51863472786
          ],
          [
            111.73333578058,
            0.521779235229
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-418",
      "properties": {
        "id": 413,
        "blok": "G-15",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-418",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.733837561765,
            0.518058146526
          ],
          [
            111.733837561765,
            0.521771582672
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-419",
      "properties": {
        "id": 414,
        "blok": "D-46",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-419",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.815642937455,
            0.546739391266
          ],
          [
            111.815642937455,
            0.550935596853
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-420",
      "properties": {
        "id": 415,
        "blok": "D-46",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-420",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.81640048907,
            0.546168758514
          ],
          [
            111.81640048907,
            0.551995064504
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-421",
      "properties": {
        "id": 416,
        "blok": "G-47",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-421",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.81833221192,
            0.523955757801
          ],
          [
            111.81833221192,
            0.527188698643
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-422",
      "properties": {
        "id": 417,
        "blok": "G-47",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-422",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.819235259816,
            0.523928997806
          ],
          [
            111.819235259816,
            0.528100242345
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-423",
      "properties": {
        "id": 418,
        "blok": "F-38",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-423",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.792947167038,
            0.527854370489
          ],
          [
            111.792947167038,
            0.537054577312
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-424",
      "properties": {
        "id": 419,
        "blok": "F-38",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-424",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.793340656244,
            0.528794778258
          ],
          [
            111.793340656244,
            0.531553840044
          ],
          [
            111.793340656244,
            0.534312901829
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-425",
      "properties": {
        "id": 420,
        "blok": "F-38",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-425",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.793734145449,
            0.52762069922
          ],
          [
            111.793734145449,
            0.537050357322
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-426",
      "properties": {
        "id": 421,
        "blok": "F-38",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-426",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.794127634655,
            0.528420264254
          ],
          [
            111.794127634655,
            0.53074007386
          ],
          [
            111.794127634655,
            0.533059883466
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-427",
      "properties": {
        "id": 422,
        "blok": "F-38",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-427",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.79452112386,
            0.527861025765
          ],
          [
            111.79452112386,
            0.537049555376
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-428",
      "properties": {
        "id": 423,
        "blok": "E-46",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-428",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.815769765811,
            0.538008729466
          ],
          [
            111.815804765811,
            0.539536647925
          ],
          [
            111.815734765811,
            0.541342369742
          ],
          [
            111.815804765811,
            0.542870288201
          ],
          [
            111.815769765811,
            0.544953813374
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-429",
      "properties": {
        "id": 424,
        "blok": "E-46",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-429",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.816693197308,
            0.537098643405
          ],
          [
            111.816693197308,
            0.546166090062
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-430",
      "properties": {
        "id": 425,
        "blok": "I-20",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-430",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744529706764,
            0.505545763211
          ],
          [
            111.744529706764,
            0.507648149111
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-431",
      "properties": {
        "id": 426,
        "blok": "I-20",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-431",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.745705093157,
            0.50575052849
          ],
          [
            111.745705093157,
            0.507554665167
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-432",
      "properties": {
        "id": 427,
        "blok": "I-20",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-432",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.746880479551,
            0.505583322058
          ],
          [
            111.746880479551,
            0.508905368305
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-433",
      "properties": {
        "id": 428,
        "blok": "I-20",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-433",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.748055865944,
            0.50439375272
          ],
          [
            111.748055865944,
            0.509941001176
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-434",
      "properties": {
        "id": 429,
        "blok": "I-20",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-434",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.749231252338,
            0.506082647179
          ],
          [
            111.749231252338,
            0.507042137278
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-435",
      "properties": {
        "id": 430,
        "blok": "I-20",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-435",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.750406638731,
            0.500641300044
          ],
          [
            111.750406638731,
            0.500789707571
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-436",
      "properties": {
        "id": 431,
        "blok": "I-20",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-436",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.751582025124,
            0.50023290524
          ],
          [
            111.751582025124,
            0.500315306922
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-437",
      "properties": {
        "id": 432,
        "blok": "I-20",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-437",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.752757411518,
            0.499716828763
          ],
          [
            111.752757411518,
            0.49978362134
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-438",
      "properties": {
        "id": 433,
        "blok": "I-20",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-438",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.753932797911,
            0.497761562749
          ],
          [
            111.753932797911,
            0.498202899367
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-439",
      "properties": {
        "id": 434,
        "blok": "E-51",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-439",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8308739623,
            0.537007089603
          ],
          [
            111.8308739623,
            0.539377653291
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-440",
      "properties": {
        "id": 435,
        "blok": "G-44",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-440",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.809939641155,
            0.517880308072
          ],
          [
            111.809939641155,
            0.520189187997
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-441",
      "properties": {
        "id": 436,
        "blok": "G-44",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-441",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.810701496418,
            0.51841290987
          ],
          [
            111.810701496418,
            0.524770578738
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-442",
      "properties": {
        "id": 437,
        "blok": "G-56",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-442",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.842858986311,
            0.51922121866
          ],
          [
            111.842858986311,
            0.528163366331
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-443",
      "properties": {
        "id": 438,
        "blok": "G-56",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-443",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.843254163648,
            0.520142690415
          ],
          [
            111.843254163648,
            0.522935381756
          ],
          [
            111.843254163648,
            0.525728073097
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-444",
      "properties": {
        "id": 439,
        "blok": "G-56",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-444",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.843649340986,
            0.518871369651
          ],
          [
            111.843649340986,
            0.52815959161
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-445",
      "properties": {
        "id": 440,
        "blok": "G-56",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-445",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.844044518324,
            0.519555699777
          ],
          [
            111.844044518324,
            0.521941668172
          ],
          [
            111.844044518324,
            0.524327636567
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-446",
      "properties": {
        "id": 441,
        "blok": "G-56",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-446",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.844439695661,
            0.51887070841
          ],
          [
            111.844439695661,
            0.528162577631
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-447",
      "properties": {
        "id": 442,
        "blok": "D-55",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-447",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.837950342118,
            0.549710102552
          ],
          [
            111.837950342118,
            0.555216241409
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-448",
      "properties": {
        "id": 443,
        "blok": "D-55",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-448",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838763700815,
            0.548842429561
          ],
          [
            111.838763700815,
            0.551264018386
          ],
          [
            111.838763700815,
            0.553685607211
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-449",
      "properties": {
        "id": 444,
        "blok": "D-55",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-449",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.839577059512,
            0.547597126423
          ],
          [
            111.839577059512,
            0.55516517563
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-450",
      "properties": {
        "id": 445,
        "blok": "D-55",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-450",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.84039041821,
            0.548712933761
          ],
          [
            111.84039041821,
            0.55118274535
          ],
          [
            111.84039041821,
            0.553652556939
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-451",
      "properties": {
        "id": 446,
        "blok": "D-55",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-451",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.841203776907,
            0.547116015886
          ],
          [
            111.841203776907,
            0.555158537163
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-452",
      "properties": {
        "id": 447,
        "blok": "D-55",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-452",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838763700815,
            0.547636346411
          ],
          [
            111.838763700815,
            0.551298289881
          ],
          [
            111.839544525165,
            0.551298289881
          ],
          [
            111.839544525165,
            0.547597187774
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-453",
      "properties": {
        "id": 448,
        "blok": "D-55",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-453",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.84039041821,
            0.547482833047
          ],
          [
            111.84039041821,
            0.551298289881
          ],
          [
            111.841171242559,
            0.551298289881
          ],
          [
            111.841171242559,
            0.547230304896
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-454",
      "properties": {
        "id": 449,
        "blok": "D-29",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-454",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.768038049434,
            0.548116985709
          ],
          [
            111.769479046969,
            0.548116985709
          ],
          [
            111.770920044504,
            0.548116985709
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-455",
      "properties": {
        "id": 450,
        "blok": "D-29",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-455",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.769356980967,
            0.55040422621
          ],
          [
            111.771597745246,
            0.55040422621
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-456",
      "properties": {
        "id": 451,
        "blok": "F-43",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-456",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.806157371247,
            0.532437329195
          ],
          [
            111.808795621679,
            0.532437329195
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-457",
      "properties": {
        "id": 452,
        "blok": "F-43",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-457",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.806979099123,
            0.533286261998
          ],
          [
            111.807540937406,
            0.533286261998
          ],
          [
            111.80810277569,
            0.533286261998
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-458",
      "properties": {
        "id": 453,
        "blok": "F-43",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-458",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.808055094352,
            0.5341351948
          ],
          [
            111.808636040446,
            0.5341351948
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-459",
      "properties": {
        "id": 454,
        "blok": "F-43",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-459",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.808157157854,
            0.534984127603
          ],
          [
            111.808538177805,
            0.534984127603
          ],
          [
            111.808919197756,
            0.534984127603
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-460",
      "properties": {
        "id": 455,
        "blok": "F-43",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-460",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.807212232161,
            0.535833060405
          ],
          [
            111.81021044859,
            0.535833060405
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-461",
      "properties": {
        "id": 456,
        "blok": "I-55",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-461",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.840322880531,
            0.502124056855
          ],
          [
            111.840322880531,
            0.508660817923
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-462",
      "properties": {
        "id": 457,
        "blok": "I-55",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-462",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.841003240883,
            0.501275303149
          ],
          [
            111.841003240883,
            0.509841940651
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-463",
      "properties": {
        "id": 458,
        "blok": "H-45",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-463",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.813650162907,
            0.515297726431
          ],
          [
            111.813685162907,
            0.515968817679
          ],
          [
            111.813615162907,
            0.516761925519
          ],
          [
            111.813685162907,
            0.517433016767
          ],
          [
            111.813650162907,
            0.518348141198
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-464",
      "properties": {
        "id": 459,
        "blok": "H-45",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-464",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.815211764157,
            0.513273689889
          ],
          [
            111.815211764157,
            0.519048614364
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-465",
      "properties": {
        "id": 460,
        "blok": "H-48",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-465",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.820708112924,
            0.509926290664
          ],
          [
            111.820708112924,
            0.517257876485
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-466",
      "properties": {
        "id": 461,
        "blok": "H-48",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-466",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821059638409,
            0.510462181251
          ],
          [
            111.821059638409,
            0.512334541783
          ],
          [
            111.821059638409,
            0.514206902314
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-467",
      "properties": {
        "id": 462,
        "blok": "H-48",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-467",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821411163894,
            0.509912833264
          ],
          [
            111.821411163894,
            0.517289824365
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-468",
      "properties": {
        "id": 463,
        "blok": "H-48",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-468",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.821762689379,
            0.510622190246
          ],
          [
            111.821762689379,
            0.512586446046
          ],
          [
            111.821762689379,
            0.514550701847
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-469",
      "properties": {
        "id": 464,
        "blok": "H-48",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-469",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.822114214865,
            0.509911379395
          ],
          [
            111.822114214865,
            0.516879022018
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-470",
      "properties": {
        "id": 465,
        "blok": "F-47",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-470",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.81861232028,
            0.529432809307
          ],
          [
            111.81864732028,
            0.530889097702
          ],
          [
            111.81857732028,
            0.532610165805
          ],
          [
            111.81864732028,
            0.5340664542
          ],
          [
            111.81861232028,
            0.536052302012
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-471",
      "properties": {
        "id": 466,
        "blok": "F-47",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-471",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.819694832346,
            0.528088275762
          ],
          [
            111.819694832346,
            0.537083628065
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-472",
      "properties": {
        "id": 467,
        "blok": "E-29",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-472",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.770160811014,
            0.542835110707
          ],
          [
            111.770445577635,
            0.542800110707
          ],
          [
            111.770782120005,
            0.542870110707
          ],
          [
            111.771066886626,
            0.542800110707
          ],
          [
            111.771455204745,
            0.542835110707
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-473",
      "properties": {
        "id": 468,
        "blok": "E-29",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-473",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.766729671137,
            0.545341601499
          ],
          [
            111.768695006251,
            0.545341601499
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-474",
      "properties": {
        "id": 469,
        "blok": "F-41",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-474",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.801039216953,
            0.52917360822
          ],
          [
            111.801039216953,
            0.537042909674
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-475",
      "properties": {
        "id": 470,
        "blok": "F-41",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-475",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.801463613702,
            0.529904614101
          ],
          [
            111.801463613702,
            0.532003384501
          ],
          [
            111.801463613702,
            0.534102154901
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-476",
      "properties": {
        "id": 471,
        "blok": "F-41",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-476",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.801888010451,
            0.529196776317
          ],
          [
            111.801888010451,
            0.537042043492
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-477",
      "properties": {
        "id": 472,
        "blok": "F-41",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-477",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8023124072,
            0.531463830565
          ],
          [
            111.8023124072,
            0.533253358605
          ],
          [
            111.8023124072,
            0.535042886646
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-478",
      "properties": {
        "id": 473,
        "blok": "F-41",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-478",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.802736803949,
            0.530665060364
          ],
          [
            111.802736803949,
            0.53396997925
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-479",
      "properties": {
        "id": 474,
        "blok": "J-25",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-479",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.754601316311,
            0.503846921478
          ],
          [
            111.754601316311,
            0.50419694845
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-480",
      "properties": {
        "id": 475,
        "blok": "J-25",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-480",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.755624759916,
            0.503286324735
          ],
          [
            111.755624759916,
            0.504449106093
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-481",
      "properties": {
        "id": 476,
        "blok": "J-25",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-481",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.756648203521,
            0.503384961035
          ],
          [
            111.756648203521,
            0.504657248154
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-482",
      "properties": {
        "id": 477,
        "blok": "J-25",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-482",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.757671647127,
            0.502794264327
          ],
          [
            111.757671647127,
            0.503877251631
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-483",
      "properties": {
        "id": 478,
        "blok": "J-25",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-483",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.758695090732,
            0.49698946952
          ],
          [
            111.758695090732,
            0.499915735559
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-484",
      "properties": {
        "id": 479,
        "blok": "J-25",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-484",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.759718534337,
            0.497846558913
          ],
          [
            111.759718534337,
            0.500280300988
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-485",
      "properties": {
        "id": 480,
        "blok": "J-25",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-485",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.760741977943,
            0.498337520142
          ],
          [
            111.760741977943,
            0.499067909936
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-486",
      "properties": {
        "id": 481,
        "blok": "E-39",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-486",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.796123395419,
            0.537599458958
          ],
          [
            111.796123395419,
            0.543406340716
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-487",
      "properties": {
        "id": 482,
        "blok": "E-39",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-487",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.796902438867,
            0.537047128952
          ],
          [
            111.796902438867,
            0.543680111434
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-488",
      "properties": {
        "id": 483,
        "blok": "E-16",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-488",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.732254274932,
            0.537112647394
          ],
          [
            111.732254274932,
            0.546191119216
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-489",
      "properties": {
        "id": 484,
        "blok": "E-16",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-489",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73255205486,
            0.537920958404
          ],
          [
            111.73255205486,
            0.540328199024
          ],
          [
            111.73255205486,
            0.542735439644
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-490",
      "properties": {
        "id": 485,
        "blok": "E-16",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-490",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.732849834789,
            0.537109919013
          ],
          [
            111.732849834789,
            0.54618559968
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-491",
      "properties": {
        "id": 486,
        "blok": "E-16",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-491",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.733147614717,
            0.538451549015
          ],
          [
            111.733147614717,
            0.541280457392
          ],
          [
            111.733147614717,
            0.544109365769
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-492",
      "properties": {
        "id": 487,
        "blok": "E-16",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-492",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.733445394646,
            0.537107190632
          ],
          [
            111.733445394646,
            0.54618007969
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-493",
      "properties": {
        "id": 488,
        "blok": "E-16",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-493",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.733743174574,
            0.538285120642
          ],
          [
            111.733743174574,
            0.540983890062
          ],
          [
            111.733743174574,
            0.543682659483
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-494",
      "properties": {
        "id": 489,
        "blok": "E-16",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-494",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.734040954503,
            0.537105896173
          ],
          [
            111.734040954503,
            0.546174560894
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-495",
      "properties": {
        "id": 490,
        "blok": "F-24",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-495",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.757903341868,
            0.5277516711
          ],
          [
            111.758818799358,
            0.5277516711
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-496",
      "properties": {
        "id": 491,
        "blok": "F-24",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-496",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.756320351879,
            0.529040262226
          ],
          [
            111.756850291938,
            0.529005262226
          ],
          [
            111.757476584735,
            0.529075262226
          ],
          [
            111.758006524794,
            0.529005262226
          ],
          [
            111.758729170329,
            0.529040262226
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-497",
      "properties": {
        "id": 492,
        "blok": "F-24",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-497",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.755813841327,
            0.530328853351
          ],
          [
            111.758626520521,
            0.530328853351
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-498",
      "properties": {
        "id": 493,
        "blok": "F-24",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-498",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.755935654586,
            0.531617444476
          ],
          [
            111.756473183894,
            0.531582444476
          ],
          [
            111.757108445804,
            0.531652444476
          ],
          [
            111.757645975112,
            0.531582444476
          ],
          [
            111.758378969623,
            0.531617444476
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-499",
      "properties": {
        "id": 494,
        "blok": "F-24",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-499",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.755247731724,
            0.532906035601
          ],
          [
            111.759294217733,
            0.532906035601
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-500",
      "properties": {
        "id": 495,
        "blok": "F-24",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-500",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.754583778888,
            0.534194626726
          ],
          [
            111.755790230865,
            0.534159626726
          ],
          [
            111.757216037746,
            0.534229626726
          ],
          [
            111.758422489722,
            0.534159626726
          ],
          [
            111.760067651507,
            0.534194626726
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-501",
      "properties": {
        "id": 496,
        "blok": "F-24",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-501",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.753722905651,
            0.535483217851
          ],
          [
            111.758569537763,
            0.535483217851
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-502",
      "properties": {
        "id": 497,
        "blok": "D-31",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-502",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.770171428343,
            0.553670322845
          ],
          [
            111.770171428343,
            0.555147061664
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-503",
      "properties": {
        "id": 498,
        "blok": "D-31",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-503",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.771837791876,
            0.549164011587
          ],
          [
            111.771837791876,
            0.556324133674
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-504",
      "properties": {
        "id": 499,
        "blok": "F-39",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-504",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.795719987896,
            0.527929144267
          ],
          [
            111.795719987896,
            0.537048334624
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-505",
      "properties": {
        "id": 500,
        "blok": "F-39",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-505",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.796110568555,
            0.529511969808
          ],
          [
            111.796110568555,
            0.532535288794
          ],
          [
            111.796110568555,
            0.53555860778
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-506",
      "properties": {
        "id": 501,
        "blok": "F-39",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-506",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.796501149213,
            0.527953178415
          ],
          [
            111.796501149213,
            0.537047538172
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-507",
      "properties": {
        "id": 502,
        "blok": "F-39",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-507",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.796891729871,
            0.5287337849
          ],
          [
            111.796891729871,
            0.531025805659
          ],
          [
            111.796891729871,
            0.533317826418
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-508",
      "properties": {
        "id": 503,
        "blok": "F-39",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-508",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.79728231053,
            0.528236882144
          ],
          [
            111.79728231053,
            0.537046741275
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-509",
      "properties": {
        "id": 504,
        "blok": "J-30",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-509",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.771365609156,
            0.489781285324
          ],
          [
            111.771365609156,
            0.497616710687
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-510",
      "properties": {
        "id": 505,
        "blok": "J-30",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-510",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.771947062049,
            0.490480660311
          ],
          [
            111.771947062049,
            0.496174090717
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-511",
      "properties": {
        "id": 506,
        "blok": "J-30",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-511",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.772528514942,
            0.48982266165
          ],
          [
            111.772528514942,
            0.496296038772
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-512",
      "properties": {
        "id": 507,
        "blok": "J-30",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-512",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.773109967835,
            0.489843350239
          ],
          [
            111.773109967835,
            0.496372981446
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-513",
      "properties": {
        "id": 508,
        "blok": "J-30",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-513",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.773691420729,
            0.489864038475
          ],
          [
            111.773691420729,
            0.495771148597
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-514",
      "properties": {
        "id": 509,
        "blok": "J-30",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-514",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.774272873622,
            0.490205407014
          ],
          [
            111.774272873622,
            0.494423816268
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-515",
      "properties": {
        "id": 510,
        "blok": "J-30",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-515",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.774854326515,
            0.489905413974
          ],
          [
            111.774854326515,
            0.495843837864
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-516",
      "properties": {
        "id": 511,
        "blok": "E-47",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-516",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.818276131031,
            0.538210252916
          ],
          [
            111.818311131031,
            0.5397911136
          ],
          [
            111.818241131031,
            0.5416594035
          ],
          [
            111.818311131031,
            0.543240264184
          ],
          [
            111.818276131031,
            0.545395983299
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-517",
      "properties": {
        "id": 512,
        "blok": "E-47",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-517",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.819067522757,
            0.537086434446
          ],
          [
            111.819067522757,
            0.546148156182
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-518",
      "properties": {
        "id": 513,
        "blok": "E-20",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-518",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743463850085,
            0.541789980034
          ],
          [
            111.743463850085,
            0.544233062861
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-519",
      "properties": {
        "id": 514,
        "blok": "E-20",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-519",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743903338405,
            0.542635461631
          ],
          [
            111.743903338405,
            0.54452279677
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-520",
      "properties": {
        "id": 515,
        "blok": "E-20",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-520",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744342826725,
            0.542330344578
          ],
          [
            111.744342826725,
            0.54583507588
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-521",
      "properties": {
        "id": 516,
        "blok": "E-20",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-521",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.744782315045,
            0.542688817484
          ],
          [
            111.744782315045,
            0.545584582867
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-522",
      "properties": {
        "id": 517,
        "blok": "E-20",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-522",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.745221803365,
            0.541405066632
          ],
          [
            111.745221803365,
            0.545867995308
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-523",
      "properties": {
        "id": 518,
        "blok": "J-32",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-523",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.776921427487,
            0.489978960251
          ],
          [
            111.776921427487,
            0.496597383966
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-524",
      "properties": {
        "id": 519,
        "blok": "J-32",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-524",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.777488385485,
            0.490691571928
          ],
          [
            111.777488385485,
            0.492213285619
          ],
          [
            111.777488385485,
            0.493734999311
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-525",
      "properties": {
        "id": 520,
        "blok": "J-32",
        "tanggal": 22,
        "bulan": "sep",
        "track_id": "tnke-line-525",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-22",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.778055343482,
            0.490019304747
          ],
          [
            111.778055343482,
            0.494961167973
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-526",
      "properties": {
        "id": 521,
        "blok": "J-32",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-526",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.77862230148,
            0.490181650389
          ],
          [
            111.77862230148,
            0.494879966431
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-527",
      "properties": {
        "id": 522,
        "blok": "J-32",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-527",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.779189259478,
            0.497203753204
          ],
          [
            111.779189259478,
            0.497769324686
          ],
          [
            111.779189259478,
            0.498334896169
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-528",
      "properties": {
        "id": 523,
        "blok": "J-32",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-528",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.779756217475,
            0.497476812405
          ],
          [
            111.779756217475,
            0.498856259234
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-529",
      "properties": {
        "id": 524,
        "blok": "J-32",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-529",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.780323175473,
            0.497489566995
          ],
          [
            111.780323175473,
            0.498089906912
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-530",
      "properties": {
        "id": 525,
        "blok": "J-32",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-530",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.780890133471,
            0.496539689663
          ],
          [
            111.780890133471,
            0.496975001608
          ],
          [
            111.780890133471,
            0.497410313554
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-531",
      "properties": {
        "id": 526,
        "blok": "J-32",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-531",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.781457091468,
            0.496097943669
          ],
          [
            111.781457091468,
            0.498159850625
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-532",
      "properties": {
        "id": 527,
        "blok": "I-54",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-532",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.837435442925,
            0.502007469093
          ],
          [
            111.837435442925,
            0.5084347937
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-533",
      "properties": {
        "id": 528,
        "blok": "I-54",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-533",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838339413427,
            0.503441489346
          ],
          [
            111.838339413427,
            0.509848474248
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-534",
      "properties": {
        "id": 529,
        "blok": "I-49",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-534",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823310485642,
            0.504421728676
          ],
          [
            111.823774285021,
            0.504485315467
          ],
          [
            111.824206311762,
            0.504415315467
          ],
          [
            111.824795439137,
            0.504450315467
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-535",
      "properties": {
        "id": 530,
        "blok": "I-49",
        "tanggal": 14,
        "bulan": "sep",
        "track_id": "tnke-line-535",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-14",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.820100428541,
            0.506860494106
          ],
          [
            111.825274571269,
            0.506860494106
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-536",
      "properties": {
        "id": 531,
        "blok": "D-47",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-536",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.81835514343,
            0.546848423332
          ],
          [
            111.81835514343,
            0.552355511963
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-537",
      "properties": {
        "id": 532,
        "blok": "D-47",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-537",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.819153413197,
            0.546147553295
          ],
          [
            111.819153413197,
            0.555253600515
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-538",
      "properties": {
        "id": 533,
        "blok": "G-13",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-538",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72516922837,
            0.519327548358
          ],
          [
            111.72516922837,
            0.526047050901
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-539",
      "properties": {
        "id": 534,
        "blok": "G-13",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-539",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.725732780342,
            0.519627637652
          ],
          [
            111.725732780342,
            0.523153860973
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-540",
      "properties": {
        "id": 535,
        "blok": "G-13",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-540",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726296332313,
            0.519098145196
          ],
          [
            111.726296332313,
            0.523750949554
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-541",
      "properties": {
        "id": 536,
        "blok": "G-13",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-541",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726859884285,
            0.519491985259
          ],
          [
            111.726859884285,
            0.523207932743
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-542",
      "properties": {
        "id": 537,
        "blok": "G-13",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-542",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.727423436256,
            0.519731541556
          ],
          [
            111.727423436256,
            0.522783433015
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-543",
      "properties": {
        "id": 538,
        "blok": "G-13",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-543",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.727986988228,
            0.519933575424
          ],
          [
            111.727986988228,
            0.521288897481
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-544",
      "properties": {
        "id": 539,
        "blok": "G-13",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-544",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.728550540199,
            0.519500356904
          ],
          [
            111.728550540199,
            0.521784836965
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-545",
      "properties": {
        "id": 540,
        "blok": "G-53",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-545",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.833314612289,
            0.523594573615
          ],
          [
            111.833314612289,
            0.526243606982
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-546",
      "properties": {
        "id": 541,
        "blok": "G-53",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-546",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834018037785,
            0.523153288186
          ],
          [
            111.834018037785,
            0.524035414662
          ],
          [
            111.834018037785,
            0.524917541139
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-547",
      "properties": {
        "id": 542,
        "blok": "G-53",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-547",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834721463281,
            0.521911555842
          ],
          [
            111.834721463281,
            0.525119036308
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-548",
      "properties": {
        "id": 543,
        "blok": "G-53",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-548",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.835424888777,
            0.51976309826
          ],
          [
            111.835424888777,
            0.521409450302
          ],
          [
            111.835424888777,
            0.523055802345
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-549",
      "properties": {
        "id": 544,
        "blok": "G-53",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-549",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.836128314272,
            0.518919225755
          ],
          [
            111.836128314272,
            0.523272037348
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-550",
      "properties": {
        "id": 545,
        "blok": "G-54",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-550",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.837728654507,
            0.522792993785
          ],
          [
            111.837728654507,
            0.527183086612
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-551",
      "properties": {
        "id": 546,
        "blok": "G-54",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-551",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838543281913,
            0.523513525177
          ],
          [
            111.838543281913,
            0.528165231537
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-552",
      "properties": {
        "id": 547,
        "blok": "C-27",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-552",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.759266659597,
            0.556928805438
          ],
          [
            111.759266659597,
            0.557296053857
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-553",
      "properties": {
        "id": 548,
        "blok": "C-27",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-553",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.760862871641,
            0.563288119846
          ],
          [
            111.760862871641,
            0.563356504736
          ],
          [
            111.760862871641,
            0.563424889626
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-554",
      "properties": {
        "id": 549,
        "blok": "C-27",
        "tanggal": 21,
        "bulan": "sep",
        "track_id": "tnke-line-554",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-21",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.762459083686,
            0.558852812611
          ],
          [
            111.762459083686,
            0.560606903023
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-555",
      "properties": {
        "id": 550,
        "blok": "C-27",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-555",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.764055295731,
            0.557592226374
          ],
          [
            111.764055295731,
            0.557714884506
          ],
          [
            111.764055295731,
            0.557837542638
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-556",
      "properties": {
        "id": 551,
        "blok": "C-27",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-556",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.765651507775,
            0.556693091369
          ],
          [
            111.765651507775,
            0.556783601369
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-557",
      "properties": {
        "id": 552,
        "blok": "E-13",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-557",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.723491230491,
            0.538320177953
          ],
          [
            111.728962302313,
            0.538320177953
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-558",
      "properties": {
        "id": 553,
        "blok": "E-13",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-558",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.723760207228,
            0.539079125189
          ],
          [
            111.727229663944,
            0.539079125189
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-559",
      "properties": {
        "id": 554,
        "blok": "E-13",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-559",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.72349276879,
            0.539838072424
          ],
          [
            111.727471506893,
            0.539838072424
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-560",
      "properties": {
        "id": 555,
        "blok": "E-13",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-560",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.723704922235,
            0.54059701966
          ],
          [
            111.726485586564,
            0.54059701966
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-561",
      "properties": {
        "id": 556,
        "blok": "E-13",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-561",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726243837644,
            0.541355966895
          ],
          [
            111.727626894692,
            0.541355966895
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-562",
      "properties": {
        "id": 557,
        "blok": "E-53",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-562",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834848674247,
            0.537015038652
          ],
          [
            111.834848674247,
            0.546095545685
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-563",
      "properties": {
        "id": 558,
        "blok": "E-53",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-563",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83549527548,
            0.538098466321
          ],
          [
            111.83553027548,
            0.539681550007
          ],
          [
            111.83546027548,
            0.54155246709
          ],
          [
            111.83553027548,
            0.543135550776
          ],
          [
            111.83549527548,
            0.545294301257
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-564",
      "properties": {
        "id": 559,
        "blok": "E-53",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-564",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.836141876713,
            0.537010530961
          ],
          [
            111.836141876713,
            0.54616685834
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-565",
      "properties": {
        "id": 560,
        "blok": "E-53",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-565",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.836788477946,
            0.537131121974
          ],
          [
            111.836823477946,
            0.537446497567
          ],
          [
            111.836753477946,
            0.537819214177
          ],
          [
            111.836823477946,
            0.53813458977
          ],
          [
            111.836788477946,
            0.538564647397
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-566",
      "properties": {
        "id": 561,
        "blok": "E-53",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-566",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.837435079179,
            0.537077234688
          ],
          [
            111.837435079179,
            0.538853000749
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-567",
      "properties": {
        "id": 562,
        "blok": "H-14",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-567",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.738093650263,
            0.508506174084
          ],
          [
            111.738810924174,
            0.508506174084
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-568",
      "properties": {
        "id": 563,
        "blok": "H-14",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-568",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.734185020698,
            0.509961020917
          ],
          [
            111.73592244858,
            0.509961020917
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-569",
      "properties": {
        "id": 564,
        "blok": "H-14",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-569",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735774813025,
            0.51141586775
          ],
          [
            111.737775297657,
            0.51141586775
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-570",
      "properties": {
        "id": 565,
        "blok": "H-14",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-570",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73657053648,
            0.512870714583
          ],
          [
            111.737190520746,
            0.512870714583
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-571",
      "properties": {
        "id": 566,
        "blok": "H-14",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-571",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.726979815612,
            0.514325561415
          ],
          [
            111.72960409763,
            0.514325561415
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-572",
      "properties": {
        "id": 567,
        "blok": "H-14",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-572",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.727527931418,
            0.515780408248
          ],
          [
            111.729701612082,
            0.515780408248
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-573",
      "properties": {
        "id": 568,
        "blok": "H-14",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-573",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.727158101945,
            0.517235255081
          ],
          [
            111.72897173695,
            0.517235255081
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-574",
      "properties": {
        "id": 569,
        "blok": "D-44",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-574",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.809267426042,
            0.541051031281
          ],
          [
            111.809302426042,
            0.541568731187
          ],
          [
            111.809232426042,
            0.542180558348
          ],
          [
            111.809302426042,
            0.542698258254
          ],
          [
            111.809267426042,
            0.543404212671
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-575",
      "properties": {
        "id": 570,
        "blok": "D-44",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-575",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.810379652905,
            0.537135407
          ],
          [
            111.810379652905,
            0.544653677612
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-576",
      "properties": {
        "id": 571,
        "blok": "E-57",
        "tanggal": 1,
        "bulan": "sep",
        "track_id": "tnke-line-576",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-01",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.846474839897,
            0.53696145861
          ],
          [
            111.846474839897,
            0.5436300307
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-577",
      "properties": {
        "id": 572,
        "blok": "F-51",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-577",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.82890292585,
            0.528130822854
          ],
          [
            111.82890292585,
            0.537035965202
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-578",
      "properties": {
        "id": 573,
        "blok": "F-51",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-578",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829295222937,
            0.528864788434
          ],
          [
            111.829295222937,
            0.531185175728
          ],
          [
            111.829295222937,
            0.533505563022
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-579",
      "properties": {
        "id": 574,
        "blok": "F-51",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-579",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829687520024,
            0.528123798767
          ],
          [
            111.829687520024,
            0.537028231816
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-580",
      "properties": {
        "id": 575,
        "blok": "F-51",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-580",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.830079817112,
            0.529483995949
          ],
          [
            111.830079817112,
            0.532291994333
          ],
          [
            111.830079817112,
            0.535099992718
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-581",
      "properties": {
        "id": 576,
        "blok": "F-51",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-581",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.830472114199,
            0.528124737241
          ],
          [
            111.830472114199,
            0.537019031445
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-582",
      "properties": {
        "id": 577,
        "blok": "F-40",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-582",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.798914167761,
            0.52917434281
          ],
          [
            111.798914167761,
            0.535269975221
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-583",
      "properties": {
        "id": 578,
        "blok": "F-40",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-583",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.799715319539,
            0.528670897506
          ],
          [
            111.799715319539,
            0.537044259626
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-584",
      "properties": {
        "id": 579,
        "blok": "F-52",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-584",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.831344060983,
            0.528502965115
          ],
          [
            111.831344060983,
            0.536812587287
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-585",
      "properties": {
        "id": 580,
        "blok": "F-52",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-585",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.831798757206,
            0.529156405632
          ],
          [
            111.831833757206,
            0.530457458451
          ],
          [
            111.831763757206,
            0.531995066328
          ],
          [
            111.831833757206,
            0.533296119147
          ],
          [
            111.831798757206,
            0.535070282082
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-586",
      "properties": {
        "id": 581,
        "blok": "F-52",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-586",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832253453429,
            0.528755951749
          ],
          [
            111.832253453429,
            0.536834757414
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-587",
      "properties": {
        "id": 582,
        "blok": "F-52",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-587",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.832708149652,
            0.529224740633
          ],
          [
            111.832743149652,
            0.530524288006
          ],
          [
            111.832673149652,
            0.53206011672
          ],
          [
            111.832743149652,
            0.533359664093
          ],
          [
            111.832708149652,
            0.535131774148
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-588",
      "properties": {
        "id": 583,
        "blok": "F-52",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-588",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.833162845875,
            0.528496029362
          ],
          [
            111.833162845875,
            0.537011062625
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-589",
      "properties": {
        "id": 584,
        "blok": "D-51",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-589",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.829407644005,
            0.547808232801
          ],
          [
            111.829407644005,
            0.553997120938
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-590",
      "properties": {
        "id": 585,
        "blok": "D-51",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-590",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.830220376899,
            0.543598429951
          ],
          [
            111.830220376899,
            0.555210562667
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-591",
      "properties": {
        "id": 586,
        "blok": "I-53",
        "tanggal": 29,
        "bulan": "sep",
        "track_id": "tnke-line-591",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-29",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.834947516309,
            0.502025850096
          ],
          [
            111.834947516309,
            0.5084787992
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-592",
      "properties": {
        "id": 587,
        "blok": "I-53",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-592",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.835719639712,
            0.501280025249
          ],
          [
            111.835719639712,
            0.509845772843
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-593",
      "properties": {
        "id": 588,
        "blok": "E-18",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-593",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.737882436645,
            0.537104403993
          ],
          [
            111.737882436645,
            0.545085740526
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-594",
      "properties": {
        "id": 589,
        "blok": "E-18",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-594",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.738285202968,
            0.538136014437
          ],
          [
            111.738285202968,
            0.54454088192
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-595",
      "properties": {
        "id": 590,
        "blok": "E-18",
        "tanggal": 2,
        "bulan": "sep",
        "track_id": "tnke-line-595",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-02",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.738687969291,
            0.53710389744
          ],
          [
            111.738687969291,
            0.545226969095
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-596",
      "properties": {
        "id": 591,
        "blok": "E-18",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-596",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.739090735615,
            0.537810550623
          ],
          [
            111.739090735615,
            0.543918811774
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-597",
      "properties": {
        "id": 592,
        "blok": "E-18",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-597",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.739493501938,
            0.537106522217
          ],
          [
            111.739493501938,
            0.545215618246
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-598",
      "properties": {
        "id": 593,
        "blok": "G-16",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-598",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.738062336591,
            0.519845193175
          ],
          [
            111.740591885756,
            0.519845193175
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-599",
      "properties": {
        "id": 594,
        "blok": "G-16",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-599",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.738488070432,
            0.520663128971
          ],
          [
            111.739087801065,
            0.520663128971
          ],
          [
            111.739687531698,
            0.520663128971
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-600",
      "properties": {
        "id": 595,
        "blok": "G-16",
        "tanggal": 30,
        "bulan": "sep",
        "track_id": "tnke-line-600",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-30",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.73896136274,
            0.521481064767
          ],
          [
            111.740134450866,
            0.521481064767
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-601",
      "properties": {
        "id": 596,
        "blok": "G-16",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-601",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.735837026907,
            0.522299000564
          ],
          [
            111.737332826285,
            0.522299000564
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-602",
      "properties": {
        "id": 597,
        "blok": "G-16",
        "tanggal": 8,
        "bulan": "sep",
        "track_id": "tnke-line-602",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-08",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743874760215,
            0.52311693636
          ],
          [
            111.744204854136,
            0.52311693636
          ],
          [
            111.744534948057,
            0.52311693636
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-603",
      "properties": {
        "id": 598,
        "blok": "G-16",
        "tanggal": 18,
        "bulan": "sep",
        "track_id": "tnke-line-603",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-18",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.733385843278,
            0.523934872156
          ],
          [
            111.736185134794,
            0.523934872156
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-604",
      "properties": {
        "id": 599,
        "blok": "G-16",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-604",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743322117102,
            0.524752807953
          ],
          [
            111.746143384621,
            0.524752807953
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-605",
      "properties": {
        "id": 600,
        "blok": "G-16",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-605",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743953076302,
            0.525570743749
          ],
          [
            111.744567132612,
            0.525570743749
          ],
          [
            111.745181188922,
            0.525570743749
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-606",
      "properties": {
        "id": 601,
        "blok": "G-16",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-606",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.743717642104,
            0.526388679545
          ],
          [
            111.746044683128,
            0.526388679545
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-607",
      "properties": {
        "id": 602,
        "blok": "F-49",
        "tanggal": 25,
        "bulan": "sep",
        "track_id": "tnke-line-607",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-25",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823320212099,
            0.528150385648
          ],
          [
            111.823320212099,
            0.537067970773
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-608",
      "properties": {
        "id": 603,
        "blok": "F-49",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-608",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823721291799,
            0.529007838675
          ],
          [
            111.823721291799,
            0.53142364708
          ],
          [
            111.823721291799,
            0.533839455484
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-609",
      "properties": {
        "id": 604,
        "blok": "F-49",
        "tanggal": 16,
        "bulan": "sep",
        "track_id": "tnke-line-609",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-16",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824122371499,
            0.528145617769
          ],
          [
            111.824122371499,
            0.537063797195
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-610",
      "properties": {
        "id": 605,
        "blok": "F-49",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-610",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824523451199,
            0.529351162785
          ],
          [
            111.824523451199,
            0.532048515816
          ],
          [
            111.824523451199,
            0.534745868846
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-611",
      "properties": {
        "id": 606,
        "blok": "F-49",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-611",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.8249245309,
            0.528128672833
          ],
          [
            111.8249245309,
            0.537049600838
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-612",
      "properties": {
        "id": 607,
        "blok": "F-49",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-612",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.823721291799,
            0.52883615267
          ],
          [
            111.823721291799,
            0.532971310432
          ],
          [
            111.824106328311,
            0.532971310432
          ],
          [
            111.824106328311,
            0.52883615267
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-613",
      "properties": {
        "id": 608,
        "blok": "F-49",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-613",
        "activity_id": 3,
        "activity_name": "Pengancakan",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_pengancakan_u_pattern"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.824523451199,
            0.52883615267
          ],
          [
            111.824523451199,
            0.532971310432
          ],
          [
            111.824908487712,
            0.532971310432
          ],
          [
            111.824908487712,
            0.52883615267
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-614",
      "properties": {
        "id": 609,
        "blok": "H-50",
        "tanggal": 12,
        "bulan": "sep",
        "track_id": "tnke-line-614",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-12",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.825980670064,
            0.5099145992
          ],
          [
            111.825980670064,
            0.516326131247
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-615",
      "properties": {
        "id": 610,
        "blok": "H-50",
        "tanggal": 19,
        "bulan": "sep",
        "track_id": "tnke-line-615",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-19",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826442428824,
            0.510942804648
          ],
          [
            111.826442428824,
            0.512984671921
          ],
          [
            111.826442428824,
            0.515026539195
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-616",
      "properties": {
        "id": 611,
        "blok": "H-50",
        "tanggal": 15,
        "bulan": "sep",
        "track_id": "tnke-line-616",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-15",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.826904187584,
            0.509916932856
          ],
          [
            111.826904187584,
            0.516040070962
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-617",
      "properties": {
        "id": 612,
        "blok": "H-50",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-617",
        "activity_id": 4,
        "activity_name": "Inspeksi Upkeep",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827365946343,
            0.510987996105
          ],
          [
            111.827365946343,
            0.512967532594
          ],
          [
            111.827365946343,
            0.514947069082
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-618",
      "properties": {
        "id": 613,
        "blok": "H-50",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-618",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.827827705103,
            0.509910113529
          ],
          [
            111.827827705103,
            0.515238343268
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-619",
      "properties": {
        "id": 614,
        "blok": "F-33",
        "tanggal": 9,
        "bulan": "sep",
        "track_id": "tnke-line-619",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-09",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.779784305576,
            0.529819176096
          ],
          [
            111.780900356339,
            0.529819176096
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-620",
      "properties": {
        "id": 615,
        "blok": "F-33",
        "tanggal": 23,
        "bulan": "sep",
        "track_id": "tnke-line-620",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-23",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.780084250207,
            0.531131242365
          ],
          [
            111.780703605791,
            0.531096242365
          ],
          [
            111.78143557148,
            0.531166242365
          ],
          [
            111.782054927064,
            0.531096242365
          ],
          [
            111.782899502859,
            0.531131242365
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-621",
      "properties": {
        "id": 616,
        "blok": "F-33",
        "tanggal": 11,
        "bulan": "sep",
        "track_id": "tnke-line-621",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-11",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.780894607167,
            0.532443308634
          ],
          [
            111.78565050715,
            0.532443308634
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-622",
      "properties": {
        "id": 617,
        "blok": "F-33",
        "tanggal": 4,
        "bulan": "sep",
        "track_id": "tnke-line-622",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-04",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.781896527381,
            0.533755374903
          ],
          [
            111.782671387566,
            0.533720374903
          ],
          [
            111.783587131422,
            0.533790374903
          ],
          [
            111.784361991607,
            0.533720374903
          ],
          [
            111.785418619132,
            0.533755374903
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-623",
      "properties": {
        "id": 618,
        "blok": "F-33",
        "tanggal": 26,
        "bulan": "sep",
        "track_id": "tnke-line-623",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-26",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.780609717642,
            0.535067441172
          ],
          [
            111.786082822439,
            0.535067441172
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-624",
      "properties": {
        "id": 619,
        "blok": "F-54",
        "tanggal": 10,
        "bulan": "sep",
        "track_id": "tnke-line-624",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-10",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.837116739006,
            0.528173179138
          ],
          [
            111.837116739006,
            0.537007132255
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-625",
      "properties": {
        "id": 620,
        "blok": "F-54",
        "tanggal": 7,
        "bulan": "sep",
        "track_id": "tnke-line-625",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-07",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.837725074864,
            0.530710568503
          ],
          [
            111.837760074864,
            0.53194206
          ],
          [
            111.837690074864,
            0.533397459042
          ],
          [
            111.837760074864,
            0.534628950539
          ],
          [
            111.837725074864,
            0.536308257126
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-626",
      "properties": {
        "id": 621,
        "blok": "F-54",
        "tanggal": 5,
        "bulan": "sep",
        "track_id": "tnke-line-626",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-05",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838333410723,
            0.530084386912
          ],
          [
            111.838333410723,
            0.536993115705
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-627",
      "properties": {
        "id": 622,
        "blok": "F-54",
        "tanggal": 28,
        "bulan": "sep",
        "track_id": "tnke-line-627",
        "activity_id": 1,
        "activity_name": "Blok Checklist",
        "date": "2026-09-28",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838941746581,
            0.531052050499
          ],
          [
            111.838976746581,
            0.532075888979
          ],
          [
            111.838906746581,
            0.533285879909
          ],
          [
            111.838976746581,
            0.534309718389
          ],
          [
            111.838941746581,
            0.535705861771
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-628",
      "properties": {
        "id": 623,
        "blok": "F-54",
        "tanggal": 24,
        "bulan": "sep",
        "track_id": "tnke-line-628",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-24",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.83955008244,
            0.531489782561
          ],
          [
            111.83955008244,
            0.534465903415
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-629",
      "properties": {
        "id": 624,
        "blok": "E-54",
        "tanggal": 3,
        "bulan": "sep",
        "track_id": "tnke-line-629",
        "activity_id": 5,
        "activity_name": "Inspeksi Pemupukan",
        "date": "2026-09-03",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.837146639124,
            0.539735232266
          ],
          [
            111.837146639124,
            0.54885209169
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "tnke-line-630",
      "properties": {
        "id": 625,
        "blok": "E-54",
        "tanggal": 17,
        "bulan": "sep",
        "track_id": "tnke-line-630",
        "activity_id": 2,
        "activity_name": "IPD Panen",
        "date": "2026-09-17",
        "year_assumed": true,
        "buffer_m": 24,
        "is_simulation": true,
        "source_note": "generated_60pct_ipd_proportional"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            111.838219392145,
            0.538137490305
          ],
          [
            111.838219392145,
            0.548104569295
          ]
        ]
      }
    }
  ]
};
})();
