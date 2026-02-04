import { Suspense } from 'react';
import Link from 'next/link';

function SuccessContent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-navy-light rounded-2xl border border-gold/30 p-8 text-center shadow-gold">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gradient mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-300 mb-8">
          Your ticket purchase was successful. Good luck in the draw!
        </p>

        {/* Ticket Details */}
        <div className="bg-navy rounded-lg p-6 mb-8 border border-gold/20">
          <p className="text-sm text-gray-400 mb-2">Your tickets are confirmed</p>
          <p className="text-gold text-sm">
            Check your email for ticket details and draw information.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/dashboard" className="btn-gold w-full block text-center">
            View My Tickets
          </Link>
          <Link
            href="/"
            className="block w-full px-6 py-3 rounded-lg border border-gold/30 hover:border-gold/60 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
