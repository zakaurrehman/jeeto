'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Prize } from '@/types';
import TicketModal from './TicketModal';

interface PrizeCardProps {
  prize: Prize;
}

export default function PrizeCard({ prize }: PrizeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-PK');
  };

  const ticketPercentage = (prize.soldTickets / prize.totalTickets) * 100;

  return (
    <div className="card-premium glow-hover p-6 flex flex-col items-center text-center group hover:border-gold/40">
      {/* Product Image */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={prize.imageUrl}
          alt={prize.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-xl font-bold mb-2">{prize.name}</h3>

      {/* Market Value */}
      <p className="text-sm text-gray-400 mb-1">
        Market: <span className="text-white font-semibold">PKR {formatPrice(prize.marketValue)}</span>
      </p>

      {/* Ticket Price - Highlighted */}
      <div className="bg-pakistan-green/30 border border-pakistan-green rounded-lg px-4 py-2 mb-3">
        <p className="text-gold font-bold text-lg">
          TICKET: PKR {formatPrice(prize.ticketPrice)}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>{prize.soldTickets} sold</span>
          <span>{prize.totalTickets} total</span>
        </div>
        <div className="w-full bg-navy-dark rounded-full h-2">
          <div
            className="bg-gradient-to-r from-pakistan-green to-gold h-2 rounded-full transition-all duration-500"
            style={{ width: `${ticketPercentage}%` }}
          />
        </div>
      </div>

      {/* Buyers Count */}
      <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        <span>{formatPrice(prize.buyersCount)} Buyers</span>
      </div>

      {/* Buy Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-gold pulse-glow w-full"
      >
        Buy Ticket
      </button>

      {/* Ticket Modal */}
      <TicketModal
        prize={prize}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
