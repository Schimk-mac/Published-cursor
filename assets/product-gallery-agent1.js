/**
 * PRODUCT GALLERY AGENT 1 - JavaScript
 *
 * Interactive functionality for the product gallery component
 * Features: Image navigation, zoom, keyboard controls, touch gestures, accessibility
 */

class ProductGalleryAgent1 extends HTMLElement {
  constructor() {
    super();

    // Component references
    this.carousel = this.querySelector('[data-carousel]');
    this.thumbnails = this.querySelectorAll('[data-thumbnail]');
    this.media = this.querySelectorAll('.product-gallery-agent1__media');
    this.zoomButton = this.querySelector('[data-zoom-trigger]');
    this.prevButton = this.querySelector('[data-carousel-prev]');
    this.nextButton = this.querySelector('[data-carousel-next]');

    // State
    this.currentIndex = 0;
    this.totalMedia = this.media.length;
    this.isZoomed = false;
    this.autoplayEnabled = this.hasAttribute('autoplay-media');
    this.zoomEnabled = this.hasAttribute('allow-zoom');
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isDesktop = window.innerWidth >= 1000;

    // Filtered indexes (variant-specific images)
    this.filteredIndexes = this.parseFilteredIndexes();

    // Initialize
    this.init();
  }

  /**
   * Initialize the component
   */
  init() {
    this.setupThumbnailNavigation();
    this.setupKeyboardNavigation();
    this.setupTouchGestures();
    this.setupZoomFunctionality();
    this.setupArrowNavigation();
    this.setupVariantFiltering();
    this.setupIntersectionObserver();
    this.setupResponsiveListener();
    this.updateNavigationState();
    this.autoplayCurrentMedia();
  }

  /**
   * Parse filtered indexes from attribute
   */
  parseFilteredIndexes() {
    const attr = this.getAttribute('filtered-indexes');
    if (!attr || attr === '[]') return [];
    try {
      return JSON.parse(attr);
    } catch (e) {
      console.error('Error parsing filtered indexes:', e);
      return [];
    }
  }

  /**
   * Setup thumbnail click navigation
   */
  setupThumbnailNavigation() {
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        const position = parseInt(thumbnail.dataset.mediaPosition);
        this.navigateToPosition(position);
      });
    });
  }

  /**
   * Setup keyboard navigation (arrow keys, Home, End)
   */
  setupKeyboardNavigation() {
    // Keyboard navigation on the carousel
    this.carousel?.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          this.navigatePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.navigateNext();
          break;
        case 'Home':
          e.preventDefault();
          this.navigateToIndex(0);
          break;
        case 'End':
          e.preventDefault();
          this.navigateToIndex(this.totalMedia - 1);
          break;
      }
    });

    // Keyboard navigation on thumbnails
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('keydown', (e) => {
        let targetIndex = index;

        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            targetIndex = Math.max(0, index - 1);
            break;
          case 'ArrowDown':
            e.preventDefault();
            targetIndex = Math.min(this.thumbnails.length - 1, index + 1);
            break;
          case 'ArrowLeft':
            if (this.isDesktop) break; // On desktop, up/down are used
            e.preventDefault();
            targetIndex = Math.max(0, index - 1);
            break;
          case 'ArrowRight':
            if (this.isDesktop) break; // On desktop, up/down are used
            e.preventDefault();
            targetIndex = Math.min(this.thumbnails.length - 1, index + 1);
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = this.thumbnails.length - 1;
            break;
          default:
            return;
        }

        if (targetIndex !== index) {
          this.thumbnails[targetIndex]?.focus();
          this.thumbnails[targetIndex]?.click();
        }
      });
    });
  }

  /**
   * Setup touch gestures for swipe navigation
   */
  setupTouchGestures() {
    if (!this.carousel) return;

    this.carousel.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.carousel.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipeGesture();
    }, { passive: true });
  }

  /**
   * Handle swipe gestures
   */
  handleSwipeGesture() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) < swipeThreshold) return;

    if (diff > 0) {
      // Swiped left - go to next
      this.navigateNext();
    } else {
      // Swiped right - go to previous
      this.navigatePrevious();
    }
  }

  /**
   * Setup image zoom functionality
   */
  setupZoomFunctionality() {
    if (!this.zoomEnabled) return;

    // Zoom button click
    this.zoomButton?.addEventListener('click', () => {
      this.toggleZoom();
    });

    // Desktop: Click on image to zoom
    if (this.isDesktop) {
      this.media.forEach((mediaEl) => {
        const image = mediaEl.querySelector('[data-zoomable]');
        if (!image) return;

        image.addEventListener('click', (e) => {
          this.handleImageZoom(e, image);
        });
      });
    }
  }

  /**
   * Handle image zoom on desktop
   */
  handleImageZoom(event, image) {
    if (this.isZoomed) {
      this.resetZoom(image);
      return;
    }

    const rect = image.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
    image.style.transform = 'scale(2)';
    image.style.cursor = 'zoom-out';
    this.isZoomed = true;

    // Add click outside to close
    const closeZoom = (e) => {
      if (e.target !== image) {
        this.resetZoom(image);
        document.removeEventListener('click', closeZoom);
      }
    };
    setTimeout(() => document.addEventListener('click', closeZoom), 100);
  }

  /**
   * Reset image zoom
   */
  resetZoom(image) {
    image.style.transform = 'scale(1)';
    image.style.cursor = 'zoom-in';
    this.isZoomed = false;
  }

  /**
   * Toggle zoom (for mobile button)
   */
  toggleZoom() {
    const currentMedia = this.media[this.currentIndex];
    const image = currentMedia?.querySelector('[data-zoomable]');
    if (!image) return;

    if (this.isZoomed) {
      this.resetZoom(image);
    } else {
      image.style.transform = 'scale(2)';
      image.style.cursor = 'zoom-out';
      this.isZoomed = true;
    }
  }

  /**
   * Setup arrow navigation
   */
  setupArrowNavigation() {
    this.prevButton?.addEventListener('click', () => this.navigatePrevious());
    this.nextButton?.addEventListener('click', () => this.navigateNext());
  }

  /**
   * Setup variant filtering
   */
  setupVariantFiltering() {
    const form = this.getAttribute('form');
    if (!form) return;

    const productForm = document.getElementById(form);
    if (!productForm) return;

    // Listen to variant changes
    productForm.addEventListener('variant:change', (e) => {
      this.handleVariantChange(e.detail);
    });
  }

  /**
   * Handle variant change
   */
  handleVariantChange(variant) {
    if (!variant || !variant.featured_media) return;

    const mediaId = variant.featured_media.id;
    const targetMedia = Array.from(this.media).find(
      (m) => m.dataset.mediaId === String(mediaId)
    );

    if (targetMedia) {
      const position = parseInt(targetMedia.dataset.mediaPosition);
      this.navigateToPosition(position);
    }
  }

  /**
   * Setup intersection observer for lazy loading optimization
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const media = entry.target;
            this.loadMedia(media);
            observer.unobserve(media);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    // Observe media elements
    this.media.forEach((media, index) => {
      // Don't observe the first few items (they should load immediately)
      if (index > 2) {
        observer.observe(media);
      }
    });
  }

  /**
   * Load media element
   */
  loadMedia(mediaEl) {
    const images = mediaEl.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        delete img.dataset.src;
      }
    });
  }

  /**
   * Setup responsive listener
   */
  setupResponsiveListener() {
    const mediaQuery = window.matchMedia('(min-width: 1000px)');

    const handleResize = (e) => {
      this.isDesktop = e.matches;
      this.updateNavigationState();
    };

    mediaQuery.addEventListener('change', handleResize);
    this.isDesktop = mediaQuery.matches;
  }

  /**
   * Navigate to specific position
   */
  navigateToPosition(position) {
    const index = Array.from(this.media).findIndex(
      (m) => parseInt(m.dataset.mediaPosition) === position
    );
    if (index !== -1) {
      this.navigateToIndex(index);
    }
  }

  /**
   * Navigate to specific index
   */
  navigateToIndex(index) {
    if (index < 0 || index >= this.totalMedia) return;
    if (this.media[index]?.hasAttribute('hidden')) return;

    this.currentIndex = index;
    this.updateMediaDisplay();
    this.updateThumbnailStates();
    this.updateNavigationState();
    this.scrollToMedia(index);
    this.autoplayCurrentMedia();
    this.announceToScreenReader(index);
  }

  /**
   * Navigate to next media
   */
  navigateNext() {
    let nextIndex = this.currentIndex + 1;

    // Skip hidden items
    while (nextIndex < this.totalMedia && this.media[nextIndex]?.hasAttribute('hidden')) {
      nextIndex++;
    }

    if (nextIndex < this.totalMedia) {
      this.navigateToIndex(nextIndex);
    }
  }

  /**
   * Navigate to previous media
   */
  navigatePrevious() {
    let prevIndex = this.currentIndex - 1;

    // Skip hidden items
    while (prevIndex >= 0 && this.media[prevIndex]?.hasAttribute('hidden')) {
      prevIndex--;
    }

    if (prevIndex >= 0) {
      this.navigateToIndex(prevIndex);
    }
  }

  /**
   * Update media display
   */
  updateMediaDisplay() {
    if (this.isDesktop) {
      // Desktop: Show/hide media
      this.media.forEach((mediaEl, index) => {
        if (index === this.currentIndex) {
          mediaEl.classList.add('is-selected');
          mediaEl.removeAttribute('tabindex');
          mediaEl.setAttribute('tabindex', '0');
        } else {
          mediaEl.classList.remove('is-selected');
          mediaEl.setAttribute('tabindex', '-1');
        }
      });
    } else {
      // Mobile: Update scroll position handled by scrollToMedia
      this.media.forEach((mediaEl, index) => {
        if (index === this.currentIndex) {
          mediaEl.classList.add('is-selected');
        } else {
          mediaEl.classList.remove('is-selected');
        }
      });
    }
  }

  /**
   * Update thumbnail states
   */
  updateThumbnailStates() {
    const currentMediaPosition = this.media[this.currentIndex]?.dataset.mediaPosition;

    this.thumbnails.forEach((thumbnail) => {
      const isSelected = thumbnail.dataset.mediaPosition === currentMediaPosition;

      thumbnail.classList.toggle('is-selected', isSelected);
      thumbnail.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      thumbnail.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    // Scroll thumbnail into view
    const selectedThumbnail = this.querySelector('.product-gallery-agent1__thumbnail.is-selected');
    selectedThumbnail?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  /**
   * Update navigation button states
   */
  updateNavigationState() {
    if (this.prevButton) {
      this.prevButton.disabled = this.currentIndex === 0;
      this.prevButton.setAttribute('aria-disabled', this.currentIndex === 0 ? 'true' : 'false');
    }

    if (this.nextButton) {
      this.nextButton.disabled = this.currentIndex === this.totalMedia - 1;
      this.nextButton.setAttribute('aria-disabled', this.currentIndex === this.totalMedia - 1 ? 'true' : 'false');
    }
  }

  /**
   * Scroll carousel to specific media
   */
  scrollToMedia(index) {
    if (!this.carousel || this.isDesktop) return;

    const mediaEl = this.media[index];
    if (!mediaEl) return;

    mediaEl.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  /**
   * Autoplay current media (if enabled)
   */
  autoplayCurrentMedia() {
    if (!this.autoplayEnabled) return;

    const currentMedia = this.media[this.currentIndex];
    if (!currentMedia) return;

    const mediaType = currentMedia.dataset.mediaType;

    // Pause all other media first
    this.pauseAllMedia();

    // Play current media if it's a video
    if (mediaType === 'video' || mediaType === 'external_video') {
      const video = currentMedia.querySelector('video');
      if (video) {
        video.play().catch((e) => console.log('Autoplay prevented:', e));
      }
    }
  }

  /**
   * Pause all media
   */
  pauseAllMedia() {
    this.media.forEach((mediaEl) => {
      const video = mediaEl.querySelector('video');
      if (video) {
        video.pause();
      }
    });
  }

  /**
   * Announce to screen reader
   */
  announceToScreenReader(index) {
    const liveRegion = this.querySelector('[aria-live]') || this.createLiveRegion();
    const currentMedia = this.media[index];
    const position = currentMedia?.dataset.mediaPosition || index + 1;

    liveRegion.textContent = `Viewing image ${position} of ${this.totalMedia}`;
  }

  /**
   * Create live region for screen reader announcements
   */
  createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    this.appendChild(liveRegion);
    return liveRegion;
  }
}

// Register the custom element
if ('customElements' in window) {
  customElements.define('product-gallery-agent1', ProductGalleryAgent1);
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProductGalleryAgent1;
}
