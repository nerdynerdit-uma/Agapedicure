# 🎯 Booking System Setup Guide

Your custom booking system is now ready! This guide explains how to set up the backend integrations.

---

## ✨ What's Included

Your booking system has:

✅ **Multi-step booking flow** (4 steps)  
✅ **Treatment selection** (8 treatment options)  
✅ **Location selection** (Roelofarendsveen - Dinsdagen, Leerdam - Vrijdagen)  
✅ **Google Calendar integration** (ready for API)  
✅ **Customer details form**  
✅ **3 payment methods** (iDEAL, PayPal, Credit Card)  
✅ **Automatic invoice generation**  
✅ **Calendar event creation** (salon + customer)  
✅ **Email confirmation**  

---

## 🚀 Booking Flow

```
Step 1: Select Treatment
  ↓
Step 2: Choose Location & Time (Google Calendar)
  ↓
Step 3: Enter Customer Details
  ↓
Step 4: Payment (iDEAL/PayPal/Stripe)
  ↓
Confirmation + Invoice Download
```

---

## 🔧 Backend Setup Required

This booking system requires a backend. You have several options:

### **Option 1: PHP Backend** (Most Common for shared hosting)
### **Option 2: Node.js Backend** (Modern, recommended)
### **Option 3: Use a Booking Service** (Easiest, paid)

---

## 📋 Required Integrations

### 1. **Google Calendar API**

**Purpose:** Show available time slots, add bookings to calendar

**Setup Steps:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Calendar API
4. Create credentials (API Key + OAuth 2.0)
5. Create two calendars:
   - Leerdam Calendar (Vrijdagen only)
   - Roelofarendsveen Calendar (Dinsdagen only)

**Configuration File:** Create `backend/config/calendar.js`

```javascript
module.exports = {
  apiKey: 'YOUR_GOOGLE_API_KEY',
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  calendars: {
    leerdam: 'leerdam@agapepedicure.nl',
    roelofarendsveen: 'roelofarendsveen@agapepedicure.nl'
  },
  workingHours: {
    start: '09:00',
    end: '18:00',
    slotDuration: 30 // minutes
  }
};
```

---

### 2. **Payment Integration**

#### **A. iDEAL (via Mollie)** - Most popular in Netherlands

**Setup:**
1. Create account at [Mollie.com](https://www.mollie.com/)
2. Get API keys (test + live)
3. Install Mollie SDK

**Backend Code Example (Node.js):**

```javascript
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ 
  apiKey: 'live_YOUR_API_KEY' 
});

// Create payment
const payment = await mollieClient.payments.create({
  amount: {
    currency: 'EUR',
    value: bookingData.price.toFixed(2)
  },
  description: `Agape Pedicure - ${bookingData.treatmentName}`,
  redirectUrl: 'https://agapepedicure.nl/betaling-success',
  webhookUrl: 'https://agapepedicure.nl/api/webhooks/mollie',
  method: 'ideal',
  metadata: {
    bookingId: bookingData.id
  }
});

// Redirect customer to payment URL
return payment.getCheckoutUrl();
```

#### **B. PayPal**

**Setup:**
1. Create [PayPal Business account](https://www.paypal.com/business)
2. Get Client ID and Secret
3. Install PayPal SDK

**Frontend Integration (already prepared):**

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR"></script>
```

#### **C. Stripe (Credit Card)**

**Setup:**
1. Create account at [Stripe.com](https://stripe.com/)
2. Get publishable key and secret key
3. Already integrated in frontend!

**Update in `booking-system.js` line 303:**

```javascript
const stripePublicKey = 'pk_live_YOUR_ACTUAL_KEY'; // Replace this
```

---

### 3. **Database Setup**

**Store bookings in a database:**

**Recommended:** MySQL or PostgreSQL

**Table Structure:**

```sql
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_number VARCHAR(50) UNIQUE,
    treatment_id VARCHAR(50),
    treatment_name VARCHAR(255),
    price DECIMAL(10,2),
    duration INT,
    location VARCHAR(100),
    booking_date DATE,
    booking_time TIME,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_notes TEXT,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    payment_id VARCHAR(255),
    calendar_event_id VARCHAR(255),
    invoice_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 4. **Email Service**

**Send confirmation emails with invoice:**

**Options:**
- [SendGrid](https://sendgrid.com/) - 100 emails/day free
- [Mailgun](https://www.mailgun.com/) - 5000 emails/month free
- [Amazon SES](https://aws.amazon.com/ses/) - Very cheap

**Email Template Example:**

```html
Subject: Bevestiging Afspraak - Agape Pedicure

Beste [Name],

Uw afspraak is bevestigd!

Behandeling: [Treatment]
Datum: [Date]
Tijd: [Time]
Locatie: [Location]
Prijs: €[Price]

Uw factuur is bijgevoegd.

Tot snel!
Agape Pedicure
```

---

### 5. **Invoice Generation**

**Generate PDF invoices:**

**Options:**

**A. jsPDF (Client-side):**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

**B. PDFKit (Node.js backend):**
```javascript
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
// Generate PDF...
```

**C. Invoice Service:**
- [Invoice Ninja](https://invoiceninja.com/)
- [Zoho Invoice](https://www.zoho.com/invoice/)

---

## 🏗️ Backend Structure (Node.js Example)

Create a backend folder structure:

```
backend/
├── server.js
├── config/
│   ├── calendar.js
│   ├── payment.js
│   └── email.js
├── routes/
│   ├── bookings.js
│   ├── payments.js
│   └── calendar.js
├── models/
│   └── Booking.js
├── services/
│   ├── calendarService.js
│   ├── paymentService.js
│   ├── emailService.js
│   └── invoiceService.js
└── package.json
```

---

## 📝 Backend API Endpoints Needed

Your frontend expects these endpoints:

### **1. POST `/api/bookings/create`**
Create new booking in database

### **2. GET `/api/calendar/availability`**
Get available time slots from Google Calendar

### **3. POST `/api/payments/create-ideal`**
Create iDEAL payment via Mollie

### **4. POST `/api/payments/create-paypal`**
Create PayPal payment

### **5. POST `/api/payments/create-stripe`**
Create Stripe payment intent

### **6. POST `/api/calendar/add-event`**
Add event to salon's Google Calendar

### **7. POST `/api/invoices/generate`**
Generate and send PDF invoice

### **8. POST `/api/email/send-confirmation`**
Send confirmation email to customer

---

## 🔒 Environment Variables

Create `.env` file in backend:

```env
# Google Calendar
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
CALENDAR_ID_LEERDAM=leerdam@agapepedicure.nl
CALENDAR_ID_ROELOFARENDSVEEN=roelofarendsveen@agapepedicure.nl

# Mollie (iDEAL)
MOLLIE_API_KEY=live_YOUR_MOLLIE_KEY

# PayPal
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET=YOUR_PAYPAL_SECRET

# Stripe
STRIPE_PUBLIC_KEY=pk_live_YOUR_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_KEY

# Email Service (SendGrid example)
SENDGRID_API_KEY=YOUR_SENDGRID_KEY
FROM_EMAIL=info@agapepedicure.nl

# Database
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=agape_pedicure

# Site
SITE_URL=https://agapepedicure.nl
FRONTEND_URL=https://agapepedicure.nl
```

---

## 📦 Quick Start with Node.js Backend

### **Step 1: Create Backend**

```bash
mkdir backend
cd backend
npm init -y
```

### **Step 2: Install Dependencies**

```bash
npm install express cors dotenv
npm install @mollie/api-client
npm install stripe
npm install @paypal/checkout-server-sdk
npm install googleapis
npm install nodemailer
npm install mysql2
npm install pdfkit
```

### **Step 3: Create Simple Server**

Create `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/bookings/create', async (req, res) => {
  // Handle booking creation
  const booking = req.body;
  // Save to database
  // Return booking ID
  res.json({ success: true, bookingId: '12345' });
});

app.get('/api/calendar/availability', async (req, res) => {
  const { location, date } = req.query;
  // Fetch from Google Calendar
  // Return available slots
  res.json({ slots: [] });
});

app.post('/api/payments/create-ideal', async (req, res) => {
  // Create Mollie payment
  // Return checkout URL
  res.json({ checkoutUrl: 'https://...' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### **Step 4: Run Backend**

```bash
node server.js
```

---

## 🎯 Simpler Alternative: Use a Service

If backend development is too complex, consider:

### **Option A: Calendly + Stripe**
- [Calendly](https://calendly.com/) - Booking calendar
- [Stripe Payment Links](https://stripe.com/payments/payment-links) - Simple payments

### **Option B: SimplyBook.me**
- All-in-one booking + payments
- €8-50/month
- [SimplyBook.me](https://simplybook.me/)

### **Option C: Acuity Scheduling**
- Full booking system
- Payment processing included
- [Acuity Scheduling](https://acuityscheduling.com/)

---

## 📚 Detailed Integration Guides

I'll create separate detailed guides for each integration:

### Files to Create:

1. **`GOOGLE-CALENDAR-SETUP.md`** - Complete Calendar API setup
2. **`PAYMENT-SETUP.md`** - iDEAL, PayPal, Stripe integration
3. **`INVOICE-SETUP.md`** - PDF invoice generation
4. **`BACKEND-SETUP.md`** - Complete backend setup

Would you like me to create these detailed guides?

---

## 🆘 Need Help?

**For development:**
- Hire a developer on Fiverr, Upwork, or Freelancer
- Budget: €500-2000 for complete backend setup

**For ready-made solution:**
- Use SimplyBook.me or Acuity Scheduling
- Cost: €10-30/month
- No coding required!

---

## ✅ Current Status

**Frontend:** ✅ **COMPLETE**
- Beautiful multi-step UI
- All treatment options
- Location selection
- Form validation
- Payment method selection
- Confirmation page

**Backend:** ⚠️ **REQUIRES SETUP**
- Google Calendar API
- Payment gateways
- Database
- Email service
- Invoice generation

---

## 🎨 Customize the Booking System

### Update Treatments:

Edit `boeken.html` starting at line 108

### Update Time Slots:

Edit `booking-system.js` line 121 (timeSlots array)

### Update Prices:

Edit treatment data attributes in `boeken.html`

---

**Your booking system frontend is complete and beautiful! Just needs backend setup.** 🎉

Would you like me to create the detailed integration guides?





