# AGENT 3: PRODUCT EXTRAS TEMPLATE
## Exclusive Responsibilities

### Overview
Create additional product information sections including reviews, shipping details, FAQ, and related products.

### Files to Create/Modify
- `snippets/product-extras-agent3.liquid` (NEW)
- `assets/product-extras-agent3.css` (NEW)
- `assets/product-extras-agent3.js` (NEW)

### Shopify Development Rules to Follow
1. Use Shopify Liquid templating language
2. Follow naming conventions: `product-extras__*` for CSS classes
3. Implement schema.org microdata for SEO
4. Accessibility: Proper heading hierarchy, ARIA labels
5. Performance: Lazy load recommendations
6. Compliance: GDPR for reviews data

### Deliverables
1. **Product Reviews Section**
   - Display star ratings
   - Review count
   - Individual review cards
   - Reviewer name and date
   - Review text and images
   - Helpful/unhelpful votes
   - Verified purchase badge
   - Review sorting and filtering
   - Write review button (CTA)

2. **Shipping & Returns Info**
   - Shipping cost breakdown
   - Estimated delivery times
   - Shipping policy link
   - Return policy link
   - Warranty information
   - Exchange information
   - Packaging details

3. **Product Specifications/Details**
   - Material/ingredient list
   - Dimensions and weight
   - Care instructions
   - Certifications (organic, fair trade, etc.)
   - Product tags/categories
   - SKU details
   - Barcode/UPC

4. **FAQ Accordion Section**
   - Common questions
   - Answer content
   - Expandable/collapsible design
   - Search FAQ functionality
   - "Ask a question" CTA

5. **Related Products Section**
   - Recommended products
   - Similar products
   - Bestsellers in category
   - Product cards with images
   - Quick view buttons
   - Add to cart buttons
   - 4-6 products displayed
   - Carousel on mobile

6. **Complementary Products Section**
   - Frequently bought together
   - Bundle discount info
   - Product quantity toggle
   - Bundle add to cart

7. **Social Proof**
   - Customer testimonials
   - User-generated content
   - Trust badges
   - Award badges
   - Certification logos

### Code Structure Template
```liquid
<style>
  .product-extras {
    /* overall container */
  }
  .product-extras__reviews {
    /* reviews section */
  }
  .product-extras__shipping {
    /* shipping info */
  }
  .product-extras__accordion {
    /* FAQ accordion */
  }
  .product-extras__related {
    /* related products */
  }
</style>

<div class="product-extras">
  <!-- Reviews section -->
  <!-- Shipping & returns info -->
  <!-- Product specifications -->
  <!-- FAQ accordion -->
  <!-- Related products -->
  <!-- Social proof -->
</div>
```

### Do NOT Modify
- ❌ Product gallery/media (Agent 1's area)
- ❌ Product title/price/variants (Agent 2's area)
- ❌ Add to cart functionality (Agent 2's area)
- ❌ Main product information (Agent 2's area)

### Review Integration
If using third-party review app:
```liquid
<!-- Reviews app embed -->
<!-- Ensure proper schema markup for aggregateRating -->
```

### Testing Checklist
- [ ] Reviews display correctly
- [ ] Ratings calculate properly
- [ ] Accordion opens/closes smoothly
- [ ] FAQ search works
- [ ] Related products load
- [ ] Quick view functions
- [ ] Shipping info is accurate
- [ ] All links work
- [ ] Responsive on all sizes
- [ ] SEO schema markup is valid
- [ ] Performance is optimized
- [ ] Lazy loading works

### SEO Considerations
Include schema.org microdata:
```json
{
  "@type": "Product",
  "name": "{{ product.title }}",
  "offers": {
    "@type": "Offer",
    "price": "{{ product.price }}"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{ product.rating }}",
    "reviewCount": "{{ product.review_count }}"
  }
}
```

### Output
Ensure your snippet can be rendered with:
```liquid
{%- render 'product-extras-agent3',
    product: product,
    block: block
-%}
```
