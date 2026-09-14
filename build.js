// Simple build script for static site
const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML files (include all submenu and info pages for Vercel deploy)
['index.html', 'webshop.html', 'boeken.html', 'tarieven.html', 'checkout.html', 'order-bevestiging.html', 'ons-verhaal.html', 'partners.html', 'voetmassage.html', 'werkwijze.html', 'medische-pedicure.html', 'agape-spa-ritual.html', 'gellak-teennagels.html', 'agape-magnesium-ritual.html', 'nagelcorrectie.html', 'orthese.html', 'neuropathische-pijnmassage.html', 'betalen-medische-pedicure.html', 'betalen-deelbehandeling.html', 'betalen-neuropathische-pijnmassage.html', 'betalen-agape-spa-ritual.html', 'betalen-agape-magnesium-ritual.html', 'betalen-nagelcorrectie.html', 'betalen-gellak-teennagels.html', 'betalen-orthese.html', 'betaling-status.html', 'contact.html', 'faqs.html', 'cookies-beleid.html', 'privacy-beleid.html', 'algemene-voorwaarden.html'].forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied ${file}`);
  }
});

// Copy CSS files
['styles.css', 'webshop.css', 'checkout.css', 'booking-system.css', 'booking-page.css', 'betaling.css', 'contact.css'].forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied ${file}`);
  }
});

// Copy JS files
['script.js', 'webshop.js', 'checkout.js', 'booking-system.js', 'betaling.js', 'contact.js'].forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied ${file}`);
  }
});

// Copy other files
['manifest.json', 'robots.txt', 'sitemap.xml'].forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied ${file}`);
  }
});

// Copy images directory
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync('images')) {
  copyDir('images', path.join(distDir, 'images'));
  console.log('Copied images directory');
}

if (fs.existsSync('documents')) {
  copyDir('documents', path.join(distDir, 'documents'));
  console.log('Copied documents directory');
}

console.log('Build complete!');

