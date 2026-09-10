/* ==========================================================================
   Laxmi En-Fab Pvt. Ltd. — Why Laxmi Testimonials & Case Studies Controller
   Architecture: Reusable Vanilla JS Engine powered by laxmi-why-laxmi-testimonials.json
   Features: 1500px High-Key Hero, Dedicated Stats Strip, Sticky Sub-Nav,
             2-Column Swiss Sidebar, Verified Specs Matrix, and Chapter Navigation.
   ========================================================================== */

(function () {
  'use strict';

  let cachedData = null;

  document.addEventListener('DOMContentLoaded', () => {
    initTestimonialPage();
    window.addEventListener('popstate', initTestimonialPage);
  });

  function getActiveTestimonialId() {
    const urlParams = new URLSearchParams(window.location.search);
    const paramId = urlParams.get('id');
    if (paramId) {
      const cleanNum = paramId.replace(/^testimonial-/, '');
      return cleanNum.padStart(2, '0');
    }
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && (hash.startsWith('testimonial-') || /^\d+$/.test(hash))) {
      const cleanHash = hash.replace(/^testimonial-/, '');
      return cleanHash.padStart(2, '0');
    }
    const bodySlug = document.body.getAttribute('data-testimonial-slug');
    if (bodySlug) {
      return bodySlug.replace(/^testimonial-/, '').padStart(2, '0');
    }
    return '01';
  }

  async function initTestimonialPage() {
    const root = document.getElementById('testimonial-root');
    if (!root) return;

    const currentNumber = getActiveTestimonialId();

    try {
      if (!cachedData) {
        const res = await fetch('data/laxmi-why-laxmi-testimonials.json');
        if (!res.ok) throw new Error('Could not load testimonial data.');
        cachedData = await res.json();
      }
      const data = cachedData;

      // Find the active testimonial
      let activeIndex = data.testimonials.findIndex(
        item => item.number === currentNumber || item.id === `testimonial-${parseInt(currentNumber, 10)}`
      );
      if (activeIndex === -1) activeIndex = 0;
      const t = data.testimonials[activeIndex];

      // Update SEO Metadata
      if (t.seo) {
        document.title = t.seo.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', t.seo.description || '');
      }

      // Render Dynamic Breadcrumb
      const breadcrumb = document.getElementById('breadcrumb-mount');
      if (breadcrumb) {
        breadcrumb.innerHTML = `
          <nav class="site-breadcrumb" aria-label="Breadcrumb">
            <div class="site-breadcrumb__inner">
              <a href="index.html">Home</a>
              <span class="bc-sep">/</span>
              <a href="why-laxmi.html">Why Laxmi</a>
              <span class="bc-sep">/</span>
              <a href="why-laxmi.html#testimonials">Verified Case Studies</a>
              <span class="bc-sep">/</span>
              <span class="bc-current">Case ${escHtml(t.number)} · ${escHtml(t.title)}</span>
            </div>
          </nav>`;
      }

      // Determine Previous & Next Case Studies
      const prevTestimonial = activeIndex > 0 ? data.testimonials[activeIndex - 1] : null;
      const nextTestimonial = activeIndex < data.testimonials.length - 1 ? data.testimonials[activeIndex + 1] : null;

      // 4 Key Stats Metrics for Below-Hero Strip
      const stats = getTestimonialStats(t, activeIndex);

      // Render Complete Architecture
      root.innerHTML = `
        ${renderSubNavRail()}
        ${renderHero(t)}
        ${renderStatsStrip(stats)}
        <div class="eng-case-layout">
          ${renderSidebar(data.testimonials, t.id)}
          <article class="eng-case-content">
            ${renderOverviewSection(t)}
            ${renderSpecsMatrixSection(t)}
            ${renderFullStorySection(t)}
            ${renderTakeawayCheckpoint(t)}
          </article>
        </div>
        ${renderChapterNav(prevTestimonial, nextTestimonial)}
        ${renderCTABanner(data.shared || {})}
      `;

      // Attach Interactivity & Smooth Scroll Spy
      initInPageScrollAndSpy();
      initSidebarInteractivity(data);

      // Scroll to top of content smoothly
      window.scrollTo({ top: 0, behavior: 'instant' });

    } catch (err) {
      console.error('Testimonial renderer error:', err);
      root.innerHTML = `
        <div style="padding: 80px 24px; text-align: center; color: #07172c;">
          <h2>Unable to Load Case Study</h2>
          <p>Please refresh the page or return to <a href="why-laxmi.html" style="color: #0284c7; font-weight: 700;">Why Laxmi</a>.</p>
        </div>`;
    }
  }

  /* ── 01. In-Page Sub Navigation Strip ───────────────────────────── */
  function renderSubNavRail() {
    return `
      <nav class="eng-nav-strip" aria-label="Case Study Navigation">
        <div class="eng-nav-strip__inner">
          <a href="#overview" class="eng-nav-btn active"><span class="eng-nav-num">01</span> Executive Overview</a>
          <a href="#specs" class="eng-nav-btn"><span class="eng-nav-num">02</span> Verified Specs</a>
          <a href="#story" class="eng-nav-btn"><span class="eng-nav-num">03</span> Full Experience</a>
          <a href="#takeaway" class="eng-nav-btn"><span class="eng-nav-num">04</span> Key Takeaway</a>
          <a href="#cta" class="eng-nav-btn"><span class="eng-nav-num">05</span> Consult Engineers</a>
        </div>
      </nav>
    `;
  }

  /* ── 02. High-Key Architectural Hero ────────────────────────────── */
  function renderHero(t) {
    const headlineParts = splitHeading(t.hero.headline);
    return `
      <section class="editorial-hero editorial-hero--light is-loaded" id="overview" aria-label="${escHtml(t.title)}">
        <div class="editorial-hero__media" aria-hidden="true">
          <div class="editorial-hero__video-wrap">
            <img
              class="editorial-hero__poster"
              src="assets/images/production-process.png"
              alt="Laxmi En-Fab Verified Customer Installation"
              fetchpriority="high"
            />
          </div>
          <div class="editorial-hero__overlay"></div>
        </div>

        <div class="editorial-hero__inner">
          <div class="editorial-hero__content">
            <span class="editorial-hero__eyebrow">CASE STUDY ${escHtml(t.number)} · ${t.verified ? 'SIGNED CUSTOMER CERTIFICATE' : 'VERIFIED CUSTOMER CASE'}</span>
            <h1 class="editorial-hero__title">
              <span>${headlineParts.main}</span>
              ${headlineParts.sub ? `<span class="editorial-hero__title-light">${headlineParts.sub}</span>` : ''}
            </h1>
            <p class="editorial-hero__sub">${escHtml(t.hero.subheadline || t.subtitle)}</p>

            <div class="editorial-hero__actions">
              <a href="#specs" class="editorial-hero__btn-dark">
                <span>Read Verified Story</span>
                <span class="editorial-hero__btn-arrow">↓</span>
              </a>
              <a href="contact.html" class="editorial-hero__link-dark">
                <span>Talk to Laxmi Engineers</span>
                <span class="editorial-hero__link-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div class="editorial-hero__corner-caption" aria-hidden="true">
          <span class="editorial-hero__corner-title">Why Laxmi · Verified Case Study ${escHtml(t.number)}</span>
          <span class="editorial-hero__corner-sub">${escHtml(t.subtitle)}</span>
        </div>
      </section>
    `;
  }

  /* ── 03. Dedicated Stats Strip Below Hero ───────────────────────── */
  function renderStatsStrip(stats) {
    const cardsHTML = stats.map(st => `
      <div class="eng-stat-card">
        <div class="eng-stat-card__val">${escHtml(st.val)} <span>${escHtml(st.unit)}</span></div>
        <div class="eng-stat-card__lbl">${escHtml(st.lbl)}</div>
      </div>
    `).join('');

    return `
      <section class="eng-stats-strip" aria-label="Key Case Study Metrics">
        <div class="eng-stats-strip__inner">
          ${cardsHTML}
        </div>
      </section>
    `;
  }

  /* ── 04. Sidebar Navigation ─────────────────────────────────────── */
  function renderSidebar(testimonials, currentId) {
    const items = testimonials.map(item => `
      <li>
        <a href="testimonial.html?id=${parseInt(item.number, 10)}" class="eng-case-nav-link ${item.id === currentId ? 'is-active' : ''}" data-case-id="${item.number}">
          <span class="eng-case-nav-link__num">${escHtml(item.number)}</span>
          <div class="eng-case-nav-link__info">
            <span class="eng-case-nav-link__title">${escHtml(item.title)}</span>
            <span class="eng-case-nav-link__sub">${escHtml(item.subtitle.split('·')[0].trim())}</span>
          </div>
        </a>
      </li>
    `).join('');

    return `
      <aside class="eng-case-sidebar">
        <div class="eng-case-sidebar__head">
          <span class="eng-case-sidebar__eyebrow">VERIFIED ARCHIVE</span>
          <h3 class="eng-case-sidebar__title">10 Customer Case Studies</h3>
        </div>
        <ul class="eng-case-sidebar__list">
          ${items}
        </ul>
      </aside>
    `;
  }

  /* ── 05. Part 1: Executive Overview & Verified Quote ────────────── */
  function renderOverviewSection(t) {
    const ov = t.overview;
    const bodyParas = ov.body.map(p => `<p class="eng-lead" style="margin-bottom: 1.25rem;">${escHtml(p)}</p>`).join('');

    return `
      <section id="executive-overview" style="margin-bottom: 3.5rem;">
        <div class="eng-case-quote-box">
          <div class="eng-case-quote-box__badge">✓ VERIFIED CUSTOMER TESTIMONIAL · CASE ${escHtml(t.number)}</div>
          <blockquote class="eng-case-quote-box__text">“${escHtml(ov.quote)}”</blockquote>
          <div class="eng-case-quote-box__author">
            <div>
              <span class="eng-case-quote-box__name">${escHtml(ov.author)}</span>
              <span class="eng-case-quote-box__role">${escHtml(ov.author_role)}</span>
            </div>
            ${t.certificate_date ? `<span class="eng-case-quote-box__cert">Certificate Verified: ${escHtml(t.certificate_date)}</span>` : ''}
          </div>
        </div>

        <div>
          <span class="eng-eyebrow">EXECUTIVE SUMMARY</span>
          <h2 class="eng-title" style="font-size: clamp(2rem, 3.2vw, 3rem); margin-bottom: 1.5rem;">
            <span>${escHtml(ov.heading)}</span>
          </h2>
          ${bodyParas}
        </div>
      </section>
    `;
  }

  /* ── 06. Part 2: Verified Technical Specs Matrix ────────────────── */
  function renderSpecsMatrixSection(t) {
    const ps = t.project_specs;
    const rowsHTML = ps.items.map((item, idx) => `
      <tr>
        <td>
          <div class="eng-material-cell">
            <span class="eng-material-name">${escHtml(item.label)}</span>
          </div>
        </td>
        <td><span class="eng-prop-badge" style="font-size: 0.95rem;">${escHtml(item.value)}</span></td>
        <td><span class="eng-qc-tag">✓ Verified Customer Certificate</span></td>
      </tr>
    `).join('');

    return `
      <section id="specs" style="margin-bottom: 4rem;">
        <span class="eng-eyebrow">01 · VERIFIED PROJECT PARAMETERS</span>
        <h2 class="eng-title" style="font-size: clamp(2rem, 3.2vw, 3rem); margin-bottom: 1.25rem;">
          <span>Technical specifications</span>
          <span class="eng-title-light">&amp; operating profile.</span>
        </h2>
        <p class="eng-lead" style="margin-bottom: 2rem;">
          Verified project data and commercial installation specifications confirmed directly by the operating team.
        </p>

        <div class="eng-matrix-table-wrap">
          <table class="eng-matrix-table">
            <thead>
              <tr>
                <th>Project Parameter</th>
                <th>Verified Specification / Value</th>
                <th>Audit &amp; Certification Status</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHTML}
            </tbody>
          </table>
        </div>
        ${ps.disclaimer ? `<p style="font-size: 0.8rem; color: #64748b; margin-top: 1rem; font-style: italic;">${escHtml(ps.disclaimer)}</p>` : ''}
      </section>
    `;
  }

  /* ── 07. Part 3: Complete Operational Journey ───────────────────── */
  function renderFullStorySection(t) {
    const fs = t.full_story;
    const parasHTML = fs.paragraphs.map(p => `<p class="eng-lead" style="margin-bottom: 1.5rem; font-size: 1.05rem; line-height: 1.75;">${escHtml(p)}</p>`).join('');

    let highlightsHTML = '';
    if (fs.highlights && fs.highlights.length > 0) {
      const colCount = Math.min(fs.highlights.length, 3);
      const cols = fs.highlights.map((h, idx) => `
        <div class="eng-arch-col">
          <div>
            <span class="eng-arch-num">KEY ADVANTAGE 0${idx + 1}</span>
            <h3 class="eng-arch-name">${escHtml(h)}</h3>
            <p class="eng-arch-desc">Documented operational outperformance verified across multi-year continuous commercial production.</p>
          </div>
          <div class="eng-arch-link">
            <span>Customer Verified</span>
            <span class="eng-arch-arrow">↗</span>
          </div>
        </div>
      `).join('');

      highlightsHTML = `
        <div class="eng-arch-grid" style="grid-template-columns: repeat(${colCount}, 1fr); margin: 2.5rem 0;">
          ${cols}
        </div>
      `;
    }

    return `
      <section id="story" style="margin-bottom: 4rem;">
        <span class="eng-eyebrow">02 · THE OPERATIONAL EXPERIENCE</span>
        <h2 class="eng-title" style="font-size: clamp(2rem, 3.2vw, 3rem); margin-bottom: 1.25rem;">
          <span>${escHtml(fs.heading)}</span>
        </h2>
        
        ${highlightsHTML}
        
        <div style="margin-top: 2rem;">
          ${parasHTML}
        </div>

        <div class="eng-case-quote-box" style="margin-top: 2.5rem;">
          <blockquote class="eng-case-quote-box__text">“${escHtml(fs.closing_quote)}”</blockquote>
          <div class="eng-case-quote-box__author">
            <div>
              <span class="eng-case-quote-box__name">${escHtml(fs.closing_author)}</span>
              <span class="eng-case-quote-box__role">${escHtml(fs.closing_role)}</span>
            </div>
            <span class="eng-case-quote-box__cert">Laxmi En-Fab Verified Partner</span>
          </div>
        </div>
      </section>
    `;
  }

  /* ── 08. Part 4: Key Takeaway Checkpoint ─────────────────────────── */
  function renderTakeawayCheckpoint(t) {
    return `
      <section id="takeaway" style="margin-bottom: 3.5rem;">
        <div class="eng-checkpoint-box">
          <h4 class="eng-checkpoint-box__title">INVESTOR DUE DILIGENCE LESSON · CASE STUDY ${escHtml(t.number)}</h4>
          <p class="eng-checkpoint-box__text">
            Operating real AAC plants reveals that long-term profitability depends on robust fabrication, reliable boiler steam synchronization, and responsive field service. Choosing Laxmi En-Fab ensures your capital investment delivers 100% rated capacity utilisation with zero unnecessary downtime.
          </p>
        </div>
      </section>
    `;
  }

  /* ── 09. Chapter Navigation Footer ──────────────────────────────── */
  function renderChapterNav(prevT, nextT) {
    const prevBtn = prevT ? `
      <a href="testimonial.html?id=${parseInt(prevT.number, 10)}" class="eng-chapter-nav__btn eng-chapter-nav__btn--prev" data-case-nav="${prevT.number}">
        <span class="eng-chapter-nav__sub">← PREVIOUS CASE STUDY</span>
        <span class="eng-chapter-nav__title">Case ${escHtml(prevT.number)} · ${escHtml(prevT.title)}</span>
      </a>
    ` : `<div></div>`;

    const nextBtn = nextT ? `
      <a href="testimonial.html?id=${parseInt(nextT.number, 10)}" class="eng-chapter-nav__btn eng-chapter-nav__btn--next" data-case-nav="${nextT.number}">
        <span class="eng-chapter-nav__sub">NEXT CASE STUDY →</span>
        <span class="eng-chapter-nav__title">Case ${escHtml(nextT.number)} · ${escHtml(nextT.title)}</span>
      </a>
    ` : `
      <a href="why-laxmi.html#testimonials" class="eng-chapter-nav__btn eng-chapter-nav__btn--next">
        <span class="eng-chapter-nav__sub">RETURN TO ARCHIVE →</span>
        <span class="eng-chapter-nav__title">All 10 Verified Case Studies</span>
      </a>
    `;

    return `
      <section class="eng-chapter-nav-section" style="max-width: 1500px; margin: 0 auto 3rem; padding: 0 32px;">
        <div class="eng-chapter-nav">
          ${prevBtn}
          ${nextBtn}
        </div>
      </section>
    `;
  }

  /* ── 10. Strategic Conversion CTA Banner ─────────────────────────── */
  function renderCTABanner(shared) {
    return `
      <section class="eng-cta-banner" id="cta">
        <div class="eng-cta-banner__inner">
          <span class="eng-cta-banner__eyebrow">BUILD WITH CONFIDENCE</span>
          <h2 class="eng-cta-banner__title">
            <span>Ready to build your</span>
            <span class="eng-cta-banner__title-light">AAC plant with Laxmi?</span>
          </h2>
          <p class="eng-cta-banner__lead">
            Connect directly with our senior process and machinery engineering team in Ahmedabad to discuss your proposed location, capacity requirements, and raw material mix.
          </p>
          <div class="eng-cta-banner__actions">
            <a href="contact.html" class="eng-cta-banner__btn-white">
              <span>Schedule Technical Consultation</span>
              <span class="eng-cta-banner__btn-arrow">↗</span>
            </a>
            <a href="#overview" class="eng-cta-banner__link-top">
              <span>Return to top ↑</span>
            </a>
          </div>
        </div>
      </section>
    `;
  }

  /* ── Helper: Stats Extraction for 10 Case Studies ───────────────── */
  function getTestimonialStats(t, index) {
    const statsPresets = [
      // Case 01: Satyam Buildtech
      [
        { val: '300,000', unit: 'm³/yr', lbl: 'Installed Annual Capacity' },
        { val: '100', unit: '%', lbl: 'Capacity Utilisation' },
        { val: '2020', unit: 'Year', lbl: 'Commissioning Vintage' },
        { val: 'Zero', unit: 'Loss', lbl: 'Wastage Outperformance' }
      ],
      // Case 02: Turn-key Gujarat
      [
        { val: 'Turn-Key', unit: 'Scope', lbl: 'Complete Plant Delivery' },
        { val: 'Record', unit: 'Time', lbl: 'Commercial Handover' },
        { val: '100', unit: '%', lbl: 'Civil to SOP Guidance' },
        { val: 'Gujarat', unit: 'Site', lbl: 'Plant Location' }
      ],
      // Case 03: Daily Production Rajasthan
      [
        { val: '3+', unit: 'Years', lbl: 'Continuous Daily Operation' },
        { val: 'Zero', unit: 'Defect', lbl: 'Block Quality Standard' },
        { val: '±1.0', unit: 'mm', lbl: 'Cutting Wire Accuracy' },
        { val: 'Near Zero', unit: 'Rate', lbl: 'Wire Breakage Incidents' }
      ],
      // Case 04: Support Madhya Pradesh
      [
        { val: '48', unit: 'Hours', lbl: 'On-Site Field Response' },
        { val: '2+', unit: 'Years', lbl: 'Operating Track Record' },
        { val: '100', unit: '%', lbl: 'Genuine IBR Spare Parts' },
        { val: '24/7', unit: 'Access', lbl: 'Remote Engineering Support' }
      ],
      // Case 05: Expansion Repeat Order Haryana
      [
        { val: '2nd', unit: 'Plant', lbl: 'Expansion Repeat Order' },
        { val: '3+', unit: 'Years', lbl: 'First Plant Performance' },
        { val: '100', unit: '%', lbl: 'Direct Repeat Order' },
        { val: 'Shared', unit: 'Loop', lbl: 'Utility Infrastructure' }
      ],
      // Case 06: UP Automation
      [
        { val: 'Siemens S7', unit: 'PLC', lbl: 'Automated SCADA Dosing' },
        { val: '±0.5', unit: '%', lbl: 'Dynamic Dosing Precision' },
        { val: '100', unit: '%', lbl: 'Voltage Fluctuation Proof' },
        { val: 'Fewer', unit: 'Staff', lbl: 'Skilled Labour Dependence' }
      ],
      // Case 07: Telangana Post-Commissioning
      [
        { val: '2+', unit: 'Years', lbl: 'Active Post-Handover Partner' },
        { val: 'Fly Ash', unit: 'Mix', lbl: 'Local Recipe Optimization' },
        { val: '+25', unit: '%', lbl: 'Cycle Efficiency Gain' },
        { val: 'Ongoing', unit: 'Support', lbl: 'Process Consultation' }
      ],
      // Case 08: Punjab Engineering Quality
      [
        { val: 'Heavy CNC', unit: 'Grade', lbl: 'Workshop Fabrication' },
        { val: '100', unit: '%', lbl: 'Pre-Order Factory Inspected' },
        { val: 'EN 771-4', unit: 'Norm', lbl: 'Block Dimensional Standard' },
        { val: 'Premium', unit: 'Lead', lbl: 'Regional Market Position' }
      ],
      // Case 09: Maharashtra Steam Efficiency
      [
        { val: '25–30', unit: '%', lbl: 'Steam Fuel Cost Reduction' },
        { val: '12–14', unit: 'bar', lbl: 'Working Autoclave Pressure' },
        { val: '190', unit: '°C', lbl: 'Saturated Hydrothermal Temp' },
        { val: 'Closed', unit: 'Loop', lbl: 'Condensate Energy Recovery' }
      ],
      // Case 10: Karnataka First-Time Investor
      [
        { val: '3', unit: 'Months', lbl: 'Commercial Production Run' },
        { val: '1st-Time', unit: 'Investor', lbl: 'Client Profile' },
        { val: 'Concept $\\rightarrow$ SOP', unit: 'Full', lbl: 'End-to-End Plant Education' },
        { val: '100', unit: '%', lbl: 'Target Volume Adherence' }
      ]
    ];

    return statsPresets[index] || statsPresets[0];
  }

  /* ── Helper: Split Heading into Dual-Tone ───────────────────────── */
  function splitHeading(str) {
    if (!str) return { main: '', sub: '' };
    const clean = str.trim();
    if (clean.includes('.')) {
      const parts = clean.split('.');
      return { main: parts[0].trim() + '.', sub: parts.slice(1).join('.').trim() };
    }
    if (clean.includes('—')) {
      const parts = clean.split('—');
      return { main: parts[0].trim(), sub: parts.slice(1).join('—').trim() };
    }
    const words = clean.split(' ');
    if (words.length > 5) {
      const mid = Math.ceil(words.length * 0.6);
      return { main: words.slice(0, mid).join(' '), sub: words.slice(mid).join(' ') };
    }
    return { main: clean, sub: '' };
  }

  /* ── Interactivity: Sticky Sub-Nav Scroll Spy ───────────────────── */
  function initInPageScrollAndSpy() {
    const navLinks = document.querySelectorAll('.eng-nav-btn');
    if (!navLinks.length) return;

    navLinks.forEach(btn => {
      btn.addEventListener('click', e => {
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const navHeight = 85;
            const topPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: topPos, behavior: 'smooth' });
          }
        }
      });
    });

    const sections = Array.from(navLinks).map(btn => {
      const id = btn.getAttribute('href');
      return id && id.startsWith('#') ? document.querySelector(id) : null;
    }).filter(Boolean);

    function updateActiveNav() {
      const scrollPos = window.scrollY + 120;
      let activeIndex = 0;
      sections.forEach((sec, idx) => {
        if (sec.offsetTop <= scrollPos) {
          activeIndex = idx;
        }
      });
      navLinks.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === activeIndex);
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  /* ── Interactivity: Client-Side Sidebar Fast Switching ───────────── */
  function initSidebarInteractivity(data) {
    const sidebarLinks = document.querySelectorAll('.eng-case-nav-link, [data-case-nav]');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.includes('testimonial.html?id=')) {
          e.preventDefault();
          const url = new URL(href, window.location.href);
          window.history.pushState({}, '', url.search);
          initTestimonialPage();
        }
      });
    });
  }

  /* ── Utility: Escape HTML ────────────────────────────────────────── */
  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();
