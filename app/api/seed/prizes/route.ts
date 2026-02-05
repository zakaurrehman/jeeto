import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  return POST();
}

export async function POST() {
  try {
    // Check if prizes already exist
    const existingPrizes = await prisma.prize.count();

    if (existingPrizes > 0) {
      return NextResponse.json({
        success: false,
        message: 'Prizes already exist. Delete existing prizes first.',
        count: existingPrizes,
      });
    }

    const prizes = [
      {
        name: 'iPhone 17 Pro',
        description: 'Latest iPhone 17 Pro with advanced features',
        imageUrl: '/images/iphone-17-pro.png',
        marketValue: 420000,
        ticketPrice: 100,
        totalTickets: 4200,
        soldTickets: 0,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE' as const,
        category: 'tech',
      },
      {
        name: 'iPhone 17 Pro Max',
        description: 'iPhone 17 Pro Max - The ultimate smartphone',
        imageUrl: '/images/iphone-17-pro-max.png',
        marketValue: 480000,
        ticketPrice: 150,
        totalTickets: 3200,
        soldTickets: 0,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE' as const,
        category: 'tech',
      },
      {
        name: 'iPad',
        description: 'Latest iPad with stunning display',
        imageUrl: '/images/ipad.png',
        marketValue: 220000,
        ticketPrice: 80,
        totalTickets: 2750,
        soldTickets: 0,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE' as const,
        category: 'tech',
      },
      {
        name: 'Apple Watch',
        description: 'Apple Watch - Your perfect health companion',
        imageUrl: '/images/apple-watch.png',
        marketValue: 150000,
        ticketPrice: 50,
        totalTickets: 3000,
        soldTickets: 0,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE' as const,
        category: 'tech',
      },
      {
        name: 'Mercedes C-Class 2024',
        description: 'Luxury Mercedes C-Class 2024',
        imageUrl: '/images/mercedes-c-class.png',
        marketValue: 30000000,
        ticketPrice: 1000,
        totalTickets: 30000,
        soldTickets: 0,
        drawDate: new Date('2026-03-15'),
        status: 'ACTIVE' as const,
        category: 'car',
      },
    ];

    const created = await prisma.prize.createMany({
      data: prizes,
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully added all prizes!',
      count: created.count,
    });
  } catch (error) {
    console.error('Error seeding prizes:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
