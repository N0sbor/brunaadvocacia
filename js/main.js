/* ═══════════════════════════════════════════════════════
   BELOTI ADVOCACIA — main.js
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5541997842173';

  /* ─── ANO DINÂMICO ──────────────────────────────────── */
  var anoEl = document.getElementById('anoAtual');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ─── CONTADOR SEQUENCIAL DE CLIENTES (servidor) ───── */
  function getNextClientNumber() {
    return fetch('contador.php')
      .then(function (r) { return r.json(); })
      .then(function (d) { return d.numero; })
      .catch(function () { return '???'; });
  }

  /* ─── ANIMAÇÕES DE SCROLL ──────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.hero-content, .hero-photo, .autoridade-content, .autoridade-photo, ' +
      '.numero-card, .passo-item, .oferta-card, .formulario-wrapper, .faq-list'
    );
    revealEls.forEach(function (el) { el.setAttribute('data-reveal', ''); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ─── SMOOTH SCROLL ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ─── MÁSCARA DE TELEFONE ───────────────────────────── */
  var whatsappInput = document.getElementById('whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('input', function () {
      var raw = whatsappInput.value.replace(/\D/g, '').slice(0, 11);
      var m = raw;
      if (raw.length > 10)     m = '(' + raw.slice(0,2) + ') ' + raw.slice(2,7) + '-' + raw.slice(7);
      else if (raw.length > 6) m = '(' + raw.slice(0,2) + ') ' + raw.slice(2,6) + '-' + raw.slice(6);
      else if (raw.length > 2) m = '(' + raw.slice(0,2) + ') ' + raw.slice(2);
      else if (raw.length > 0) m = '(' + raw;
      whatsappInput.value = m;
    });
  }

  /* ─── FORMULÁRIO ────────────────────────────────────── */
  var form = document.getElementById('leadForm');
  if (!form) return;

  function getField(id) { return document.getElementById(id); }

  function showError(fieldId, msg) {
    var errEl = document.getElementById(fieldId + '-error');
    var inp   = getField(fieldId);
    if (errEl) errEl.textContent = msg;
    if (inp)   { inp.classList.add('is-invalid'); inp.setAttribute('aria-describedby', fieldId + '-error'); }
  }

  function clearError(fieldId) {
    var errEl = document.getElementById(fieldId + '-error');
    var inp   = getField(fieldId);
    if (errEl) errEl.textContent = '';
    if (inp)   inp.classList.remove('is-invalid');
  }

  function validatePhone(value) {
    var d = value.replace(/\D/g, '');
    return d.length >= 10 && d.length <= 11;
  }

  function validate() {
    var valid = true;

    var nome = getField('nome').value.trim();
    clearError('nome');
    if (!nome || nome.length < 2) {
      showError('nome', 'Por favor, informe seu nome.');
      valid = false;
    }

    var wp = getField('whatsapp').value.trim();
    clearError('whatsapp');
    if (!wp || !validatePhone(wp)) {
      showError('whatsapp', 'Informe um WhatsApp válido com DDD.');
      valid = false;
    }

    return valid;
  }

  ['nome', 'whatsapp'].forEach(function (id) {
    var el = getField(id);
    if (el) el.addEventListener('input', function () { clearError(id); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) {
      var first = form.querySelector('.is-invalid');
      if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); first.focus(); }
      return;
    }

    var nome = getField('nome').value.trim();
    var wp   = getField('whatsapp').value.trim();
    var btn  = document.getElementById('submitBtn');

    if (btn) { btn.disabled = true; btn.textContent = 'Aguarde...'; }

    getNextClientNumber().then(function (numCliente) {
      var text =
        '*Cliente ' + numCliente + ' - Vaga em Creche*\n\n' +
        'Ola, Dra. Bruna! Vim pelo site e quero saber como garantir a vaga do meu filho na creche municipal.\n\n' +
        '*Nome:* ' + nome + '\n' +
        '*WhatsApp:* ' + wp + '\n\n' +
        'Aguardo o contato!';

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

      if (typeof fbq === 'function') fbq('track', 'Lead');

      window.open(url, '_blank', 'noopener,noreferrer');

      setTimeout(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Falar com a Dra. Bruna no WhatsApp'; }
      }, 3000);
    });
  });

})();
