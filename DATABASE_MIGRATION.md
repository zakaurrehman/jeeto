# Database Migration Required

After deploying the optional enhancements, you need to run a database migration to add the ContactMessage table.

## Option 1: Automatic Migration (Recommended)

Push the changes to Vercel, then run:

```bash
npx prisma db push
```

This will update your production database schema without creating migration files.

## Option 2: Using Prisma Migrate

If you prefer proper migrations:

```bash
npx prisma migrate deploy
```

## What's Being Added

The migration adds a new `ContactMessage` table to store contact form submissions:

```sql
CREATE TABLE "ContactMessage" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  INDEX "ContactMessage_status_idx"("status"),
  INDEX "ContactMessage_createdAt_idx"("createdAt")
);
```

## After Migration

Once the migration is complete, the contact form at `/contact` will work properly and store submissions in the database.

You can view contact messages in the admin dashboard (future enhancement) or directly in the database.
