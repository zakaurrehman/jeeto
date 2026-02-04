# Payment Integration Setup Guide

Complete guide for setting up JazzCash and EasyPaisa payment gateways for Jeeto.pk.

---

## 🎯 Overview

Your Jeeto.pk platform now has full payment integration with:
- ✅ **JazzCash** - Mobile wallet payment
- ✅ **EasyPaisa** - Mobile account payment
- ✅ **Webhook handlers** - Automatic payment verification
- ✅ **Transaction tracking** - Complete audit trail
- ✅ **Success/Failed pages** - User-friendly payment feedback

---

## 📋 Prerequisites

### 1. JazzCash Merchant Account
**Contact**: JazzCash Business Solutions
- **Website**: https://www.jazzcash.com.pk/business-solutions/
- **Email**: business@jazzcash.com.pk
- **Phone**: 111-124-111

**Required Documents**:
- Business registration/NTN certificate
- CNIC of business owner
- Bank account details
- Business address proof

### 2. EasyPaisa Business Account
**Contact**: Telenor Microfinance Bank
- **Website**: https://www.easypaisa.com.pk/business/
- **Email**: business@easypaisa.com.pk
- **Phone**: 111-003-737

**Required Documents**:
- Business registration
- CNIC of authorized person
- Bank account details
- Business profile

---

## 🔧 Step-by-Step Setup

### Step 1: Get JazzCash Credentials

1. **Register** for JazzCash Merchant Account
2. **Receive** credentials via email:
   - `Merchant ID`
   - `Password`
   - `Integrity Salt`

3. **Get** Return URL configured:
   - Production: `https://jeeto.pk/api/payments/jazzcash/callback`
   - Staging: `https://yourdomain.vercel.app/api/payments/jazzcash/callback`

### Step 2: Get EasyPaisa Credentials

1. **Register** for EasyPaisa Business Account
2. **Receive** credentials:
   - `Store ID`
   - `Hash Key`

3. **Configure** Callback URL:
   - Production: `https://jeeto.pk/api/payments/easypaisa/callback`
   - Staging: `https://yourdomain.vercel.app/api/payments/easypaisa/callback`

### Step 3: Add Environment Variables

Add these to your `.env.local` (local) and Vercel (production):

```env
# JazzCash Configuration
JAZZCASH_MERCHANT_ID=MC12345
JAZZCASH_PASSWORD=your_password_here
JAZZCASH_INTEGRITY_SALT=your_salt_here
JAZZCASH_RETURN_URL=https://jeeto.pk/api/payments/jazzcash/callback

# EasyPaisa Configuration
EASYPAISA_STORE_ID=12345
EASYPAISA_HASH_KEY=your_hash_key_here
EASYPAISA_CALLBACK_URL=https://jeeto.pk/api/payments/easypaisa/callback
```

### Step 4: Configure Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Add all 6 payment variables above
4. Select **Production, Preview, Development**
5. Click **Save**
6. **Redeploy** your application

---

## 🧪 Testing

### JazzCash Sandbox

For testing, use JazzCash sandbox:
1. Update URL in `lib/payments/jazzcash.ts`:
```typescript
url: 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/'
```

2. Use sandbox credentials provided by JazzCash

3. Test card numbers:
   - Success: Any valid card
   - Failure: Use specific test cards from JazzCash

### EasyPaisa Staging

For testing, use EasyPaisa staging:
1. URL is already set to staging in `lib/payments/easypaisa.ts`
2. Use staging credentials from EasyPaisa
3. Test with staging mobile accounts

### Test Flow

1. **Start Purchase**:
   - Visit your website
   - Click "Buy Ticket" on any prize
   - Select quantity and payment method
   - Click "Purchase"

2. **Payment Gateway**:
   - You'll be redirected to JazzCash/EasyPaisa
   - Complete payment with test credentials
   - You'll be redirected back

3. **Verify Success**:
   - Check `/payment/success` page
   - Check database for ticket and transaction records
   - Verify prize `soldTickets` incremented

4. **Test Failure**:
   - Use invalid credentials
   - Check `/payment/failed` page

---

## 🔐 Security Checklist

- [ ] All environment variables configured
- [ ] HTTPS enabled on production domain
- [ ] Webhook signatures verified
- [ ] Database transactions used for atomicity
- [ ] Error logging implemented
- [ ] Payment amounts validated server-side
- [ ] Return URLs whitelisted with payment gateways
- [ ] No sensitive data in client-side code

---

## 📊 Payment Flow

### 1. User Initiates Purchase
```
User clicks "Buy Ticket" → TicketModal opens
→ User selects quantity & payment method
→ Clicks "Purchase"
```

### 2. Backend Processing
```
POST /api/payments/initiate
→ Validates user authentication (Clerk)
→ Checks prize availability
→ Creates Ticket (PENDING)
→ Creates Transaction (PENDING)
→ Generates payment gateway request
→ Returns gateway URL and form data
```

### 3. Payment Gateway
```
User redirected to JazzCash/EasyPaisa
→ Completes payment
→ Gateway processes payment
→ Gateway redirects back to callback URL
```

### 4. Callback Processing
```
POST /api/payments/jazzcash/callback
or
POST /api/payments/easypaisa/callback
→ Verifies signature
→ Updates Transaction (COMPLETED/FAILED)
→ Updates Ticket (COMPLETED/FAILED)
→ Increments Prize soldTickets (if success)
→ Redirects to success/failed page
```

---

## 📁 File Structure

```
lib/payments/
├── jazzcash.ts          # JazzCash integration
└── easypaisa.ts         # EasyPaisa integration

app/api/payments/
├── initiate/
│   └── route.ts         # Start payment process
├── jazzcash/
│   └── callback/
│       └── route.ts     # JazzCash callback handler
└── easypaisa/
    └── callback/
        └── route.ts     # EasyPaisa callback handler

app/payment/
├── success/
│   └── page.tsx         # Payment success page
└── failed/
    └── page.tsx         # Payment failed page
```

---

## 🐛 Troubleshooting

### Payment Not Processing

**Issue**: User clicks purchase but nothing happens

**Solutions**:
- Check browser console for JavaScript errors
- Verify Clerk authentication is working
- Check API route `/api/payments/initiate` logs
- Ensure environment variables are set

### Invalid Signature Error

**Issue**: Callback returns "Invalid signature"

**Solutions**:
- Verify `JAZZCASH_INTEGRITY_SALT` / `EASYPAISA_HASH_KEY` is correct
- Check that no extra spaces in environment variables
- Ensure using exact same credentials as registered

### Callback Not Received

**Issue**: Payment completes but no callback received

**Solutions**:
- Verify callback URL is publicly accessible (not localhost)
- Check payment gateway dashboard for callback logs
- Ensure HTTPS is enabled
- Check Vercel function logs

### Transaction Not Updating

**Issue**: Payment successful but ticket stays PENDING

**Solutions**:
- Check database connection
- Review callback handler logs
- Verify Prisma transaction is completing
- Check for database constraint violations

---

## 📞 Support Contacts

### JazzCash
- **Technical Support**: techsupport@jazzcash.com.pk
- **Business Support**: business@jazzcash.com.pk
- **Phone**: 111-124-111

### EasyPaisa
- **Technical Support**: merchantsupport@easypaisa.com.pk
- **Business Support**: business@easypaisa.com.pk
- **Phone**: 111-003-737

---

## 🚀 Go Live Checklist

Before accepting real payments:

- [ ] JazzCash production credentials configured
- [ ] EasyPaisa production credentials configured
- [ ] Tested end-to-end flow in sandbox/staging
- [ ] SSL certificate installed
- [ ] Domain configured (jeeto.pk)
- [ ] Return URLs updated to production domain
- [ ] Return URLs whitelisted with gateways
- [ ] Database backups configured
- [ ] Error monitoring set up (Sentry, etc.)
- [ ] Transaction logging enabled
- [ ] Refund process documented
- [ ] Customer support process defined
- [ ] Legal compliance verified (Payment gateway terms)

---

## 💡 Next Steps

1. **Testing**: Test all payment flows thoroughly
2. **Documentation**: Document refund process
3. **Monitoring**: Set up payment analytics
4. **Support**: Create customer support workflow
5. **Compliance**: Ensure PCI DSS compliance (if storing card data)

---

**Last Updated**: February 4, 2026
**Version**: 1.0.0
