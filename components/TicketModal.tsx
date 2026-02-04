'use client';

import { useState } from 'react';
import { Prize, PaymentMethod } from '@/types';

interface TicketModalProps {
  prize: Prize;
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketModal({ prize, isOpen, onClose }: TicketModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('jazzcash');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const totalPrice = quantity * prize.ticketPrice;

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prizeId: prize.id,
          quantity,
          paymentMethod,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Ticket purchase initiated! Please complete payment.');
        onClose();
      } else {
        alert('Purchase failed: ' + data.error);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-navy-light rounded-2xl border border-gold/30 max-w-md w-full p-6 shadow-gold">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gradient">{prize.name}</h3>
            <p className="text-gray-400 text-sm">Market Value: PKR {prize.marketValue.toLocaleString()}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Number of Tickets</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-navy rounded-lg border border-gold/30 hover:bg-gold hover:text-navy transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center bg-navy border border-gold/30 rounded-lg px-3 py-2"
              min="1"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-navy rounded-lg border border-gold/30 hover:bg-gold hover:text-navy transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-navy rounded-lg p-4 mb-6 border border-gold/20">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Ticket Price:</span>
            <span>PKR {prize.ticketPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Quantity:</span>
            <span>{quantity}</span>
          </div>
          <div className="border-t border-gold/20 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gold">Total:</span>
              <span className="text-gold">PKR {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            {['jazzcash', 'easypaisa', 'visa', 'mastercard'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method as PaymentMethod)}
                className={`p-3 rounded-lg border transition-all ${
                  paymentMethod === method
                    ? 'border-gold bg-gold/10'
                    : 'border-gold/20 hover:border-gold/40'
                }`}
              >
                <span className="capitalize text-sm">{method}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : `Purchase ${quantity} Ticket${quantity > 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}
