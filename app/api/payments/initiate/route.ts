import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { JazzCashPayment } from '@/lib/payments/jazzcash';
import { EasyPaisaPayment } from '@/lib/payments/easypaisa';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { prizeId, quantity, paymentMethod } = body;

    // Validate input
    if (!prizeId || !quantity || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get prize details
    const prize = await prisma.prize.findUnique({
      where: { id: prizeId },
    });

    if (!prize) {
      return NextResponse.json(
        { success: false, error: 'Prize not found' },
        { status: 404 }
      );
    }

    if (prize.status !== 'ACTIVE') {
      return NextResponse.json(
        { success: false, error: 'Prize is not available for purchase' },
        { status: 400 }
      );
    }

    // Check ticket availability
    const remainingTickets = prize.totalTickets - prize.soldTickets;
    if (quantity > remainingTickets) {
      return NextResponse.json(
        { success: false, error: `Only ${remainingTickets} tickets remaining` },
        { status: 400 }
      );
    }

    // Calculate total amount
    const totalAmount = prize.ticketPrice * quantity;

    // Get or create user in database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          clerkId: userId,
        },
      });
    }

    // Generate unique ticket number
    const ticketNumber = `JT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create ticket record (pending payment)
    const ticket = await prisma.ticket.create({
      data: {
        ticketNumber,
        quantity,
        totalPrice: totalAmount,
        paymentStatus: 'PENDING',
        userId: user.id,
        prizeId: prize.id,
      },
    });

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        amount: totalAmount,
        paymentMethod: paymentMethod.toUpperCase(),
        status: 'PENDING',
        userId: user.id,
        ticketId: ticket.id,
      },
    });

    // Generate payment gateway request based on method
    let paymentRequest;

    if (paymentMethod.toLowerCase() === 'jazzcash') {
      const jazzCash = new JazzCashPayment();
      paymentRequest = jazzCash.createPaymentRequest({
        amount: totalAmount,
        billReference: transaction.id,
        description: `${quantity}x Ticket for ${prize.name}`,
      });
    } else if (paymentMethod.toLowerCase() === 'easypaisa') {
      const easyPaisa = new EasyPaisaPayment();
      paymentRequest = easyPaisa.createPaymentRequest({
        amount: totalAmount,
        orderId: transaction.id,
        description: `${quantity}x Ticket for ${prize.name}`,
      });
    } else {
      // For other payment methods (cards), you would integrate Stripe or other gateway
      return NextResponse.json(
        { success: false, error: 'Payment method not yet supported' },
        { status: 400 }
      );
    }

    // Update transaction with gateway order ID
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        gatewayOrderId: transaction.id,
        status: 'PROCESSING',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ticketId: ticket.id,
        transactionId: transaction.id,
        amount: totalAmount,
        paymentGateway: paymentRequest,
      },
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
