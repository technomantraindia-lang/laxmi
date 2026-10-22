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
        revealObserver.observe(el);
      });
    } else {
      // Fallback for older browsers
      revealElements.forEach(function (el) {
        el.classList.add('is-revealed');
      });
    }

    // 3. Setup Smart Video auto-play / auto-pause on scroll
    initVideoObservers();

    // 4. Setup Stats Counter strip animation
    initStatsCounters();

    // 5. Setup Customer Success / Testimonials Slider
    initTestimonialsSlider();
  }

  function initVideoObservers() {
    var videos = document.querySelectorAll('video');
    if (!videos.length) return;

    if ('IntersectionObserver' in window) {
      var videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            var playPromise = v.play();
            if (playPromise !== undefined) {
              playPromise.catch(function () {});
            }
          } else {
            v.pause();
          }
        });
      }, { threshold: 0.1 });

      videos.forEach(function (v) {
        videoObserver.observe(v);
      });
    }
  }

  function initTestimonialsSlider() {
    var section = document.getElementById('testimonials');
    if (!section) return;

    var slides = section.querySelectorAll('.hp-testi-slide');
    var dots = section.querySelectorAll('.hp-testi-dot');
    var prevBtn = document.getElementById('hpTestiPrev');
    var nextBtn = document.getElementById('hpTestiNext');

    if (!slides.length) return;

    var currentIndex = 0;
    var autoPlayTimer = null;
    var intervalTime = 7000;

    function goToSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }

      slides.forEach(function (slide, i) {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach(function (dot, i) {
        if (i === index) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });

      currentIndex = index;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        goToSlide(currentIndex - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        goToSlide(currentIndex + 1);
        resetAutoPlay();
      });
    }

    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function (e) {
        e.preventDefault();
        goToSlide(idx);
        resetAutoPlay();
      });
    });

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(function () {
        goToSlide(currentIndex + 1);
      }, intervalTime);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    var card = section.querySelector('.hp-testi-dashed-card');
    if (card) {
      card.addEventListener('mouseenter', stopAutoPlay);
      card.addEventListener('mouseleave', startAutoPlay);
      card.addEventListener('focusin', stopAutoPlay);
      card.addEventListener('focusout', startAutoPlay);

      card.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          goToSlide(currentIndex - 1);
          resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
          goToSlide(currentIndex + 1);
          resetAutoPlay();
        }
      });
    }

    startAutoPlay();
  }

  function initStatsCounters() {
    var statsStrip = document.querySelector('.hp-stats-strip');
    if (!statsStrip) return;

    var counters = statsStrip.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    // Check if user prefers reduced motion
    var prefersReducedMotion = false;
    try {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}

    var hasAnimated = false;

    function startCounting() {
      if (hasAnimated) return;
      hasAnimated = true;

      counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-counter-target'), 10);
        if (isNaN(target)) return;

        if (prefersReducedMotion) {
          counter.textContent = target;
          return;
        }

        var duration = 1400; // ms
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var elapsed = timestamp - startTime;
          var progress = Math.min(elapsed / duration, 1);

          // Easing: easeOutExpo
          var ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          var currentVal = Math.floor(ease * target);

          counter.textContent = currentVal;

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            counter.textContent = target;
          }
        }

        window.requestAnimationFrame(step);
      });
    }

    if ('IntersectionObserver' in window) {
      var counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startCounting();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      counterObserver.observe(statsStrip);
    } else {
      startCounting();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
