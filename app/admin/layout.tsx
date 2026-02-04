import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await isAdmin();

  if (!admin) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Admin Header */}
      <header className="border-b border-gold/20 bg-navy-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-2xl font-bold">
                <span className="text-gradient">Admin</span>
                <span className="text-pakistan-green"> Dashboard</span>
              </Link>

              <nav className="hidden md:flex gap-6">
                <Link
                  href="/admin"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Overview
                </Link>
                <Link
                  href="/admin/prizes"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Prizes
                </Link>
                <Link
                  href="/admin/transactions"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Transactions
                </Link>
                <Link
                  href="/admin/draws"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Draws
                </Link>
                <Link
                  href="/admin/users"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  Users
                </Link>
              </nav>
            </div>

            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
