# PRODUCT PAGE TEMPLATE - MULTI-AGENT COORDINATION
## Overview
Three agents working simultaneously on a complete Shopify product page template without overlapping responsibilities.

---

## AGENT DISTRIBUTION MAP

### ✅ AGENT 1: PRODUCT GALLERY
**Responsibility:** Media display and interaction
- Product images carousel
- Image thumbnails
- Video support
- 3D model support
- Image zoom
- Mobile swipe gestures
- Lazy loading
- Media badges

**Files:**
- `snippets/product-gallery-agent1.liquid`
- `assets/product-gallery-agent1.css`
- `assets/product-gallery-agent1.js`

---

### ✅ AGENT 2: PRODUCT INFO & PURCHASE
**Responsibility:** Product details and buying options
- Product title and rating
- Pricing (regular, sale, variants)
- Variant/option selection
- Quantity selector
- Add to cart button
- Buy now button
- Stock status
- Trust badges
- Purchase assurance

**Files:**
- `snippets/product-info-agent2.liquid`
- `assets/product-info-agent2.css`
- `assets/product-info-agent2.js`

---

### ✅ AGENT 3: PRODUCT EXTRAS
**Responsibility:** Additional information and engagement
- Customer reviews and ratings
- Shipping & returns info
- Product specifications
- FAQ accordion
- Related products
- Complementary products
- Social proof
- User testimonials

**Files:**
- `snippets/product-extras-agent3.liquid`
- `assets/product-extras-agent3.css`
- `assets/product-extras-agent3.js`

---

## NO OVERLAP GUARANTEE

| Component | Agent 1 | Agent 2 | Agent 3 | Status |
|-----------|---------|---------|---------|--------|
| Images & Media | ✅ | ❌ | ❌ | Exclusive to Agent 1 |
| Product Info | ❌ | ✅ | ❌ | Exclusive to Agent 2 |
| Purchase Form | ❌ | ✅ | ❌ | Exclusive to Agent 2 |
| Reviews & Ratings | ❌ | ❌ | ✅ | Exclusive to Agent 3 |
| Related Products | ❌ | ❌ | ✅ | Exclusive to Agent 3 |
| Shipping Info | ❌ | ❌ | ✅ | Exclusive to Agent 3 |
| FAQ | ❌ | ❌ | ✅ | Exclusive to Agent 3 |

---

## PARALLEL WORKFLOW

### Phase 1: Individual Development (Simultaneous)
```
Agent 1                Agent 2                Agent 3
├─ Create gallery      ├─ Create info form    ├─ Create reviews section
├─ Add thumbnails      ├─ Add price logic     ├─ Add shipping info
├─ Video support       ├─ Variants selector   ├─ Add FAQ
├─ Mobile swipe        ├─ Add to cart form    ├─ Related products
└─ Testing (Agent1)    └─ Testing (Agent2)    └─ Testing (Agent3)
```

### Phase 2: Integration (Sequential)
1. Agent 1 completes `product-gallery-agent1.liquid`
2. Agent 2 completes `product-info-agent2.liquid`
3. Agent 3 completes `product-extras-agent3.liquid`
4. Combine into main `main-product.liquid`

### Phase 3: Final Assembly
```liquid
{%- render 'product-gallery-agent1',
    product: product,
    product_form_id: product_form_id
-%}

{%- render 'product-info-agent2',
    product: product,
    product_form_id: product_form_id
-%}

{%- render 'product-extras-agent3',
    product: product
-%}
```

---

## SHOPIFY BEST PRACTICES

### Code Standards
- Use Liquid templating language
- Follow CSS naming convention: `component__element--modifier`
- Mobile-first responsive design approach
- Lazy loading for performance
- Semantic HTML for accessibility

### Accessibility (WCAG 2.1 AA)
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] ARIA labels for screen readers
- [ ] Keyboard navigation support
- [ ] Color contrast ratios (4.5:1 minimum)
- [ ] Alt text for all images
- [ ] Form labels and error messages

### Performance
- [ ] Lazy load images
- [ ] Minimize JavaScript
- [ ] CSS-based animations preferred
- [ ] Optimize image sizes
- [ ] Lighthouse score > 80

### SEO
- [ ] Schema.org structured data
- [ ] Proper meta tags
- [ ] Open Graph tags
- [ ] Semantic HTML
- [ ] Fast page load

### Security
- [ ] Validate all user inputs
- [ ] No hardcoded sensitive data
- [ ] Follow Shopify API best practices
- [ ] Use Shopify's built-in security features

---

## COMMUNICATION PROTOCOL

### Before Starting
- ✅ Read your specific agent file
- ✅ Understand your exclusive responsibilities
- ✅ Check the no-overlap guarantee
- ✅ Review Shopify best practices

### During Development
- ✅ Create files with agent suffix (e.g., `gallery-agent1.liquid`)
- ✅ Do NOT modify other agents' files
- ✅ Document your code with comments
- ✅ Test thoroughly before submitting

### File Naming Convention
```
snippets/[component]-agent[1-3].liquid
assets/[component]-agent[1-3].css
assets/[component]-agent[1-3].js
```

### Testing Before Integration
Each agent should test:
1. Desktop view (1920px+)
2. Tablet view (768px-999px)
3. Mobile view (320px-767px)
4. Accessibility (keyboard navigation, screen reader)
5. Performance (Lighthouse)
6. Cross-browser compatibility

---

## INTEGRATION CHECKLIST

### Agent 1 Completion
- [ ] Gallery renders correctly
- [ ] Thumbnails responsive (92px-172px mobile, 56px desktop)
- [ ] No scrollbar on mobile
- [ ] Images lazy load
- [ ] Video/media support works
- [ ] Zoom works on desktop
- [ ] Mobile swipe works
- [ ] All tests pass

### Agent 2 Completion
- [ ] Product info displays
- [ ] Variants selection works
- [ ] Price updates with selection
- [ ] Add to cart button functional
- [ ] Form validates correctly
- [ ] Responsive on all screens
- [ ] Touch targets adequate (48px+)
- [ ] All tests pass

### Agent 3 Completion
- [ ] Reviews display correctly
- [ ] FAQ accordion works
- [ ] Related products load
- [ ] Shipping info accurate
- [ ] All links functional
- [ ] Lazy loading works
- [ ] SEO schema valid
- [ ] All tests pass

---

## FINAL INTEGRATION

Once all agents complete their sections:

```bash
# Step 1: Create main-product-integrated.liquid
# Step 2: Import all three components
# Step 3: Test full page integration
# Step 4: Performance testing
# Step 5: Deploy to main-product.liquid
```

---

## SUPPORT & QUESTIONS

For questions about:
- **Agent 1 responsibilities:** Check `AGENT-1-PRODUCT-GALLERY.md`
- **Agent 2 responsibilities:** Check `AGENT-2-PRODUCT-INFO.md`
- **Agent 3 responsibilities:** Check `AGENT-3-PRODUCT-EXTRAS.md`
- **General workflow:** See this file

**DO NOT:** Modify files outside your agent number
**DO:** Test thoroughly before submission
**DO:** Document your code clearly

---

## SUCCESS CRITERIA

✅ All three components work independently
✅ No code conflicts or overlapping
✅ Integrated seamlessly into product page
✅ Responsive on all devices
✅ Accessibility compliant (WCAG 2.1 AA)
✅ Performance optimized (Lighthouse 80+)
✅ Follows Shopify best practices
✅ Full test coverage passing
