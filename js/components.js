/* Laxmi En-Fab - shared component injection */
(function () {
  'use strict';

  var HEADER_HTML = '<header class="site-header" id="site-header">' +
    '<div class="site-topbar"><div class="site-topbar__inner">' +
    '<div class="site-topbar__left">' +
    '<a href="start-your-aac-journey.html" class="site-topbar__link"><span class="site-topbar__dot"></span><span>Start Your AAC Journey</span><span class="site-topbar__arrow">↗</span></a>' +
    '<span class="site-topbar__sep">|</span>' +
    '<a href="dpr-calculator.html" class="site-topbar__link site-topbar__link--roi"><span class="site-topbar__roi-pulse" aria-hidden="true"></span><span class="site-topbar__roi-badge">DPR TOOL</span><span class="site-topbar__roi-text">AAC Plant DPR / ROI Calculator</span><span class="site-topbar__arrow">↗</span></a>' +
    '</div>' +
    '<div class="site-topbar__right">' +
    '<a href="tel:+918980800839" class="site-topbar__phone" aria-label="Call +91 89808 00839"><svg class="site-topbar__phone-icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.9c.07-.52-.34-.9-.87-.9H4.15c-.55 0-.96.44-.99.98C2.84 13.78 10.23 21.17 19.1 20.85c.54-.02.9-.45.9-.99v-3.58c0-.53-.41-.9-.99-.9z"/></svg><span>+91 89808 00839</span></a>' +
    '<button type="button" class="site-topbar__menu-btn" id="topbar-menu-btn" aria-label="Open navigation menu" aria-controls="nav-drawer"><span>MENU</span><span class="site-topbar__menu-icon"><span></span><span></span><span></span></span></button>' +
    '</div>' +
    '</div></div>' +
    '<div class="site-header__inner">' +
    '<a href="index.html" class="site-header__brand" aria-label="Laxmi En-Fab Pvt. Ltd. Home"><img src="assets/images/laxmi-logo.png" alt="Laxmi En-Fab Logo" class="site-header__logo"></a>' +
    '<nav class="site-header__nav" id="site-nav" aria-label="Primary navigation"><ul class="nav-list" role="menubar">' +
    '<li class="nav-item" role="none"><a href="academy/academy.html" class="nav-link" data-drawer-trigger="academy">AAC Investor Academy</a></li>' +
    '<li class="nav-item" role="none"><a href="engineering-center.html" class="nav-link" data-drawer-trigger="engineering">AAC Engineering Center</a></li>' +
    '<li class="nav-item" role="none"><a href="why-laxmi.html" class="nav-link" data-drawer-trigger="whylaxmi">Why Laxmi</a></li>' +
    '<li class="nav-item" role="none"><a href="knowledge-hub.html" class="nav-link" role="menuitem">Knowledge Hub</a></li>' +
    '</ul>' +
    '<div class="mobile-nav-cta-wrap"><a href="contact.html" class="site-header__cta site-header__cta--mobile nav-cta">TALK TO AN EXPERT <span class="cta-arrow">→</span></a></div>' +
    '</nav>' +
    '<a href="contact.html" class="site-header__cta nav-cta">TALK TO AN EXPERT <span class="cta-arrow">→</span></a>' +
    '<button type="button" class="site-header__burger" id="nav-burger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>' +
    '</div></header>' +
    '<div class="drawer-overlay" id="drawer-overlay"></div>' +
    '<div class="nav-drawer" id="nav-drawer" aria-hidden="true">' +
    '<div class="nav-drawer__header"><a href="index.html" class="drawer-header-brand"><img src="assets/images/laxmi-logo.png" alt="Laxmi En-Fab Logo" class="drawer-logo"></a><button type="button" class="drawer-close-icon-btn" id="drawer-close-btn" aria-label="Close navigation menu"><span>Close</span> <span class="close-x">✕</span></button></div>' +
    '<div class="nav-drawer__inner">' +
    '<div class="drawer-primary-col">' +
    '<nav class="drawer-nav"><ul class="drawer-menu-list">' +
    '<li class="drawer-menu-item" data-sub="none"><a href="start-your-aac-journey.html" class="drawer-menu-link">Start Your AAC Journey</a></li>' +
    '<li class="drawer-menu-item has-sub" data-sub="academy"><a href="academy/academy.html" class="drawer-menu-link"><span>AAC Investor Academy</span><span class="drawer-arrow">›</span></a></li>' +
    '<li class="drawer-menu-item has-sub" data-sub="engineering"><a href="engineering-center.html" class="drawer-menu-link"><span>AAC Engineering Center</span><span class="drawer-arrow">›</span></a></li>' +
    '<li class="drawer-menu-item has-sub" data-sub="whylaxmi"><a href="why-laxmi.html" class="drawer-menu-link"><span>Why Laxmi</span><span class="drawer-arrow">›</span></a></li>' +
    '<li class="drawer-menu-item" data-sub="none"><a href="knowledge-hub.html" class="drawer-menu-link">Knowledge Hub</a></li>' +
    '</ul></nav>' +
    '<div class="drawer-footer-contact"><p class="drawer-contact-title">TALK TO OUR EXPERT</p><a href="tel:+918980800839" class="drawer-phone">+91 89808 00839</a><a href="mailto:aac@laxmienfab.com" class="drawer-email">aac@laxmienfab.com</a><a href="contact.html" class="drawer-cta-btn">TALK TO AN EXPERT →</a></div>' +
    '</div>' +
    '<div class="drawer-secondary-col" id="drawer-secondary-col">' +
    '<div class="drawer-sub-pane" id="sub-pane-academy"><button type="button" class="drawer-mobile-back-btn" data-back-level="1"><span>←</span> <span>Main Menu</span></button><h3 class="sub-pane-title"><a href="academy/academy.html">AAC Investor Academy</a></h3><ul class="col2-menu-list"><li class="col2-item has-tertiary" data-tertiary="academy-market"><a href="academy/understand-market.html" class="col2-link"><span><strong class="sub-num">01</strong> Understand the Market</span><span class="col2-arrow">›</span></a></li><li class="col2-item has-tertiary" data-tertiary="academy-design"><a href="academy/design-your-plant.html" class="col2-link"><span><strong class="sub-num">02</strong> Design Your Plant</span><span class="col2-arrow">›</span></a></li><li class="col2-item" data-tertiary="academy-compare"><a href="compare-aac-plant.html" class="col2-link"><span><strong class="sub-num">03</strong> Compare Your AAC Plant</span></a></li><li class="col2-item has-tertiary" data-tertiary="academy-efficient"><a href="academy/efficient-your-plant.html" class="col2-link"><span><strong class="sub-num">04</strong> Efficient Your Plant</span><span class="col2-arrow">›</span></a></li><li class="col2-item" data-tertiary="academy-expand"><a href="academy/expand-your-plant.html" class="col2-link"><span><strong class="sub-num">05</strong> Expand Your Plant</span></a></li></ul></div>' +
    '<div class="drawer-sub-pane" id="sub-pane-engineering"><button type="button" class="drawer-mobile-back-btn" data-back-level="1"><span>←</span> <span>Main Menu</span></button><h3 class="sub-pane-title"><a href="engineering-center.html">AAC Engineering Center</a></h3><ul class="col2-menu-list"><li class="col2-item" data-tertiary="eng-process"><a href="production-process.html" class="col2-link"><strong>AAC Block Production Process</strong></a></li><li class="col2-item" data-tertiary="eng-layout"><a href="plant-layout.html" class="col2-link"><strong>AAC Plant Layout</strong></a></li><li class="col2-item" data-tertiary="eng-complete"><a href="complete-aac-plant.html" class="col2-link"><strong>Complete AAC Plant</strong></a></li><li class="col2-item has-tertiary" data-tertiary="eng-machinery"><a href="machinery-equipment.html" class="col2-link"><strong>Plant Machinery</strong><span class="col2-arrow">›</span></a></li><li class="col2-item" data-tertiary="eng-automation"><a href="aac-plant-automation.html" class="col2-link"><strong>AAC Plant Automation</strong></a></li><li class="col2-item" data-tertiary="eng-infra"><a href="aac-infrastructure-utilities.html" class="col2-link"><strong>AAC Plant Infrastructure &amp; Utilities</strong></a></li><li class="col2-item" data-tertiary="eng-tech"><a href="aac-plant-technology.html" class="col2-link"><strong>AAC Plant Technology</strong></a></li></ul></div>' +
    '<div class="drawer-sub-pane" id="sub-pane-whylaxmi"><button type="button" class="drawer-mobile-back-btn" data-back-level="1"><span>←</span> <span>Main Menu</span></button><h3 class="sub-pane-title"><a href="why-laxmi.html">Why Laxmi</a></h3><ul class="col2-menu-list"><li class="col2-item" data-tertiary="whylaxmi-projects"><a href="projects.html" class="col2-link"><strong>Visit Our Running Plant</strong></a></li><li class="col2-item" data-tertiary="whylaxmi-testimonial"><a href="testimonial.html" class="col2-link"><strong>Testimonial Stories &amp; Case Studies</strong></a></li><li class="col2-item" data-tertiary="whylaxmi-philosophy"><a href="brand-philosophy.html" class="col2-link"><strong>Our Brand Philosophy</strong></a></li><li class="col2-item" data-tertiary="whylaxmi-workshop"><a href="workshop-visit.html" class="col2-link"><strong>Workshop Visit</strong></a></li></ul></div>' +
    '</div>' +
    '<div class="drawer-tertiary-col" id="drawer-tertiary-col">' +
    '<div class="tertiary-pane" id="tertiary-pane-academy-market"><button type="button" class="drawer-mobile-back-btn" data-back-level="2"><span>←</span> <span>Back</span></button><h4 class="tertiary-pane-title">Understand the Market Inner Pages</h4><ul class="tertiary-menu-list"><li><a href="why-aac-blocks.html" class="tertiary-link"><span class="tertiary-icon">📄</span> Why AAC</a></li><li><a href="future-of-aac.html" class="tertiary-link"><span class="tertiary-icon">🚀</span> Future of AAC</a></li><li><a href="market-demand.html" class="tertiary-link"><span class="tertiary-icon">📈</span> Market Demand</a></li><li><a href="raw-materials.html" class="tertiary-link"><span class="tertiary-icon">🏗️</span> Raw Materials</a></li><li><a href="profitability.html" class="tertiary-link"><span class="tertiary-icon">💰</span> Profitability</a></li><li><a href="academy/understand-market.html?topic=government-policies" class="tertiary-link"><span class="tertiary-icon">🏛️</span> Government Policies</a></li></ul></div>' +
    '<div class="tertiary-pane" id="tertiary-pane-academy-design"><button type="button" class="drawer-mobile-back-btn" data-back-level="2"><span>←</span> <span>Back</span></button><h4 class="tertiary-pane-title">Design Your Plant Inner Pages</h4><ul class="tertiary-menu-list"><li><a href="capacity-selection.html" class="tertiary-link"><span class="tertiary-icon">⚡</span> Capacity Selection</a></li><li><a href="land-requirement.html" class="tertiary-link"><span class="tertiary-icon">📐</span> Land Requirement</a></li><li><a href="project-cost.html" class="tertiary-link"><span class="tertiary-icon">💵</span> Project Cost &amp; Working Capital</a></li><li><a href="roi-payback.html" class="tertiary-link"><span class="tertiary-icon">📊</span> ROI &amp; Payback</a></li><li><a href="finance-bank-loan.html" class="tertiary-link"><span class="tertiary-icon">🏦</span> Finance &amp; Bank Loan</a></li><li><a href="subsidy.html" class="tertiary-link"><span class="tertiary-icon">🎁</span> Subsidy</a></li></ul></div>' +
    '<div class="tertiary-pane" id="tertiary-pane-academy-efficient"><button type="button" class="drawer-mobile-back-btn" data-back-level="2"><span>←</span> <span>Back</span></button><h4 class="tertiary-pane-title">Efficient Your Plant Inner Pages</h4><ul class="tertiary-menu-list"><li><a href="make-plant-automatic.html" class="tertiary-link"><span class="tertiary-icon">🤖</span> Make Plant Automatic</a></li><li><a href="improve-block-quality.html" class="tertiary-link"><span class="tertiary-icon">⭐</span> Improve AAC Block Quality</a></li><li><a href="plant-maintenance-sop.html" class="tertiary-link"><span class="tertiary-icon">🛠️</span> AAC Plant Maintenance SOP</a></li><li><a href="reduce-steam-cost.html" class="tertiary-link"><span class="tertiary-icon">🔥</span> Reduce Your Steam Cost</a></li></ul></div>' +
    '<div class="tertiary-pane" id="tertiary-pane-eng-machinery"><button type="button" class="drawer-mobile-back-btn" data-back-level="2"><span>←</span> <span>Back</span></button><h4 class="tertiary-pane-title">Plant Machinery 8 Systems</h4><ul class="tertiary-menu-list"><li><a href="machinery-raw-material-storage.html" class="tertiary-link"><span class="tertiary-icon">🏬</span> AAC Plant Raw Material Storage</a></li><li><a href="machinery-batching-preparation.html" class="tertiary-link"><span class="tertiary-icon">⚙️</span> AAC Batching System &amp; Raw Material Prep</a></li><li><a href="machinery-mould-precuring.html" class="tertiary-link"><span class="tertiary-icon">📦</span> AAC Mould Handling &amp; Precuring Process</a></li><li><a href="machinery-tilting-machine.html" class="tertiary-link"><span class="tertiary-icon">🔄</span> AAC Tilting Machine</a></li><li><a href="machinery-cutting-system.html" class="tertiary-link"><span class="tertiary-icon">✂️</span> AAC Cutting System</a></li><li><a href="machinery-autoclave.html" class="tertiary-link"><span class="tertiary-icon">🎛️</span> AAC Autoclave</a></li><li><a href="machinery-steam-boiler.html" class="tertiary-link"><span class="tertiary-icon">💨</span> AAC Steam Boiler</a></li><li><a href="machinery-auto-palletizing.html" class="tertiary-link"><span class="tertiary-icon">🏗️</span> AAC Auto Palletizing System</a></li></ul></div>' +
    '</div></div></div>';

  var FOOTER_HTML = '<footer class="site-footer" id="site-footer">' +
  '  <div class="site-footer__inner">' +
  '    ' +
  '    <!-- Top Hero Banner: LAXMI Logo Left / Headline Right -->' +
  '    <div class="site-footer__top">' +
  '      <div class="site-footer__brand">' +
  '        <a href="index.html" class="site-footer__logo-link">' +
  '          <img src="assets/images/laxmi-logo.png" alt="Laxmi En-Fab Logo" class="site-footer__logo-img" />' +
  '        </a>' +
  '      </div>' +
  '      <div class="site-footer__hero-text">' +
  '        <h2 class="site-footer__heading">' +
  '          <span class="site-footer__heading-white">Engineering confidence.</span><br>' +
  '          <span class="site-footer__heading-gray">Built to be verified.</span>' +
  '        </h2>' +
  '      </div>' +
  '    </div>' +
  '    <!-- Main Navigation 4 Columns Grid -->' +
  '    <div class="site-footer__nav-grid">' +
  '      ' +
  '      <div class="site-footer__col">' +
  '        <h4 class="site-footer__col-title">AAC INVESTOR ACADEMY</h4>' +
  '        <ul class="site-footer__links">' +
  '          <li><a href="academy/academy.html">Academy Overview</a></li>' +
  '          <li><a href="academy/understand-market/why-aac.html">Why AAC?</a></li>' +
  '          <li><a href="academy/design-your-plant.html">Capacity Selection</a></li>' +
  '          <li><a href="academy/understand-market/profitability.html">Project Cost &amp; ROI</a></li>' +
  '        </ul>' +
  '      </div>' +
  '' +
  '      <div class="site-footer__col">' +
  '        <h4 class="site-footer__col-title">AAC ENGINEERING CENTER</h4>' +
  '        <ul class="site-footer__links">' +
  '          <li><a href="engineering-center.html">Engineering Center Hub</a></li>' +
  '          <li><a href="production-process.html">Production Process</a></li>' +
  '          <li><a href="plant-layout.html">Plant Layout Design</a></li>' +
  '          <li><a href="machinery-equipment.html">Plant Machinery (8 Systems)</a></li>' +
  '          <li><a href="aac-plant-automation.html">AAC Plant Automation</a></li>' +
  '          <li><a href="aac-infrastructure-utilities.html">AAC Plant Infrastructure &amp; Utilities</a></li>' +
  '          <li><a href="aac-plant-technology.html">AAC Plant Technology</a></li>' +
  '        </ul>' +
  '      </div>' +
  '' +
  '      <div class="site-footer__col">' +
  '        <h4 class="site-footer__col-title">WHY LAXMI?</h4>' +
  '        <ul class="site-footer__links">' +
  '          <li><a href="why-laxmi.html#workshop">Workshop</a></li>' +
  '          <li><a href="projects.html">Running Plants</a></li>' +
  '          <li><a href="why-laxmi.html#customers">Customer Success</a></li>' +
  '        </ul>' +
  '      </div>' +
  '' +
  '      <div class="site-footer__col">' +
  '        <h4 class="site-footer__col-title">KNOWLEDGE &amp; SUPPORT</h4>' +
  '        <ul class="site-footer__links">' +
  '          <li><a href="knowledge-hub.html">Knowledge Hub</a></li>' +
  '          <li><a href="contact.html">Talk to Our Expert</a></li>' +
  '          <li><a href="knowledge-hub.html">Technical Downloads</a></li>' +
  '        </ul>' +
  '      </div>' +
  '' +
  '    </div>' +
  '' +
  '    <!-- Contact & Address 4 Columns Grid -->' +
  '    <div class="site-footer__info-grid">' +
  '      ' +
  '      <div class="site-footer__info-col">' +
  '        <span class="site-footer__info-label">CORPORATE OFFICE</span>' +
  '        <address class="site-footer__address">' +
  '          Laxmi En Fab Pvt. Ltd.<br>' +
  '          2nd Floor, Pelican Business Hub<br>' +
  '          Odhav, Ahmedabad' +
  '        </address>' +
  '      </div>' +
  '' +
  '      <div class="site-footer__info-col">' +
  '        <span class="site-footer__info-label">MANUFACTURING WORKSHOP</span>' +
  '        <address class="site-footer__address">' +
  '          Laxmi En Fab Pvt. Ltd.<br>' +
  '          NH 48, Kheda Bypass<br>' +
  '          Kheda, Gujarat' +
  '        </address>' +
  '      </div>' +
  '' +
  '      <div class="site-footer__info-col">' +
  '        <span class="site-footer__info-label">CONNECT</span>' +
  '        <div class="site-footer__connect-links">' +
  '          <a href="tel:+918980800839">+91 89808 00839</a>' +
  '          <a href="mailto:aac@laxmienfab.com">aac@laxmienfab.com</a>' +
  '        </div>' +
  '      </div>' +
  '' +
  '      <div class="site-footer__info-col">' +
  '        <span class="site-footer__info-label">FOLLOW</span>' +
  '        <div class="site-footer__social-links">' +
  '          <a href="https://in.linkedin.com/company/aacblockplant" target="_blank" rel="noopener noreferrer">LinkedIn &nearr;</a>' +
  '          <a href="https://www.instagram.com/aac_plant/" target="_blank" rel="noopener noreferrer">Instagram &nearr;</a>' +
  '          <a href="https://www.facebook.com/aacblockplant" target="_blank" rel="noopener noreferrer">Facebook &nearr;</a>' +
  '          <a href="https://www.youtube.com/@LaxmiGroupaacsystem" target="_blank" rel="noopener noreferrer">YouTube &nearr;</a>' +
  '        </div>' +
  '      </div>' +
  '' +
  '    </div>' +
  '' +
  '    <!-- Bottom Strip -->' +
  '    <div class="site-footer__bottom">' +
  '      <span class="site-footer__copyright">&copy; 2026 Laxmi En Fab Pvt. Ltd.</span>' +
  '      <span class="site-footer__locations">Ahmedabad &middot; Kheda &middot; India</span>' +
  '      <div class="site-footer__legal">' +
  '        <a href="privacy.html">Privacy</a>' +
  '        <a href="terms.html">Terms</a>' +
  '      </div>' +
  '    </div>' +
  '' +
  '  </div>' +
  '</footer>';

  function mountHeader(html) {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    mount.outerHTML = html;
    initDropdowns();
    initDrawer();
    highlightActivePage();
    initHeaderScroll();
  }

  function mountFooter(html) {
    var mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.outerHTML = html;
  }

  function resolveComponentPaths(html) {
    var pathname = window.location.pathname.replace(/\\/g, '/');
    var prefix = '';
    if (pathname.indexOf('/academy/understand-market/') !== -1) {
      prefix = '../../';
    } else if (pathname.indexOf('/academy/') !== -1) {
      prefix = '../';
    }
    if (!prefix) return html;

    return html.replace(/(href|src)="(?!http|https|mailto|tel|#|\/)([^"]+)"/g, function (match, attr, target) {
      return attr + '="' + prefix + target + '"';
    });
  }

  function injectHeader() {
    mountHeader(resolveComponentPaths(HEADER_HTML));
  }

  function injectFooter() {
    mountFooter(resolveComponentPaths(FOOTER_HTML));
  }

  function initDropdowns() {
    // Top dropdown popovers removed in favor of progressive side navigation drawer
  }

  function initDrawer() {
    var overlay = document.getElementById('drawer-overlay');
    var drawer = document.getElementById('nav-drawer');
    var burgerBtn = document.getElementById('nav-burger');
    var closeBtn = document.getElementById('drawer-close-btn');

    if (!drawer) return;

    var secondaryCol = document.getElementById('drawer-secondary-col');
    var tertiaryCol = document.getElementById('drawer-tertiary-col');
    var menuItems = drawer.querySelectorAll('.drawer-menu-item');
    var subPanes = drawer.querySelectorAll('.drawer-sub-pane');
    var col2Items = drawer.querySelectorAll('.col2-item');
    var tertiaryPanes = drawer.querySelectorAll('.tertiary-pane');

    var closeTimer = null;
    var openTimer = null;

    function resetDrawerState() {
      // Reset all columns and panes so only Layer 1 is ready and unselected
      menuItems.forEach(function (mi) { mi.classList.remove('is-active'); });
      subPanes.forEach(function (sp) { sp.classList.remove('is-active'); });
      col2Items.forEach(function (ci) { ci.classList.remove('is-active'); });
      tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
      if (secondaryCol) secondaryCol.classList.remove('is-active');
      if (tertiaryCol) tertiaryCol.classList.remove('is-active');
      drawer.classList.remove('mobile-level-2', 'mobile-level-3');
    }

    // Opens drawer from left showing ONLY Layer 1 with NO links pre-hovered
    function openDrawer() {
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
      resetDrawerState();
      drawer.classList.add('is-active');
      drawer.setAttribute('aria-hidden', 'false');
      if (overlay) overlay.classList.add('is-active');
    }

    function closeDrawer(e) {
      if (e && e.preventDefault) e.preventDefault();
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
      drawer.classList.remove('is-active');
      drawer.setAttribute('aria-hidden', 'true');
      if (overlay) overlay.classList.remove('is-active');
      document.body.style.overflow = '';
      resetDrawerState();
    }

    // Hover/tap on Layer 1 link -> opens Layer 2, closes Layer 3
    function handleLayer1Hover(item) {
      var targetSub = item.getAttribute('data-sub');
      menuItems.forEach(function (mi) { mi.classList.remove('is-active'); });
      item.classList.add('is-active');

      if (item.classList.contains('has-sub') && targetSub && targetSub !== 'none') {
        var targetPane = document.getElementById('sub-pane-' + targetSub);
        subPanes.forEach(function (sp) { sp.classList.remove('is-active'); });
        if (targetPane) {
          targetPane.classList.add('is-active');
          targetPane.querySelectorAll('.col2-item').forEach(function (ci) { ci.classList.remove('is-active'); });
        }
        if (secondaryCol) secondaryCol.classList.add('is-active');

        // Mobile drill-down state
        drawer.classList.add('mobile-level-2');
        drawer.classList.remove('mobile-level-3');

        // Layer 3 remains closed until hovering Layer 2 item
        tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
        if (tertiaryCol) tertiaryCol.classList.remove('is-active');
      } else {
        // No sub items (e.g. Knowledge Hub): close both Layer 2 and Layer 3
        subPanes.forEach(function (sp) { sp.classList.remove('is-active'); });
        if (secondaryCol) secondaryCol.classList.remove('is-active');
        tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
        if (tertiaryCol) tertiaryCol.classList.remove('is-active');
        drawer.classList.remove('mobile-level-2', 'mobile-level-3');
      }
    }

    // Hover/tap on Layer 2 link -> opens Layer 3 (if item has tertiary), or closes Layer 3
    function handleLayer2Hover(c2) {
      var parentPane = c2.closest('.drawer-sub-pane');
      if (parentPane) {
        parentPane.querySelectorAll('.col2-item').forEach(function (ci) { ci.classList.remove('is-active'); });
      }
      c2.classList.add('is-active');

      var tertiaryTarget = c2.getAttribute('data-tertiary');
      var targetTertiaryPane = tertiaryTarget ? document.getElementById('tertiary-pane-' + tertiaryTarget) : null;

      if (c2.classList.contains('has-tertiary') && targetTertiaryPane) {
        // Open Layer 3
        tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
        targetTertiaryPane.classList.add('is-active');
        if (tertiaryCol) tertiaryCol.classList.add('is-active');
        drawer.classList.add('mobile-level-3');
      } else {
        // Close Layer 3
        tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
        if (tertiaryCol) tertiaryCol.classList.remove('is-active');
        drawer.classList.remove('mobile-level-3');
      }
    }

    // Attach Layer 1 Hover & Click Listeners
    menuItems.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        if (window.innerWidth > 768) handleLayer1Hover(item);
      });
      item.addEventListener('click', function (e) {
        if (item.classList.contains('has-sub')) {
          e.preventDefault();
          handleLayer1Hover(item);
        }
      });
    });

    // Attach Layer 2 Hover & Click Listeners
    col2Items.forEach(function (c2) {
      c2.addEventListener('mouseenter', function () {
        if (window.innerWidth > 768) handleLayer2Hover(c2);
      });
      c2.addEventListener('click', function (e) {
        if (c2.classList.contains('has-tertiary')) {
          e.preventDefault();
          handleLayer2Hover(c2);
        }
      });
    });

    // Back button listeners for mobile drill-down
    drawer.querySelectorAll('.drawer-mobile-back-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var backLevel = btn.getAttribute('data-back-level');
        if (backLevel === '2') {
          // Go back to Layer 2
          drawer.classList.remove('mobile-level-3');
          tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
          if (tertiaryCol) tertiaryCol.classList.remove('is-active');
          col2Items.forEach(function (ci) { ci.classList.remove('is-active'); });
        } else {
          // Go back to Layer 1 (Main Menu)
          drawer.classList.remove('mobile-level-2', 'mobile-level-3');
          subPanes.forEach(function (sp) { sp.classList.remove('is-active'); });
          if (secondaryCol) secondaryCol.classList.remove('is-active');
          tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
          if (tertiaryCol) tertiaryCol.classList.remove('is-active');
          menuItems.forEach(function (mi) { mi.classList.remove('is-active'); });
        }
      });
    });

    // Top navbar link triggers - Click opens the drawer and activates that subpane
    document.querySelectorAll('[data-drawer-trigger]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var triggerKey = link.getAttribute('data-drawer-trigger');
        openDrawer();
        if (triggerKey) {
          var targetMenuItem = drawer.querySelector('.drawer-menu-item[data-sub="' + triggerKey + '"]');
          if (targetMenuItem) {
            handleLayer1Hover(targetMenuItem);
          }
        }
      });
    });

    if (burgerBtn) {
      burgerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openDrawer();
      });
    }

    var topbarMenuBtn = document.getElementById('topbar-menu-btn');
    if (topbarMenuBtn) {
      topbarMenuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openDrawer();
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    // Drawer links navigation (leaf links only)
    drawer.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        // If this link belongs to a parent item that expands a sub-layer, do not navigate or close
        var menuItem = link.closest('.drawer-menu-item');
        if (menuItem && menuItem.classList.contains('has-sub')) {
          e.preventDefault();
          handleLayer1Hover(menuItem);
          return;
        }

        var col2Item = link.closest('.col2-item');
        if (col2Item && col2Item.classList.contains('has-tertiary')) {
          e.preventDefault();
          handleLayer2Hover(col2Item);
          return;
        }

        var href = this.getAttribute('href');
        if (!href || href === '#') return;

        closeDrawer();

        var currentPath = window.location.pathname.split('/').pop() || 'index.html';
        var parts = href.split('#');
        var targetFile = parts[0].replace('../', '');
        var hash = parts[1];

        // Same-page hash navigation
        if (hash && (targetFile === '' || targetFile === currentPath)) {
          var targetEl = document.getElementById(hash);
          if (targetEl) {
            e.preventDefault();
            setTimeout(function () {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      });
    });
  }

  function initHeaderScroll() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var isTicking = false;
    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('site-header--nav-hidden', 'site-header--scrolled');
      } else {
        header.classList.remove('site-header--nav-hidden', 'site-header--scrolled');
      }
      isTicking = false;
    }

    window.addEventListener('scroll', function () {
      if (!isTicking) {
        window.requestAnimationFrame(onScroll);
        isTicking = true;
      }
    }, { passive: true });

    onScroll();
  }

  function highlightActivePage() {
    var fullPath = window.location.pathname.replace(/\\/g, '/');
    var isJourney = fullPath.indexOf('start-your-aac-journey.html') !== -1;
    var academyPages = ['academy', 'why-aac-blocks.html', 'future-of-aac.html', 'market-demand.html', 'raw-materials.html', 'profitability.html', 'capacity-selection.html', 'land-requirement.html', 'project-cost.html', 'roi-payback.html', 'finance-bank-loan.html', 'subsidy.html', 'make-plant-automatic.html', 'improve-block-quality.html', 'plant-maintenance-sop.html', 'reduce-steam-cost.html', 'compare-aac-plant.html'];
    var isAcademy = !isJourney && academyPages.some(function(p) { return fullPath.indexOf(p) !== -1; });
    var engineeringPages = ['engineering-center.html', 'plant-layout.html', 'production-process.html', 'complete-aac-plant.html', 'machinery-'];
    var whyLaxmiPages = ['why-laxmi.html', 'testimonial.html', 'brand-philosophy.html', 'projects.html', 'workshop-visit.html'];

    if (isJourney) {
      document.querySelectorAll('.site-topbar__link').forEach(function (tbl) {
        if ((tbl.getAttribute('href') || '').indexOf('start-your-aac-journey') !== -1) {
          tbl.classList.add('is-active');
        }
      });
    }

    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.indexOf('academy') !== -1 && isAcademy) {
        link.classList.add('is-active');
      } else if (href.indexOf('engineering') !== -1 && engineeringPages.some(function(p) { return fullPath.indexOf(p) !== -1; })) {
        link.classList.add('is-active');
      } else if (href.indexOf('why-laxmi') !== -1 && whyLaxmiPages.some(function(p) { return fullPath.indexOf(p) !== -1; })) {
        link.classList.add('is-active');
      }
    });
  }

  var PAGE_RECOMMENDATIONS = {
    // 01 Understand the Market
    'why-aac-blocks.html': [
      { href: 'raw-materials.html', title: 'Raw Materials', category: 'Understand the Market' },
      { href: 'market-demand.html', title: 'Market Demand', category: 'Understand the Market' },
      { href: 'future-of-aac.html', title: 'Future of AAC', category: 'Understand the Market' }
    ],
    'future-of-aac.html': [
      { href: 'market-demand.html', title: 'Market Demand', category: 'Understand the Market' },
      { href: 'profitability.html', title: 'Profitability', category: 'Understand the Market' },
      { href: 'academy/understand-market.html?topic=government-policies', title: 'Government Policies', category: 'Understand the Market' }
    ],
    'market-demand.html': [
      { href: 'profitability.html', title: 'Profitability', category: 'Understand the Market' },
      { href: 'capacity-selection.html', title: 'Capacity Selection', category: 'Design Your Plant' },
      { href: 'roi-payback.html', title: 'ROI & Payback', category: 'Design Your Plant' }
    ],
    'raw-materials.html': [
      { href: 'market-demand.html', title: 'Market Demand', category: 'Understand the Market' },
      { href: 'profitability.html', title: 'Profitability', category: 'Understand the Market' },
      { href: 'academy/understand-market.html?topic=government-policies', title: 'Government Policies', category: 'Understand the Market' }
    ],
    'profitability.html': [
      { href: 'capacity-selection.html', title: 'Capacity Selection', category: 'Design Your Plant' },
      { href: 'raw-materials.html', title: 'Raw Material', category: 'Understand the Market' },
      { href: 'roi-payback.html', title: 'ROI & Payback', category: 'Design Your Plant' }
    ],
    'government-policies': [
      { href: 'subsidy.html', title: 'Subsidy', category: 'Design Your Plant' },
      { href: 'finance-bank-loan.html', title: 'Finance & Bank Loan', category: 'Design Your Plant' },
      { href: 'roi-payback.html', title: 'ROI & Payback', category: 'Design Your Plant' }
    ],
    'understand-market.html': [
      { href: 'subsidy.html', title: 'Subsidy', category: 'Design Your Plant' },
      { href: 'finance-bank-loan.html', title: 'Finance & Bank Loan', category: 'Design Your Plant' },
      { href: 'roi-payback.html', title: 'ROI & Payback', category: 'Design Your Plant' }
    ],

    // 02 Design Your Plant
    'capacity-selection.html': [
      { href: 'complete-aac-plant.html', title: 'Complete AAC Plant', category: 'Engineering Center' },
      { href: 'land-requirement.html', title: 'Land Requirement', category: 'Design Your Plant' },
      { href: 'roi-payback.html', title: 'ROI & Payback', category: 'Design Your Plant' }
    ],
    'land-requirement.html': [
      { href: 'project-cost.html', title: 'Project Cost & Working Capital', category: 'Design Your Plant' },
      { href: 'finance-bank-loan.html', title: 'Finance & Bank Loan', category: 'Design Your Plant' },
      { href: 'subsidy.html', title: 'Subsidy', category: 'Design Your Plant' }
    ],
    'project-cost.html': [
      { href: 'roi-payback.html', title: 'ROI & Payback', category: 'Design Your Plant' },
      { href: 'finance-bank-loan.html', title: 'Finance & Bank Loan', category: 'Design Your Plant' },
      { href: 'subsidy.html', title: 'Subsidy', category: 'Design Your Plant' }
    ],
    'roi-payback.html': [
      { href: 'project-cost.html', title: 'Project Cost & Working Capital', category: 'Design Your Plant' },
      { href: 'finance-bank-loan.html', title: 'Finance & Bank Loan', category: 'Design Your Plant' },
      { href: 'subsidy.html', title: 'Subsidy', category: 'Design Your Plant' }
    ],
    'finance-bank-loan.html': [
      { href: 'project-cost.html', title: 'Project Cost & Working Capital', category: 'Design Your Plant' },
      { href: 'roi-payback.html', title: 'ROI & Payback', category: 'Design Your Plant' },
      { href: 'subsidy.html', title: 'Subsidy', category: 'Design Your Plant' }
    ],
    'subsidy.html': [
      { href: 'project-cost.html', title: 'Project Cost & Working Capital', category: 'Design Your Plant' },
      { href: 'roi-payback.html', title: 'ROI & Payback', category: 'Design Your Plant' },
      { href: 'finance-bank-loan.html', title: 'Finance & Bank Loan', category: 'Design Your Plant' }
    ],
    'design-your-plant.html': [
      { href: 'complete-aac-plant.html', title: 'Complete AAC Plant', category: 'Engineering Center' },
      { href: 'land-requirement.html', title: 'Land Requirement', category: 'Design Your Plant' },
      { href: 'project-cost.html', title: 'Project Cost & Working Capital', category: 'Design Your Plant' }
    ],

    // 03 Compare Your AAC Plant
    'compare-aac-plant.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'compare-your-aac-plant.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],

    // 04 Efficient Your Plant
    'make-plant-automatic.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'improve-block-quality.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'plant-maintenance-sop.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'reduce-steam-cost.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'efficient-your-plant.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'expand-your-plant.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],

    // AAC Engineering Center Core Track
    'production-process.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'plant-layout.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'complete-aac-plant.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'machinery-equipment.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'engineering-center.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],

    // Plant Machinery 8 Systems
    'machinery-raw-material-storage.html': [
      { href: 'machinery-batching-preparation.html', title: 'AAC Batching System & Raw Material Prep', category: 'Plant Machinery' },
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'machinery-batching-preparation.html': [
      { href: 'machinery-raw-material-storage.html', title: 'AAC Plant Raw Material Storage', category: 'Plant Machinery' },
      { href: 'machinery-mould-precuring.html', title: 'AAC Mould Handling & Precuring Process', category: 'Plant Machinery' },
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' }
    ],
    'machinery-mould-precuring.html': [
      { href: 'machinery-batching-preparation.html', title: 'AAC Batching System & Raw Material Prep', category: 'Plant Machinery' },
      { href: 'machinery-tilting-machine.html', title: 'AAC Tilting Machine', category: 'Plant Machinery' },
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' }
    ],
    'machinery-tilting-machine.html': [
      { href: 'machinery-mould-precuring.html', title: 'AAC Mould Handling & Precuring Process', category: 'Plant Machinery' },
      { href: 'machinery-cutting-system.html', title: 'AAC Cutting System', category: 'Plant Machinery' },
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' }
    ],
    'machinery-cutting-system.html': [
      { href: 'machinery-tilting-machine.html', title: 'AAC Tilting Machine', category: 'Plant Machinery' },
      { href: 'machinery-autoclave.html', title: 'AAC Autoclave', category: 'Plant Machinery' },
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' }
    ],
    'machinery-autoclave.html': [
      { href: 'machinery-cutting-system.html', title: 'AAC Cutting System', category: 'Plant Machinery' },
      { href: 'machinery-steam-boiler.html', title: 'AAC Steam Boiler', category: 'Plant Machinery' },
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' }
    ],
    'machinery-steam-boiler.html': [
      { href: 'machinery-autoclave.html', title: 'AAC Autoclave', category: 'Plant Machinery' },
      { href: 'machinery-auto-palletizing.html', title: 'AAC Auto Palletizing System', category: 'Plant Machinery' },
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' }
    ],
    'machinery-auto-palletizing.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],

    // New Engineering Pages
    'aac-plant-automation.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'aac-infrastructure-utilities.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'aac-plant-technology.html': [
      { href: 'projects.html', title: 'Visit Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Customer Testimonial', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],

    // Why Laxmi Track
    'projects.html': [
      { href: 'testimonial.html', title: 'Testimonial Stories & Case Studies', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' },
      { href: 'brand-philosophy.html', title: 'Our Brand Philosophy', category: 'Why Laxmi' }
    ],
    'testimonial.html': [
      { href: 'projects.html', title: 'Visit Our Running Plant', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' },
      { href: 'brand-philosophy.html', title: 'Our Brand Philosophy', category: 'Why Laxmi' }
    ],
    'brand-philosophy.html': [
      { href: 'projects.html', title: 'Visit Our Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Testimonial Stories & Case Studies', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ],
    'workshop-visit.html': [
      { href: 'projects.html', title: 'Visit Our Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Testimonial Stories & Case Studies', category: 'Why Laxmi' },
      { href: 'brand-philosophy.html', title: 'Our Brand Philosophy', category: 'Why Laxmi' }
    ],
    'why-laxmi.html': [
      { href: 'projects.html', title: 'Visit Our Running Plant', category: 'Why Laxmi' },
      { href: 'testimonial.html', title: 'Testimonial Stories & Case Studies', category: 'Why Laxmi' },
      { href: 'workshop-visit.html', title: 'Workshop Visit', category: 'Why Laxmi' }
    ]
  };

  var FLOATING_PILL_TITLES = {
    // 01 Understand the Market
    'why-aac-blocks.html': 'Why AAC Blocks – Advantages, Tech Specs & ROI',
    'future-of-aac.html': 'Future of AAC – Market Evolution & Growth Outlook',
    'market-demand.html': 'Market Demand – AAC Consumption & Growth Trends',
    'raw-materials.html': 'Raw Materials for AAC – Fly Ash, Lime, Cement & Mix Design',
    'profitability.html': 'AAC Plant Profitability – Margin Analysis & Unit Economics',
    'understand-market.html': 'Understand the Market – AAC Industry Dynamics & Policies',

    // 02 Design Your Plant
    'capacity-selection.html': 'AAC Plant Capacity Selection – Sizing 100 to 1500 m³/day',
    'land-requirement.html': 'Land Requirement & Civil Layout for AAC Plants',
    'project-cost.html': 'AAC Plant Project Cost & Working Capital Breakdown',
    'roi-payback.html': 'ROI & Payback Period Guide for AAC Block Plants',
    'dpr-calculator.html': 'AAC Plant DPR / ROI Calculator – 5-Year Financial Model',
    'finance-bank-loan.html': 'Project Finance & Bank Loan Guide for AAC Plants',
    'subsidy.html': 'Government Subsidies & Incentives for AAC Manufacturing',
    'design-your-plant.html': 'Design Your AAC Plant – Capacity & Layout Engineering',

    // 03 Compare
    'compare-aac-plant.html': 'AAC Plant Comparison – Semi vs Fully Automatic Solutions',
    'compare-your-aac-plant.html': 'Compare AAC Plant Machinery & Automation Levels',

    // 04 Efficient Your Plant
    'make-plant-automatic.html': 'Make Plant Automatic – PLC Automation & Smart Controls',
    'improve-block-quality.html': 'Improve AAC Block Quality – Strength & Density Optimization',
    'plant-maintenance-sop.html': 'AAC Plant Maintenance SOP – Prevent Downtime & Extend Life',
    'reduce-steam-cost.html': 'Reduce Steam Cost – Autoclave Energy & Heat Recovery',
    'efficient-your-plant.html': 'Efficient Your AAC Plant – Operations & Quality Systems',
    'expand-your-plant.html': 'Expand Your AAC Plant – Scalable Upgrades & Capacity Boost',

    // Engineering Center Track
    'engineering-center.html': 'AAC Engineering Center – Turnkey Machinery & Solutions',
    'production-process.html': 'AAC Block Production Process – End-to-End Workflow',
    'plant-layout.html': 'AAC Plant Layout & Spatial Optimization Guide',
    'complete-aac-plant.html': 'Complete Turnkey AAC Plant Solutions',
    'machinery-equipment.html': 'Plant Machinery & Systems – 8 Core AAC Workstations',
    'aac-plant-automation.html': 'AAC Plant Automation – Manual vs Automatic Guide',
    'aac-infrastructure-utilities.html': 'AAC Plant Infrastructure & Utilities – Power, Steam & Civil Planning',

    // Machinery 8 Systems
    'machinery-raw-material-storage.html': 'AAC Raw Material Storage & Handling Systems',
    'machinery-batching-preparation.html': 'AAC Batching, Dosing & Slurry Preparation',
    'machinery-mould-precuring.html': 'AAC Mould Handling, Fermentation & Precuring Line',
    'machinery-tilting-machine.html': 'AAC High-Precision Tilting & Demoulding Machine',
    'machinery-cutting-system.html': 'AAC High-Speed Wire Cutting System',
    'machinery-autoclave.html': 'AAC Hydrothermal Curing Autoclave System',
    'machinery-steam-boiler.html': 'AAC Steam Boiler & Thermal Energy System',
    'machinery-auto-palletizing.html': 'AAC Automatic Separating & Palletizing Packaging Line',

    // Why Laxmi Track
    'why-laxmi.html': 'Why Laxmi – Engineering Excellence & Proven Reliability',
    'projects.html': 'Visit Our Running Plants – Verified Performance in Production',
    'testimonial.html': 'Customer Testimonials & Case Studies – Real Plant Stories',
    'brand-philosophy.html': 'Our Brand Philosophy – Engineering Confidence Built to Verify',
    'workshop-visit.html': 'Visit Our Manufacturing Workshop in Kheda, Gujarat',

    // Knowledge & Academy Hubs
    'academy.html': 'AAC Investor Academy – Complete Guide to AAC Plant Investment',
    'knowledge-hub.html': 'AAC Knowledge Hub – Technical Whitepapers & Resources'
  };

  function getPagePillTitle(filename) {
    if (FLOATING_PILL_TITLES[filename]) {
      return FLOATING_PILL_TITLES[filename];
    }
    var urlParams = new URLSearchParams(window.location.search);
    var topic = urlParams.get('topic');
    if (topic) {
      var formatted = topic.split('-').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
      return 'AAC Guidance – ' + formatted;
    }
    var h1 = document.querySelector('h1');
    if (h1 && h1.textContent.trim()) {
      var text = h1.textContent.trim().replace(/\s+/g, ' ');
      if (text.length > 55) text = text.substring(0, 52) + '...';
      return text;
    }
    var title = (document.title || '').split('|')[0].trim();
    if (title) {
      if (title.length > 55) title = title.substring(0, 52) + '...';
      return title;
    }
    return 'Laxmi En-Fab AAC Plant Solutions';
  }

  function injectFloatingPill() {
    if (document.getElementById('site-floating-pill')) return;

    var filename = window.location.pathname.split('/').pop() || 'index.html';
    // Skip on home, contact, and start-journey pages
    if (!filename || filename === 'index.html' || filename === 'contact.html' || filename === 'start-your-aac-journey.html') {
      return;
    }

    var title = getPagePillTitle(filename);

    var pillHTML = '<aside class="site-floating-pill" id="site-floating-pill" aria-label="Page quick consultation banner">' +
      '<div class="site-floating-pill__container">' +
      '<a href="contact.html" class="site-floating-pill__content" aria-label="Contact our expert about ' + title.replace(/"/g, '&quot;') + '">' +
      '<span class="site-floating-pill__chevron" aria-hidden="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>' +
      '</span>' +
      '<span class="site-floating-pill__title">' + title + '</span>' +
      '</a>' +
      '<a href="contact.html" class="site-floating-pill__cta">Contact our expert</a>' +
      '<button type="button" class="site-floating-pill__close" id="site-floating-pill-close" aria-label="Dismiss banner">✕</button>' +
      '</div></aside>';

    var resolvedHTML = resolveComponentPaths(pillHTML);
    document.body.insertAdjacentHTML('beforeend', resolvedHTML);

    var pillEl = document.getElementById('site-floating-pill');
    var closeBtn = document.getElementById('site-floating-pill-close');

    if (closeBtn && pillEl) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        pillEl.classList.add('is-dismissed');
      });
    }

    // Scroll trigger (appears after scrolling 1000px down the page)
    var isTicking = false;
    function checkPillScroll() {
      if (!pillEl || pillEl.classList.contains('is-dismissed')) {
        isTicking = false;
        return;
      }
      if (window.scrollY > 1000) {
        pillEl.classList.add('is-visible');
      } else if (window.scrollY < 700) {
        pillEl.classList.remove('is-visible');
      }
      isTicking = false;
    }

    window.addEventListener('scroll', function () {
      if (!isTicking) {
        window.requestAnimationFrame(checkPillScroll);
        isTicking = true;
      }
    }, { passive: true });

    checkPillScroll();
  }

  var PAGE_HERO_IMAGES = {
    // 01 Understand the Market
    'why-aac-blocks.html': 'assets/images/why-aac.png',
    'future-of-aac.html': 'assets/images/future-of-aac.png',
    'market-demand.html': 'assets/images/market-demand.png',
    'raw-materials.html': 'assets/images/raw-materials.png',
    'profitability.html': 'assets/images/profitability.png',
    'understand-market.html': 'assets/images/government-policies.png',
    'government-policies': 'assets/images/government-policies.png',

    // 02 Design Your Plant
    'capacity-selection.html': 'assets/images/capacity-selection.png',
    'land-requirement.html': 'assets/images/land-requirement.png',
    'project-cost.html': 'assets/images/project-cost-working-capital.png',
    'roi-payback.html': 'assets/images/roi-payback.png',
    'finance-bank-loan.html': 'assets/images/finance-bank-loan.png',
    'subsidy.html': 'assets/images/subsidy.png',
    'design-your-plant.html': 'assets/images/capacity-selection.png',

    // 03 Compare
    'compare-aac-plant.html': 'assets/images/compare-aac-plant.png',
    'compare-your-aac-plant.html': 'assets/images/compare-aac-plant.png',

    // 04 Efficient Your Plant
    'make-plant-automatic.html': 'assets/images/plant-automation.png',
    'improve-block-quality.html': 'assets/images/improve-block-quality.png',
    'plant-maintenance-sop.html': 'assets/images/maintenance-sop.png',
    'reduce-steam-cost.html': 'assets/images/reduce-steam-cost.png',
    'efficient-your-plant.html': 'assets/images/plant-automation.png',
    'expand-your-plant.html': 'assets/images/capacity-selection.png',

    // Engineering Center & 8 Machinery Systems
    'production-process.html': 'assets/images/production-process.png',
    'plant-layout.html': 'assets/images/engineering/plant-layout-3d.png',
    'complete-aac-plant.html': 'assets/images/engineering/complete-plant-3d.png',
    'machinery-equipment.html': 'assets/images/engineering/machinery-cutting-system.png',
    'engineering-center.html': 'assets/images/engineering/complete-plant-3d.png',
    'machinery-raw-material-storage.html': 'assets/images/engineering/machinery-raw-material-storage.png',
    'machinery-batching-preparation.html': 'assets/images/engineering/machinery-batching-preparation.png',
    'machinery-mould-precuring.html': 'assets/images/engineering/machinery-mould-precuring.png',
    'machinery-tilting-machine.html': 'assets/images/engineering/machinery-tilting-machine.png',
    'machinery-cutting-system.html': 'assets/images/engineering/machinery-cutting-system.png',
    'machinery-autoclave.html': 'assets/images/engineering/machinery-autoclave.png',
    'machinery-steam-boiler.html': 'assets/images/engineering/machinery-steam-boiler.png',
    'machinery-auto-palletizing.html': 'assets/images/engineering/machinery-auto-palletizing.png',

    // New Engineering Pages
    'aac-plant-automation.html': 'assets/images/aac-automation-hero.png',
    'aac-infrastructure-utilities.html': 'assets/images/aac-infrastructure-utilities-hero.png',
    'aac-plant-technology.html': 'assets/images/aac-plant-technology-hero.png',

    // Why Laxmi Track
    'projects.html': 'assets/images/india-map-3d.png',
    'testimonial.html': 'assets/images/maintenance-sop.png',
    'brand-philosophy.html': 'assets/images/decisions-plant-bg.png',
    'workshop-visit.html': 'assets/images/laxmi-workshop-facility.png',
    'why-laxmi.html': 'assets/images/laxmi-workshop-facility.png'
  };

  function getRecommendationImage(href) {
    if (!href) return 'assets/images/why-aac.png';
    if (PAGE_HERO_IMAGES[href]) return PAGE_HERO_IMAGES[href];
    var baseName = href.split('/').pop().split('?')[0];
    if (PAGE_HERO_IMAGES[baseName]) return PAGE_HERO_IMAGES[baseName];
    if (href.indexOf('government-policies') !== -1) return 'assets/images/government-policies.png';
    return 'assets/images/laxmi-workshop-facility.png';
  }

  function injectPagePagination() {
    var footer = document.getElementById('site-footer');
    if (!footer) return;
    if (document.getElementById('site-page-pagination')) return;

    var filename = window.location.pathname.split('/').pop() || 'index.html';
    if (!filename || filename === 'index.html' || filename === 'contact.html' || filename === 'start-your-aac-journey.html' || filename === 'dpr-calculator.html') {
      return;
    }

    var urlParams = new URLSearchParams(window.location.search);
    var topic = urlParams.get('topic');

    var recs = null;
    if (topic && PAGE_RECOMMENDATIONS[topic]) {
      recs = PAGE_RECOMMENDATIONS[topic];
    } else if (PAGE_RECOMMENDATIONS[filename]) {
      recs = PAGE_RECOMMENDATIONS[filename];
    }

    if (!recs || !recs.length) return;

    var cardsHTML = recs.map(function (item, index) {
      var badgeNum = '0' + (index + 1);
      var heroImg = item.image || getRecommendationImage(item.href);
      return '<a href="' + item.href + '" class="page-nav-card page-nav-card--hero-bg">' +
        '<div class="page-nav-card__bg-media">' +
        '<img src="' + heroImg + '" alt="' + item.title.replace(/"/g, '&quot;') + '" class="page-nav-card__bg-img" loading="lazy" />' +
        '<div class="page-nav-card__overlay"></div>' +
        '</div>' +
        '<div class="page-nav-card__content">' +
        '<div class="page-nav-card__header-row">' +
        '<span class="page-nav-card__eyebrow">' + (item.category || 'RECOMMENDED') + '</span>' +
        '<span class="page-nav-card__badge">LINK ' + badgeNum + '</span>' +
        '</div>' +
        '<div class="page-nav-card__bottom-row">' +
        '<span class="page-nav-card__title">' + item.title + '</span>' +
        '<div class="page-nav-card__icon" aria-hidden="true">→</div>' +
        '</div>' +
        '</div>' +
        '</a>';
    }).join('');

    var paginationHTML = '<nav class="site-page-pagination" id="site-page-pagination" aria-label="Related guides and next pages">' +
      '<div class="site-page-pagination__container">' +
      '<div class="site-page-pagination__top-bar">' +
      '<span class="site-page-pagination__label"><span class="site-page-pagination__dot"></span>CONTINUE EXPLORING</span>' +
      '<span class="site-page-pagination__sub">Recommended next steps & related technical guides</span>' +
      '</div>' +
      '<div class="site-page-pagination__inner">' +
      cardsHTML +
      '</div></div></nav>';

    var resolvedHTML = resolveComponentPaths(paginationHTML);
    footer.insertAdjacentHTML('beforebegin', resolvedHTML);
  }

  function injectFloatingWidgets() {
    if (document.querySelector('.hp-floating-widgets')) return;

    var widgetsHTML = '<div class="hp-floating-widgets" aria-label="Quick contact">' +
      '<a href="https://wa.me/918980800839" target="_blank" rel="noopener noreferrer" class="hp-float-btn hp-float-btn--whatsapp" aria-label="WhatsApp Us" title="Chat on WhatsApp">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 0 1 2.41 5.83c.01 4.54-3.68 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.06 0 1.21.88 2.39 1.01 2.56.12.17 1.74 2.66 4.21 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" fill="#ffffff"/></svg>' +
      '</a>' +
      '<a href="tel:+918980800839" class="hp-float-btn hp-float-btn--phone" aria-label="Call Us" title="Call Us Directly">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.9c.07-.52-.34-.9-.87-.9H4.15c-.55 0-.96.44-.99.98C2.84 13.78 10.23 21.17 19.1 20.85c.54-.02.9-.45.9-.99v-3.58c0-.53-.41-.9-.99-.9z" fill="#ffffff"/></svg>' +
      '</a>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', widgetsHTML);
  }

  function initApp() {
    injectHeader();
    injectFloatingWidgets();
    injectPagePagination();
    injectFloatingPill();
    injectFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

