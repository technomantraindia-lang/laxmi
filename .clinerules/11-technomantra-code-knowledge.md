# Technomantra Local Code Knowledge Graph (V4.8.14)

> Structural local index. Read current source before editing. Secrets are intentionally excluded.

- Indexed source files: 33
- Structural edges: 27
- Matched end-to-end flows: 0
- Updated: 2026-09-02T12:28:19.203Z

## Frontend API calls
- API GET /components/header.html <- js/components.js
- API GET /components/footer.html <- js/components.js
- API GET /data/laxmi-aac-investor-academy.json <- js/academy.js
- API GET /data/academy-data.json <- js/academy.js
- API GET /data/laxmi-solutions-inner-pages.json <- js/solution.js

## Dependency edges
- IMPORT components/header.html -> css/variables.css, css/main.css, css/components.css, css/responsive.css, js/components.js, js/navigation.js
- IMPORT machinery-equipment.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT components/footer.html -> css/variables.css, css/main.css, css/components.css
- IMPORT plant-layout.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT aac-block-panel-plant.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/solution.css, css/responsive.css, js/main.js, js/navigation.js
- IMPORT about-us.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT academy.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT compare-your-aac-plant.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/academy.css, css/responsive.css, js/main.js, js/navigation.js
- IMPORT contact.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT design-your-plant.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/academy.css, css/responsive.css, js/main.js, js/navigation.js
- IMPORT dry-mix-mortar-plant.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/solution.css, css/responsive.css, js/main.js, js/navigation.js
- IMPORT efficient-your-plant.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/academy.css, css/responsive.css, js/main.js, js/navigation.js
- IMPORT engineering-center.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT expand-your-plant.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/academy.css, css/responsive.css, js/main.js, js/navigation.js
- IMPORT knowledge-hub.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT production-process.html -> css/variables.css, css/main.css, css/components.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js, js/components.js
- IMPORT projects.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT solutions.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js
- IMPORT understand-market.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/academy.css, css/responsive.css, js/main.js, js/navigation.js
- IMPORT why-laxmi.html -> css/variables.css, css/main.css, css/components.css, css/homepage.css, css/responsive.css, js/main.js, js/navigation.js, js/animations.js

## Database references
- DB js/academy.js -> SEO, window, ACTION, informed
- DB js/solution.js -> SEO, one

## Symbols
- SYMBOL js/components.js: mountHeader, mountFooter, injectHeader, injectFooter, initDropdowns, initMobileMenu, highlightActivePage
- SYMBOL js/academy.js: initAcademyInnerPage, renderStageNavRail, renderHero, renderIntro, renderTopics, initTopicListeners, renderComparison, getVerifiedStorage, setVerifiedStorage, initChecklistListeners
- SYMBOL js/animations.js: initAnimations
- SYMBOL js/main.js: initCredibilitySwitcher, initInvestmentSwitcher, initMachineryRailSlider, startAutoSlide, initAll
- SYMBOL js/navigation.js: initNavigation
- SYMBOL js/solution.js: initSolutionInnerPage, renderSolutionNavRail, renderHero, renderIntro, renderProductionJourney, initJourneyListeners, renderSystemView, renderProducts, renderSolutionFocus, renderMachineryStory

## UI/style selectors
- UI components/header.html: #site-header, #site-nav, #nav-dropdown-solutions, #nav-dropdown-academy, #nav-burger, .site-header, .site-header__inner, .site-header__brand, .site-header__logo, .site-header__nav, .nav-list, .nav-item, .nav-link, .nav-item--dropdown
- UI machinery-equipment.html: #site-header, #main-content, #hero, #journey, #machinery-rail-nav, #material, #batching, #cutting, #autoclave, #proof, #catalog, #cta, #site-footer, .machinery-page
- UI css/homepage.css: #f0f7ff, #dbeafe, #b98a2f, #ffffff, .credibility__heading, .journey-section__heading, .investment-section__heading, .facility-story__heading, .system-section__heading, .execution-section__heading, .academy-section__heading, .machinery-section__heading, .machinery-stage__title, .machinery-catalog__title
- UI components/footer.html: #site-footer, .site-footer, .site-footer__main, .site-footer__inner, .footer-col, .footer-col--brand, .footer-brand, .footer-logo, .footer-tagline, .footer-desc, .footer-guarantee-badge, .badge-dot, .footer-col__title, .footer-links
- UI css/components.css: .site-header, .site-header--scrolled, #ffffff, .site-header__inner, .site-header__brand, .site-header__logo, .site-header__nav, .nav-list, .nav-item, .nav-link, .nav-link--toggle, .nav-caret, .nav-dropdown, .dropdown-item__title
- UI plant-layout.html: #site-header, #main-content, #hero, #glance, #interactive-layout, #layout-viewer-container, #zoom-level-text, #zoom-in-btn, #zoom-out-btn, #zoom-reset-btn, #layout-viewport, #layout-canvas, #layout-status-label, #zones
- UI aac-block-panel-plant.html: #site-header, #solution-root, #site-footer, .solution-inner-body
- UI about-us.html: #site-header, #main-content, #hero, #the-company, #facility, #manufacturing, #engineering, #expertise, #projects, #quality, #why-laxmi, #final-cta, #site-footer, .about-page
- UI academy.html: #site-header, #main-content, #hero, #intro, #journey, #transition, #knowledge-to-plant, #continuation, #cta, #site-footer, .academy-page, .editorial-about-hero, .editorial-about-hero__inner, .editorial-about-hero__content
- UI compare-your-aac-plant.html: #site-header, #academy-root, #site-footer, .academy-inner-body
- UI contact.html: #site-header, #main-content, #hero, #direct-contact, #enquiry-section, #b2b-contact-form, #form-name, #error-name, #form-company, #error-company, #form-email, #error-email, #form-phone, #error-phone
- UI css/academy.css: .academy-inner-body, #ffffff, .academy-nav-rail, .academy-nav-rail__inner, .academy-nav-rail__items, .academy-nav-rail__item, .academy-nav-rail__num, .academy-section, .academy-section--alt, #f5f7fa, .academy-section--dark, .academy-section__inner, .academy-micro-label, .academy-intro-grid
- UI css/main.css: #ffffff, .home-hero, .home-hero__content, .home-hero__video, .home-hero__overlay, .eyebrow, #f0f7ff, #dbeafe, .section__heading, .section, .final-cta, .action-row, .btn-brand, .btn-outline
- UI css/responsive.css: .machinery-hero__inner, .machinery-hero__hud, .machinery-card-grid, .machinery-card-grid--two, .machinery-proof__grid, .machinery-catalog__grid, .machinery-stage__inner, .machinery-proof__inner, .machinery-catalog__inner, .machinery-hero__actions
- UI css/solution.css: .solution-inner-body, #ffffff, .solution-nav-rail, .solution-nav-rail__inner, .solution-nav-rail__items, .solution-nav-rail__item, .solution-section, .solution-section--alt, #f5f7fa, .solution-section--dark, .solution-section__inner, .solution-micro-label, .solution-intro-grid, .solution-intro-statement
- UI design-your-plant.html: #site-header, #academy-root, #site-footer, .academy-inner-body
- UI dry-mix-mortar-plant.html: #site-header, #solution-root, #site-footer, .solution-inner-body
- UI efficient-your-plant.html: #site-header, #academy-root, #site-footer, .academy-inner-body
- UI engineering-center.html: #site-header, #main-content, #hero, #process, #layout, #integration, #proof, #cta, #site-footer, .engineering-page, .editorial-about-hero, .editorial-about-hero__inner, .editorial-about-hero__content, .editorial-eyebrow
- UI expand-your-plant.html: #site-header, #academy-root, #site-footer, .academy-inner-body
