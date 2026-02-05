import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    await requireAdmin();

    const body = await request.json();
    const { name, description, imageUrl, marketValue, ticketPrice, totalTickets, drawDate, category } = body;

    // Validate required fields
    if (!name || !description || !imageUrl || !marketValue || !ticketPrice || !totalTickets || !drawDate || !category) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create the prize
    const prize = await prisma.prize.create({
      data: {
        name,
        description,
        imageUrl,
        marketValue: parseInt(marketValue),
        ticketPrice: parseInt(ticketPrice),
        totalTickets: parseInt(totalTickets),
        soldTickets: 0,
        drawDate: new Date(drawDate),
        status: 'ACTIVE',
        category,
      },
    });

    return NextResponse.json({
      success: true,
      data: prize,
    });
  } catch (error) {
    console.error('Error creating prize:', error);

    if (error instanceof Error && error.message === 'Unauthorized: Admin access required') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create prize' },
      { status: 500 }
    );
  }
}
