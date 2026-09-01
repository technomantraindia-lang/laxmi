/* Laxmi En-Fab - shared component injection */
(function () {
  'use strict';

  var HEADER_HTML = '<header class="site-header" id="site-header">' +
    '<div class="site-header__inner">' +
    '<a href="index.html" class="site-header__brand" aria-label="Laxmi En-Fab Pvt. Ltd. Home"><img src="assets/images/laxmi-logo.png" alt="Laxmi En-Fab Logo" class="site-header__logo"></a>' +
    '<nav class="site-header__nav" id="site-nav" aria-label="Primary navigation"><ul class="nav-list" role="menubar">' +
    '<li class="nav-item nav-item--dropdown" role="none"><a href="solutions.html" class="nav-link nav-link--toggle" aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-solutions">Solutions <span class="nav-caret">▾</span></a>' +
    '<ul class="nav-dropdown" id="nav-dropdown-solutions" role="menu" aria-label="Solutions Submenu">' +
    '<li role="none"><a href="solutions.html" role="menuitem"><span class="dropdown-item__title">AAC PLANTS</span><span class="dropdown-item__sub">Complete AAC plant solutions</span></a></li>' +
    '<li role="none"><a href="solutions.html#dry-mix" role="menuitem"><span class="dropdown-item__title">DRY MIX MORTAR</span><span class="dropdown-item__sub">Dry mix mortar plant solutions</span></a></li>' +
    '</ul></li>' +
    '<li class="nav-item nav-item--dropdown" role="none"><a href="machinery-equipment.html" class="nav-link nav-link--toggle" aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-machinery">Machinery &amp; Equipment <span class="nav-caret">▾</span></a>' +
    '<ul class="nav-dropdown nav-dropdown--machinery" id="nav-dropdown-machinery" role="menu" aria-label="Machinery Submenu">' +
    '<li role="none"><a href="machinery-equipment.html#material" role="menuitem"><span class="dropdown-num">01</span> MATERIAL PREPARATION</a></li>' +
    '<li role="none"><a href="machinery-equipment.html#batching" role="menuitem"><span class="dropdown-num">02</span> BATCHING &amp; POURING</a></li>' +
    '<li role="none"><a href="machinery-equipment.html#batching" role="menuitem"><span class="dropdown-num">03</span> PRECURING &amp; MOULDING</a></li>' +
    '<li role="none"><a href="machinery-equipment.html#cutting" role="menuitem"><span class="dropdown-num">04</span> CUTTING &amp; HANDLING</a></li>' +
    '<li role="none"><a href="machinery-equipment.html#autoclave" role="menuitem"><span class="dropdown-num">05</span> AUTOCLAVING</a></li>' +
    '<li role="none"><a href="machinery-equipment.html#autoclave" role="menuitem"><span class="dropdown-num">06</span> PACKING</a></li>' +
    '</ul></li>' +
    '<li class="nav-item" role="none"><a href="academy.html" class="nav-link" role="menuitem">AAC Investor Academy</a></li>' +
    '<li class="nav-item" role="none"><a href="engineering-center.html" class="nav-link" role="menuitem">Engineering Center</a></li>' +
    '<li class="nav-item" role="none"><a href="projects.html" class="nav-link" role="menuitem">Projects</a></li>' +
    '<li class="nav-item" role="none"><a href="why-laxmi.html" class="nav-link" role="menuitem">About Us</a></li>' +
    '</ul>' +
    '<div class="mobile-nav-cta-wrap"><a href="contact.html" class="site-header__cta site-header__cta--mobile nav-cta">CONTACT US <span class="cta-arrow">→</span></a></div>' +
    '</nav>' +
    '<a href="contact.html" class="site-header__cta nav-cta">CONTACT US <span class="cta-arrow">→</span></a>' +
    '<button type="button" class="site-header__burger" id="nav-burger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>' +
    '</div></header>';

  function mountHeader(html) {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    mount.outerHTML = html;
    initDropdowns();
    initMobileMenu();
    highlightActivePage();
  }

  function injectHeader() {
    if (window.location.protocol === 'file:') {
      mountHeader(HEADER_HTML);
      return;
    }

    fetch('components/header.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var tmp = document.createElement('div');
        tmp.innerHTML = html;
        var headerEl = tmp.querySelector('header.site-header');
        var headerHtml = headerEl ? headerEl.outerHTML : html;
        headerHtml = headerHtml.replace(/(href|src)="\.\.\//g, '$1="');
        mountHeader(headerHtml);
      })
      .catch(function () { mountHeader(HEADER_HTML); });
  }

  function initDropdowns() {
    document.querySelectorAll('.nav-item--dropdown').forEach(function (item) {
      var toggle = item.querySelector('.nav-link--toggle');
      var caret = item.querySelector('.nav-caret');
      var dropdown = item.querySelector('.nav-dropdown');
      if (!toggle || !dropdown) return;

      // Handle caret click on mobile / touch
      if (caret) {
        caret.addEventListener('click', function (e) {
          if (window.innerWidth < 1100) {
            e.preventDefault();
            e.stopPropagation();
            var open = item.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          }
        });
      }

      // Desktop hover intent
      item.addEventListener('mouseenter', function () {
        if (window.innerWidth >= 1100) {
          item.classList.add('is-open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
      item.addEventListener('mouseleave', function () {
        if (window.innerWidth >= 1100) {
          item.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-item--dropdown')) {
        document.querySelectorAll('.nav-item--dropdown.is-open').forEach(function (item) {
          item.classList.remove('is-open');
          var t = item.querySelector('.nav-link--toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-item--dropdown.is-open').forEach(function (item) {
          item.classList.remove('is-open');
          var t = item.querySelector('.nav-link--toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function initMobileMenu() {
    var burger = document.getElementById('nav-burger');
    var nav = document.getElementById('site-nav');
    if (!burger || !nav) return;
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-mobile-open');
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function highlightActivePage() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
        link.classList.add('is-active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
