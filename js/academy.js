/* ==========================================================================
   Laxmi En-Fab Pvt. Ltd. — AAC Investor Academy Dynamic Controller
   Architecture: Reusable Vanilla JS Engine powered by JSON content
   Supports 2-column sidebar layout, dynamic 3rd level inner topics & deep linking
   ========================================================================== */

(function () {
  'use strict';

  // Approved Stage Short Titles
  const STAGE_CONFIG = [
    { slug: 'understand-market', num: '01', title: '01 MARKET', file: 'understand-market.html' },
    { slug: 'design-your-plant', num: '02', title: '02 DESIGN', file: 'design-your-plant.html' },
    { slug: 'compare-your-aac-plant', num: '03', title: '03 COMPARE', file: 'compare-your-aac-plant.html' },
    { slug: 'efficient-your-plant', num: '04', title: '04 EFFICIENT', file: 'efficient-your-plant.html' },
    { slug: 'expand-your-plant', num: '05', title: '05 EXPAND', file: 'expand-your-plant.html' }
  ];

  document.addEventListener('DOMContentLoaded', initAcademyEngine);

  async function initAcademyEngine() {
    const root = document.getElementById('academy-root');
    if (!root) return;

    // Detect Current Stage Slug
    const bodyPage = document.body.getAttribute('data-academy-page');
    const pathSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const currentStageSlug = bodyPage || pathSlug || 'understand-market';

    try {
      // 1. Fetch Topics JSON Data
      const innerData = await fetchJSONData([
        'data/academy-inner-topics.json',
        '../data/academy-inner-topics.json',
        '../../data/academy-inner-topics.json'
      ]);

      // 2. Fetch General Academy JSON Data
      const academyData = await fetchJSONData([
        'data/laxmi-aac-investor-academy.json',
        '../data/laxmi-aac-investor-academy.json',
        '../../data/laxmi-aac-investor-academy.json'
      ]);

      // Check if Stage 03 Comparison Checklist
      if (currentStageSlug === 'compare-your-aac-plant') {
        const page = (academyData && academyData.pages) ? academyData.pages.find(p => p.slug === 'compare-your-aac-plant') : { title: 'Compare Your AAC Plant' };
        updateSEOMetadata(page);
        renderCompareStageComplete(root, page, currentStageSlug);
        initChecklistListeners();
        initScrollAnimations();
        return;
      }

      // 3. Stage 01, 02 (or any stage with inner topics)
      const stageData = innerData && innerData.stages ? innerData.stages[currentStageSlug] : null;

      if (stageData && stageData.topics && stageData.topics.length > 0) {
        // Determine active topic from URL query param ?topic= or #hash or default
        const urlParams = new URLSearchParams(window.location.search);
        const queryTopic = urlParams.get('topic');
        const hashTopic = window.location.hash.replace('#', '').toLowerCase();
        
        let initialTopicId = queryTopic || hashTopic || stageData.defaultTopic || stageData.topics[0].id;
        
        // Handle alias mappings
        const aliasMap = {
          'capacity': 'capacity-selection',
          'land': 'land-requirement',
          'cost': 'project-cost',
          'project-cost-working-capital': 'project-cost',
          'roi': 'roi-payback',
          'finance': 'finance-bank-loan',
          'subsidy': 'subsidy',
          'subsidies': 'subsidy',
          'why': 'why-aac',
          'future': 'future-of-aac',
          'demand': 'market-demand',
          'materials': 'raw-materials',
          'automatic': 'make-plant-automatic',
          'quality': 'improve-block-quality',
          'maintenance': 'plant-maintenance-sop',
          'steam': 'reduce-steam-cost',
          'manpower': 'skilled-manpower',
          'capacity-upgrade': 'upgrade-capacity',
          'panels': 'reinforced-aac-panels',
          'mortar': 'dry-mix-mortar-integration',
          'palletizing': 'auto-palletizing-robotics'
        };
        initialTopicId = aliasMap[initialTopicId] || initialTopicId;

        let activeTopic = stageData.topics.find(t => t.id === initialTopicId) || stageData.topics[0];

        // Render full 2-column view
        renderStageWithTopic(root, stageData, activeTopic, currentStageSlug);
        
        // Attach interactive sidebar listener & popstate listener
        initTopicInteractivity(root, stageData, currentStageSlug);
        initScrollAnimations();
        return;
      }

      // Fallback: Default General Page Render if stage not found in inner-topics
      if (academyData && academyData.pages) {
        const page = academyData.pages.find(p => p.slug === currentStageSlug) || academyData.pages[0];
        updateSEOMetadata(page);
        root.innerHTML = `
          ${renderStageNavRail(currentStageSlug)}
          ${renderHero(page)}
          ${renderIntro(page)}
          ${renderTopicsFallback(page)}
          ${renderFramework(page)}
          ${renderCheckpoint(page)}
          ${renderCTA(academyData.shared || {})}
        `;
        initTopicListenersFallback(page);
        initScrollAnimations();
      }

    } catch (err) {
      console.error('Laxmi AAC Investor Academy Render Error:', err);
      root.innerHTML = renderErrorFallback();
    }
  }

  // Fetch JSON with fallbacks
  async function fetchJSONData(paths) {
    for (const p of paths) {
      try {
        const res = await fetch(p);
        if (res.ok) return await res.json();
      } catch (e) {}
    }
    return null;
  }

  // Update Breadcrumb & Title
  function updateSEOMetadata(pageOrTopic) {
    if (!pageOrTopic) return;
    if (pageOrTopic.title) {
      document.title = `${pageOrTopic.title} | AAC Investor Academy | Laxmi En-Fab`;
    }
    if (pageOrTopic.lead) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', pageOrTopic.lead);
    }
  }

  // =========================================================================
  // =========================================================================
  // HIGH-KEY ARCHITECTURAL STAGE & INNER TOPIC RENDERER (1500px)
  // Replicating AAC Engineering Center visual language & structural precision
  // =========================================================================
  function renderStageWithTopic(root, stageData, activeTopic, currentStageSlug) {
    updateSEOMetadata(activeTopic);
    updateBreadcrumb(stageData.stageTitle, activeTopic.sidebarTitle || activeTopic.title);

    root.innerHTML = `
      ${renderStageNavRail(currentStageSlug)}
      
      <div id="academy-topic-container">
        ${renderTopicContentHTML(activeTopic, stageData, currentStageSlug)}
      </div>
    `;

    initInPageScrollAndSpy();
  }

  // Render Inner Content of a Topic in Full Engineering Center Layout
  function renderTopicContentHTML(topic, stageData, currentStageSlug) {
    // Resolve Image Path
    let imgPath = topic.image || 'assets/images/why-aac.png';
    if (!imgPath.startsWith('../') && !imgPath.startsWith('/') && window.location.pathname.includes('/academy/')) {
      imgPath = '../' + imgPath;
    }

    const heroTitle = splitHeading(topic.title);
    const stats = getTopicStats(topic);

    // Build In-Page Sticky Navigation Strip (eng-nav-strip)
    const navItems = [
      `<a href="#overview" class="eng-nav-btn active"><span class="eng-nav-num">01</span> Overview</a>`
    ];

    if (topic.sections && topic.sections.length > 0) {
      topic.sections.forEach((sec, idx) => {
        const cleanName = sec.heading.replace(/^\d+\.\s*/, '').split(':')[0].trim();
        const shortName = cleanName.length > 28 ? cleanName.substring(0, 26) + '…' : cleanName;
        const numStr = idx + 2 < 10 ? `0${idx + 2}` : `${idx + 2}`;
        navItems.push(`<a href="#sec-${idx + 1}" class="eng-nav-btn"><span class="eng-nav-num">${numStr}</span> ${shortName}</a>`);
      });
    }

    const ctaNum = (topic.sections ? topic.sections.length : 0) + 2;
    const ctaNumStr = ctaNum < 10 ? `0${ctaNum}` : `${ctaNum}`;
    navItems.push(`<a href="#cta" class="eng-nav-btn"><span class="eng-nav-num">${ctaNumStr}</span> Next Steps</a>`);

    const navStripHTML = `
      <nav class="eng-nav-strip" aria-label="Topic In-Page Navigation">
        <div class="eng-nav-strip__inner">
          ${navItems.join('')}
        </div>
      </nav>
    `;

    // Hero Section (editorial-hero--light)
    const heroHTML = `
      <section class="editorial-hero editorial-hero--light is-loaded" id="overview" aria-label="${topic.title}">
        <div class="editorial-hero__media" aria-hidden="true">
          <div class="editorial-hero__video-wrap">
            <img class="editorial-hero__poster" src="${imgPath}" alt="${topic.imageAlt || topic.title}" fetchpriority="high" decoding="async" onerror="this.src='../assets/images/future-of-aac.png'" />
          </div>
          <div class="editorial-hero__overlay"></div>
        </div>

        <div class="editorial-hero__inner">
          <div class="editorial-hero__content">
            <span class="editorial-hero__eyebrow">${topic.eyebrow || `STAGE ${stageData.stageNum} · TOPIC ${topic.number}`}</span>
            <h1 class="editorial-hero__title">
              <span>${heroTitle.main}</span>
              ${heroTitle.sub ? `<span class="editorial-hero__title-light">${heroTitle.sub}</span>` : ''}
            </h1>
            <p class="editorial-hero__sub">${topic.lead || ''}</p>

            <div class="editorial-hero__actions">
              <a href="#sec-1" class="editorial-hero__btn-dark">
                <span>Explore Intelligence</span>
                <span class="editorial-hero__btn-arrow">↓</span>
              </a>
              <a href="../contact.html" class="editorial-hero__link-dark">
                <span>Talk to an Expert</span>
                <span class="editorial-hero__link-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div class="editorial-hero__corner-caption" aria-hidden="true">
          <span class="editorial-hero__corner-title">AAC Investor Academy · Stage ${stageData.stageNum}</span>
          <span class="editorial-hero__corner-sub">${stageData.stageTitle}</span>
        </div>
      </section>
    `;

    // Dedicated Specifications & Stats Strip Below Hero
    const statsCardsHTML = stats.map(st => `
      <div class="eng-stat-card">
        <div class="eng-stat-card__val">${st.val} <span>${st.unit}</span></div>
        <div class="eng-stat-card__lbl">${st.lbl}</div>
      </div>
    `).join('');

    const statsStripHTML = `
      <section class="eng-stats-strip" aria-label="Key Specifications & Engineering Benchmarks">
        <div class="eng-stats-strip__inner">
          ${statsCardsHTML}
        </div>
      </section>
    `;

    // Checkpoint Block
    let checkpointHTML = '';
    if (topic.checkpoint) {
      checkpointHTML = `
        <div class="eng-checkpoint-box">
          <h4 class="eng-checkpoint-box__title">${topic.checkpoint.title || 'CRITICAL BENCHMARK'}</h4>
          <p class="eng-checkpoint-box__text">${topic.checkpoint.text}</p>
        </div>
      `;
    }

    // Render Content Sections
    let sectionsHTML = '';
    if (topic.sections && topic.sections.length > 0) {
      sectionsHTML = topic.sections.map((sec, idx) => {
        const isLightBg = idx % 2 === 1;
        const bgClass = isLightBg ? 'eng-section--light' : 'eng-section--white';
        const secHeadingParts = splitHeading(sec.heading.replace(/^\d+\.\s*/, ''));
        const cleanEyebrow = sec.heading.replace(/^\d+\.\s*/, '').split(':')[0].trim().toUpperCase();

        let secBodyHTML = '';

        if (sec.text) {
          secBodyHTML += `<p class="eng-lead">${sec.text}</p>`;
        }

        // Insert checkpoint in first section or if defined
        if (idx === 0 && checkpointHTML) {
          secBodyHTML += checkpointHTML;
        }

        // Matrix Table
        if (sec.table) {
          const ths = sec.table.headers.map(h => `<th>${h}</th>`).join('');
          const trs = sec.table.rows.map((row) => {
            const tds = row.map((cell, cIdx) => {
              if (cIdx === 0) {
                return `
                  <td>
                    <div class="eng-material-cell">
                      <span class="eng-material-name">${cell}</span>
                    </div>
                  </td>
                `;
              } else if (cIdx === 1 && row.length > 3) {
                return `<td><span class="eng-prop-badge">${cell}</span></td>`;
              } else if (cIdx === row.length - 1) {
                return `<td><span class="eng-qc-tag">${cell}</span></td>`;
              }
              return `<td>${cell}</td>`;
            }).join('');
            return `<tr>${tds}</tr>`;
          }).join('');

          secBodyHTML += `
            <div class="eng-matrix-table-wrap">
              <table class="eng-matrix-table">
                <thead><tr>${ths}</tr></thead>
                <tbody>${trs}</tbody>
              </table>
            </div>
          `;
        }

        // Contiguous Architectural Feature Grid Cards
        if (sec.cards) {
          const colCount = Math.min(sec.cards.length, 3);
          const cardsCols = sec.cards.map((c, cIdx) => `
            <div class="eng-arch-col">
              <div>
                <span class="eng-arch-num">${c.tag || `KEY BENCHMARK 0${cIdx + 1}`}</span>
                <h3 class="eng-arch-name">${c.title}</h3>
                <p class="eng-arch-desc">${c.text}</p>
              </div>
              <div class="eng-arch-link">
                <span>Technical Standard</span>
                <span class="eng-arch-arrow">↗</span>
              </div>
            </div>
          `).join('');

          secBodyHTML += `
            <div class="eng-arch-grid" style="grid-template-columns: repeat(${colCount}, 1fr); margin: 2.5rem 0;">
              ${cardsCols}
            </div>
          `;
        }

        // Process Flow / Numbered List
        if (sec.list) {
          const rows = sec.list.map((li, lIdx) => {
            let title = `Parameter 0${lIdx + 1}`;
            let desc = li;
            const match = li.match(/<strong>(.*?)<\/strong>:\s*(.*)/i) || li.match(/<strong>(.*?)<\/strong>\s*(.*)/i);
            if (match) {
              title = match[1];
              desc = match[2];
            }
            return `
              <div class="eng-flow-row" style="color: inherit;">
                <div class="eng-flow-num">0${lIdx + 1}</div>
                <div class="eng-flow-name" style="color: #07172c;">${title}</div>
                <div class="eng-flow-desc" style="color: #475569;">${desc}</div>
              </div>
            `;
          }).join('');

          secBodyHTML += `
            <div class="eng-flow-table" style="border-top: 1px solid #e2e8f0; margin: 2.5rem 0;">
              ${rows}
            </div>
          `;
        }

        return `
          <section class="eng-section ${bgClass}" id="sec-${idx + 1}">
            <div class="eng-container">
              <span class="eng-eyebrow">0${idx + 1} · ${cleanEyebrow}</span>
              <h2 class="eng-title">
                <span>${secHeadingParts.main}</span>
                ${secHeadingParts.sub ? `<span class="eng-title-light">${secHeadingParts.sub}</span>` : ''}
              </h2>
              ${secBodyHTML}
            </div>
          </section>
        `;
      }).join('');
    }

    // Strategic Conversion CTA Banner
    const ctaEyebrow = (topic.cta && topic.cta.eyebrow) || 'STRATEGIC FEASIBILITY';
    const ctaTitle = (topic.cta && topic.cta.title) || 'Plan the Market. Then Plan the Plant.';
    const ctaTitleParts = splitHeading(ctaTitle);
    const ctaText = (topic.cta && topic.cta.text) || 'Share your proposed location, expected capacity, and raw materials with the Laxmi En-Fab engineering team.';
    const ctaBtnLabel = (topic.cta && topic.cta.btnLabel) || 'Request Feasibility Discussion';
    const ctaBtnUrl = (topic.cta && topic.cta.btnUrl) ? (topic.cta.btnUrl.startsWith('../') ? topic.cta.btnUrl : '../' + topic.cta.btnUrl) : '../contact.html';

    const ctaBannerHTML = `
      <section class="eng-cta-banner" id="cta">
        <div class="eng-cta-banner__inner">
          <span class="eng-cta-banner__eyebrow">${ctaEyebrow}</span>
          <h2 class="eng-cta-banner__title">
            <span>${ctaTitleParts.main}</span>
            ${ctaTitleParts.sub ? `<span class="eng-cta-banner__title-light">${ctaTitleParts.sub}</span>` : ''}
          </h2>
          <p class="eng-cta-banner__lead">${ctaText}</p>
          <div class="eng-cta-banner__actions">
            <a href="${ctaBtnUrl}" class="eng-cta-banner__btn-white">
              <span>${ctaBtnLabel}</span>
              <span class="eng-cta-banner__btn-arrow">↗</span>
            </a>
            <a href="#overview" class="eng-cta-banner__link-top">
              <span>Return to top ↑</span>
            </a>
          </div>
        </div>
      </section>
    `;

    // Chapter Navigation Footer (Previous / Next)
    let prevBtnHTML = '';
    if (topic.prevTopic) {
      const prevUrl = topic.prevTopic.stage === currentStageSlug ? `?topic=${topic.prevTopic.id}` : `${topic.prevTopic.stage}.html?topic=${topic.prevTopic.id}`;
      prevBtnHTML = `
        <a href="${prevUrl}" class="eng-chapter-nav__btn" data-topic-nav="${topic.prevTopic.id}">
          <span class="eng-chapter-nav__sub">← PREVIOUS TOPIC</span>
          <span class="eng-chapter-nav__title">${topic.prevTopic.title}</span>
        </a>
      `;
    } else {
      prevBtnHTML = `<div></div>`;
    }

    let nextBtnHTML = '';
    if (topic.nextTopic) {
      const nextUrl = topic.nextTopic.stage === currentStageSlug ? `?topic=${topic.nextTopic.id}` : `${topic.nextTopic.stage}.html?topic=${topic.nextTopic.id}`;
      nextBtnHTML = `
        <a href="${nextUrl}" class="eng-chapter-nav__btn eng-chapter-nav__btn--next" data-topic-nav="${topic.nextTopic.id}">
          <span class="eng-chapter-nav__sub">NEXT TOPIC →</span>
          <span class="eng-chapter-nav__title">${topic.nextTopic.title}</span>
        </a>
      `;
    } else {
      nextBtnHTML = `<div></div>`;
    }

    const chapterNavHTML = `
      <section class="eng-chapter-nav-section">
        <div class="eng-chapter-nav">
          ${prevBtnHTML}
          ${nextBtnHTML}
        </div>
      </section>
    `;

    return `
      ${heroHTML}
      ${statsStripHTML}
      ${navStripHTML}
      ${sectionsHTML}
      ${ctaBannerHTML}
      ${chapterNavHTML}
    `;
  }

  // Topic KPI Stats Provider
  function getTopicStats(topic) {
    const statsMap = {
      // Stage 01: Understand the Market
      'why-aac': [
        { val: '550–650', unit: 'kg/m³', lbl: 'Dry Density' },
        { val: '~65', unit: '%', lbl: 'Dead Load Reduction' },
        { val: '4', unit: 'Hours', lbl: 'Fire Rating' },
        { val: '±1.5', unit: 'mm', lbl: 'Wire Accuracy' }
      ],
      'future-of-aac': [
        { val: '12–15', unit: '%', lbl: 'Annual CAGR' },
        { val: '60', unit: '%', lbl: 'Faster Panel Build' },
        { val: '35–50', unit: '%', lbl: 'Higher EBITDA ALC' },
        { val: '70', unit: '%', lbl: 'Recycled Content' }
      ],
      'market-demand': [
        { val: '100–150', unit: 'km', lbl: 'Economic Radius' },
        { val: '45–55', unit: '%', lbl: 'High-Rise Share' },
        { val: '₹150–250', unit: '/50km', lbl: 'Transit Cost' },
        { val: '300', unit: 'm³/day', lbl: 'Optimal Initial Size' }
      ],
      'raw-materials': [
        { val: '<15', unit: '%', lbl: '45µm Fineness' },
        { val: '1.62–1.68', unit: 'kg/L', lbl: 'Slurry Density' },
        { val: '>70', unit: '%', lbl: 'Active CaO in Lime' },
        { val: '40–45', unit: '°C', lbl: 'Batch Temperature' }
      ],
      'profitability': [
        { val: '28–38', unit: '%', lbl: 'EBITDA Margin' },
        { val: '2.5–3.5', unit: 'Years', lbl: 'Payback Period' },
        { val: '32–40', unit: '%', lbl: 'Project IRR' },
        { val: '₹1,850', unit: '/m³', lbl: 'Direct Cost Floor' }
      ],
      'government-policies': [
        { val: '300', unit: 'km', lbl: 'Mandatory Fly Ash Zone' },
        { val: '30–50', unit: '%', lbl: 'State Capex Subsidy' },
        { val: '100', unit: '%', lbl: 'Electricity Duty Waiver' },
        { val: '5', unit: '%', lbl: 'Concessional GST Rate' }
      ],

      // Stage 02: Design Your Plant
      'capacity-selection': [
        { val: '150–1500', unit: 'm³/day', lbl: 'Standard Tiers' },
        { val: '300', unit: 'm³/day', lbl: 'Optimal Benchmark' },
        { val: '3–4', unit: 'Carts/hr', lbl: 'Mixer Frequency' },
        { val: '95', unit: '%', lbl: 'Uptime Target' }
      ],
      'land-requirement': [
        { val: '3.5–4.5', unit: 'Acres', lbl: '300 m³/day Footprint' },
        { val: '65', unit: 'm', lbl: 'Minimum Shed Length' },
        { val: '9', unit: 'm', lbl: 'Crane Bay Height' },
        { val: '12', unit: 'm', lbl: 'Internal Road Width' }
      ],
      'project-cost': [
        { val: '₹18–26', unit: 'Cr', lbl: 'Total Capex Range' },
        { val: '₹3–5', unit: 'Cr', lbl: 'Working Capital' },
        { val: '65–70', unit: '%', lbl: 'Machinery Share' },
        { val: '12–15', unit: '%', lbl: 'Civil Works Share' }
      ],
      'roi-payback': [
        { val: '32–42', unit: '%', lbl: 'Equity IRR' },
        { val: '2.8–3.5', unit: 'Years', lbl: 'Net Payback' },
        { val: '1.8–2.2', unit: 'x', lbl: 'DSCR Coverage' },
        { val: '45', unit: '%', lbl: 'Breakeven Capacity' }
      ],
      'finance-bank-loan': [
        { val: '70:30', unit: 'Ratio', lbl: 'Debt : Equity' },
        { val: '8.25–9.5', unit: '%', lbl: 'Term Loan Rate' },
        { val: '7–10', unit: 'Years', lbl: 'Repayment Tenure' },
        { val: '12–18', unit: 'Months', lbl: 'Moratorium Period' }
      ],
      'finance-loan': [
        { val: '70:30', unit: 'Ratio', lbl: 'Debt : Equity' },
        { val: '8.25–9.5', unit: '%', lbl: 'Term Loan Rate' },
        { val: '7–10', unit: 'Years', lbl: 'Repayment Tenure' },
        { val: '12–18', unit: 'Months', lbl: 'Moratorium Period' }
      ],
      'subsidy': [
        { val: '₹2.5–5.0', unit: 'Cr', lbl: 'Max State Subsidy' },
        { val: '5–7', unit: '%', lbl: 'Interest Subvention' },
        { val: '100', unit: '%', lbl: 'Stamp Duty Refund' },
        { val: '5–7', unit: 'Years', lbl: 'SGST Reimbursement' }
      ],

      // Stage 04: Efficient Your Plant
      'make-plant-automatic': [
        { val: '100', unit: '%', lbl: 'PLC Dosing Automation' },
        { val: '±0.5', unit: '%', lbl: 'Load Cell Batching' },
        { val: '40–50', unit: '%', lbl: 'Labour Reduction' },
        { val: 'Zero', unit: 'Accidents', lbl: 'Interlocked Safety' }
      ],
      'improve-block-quality': [
        { val: '>4.0', unit: 'N/mm²', lbl: 'Target Strength' },
        { val: '±1.0', unit: 'mm', lbl: 'Dimensional Tolerance' },
        { val: '<1', unit: '%', lbl: 'Transit Rejection' },
        { val: '100', unit: '%', lbl: 'IS 2185-3 Compliance' }
      ],
      'maintenance-sop': [
        { val: '98', unit: '%', lbl: 'Plant Availability' },
        { val: 'Daily/Weekly', unit: 'SOP', lbl: 'Lubrication Routine' },
        { val: '<2', unit: 'Hours', lbl: 'Mean Time to Repair' },
        { val: '5000', unit: 'Hours', lbl: 'Boiler Overhaul Cycle' }
      ],
      'reduce-steam-cost': [
        { val: '20–25', unit: '%', lbl: 'Steam Recovery Rate' },
        { val: '190', unit: '°C', lbl: 'Saturated Steam Temp' },
        { val: '12–14', unit: 'bar', lbl: 'Working Pressure' },
        { val: '₹120–160', unit: '/m³', lbl: 'Fuel Cost Savings' }
      ],
      'skilled-manpower': [
        { val: '8–12', unit: 'Staff/Shift', lbl: 'Optimized Crew Size' },
        { val: '24×7', unit: 'Rotation', lbl: 'Continuous Operations' },
        { val: '100', unit: '%', lbl: 'Certified Operators' },
        { val: '40', unit: 'Hours/Yr', lbl: 'Training Refreshers' }
      ],

      // Stage 05: Expand Your Plant
      'upgrade-capacity': [
        { val: '300→600', unit: 'm³/day', lbl: 'Phase 2 Scale' },
        { val: 'Zero', unit: 'Downtime', lbl: 'Parallel Installation' },
        { val: '40–50', unit: '%', lbl: 'Lower Incremental Capex' },
        { val: '2x', unit: 'Revenue', lbl: 'Scale Multiplier' }
      ],
      'reinforced-aac-panels': [
        { val: '6.0', unit: 'm', lbl: 'Max Panel Length' },
        { val: '₹4,500', unit: '/m³', lbl: 'Selling Realization' },
        { val: '35–45', unit: '%', lbl: 'EBITDA Margin' },
        { val: '60', unit: '%', lbl: 'Faster Dry Erection' }
      ],
      'dry-mix-mortar-plant': [
        { val: '10–20', unit: 'TPH', lbl: 'Mortar Batch Capacity' },
        { val: '35', unit: '%', lbl: 'Gross Margins' },
        { val: '100', unit: '%', lbl: 'Client Retention' },
        { val: '2–3', unit: 'mm', lbl: 'Joint Adhesive Grade' }
      ],
      'palletizing-robotics': [
        { val: '100', unit: '%', lbl: 'Automated Strapping' },
        { val: '<0.5', unit: '%', lbl: 'Handling Edge Loss' },
        { val: '45', unit: 'Sec', lbl: 'Pallet Cycle Time' },
        { val: 'ISPM-15', unit: 'Compliant', lbl: 'Export Standard' }
      ]
    };

    return statsMap[topic.id] || [
      { val: '150–1500', unit: 'm³/day', lbl: 'Capacity Tier' },
      { val: '±1.0', unit: 'mm', lbl: 'Wire Accuracy' },
      { val: '12–14', unit: 'bar', lbl: 'Autoclave Pressure' },
      { val: '100', unit: '%', lbl: 'Slurry Recycling' }
    ];
  }

  function splitHeading(title) {
    if (!title) return { main: '', sub: '' };
    if (title.includes(':')) {
      const parts = title.split(':');
      return { main: parts[0].trim() + ':', sub: parts.slice(1).join(':').trim() };
    }
    if (title.includes('?')) {
      const parts = title.split('?');
      return { main: parts[0].trim() + '?', sub: parts.slice(1).join('?').trim() };
    }
    const words = title.split(' ');
    if (words.length > 5) {
      const mid = Math.ceil(words.length / 2);
      return { main: words.slice(0, mid).join(' '), sub: words.slice(mid).join(' ') };
    }
    return { main: title, sub: '' };
  }

  // Sub-Navigation Smooth Scroll & Active Scroll Spy
  function initInPageScrollAndSpy() {
    // Smooth scroll for subnav
    document.querySelectorAll('.eng-nav-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const navStrip = document.querySelector('.eng-nav-strip');
            const navHeight = navStrip ? navStrip.offsetHeight : 60;
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.offsetHeight : 70;
            const topOffset = target.getBoundingClientRect().top + window.pageYOffset - (navHeight + headerHeight + 10);
            window.scrollTo({ top: topOffset, behavior: 'smooth' });

            document.querySelectorAll('.eng-nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
          }
        }
      });
    });

    // Scroll spy
    var navBtns = document.querySelectorAll('.eng-nav-btn');
    if (!navBtns.length) return;

    var sectionIds = Array.from(navBtns).map(b => b.getAttribute('href')).filter(h => h && h.startsWith('#')).map(h => h.substring(1));
    var sectionCache = [];

    function updateSections() {
      sectionCache = sectionIds.map(function(id) {
        var el = document.getElementById(id);
        return el ? { id: id, top: el.offsetTop, height: el.offsetHeight } : null;
      }).filter(Boolean);
    }

    updateSections();
    window.addEventListener('resize', updateSections, { passive: true });

    var scrollTicking = false;
    window.addEventListener('scroll', function() {
      if (!scrollTicking) {
        window.requestAnimationFrame(function() {
          var scrollPos = window.pageYOffset + 220;
          var currentActive = null;
          for (var i = 0; i < sectionCache.length; i++) {
            var s = sectionCache[i];
            if (scrollPos >= s.top && scrollPos < s.top + s.height) {
              currentActive = s.id;
              break;
            }
          }
          if (currentActive) {
            navBtns.forEach(function(b) {
              b.classList.toggle('active', b.getAttribute('href') === '#' + currentActive);
            });
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  // Update Dynamic Breadcrumb
  function updateBreadcrumb(stageTitle, topicTitle) {
    const bc = document.querySelector('.site-breadcrumb__inner');
    if (!bc) return;

    let rootHome = window.location.pathname.includes('/academy/') ? '../index.html' : 'index.html';
    let academyHome = window.location.pathname.includes('/academy/') ? 'academy.html' : 'academy/academy.html';

    bc.innerHTML = `
      <a href="${rootHome}">Home</a>
      <span class="bc-sep">/</span>
      <a href="${academyHome}">AAC Investor Academy</a>
      <span class="bc-sep">/</span>
      <span class="bc-current">${stageTitle}</span>
      ${topicTitle ? `<span class="bc-sep">/</span><span class="bc-current" style="color: #38bdf8;">${topicTitle}</span>` : ''}
    `;
  }

  // Topic Switcher Interactivity
  function initTopicInteractivity(root, stageData, currentStageSlug) {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[data-topic-id], a[data-topic-nav]');
      if (!link) return;

      const topicId = link.getAttribute('data-topic-id') || link.getAttribute('data-topic-nav');
      if (!topicId) return;

      // Check if topic exists in current stage
      const targetTopic = stageData.topics.find(t => t.id === topicId);
      if (targetTopic) {
        e.preventDefault();

        // Update URL query string
        const newUrl = `${window.location.pathname}?topic=${topicId}`;
        window.history.pushState({ topicId: topicId }, '', newUrl);

        // Re-render Container
        const container = document.getElementById('academy-topic-container');
        if (container) {
          container.innerHTML = renderTopicContentHTML(targetTopic, stageData, currentStageSlug);
          initInPageScrollAndSpy();
        }

        // Update SEO & Breadcrumb
        updateSEOMetadata(targetTopic);
        updateBreadcrumb(stageData.stageTitle, targetTopic.sidebarTitle || targetTopic.title);

        // Smooth scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function (e) {
      const urlParams = new URLSearchParams(window.location.search);
      const queryTopic = urlParams.get('topic') || (e.state && e.state.topicId) || stageData.defaultTopic;
      const targetTopic = stageData.topics.find(t => t.id === queryTopic) || stageData.topics[0];

      if (targetTopic) {
        const container = document.getElementById('academy-topic-container');
        if (container) {
          container.innerHTML = renderTopicContentHTML(targetTopic, stageData, currentStageSlug);
          initInPageScrollAndSpy();
        }
        updateSEOMetadata(targetTopic);
        updateBreadcrumb(stageData.stageTitle, targetTopic.sidebarTitle || targetTopic.title);
      }
    });
  }

  // =========================================================================
  // SHARED UI COMPONENTS
  // =========================================================================

  // Top Stage Navigation Rail
  function renderStageNavRail(currentSlug) {
    const itemsHTML = STAGE_CONFIG.map(p => {
      const activeClass = p.slug === currentSlug ? 'is-active' : '';
      let url = p.file;
      if (!window.location.pathname.includes('/academy/')) {
        url = 'academy/' + p.file;
      }
      return `<a href="${url}" class="academy-nav-rail__item ${activeClass}">${p.title}</a>`;
    }).join('');

    return `
      <nav class="academy-nav-rail" aria-label="Academy Stage Navigation">
        <div class="academy-nav-rail__inner">
          <span style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.14em; color: rgba(255,255,255,0.45); white-space: nowrap; border-right: 1px solid rgba(255,255,255,0.15); padding-right: 1rem;">ACADEMY JOURNEY</span>
          <div class="academy-nav-rail__items">
            ${itemsHTML}
          </div>
        </div>
      </nav>
    `;
  }

  // Topic CTA Section (Executive 2-Column Industrial Split Design)
  function renderTopicCTA(cta) {
    if (!cta) return '';
    let btnUrl = cta.btnUrl || 'contact.html';
    if (window.location.pathname.includes('/academy/') && !btnUrl.startsWith('../') && !btnUrl.startsWith('/')) {
      btnUrl = '../' + btnUrl;
    }
    let engCenterUrl = window.location.pathname.includes('/academy/') ? '../engineering-center.html' : 'engineering-center.html';

    const eyebrow = cta.eyebrow || 'ENGINEERING &amp; FEASIBILITY ADVISORY';
    const title = cta.title || 'Discuss Your AAC Plant Requirement with Laxmi En-Fab';
    const text = cta.text || 'From raw material testing to automated plant layout design, Laxmi En-Fab provides complete turnkey manufacturing solutions.';
    const btnLabel = cta.btnLabel || 'TALK TO LAXMI EXPERTS';

    // Format title to avoid mid-word hyphen breaks
    let formattedTitle = title;
    if (title.includes('Laxmi En-Fab')) {
      formattedTitle = title.replace('with Laxmi En-Fab', '<span class="academy-cta-highlight">with Laxmi&nbsp;En&#8209;Fab</span>');
    }

    return `
      <section class="academy-cta-banner" id="academy-cta">
        <div class="academy-cta-banner__inner">
          <div class="academy-cta-grid">
            
            <!-- Left Column: Content & Actions -->
            <div class="academy-cta-left">
              <span class="academy-cta-banner__eyebrow">${eyebrow}</span>
              <h2 class="academy-cta-banner__title">${formattedTitle}</h2>
              <p class="academy-cta-banner__lead">${text}</p>
              
              <div class="academy-cta-banner__badges">
                <span class="academy-cta-badge">✓ 150+ Plant Installations</span>
                <span class="academy-cta-badge">✓ Raw Material XRF Lab</span>
                <span class="academy-cta-badge">✓ Turnkey EPC Execution</span>
                <span class="academy-cta-badge">✓ 24/7 Field Support</span>
              </div>

              <div class="academy-cta-banner__actions">
                <a href="${btnUrl}" class="academy-cta-banner__btn-white">
                  <span>${btnLabel.replace('→', '').replace('↗', '').trim()}</span>
                  <span class="academy-cta-banner__arrow">↗</span>
                </a>
                <a href="${engCenterUrl}" class="academy-cta-banner__link-secondary">
                  Explore Engineering Center →
                </a>
              </div>
            </div>

            <!-- Right Column: Direct Engineering Desk Card (Architectural Precision Theme) -->
            <div class="academy-cta-right">
              <div class="academy-cta-card">
                <div class="academy-cta-card__header">
                  <span class="academy-cta-card__tag">DIRECT ADVISORY DESK</span>
                  <h3 class="academy-cta-card__title">Connect with Senior Engineers</h3>
                </div>

                <div class="academy-cta-card__items">
                  <div class="academy-cta-card__item">
                    <div class="academy-cta-card__icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <span class="academy-cta-card__label">Direct Advisory Hotline</span>
                      <a href="tel:+919825025247" class="academy-cta-card__val">+91 98250 25247</a>
                    </div>
                  </div>

                  <div class="academy-cta-card__item">
                    <div class="academy-cta-card__icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    </div>
                    <div>
                      <span class="academy-cta-card__label">Project Feasibility &amp; DPR</span>
                      <a href="mailto:sales@laxmienfab.com" class="academy-cta-card__val">sales@laxmienfab.com</a>
                    </div>
                  </div>

                  <div class="academy-cta-card__item">
                    <div class="academy-cta-card__icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <span class="academy-cta-card__label">Heavy Manufacturing Hub</span>
                      <span class="academy-cta-card__val">Ahmedabad, Gujarat, India</span>
                    </div>
                  </div>
                </div>

                <div class="academy-cta-card__footer">
                  <div class="academy-cta-card__sla">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                    <span>Initial feasibility &amp; layout turnaround within 48 hours</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;
  }

  // =========================================================================
  // STAGE 03: COMPARE YOUR AAC PLANT — COMPLETE EDITORIAL SUITE
  // =========================================================================
  function renderCompareStageComplete(root, page, currentStageSlug) {
    let heroBg = window.location.pathname.includes('/academy/') ? '../assets/images/complete-system-plant.png' : 'assets/images/complete-system-plant.png';
    let contactUrl = window.location.pathname.includes('/academy/') ? '../contact.html' : 'contact.html';
    let nextUrl = window.location.pathname.includes('/academy/') ? 'efficient-your-plant.html' : 'academy/efficient-your-plant.html';

    const verifiedList = getVerifiedStorage();

    const criteria12 = [
      {
        num: "01",
        title: "Production & Saleable Output Basis",
        question: "Is capacity calculated on net saleable output after handling/trimming losses (2–3%), or merely theoretical nominal cycles?",
        check: "Verify exact mould volume (e.g. 4.8m × 1.2m × 0.6m = 3.456 m³), realistic batches/hour, autoclave cycle length (10–12 hrs), and 300 operating days."
      },
      {
        num: "02",
        title: "Complete Equipment Scope & Battery Limits",
        question: "Are auxiliary piping, chutes, wiring up to the PLC panel, and slurry agitation tanks fully included or hidden exclusions?",
        check: "Demand a defined scope battery limit drawing from the raw material storage intake to the dispatched finished block yard."
      },
      {
        num: "03",
        title: "Automation & Manual Intervention Boundaries",
        question: "Where exactly does manual intervention remain during regular production, mould demoulding, and wire changeovers?",
        check: "Require the supplier to map operator touchpoints, manual override requirements, and automated fault recovery routines."
      },
      {
        num: "04",
        title: "Specific Utilities Consumption Guarantees",
        question: "What are the contractual specific electrical power (kWh/m³) and steam (kg/m³) consumption figures?",
        check: "Contractual guarantees should verify specific power ≤ 22–26 kWh/m³ and steam ≤ 280–320 kg/m³ with insulated piping and condensate return."
      },
      {
        num: "05",
        title: "Shift Manpower Allocation & Roster",
        question: "What is the exact shift manpower roster (operators, mechanics, chemists, helpers) required to operate the line?",
        check: "Compare total manpower per shift against claimed automation levels; mechanized lines require 8–12 personnel/shift including lab staff."
      },
      {
        num: "06",
        title: "Product Versatility & ALC Panel Readiness",
        question: "Can the cutting machine, mould handling, and autoclave cars process reinforced ALC wall panels and lintels?",
        check: "Confirm provisions for inserting steel reinforcing mesh cages, specialized panel curing racks, and tongue-and-groove milling."
      },
      {
        num: "07",
        title: "Manufacturing Evidence & Workshop Capability",
        question: "Is equipment fabricated in-house with certified heavy CNC machining and ultrasonic weld testing, or outsourced?",
        check: "Conduct an in-person workshop audit of the supplier's heavy machine shop, CNC floor borers, plate rolling, and stress-relieving facilities."
      },
      {
        num: "08",
        title: "Running Reference Plant Track Record",
        question: "Can the supplier provide verifiable operating plant references producing continuous commercial output for 3+ years?",
        check: "Inspect actual plant availability logs, customer reference satisfaction, block dimensional accuracy (±1.5mm), and edge chipping rates."
      },
      {
        num: "09",
        title: "Single-Point Turnkey Project Accountability",
        question: "Does the supplier take unified responsibility for civil foundation drawings, equipment erection, piping, and trial runs?",
        check: "A single turnkey contract covering layout engineering, IBR boiler compliance, and commissioning prevents multi-vendor disputes."
      },
      {
        num: "10",
        title: "72-Hour Continuous Performance Acceptance (PG Test)",
        question: "Is final commercial payment tied to a formal 72-hour continuous performance guarantee trial run meeting rated output?",
        check: "Contractual acceptance should mandate 100% rated throughput, density tolerance (±25 kg/m³), and compressive strength (IS 2185-3)."
      },
      {
        num: "11",
        title: "Service Support, Spares Kit & Telemetry SLA",
        question: "What are the warranty terms, critical spare parts inventory package, and guaranteed on-site technical response SLA?",
        check: "Ensure supply of a 2-year operational spares kit, remote PLC cloud telemetry diagnostics, and a 24-hour on-site engineer dispatch SLA."
      },
      {
        num: "12",
        title: "Modular Layout & Phased Expansion Readiness",
        question: "Can the plant be expanded from 300 m³/day to 600 m³/day or 900 m³/day without altering civil foundations or halting output?",
        check: "Verify pre-engineered space, rail track alignments, and utility capacity for adding secondary autoclaves and curing lines seamlessly."
      }
    ];

    const cardsHTML = criteria12.map(c => {
      const isVerified = verifiedList.includes(c.num);
      return `
        <div class="academy-checklist-card ${isVerified ? 'is-verified' : ''}" data-card-num="${c.num}">
          <div>
            <div class="academy-checklist-card__header">
              <span class="academy-checklist-card__num">CRITERION ${c.num}</span>
              <span class="verification-badge" style="font-size: 0.72rem; font-weight: 800; color: ${isVerified ? '#2e7d32' : '#8a9bb0'};">
                ${isVerified ? '✓ VERIFIED' : 'PENDING REVIEW'}
              </span>
            </div>
            <h3 class="academy-checklist-card__title">${c.title}</h3>
            <p class="academy-checklist-card__question">"${c.question}"</p>
            <div style="background: #f8fafc; border-left: 3px solid #0b3f78; padding: 0.85rem 1rem; border-radius: 0 6px 6px 0; margin-bottom: 1.25rem;">
              <span style="font-size: 0.74rem; font-weight: 800; color: #0b3f78; text-transform: uppercase; display: block; margin-bottom: 0.25rem;">What to Verify &amp; Evidence Required:</span>
              <p style="font-size: 0.86rem; color: #475569; line-height: 1.55; margin: 0;">${c.check}</p>
            </div>
          </div>
          <button class="academy-checklist-btn" aria-label="Toggle verification for ${c.title}">
            ${isVerified ? '✓ VERIFIED' : 'VERIFY CRITERION'}
          </button>
        </div>
      `;
    }).join('');

    root.innerHTML = `
      ${renderStageNavRail(currentStageSlug)}
      
      <!-- ============ 01. HERO SECTION ============ -->
      <section class="editorial-hero editorial-hero--light is-loaded" id="hero" aria-label="Compare AAC Plant Suppliers Overview">
        <div class="editorial-hero__media" aria-hidden="true">
          <div class="editorial-hero__video-wrap">
            <img
              class="editorial-hero__poster"
              src="${heroBg}"
              alt="Complete AAC Manufacturing Plant System and Due Diligence Comparison"
              fetchpriority="high"
            />
          </div>
          <div class="editorial-hero__overlay"></div>
        </div>

        <div class="editorial-hero__inner">
          <div class="editorial-hero__content">
            <span class="editorial-hero__eyebrow">
              AAC INVESTOR GUIDE · SUPPLIER DUE DILIGENCE
            </span>
            <h1 class="editorial-hero__title">
              <span>Compare the plant.</span>
              <span class="editorial-hero__title-light">Verify the capability.</span>
            </h1>
            <p class="editorial-hero__sub">
              An AAC plant proposal is more than a machinery list. Compare the production basis, complete scope, operating evidence and accountability behind every offer.
            </p>

            <div class="editorial-hero__actions">
              <a href="#matrix" class="editorial-hero__btn-dark">
                <span>View Comparison Framework ↓</span>
              </a>
              <a href="${contactUrl}" class="editorial-hero__link-dark">
                <span>Request a Proposal Review ↗</span>
              </a>
            </div>

            <p style="font-size: 0.85rem; color: #64748b; margin: 0; font-weight: 500;">
              Designed for investors, technical teams and corporate purchase teams.
            </p>
          </div>
        </div>
      </section>

      <!-- ============ SECTION 01: THE DIRECT ANSWER ============ -->
      <section class="academy-section" id="principle">
        <div class="academy-section__inner">
          
          <!-- Top 2-Column Grid -->
          <div class="academy-compare-intro-grid">
            <div>
              <span class="academy-micro-label">
                THE DIRECT ANSWER
              </span>
              <h2 class="academy-compare-title">
                <span>Start with a common basis.</span>
                <span class="academy-compare-title-light">Not the final price.</span>
              </h2>
            </div>

            <div>
              <p class="academy-compare-lead">
                Compare AAC plant suppliers using the same production assumptions, equipment boundaries, automation definition, utility basis, manpower model, commissioning responsibility and acceptance conditions.
              </p>
              <p class="academy-compare-sub">
                A quotation becomes comparable only after its inclusions, exclusions and evidence are visible.
              </p>
            </div>
          </div>

          <!-- Bottom Statement Banner Strip -->
          <div class="academy-compare-statement-strip">
            <span class="academy-compare-statement-light">
              Price can be compared in one line.
            </span>
            <span class="academy-compare-statement-bold">
              Engineering capability cannot.
            </span>
          </div>

        </div>
      </section>

      <!-- ============ SECTION 02: A COMPLETE COMPARISON (TWELVE FACTORS) ============ -->
      <section class="academy-section academy-section--alt" id="matrix">
        <div class="academy-section__inner">
          
          <div class="academy-compare-header">
            <span class="academy-micro-label">
              A COMPLETE COMPARISON
            </span>
            <h2 class="academy-compare-title">
              <span>Twelve factors.</span>
              <span class="academy-compare-title-light">One accountable decision.</span>
            </h2>
            <p class="academy-compare-sub">
              Each factor connects a technical choice to commercial risk, operational stability or future flexibility.
            </p>
          </div>

          <!-- 12 Factor Horizontal Spec Rows -->
          <div class="academy-compare-spec-list">
            ${[
              { num: "01", title: "Production basis", desc: "Mould volume, batches, operating hours, density, product mix and saleable output." },
              { num: "02", title: "Equipment scope", desc: "Machinery, auxiliaries, controls, handling systems and battery limits." },
              { num: "03", title: "Automation boundary", desc: "Where manual intervention remains in normal operation and fault recovery." },
              { num: "04", title: "Utilities", desc: "Power, steam and water assumptions on the same production basis." },
              { num: "05", title: "Manpower", desc: "Operators, helpers, maintenance and supervision required per shift." },
              { num: "06", title: "Product mix & panels", desc: "Capability to produce reinforced ALC wall panels, lintels and varied block sizes." },
              { num: "07", title: "Manufacturing evidence", desc: "In-house heavy CNC fabrication, workshop testing, stress relieving and quality control." },
              { num: "08", title: "Operating references", desc: "Verifiable reference plants running for 3+ years with operating uptime data." },
              { num: "09", title: "Turnkey accountability", desc: "Civil foundation drawings, erection supervision, electrical integration and single-point responsibility." },
              { num: "10", title: "Performance acceptance", desc: "Contractual 72-hour continuous performance test (PG Test) linked to commercial handover." },
              { num: "11", title: "Service & lifecycle spares", desc: "Warranty terms, critical 2-year spare parts package, and on-site engineering SLA." },
              { num: "12", title: "Future expansion", desc: "Pre-engineered modular space and utility capacity for doubling throughput seamlessly." }
            ].map(f => `
              <div class="academy-compare-spec-row">
                <span class="academy-compare-spec-num">${f.num}</span>
                <h3 class="academy-compare-spec-title">${f.title}</h3>
                <p class="academy-compare-spec-desc">${f.desc}</p>
              </div>
            `).join('')}
          </div>

        </div>
      </section>

      <!-- ============ SECTION 04: EVALUATE (TURN EVERY PROMISE INTO EVIDENCE) ============ -->
      <section class="academy-section academy-section--dark" id="evaluate">
        <div class="academy-section__inner">
          
          <div class="academy-compare-header">
            <span class="academy-micro-label">
              EVALUATE
            </span>
            <h2 class="academy-compare-title academy-compare-title--white">
              <span>Turn every promise</span>
              <span class="academy-compare-title-light">into evidence.</span>
            </h2>
            <p class="academy-compare-sub academy-compare-sub--light">
              A supplier presentation can establish interest. It cannot replace measurable assumptions, physical verification or contractual clarity.
            </p>
          </div>

          <!-- 4 Evaluation Horizontal Spec Rows -->
          <div class="academy-compare-eval-list">
            ${[
              { num: "01", title: "Normalize the proposal", desc: "Place each offer into one scope-responsibility matrix. Record supply, erection, cabling, piping, integration, commissioning and testing for every plant section." },
              { num: "02", title: "Verify how capacity is calculated", desc: "Request mould volume, batches per hour, operating hours, pre-curing constraints, cutting cycle, autoclave loading, curing cycle and saleable-output assumptions." },
              { num: "03", title: "Map automation by function", desc: "Identify where operators initiate movement, confirm sequences, recover faults, record quality data or manually handle material. Compare functions—not labels." },
              { num: "04", title: "Use the same utility basis", desc: "Separate connected load from consumption. Compare power, steam, water and manpower for the same production, product mix and shift pattern." }
            ].map(item => `
              <div class="academy-compare-eval-row">
                <span class="academy-compare-eval-num">${item.num}</span>
                <h3 class="academy-compare-eval-title">${item.title}</h3>
                <p class="academy-compare-eval-desc">${item.desc}</p>
              </div>
            `).join('')}
          </div>

          <!-- Comparison Rule Box -->
          <div class="academy-compare-rule-box">
            <span class="academy-compare-rule-tag">
              COMPARISON RULE
            </span>
            <span class="academy-compare-rule-text">
              If two capacity or utility figures use different assumptions, they are not yet comparable.
            </span>
          </div>

        </div>
      </section>

      <!-- ============ SECTION 05: PHYSICAL VERIFICATION ============ -->
      <section class="academy-section academy-section--alt" id="verification">
        <div class="academy-section__inner">
          
          <div class="academy-compare-header">
            <span class="academy-micro-label">
              PHYSICAL VERIFICATION
            </span>
            <h2 class="academy-compare-title">
              <span>Visit the places</span>
              <span class="academy-compare-title-light">where claims become visible.</span>
            </h2>
          </div>

          <!-- 2-Column Split: Workshop vs Running Plant -->
          <div class="academy-compare-verify-grid">
            
            <!-- Left Column: Workshop -->
            <div class="academy-compare-verify-col">
              <span class="academy-compare-verify-tag">
                01 / WORKSHOP
              </span>
              <h3 class="academy-compare-verify-title">
                Inspect manufacturing capability
              </h3>
              <p class="academy-compare-sub" style="margin-bottom: 2rem;">
                A workshop visit should be an evidence review—not a visual judgement of size or housekeeping alone.
              </p>

              <!-- List of Items -->
              <div class="academy-compare-verify-list">
                ${[
                  "In-house and bought-out equipment scope",
                  "Fabrication, machining and assembly capability",
                  "Material traceability and inspection stages",
                  "Current workload and project resources",
                  "Testing and pre-dispatch practices"
                ].map(item => `
                  <div class="academy-compare-verify-item">
                    ${item}
                  </div>
                `).join('')}
              </div>

              <p style="font-size: 0.85rem; line-height: 1.6; color: #8d9ba8; margin: 2.5rem 0 0 0;">
                Do not infer financial strength from workshop appearance. That requires separate due diligence.
              </p>
            </div>

            <!-- Right Column: Running Plant -->
            <div class="academy-compare-verify-col">
              <span class="academy-compare-verify-tag">
                02 / RUNNING PLANT
              </span>
              <h3 class="academy-compare-verify-title">
                Verify operating performance
              </h3>
              <p class="academy-compare-sub" style="margin-bottom: 2rem;">
                Select references close to the proposed capacity, raw-material route, automation level, age and product mix.
              </p>

              <!-- List of Items -->
              <div class="academy-compare-verify-list">
                ${[
                  "Recorded production and saleable output",
                  "Manpower and manual interventions",
                  "Product quality and downtime records",
                  "Utility history where available",
                  "Service and spare-parts experience"
                ].map(item => `
                  <div class="academy-compare-verify-item">
                    ${item}
                  </div>
                `).join('')}
              </div>

              <p style="font-size: 0.85rem; line-height: 1.6; color: #8d9ba8; margin: 2.5rem 0 0 0;">
                Observe the plant, speak with the owner and operating team, then cross-check recollections with records.
              </p>
            </div>

          </div>

        </div>
      </section>

      <!-- ============ SECTION 05B: 12-POINT AUDIT CHECKLIST ============ -->
      <section class="academy-section academy-section--alt" id="checklist">
        <div class="academy-section__inner">
          
          <div class="academy-compare-header">
            <span class="academy-micro-label">
              INTERACTIVE AUDIT
            </span>
            <h2 class="academy-compare-title">
              <span>12-Point Due Diligence</span>
              <span class="academy-compare-title-light">Verification Checklist.</span>
            </h2>
            <p class="academy-compare-sub">
              Audit your supplier proposals against core engineering deliverables, performance guarantees, and operational benchmarks.
            </p>
          </div>

          <!-- Audit Progress Tracker -->
          <div class="academy-audit-tracker">
            <div class="academy-audit-tracker__top">
              <span id="audit-counter-text" class="academy-audit-tracker__count">0 of 12 Criteria Audited (0%)</span>
              <button id="btn-reset-audit" class="academy-audit-tracker__reset">Reset Checklist</button>
            </div>
            <div class="academy-audit-tracker__bar-bg">
              <div id="audit-progress-bar" class="academy-audit-tracker__bar-fill" style="width: 0%;"></div>
            </div>
          </div>

          <!-- Cards Grid -->
          <div class="academy-checklist-grid">
            ${cardsHTML}
          </div>

        </div>
      </section>

      <!-- ============ SECTION 06: DECIDE ============ -->
      <section class="academy-section" id="decide">
        <div class="academy-section__inner">
          
          <div class="academy-compare-header">
            <span class="academy-micro-label">
              DECIDE
            </span>
            <h2 class="academy-compare-title">
              <span>Choose the solution</span>
              <span class="academy-compare-title-light">whose responsibilities are clear.</span>
            </h2>
            <p class="academy-compare-sub">
              The objective is not to find the longest proposal. It is to find the configuration that fits your project and can be verified.
            </p>
          </div>

          <!-- Decision Table -->
          <div class="academy-compare-decide-table">
            
            <!-- Table Header -->
            <div class="academy-compare-decide-header">
              <span>DECISION AREA</span>
              <span>QUESTION TO ANSWER</span>
            </div>

            <!-- Table Rows -->
            ${[
              { area: "Technical fit", question: "Does the configuration suit the required products, raw materials and output?" },
              { area: "Evidence", question: "Which important claims are supported by documents or relevant operating plants?" },
              { area: "Scope completeness", question: "Are all equipment, services, interfaces and exclusions visible?" },
              { area: "Execution capability", question: "Are design, manufacturing, project and commissioning resources demonstrated?" },
              { area: "Lifecycle responsibility", question: "Are service, spares, training and documentation adequate?" },
              { area: "Contractual clarity", question: "Are performance obligations and acceptance conditions measurable?" },
              { area: "Future readiness", question: "Can the layout support realistic expansion or panel requirements?" }
            ].map(row => `
              <div class="academy-compare-decide-row">
                <h3 class="academy-compare-decide-name">
                  ${row.area}
                </h3>
                <p class="academy-compare-sub">
                  ${row.question}
                </p>
              </div>
            `).join('')}

          </div>

          <!-- Bottom Gate Decision Banner -->
          <div class="academy-compare-gate-banner">
            <div class="academy-compare-gate-title">
              Do not let a high total score hide a critical failure.
            </div>
            <div class="academy-compare-gate-text">
              Unsupported capacity, incomplete safety responsibility, unclear acceptance terms or an essential missing plant section should be treated as decision gates—not merely low-scoring items.
            </div>
          </div>

        </div>
      </section>

      <!-- ============ SECTION 07: BEFORE YOU FINALIZE (EIGHT RED FLAGS) ============ -->
      <section class="academy-section academy-section--alt" id="red-flags">
        <div class="academy-section__inner">
          
          <div class="academy-compare-split-layout">
            
            <!-- Left Column: Title -->
            <div>
              <span class="academy-micro-label">
                BEFORE YOU FINALIZE
              </span>
              <h2 class="academy-compare-title">
                <span>Eight red flags</span>
                <span class="academy-compare-title-light">worth stopping for.</span>
              </h2>
            </div>

            <!-- Right Column: 8 Red Flag Specification Rows -->
            <div style="border-top: 1px solid #eef2f6;">
              ${[
                { num: "01", text: "Capacity without cycle, operating-hour or saleable-output assumptions." },
                { num: "02", text: "‘Fully automatic’ without a process-level automation boundary." },
                { num: "03", text: "Utility or manpower savings without a comparable baseline." },
                { num: "04", text: "Project references without the supplier’s exact scope." },
                { num: "05", text: "Buyer-scope items without clear interface responsibility." },
                { num: "06", text: "Commissioning dependent on unnamed resources." },
                { num: "07", text: "No measurable performance test or acceptance protocol." },
                { num: "08", text: "Limited access to relevant customers or technical personnel." }
              ].map(flag => `
                <div class="academy-compare-spec-row" style="grid-template-columns: 45px 1fr;">
                  <span class="academy-compare-spec-num">${flag.num}</span>
                  <p class="academy-compare-sub" style="font-weight: 500; color: #334155;">
                    ${flag.text}
                  </p>
                </div>
              `).join('')}
            </div>

          </div>

        </div>
      </section>

      <!-- ============ SECTION 08: INVESTOR QUESTIONS (FAQ ACCORDION) ============ -->
      <section class="academy-section" id="faq">
        <div class="academy-section__inner">
          
          <div class="academy-compare-split-layout">
            
            <!-- Left Column: Title -->
            <div>
              <span class="academy-micro-label">
                INVESTOR QUESTIONS
              </span>
              <h2 class="academy-compare-title">
                <span>Clear answers.</span>
                <span class="academy-compare-title-light">Before commitment.</span>
              </h2>
            </div>

            <!-- Right Column: Accordion Questions -->
            <div style="border-top: 1px solid #eef2f6;">
              ${[
                {
                  q: "Should the lowest-priced AAC plant be rejected?",
                  a: "Not automatically. However, evaluate whether lower cost reflects genuine engineering optimization or hidden exclusions such as battery-limit piping, lower steel grade thickness, basic uncertified automation, missing safety interlocks, or outsourced commissioning responsibility."
                },
                {
                  q: "Is one running-plant visit sufficient?",
                  a: "Ideally, visit at least two plants: one recently commissioned (to observe modern build quality and technology) and one operating for 3+ years (to inspect long-term wear, cycle reliability, maintenance history, and structural integrity)."
                },
                {
                  q: "How can a buyer verify a ‘fully automatic’ claim?",
                  a: "Request a complete functional automation sequence diagram. Identify where manual intervention remains for mould opening, oiling, wire cleaning, scrap return, autoclave loading, and packaging. Automation should be evaluated by verified touchpoints, not catalog claims."
                },
                {
                  q: "What is the most important capacity question?",
                  a: "What is the guaranteed net saleable block volume (m³/day) after factoring in trimming, testing losses (2–3%), actual autoclave cycle time (10–12 hours), and specific raw-material curing behavior, rather than theoretical nominal cycle counts."
                },
                {
                  q: "Should commissioning remain with the equipment supplier?",
                  a: "Yes. Retaining single-point turnkey commissioning accountability with the OEM prevents multi-vendor blame games during trial runs and guarantees that performance acceptance milestones (PG Test) are contractually enforceable."
                },
                {
                  q: "Which reference plant is most useful?",
                  a: "A reference plant operating with similar raw material characteristics (fly ash source or sand quality), similar target capacity, and comparable automation levels. Speaking directly with the plant manager and maintenance engineer provides real operational feedback."
                }
              ].map(item => `
                <details style="border-bottom: 1px solid #eef2f6;" class="academy-faq-group">
                  <summary style="display: flex; justify-content: space-between; align-items: center; padding: 1.6rem 0; font-size: clamp(1.05rem, 1.25vw, 1.25rem); font-weight: 700; color: #07172c; cursor: pointer; list-style: none; user-select: none;">
                    <span>${item.q}</span>
                    <span style="font-size: 1.3rem; font-weight: 400; color: #026aa7; margin-left: 1rem; transition: transform 0.2s ease;">+</span>
                  </summary>
                  <div style="padding: 0 0 1.5rem 0; font-size: clamp(0.94rem, 1vw, 1rem); line-height: 1.65; color: #64748b;">
                    ${item.a}
                  </div>
                </details>
              `).join('')}
            </div>

          </div>

        </div>
      </section>

      <!-- ============ SECTION 09: BEFORE THE PURCHASE ORDER (CTA) ============ -->
      <section class="academy-section academy-section--dark" id="final-cta" style="text-align: center;">
        <div class="academy-section__inner">
          
          <div style="max-width: 860px; margin: 0 auto; text-align: center;">
            <span class="academy-micro-label" style="color: #38bdf8; margin-bottom: 1.5rem;">
              BEFORE THE PURCHASE ORDER
            </span>
            <h2 class="academy-compare-title academy-compare-title--white" style="text-align: center;">
              <span>Review the proposal.</span>
              <span class="academy-compare-title-light">Expose the assumptions.</span>
            </h2>
            <p class="academy-compare-sub academy-compare-sub--light" style="max-width: 720px; margin: 0 auto 2.5rem auto;">
              Share your proposed capacity, product mix and supplier scope sheets. Identify technical deviations, incomplete responsibilities and questions that should be resolved before finalization.
            </p>

            <div style="display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
              <a href="${contactUrl}" class="editorial-hero__btn-dark" style="background: #ffffff; color: #07172c !important; font-weight: 800;">
                <span>Request a Technical Proposal Review ↗</span>
              </a>
              <a href="#matrix" style="color: #ffffff !important; font-weight: 600; font-size: 0.92rem; text-decoration: underline; text-underline-offset: 4px;">
                Revisit the comparison framework ↑
              </a>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  function getVerifiedStorage() {
    try {
      return JSON.parse(localStorage.getItem('laxmi_verified_criteria') || '[]');
    } catch (e) {
      return [];
    }
  }

  function setVerifiedStorage(list) {
    try {
      localStorage.setItem('laxmi_verified_criteria', JSON.stringify(list));
    } catch (e) {}
  }

  function updateAuditProgressTracker() {
    const verified = getVerifiedStorage();
    const count = verified.length;
    const percent = Math.round((count / 12) * 100);
    const counterText = document.getElementById('audit-counter-text');
    const progressBar = document.getElementById('audit-progress-bar');
    if (counterText) {
      counterText.textContent = `${count} of 12 Criteria Audited (${percent}%)`;
    }
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }
  }

  function initChecklistListeners() {
    updateAuditProgressTracker();
    document.querySelectorAll('.academy-checklist-card').forEach(card => {
      const btn = card.querySelector('.academy-checklist-btn');
      const num = card.getAttribute('data-card-num');
      const badge = card.querySelector('.verification-badge');
      if (!btn) return;

      btn.addEventListener('click', function () {
        let verified = getVerifiedStorage();
        if (verified.includes(num)) {
          verified = verified.filter(n => n !== num);
          card.classList.remove('is-verified');
          btn.textContent = 'VERIFY CRITERION';
          if (badge) {
            badge.textContent = 'PENDING REVIEW';
            badge.style.color = '#8a9bb0';
          }
        } else {
          verified.push(num);
          card.classList.add('is-verified');
          btn.textContent = '✓ VERIFIED';
          if (badge) {
            badge.textContent = '✓ VERIFIED';
            badge.style.color = '#2e7d32';
          }
        }
        setVerifiedStorage(verified);
        updateAuditProgressTracker();
      });
    });

    const resetBtn = document.getElementById('btn-reset-audit');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        setVerifiedStorage([]);
        document.querySelectorAll('.academy-checklist-card').forEach(card => {
          card.classList.remove('is-verified');
          const btn = card.querySelector('.academy-checklist-btn');
          const badge = card.querySelector('.verification-badge');
          if (btn) btn.textContent = 'VERIFY CRITERION';
          if (badge) {
            badge.textContent = 'PENDING REVIEW';
            badge.style.color = '#8a9bb0';
          }
        });
        updateAuditProgressTracker();
      });
    }
  }

  function initFaqAccordionListeners() {
    document.querySelectorAll('.academy-faq-item').forEach(item => {
      const btn = item.querySelector('.academy-faq-question');
      const ans = item.querySelector('.academy-faq-answer');
      const icon = item.querySelector('.academy-faq-icon');
      if (!btn || !ans) return;

      btn.addEventListener('click', function () {
        const isOpen = ans.style.display === 'block';
        document.querySelectorAll('.academy-faq-answer').forEach(a => { a.style.display = 'none'; });
        document.querySelectorAll('.academy-faq-icon').forEach(i => { i.textContent = '+'; });

        if (!isOpen) {
          ans.style.display = 'block';
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  function renderFramework(page) {
    if (!page.framework) return '';
    const nodes = page.framework.heading ? page.framework.heading.split('→').map(n => n.trim()) : [];
    const flowHTML = nodes.map((node, i) => `
      <span class="academy-framework-node">${node}</span>
      ${i < nodes.length - 1 ? '<span class="academy-framework-arrow">→</span>' : ''}
    `).join('');

    return `
      <section class="academy-section" id="framework" style="padding-top: 2rem; padding-bottom: 4rem;">
        <div class="academy-section__inner">
          <div class="academy-framework-box">
            <div class="academy-micro-label" style="color: rgba(255,255,255,0.7); margin-bottom: 1.25rem;">
              STAGE ${page.stage} · STRATEGIC FRAMEWORK
            </div>
            <div class="academy-framework-flow">${flowHTML}</div>
            <p class="academy-framework-body">${page.framework.body}</p>
          </div>
        </div>
      </section>
    `;
  }

  function renderCheckpoint(page) {
    if (!page.next) return '';
    return `
      <section class="academy-section" id="next-step" style="padding-top: 2rem; padding-bottom: 4rem;">
        <div class="academy-section__inner">
          <div class="academy-checkpoint-box">
            <div>
              <div class="academy-micro-label" style="margin-bottom: 0.5rem;">NEXT ACADEMY STAGE</div>
              <h3 class="academy-checkpoint-title">${page.next.heading}</h3>
            </div>
            <a href="${page.next.url}" class="editorial-hero__btn-white" style="background: #07172c; color: #ffffff; padding: 1rem 2rem; font-size: 0.9rem;">
              ${page.next.label}
            </a>
          </div>
        </div>
      </section>
    `;
  }

  function renderCTA(shared) {
    let contactUrl = window.location.pathname.includes('/academy/') ? '../contact.html' : 'contact.html';
    let engCenterUrl = window.location.pathname.includes('/academy/') ? '../engineering-center.html' : 'engineering-center.html';

    return `
      <section class="academy-cta-banner" id="academy-cta">
        <div class="academy-cta-banner__inner">
          <div class="academy-cta-grid">
            
            <div class="academy-cta-left">
              <span class="academy-cta-banner__eyebrow">TALK TO LAXMI ENGINEERS</span>
              <h2 class="academy-cta-banner__title">Ready to Set Up Your <span class="academy-cta-highlight">AAC Manufacturing Plant?</span></h2>
              <p class="academy-cta-banner__lead">Laxmi En-Fab provides end-to-end plant engineering, raw material XRF assay testing, and automated turnkey commissioning.</p>
              
              <div class="academy-cta-banner__badges">
                <span class="academy-cta-badge">✓ 150+ Plant Installations</span>
                <span class="academy-cta-badge">✓ Raw Material XRF Lab</span>
                <span class="academy-cta-badge">✓ Turnkey EPC Execution</span>
                <span class="academy-cta-badge">✓ 24/7 Field Engineering</span>
              </div>

              <div class="academy-cta-banner__actions">
                <a href="${contactUrl}" class="academy-cta-banner__btn-white">
                  <span>TALK TO AN EXPERT</span>
                  <span class="academy-cta-banner__arrow">↗</span>
                </a>
                <a href="${engCenterUrl}" class="academy-cta-banner__link-secondary">
                  Explore Engineering Center →
                </a>
              </div>
            </div>

            <div class="academy-cta-right">
              <div class="academy-cta-card">
                <div class="academy-cta-card__header">
                  <span class="academy-cta-card__tag">DIRECT ADVISORY DESK</span>
                  <h3 class="academy-cta-card__title">Connect with Senior Engineers</h3>
                </div>

                <div class="academy-cta-card__items">
                  <div class="academy-cta-card__item">
                    <div class="academy-cta-card__icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <span class="academy-cta-card__label">Direct Advisory Hotline</span>
                      <a href="tel:+919825025247" class="academy-cta-card__val">+91 98250 25247</a>
                    </div>
                  </div>

                  <div class="academy-cta-card__item">
                    <div class="academy-cta-card__icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    </div>
                    <div>
                      <span class="academy-cta-card__label">Project Feasibility &amp; DPR</span>
                      <a href="mailto:sales@laxmienfab.com" class="academy-cta-card__val">sales@laxmienfab.com</a>
                    </div>
                  </div>

                  <div class="academy-cta-card__item">
                    <div class="academy-cta-card__icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <span class="academy-cta-card__label">Heavy Manufacturing Hub</span>
                      <span class="academy-cta-card__val">Ahmedabad, Gujarat, India</span>
                    </div>
                  </div>
                </div>

                <div class="academy-cta-card__footer">
                  <div class="academy-cta-card__sla">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                    <span>Initial feasibility &amp; layout turnaround within 48 hours</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;
  }

  function renderTopicsFallback(page) {
    return '';
  }

  function initTopicListenersFallback(page) {}

  function renderErrorFallback() {
    return `
      <div style="padding: 6rem 1.5rem; text-align: center; color: #07172c;">
        <h2 style="font-size: 1.8rem; margin-bottom: 1rem;">Content Unavailable</h2>
        <p style="color: #64748b; margin-bottom: 2rem;">We could not load the requested academy stage data. Please refresh or return to the main academy.</p>
        <a href="academy.html" class="editorial-btn-primary">RETURN TO AAC INVESTOR ACADEMY →</a>
      </div>
    `;
  }

  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.academy-stage-card, .academy-checklist-card').forEach(el => {
      observer.observe(el);
    });
  }

})();
