/**
 * Product Info Component - Agent 2
 * Handles variant selection, add to cart, and interactive features
 */

class ProductInfoForm extends HTMLElement {
  constructor() {
    super();

    this.form = this.querySelector('form');
    this.productInfo = this.closest('.product-info');
    this.productId = this.productInfo?.dataset.productId;

    // Get all interactive elements
    this.variantInputs = this.querySelectorAll('[data-option-position]');
    this.variantIdInput = this.querySelector('[data-variant-id]');
    this.quantityInput = this.querySelector('[data-quantity-input]');
    this.quantityMinusBtn = this.querySelector('[data-quantity-minus]');
    this.quantityPlusBtn = this.querySelector('[data-quantity-plus]');
    this.addToCartBtn = this.querySelector('[data-add-to-cart]');
    this.errorMessageContainer = this.querySelector('[data-error-message]');

    // Price elements
    this.priceWrapper = this.productInfo?.querySelector('[data-price-wrapper]');
    this.priceElement = this.productInfo?.querySelector('[data-price]');
    this.comparePriceElement = this.productInfo?.querySelector('[data-compare-price]');

    // Availability elements
    this.availabilityContainer = this.productInfo?.querySelector('[data-availability]');
    this.skuElement = this.productInfo?.querySelector('[data-sku]');

    // Initialize
    this.init();
  }

  init() {
    // Bind event listeners
    this.bindVariantSelection();
    this.bindQuantitySelector();
    this.bindFormSubmit();

    // Fetch product data
    this.fetchProductData();
  }

  /**
   * Fetch product JSON data from Shopify
   */
  async fetchProductData() {
    if (!this.productId) return;

    try {
      const response = await fetch(`/products/${this.getProductHandle()}.js`);
      if (!response.ok) throw new Error('Failed to fetch product data');

      this.productData = await response.json();
      this.variants = this.productData.variants;
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  /**
   * Get product handle from URL or product data
   */
  getProductHandle() {
    const url = window.location.pathname;
    const match = url.match(/\/products\/([^\/]+)/);
    return match ? match[1] : '';
  }

  /**
   * Bind variant selection events
   */
  bindVariantSelection() {
    this.variantInputs.forEach(input => {
      input.addEventListener('change', this.handleVariantChange.bind(this));
    });
  }

  /**
   * Handle variant selection change
   */
  handleVariantChange(event) {
    const selectedOptions = this.getSelectedOptions();
    const variant = this.getVariantFromOptions(selectedOptions);

    if (variant) {
      this.updateVariant(variant);
      this.updateURL(variant);
    }

    // Update option value display
    const optionPosition = event.target.dataset.optionPosition;
    const optionValueDisplay = this.productInfo?.querySelector(`[data-option-value-${parseInt(optionPosition) - 1}]`);
    if (optionValueDisplay) {
      optionValueDisplay.textContent = event.target.value;
    }
  }

  /**
   * Get currently selected options
   */
  getSelectedOptions() {
    const options = [];
    this.variantInputs.forEach(input => {
      if (input.checked) {
        options.push(input.value);
      }
    });
    return options;
  }

  /**
   * Find variant matching selected options
   */
  getVariantFromOptions(selectedOptions) {
    if (!this.variants) return null;

    return this.variants.find(variant => {
      return selectedOptions.every((option, index) => {
        return variant.options[index] === option;
      });
    });
  }

  /**
   * Update variant information in UI
   */
  updateVariant(variant) {
    // Update hidden variant ID input
    if (this.variantIdInput) {
      this.variantIdInput.value = variant.id;
    }

    // Update price
    this.updatePrice(variant);

    // Update availability
    this.updateAvailability(variant);

    // Update SKU
    if (this.skuElement && variant.sku) {
      this.skuElement.textContent = variant.sku;
    }

    // Update add to cart button
    this.updateAddToCartButton(variant);

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('variant-change', {
      detail: { variant },
      bubbles: true
    }));
  }

  /**
   * Update price display
   */
  updatePrice(variant) {
    if (!this.priceElement) return;

    const price = this.formatMoney(variant.price);
    const comparePrice = variant.compare_at_price ? this.formatMoney(variant.compare_at_price) : null;

    this.priceElement.textContent = price;

    if (comparePrice && variant.compare_at_price > variant.price) {
      // On sale
      this.priceElement.classList.add('product-info__price--sale');
      this.priceElement.classList.remove('product-info__price--regular');

      if (this.comparePriceElement) {
        this.comparePriceElement.textContent = comparePrice;
        this.comparePriceElement.hidden = false;
      }

      // Update discount badge
      const discountBadge = this.priceWrapper?.querySelector('.product-info__discount-badge');
      if (discountBadge) {
        const discountPercent = Math.round(((variant.compare_at_price - variant.price) / variant.compare_at_price) * 100);
        discountBadge.textContent = `Save ${discountPercent}%`;
        discountBadge.hidden = false;
      }
    } else {
      // Regular price
      this.priceElement.classList.add('product-info__price--regular');
      this.priceElement.classList.remove('product-info__price--sale');

      if (this.comparePriceElement) {
        this.comparePriceElement.hidden = true;
      }

      const discountBadge = this.priceWrapper?.querySelector('.product-info__discount-badge');
      if (discountBadge) {
        discountBadge.hidden = true;
      }
    }
  }

  /**
   * Format money using Shopify's format
   */
  formatMoney(cents) {
    const money = (cents / 100).toFixed(2);
    return `$${money}`;
  }

  /**
   * Update availability display
   */
  updateAvailability(variant) {
    if (!this.availabilityContainer) return;

    const icon = this.availabilityContainer.querySelector('.product-info__availability-icon');
    const text = this.availabilityContainer.querySelector('.product-info__availability-text');

    if (!icon || !text) return;

    if (variant.available) {
      icon.classList.add('product-info__availability-icon--in-stock');
      icon.classList.remove('product-info__availability-icon--out-of-stock');
      text.classList.add('product-info__availability-text--in-stock');
      text.classList.remove('product-info__availability-text--out-of-stock');

      if (variant.inventory_management && variant.inventory_quantity <= 10 && variant.inventory_quantity > 0) {
        text.textContent = `Only ${variant.inventory_quantity} left in stock`;
      } else {
        text.textContent = 'In stock';
      }
    } else {
      icon.classList.add('product-info__availability-icon--out-of-stock');
      icon.classList.remove('product-info__availability-icon--in-stock');
      text.classList.add('product-info__availability-text--out-of-stock');
      text.classList.remove('product-info__availability-text--in-stock');
      text.textContent = 'Out of stock';
    }
  }

  /**
   * Update add to cart button state
   */
  updateAddToCartButton(variant) {
    if (!this.addToCartBtn) return;

    const buttonText = this.addToCartBtn.querySelector('.product-info__add-button-text');

    if (variant.available) {
      this.addToCartBtn.disabled = false;
      if (buttonText) {
        buttonText.textContent = 'Add to Cart';
      }
    } else {
      this.addToCartBtn.disabled = true;
      if (buttonText) {
        buttonText.textContent = 'Sold Out';
      }
    }
  }

  /**
   * Update URL with variant parameter
   */
  updateURL(variant) {
    if (!variant || !window.history.replaceState) return;

    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url.toString());
  }

  /**
   * Bind quantity selector events
   */
  bindQuantitySelector() {
    if (this.quantityMinusBtn) {
      this.quantityMinusBtn.addEventListener('click', () => this.decreaseQuantity());
    }

    if (this.quantityPlusBtn) {
      this.quantityPlusBtn.addEventListener('click', () => this.increaseQuantity());
    }

    if (this.quantityInput) {
      this.quantityInput.addEventListener('change', () => this.validateQuantity());
    }
  }

  /**
   * Decrease quantity
   */
  decreaseQuantity() {
    if (!this.quantityInput) return;

    const currentValue = parseInt(this.quantityInput.value) || 1;
    const minValue = parseInt(this.quantityInput.min) || 1;

    if (currentValue > minValue) {
      this.quantityInput.value = currentValue - 1;
    }
  }

  /**
   * Increase quantity
   */
  increaseQuantity() {
    if (!this.quantityInput) return;

    const currentValue = parseInt(this.quantityInput.value) || 1;
    const maxValue = parseInt(this.quantityInput.max) || 999;

    if (currentValue < maxValue) {
      this.quantityInput.value = currentValue + 1;
    }
  }

  /**
   * Validate quantity input
   */
  validateQuantity() {
    if (!this.quantityInput) return;

    const value = parseInt(this.quantityInput.value);
    const minValue = parseInt(this.quantityInput.min) || 1;
    const maxValue = parseInt(this.quantityInput.max) || 999;

    if (isNaN(value) || value < minValue) {
      this.quantityInput.value = minValue;
    } else if (value > maxValue) {
      this.quantityInput.value = maxValue;
    }
  }

  /**
   * Bind form submit event
   */
  bindFormSubmit() {
    if (!this.form) return;

    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  /**
   * Handle add to cart form submission
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    // Clear any previous errors
    this.clearError();

    // Set loading state
    this.setLoadingState(true);

    // Get form data
    const formData = new FormData(this.form);

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.description || 'Failed to add to cart');
      }

      const data = await response.json();

      // Dispatch success event
      this.dispatchEvent(new CustomEvent('add-to-cart-success', {
        detail: { item: data },
        bubbles: true
      }));

      // Update cart (if cart drawer exists)
      this.updateCart();

      // Show success feedback
      this.showSuccessFeedback();

    } catch (error) {
      console.error('Add to cart error:', error);
      this.showError(error.message);

      // Dispatch error event
      this.dispatchEvent(new CustomEvent('add-to-cart-error', {
        detail: { error: error.message },
        bubbles: true
      }));
    } finally {
      this.setLoadingState(false);
    }
  }

  /**
   * Set loading state
   */
  setLoadingState(loading) {
    if (!this.addToCartBtn) return;

    if (loading) {
      this.addToCartBtn.dataset.loading = 'true';
      this.addToCartBtn.disabled = true;
    } else {
      delete this.addToCartBtn.dataset.loading;
      const selectedOptions = this.getSelectedOptions();
      const variant = this.getVariantFromOptions(selectedOptions);
      if (variant) {
        this.addToCartBtn.disabled = !variant.available;
      }
    }
  }

  /**
   * Show success feedback
   */
  showSuccessFeedback() {
    if (!this.addToCartBtn) return;

    const buttonText = this.addToCartBtn.querySelector('.product-info__add-button-text');
    if (!buttonText) return;

    const originalText = buttonText.textContent;
    buttonText.textContent = 'Added!';

    setTimeout(() => {
      buttonText.textContent = originalText;
    }, 2000);
  }

  /**
   * Show error message
   */
  showError(message) {
    if (!this.errorMessageContainer) return;

    this.errorMessageContainer.textContent = message;
    this.errorMessageContainer.hidden = false;
  }

  /**
   * Clear error message
   */
  clearError() {
    if (!this.errorMessageContainer) return;

    this.errorMessageContainer.textContent = '';
    this.errorMessageContainer.hidden = true;
  }

  /**
   * Update cart (trigger cart refresh)
   */
  async updateCart() {
    try {
      const response = await fetch('/cart.js');
      if (!response.ok) throw new Error('Failed to fetch cart');

      const cart = await response.json();

      // Dispatch cart update event
      document.dispatchEvent(new CustomEvent('cart:update', {
        detail: { cart }
      }));
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }
}

// Register custom element
customElements.define('product-info-form', ProductInfoForm);

/**
 * Description toggle functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  const descriptionToggles = document.querySelectorAll('[data-description-toggle]');

  descriptionToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const productInfo = this.closest('.product-info');
      if (!productInfo) return;

      const descriptionShort = productInfo.querySelector('[data-description]');
      const descriptionFull = productInfo.querySelector('[data-description-full]');
      const moreText = this.querySelector('.product-info__description-toggle-more');
      const lessText = this.querySelector('.product-info__description-toggle-less');

      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Collapse
        this.setAttribute('aria-expanded', 'false');
        if (descriptionShort) descriptionShort.hidden = false;
        if (descriptionFull) descriptionFull.hidden = true;
        if (moreText) moreText.hidden = false;
        if (lessText) lessText.hidden = true;
      } else {
        // Expand
        this.setAttribute('aria-expanded', 'true');
        if (descriptionShort) descriptionShort.hidden = true;
        if (descriptionFull) descriptionFull.hidden = false;
        if (moreText) moreText.hidden = true;
        if (lessText) lessText.hidden = false;
      }
    });
  });
});

/**
 * Wishlist functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  const wishlistButtons = document.querySelectorAll('[data-wishlist-toggle]');

  wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productInfo = this.closest('.product-info');
      if (!productInfo) return;

      const productId = productInfo.dataset.productId;
      const isSaved = this.dataset.saved === 'true';

      if (isSaved) {
        // Remove from wishlist
        removeFromWishlist(productId);
        this.dataset.saved = 'false';
        this.setAttribute('aria-label', 'Add to wishlist');

        const text = this.querySelector('.product-info__wishlist-text');
        if (text) text.textContent = 'Save for later';
      } else {
        // Add to wishlist
        addToWishlist(productId);
        this.dataset.saved = 'true';
        this.setAttribute('aria-label', 'Remove from wishlist');

        const text = this.querySelector('.product-info__wishlist-text');
        if (text) text.textContent = 'Saved';
      }
    });
  });

  /**
   * Add product to wishlist (localStorage)
   */
  function addToWishlist(productId) {
    try {
      let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Dispatch event
        document.dispatchEvent(new CustomEvent('wishlist:add', {
          detail: { productId }
        }));
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  }

  /**
   * Remove product from wishlist
   */
  function removeFromWishlist(productId) {
    try {
      let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      wishlist = wishlist.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));

      // Dispatch event
      document.dispatchEvent(new CustomEvent('wishlist:remove', {
        detail: { productId }
      }));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }

  /**
   * Check if product is in wishlist on page load
   */
  const productInfos = document.querySelectorAll('.product-info');
  productInfos.forEach(productInfo => {
    const productId = productInfo.dataset.productId;
    const wishlistButton = productInfo.querySelector('[data-wishlist-toggle]');

    if (wishlistButton && productId) {
      try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (wishlist.includes(productId)) {
          wishlistButton.dataset.saved = 'true';
          wishlistButton.setAttribute('aria-label', 'Remove from wishlist');

          const text = wishlistButton.querySelector('.product-info__wishlist-text');
          if (text) text.textContent = 'Saved';
        }
      } catch (error) {
        console.error('Error checking wishlist:', error);
      }
    }
  });
});

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', (event) => {
  // Handle Enter/Space on variant swatches and buttons
  if (event.key === 'Enter' || event.key === ' ') {
    const target = event.target;

    if (target.classList.contains('product-info__swatch') ||
        target.classList.contains('product-info__variant-button')) {
      event.preventDefault();
      target.click();
    }
  }
});
