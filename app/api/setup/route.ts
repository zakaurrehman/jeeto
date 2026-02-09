import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This endpoint creates the new tables if they don't exist
// Visit /api/setup after deployment to initialize the database
export async function GET() {
  const results: string[] = [];

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    results.push('Database connection: OK');

    // Try to create ContactMessage table via raw SQL
    try {
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "ContactMessage" (
          "id" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "phone" TEXT,
          "subject" TEXT NOT NULL,
          "message" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'NEW',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
        )
      `;
      results.push('ContactMessage table: Created/Exists');
    } catch (e: any) {
      results.push('ContactMessage table: ' + e.message);
    }

    // Create indexes for ContactMessage
    try {
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "ContactMessage_status_idx" ON "ContactMessage"("status")`;
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt")`;
      results.push('ContactMessage indexes: Created/Exist');
    } catch (e: any) {
      results.push('ContactMessage indexes: ' + e.message);
    }

    // Try to create Review table
    try {
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "Review" (
          "id" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "city" TEXT,
          "rating" INTEGER NOT NULL,
          "comment" TEXT NOT NULL,
          "prizeName" TEXT,
          "status" TEXT NOT NULL DEFAULT 'PENDING',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
        )
      `;
      results.push('Review table: Created/Exists');
    } catch (e: any) {
      results.push('Review table: ' + e.message);
    }

    // Create indexes for Review
    try {
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "Review_status_idx" ON "Review"("status")`;
      await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "Review_createdAt_idx" ON "Review"("createdAt")`;
      results.push('Review indexes: Created/Exist');
    } catch (e: any) {
      results.push('Review indexes: ' + e.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Database setup complete!',
      results,
      nextSteps: [
        'Visit /api/seed/reviews to add initial reviews',
        'Visit /api/seed/prizes to add new prizes (if needed)',
      ],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        results,
      },
      { status: 500 }
    );
  }
}
