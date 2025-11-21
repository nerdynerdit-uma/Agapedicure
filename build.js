// Simple build script for static site
const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML files
['index.html', 'webshop.html', 'boeken.html', 'tarieven.html', 'checkout.html', 'order-bevestiging.html'].forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied ${file}`);
  }
});

// Copy CSS files
['styles.css', 'webshop.css', 'checkout.css', 'booking-system.css', 'booking-page.css'].forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied ${file}`);
  }
});

// Copy JS files
['script.js', 'webshop.js', 'checkout.js', 'booking-system.js'].forEach(file => {
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

console.log('Build complete!');

