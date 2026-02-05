import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getPrizes() {
  return await prisma.prize.findMany({
    orderBy: { drawDate: 'asc' },
    include: {
      winner: true,
      _count: {
        select: { tickets: true },
      },
    },
  });
}

export default async function DrawsPage() {
  const prizes = await getPrizes();

  const upcomingDraws = prizes.filter((p) => p.status === 'ACTIVE' || p.status === 'CLOSED');
  const completedDraws = prizes.filter((p) => p.status === 'DRAWN');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Draw Management</h1>

      {/* Upcoming Draws */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Upcoming Draws</h2>
        <div className="grid grid-cols-1 gap-4">
          {upcomingDraws.map((prize) => {
            const soldPercentage = (prize.soldTickets / prize.totalTickets) * 100;
            const remainingTickets = prize.totalTickets - prize.soldTickets;
            const canExecuteDraw = prize.status === 'ACTIVE' && remainingTickets === 0;

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
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {prize.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Draw Date</p>
                        <p className="font-semibold">
                          {new Date(prize.drawDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Total Tickets</p>
                        <p className="font-semibold">{prize.totalTickets.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Sold Tickets</p>
                        <p className="font-semibold">
                          {prize.soldTickets} ({soldPercentage.toFixed(1)}%)
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Participants</p>
                        <p className="font-semibold">{prize._count.tickets}</p>
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
                      {canExecuteDraw ? (
                        <Link
                          href={`/admin/draws/${prize.id}`}
                          className="btn-gold text-sm px-4 py-2"
                        >
                          Execute Draw
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="text-sm px-4 py-2 rounded-lg bg-gray-500/20 text-gray-500 cursor-not-allowed"
                        >
                          {remainingTickets > 0
                            ? `Waiting for ${remainingTickets} more tickets`
                            : 'Not ready for draw'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {upcomingDraws.length === 0 && (
            <div className="text-center py-12 bg-navy-light rounded-xl border border-gold/20">
              <p className="text-gray-400">No upcoming draws</p>
            </div>
          )}
        </div>
      </div>

      {/* Completed Draws */}
      <div>
        <h2 className="text-xl font-bold mb-4">Completed Draws</h2>
        <div className="grid grid-cols-1 gap-4">
          {completedDraws.map((prize) => (
            <div
              key={prize.id}
              className="bg-navy-light rounded-xl border border-gold/20 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{prize.name}</h3>
                    <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                      DRAWN
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Draw Date</p>
                      <p className="font-semibold">
                        {new Date(prize.drawDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Total Tickets</p>
                      <p className="font-semibold">{prize.totalTickets.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Participants</p>
                      <p className="font-semibold">{prize._count.tickets}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Prize Value</p>
                      <p className="font-semibold text-gold">
                        PKR {prize.marketValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {prize.winner && (
                    <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-1">Winner</p>
                      <div className="flex items-center gap-3">
                        {prize.winner.imageUrl && (
                          <img
                            src={prize.winner.imageUrl}
                            alt={prize.winner.name || 'Winner'}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-bold text-gold">{prize.winner.name || 'Anonymous'}</p>
                          <p className="text-sm text-gray-400">{prize.winner.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {completedDraws.length === 0 && (
            <div className="text-center py-12 bg-navy-light rounded-xl border border-gold/20">
              <p className="text-gray-400">No completed draws yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
