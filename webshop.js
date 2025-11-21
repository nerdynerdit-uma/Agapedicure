// ===================================
// Agape Pedicure - Webshop System
// ===================================

'use strict';

// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('agapeCart')) || [];

// Product Data with Multiple Images
const products = {
    1: {
        id: 1,
        name: 'Lavendel Rustgevend',
        price: 24.95,
        volume: '100ml',
        description: 'Onze premium lavendelgeur biedt een kalmerende en rustgevende ervaring. Perfect voor gebruik na een lange dag of tijdens uw spa-ritueel thuis.',
        images: [
            'images/products/product1-main.png',
            'images/products/product1-main.png', // product1-2 missing, using main
            'images/products/product1-3.png',
            'images/products/product1-4.png'
        ],
        features: [
            'Natuurlijke lavendelolie',
            'Kalmerend effect',
            'Perfect voor ontspanning',
            'Langdurige geur',
            '100ml glazen fles'
        ]
    },
    2: {
        id: 2,
        name: 'Eucalyptus Verfrissend',
        price: 22.95,
        volume: '100ml',
        description: 'Verkwikkende eucalyptusgeur die uw zintuigen prikkelt en een frisse, energieke sfeer creëert. Ideaal voor de ochtend.',
        images: [
            'images/products/product2-main.png',
            'images/products/product2-2.png',
            'images/products/product2-2.png', // product2-3 missing, using product2-2
            'images/products/product2-4.png'
        ],
        features: [
            'Pure eucalyptusolie',
            'Verfrissend effect',
            'Bevordert ademhaling',
            'Energiegevend',
            'Langdurig werkzaam'
        ]
    },
    3: {
        id: 3,
        name: 'Roos Elegantie',
        price: 29.95,
        volume: '100ml',
        description: 'Luxueuze rozengeur met een elegante en verfijnde uitstraling. Creëert een romantische en warme ambiance.',
        images: [
            'images/products/product3-main.png',
            'images/products/product3-2.png',
            'images/products/product3-3.png',
            'images/products/product3-4.png'
        ],
        features: [
            'Premium rozenblaadjes extract',
            'Elegant en verfijnd',
            'Romantische sfeer',
            'Luxe verpakking',
            'Langdurige geur'
        ]
    },
    4: {
        id: 4,
        name: 'Jasmijn Sereniteit',
        price: 26.95,
        volume: '100ml',
        description: 'Zachte jasmijngeur die innerlijke rust en sereniteit brengt. Perfect voor meditatie en ontspanning.',
        images: [
            'images/products/product4-main.png',
            'images/products/product4-2.png',
            'images/products/product4-3.png',
            'images/products/product4-4.png'
        ],
        features: [
            'Zuivere jasmijnolie',
            'Rustgevend effect',
            'Perfect voor meditatie',
            'Zachte, subtiele geur',
            'Premium kwaliteit'
        ]
    },
    5: {
        id: 5,
        name: 'Citroen Energie',
        price: 21.95,
        volume: '100ml',
        description: 'Energieke citroengeur die een opwekkende en positieve sfeer creëert. Ideaal voor werkruimtes.',
        images: [
            'images/products/product5-main.png',
            'images/products/product5-2.png',
            'images/products/product5-3.png',
            'images/products/product5-3.png' // product5-4 missing, using product5-3
        ],
        features: [
            'Verse citrusgeur',
            'Energiegevend',
            'Verhelderende werking',
            'Frisse uitstraling',
            'Natuurlijke ingrediënten'
        ]
    },
    6: {
        id: 6,
        name: 'Sandelhout Harmonie',
        price: 32.95,
        volume: '100ml',
        description: 'Warme sandelhoutalsgeur die harmonie en balans brengt. Een premium geur voor speciale momenten.',
        images: [
            'images/products/product6-main.png',
            'images/products/product6-2.png',
            'images/products/product6-2.png', // product6-3 missing, using product6-2
            'images/products/product6-4.png'
        ],
        features: [
            'Authentiek sandelhout',
            'Harmonieus en warm',
            'Premium kwaliteit',
            'Langdurig werkzaam',
            'Luxe uitstraling'
        ]
    },
    7: {
        id: 7,
        name: 'Vanille Warmte',
        price: 23.95,
        volume: '100ml',
        description: 'Zoete vanillegeur die warmte en gezelligheid uitstraalt. Perfect voor een huiselijke sfeer.',
        images: [
            'images/products/product7-main.png',
            'images/products/product7-2.png',
            'images/products/product7-3.png',
            'images/products/product7-4.png'
        ],
        features: [
            'Pure vanille extract',
            'Warme, zoete geur',
            'Gezellige sfeer',
            'Troostend effect',
            'Langdurige geur'
        ]
    },
    8: {
        id: 8,
        name: 'Pepermunt Frisheid',
        price: 20.95,
        volume: '100ml',
        description: 'Verfrissende muntgeur die helderheid en frisheid brengt. Stimulerend en verkwikkend.',
        images: [
            'images/purple_perfume.png', // product8 images missing, using placeholder
            'images/purple_perfume.png',
            'images/purple_perfume.png',
            'images/purple_perfume.png'
        ],
        features: [
            'Pepermunt olie',
            'Verfrissend en helder',
            'Stimulerend effect',
            'Zuiverende werking',
            'Natuurlijke ingrediënten'
        ]
    }
};

// ===================================
// Cart Functions
// ===================================

function addToCart(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Get the correct image path for the cart
        let cartImage;
        if (productId === 8) {
            cartImage = 'images/purple_perfume.png'; // Product 8 uses placeholder
        } else {
            cartImage = `images/products/product${productId}-main.png`;
        }
        
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1,
            image: cartImage
        });
    }
    
    saveCart();
    updateCartUI();
    
    // Show success message
    showNotification(`${productName} toegevoegd aan winkelwagen!`);
    
    // Open cart briefly to show item added
    toggleCart();
    setTimeout(() => {
        if (document.getElementById('cartSidebar').classList.contains('open')) {
            // Keep it open if user hasn't closed it
        }
    }, 2000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('agapeCart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
    
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Uw winkelwagen is leeg</p>';
        document.getElementById('cartTotal').textContent = '€0,00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">€${item.price.toFixed(2).replace('.', ',')}</div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = html;
    document.getElementById('cartTotal').textContent = `€${total.toFixed(2).replace('.', ',')}`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    
    // Prevent body scroll when cart is open
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : '';
}

function goToCheckout() {
    if (cart.length === 0) {
        alert('Uw winkelwagen is leeg');
        return;
    }
    
    // Save cart and redirect to checkout
    saveCart();
    window.location.href = 'checkout.html';
}

// ===================================
// Product Modal
// ===================================

function openProductModal(productId) {
    const product = products[productId];
    if (!product) return;
    
    // Update modal content
    document.getElementById('modalProductTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = `€${product.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('modalVolume').textContent = product.volume;
    document.getElementById('modalDescription').textContent = product.description;
    
    // Set main image
    document.getElementById('modalMainImage').src = product.images[0];
    document.getElementById('modalMainImage').alt = product.name;
    
    // Create thumbnails
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    product.images.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${img}" alt="${product.name} ${index + 1}">`;
        thumb.onclick = () => switchModalImage(img, thumb);
        thumbnailsContainer.appendChild(thumb);
    });
    
    // Features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresContainer.appendChild(li);
    });
    
    // Reset quantity
    document.getElementById('modalQuantity').value = 1;
    
    // Set add to cart button
    document.getElementById('modalAddToCart').onclick = () => {
        const qty = parseInt(document.getElementById('modalQuantity').value);
        for (let i = 0; i < qty; i++) {
            addToCart(productId, product.name, product.price);
        }
        closeProductModal();
    };
    
    // Show modal
    document.getElementById('productModal').classList.add('open');
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('open');
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function switchModalImage(src, thumbnail) {
    document.getElementById('modalMainImage').src = src;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

function increaseQuantity() {
    const input = document.getElementById('modalQuantity');
    const value = parseInt(input.value);
    if (value < 10) {
        input.value = value + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('modalQuantity');
    const value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
}

// ===================================
// Notifications
// ===================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================================
// Initialize
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
            if (document.getElementById('cartSidebar').classList.contains('open')) {
                toggleCart();
            }
        }
    });
});





