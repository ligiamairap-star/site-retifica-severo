/* ============================================================
   Retífica Severo — script.js
   Consent Mode v2 + Cookie Banner + Alpine.js helpers
   ============================================================ */

/* -----------------------------------------------------------
   1. GOOGLE CONSENT MODE v2
      Este bloco DEVE ser o primeiro script executado na página.
      Já é definido inline no <head> de cada HTML com:
        gtag('consent','default', { ... all denied })
      Aqui ficam apenas os helpers de update.
   ----------------------------------------------------------- */
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

/* -----------------------------------------------------------
   2. COOKIE CONSENT BANNER
   ----------------------------------------------------------- */
(function () {
  var CONSENT_KEY = 'rs_consent';
  var banner = document.getElementById('consent-banner');

  // Se já decidiu, não mostra o banner
  if (!banner) return;
  var saved = localStorage.getItem(CONSENT_KEY);
  if (saved) {
    banner.classList.add('hidden');
    if (saved === 'granted') grantAll();
    return;
  }

  // Botão Aceitar
  document.getElementById('btn-accept').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'granted');
    grantAll();
    banner.classList.add('hidden');
  });

  // Botão Recusar
  document.getElementById('btn-decline').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, 'denied');
    banner.classList.add('hidden');
  });

  function grantAll() {
    gtag('consent', 'update', {
      ad_storage:          'granted',
      ad_user_data:        'granted',
      ad_personalization:  'granted',
      analytics_storage:   'granted'
    });
  }
})();

/* -----------------------------------------------------------
   3. MOBILE MENU — Alpine.js cuida, mas fallback puro JS
   ----------------------------------------------------------- */
(function () {
  var toggleBtn = document.getElementById('mobile-menu-btn');
  var menu      = document.getElementById('mobile-menu');
  if (!toggleBtn || !menu) return;
  toggleBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', open);
  });
})();

/* -----------------------------------------------------------
   4. FAQ ACCORDION — Alpine.js cuida nas páginas.
      Fallback para páginas que não carregam Alpine.
   ----------------------------------------------------------- */
(function () {
  document.querySelectorAll('.faq-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var answer = btn.nextElementSibling;
      var isOpen = answer.style.display === 'block';
      // Fecha todos
      document.querySelectorAll('.faq-answer').forEach(function (a) { a.style.display = 'none'; });
      document.querySelectorAll('.faq-icon').forEach(function (i) { i.textContent = '+'; });
      if (!isOpen) {
        answer.style.display = 'block';
        btn.querySelector('.faq-icon').textContent = '−';
      }
    });
    // Inicia fechado
    btn.nextElementSibling.style.display = 'none';
  });
})();

/* -----------------------------------------------------------
   5. GA4 — COMENTADO. Ative preenchendo o ID abaixo.
   ----------------------------------------------------------- */
/*
var GA_ID = 'G-XXXXXXXXXX'; // substitua pelo seu Measurement ID
(function () {
  if (localStorage.getItem('rs_consent') === 'granted') {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID);
  }
})();
*/
