import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrizeCard from '@/components/PrizeCard';
import Testimonial from '@/components/Testimonial';
import { prizes, testimonials } from '@/lib/mockData';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
            <span className="text-gradient">Win Premium Tech & Luxury Cars</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gold mb-2">
            Tickets from PKR 50
          </p>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Trusted Pakistani Lucky Draw Platform
          </p>

          {/* Trust Badges Mobile */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-6 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Secure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Shariah Friendly</span>
            </div>
          </div>
        </section>

        {/* Prize Cards Grid */}
        <section className="container mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {prizes.map((prize) => (
              <PrizeCard key={prize.id} prize={prize} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            <span className="text-gradient">What Our Winners Say</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-8 sm:py-12 mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            <span className="text-gradient">How It Works</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-navy-light/50 border border-gold/10 hover:border-gold/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                1
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Choose Your Prize</h4>
              <p className="text-gray-400 text-sm sm:text-base">Select from our premium tech gadgets or luxury cars</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-navy-light/50 border border-gold/10 hover:border-gold/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                2
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Buy Tickets</h4>
              <p className="text-gray-400 text-sm sm:text-base">Purchase tickets securely via JazzCash, EasyPaisa, or card</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-navy-light/50 border border-gold/10 hover:border-gold/30 transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                3
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Win Big!</h4>
              <p className="text-gray-400 text-sm sm:text-base">Transparent draw process - winners announced publicly</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
