/* ============================================================
   contact.js — Form Validation & Submit Handling
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initContactForm();
  });

  function initContactForm() {
    var form        = document.querySelector('#contact-form');
    if (!form) return;

    var submitBtn   = form.querySelector('#submit-btn');
    var formContent = document.querySelector('.contact-form-content');
    var successMsg  = document.querySelector('.success-message');

    // Blur validation
    form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function (f) {
      f.addEventListener('blur', function () { validateField(f); });
      f.addEventListener('input', function () {
        if (f.classList.contains('error')) validateField(f);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        submitForm(form, submitBtn, formContent, successMsg);
      }
    });
  }

  /* ── Single Field ────────────────────────────────────────── */
  function validateField(field) {
    var errorEl = field.parentElement.querySelector('.form-error');
    var value   = field.value.trim();
    var valid   = true;
    var msg     = '';

    if (field.hasAttribute('required') && !value) {
      valid = false; msg = 'This field is required.';
    } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      valid = false; msg = 'Please enter a valid email address.';
    } else if (field.tagName === 'SELECT' && field.hasAttribute('required') && (!value || value === 'default')) {
      valid = false; msg = 'Please select an option.';
    }

    field.classList.toggle('error', !valid);
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.toggle('visible', !valid);
    }

    return valid;
  }

  /* ── Full Form ───────────────────────────────────────────── */
  function validateForm(form) {
    var fields = form.querySelectorAll('.form-input[required], .form-textarea[required], .form-select[required]');
    var allValid = true;
    var first = null;

    fields.forEach(function (f) {
      if (!validateField(f)) {
        allValid = false;
        if (!first) first = f;
      }
    });

    if (first) {
      first.focus();
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return allValid;
  }

  /* ── Submit ──────────────────────────────────────────────── */
  function submitForm(form, btn, formContent, successMsg) {
    var orig = btn ? btn.innerHTML : '';
    if (btn) { btn.innerHTML = '<span class="spinner"></span>&nbsp;SENDING...'; btn.disabled = true; }

    setTimeout(function () {
      if (btn) { btn.innerHTML = orig; btn.disabled = false; }
      if (formContent) formContent.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('visible');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
    }, 1800);
  }

})();
