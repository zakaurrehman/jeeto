import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { JazzCashPayment } from '@/lib/payments/jazzcash';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const callbackData: Record<string, string> = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
      callbackData[key] = value.toString();
    });

    const jazzCash = new JazzCashPayment();
    const verification = jazzCash.verifyCallback(callbackData);

    if (!verification.isValid) {
      console.error('Invalid JazzCash callback signature');
      return NextResponse.redirect(new URL('/payment/failed?reason=invalid', request.url));
    }

    const transactionId = verification.transactionId;

    // Find transaction
    const transaction = await prisma.transaction.findFirst({
      where: {
        gatewayOrderId: transactionId,
      },
      include: {
        ticket: {
          include: {
            prize: true,
          },
        },
      },
    });

    if (!transaction) {
      console.error('Transaction not found:', transactionId);
      return NextResponse.redirect(new URL('/payment/failed?reason=not-found', request.url));
    }

    if (verification.isSuccess) {
      // Payment successful - update transaction and ticket
      await prisma.$transaction(async (tx) => {
        // Update transaction
        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'COMPLETED',
            gatewayPaymentId: callbackData.pp_TxnRefNo,
          },
        });

        // Update ticket
        await tx.ticket.update({
          where: { id: transaction.ticketId },
          data: {
            paymentStatus: 'COMPLETED',
          },
        });

        // Update prize sold tickets count
        await tx.prize.update({
          where: { id: transaction.ticket.prizeId },
          data: {
            soldTickets: {
              increment: transaction.ticket.quantity,
            },
          },
        });
      });

      // Redirect to success page
      return NextResponse.redirect(
        new URL(`/payment/success?ticket=${transaction.ticketId}`, request.url)
      );
    } else {
      // Payment failed
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'FAILED',
        },
      });

      await prisma.ticket.update({
        where: { id: transaction.ticketId },
        data: {
          paymentStatus: 'FAILED',
        },
      });

      return NextResponse.redirect(
        new URL(`/payment/failed?reason=${callbackData.pp_ResponseMessage}`, request.url)
      );
    }
  } catch (error) {
    console.error('JazzCash callback error:', error);
    return NextResponse.redirect(new URL('/payment/failed?reason=error', request.url));
  }
}
