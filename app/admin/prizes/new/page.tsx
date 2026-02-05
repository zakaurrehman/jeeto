'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPrizePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    marketValue: '',
    ticketPrice: '',
    totalTickets: '',
    drawDate: '',
    category: 'tech',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/prizes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          imageUrl: formData.imageUrl,
          marketValue: parseInt(formData.marketValue),
          ticketPrice: parseInt(formData.ticketPrice),
          totalTickets: parseInt(formData.totalTickets),
          drawDate: new Date(formData.drawDate).toISOString(),
          category: formData.category,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create prize');
      }

      router.push('/admin/prizes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create prize');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Add New Prize</h1>
        <Link href="/admin/prizes" className="text-gray-400 hover:text-white">
          ← Back to Prizes
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-navy-light rounded-xl border border-gold/20 p-8 max-w-3xl">
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Prize Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-navy border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
              placeholder="e.g., iPhone 17 Pro Max"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-navy border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
              placeholder="Brief description of the prize"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
              Image URL *
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              required
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full bg-navy border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
              placeholder="/images/prize.png"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload image to /public/images/ folder first, then enter the path
            </p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-navy border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
            >
              <option value="tech">Tech</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="cash">Cash</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Market Value */}
            <div>
              <label htmlFor="marketValue" className="block text-sm font-medium mb-2">
                Market Value (PKR) *
              </label>
              <input
                type="number"
                id="marketValue"
                name="marketValue"
                required
                min="1"
                value={formData.marketValue}
                onChange={handleChange}
                className="w-full bg-navy border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                placeholder="420000"
              />
            </div>

            {/* Ticket Price */}
            <div>
              <label htmlFor="ticketPrice" className="block text-sm font-medium mb-2">
                Ticket Price (PKR) *
              </label>
              <input
                type="number"
                id="ticketPrice"
                name="ticketPrice"
                required
                min="1"
                value={formData.ticketPrice}
                onChange={handleChange}
                className="w-full bg-navy border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                placeholder="100"
              />
            </div>

            {/* Total Tickets */}
            <div>
              <label htmlFor="totalTickets" className="block text-sm font-medium mb-2">
                Total Tickets *
              </label>
              <input
                type="number"
                id="totalTickets"
                name="totalTickets"
                required
                min="1"
                value={formData.totalTickets}
                onChange={handleChange}
                className="w-full bg-navy border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                placeholder="4200"
              />
            </div>

            {/* Draw Date */}
            <div>
              <label htmlFor="drawDate" className="block text-sm font-medium mb-2">
                Draw Date *
              </label>
              <input
                type="date"
                id="drawDate"
                name="drawDate"
                required
                value={formData.drawDate}
                onChange={handleChange}
                className="w-full bg-navy border border-gold/20 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Prize'}
            </button>
            <Link
              href="/admin/prizes"
              className="flex-1 text-center px-6 py-3 rounded-lg border border-gold/20 hover:border-gold/40 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
