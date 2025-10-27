# Product Mega Menu for Prestige Theme Header

This guide explains how to set up and use the Product Mega Menu feature in your Shopify Prestige theme header.

## Overview

The Product Mega Menu allows you to display products directly in your navigation menu with images, descriptions, and prices. When visitors hover over or click a menu item, they'll see a beautiful grid of products that they can click to visit the product pages.

## Features

- Display product images, titles, custom descriptions, and prices in the header menu
- **Add to Cart button** - Customers can add products directly from the menu
- **Custom descriptions** - Write your own description for each product in the menu
- **Toggle price display** - Show or hide prices per product
- **Toggle Add to Cart** - Enable/disable the cart button per product
- Responsive design (4 columns on desktop, 2 on tablet, 1 on mobile)
- Hover effects with smooth animations
- Sale and Sold Out badges
- Fully customizable through the Shopify theme customizer
- Each product is added as a separate block for maximum flexibility

## Setup Instructions

### Step 1: Access the Theme Customizer

1. Go to your Shopify Admin
2. Navigate to **Online Store > Themes**
3. Click **Customize** on your active theme
4. Click on the **Header** section

### Step 2: Add a Product Menu Block

1. In the Header section settings, scroll to the **Blocks** area
2. Click **Add block**
3. Select **Product Menu**
4. Configure the settings:
   - **Menu item**: Enter the exact name of the menu item from your navigation (e.g., "Shop", "Products", "Collections")
   - **Menu Heading**: Enter a heading to display above the products (e.g., "Featured Products")

### Step 3: Add Product Items

1. After adding a Product Menu block, click **Add block** again
2. Select **Product Item**
3. Configure each product:
   - **Product**: Select a product from your store
   - **Custom Description**: Enter a custom description for this product (leave blank to hide)
   - **Show price**: Toggle to show/hide the product price
   - **Show Add to Cart button**: Toggle to show/hide the Add to Cart button
4. Repeat to add more products (recommended: 4-8 products for best display)

### Step 4: Organize Your Menu

1. Make sure you have a menu item in your navigation that matches the "Menu item" name you entered in Step 2
2. You can create or edit menus in **Navigation** under your Shopify Admin

### Step 5: Save and Preview

1. Click **Save** in the theme customizer
2. Hover over the menu item to see your product mega menu in action!

## Example Configuration

**Menu Structure:**
- Home
- Shop ← This will show the product mega menu
- About
- Contact

**Header Blocks:**
1. **Product Menu Block**
   - Menu item: `Shop`
   - Menu Heading: `Featured Products`

2. **Product Item Block** (Add multiple)
   - Product: Select "Product 1"
   - Custom Description: "Perfect for everyday use with premium quality materials"
   - Show price: ✓ Enabled
   - Show Add to Cart button: ✓ Enabled

3. **Product Item Block**
   - Product: Select "Product 2"
   - Custom Description: "Limited edition design, available while supplies last"
   - Show price: ✓ Enabled
   - Show Add to Cart button: ✓ Enabled

4. *(Continue adding more Product Item blocks as needed)*

## Styling Notes

- The mega menu automatically spans the full width of the screen
- Product cards have hover effects that lift them slightly and scale the image
- Sale prices are shown in red with the original price struck through
- Sold out products display a "Sold Out" badge and a disabled button
- Add to Cart buttons have a smooth hover effect with icon and text
- The menu is hidden on mobile devices and uses the standard mobile menu instead
- Each product links to its product page when clicking the image or title
- Add to Cart works directly from the menu without leaving the page

## Tips

- Use high-quality product images for best results (square/1:1 aspect ratio recommended)
- Keep product titles concise (they're displayed at 0.875rem font size)
- Write compelling custom descriptions that highlight key benefits (keep under 150 characters for best display)
- You can add as many products as you want, but 4-8 is recommended for optimal display
- Products are displayed in the order you add the blocks
- Use the "Show price" toggle to hide prices for products you want to showcase differently
- Disable "Add to Cart" for products that require customization (customers can click through to the product page)
- Custom descriptions are perfect for seasonal promotions, highlighting features, or creating urgency

## Troubleshooting

**Menu doesn't appear:**
- Make sure the "Menu item" name in the Product Menu block exactly matches your navigation menu item name (case-sensitive)
- Check that you have both a Product Menu block AND at least one Product Item block

**Products not showing:**
- Ensure you've selected a product in each Product Item block
- Check that the products are published and available

**Add to Cart button not working:**
- Make sure the "Show Add to Cart button" toggle is enabled
- Check that the product has available inventory
- Verify that the product has at least one variant

**Custom description not appearing:**
- Make sure you've entered text in the "Custom Description" field
- The description field supports plain text (no HTML or special formatting)

**Styling issues:**
- Clear your browser cache
- Try viewing in an incognito/private window
- Make sure your theme is up to date

## Technical Details

This feature consists of:
- **Header section modifications** (`sections/header.liquid`)
  - Added `product_menu` block type with menu item and heading settings
  - Added `product_item` block type with custom description, price toggle, and cart button toggle
  - Integrated product menu rendering logic alongside existing mega menu
  - Comprehensive CSS styles for product cards and Add to Cart buttons
- **Product mega menu snippet** (`snippets/product-mega-menu.liquid`)
  - Renders responsive product grid (4 columns desktop, 2 tablet)
  - Handles custom descriptions per product
  - Implements Add to Cart functionality with proper form handling
  - Displays sale/sold-out badges and conditional UI elements
- **Settings per product**:
  - `custom_description` (textarea) - Custom text description
  - `show_price` (checkbox) - Toggle price display
  - `show_add_to_cart` (checkbox) - Toggle cart button

### How Add to Cart Works
- Uses standard Shopify cart form POST to `/cart/add`
- Automatically selects the first available variant
- Quantity is set to 1 per click
- Works with Shopify's cart drawer if enabled in your theme
- Sold out products show disabled button

The product mega menu integrates seamlessly with the existing Prestige theme header system and uses the same disclosure mechanisms as the standard mega menu.
