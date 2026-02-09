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
      {
        name: 'Honda CB 150F',
        description: 'Brand new Honda CB 150F motorcycle - Pakistan\'s favorite bike',
        imageUrl: '/images/honda-cb150f.png',
        marketValue: 450000,
        ticketPrice: 100,
        totalTickets: 4500,
        soldTickets: 0,
        drawDate: new Date('2026-03-10'),
        status: 'ACTIVE' as const,
        category: 'car',
      },
      {
        name: 'Samsung Galaxy S25 Ultra',
        description: 'Samsung Galaxy S25 Ultra with AI features and S Pen',
        imageUrl: '/images/samsung-s25-ultra.png',
        marketValue: 380000,
        ticketPrice: 100,
        totalTickets: 3800,
        soldTickets: 0,
        drawDate: new Date('2026-03-05'),
        status: 'ACTIVE' as const,
        category: 'tech',
      },
      {
        name: '10 Tola Gold',
        description: '10 Tola (116.6g) pure 24K gold - a timeless investment',
        imageUrl: '/images/gold-10-tola.png',
        marketValue: 2800000,
        ticketPrice: 500,
        totalTickets: 5600,
        soldTickets: 0,
        drawDate: new Date('2026-03-20'),
        status: 'ACTIVE' as const,
        category: 'luxury',
      },
      {
        name: 'AirPods Pro 2',
        description: 'Apple AirPods Pro 2 with USB-C and Active Noise Cancellation',
        imageUrl: '/images/airpods-pro.png',
        marketValue: 75000,
        ticketPrice: 50,
        totalTickets: 1500,
        soldTickets: 0,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE' as const,
        category: 'tech',
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
