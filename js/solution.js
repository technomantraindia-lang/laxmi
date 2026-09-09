/* ==========================================================================
   Laxmi En-Fab Pvt. Ltd. — Solutions Inner Pages Controller
   Architecture: Reusable Vanilla JS Engine powered by laxmi-solutions-inner-pages.json
   ========================================================================== */

(function () {
  'use strict';

  // Image Mapping for Solutions Pages
  const SOLUTION_HERO_IMAGES = {
    'aac-block-panel-plant': 'assets/images/future-of-aac.png',
    'dry-mix-mortar-plant': 'assets/images/improve-block-quality.png'
  };

  // Helper: Robust JSON fetch
  async function fetchJSONData(paths) {
    for (const p of paths) {
      try {
        const res = await fetch(p);
        if (res.ok) return await res.json();
      } catch (e) {}
    }
    return null;
  }

  document.addEventListener('DOMContentLoaded', initSolutionInnerPage);

  async function initSolutionInnerPage() {
    const root = document.getElementById('solution-root');
    if (!root) return;

    // Detect Page Slug & Subfolder Depth
    const bodyPage = document.body.getAttribute('data-solution-page');
    const pathSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const currentSlug = bodyPage || pathSlug || 'aac-block-panel-plant';
    const isSubfolder = window.location.pathname.includes('/solutions/') || window.location.pathname.includes('\\solutions\\');
    const prefix = isSubfolder ? '../' : '';

    try {
      // Fetch JSON Data
      const data = await fetchJSONData([
        'data/laxmi-solutions-inner-pages.json',
        '../data/laxmi-solutions-inner-pages.json',
        '../../data/laxmi-solutions-inner-pages.json'
      ]);

      if (!data || !data.pages) {
        throw new Error('Invalid Solutions JSON data structure.');
      }

      // Find Page Object
      const page = data.pages.find(p => p.slug === currentSlug) || data.pages[0];

      // Update SEO & Title
      if (page.seo) {
        document.title = page.seo.title || page.title;
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', page.seo.description || '');
        let metaKeys = document.querySelector('meta[name="keywords"]');
        if (metaKeys && page.seo.keywords) metaKeys.setAttribute('content', page.seo.keywords.join(', '));
      }

      // Render Complete Solution Inner Page
      root.innerHTML = `
        ${renderSolutionNavRail(data.shared.navigation.items, page.slug, prefix)}
        ${renderHero(page, prefix)}
        ${renderIntro(page, prefix)}
        ${page.slug === 'aac-block-panel-plant' ? renderProductionJourney(page, prefix) : renderSystemView(page, prefix)}
        ${page.slug === 'aac-block-panel-plant' ? renderProducts(page, prefix) : renderSolutionFocus(page, prefix)}
        ${page.slug === 'aac-block-panel-plant' ? renderMachineryStory(page, prefix) : renderVisualStory(page, prefix)}
        ${renderEngineeringProof(page, prefix)}
        ${renderProjectProof(page, prefix)}
        ${renderDecisionSupport(page, prefix)}
        ${renderFinalCTA(page, data.shared, prefix)}
      `;

      // Attach Event Listeners
      if (page.slug === 'aac-block-panel-plant') {
        initJourneyListeners(page);
      }

      initScrollAnimations();

    } catch (err) {
      console.error('Laxmi Solutions Render Error:', err);
      root.innerHTML = renderErrorFallback(prefix);
    }
  }

  // 00. Solutions Nav Rail
  function renderSolutionNavRail(items, currentSlug, prefix = '') {
    if (!items) return '';
    const railHTML = items.map(i => {
      const activeClass = i.url.includes(currentSlug) ? 'is-active' : '';
      const linkUrl = i.url.startsWith('http') ? i.url : (prefix + i.url);
      return `<a href="${linkUrl}" class="solution-nav-rail__item ${activeClass}">${i.label.toUpperCase()}</a>`;
    }).join('');

    return `
      <nav class="solution-nav-rail" aria-label="Solutions Navigation">
        <div class="solution-nav-rail__inner">
          <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.14em; color: rgba(255,255,255,0.45); white-space: nowrap; border-right: 1px solid rgba(255,255,255,0.15); padding-right: 1rem;">SOLUTIONS</span>
          <div class="solution-nav-rail__items">
            ${railHTML}
          </div>
        </div>
      </nav>
    `;
  }

  // 01. Hero Section
  function renderHero(page, prefix = '') {
    const rawImg = SOLUTION_HERO_IMAGES[page.slug] || 'assets/images/future-of-aac.png';
    const heroImg = prefix + rawImg;
    const hero = page.hero || {};

    const primaryUrl = hero.primary_cta ? (hero.primary_cta.url.startsWith('http') ? hero.primary_cta.url : (prefix + hero.primary_cta.url)) : '';
    const secondaryUrl = hero.secondary_cta ? (hero.secondary_cta.url.startsWith('http') ? hero.secondary_cta.url : (prefix + hero.secondary_cta.url)) : '';

    return `
      <section class="editorial-about-hero" id="hero">
        <div class="editorial-about-hero__inner">
          
          <!-- Left: Text Area -->
          <div class="editorial-about-hero__content">
            <span class="editorial-eyebrow editorial-eyebrow--gold">${hero.eyebrow || 'SOLUTION OVERVIEW'}</span>
            <h1 class="editorial-about-hero__title">
              ${hero.headline || page.title}
            </h1>
            <p class="editorial-about-hero__lead">
              ${hero.subtext || page.purpose}
            </p>
            <div class="editorial-about-hero__actions">
              ${hero.primary_cta ? `
                <a href="${primaryUrl}" class="editorial-btn-primary">
                  ${hero.primary_cta.label} <span class="btn-arrow">→</span>
                </a>
              ` : ''}
              ${hero.secondary_cta ? `
                <a href="${secondaryUrl}" class="editorial-btn-outline">
                  ${hero.secondary_cta.label} <span class="btn-arrow">→</span>
                </a>
              ` : ''}
            </div>
          </div>

          <!-- Right: Real Laxmi Visual -->
          <div class="editorial-about-hero__visual">
            <div class="editorial-about-hero__frame">
              <img src="${heroImg}" alt="${page.title}" class="editorial-about-hero__img" />
              <div class="editorial-about-hero__overlay"></div>
              <div class="editorial-about-hero__tech-tag">
                <span class="tech-tag__dot"></span>
                LAXMI PLANT SOLUTION · AHMEDABAD, INDIA
              </div>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  // 02. System Intro Section
  function renderIntro(page, prefix = '') {
    if (!page.intro) return '';
    const rawIntro = page.slug === 'aac-block-panel-plant' ? 'assets/images/explored view.png' : 'assets/images/capacity-selection.png';
    const introImg = prefix + rawIntro;

    return `
      <section class="solution-sys-intro" id="intro">
        <div class="solution-sys-intro__inner">
          <div class="solution-sys-intro__eyebrow">${page.intro.eyebrow || 'COMPLETE AAC SYSTEM'}</div>
          <h2 class="solution-sys-intro__headline">${page.intro.headline || 'Built around the complete AAC production system.'}</h2>
          <p class="solution-sys-intro__body">${page.intro.body}</p>

          <!-- Centered Full-Width Media Card -->
          <div class="solution-sys-intro__media-card">
            <img src="${introImg}" alt="${page.title} System Layout" class="solution-sys-intro__img" />
          </div>

          <!-- Horizontal Process Flow Sequence Bar -->
          <div class="solution-sys-intro__process-bar">
            <span>RAW MATERIAL</span>
            <span class="solution-sys-intro__arrow">→</span>
            <span>BATCHING</span>
            <span class="solution-sys-intro__arrow">→</span>
            <span>POURING</span>
            <span class="solution-sys-intro__arrow">→</span>
            <span>PRECURING</span>
            <span class="solution-sys-intro__arrow">→</span>
            <span>CUTTING</span>
            <span class="solution-sys-intro__arrow">→</span>
            <span>AUTOCLAVING</span>
            <span class="solution-sys-intro__arrow">→</span>
            <span>PACKING</span>
          </div>
        </div>
      </section>
    `;
  }

  // 03 (AAC). 8-Stage Production Journey Timeline
  function renderProductionJourney(page) {
    if (!page.production_journey || !page.production_journey.stages) return '';

    const stages = page.production_journey.stages;
    const navHTML = stages.map((s, idx) => `
      <button class="journey-stage-btn ${idx === 0 ? 'is-active' : ''}" data-stage-idx="${idx}" aria-expanded="${idx === 0}">
        <span class="journey-stage-num">${s.number}</span>
        <span class="journey-stage-title">${s.title}</span>
      </button>
    `).join('');

    const first = stages[0];
    const equipHTML = first.related_equipment ? first.related_equipment.map(e => `
      <span class="journey-equipment-pill">${e.toUpperCase()}</span>
    `).join('') : '';

    return `
      <section class="solution-section solution-section--alt" id="journey">
        <div class="solution-section__inner">
          <div class="solution-micro-label">8-STAGE PRODUCTION JOURNEY</div>
          <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0 0 1rem 0;">
            ${page.production_journey.headline || 'One production journey. Engineered stage by stage.'}
          </h2>
          <p style="font-size: 1.05rem; color: #52677d; max-width: 820px; margin-bottom: 2.5rem;">
            Explore how raw material preparation, slurry batching, precuring, cutting, autoclaving and auto-packing flow seamlessly together.
          </p>

          <div class="journey-timeline-wrap">
            <div class="journey-stage-nav" role="tablist">
              ${navHTML}
            </div>

            <div class="journey-stage-panel" id="journey-stage-panel">
              <div>
                <div style="font-size: 0.78rem; font-weight: 800; letter-spacing: 0.14em; color: var(--laxmi-blue, #0b3f78); margin-bottom: 0.5rem;" id="journey-panel-num">
                  STAGE ${first.number} OF 08
                </div>
                <h3 style="font-size: clamp(1.8rem, 2.8vw, 2.4rem); font-weight: 900; color: #07172c; margin: 0 0 1rem 0;" id="journey-panel-title">
                  ${first.title}
                </h3>
                <p style="font-size: 1.1rem; line-height: 1.7; color: #3b526d; margin: 0 0 2rem 0;" id="journey-panel-desc">
                  ${first.description}
                </p>
              </div>

              <div>
                <div style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.14em; color: #8a9bb0;">RELATED LAXMI EQUIPMENT:</div>
                <div class="journey-equipment-pills" id="journey-panel-equip">
                  ${equipHTML}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function initJourneyListeners(page) {
    const buttons = document.querySelectorAll('.journey-stage-btn');
    const panelNum = document.getElementById('journey-panel-num');
    const panelTitle = document.getElementById('journey-panel-title');
    const panelDesc = document.getElementById('journey-panel-desc');
    const panelEquip = document.getElementById('journey-panel-equip');

    if (!buttons.length || !page.production_journey) return;
    const stages = page.production_journey.stages;

    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        buttons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-expanded', 'false');
        });
        this.classList.add('is-active');
        this.setAttribute('aria-expanded', 'true');

        const idx = parseInt(this.getAttribute('data-stage-idx'), 10);
        const stage = stages[idx];

        if (stage) {
          if (panelNum) panelNum.textContent = `STAGE ${stage.number} OF 08`;
          if (panelTitle) panelTitle.textContent = stage.title;
          if (panelDesc) panelDesc.textContent = stage.description;
          if (panelEquip && stage.related_equipment) {
            panelEquip.innerHTML = stage.related_equipment.map(e => `
              <span class="journey-equipment-pill">${e.toUpperCase()}</span>
            `).join('');
          }
        }
      });
    });
  }

  // 03 (Dry Mix). High-Level System View Diagram
  function renderSystemView(page) {
    if (!page.system_view) return '';

    return `
      <section class="solution-section solution-section--alt" id="system-view">
        <div class="solution-section__inner">
          <div class="solution-micro-label">SYSTEM VIEW · PRODUCTION FLOW</div>
          <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0 0 1rem 0;">
            ${page.system_view.headline}
          </h2>
          <p style="font-size: 1.05rem; line-height: 1.7; color: #3b526d; max-width: 840px; margin-bottom: 3rem;">
            ${page.system_view.body}
          </p>

          <div style="background: #040d1a; border-radius: 16px; padding: 3.5rem 2.5rem; color: #ffffff;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 2rem;">
              <div style="font-size: 0.78rem; font-weight: 800; letter-spacing: 0.14em; color: var(--hp-gold, #b98a2f);">
                DRY MIX MORTAR PRODUCTION SEQUENCE
              </div>
              <div style="font-size: 0.78rem; font-weight: 800; letter-spacing: 0.14em; color: rgba(255,255,255,0.4);">
                HIGH ACCURACY BATCHING &amp; MIXING
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 10px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: var(--laxmi-blue, #0b3f78);">PHASE 01</span>
                <h4 style="font-size: 1.1rem; font-weight: 800; margin: 0.4rem 0 0.3rem 0;">Sand Drying &amp; Storage</h4>
                <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">Screening &amp; moisture removal</p>
              </div>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 10px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: var(--laxmi-blue, #0b3f78);">PHASE 02</span>
                <h4 style="font-size: 1.1rem; font-weight: 800; margin: 0.4rem 0 0.3rem 0;">Precision Dosing</h4>
                <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">PLC additive &amp; binder weighing</p>
              </div>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 10px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: var(--laxmi-blue, #0b3f78);">PHASE 03</span>
                <h4 style="font-size: 1.1rem; font-weight: 800; margin: 0.4rem 0 0.3rem 0;">Homogeneous Mixing</h4>
                <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">High-efficiency paddle mixer</p>
              </div>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 10px;">
                <span style="font-size: 0.7rem; font-weight: 800; color: var(--laxmi-blue, #0b3f78);">PHASE 04</span>
                <h4 style="font-size: 1.1rem; font-weight: 800; margin: 0.4rem 0 0.3rem 0;">Auto Packaging</h4>
                <p style="font-size: 0.85rem; color: rgba(255,255,255,0.7); margin: 0;">Valve bag filling &amp; palletizing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 04 (AAC). Products Section (Blocks + Panels)
  function renderProducts(page) {
    if (!page.products || !page.products.items) return '';

    const itemsHTML = page.products.items.map((item, idx) => {
      const img = idx === 0 ? 'assets/images/why-aac.png' : 'assets/images/production-process.png';
      return `
        <div class="product-story-card">
          <div class="product-story-img-wrap">
            <img src="${img}" alt="${item.title}" class="product-story-img" />
          </div>
          <div class="product-story-content">
            <div>
              <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.14em; color: var(--laxmi-blue, #0b3f78);">PRODUCT CATEGORY 0${idx + 1}</span>
              <h3 class="product-story-title">${item.title}</h3>
              <p class="product-story-desc">${item.description}</p>
            </div>
            <a href="machinery-equipment.html" class="editorial-hero__btn-white" style="background: #07172c; color: #ffffff; align-self: flex-start; padding: 0.75rem 1.4rem; font-size: 0.8rem;">
              EXPLORE ${item.title.toUpperCase()} <span class="editorial-hero__btn-arrow">→</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="solution-section" id="products">
        <div class="solution-section__inner">
          <div class="solution-micro-label">PRODUCT CAPABILITY</div>
          <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0 0 1rem 0;">
            ${page.products.headline}
          </h2>
          <p style="font-size: 1.05rem; color: #52677d; max-width: 820px; margin-bottom: 2.5rem;">
            ${page.products.intro}
          </p>

          <div class="product-story-grid">
            ${itemsHTML}
          </div>
        </div>
      </section>
    `;
  }

  // 04 (Dry Mix). Solution Focus Section
  function renderSolutionFocus(page) {
    if (!page.solution_focus || !page.solution_focus.points) return '';

    const pointsHTML = page.solution_focus.points.map((p, idx) => `
      <div style="background: #ffffff; border: 1px solid rgba(7,23,44,0.12); border-radius: 14px; padding: 2.25rem;">
        <span style="font-size: 2.2rem; font-weight: 900; color: var(--laxmi-blue, #0b3f78); display: block; margin-bottom: 1rem;">0${idx + 1}</span>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #07172c; margin: 0 0 0.6rem 0;">${p.title}</h3>
        <p style="font-size: 0.95rem; line-height: 1.6; color: #52677d; margin: 0;">${p.description}</p>
      </div>
    `).join('');

    return `
      <section class="solution-section" id="focus">
        <div class="solution-section__inner">
          <div class="solution-micro-label">SOLUTION FOCUS</div>
          <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0 0 2.5rem 0;">
            ${page.solution_focus.headline}
          </h2>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
            ${pointsHTML}
          </div>
        </div>
      </section>
    `;
  }

  // 05 (AAC). Machinery as a Connected System
  function renderMachineryStory(page) {
    if (!page.machinery_story) return '';

    const groups = page.machinery_story.featured_groups || [];
    const groupsHTML = groups.map((g, i) => `
      <div style="background: #ffffff; border: 1px solid rgba(7,23,44,0.1); border-radius: 10px; padding: 1.5rem;">
        <span style="font-size: 0.72rem; font-weight: 800; letter-spacing: 0.12em; color: var(--laxmi-blue, #0b3f78);">STAGE GROUP 0${i + 1}</span>
        <h4 style="font-size: 1.1rem; font-weight: 800; color: #07172c; margin: 0.4rem 0 0;">${g}</h4>
      </div>
    `).join('');

    return `
      <section class="solution-section solution-section--alt" id="machinery-story">
        <div class="solution-section__inner">
          <div class="solution-micro-label">CONNECTED MACHINERY SYSTEM</div>
          <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0 0 1rem 0;">
            ${page.machinery_story.headline}
          </h2>
          <p style="font-size: 1.05rem; color: #52677d; max-width: 820px; margin-bottom: 2.5rem;">
            ${page.machinery_story.body}
          </p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
            ${groupsHTML}
          </div>
        </div>
      </section>
    `;
  }

  // 05 (Dry Mix). Visual Story Sequence
  function renderVisualStory(page) {
    if (!page.visual_story) return '';

    return `
      <section class="solution-section solution-section--alt" id="visual-story">
        <div class="solution-section__inner">
          <div class="solution-micro-label">VISUAL PROOF</div>
          <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0 0 2.5rem 0;">
            ${page.visual_story.headline}
          </h2>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;">
            <div style="border-radius: 14px; overflow: hidden; height: 320px;">
              <img src="assets/images/improve-block-quality.png" alt="Dry Mix Mortar Plant Facility" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            </div>
            <div style="border-radius: 14px; overflow: hidden; height: 320px;">
              <img src="assets/images/maintenance-sop.png" alt="Dry Mix Mortar Plant Manufacturing" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 06. Engineering Proof Section
  function renderEngineeringProof(page) {
    const proof = page.engineering_proof || page.engineering_connection;
    if (!proof) return '';

    const ctaLabel = proof.cta ? proof.cta.label : 'Explore Plant Layout';
    const ctaUrl = proof.cta ? proof.cta.url : 'plant-layout.html';

    return `
      <section class="solution-section" id="engineering-proof">
        <div class="solution-section__inner">
          <div class="solution-micro-label">PLANT LAYOUT &amp; GA DRAWING</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center;">
            <div>
              <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0 0 1rem 0;">
                ${proof.headline}
              </h2>
              <p style="font-size: 1.05rem; line-height: 1.7; color: #3b526d; margin: 0 0 2rem 0;">
                ${proof.body || 'Examine how production zones, equipment layout, civil foundation drawings, and material movement integrate into one synchronized facility.'}
              </p>
              <a href="${ctaUrl}" class="editorial-hero__btn-white" style="background: #07172c; color: #ffffff; font-size: 0.85rem; padding: 0.85rem 1.75rem;">
                ${ctaLabel.toUpperCase()} <span class="editorial-hero__btn-arrow">→</span>
              </a>
            </div>

            <div style="background: #040d1a; border-radius: 16px; overflow: hidden; padding: 1.5rem; box-shadow: 0 20px 50px rgba(7,23,44,0.15);">
              <img src="assets/images/explored view.png" alt="General Arrangement Plant Layout" style="width: 100%; height: auto; border-radius: 10px; display: block;" />
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 07. Project Execution Proof Section
  function renderProjectProof(page) {
    if (!page.project_proof) return '';

    return `
      <section class="solution-section solution-section--alt" id="projects-proof">
        <div class="solution-section__inner">
          <div class="solution-micro-label">EXECUTION PROOF</div>
          <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0 0 1rem 0;">
            ${page.project_proof.headline}
          </h2>
          <p style="font-size: 1.05rem; color: #52677d; max-width: 800px; margin-bottom: 2.5rem;">
            ${page.project_proof.body}
          </p>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2.5rem;">
            <div style="border-radius: 12px; overflow: hidden; height: 220px;">
              <img src="assets/images/production-process.png" alt="Laxmi AAC Plant Installation" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            </div>
            <div style="border-radius: 12px; overflow: hidden; height: 220px;">
              <img src="assets/images/plant-automation.png" alt="Laxmi Workshop Facility" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            </div>
            <div style="border-radius: 12px; overflow: hidden; height: 220px;">
              <img src="assets/images/land-requirement.png" alt="Laxmi Equipment Dispatch" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            </div>
          </div>

          <a href="projects.html" class="editorial-hero__btn-white" style="background: #07172c; color: #ffffff; padding: 0.85rem 1.75rem; font-size: 0.85rem;">
            VIEW ACTIVE CLIENT PROJECTS <span class="editorial-hero__btn-arrow">→</span>
          </a>
        </div>
      </section>
    `;
  }

  // 08. Decision Support Section
  function renderDecisionSupport(page) {
    if (!page.decision_section) return '';

    const points = page.decision_section.points || [];
    const pointsHTML = points.map((pt, idx) => `
      <div class="decision-seq-card">
        <span class="decision-seq-num">0${idx + 1}</span>
        <h4 class="decision-seq-title">${pt}</h4>
      </div>
    `).join('');

    const ctaLabel = page.decision_section.cta ? page.decision_section.cta.label : 'Explore Decision Steps';
    const ctaUrl = page.decision_section.cta ? page.decision_section.cta.url : 'academy.html';

    return `
      <section class="solution-section" id="decision">
        <div class="solution-section__inner">
          <div class="solution-micro-label">DECISION METHODOLOGY</div>
          <div style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 2rem; margin-bottom: 2.5rem;">
            <div>
              <h2 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 900; color: #07172c; margin: 0;">
                ${page.decision_section.headline}
              </h2>
            </div>
            <a href="${ctaUrl}" class="editorial-hero__btn-white" style="background: #07172c; color: #ffffff; padding: 0.85rem 1.75rem; font-size: 0.85rem;">
              ${ctaLabel.toUpperCase()} <span class="editorial-hero__btn-arrow">→</span>
            </a>
          </div>

          <div class="decision-seq-grid">
            ${pointsHTML}
          </div>
        </div>
      </section>
    `;
  }

  // 09. Final Conversion CTA Section
  function renderFinalCTA(page, sharedData) {
    const ctaObj = page.final_cta || (sharedData ? sharedData.footer_cta : {});
    const headline = ctaObj.headline || 'Planning an AAC or Dry Mix Mortar plant?';
    const subtext = ctaObj.subtext || 'Start with the right engineering conversation before selecting equipment.';

    return `
      <section class="machinery-cta" id="cta">
        <div class="machinery-hero__blueprint" aria-hidden="true">
          <svg class="editorial-hero__grid-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <line x1="200" y1="0" x2="200" y2="900" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
            <line x1="720" y1="0" x2="720" y2="900" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
            <line x1="1240" y1="0" x2="1240" y2="900" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
          </svg>
        </div>
        <div class="machinery-cta__inner">
          <h2 class="machinery-cta__title">
            ${headline}
          </h2>
          <p class="machinery-cta__sub">
            ${subtext}
          </p>
          <div class="machinery-cta__action">
            <a href="contact.html" class="editorial-hero__btn-white">
              TALK TO LAXMI EN-FAB <span class="editorial-hero__btn-arrow">↗</span>
            </a>
            <a href="machinery-equipment.html" class="editorial-hero__link-text">
              EXPLORE MACHINERY <span class="editorial-hero__btn-arrow">→</span>
            </a>
          </div>
          <div class="machinery-cta__contact-info">
            <span>Direct Lines: +91-8980800607 | +91-8980800839</span>
            <span>Email: aac@laxmienfab.com</span>
          </div>
        </div>
      </section>
    `;
  }

  // Error Fallback Handler
  function renderErrorFallback() {
    return `
      <section class="solution-section" style="padding: 8rem 1.5rem; text-align: center;">
        <div class="solution-section__inner" style="max-width: 680px;">
          <div class="solution-micro-label" style="justify-content: center; color: #d32f2f;">SYSTEM NOTICE</div>
          <h1 style="font-size: 2.2rem; font-weight: 900; color: #07172c; margin-bottom: 1rem;">
            Unable to load Solution Content.
          </h1>
          <p style="font-size: 1rem; color: #52677d; line-height: 1.6; margin-bottom: 2rem;">
            The JSON content source could not be loaded. Please ensure data/laxmi-solutions-inner-pages.json is available.
          </p>
          <a href="solutions.html" class="editorial-hero__btn-white" style="background: #07172c; color: #ffffff; padding: 0.85rem 1.75rem;">
            RETURN TO SOLUTIONS HOME →
          </a>
        </div>
      </section>
    `;
  }

  // Scroll Observer Animations
  function initScrollAnimations() {
    if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.solution-section, .product-story-card, .journey-stage-panel').forEach(el => {
      observer.observe(el);
    });
  }

})();
