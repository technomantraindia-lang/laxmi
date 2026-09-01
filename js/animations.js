/**
 * Laxmi En-Fab - Homepage Scroll Animations & Section Reveals
 */
(function () {
  'use strict';

  function initAnimations() {
    // 1. Trigger Hero entrance animations
    var hero = document.querySelector('.editorial-hero') || document.getElementById('hero');
    if (hero) {
      // Small timeout ensures CSS transitions trigger smoothly after render
      setTimeout(function () {
        hero.classList.add('is-loaded');
      }, 50);
    }

    // 2. Setup IntersectionObserver for reveal elements
    var revealElements = document.querySelectorAll('[data-reveal], [data-reveal-row]');

    if ('IntersectionObserver' in window) {
      var observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05
      };

      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      revealElements.forEach(function (el) {
        // Immediately reveal elements that are already within viewport bounds
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.add('is-revealed');
        } else {
          revealObserver.observe(el);
        }
      });
    } else {
      // Fallback for older browsers
      revealElements.forEach(function (el) {
        el.classList.add('is-revealed');
      });
    }

    // Safety fallback: reveal all elements after 1 second just in case
    setTimeout(function () {
      if (hero && !hero.classList.contains('is-loaded')) {
        hero.classList.add('is-loaded');
      }
      revealElements.forEach(function (el) {
        if (!el.classList.contains('is-revealed')) {
          el.classList.add('is-revealed');
        }
      });
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
