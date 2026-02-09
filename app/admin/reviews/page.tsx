'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Review {
  id: string;
  name: string;
  email: string;
  city: string | null;
  rating: number;
  comment: string;
  prizeName: string | null;
  status: string;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const url = filter === 'ALL'
        ? '/api/admin/reviews'
        : `/api/admin/reviews?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
    setLoading(false);
  };

  const updateStatus = async (reviewId: string, status: string) => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, status }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) =>
          prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
        );
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${reviewId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-900/30 text-green-400 border-green-500/30';
      case 'PENDING': return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30';
      case 'REJECTED': return 'bg-red-900/30 text-red-400 border-red-500/30';
      default: return 'bg-gray-900/30 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-navy p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <Link href="/admin" className="text-gold text-sm hover:underline mb-2 inline-block">&larr; Back to Admin</Link>
            <h1 className="text-3xl font-bold text-white">Review Management</h1>
            <p className="text-gray-400 mt-1">Approve, reject, or delete user reviews</p>
          </div>
          <div className="flex gap-2 text-sm">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  filter === f
                    ? 'bg-gold/20 border-gold text-gold'
                    : 'border-gray-700 text-gray-400 hover:border-gold/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No reviews found</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-navy-light/50 border border-gold/10 rounded-xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    {/* Header row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-navy font-bold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{review.name}</p>
                        <p className="text-gray-500 text-xs">{review.email} {review.city && `- ${review.city}`}</p>
                      </div>
                      <span className={`ml-auto px-2 py-0.5 text-xs rounded border ${statusColor(review.status)}`}>
                        {review.status}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-gold' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-gray-300 text-sm mb-2">"{review.comment}"</p>
                    {review.prizeName && (
                      <span className="text-gold text-xs">Prize: {review.prizeName}</span>
                    )}
                    <p className="text-gray-600 text-xs mt-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 sm:ml-4">
                    {review.status !== 'APPROVED' && (
                      <button
                        onClick={() => updateStatus(review.id, 'APPROVED')}
                        className="px-3 py-1.5 bg-green-900/30 text-green-400 border border-green-500/30 rounded-lg text-xs hover:bg-green-900/50 transition-all"
                      >
                        Approve
                      </button>
                    )}
                    {review.status !== 'REJECTED' && (
                      <button
                        onClick={() => updateStatus(review.id, 'REJECTED')}
                        className="px-3 py-1.5 bg-yellow-900/30 text-yellow-400 border border-yellow-500/30 rounded-lg text-xs hover:bg-yellow-900/50 transition-all"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="px-3 py-1.5 bg-red-900/30 text-red-400 border border-red-500/30 rounded-lg text-xs hover:bg-red-900/50 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
