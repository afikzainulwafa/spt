/**
 * SMART PROBLEM TAGGING - Static Mockup Access Controller
 * 
 * SECURITY NOTICE FOR PRODUCTION:
 * This is a client-side static mockup authentication script intended solely
 * for internal concept validation and offline demonstrations.
 * Hardcoded credentials in client-side code are visible to users.
 * In a production environment, this MUST be replaced by an enterprise OAuth2 / SSO 
 * or backend authentication service with secure HTTP-only cookies and JWT tokens.
 */

(function () {
  'use strict';

  var DEMO_USER = 'admin_spt';
  var DEMO_PASS = 'SPT2026!';
  var SESSION_KEY = 'spt_mockup_session_v1';

  function isAuthenticated() {
    try {
      if (window.location.search.indexOf('autologin=1') !== -1 || window.location.hash.indexOf('autologin') !== -1) {
        return true;
      }
      return sessionStorage.getItem(SESSION_KEY) === 'authenticated' || localStorage.getItem(SESSION_KEY) === 'authenticated';
    } catch (e) {
      return false;
    }
  }

  function setAuthenticated(status) {
    try {
      if (status) {
        sessionStorage.setItem(SESSION_KEY, 'authenticated');
        localStorage.setItem(SESSION_KEY, 'authenticated');
        sessionStorage.setItem('spt_user_name', 'Afik Zainul Wafa');
        sessionStorage.setItem('spt_user_role', 'Administrator Operasional');
      } else {
        sessionStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem('spt_user_name');
        sessionStorage.removeItem('spt_user_role');
      }
    } catch (e) {
      console.warn('Session storage inaccessible:', e);
    }
  }

  function initAuthUI() {
    var loginScreen = document.getElementById('loginScreen');
    var loginForm = document.getElementById('loginForm');
    var loginError = document.getElementById('loginError');
    var mockLogout = document.getElementById('mockLogout');

    if (!loginScreen) return;

    if (isAuthenticated()) {
      loginScreen.classList.remove('active');
      loginScreen.style.display = 'none';
      if (window.SPT_APP && typeof window.SPT_APP.onLoginSuccess === 'function') {
        window.SPT_APP.onLoginSuccess();
      }
    } else {
      loginScreen.classList.add('active');
      loginScreen.style.display = 'flex';
    }

    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var userInput = loginForm.elements['username'].value.trim();
        var passInput = loginForm.elements['password'].value.trim();

        if (userInput === DEMO_USER && passInput === DEMO_PASS) {
          if (loginError) loginError.textContent = '';
          setAuthenticated(true);
          loginScreen.classList.remove('active');
          loginScreen.style.display = 'none';
          
          if (window.SPT_APP && typeof window.SPT_APP.onLoginSuccess === 'function') {
            window.SPT_APP.onLoginSuccess();
          } else if (window.SPT_APP && typeof window.SPT_APP.initOrRefresh === 'function') {
            window.SPT_APP.initOrRefresh();
          }
          if (!window.location.hash || window.location.hash === '#') {
            window.location.hash = '#dashboard';
          }
        } else {
          if (loginError) {
            loginError.textContent = 'Kredensial tidak valid. Gunakan admin_spt / SPT2026!';
            loginError.style.display = 'block';
          }
        }
      });
    }

    if (mockLogout) {
      mockLogout.addEventListener('click', function () {
        setAuthenticated(false);
        if (loginScreen) {
          loginScreen.classList.add('active');
          loginScreen.style.display = 'flex';
        }
        if (loginForm) {
          loginForm.reset();
        }
        if (loginError) {
          loginError.textContent = '';
        }
      });
    }
  }

  window.SPT_AUTH = {
    isAuthenticated: isAuthenticated,
    logout: function () {
      setAuthenticated(false);
      var loginScreen = document.getElementById('loginScreen');
      if (loginScreen) {
        loginScreen.classList.add('active');
        loginScreen.style.display = 'flex';
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
  } else {
    initAuthUI();
  }
})();
