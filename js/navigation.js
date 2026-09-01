/**
 * Laxmi En-Fab - Navigation & Smooth Scroll Handlers
 */
(function () {
  'use strict';

  function initNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        var targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          var headerOffset = 80;
          var elementPosition = targetElement.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Sticky header background state on scroll
    var header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          header.classList.add('site-header--scrolled');
        } else {
          header.classList.remove('site-header--scrolled');
        }
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
