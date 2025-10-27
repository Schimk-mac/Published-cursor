# Product Mega Menu for Prestige Theme Header

This guide explains how to set up and use the Product Mega Menu feature in your Shopify Prestige theme header.

## Overview

The Product Mega Menu allows you to display products directly in your navigation menu with images, descriptions, and prices. When visitors hover over or click a menu item, they'll see a beautiful grid of products that they can click to visit the product pages.

## Features

- Display product images, titles, descriptions, and prices in the header menu
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
   - **Show product description**: Toggle to show/hide the description
   - **Description length**: Adjust how many characters of the description to show (50-200)
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
   - Show description: ✓ Enabled
   - Description length: 100

3. **Product Item Block**
   - Product: Select "Product 2"
   - Show description: ✓ Enabled
   - Description length: 100

4. *(Continue adding more Product Item blocks as needed)*

## Styling Notes

- The mega menu automatically spans the full width of the screen
- Product cards have hover effects that lift them slightly and scale the image
- Sale prices are shown in red with the original price struck through
- Sold out products display a badge
- The menu is hidden on mobile devices and uses the standard mobile menu instead

## Tips

- Use high-quality product images for best results
- Keep product titles concise (they're displayed at 0.875rem font size)
- Descriptions are automatically truncated to your specified length
- You can add as many products as you want, but 4-8 is recommended for optimal display
- Products are displayed in the order you add the blocks

## Troubleshooting

**Menu doesn't appear:**
- Make sure the "Menu item" name in the Product Menu block exactly matches your navigation menu item name (case-sensitive)
- Check that you have both a Product Menu block AND at least one Product Item block

**Products not showing:**
- Ensure you've selected a product in each Product Item block
- Check that the products are published and available

**Styling issues:**
- Clear your browser cache
- Try viewing in an incognito/private window
- Make sure your theme is up to date

## Technical Details

This feature consists of:
- **Header section modifications** (`sections/header.liquid`)
- **Product mega menu snippet** (`snippets/product-mega-menu.liquid`)
- **CSS styles** (embedded in the header section)
- **Two new block types**: `product_menu` and `product_item`

The product mega menu integrates seamlessly with the existing Prestige theme header system and uses the same disclosure mechanisms as the standard mega menu.
