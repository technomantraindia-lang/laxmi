/**
 * Laxmi En-Fab - Global Utilities & Interactive Section Controllers
 */
(function () {
  'use strict';

  function initCredibilitySwitcher() {
    var proofs = document.querySelectorAll('.credibility__proof[data-credibility-target]');
    var label = document.getElementById('credibility-img-label');
    var labels = {
      '1': 'LAXMI EN-FAB · MFG. OF PLANT & MACHINERY',
      '2': 'LAXMI EN-FAB · ENGINEERING & PLANT PLANNING',
      '3': 'LAXMI EN-FAB · INSTALLATION & COMMISSIONING'
    };

    proofs.forEach(function (proof) {
      proof.addEventListener('mouseenter', function () {
        var targetId = this.getAttribute('data-credibility-target');
        var targetImg = document.getElementById('credibility-img-' + targetId);
        if (!targetImg) return;

        document.querySelectorAll('.credibility__img').forEach(function (img) {
          img.classList.remove('credibility__img--active');
        });
        targetImg.classList.add('credibility__img--active');

        if (label && labels[targetId]) {
          label.textContent = labels[targetId];
        }
      });
    });
  }

  function initInvestmentSwitcher() {
    var rows = document.querySelectorAll('.investment-section__row[data-investment-target]');
    var label = document.getElementById('investment-img-label');
    var labels = {
      '1': '01 · CAPACITY SELECTION VIEW',
      '2': '02 · LAND REQUIREMENT VIEW',
      '3': '03 · PROJECT COST & WORKING CAPITAL VIEW',
      '4': '04 · ROI & PAYBACK VIEW',
      '5': '05 · FINANCE & BANK LOAN VIEW',
      '6': '06 · SUBSIDY INFORMATION VIEW'
    };

    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () {
        var targetId = this.getAttribute('data-investment-target');
        var targetImg = document.getElementById('investment-img-' + targetId);
        if (!targetImg) return;

        document.querySelectorAll('.investment-section__img').forEach(function (img) {
          img.classList.remove('investment-section__img--active');
        });
        targetImg.classList.add('investment-section__img--active');

        if (label && labels[targetId]) {
          label.textContent = labels[targetId];
        }
      });
    });
  }

  function initMachineryRailSlider() {
    var railNav = document.getElementById('machinery-rail-nav');
    var prevBtn = document.getElementById('rail-prev-btn');
    var nextBtn = document.getElementById('rail-next-btn');
    if (!railNav) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        railNav.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        railNav.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }

    var autoSlideTimer = null;
    var isHovered = false;

    function startAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(function () {
        if (isHovered) return;
        if (railNav.scrollLeft + railNav.clientWidth >= railNav.scrollWidth - 10) {
          railNav.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          railNav.scrollBy({ left: 180, behavior: 'smooth' });
        }
      }, 3200);
    }

    railNav.addEventListener('mouseenter', function () { isHovered = true; });
    railNav.addEventListener('mouseleave', function () { isHovered = false; });
    startAutoSlide();

    var links = railNav.querySelectorAll('.machinery-rail__link');
    var sections = document.querySelectorAll('section[id]');
    var isTicking = false;
    var sectionCache = [];

    function updateSectionCache() {
      sectionCache = [];
      sections.forEach(function (sec) {
        sectionCache.push({
          id: sec.getAttribute('id'),
          top: sec.offsetTop,
          height: sec.offsetHeight
        });
      });
    }

    updateSectionCache();
    window.addEventListener('resize', updateSectionCache, { passive: true });

    window.addEventListener('scroll', function () {
      if (!isTicking) {
        window.requestAnimationFrame(function () {
          var scrollPos = window.scrollY + 200;
          var activeId = null;
          for (var i = 0; i < sectionCache.length; i++) {
            var item = sectionCache[i];
            if (scrollPos >= item.top && scrollPos < item.top + item.height) {
              activeId = item.id;
              break;
            }
          }
          if (activeId) {
            links.forEach(function (link) {
              link.classList.toggle('is-active', link.getAttribute('href') === '#' + activeId);
            });
          }
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });
  }

  function initAll() {
    initCredibilitySwitcher();
    initInvestmentSwitcher();
    initMachineryRailSlider();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
