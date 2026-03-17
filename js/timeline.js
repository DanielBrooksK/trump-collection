/* ============================================================
   timeline.js — Timeline Filter & Interaction Logic
   ============================================================ */

(function () {
  'use strict';

  var currentYear = 'all';
  var currentCategory = 'all';

  document.addEventListener('DOMContentLoaded', function () {
    initFilters();
    initEntryExpand();
  });

  /* ── Filters ─────────────────────────────────────────────── */
  function initFilters() {
    document.querySelectorAll('.filter-btn[data-year]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn[data-year]').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        currentYear = btn.getAttribute('data-year');
        filterEntries();
      });
    });

    var catSelect = document.querySelector('.filter-select[data-filter="category"]');
    if (catSelect) {
      catSelect.addEventListener('change', function () {
        currentCategory = catSelect.value;
        filterEntries();
      });
    }
  }

  /* ── Filter Logic ────────────────────────────────────────── */
  function filterEntries() {
    var entries = document.querySelectorAll('.timeline-entry');
    var count = 0;

    entries.forEach(function (entry) {
      var eYear = entry.getAttribute('data-year') || 'all';
      var eCat  = entry.getAttribute('data-category') || 'all';
      var show  = (currentYear === 'all' || eYear === currentYear) &&
                  (currentCategory === 'all' || eCat === currentCategory);

      if (show) {
        entry.classList.remove('hidden');
        count++;
      } else {
        entry.classList.add('hidden');
        var desc = entry.querySelector('.tl-desc');
        if (desc) desc.classList.remove('expanded');
      }
    });

    var empty = document.querySelector('.timeline-empty');
    if (empty) empty.style.display = count === 0 ? 'block' : 'none';
  }

  /* ── Expand / Collapse Entry ─────────────────────────────── */
  function initEntryExpand() {
    document.querySelectorAll('.tl-card').forEach(function (card) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');

      card.addEventListener('click', function () {
        toggleEntry(card);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleEntry(card);
        }
      });
    });
  }

  function toggleEntry(card) {
    var desc = card.querySelector('.tl-desc');
    if (!desc) return;
    var isExpanded = desc.classList.contains('expanded');

    // Collapse all
    document.querySelectorAll('.tl-desc.expanded').forEach(function (d) {
      d.classList.remove('expanded');
      var c = d.closest('.tl-card');
      if (c) c.setAttribute('aria-expanded', 'false');
    });

    if (!isExpanded) {
      desc.classList.add('expanded');
      card.setAttribute('aria-expanded', 'true');
    }
  }

})();
