# AGENT 1: PRODUCT GALLERY TEMPLATE
## Exclusive Responsibilities

### Overview
Create the product gallery component with full media support (images, videos, 3D models) and interactive features.

### Files to Create/Modify
- `snippets/product-gallery-agent1.liquid` (NEW)
- `assets/product-gallery-agent1.css` (NEW)
- `assets/product-gallery-agent1.js` (NEW)

### Shopify Development Rules to Follow
1. Use Shopify Liquid templating language
2. Follow naming conventions: `product-gallery__*` for CSS classes
3. Implement responsive design (mobile-first approach)
4. Use Shopify's image CDN with proper sizing
5. Accessibility: Include ARIA labels, alt text, keyboard navigation

### Deliverables
1. **Image Gallery Features**
   - Multiple image display
   - Thumbnail navigation (responsive)
   - Image zoom functionality
   - Mobile swipe support
   - Lazy loading for performance

2. **Media Support**
   - Video embed support
   - 3D model support
   - Video preview images
   - Media type badges

3. **Responsive Design**
   - Desktop: Side-by-side layout (images + thumbnails)
   - Tablet: Adjusted proportions
   - Mobile: Full-width carousel (already implemented)
   - Thumbnail sizing: 92px-172px (mobile), 56px (desktop)

4. **Accessibility**
   - ARIA labels for screen readers
   - Keyboard navigation (arrow keys)
   - Alt text for all images
   - Focus indicators

5. **Performance**
   - Lazy loading images
   - Optimized image sizes
   - Smooth animations (CSS-based)
   - No scrollbar on mobile (already implemented)

### Code Structure Template
```liquid
<style>
  /* Product gallery styles */
  .product-gallery {
    /* responsive grid layout */
  }
  .product-gallery__carousel {
    /* main image display */
  }
  .product-gallery__thumbnail {
    /* thumbnail styling */
  }
</style>

<product-gallery>
  <!-- Main carousel area -->
  <!-- Thumbnail list -->
  <!-- Video/model controls -->
  <!-- Zoom button -->
</product-gallery>
```

### Do NOT Modify
- ❌ Product information (Agent 2's area)
- ❌ Reviews and ratings (Agent 3's area)
- ❌ Related products (Agent 3's area)
- ❌ Add to cart buttons (Agent 2's area)

### Testing Checklist
- [ ] Images load correctly
- [ ] Thumbnails are responsive
- [ ] Zoom works on desktop
- [ ] Mobile swipe works
- [ ] Videos play correctly
- [ ] No scrollbar visible on mobile
- [ ] Accessibility features work
- [ ] Performance is optimized

### Output
Ensure your snippet can be rendered with:
```liquid
{%- render 'product-gallery-agent1',
    product: product,
    product_form_id: form_id,
    enable_image_zoom: true,
    mobile_controls: 'thumbnails'
-%}
```
