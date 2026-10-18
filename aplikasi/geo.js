/**
 * SMART PROBLEM TAGGING - MOBILE APP GEOSPATIAL & CONTAINMENT UTILS
 * Point-in-polygon ray-casting with hole support, block indexing, & simulation GPS
 * Reference: ANTIGRAVITY_Aplikasi_Mobile_Prompt.md
 */

(function () {
  'use strict';

  var _geoJsonData = null;
  var _blockIndex = {}; // compositeKey -> { feature, bbox, centroid, estate, divisi, blok }

  function loadGeoJSON(callback) {
    if (_geoJsonData) {
      if (callback) callback(null, _geoJsonData);
      return;
    }

    // Try fetching ../SKDE.json first
    fetch('../SKDE.json')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var fc = data.data || data;
        _geoJsonData = fc;
        buildIndex(fc);
        if (callback) callback(null, fc);
      })
      .catch(function (err) {
        console.warn('Fallback loading GeoJSON from window.SKDE_GEOJSON_DATA...', err);
        if (window.SKDE_GEOJSON_DATA) {
          _geoJsonData = window.SKDE_GEOJSON_DATA;
          buildIndex(_geoJsonData);
          if (callback) callback(null, _geoJsonData);
        } else {
          if (callback) callback(new Error('Gagal memuat SKDE.json: ' + err.message));
        }
      });
  }

  function buildIndex(fc) {
    if (!fc || !fc.features) return;
    fc.features.forEach(function (feat) {
      var p = feat.properties || {};
      var estate = p.ESTATE || p.estate || 'SKDE';
      var divisi = p.DIVISI || p.divisi || '';
      var blok = p.BLOK || p.blok || '';
      if (!divisi || !blok || blok === '-' || blok.trim() === '') return;

      var compKey = estate + ':' + divisi + ':' + blok;
      var bbox = computeBBox(feat.geometry);
      var centroid = computeCentroid(feat.geometry);

      _blockIndex[compKey] = {
        key: compKey,
        estate: estate,
        divisi: divisi,
        blok: blok,
        properties: p,
        geometry: feat.geometry,
        bbox: bbox,
        centroid: centroid
      };
    });
  }

  function computeBBox(geom) {
    var minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
    function scanRings(rings) {
      rings.forEach(function (pt) {
        if (pt[0] < minLng) minLng = pt[0];
        if (pt[0] > maxLng) maxLng = pt[0];
        if (pt[1] < minLat) minLat = pt[1];
        if (pt[1] > maxLat) maxLat = pt[1];
      });
    }

    if (geom.type === 'Polygon') {
      geom.coordinates.forEach(scanRings);
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach(function (poly) {
        poly.forEach(scanRings);
      });
    }
    return [minLng, minLat, maxLng, maxLat];
  }

  function computeCentroid(geom) {
    var totalLng = 0, totalLat = 0, count = 0;
    function scanRings(rings) {
      rings.forEach(function (pt) {
        totalLng += pt[0];
        totalLat += pt[1];
        count++;
      });
    }
    if (geom.type === 'Polygon') {
      geom.coordinates.forEach(scanRings);
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach(function (poly) {
        poly.forEach(scanRings);
      });
    }
    return count > 0 ? [totalLng / count, totalLat / count] : [116.12, 1.25];
  }

  // Ray-casting point in polygon with holes
  function pointInRing(point, ring) {
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var xi = ring[i][0], yi = ring[i][1];
      var xj = ring[j][0], yj = ring[j][1];
      var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function pointInPolygonWithHoles(point, coords) {
    if (!coords || coords.length === 0) return false;
    // Outer ring must contain point
    if (!pointInRing(point, coords[0])) return false;
    // Inner rings (holes) must NOT contain point
    for (var h = 1; h < coords.length; h++) {
      if (pointInRing(point, coords[h])) return false; // Inside hole
    }
    return true;
  }

  function pointInGeometry(lng, lat, geom) {
    var pt = [lng, lat];
    if (geom.type === 'Polygon') {
      return pointInPolygonWithHoles(pt, geom.coordinates);
    } else if (geom.type === 'MultiPolygon') {
      for (var p = 0; p < geom.coordinates.length; p++) {
        if (pointInPolygonWithHoles(pt, geom.coordinates[p])) return true;
      }
    }
    return false;
  }

  // Detect which block contains the given coordinate [lat, lng]
  function detectBlock(lat, lng) {
    var keys = Object.keys(_blockIndex);
    for (var i = 0; i < keys.length; i++) {
      var item = _blockIndex[keys[i]];
      var bbox = item.bbox;
      // Fast BBox check [minLng, minLat, maxLng, maxLat]
      if (lng < bbox[0] || lng > bbox[2] || lat < bbox[1] || lat > bbox[3]) {
        continue;
      }
      // Exact boundary containment
      if (pointInGeometry(lng, lat, item.geometry)) {
        return item;
      }
    }
    return null;
  }

  // Haversine distance in meters
  function distanceMeters(lat1, lng1, lat2, lng2) {
    var R = 6371e3;
    var phi1 = lat1 * Math.PI / 180;
    var phi2 = lat2 * Math.PI / 180;
    var deltaPhi = (lat2 - lat1) * Math.PI / 180;
    var deltaLambda = (lng2 - lng1) * Math.PI / 180;

    var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  // Generate deterministic valid GPS point inside a block polygon
  function getSampleGpsForBlock(compKey, seed) {
    var item = _blockIndex[compKey];
    if (!item) {
      // Fallback SKDE center coordinates
      return { lat: 1.2584, lng: 116.1245, accuracy: 6.5 };
    }
    var c = item.centroid;
    var s = (seed || 1) * 0.00018;
    var lat = c[1] + (Math.sin(s * 100) * 0.0006);
    var lng = c[0] + (Math.cos(s * 100) * 0.0006);

    // Verify containment, if drifted, return centroid
    if (!pointInGeometry(lng, lat, item.geometry)) {
      lat = c[1];
      lng = c[0];
    }
    return {
      lat: Math.round(lat * 1e6) / 1e6,
      lng: Math.round(lng * 1e6) / 1e6,
      accuracy: 5.0 + ((seed || 1) % 4)
    };
  }

  window.SPT_MOBILE_GEO = {
    loadGeoJSON: loadGeoJSON,
    detectBlock: detectBlock,
    distanceMeters: distanceMeters,
    getSampleGpsForBlock: getSampleGpsForBlock,
    getBlockIndex: function () { return _blockIndex; },
    getBlockInfo: function (compKey) { return _blockIndex[compKey] || null; }
  };

  // Aliases for clean router & controller consumption
  window.SPTGeo = window.SPT_MOBILE_GEO;
  window.SPTGeo.getAvailableBlocks = function () {
    var idx = _blockIndex;
    var out = [];
    for (var k in idx) {
      var item = idx[k];
      out.push({
        key: k,
        estate: item.estate || 'SKDE',
        divisi: item.divisi || 'DIVISI 3',
        blockId: item.blockId || k.split(':')[2] || k
      });
    }
    // If geojson not loaded yet, provide the primary demo blocks
    if (out.length === 0) {
      return [
        { key: 'SKDE:DIVISI 3:S-28', estate: 'SKDE', divisi: 'DIVISI 3', blockId: 'S-28' },
        { key: 'SKDE:DIVISI 3:S-29', estate: 'SKDE', divisi: 'DIVISI 3', blockId: 'S-29' },
        { key: 'SKDE:DIVISI 3:T-29', estate: 'SKDE', divisi: 'DIVISI 3', blockId: 'T-29' }
      ];
    }
    return out;
  };
  window.SPTGeo.loadSKDEGeoJson = function () {
    return loadGeoJSON();
  };
  window.SPTGeo.getRawGeoJson = function () {
    return window.SKDE_GEOJSON_DATA || null;
  };
})();

