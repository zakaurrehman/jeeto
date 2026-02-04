import { Testimonial as TestimonialType } from '@/types';

interface TestimonialProps {
  testimonial: TestimonialType;
}

export default function Testimonial({ testimonial }: TestimonialProps) {
  return (
    <div className="bg-navy-light rounded-xl p-6 border border-gold/10 hover:border-gold/30 transition-colors">
      <div className="flex items-start gap-4">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-pakistan-green flex items-center justify-center text-white font-bold flex-shrink-0">
          {testimonial.name.charAt(0)}
        </div>

        <div className="flex-1">
          {/* Stars */}
          <div className="flex gap-1 mb-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Comment */}
          <p className="text-gray-300 text-sm mb-2">{testimonial.comment}</p>

          {/* Name */}
          <p className="text-gold font-semibold">{testimonial.name}</p>
        </div>
      </div>
    </div>
  );
}
