/* Laxmi En-Fab - shared component injection */
(function () {
  'use strict';

  var HEADER_HTML = '<header class="site-header" id="site-header">' +
    '<div class="site-header__inner">' +
    '<a href="index.html" class="site-header__brand" aria-label="Laxmi En-Fab Pvt. Ltd. Home"><img src="assets/images/laxmi-logo.png" alt="Laxmi En-Fab Logo" class="site-header__logo"></a>' +
    '<nav class="site-header__nav" id="site-nav" aria-label="Primary navigation"><ul class="nav-list" role="menubar">' +
    '<li class="nav-item" role="none"><a href="solutions.html" class="nav-link" data-drawer-trigger="solutions">Start Your AAC Journey</a></li>' +
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
    '<li class="drawer-menu-item has-sub is-active" data-sub="solutions"><a href="solutions.html" class="drawer-menu-link"><span>Start Your AAC Journey</span><span class="drawer-arrow">›</span></a></li>' +
    '<li class="drawer-menu-item has-sub" data-sub="academy"><a href="academy/academy.html" class="drawer-menu-link"><span>AAC Investor Academy</span><span class="drawer-arrow">›</span></a></li>' +
    '<li class="drawer-menu-item has-sub" data-sub="engineering"><a href="engineering-center.html" class="drawer-menu-link"><span>AAC Engineering Center</span><span class="drawer-arrow">›</span></a></li>' +
    '<li class="drawer-menu-item has-sub" data-sub="whylaxmi"><a href="why-laxmi.html" class="drawer-menu-link"><span>Why Laxmi</span><span class="drawer-arrow">›</span></a></li>' +
    '<li class="drawer-menu-item" data-sub="none"><a href="knowledge-hub.html" class="drawer-menu-link">Knowledge Hub</a></li>' +
    '</ul></nav>' +
    '<div class="drawer-footer-contact"><p class="drawer-contact-title">TALK TO OUR EXPERT</p><a href="tel:+918980800839" class="drawer-phone">+91 89808 00839</a><a href="mailto:aac@laxmienfab.com" class="drawer-email">aac@laxmienfab.com</a><a href="contact.html" class="drawer-cta-btn">TALK TO AN EXPERT →</a></div>' +
    '</div>' +
    '<div class="drawer-secondary-col" id="drawer-secondary-col">' +
    '<div class="drawer-sub-pane is-active" id="sub-pane-solutions"><h3 class="sub-pane-title"><a href="solutions.html">Start Your AAC Journey</a></h3><ul class="col2-menu-list"><li class="col2-item" data-tertiary="sol-plants"><a href="aac-block-panel-plant.html" class="col2-link"><strong>AAC Block &amp; Panel Plant</strong></a></li><li class="col2-item" data-tertiary="sol-mortar"><a href="dry-mix-mortar-plant.html" class="col2-link"><strong>Dry Mix Mortar Plant</strong></a></li><li class="col2-item" data-tertiary="sol-complete"><a href="solutions.html" class="col2-link"><strong>Complete AAC Plant</strong></a></li></ul></div>' +
    '<div class="drawer-sub-pane" id="sub-pane-academy"><h3 class="sub-pane-title"><a href="academy/academy.html">AAC Investor Academy</a></h3><ul class="col2-menu-list"><li class="col2-item has-tertiary is-active" data-tertiary="academy-market"><a href="academy/understand-market.html" class="col2-link"><span><strong class="sub-num">01</strong> Understand the Market</span><span class="col2-arrow">›</span></a></li><li class="col2-item has-tertiary" data-tertiary="academy-design"><a href="academy/design-your-plant.html" class="col2-link"><span><strong class="sub-num">02</strong> Design Your Plant</span><span class="col2-arrow">›</span></a></li><li class="col2-item" data-tertiary="academy-compare"><a href="academy/compare-your-aac-plant.html" class="col2-link"><span><strong class="sub-num">03</strong> Compare Your AAC Plant</span></a></li><li class="col2-item has-tertiary" data-tertiary="academy-efficient"><a href="academy/efficient-your-plant.html" class="col2-link"><span><strong class="sub-num">04</strong> Efficient Your Plant</span><span class="col2-arrow">›</span></a></li><li class="col2-item" data-tertiary="academy-expand"><a href="academy/expand-your-plant.html" class="col2-link"><span><strong class="sub-num">05</strong> Expand Your Plant</span></a></li></ul></div>' +
    '<div class="drawer-sub-pane" id="sub-pane-engineering"><h3 class="sub-pane-title"><a href="engineering-center.html">AAC Engineering Center</a></h3><ul class="col2-menu-list"><li class="col2-item" data-tertiary="eng-process"><a href="production-process.html" class="col2-link"><strong>AAC Block Production Process</strong></a></li><li class="col2-item" data-tertiary="eng-layout"><a href="plant-layout.html" class="col2-link"><strong>AAC Plant Layout</strong></a></li><li class="col2-item" data-tertiary="eng-complete"><a href="capacity-selection.html" class="col2-link"><strong>Complete AAC Plant</strong></a></li><li class="col2-item has-tertiary is-active" data-tertiary="eng-machinery"><a href="machinery-equipment.html" class="col2-link"><strong>Plant Machinery</strong><span class="col2-arrow">›</span></a></li></ul></div>' +
    '<div class="drawer-sub-pane" id="sub-pane-whylaxmi"><h3 class="sub-pane-title"><a href="why-laxmi.html">Why Laxmi</a></h3><ul class="col2-menu-list"><li class="col2-item has-tertiary is-active" data-tertiary="whylaxmi-testimonial"><a href="why-laxmi.html#testimonial" class="col2-link"><strong>Testimonial content</strong><span class="col2-arrow">›</span></a></li></ul></div>' +
    '</div>' +
    '<div class="drawer-tertiary-col" id="drawer-tertiary-col">' +
    '<div class="tertiary-pane is-active" id="tertiary-pane-academy-market"><h4 class="tertiary-pane-title">Understand the Market Inner Pages</h4><ul class="tertiary-menu-list"><li><a href="academy/understand-market.html?topic=why-aac" class="tertiary-link"><span class="tertiary-icon">📄</span> Why AAC</a></li><li><a href="academy/understand-market.html?topic=future-of-aac" class="tertiary-link"><span class="tertiary-icon">🚀</span> Future of AAC</a></li><li><a href="academy/understand-market.html?topic=market-demand" class="tertiary-link"><span class="tertiary-icon">📈</span> Market Demand</a></li><li><a href="academy/understand-market.html?topic=raw-materials" class="tertiary-link"><span class="tertiary-icon">🏗️</span> Raw Materials</a></li><li><a href="academy/understand-market.html?topic=profitability" class="tertiary-link"><span class="tertiary-icon">💰</span> Profitability</a></li><li><a href="academy/understand-market.html?topic=government-policies" class="tertiary-link"><span class="tertiary-icon">🏛️</span> Government Policies</a></li></ul></div>' +
    '<div class="tertiary-pane" id="tertiary-pane-academy-design"><h4 class="tertiary-pane-title">Design Your Plant Inner Pages</h4><ul class="tertiary-menu-list"><li><a href="academy/design-your-plant.html?topic=capacity-selection" class="tertiary-link"><span class="tertiary-icon">⚡</span> Capacity Selection</a></li><li><a href="academy/design-your-plant.html?topic=land-requirement" class="tertiary-link"><span class="tertiary-icon">📐</span> Land Requirement</a></li><li><a href="academy/design-your-plant.html?topic=project-cost" class="tertiary-link"><span class="tertiary-icon">💵</span> Project Cost &amp; Working Capital</a></li><li><a href="academy/design-your-plant.html?topic=roi-payback" class="tertiary-link"><span class="tertiary-icon">📊</span> ROI &amp; Payback</a></li><li><a href="academy/design-your-plant.html?topic=finance-bank-loan" class="tertiary-link"><span class="tertiary-icon">🏦</span> Finance &amp; Bank Loan</a></li><li><a href="academy/design-your-plant.html?topic=subsidy" class="tertiary-link"><span class="tertiary-icon">🎁</span> Subsidy</a></li></ul></div>' +
    '<div class="tertiary-pane" id="tertiary-pane-academy-efficient"><h4 class="tertiary-pane-title">Efficient Your Plant Inner Pages</h4><ul class="tertiary-menu-list"><li><a href="academy/efficient-your-plant.html?topic=make-plant-automatic" class="tertiary-link"><span class="tertiary-icon">🤖</span> Make Plant Automatic</a></li><li><a href="academy/efficient-your-plant.html?topic=improve-block-quality" class="tertiary-link"><span class="tertiary-icon">⭐</span> Improve AAC Block Quality</a></li><li><a href="academy/efficient-your-plant.html?topic=plant-maintenance-sop" class="tertiary-link"><span class="tertiary-icon">🛠️</span> AAC Plant Maintenance SOP</a></li><li><a href="academy/efficient-your-plant.html?topic=reduce-steam-cost" class="tertiary-link"><span class="tertiary-icon">🔥</span> Reduce Your Steam Cost</a></li><li><a href="academy/efficient-your-plant.html?topic=skilled-manpower" class="tertiary-link"><span class="tertiary-icon">👥</span> Skilled Manpower Requirement</a></li></ul></div>' +
    '<div class="tertiary-pane" id="tertiary-pane-eng-machinery"><h4 class="tertiary-pane-title">Plant Machinery 8 Systems</h4><ul class="tertiary-menu-list"><li><a href="machinery-raw-material-storage.html" class="tertiary-link"><span class="tertiary-icon">🏬</span> AAC Plant Raw Material Storage</a></li><li><a href="machinery-batching-preparation.html" class="tertiary-link"><span class="tertiary-icon">⚙️</span> AAC Batching System &amp; Raw Material Prep</a></li><li><a href="machinery-mould-precuring.html" class="tertiary-link"><span class="tertiary-icon">📦</span> AAC Mould Handling &amp; Precuring Process</a></li><li><a href="machinery-tilting-machine.html" class="tertiary-link"><span class="tertiary-icon">🔄</span> AAC Tilting Machine</a></li><li><a href="machinery-cutting-system.html" class="tertiary-link"><span class="tertiary-icon">✂️</span> AAC Cutting System</a></li><li><a href="machinery-autoclave.html" class="tertiary-link"><span class="tertiary-icon">🎛️</span> AAC Autoclave</a></li><li><a href="machinery-steam-boiler.html" class="tertiary-link"><span class="tertiary-icon">💨</span> AAC Steam Boiler</a></li><li><a href="machinery-auto-palletizing.html" class="tertiary-link"><span class="tertiary-icon">🏗️</span> AAC Auto Palletizing System</a></li></ul></div>' +
    '<div class="tertiary-pane" id="tertiary-pane-whylaxmi-testimonial"><h4 class="tertiary-pane-title">Testimonial Stories &amp; Case Studies</h4><ul class="tertiary-menu-list"><li><a href="testimonial.html?id=1" class="tertiary-link"><span class="tertiary-icon">💬</span> 1. Why We Chose Laxmi for Our AAC Plant</a></li><li><a href="testimonial.html?id=2" class="tertiary-link"><span class="tertiary-icon">💬</span> 2. From Concept to Commercial Production</a></li><li><a href="testimonial.html?id=3" class="tertiary-link"><span class="tertiary-icon">💬</span> 3. Performance Proven in Daily Production</a></li><li><a href="testimonial.html?id=4" class="tertiary-link"><span class="tertiary-icon">💬</span> 4. Support Beyond Machinery Supply</a></li><li><a href="testimonial.html?id=5" class="tertiary-link"><span class="tertiary-icon">💬</span> 5. Expanding Through a Repeat Order</a></li><li><a href="testimonial.html?id=6" class="tertiary-link"><span class="tertiary-icon">💬</span> 6. Automation for Real Plant Conditions</a></li><li><a href="testimonial.html?id=7" class="tertiary-link"><span class="tertiary-icon">💬</span> 7. Relationship After Commissioning</a></li><li><a href="testimonial.html?id=8" class="tertiary-link"><span class="tertiary-icon">💬</span> 8. Engineering Reflecting in AAC Block</a></li><li><a href="testimonial.html?id=9" class="tertiary-link"><span class="tertiary-icon">💬</span> 9. Improving Steam Efficiency</a></li><li><a href="testimonial.html?id=10" class="tertiary-link"><span class="tertiary-icon">💬</span> 10. Confidence for First-Time Investor</a></li></ul></div>' +
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
  '' +
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
    initMobileMenu();
    initDrawer();
    highlightActivePage();
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
    // Top dropdown popovers removed in favor of side navigation drawer
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

  function initDrawer() {
    var overlay = document.getElementById('drawer-overlay');
    var drawer = document.getElementById('nav-drawer');
    var burgerBtn = document.getElementById('nav-burger');
    var closeBtn = document.getElementById('drawer-close-btn');

    if (!drawer) return;

    function openDrawerWithSub(targetSub, e) {
      if (e) e.preventDefault();
      drawer.classList.add('is-active');
      if (overlay) overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';

      if (targetSub) {
        var menuItem = document.querySelector('.drawer-menu-item[data-sub="' + targetSub + '"]');
        if (menuItem) {
          document.querySelectorAll('.drawer-menu-item').forEach(function (mi) { mi.classList.remove('is-active'); });
          document.querySelectorAll('.drawer-sub-pane').forEach(function (sp) { sp.classList.remove('is-active'); });

          menuItem.classList.add('is-active');
          var targetPane = document.getElementById('sub-pane-' + targetSub);
          if (targetPane) {
            targetPane.classList.add('is-active');
            var firstCol2 = targetPane.querySelector('.col2-item');
            if (firstCol2) activateCol2Item(firstCol2);
          }
        }
      }
    }

    function closeDrawer(e) {
      if (e) e.preventDefault();
      drawer.classList.remove('is-active');
      if (overlay) overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    // Top navbar link triggers
    document.querySelectorAll('[data-drawer-trigger]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetSub = this.getAttribute('data-drawer-trigger');
        openDrawerWithSub(targetSub, e);
      });
    });

    if (burgerBtn) {
      burgerBtn.addEventListener('click', function (e) {
        openDrawerWithSub('solutions', e);
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    var menuItems = document.querySelectorAll('.drawer-menu-item.has-sub');
    var subPanes = document.querySelectorAll('.drawer-sub-pane');
    var col2Items = document.querySelectorAll('.col2-item');
    var tertiaryCol = document.getElementById('drawer-tertiary-col');
    var tertiaryPanes = document.querySelectorAll('.tertiary-pane');

    function activateCol2Item(c2) {
      if (!c2) return;
      var parentPane = c2.closest('.drawer-sub-pane');
      if (parentPane) {
        parentPane.querySelectorAll('.col2-item').forEach(function (ci) { ci.classList.remove('is-active'); });
      }
      c2.classList.add('is-active');

      var tertiaryTarget = c2.getAttribute('data-tertiary');
      var targetTertiaryPane = tertiaryTarget ? document.getElementById('tertiary-pane-' + tertiaryTarget) : null;

      if (c2.classList.contains('has-tertiary') && targetTertiaryPane) {
        tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
        targetTertiaryPane.classList.add('is-active');
        if (tertiaryCol) tertiaryCol.classList.add('is-active');
      } else {
        tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
        if (tertiaryCol) tertiaryCol.classList.remove('is-active');
      }
    }

    menuItems.forEach(function (item) {
      var targetSub = item.getAttribute('data-sub');

      function activateSub() {
        menuItems.forEach(function (mi) { mi.classList.remove('is-active'); });
        subPanes.forEach(function (sp) { sp.classList.remove('is-active'); });

        item.classList.add('is-active');
        var targetPane = document.getElementById('sub-pane-' + targetSub);
        if (targetPane) {
          targetPane.classList.add('is-active');
          var firstCol2 = targetPane.querySelector('.col2-item');
          if (firstCol2) {
            activateCol2Item(firstCol2);
          } else {
            tertiaryPanes.forEach(function (tp) { tp.classList.remove('is-active'); });
            if (tertiaryCol) tertiaryCol.classList.remove('is-active');
          }
        }
      }

      item.addEventListener('mouseenter', activateSub);
      item.addEventListener('click', activateSub);
    });

    col2Items.forEach(function (c2) {
      c2.addEventListener('mouseenter', function () { activateCol2Item(c2); });
      c2.addEventListener('click', function () { activateCol2Item(c2); });
    });

    // Ensure all drawer links close drawer and navigate smoothly
    drawer.querySelectorAll('a[href]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;

        var parentItem = this.closest('.drawer-menu-item, .col2-item');
        var isCategoryTrigger = parentItem && (parentItem.classList.contains('has-sub') || parentItem.classList.contains('has-tertiary'));

        // If clicking a leaf link OR double-clicking/navigating parent category link:
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

  function highlightActivePage() {
    var fullPath = window.location.pathname.replace(/\\/g, '/');
    var isAcademy = fullPath.indexOf('/academy/') !== -1 || fullPath.indexOf('academy') !== -1;
    var isHome = fullPath.endsWith('/index.html') && !isAcademy;
    var solutionsPages = ['solutions.html', 'aac-block-panel-plant.html', 'dry-mix-mortar-plant.html'];
    var engineeringPages = ['engineering-center.html', 'plant-layout.html', 'production-process.html', 'machinery-'];
    var whyLaxmiPages = ['why-laxmi.html', 'testimonial.html'];

    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.indexOf('academy') !== -1 && isAcademy) {
        link.classList.add('is-active');
      } else if (href.indexOf('solutions') !== -1 && solutionsPages.some(function(p) { return fullPath.indexOf(p) !== -1; })) {
        link.classList.add('is-active');
      } else if (href.indexOf('engineering') !== -1 && engineeringPages.some(function(p) { return fullPath.indexOf(p) !== -1; })) {
        link.classList.add('is-active');
      } else if (href.indexOf('why-laxmi') !== -1 && whyLaxmiPages.some(function(p) { return fullPath.indexOf(p) !== -1; })) {
        link.classList.add('is-active');
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
