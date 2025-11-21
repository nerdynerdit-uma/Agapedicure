# Agape Pedicure - Premium Next.js Website

A **high-end, 4K UHD** premium website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![Primary Color](https://via.placeholder.com/150x50/2E7A85/FFFFFF?text=%232E7A85)

---

## 🎨 Design Philosophy

**Inspired by:** Apple, Tesla, BYD — Minimalist luxury with maximum impact

### Key Features:
- ✨ **Ultra-sharp 4K/Retina optimized** visuals
- 🎭 **Cinematic animations** with Framer Motion
- 📱 **Fully responsive** design (mobile-first)
- ⚡ **Blazing fast** with Next.js 14 App Router
- 🎯 **SEO optimized** with metadata and structured data
- ♿ **Accessible** (WCAG 2.1 compliant)
- 🎨 **Modern design system** with Tailwind CSS
- 🖼️ **Optimized images** with Next.js Image component

---

## 🚀 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Inter (sans-serif), Cormorant Garamond (serif)
- **Deployment:** Vercel (recommended)

---

## 📂 Project Structure

```
agape-pedicure/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── prijzen/
│   │   │   └── page.tsx        # Pricing page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── Navigation.tsx      # Sticky navigation with scroll effects
│   │   ├── Hero.tsx            # Cinematic hero with parallax
│   │   ├── About.tsx           # About section
│   │   ├── Services.tsx        # Service cards with hover effects
│   │   ├── Booking.tsx         # Booking integration
│   │   ├── Contact.tsx         # Contact section with map
│   │   ├── Footer.tsx          # Footer
│   │   ├── AnimatedSection.tsx # Reusable animation components
│   │   └── SectionHeading.tsx  # Consistent section headers
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.js             # Next.js configuration
└── package.json               # Dependencies

```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 2: Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- Update contact information
- Add your SimplyMeet.me booking URL
- Configure Google Maps embed (optional)

### Step 3: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

---

## 🎨 Customization

### Colors

All colors are defined in `tailwind.config.ts`:

```ts
colors: {
  primary: {
    DEFAULT: '#2E7A85',  // Main teal color
    dark: '#1f5259',
    light: '#4a9da8',
  },
  secondary: {
    DEFAULT: '#D4AF37',  // Gold accent
  },
}
```

### Typography

Fonts are configured in `src/app/layout.tsx`:

```ts
const inter = Inter({ ... })
const cormorant = Cormorant_Garamond({ ... })
```

To change fonts, import different Google Fonts or use custom fonts.

### Animations

Animation settings in `tailwind.config.ts`:

```ts
animation: {
  'fade-in': 'fadeIn 0.6s ease-out',
  'fade-up': 'fadeUp 0.8s ease-out',
  // Add more...
}
```

Framer Motion animations in components use easing curve `[0.22, 1, 0.36, 1]` for smooth, luxury feel.

---

## 🎯 Key Pages

### Homepage (`/`)
- Cinematic hero with parallax scrolling
- About section with image and features
- Services grid with hover effects
- Booking integration (SimplyMeet.me)
- Contact form with Google Maps
- Footer with links and social

### Pricing Page (`/prijzen`)
- Detailed treatment listings
- Pricing with extras/options
- Benefits and descriptions
- Direct booking CTAs
- Insurance information

---

## 🖼️ Image Optimization

### Using Next.js Image Component

All images use Next.js `<Image>` component for automatic optimization:

```tsx
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={1200}
  height={800}
  quality={90}
  priority // For above-fold images
/>
```

### Image Requirements

- **Format:** AVIF, WebP, or high-quality JPG
- **Resolution:** 2x display size (Retina)
- **Hero images:** 3840x2160 (4K) or minimum 2560x1440
- **Content images:** 1920x1080 minimum
- **Compression:** Use tools like TinyPNG, Squoosh

### Image Locations

Place images in `public/images/`:
```
public/
├── images/
│   ├── hero-bg.jpg
│   ├── about-salon.jpg
│   ├── gallery/
│   └── ...
```

Update image paths in components:
```tsx
<Image src="/images/hero-bg.jpg" ... />
```

---

## 🎭 Animations

### Framer Motion Variants

Consistent animation patterns used throughout:

```tsx
// Fade up
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}

// Scale in
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}

// Slide in
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
```

### Reusable Animation Components

```tsx
import { ScaleIn, SlideIn, FadeIn } from '@/components/AnimatedSection'

<ScaleIn delay={0.2}>
  <YourComponent />
</ScaleIn>
```

---

## 📱 Responsive Breakpoints

Tailwind CSS breakpoints:

```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

---

## ⚡ Performance Optimization

### Already Implemented:
- ✅ Next.js Image optimization
- ✅ Font optimization (next/font)
- ✅ Lazy loading with Intersection Observer
- ✅ Code splitting (automatic with Next.js)
- ✅ CSS optimization with Tailwind
- ✅ Framer Motion lazy loading

### Additional Optimizations:

**1. Enable Compression (Vercel automatic)**

**2. Add Analytics:**
```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**3. Optimize Animations:**
- Reduce motion for users who prefer it (already implemented)
- Use `will-change` CSS property sparingly

---

## 🧪 Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Build Test

```bash
npm run build
```

---

## 🔧 Configuration Files

### `next.config.js`
- Image optimization settings
- Remote image patterns
- Experimental features

### `tailwind.config.ts`
- Custom colors, fonts, animations
- Responsive breakpoints
- Plugin configuration

### `tsconfig.json`
- TypeScript compiler options
- Path aliases (`@/*`)

---

## 📊 SEO Features

### Implemented:
- ✅ Metadata API (Next.js 14)
- ✅ Open Graph tags
- ✅ Twitter cards
- ✅ Structured data (JSON-LD)
- ✅ Semantic HTML
- ✅ Accessible navigation
- ✅ Mobile-friendly
- ✅ Fast loading times

### Adding Sitemap:

Create `src/app/sitemap.ts`:
```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://agapepedicure.nl',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://agapepedicure.nl/prijzen',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

### Adding Robots.txt:

Create `src/app/robots.ts`:
```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://agapepedicure.nl/sitemap.xml',
  }
}
```

---

## 🎨 Design System

### Spacing Scale
```
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 2rem (32px)
lg: 4rem (64px)
xl: 6rem (96px)
xxl: 8rem (128px)
```

### Typography Scale
```
display-xl: clamp(4rem, 8vw, 8rem)
display-lg: clamp(3rem, 6vw, 6rem)
display-md: clamp(2.5rem, 5vw, 4rem)
display-sm: clamp(2rem, 4vw, 3rem)
```

### Border Radius
```
rounded-lg: 12px
rounded-xl: 20px
rounded-2xl: 16px
rounded-3xl: 24px
rounded-4xl: 32px
rounded-5xl: 48px
```

---

## 🐛 Troubleshooting

### Images not loading
- Check image paths in `public/` folder
- Verify `next.config.js` remote patterns
- Ensure images are optimized (not too large)

### Fonts not loading
- Check font imports in `layout.tsx`
- Verify font variable names in `tailwind.config.ts`
- Clear `.next` cache: `rm -rf .next`

### Build errors
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### TypeScript errors
```bash
# Check types
npm run type-check

# Update types
npm install --save-dev @types/node @types/react @types/react-dom
```

---

## 📝 Scripts

```json
{
  "dev": "next dev",              // Development server
  "build": "next build",          // Production build
  "start": "next start",          // Start production server
  "lint": "next lint",            // Run ESLint
  "type-check": "tsc --noEmit"   // Check TypeScript
}
```

---

## 🎯 Performance Targets

- **Lighthouse Score:** 95+ (all categories)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

Test with: [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🔐 Security

### Environment Variables
- Never commit `.env.local`
- Use `.env.example` as template
- Store secrets in Vercel/hosting dashboard

### Dependencies
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 📞 Support

For questions or issues:
- **Email:** info@agapepedicure.nl
- **Phone:** +31 (0)20 123 4567

---

## 📄 License

© 2025 Agape Pedicure. All rights reserved.

---

## 🙏 Credits

- **Design Inspiration:** Apple, Tesla, BYD
- **Fonts:** Google Fonts (Inter, Cormorant Garamond)
- **Icons:** Unicode Emoji
- **Images:** Unsplash (placeholder)
- **Framework:** Next.js by Vercel
- **Animation:** Framer Motion

---

**Built with ❤️ for premium voetenverzorging**





