# Backend Setup Guide

## Prerequisites

1. **Clerk Account** - Sign up at [https://clerk.com](https://clerk.com)
2. **Database** - PostgreSQL (use Vercel Postgres, Neon, or local)
3. **Payment Gateway Accounts**:
   - JazzCash Merchant Account
   - EasyPaisa Business Account

---

## Step 1: Database Setup

### Option A: Vercel Postgres (Recommended for Vercel deployment)

1. Go to your Vercel dashboard
2. Select your project → Storage → Create Database → Postgres
3. Copy the `DATABASE_URL` connection string
4. Add to `.env.local`

### Option B: Neon (Free PostgreSQL)

1. Sign up at [https://neon.tech](https://neon.tech)
2. Create a new project
3. Copy connection string
4. Add to `.env.local`

### Option C: Local PostgreSQL

```bash
# Install PostgreSQL locally
# Then create database
createdb jeeto_pk

# Add to .env.local:
DATABASE_URL="postgresql://localhost:5432/jeeto_pk"
```

---

## Step 2: Clerk Authentication Setup

1. **Create Clerk Application**:
   - Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
   - Create new application
   - Enable: Email, Phone (SMS), Google, Facebook

2. **Get API Keys**:
   - Go to API Keys section
   - Copy `Publishable Key` and `Secret Key`

3. **Add to `.env.local`**:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
CLERK_SECRET_KEY=sk_test_xxxx
```

4. **Configure Webhooks** (for user sync):
   - In Clerk Dashboard → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/clerk`
   - Select events: `user.created`, `user.updated`

---

## Step 3: Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Open Prisma Studio (database GUI)
npx prisma studio
```

---

## Step 4: Payment Gateway Setup

### JazzCash Setup

1. **Get Merchant Account**:
   - Contact JazzCash Business: https://www.jazzcash.com.pk/business-solutions/
   - Get: Merchant ID, Password, Integrity Salt

2. **Add credentials to `.env.local`**:
```env
JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_PASSWORD=your_password
JAZZCASH_INTEGRITY_SALT=your_integrity_salt
JAZZCASH_RETURN_URL=https://yourdomain.com/api/payments/jazzcash/callback
```

3. **Test Mode**:
   - Use JazzCash sandbox credentials for testing
   - Production: Update with live credentials

### EasyPaisa Setup

1. **Get Business Account**:
   - Contact Telenor Microfinance Bank
   - Get: Store ID, Hash Key

2. **Add credentials to `.env.local`**:
```env
EASYPAISA_STORE_ID=your_store_id
EASYPAISA_HASH_KEY=your_hash_key
EASYPAISA_CALLBACK_URL=https://yourdomain.com/api/payments/easypaisa/callback
```

---

## Step 5: Seed Database with Prizes

```bash
npm run seed
```

This will populate your database with the 5 initial prizes.

---

## Step 6: Set Admin Users

1. Sign in to your app with Clerk
2. Copy your Clerk User ID from Clerk Dashboard
3. Add to `.env.local`:
```env
ADMIN_CLERK_USER_IDS=user_abc123,user_def456
```

---

## Step 7: Run Development Server

```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Prisma Studio**: `npx prisma studio`

---

## Environment Variables Checklist

- [ ] DATABASE_URL
- [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- [ ] CLERK_SECRET_KEY
- [ ] JAZZCASH_MERCHANT_ID
- [ ] JAZZCASH_PASSWORD
- [ ] JAZZCASH_INTEGRITY_SALT
- [ ] EASYPAISA_STORE_ID
- [ ] EASYPAISA_HASH_KEY
- [ ] ADMIN_CLERK_USER_IDS

---

## Deployment to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add all environment variables in Vercel Dashboard
4. Deploy!

---

## API Endpoints

### Public Routes
- `GET /api/prizes` - Get all active prizes
- `GET /api/prizes/[id]` - Get single prize

### Protected Routes (Require Authentication)
- `POST /api/tickets/purchase` - Purchase tickets
- `GET /api/tickets/user` - Get user's tickets
- `GET /api/user/profile` - Get user profile

### Admin Routes
- `GET /api/admin/prizes` - Manage prizes
- `POST /api/admin/prizes` - Create prize
- `POST /api/admin/draw/execute` - Execute draw
- `GET /api/admin/transactions` - View all transactions

### Webhook Routes
- `POST /api/webhooks/clerk` - Clerk user sync
- `POST /api/webhooks/jazzcash` - JazzCash payment callback
- `POST /api/webhooks/easypaisa` - EasyPaisa payment callback

---

## Testing Payment Flow

1. Sign in with Clerk
2. Click "Buy Ticket" on any prize
3. Select quantity and payment method
4. Complete payment (use test credentials in development)
5. Check Prisma Studio to see ticket created

---

## Troubleshooting

### Database connection failed
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Try: `npx prisma db push`

### Clerk auth not working
- Verify API keys are correct
- Check middleware.ts is properly configured
- Clear browser cookies

### Payment gateway errors
- Verify credentials in .env.local
- Check callback URLs are publicly accessible
- Review payment gateway documentation

---

## Next Steps

- [ ] Test ticket purchase flow
- [ ] Run a test draw
- [ ] Add prize images
- [ ] Configure email notifications
- [ ] Set up SMS for winners
- [ ] Add analytics

For help, check [tasks/todo.md](tasks/todo.md) for implementation status.
