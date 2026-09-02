/* ==========================================================================
   Laxmi En-Fab Pvt. Ltd. — AAC Investor Academy Inner Pages Controller
   Architecture: Reusable Vanilla JS Engine powered by laxmi-aac-investor-academy.json
   ========================================================================== */

(function () {
  'use strict';

  // Approved Laxmi Visual Image Mapping per Stage
  const STAGE_IMAGES = {
    'understand-market': 'assets/images/why-aac.png',
    'design-your-plant': 'assets/images/land-requirement.png',
    'compare-your-aac-plant': 'assets/images/plant-automation.png',
    'efficient-your-plant': 'assets/images/production-process.png',
    'expand-your-plant': 'assets/images/future-of-aac.png'
  };

  const STAGE_SHORT_TITLES = {
    'understand-market': '01 MARKET',
    'design-your-plant': '02 DESIGN',
    'compare-your-aac-plant': '03 COMPARE',
    'efficient-your-plant': '04 EFFICIENT',
    'expand-your-plant': '05 EXPAND'
  };

  document.addEventListener('DOMContentLoaded', initAcademyInnerPage);

  async function initAcademyInnerPage() {
    const root = document.getElementById('academy-root');
    if (!root) return;

    // Detect Page Slug
    const bodyPage = document.body.getAttribute('data-academy-page');
    const pathSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const currentSlug = bodyPage || pathSlug || 'understand-market';

    try {
      // Fetch JSON data with fallback paths
      let data = null;
      try {
        const res = await fetch('data/laxmi-aac-investor-academy.json');
        if (res.ok) data = await res.json();
      } catch (e) {
        console.warn('Primary JSON path failed, trying fallback...', e);
      }

      if (!data) {
        const res2 = await fetch('data/academy-data.json');
        if (res2.ok) data = await res2.json();
      }

      if (!data || !data.pages) {
        throw new Error('Academy JSON data could not be parsed.');
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

      // Render Complete Page
      root.innerHTML = `
        ${renderStageNavRail(data.pages, page.slug)}
        ${renderHero(page)}
        ${renderIntro(page)}
        ${page.slug === 'compare-your-aac-plant' ? renderComparison(page) : renderTopics(page)}
        ${renderFramework(page)}
        ${renderCheckpoint(page)}
        ${renderRelatedLinks(page)}
        ${renderCTA(data.shared)}
      `;

      // Attach Interactive Listeners
      if (page.slug === 'compare-your-aac-plant') {
        initChecklistListeners();
      } else {
        initTopicListeners();
      }

      initScrollAnimations();

    } catch (err) {
      console.error('Laxmi AAC Investor Academy Render Error:', err);
      root.innerHTML = renderErrorFallback();
    }
  }

  // 00. Stage Navigation Rail
  function renderStageNavRail(pages, currentSlug) {
    const itemsHTML = pages.map(p => {
      const activeClass = p.slug === currentSlug ? 'is-active' : '';
      const shortTitle = STAGE_SHORT_TITLES[p.slug] || p.title;
      return `<a href="${p.url}" class="academy-nav-rail__item ${activeClass}">${shortTitle}</a>`;
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

  // 01. Hero Section
  function renderHero(page) {
    const heroImg = STAGE_IMAGES[page.slug] || 'assets/images/future-of-aac.png';
    const eyebrow = page.hero ? page.hero.eyebrow : `STAGE ${page.stage} / ${page.title.toUpperCase()}`;
    const headline = page.hero ? page.hero.headline : page.title;
    const subheadline = page.hero ? page.hero.subheadline : page.purpose;
    const ctaText = page.hero ? page.hero.cta : 'EXPLORE STAGE';

    return `
      <section class="editorial-about-hero" id="hero">
        <div class="editorial-about-hero__inner">
          
          <!-- Left: Text Area -->
          <div class="editorial-about-hero__content">
            <span class="editorial-eyebrow editorial-eyebrow--gold">${eyebrow}</span>
            <h1 class="editorial-about-hero__title">
              ${headline}
            </h1>
            <p class="editorial-about-hero__lead">
              ${subheadline}
            </p>
            <div class="editorial-about-hero__actions">
              <a href="#intro" class="editorial-btn-primary">
                ${ctaText} <span class="btn-arrow">↓</span>
              </a>
              ${page.next ? `
                <a href="${page.next.url}" class="editorial-btn-outline">
                  Next: ${page.next.label} <span class="btn-arrow">→</span>
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
                AAC INVESTOR STAGE ${page.stage}
              </div>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  // 02. Introduction Section
  function renderIntro(page) {
    if (!page.intro) return '';
    return `
      <section class="academy-section" id="intro">
        <div class="academy-section__inner">
          <div class="academy-micro-label">STAGE ${page.stage} · DECISION CONTEXT</div>
          <div class="academy-intro-grid">
            <h2 class="academy-intro-heading">
              ${page.intro.heading}
            </h2>
            <div class="academy-intro-body">
              <p style="margin: 0;">${page.intro.body}</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 03. Main Topics Section (for Stages 01, 02, 04, 05)
  function renderTopics(page) {
    if (!page.topics || !page.topics.length) return '';

    const navItems = page.topics.map((t, idx) => `
      <button class="academy-topic-item ${idx === 0 ? 'is-active' : ''}" data-topic-id="${t.id}" aria-expanded="${idx === 0}">
        <span class="academy-topic-item__num">${t.number}</span>
        <span class="academy-topic-item__title">${t.title}</span>
      </button>
    `).join('');

    const firstTopic = page.topics[0];
    const pointsHTML = firstTopic.points ? firstTopic.points.map(p => `
      <li class="academy-topic-panel__point">
        <span class="academy-topic-panel__point-icon">✓</span>
        <span>${p}</span>
      </li>
    `).join('') : '';

    return `
      <section class="academy-section academy-section--alt" id="topics">
        <div class="academy-section__inner">
          <div class="academy-micro-label">STAGE ${page.stage} · KEY DECISION TOPICS</div>
          
          <div class="academy-topics-layout">
            <!-- Left Topic Navigation -->
            <div class="academy-topic-nav" role="tablist">
              ${navItems}
            </div>

            <!-- Right Detail Display Panel -->
            <div class="academy-topic-panel" id="topic-panel-container">
              <div class="academy-topic-panel__header">
                <span class="academy-topic-panel__stage" id="panel-topic-num">TOPIC ${firstTopic.number}</span>
                <h3 class="academy-topic-panel__title" id="panel-topic-title">${firstTopic.title}</h3>
                <p class="academy-topic-panel__summary" id="panel-topic-summary">${firstTopic.summary}</p>
              </div>

              <ul class="academy-topic-panel__points" id="panel-topic-points">
                ${pointsHTML}
              </ul>

              <div style="padding-top: 1.25rem; border-top: 1px solid rgba(7,23,44,0.08); font-size: 0.82rem; font-weight: 800; letter-spacing: 0.08em; color: var(--laxmi-blue, #0b3f78); display: flex; align-items: center; justify-content: space-between;">
                <span id="panel-topic-footer">INVESTOR DECISION CHECK POINT</span>
                <span>SELECT TOPICS TO EXPLORE →</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // Topic Switch Listener Function
  function initTopicListeners() {
    const buttons = document.querySelectorAll('.academy-topic-item');
    const panelNum = document.getElementById('panel-topic-num');
    const panelTitle = document.getElementById('panel-topic-title');
    const panelSummary = document.getElementById('panel-topic-summary');
    const panelPoints = document.getElementById('panel-topic-points');

    if (!buttons.length || !panelTitle) return;

    // Get current page topic data from window context or global store
    const bodyPage = document.body.getAttribute('data-academy-page');
    const pathSlug = window.location.pathname.split('/').pop().replace('.html', '');
    const currentSlug = bodyPage || pathSlug || 'understand-market';

    fetch('data/laxmi-aac-investor-academy.json')
      .then(res => res.json())
      .then(data => {
        const page = data.pages.find(p => p.slug === currentSlug);
        if (!page || !page.topics) return;

        buttons.forEach(btn => {
          btn.addEventListener('click', function () {
            buttons.forEach(b => {
              b.classList.remove('is-active');
              b.setAttribute('aria-expanded', 'false');
            });
            this.classList.add('is-active');
            this.setAttribute('aria-expanded', 'true');

            const topicId = this.getAttribute('data-topic-id');
            const target = page.topics.find(t => t.id === topicId);

            if (target) {
              if (panelNum) panelNum.textContent = `TOPIC ${target.number}`;
              if (panelTitle) panelTitle.textContent = target.title;
              if (panelSummary) panelSummary.textContent = target.summary;

              if (panelPoints && target.points) {
                panelPoints.innerHTML = target.points.map(p => `
                  <li class="academy-topic-panel__point">
                    <span class="academy-topic-panel__point-icon">✓</span>
                    <span>${p}</span>
                  </li>
                `).join('');
              }
            }
          });
        });
      })
      .catch(e => console.warn('Topic listener fetch info error:', e));
  }

  // 03 (Special Case). Investor Comparison Checklist (for Stage 03 `compare-your-aac-plant`)
  function renderComparison(page) {
    if (!page.criteria) return '';

    const verifiedList = getVerifiedStorage();

    const cardsHTML = page.criteria.map(c => {
      const isVerified = verifiedList.includes(c.number);
      return `
        <div class="academy-checklist-card ${isVerified ? 'is-verified' : ''}" data-criteria-num="${c.number}">
          <div>
            <div class="academy-checklist-card__header">
              <span class="academy-checklist-card__num">CRITERION ${c.number}</span>
              <span class="verification-badge" style="font-size: 0.72rem; font-weight: 800; color: ${isVerified ? '#2e7d32' : '#8a9bb0'};">
                ${isVerified ? '✓ VERIFIED' : 'PENDING REVIEW'}
              </span>
            </div>
            <h3 class="academy-checklist-card__title">${c.title}</h3>
            <p class="academy-checklist-card__question">"${c.question}"</p>
          </div>
          <button class="academy-checklist-btn" aria-label="Toggle verification for ${c.title}">
            ${isVerified ? '✓ VERIFIED' : 'VERIFY CRITERION'}
          </button>
        </div>
      `;
    }).join('');

    const noteText = page.checklist ? page.checklist.note : "The checklist is for the investor's own comparison.";

    return `
      <section class="academy-section academy-section--alt" id="comparison">
        <div class="academy-section__inner">
          <div class="academy-micro-label">STAGE 03 · INVESTOR COMPARISON CHECKLIST</div>
          <h2 style="font-size: clamp(2rem, 3.2vw, 2.8rem); font-weight: 900; color: #07172c; margin-bottom: 0.75rem;">
            Evaluate plant options systematically.
          </h2>
          <p style="font-size: 1.05rem; color: #52677d; max-width: 800px; margin-bottom: 2.5rem;">
            Use this interactive verification matrix during supplier discussions to ensure project scope, automation, engineering, and long-term support are thoroughly evaluated.
          </p>

          <div class="academy-checklist-grid">
            ${cardsHTML}
          </div>

          <div class="academy-checklist-note">
            📌 <strong>Note for Investors:</strong> ${noteText}
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

  function initChecklistListeners() {
    const cards = document.querySelectorAll('.academy-checklist-card');
    cards.forEach(card => {
      const btn = card.querySelector('.academy-checklist-btn');
      const num = card.getAttribute('data-criteria-num');
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
      });
    });
  }

  // 04. Framework Banner
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
            <div class="academy-framework-flow">
              ${flowHTML}
            </div>
            <p class="academy-framework-body">
              ${page.framework.body}
            </p>
          </div>
        </div>
      </section>
    `;
  }

  // 05. Stage Checkpoint Section
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

  // 06. Related Links Section
  function renderRelatedLinks(page) {
    if (!page.related || !page.related.length) return '';

    const linksHTML = page.related.map(r => `
      <a href="${r.url}" class="academy-related-link">
        ${r.label} <span style="font-size: 1.1rem;">→</span>
      </a>
    `).join('');

    return `
      <section class="academy-section" style="padding-top: 1rem; padding-bottom: 4rem;">
        <div class="academy-section__inner">
          <div class="academy-micro-label" style="margin-bottom: 0.75rem;">CONNECTED ENGINEERING PATHS</div>
          <div class="academy-related-links">
            ${linksHTML}
          </div>
        </div>
      </section>
    `;
  }

  // 07. Final Conversion CTA Section
  function renderCTA(sharedData) {
    const primaryLabel = sharedData && sharedData.footer_cta && sharedData.footer_cta.primary ? sharedData.footer_cta.primary.label : 'TALK TO LAXMI';
    const primaryUrl = sharedData && sharedData.footer_cta && sharedData.footer_cta.primary ? sharedData.footer_cta.primary.url : '/contact.html';
    const secondaryLabel = sharedData && sharedData.footer_cta && sharedData.footer_cta.secondary ? sharedData.footer_cta.secondary.label : 'EXPLORE SOLUTIONS';
    const secondaryUrl = sharedData && sharedData.footer_cta && sharedData.footer_cta.secondary ? sharedData.footer_cta.secondary.url : '/solutions.html';

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
            READY TO TURN <br><span class="machinery-cta__title-light">KNOWLEDGE INTO ACTION?</span>
          </h2>
          <p class="machinery-cta__sub">
            Move from informed decisions to the plant, engineering and equipment behind the project.
          </p>
          <div class="machinery-cta__action">
            <a href="${primaryUrl}" class="editorial-hero__btn-white">
              ${primaryLabel} <span class="editorial-hero__btn-arrow">↗</span>
            </a>
            <a href="${secondaryUrl}" class="editorial-hero__link-text">
              ${secondaryLabel} <span class="editorial-hero__btn-arrow">→</span>
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
      <section class="academy-section" style="padding: 8rem 1.5rem; text-align: center;">
        <div class="academy-section__inner" style="max-width: 680px;">
          <div class="academy-micro-label" style="justify-content: center; color: #d32f2f;">ACADEMY SYSTEM NOTICE</div>
          <h1 style="font-size: 2.2rem; font-weight: 900; color: #07172c; margin-bottom: 1rem;">
            Unable to load Academy Content.
          </h1>
          <p style="font-size: 1rem; color: #52677d; line-height: 1.6; margin-bottom: 2rem;">
            The JSON content source could not be loaded. Please ensure data/laxmi-aac-investor-academy.json is available.
          </p>
          <a href="academy.html" class="editorial-hero__btn-white" style="background: #07172c; color: #ffffff; padding: 0.85rem 1.75rem;">
            RETURN TO ACADEMY HOME →
          </a>
        </div>
      </section>
    `;
  }

  // Scroll Animations using IntersectionObserver
  function initScrollAnimations() {
    if ('matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Skip animation when reduced motion is preferred
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.academy-section, .academy-checklist-card, .academy-topic-panel').forEach(el => {
      observer.observe(el);
    });
  }

})();
