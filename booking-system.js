// ===================================
// Agape Pedicure - Booking System
// ===================================

'use strict';

// Booking State
const bookingState = {
    step: 1,
    treatment: null,
    treatmentName: '',
    price: 0,
    duration: 0,
    location: null,
    locationName: '',
    date: null,
    time: null,
    customer: {
        name: '',
        email: '',
        phone: '',
        notes: ''
    },
    payment: null,
    addToGoogleCalendar: false
};

// ===================================
// Step Navigation
// ===================================

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(s => s.style.display = 'none');
    
    // Show target step
    document.getElementById(`step${step}`).style.display = 'block';
    
    // Update progress bar
    document.querySelectorAll('.progress-step').forEach((s, index) => {
        s.classList.remove('active', 'completed');
        if (index + 1 < step) {
            s.classList.add('completed');
        } else if (index + 1 === step) {
            s.classList.add('active');
        }
    });
    
    // Update state
    bookingState.step = step;
    
    // Update summaries
    if (step === 3) {
        updateBookingSummary();
    } else if (step === 4) {
        updateFinalSummary();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Step 1: Treatment Selection
// ===================================

document.querySelectorAll('.treatment-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.treatment-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Mark as selected
        this.classList.add('selected');
        
        // Store data
        bookingState.treatment = this.dataset.treatment;
        bookingState.treatmentName = this.querySelector('h3').textContent;
        bookingState.price = parseFloat(this.dataset.price);
        bookingState.duration = parseInt(this.dataset.duration);
    });
});

// ===================================
// Step 2: Location & Calendar
// ===================================

document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.location-card').forEach(c => c.classList.remove('selected'));
        
        // Mark as selected
        this.classList.add('selected');
        
        // Store data
        bookingState.location = this.dataset.location;
        bookingState.locationName = this.querySelector('h3').textContent;
        const day = this.dataset.day;
        
        // Show calendar container
        document.getElementById('calendarContainer').style.display = 'block';
        
        // Load Google Calendar for selected location and day
        loadGoogleCalendar(bookingState.location, day);
    });
});

function loadGoogleCalendar(location, day) {
    const calendarDiv = document.getElementById('googleCalendar');
    
    // Show loading
    calendarDiv.innerHTML = '<div class="calendar-placeholder"><i class="fas fa-spinner fa-spin"></i><p>Beschikbare tijden laden...</p></div>';
    
    // ===================================
    // GOOGLE CALENDAR API INTEGRATION
    // ===================================
    // TODO: Replace with your actual Google Calendar integration
    // You'll need:
    // 1. Google Calendar API Key
    // 2. Calendar IDs for each location
    // 3. Available time slots configuration
    
    // For now, generate sample time slots
    setTimeout(() => {
        generateTimeSlots(location, day);
    }, 1000);
}

function generateTimeSlots(location, day) {
    // Sample time slots - Replace with actual Google Calendar API data
    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30'
    ];
    
    // Get next 4 weeks of the selected day
    const dates = getNext4Weeks(day);
    
    let html = '<div style="margin-bottom: 2rem;">';
    
    dates.forEach(date => {
        html += `<div style="margin-bottom: 1.5rem;">`;
        html += `<h4 style="color: var(--primary-color); margin-bottom: 1rem;">${formatDate(date)}</h4>`;
        html += `<div class="time-slots">`;
        
        timeSlots.forEach(time => {
            // Random availability for demo - replace with actual API data
            const available = Math.random() > 0.3;
            const classname = available ? '' : 'unavailable';
            html += `<div class="time-slot ${classname}" data-date="${date}" data-time="${time}" 
                     onclick="${available ? `selectTimeSlot('${date}', '${time}')` : ''}">
                        ${time}
                    </div>`;
        });
        
        html += `</div></div>`;
    });
    
    html += '</div>';
    
    document.getElementById('googleCalendar').innerHTML = html;
}

function getNext4Weeks(day) {
    const dates = [];
    const today = new Date();
    const dayMap = { 'tuesday': 2, 'friday': 5 };
    const targetDay = dayMap[day];
    
    let current = new Date(today);
    let found = 0;
    
    while (found < 4) {
        if (current.getDay() === targetDay && current > today) {
            dates.push(new Date(current));
            found++;
        }
        current.setDate(current.getDate() + 1);
    }
    
    return dates;
}

function formatDate(date) {
    const days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const months = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 
                    'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function selectTimeSlot(date, time) {
    // Remove previous selection
    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
    
    // Mark as selected
    event.target.classList.add('selected');
    
    // Store data
    bookingState.date = date;
    bookingState.time = time;
    
    // Enable next button
    document.getElementById('nextToStep3').disabled = false;
}

// ===================================
// Step 3: Customer Details
// ===================================

function updateBookingSummary() {
    document.getElementById('summaryTreatment').textContent = bookingState.treatmentName;
    document.getElementById('summaryLocation').textContent = bookingState.locationName;
    document.getElementById('summaryDateTime').textContent = 
        bookingState.date && bookingState.time 
            ? `${formatDate(new Date(bookingState.date))} om ${bookingState.time}`
            : '-';
    document.getElementById('summaryDuration').textContent = `${bookingState.duration} minuten`;
    document.getElementById('summaryPrice').textContent = `€${bookingState.price.toFixed(2).replace('.', ',')}`;
}

// Form validation
document.getElementById('customerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
});

// ===================================
// Step 4: Payment
// ===================================

function updateFinalSummary() {
    // Update treatment info
    document.getElementById('finalTreatment').textContent = bookingState.treatmentName;
    document.getElementById('finalLocation').textContent = bookingState.locationName;
    document.getElementById('finalDateTime').textContent = 
        `${formatDate(new Date(bookingState.date))} om ${bookingState.time}`;
    
    // Update customer info
    document.getElementById('finalName').textContent = document.getElementById('fullName').value;
    document.getElementById('finalEmail').textContent = document.getElementById('email').value;
    document.getElementById('finalPhone').textContent = document.getElementById('phone').value;
    document.getElementById('finalPrice').textContent = `€${bookingState.price.toFixed(2).replace('.', ',')}`;
    
    // Store customer data
    bookingState.customer = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        notes: document.getElementById('notes').value
    };
    
    bookingState.addToGoogleCalendar = document.getElementById('googleCalendar').checked;
}

// Payment method selection
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        const input = this.querySelector('input[type="radio"]');
        input.checked = true;
        
        // Remove previous selection
        document.querySelectorAll('.payment-radio').forEach(radio => {
            radio.classList.remove('selected');
        });
        
        // Mark as selected
        this.querySelector('.payment-radio').classList.add('selected');
        
        bookingState.payment = input.value;
        
        // Update button text based on payment method
        const completeBtn = document.getElementById('completeBookingBtn');
        if (input.value === 'local') {
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Afspraak Bevestigen';
        } else {
            completeBtn.innerHTML = '<i class="fas fa-lock"></i> Betalen en Afspraak Maken';
        }
        
        // Show/hide payment specific fields
        document.getElementById('stripePaymentContainer').style.display = 
            input.value === 'card' ? 'block' : 'none';
        document.getElementById('idealBankContainer').style.display = 
            input.value === 'ideal' ? 'block' : 'none';
        
        // Initialize Stripe if credit card selected
        if (input.value === 'card' && !window.stripeInitialized) {
            initializeStripe();
        }
    });
});

// ===================================
// Payment Processing
// ===================================

function processPayment() {
    if (!bookingState.payment) {
        alert('Selecteer een betaalmethode');
        return;
    }
    
    // Show loading
    const button = event.target;
    button.disabled = true;
    button.innerHTML = '<span class="loading-spinner"></span> Verwerken...';
    
    // Process payment based on method
    switch (bookingState.payment) {
        case 'local':
            processLocalPayment();
            break;
        case 'ideal':
            processIdealPayment();
            break;
        case 'paypal':
            processPayPalPayment();
            break;
        case 'card':
            processStripePayment();
            break;
    }
}

function processLocalPayment() {
    // No payment processing needed, just complete booking
    console.log('Booking with payment on location');
    console.log('Booking data:', bookingState);
    
    // Complete booking without payment
    setTimeout(() => {
        completeBooking();
    }, 1000);
}

function processIdealPayment() {
    const bank = document.getElementById('idealBank').value;
    
    if (!bank) {
        alert('Selecteer uw bank');
        document.querySelector('.btn-complete').disabled = false;
        document.querySelector('.btn-complete').innerHTML = '<i class="fas fa-lock"></i> Betalen en Afspraak Maken';
        return;
    }
    
    // ===================================
    // MOLLIE iDEAL INTEGRATION REQUIRED
    // ===================================
    // TODO: Implement Mollie API for iDEAL payments
    // 1. Create payment on backend
    // 2. Get checkout URL from Mollie
    // 3. Redirect to bank
    
    console.log('Processing iDEAL payment with bank:', bank);
    console.log('Booking data:', bookingState);
    
    // For demo purposes, simulate success
    setTimeout(() => {
        completeBooking();
    }, 2000);
}

function processPayPalPayment() {
    // ===================================
    // PAYPAL INTEGRATION REQUIRED
    // ===================================
    // TODO: Implement PayPal SDK
    // 1. Load PayPal SDK
    // 2. Create order
    // 3. Process payment
    
    console.log('Processing PayPal payment');
    console.log('Booking data:', bookingState);
    
    // For demo purposes, simulate success
    setTimeout(() => {
        completeBooking();
    }, 2000);
}

function processStripePayment() {
    // ===================================
    // STRIPE INTEGRATION REQUIRED
    // ===================================
    // TODO: Implement Stripe payment
    // 1. Create payment intent on backend
    // 2. Confirm card payment
    // 3. Handle result
    
    console.log('Processing Stripe payment');
    console.log('Booking data:', bookingState);
    
    // For demo purposes, simulate success
    setTimeout(() => {
        completeBooking();
    }, 2000);
}

// ===================================
// Stripe Initialization
// ===================================

function initializeStripe() {
    // ===================================
    // STRIPE SETUP REQUIRED
    // ===================================
    // TODO: Replace with your Stripe publishable key
    const stripePublicKey = 'pk_test_YOUR_STRIPE_KEY';
    
    try {
        const stripe = Stripe(stripePublicKey);
        const elements = stripe.elements();
        const cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424242',
                    '::placeholder': {
                        color: '#9E9E9E',
                    },
                },
            },
        });
        
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
// Complete Booking
// ===================================

async function completeBooking() {
    try {
        // ===================================
        // BACKEND API CALL REQUIRED
        // ===================================
        // TODO: Send booking data to your backend
        const bookingData = {
            treatment: bookingState.treatment,
            treatmentName: bookingState.treatmentName,
            price: bookingState.price,
            duration: bookingState.duration,
            location: bookingState.location,
            locationName: bookingState.locationName,
            date: bookingState.date,
            time: bookingState.time,
            customer: bookingState.customer,
            payment: bookingState.payment,
            addToGoogleCalendar: bookingState.addToGoogleCalendar
        };
        
        // Example API call (replace with your actual endpoint)
        /*
        const response = await fetch('/api/bookings/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData)
        });
        
        const result = await response.json();
        */
        
        console.log('Booking data to be sent:', bookingData);
        
        // Add to Google Calendar (if selected)
        if (bookingState.addToGoogleCalendar) {
            await addToCustomerGoogleCalendar();
        }
        
        // Generate and store invoice
        const invoiceData = generateInvoice();
        bookingState.invoiceData = invoiceData;
        
        // Show confirmation
        showConfirmation();
        
    } catch (error) {
        console.error('Booking failed:', error);
        alert('Er is een fout opgetreden. Probeer het opnieuw.');
        
        // Re-enable button
        document.querySelector('.btn-complete').disabled = false;
        document.querySelector('.btn-complete').innerHTML = '<i class="fas fa-lock"></i> Betalen en Afspraak Maken';
    }
}

// ===================================
// Google Calendar Integration
// ===================================

async function addToCustomerGoogleCalendar() {
    // ===================================
    // GOOGLE CALENDAR API REQUIRED
    // ===================================
    // TODO: Implement Google Calendar API
    // 1. Get OAuth token
    // 2. Create calendar event
    // 3. Send invite to customer
    
    const event = {
        summary: `Agape Pedicure - ${bookingState.treatmentName}`,
        location: `${bookingState.locationName}, Netherlands`,
        description: `Behandeling: ${bookingState.treatmentName}\nDuur: ${bookingState.duration} minuten\nPrijs: €${bookingState.price}`,
        start: {
            dateTime: `${bookingState.date}T${bookingState.time}:00`,
            timeZone: 'Europe/Amsterdam',
        },
        end: {
            dateTime: calculateEndTime(bookingState.date, bookingState.time, bookingState.duration),
            timeZone: 'Europe/Amsterdam',
        },
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 60 },
            ],
        },
    };
    
    console.log('Google Calendar event to create:', event);
    
    // Actual implementation would use Google Calendar API:
    /*
    gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    }).then((response) => {
        console.log('Event created:', response);
    });
    */
}

function calculateEndTime(date, time, durationMinutes) {
    const start = new Date(`${date}T${time}:00`);
    start.setMinutes(start.getMinutes() + durationMinutes);
    return start.toISOString();
}

// ===================================
// Invoice Generation
// ===================================

function generateInvoice() {
    const invoiceNumber = 'INV-' + Date.now();
    const invoiceDate = new Date().toLocaleDateString('nl-NL');
    
    const invoice = {
        number: invoiceNumber,
        date: invoiceDate,
        customer: bookingState.customer,
        treatment: bookingState.treatmentName,
        location: bookingState.locationName,
        date: formatDate(new Date(bookingState.date)),
        time: bookingState.time,
        duration: bookingState.duration,
        price: bookingState.price,
        btw: bookingState.price * 0.21,
        total: bookingState.price
    };
    
    return invoice;
}

function downloadInvoice() {
    // ===================================
    // PDF GENERATION REQUIRED
    // ===================================
    // TODO: Generate PDF invoice
    // Options:
    // 1. Use jsPDF library
    // 2. Generate on backend and download
    // 3. Use PDF generation service
    
    const invoice = bookingState.invoiceData;
    
    // For now, create a simple HTML invoice
    const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Factuur ${invoice.number}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                .invoice-header { border-bottom: 3px solid #2E7A85; padding-bottom: 20px; margin-bottom: 30px; }
                .invoice-header h1 { color: #2E7A85; margin: 0; }
                .invoice-details { margin-bottom: 30px; }
                .invoice-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                .invoice-table th, .invoice-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                .invoice-table th { background: #f5f5f5; }
                .total { font-size: 1.25rem; font-weight: bold; color: #2E7A85; }
            </style>
        </head>
        <body>
            <div class="invoice-header">
                <h1>Agape Pedicure & Wellness</h1>
                <p>Factuur #${invoice.number}</p>
            </div>
            
            <div class="invoice-details">
                <h3>Klantgegevens:</h3>
                <p>${invoice.customer.name}<br>
                ${invoice.customer.email}<br>
                ${invoice.customer.phone}</p>
                
                <h3>Afspraak Details:</h3>
                <p>Datum: ${invoice.date}<br>
                Tijd: ${invoice.time}<br>
                Locatie: ${invoice.location}</p>
            </div>
            
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Behandeling</th>
                        <th>Duur</th>
                        <th>Prijs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${invoice.treatment}</td>
                        <td>${invoice.duration} min</td>
                        <td>€${invoice.price.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="2"><strong>BTW (21%)</strong></td>
                        <td>€${invoice.btw.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="total">Totaal</td>
                        <td class="total">€${invoice.total.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
                <p><strong>Agape Pedicure & Wellness Salon</strong><br>
                Leerdam: Eiland 1, unit 0.6, 4143 EN Leerdam<br>
                Roelofarendsveen: Stationsstraat 1V, 2371 SH<br>
                Tel: 06 49121690<br>
                Email: info@agapepedicure.nl</p>
            </div>
        </body>
        </html>
    `;
    
    // Open invoice in new window for printing/saving
    const invoiceWindow = window.open('', '_blank');
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
    invoiceWindow.print();
}

// ===================================
// Show Confirmation
// ===================================

function showConfirmation() {
    goToStep('Confirmation');
    document.getElementById('stepConfirmation').style.display = 'block';
    document.querySelector('.booking-form-container').style.gridColumn = '1 / -1';
    
    // Update confirmation summary
    const summary = `
        <div class="booking-summary">
            <div class="summary-item">
                <span>Behandeling:</span>
                <strong>${bookingState.treatmentName}</strong>
            </div>
            <div class="summary-item">
                <span>Locatie:</span>
                <strong>${bookingState.locationName}</strong>
            </div>
            <div class="summary-item">
                <span>Datum & Tijd:</span>
                <strong>${formatDate(new Date(bookingState.date))} om ${bookingState.time}</strong>
            </div>
            <div class="summary-item">
                <span>Duur:</span>
                <strong>${bookingState.duration} minuten</strong>
            </div>
            <div class="summary-item total">
                <span>Betaald:</span>
                <strong>€${bookingState.price.toFixed(2).replace('.', ',')}</strong>
            </div>
        </div>
    `;
    
    document.getElementById('confirmationSummary').innerHTML = summary;
    
    // Send confirmation email (backend)
    sendConfirmationEmail();
    
    // Add to salon Google Calendar (backend)
    addToSalonCalendar();
}

// ===================================
// Backend Integration Functions
// ===================================

async function sendConfirmationEmail() {
    // ===================================
    // EMAIL SERVICE REQUIRED
    // ===================================
    // TODO: Send confirmation email via backend
    // Include: booking details, payment receipt, calendar invite
    
    const emailData = {
        to: bookingState.customer.email,
        subject: 'Bevestiging van uw afspraak - Agape Pedicure',
        template: 'booking-confirmation',
        data: bookingState
    };
    
    console.log('Email to send:', emailData);
    
    // Example API call:
    /*
    await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
    });
    */
}

async function addToSalonCalendar() {
    // ===================================
    // SALON CALENDAR INTEGRATION
    // ===================================
    // TODO: Add booking to salon's Google Calendar
    // This should be done on the backend for security
    
    const calendarEvent = {
        summary: `${bookingState.treatmentName} - ${bookingState.customer.name}`,
        location: bookingState.locationName,
        description: `Klant: ${bookingState.customer.name}\nTelefoon: ${bookingState.customer.phone}\nEmail: ${bookingState.customer.email}\nOpmerkingen: ${bookingState.customer.notes || 'Geen'}`,
        start: {
            dateTime: `${bookingState.date}T${bookingState.time}:00`,
            timeZone: 'Europe/Amsterdam',
        },
        end: {
            dateTime: calculateEndTime(bookingState.date, bookingState.time, bookingState.duration),
            timeZone: 'Europe/Amsterdam',
        },
    };
    
    console.log('Calendar event for salon:', calendarEvent);
    
    // This should be called via backend API:
    /*
    await fetch('/api/calendar/add-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(calendarEvent)
    });
    */
}

// ===================================
// Initialize on page load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Booking system initialized');
    
    // Load Google Calendar API
    // loadGoogleCalendarAPI();
});

// ===================================
// Helper Functions
// ===================================

function formatPrice(price) {
    return `€${price.toFixed(2).replace('.', ',')}`;
}

function validateForm() {
    const form = document.getElementById('customerForm');
    return form.checkValidity();
}

