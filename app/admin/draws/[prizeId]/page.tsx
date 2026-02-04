'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DrawExecutionPage({
  params,
}: {
  params: Promise<{ prizeId: string }>;
}) {
  const { prizeId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState<any>(null);

  const executeDraw = async () => {
    if (!confirm('Are you sure you want to execute the draw? This action cannot be undone.')) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/draw/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prizeId }),
      });

      const data = await response.json();

      if (data.success) {
        setWinner(data.data);
      } else {
        alert('Draw execution failed: ' + data.error);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (winner) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-navy-light rounded-2xl border border-gold/30 p-8 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🎉</span>
          </div>

          <h1 className="text-3xl font-bold text-gradient mb-4">
            Winner Selected!
          </h1>

          {/* Winner Details */}
          <div className="bg-navy rounded-lg p-6 mb-6 text-left">
            <h3 className="text-gold font-semibold mb-4">Winner Details:</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="font-semibold">{winner.winnerName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-semibold">{winner.winnerEmail || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ticket Number:</span>
                <span className="font-semibold text-gold">{winner.ticketNumber}</span>
              </div>
            </div>
          </div>

          {/* Draw Stats */}
          <div className="bg-navy rounded-lg p-6 mb-6 text-left">
            <h3 className="text-gold font-semibold mb-4">Draw Statistics:</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Entries:</span>
                <span className="font-semibold">{winner.totalEntries}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Unique Participants:</span>
                <span className="font-semibold">{winner.uniqueParticipants}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/admin/prizes')}
              className="btn-gold w-full"
            >
              Back to Prizes
            </button>
            <button
              onClick={() => {
                // TODO: Send winner notification
                alert('Winner notification feature coming soon!');
              }}
              className="w-full px-6 py-3 rounded-lg border border-gold/30 hover:border-gold/60 transition-colors"
            >
              Notify Winner
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-navy-light rounded-2xl border border-gold/20 p-8">
        <h1 className="text-3xl font-bold mb-6">Execute Draw</h1>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-400 text-sm">
            <strong>Warning:</strong> This action will randomly select a winner from all purchased
            tickets. This action cannot be undone.
          </p>
        </div>

        <div className="bg-navy rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">Before executing the draw:</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-gold">✓</span>
              Verify all payments have been processed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">✓</span>
              Ensure the draw date has passed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">✓</span>
              Confirm all tickets are sold (or sales are closed)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">✓</span>
              Have a plan to contact the winner
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={executeDraw}
            disabled={loading}
            className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Executing Draw...' : 'Execute Draw Now'}
          </button>
          <button
            onClick={() => router.push('/admin/prizes')}
            className="w-full px-6 py-3 rounded-lg border border-gold/30 hover:border-gold/60 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
