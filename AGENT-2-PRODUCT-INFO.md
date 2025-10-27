# AGENT 2: PRODUCT INFO & PURCHASE TEMPLATE
## Exclusive Responsibilities

### Overview
Create the product information component with pricing, variants, and purchase functionality.

### Files to Create/Modify
- `snippets/product-info-agent2.liquid` (NEW)
- `assets/product-info-agent2.css` (NEW)
- `assets/product-info-agent2.js` (NEW)

### Shopify Development Rules to Follow
1. Use Shopify Liquid templating language
2. Follow naming conventions: `product-info__*` for CSS classes
3. Implement Form API for variant selection
4. Use Shopify's payment button
5. Implement proper SEO with structured data
6. Security: Validate all user inputs
7. Accessibility: Proper form labels and error handling

### Deliverables
1. **Product Information Display**
   - Product title
   - Product rating/stars
   - Price (regular and sale)
   - Discount badge if applicable
   - Product description (truncated with read more)
   - SKU and inventory status

2. **Variant Selection**
   - Color/Size/Style options
   - Variant selector component
   - Update price based on selection
   - Show variant availability
   - Visual swatches for colors

3. **Purchase Options**
   - Quantity selector
   - Add to cart button
   - Buy now button
   - Wishlist/save for later button
   - Stock status indicator
   - Out of stock handling

4. **Purchase Assurance**
   - Trust badges (security, shipping)
   - Money-back guarantee text
   - Shipping cost info
   - Delivery time estimates
   - Return policy link

5. **Responsive Design**
   - Desktop: Right column layout
   - Tablet: Adjusted spacing
   - Mobile: Full width, sticky purchase button
   - Proper touch targets (min 48px)

6. **Form Handling**
   - Form validation
   - Error messages
   - Success feedback
   - Loading states

### Code Structure Template
```liquid
<style>
  .product-info {
    /* info section layout */
  }
  .product-info__title {
    /* title styling */
  }
  .product-info__price {
    /* price display */
  }
  .product-info__variants {
    /* variant selector */
  }
  .product-info__add-button {
    /* button styling */
  }
</style>

<div class="product-info">
  <!-- Title and rating -->
  <!-- Price display -->
  <!-- Variant form -->
  <!-- Quantity selector -->
  <!-- Add to cart form -->
  <!-- Trust badges -->
  <!-- Purchase assurance -->
</div>
```

### Do NOT Modify
- ❌ Product gallery/images (Agent 1's area)
- ❌ Reviews and comments (Agent 3's area)
- ❌ Related/recommended products (Agent 3's area)
- ❌ Media display (Agent 1's area)

### Form Integration
Your component should work with the Shopify Form API:
```liquid
<form id="{{ product_form_id }}" method="post" action="/cart/add">
  <!-- variant selection -->
  <!-- quantity input -->
  <!-- submit button -->
</form>
```

### Testing Checklist
- [ ] Product title displays correctly
- [ ] Price updates with variant selection
- [ ] Quantity selector works
- [ ] Add to cart button functions
- [ ] Form validation works
- [ ] Responsive on all screen sizes
- [ ] Touch targets are adequate (min 48px)
- [ ] Loading states display correctly
- [ ] Error messages are clear

### Output
Ensure your snippet can be rendered with:
```liquid
{%- render 'product-info-agent2',
    product: product,
    product_form_id: form_id,
    context: 'main_product'
-%}
```
