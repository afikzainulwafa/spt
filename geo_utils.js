/**
 * SMART PROBLEM TAGGING - Geospatial & Deterministic Utilities
 * Ray-casting point-in-polygon (Polygon, MultiPolygon, Holes),
 * Mulberry32 seeded PRNG, BBox indexing, and interior point calculation.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SPT_GEO = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // =========================================================================
  // 1. DETERMINISTIC SEEDED PRNG (Mulberry32 + FNV-1a Hash)
  // =========================================================================
  function fnv1a(str) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  function createMulberry32(seedNum) {
    let s = (seedNum >>> 0) || 1337;
    return function () {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createSeededRandom(seedKey) {
    const seedVal = typeof seedKey === 'number' ? seedKey : fnv1a(String(seedKey));
    return createMulberry32(seedVal);
  }

  // =========================================================================
  // 2. POINT IN POLYGON & RAY-CASTING WITH HOLES
  // =========================================================================

  /**
   * Ray casting algorithm for a single ring.
   * pt: [lng, lat]
   * ring: array of [lng, lat]
   */
  function pointInRing(x, y, ring) {
    let inside = false;
    const len = ring.length;
    for (let i = 0, j = len - 1; i < len; j = i++) {
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j][0], yj = ring[j][1];

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   * Check if point [lng, lat] is inside a Polygon coordinates array:
   * coords = [outerRing, hole1, hole2, ...]
   */
  function pointInPolygonCoords(x, y, coords) {
    if (!coords || coords.length === 0) return false;
    // Must be inside outer ring
    if (!pointInRing(x, y, coords[0])) return false;
    // Must NOT be inside any hole ring
    for (let h = 1; h < coords.length; h++) {
      if (pointInRing(x, y, coords[h])) return false;
    }
    return true;
  }

  /**
   * Check if point [lng, lat] is inside GeoJSON geometry (Polygon or MultiPolygon)
   */
  function isLngLatInGeometry(lng, lat, geometry) {
    if (!geometry || !geometry.coordinates) return false;
    const type = geometry.type;
    const coords = geometry.coordinates;

    if (type === 'Polygon') {
      return pointInPolygonCoords(lng, lat, coords);
    } else if (type === 'MultiPolygon') {
      for (let p = 0; p < coords.length; p++) {
        if (pointInPolygonCoords(lng, lat, coords[p])) return true;
      }
      return false;
    }
    return false;
  }

  /**
   * Leaflet convenience check: lat, lng order
   */
  function isLatLngInGeometry(lat, lng, geometry) {
    return isLngLatInGeometry(lng, lat, geometry);
  }

  // =========================================================================
  // 3. BOUNDING BOX & INTERIOR POINT COMPUTATION
  // =========================================================================

  function computeGeometryBbox(geometry) {
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
    function scanRing(ring) {
      for (let i = 0; i < ring.length; i++) {
        const x = ring[i][0], y = ring[i][1];
        if (x < minLng) minLng = x;
        if (x > maxLng) maxLng = x;
        if (y < minLat) minLat = y;
        if (y > maxLat) maxLat = y;
      }
    }

    if (geometry.type === 'Polygon') {
      if (geometry.coordinates && geometry.coordinates[0]) {
        scanRing(geometry.coordinates[0]);
      }
    } else if (geometry.type === 'MultiPolygon') {
      if (geometry.coordinates) {
        for (let p = 0; p < geometry.coordinates.length; p++) {
          if (geometry.coordinates[p][0]) {
            scanRing(geometry.coordinates[p][0]);
          }
        }
      }
    }
    return [minLng, minLat, maxLng, maxLat];
  }

  function combineBboxes(b1, b2) {
    if (!b1) return b2;
    if (!b2) return b1;
    return [
      Math.min(b1[0], b2[0]),
      Math.min(b1[1], b2[1]),
      Math.max(b1[2], b2[2]),
      Math.max(b1[3], b2[3])
    ];
  }

  /**
   * Find a guaranteed interior point [lat, lng] inside the geometry.
   * Tests horizontal scanlines across multiple fractions of the bounding box.
   */
  function getGuaranteedInteriorPoint(geometry) {
    const bbox = computeGeometryBbox(geometry);
    const [minLng, minLat, maxLng, maxLat] = bbox;

    // Try center scanlines first
    const scanlineFractions = [0.5, 0.45, 0.55, 0.4, 0.6, 0.35, 0.65, 0.3, 0.7];

    let bestPoint = null;
    let maxSegmentLen = -1;

    for (let f = 0; f < scanlineFractions.length; f++) {
      const testLat = minLat + (maxLat - minLat) * scanlineFractions[f];
      // Sample 40 points along this horizontal line
      const samples = 40;
      let startLng = null;

      for (let s = 0; s <= samples; s++) {
        const testLng = minLng + (maxLng - minLng) * (s / samples);
        const inside = isLngLatInGeometry(testLng, testLat, geometry);

        if (inside) {
          if (startLng === null) startLng = testLng;
        } else {
          if (startLng !== null) {
            const segLen = testLng - startLng;
            if (segLen > maxSegmentLen) {
              maxSegmentLen = segLen;
              bestPoint = [testLat, startLng + segLen / 2];
            }
            startLng = null;
          }
        }
      }
      if (startLng !== null) {
        const segLen = maxLng - startLng;
        if (segLen > maxSegmentLen) {
          maxSegmentLen = segLen;
          bestPoint = [testLat, startLng + segLen / 2];
        }
      }
      if (bestPoint && maxSegmentLen > (maxLng - minLng) * 0.15) {
        break; // found a broad interior segment
      }
    }

    if (bestPoint) return bestPoint;

    // Fallback: simple center
    const fallbackLat = (minLat + maxLat) / 2;
    const fallbackLng = (minLng + maxLng) / 2;
    return [fallbackLat, fallbackLng];
  }

  // =========================================================================
  // 4. DETERMINISTIC SAMPLE SAMPLING INSIDE POLYGON
  // =========================================================================

  /**
   * Sample coordinates [lng, lat] deterministically inside a block's geometry.
   * Respects holes and multiple parts.
   */
  function samplePointInGeometry(geometry, prng, maxRetries = 25) {
    const bbox = computeGeometryBbox(geometry);
    const [minLng, minLat, maxLng, maxLat] = bbox;

    for (let i = 0; i < maxRetries; i++) {
      const candidateLng = minLng + prng() * (maxLng - minLng);
      const candidateLat = minLat + prng() * (maxLat - minLat);

      if (isLngLatInGeometry(candidateLng, candidateLat, geometry)) {
        return [candidateLng, candidateLat];
      }
    }

    // Fallback: Use interior point with slight deterministic offset
    const interior = getGuaranteedInteriorPoint(geometry); // [lat, lng]
    const fallbackLat = interior[0] + (prng() - 0.5) * 0.0003;
    const fallbackLng = interior[1] + (prng() - 0.5) * 0.0003;

    if (isLngLatInGeometry(fallbackLng, fallbackLat, geometry)) {
      return [fallbackLng, fallbackLat];
    }
    return [interior[1], interior[0]]; // [lng, lat]
  }

  // =========================================================================
  // 5. GEOJSON NORMALIZER & BLOCK INDEXER
  // =========================================================================

  function makeBlockKey(estate, divisi, blok) {
    return (estate || 'SKDE').trim() + ':' + (divisi || '').trim() + ':' + (blok || '').trim();
  }

  /**
   * Parse GeoJSON FeatureCollection and build indexed block model
   */
  function indexGeoJson(geojson) {
    if (!geojson) throw new Error('GeoJSON data tidak tersedia');
    const rawData = geojson.data ?? geojson;
    if (rawData.type !== 'FeatureCollection' || !Array.isArray(rawData.features)) {
      throw new Error('Format GeoJSON tidak valid: harus FeatureCollection');
    }

    const blocksMap = new Map();
    const validBlocks = [];
    let skippedFeaturesCount = 0;

    rawData.features.forEach((feature, index) => {
      const p = feature.properties || {};
      const estate = (p.estate || 'SKDE').trim();
      const divisi = (p.divisi || '').trim();
      const blok = (p.blok || '').trim();

      // Skip features with empty or '-' block name
      if (!blok || blok === '-' || blok.toLowerCase() === 'null') {
        skippedFeaturesCount++;
        return;
      }

      const key = makeBlockKey(estate, divisi, blok);
      const bbox = computeGeometryBbox(feature.geometry);

      if (!blocksMap.has(key)) {
        const blockRecord = {
          blockKey: key,
          estate: estate,
          divisi: divisi,
          blok: blok,
          features: [feature],
          bbox: bbox,
          interiorPoint: null // computed below
        };
        blocksMap.set(key, blockRecord);
        validBlocks.push(blockRecord);
      } else {
        const existing = blocksMap.get(key);
        existing.features.push(feature);
        existing.bbox = combineBboxes(existing.bbox, bbox);
      }
    });

    // Compute interior point & bounds for each block
    const blocksObj = {};
    validBlocks.forEach(block => {
      const mainFeature = block.features[0];
      const pt = getGuaranteedInteriorPoint(mainFeature.geometry); // [lat, lng]
      pt.lat = pt[0];
      pt.lng = pt[1];
      block.interiorPoint = pt;

      const bbox = block.bbox; // [minLng, minLat, maxLng, maxLat]
      if (typeof L !== 'undefined' && L.latLngBounds) {
        block.bounds = L.latLngBounds([bbox[1], bbox[0]], [bbox[3], bbox[2]]);
      } else {
        block.bounds = {
          getCenter: function () {
            return { lat: (bbox[1] + bbox[3]) / 2, lng: (bbox[0] + bbox[2]) / 2 };
          }
        };
      }

      blocksObj[block.blockKey] = block;
    });

    return {
      blocks: blocksObj,
      blocksMap,
      validBlocks,
      totalFeatures: rawData.features.length,
      skippedFeaturesCount,
      validBlocksCount: validBlocks.length
    };
  }

  /**
   * Identify which block contains a given Leaflet (lat, lng) click coordinate
   */
  function findBlockAtLatLng(lat, lng, indexedData) {
    if (!indexedData || !indexedData.validBlocks) return null;

    // 1. Fast BBox prefilter
    const candidates = [];
    for (let i = 0; i < indexedData.validBlocks.length; i++) {
      const blk = indexedData.validBlocks[i];
      const bbox = blk.bbox;
      if (lng >= bbox[0] && lng <= bbox[2] && lat >= bbox[1] && lat <= bbox[3]) {
        candidates.push(blk);
      }
    }

    // 2. Exact Ray-casting point-in-polygon check
    for (let i = 0; i < candidates.length; i++) {
      const blk = candidates[i];
      for (let f = 0; f < blk.features.length; f++) {
        if (isLatLngInGeometry(lat, lng, blk.features[f].geometry)) {
          return blk;
        }
      }
    }
    return null;
  }

  /**
   * Geographic 24-meter buffer calculation for LineString coordinates in WGS84
   * Returns GeoJSON Polygon coordinates array [[[lng, lat], ...]]
   */
  function createLineBuffer(coordinates, bufferMeters) {
    if (!coordinates || coordinates.length < 2) return null;
    const r = bufferMeters || 24;

    let sumLat = 0;
    for (let i = 0; i < coordinates.length; i++) {
      sumLat += coordinates[i][1];
    }
    const meanLat = sumLat / coordinates.length;
    const latRad = (meanLat * Math.PI) / 180;
    const mx = 111320 * Math.cos(latRad);
    const my = 111320;

    const refLng = coordinates[0][0];
    const refLat = coordinates[0][1];

    const pts = coordinates.map(function (pt) {
      return [(pt[0] - refLng) * mx, (pt[1] - refLat) * my];
    });

    const n = pts.length;
    const leftPts = [];
    const rightPts = [];

    function getNormal(p1, p2) {
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len === 0) return [0, 0];
      return [-dy / len, dx / len];
    }

    const normals = [];
    for (let i = 0; i < n - 1; i++) {
      normals.push(getNormal(pts[i], pts[i + 1]));
    }

    const n0 = normals[0];
    const startAngle = Math.atan2(-n0[0], -n0[1]);
    for (let a = 0; a <= 8; a++) {
      const ang = startAngle + (Math.PI * a) / 8;
      leftPts.push([
        pts[0][0] + r * Math.sin(ang),
        pts[0][1] + r * Math.cos(ang)
      ]);
    }

    for (let i = 1; i < n - 1; i++) {
      const nPrev = normals[i - 1];
      const nCurr = normals[i];

      let nx = (nPrev[0] + nCurr[0]) / 2;
      let ny = (nPrev[1] + nCurr[1]) / 2;
      let len = Math.sqrt(nx * nx + ny * ny);
      if (len < 0.1) {
        nx = nPrev[0];
        ny = nPrev[1];
        len = 1;
      }
      nx /= len;
      ny /= len;

      const dot = nPrev[0] * nx + nPrev[1] * ny;
      const miterLen = Math.min(r * 2.5, r / Math.max(0.2, dot));

      leftPts.push([pts[i][0] + nx * miterLen, pts[i][1] + ny * miterLen]);
      rightPts.push([pts[i][0] - nx * miterLen, pts[i][1] - ny * miterLen]);
    }

    const nLast = normals[n - 2];
    const endAngle = Math.atan2(nLast[0], nLast[1]);
    const endCap = [];
    for (let a = 0; a <= 8; a++) {
      const ang = endAngle + (Math.PI * a) / 8;
      endCap.push([
        pts[n - 1][0] + r * Math.sin(ang),
        pts[n - 1][1] + r * Math.cos(ang)
      ]);
    }

    const ringMeters = leftPts.concat(endCap).concat(rightPts.slice().reverse());

    const ringLngLat = ringMeters.map(function (pt) {
      return [refLng + pt[0] / mx, refLat + pt[1] / my];
    });

    ringLngLat.push(ringLngLat[0].slice());

    return [ringLngLat];
  }

  return {
    fnv1a,
    createMulberry32,
    createSeededRandom,
    pointInRing,
    pointInPolygonCoords,
    isLngLatInGeometry,
    isLatLngInGeometry,
    computeGeometryBbox,
    combineBboxes,
    getGuaranteedInteriorPoint,
    samplePointInGeometry,
    makeBlockKey,
    indexGeoJson,
    findBlockAtLatLng,
    createLineBuffer
  };
});
