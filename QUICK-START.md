# ⚡ Quick Start - 5 Minutes to Launch

Get your premium Agape Pedicure website running in just 5 minutes!

---

## Step 1: Install (2 min)

```bash
npm install
```

☕ Grab a coffee while dependencies install...

---

## Step 2: Run (30 sec)

```bash
npm run dev
```

🎉 **Done!** Open [http://localhost:3000](http://localhost:3000)

---

## Step 3: Customize (2 min)

### Update Your Info

**File: `src/components/Contact.tsx`** (line 8-22)

```tsx
const contactInfo = [
  {
    icon: '📍',
    title: 'Adres',
    content: ['YOUR ADDRESS', 'YOUR CITY', 'Netherlands'], // ← Change this
  },
  {
    icon: '📞',
    title: 'Telefoon',
    content: ['+31 YOUR PHONE'],  // ← Change this
    link: 'tel:+31YOURPHONE',
  },
  {
    icon: '✉️',
    title: 'Email',
    content: ['your@email.com'],  // ← Change this
    link: 'mailto:your@email.com',
  },
]
```

### Update Booking URL

**File: `src/components/Booking.tsx`** (line 50)

```tsx
<iframe
  src="https://simplymeet.me/embed/YOUR_USERNAME"  // ← Change this
  // ...
/>
```

### Done! ✅

Your site is now personalized and running!

---

## Next Steps

### 📸 Add Your Images (Optional)

1. Create folder: `public/images/`
2. Add your images:
   - `hero-bg.jpg` (for hero background)
   - `about-salon.jpg` (for about section)
3. Update paths in components

**See `SETUP-GUIDE.md`** for detailed image guide

### 🚀 Deploy (2 min)

**Easiest:** Vercel (free)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your project
4. Click "Deploy"

**Done!** Your site is live!

---

## 🎨 Want to Change Colors?

**File: `tailwind.config.ts`** (line 15)

```ts
colors: {
  primary: {
    DEFAULT: '#2E7A85',  // ← Change this to your color
  },
}
```

Save file, colors update instantly!

---

## 💰 Update Prices

**File: `src/app/prijzen/page.tsx`** (starting line 11)

```tsx
const treatments = [
  {
    title: 'Treatment Name',
    price: 50.00,  // ← Change price
    duration: 60,  // ← Change duration
    description: 'Your description',
  },
  // ... more treatments
]
```

---

## ❓ Common Questions

### Q: Where's the old HTML site?

**A:** Still there! New Next.js site is in same folder.  
Old files: `index.html`, `tarieven.html`  
New files: `src/` folder

### Q: Can I use both sites?

**A:** Yes! They're separate. Old site still works.

### Q: How do I switch to new site permanently?

**A:** Deploy new site to Vercel, update your domain DNS.  
See `MIGRATION-GUIDE.md`

### Q: Do I need to know React?

**A:** No! Just edit the text in the files.  
For complex changes, see documentation or ask for help.

### Q: What if something breaks?

**A:** 
```bash
# Stop server: Ctrl + C
# Clear cache:
rm -rf .next
# Restart:
npm run dev
```

---

## 📚 Full Documentation

- **`README-NEXTJS.md`** - Complete documentation
- **`SETUP-GUIDE.md`** - Detailed setup guide
- **`MIGRATION-GUIDE.md`** - Migrate from old site

---

## 🆘 Need Help?

1. Check documentation (above)
2. Google your error message
3. Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

---

## ✅ Checklist

- [x] Install dependencies
- [x] Run dev server
- [ ] Update contact info
- [ ] Update booking URL
- [ ] Add your images (optional)
- [ ] Update prices (if needed)
- [ ] Deploy to Vercel

---

**That's it! You're ready to go! 🚀**

---

## Commands Cheat Sheet

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Check code quality

# Troubleshooting
rm -rf .next       # Clear cache
rm -rf node_modules && npm install  # Reinstall
```

---

**Questions?** Check the full guides or documentation!

**Happy building! 🎉**





