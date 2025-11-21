# 📸 Image Upload Instructions

You need to upload 3 images to complete your website setup.

---

## Required Images

### 1. **heroupscale.jpg**
**Location:** `public/images/heroupscale.jpg`

**Description:** Professional woman in white uniform with teal trim (ProVoet uniform)

**Specifications:**
- **Format:** JPG
- **Size:** 3840x2160 (4K) or minimum 2560x1440
- **Quality:** High (90%)
- **Usage:** Hero section background on homepage

**Upload Steps:**
1. Save your image as `heroupscale.jpg`
2. Place in `public/images/` folder
3. Image will automatically appear on homepage

---

### 2. **afbeelding21.jpg**
**Location:** `public/images/afbeelding21.jpg`

**Description:** Hands and feet with French manicure/pedicure, decorated with pink roses, with "Gezonde voeten & ontspannende massages" text overlay

**Specifications:**
- **Format:** JPG
- **Size:** 1200x1600 (or similar 3:4 ratio)
- **Quality:** High (90%)
- **Usage:** About section image on homepage

**Upload Steps:**
1. Save your image as `afbeelding21.jpg`
2. Place in `public/images/` folder
3. Image will automatically appear in About section

---

### 3. **logoupscale.png**
**Location:** `public/images/logoupscale.png`

**Description:** "Agape Pedicure & Wellness Salon" logo in teal color with foot graphic replacing the 'p'

**Specifications:**
- **Format:** PNG (with transparent background preferred)
- **Size:** 800x400 pixels (or similar, will be scaled automatically)
- **Quality:** High, crisp edges
- **Usage:** Navigation bar and footer logo

**Upload Steps:**
1. Save your image as `logoupscale.png`
2. Place in `public/images/` folder
3. Logo will automatically appear in navigation and footer

---

## Folder Structure

After uploading, your folder should look like this:

```
public/
├── images/
│   ├── heroupscale.jpg        ← Upload this
│   ├── afbeelding21.jpg       ← Upload this
│   └── logoupscale.png        ← Upload this
```

---

## How to Upload

### Option 1: Via File Explorer (Easiest)

1. Open your project folder in File Explorer/Finder
2. Navigate to `public/images/`
3. Copy and paste your 3 images into this folder
4. Refresh your browser - images should appear!

### Option 2: Via VS Code

1. In VS Code, expand the `public` folder in the sidebar
2. Right-click on `images` folder
3. Select "Reveal in File Explorer" or "Reveal in Finder"
4. Copy your images into this folder

### Option 3: Drag & Drop

1. Have your images ready on desktop
2. Open VS Code with your project
3. Drag each image file into the `public/images/` folder in VS Code sidebar

---

## Optimizing Your Images

Before uploading, optimize your images for web:

### 1. **Compress Images**
Use [TinyJPG](https://tinyjpg.com/) or [Squoosh](https://squoosh.app/)
- Upload your image
- Download compressed version
- Can reduce file size by 50-70% without quality loss

### 2. **Resize Images**
Use [Photopea](https://www.photopea.com/) (free online Photoshop)
- Open your image
- Image → Image Size
- Set to recommended dimensions
- Export as JPG (90% quality) or PNG

### 3. **Convert to WebP (Optional)**
Next.js automatically converts images, but you can pre-convert:
- Use Squoosh or Photopea
- Export as WebP format
- Even smaller file sizes!

---

## Checking Your Images

After uploading, verify they're working:

### 1. **Check Files Exist**
```bash
ls -la public/images/
```

Should show:
- heroupscale.jpg
- afbeelding21.jpg  
- logoupscale.png

### 2. **Test in Browser**

Start your dev server:
```bash
npm run dev
```

Visit:
- Homepage hero: Should show professional woman image
- About section: Should show hands/feet with roses
- Navigation: Should show your logo
- Footer: Should show your logo (in white)

### 3. **Check Console**
Open browser console (F12)
- Look for any 404 errors about images
- If you see errors, double-check file names match exactly

---

## Troubleshooting

### Image not showing?

**Problem:** File name mismatch
**Solution:** 
- Ensure file names are EXACTLY:
  - `heroupscale.jpg` (not `heroupscale.JPG` or `hero-upscale.jpg`)
  - `afbeelding21.jpg` (not `Afbeelding21.jpg`)
  - `logoupscale.png` (not `logoupscale.PNG`)

**Problem:** Image in wrong folder
**Solution:**
- Images must be in `public/images/` not just `public/`

**Problem:** Image too large, site slow
**Solution:**
- Compress images (see optimization section above)
- Maximum recommended: 500KB for hero, 200KB for others

**Problem:** Logo appears pixelated
**Solution:**
- Use higher resolution PNG (at least 800px wide)
- Export at 2x or 3x size for retina displays

**Problem:** Browser caching old image
**Solution:**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```
Then hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

---

## Image Specifications Summary

| Image | Format | Size | Max File Size | Usage |
|-------|--------|------|---------------|-------|
| heroupscale.jpg | JPG | 3840x2160 or 2560x1440 | 500KB | Hero background |
| afbeelding21.jpg | JPG | 1200x1600 (3:4 ratio) | 200KB | About section |
| logoupscale.png | PNG | 800x400 (flexible) | 50KB | Logo |

---

## Alternative Image Sources (If Needed)

If you don't have the exact images yet, you can temporarily use:

### Professional Woman in Uniform:
- [Pexels - Healthcare Workers](https://www.pexels.com/search/healthcare%20worker/)
- [Unsplash - Professional](https://unsplash.com/s/photos/professional-woman)

### Manicure/Pedicure with Flowers:
- [Pexels - Spa Treatment](https://www.pexels.com/search/spa%20treatment/)
- [Unsplash - Pedicure](https://unsplash.com/s/photos/pedicure)

### Logo:
- Can be created at [Canva](https://www.canva.com/)
- Use teal color #2E7A85
- Add foot icon/graphic

---

## After Uploading

Once all 3 images are uploaded:

✅ **Hero section** will show your professional image  
✅ **About section** will show hands/feet with roses  
✅ **Navigation** will display your logo  
✅ **Footer** will display your logo (white version)

Your website will be complete and ready to deploy! 🎉

---

## Need Help?

If images still aren't showing:

1. Check file names match exactly (case-sensitive)
2. Verify files are in `public/images/` folder
3. Clear browser cache (hard refresh)
4. Restart dev server (`npm run dev`)
5. Check browser console for errors

---

**Happy uploading! 📸**





