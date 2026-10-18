/**
 * Smart Problem Tagging — Mobile Application Logic & Router
 * Implements 23 Routes, Persona Guards, Camera/GPS Engine, Leaflet Integration, and State Flow.
 */

(function () {
  'use strict';

  // Master references
  const Master = window.SPTMaster;
  const Geo = window.SPTGeo;
  const Store = window.SPTStore;

  // Active Map references for cleanup
  let currentLeafletMap = null;
  let activeMediaStream = null;
  let activeGpsWatcher = null;
  let simulatedGpsPreset = 'valid_s28';

  // Navigation State
  let activeRoute = '#/login';
  let routeParams = {};

  // Form State caches
  let newFindingDraft = {
    categoryId: '01',
    severity: 'Sedang',
    sensitivity: 'Major',
    volume: 100,
    unit: 'Meter',
    notes: '',
    blockKey: 'SKDE:DIVISI 3:S-28',
    primaryEvidenceId: null,
    actions: []
  };

  let activeCaptureContext = {
    returnRoute: '#/temuan/baru',
    mode: 'before', // 'before' | 'after'
    targetId: null, // findingId or actionId
    capturedEvidence: null
  };

  /**
   * Helper: Show Toast notification
   */
  function showToast(message, type = 'success') {
    let container = document.getElementById('appToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'appToastContainer';
      container.className = 'toast-container';
      document.querySelector('.mobile-phone-frame').appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Helper: Format Date
   */
  function formatDate(isoStr) {
    if (!isoStr) return '-';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoStr;
    }
  }

  function getFindingCoords(f) {
    if (!f) return { lat: 1.2584, lng: 116.1245 };
    if (f.coordinates && f.coordinates.lat) return f.coordinates;
    if (f.primaryEvidence && f.primaryEvidence.lat) return { lat: f.primaryEvidence.lat, lng: f.primaryEvidence.lng };
    return { lat: 1.2584, lng: 116.1245 };
  }

  /**
   * Clean up hardware sensors (camera + GPS)
   */
  function cleanupSensors() {
    if (activeMediaStream) {
      activeMediaStream.getTracks().forEach(t => t.stop());
      activeMediaStream = null;
    }
    if (activeGpsWatcher !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(activeGpsWatcher);
      activeGpsWatcher = null;
    }
    if (currentLeafletMap) {
      try {
        currentLeafletMap.remove();
      } catch (e) {}
      currentLeafletMap = null;
    }
  }

  /**
   * Persona Capability Guard
   */
  function checkPersonaGuard(route) {
    const persona = Store.getCurrentPersona();
    if (!persona) return true; // Handled by login

    // Asisten only can tag or revise
    if (['#/assessment/baru', '#/temuan/baru'].includes(route)) {
      if (!Master.canPersona(persona.id, 'canTag')) {
        return { allowed: false, reason: `Account ${persona.name} tidak memiliki wewenang membuat tagging assessment.` };
      }
    }
    // Askep / Manager only can verify assessment
    if (route.startsWith('#/assessment/') && route.endsWith('/verifikasi')) {
      if (!Master.canPersona(persona.id, 'canVerifyAssessment')) {
        return { allowed: false, reason: `Hanya Askep atau Manager yang dapat memverifikasi assessment.` };
      }
    }
    // Asisten or Mandor only can inspect realization
    if (route.startsWith('#/action/') && route.endsWith('/periksa')) {
      if (!Master.canPersona(persona.id, 'canInspectRealization')) {
        return { allowed: false, reason: `Hanya Asisten atau Mandor yang dapat memeriksa realisasi fisik.` };
      }
    }
    // Askep only can final verify realization
    if (route.startsWith('#/realisasi/') && route.endsWith('/verifikasi')) {
      if (!Master.canPersona(persona.id, 'canFinalVerifyRealization')) {
        return { allowed: false, reason: `Hanya Askep yang memiliki wewenang verifikasi akhir realisasi.` };
      }
    }
    return { allowed: true };
  }

  /**
   * ============================================================
   * ROUTE REGISTRATION & DISPATCHER
   * ============================================================
   */
  const routes = {
    '#/login': renderLogin,
    '#/persona': renderPersonaSelector,
    '#/account': renderPersonaSelector,
    '#/beranda': renderBeranda,
    '#/inspection': renderInspectionView,
    '#/blok': renderBlokList,
    '#/blok/:key': renderBlokDetail,
    '#/assessment/baru': renderAssessmentBaru,
    '#/temuan/baru': renderTemuanBaru,
    '#/capture': renderCapture,
    '#/temuan/:id': renderTemuanDetail,
    '#/assessment/:id/review': renderAssessmentReview,
    '#/tugas': renderTugas,
    '#/assessment/:id/verifikasi': renderAssessmentVerifikasi,
    '#/temuan/:id/revisi': renderTemuanRevisi,
    '#/action/:id': renderActionDetail,
    '#/action/:id/periksa': renderActionPeriksa,
    '#/realisasi/:id': renderRealisasiDetail,
    '#/realisasi/:id/verifikasi': renderRealisasiVerifikasi,
    '#/dokumentasi/:id': renderDokumentasi,
    '#/riwayat': renderRiwayat,
    '#/notifikasi': renderNotifikasi,
    '#/draft-sinkronisasi': renderDraftSinkronisasi,
    '#/profil': renderProfil,
    '#/bantuan': renderBantuan
  };

  function matchRoute(hash) {
    if (!hash || hash === '#' || hash === '#/') {
      return { handler: Store.isLoggedIn() ? routes['#/beranda'] : routes['#/login'], params: {}, routeName: Store.isLoggedIn() ? '#/beranda' : '#/login' };
    }

    // Direct match
    if (routes[hash]) {
      return { handler: routes[hash], params: {}, routeName: hash };
    }

    // Dynamic routes
    const hashParts = hash.split('/');
    for (const pattern of Object.keys(routes)) {
      const patternParts = pattern.split('/');
      if (patternParts.length === hashParts.length) {
        let match = true;
        let params = {};
        for (let i = 0; i < patternParts.length; i++) {
          if (patternParts[i].startsWith(':')) {
            const paramName = patternParts[i].slice(1);
            params[paramName] = decodeURIComponent(hashParts[i]);
          } else if (patternParts[i] !== hashParts[i]) {
            match = false;
            break;
          }
        }
        if (match) {
          return { handler: routes[pattern], params, routeName: pattern };
        }
      }
    }

    return { handler: renderNotFound, params: {}, routeName: '404' };
  }

  function navigate(hash) {
    window.location.hash = hash;
  }

  function handleRoute() {
    cleanupSensors();

    const currentHash = window.location.hash || '#/login';
    activeRoute = currentHash;

    // Auth guard
    if (!Store.isLoggedIn() && currentHash !== '#/login') {
      window.location.hash = '#/login';
      return;
    }
    if (Store.isLoggedIn() && currentHash === '#/login') {
      window.location.hash = '#/beranda';
      return;
    }

    const { handler, params, routeName } = matchRoute(currentHash);
    routeParams = params;

    // Check persona capability
    const guard = checkPersonaGuard(currentHash);
    if (!guard.allowed) {
      renderForbidden(guard.reason);
      updateAppShell(routeName);
      return;
    }

    // Render screen
    handler(params);
    updateAppShell(routeName);

    // Scroll container to top
    const container = document.getElementById('appContentContainer');
    if (container) container.scrollTop = 0;
  }

  /**
   * Update Top Bar & Bottom Nav
   */
  function updateAppShell(routeName) {
    const persona = Store.getCurrentPersona();
    const topBar = document.getElementById('appTopBar');
    const bottomNav = document.getElementById('appBottomNav');
    const personaBtn = document.getElementById('topBarPersonaBtn');
    const notifBadge = document.getElementById('topBarNotifBadge');
    const unreadCount = Store.getUnreadNotificationsCount();

    if (notifBadge) {
      if (unreadCount > 0) {
        notifBadge.textContent = unreadCount;
        notifBadge.style.display = 'flex';
      } else {
        notifBadge.style.display = 'none';
      }
    }

    if (personaBtn && persona) {
      personaBtn.innerHTML = `
        <span class="persona-avatar-dot">${persona.name.charAt(0)}</span>
        <span>${persona.name}</span>
      `;
    }

    // Hide or show bottom nav based on route
    const hideNavRoutes = ['#/login', '#/persona', '#/account', '#/capture'];
    if (bottomNav) {
      if (hideNavRoutes.includes(routeName) || !Store.isLoggedIn()) {
        bottomNav.style.display = 'none';
      } else {
        bottomNav.style.display = 'flex';
        // Highlight active tab
        document.querySelectorAll('.nav-item').forEach(item => {
          const tab = item.getAttribute('data-tab');
          if (
            (tab === 'beranda' && routeName === '#/beranda') ||
            (tab === 'inspection' && routeName.startsWith('#/inspection')) ||
            (tab === 'temuan' && (routeName.startsWith('#/temuan') || routeName.startsWith('#/blok'))) ||
            (tab === 'action' && (routeName.startsWith('#/action') || routeName.startsWith('#/realisasi'))) ||
            (tab === 'account' && (routeName.startsWith('#/profil') || routeName.startsWith('#/persona') || routeName.startsWith('#/account')))
          ) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    }

    // Hide or show top bar on login
    if (topBar) {
      if (routeName === '#/login') {
        topBar.style.display = 'none';
      } else {
        topBar.style.display = 'flex';
      }
    }
  }

  /**
   * ============================================================
   * 23 ROUTE RENDERERS
   * ============================================================
   */

  // 1. #/login
  function renderLogin() {
    const container = document.getElementById('appContentContainer');
    container.innerHTML = `
      <div style="text-align: center; margin-top: 30px; margin-bottom: 24px;">
        <div style="width: 56px; height: 56px; background: var(--primary); border-radius: 14px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 24px; font-weight: 900; box-shadow: var(--shadow-md);">
          SPT
        </div>
        <h2 style="font-size: 20px; font-weight: 800;">Smart Problem Tagging</h2>
        <p class="text-muted text-small" style="margin-top: 4px;">Aplikasi Operasional Lapangan & Verifikasi</p>
      </div>

      <div class="app-card" style="padding: 18px;">
        <h3 style="font-size: 14px; margin-bottom: 12px; font-weight: 700;">Masuk Akun Demo</h3>
        
        <form id="loginForm">
          <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" id="loginUsername" class="form-input" value="admin_spt" required autocomplete="username" />
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="loginPassword" class="form-input" value="SPT2026!" required autocomplete="current-password" />
            <span class="form-hint">Kredensial demo resmi: <strong>admin_spt / SPT2026!</strong></span>
          </div>

          <div id="loginError" class="form-error" style="display: none; margin-bottom: 10px;"></div>

          <button type="submit" class="btn btn-primary btn-block" style="margin-top: 6px;">
            Masuk ke Aplikasi
          </button>
        </form>
      </div>

      <div class="app-card" style="background-color: var(--surface-subtle); border: 1px dashed var(--border-strong); padding: 12px;">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">ℹ Catatan Mode Mockup</div>
        <p style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">
          Mockup ini berjalan 100% lokal di peramban Anda. Setelah masuk, Anda dapat beralih antara 4 Account (Asisten, Mandor, Askep, Manager) untuk menguji seluruh siklus assessment dan realisasi.
        </p>
      </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const u = document.getElementById('loginUsername').value.trim();
      const p = document.getElementById('loginPassword').value.trim();
      const errEl = document.getElementById('loginError');

      if (Store.login(u, p)) {
        showToast('Login berhasil sebagai Administrator SPT');
        navigate('#/account');
      } else {
        errEl.textContent = 'Username atau password salah. Gunakan admin_spt / SPT2026!';
        errEl.style.display = 'block';
      }
    });
  }

  // 2. #/persona
  function renderPersonaSelector() {
    const current = Store.getCurrentPersona();
    const personas = Master.PERSONAS;
    const container = document.getElementById('appContentContainer');

    let personasHtml = Object.values(personas).map(p => {
      const isSelected = current && current.id === p.id;
      return `
        <div class="app-card persona-select-card ${isSelected ? 'selected' : ''}" data-persona-id="${p.id}" style="cursor: pointer; border: 2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}; background: ${isSelected ? '#FFF5F5' : '#FFF'}; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="persona-avatar-dot" style="width: 28px; height: 28px; font-size: 13px;">${p.name.charAt(0)}</span>
              <div>
                <div style="font-size: 14px; font-weight: 700;">${p.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${p.roleTitle} — Scope: <strong>${p.scopeLabel}</strong></div>
              </div>
            </div>
            ${isSelected ? '<span class="badge badge-approved">Aktif</span>' : ''}
          </div>
          <div style="font-size: 11px; color: var(--text-muted); border-top: 1px solid rgba(0,0,0,0.05); padding-top: 6px;">
            ${p.description}
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;">
            ${p.permissions.canTag ? '<span class="badge badge-draft">Tagging</span>' : ''}
            ${p.permissions.canVerifyAssessment ? '<span class="badge badge-submitted">Verifikasi Assessment</span>' : ''}
            ${p.permissions.canInspectRealization ? '<span class="badge badge-inprogress">Periksa Realisasi</span>' : ''}
            ${p.permissions.canFinalVerifyRealization ? '<span class="badge badge-approved">Verifikasi Akhir</span>' : ''}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Pilih Account Demo</h2>
        <p class="text-muted text-small">Beralih peran untuk mensimulasikan siklus operasional.</p>
      </div>

      <div class="simulation-banner">
        <span>⚠️</span>
        <div><strong>Mode Demo:</strong> Switcher ini disediakan untuk verifikasi alur mockup. Sesi audit log tidak akan berubah.</div>
      </div>

      <div class="list-group" style="margin-bottom: 16px;">
        ${personasHtml}
      </div>

      <button id="btnConfirmPersona" class="btn btn-primary btn-block">
        Lanjutkan dengan Account Ini
      </button>
    `;

    let selectedId = current ? current.id : 'asisten';

    container.querySelectorAll('.persona-select-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.persona-select-card').forEach(c => {
          c.style.borderColor = 'var(--border)';
          c.style.background = '#FFF';
        });
        card.style.borderColor = 'var(--primary)';
        card.style.background = '#FFF5F5';
        selectedId = card.getAttribute('data-persona-id');
      });
    });

    document.getElementById('btnConfirmPersona').addEventListener('click', () => {
      Store.setPersona(selectedId);
      showToast(`Beralih ke Account ${Master.PERSONAS[selectedId].name}`);
      navigate('#/beranda');
    });
  }

  // 3. #/beranda
  function renderBeranda() {
    const persona = Store.getCurrentPersona();
    const stats = Store.getSummaryStats();
    const container = document.getElementById('appContentContainer');

    // Quick action buttons based on persona
    let quickActionsHtml = '';
    if (persona.permissions.canTag) {
      quickActionsHtml += `
        <button class="btn btn-primary btn-block" onclick="location.hash='#/assessment/baru'" style="margin-bottom: 6px;">
          ＋ Buat Assessment Blok Baru
        </button>
        <button class="btn btn-secondary btn-block" onclick="location.hash='#/tugas'">
          📋 Tugas & Draft Saya
        </button>
      `;
    } else if (persona.permissions.canVerifyAssessment) {
      quickActionsHtml += `
        <button class="btn btn-primary btn-block" onclick="location.hash='#/tugas'" style="margin-bottom: 6px;">
          ✓ Verifikasi Assessment Menunggu (${stats.pendingAssessment})
        </button>
        <button class="btn btn-secondary btn-block" onclick="location.hash='#/blok'">
          🗺 Peta & Sebaran Blok
        </button>
      `;
    } else if (persona.permissions.canInspectRealization) {
      quickActionsHtml += `
        <button class="btn btn-primary btn-block" onclick="location.hash='#/tugas'" style="margin-bottom: 6px;">
          🔍 Periksa Realisasi Fisik
        </button>
        <button class="btn btn-secondary btn-block" onclick="location.hash='#/blok'">
          🗺 Peta & Daftar Blok
        </button>
      `;
    }

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div>
          <h2 style="font-size: 16px; font-weight: 800;">Halo, ${persona.name}</h2>
          <p class="text-muted text-small">${persona.roleTitle} — Scope: <strong>${persona.scopeLabel}</strong></p>
        </div>
        <span class="badge badge-timeframe">SPT v1.0</span>
      </div>

      <div class="simulation-banner">
        <span>⚠️</span>
        <div><strong>SIMULASI — bukan bukti lapangan:</strong> Mockup operasional Trabas SKDE.</div>
      </div>

      <!-- STATS SUMMARY GRID -->
      <div class="stats-grid-2">
        <div class="stat-box">
          <span class="stat-label">Temuan Aktif</span>
          <span class="stat-value">${stats.totalFindings}</span>
          <span class="stat-sub"><strong style="color: #BE123C">${stats.majorCount} Major</strong> · ${stats.minorCount} Minor</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Menunggu Verifikasi</span>
          <span class="stat-value" style="color: #D97706;">${stats.pendingAssessment}</span>
          <span class="stat-sub">Assessment blok baru</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Action Plan Aktif</span>
          <span class="stat-value">${stats.activeActions}</span>
          <span class="stat-sub">${stats.completedActions} selesai terlaksana</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Batch Realisasi</span>
          <span class="stat-value" style="color: #0284C7;">${stats.pendingRealization}</span>
          <span class="stat-sub">Menunggu pengesahan</span>
        </div>
      </div>

      <!-- QUICK ACTIONS -->
      <div class="app-card" style="margin-bottom: 14px;">
        <div class="card-header">
          <span style="font-size: 12px; font-weight: 700;">Aksi Cepat (${persona.name})</span>
        </div>
        ${quickActionsHtml}
      </div>

      <!-- SEED DEMO JOURNEYS SHORTCUTS -->
      <div class="app-card">
        <div class="card-header">
          <span style="font-size: 12px; font-weight: 700;">Skenario Demo Siap Uji</span>
          <span class="badge badge-draft">6 Journey</span>
        </div>
        <div class="list-group">
          <div class="list-item" onclick="location.hash='#/temuan/baru'">
            <div class="list-item-left">
              <span style="font-size: 18px;">📸</span>
              <div class="list-item-content">
                <div class="list-item-title">1. Tagging Baru (Asisten)</div>
                <div class="list-item-sub">Foto sensor & koordinat locked di S-28</div>
              </div>
            </div>
            <span>›</span>
          </div>

          <div class="list-item" onclick="location.hash='#/assessment/ASM-2026-08-S29/verifikasi'">
            <div class="list-item-left">
              <span style="font-size: 18px;">⚖</span>
              <div class="list-item-content">
                <div class="list-item-title">2. Verifikasi Assessment (Askep)</div>
                <div class="list-item-sub">Review temuan Blok S-29, minta revisi</div>
              </div>
            </div>
            <span>›</span>
          </div>

          <div class="list-item" onclick="location.hash='#/action/ACT-001/periksa'">
            <div class="list-item-left">
              <span style="font-size: 18px;">🚜</span>
              <div class="list-item-content">
                <div class="list-item-title">3. Realisasi Bertahap (Mandor)</div>
                <div class="list-item-sub">Pasar Pikul 1.000m (600 disahkan, 250 pending)</div>
              </div>
            </div>
            <span>›</span>
          </div>

          <div class="list-item" onclick="location.hash='#/realisasi/RB-002/verifikasi'">
            <div class="list-item-left">
              <span style="font-size: 18px;">✓</span>
              <div class="list-item-content">
                <div class="list-item-title">4. Pengesahan Batch (Askep)</div>
                <div class="list-item-sub">Sahkan volume & cek kondisi teratasi</div>
              </div>
            </div>
            <span>›</span>
          </div>

          <div class="list-item" onclick="location.hash='#/dokumentasi/FND-006'">
            <div class="list-item-left">
              <span style="font-size: 18px;">📷</span>
              <div class="list-item-content">
                <div class="list-item-title">5. Before–After Selesai</div>
                <div class="list-item-sub">Dokumentasi Titi Panen Blok S-28</div>
              </div>
            </div>
            <span>›</span>
          </div>

          <div class="list-item" onclick="location.hash='#/bantuan'">
            <div class="list-item-left">
              <span style="font-size: 18px;">📖</span>
              <div class="list-item-content">
                <div class="list-item-title">6. Panduan DevTools & Master</div>
                <div class="list-item-sub">Instruksi sensor GPS & 16 kategori Trabas</div>
              </div>
            </div>
            <span>›</span>
          </div>
        </div>
      </div>
    `;
  }

  // 4. #/blok
  function renderBlokList() {
    const blocks = Geo.getAvailableBlocks();
    const findings = Store.getFindings();
    const container = document.getElementById('appContentContainer');

    // Aggregate counts per block
    const blockStats = {};
    findings.forEach(f => {
      if (!blockStats[f.blockKey]) {
        blockStats[f.blockKey] = { total: 0, major: 0, minor: 0, draft: 0, active: 0 };
      }
      blockStats[f.blockKey].total++;
      if (f.sensitivity === 'Major') blockStats[f.blockKey].major++;
      if (f.sensitivity === 'Minor') blockStats[f.blockKey].minor++;
      if (f.assessmentState === 'Draft') blockStats[f.blockKey].draft++;
      if (f.assessmentState === 'Approved') blockStats[f.blockKey].active++;
    });

    let blockItemsHtml = blocks.map(b => {
      const stat = blockStats[b.key] || { total: 0, major: 0, minor: 0, draft: 0, active: 0 };
      return `
        <div class="list-item" onclick="location.hash='#/blok/${encodeURIComponent(b.key)}'">
          <div class="list-item-left">
            <div style="width: 38px; height: 38px; border-radius: 8px; background: var(--surface-subtle); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: var(--text-main);">
              ${b.blockId}
            </div>
            <div class="list-item-content">
              <div class="list-item-title">${b.estate} · ${b.divisi} · Blok ${b.blockId}</div>
              <div class="list-item-sub">${stat.total} temuan total (${stat.major} Major, ${stat.minor} Minor)</div>
            </div>
          </div>
          <div class="list-item-right">
            ${stat.active > 0 ? `<span class="badge badge-approved">${stat.active} Aktif</span>` : '<span class="badge badge-draft">Normal</span>'}
            <span style="font-size: 11px; color: var(--text-light);">Lihat Peta ›</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div style="margin-bottom: 10px;">
        <h2 style="font-size: 16px; font-weight: 800;">Peta & Sebaran Blok</h2>
        <p class="text-muted text-small">Pilih blok untuk melihat perimeter polygon dan titik permasalahan.</p>
      </div>

      <!-- Mini Map for Block Overview -->
      <div id="blokListMap" class="map-viewport"></div>

      <div class="section-title" style="margin-top: 12px;">
        <span>Daftar Blok (${blocks.length} Blok Aktif)</span>
      </div>

      <div class="list-group">
        ${blockItemsHtml}
      </div>
    `;

    // Initialize Leaflet Map for overview
    setTimeout(() => {
      initBlockOverviewMap('blokListMap');
    }, 50);
  }

  function initBlockOverviewMap(elementId) {
    if (!window.L) return;
    const mapEl = document.getElementById(elementId);
    if (!mapEl) return;

    if (currentLeafletMap) {
      currentLeafletMap.remove();
    }

    currentLeafletMap = L.map(elementId, {
      zoomControl: true,
      attributionControl: false
    }).setView([1.2584, 116.1245], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(currentLeafletMap);

    // Draw polygons from Geo module
    Geo.loadSKDEGeoJson().then(() => {
      const geojson = Geo.getRawGeoJson();
      if (geojson && currentLeafletMap) {
        L.geoJSON(geojson, {
          style: {
            color: '#10B981',
            weight: 2,
            fillColor: '#10B981',
            fillOpacity: 0.15
          },
          onEachFeature: (feature, layer) => {
            const props = feature.properties || {};
            layer.bindPopup(`<strong>Blok ${props.BLOCK || props.blok || '-'}</strong><br>${props.DIVISI || props.divisi || '-'}`);
          }
        }).addTo(currentLeafletMap);

        // Add pins from Store
        Store.getFindings().forEach(f => {
          const cat = Master.getCategory(f.categoryId);
          const coords = getFindingCoords(f);
          if (coords && cat) {
            const icon = createLeafletPinIcon(cat);
            L.marker([coords.lat, coords.lng], { icon })
              .bindPopup(`<strong>${cat.name}</strong><br>Severity: ${f.severity}<br>Status: ${f.assessmentState}`)
              .addTo(currentLeafletMap);
          }
        });
      }
    });
  }

  function createLeafletPinIcon(cat) {
    const isDrop = cat.markerSymbol === 'drop';
    const html = isDrop 
      ? `<div style="width: 22px; height: 22px; border-radius: 50% 50% 50% 0; background-color: ${cat.markerColor}; transform: rotate(-45deg); border: 2px solid #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.4);"></div>`
      : `<div style="width: 20px; height: 20px; border-radius: 50%; background-color: ${cat.markerColor}; border: 2px solid #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.4);"></div>`;
    
    return L.divIcon({
      className: 'spt-custom-pin',
      html,
      iconSize: [22, 22],
      iconAnchor: [11, 22]
    });
  }

  // 5. #/blok/:key
  function renderBlokDetail(params) {
    const blockKey = params.key;
    const parts = blockKey.split(':');
    const estate = parts[0] || 'SKDE';
    const divisi = parts[1] || 'DIVISI 3';
    const blockId = parts[2] || blockKey;

    const findings = Store.getFindingsByBlock(blockKey);
    const container = document.getElementById('appContentContainer');
    const persona = Store.getCurrentPersona();

    let majorCount = 0;
    let minorCount = 0;
    findings.forEach(f => {
      if (f.sensitivity === 'Major') majorCount++;
      if (f.sensitivity === 'Minor') minorCount++;
    });

    let findingsListHtml = findings.map(f => {
      const cat = Master.getCategory(f.categoryId);
      return `
        <div class="list-item" onclick="location.hash='#/temuan/${f.id}'">
          <div class="list-item-left">
            <span class="${cat.markerSymbol === 'drop' ? 'cat-symbol-drop' : 'cat-symbol-dot'}" style="background-color: ${cat.markerColor}; width: 14px; height: 14px;"></span>
            <div class="list-item-content">
              <div class="list-item-title">${cat.name}</div>
              <div class="list-item-sub">${f.volume} ${f.unit} · ${f.notes || 'Tanpa catatan'}</div>
            </div>
          </div>
          <div class="list-item-right">
            <span class="badge ${f.severity === 'Berat' ? 'badge-berat' : f.severity === 'Sedang' ? 'badge-sedang' : 'badge-ringan'}">${f.severity}</span>
            <span class="badge ${f.assessmentState === 'Approved' ? 'badge-approved' : f.assessmentState === 'Submitted' ? 'badge-submitted' : 'badge-draft'}">${f.assessmentState}</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/blok'">
          ‹ Kembali ke Daftar Blok
        </button>
        <span class="badge badge-draft">${estate} · ${divisi}</span>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 18px; font-weight: 800;">Blok ${blockId}</h2>
        <p class="text-muted text-small">${findings.length} temuan terinventarisasi (${majorCount} Major · ${minorCount} Minor)</p>
      </div>

      <!-- Single Block Map -->
      <div id="singleBlokMap" class="map-viewport"></div>

      ${persona.permissions.canTag ? `
        <button class="btn btn-primary btn-block" style="margin-bottom: 12px;" onclick="location.hash='#/temuan/baru?blockKey=${encodeURIComponent(blockKey)}'">
          ＋ Tambah Temuan di Blok ${blockId}
        </button>
      ` : ''}

      <div class="section-title">
        <span>Daftar Temuan Masalah</span>
      </div>

      <div class="list-group">
        ${findingsListHtml || '<div class="text-muted text-small" style="padding: 16px; text-align: center;">Belum ada temuan di blok ini.</div>'}
      </div>
    `;

    setTimeout(() => {
      initSingleBlockMap('singleBlokMap', blockKey, findings);
    }, 50);
  }

  function initSingleBlockMap(elementId, blockKey, findings) {
    if (!window.L) return;
    const mapEl = document.getElementById(elementId);
    if (!mapEl) return;

    if (currentLeafletMap) {
      currentLeafletMap.remove();
    }

    // Default center in SKDE S-28
    currentLeafletMap = L.map(elementId, {
      zoomControl: true,
      attributionControl: false
    }).setView([1.2584, 116.1245], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(currentLeafletMap);

    // Filter polygon for this specific block
    Geo.loadSKDEGeoJson().then(() => {
      const geojson = Geo.getRawGeoJson();
      if (geojson && currentLeafletMap) {
        const parts = blockKey.split(':');
        const targetBlock = parts[2] || '';

        const layer = L.geoJSON(geojson, {
          filter: (feature) => {
            const props = feature.properties || {};
            const b = props.BLOCK || props.blok || '';
            return b.trim() === targetBlock.trim();
          },
          style: {
            color: '#C90016',
            weight: 3,
            fillColor: '#C90016',
            fillOpacity: 0.12
          }
        }).addTo(currentLeafletMap);

        if (layer.getBounds().isValid()) {
          currentLeafletMap.fitBounds(layer.getBounds(), { padding: [20, 20] });
        }

        // Add pins
        findings.forEach(f => {
          const cat = Master.getCategory(f.categoryId);
          const coords = getFindingCoords(f);
          if (coords && cat) {
            const icon = createLeafletPinIcon(cat);
            L.marker([coords.lat, coords.lng], { icon })
              .bindPopup(`<strong>${cat.name}</strong><br>Severity: ${f.severity}<br>Vol: ${f.volume} ${f.unit}`)
              .addTo(currentLeafletMap);
          }
        });
      }
    });
  }

  // 6. #/assessment/baru
  function renderAssessmentBaru() {
    const container = document.getElementById('appContentContainer');
    const persona = Store.getCurrentPersona();
    const blocks = Geo.getAvailableBlocks();

    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Buat Assessment Blok Baru</h2>
        <p class="text-muted text-small">Siklus assessment satu blok per round oleh Asisten.</p>
      </div>

      <div class="app-card">
        <div class="form-group">
          <label class="form-label">Pilih Blok Penugasan <span class="required">*</span></label>
          <select id="newAsmBlock" class="form-select">
            ${blocks.map(b => `<option value="${b.key}">${b.estate} · ${b.divisi} · Blok ${b.blockId}</option>`).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Round / Periode Assessment</label>
          <input type="text" id="newAsmRound" class="form-input" value="Agustus 2026 - R1" readonly />
        </div>

        <div class="form-group">
          <label class="form-label">Petugas Tagging</label>
          <input type="text" class="form-input" value="${persona.name} (${persona.roleTitle})" readonly />
        </div>

        <button id="btnStartTaggingFinding" class="btn btn-primary btn-block" style="margin-top: 8px;">
          ＋ Tambah Temuan Pertama di Blok Ini
        </button>
      </div>
    `;

    document.getElementById('btnStartTaggingFinding').addEventListener('click', () => {
      const selectedBlock = document.getElementById('newAsmBlock').value;
      newFindingDraft.blockKey = selectedBlock;
      navigate('#/temuan/baru');
    });
  }

  // 7. #/temuan/baru
  function renderTemuanBaru() {
    const container = document.getElementById('appContentContainer');
    const categories = Master.CATEGORIES;
    const selectedCat = Master.getCategory(newFindingDraft.categoryId);
    const allowedActions = Master.getAllowedActions(newFindingDraft.categoryId);

    container.innerHTML = `
      <div class="stepper-header">
        <div class="stepper-step-item completed">
          <div class="step-circle">1</div>
          <span class="step-label">Kategori</span>
        </div>
        <div class="stepper-step-item active">
          <div class="step-circle">2</div>
          <span class="step-label">Foto/GPS</span>
        </div>
        <div class="stepper-step-item">
          <div class="step-circle">3</div>
          <span class="step-label">Detail</span>
        </div>
        <div class="stepper-step-item">
          <div class="step-circle">4</div>
          <span class="step-label">Action</span>
        </div>
      </div>

      <div style="margin-bottom: 10px;">
        <h2 style="font-size: 16px; font-weight: 800;">Formulir Tagging Temuan</h2>
        <p class="text-muted text-small">Blok: <strong>${newFindingDraft.blockKey}</strong></p>
      </div>

      <form id="formNewFinding">
        <!-- 1. KATEGORI -->
        <div class="app-card">
          <div class="form-group">
            <label class="form-label">Permasalahan Trabas (16 Kategori Master) <span class="required">*</span></label>
            <select id="fieldCategory" class="form-select">
              ${categories.map(c => `
                <option value="${c.id}" ${c.id === newFindingDraft.categoryId ? 'selected' : ''}>
                  ${c.id}. ${c.name} (${c.unit}) — ${c.sensitivity}
                </option>
              `).join('')}
            </select>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 4px;">
            <span class="badge badge-timeframe" id="badgeTimeframe">${selectedCat.timeframe}</span>
            <span class="badge ${selectedCat.sensitivity === 'Major' ? 'badge-major' : 'badge-minor'}" id="badgeSensitivity">
              Sensitivity: ${selectedCat.sensitivity}
            </span>
            <span class="badge badge-draft" id="badgeUnit">Unit: ${selectedCat.unit}</span>
          </div>
        </div>

        <!-- 2. EVIDENCE FOTO UTAMA & KOORDINAT LOCKED -->
        <div class="app-card">
          <div class="card-header">
            <span style="font-size: 12px; font-weight: 700;">Bukti Foto & Koordinat (Wajib)</span>
            ${newFindingDraft.primaryEvidenceId ? '<span class="badge badge-approved">Terekam</span>' : '<span class="badge badge-rejected">Belum Ada</span>'}
          </div>

          ${newFindingDraft.primaryEvidenceId ? `
            <div class="evidence-card">
              <div class="evidence-header">
                <span>📍 KOORDINAT TERKUNCI DARI FOTO</span>
                <span class="badge badge-draft">${newFindingDraft.primaryEvidence.captureMode}</span>
              </div>
              <div class="evidence-grid">
                <div class="evidence-item">
                  <span class="item-label">Latitude</span>
                  <span class="item-val">${newFindingDraft.primaryEvidence.latitude.toFixed(6)}</span>
                </div>
                <div class="evidence-item">
                  <span class="item-label">Longitude</span>
                  <span class="item-val">${newFindingDraft.primaryEvidence.longitude.toFixed(6)}</span>
                </div>
                <div class="evidence-item">
                  <span class="item-label">Akurasi GPS</span>
                  <span class="item-val">±${newFindingDraft.primaryEvidence.accuracyMeters.toFixed(1)} m</span>
                </div>
                <div class="evidence-item">
                  <span class="item-label">Waktu Shutter</span>
                  <span class="item-val">${new Date(newFindingDraft.primaryEvidence.capturedAt).toLocaleTimeString('id-ID')}</span>
                </div>
              </div>
              <div style="margin-top: 8px; font-size: 10px; color: var(--text-muted);">
                Deteksi Blok: <strong>${newFindingDraft.primaryEvidence.detectedBlockKey}</strong>
              </div>
            </div>
            <button type="button" id="btnRetakePhoto" class="btn btn-secondary btn-block">
              🔄 Retake Foto & Perbarui Koordinat
            </button>
          ` : `
            <p class="text-muted text-small" style="margin-bottom: 8px;">
              Lokasi temuan diambil otomatis dari sensor GPS pada detik foto dijepret. Bukan klik peta manual.
            </p>
            <button type="button" id="btnOpenCapture" class="btn btn-primary btn-block">
              📷 Buka Kamera & Ambil Foto Shutter
            </button>
          `}
        </div>

        <!-- 3. SEVERITY & VOLUME -->
        <div class="app-card">
          <div class="form-group">
            <label class="form-label">Severity Masalah <span class="required">*</span></label>
            <div class="radio-tile-group">
              <div class="radio-tile ${newFindingDraft.severity === 'Ringan' ? 'selected' : ''}" data-sev="Ringan">
                <span style="font-size: 13px; font-weight: 700; color: #15803D;">Ringan</span>
                <span style="font-size: 9px; color: var(--text-muted);">Contoh: awal</span>
              </div>
              <div class="radio-tile ${newFindingDraft.severity === 'Sedang' ? 'selected' : ''}" data-sev="Sedang">
                <span style="font-size: 13px; font-weight: 700; color: #D97706;">Sedang</span>
                <span style="font-size: 9px; color: var(--text-muted);">Contoh: moderat</span>
              </div>
              <div class="radio-tile ${newFindingDraft.severity === 'Berat' ? 'selected' : ''}" data-sev="Berat">
                <span style="font-size: 13px; font-weight: 700; color: #DC2626;">Berat</span>
                <span style="font-size: 9px; color: var(--text-muted);">Contoh: parah</span>
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-top: 8px;">
            <label class="form-label">Volume Temuan (<span id="labelVolumeUnit">${selectedCat.unit}</span>) <span class="required">*</span></label>
            <input type="number" id="fieldVolume" class="form-input" value="${newFindingDraft.volume}" min="1" step="${selectedCat.unit === 'Pkk' || selectedCat.unit === 'Unit' ? '1' : '0.1'}" required />
            <span class="form-hint">Satuan resmi: <strong>${selectedCat.unit}</strong> (tidak dapat diubah).</span>
          </div>

          <div class="form-group">
            <label class="form-label">Catatan Kondisi Lapangan</label>
            <textarea id="fieldNotes" class="form-textarea" placeholder="Deskripsikan kondisi spesifik temuan...">${escapeHtml(newFindingDraft.notes)}</textarea>
          </div>
        </div>

        <!-- 4. USULAN ACTION PLAN -->
        <div class="app-card">
          <div class="card-header">
            <span style="font-size: 12px; font-weight: 700;">Usulan Action Plan Penanganan</span>
          </div>

          <div class="form-group">
            <label class="form-label">Pilih Jenis Action Master <span class="required">*</span></label>
            <select id="fieldActionType" class="form-select">
              ${allowedActions.map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Target Cakupan Penanganan (${selectedCat.unit})</label>
            <input type="number" id="fieldActionTarget" class="form-input" value="${newFindingDraft.volume}" min="1" />
          </div>

          <div class="form-group">
            <label class="form-label">PIC / Pelaksana Penugasan</label>
            <input type="text" id="fieldActionPic" class="form-input" value="Mandor 1 - Divisi 3" />
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button type="button" id="btnSaveDraft" class="btn btn-secondary" style="flex: 1;">
            💾 Simpan Draft
          </button>
          <button type="submit" id="btnSubmitFinding" class="btn btn-primary" style="flex: 1;" ${!newFindingDraft.primaryEvidenceId ? 'disabled' : ''}>
            Kirim Assessment ›
          </button>
        </div>
      </form>
    `;

    // Category change handler
    document.getElementById('fieldCategory').addEventListener('change', (e) => {
      const catId = e.target.value;
      newFindingDraft.categoryId = catId;
      const cat = Master.getCategory(catId);
      document.getElementById('badgeTimeframe').textContent = cat.timeframe;
      document.getElementById('badgeSensitivity').textContent = `Sensitivity: ${cat.sensitivity}`;
      document.getElementById('badgeUnit').textContent = `Unit: ${cat.unit}`;
      document.getElementById('labelVolumeUnit').textContent = cat.unit;

      // Update allowed actions dropdown
      const actions = Master.getAllowedActions(catId);
      const selAction = document.getElementById('fieldActionType');
      selAction.innerHTML = actions.map(a => `<option value="${a}">${a}</option>`).join('');
    });

    // Severity radio tiles
    container.querySelectorAll('.radio-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        container.querySelectorAll('.radio-tile').forEach(t => t.classList.remove('selected'));
        tile.classList.add('selected');
        newFindingDraft.severity = tile.getAttribute('data-sev');
      });
    });

    // Open Camera
    const btnOpen = document.getElementById('btnOpenCapture');
    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        activeCaptureContext.returnRoute = '#/temuan/baru';
        activeCaptureContext.mode = 'before';
        navigate('#/capture');
      });
    }

    const btnRetake = document.getElementById('btnRetakePhoto');
    if (btnRetake) {
      btnRetake.addEventListener('click', () => {
        activeCaptureContext.returnRoute = '#/temuan/baru';
        activeCaptureContext.mode = 'before';
        navigate('#/capture');
      });
    }

    // Save Draft
    document.getElementById('btnSaveDraft').addEventListener('click', () => {
      showToast('Draft temuan tersimpan di penyimpanan lokal');
      navigate('#/tugas');
    });

    // Submit form
    document.getElementById('formNewFinding').addEventListener('submit', (e) => {
      e.preventDefault();
      if (!newFindingDraft.primaryEvidenceId) {
        showToast('Foto utama dan koordinat GPS wajib diambil sebelum submit!', 'error');
        return;
      }

      const vol = parseFloat(document.getElementById('fieldVolume').value);
      const notes = document.getElementById('fieldNotes').value;
      const actionType = document.getElementById('fieldActionType').value;
      const actionTarget = parseFloat(document.getElementById('fieldActionTarget').value) || vol;
      const actionPic = document.getElementById('fieldActionPic').value;

      // Create new finding in store
      const cat = Master.getCategory(newFindingDraft.categoryId);
      const findingId = 'FND-' + String(Date.now()).slice(-4);
      const assessmentId = 'ASM-' + newFindingDraft.blockKey.split(':')[2] + '-' + String(Date.now()).slice(-4);

      const findingRecord = {
        id: findingId,
        assessmentId: assessmentId,
        blockKey: newFindingDraft.blockKey,
        categoryId: newFindingDraft.categoryId,
        categoryName: cat.name,
        timeframe: cat.timeframe,
        sensitivity: cat.sensitivity,
        severity: newFindingDraft.severity,
        volume: vol,
        unit: cat.unit,
        notes: notes,
        primaryEvidenceId: newFindingDraft.primaryEvidenceId,
        coordinates: {
          lat: newFindingDraft.primaryEvidence.latitude,
          lng: newFindingDraft.primaryEvidence.longitude
        },
        assessmentState: 'Submitted',
        problemCondition: 'Belum teratasi',
        closure: null,
        createdAt: new Date().toISOString()
      };

      const actionRecord = {
        id: 'ACT-' + String(Date.now()).slice(-4),
        findingId: findingId,
        actionType: actionType,
        targetCoverage: actionTarget,
        coverageUnit: cat.unit,
        pic: actionPic,
        dueDate: '2026-09-01',
        state: 'Planned',
        batches: []
      };

      Store.addFinding(findingRecord, actionRecord);
      showToast(`Assessment temuan ${cat.name} berhasil dikirim ke Askep!`);
      
      // Reset draft
      newFindingDraft.primaryEvidenceId = null;
      newFindingDraft.primaryEvidence = null;
      
      navigate(`#/temuan/${findingId}`);
    });
  }

  // 8. #/capture
  function renderCapture() {
    const container = document.getElementById('appContentContainer');
    let isSimulating = true; // Default to simulation mode for laptop testing

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" id="btnCancelCapture">
          ‹ Batal
        </button>
        <span class="badge badge-draft">Kamera Shutter</span>
      </div>

      <!-- Simulation Mode Banner -->
      <div class="simulation-banner" id="captureSimBanner">
        <span>⚠️</span>
        <div><strong>SIMULASI — bukan bukti lapangan:</strong> Koordinat di-generate dari polygon SKDE resmi.</div>
      </div>

      <!-- Camera Viewport with Video & Overlay -->
      <div class="camera-container" id="cameraViewport">
        <video id="liveVideo" class="camera-video" autoplay playsinline muted style="display: none;"></video>
        <canvas id="snapshotCanvas" class="camera-canvas"></canvas>

        <div class="camera-overlay-header">
          <div class="gps-quality-pill" id="gpsQualityPill">
            <span class="gps-dot good" id="gpsQualityDot"></span>
            <span id="gpsQualityText">GPS Aktif: ±3.5m (S-28)</span>
          </div>
          <span class="badge badge-timeframe" id="timeLabel">Live</span>
        </div>
      </div>

      <!-- Shutter Controls -->
      <div class="camera-shutter-bar">
        <button class="btn btn-secondary" id="btnToggleSimMode" style="font-size: 11px; padding: 6px 10px; min-height: 38px;">
          ⚙ Simulasi Preset
        </button>
        <button class="shutter-btn" id="btnShutter" title="Tekan untuk jepret foto & rekam koordinat">
          <div class="shutter-btn-inner"></div>
        </button>
        <button class="btn btn-secondary" id="btnTestSensors" style="font-size: 11px; padding: 6px 10px; min-height: 38px;">
          🛰 Live GPS
        </button>
      </div>

      <!-- Preset Controls Drawer (Hidden by default) -->
      <div id="simPresetControls" class="app-card" style="margin-bottom: 12px; display: none; background: #FFFBEB;">
        <div style="font-size: 11px; font-weight: 700; margin-bottom: 6px;">Pilih Skenario Pengujian GPS:</div>
        <select id="selGpsPreset" class="form-select" style="min-height: 38px;">
          <option value="valid_s28">1. Koordinat Valid di Blok S-28 (1.2584, 116.1245, ±3.5m)</option>
          <option value="valid_s29">2. Koordinat Valid di Blok S-29 (1.2610, 116.1280, ±4.2m)</option>
          <option value="outside">3. Koordinat di Luar Blok (1.3500, 116.2000 - Tolak Submit)</option>
          <option value="bad_accuracy">4. Akurasi Buruk >20m (±38.0m - Peringatan Shutter)</option>
          <option value="stale">5. GPS Stale Fix >10s (Peringatan Timeout)</option>
        </select>
      </div>

      <!-- Live Preview Info Card -->
      <div class="evidence-card" id="previewEvidenceCard" style="display: none;">
        <div class="evidence-header">
          <span>HASIL FOTO & KOORDINAT SNAPSHOT</span>
          <span class="badge badge-approved">Terkunci</span>
        </div>
        <div class="evidence-grid">
          <div class="evidence-item">
            <span class="item-label">Latitude</span>
            <span class="item-val" id="snapLat">-</span>
          </div>
          <div class="evidence-item">
            <span class="item-label">Longitude</span>
            <span class="item-val" id="snapLng">-</span>
          </div>
          <div class="evidence-item">
            <span class="item-label">Akurasi GPS</span>
            <span class="item-val" id="snapAcc">-</span>
          </div>
          <div class="evidence-item">
            <span class="item-label">Deteksi Blok</span>
            <span class="item-val" id="snapBlock">-</span>
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button class="btn btn-secondary" id="btnDiscardCapture" style="flex: 1;">
            🔄 Ulangi Foto
          </button>
          <button class="btn btn-primary" id="btnUseCapture" style="flex: 1;">
            ✓ Gunakan Foto Ini
          </button>
        </div>
      </div>
    `;

    // Render Canvas initial frame
    const canvas = document.getElementById('snapshotCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    drawSimulatedCameraFrame(ctx, 'Mode Siap Shutter', '1.2584, 116.1245');

    // Button Listeners
    document.getElementById('btnCancelCapture').addEventListener('click', () => {
      navigate(activeCaptureContext.returnRoute);
    });

    document.getElementById('btnToggleSimMode').addEventListener('click', () => {
      const p = document.getElementById('simPresetControls');
      p.style.display = p.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('selGpsPreset').addEventListener('change', (e) => {
      simulatedGpsPreset = e.target.value;
      updateGpsIndicator();
    });

    function updateGpsIndicator() {
      const dot = document.getElementById('gpsQualityDot');
      const txt = document.getElementById('gpsQualityText');
      if (simulatedGpsPreset === 'outside') {
        dot.className = 'gps-dot bad';
        txt.textContent = 'GPS di Luar Blok (1.3500, 116.2000)';
      } else if (simulatedGpsPreset === 'bad_accuracy') {
        dot.className = 'gps-dot bad';
        txt.textContent = 'Akurasi Buruk: ±38.0m (>20m)';
      } else if (simulatedGpsPreset === 'stale') {
        dot.className = 'gps-dot poor';
        txt.textContent = 'Fix Stale: 14s lalu';
      } else {
        dot.className = 'gps-dot good';
        txt.textContent = 'GPS Aktif: ±3.5m (SKDE S-28)';
      }
    }

    // Shutter Trigger
    let capturedData = null;
    document.getElementById('btnShutter').addEventListener('click', () => {
      // Validate GPS Policy
      if (simulatedGpsPreset === 'bad_accuracy') {
        showToast('Akurasi GPS ±38.0m terlalu buruk (>20m). Tunggu sinyal stabil atau ganti preset!', 'error');
        return;
      }
      if (simulatedGpsPreset === 'outside') {
        showToast('Koordinat berada di luar batas blok penugasan SKDE!', 'error');
        return;
      }

      // Generate Deterministic Snapshot
      const now = new Date();
      let lat = 1.258400;
      let lng = 116.124500;
      let block = 'SKDE:DIVISI 3:S-28';

      if (simulatedGpsPreset === 'valid_s29') {
        lat = 1.261000;
        lng = 116.128000;
        block = 'SKDE:DIVISI 3:S-29';
      }

      // Draw flash effect and picture
      drawCapturedSnapshot(ctx, lat, lng, now);

      capturedData = {
        evidenceId: 'EVD-' + String(Date.now()).slice(-5),
        capturedAt: now.toISOString(),
        latitude: lat,
        longitude: lng,
        accuracyMeters: 3.5,
        coordinateSource: 'simulation_preset',
        captureMode: 'simulasi',
        capturedBy: Store.getCurrentPersona().name,
        detectedBlockKey: block,
        validationStatus: 'valid'
      };

      document.getElementById('snapLat').textContent = lat.toFixed(6);
      document.getElementById('snapLng').textContent = lng.toFixed(6);
      document.getElementById('snapAcc').textContent = '±3.5 m';
      document.getElementById('snapBlock').textContent = block;
      document.getElementById('previewEvidenceCard').style.display = 'block';

      showToast('Foto dijepret & koordinat terkunci!');
    });

    document.getElementById('btnDiscardCapture').addEventListener('click', () => {
      capturedData = null;
      document.getElementById('previewEvidenceCard').style.display = 'none';
      drawSimulatedCameraFrame(ctx, 'Mode Siap Shutter', '1.2584, 116.1245');
    });

    document.getElementById('btnUseCapture').addEventListener('click', () => {
      if (!capturedData) return;

      if (activeCaptureContext.mode === 'before') {
        newFindingDraft.primaryEvidenceId = capturedData.evidenceId;
        newFindingDraft.primaryEvidence = capturedData;
      } else {
        activeCaptureContext.capturedEvidence = capturedData;
      }

      navigate(activeCaptureContext.returnRoute);
    });
  }

  function drawSimulatedCameraFrame(ctx, text, coords) {
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 0, 640, 480);

    // Grid lines for camera viewfinder
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(213, 0); ctx.lineTo(213, 480);
    ctx.moveTo(426, 0); ctx.lineTo(426, 480);
    ctx.moveTo(0, 160); ctx.lineTo(640, 160);
    ctx.moveTo(0, 320); ctx.lineTo(640, 320);
    ctx.stroke();

    // Center crosshair
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(320, 240, 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIVE VIEWFINDER (KAMERA LAPANGAN)', 320, 220);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px monospace';
    ctx.fillText(`GPS: ${coords} · ${text}`, 320, 265);
  }

  function drawCapturedSnapshot(ctx, lat, lng, time) {
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 640, 480);

    // Mock farm/field texture
    const grad = ctx.createLinearGradient(0, 0, 0, 480);
    grad.addColorStop(0, '#2D3748');
    grad.addColorStop(1, '#1A202C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 640, 480);

    // Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SPT EVIDENCE PHOTO SNAPSHOT', 24, 40);

    ctx.fillStyle = '#F59E0B';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('⚠️ WATERMARK: SIMULASI MOCKUP — BUKAN BUKTI ASLI', 24, 65);

    // Stamp
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '12px monospace';
    ctx.fillText(`Lat: ${lat.toFixed(6)} | Lng: ${lng.toFixed(6)}`, 24, 410);
    ctx.fillText(`Waktu: ${time.toISOString()}`, 24, 430);
    ctx.fillText(`Petugas: ${Store.getCurrentPersona().name} (${Store.getCurrentPersona().roleTitle})`, 24, 450);
  }

  // 9. #/temuan/:id
  function renderTemuanDetail(params) {
    const finding = Store.getFindingById(params.id);
    const container = document.getElementById('appContentContainer');
    if (!finding) {
      renderNotFound();
      return;
    }

    const cat = Master.getCategory(finding.categoryId);
    const action = Store.getActionByFindingId(finding.id);
    const persona = Store.getCurrentPersona();
    const coords = getFindingCoords(finding);

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/blok/${encodeURIComponent(finding.blockKey)}'">
          ‹ Kembali ke Blok
        </button>
        <span class="badge ${finding.assessmentState === 'Approved' ? 'badge-approved' : finding.assessmentState === 'Submitted' ? 'badge-submitted' : 'badge-draft'}">
          ${finding.assessmentState}
        </span>
      </div>

      <div style="margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="${cat.markerSymbol === 'drop' ? 'cat-symbol-drop' : 'cat-symbol-dot'}" style="background-color: ${cat.markerColor}; width: 16px; height: 16px;"></span>
          <h2 style="font-size: 17px; font-weight: 800;">${cat.name}</h2>
        </div>
        <p class="text-muted text-small">${finding.blockKey} · ID: ${finding.id}</p>
      </div>

      <!-- 3 TABS -->
      <div class="tab-bar">
        <button class="tab-btn active" data-tab="tabPermasalahan">Permasalahan</button>
        <button class="tab-btn" data-tab="tabActionPlan">Action Plan & Realisasi</button>
        <button class="tab-btn" data-tab="tabRiwayat">Riwayat & Audit</button>
      </div>

      <!-- TAB 1: PERMASALAHAN -->
      <div id="tabPermasalahan" class="tab-content active">
        <div class="app-card">
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px;">
            <span class="badge ${finding.sensitivity === 'Major' ? 'badge-major' : 'badge-minor'}">Sensitivity: ${finding.sensitivity}</span>
            <span class="badge ${finding.severity === 'Berat' ? 'badge-berat' : finding.severity === 'Sedang' ? 'badge-sedang' : 'badge-ringan'}">Severity: ${finding.severity}</span>
            <span class="badge badge-timeframe">${cat.timeframe}</span>
          </div>

          <div style="margin-bottom: 10px;">
            <div style="font-size: 11px; color: var(--text-muted);">Volume Masalah</div>
            <div style="font-size: 20px; font-weight: 800;">${finding.volume} <span style="font-size: 14px; font-weight: 600;">${finding.unit}</span></div>
          </div>

          <div style="margin-bottom: 10px;">
            <div style="font-size: 11px; color: var(--text-muted);">Catatan Kondisi</div>
            <div style="font-size: 13px; margin-top: 2px;">${escapeHtml(finding.notes || 'Tidak ada catatan.')}</div>
          </div>
        </div>

        <!-- Evidence Card -->
        <div class="app-card">
          <div class="card-header">
            <span style="font-size: 12px; font-weight: 700;">Bukti Foto Sebelum (Before)</span>
            <span class="badge badge-draft">Koordinat Locked</span>
          </div>
          <div class="evidence-card">
            <div class="evidence-grid">
              <div class="evidence-item">
                <span class="item-label">Latitude</span>
                <span class="item-val">${coords.lat.toFixed(6)}</span>
              </div>
              <div class="evidence-item">
                <span class="item-label">Longitude</span>
                <span class="item-val">${coords.lng.toFixed(6)}</span>
              </div>
            </div>
          </div>
          <div id="findingMiniMap" class="map-viewport"></div>
        </div>

        ${finding.assessmentState === 'Revision Requested' && persona.permissions.canTag ? `
          <button class="btn btn-warning btn-block" onclick="location.hash='#/temuan/${finding.id}/revisi'">
            ✏ Revisi Temuan Sesuai Catatan Verifier
          </button>
        ` : ''}
      </div>

      <!-- TAB 2: ACTION PLAN & REALISASI -->
      <div id="tabActionPlan" class="tab-content" style="display: none;">
        ${action ? `
          <div class="app-card" onclick="location.hash='#/action/${action.id}'" style="cursor: pointer;">
            <div class="card-header">
              <span style="font-size: 12px; font-weight: 700;">${action.actionType}</span>
              <span class="badge ${action.state === 'Completed' ? 'badge-completed' : action.state === 'In Progress' ? 'badge-inprogress' : 'badge-draft'}">${action.state}</span>
            </div>
            
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; font-size: 12px;">
                <span>Target: <strong>${action.targetCoverage} ${action.coverageUnit}</strong></span>
                <span>PIC: ${action.pic}</span>
              </div>
            </div>

            <!-- TALLY PROGRESS FORMULA -->
            ${(() => {
              const summary = Store.getActionSummary(action.id);
              return `
                <div style="margin-top: 6px;">
                  <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                    <span>Disahkan: <strong>${summary.acceptedVolume} ${summary.unit} (${summary.percentAccepted}%)</strong></span>
                    <span style="color: #D97706;">Menunggu: ${summary.pendingVolume}</span>
                  </div>
                  <div class="progress-stacked">
                    <div class="progress-segment-accepted" style="width: ${summary.percentAccepted}%;"></div>
                    <div class="progress-segment-pending" style="width: ${summary.percentPending}%;"></div>
                  </div>
                  <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">
                    Sisa belum disahkan: <strong>${summary.remainingUnapproved} ${summary.unit}</strong>
                  </div>
                </div>
              `;
            })()}

            <div style="text-align: right; margin-top: 10px;">
              <span style="font-size: 11px; color: var(--primary); font-weight: 600;">Lihat Detail & Batch Realisasi ›</span>
            </div>
          </div>
        ` : '<div class="text-muted text-small">Belum ada action plan aktif.</div>'}
      </div>

      <!-- TAB 3: RIWAYAT VERIFIKASI -->
      <div id="tabRiwayat" class="tab-content" style="display: none;">
        <div class="app-card">
          <div class="section-title">Audit Trail Keputusan</div>
          <div class="list-group">
            ${Store.getDecisionsByRecord(finding.id).map(d => `
              <div style="border-left: 3px solid var(--primary); padding-left: 10px; margin-bottom: 8px;">
                <div style="font-size: 12px; font-weight: 700;">${d.actor} (${d.role}) — ${d.decision}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${formatDate(d.timestamp)}</div>
                <div style="font-size: 11px; margin-top: 2px;">Alasan: <em>"${escapeHtml(d.reason)}"</em></div>
              </div>
            `).join('') || '<div class="text-muted text-small">Belum ada catatan keputusan.</div>'}
          </div>
        </div>
      </div>
    `;

    // Tab switcher
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).style.display = 'block';
      });
    });

    // Map initialization
    setTimeout(() => {
      if (window.L && coords) {
        const map = L.map('findingMiniMap', { zoomControl: false, attributionControl: false }).setView([coords.lat, coords.lng], 16);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        const icon = createLeafletPinIcon(cat);
        L.marker([coords.lat, coords.lng], { icon, draggable: false }).addTo(map);
      }
    }, 50);
  }

  // 10. #/assessment/:id/review
  function renderAssessmentReview(params) {
    const asmId = params.id;
    const findings = Store.getFindingsByAssessmentId(asmId);
    const container = document.getElementById('appContentContainer');

    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Review Assessment Blok</h2>
        <p class="text-muted text-small">Periksa kelengkapan seluruh temuan sebelum dikirim ke Askep.</p>
      </div>

      <div class="app-card">
        <div class="card-header">
          <span style="font-size: 12px; font-weight: 700;">Daftar Temuan (${findings.length} Titik)</span>
        </div>
        <div class="list-group">
          ${findings.map(f => {
            const cat = Master.getCategory(f.categoryId);
            return `
              <div class="list-item">
                <div class="list-item-left">
                  <span class="cat-symbol-dot" style="background-color: ${cat.markerColor}"></span>
                  <div class="list-item-content">
                    <div class="list-item-title">${cat.name} (${f.volume} ${f.unit})</div>
                    <div class="list-item-sub">Severity: ${f.severity} · Foto: ${f.primaryEvidenceId ? '✓ Lengkap' : '✕ Kurang'}</div>
                  </div>
                </div>
                <span class="badge badge-draft">Siap Kirim</span>
              </div>
            `;
          }).join('')}
        </div>

        <button id="btnConfirmSendAsm" class="btn btn-primary btn-block" style="margin-top: 14px;">
          Kirim Assessment ke Askep / Manager ›
        </button>
      </div>
    `;

    document.getElementById('btnConfirmSendAsm').addEventListener('click', () => {
      showToast('Assessment blok berhasil dikirim ke antrean Askep!');
      navigate('#/tugas');
    });
  }

  // 11. #/tugas
  function renderTugas() {
    const persona = Store.getCurrentPersona();
    const container = document.getElementById('appContentContainer');

    const pendingAssessments = Store.getPendingAssessments();
    const pendingRealizations = Store.getPendingRealizationBatches();
    const myDrafts = Store.getDraftFindings();

    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Tugas & Antrean (${persona.name})</h2>
        <p class="text-muted text-small">Tugas operasional sesuai matriks wewenang Account aktif.</p>
      </div>

      <!-- TABS -->
      <div class="tab-bar">
        <button class="tab-btn active" data-tab="tabTugasAsm">
          Verifikasi Assessment (${pendingAssessments.length})
        </button>
        <button class="tab-btn" data-tab="tabTugasReal">
          Realisasi (${pendingRealizations.length})
        </button>
        <button class="tab-btn" data-tab="tabTugasDraft">
          Draft (${myDrafts.length})
        </button>
      </div>

      <!-- TAB 1: PENDING ASSESSMENTS -->
      <div id="tabTugasAsm" class="tab-content active">
        <div class="list-group">
          ${pendingAssessments.map(asm => `
            <div class="list-item" onclick="location.hash='#/assessment/${asm.id}/verifikasi'">
              <div class="list-item-left">
                <span style="font-size: 20px;">📋</span>
                <div class="list-item-content">
                  <div class="list-item-title">${asm.blockKey}</div>
                  <div class="list-item-sub">Round: ${asm.round} · ${asm.findingsCount} temuan menunggu</div>
                </div>
              </div>
              <div class="list-item-right">
                <span class="badge badge-submitted">Menunggu</span>
                <span style="font-size: 11px; color: var(--primary);">Review ›</span>
              </div>
            </div>
          `).join('') || '<div class="text-muted text-small" style="padding: 16px; text-align: center;">Tidak ada antrean assessment yang menunggu.</div>'}
        </div>
      </div>

      <!-- TAB 2: PENDING REALIZATION BATCHES -->
      <div id="tabTugasReal" class="tab-content" style="display: none;">
        <div class="list-group">
          ${pendingRealizations.map(b => `
            <div class="list-item" onclick="location.hash='#/realisasi/${b.id}/verifikasi'">
              <div class="list-item-left">
                <span style="font-size: 20px;">🚜</span>
                <div class="list-item-content">
                  <div class="list-item-title">${b.actionType || 'Batch Realisasi'} (${b.submittedVolume} unit)</div>
                  <div class="list-item-sub">Oleh: ${b.inspector} · ${formatDate(b.inspectedAt)}</div>
                </div>
              </div>
              <div class="list-item-right">
                <span class="badge badge-inprogress">Menunggu Sah</span>
                <span style="font-size: 11px; color: var(--primary);">Periksa ›</span>
              </div>
            </div>
          `).join('') || '<div class="text-muted text-small" style="padding: 16px; text-align: center;">Tidak ada batch realisasi menunggu pengesahan.</div>'}
        </div>
      </div>

      <!-- TAB 3: DRAFTS -->
      <div id="tabTugasDraft" class="tab-content" style="display: none;">
        <div class="list-group">
          ${myDrafts.map(f => {
            const cat = Master.getCategory(f.categoryId);
            return `
              <div class="list-item" onclick="location.hash='#/temuan/${f.id}'">
                <div class="list-item-left">
                  <span class="cat-symbol-dot" style="background-color: ${cat.markerColor}"></span>
                  <div class="list-item-content">
                    <div class="list-item-title">${cat.name} (${f.volume} ${f.unit})</div>
                    <div class="list-item-sub">${f.blockKey} · Draft lokal</div>
                  </div>
                </div>
                <span class="badge badge-draft">Draft</span>
              </div>
            `;
          }).join('') || '<div class="text-muted text-small" style="padding: 16px; text-align: center;">Belum ada draft temuan.</div>'}
        </div>
      </div>
    `;

    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
        btn.classList.add('active');
        document.getElementById(btn.getAttribute('data-tab')).style.display = 'block';
      });
    });
  }

  // 12. #/assessment/:id/verifikasi
  function renderAssessmentVerifikasi(params) {
    const asmId = params.id;
    const findings = Store.getFindingsByAssessmentId(asmId);
    const container = document.getElementById('appContentContainer');
    const persona = Store.getCurrentPersona();

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/tugas'">
          ‹ Kembali ke Tugas
        </button>
        <span class="badge badge-submitted">Review Verifier</span>
      </div>

      <div style="margin-bottom: 10px;">
        <h2 style="font-size: 16px; font-weight: 800;">Verifikasi Assessment: ${asmId}</h2>
        <p class="text-muted text-small">Pengesahan level blok berbasis uji petik ≥20% Pasar Pikul.</p>
      </div>

      <!-- SOP UJI PETIK & CASCADE BANNER -->
      <div style="background: linear-gradient(135deg, #ECFDF5 0%, #EFF6FF 100%); border: 1px solid #A7F3D0; border-left: 4px solid #10B981; border-radius: 8px; padding: 10px 12px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <strong style="font-size: 12px; color: #065F46;">SOP Uji Petik Askep / Manager</strong>
            <p style="font-size: 11px; color: #1F2937; margin: 3px 0 0 0; line-height: 1.4;">
              Verifikasi dilakukan pada <strong>level blok</strong> (sampling ≥20% PP). Approval blok otomatis <strong>menyetujui seluruh temuan</strong> (Cascade Approval).
            </p>
          </div>
          <span class="badge badge-approved" style="white-space: nowrap; margin-left: 6px;">Spot-Check ≥20%</span>
        </div>
        <div style="margin-top: 6px; font-size: 10.5px; color: #047857; font-weight: 600;">
          ✓ Cakupan spot-check: 16 dari 64 Pasar Pikul (25% PP valid)
        </div>
      </div>

      <!-- ONE-CLICK CASCADE APPROVAL BUTTON -->
      <div style="margin-bottom: 14px;">
        <button type="button" class="btn btn-success btn-block" style="font-weight: 800; padding: 12px; font-size: 13px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);" onclick="window.SPTApp.approveAllBlockFindings('${asmId}')">
          ✓ Verifikasi &amp; Setujui Seluruh Blok (Cascade Approval)
        </button>
        <p style="font-size: 10px; color: var(--text-muted); text-align: center; margin-top: 4px;">
          Otomatis mengesahkan seluruh ${findings.length} temuan Asisten di blok ini.
        </p>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <span style="font-size: 12px; font-weight: 700;">Daftar Temuan Asisten (${findings.length})</span>
        <span style="font-size: 9.5px; color: var(--text-muted);">Flag revisi/tolak hanya jika ada anomali spesifik</span>
      </div>

      <div class="list-group" id="verifierFindingsList">
        ${findings.map(f => {
          const cat = Master.getCategory(f.categoryId);
          return `
            <div class="app-card" id="cardVerify-${f.id}">
              <div class="card-header">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span class="cat-symbol-dot" style="background-color: ${cat.markerColor}"></span>
                  <span style="font-size: 13px; font-weight: 700;">${cat.name}</span>
                </div>
                <span class="badge ${f.assessmentState === 'Approved' ? 'badge-approved' : f.assessmentState === 'Revision Requested' ? 'badge-revision' : 'badge-submitted'}" id="statusBadge-${f.id}">
                  ${f.assessmentState}
                </span>
              </div>

              <div style="font-size: 12px; margin-bottom: 8px;">
                <div>Volume: <strong>${f.volume} ${f.unit}</strong> | Severity: <strong>${f.severity}</strong></div>
                <div style="color: var(--text-muted); margin-top: 2px;">Koordinat Locked: ${f.coordinates ? f.coordinates.lat.toFixed(5) + ', ' + f.coordinates.lng.toFixed(5) : '-'}</div>
                <div style="margin-top: 4px;">Catatan Asisten: <em>"${escapeHtml(f.notes || '-')}"</em></div>
              </div>

              <div class="btn-group">
                <button class="btn btn-success" style="flex: 1; min-height: 38px;" onclick="window.SPTApp.decideFinding('${f.id}', 'Approved')">
                  ✓ Setujui
                </button>
                <button class="btn btn-warning" style="flex: 1; min-height: 38px;" onclick="window.SPTApp.promptDecisionModal('${f.id}', 'Revision Requested')">
                  ✏ Minta Revisi
                </button>
                <button class="btn btn-danger" style="flex: 1; min-height: 38px;" onclick="window.SPTApp.promptDecisionModal('${f.id}', 'Rejected')">
                  ✕ Tolak
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <button id="btnCompleteAsmReview" class="btn btn-primary btn-block" style="margin-top: 14px;">
        ✓ Selesaikan Review Blok
      </button>
    `;

    document.getElementById('btnCompleteAsmReview').addEventListener('click', () => {
      showToast('Seluruh keputusan assessment telah disimpan dan tercatat di audit log.');
      navigate('#/tugas');
    });
  }

  // 13. #/temuan/:id/revisi
  function renderTemuanRevisi(params) {
    const finding = Store.getFindingById(params.id);
    const container = document.getElementById('appContentContainer');
    if (!finding) { renderNotFound(); return; }

    const cat = Master.getCategory(finding.categoryId);
    const decisions = Store.getDecisionsByRecord(finding.id);
    const lastDecision = decisions[decisions.length - 1];

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/temuan/${finding.id}'">
          ‹ Batal
        </button>
        <span class="badge badge-revision">Revisi Diminta</span>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Revisi Temuan: ${cat.name}</h2>
        <p class="text-muted text-small">${finding.blockKey} · Versi Baru</p>
      </div>

      <div class="app-card" style="background-color: #FEF3C7; border: 1px solid #F59E0B;">
        <div style="font-size: 11px; font-weight: 700; color: #92400E;">Catatan Verifier:</div>
        <div style="font-size: 12px; color: #78350F; margin-top: 2px;">
          <em>"${escapeHtml(lastDecision ? lastDecision.reason : 'Mohon sesuaikan volume aktual hasil tinjauan.')}"</em>
        </div>
      </div>

      <div class="app-card">
        <div class="form-group">
          <label class="form-label">Volume Koreksi (${finding.unit}) <span class="required">*</span></label>
          <input type="number" id="fieldRevVolume" class="form-input" value="${finding.volume}" />
        </div>

        <div class="form-group">
          <label class="form-label">Catatan Tanggapan Revisi</label>
          <textarea id="fieldRevNotes" class="form-textarea" placeholder="Tuliskan penjelasan perbaikan...">${escapeHtml(finding.notes)}</textarea>
        </div>

        <button id="btnSubmitRevision" class="btn btn-primary btn-block" style="margin-top: 10px;">
          Kirim Ulang Temuan (Versi Baru) ›
        </button>
      </div>
    `;

    document.getElementById('btnSubmitRevision').addEventListener('click', () => {
      const newVol = parseFloat(document.getElementById('fieldRevVolume').value);
      const newNotes = document.getElementById('fieldRevNotes').value;

      Store.updateFindingRevision(finding.id, newVol, newNotes);
      showToast('Versi revisi berhasil dikirim ulang ke verifier!');
      navigate(`#/temuan/${finding.id}`);
    });
  }

  // 14. #/action/:id
  function renderActionDetail(params) {
    const action = Store.getActionById(params.id);
    const container = document.getElementById('appContentContainer');
    if (!action) { renderNotFound(); return; }

    const summary = Store.getActionSummary(action.id);
    const persona = Store.getCurrentPersona();

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/temuan/${action.findingId}'">
          ‹ Kembali ke Temuan
        </button>
        <span class="badge ${action.state === 'Completed' ? 'badge-completed' : 'badge-inprogress'}">
          ${action.state}
        </span>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">${action.actionType}</h2>
        <p class="text-muted text-small">Action Plan ID: ${action.id} · PIC: <strong>${action.pic}</strong></p>
      </div>

      <!-- PROGRESS SUMMARY ACCORDING TO FORMULA -->
      <div class="app-card">
        <div class="card-header">
          <span style="font-size: 12px; font-weight: 700;">Progress Realisasi Terukur</span>
          <span class="badge badge-draft">Target: ${action.targetCoverage} ${action.coverageUnit}</span>
        </div>

        <div style="margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
            <span>Disahkan: <strong>${summary.acceptedVolume} / ${action.targetCoverage} ${summary.unit} (${summary.percentAccepted}%)</strong></span>
            <span style="color: #D97706;">Menunggu: <strong>${summary.pendingVolume} ${summary.unit}</strong></span>
          </div>
          <div class="progress-stacked">
            <div class="progress-segment-accepted" style="width: ${summary.percentAccepted}%;"></div>
            <div class="progress-segment-pending" style="width: ${summary.percentPending}%;"></div>
          </div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">
            Sisa belum disahkan: <strong>${summary.remainingUnapproved} ${summary.unit}</strong>
          </div>
        </div>

        <div class="simulation-banner" style="margin-top: 8px;">
          <span>ℹ</span>
          <div><strong>Aturan Tally:</strong> Volume pending (${summary.pendingVolume}) tidak dihitung sebagai kemajuan fisik yang telah disahkan.</div>
        </div>
      </div>

      <!-- BATCH HISTORY -->
      <div class="app-card">
        <div class="card-header">
          <span style="font-size: 12px; font-weight: 700;">Riwayat Batch Realisasi (${action.batches ? action.batches.length : 0})</span>
        </div>

        <div class="list-group">
          ${action.batches && action.batches.length > 0 ? action.batches.map(b => `
            <div class="list-item" onclick="location.hash='#/realisasi/${b.id}'">
              <div class="list-item-left">
                <span style="font-size: 18px;">📦</span>
                <div class="list-item-content">
                  <div class="list-item-title">Batch ${b.id} (${b.submittedVolume} ${action.coverageUnit})</div>
                  <div class="list-item-sub">Disahkan: ${b.acceptedVolume || 0} · Kualitas: ${b.qualityOutcome}</div>
                </div>
              </div>
              <span class="badge ${b.state === 'Approved' ? 'badge-approved' : 'badge-inprogress'}">${b.state}</span>
            </div>
          `).join('') : '<div class="text-muted text-small" style="padding: 10px; text-align: center;">Belum ada pengiriman batch realisasi.</div>'}
        </div>

        ${persona.permissions.canInspectRealization ? `
          <button class="btn btn-primary btn-block" style="margin-top: 12px;" onclick="location.hash='#/action/${action.id}/periksa'">
            ＋ Periksa & Kirim Batch Realisasi Baru
          </button>
        ` : ''}
      </div>
    `;
  }

  // 15. #/action/:id/periksa
  function renderActionPeriksa(params) {
    const action = Store.getActionById(params.id);
    const container = document.getElementById('appContentContainer');
    if (!action) { renderNotFound(); return; }

    const summary = Store.getActionSummary(action.id);
    const maxAllowed = summary.remainingUnapproved;

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/action/${action.id}'">
          ‹ Batal
        </button>
        <span class="badge badge-inprogress">Input Realisasi</span>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Pemeriksaan Hasil Pekerjaan</h2>
        <p class="text-muted text-small">${action.actionType} · Sisa Target: <strong>${maxAllowed} ${action.coverageUnit}</strong></p>
      </div>

      <form id="formNewBatch">
        <div class="app-card">
          <div class="form-group">
            <label class="form-label">Volume Realisasi Baru (${action.coverageUnit}) <span class="required">*</span></label>
            <input type="number" id="fieldBatchVol" class="form-input" max="${maxAllowed}" min="1" value="${Math.min(100, maxAllowed)}" required />
            <span class="form-hint">Maksimal penginputan saat ini: <strong>${maxAllowed} ${action.coverageUnit}</strong>.</span>
          </div>

          <div class="form-group">
            <label class="form-label">Kualitas Hasil Pekerjaan <span class="required">*</span></label>
            <select id="fieldBatchQuality" class="form-select">
              <option value="Sesuai Standar">Sesuai Standar Mutu</option>
              <option value="Perlu Perbaikan">Perlu Perbaikan / Rework</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Usulan Kondisi Masalah Setelah Pekerjaan <span class="required">*</span></label>
            <select id="fieldBatchCondition" class="form-select">
              <option value="Sebagian teratasi">Sebagian teratasi</option>
              <option value="Teratasi">Teratasi Sepenuhnya</option>
              <option value="Belum teratasi">Belum teratasi</option>
            </select>
          </div>
        </div>

        <!-- FOTO BUKTI SESUDAH (AFTER) -->
        <div class="app-card">
          <div class="card-header">
            <span style="font-size: 12px; font-weight: 700;">Bukti Foto Sesudah (After)</span>
            <span class="badge badge-draft">Snapshot Wajib</span>
          </div>
          <p class="text-muted text-small" style="margin-bottom: 8px;">
            Ambil foto hasil pekerjaan di lapangan. Koordinat after akan disimpan terpisah tanpa menggeser pin temuan.
          </p>
          <button type="button" class="btn btn-secondary btn-block" id="btnCaptureAfter">
            📷 Ambil Foto After & Catat Koordinat
          </button>
        </div>

        <button type="submit" class="btn btn-primary btn-block">
          Kirim Realisasi ke Askep ›
        </button>
      </form>
    `;

    document.getElementById('btnCaptureAfter').addEventListener('click', () => {
      activeCaptureContext.returnRoute = `#/action/${action.id}/periksa`;
      activeCaptureContext.mode = 'after';
      navigate('#/capture');
    });

    document.getElementById('formNewBatch').addEventListener('submit', (e) => {
      e.preventDefault();
      const vol = parseFloat(document.getElementById('fieldBatchVol').value);
      const quality = document.getElementById('fieldBatchQuality').value;
      const cond = document.getElementById('fieldBatchCondition').value;

      if (vol > maxAllowed) {
        showToast(`Volume tidak boleh melebihi sisa target (${maxAllowed} ${action.coverageUnit})!`, 'error');
        return;
      }

      Store.addRealizationBatch(action.id, vol, quality, cond);
      showToast(`Batch realisasi ${vol} ${action.coverageUnit} berhasil dikirim ke Askep!`);
      navigate(`#/action/${action.id}`);
    });
  }

  // 16. #/realisasi/:id
  function renderRealisasiDetail(params) {
    const batch = Store.getRealizationBatchById(params.id);
    const container = document.getElementById('appContentContainer');
    if (!batch) { renderNotFound(); return; }

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/action/${batch.actionId}'">
          ‹ Kembali ke Action
        </button>
        <span class="badge ${batch.state === 'Approved' ? 'badge-approved' : 'badge-inprogress'}">
          ${batch.state}
        </span>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Detail Batch: ${batch.id}</h2>
        <p class="text-muted text-small">Pemeriksa: <strong>${batch.inspector}</strong> · ${formatDate(batch.inspectedAt)}</p>
      </div>

      <div class="app-card">
        <div class="card-header">
          <span style="font-size: 12px; font-weight: 700;">Ringkasan Pengajuan Volume</span>
        </div>
        <div style="font-size: 13px; line-height: 1.6;">
          <div>Volume Diajukan: <strong>${batch.submittedVolume} unit</strong></div>
          <div>Volume Disahkan Askep: <strong>${batch.acceptedVolume || 0} unit</strong></div>
          <div>Kualitas Fisik: <strong>${batch.qualityOutcome}</strong></div>
          <div>Kondisi Usulan: <strong>${batch.proposedCondition}</strong></div>
        </div>
      </div>

      <button class="btn btn-secondary btn-block" onclick="location.hash='#/dokumentasi/${batch.findingId || 'FND-006'}'">
        📷 Lihat Dokumentasi Before vs After
      </button>
    `;
  }

  // 17. #/realisasi/:id/verifikasi
  function renderRealisasiVerifikasi(params) {
    const batch = Store.getRealizationBatchById(params.id);
    const container = document.getElementById('appContentContainer');
    if (!batch) { renderNotFound(); return; }

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/tugas'">
          ‹ Batal
        </button>
        <span class="badge badge-submitted">Verifikasi Akhir</span>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Pengesahan Realisasi Fisik (Askep)</h2>
        <p class="text-muted text-small">Batch ${batch.id} · Diajukan: <strong>${batch.submittedVolume} unit</strong></p>
      </div>

      <div class="app-card">
        <div class="form-group">
          <label class="form-label">Volume Disahkan (Maks. ${batch.submittedVolume}) <span class="required">*</span></label>
          <input type="number" id="fieldVerifyAcceptedVol" class="form-input" max="${batch.submittedVolume}" min="1" value="${batch.submittedVolume}" required />
          <span class="form-hint">Askep dapat mengesahkan volume parsial jika hasil belum 100% tuntas.</span>
        </div>

        <div class="form-group">
          <label class="form-label">Keputusan Kondisi Permasalahan <span class="required">*</span></label>
          <select id="fieldFinalCondition" class="form-select">
            <option value="Sebagian teratasi">Sebagian teratasi (Tetap Monitoring)</option>
            <option value="Teratasi">Teratasi Sepenuhnya (Siap Tutup Temuan)</option>
            <option value="Belum teratasi">Belum teratasi</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Catatan Pengesahan Askep</label>
          <textarea id="fieldVerifyNotes" class="form-textarea" placeholder="Tuliskan catatan teknis pengesahan...">Hasil fisik terverifikasi sesuai standar mutu.</textarea>
        </div>

        <button id="btnConfirmBatchVerify" class="btn btn-primary btn-block" style="margin-top: 8px;">
          ✓ Sahkan Volume & Simpan Keputusan
        </button>
      </div>
    `;

    document.getElementById('btnConfirmBatchVerify').addEventListener('click', () => {
      const acceptedVol = parseFloat(document.getElementById('fieldVerifyAcceptedVol').value);
      const cond = document.getElementById('fieldFinalCondition').value;
      const notes = document.getElementById('fieldVerifyNotes').value;

      if (acceptedVol > batch.submittedVolume) {
        showToast(`Volume disahkan tidak boleh melebihi volume diajukan (${batch.submittedVolume})!`, 'error');
        return;
      }

      Store.verifyRealizationBatch(batch.id, acceptedVol, cond, notes);
      showToast(`Batch realisasi berhasil disahkan sebesar ${acceptedVol} unit!`);
      navigate('#/tugas');
    });
  }

  // 18. #/dokumentasi/:id
  function renderDokumentasi(params) {
    const finding = Store.getFindingById(params.id) || Store.getFindings()[0];
    const container = document.getElementById('appContentContainer');
    const cat = Master.getCategory(finding.categoryId);

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <button class="btn btn-secondary" style="min-height: 36px; padding: 4px 10px;" onclick="location.hash='#/temuan/${finding.id}'">
          ‹ Kembali ke Temuan
        </button>
        <span class="badge badge-approved">Dokumentasi</span>
      </div>

      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Dokumentasi Before vs After</h2>
        <p class="text-muted text-small">${cat.name} · Blok ${finding.blockKey}</p>
      </div>

      <div class="app-card">
        <div style="font-size: 12px; font-weight: 700; margin-bottom: 6px; color: #BE123C;">1. Foto Sebelum (Before)</div>
        <div style="width: 100%; height: 180px; background: #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 12px; flex-direction: column; gap: 4px; box-shadow: var(--shadow-sm);">
          <span>📸 FOTO BEFORE TAGGING</span>
          <span style="font-size: 10px; color: #94A3B8;">Lat: 1.258400 | Lng: 116.124500</span>
          <span class="badge badge-warning" style="margin-top: 4px;">Simulasi Lapangan</span>
        </div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">
          Dicatat oleh: <strong>Asisten Divisi 3</strong> · ${formatDate(finding.createdAt)}
        </div>
      </div>

      <div class="app-card" style="margin-top: 10px;">
        <div style="font-size: 12px; font-weight: 700; margin-bottom: 6px; color: #15803D;">2. Foto Sesudah (After)</div>
        <div style="width: 100%; height: 180px; background: #1E293B; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 12px; flex-direction: column; gap: 4px; box-shadow: var(--shadow-sm);">
          <span>✓ FOTO HASIL REALISASI</span>
          <span style="font-size: 10px; color: #94A3B8;">Lat: 1.258420 | Lng: 116.124510 (Jarak: 2.3m)</span>
          <span class="badge badge-approved" style="margin-top: 4px;">Telah Disahkan Askep</span>
        </div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">
          Pemeriksa: <strong>Mandor 1</strong> · Status: <strong>Sesuai Standar Mutu</strong>
        </div>
      </div>
    `;
  }

  // 19. #/riwayat
  function renderRiwayat() {
    const decisions = Store.getAllDecisions();
    const container = document.getElementById('appContentContainer');

    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Riwayat & Audit Trail</h2>
        <p class="text-muted text-small">Kronologi keputusan verifikasi, realisasi, dan penutupan temuan.</p>
      </div>

      <div class="list-group">
        ${decisions.map(d => `
          <div class="app-card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 13px; font-weight: 700;">${d.actor} (${d.role})</span>
              <span class="badge ${d.decision === 'Approved' ? 'badge-approved' : d.decision === 'Revision Requested' ? 'badge-revision' : 'badge-draft'}">
                ${d.decision}
              </span>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">
              Record: <strong>${d.recordId}</strong> · ${formatDate(d.timestamp)}
            </div>
            <div style="font-size: 12px; background: var(--surface-subtle); padding: 8px; border-radius: 6px;">
              Alasan: <em>"${escapeHtml(d.reason)}"</em>
            </div>
          </div>
        `).join('') || '<div class="text-muted text-small" style="padding: 16px; text-align: center;">Belum ada riwayat keputusan.</div>'}
      </div>
    `;
  }

  // 20. #/notifikasi
  function renderNotifikasi() {
    const notifs = Store.getNotifications();
    const container = document.getElementById('appContentContainer');

    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div>
          <h2 style="font-size: 16px; font-weight: 800;">Pemberitahuan</h2>
          <p class="text-muted text-small">Update tugas, revisi, dan pengesahan.</p>
        </div>
        <button class="btn btn-secondary" style="min-height: 32px; font-size: 11px; padding: 4px 8px;" id="btnMarkAllRead">
          Tandai Dibaca
        </button>
      </div>

      <div class="list-group">
        ${notifs.map(n => `
          <div class="list-item ${n.read ? '' : 'unread'}" onclick="location.hash='${n.deepLink}'" style="${n.read ? '' : 'background: #F8FAFC; border-left: 4px solid var(--primary);'}">
            <div class="list-item-left">
              <span style="font-size: 18px;">${n.type === 'revision' ? '⚠️' : n.type === 'approval' ? '✓' : 'ℹ'}</span>
              <div class="list-item-content">
                <div class="list-item-title">${n.title}</div>
                <div class="list-item-sub">${n.message}</div>
              </div>
            </div>
            <div class="list-item-right">
              <span style="font-size: 10px; color: var(--text-light);">${formatDate(n.timestamp)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('btnMarkAllRead').addEventListener('click', () => {
      Store.markAllNotificationsRead();
      renderNotifikasi();
      updateAppShell('#/notifikasi');
    });
  }

  // 21. #/draft-sinkronisasi
  function renderDraftSinkronisasi() {
    const queue = Store.getSyncQueue();
    const container = document.getElementById('appContentContainer');

    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Draft & Antrean Sinkronisasi</h2>
        <p class="text-muted text-small">Penyimpanan lokal perangkat dan simulasi antrean offline.</p>
      </div>

      <div class="simulation-banner">
        <span>ℹ</span>
        <div><strong>Status Sinkronisasi Demo:</strong> Semua data tersimpan di LocalStorage peramban. Label "Synced-Demo" menyatakan data konsisten pada mock store.</div>
      </div>

      <div class="app-card">
        <div class="card-header">
          <span style="font-size: 12px; font-weight: 700;">Antrean Pengiriman (${queue.length} Item)</span>
          <button class="btn btn-primary" style="min-height: 32px; padding: 4px 8px; font-size: 11px;" id="btnTriggerSync">
            ⚡ Sinkronkan Sekarang
          </button>
        </div>

        <div class="list-group">
          ${queue.map(q => `
            <div class="list-item">
              <div class="list-item-left">
                <span style="font-size: 16px;">🔄</span>
                <div class="list-item-content">
                  <div class="list-item-title">${q.title}</div>
                  <div class="list-item-sub">Dibuat: ${formatDate(q.createdAt)}</div>
                </div>
              </div>
              <span class="badge ${q.status === 'Synced-Demo' ? 'badge-approved' : 'badge-draft'}">${q.status}</span>
            </div>
          `).join('') || '<div class="text-muted text-small" style="padding: 10px; text-align: center;">Semua data lokal telah tersinkronisasi.</div>'}
        </div>
      </div>
    `;

    document.getElementById('btnTriggerSync').addEventListener('click', () => {
      showToast('Sinkronisasi demo berhasil dijalankan!');
    });
  }

  // 22. #/profil
  function renderProfil() {
    const persona = Store.getCurrentPersona();
    const container = document.getElementById('appContentContainer');

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--primary); color: #FFF; font-size: 24px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
          ${persona.name.charAt(0)}
        </div>
        <h2 style="font-size: 17px; font-weight: 800;">${persona.name}</h2>
        <p class="text-muted text-small">${persona.roleTitle} — Scope: <strong>${persona.scopeLabel}</strong></p>
      </div>

      <div class="app-card">
        <div class="card-header">
          <span style="font-size: 12px; font-weight: 700;">Identitas Demo SPT</span>
        </div>
        <div style="font-size: 12px; line-height: 1.6;">
          <div>Akun Login: <strong>admin_spt</strong></div>
          <div>Unit Bisnis: <strong>PT SMART Tbk</strong></div>
          <div>Estate: <strong>SKDE</strong></div>
          <div>Hak Akses: <strong>${persona.name}</strong></div>
        </div>
      </div>

      <div class="app-card">
        <button class="btn btn-secondary btn-block" style="margin-bottom: 8px;" onclick="location.hash='#/account'">
          🔄 Ganti Account Demo (Asisten / Mandor / Askep / Manager)
        </button>
        <button class="btn btn-secondary btn-block" style="margin-bottom: 8px;" onclick="location.hash='#/bantuan'">
          📖 Buka Panduan & Bantuan Mockup
        </button>
        <button class="btn btn-warning btn-block" style="margin-bottom: 8px;" id="btnResetDemoData">
          ⚠️ Reset Seluruh Data Demo ke Nilai Awal
        </button>
        <button class="btn btn-danger btn-block" id="btnLogout">
          🚪 Keluar (Logout)
        </button>
      </div>
    `;

    document.getElementById('btnLogout').addEventListener('click', () => {
      Store.logout();
      showToast('Sesi telah diakhiri');
      navigate('#/login');
    });

    document.getElementById('btnResetDemoData').addEventListener('click', () => {
      if (confirm('Apakah Anda yakin ingin mereset seluruh data demo kembali ke seed awal?')) {
        Store.resetDemoData();
        showToast('Data demo berhasil direset ke kondisi awal');
        navigate('#/beranda');
      }
    });
  }

  // 23. #/bantuan
  function renderBantuan() {
    const container = document.getElementById('appContentContainer');
    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <h2 style="font-size: 16px; font-weight: 800;">Panduan & Bantuan SPT Mobile</h2>
        <p class="text-muted text-small">Dokumentasi alur operasional dan instruksi pengujian.</p>
      </div>

      <div class="app-card">
        <div class="section-title">1. Empat Tahap dalam Dua Siklus</div>
        <div style="font-size: 12px; line-height: 1.5; color: var(--text-main);">
          <p><strong>Siklus Assessment:</strong></p>
          <ol style="padding-left: 16px; margin: 4px 0 8px;">
            <li><strong>Tahap 1 (Asisten):</strong> Tagging masalah di lapangan dengan foto shutter & koordinat locked.</li>
            <li><strong>Tahap 2 (Askep / Manager):</strong> Verifikasi assessment per temuan (Setuju / Revisi / Tolak).</li>
          </ol>
          <p><strong>Siklus Realisasi:</strong></p>
          <ol style="padding-left: 16px; margin: 4px 0 8px;">
            <li><strong>Tahap 3 (Asisten / Mandor):</strong> Pemeriksaan fisik lapangan & input batch realisasi bertahap dengan foto after.</li>
            <li><strong>Tahap 4 (Askep):</strong> Pengesahan volume terverifikasi & penutupan temuan jika masalah teratasi.</li>
          </ol>
        </div>
      </div>

      <div class="app-card">
        <div class="section-title">2. Formula Realisasi Bertahap</div>
        <div style="font-size: 12px; line-height: 1.5;">
          <p>Contoh: Pasar Pikul 1.000 Meter</p>
          <ul style="padding-left: 16px; margin: 4px 0;">
            <li>Batch 1 disahkan Askep: <strong>600 Meter (60%)</strong></li>
            <li>Batch 2 diajukan Mandor: <strong>250 Meter (Menunggu)</strong></li>
            <li>Sisa belum disahkan: <strong>400 Meter</strong></li>
          </ul>
          <p style="margin-top: 4px; font-size: 11px; color: var(--text-muted);">
            Progress fisik terverifikasi adalah 60%, bukan 85%. Volume pending tidak dihitung sebagai volume disahkan.
          </p>
        </div>
      </div>

      <div class="app-card">
        <div class="section-title">3. Cara Menguji di Chrome DevTools</div>
        <div style="font-size: 12px; line-height: 1.5;">
          <ol style="padding-left: 16px;">
            <li>Tekan <strong>F12</strong> lalu klik ikon <strong>Toggle Device Toolbar</strong> (Ctrl+Shift+M).</li>
            <li>Pilih ukuran <strong>390×844</strong> (iPhone) atau <strong>412×915</strong> (Pixel/Samsung).</li>
            <li>Buka <em>More Tools › Sensors</em> dan masukkan koordinat SKDE: <strong>Lat 1.2584, Lng 116.1245</strong>.</li>
            <li>Atau gunakan mode <strong>Simulasi Preset</strong> bawaan aplikasi tanpa perlu konfigurasi sensor peramban.</li>
          </ol>
        </div>
      </div>
    `;
  }

  // 404 Not Found
  function renderNotFound() {
    const container = document.getElementById('appContentContainer');
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 14px;">
        <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
        <h2 style="font-size: 16px; font-weight: 800;">Halaman Tidak Ditemukan</h2>
        <p class="text-muted text-small" style="margin-top: 4px;">Rute '${escapeHtml(activeRoute)}' tidak valid.</p>
        <button class="btn btn-primary" style="margin-top: 16px;" onclick="location.hash='#/beranda'">
          Kembali ke Beranda
        </button>
      </div>
    `;
  }

  // Forbidden / Unauthorized
  function renderForbidden(reason) {
    const container = document.getElementById('appContentContainer');
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 14px;">
        <div style="font-size: 32px; margin-bottom: 8px;">🚫</div>
        <h2 style="font-size: 16px; font-weight: 800;">Akses Dibatasi Account</h2>
        <p class="text-muted text-small" style="margin-top: 4px;">${escapeHtml(reason)}</p>
        <div style="display: flex; gap: 8px; justify-content: center; margin-top: 16px;">
          <button class="btn btn-secondary" onclick="location.hash='#/account'">
            Ganti Account
          </button>
          <button class="btn btn-primary" onclick="location.hash='#/beranda'">
            Ke Beranda
          </button>
        </div>
      </div>
    `;
  }

  /**
   * ============================================================
   * GLOBAL DECISION HELPERS (FOR INLINE ACTIONS)
   * ============================================================
   */
  /**
   * Render Inspection View (Phase 1 & 2 Revamp)
   */
  function renderInspectionView() {
    const container = document.getElementById('appContentContainer');
    const store = window.tnkeStore;
    const persona = Store.getCurrentPersona();
    const activeDiv = persona && persona.scope ? persona.scope : 'DIVISI 3';

    const dailySummary = store ? store.getDailyActivitySummary(persona ? persona.name : 'Budi Santoso (Asisten)', '12 Sep 2026') : null;
    const agg = store ? store.getAggregatedAssessment('TNKE', activeDiv, 'all') : null;

    let html = `
      <div style="padding: 12px 14px;">
        <div style="background: #FFFFFF; border-radius: 10px; padding: 12px 14px; border: 1px solid #E2E8F0; margin-bottom: 12px;">
          <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: #1E293B;">🔍 INSPECTION &amp; COVERAGE</span>
            <span style="font-size: 10px; background: #EFF6FF; color: #1D4ED8; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Data Simulasi</span>
          </div>
          <div style="font-size: 12px; color: #64748B;">Scope: <strong>TNKE · ${escapeHtml(activeDiv)}</strong> | Periode: <strong>September 2026</strong></div>
        </div>

        <!-- Daily Activity Summary Panel -->
        ${dailySummary ? `
        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px; margin-bottom: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #F1F5F9; padding-bottom: 6px;">
            <span style="font-size: 12px; font-weight: 700; color: #1E293B;">👤 Ringkasan Aktivitas Harian Petugas</span>
            <span style="font-size: 10px; color: #64748B;">${escapeHtml(dailySummary.dateStr)}</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 8px;">
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 6px 8px;">
              <span style="font-size: 10px; color: #64748B; display: block;">Total Aktivitas</span>
              <strong style="font-size: 13px; color: #1E293B;">${dailySummary.totalActivityHa} Ha</strong>
              <small style="font-size: 9px; color: #94A3B8; display: block;">(${dailySummary.uniqueBlocksCount} Blok · ${dailySummary.totalVisitSessionsCount} Kunjungan)</small>
            </div>
            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 6px; padding: 6px 8px;" title="${escapeHtml(dailySummary.simulationTooltip)}">
              <span style="font-size: 10px; color: #1E40AF; display: block;">Estimasi Jarak Observasi</span>
              <strong style="font-size: 13px; color: #1D4ED8;">${dailySummary.estimatedDistanceKm} km</strong>
              <small style="font-size: 9px; color: #3B82F6; display: block;">Pencapaian ${dailySummary.achievementPct}% (Target 5 km/hr)</small>
            </div>
          </div>
          <div style="font-size: 10px; color: #94A3B8; font-style: italic; line-height: 1.2;">
            ℹ️ ${escapeHtml(dailySummary.simulationTooltip)}
          </div>
        </div>
        ` : ''}

        <!-- Aggregated Cards -->
        ${agg ? `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 14px;">
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 8px 10px;">
            <span style="font-size: 10px; color: #64748B;">Total Luas Scope</span>
            <div style="font-size: 14px; font-weight: 800; color: #0F172A;">${agg.totalLuasBlokHa} Ha</div>
            <span style="font-size: 9px; color: #94A3B8;">${agg.totalBlokCount} blok agronomi</span>
          </div>
          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 8px 10px;">
            <span style="font-size: 10px; color: #166534;">Coverage Unik (Ha / %)</span>
            <div style="font-size: 14px; font-weight: 800; color: #15803D;">${agg.totalUniqueDiassessHa} Ha (${agg.totalCoveragePct}%)</div>
            <span style="font-size: 9px; color: #16A34A;">${agg.assessmentLengkapBlokCount} blok lengkap 100%</span>
          </div>
        </div>
        ` : ''}

        <!-- Blocks Assessment List -->
        <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #1E293B;">Daftar Blok Agronomi &amp; Coverage</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
    `;

    if (store && store.masterData && store.masterData.divisions[activeDiv]) {
      const divBlocks = store.masterData.divisions[activeDiv];
      const monthlyMap = store.state ? store.state.monthlyAssessment : {};

      divBlocks.forEach(b => {
        const bAss = monthlyMap[b.key] || { combinedUniqueHa: 0, combinedUniquePct: 0, remainingHa: b.areaHa, status: { label: 'Belum (0%)', color: '#9E9E9E', badgeClass: 'cov-0' } };
        const st = bAss.status || { label: 'Belum (0%)', color: '#9E9E9E', badgeClass: 'cov-0' };

        html += `
          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px; display: flex; justify-content: space-between; align-items: center;" onclick="location.hash='#/blok/${encodeURIComponent(b.key)}'">
            <div>
              <div style="font-weight: 800; font-size: 13px; color: #0F172A;">Blok ${escapeHtml(b.blok)}</div>
              <div style="font-size: 10px; color: #64748B;">Luas: ${b.areaHa} Ha | Unik: ${bAss.combinedUniqueHa} Ha | Sisa: ${bAss.remainingHa} Ha</div>
            </div>
            <div style="text-align: right;">
              <span class="cov-badge ${st.badgeClass}">${bAss.combinedUniquePct}%</span>
            </div>
          </div>
        `;
      });
    } else {
      html += `<div style="text-align: center; color: #94A3B8; font-size: 12px; padding: 20px;">Belum ada data blok untuk divisi ini.</div>`;
    }

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  window.SPTApp = {
    decideFinding: function (findingId, decision) {
      Store.decideAssessmentFinding(findingId, decision, 'Disetujui sesuai tinjauan lapangan.');
      showToast(`Temuan ${findingId} telah disetujui!`);
      const badge = document.getElementById(`statusBadge-${findingId}`);
      if (badge) {
        badge.className = 'badge badge-approved';
        badge.textContent = 'Approved';
      }
    },

    promptDecisionModal: function (findingId, decision) {
      const reason = prompt(`Masukkan alasan untuk keputusan ${decision}:`, decision === 'Revision Requested' ? 'Mohon tinjau ulang volume masalah dan foto detail.' : 'Bukan temuan valid.');
      if (reason) {
        Store.decideAssessmentFinding(findingId, decision, reason);
        showToast(`Keputusan ${decision} berhasil disimpan.`);
        const badge = document.getElementById(`statusBadge-${findingId}`);
        if (badge) {
          badge.className = decision === 'Revision Requested' ? 'badge badge-revision' : 'badge badge-rejected';
          badge.textContent = decision;
        }
      }
    },
    approveAllBlockFindings: function (asmId) {
      const findings = Store.getFindingsByAssessmentId(asmId);
      const persona = Store.getCurrentPersona();
      findings.forEach(f => {
        Store.decideAssessmentFinding(f.id, 'Approved', `Disetujui otomatis melalui verifikasi level blok oleh ${persona.name} (Uji Petik ≥20% PP valid).`);
        const badge = document.getElementById(`statusBadge-${f.id}`);
        if (badge) {
          badge.className = 'badge badge-approved';
          badge.textContent = 'Approved';
        }
      });
      showToast(`✓ Seluruh ${findings.length} temuan di blok disahkan (Cascade Approved)!`);
      setTimeout(() => {
        navigate('#/tugas');
      }, 1000);
    },
    handleRoute: handleRoute
  };

  /**
   * ============================================================
   * APP BOOTSTRAP
   * ============================================================
   */
  function initApp() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initApp();
  } else {
    window.addEventListener('DOMContentLoaded', initApp);
  }


})();
