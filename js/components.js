/* Laxmi En-Fab - shared component injection */
(function () {
  'use strict';

  var HEADER_HTML = '<header class="site-header" id="site-header">' +
    '<div class="site-header__inner">' +
    '<a href="index.html" class="site-header__brand"><img src="assets/images/laxmi-logo.png" alt="Laxmi En-Fab Logo" class="site-header__logo"></a>' +
    '<nav class="site-header__nav" id="site-nav" aria-label="Main navigation"><ul class="nav-list">' +
    '<li class="nav-item nav-item--dropdown"><button type="button" class="nav-link nav-link--toggle" aria-expanded="false" aria-haspopup="true">SOLUTIONS <span class="nav-caret">&#9662;</span></button><ul class="nav-dropdown">' +
    '<li><a href="solutions.html">Solutions Overview</a></li>' +
    '<li><a href="understand-market.html">Understand the Market</a></li>' +
    '<li><a href="design-your-plant.html">Design Your Plant</a></li>' +
    '<li><a href="compare-your-aac-plant.html">Compare Your AAC Plant</a></li>' +
    '<li><a href="efficient-your-plant.html">Efficient Your Plant</a></li>' +
    '<li><a href="expand-your-plant.html">Expand Your Plant</a></li></ul></li>' +
    '<li class="nav-item nav-item--dropdown"><button type="button" class="nav-link nav-link--toggle" aria-expanded="false" aria-haspopup="true">MACHINERY & EQUIPMENT <span class="nav-caret">&#9662;</span></button><ul class="nav-dropdown">' +
    '<li><a href="production-process.html">AAC Production Process</a></li>' +
    '<li><a href="plant-layout.html">AAC Plant Layout</a></li></ul></li>' +
    '<li class="nav-item nav-item--dropdown"><button type="button" class="nav-link nav-link--toggle" aria-expanded="false" aria-haspopup="true">AAC INVESTOR ACADEMY <span class="nav-caret">&#9662;</span></button><ul class="nav-dropdown">' +
    '<li><a href="academy.html">Academy Overview</a></li>' +
    '<li><a href="understand-market.html">Understand the Market</a></li>' +
    '<li><a href="design-your-plant.html">Design Your Plant</a></li>' +
    '<li><a href="compare-your-aac-plant.html">Compare Your AAC Plant</a></li>' +
    '<li><a href="efficient-your-plant.html">Efficient Your Plant</a></li>' +
    '<li><a href="expand-your-plant.html">Expand Your Plant</a></li></ul></li>' +
    '<li class="nav-item nav-item--dropdown"><button type="button" class="nav-link nav-link--toggle" aria-expanded="false" aria-haspopup="true">ENGINEERING CENTER <span class="nav-caret">&#9662;</span></button><ul class="nav-dropdown">' +
    '<li><a href="engineering-center.html">Engineering Center Overview</a></li>' +
    '<li><a href="production-process.html">AAC Production Process</a></li>' +
    '<li><a href="plant-layout.html">AAC Plant Layout</a></li></ul></li>' +
    '<li class="nav-item"><a href="projects.html" class="nav-link">PROJECTS</a></li>' +
    '<li class="nav-item nav-item--dropdown"><button type="button" class="nav-link nav-link--toggle" aria-expanded="false" aria-haspopup="true">WHY LAXMI <span class="nav-caret">&#9662;</span></button><ul class="nav-dropdown">' +
    '<li><a href="why-laxmi.html">Why Laxmi</a></li>' +
    '<li><a href="knowledge-hub.html">Knowledge Hub</a></li></ul></li>' +
    '</ul><a href="contact.html" class="site-header__cta nav-cta">CONTACT US &rarr;</a></nav>' +
    '<button type="button" class="site-header__burger" id="nav-burger" aria-label="Toggle menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>' +
    '</div></header>';

  function mountHeader(html) {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    mount.outerHTML = html;
    initDropdowns();
    initMobileMenu();
  }

  function injectHeader() {
    if (window.location.protocol === 'file:') {
      // fetch() is blocked on file:// - use inline header
      mountHeader(HEADER_HTML);
      return;
    }

    fetch('components/header.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        // header.html may be a full standalone document; extract only the <header> element
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
      if (!toggle) return;
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = item.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.querySelectorAll('.nav-item--dropdown.is-open').forEach(function (other) {
          if (other !== item) {
            other.classList.remove('is-open');
            var t = other.querySelector('.nav-link--toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.nav-item--dropdown.is-open').forEach(function (item) {
        item.classList.remove('is-open');
        var t = item.querySelector('.nav-link--toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
