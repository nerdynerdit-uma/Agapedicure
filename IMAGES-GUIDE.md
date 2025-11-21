# Agape Pedicure - Images Guide

## 📸 Required Images

This guide explains what images you need and where to place them for the website to look perfect.

---

## Image Directory Structure

Create an `images/` folder in the root directory with the following structure:

```
Agapedicure/
├── images/
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── og-image.jpg
│   ├── hero-bg.jpg
│   ├── about-salon.jpg
│   ├── gallery/
│   │   ├── salon-1.jpg
│   │   ├── salon-2.jpg
│   │   ├── salon-3.jpg
│   │   ├── treatment-1.jpg
│   │   ├── treatment-2.jpg
│   │   └── products.jpg
│   └── icons/
│       ├── icon-72x72.png
│       ├── icon-96x96.png
│       ├── icon-128x128.png
│       ├── icon-144x144.png
│       ├── icon-152x152.png
│       ├── icon-192x192.png
│       ├── icon-384x384.png
│       └── icon-512x512.png
```

---

## 1. Favicon & Icons

### Favicon (Browser Tab Icon)

**Files needed:**
- `favicon-16x16.png` - 16x16 pixels
- `favicon-32x32.png` - 32x32 pixels
- `apple-touch-icon.png` - 180x180 pixels

**Design Guidelines:**
- Use the primary color #2E7A85 as background
- Simple, recognizable symbol (e.g., stylized "A", spa icon, or lotus)
- White or gold (#D4AF37) for the icon itself
- Keep it simple and clean for small sizes

**Tools to Create:**
- [Favicon.io](https://favicon.io/) - Free favicon generator
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive favicon generator
- Adobe Photoshop/Illustrator
- Canva (free tier available)

---

## 2. PWA Icons

**Files needed:** (All square, PNG format)
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

**Design:**
- Same design as favicon but higher resolution
- Should work at any size
- Include some padding (safe zone of 10% on all sides)
- Use brand colors: #2E7A85 background with white/gold icon

**Quick Generation:**
1. Create one high-res icon (1024x1024)
2. Use [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) to create all sizes:
   ```bash
   npx pwa-asset-generator icon-source.png images/icons/
   ```

---

## 3. Open Graph Image (Social Media Preview)

**File:** `og-image.jpg`
**Size:** 1200x630 pixels
**Format:** JPG (optimized)

**Content:**
- Website name: "Agape Pedicure"
- Tagline: "Premium Voetenverzorging"
- Beautiful spa/pedicure background image
- Brand colors prominent
- Text should be readable on mobile

**Tools:**
- [Canva](https://www.canva.com/) - Use "Facebook Post" template
- Adobe Photoshop
- [Pablo by Buffer](https://pablo.buffer.com/)

**Example Layout:**
```
┌────────────────────────────────────┐
│                                    │
│   [Beautiful spa background]       │
│                                    │
│   ┌──────────────────────┐        │
│   │  AGAPE PEDICURE      │        │
│   │  Premium             │        │
│   │  Voetenverzorging    │        │
│   └──────────────────────┘        │
│                                    │
└────────────────────────────────────┘
```

---

## 4. Hero Background

**File:** Replace the Unsplash URL in CSS with your own image
**Location:** `styles.css` line ~238

**Current (placeholder):**
```css
background: url('https://images.unsplash.com/photo-1560750588-73207b1ef5b8?...')
```

**Replace with:**
```css
background: url('images/hero-bg.jpg')
```

**Requirements:**
- **Size:** 3840x2160 pixels (4K) or minimum 2560x1440
- **Format:** JPG (optimized to ~500KB max)
- **Content:** 
  - Beautiful pedicure salon or spa environment
  - Luxury, clean, serene atmosphere
  - Neutral/soft colors that work with teal overlay
  - Avoid busy patterns
- **Compression:** Use TinyJPG or ImageOptim

**Where to Find:**
- Professional photographer (recommended)
- Stock photos: Unsplash, Pexels, Pixabay (free)
- Premium stock: Shutterstock, Adobe Stock

**Search terms:**
- "luxury pedicure salon"
- "spa interior modern"
- "foot spa luxury"
- "wellness salon interior"

---

## 5. About Section Image

**File:** `about-salon.jpg`
**Current location:** `index.html` line ~98

**Replace:**
```html
<img src="images/about-salon.jpg" alt="Luxe pedicure salon">
```

**Requirements:**
- **Size:** 1200x800 pixels (3:2 aspect ratio)
- **Format:** JPG
- **Content:**
  - Interior shot of your salon
  - Show treatment chair or relaxation area
  - Good lighting, professional quality
  - Showcase cleanliness and luxury

---

## 6. Gallery Images

**Location:** `index.html` lines ~454-489
**Files needed:** 6 images

### Gallery Image Specifications

All images should be:
- **Size:** 800x600 pixels (4:3 ratio)
- **Format:** JPG (WebP if possible)
- **Quality:** High quality but optimized

### Suggested Images:

1. **salon-1.jpg** - Main salon overview
2. **salon-2.jpg** - Treatment room/chair
3. **salon-3.jpg** - Reception or waiting area
4. **treatment-1.jpg** - Close-up of pedicure treatment
5. **treatment-2.jpg** - Products or spa elements
6. **products.jpg** - Display of premium products used

**Replace in HTML:**
```html
<img src="images/gallery/salon-1.jpg" alt="Salon interieur">
<img src="images/gallery/salon-2.jpg" alt="Behandelruimte">
<img src="images/gallery/treatment-1.jpg" alt="Pedicure behandeling">
<img src="images/gallery/products.jpg" alt="Producten">
<img src="images/gallery/salon-3.jpg" alt="Relaxruimte">
<img src="images/gallery/treatment-2.jpg" alt="Details">
```

---

## 🎨 Image Quality Guidelines

### For 4K/High-End Quality:

1. **Resolution:**
   - Hero images: 3840x2160 (4K) or 2560x1440 minimum
   - Content images: 2x the display size minimum
   - Gallery: 1600x1200 for retina displays

2. **Format:**
   - **JPG**: For photos (use for most images)
   - **PNG**: For graphics with transparency
   - **WebP**: Modern format, best compression (ideal for production)

3. **Optimization:**
   - Always optimize images before upload
   - Target: < 500KB for hero, < 200KB for content images
   - Use progressive JPEGs for faster perceived loading

4. **Tools for Optimization:**
   - [TinyPNG/TinyJPG](https://tinypng.com/) - Free, excellent compression
   - [Squoosh](https://squoosh.app/) - Google's image optimizer
   - [ImageOptim](https://imageoptim.com/) - Mac app
   - Adobe Photoshop: "Save for Web"

---

## 📝 Image Naming Conventions

- Use lowercase
- Use hyphens, not underscores
- Be descriptive
- Include dimensions if you have multiple versions

**Good examples:**
```
hero-bg-4k.jpg
about-salon-1200x800.jpg
gallery-treatment-room.jpg
favicon-32x32.png
```

**Bad examples:**
```
IMG_1234.jpg
image1.png
picture.jpeg
```

---

## 🔄 Converting Placeholder URLs to Local Images

### Current placeholders in the code:

1. **Hero Background** (`styles.css` line 238)
2. **About Image** (`index.html` line 98)
3. **Gallery Images** (`index.html` lines 454-489)

### How to replace:

1. Download or create your images
2. Place them in the `images/` folder
3. Update the HTML/CSS references
4. Test locally to ensure images load

**Example:**

Before:
```html
<img src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&h=800&fit=crop" alt="Salon">
```

After:
```html
<img src="images/about-salon.jpg" alt="Agape Pedicure salon interieur met luxe pedicure stoelen">
```

---

## 📱 Responsive Images (Advanced)

For even better performance, use responsive images:

```html
<picture>
  <source 
    srcset="images/hero-bg-mobile.jpg" 
    media="(max-width: 768px)">
  <source 
    srcset="images/hero-bg-tablet.jpg" 
    media="(max-width: 1200px)">
  <img 
    src="images/hero-bg-desktop.jpg" 
    alt="Agape Pedicure luxury salon interior">
</picture>
```

---

## ✅ Image Checklist

Before launching, ensure you have:

- [ ] Favicon (16x16, 32x32)
- [ ] Apple touch icon (180x180)
- [ ] PWA icons (all 8 sizes)
- [ ] Open Graph image (1200x630)
- [ ] Hero background (4K quality)
- [ ] About section image
- [ ] 6 gallery images
- [ ] All images optimized (TinyPNG/ImageOptim)
- [ ] All images have descriptive alt text
- [ ] Local images replace Unsplash placeholders
- [ ] Images folder structure created
- [ ] Images display correctly on all devices

---

## 🎨 Brand Photography Tips

### For professional photoshoot:

1. **Lighting:**
   - Natural light is best
   - Avoid harsh shadows
   - Golden hour for warmest tones

2. **Styling:**
   - Clean, minimalist aesthetic
   - Brand colors visible but subtle
   - Fresh flowers or plants for accent

3. **Shots to Get:**
   - Wide salon overview
   - Treatment chair close-up
   - Hand/foot treatment in progress
   - Product details
   - Reception area
   - Waiting area comfort

4. **Post-Processing:**
   - Consistent color grading
   - Enhance brand colors slightly
   - Maintain natural look
   - Don't over-saturate

---

## 📊 Performance Metrics

**Target metrics:**
- Hero image: < 500KB
- Content images: < 200KB each
- Total page size: < 3MB
- Largest Contentful Paint: < 2.5s

Use [Google PageSpeed Insights](https://pagespeed.web.dev/) to test after adding images.

---

## 🆘 Quick Start (Using Placeholders)

If you don't have images ready yet:

1. The current Unsplash URLs will work as beautiful placeholders
2. All functionality will work perfectly
3. Replace with your own images when ready
4. Just create the `images/` folder and add icons/favicons first

---

**Need help with images? Contact a professional photographer or use the recommended tools above!**





