import { Suspense } from 'react';
import Link from 'next/link';

function FailedContent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-navy-light rounded-2xl border border-red-500/30 p-8 text-center">
        {/* Failed Icon */}
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Failed Message */}
        <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h1>
        <p className="text-gray-300 mb-8">
          We couldn't process your payment. Please try again.
        </p>

        {/* Error Details */}
        <div className="bg-navy rounded-lg p-6 mb-8 border border-red-500/20">
          <p className="text-sm text-gray-400 mb-2">Common reasons:</p>
          <ul className="text-sm text-gray-300 text-left space-y-1">
            <li>• Insufficient balance</li>
            <li>• Incorrect payment details</li>
            <li>• Network timeout</li>
            <li>• Transaction cancelled</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/" className="btn-gold w-full block text-center">
            Try Again
          </Link>
          <Link
            href="/support"
            className="block w-full px-6 py-3 rounded-lg border border-gold/30 hover:border-gold/60 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
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
      <FailedContent />
    </Suspense>
  );
}
