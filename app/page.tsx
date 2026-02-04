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
        <section className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Win Premium Tech & Luxury Cars</span>
          </h2>
          <p className="text-xl md:text-2xl text-gold mb-2">
            Tickets from PKR 50
          </p>
          <p className="text-gray-400 text-lg">
            Trusted Pakistani Lucky Draw Platform
          </p>
        </section>

        {/* Prize Cards Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {prizes.map((prize) => (
              <PrizeCard key={prize.id} prize={prize} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-12">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="text-gradient">What Our Winners Say</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-12">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="text-gradient">How It Works</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold mb-2">Choose Your Prize</h4>
              <p className="text-gray-400">Select from our premium tech gadgets or luxury cars</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold mb-2">Buy Tickets</h4>
              <p className="text-gray-400">Purchase tickets securely via JazzCash, EasyPaisa, or card</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">Win Big!</h4>
              <p className="text-gray-400">Transparent draw process - winners announced publicly</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
