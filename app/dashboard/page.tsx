import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getUserTickets(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      tickets: {
        include: {
          prize: true,
          transaction: true,
        },
        orderBy: { purchaseDate: 'desc' },
      },
    },
  });

  return user;
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  let user = await getUserTickets(userId);

  // If user doesn't exist in database, create them
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: '', // Will be updated by webhook later
      },
      include: {
        tickets: {
          include: {
            prize: true,
            transaction: true,
          },
          orderBy: { purchaseDate: 'desc' },
        },
      },
    });
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <header className="border-b border-gold/20 bg-navy-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <span className="text-gradient">My</span>
              <span className="text-pakistan-green"> Dashboard</span>
            </h1>
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Tickets</h3>
            <p className="text-3xl font-bold text-gold">{user.tickets.length}</p>
          </div>
          <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Active Tickets</h3>
            <p className="text-3xl font-bold">
              {user.tickets.filter((t) => t.prize.status === 'ACTIVE').length}
            </p>
          </div>
          <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Spent</h3>
            <p className="text-3xl font-bold text-gold">
              PKR{' '}
              {user.tickets
                .filter((t) => t.paymentStatus === 'COMPLETED')
                .reduce((sum, t) => sum + t.totalPrice, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
          <h2 className="text-xl font-bold mb-6">My Tickets</h2>

          {user.tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">You haven't purchased any tickets yet</p>
              <Link href="/" className="btn-gold inline-block">
                Browse Prizes
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {user.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-navy rounded-lg border border-gold/10 p-4 hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{ticket.prize.name}</h3>
                      <p className="text-sm text-gray-400">Ticket #{ticket.ticketNumber}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        ticket.paymentStatus === 'COMPLETED'
                          ? 'bg-green-500/20 text-green-400'
                          : ticket.paymentStatus === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {ticket.paymentStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Quantity</p>
                      <p className="font-semibold">{ticket.quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Price</p>
                      <p className="font-semibold text-gold">PKR {ticket.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
                      <p className="font-semibold text-sm">
                        {new Date(ticket.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Draw Date</p>
                      <p className="font-semibold text-sm">
                        {new Date(ticket.prize.drawDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Prize Status */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Prize Status:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        ticket.prize.status === 'ACTIVE'
                          ? 'bg-green-500/20 text-green-400'
                          : ticket.prize.status === 'DRAWN'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {ticket.prize.status}
                    </span>
                    {ticket.prize.status === 'DRAWN' && ticket.prize.winnerId === user.id && (
                      <span className="ml-2 text-gold font-bold">🎉 WINNER!</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
