import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getPrizes() {
  return await prisma.prize.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { tickets: true },
      },
    },
  });
}

export default async function PrizesPage() {
  const prizes = await getPrizes();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Prize Management</h1>
        <Link href="/admin/prizes/new" className="btn-gold">
          + Add New Prize
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {prizes.map((prize) => {
          const soldPercentage = (prize.soldTickets / prize.totalTickets) * 100;
          const remainingTickets = prize.totalTickets - prize.soldTickets;

          return (
            <div
              key={prize.id}
              className="bg-navy-light rounded-xl border border-gold/20 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{prize.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        prize.status === 'ACTIVE'
                          ? 'bg-green-500/20 text-green-400'
                          : prize.status === 'CLOSED'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : prize.status === 'DRAWN'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {prize.status}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{prize.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Market Value</p>
                      <p className="text-gold font-semibold">
                        PKR {prize.marketValue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Ticket Price</p>
                      <p className="font-semibold">PKR {prize.ticketPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Sold Tickets</p>
                      <p className="font-semibold">
                        {prize.soldTickets} / {prize.totalTickets}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Draw Date</p>
                      <p className="font-semibold text-sm">
                        {new Date(prize.drawDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{soldPercentage.toFixed(1)}% sold</span>
                      <span>{remainingTickets} remaining</span>
                    </div>
                    <div className="w-full bg-navy-dark rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pakistan-green to-gold h-2 rounded-full transition-all"
                        style={{ width: `${soldPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/admin/prizes/${prize.id}/edit`}
                      className="text-gold hover:text-gold-light text-sm"
                    >
                      Edit
                    </Link>
                    {prize.status === 'ACTIVE' && remainingTickets === 0 && (
                      <Link
                        href={`/admin/draws/${prize.id}`}
                        className="text-pakistan-green hover:text-pakistan-green-light text-sm"
                      >
                        Execute Draw
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {prizes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No prizes yet</p>
          <Link href="/admin/prizes/new" className="btn-gold inline-block">
            Create First Prize
          </Link>
        </div>
      )}
    </div>
  );
}
