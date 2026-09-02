/* Laxmi En-Fab - shared component injection */
(function () {
  'use strict';

  var HEADER_HTML = '<header class="site-header" id="site-header">' +
    '<div class="site-header__inner">' +
    '<a href="index.html" class="site-header__brand" aria-label="Laxmi En-Fab Pvt. Ltd. Home"><img src="assets/images/laxmi-logo.png" alt="Laxmi En-Fab Logo" class="site-header__logo"></a>' +
    '<nav class="site-header__nav" id="site-nav" aria-label="Primary navigation"><ul class="nav-list" role="menubar">' +
    '<li class="nav-item" role="none"><a href="why-laxmi.html" class="nav-link" role="menuitem">About Us</a></li>' +
    '<li class="nav-item nav-item--dropdown" role="none"><a href="solutions.html" class="nav-link nav-link--toggle" aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-solutions">Solutions <span class="nav-caret">▾</span></a>' +
    '<ul class="nav-dropdown" id="nav-dropdown-solutions" role="menu" aria-label="Solutions Submenu">' +
    '<li role="none"><a href="aac-block-panel-plant.html" role="menuitem"><span class="dropdown-item__title">AAC PLANTS</span><span class="dropdown-item__sub">Complete AAC plant solutions</span></a></li>' +
    '<li role="none"><a href="dry-mix-mortar-plant.html" role="menuitem"><span class="dropdown-item__title">DRY MIX MORTAR</span><span class="dropdown-item__sub">Dry mix mortar plant solutions</span></a></li>' +
    '</ul></li>' +
    '<li class="nav-item" role="none"><a href="machinery-equipment.html" class="nav-link" role="menuitem">Machinery &amp; Equipment</a></li>' +
    '<li class="nav-item nav-item--dropdown" role="none"><a href="academy.html" class="nav-link nav-link--toggle" aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-academy">AAC Investor Academy <span class="nav-caret">▾</span></a>' +
    '<ul class="nav-dropdown nav-dropdown--academy" id="nav-dropdown-academy" role="menu" aria-label="AAC Investor Academy Submenu">' +
    '<li role="none"><a href="understand-market.html" role="menuitem"><span class="dropdown-num">01</span> UNDERSTAND THE MARKET</a></li>' +
    '<li role="none"><a href="design-your-plant.html" role="menuitem"><span class="dropdown-num">02</span> DESIGN YOUR PLANT</a></li>' +
    '<li role="none"><a href="compare-your-aac-plant.html" role="menuitem"><span class="dropdown-num">03</span> COMPARE YOUR AAC PLANT</a></li>' +
    '<li role="none"><a href="efficient-your-plant.html" role="menuitem"><span class="dropdown-num">04</span> EFFICIENT YOUR PLANT</a></li>' +
    '<li role="none"><a href="expand-your-plant.html" role="menuitem"><span class="dropdown-num">05</span> EXPAND YOUR PLANT</a></li>' +
    '</ul></li>' +
    '<li class="nav-item nav-item--dropdown" role="none"><a href="engineering-center.html" class="nav-link nav-link--toggle" aria-haspopup="true" aria-expanded="false" aria-controls="nav-dropdown-engineering">Engineering Center <span class="nav-caret">▾</span></a>' +
    '<ul class="nav-dropdown" id="nav-dropdown-engineering" role="menu" aria-label="Engineering Submenu">' +
    '<li role="none"><a href="engineering-center.html" role="menuitem"><span class="dropdown-item__title">PRODUCTION PROCESS</span><span class="dropdown-item__sub">8-stage AAC process flow</span></a></li>' +
    '<li role="none"><a href="plant-layout.html" role="menuitem"><span class="dropdown-item__title">PLANT GA LAYOUT</span><span class="dropdown-item__sub">Interactive general arrangement drawing</span></a></li>' +
    '</ul></li>' +
    '<li class="nav-item" role="none"><a href="projects.html" class="nav-link" role="menuitem">Projects</a></li>' +
    '</ul>' +
    '<div class="mobile-nav-cta-wrap"><a href="contact.html" class="site-header__cta site-header__cta--mobile nav-cta">CONTACT US <span class="cta-arrow">→</span></a></div>' +
    '</nav>' +
    '<a href="contact.html" class="site-header__cta nav-cta">CONTACT US <span class="cta-arrow">→</span></a>' +
    '<button type="button" class="site-header__burger" id="nav-burger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>' +
    '</div></header>';

  var FOOTER_HTML = '<footer class="site-footer" id="site-footer">' +
    '<div class="site-footer__main">' +
    '<div class="site-footer__inner">' +
    '<div class="footer-col footer-col--brand">' +
    '<a href="index.html" class="footer-brand"><img src="assets/images/laxmi-logo.png" alt="Laxmi En-Fab Logo" class="footer-logo"></a>' +
    '<p class="footer-tagline">Build your AAC plant with confidence.</p>' +
    '<p class="footer-desc">Manufacturer &amp; turn-key engineering supplier for high-capacity AAC block plants, panel production lines, and dry mix mortar plants.</p>' +
    '<div class="footer-guarantee-badge"><span class="badge-dot"></span> 24-HOUR B2B ENGINEERING RESPONSE GUARANTEE</div>' +
    '</div>' +
    '<div class="footer-col">' +
    '<h4 class="footer-col__title">NAVIGATION</h4>' +
    '<ul class="footer-links">' +
    '<li><a href="index.html">Home</a></li>' +
    '<li><a href="solutions.html">Solutions</a></li>' +
    '<li><a href="machinery-equipment.html">Machinery &amp; Equipment</a></li>' +
    '<li><a href="academy.html">AAC Investor Academy</a></li>' +
    '<li><a href="engineering-center.html">Engineering Center</a></li>' +
    '<li><a href="projects.html">Projects</a></li>' +
    '<li><a href="why-laxmi.html">About Us</a></li>' +
    '<li><a href="contact.html">Contact</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="footer-col">' +
    '<h4 class="footer-col__title">SOLUTIONS &amp; LINES</h4>' +
    '<ul class="footer-links">' +
    '<li><a href="solutions.html">AAC Block Plant</a></li>' +
    '<li><a href="solutions.html">AAC Panel Plant</a></li>' +
    '<li><a href="solutions.html#dry-mix">Dry Mix Mortar Plant</a></li>' +
    '<li><a href="machinery-equipment.html#material">Wet Grinding Ball Mill</a></li>' +
    '<li><a href="machinery-equipment.html#batching">Automated Dosing Unit</a></li>' +
    '<li><a href="machinery-equipment.html#cutting">3-Stage Oscillating Cutter</a></li>' +
    '<li><a href="machinery-equipment.html#autoclave">Steam Curing Autoclaves</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="footer-col footer-col--contact">' +
    '<h4 class="footer-col__title">HEAD OFFICE &amp; WORKS</h4>' +
    '<address class="footer-address">Laxmi En-Fab Pvt. Ltd.<br>48 Block A, 2nd Floor, Pelican Complex,<br>Opp Odhav BRTS, GIDC, Odhav,<br>Ahmedabad, Gujarat 382415, India</address>' +
    '<div class="footer-contact-details">' +
    '<p><strong>Primary:</strong> <a href="tel:+918980800607">+91-8980800607</a></p>' +
    '<p><strong>Secondary:</strong> <a href="tel:+918980800839">+91-8980800839</a></p>' +
    '<p><strong>Email:</strong> <a href="mailto:aac@laxmienfab.com">aac@laxmienfab.com</a></p>' +
    '<p><strong>Email:</strong> <a href="mailto:aaclaxmi@gmail.com">aaclaxmi@gmail.com</a></p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="site-footer__bottom">' +
    '<div class="site-footer__bottom-inner">' +
    '<p class="copyright-text">&copy; 2026 Laxmi En-Fab Pvt. Ltd. All rights reserved. Built with precision engineering.</p>' +
    '<div class="footer-social-links">' +
    '<a href="https://in.linkedin.com/company/aacblockplant" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>' +
    '<a href="https://www.instagram.com/aac_plant/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>' +
    '<a href="https://www.facebook.com/aacblockplant" target="_blank" rel="noopener noreferrer">Facebook ↗</a>' +
    '<a href="https://www.youtube.com/@LaxmiGroupaacsystem" target="_blank" rel="noopener noreferrer">YouTube ↗</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</footer>';

  function mountHeader(html) {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    mount.outerHTML = html;
    initDropdowns();
    initMobileMenu();
    highlightActivePage();
  }

  function mountFooter(html) {
    var mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.outerHTML = html;
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

  function injectFooter() {
    if (window.location.protocol === 'file:') {
      mountFooter(FOOTER_HTML);
      return;
    }

    fetch('components/footer.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var tmp = document.createElement('div');
        tmp.innerHTML = html;
        var footerEl = tmp.querySelector('footer.site-footer');
        var footerHtml = footerEl ? footerEl.outerHTML : html;
        footerHtml = footerHtml.replace(/(href|src)="\.\.\//g, '$1="');
        mountFooter(footerHtml);
      })
      .catch(function () { mountFooter(FOOTER_HTML); });
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
    var academyPages = ['academy.html', 'understand-market.html', 'design-your-plant.html', 'compare-your-aac-plant.html', 'efficient-your-plant.html', 'expand-your-plant.html'];
    var solutionsPages = ['solutions.html', 'aac-block-panel-plant.html', 'dry-mix-mortar-plant.html'];
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href) {
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
          link.classList.add('is-active');
        } else if (href === 'academy.html' && academyPages.includes(currentPath)) {
          link.classList.add('is-active');
        } else if (href === 'solutions.html' && solutionsPages.includes(currentPath)) {
          link.classList.add('is-active');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectHeader();
      injectFooter();
    });
  } else {
    injectHeader();
    injectFooter();
  }
})();
