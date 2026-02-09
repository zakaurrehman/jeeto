import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  return POST();
}

export async function POST() {
  try {
    const existingReviews = await prisma.review.count();

    if (existingReviews > 0) {
      return NextResponse.json({
        success: false,
        message: 'Reviews already exist.',
        count: existingReviews,
      });
    }

    const reviews = [
      {
        name: 'Ahmed Khan',
        email: 'ahmed.khan@gmail.com',
        city: 'Karachi',
        rating: 5,
        comment: 'I won an iPhone 15 Pro! Couldn\'t believe it at first, but the entire process was smooth and transparent. The team contacted me within 24 hours. Highly recommended!',
        prizeName: 'iPhone 15 Pro',
        status: 'APPROVED' as const,
      },
      {
        name: 'Fatima Zahra',
        email: 'fatima.zahra@outlook.com',
        city: 'Lahore',
        rating: 5,
        comment: 'Best lucky draw platform in Pakistan! I\'ve been participating for 2 months and the transparency is amazing. You can see everything clearly. Won AirPods last month!',
        prizeName: 'AirPods Pro',
        status: 'APPROVED' as const,
      },
      {
        name: 'Muhammad Ali',
        email: 'mali.trader@yahoo.com',
        city: 'Islamabad',
        rating: 4,
        comment: 'Very trustworthy platform. Payment through JazzCash was instant and easy. I haven\'t won yet but I can see the draws are fair. The ticket prices are very affordable.',
        prizeName: null,
        status: 'APPROVED' as const,
      },
      {
        name: 'Sara Malik',
        email: 'sara.malik@hotmail.com',
        city: 'Faisalabad',
        rating: 5,
        comment: 'Won an Apple Watch! The whole experience was incredible. From buying tickets to receiving the prize, everything was professional. This is the real deal!',
        prizeName: 'Apple Watch',
        status: 'APPROVED' as const,
      },
      {
        name: 'Usman Tariq',
        email: 'usman.tariq@gmail.com',
        city: 'Rawalpindi',
        rating: 5,
        comment: 'Finally a Pakistani platform I can trust! The draws are transparent, the support team is responsive, and the prizes are genuine. Keep up the great work!',
        prizeName: null,
        status: 'APPROVED' as const,
      },
      {
        name: 'Ayesha Siddiqui',
        email: 'ayesha.sid@gmail.com',
        city: 'Multan',
        rating: 4,
        comment: 'Great concept and execution. The EasyPaisa integration makes it super easy to buy tickets. I love how they announce winners publicly with verification.',
        prizeName: null,
        status: 'APPROVED' as const,
      },
      {
        name: 'Hassan Raza',
        email: 'hassan.raza@outlook.com',
        city: 'Peshawar',
        rating: 5,
        comment: 'Won a Samsung Galaxy! Can\'t thank Jeeto Pakistan enough. The prize was delivered within a week. 100% genuine and trustworthy platform. Telling all my friends!',
        prizeName: 'Samsung Galaxy S25 Ultra',
        status: 'APPROVED' as const,
      },
      {
        name: 'Zainab Hussain',
        email: 'zainab.h@yahoo.com',
        city: 'Sialkot',
        rating: 5,
        comment: 'I was skeptical at first, but after seeing verified winners on their social media, I decided to try. Bought 5 tickets for PKR 500 and won an iPad! Absolutely amazing!',
        prizeName: 'iPad',
        status: 'APPROVED' as const,
      },
    ];

    const created = await prisma.review.createMany({ data: reviews });

    return NextResponse.json({
      success: true,
      message: 'Successfully added initial reviews!',
      count: created.count,
    });
  } catch (error) {
    console.error('Error seeding reviews:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
