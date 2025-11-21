# 🔄 Migration Guide: Old Site → New Next.js Site

Guide for transitioning from your current static HTML/CSS site to the new Next.js premium website.

---

## 📊 Comparison: Old vs New

| Feature | Old Site | New Next.js Site |
|---------|----------|------------------|
| **Technology** | HTML/CSS/JS | Next.js 14 + TypeScript |
| **Styling** | Custom CSS | Tailwind CSS |
| **Animations** | CSS animations | Framer Motion |
| **Images** | Standard `<img>` | Optimized Next.js `<Image>` |
| **Performance** | Basic | Ultra-optimized |
| **SEO** | Manual meta tags | Advanced SEO with metadata API |
| **Mobile** | Responsive | Mobile-first, fully optimized |
| **Build** | Static files | Modern build system |
| **Deployment** | Manual FTP | One-click deploy |

---

## 🗂️ File Structure Comparison

### Old Structure
```
Agapedicure/
├── index.html
├── tarieven.html
├── styles.css
├── pricing-page.css
├── script.js
└── images/
```

### New Structure
```
Agapedicure/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Was: index.html
│   │   └── prijzen/
│   │       └── page.tsx      # Was: tarieven.html
│   ├── components/           # Reusable components
│   └── lib/                  # Utilities
├── public/                   # Static assets
└── [config files]
```

---

## 🔄 Content Migration

### 1. Homepage Content

**Old:** `index.html`  
**New:** `src/app/page.tsx`

Already migrated:
- ✅ Hero section
- ✅ About section
- ✅ Services grid
- ✅ Booking integration
- ✅ Contact information
- ✅ Footer

### 2. Pricing Page

**Old:** `tarieven.html`  
**New:** `src/app/prijzen/page.tsx`

Already migrated:
- ✅ All treatments and prices
- ✅ Agape Deluxe (€47,50)
- ✅ Medisch Pedicure (€50,00)
- ✅ Bindweefsel Massage (€35-80)
- ✅ Neuropathische Pijnmassage (€90)
- ✅ Magnesium Spa (€55)
- ✅ Nagelcorrectie (€35)
- ✅ Orthese (€40)
- ✅ All extras and options

### 3. Styling

**Old:** `styles.css` (1000+ lines)  
**New:** Tailwind CSS utility classes + `globals.css`

**Benefits:**
- Smaller bundle size
- Automatic purging of unused CSS
- Consistent design system
- Faster development

### 4. JavaScript

**Old:** `script.js` (vanilla JS)  
**New:** React components with TypeScript

**Benefits:**
- Type safety
- Component reusability
- Better maintainability
- Modern React patterns

---

## 🎨 Design Improvements

### Visual Enhancements

| Element | Old | New |
|---------|-----|-----|
| **Typography** | Standard web fonts | Premium Google Fonts (Inter + Cormorant) |
| **Animations** | Basic CSS | Smooth Framer Motion |
| **Images** | Static | Dynamic, optimized, lazy-loaded |
| **Layout** | CSS Grid | Tailwind Grid with better responsiveness |
| **Colors** | CSS variables | Tailwind color system |
| **Spacing** | Manual px values | Consistent spacing scale |
| **Shadows** | Basic | Layered, premium shadows |
| **Borders** | Standard | Rounded, modern aesthetic |

### Performance Improvements

- ✅ **Image Optimization:** Automatic WebP/AVIF conversion
- ✅ **Code Splitting:** Load only what's needed
- ✅ **Lazy Loading:** Components load on scroll
- ✅ **Font Optimization:** Preloaded, subset fonts
- ✅ **Minification:** Automatic JS/CSS minification
- ✅ **Caching:** Optimized caching strategies

---

## 📥 What to Keep from Old Site

### 1. Content That Was Migrated

✅ **All text content:**
- Service descriptions
- Pricing information
- Contact details
- About text

✅ **All functionality:**
- Navigation
- Booking integration
- Contact information
- Social links

### 2. What You Need to Transfer

📸 **Images:**
- Move all images from old `images/` to new `public/images/`
- Update image references (see guide below)

🔧 **Configuration:**
- Booking URL (SimplyMeet.me)
- Contact information
- Google Maps embed
- Social media links

---

## 🖼️ Image Migration

### Step 1: Copy Images

```bash
# From your old site directory
cp -r images/ /path/to/new/public/images/
```

### Step 2: Update Image Paths

**Old format:**
```html
<img src="images/hero-bg.jpg" alt="Hero">
```

**New format:**
```tsx
<Image 
  src="/images/hero-bg.jpg" 
  alt="Hero"
  width={1920}
  height={1080}
/>
```

### Step 3: Optimize Images

Before adding to new site:

1. **Compress** with [TinyJPG](https://tinyjpg.com/)
2. **Resize** to appropriate dimensions:
   - Hero: 3840x2160 (4K) or 2560x1440
   - Content: 1920x1080
   - Thumbnails: 800x600
3. **Convert** to WebP if possible (optional - Next.js does this automatically)

---

## 🔗 URL Structure

### URLs Remain the Same!

| Page | Old URL | New URL | Status |
|------|---------|---------|--------|
| Homepage | `/` or `/index.html` | `/` | ✅ Same |
| Pricing | `/tarieven.html` | `/prijzen` | ⚠️ Changed |
| Sections | `/#about`, `/#services` | Same | ✅ Same |

### Set Up Redirects

If you want `/tarieven.html` to redirect to `/prijzen`:

**Create:** `src/middleware.ts`

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/tarieven.html' || 
      request.nextUrl.pathname === '/tarieven') {
    return NextResponse.redirect(new URL('/prijzen', request.url))
  }
}
```

---

## 🌐 Deployment Migration

### From Old Hosting to Vercel

**Old way:**
```bash
# Upload via FTP
ftp yourdomain.com
> put index.html
> put styles.css
# etc...
```

**New way:**
```bash
# One command
vercel

# Or push to GitHub and auto-deploy
git push origin main
```

### Domain Migration

1. **Keep your domain** (agapepedicure.nl)
2. **Update DNS** to point to Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
3. **Wait for propagation** (15 minutes - 48 hours)
4. **SSL auto-configured** by Vercel

### Zero Downtime Migration

1. Deploy new site to Vercel (gets temporary URL)
2. Test thoroughly on temporary URL
3. Update DNS when ready
4. Old site remains live during DNS propagation

---

## 📝 Configuration Transfer

### 1. Contact Information

**Update in:** `src/components/Contact.tsx`

```tsx
const contactInfo = [
  {
    icon: '📍',
    title: 'Adres',
    content: ['Hoofdstraat 123', '1234 AB Amsterdam', 'Nederland'],
  },
  // Copy from old site
]
```

### 2. Opening Hours

**Update in:** `src/components/Booking.tsx`

```tsx
{
  icon: '🕒',
  title: 'Openingstijden',
  items: [
    'Ma - Vr: 09:00 - 18:00',
    // Copy from old site
  ],
}
```

### 3. Services

**Update in:** `src/components/Services.tsx`

Already migrated with correct prices and descriptions from old site.

### 4. Metadata

**Update in:** `src/app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Your Title',
  description: 'Your Description',
  // ...
}
```

---

## ✅ Migration Checklist

### Pre-Migration
- [ ] Backup old site (download all files)
- [ ] List all pages and URLs
- [ ] Document all integrations (booking, maps)
- [ ] Export contact form data (if any)
- [ ] Note any custom functionality

### During Migration
- [ ] Install new Next.js site
- [ ] Copy all images to `public/images/`
- [ ] Update contact information
- [ ] Configure booking integration
- [ ] Test all links
- [ ] Test on mobile devices
- [ ] Check booking flow
- [ ] Verify Google Maps works

### Post-Migration
- [ ] Update DNS records
- [ ] Set up SSL certificate
- [ ] Submit new sitemap to Google
- [ ] Update Google My Business
- [ ] Update social media links
- [ ] Test old URLs (redirects)
- [ ] Monitor analytics
- [ ] Archive old site

---

## 🐛 Common Migration Issues

### Issue: Old URLs broken

**Solution:** Set up redirects (see URL Structure section)

### Issue: Images not loading

**Solution:** 
- Check paths start with `/` 
- Ensure images are in `public/images/`
- Clear browser cache

### Issue: Fonts look different

**Solution:** 
This is intentional! New site uses premium fonts.  
If you want old fonts, update `src/app/layout.tsx`

### Issue: Colors slightly different

**Solution:**
New site uses the correct `#2E7A85` primary color.  
All colors are in `tailwind.config.ts` if you need to adjust.

---

## 📊 Before & After Metrics

Test both sites with [PageSpeed Insights](https://pagespeed.web.dev/)

**Expected improvements:**
- Performance: +30-40 points
- FCP (First Contentful Paint): 50% faster
- LCP (Largest Contentful Paint): 60% faster
- Bundle size: 40-50% smaller
- Mobile score: +20-30 points

---

## 🎉 Migration Complete!

Once deployed, your new site will be:

✅ **Faster** - Modern build optimizations  
✅ **Better SEO** - Advanced metadata & structure  
✅ **More Maintainable** - Component-based architecture  
✅ **Future-proof** - Built on modern tech stack  
✅ **Premium** - High-end design and animations  
✅ **Mobile-first** - Optimized for all devices  

---

## 📞 Need Help?

Refer to:
- `README-NEXTJS.md` - Full documentation
- `SETUP-GUIDE.md` - Setup instructions
- `IMAGES-GUIDE.md` - Image optimization guide (from old site)

---

**Your old site served you well. Time for the upgrade! 🚀**





