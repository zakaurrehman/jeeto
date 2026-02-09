import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch approved reviews (public)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        city: true,
        rating: true,
        comment: true,
        prizeName: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST - Submit a new review (goes to pending)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, city, rating, comment, prizeName } = body;

    if (!name || !email || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        name,
        email,
        city: city || null,
        rating,
        comment,
        prizeName: prizeName || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your review has been submitted and will be published after approval.',
      id: review.id,
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}
