// ===================================
// Checkout System
// ===================================

'use strict';

const SHIPPING_COST = 4.95;
const VAT_RATE = 0.21;

// ===================================
// Load Cart and Update Summary
// ===================================

function loadCheckout() {
    const cart = JSON.parse(localStorage.getItem('agapeCart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'webshop.html';
        return;
    }
    
    updateOrderSummary(cart);
    updateCheckoutSteps();
}

function updateOrderSummary(cart) {
    const summaryContainer = document.getElementById('summaryItems');
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="summary-item-row">
                <div class="summary-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="summary-item-details">
                    <div class="summary-item-name">${item.name}</div>
                    <div class="summary-item-quantity">${item.quantity}x €${item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="summary-item-price">
                    €${itemTotal.toFixed(2).replace('.', ',')}
                </div>
            </div>
        `;
    });
    
    summaryContainer.innerHTML = html;
    
    // Calculate totals
    const shipping = SHIPPING_COST;
    const vat = (subtotal + shipping) * VAT_RATE;
    const total = subtotal + shipping + vat;
    
    document.getElementById('summarySubtotal').textContent = `€${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('summaryShipping').textContent = `€${shipping.toFixed(2).replace('.', ',')}`;
    document.getElementById('summaryVAT').textContent = `€${vat.toFixed(2).replace('.', ',')}`;
    document.getElementById('summaryTotal').textContent = `€${total.toFixed(2).replace('.', ',')}`;
}

function updateCheckoutSteps() {
    // Progress through steps based on filled forms
    // This is a simple implementation
}

// ===================================
// Payment Method Selection
// ===================================

document.querySelectorAll('.payment-option-checkout').forEach(option => {
    option.addEventListener('click', function() {
        // Remove previous active
        document.querySelectorAll('.payment-option-checkout').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Mark as active
        this.classList.add('active');
        
        // Check radio
        this.querySelector('input').checked = true;
        
        const method = this.dataset.method;
        
        // Show/hide payment fields
        document.getElementById('idealBankSelect').style.display = 
            method === 'ideal' ? 'block' : 'none';
        document.getElementById('creditCardFields').style.display = 
            method === 'creditcard' ? 'block' : 'none';
        
        // Initialize Stripe if needed
        if (method === 'creditcard' && !window.stripeInitialized) {
            initializeStripe();
        }
    });
});

// ===================================
// Complete Order
// ===================================

function completeOrder() {
    // Validate forms
    const checkoutForm = document.getElementById('checkoutForm');
    const shippingForm = document.getElementById('shippingForm');
    
    if (!checkoutForm.checkValidity() || !shippingForm.checkValidity()) {
        alert('Vul alle verplichte velden in');
        return;
    }
    
    // Get payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Validate payment specific fields
    if (paymentMethod === 'ideal') {
        const bank = document.getElementById('idealBank').value;
        if (!bank) {
            alert('Selecteer uw bank');
            return;
        }
    }
    
    // Get order data
    const orderData = {
        customer: {
            firstName: checkoutForm.firstName.value,
            lastName: checkoutForm.lastName.value,
            email: checkoutForm.email.value,
            phone: checkoutForm.phone.value,
        },
        shipping: {
            address: shippingForm.address.value,
            zipcode: shippingForm.zipcode.value,
            city: shippingForm.city.value,
            country: shippingForm.country.value,
            notes: shippingForm.notes.value,
        },
        payment: {
            method: paymentMethod,
            bank: paymentMethod === 'ideal' ? document.getElementById('idealBank').value : null
        },
        items: JSON.parse(localStorage.getItem('agapeCart')) || [],
        total: calculateTotal()
    };
    
    // Show loading
    const button = event.target;
    button.disabled = true;
    button.innerHTML = '<span class="loading-spinner"></span> Verwerken...';
    
    // Process payment
    processPayment(orderData, paymentMethod);
}

function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem('agapeCart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = SHIPPING_COST;
    const vat = (subtotal + shipping) * VAT_RATE;
    return subtotal + shipping + vat;
}

function processPayment(orderData, method) {
    console.log('Processing order:', orderData);
    
    // ===================================
    // BACKEND INTEGRATION REQUIRED
    // ===================================
    // TODO: Send order to backend for processing
    
    /*
    fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (method === 'ideal') {
            // Redirect to Mollie payment
            window.location.href = data.checkoutUrl;
        } else if (method === 'paypal') {
            // Redirect to PayPal
            window.location.href = data.paypalUrl;
        } else if (method === 'creditcard') {
            // Process Stripe payment
            handleStripePayment(data.clientSecret);
        }
    });
    */
    
    // For demo: simulate success
    setTimeout(() => {
        showOrderConfirmation(orderData);
    }, 2000);
}

function showOrderConfirmation(orderData) {
    // Clear cart
    localStorage.removeItem('agapeCart');
    
    // Redirect to confirmation page with order data
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    window.location.href = 'order-bevestiging.html';
}

// ===================================
// Stripe Integration
// ===================================

function initializeStripe() {
    const stripePublicKey = 'pk_test_YOUR_STRIPE_KEY'; // Replace with your key
    
    try {
        const stripe = Stripe(stripePublicKey);
        const elements = stripe.elements();
        const cardElement = elements.create('card');
        
        cardElement.mount('#card-element');
        
        cardElement.on('change', (event) => {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });
        
        window.stripeCard = cardElement;
        window.stripe = stripe;
        window.stripeInitialized = true;
    } catch (error) {
        console.error('Stripe initialization failed:', error);
    }
}

// ===================================
// Initialize on Load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    loadCheckout();
});





