/* ==========================================================================
   Laxmi En-Fab Pvt. Ltd. — Why Laxmi Testimonials Inner Pages Controller
   Architecture: Reusable Vanilla JS Engine powered by laxmi-why-laxmi-testimonials.json
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
      // Handles '1', '01', 'testimonial-1', etc.
      const cleanNum = paramId.replace(/^testimonial-/, '');
      return cleanNum.padStart(2, '0');
    }
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) {
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

      // Find the matching testimonial by number or id
      const t = data.testimonials.find(item => item.number === currentNumber || item.id === `testimonial-${parseInt(currentNumber, 10)}`)
             || data.testimonials[0];

      // SEO update
      if (t.seo) {
        document.title = t.seo.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', t.seo.description || '');
      }

      // Build breadcrumb
      const breadcrumb = document.getElementById('breadcrumb-mount');
      if (breadcrumb) {
        breadcrumb.innerHTML = `
          <nav class="site-breadcrumb" aria-label="Breadcrumb">
            <div class="site-breadcrumb__inner">
              <a href="index.html">Home</a>
              <span class="bc-sep">/</span>
              <a href="why-laxmi.html">Why Laxmi</a>
              <span class="bc-sep">/</span>
              <span class="bc-current">${escHtml(t.title)}</span>
            </div>
          </nav>`;
      }

      // Render full page
      root.innerHTML = `
        ${renderSideNav(data.testimonials, t.id)}
        ${renderHero(t)}
        ${renderOverview(t)}
        ${renderFullStory(t)}
        ${renderCTA(data.shared)}
      `;

      // Scroll to top of content smoothly
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Scroll-reveal
      requestAnimationFrame(() => {
        document.querySelectorAll('[data-reveal]').forEach((el, i) => {
          setTimeout(() => el.classList.add('is-revealed'), i * 80);
        });
      });

    } catch (err) {
      console.error('Testimonial renderer error:', err);
      root.innerHTML = `<div style="padding:80px 24px;text-align:center;color:#07172c;"><p>Content could not be loaded. Please refresh.</p></div>`;
    }
  }

  /* ── Side Nav ─────────────────────────────────────────── */
  function renderSideNav(testimonials, currentId) {
    const items = testimonials.map(t => `
      <li class="t-nav__item ${t.id === currentId ? 'is-active' : ''}">
        <a href="${escHtml(t.url)}" class="t-nav__link">
          <span class="t-nav__num">${escHtml(t.number)}</span>
          <span class="t-nav__label">${escHtml(t.title)}</span>
        </a>
      </li>`).join('');

    return `
      <div class="t-page-wrap">
        <aside class="t-side-nav">
          <div class="t-side-nav__header">
            <span class="editorial-eyebrow editorial-eyebrow--gold">WHY LAXMI</span>
            <a href="why-laxmi.html" class="t-side-nav__back">← All Case Studies</a>
          </div>
          <ul class="t-nav__list">${items}</ul>
        </aside>
        <div class="t-page-content">`;
  }

  /* ── Hero ─────────────────────────────────────────────── */
  function renderHero(t) {
    return `
      <section class="t-hero" data-reveal>
        <div class="t-hero__inner">
          <div class="t-hero__meta">
            <span class="testimonial-badge">${escHtml(t.badge)}</span>
            ${t.verified ? `<span class="testimonial-verified-tag">&#10003; Verified Customer Certificate</span>` : ''}
          </div>
          <span class="editorial-eyebrow editorial-eyebrow--gold">${escHtml(t.hero.eyebrow)}</span>
          <h1 class="t-hero__headline">${escHtml(t.hero.headline)}</h1>
          <p class="t-hero__subheadline">${escHtml(t.hero.subheadline)}</p>
          <p class="t-hero__subtitle">${escHtml(t.subtitle)}</p>
        </div>
      </section>`;
  }

  /* ── Overview (Part 1) ────────────────────────────────── */
  function renderOverview(t) {
    const ov = t.overview;
    const bodyParas = ov.body.map(p => `<p class="testimonial-body-text">${escHtml(p)}</p>`).join('');
    return `
      <section class="t-overview-section" data-reveal>
        <div class="t-overview-section__inner">
          <h2 class="t-section-heading">${escHtml(ov.heading)}</h2>
          <blockquote class="testimonial-quote-lead">${escHtml(ov.quote)}</blockquote>
          ${bodyParas}
          <div class="testimonial-author-box">
            <span class="testimonial-author__name">${escHtml(ov.author)}</span>
            <span class="testimonial-author__role">${escHtml(ov.author_role)}</span>
          </div>
        </div>
      </section>`;
  }

  /* ── Full Story (Part 2) + Specs ─────────────────────── */
  function renderFullStory(t) {
    const fs = t.full_story;
    const ps = t.project_specs;

    const paras = fs.paragraphs.map(p => `<p class="testimonial-body-text">${escHtml(p)}</p>`).join('');

    const highlights = fs.highlights && fs.highlights.length
      ? `<ul class="t-highlights-list">${fs.highlights.map(h => `<li>${escHtml(h)}</li>`).join('')}</ul>`
      : '';

    const specItems = ps.items.map(item =>
      `<li><span>${escHtml(item.label)}</span><strong>${escHtml(item.value)}</strong></li>`
    ).join('');

    return `
      <section class="t-full-story-section" data-reveal>
        <div class="testimonial-card__details-grid">

          <!-- Main Story -->
          <div class="testimonial-card__main-story">
            <h2 class="t-section-heading">${escHtml(fs.heading)}</h2>
            ${paras}
            ${highlights}
            <blockquote class="testimonial-quote-lead t-closing-quote">
              &#8220;${escHtml(fs.closing_quote)}&#8221;
              <footer>
                ${escHtml(fs.closing_author)}<br>
                <span class="t-closing-role">${escHtml(fs.closing_role)}</span>
              </footer>
            </blockquote>
          </div>

          <!-- Verified Specs Sidebar -->
          <div class="testimonial-card__sidebar">
            <div class="verified-specs-card">
              <h3 class="verified-specs-card__title">${escHtml(ps.title)}</h3>
              <ul class="verified-specs-list">${specItems}</ul>
              <p class="verified-specs-card__footer">${escHtml(ps.disclaimer)}</p>
            </div>
          </div>

        </div>
      </section>
    </div><!-- /.t-page-content -->
  </div><!-- /.t-page-wrap -->`;
  }

  /* ── CTA ──────────────────────────────────────────────── */
  function renderCTA(shared) {
    return `
      <section class="editorial-about-cta">
        <div class="editorial-about-cta__inner" data-reveal>
          <span class="editorial-eyebrow editorial-eyebrow--gold">NEXT STEP</span>
          <h2 class="editorial-about-cta__title">Ready to build your AAC plant with Laxmi?</h2>
          <p class="editorial-about-cta__sub">
            Speak with Laxmi's engineering team about your project requirements.
          </p>
          <div class="editorial-about-cta__actions">
            <a href="${escHtml(shared.footer_cta.primary.url)}" class="editorial-btn-gold">
              ${escHtml(shared.footer_cta.primary.label)} <span class="btn-arrow">→</span>
            </a>
            <a href="${escHtml(shared.footer_cta.secondary.url)}" class="editorial-btn-outline">
              ${escHtml(shared.footer_cta.secondary.label)} <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </section>`;
  }

  /* ── Utilities ─────────────────────────────────────────── */
  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

})();
