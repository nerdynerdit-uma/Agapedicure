# 🚀 Agape Pedicure - Setup Guide

Complete step-by-step guide to get your premium Next.js website running.

---

## ✅ Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** (optional, for version control)
- A code editor (VS Code recommended)

### Check your versions:

```bash
node --version  # Should be v18 or higher
npm --version   # Should be 9 or higher
```

---

## 📦 Installation Steps

### Step 1: Navigate to Project

```bash
cd /path/to/Agapedicure
```

### Step 2: Install Dependencies

This will install Next.js, React, Tailwind CSS, Framer Motion, and all required packages.

```bash
npm install
```

**Expected time:** 2-3 minutes

If you encounter errors, try:
```bash
npm install --legacy-peer-deps
```

### Step 3: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` with your information:

```env
NEXT_PUBLIC_SITE_URL=https://agapepedicure.nl
NEXT_PUBLIC_PHONE=+31201234567
NEXT_PUBLIC_EMAIL=info@agapepedicure.nl
NEXT_PUBLIC_SIMPLYMEET_URL=https://simplymeet.me/embed/YOUR_USERNAME
```

### Step 4: Run Development Server

```bash
npm run dev
```

**Your site is now running at:** [http://localhost:3000](http://localhost:3000) 🎉

---

## 🎨 Customization Quick Start

### 1. Update Contact Information

**File:** `src/components/Contact.tsx`

```tsx
const contactInfo = [
  {
    icon: '📍',
    title: 'Adres',
    content: ['YOUR STREET', 'YOUR CITY', 'Netherlands'],
  },
  // ... update other info
]
```

### 2. Update Booking URL

**File:** `src/components/Booking.tsx` (line ~50)

```tsx
<iframe
  src="https://simplymeet.me/embed/YOUR_USERNAME"
  // ...
/>
```

### 3. Update Prices

**File:** `src/app/prijzen/page.tsx`

```tsx
const treatments = [
  {
    title: 'Your Treatment',
    price: 50.00,  // Update price
    // ...
  },
]
```

### 4. Change Colors

**File:** `tailwind.config.ts`

```ts
colors: {
  primary: {
    DEFAULT: '#2E7A85',  // Change this
  },
}
```

---

## 🖼️ Adding Your Images

### Image Directory Structure

Create this folder structure:

```
public/
├── images/
│   ├── hero-bg.jpg (3840x2160 or 2560x1440)
│   ├── about-salon.jpg (1200x800)
│   ├── og-image.jpg (1200x630)
│   ├── favicon.ico
│   └── gallery/
│       ├── salon-1.jpg
│       ├── salon-2.jpg
│       └── ...
```

### Replace Placeholder Images

**Hero Background** - `src/components/Hero.tsx` (line ~24):
```tsx
style={{
  backgroundImage: 'url(/images/hero-bg.jpg)',  // Your image
}}
```

**About Section** - `src/components/About.tsx` (line ~25):
```tsx
<Image
  src="/images/about-salon.jpg"  // Your image
  alt="Your salon"
  // ...
/>
```

### Image Optimization Tips

- Use **high-quality JPG** (90% quality)
- **Compress** with [TinyJPG](https://tinyjpg.com/)
- **Recommended sizes:**
  - Hero: 3840x2160 (4K) or 2560x1440
  - Content: 1920x1080
  - Thumbnails: 800x600

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free)

**Easiest and fastest deployment for Next.js**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository (or drag & drop folder)
4. Vercel auto-detects Next.js
5. Click "Deploy"

**Your site will be live in ~2 minutes!**

Environment variables: Add in Vercel dashboard under "Settings" → "Environment Variables"

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Connect your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Click "Deploy"

### Option 3: Traditional Hosting (cPanel, etc.)

```bash
# Build for production
npm run build

# This creates an optimized production build
# Upload the following to your server:
# - .next/
# - public/
# - package.json
# - next.config.js

# On server, run:
npm install --production
npm start
```

**Note:** You'll need Node.js 18+ on your server.

---

## 🔧 Common Issues & Solutions

### Issue: Port 3000 already in use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: Images not showing

- Check that images are in `public/images/`
- Verify paths start with `/` (e.g., `/images/hero.jpg`)
- Clear browser cache (Cmd/Ctrl + Shift + R)

### Issue: Styles not loading

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: TypeScript errors

```bash
# Check what's wrong
npm run type-check

# Usually can be ignored during development
# To disable strict mode temporarily, edit tsconfig.json:
{
  "compilerOptions": {
    "strict": false
  }
}
```

### Issue: Build fails

```bash
# Clear everything and reinstall
rm -rf node_modules .next
npm install
npm run build
```

---

## 🎯 Testing Your Site

### 1. Check Locally

```bash
# Build production version
npm run build

# Run production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

### 2. Test Responsiveness

- Open Chrome DevTools (F12)
- Click device icon (or Cmd/Ctrl + Shift + M)
- Test on different screen sizes:
  - iPhone 12/13/14
  - iPad
  - Desktop 1920px

### 3. Test Performance

Visit [PageSpeed Insights](https://pagespeed.web.dev/)

**Expected scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 4. Test Cross-Browser

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## 📝 Content Checklist

Before going live, update:

- [ ] Contact information (phone, email, address)
- [ ] Booking integration URL
- [ ] Treatment prices and descriptions
- [ ] Opening hours
- [ ] Google Maps location
- [ ] Social media links
- [ ] Privacy policy page
- [ ] Terms & conditions page
- [ ] High-quality images (all placeholders replaced)
- [ ] Favicon and app icons
- [ ] Meta descriptions

---

## 🚀 Going Live Checklist

- [ ] Domain configured (DNS settings)
- [ ] SSL certificate active (HTTPS)
- [ ] Environment variables set
- [ ] Analytics installed (optional)
- [ ] Contact form tested
- [ ] Booking system tested
- [ ] All links work
- [ ] Mobile responsive
- [ ] Fast loading (< 3s)
- [ ] SEO optimized
- [ ] 404 page works
- [ ] Sitemap submitted to Google

---

## 💡 Pro Tips

### 1. Update Content Regularly

Keep your pricing and services up-to-date by editing `src/app/prijzen/page.tsx`

### 2. Monitor Performance

Use [Vercel Analytics](https://vercel.com/analytics) or [Google Analytics](https://analytics.google.com/)

### 3. Backup Regularly

If self-hosting, backup your:
- Database (if you add one later)
- Images in `public/`
- `.env.local` file

### 4. Stay Updated

```bash
# Check for updates
npm outdated

# Update packages (carefully)
npm update

# Major Next.js updates
npm install next@latest react@latest react-dom@latest
```

### 5. Add More Features

Consider adding:
- Blog section
- Customer reviews widget
- Instagram feed
- Newsletter signup
- Multi-language support (i18n)

---

## 📚 Learning Resources

### Next.js
- [Official Docs](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### Tailwind CSS
- [Official Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/) (components)

### Framer Motion
- [Official Docs](https://www.framer.com/motion/)
- [Examples](https://www.framer.com/motion/examples/)

---

## 🆘 Need Help?

### Quick Links
- [Next.js Discord](https://nextjs.org/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

### Common Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run linter
npm run type-check      # Check TypeScript

# Troubleshooting
rm -rf .next            # Clear cache
rm -rf node_modules     # Remove dependencies
npm install             # Reinstall dependencies
```

---

## 🎉 You're All Set!

Your premium Agape Pedicure website is now ready to go live!

**Next steps:**
1. ✅ Complete the content checklist above
2. 🖼️ Add your high-quality images
3. 🎨 Customize colors and branding
4. 🚀 Deploy to Vercel or your preferred host
5. 📈 Monitor and optimize

---

**Questions?** Refer to `README-NEXTJS.md` for detailed documentation.

**Happy building! 🚀**





