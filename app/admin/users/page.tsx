import { prisma } from '@/lib/prisma';

async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          tickets: true,
          transactions: true,
        },
      },
      transactions: {
        where: { status: 'COMPLETED' },
      },
    },
  });
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="text-left py-3 text-gray-400 text-sm">User</th>
                <th className="text-left py-3 text-gray-400 text-sm">Email</th>
                <th className="text-left py-3 text-gray-400 text-sm">Phone</th>
                <th className="text-left py-3 text-gray-400 text-sm">Joined</th>
                <th className="text-left py-3 text-gray-400 text-sm">Tickets</th>
                <th className="text-left py-3 text-gray-400 text-sm">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const totalSpent = user.transactions.reduce((sum, t) => sum + t.amount, 0);

                return (
                  <tr key={user.id} className="border-b border-gold/5 hover:bg-navy/50">
                    <td className="py-3 text-sm">
                      <div className="flex items-center gap-3">
                        {user.imageUrl ? (
                          <img
                            src={user.imageUrl}
                            alt={user.name || 'User'}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                            <span className="text-gold text-sm">
                              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </span>
                          </div>
                        )}
                        <span>{user.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-300">{user.email || 'N/A'}</td>
                    <td className="py-3 text-sm text-gray-300">{user.phone || 'N/A'}</td>
                    <td className="py-3 text-sm text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-sm">
                      <span className="px-2 py-1 rounded bg-navy-dark">
                        {user._count.tickets}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gold font-semibold">
                      PKR {totalSpent.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No users yet</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {users.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gold/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Users</p>
                <p className="text-lg font-bold">{users.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Active Users (with tickets)</p>
                <p className="text-lg font-bold text-pakistan-green">
                  {users.filter((u) => u._count.tickets > 0).length}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Tickets Purchased</p>
                <p className="text-lg font-bold">
                  {users.reduce((sum, u) => sum + u._count.tickets, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
                <p className="text-lg font-bold text-gold">
                  PKR{' '}
                  {users
                    .reduce((sum, u) => {
                      const userSpent = u.transactions.reduce((s, t) => s + t.amount, 0);
                      return sum + userSpent;
                    }, 0)
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
