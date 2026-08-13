/* ═══════════════════════════════════════════════════════
   BELOTI ADVOCACIA — main.js
   · Formulário + redirect WhatsApp
   · Animações de scroll (IntersectionObserver)
   · Ano dinâmico no footer
   · Carrossel: pausa no hover já tratada via CSS
═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── CONFIGURAÇÃO ─────────────────────────────────── */
  // Substitua pelo número real da Dra. Bruna (somente dígitos, com DDI)
  var WHATSAPP_NUMBER = '5541999999999';

  /* ─── ANO DINÂMICO NO FOOTER ───────────────────────── */
  var anoEl = document.getElementById('anoAtual');
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  /* ─── ANIMAÇÕES DE SCROLL ──────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll(
      '.hero-content, .hero-photo, .autoridade-content, .autoridade-photo, ' +
      '.numero-card, .passo-item, .oferta-card, .formulario-wrapper'
    );

    revealEls.forEach(function (el) {
      el.setAttribute('data-reveal', '');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ─── SMOOTH SCROLL NOS LINKS ÂNCORA ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Mover foco para acessibilidade
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ─── MÁSCARA DE TELEFONE ───────────────────────────── */
  var whatsappInput = document.getElementById('whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('input', function () {
      var raw = whatsappInput.value.replace(/\D/g, '').slice(0, 11);
      var masked = raw;
      if (raw.length > 10) {
        masked = '(' + raw.slice(0,2) + ') ' + raw.slice(2,7) + '-' + raw.slice(7);
      } else if (raw.length > 6) {
        masked = '(' + raw.slice(0,2) + ') ' + raw.slice(2,6) + '-' + raw.slice(6);
      } else if (raw.length > 2) {
        masked = '(' + raw.slice(0,2) + ') ' + raw.slice(2);
      } else if (raw.length > 0) {
        masked = '(' + raw;
      }
      whatsappInput.value = masked;
    });
  }

  /* ─── FORMULÁRIO ────────────────────────────────────── */
  var form = document.getElementById('leadForm');
  if (!form) return;

  function getField(id) {
    return document.getElementById(id);
  }

  function showError(fieldId, msg) {
    var errorEl = document.getElementById(fieldId + '-error');
    var inputEl = getField(fieldId);
    if (errorEl) errorEl.textContent = msg;
    if (inputEl) {
      inputEl.classList.add('is-invalid');
      inputEl.setAttribute('aria-describedby', fieldId + '-error');
    }
  }

  function clearError(fieldId) {
    var errorEl = document.getElementById(fieldId + '-error');
    var inputEl = getField(fieldId);
    if (errorEl) errorEl.textContent = '';
    if (inputEl) inputEl.classList.remove('is-invalid');
  }

  function validatePhone(value) {
    var digits = value.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
  }

  function validate() {
    var valid = true;

    var nome = getField('nome').value.trim();
    clearError('nome');
    if (!nome || nome.length < 3) {
      showError('nome', 'Por favor, informe seu nome completo.');
      valid = false;
    }

    var whatsapp = getField('whatsapp').value.trim();
    clearError('whatsapp');
    if (!whatsapp || !validatePhone(whatsapp)) {
      showError('whatsapp', 'Informe um WhatsApp válido com DDD.');
      valid = false;
    }

    var cidade = getField('cidade').value.trim();
    clearError('cidade');
    if (!cidade || cidade.length < 2) {
      showError('cidade', 'Por favor, informe sua cidade.');
      valid = false;
    }

    var tempo = getField('tempo_fila').value;
    clearError('tempo_fila');
    if (!tempo) {
      showError('tempo_fila', 'Selecione há quanto tempo está na fila.');
      valid = false;
    }

    return valid;
  }

  function buildWhatsAppText(nome, whatsapp, cidade, tempo) {
    return (
      'Olá, Dra. Bruna! 👋\n' +
      'Vim pelo site e gostaria de saber mais sobre a vaga em creche.\n\n' +
      '📋 *Meus dados:*\n' +
      '• Nome: ' + nome + '\n' +
      '• WhatsApp: ' + whatsapp + '\n' +
      '• Cidade: ' + cidade + '\n' +
      '• Tempo na fila: ' + tempo + '\n\n' +
      'Aguardo o contato. Obrigada!'
    );
  }

  /* Limpar erro inline ao corrigir o campo */
  ['nome', 'whatsapp', 'cidade', 'tempo_fila'].forEach(function (id) {
    var el = getField(id);
    if (el) {
      el.addEventListener('input', function () { clearError(id); });
      el.addEventListener('change', function () { clearError(id); });
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) {
      // Scroll para o primeiro erro
      var firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
      return;
    }

    var nome     = getField('nome').value.trim();
    var whatsapp = getField('whatsapp').value.trim();
    var cidade   = getField('cidade').value.trim();
    var tempo    = getField('tempo_fila').value;

    var text = buildWhatsAppText(nome, whatsapp, cidade, tempo);
    var url  = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

    /* Dispara evento Lead do Meta Pixel */
    if (typeof fbq === 'function') {
      fbq('track', 'Lead');
    }

    /* Feedback visual no botão */
    var btn = document.getElementById('submitBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Abrindo WhatsApp…';
    }

    /* Abre o WhatsApp em nova aba */
    window.open(url, '_blank', 'noopener,noreferrer');

    /* Restaura o botão após 3s */
    setTimeout(function () {
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Falar com a Dra. Bruna no WhatsApp';
      }
    }, 3000);
  });

})();
