/**
 * Read-only mockup analytics adapter for legacy-schema tnke_problem_tags.geojson.
 * No edits to GeoJSON Features / properties. Statuses come from a separate mockup file.
 * Polygon/admin data comes from TNKE.json. Units come from the 16-category master.
 */
export const PROBLEM_COLORS = Object.freeze({
  no_tagging: '#A3A3A3',
  belum_ada_action_plan: '#EF4444',
  on_progress: '#F2C94C',
  closed: '#39A66B',
});

const ALL_VALUES = new Set(['', 'all', 'semua', 'semua blok', 'semua divisi', 'semua permasalahan', '*']);
const all = value => value == null || ALL_VALUES.has(String(value).trim().toLowerCase());
const norm = value => String(value ?? '').trim().toLocaleLowerCase('id-ID').replace(/\s+/g, ' ');
const keyOf = (estate, divisi, blok) => `${estate}|${divisi}|${blok}`;
const safeNum = value => Number.isFinite(Number(value)) ? Number(value) : 0;
const volumeOf = p => safeNum(p.ringan) + safeNum(p.sedang) + safeNum(p.berat);
const pointFiles = x => x?.features || [];
const polygonFiles = x => x?.data?.features || x?.features || [];

function normalizeProblemLabel(value) {
  const name = norm(value);
  if (name === 'uderpruning') return 'underpruning';
  if (name === 'areal banjir') return 'areal banjir / tergenang';
  return name;
}

/**
 * Returns immutable derived records and analytics helpers. All tags in the file
 * remain unchanged. F-59 original source wording/quantities/coordinates persist.
 *
 * opts: {tagGeojson, tnkePolygons, problemMaster, actionPlanMockup}
 */
export function createSPTProblemAnalytics(opts) {
  const { tagGeojson, tnkePolygons, problemMaster, actionPlanMockup } = opts;
  if (tagGeojson?.type !== 'FeatureCollection') throw new Error('Tagging source must be a GeoJSON FeatureCollection');
  if (!Array.isArray(problemMaster?.categories) || problemMaster.categories.length !== 16) {
    throw new Error('Expected the official mockup master with 16 categories');
  }
  const categories = problemMaster.categories;
  const byCanonicalName = new Map(categories.map(category => [norm(category.name), category]));
  const byCategoryId = new Map(categories.map(category => [category.id, category]));

  // Map exact block names to administrative location using TNKE polygon source.
  // This works for the current TNKE data, where named block codes are unique.
  // If future estates reuse block codes, use point-in-polygon instead.
  const allPolygons = polygonFiles(tnkePolygons);
  const areaByBlock = new Map();
  const hasDuplicate = new Set();
  for (const feature of allPolygons) {
    const p = feature.properties ?? {};
    if (!p.blok || p.blok === '-') continue;
    const area = {estate: p.estate, divisi: p.divisi, blok: p.blok};
    const old = areaByBlock.get(p.blok);
    if (old && (old.estate !== area.estate || old.divisi !== area.divisi)) hasDuplicate.add(p.blok);
    else areaByBlock.set(p.blok, area);
  }
  if (hasDuplicate.size) {
    throw new Error(`Block codes repeat across divisions; use spatial join before running analytics: ${[...hasDuplicate].join(', ')}`);
  }

  const statuses = actionPlanMockup?.statuses ?? [];
  const byStatusId = new Map(statuses.map(s => [s.tag_id, s]));
  const allowedStatuses = new Set(['belum_ada_action_plan', 'on_progress', 'closed']);
  const data = pointFiles(tagGeojson).map(feature => {
    const p = feature.properties || {};
    const tagId = p.tag_id || feature.id;
    const category = byCanonicalName.get(normalizeProblemLabel(p.problem_normalized || p.problem));
    if (!category) throw new Error(`Unrecognized problem category on tag ${tagId}: ${p.problem_normalized || p.problem}`);
    const area = areaByBlock.get(p.blok);
    if (!area) throw new Error(`Block not found in TNKE polygons for tag ${tagId}: ${p.blok}`);
    const actionPlan = byStatusId.get(tagId);
    if (!actionPlan || !allowedStatuses.has(actionPlan.action_plan_status)) {
      throw new Error(`Missing or invalid external simulated action-plan status for tag ${tagId}`);
    }
    return {tagId, source:feature, ...area, categoryId:category.id,
      categoryName:category.name, unit:category.unit,
      quantity:volumeOf(p), status:actionPlan.action_plan_status,
      actionPlan, date:String(p.date || '')};
  });

  function filterRecords(filters = {}) {
    const {estate='TNKE', divisi='All', blok='All', year=null, month=null, categoryId='All'} = filters;
    if (!all(categoryId) && !byCategoryId.has(categoryId)) throw new Error(`Unknown category: ${categoryId}`);
    return data.filter(t => {
      if (!all(estate) && t.estate !== estate) return false;
      if (!all(divisi) && t.divisi !== divisi) return false;
      if (!all(blok) && t.blok !== blok) return false;
      if (!all(categoryId) && t.categoryId !== categoryId) return false;
      if (year != null || month != null) {
        const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.date);
        if (!parts) return false;
        if (year != null && Number(parts[1]) !== Number(year)) return false;
        if (month != null && Number(parts[2]) !== Number(month)) return false;
      }
      return true;
    });
  }

  function getMapMetrics(filters = {}) {
    const selected = filterRecords(filters);
    const category = all(filters.categoryId) ? null : byCategoryId.get(filters.categoryId);
    const denominator = category ? selected.reduce((n, t) => n + t.quantity, 0) : null;
    const byBlock = new Map();
    for (const item of selected) {
      const key=keyOf(item.estate,item.divisi,item.blok);
      const bucket=byBlock.get(key) ?? [];
      bucket.push(item);
      byBlock.set(key,bucket);
    }
    const metrics = new Map();
    for (const polygon of allPolygons) {
      const p=polygon.properties ?? {};
      if (!p.blok || p.blok === '-') continue;
      if (!all(filters.estate) && p.estate !== filters.estate) continue;
      if (!all(filters.divisi) && p.divisi !== filters.divisi) continue;
      if (!all(filters.blok) && p.blok !== filters.blok) continue;
      const key=keyOf(p.estate,p.divisi,p.blok);
      const tags=byBlock.get(key) ?? [];
      let status='no_tagging';
      if (tags.length) {
        if (tags.some(t=>t.status==='belum_ada_action_plan')) status='belum_ada_action_plan';
        else if (tags.some(t=>t.status==='on_progress')) status='on_progress';
        else status='closed';
      }
      const quantity=category ? tags.reduce((n,t)=>n+t.quantity,0) : null;
      const contributionPct=category && denominator > 0 ? quantity / denominator * 100 : null;
      const label = category
        ? `${p.blok}\n${contributionPct == null ? '—' : contributionPct.toLocaleString('id-ID',{minimumFractionDigits:1,maximumFractionDigits:1})+'%'}`
        : `${p.blok}\n${tags.length} tagging`;
      metrics.set(key,{blok:p.blok, estate:p.estate, divisi:p.divisi,
        status,color:PROBLEM_COLORS[status],tagCount:tags.length,
        quantity,unit:category?.unit ?? null, contributionPct, denominator,
        label});
    }
    return {visibleTagging:selected, metrics, category, denominator};
  }

  return { categories, taggingRecords:data, filterRecords, getMapMetrics };
}
