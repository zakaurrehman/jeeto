interface ReviewCardProps {
  review: {
    id: string;
    name: string;
    city?: string | null;
    rating: number;
    comment: string;
    prizeName?: string | null;
    createdAt: string;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-5 sm:p-6 hover:border-gold/30 transition-all">
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= review.rating ? 'text-gold' : 'text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.comment}"</p>

      {/* Prize badge */}
      {review.prizeName && (
        <div className="inline-block bg-gold/10 border border-gold/20 rounded-full px-3 py-1 mb-3">
          <span className="text-gold text-xs font-medium">Won: {review.prizeName}</span>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-9 h-9 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-navy font-bold text-sm">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{review.name}</p>
          {review.city && (
            <p className="text-gray-500 text-xs">{review.city}</p>
          )}
        </div>
        <div className="ml-auto">
          <span className="text-pakistan-green text-xs font-medium flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        </div>
      </div>
    </div>
  );
}
