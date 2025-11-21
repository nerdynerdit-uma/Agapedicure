# Agape Pedicure - Premium Voetenverzorging Website

Een high-end, 4K resolutie replica van de Agape Pedicure website met moderne design, responsive layout en geïntegreerde booking functionaliteit.

![Main Color](https://via.placeholder.com/100x100/2E7A85/FFFFFF?text=Primary+Color)

## 🎨 Design Features

### Color Palette
- **Primary Color**: `#2E7A85` - Premium teal/turquoise
- **Primary Dark**: `#1f5259`
- **Primary Light**: `#4a9da8`
- **Secondary Color**: `#D4AF37` - Gold accent
- **Accent Color**: `#E8B4B8` - Soft rose

### Typography
- **Primary Font**: Cormorant Garamond (Serif) - Voor headings en elegante teksten
- **Secondary Font**: Montserrat (Sans-serif) - Voor body text en navigatie

### Key Features
- ✨ High-end 4K resolutie design
- 📱 Volledig responsive (mobiel, tablet, desktop)
- 🎨 Moderne gradient effecten en animaties
- 🖼️ High-quality afbeeldingen met lazy loading
- 📅 Geïntegreerde SimplyMeet.me booking module
- ♿ Toegankelijk design (WCAG compliant)
- ⚡ Geoptimaliseerd voor snelle laadtijden
- 🎭 Smooth scroll en parallax effecten

## 📂 Project Structuur

```
Agapedicure/
├── index.html          # Hoofdpagina met alle secties
├── tarieven.html       # Uitgebreide prijslijst pagina
├── styles.css          # Styling met CSS variabelen en responsive design
├── pricing-page.css    # Specifieke styling voor tarieven pagina
├── script.js           # JavaScript voor interactie en animaties
├── manifest.json       # PWA manifest
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine instructions
├── .htaccess           # Apache configuratie
└── README.md           # Project documentatie
```

## 🚀 Installatie & Setup

### Vereisten
- Moderne webbrowser (Chrome, Firefox, Safari, Edge)
- Optioneel: Local webserver voor development

### Stap 1: Download/Clone
```bash
# Clone het project
git clone <repository-url>
cd Agapedicure
```

### Stap 2: Lokaal Openen
Open `index.html` in je browser:
- **Optie 1**: Dubbel-klik op `index.html`
- **Optie 2**: Sleep het bestand naar je browser
- **Optie 3**: Gebruik een local server (aanbevolen voor development)

### Met VS Code Live Server:
1. Installeer "Live Server" extensie in VS Code
2. Right-click op `index.html`
3. Selecteer "Open with Live Server"

### Met Python:
```bash
# Python 3
python -m http.server 8000

# Bezoek: http://localhost:8000
```

### Met Node.js (http-server):
```bash
npx http-server -p 8000

# Bezoek: http://localhost:8000
```

## 📅 SimplyMeet.me Integratie

### Setup Instructions

1. **Account aanmaken**:
   - Ga naar [SimplyMeet.me](https://simplymeet.me)
   - Maak een gratis account aan
   - Stel je beschikbaarheid in

2. **Booking Widget Configureren**:
   - Log in op je SimplyMeet.me dashboard
   - Ga naar "Integrations" → "Embed"
   - Kopieer je unieke booking link

3. **Widget Toevoegen aan Website**:
   - Open `index.html`
   - Zoek de booking sectie (regel ~420)
   - Vervang de iframe `src` met je eigen booking URL:
   ```html
   <iframe 
       src="https://simplymeet.me/embed/JOUW-USERNAME" 
       frameborder="0" 
       width="100%" 
       height="800px"
       style="border:none; border-radius: 12px;"
       loading="lazy">
   </iframe>
   ```

4. **Widget Styling Aanpassen**:
   - De widget styling past zich automatisch aan de website kleuren aan
   - Extra styling kan in `styles.css` onder `.booking-widget`

### Alternative Booking Options
Als SimplyMeet.me niet beschikbaar is, kun je ook integreren met:
- Calendly
- Acuity Scheduling
- Book Like A Boss
- HubSpot Meetings

## 🎯 Secties Overzicht

### Hoofdpagina (index.html)

#### 1. Hero Section
- Full-screen welkomst sectie met parallax effect
- Call-to-action buttons
- Scroll indicator

#### 2. Over Ons
- Introductie van de salon
- Premium kwaliteit badges
- Belangrijkste features

#### 3. Diensten
- 6 service cards met icons
- Uitgebreide beschrijvingen
- Featured service highlighting

#### 4. Tarieven (Preview)
- Beknopte prijsoverzicht
- 6 verschillende behandelingen
- Link naar uitgebreide prijslijst

#### 5. Boeken
- Geïntegreerde booking widget
- Openingstijden
- Beleidsinformatie

### 6. Galerij
- 6 high-quality afbeeldingen
- Hover effects met overlay
- Responsive grid layout

### 7. Reviews
- 3 klant testimonials
- 5-sterren beoordelingen
- Gradient achtergrond

### 8. Contact
- Contactinformatie
- Google Maps integratie
- Interactive contact cards

#### 9. Footer
- Sitemap links
- Social media links
- Contact details
- Copyright informatie

### Prijslijst Pagina (tarieven.html)

#### 1. Page Header
- Breadcrumb navigatie
- Pagina titel en beschrijving
- Premium gradient achtergrond

#### 2. Behandelingen Overview
- Agape Deluxe - Basis Pedicure (€47,50)
- Agape Medisch Pedicure (€50,00)
- Bindweefsel Gezichtsmassage (€35-80)
- Neuropathische Pijnmassage (€90)
- Magnesium Spa Behandeling (€55)
- Nagelcorrectie (€35)
- Orthese (€40)

#### 3. Behandeling Details
- Uitgebreide beschrijvingen
- Extra opties en meerprijzen
- Behandelduur
- Voordelen en indicaties
- Call-to-action buttons

#### 4. Features
- ♥ Medische pedicure voor risico voeten
- ☼ Luxe spa behandelingen
- ♣ Therapeutische massages
- Verzekering informatie
- Kuur mogelijkheden

## 🎨 Customization

### Kleuren Aanpassen
Alle kleuren zijn gedefinieerd als CSS variabelen in `styles.css`:

```css
:root {
    --primary-color: #2E7A85;     /* Hoofdkleur */
    --primary-dark: #1f5259;      /* Donkere variant */
    --primary-light: #4a9da8;     /* Lichte variant */
    --secondary-color: #D4AF37;   /* Secundaire kleur (goud) */
}
```

### Fonts Wijzigen
Fonts zijn ook als variabelen gedefinieerd:

```css
:root {
    --font-primary: 'Cormorant Garamond', serif;
    --font-secondary: 'Montserrat', sans-serif;
}
```

### Afbeeldingen Vervangen
Alle afbeeldingen gebruiken Unsplash placeholder URLs. Vervang deze met je eigen afbeeldingen:

```html
<!-- Voorbeeld in HTML -->
<img src="jouw-afbeelding.jpg" alt="Beschrijving">
```

Voor high-quality afbeeldingen:
- Minimale resolutie: 1920x1080 (Full HD)
- Aanbevolen: 3840x2160 (4K)
- Format: JPG (voor foto's), PNG (voor graphics)
- Optimaliseer met tools zoals TinyPNG of ImageOptim

## 📱 Responsive Breakpoints

```css
/* Desktop Large: 1200px+ */
/* Desktop: 992px - 1199px */
/* Tablet: 768px - 991px */
/* Mobile: < 767px */
/* Mobile Small: < 480px */
```

## ⚡ Performance Optimalisatie

### Reeds Geïmplementeerd:
- ✅ Lazy loading voor afbeeldingen
- ✅ CSS variabelen voor snellere rendering
- ✅ Intersection Observer voor scroll animations
- ✅ Optimized font loading
- ✅ Minimale third-party dependencies

### Aanbevolen Verbeteringen:
1. **Afbeeldingen Optimaliseren**:
   - Gebruik WebP formaat voor betere compressie
   - Implementeer responsive images met `<picture>` element
   - Gebruik CDN voor snellere delivery

2. **CSS & JS Minificatie**:
   ```bash
   # Installeer minification tools
   npm install -g csso-cli uglify-js
   
   # Minify CSS
   csso styles.css -o styles.min.css
   
   # Minify JS
   uglifyjs script.js -o script.min.js
   ```

3. **Caching Implementeren**:
   - Voeg `.htaccess` toe voor browser caching
   - Configureer service worker voor offline functionaliteit

## 🔧 Browser Compatibiliteit

Getest en werkend in:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Polyfills
Voor oudere browsers, overweeg het toevoegen van:
- Intersection Observer polyfill
- CSS Grid polyfill (voor IE11)

## 📊 SEO Optimalisatie

### Reeds Geïmplementeerd:
- Meta description en keywords
- Semantic HTML5 markup
- Alt attributes voor afbeeldingen
- Proper heading hierarchy (H1-H6)
- Mobile-friendly design

### Aanbevolen Toevoegingen:
1. **Structured Data (Schema.org)**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "BeautySalon",
     "name": "Agape Pedicure",
     "description": "Premium voetenverzorging",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "Hoofdstraat 123",
       "addressLocality": "Amsterdam",
       "postalCode": "1234 AB",
       "addressCountry": "NL"
     }
   }
   ```

2. **OpenGraph Tags** voor social media:
   ```html
   <meta property="og:title" content="Agape Pedicure">
   <meta property="og:description" content="Premium voetenverzorging">
   <meta property="og:image" content="preview-image.jpg">
   ```

3. **Sitemap.xml** genereren voor Google indexing

## 🔒 Privacy & GDPR

Voor compliance met Nederlandse privacy wetgeving:

1. **Cookie Consent** toevoegen
2. **Privacy Policy** pagina maken
3. **Algemene Voorwaarden** toevoegen
4. **Contact form** met GDPR checkbox

## 📈 Analytics Integratie

### Google Analytics 4:
```html
<!-- Voeg toe in <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🌐 Deployment

### Hosting Opties:

1. **Netlify** (Gratis):
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy
   ```

2. **Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```

3. **GitHub Pages**:
   - Push naar GitHub repository
   - Settings → Pages → Enable
   - Kies branch (main)

4. **Traditionele Hosting** (via FTP):
   - Upload alle bestanden naar server
   - Zorg dat index.html in root staat

## 📞 Support & Contact

Voor vragen of ondersteuning:
- **Email**: info@agapepedicure.nl
- **Telefoon**: +31 (0)20 123 4567
- **Website**: https://agapepedicure.nl

## 📄 Licentie

© 2025 Agape Pedicure. Alle rechten voorbehouden.

## 🙏 Credits

### Fonts:
- [Google Fonts](https://fonts.google.com)

### Icons:
- [Font Awesome 6](https://fontawesome.com)

### Afbeeldingen:
- [Unsplash](https://unsplash.com) - High-quality placeholder images

### Booking Platform:
- [SimplyMeet.me](https://simplymeet.me)

---

## 🚦 Quick Start Checklist

- [ ] Download/clone het project
- [ ] Open index.html in browser
- [ ] Setup SimplyMeet.me account
- [ ] Vervang booking widget URL
- [ ] Pas contactinformatie aan
- [ ] Upload eigen afbeeldingen
- [ ] Test responsive design
- [ ] Deploy naar hosting
- [ ] Setup Google Analytics
- [ ] Voeg SSL certificaat toe
- [ ] Test in verschillende browsers

---

**Gemaakt met ❤️ voor premium voetenverzorging**


