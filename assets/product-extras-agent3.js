/**
 * PRODUCT EXTRAS - AGENT 3
 * JavaScript functionality for additional product information sections
 * Created as part of multi-agent product page template development
 */

(function() {
  'use strict';

  /**
   * Initialize product extras functionality
   */
  function initProductExtras() {
    initCarousels();
    initFAQSearch();
    initReviewSorting();
    initBundleCalculator();
    initScrollAnimations();
    initAccessibility();
  }

  /**
   * Initialize carousel functionality for related products
   */
  function initCarousels() {
    const carousels = document.querySelectorAll('.product-extras__product-carousel');

    carousels.forEach(carousel => {
      if (!carousel) return;

      // Add touch/drag scrolling enhancement
      let isDown = false;
      let startX;
      let scrollLeft;

      carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });

      carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
      });

      carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
      });

      carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
      });

      // Keyboard navigation
      carousel.addEventListener('keydown', (e) => {
        const scrollAmount = 300;

        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      });
    });

    // Update carousel navigation dots based on scroll position
    const carouselNavs = document.querySelectorAll('.product-extras__carousel-nav');

    carouselNavs.forEach(nav => {
      const carouselId = nav.getAttribute('aria-controls');
      const carousel = document.getElementById(carouselId);

      if (!carousel) return;

      const updateActiveButton = () => {
        const buttons = nav.querySelectorAll('button');
        const scrollLeft = carousel.scrollLeft;
        const itemWidth = carousel.querySelector('.product-extras__product-card-wrapper')?.offsetWidth || 0;
        const currentIndex = Math.round(scrollLeft / itemWidth);

        buttons.forEach((button, index) => {
          button.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
        });
      };

      carousel.addEventListener('scroll', updateActiveButton);

      // Add click handlers to navigation buttons
      const buttons = nav.querySelectorAll('button');
      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
          const itemWidth = carousel.querySelector('.product-extras__product-card-wrapper')?.offsetWidth || 0;
          carousel.scrollTo({
            left: itemWidth * index,
            behavior: 'smooth'
          });
        });
      });
    });
  }

  /**
   * Initialize FAQ search functionality
   */
  function initFAQSearch() {
    const faqSection = document.querySelector('.product-extras__faq');

    if (!faqSection) return;

    // Create search input (if needed in future)
    // This is a placeholder for future enhancement
    const faqList = faqSection.querySelector('.product-extras__faq-list');

    if (!faqList) return;

    // Add keyboard navigation for FAQ items
    const accordions = faqList.querySelectorAll('accordion-disclosure');

    accordions.forEach((accordion, index) => {
      const details = accordion.querySelector('details');
      const summary = accordion.querySelector('summary');

      if (!details || !summary) return;

      summary.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && index < accordions.length - 1) {
          e.preventDefault();
          accordions[index + 1].querySelector('summary')?.focus();
        } else if (e.key === 'ArrowUp' && index > 0) {
          e.preventDefault();
          accordions[index - 1].querySelector('summary')?.focus();
        }
      });
    });
  }

  /**
   * Initialize review sorting functionality
   */
  function initReviewSorting() {
    const reviewsSection = document.querySelector('.product-extras__reviews');

    if (!reviewsSection) return;

    // Placeholder for review sorting functionality
    // This would integrate with third-party review apps
    console.log('Product Extras: Review sorting initialized');
  }

  /**
   * Initialize bundle calculator for complementary products
   */
  function initBundleCalculator() {
    const bundleButton = document.querySelector('.product-extras__bundle-button');

    if (!bundleButton) return;

    bundleButton.addEventListener('click', (e) => {
      e.preventDefault();

      // Get all complementary products
      const complementarySection = document.querySelector('.product-extras__complementary');
      const productCards = complementarySection?.querySelectorAll('.product-card-horizontal');

      if (!productCards || productCards.length === 0) {
        console.warn('No complementary products found');
        return;
      }

      // Collect product IDs for bundle
      const productIds = [];
      productCards.forEach(card => {
        const productId = card.getAttribute('data-product-id');
        if (productId) {
          productIds.push(productId);
        }
      });

      // Dispatch custom event for cart integration (would be handled by main theme JS)
      const bundleEvent = new CustomEvent('product-extras:add-bundle', {
        detail: {
          productIds: productIds,
          discount: 0.15 // 15% discount
        },
        bubbles: true
      });

      bundleButton.dispatchEvent(bundleEvent);

      // Visual feedback
      const originalText = bundleButton.textContent;
      bundleButton.textContent = 'Adding to Cart...';
      bundleButton.disabled = true;

      setTimeout(() => {
        bundleButton.textContent = originalText;
        bundleButton.disabled = false;
      }, 2000);
    });
  }

  /**
   * Initialize scroll animations with Intersection Observer
   */
  function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.product-extras__section');
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  /**
   * Initialize accessibility enhancements
   */
  function initAccessibility() {
    // Add ARIA live region for dynamic updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'product-extras-announcer';
    document.body.appendChild(liveRegion);

    // Announce when sections are expanded/collapsed
    const accordions = document.querySelectorAll('.product-extras accordion-disclosure');

    accordions.forEach(accordion => {
      const details = accordion.querySelector('details');
      const summary = accordion.querySelector('summary');

      if (!details || !summary) return;

      details.addEventListener('toggle', () => {
        const title = summary.textContent?.trim() || '';
        const state = details.open ? 'expanded' : 'collapsed';
        announceToScreenReader(`${title} ${state}`);
      });
    });

    // Focus management for modals and popovers (if any)
    trapFocusInModals();
  }

  /**
   * Announce messages to screen readers
   */
  function announceToScreenReader(message) {
    const liveRegion = document.getElementById('product-extras-announcer');

    if (!liveRegion) return;

    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 100);
  }

  /**
   * Trap focus within modal dialogs
   */
  function trapFocusInModals() {
    const modals = document.querySelectorAll('[role="dialog"]');

    modals.forEach(modal => {
      const focusableElements = modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      });
    });
  }

  /**
   * Handle CTA button clicks
   */
  function initCTAButtons() {
    // Write Review button
    const writeReviewButtons = document.querySelectorAll('.product-extras__cta-button[aria-label="Write a review"]');

    writeReviewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        // Dispatch custom event for review form
        const reviewEvent = new CustomEvent('product-extras:open-review-form', {
          bubbles: true
        });
        button.dispatchEvent(reviewEvent);

        announceToScreenReader('Opening review form');
      });
    });

    // Ask a Question button
    const askQuestionButtons = document.querySelectorAll('.product-extras__cta-button');

    askQuestionButtons.forEach(button => {
      if (button.textContent?.includes('Ask a Question')) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          // Dispatch custom event for question form
          const questionEvent = new CustomEvent('product-extras:open-question-form', {
            bubbles: true
          });
          button.dispatchEvent(questionEvent);

          announceToScreenReader('Opening question form');
        });
      }
    });
  }

  /**
   * Lazy load recommendations
   */
  function initLazyLoadRecommendations() {
    const recommendationsElements = document.querySelectorAll('product-recommendations');

    if (!recommendationsElements.length) return;

    const observerOptions = {
      threshold: 0,
      rootMargin: '200px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Trigger recommendations load if not already performed
          if (!element.hasAttribute('data-loaded')) {
            element.setAttribute('data-loaded', 'true');
            // The <product-recommendations> web component handles the actual loading
          }

          observer.unobserve(element);
        }
      });
    }, observerOptions);

    recommendationsElements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Initialize smooth scroll to sections
   */
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#product-"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);

        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      });
    });
  }

  /**
   * Performance monitoring
   */
  function monitorPerformance() {
    if (!window.performance || !window.performance.mark) return;

    window.performance.mark('product-extras-start');

    window.addEventListener('load', () => {
      window.performance.mark('product-extras-end');

      try {
        window.performance.measure(
          'product-extras-init',
          'product-extras-start',
          'product-extras-end'
        );

        const measure = window.performance.getEntriesByName('product-extras-init')[0];
        console.log(`Product Extras initialized in ${measure.duration.toFixed(2)}ms`);
      } catch (e) {
        // Measurement not supported
      }
    });
  }

  /**
   * Main initialization
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initProductExtras();
      initCTAButtons();
      initLazyLoadRecommendations();
      initSmoothScrolling();
      monitorPerformance();
    });
  } else {
    initProductExtras();
    initCTAButtons();
    initLazyLoadRecommendations();
    initSmoothScrolling();
    monitorPerformance();
  }

  /**
   * Expose public API for external integration
   */
  window.ProductExtrasAgent3 = {
    version: '1.0.0',
    announce: announceToScreenReader,
    reinit: initProductExtras
  };

  /**
   * Handle page visibility changes (pause/resume animations)
   */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause any animations or timers
      console.log('Product Extras: Page hidden, pausing animations');
    } else {
      // Resume animations
      console.log('Product Extras: Page visible, resuming animations');
    }
  });

  /**
   * Clean up on page unload
   */
  window.addEventListener('beforeunload', () => {
    // Clean up any event listeners or resources
    console.log('Product Extras: Cleaning up');
  });

})();
