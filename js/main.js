/* ============================================================
   main.js — Navigation, Animations, Scroll, Mobile Menu
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initNavActiveState();
    initNavWordmarkShimmer();
    initMobileMenu();
    initSmoothScroll();
    initRevealObserver();
    initNewsletterForm();
  });

  /* ── Active Nav Link ─────────────────────────────────────── */
  function initNavActiveState() {
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-link, .mobile-nav-link');

    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var linkFile = href.split('/').pop();

      var isHome = (currentFile === 'index.html' || currentFile === '');
      var linkIsHome = (linkFile === 'index.html' || linkFile === '' || href === '/' || href === '../index.html');

      if (isHome && linkIsHome) {
        link.classList.add('active');
      } else if (!isHome && linkFile && linkFile === currentFile) {
        link.classList.add('active');
      }
    });
  }

  /* ── Wordmark Shimmer on Load ────────────────────────────── */
  function initNavWordmarkShimmer() {
    var wordmark = document.querySelector('.nav-wordmark');
    if (!wordmark) return;
    setTimeout(function () {
      wordmark.classList.add('shimmer');
      wordmark.addEventListener('animationend', function () {
        wordmark.classList.remove('shimmer');
      }, { once: true });
    }, 400);
  }

  /* ── Mobile Menu ─────────────────────────────────────────── */
  function initMobileMenu() {
    var hamburger = document.querySelector('.nav-hamburger');
    var overlay   = document.querySelector('.nav-mobile-overlay');
    var mobileLinks = document.querySelectorAll('.mobile-nav-link');
    if (!hamburger || !overlay) return;

    function openMenu() {
      hamburger.setAttribute('aria-expanded', 'true');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      hamburger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });

    mobileLinks.forEach(function (link) { link.addEventListener('click', closeMenu); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── Smooth Scroll ───────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        var navH = 72;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ── Intersection Observer: Reveal ──────────────────────── */
  function initRevealObserver() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Newsletter Inline Form ──────────────────────────────── */
  function initNewsletterForm() {
    var form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn   = form.querySelector('button');
      if (!input) return;

      if (!input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        input.style.borderColor = 'var(--color-red)';
        input.focus();
        return;
      }

      input.style.borderColor = '';
      var orig = btn.textContent;
      btn.textContent = 'SUBSCRIBED ✓';
      btn.disabled = true;
      input.value = '';

      setTimeout(function () {
        btn.textContent = orig;
        btn.disabled = false;
      }, 4000);
    });
  }

})();
