import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getStats() {
  const [
    totalPrizes,
    activePrizes,
    totalTickets,
    completedTransactions,
    totalRevenue,
    totalUsers,
  ] = await Promise.all([
    prisma.prize.count(),
    prisma.prize.count({ where: { status: 'ACTIVE' } }),
    prisma.ticket.count(),
    prisma.transaction.count({ where: { status: 'COMPLETED' } }),
    prisma.transaction.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    }),
    prisma.user.count(),
  ]);

  return {
    totalPrizes,
    activePrizes,
    totalTickets,
    completedTransactions,
    totalRevenue: totalRevenue._sum.amount || 0,
    totalUsers,
  };
}

async function getRecentTransactions() {
  return await prisma.transaction.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      ticket: {
        include: {
          prize: true,
        },
      },
    },
  });
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentTransactions = await getRecentTransactions();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Total Revenue</h3>
            <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
              <span className="text-gold text-xl">₨</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gold">
            PKR {stats.totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Active Prizes */}
        <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Active Prizes</h3>
            <div className="w-10 h-10 bg-pakistan-green/20 rounded-lg flex items-center justify-center">
              <span className="text-pakistan-green text-xl">🎁</span>
            </div>
          </div>
          <p className="text-3xl font-bold">
            {stats.activePrizes} <span className="text-gray-500 text-lg">/ {stats.totalPrizes}</span>
          </p>
        </div>

        {/* Total Tickets Sold */}
        <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Tickets Sold</h3>
            <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
              <span className="text-gold text-xl">🎫</span>
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalTickets.toLocaleString()}</p>
        </div>

        {/* Completed Transactions */}
        <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Completed Transactions</h3>
            <div className="w-10 h-10 bg-pakistan-green/20 rounded-lg flex items-center justify-center">
              <span className="text-pakistan-green text-xl">✓</span>
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.completedTransactions.toLocaleString()}</p>
        </div>

        {/* Total Users */}
        <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-400 text-sm">Total Users</h3>
            <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
              <span className="text-gold text-xl">👥</span>
            </div>
          </div>
          <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <Link
            href="/admin/transactions"
            className="text-gold hover:text-gold-light text-sm"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="text-left py-3 text-gray-400 text-sm">Date</th>
                <th className="text-left py-3 text-gray-400 text-sm">User</th>
                <th className="text-left py-3 text-gray-400 text-sm">Prize</th>
                <th className="text-left py-3 text-gray-400 text-sm">Amount</th>
                <th className="text-left py-3 text-gray-400 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gold/5">
                  <td className="py-3 text-sm text-gray-300">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-sm">{transaction.user.email || 'N/A'}</td>
                  <td className="py-3 text-sm">{transaction.ticket.prize.name}</td>
                  <td className="py-3 text-sm text-gold">
                    PKR {transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'COMPLETED'
                          ? 'bg-green-500/20 text-green-400'
                          : transaction.status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
