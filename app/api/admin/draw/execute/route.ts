import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    await requireAdmin();

    const body = await request.json();
    const { prizeId } = body;

    if (!prizeId) {
      return NextResponse.json(
        { success: false, error: 'Prize ID required' },
        { status: 400 }
      );
    }

    // Get prize with all tickets
    const prize = await prisma.prize.findUnique({
      where: { id: prizeId },
      include: {
        tickets: {
          where: {
            paymentStatus: 'COMPLETED',
          },
          include: {
            user: true,
          },
        },
      },
    });

    if (!prize) {
      return NextResponse.json(
        { success: false, error: 'Prize not found' },
        { status: 404 }
      );
    }

    if (prize.status === 'DRAWN') {
      return NextResponse.json(
        { success: false, error: 'Draw already executed for this prize' },
        { status: 400 }
      );
    }

    if (prize.tickets.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No tickets sold for this prize' },
        { status: 400 }
      );
    }

    // Create array of all ticket entries (accounting for quantity)
    const allEntries: { ticketId: string; userId: string }[] = [];

    prize.tickets.forEach((ticket) => {
      for (let i = 0; i < ticket.quantity; i++) {
        allEntries.push({
          ticketId: ticket.id,
          userId: ticket.userId,
        });
      }
    });

    // Randomly select a winner
    const randomIndex = Math.floor(Math.random() * allEntries.length);
    const winner = allEntries[randomIndex];

    // Update prize with winner
    await prisma.prize.update({
      where: { id: prizeId },
      data: {
        status: 'DRAWN',
        winnerId: winner.userId,
      },
    });

    // Get winner details
    const winningTicket = prize.tickets.find((t) => t.id === winner.ticketId);
    const winnerUser = winningTicket?.user;

    return NextResponse.json({
      success: true,
      data: {
        winnerId: winner.userId,
        winnerEmail: winnerUser?.email,
        winnerName: winnerUser?.name,
        ticketNumber: winningTicket?.ticketNumber,
        totalEntries: allEntries.length,
        uniqueParticipants: prize.tickets.length,
      },
    });
  } catch (error: any) {
    console.error('Draw execution error:', error);

    if (error.message === 'Unauthorized: Admin access required') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
