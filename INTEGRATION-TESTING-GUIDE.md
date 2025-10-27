# Integration Testing Guide - Agent Integrated Product Page

## Overview
This guide provides step-by-step instructions for testing the integrated product page using all three agents' components on the local dev server.

**Dev Server URL:** `http://127.0.0.1:9292`

---

## Pre-Test Checklist

- [ ] Dev server is running (`netstat -ano | grep 9292`)
- [ ] Integration branch is checked out: `integration/all-agents-product-page`
- [ ] All agent files are present:
  - [ ] `snippets/product-gallery-agent1.liquid`
  - [ ] `snippets/product-info-agent2.liquid`
  - [ ] `snippets/product-extras-agent3.liquid`
  - [ ] `sections/main-product-agent-integrated.liquid`
  - [ ] CSS and JS files for all three agents

---

## Testing Phases

### Phase 1: Visual & Layout Testing

#### Desktop (1024px+)
- [ ] **Agent 1 Gallery**
  - [ ] Images display correctly in main carousel
  - [ ] Thumbnails appear on left side
  - [ ] Hover effects work smoothly
  - [ ] Image zoom activates on click
  - [ ] Video player loads and plays
  - [ ] Videos can be full-screened
  - [ ] Smooth carousel transitions

- [ ] **Agent 2 Product Info**
  - [ ] Product title displays
  - [ ] Star rating shows correctly
  - [ ] Price displays (regular/sale format)
  - [ ] Discount badge appears for sale items
  - [ ] Variant selector shows all options
  - [ ] Color swatches display with proper styling
  - [ ] Size/option buttons show correctly
  - [ ] Quantity selector +/- buttons work
  - [ ] Add to cart button is visible and enabled
  - [ ] Wishlist button appears
  - [ ] Trust badges display (Secure Payment, Free Shipping, Easy Returns)
  - [ ] Shipping info section shows (3-5 day delivery, same-day dispatch)
  - [ ] Money-back guarantee box displays

- [ ] **Agent 3 Product Extras**
  - [ ] Reviews section title shows
  - [ ] Star rating summary displays
  - [ ] Review count shows
  - [ ] "Write a Review" button appears
  - [ ] Shipping & Returns section shows 4 cards
  - [ ] Product specs section displays
  - [ ] FAQ section with accordions appears
  - [ ] "Ask a Question" button visible
  - [ ] Related products carousel loads
  - [ ] Complementary products section shows
  - [ ] Social proof badges display
  - [ ] All icons render properly

#### Tablet (768px - 1023px)
- [ ] Gallery adjusts to tablet layout
- [ ] Product info stacks properly
- [ ] All sections remain accessible
- [ ] Touch targets are appropriately sized
- [ ] Spacing is balanced

#### Mobile (< 768px)
- [ ] **Gallery on Mobile**
  - [ ] Full-width thumbnail carousel
  - [ ] Thumbnails are enlarged (responsive sizing)
  - [ ] Horizontal scrolling works smoothly
  - [ ] No scrollbar visible
  - [ ] Touch swipe to navigate works
  - [ ] Layout doesn't break

- [ ] **Product Info on Mobile**
  - [ ] All elements stack vertically
  - [ ] Quantity selector is touch-friendly
  - [ ] Add to cart button is sticky at bottom
  - [ ] Wishlist button is accessible
  - [ ] Variant selection is easy to use

- [ ] **Product Extras on Mobile**
  - [ ] Sections stack without overflow
  - [ ] Accordions expand/collapse smoothly
  - [ ] Related products carousel is responsive
  - [ ] Touch-friendly carousel controls
  - [ ] Grid layouts convert to single column

---

### Phase 2: Functionality Testing

#### Agent 1 - Product Gallery
- [ ] Image carousel navigation
  - [ ] Previous button works
  - [ ] Next button works
  - [ ] Thumbnail clicking updates main image
  - [ ] Keyboard arrow keys navigate (if enabled)

- [ ] Image zoom
  - [ ] Click to zoom activates
  - [ ] Zoom level increases/decreases properly
  - [ ] Zoomed image pans correctly on mobile
  - [ ] Zoom out returns to normal view

- [ ] Video playback
  - [ ] Video loads without errors
  - [ ] Play/pause controls work
  - [ ] Volume control works
  - [ ] Full-screen mode works
  - [ ] Close full-screen properly

#### Agent 2 - Product Info & Purchase
- [ ] Variant selection
  - [ ] Selecting a color swatch updates the product
  - [ ] Selecting a size updates price (if different)
  - [ ] Selected variant appears highlighted
  - [ ] Unavailable variants show as disabled
  - [ ] Price updates correctly when variant changes

- [ ] Quantity selector
  - [ ] Minus button decreases quantity
  - [ ] Plus button increases quantity
  - [ ] Manual input of quantity works
  - [ ] Minimum quantity is enforced (1)
  - [ ] Invalid inputs are corrected

- [ ] Add to cart
  - [ ] Click "Add to Cart" adds item to cart
  - [ ] Button shows loading state
  - [ ] Success message appears (optional)
  - [ ] Out of stock items show "Sold Out"
  - [ ] Out of stock prevents add to cart

- [ ] Wishlist button
  - [ ] Click to save/unsave to wishlist
  - [ ] Button shows "Saved" state
  - [ ] localStorage is updated
  - [ ] Persists on page reload

- [ ] Variant update
  - [ ] Price updates when variant changes
  - [ ] Compare price updates (for sale items)
  - [ ] Discount percentage recalculates
  - [ ] Availability status updates
  - [ ] SKU updates (if different per variant)

#### Agent 3 - Product Extras
- [ ] FAQ accordions
  - [ ] Click question to expand answer
  - [ ] Click again to collapse
  - [ ] Smooth animation on expand/collapse
  - [ ] Keyboard navigation (arrow keys) works
  - [ ] Focus is properly managed

- [ ] Related products carousel
  - [ ] Products load from Shopify API
  - [ ] Carousel scrolls smoothly
  - [ ] Navigation dots update position
  - [ ] Touch/drag scrolling works on mobile
  - [ ] Keyboard arrow navigation works

- [ ] Review section
  - [ ] Rating summary displays correctly
  - [ ] Star count matches review count
  - [ ] Review count displays

---

### Phase 3: Responsive Design Testing

Test at breakpoints: 375px, 480px, 768px, 1024px, 1280px, 1440px

- [ ] No horizontal scrolling at any width
- [ ] Text is readable at all sizes
- [ ] Images scale properly
- [ ] Spacing is balanced
- [ ] Buttons/inputs are touch-friendly (min 44px height)
- [ ] Modals/popups don't overflow

---

### Phase 4: Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Logical tab order (left→right, top→bottom)
- [ ] Focus indicator is visible
- [ ] Spacebar/Enter activates buttons
- [ ] Arrow keys navigate carousels
- [ ] Escape closes any modals

#### Screen Reader (NVDA/JAWS on Windows)
- [ ] Product title is announced
- [ ] Rating is announced properly
- [ ] Price is announced
- [ ] Variant options are labeled
- [ ] Quantity input has label
- [ ] Buttons have descriptive labels
- [ ] Images have alt text
- [ ] Form inputs have labels

#### Color Contrast
- [ ] Text meets WCAG AA (4.5:1 for normal text)
- [ ] Button labels are readable
- [ ] Links are distinguishable

---

### Phase 5: Browser Compatibility

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

### Phase 6: Performance Testing

#### Bundle Sizes
- [ ] `product-gallery-agent1.css` < 100KB
- [ ] `product-gallery-agent1.js` < 100KB (uncompressed)
- [ ] `product-info-agent2.css` < 50KB
- [ ] `product-info-agent2.js` < 50KB (uncompressed)
- [ ] `product-extras-agent3.css` < 50KB
- [ ] `product-extras-agent3.js` < 50KB (uncompressed)

#### Load Times
- [ ] Page loads in < 3 seconds on 4G
- [ ] Product gallery renders in < 1 second
- [ ] Carousel navigation is smooth (60fps)
- [ ] No layout shift when loading images

#### Console Errors
- [ ] Open browser console (F12)
- [ ] No JavaScript errors
- [ ] No 404s for assets
- [ ] No deprecation warnings
- [ ] No CORS errors

---

### Phase 7: Data Validation

#### Product Data
- [ ] Product title displays
- [ ] Price calculation is correct
- [ ] Variants are properly listed
- [ ] Images load
- [ ] Video URLs are correct
- [ ] Out of stock variants show correctly

#### Cart Integration
- [ ] Add to cart sends correct variant ID
- [ ] Quantity is included
- [ ] Cart updates on success
- [ ] Error messages show on failure

#### Form Validation
- [ ] Form validation works
- [ ] Error messages are helpful
- [ ] Required fields are marked
- [ ] Invalid inputs are rejected

---

### Phase 8: Edge Cases

- [ ] Product with 0 images (graceful degradation)
- [ ] Product with 100+ variants (performance)
- [ ] Very long product title (text wrapping)
- [ ] Very long description (truncation/expansion)
- [ ] Rapid variant selection (no race conditions)
- [ ] Rapid add to cart (no duplicate submissions)
- [ ] Quick carousel navigation (smooth transitions)

---

## Test Results Template

### Test Summary
```
Branch: integration/all-agents-product-page
Date: [DATE]
Tester: [YOUR NAME]
Browser: [BROWSER & VERSION]
Device: [DEVICE TYPE]
Viewport: [PIXEL WIDTH]

Overall Status: [ ] PASS [ ] FAIL [ ] PARTIAL
```

### Agent 1 - Gallery
```
Status: [ ] PASS [ ] FAIL [ ] PARTIAL
Issues Found:
- [List any issues]

Notes:
[Any additional observations]
```

### Agent 2 - Product Info
```
Status: [ ] PASS [ ] FAIL [ ] PARTIAL
Issues Found:
- [List any issues]

Notes:
[Any additional observations]
```

### Agent 3 - Product Extras
```
Status: [ ] PASS [ ] FAIL [ ] PARTIAL
Issues Found:
- [List any issues]

Notes:
[Any additional observations]
```

### Performance
```
Page Load Time: [X] seconds
Lighthouse Score: [X]/100
  - Performance: [X]
  - Accessibility: [X]
  - Best Practices: [X]
  - SEO: [X]

Console Errors: [ ] 0 [ ] 1+ (List below)
- [List any errors]
```

### Recommendations
- [Any improvements needed]
- [Configuration changes recommended]
- [Features to add]

---

## Quick Test Steps (5-10 minutes)

If you only have limited time, run this quick test:

1. **Load the page** - Visit product page with Agent Integrated section
2. **Desktop check**
   - [ ] Gallery shows with thumbnails
   - [ ] Product info displays with price
   - [ ] Product extras below with reviews/FAQ
   - [ ] No console errors (F12)

3. **Mobile check** (F12 → Device mode)
   - [ ] Thumbnails are large and scrollable
   - [ ] Product info stacks properly
   - [ ] Sticky add to cart appears
   - [ ] All sections visible without overflow

4. **Interaction check**
   - [ ] Click a thumbnail → main image updates
   - [ ] Click color swatch → variant updates
   - [ ] Click +/- buttons → quantity changes
   - [ ] Click FAQ → accordion expands
   - [ ] Scroll carousel → products move smoothly

5. **Final check**
   - [ ] Click "Add to Cart" → success
   - [ ] No errors in console
   - Report: **PASS** or **FAIL**

---

## Troubleshooting

### If gallery doesn't show:
- Check that Agent 1 files are present
- Verify product has media
- Check browser console for JS errors
- Ensure CSS file is loaded (F12 → Network → product-gallery-agent1.css)

### If variants aren't updating price:
- Check that Agent 2 product data is loading
- Verify variant API response in console
- Check that price elements have correct data attributes

### If FAQ accordions don't work:
- Check that Agent 3 JS file is loaded
- Verify accordion HTML structure
- Check browser console for JS errors
- Ensure event listeners are attached

### If mobile layout breaks:
- Verify media queries in CSS files
- Check viewport meta tag in theme
- Test at exact breakpoints (375px, 768px, 1024px)
- Clear browser cache (Ctrl+Shift+Delete)

---

## Success Criteria

✅ **Testing is complete when:**
- [ ] All three agents load without errors
- [ ] Page renders correctly on desktop, tablet, mobile
- [ ] All interactions work (carousel, variants, accordion, etc.)
- [ ] No console errors or warnings
- [ ] Responsive design works at all breakpoints
- [ ] Accessibility features work (keyboard nav, screen readers)
- [ ] Page loads in < 3 seconds
- [ ] Add to cart functionality works

---

## Next Steps After Testing

1. **Document results** using the Test Results Template above
2. **Fix any issues** found during testing
3. **Create a pull request** when all tests pass
4. **Merge to master** after PR approval
5. **Deploy to production**

---

**Generated:** October 27, 2025
**Branch:** `integration/all-agents-product-page`
**Agents:** Agent 1 (Gallery) + Agent 2 (Info) + Agent 3 (Extras)
