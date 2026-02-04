import { auth } from '@clerk/nextjs/server';

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  // Get admin user IDs from environment variable
  const adminIds = process.env.ADMIN_CLERK_USER_IDS?.split(',').map(id => id.trim()) || [];

  return adminIds.includes(userId);
}

/**
 * Require admin authentication
 * Throws error if user is not admin
 */
export async function requireAdmin() {
  const admin = await isAdmin();

  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
}
