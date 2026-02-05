import { prisma } from '@/lib/prisma';

async function getTransactions() {
  return await prisma.transaction.findMany({
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

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Transactions</h1>

      <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="text-left py-3 text-gray-400 text-sm">Date</th>
                <th className="text-left py-3 text-gray-400 text-sm">Transaction ID</th>
                <th className="text-left py-3 text-gray-400 text-sm">User</th>
                <th className="text-left py-3 text-gray-400 text-sm">Prize</th>
                <th className="text-left py-3 text-gray-400 text-sm">Amount</th>
                <th className="text-left py-3 text-gray-400 text-sm">Payment Method</th>
                <th className="text-left py-3 text-gray-400 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gold/5 hover:bg-navy/50">
                  <td className="py-3 text-sm text-gray-300">
                    {new Date(transaction.createdAt).toLocaleDateString()} {new Date(transaction.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-3 text-sm text-gray-400 font-mono">
                    {transaction.id.slice(0, 8)}...
                  </td>
                  <td className="py-3 text-sm">
                    <div>
                      <p>{transaction.user.name || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{transaction.user.email || 'N/A'}</p>
                    </div>
                  </td>
                  <td className="py-3 text-sm">{transaction.ticket.prize.name}</td>
                  <td className="py-3 text-sm text-gold font-semibold">
                    PKR {transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 text-sm">
                    <span className="px-2 py-1 rounded bg-navy-dark text-xs">
                      {transaction.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'COMPLETED'
                          ? 'bg-green-500/20 text-green-400'
                          : transaction.status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : transaction.status === 'PROCESSING'
                          ? 'bg-blue-500/20 text-blue-400'
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

          {transactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No transactions yet</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {transactions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gold/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Transactions</p>
                <p className="text-lg font-bold">{transactions.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Completed</p>
                <p className="text-lg font-bold text-green-400">
                  {transactions.filter((t) => t.status === 'COMPLETED').length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Pending</p>
                <p className="text-lg font-bold text-yellow-400">
                  {transactions.filter((t) => t.status === 'PENDING').length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
                <p className="text-lg font-bold text-gold">
                  PKR{' '}
                  {transactions
                    .filter((t) => t.status === 'COMPLETED')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
