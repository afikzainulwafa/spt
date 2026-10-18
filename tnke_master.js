/**
 * TNKE Master Block Normalization Engine
 * Smart Problem Tagging (SPT) — Revamp Phase 1 & 2
 * Reads TNKE.json / window.TNKE_GEOJSON and produces a clean, normalized 133 agricultural block master dataset
 * matched with authoritative operational hectares from the attachment table.
 */

(function () {
  'use strict';

  // Master Operational Data for 133 Blocks from Attachment Table
  var ATTACHMENT_BLOCK_DATA = {
    "TNKE|DIVISI 1|F-40": { areaHa: 20.38, komplek: "09G34", fullCode: "TNKE1F-40", tahunTanam: 2009, bmPct: 74, tonHa: 19.94 },
    "TNKE|DIVISI 1|D-48": { areaHa: 26.57, komplek: "09G02", fullCode: "TNKE1D-48", tahunTanam: 2009, bmPct: 69, tonHa: 17.0 },
    "TNKE|DIVISI 1|F-33": { areaHa: 26.99, komplek: "12D38", fullCode: "TNKE1F-33", tahunTanam: 2012, bmPct: 69, tonHa: 18.07 },
    "TNKE|DIVISI 1|F-36": { areaHa: 24.52, komplek: "09G34", fullCode: "TNKE1F-36", tahunTanam: 2009, bmPct: 68, tonHa: 18.62 },
    "TNKE|DIVISI 1|C-27": { areaHa: 6.04, komplek: "12D38", fullCode: "TNKE1C-27", tahunTanam: 2012, bmPct: 26, tonHa: 7.26 },
    "TNKE|DIVISI 1|C-29": { areaHa: 12.42, komplek: "12D38", fullCode: "TNKE1C-29", tahunTanam: 2012, bmPct: 59, tonHa: 15.83 },
    "TNKE|DIVISI 1|D-31": { areaHa: 15.91, komplek: "12D38", fullCode: "TNKE1D-31", tahunTanam: 2012, bmPct: 45, tonHa: 12.37 },
    "TNKE|DIVISI 1|E-41": { areaHa: 13.96, komplek: "09G34", fullCode: "TNKE1E-41", tahunTanam: 2009, bmPct: 53, tonHa: 15.24 },
    "TNKE|DIVISI 1|E-29": { areaHa: 29.24, komplek: "12D38", fullCode: "TNKE1E-29", tahunTanam: 2012, bmPct: 48, tonHa: 12.4 },
    "TNKE|DIVISI 1|E-32": { areaHa: 33.43, komplek: "12D38", fullCode: "TNKE1E-32", tahunTanam: 2012, bmPct: 67, tonHa: 17.77 },
    "TNKE|DIVISI 1|D-45": { areaHa: 38.48, komplek: "09G02", fullCode: "TNKE1D-45", tahunTanam: 2009, bmPct: 62, tonHa: 17.29 },
    "TNKE|DIVISI 1|F-44": { areaHa: 17.38, komplek: "09G02", fullCode: "TNKE1F-44", tahunTanam: 2009, bmPct: 57, tonHa: 15.94 },
    "TNKE|DIVISI 1|D-44": { areaHa: 28.65, komplek: "09G02", fullCode: "TNKE1D-44", tahunTanam: 2009, bmPct: 68, tonHa: 18.58 },
    "TNKE|DIVISI 1|E-36": { areaHa: 33.44, komplek: "09G34", fullCode: "TNKE1E-36", tahunTanam: 2009, bmPct: 64, tonHa: 17.24 },
    "TNKE|DIVISI 1|F-42": { areaHa: 9.52, komplek: "09G34", fullCode: "TNKE1F-42", tahunTanam: 2009, bmPct: 65, tonHa: 15.58 },
    "TNKE|DIVISI 1|D-47": { areaHa: 25.33, komplek: "09G02", fullCode: "TNKE1D-47", tahunTanam: 2009, bmPct: 78, tonHa: 21.21 },
    "TNKE|DIVISI 1|F-46": { areaHa: 19.26, komplek: "09G02", fullCode: "TNKE1F-46", tahunTanam: 2009, bmPct: 73, tonHa: 21.16 },
    "TNKE|DIVISI 1|E-48": { areaHa: 24.38, komplek: "09G02", fullCode: "TNKE1E-48", tahunTanam: 2009, bmPct: 82, tonHa: 18.57 },
    "TNKE|DIVISI 1|F-34": { areaHa: 25.27, komplek: "12D38", fullCode: "TNKE1F-34", tahunTanam: 2012, bmPct: 58, tonHa: 14.98 },
    "TNKE|DIVISI 1|F-47": { areaHa: 20.04, komplek: "09G02", fullCode: "TNKE1F-47", tahunTanam: 2009, bmPct: 78, tonHa: 22.17 },
    "TNKE|DIVISI 1|F-37": { areaHa: 35.32, komplek: "09G34", fullCode: "TNKE1F-37", tahunTanam: 2009, bmPct: 84, tonHa: 20.64 },
    "TNKE|DIVISI 1|E-40": { areaHa: 19.48, komplek: "09G34", fullCode: "TNKE1E-40", tahunTanam: 2009, bmPct: 75, tonHa: 19.16 },
    "TNKE|DIVISI 1|F-48": { areaHa: 18.37, komplek: "09G02", fullCode: "TNKE1F-48", tahunTanam: 2009, bmPct: 69, tonHa: 18.12 },
    "TNKE|DIVISI 1|D-29": { areaHa: 26.64, komplek: "12D38", fullCode: "TNKE1D-29", tahunTanam: 2012, bmPct: 73, tonHa: 19.79 },
    "TNKE|DIVISI 1|F-41": { areaHa: 19.95, komplek: "09G34", fullCode: "TNKE1F-41", tahunTanam: 2009, bmPct: 83, tonHa: 22.44 },
    "TNKE|DIVISI 1|E-47": { areaHa: 20.41, komplek: "09G02", fullCode: "TNKE1E-47", tahunTanam: 2009, bmPct: 85, tonHa: 23.27 },
    "TNKE|DIVISI 1|E-46": { areaHa: 19.85, komplek: "09G02", fullCode: "TNKE1E-46", tahunTanam: 2009, bmPct: 73, tonHa: 20.61 },
    "TNKE|DIVISI 1|D-32": { areaHa: 10.7, komplek: "12D38", fullCode: "TNKE1D-32", tahunTanam: 2012, bmPct: 62, tonHa: 17.04 },
    "TNKE|DIVISI 1|F-38": { areaHa: 30.64, komplek: "09G34", fullCode: "TNKE1F-38", tahunTanam: 2009, bmPct: 83, tonHa: 22.38 },
    "TNKE|DIVISI 1|E-43": { areaHa: 21.6, komplek: "09G34", fullCode: "TNKE1E-43", tahunTanam: 2009, bmPct: 82, tonHa: 22.54 },
    "TNKE|DIVISI 1|E-38": { areaHa: 26.9, komplek: "09G34", fullCode: "TNKE1E-38", tahunTanam: 2009, bmPct: 81, tonHa: 21.95 },
    "TNKE|DIVISI 1|D-33": { areaHa: 11.91, komplek: "12D38", fullCode: "TNKE1D-33", tahunTanam: 2012, bmPct: 64, tonHa: 17.29 },
    "TNKE|DIVISI 1|F-43": { areaHa: 9.8, komplek: "09G34", fullCode: "TNKE1F-43", tahunTanam: 2009, bmPct: 74, tonHa: 20.27 },
    "TNKE|DIVISI 1|E-39": { areaHa: 23.54, komplek: "09G34", fullCode: "TNKE1E-39", tahunTanam: 2009, bmPct: 85, tonHa: 22.85 },
    "TNKE|DIVISI 1|D-34": { areaHa: 20.48, komplek: "12D38", fullCode: "TNKE1D-34", tahunTanam: 2012, bmPct: 79, tonHa: 21.39 },
    "TNKE|DIVISI 1|D-46": { areaHa: 14.1, komplek: "09G02", fullCode: "TNKE1D-46", tahunTanam: 2009, bmPct: 85, tonHa: 23.52 },
    "TNKE|DIVISI 1|F-39": { areaHa: 18.57, komplek: "09G34", fullCode: "TNKE1F-39", tahunTanam: 2009, bmPct: 106, tonHa: 28.34 },
    "TNKE|DIVISI 2|D-55": { areaHa: 33.58, komplek: "09G04", fullCode: "TNKE2D-55", tahunTanam: 2009, bmPct: 66, tonHa: 16.61 },
    "TNKE|DIVISI 2|E-53": { areaHa: 31.77, komplek: "09G04", fullCode: "TNKE2E-53", tahunTanam: 2009, bmPct: 66, tonHa: 18.91 },
    "TNKE|DIVISI 2|F-60": { areaHa: 29.57, komplek: "09G35", fullCode: "TNKE2F-60", tahunTanam: 2009, bmPct: 81, tonHa: 21.85 },
    "TNKE|DIVISI 2|D-51": { areaHa: 32.8, komplek: "09G04", fullCode: "TNKE2D-51", tahunTanam: 2009, bmPct: 60, tonHa: 16.44 },
    "TNKE|DIVISI 2|D-50": { areaHa: 29.12, komplek: "09G04", fullCode: "TNKE2D-50", tahunTanam: 2009, bmPct: 65, tonHa: 17.98 },
    "TNKE|DIVISI 2|D-49": { areaHa: 30.04, komplek: "09G04", fullCode: "TNKE2D-49", tahunTanam: 2009, bmPct: 70, tonHa: 19.45 },
    "TNKE|DIVISI 2|E-59": { areaHa: 29.29, komplek: "09G35", fullCode: "TNKE2E-59", tahunTanam: 2009, bmPct: 68, tonHa: 18.58 },
    "TNKE|DIVISI 2|E-51": { areaHa: 19.03, komplek: "09G04", fullCode: "TNKE2E-51", tahunTanam: 2009, bmPct: 63, tonHa: 17.67 },
    "TNKE|DIVISI 2|E-52": { areaHa: 35.12, komplek: "09G04", fullCode: "TNKE2E-52", tahunTanam: 2009, bmPct: 69, tonHa: 19.12 },
    "TNKE|DIVISI 2|F-53": { areaHa: 28.45, komplek: "09G04", fullCode: "TNKE2F-53", tahunTanam: 2009, bmPct: 70, tonHa: 18.94 },
    "TNKE|DIVISI 2|F-50": { areaHa: 29.41, komplek: "09G04", fullCode: "TNKE2F-50", tahunTanam: 2009, bmPct: 76, tonHa: 19.23 },
    "TNKE|DIVISI 2|E-55": { areaHa: 33.59, komplek: "09G04", fullCode: "TNKE2E-55", tahunTanam: 2009, bmPct: 71, tonHa: 19.75 },
    "TNKE|DIVISI 2|F-54": { areaHa: 27.67, komplek: "09G04", fullCode: "TNKE2F-54", tahunTanam: 2009, bmPct: 70, tonHa: 18.76 },
    "TNKE|DIVISI 2|E-54": { areaHa: 39.66, komplek: "09G04", fullCode: "TNKE2E-54", tahunTanam: 2009, bmPct: 74, tonHa: 21.04 },
    "TNKE|DIVISI 2|D-53": { areaHa: 22.13, komplek: "09G04", fullCode: "TNKE2D-53", tahunTanam: 2009, bmPct: 79, tonHa: 21.43 },
    "TNKE|DIVISI 2|F-52": { areaHa: 27.28, komplek: "09G04", fullCode: "TNKE2F-52", tahunTanam: 2009, bmPct: 74, tonHa: 19.33 },
    "TNKE|DIVISI 2|D-52": { areaHa: 29.12, komplek: "09G04", fullCode: "TNKE2D-52", tahunTanam: 2009, bmPct: 75, tonHa: 19.98 },
    "TNKE|DIVISI 2|F-49": { areaHa: 28.71, komplek: "09G04", fullCode: "TNKE2F-49", tahunTanam: 2009, bmPct: 77, tonHa: 18.64 },
    "TNKE|DIVISI 2|F-51": { areaHa: 29.1, komplek: "09G04", fullCode: "TNKE2F-51", tahunTanam: 2009, bmPct: 79, tonHa: 20.37 },
    "TNKE|DIVISI 2|F-56": { areaHa: 29.38, komplek: "09G35", fullCode: "TNKE2F-56", tahunTanam: 2009, bmPct: 77, tonHa: 21.14 },
    "TNKE|DIVISI 2|E-49": { areaHa: 29.76, komplek: "09G04", fullCode: "TNKE2E-49", tahunTanam: 2009, bmPct: 83, tonHa: 22.4 },
    "TNKE|DIVISI 2|E-60": { areaHa: 22.03, komplek: "09G35", fullCode: "TNKE2E-60", tahunTanam: 2009, bmPct: 81, tonHa: 22.78 },
    "TNKE|DIVISI 2|E-58": { areaHa: 24.85, komplek: "09G35", fullCode: "TNKE2E-58", tahunTanam: 2009, bmPct: 76, tonHa: 20.91 },
    "TNKE|DIVISI 2|F-59": { areaHa: 27.57, komplek: "09G35", fullCode: "TNKE2F-59", tahunTanam: 2009, bmPct: 79, tonHa: 21.67 },
    "TNKE|DIVISI 2|E-50": { areaHa: 29.04, komplek: "09G04", fullCode: "TNKE2E-50", tahunTanam: 2009, bmPct: 82, tonHa: 22.17 },
    "TNKE|DIVISI 2|E-56": { areaHa: 30.58, komplek: "09G35", fullCode: "TNKE2E-56", tahunTanam: 2009, bmPct: 83, tonHa: 22.93 },
    "TNKE|DIVISI 2|E-57": { areaHa: 21.57, komplek: "09G35", fullCode: "TNKE2E-57", tahunTanam: 2009, bmPct: 79, tonHa: 21.15 },
    "TNKE|DIVISI 2|F-57": { areaHa: 25.17, komplek: "09G35", fullCode: "TNKE2F-57", tahunTanam: 2009, bmPct: 81, tonHa: 22.11 },
    "TNKE|DIVISI 2|F-58": { areaHa: 28.48, komplek: "09G35", fullCode: "TNKE2F-58", tahunTanam: 2009, bmPct: 84, tonHa: 22.94 },
    "TNKE|DIVISI 2|F-55": { areaHa: 20.17, komplek: "09G04", fullCode: "TNKE2F-55", tahunTanam: 2009, bmPct: 87, tonHa: 23.36 },
    "TNKE|DIVISI 3|G-52": { areaHa: 27.67, komplek: "10G36", fullCode: "TNKE3G-52", tahunTanam: 2010, bmPct: 70, tonHa: 19.8 },
    "TNKE|DIVISI 3|H-50": { areaHa: 28.5, komplek: "08G33", fullCode: "TNKE3H-50", tahunTanam: 2008, bmPct: 73, tonHa: 20.17 },
    "TNKE|DIVISI 3|G-51": { areaHa: 28.8, komplek: "10G36", fullCode: "TNKE3G-51", tahunTanam: 2010, bmPct: 63, tonHa: 18.28 },
    "TNKE|DIVISI 3|G-53": { areaHa: 28.77, komplek: "10G36", fullCode: "TNKE3G-53", tahunTanam: 2010, bmPct: 68, tonHa: 17.79 },
    "TNKE|DIVISI 3|I-50": { areaHa: 30.52, komplek: "08G33", fullCode: "TNKE3I-50", tahunTanam: 2008, bmPct: 85, tonHa: 22.71 },
    "TNKE|DIVISI 3|H-45": { areaHa: 32.26, komplek: "08G33", fullCode: "TNKE3H-45", tahunTanam: 2008, bmPct: 98, tonHa: 25.41 },
    "TNKE|DIVISI 3|I-49": { areaHa: 34.54, komplek: "08G33", fullCode: "TNKE3I-49", tahunTanam: 2008, bmPct: 93, tonHa: 24.7 },
    "TNKE|DIVISI 3|I-52": { areaHa: 20.55, komplek: "08G33", fullCode: "TNKE3I-52", tahunTanam: 2008, bmPct: 85, tonHa: 22.19 },
    "TNKE|DIVISI 3|G-49": { areaHa: 25.82, komplek: "10G36", fullCode: "TNKE3G-49", tahunTanam: 2010, bmPct: 68, tonHa: 19.33 },
    "TNKE|DIVISI 3|G-50": { areaHa: 29.89, komplek: "10G36", fullCode: "TNKE3G-50", tahunTanam: 2010, bmPct: 68, tonHa: 19.46 },
    "TNKE|DIVISI 3|G-45": { areaHa: 23.87, komplek: "08G33", fullCode: "TNKE3G-45", tahunTanam: 2008, bmPct: 96, tonHa: 24.92 },
    "TNKE|DIVISI 3|G-44": { areaHa: 19.8, komplek: "08G33", fullCode: "TNKE3G-44", tahunTanam: 2008, bmPct: 93, tonHa: 24.11 },
    "TNKE|DIVISI 3|H-52": { areaHa: 25.75, komplek: "10G36", fullCode: "TNKE3H-52", tahunTanam: 2010, bmPct: 81, tonHa: 22.16 },
    "TNKE|DIVISI 3|G-55": { areaHa: 24.76, komplek: "10G36", fullCode: "TNKE3G-55", tahunTanam: 2010, bmPct: 77, tonHa: 19.71 },
    "TNKE|DIVISI 3|H-51": { areaHa: 18.84, komplek: "08G33", fullCode: "TNKE3H-51", tahunTanam: 2008, bmPct: 96, tonHa: 26.54 },
    "TNKE|DIVISI 3|G-54": { areaHa: 21.95, komplek: "10G36", fullCode: "TNKE3G-54", tahunTanam: 2010, bmPct: 79, tonHa: 20.99 },
    "TNKE|DIVISI 3|I-53": { areaHa: 26.01, komplek: "08G33", fullCode: "TNKE3I-53", tahunTanam: 2008, bmPct: 99, tonHa: 24.5 },
    "TNKE|DIVISI 3|G-46": { areaHa: 25.97, komplek: "08G33", fullCode: "TNKE3G-46", tahunTanam: 2008, bmPct: 85, tonHa: 22.17 },
    "TNKE|DIVISI 3|I-51": { areaHa: 23.13, komplek: "08G33", fullCode: "TNKE3I-51", tahunTanam: 2008, bmPct: 94, tonHa: 25.26 },
    "TNKE|DIVISI 3|H-47": { areaHa: 25.88, komplek: "08G33", fullCode: "TNKE3H-47", tahunTanam: 2008, bmPct: 96, tonHa: 24.93 },
    "TNKE|DIVISI 3|H-49": { areaHa: 15.82, komplek: "08G33", fullCode: "TNKE3H-49", tahunTanam: 2008, bmPct: 102, tonHa: 26.82 },
    "TNKE|DIVISI 3|H-48": { areaHa: 17.95, komplek: "08G33", fullCode: "TNKE3H-48", tahunTanam: 2008, bmPct: 96, tonHa: 25.05 },
    "TNKE|DIVISI 3|H-56": { areaHa: 18.57, komplek: "10G36", fullCode: "TNKE3H-56", tahunTanam: 2010, bmPct: 77, tonHa: 22.22 },
    "TNKE|DIVISI 3|H-53": { areaHa: 29.92, komplek: "10G36", fullCode: "TNKE3H-53", tahunTanam: 2010, bmPct: 80, tonHa: 18.45 },
    "TNKE|DIVISI 3|G-56": { areaHa: 26.59, komplek: "10G36", fullCode: "TNKE3G-56", tahunTanam: 2010, bmPct: 78, tonHa: 20.7 },
    "TNKE|DIVISI 3|H-54": { areaHa: 30.44, komplek: "10G36", fullCode: "TNKE3H-54", tahunTanam: 2010, bmPct: 86, tonHa: 20.81 },
    "TNKE|DIVISI 3|H-55": { areaHa: 25.4, komplek: "10G36", fullCode: "TNKE3H-55", tahunTanam: 2010, bmPct: 75, tonHa: 21.02 },
    "TNKE|DIVISI 3|G-48": { areaHa: 23.97, komplek: "10G36", fullCode: "TNKE3G-48", tahunTanam: 2010, bmPct: 81, tonHa: 21.97 },
    "TNKE|DIVISI 3|G-47": { areaHa: 11.96, komplek: "08G33", fullCode: "TNKE3G-47", tahunTanam: 2008, bmPct: 94, tonHa: 24.43 },
    "TNKE|DIVISI 3|I-55": { areaHa: 22.86, komplek: "10G36", fullCode: "TNKE3I-55", tahunTanam: 2010, bmPct: 93, tonHa: 25.07 },
    "TNKE|DIVISI 3|I-56": { areaHa: 29.64, komplek: "10G36", fullCode: "TNKE3I-56", tahunTanam: 2010, bmPct: 97, tonHa: 20.83 },
    "TNKE|DIVISI 3|I-54": { areaHa: 21.45, komplek: "10G36", fullCode: "TNKE3I-54", tahunTanam: 2010, bmPct: 96, tonHa: 22.15 },
    "TNKE|DIVISI 5|F-16": { areaHa: 30.62, komplek: "13G27", fullCode: "TNKE5F-16", tahunTanam: 2013, bmPct: 69, tonHa: 18.91 },
    "TNKE|DIVISI 5|E-18": { areaHa: 26.66, komplek: "13G27", fullCode: "TNKE5E-18", tahunTanam: 2013, bmPct: 71, tonHa: 20.14 },
    "TNKE|DIVISI 5|E-17": { areaHa: 29.32, komplek: "13G27", fullCode: "TNKE5E-17", tahunTanam: 2013, bmPct: 80, tonHa: 21.99 },
    "TNKE|DIVISI 5|E-21": { areaHa: 14.16, komplek: "13G27", fullCode: "TNKE5E-21", tahunTanam: 2013, bmPct: 45, tonHa: 11.59 },
    "TNKE|DIVISI 5|F-24": { areaHa: 34.69, komplek: "13G27", fullCode: "TNKE5F-24", tahunTanam: 2013, bmPct: 53, tonHa: 13.62 },
    "TNKE|DIVISI 5|E-20": { areaHa: 13.42, komplek: "13G27", fullCode: "TNKE5E-20", tahunTanam: 2013, bmPct: 55, tonHa: 16.3 },
    "TNKE|DIVISI 5|D-14": { areaHa: 24.76, komplek: "14D30", fullCode: "TNKE5D-14", tahunTanam: 2014, bmPct: 49, tonHa: 14.31 },
    "TNKE|DIVISI 5|D-20": { areaHa: 15.37, komplek: "13G27", fullCode: "TNKE5D-20", tahunTanam: 2013, bmPct: 58, tonHa: 15.38 },
    "TNKE|DIVISI 5|E-11": { areaHa: 24.24, komplek: "14D30", fullCode: "TNKE5E-11", tahunTanam: 2014, bmPct: 46, tonHa: 13.21 },
    "TNKE|DIVISI 5|F-15": { areaHa: 31.53, komplek: "14D30", fullCode: "TNKE5F-15", tahunTanam: 2014, bmPct: 59, tonHa: 16.72 },
    "TNKE|DIVISI 5|E-13": { areaHa: 23.44, komplek: "14D30", fullCode: "TNKE5E-13", tahunTanam: 2014, bmPct: 61, tonHa: 17.87 },
    "TNKE|DIVISI 5|D-11": { areaHa: 22.43, komplek: "14D30", fullCode: "TNKE5D-11", tahunTanam: 2014, bmPct: 57, tonHa: 16.1 },
    "TNKE|DIVISI 5|E-19": { areaHa: 25.11, komplek: "13G27", fullCode: "TNKE5E-19", tahunTanam: 2013, bmPct: 67, tonHa: 19.13 },
    "TNKE|DIVISI 5|F-17": { areaHa: 29.03, komplek: "13G27", fullCode: "TNKE5F-17", tahunTanam: 2013, bmPct: 76, tonHa: 21.3 },
    "TNKE|DIVISI 5|F-13": { areaHa: 25.29, komplek: "14D30", fullCode: "TNKE5F-13", tahunTanam: 2014, bmPct: 66, tonHa: 18.69 },
    "TNKE|DIVISI 5|F-19": { areaHa: 30.61, komplek: "13G27", fullCode: "TNKE5F-19", tahunTanam: 2013, bmPct: 81, tonHa: 19.88 },
    "TNKE|DIVISI 5|E-22": { areaHa: 5.27, komplek: "13G27", fullCode: "TNKE5E-22", tahunTanam: 2013, bmPct: 46, tonHa: 12.37 },
    "TNKE|DIVISI 5|F-18": { areaHa: 27.3, komplek: "13G27", fullCode: "TNKE5F-18", tahunTanam: 2013, bmPct: 71, tonHa: 19.13 },
    "TNKE|DIVISI 5|E-16": { areaHa: 29.81, komplek: "13G27", fullCode: "TNKE5E-16", tahunTanam: 2013, bmPct: 82, tonHa: 22.7 },
    "TNKE|DIVISI 5|E-15": { areaHa: 15.28, komplek: "14D30", fullCode: "TNKE5E-15", tahunTanam: 2014, bmPct: 66, tonHa: 18.18 },
    "TNKE|DIVISI 6|H-19": { areaHa: 28.34, komplek: "11G17", fullCode: "TNKE6H-19", tahunTanam: 2011, bmPct: 56, tonHa: 15.06 },
    "TNKE|DIVISI 6|J-30": { areaHa: 41.51, komplek: "11G17", fullCode: "TNKE6J-30", tahunTanam: 2011, bmPct: 58, tonHa: 16.78 },
    "TNKE|DIVISI 6|J-18": { areaHa: 21.23, komplek: "11G17", fullCode: "TNKE6J-18", tahunTanam: 2011, bmPct: 38, tonHa: 10.22 },
    "TNKE|DIVISI 6|G-15": { areaHa: 22.8, komplek: "11G17", fullCode: "TNKE6G-15", tahunTanam: 2011, bmPct: 48, tonHa: 12.81 },
    "TNKE|DIVISI 6|G-13": { areaHa: 17.39, komplek: "11G17", fullCode: "TNKE6G-13", tahunTanam: 2011, bmPct: 34, tonHa: 9.22 },
    "TNKE|DIVISI 6|G-16": { areaHa: 37.82, komplek: "11G17", fullCode: "TNKE6G-16", tahunTanam: 2011, bmPct: 51, tonHa: 13.56 },
    "TNKE|DIVISI 6|H-14": { areaHa: 29.2, komplek: "11G17", fullCode: "TNKE6H-14", tahunTanam: 2011, bmPct: 55, tonHa: 14.93 },
    "TNKE|DIVISI 6|J-25": { areaHa: 19.24, komplek: "11G17", fullCode: "TNKE6J-25", tahunTanam: 2011, bmPct: 41, tonHa: 9.79 },
    "TNKE|DIVISI 6|J-28": { areaHa: 32.07, komplek: "11G17", fullCode: "TNKE6J-28", tahunTanam: 2011, bmPct: 56, tonHa: 15.39 },
    "TNKE|DIVISI 6|J-32": { areaHa: 42.38, komplek: "11G17", fullCode: "TNKE6J-32", tahunTanam: 2011, bmPct: 62, tonHa: 16.94 },
    "TNKE|DIVISI 6|I-20": { areaHa: 22.75, komplek: "11G17", fullCode: "TNKE6I-20", tahunTanam: 2011, bmPct: 69, tonHa: 17.33 },
    "TNKE|DIVISI 6|G-20": { areaHa: 26.71, komplek: "11G17", fullCode: "TNKE6G-20", tahunTanam: 2011, bmPct: 66, tonHa: 17.26 },
    "TNKE|DIVISI 6|H-22": { areaHa: 13.63, komplek: "11G17", fullCode: "TNKE6H-22", tahunTanam: 2011, bmPct: 71, tonHa: 19.26 },
    "TNKE|DIVISI 6|J-26": { areaHa: 18.51, komplek: "11G17", fullCode: "TNKE6J-26", tahunTanam: 2011, bmPct: 70, tonHa: 18.82 }
  };

  function polygonAreaHa(coords) {
    if (!coords || coords.length < 3) return 0.0;
    var area = 0.0;
    var R = 6378137.0; // Earth radius in meters
    for (var i = 0; i < coords.length; i++) {
      var j = (i + 1) % coords.length;
      var p1 = coords[i];
      var p2 = coords[j];
      var lon1 = (p1[0] * Math.PI) / 180.0;
      var lat1 = (p1[1] * Math.PI) / 180.0;
      var lon2 = (p2[0] * Math.PI) / 180.0;
      var lat2 = (p2[1] * Math.PI) / 180.0;
      area += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
    }
    area = Math.abs((area * R * R) / 2.0);
    return area / 10000.0;
  }

  function featureAreaHa(feat) {
    var geom = feat.geometry || {};
    var gtype = geom.type;
    var coords = geom.coordinates || [];
    var tot = 0.0;
    if (gtype === 'Polygon') {
      tot += polygonAreaHa(coords[0]);
      for (var k = 1; k < coords.length; k++) tot -= polygonAreaHa(coords[k]);
    } else if (gtype === 'MultiPolygon') {
      for (var m = 0; m < coords.length; m++) {
        tot += polygonAreaHa(coords[m][0]);
        for (var n = 1; n < coords[m].length; n++) tot -= polygonAreaHa(coords[m][n]);
      }
    }
    return Math.round(tot * 100) / 100;
  }

  function processTNKEFeatures(rawGeoJson) {
    var payload = rawGeoJson.data ?? rawGeoJson;
    var features = payload.features || [];

    var blockMap = {};
    var nonBlockFeatures = [];

    features.forEach(function (feat, idx) {
      var props = feat.properties || {};
      var estate = props.estate || 'TNKE';
      var divisi = (props.divisi || 'DIVISI 1').trim();
      var blok = (props.blok || '-').trim();

      // Exclude non-agricultural / infrastructure / road / "-" / "Non DIVISI" features
      if (blok === '-' || blok === 'ALL' || divisi === 'Non DIVISI' || !blok || blok.toLowerCase() === 'nonblok') {
        nonBlockFeatures.push({
          index: idx,
          estate: estate,
          divisi: divisi,
          blok: blok,
          geomAreaHa: featureAreaHa(feat),
          feature: feat
        });
        return;
      }

      var key = estate + '|' + divisi + '|' + blok;
      var attInfo = ATTACHMENT_BLOCK_DATA[key];
      var geomHa = featureAreaHa(feat);

      if (!blockMap[key]) {
        var opAreaHa = attInfo ? attInfo.areaHa : geomHa;
        var komplek = attInfo ? attInfo.komplek : (props.komplek || '');
        var fullCode = attInfo ? attInfo.fullCode : (estate + divisi.replace(/\s+/g, '') + blok);
        var tahunTanam = attInfo ? attInfo.tahunTanam : 2012;
        var bmPct = attInfo ? attInfo.bmPct : 0;
        var tonHa = attInfo ? attInfo.tonHa : 0;

        blockMap[key] = {
          key: key,
          estate: estate,
          divisi: divisi,
          blok: blok,
          areaHa: opAreaHa, // Authoritative Operational Hectares
          geomAreaHa: geomHa, // Stored separately for audit
          komplek: komplek,
          fullCode: fullCode,
          tahunTanam: tahunTanam,
          bmPct: bmPct,
          tonHa: tonHa,
          matchStatus: attInfo ? 'Matched' : 'GeoJSON Only',
          features: [feat]
        };
      } else {
        // Merge multi-part polygon features under same logical block
        blockMap[key].features.push(feat);
        blockMap[key].geomAreaHa = Math.round((blockMap[key].geomAreaHa + geomHa) * 100) / 100;
      }
    });

    var blocks = Object.keys(blockMap).map(function (k) {
      return blockMap[k];
    });

    // Group blocks by division
    var divisions = {};
    blocks.forEach(function (b) {
      if (!divisions[b.divisi]) {
        divisions[b.divisi] = [];
      }
      divisions[b.divisi].push(b);
    });

    var sortedDivisions = Object.keys(divisions).sort(function (a, b) {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    return {
      allFeaturesCount: features.length,
      nonBlockFeaturesCount: nonBlockFeatures.length,
      agriculturalBlocksCount: blocks.length,
      blocks: blocks,
      blockMap: blockMap,
      divisions: divisions,
      sortedDivisions: sortedDivisions,
      nonBlockFeatures: nonBlockFeatures
    };
  }

  window.TNKEMaster = {
    process: processTNKEFeatures,
    ATTACHMENT_DATA: ATTACHMENT_BLOCK_DATA
  };
})();
