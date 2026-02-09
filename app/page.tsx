import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrizeCard from '@/components/PrizeCard';
import ReviewCard from '@/components/ReviewCard';
import { prisma } from '@/lib/prisma';
import { Prize } from '@/types';

async function getPrizes() {
  const prizes = await prisma.prize.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { tickets: true },
      },
    },
  });

  // Map to match Prize type and include buyersCount
  return prizes.map((prize) => ({
    id: prize.id,
    name: prize.name,
    description: prize.description,
    imageUrl: prize.imageUrl,
    marketValue: prize.marketValue,
    ticketPrice: prize.ticketPrice,
    totalTickets: prize.totalTickets,
    soldTickets: prize.soldTickets,
    buyersCount: prize._count.tickets,
    drawDate: prize.drawDate.toISOString(),
    status: prize.status.toLowerCase() as 'active' | 'closed' | 'drawn',
    category: prize.category as 'tech' | 'car' | 'luxury',
  }));
}

interface ReviewData {
  id: string;
  name: string;
  city: string | null;
  rating: number;
  comment: string;
  prizeName: string | null;
  createdAt: string;
}

async function getReviews(): Promise<ReviewData[]> {
  try {
    const reviews = await (prisma as any).review.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: {
        id: true,
        name: true,
        city: true,
        rating: true,
        comment: true,
        prizeName: true,
        createdAt: true,
      },
    });
    return reviews.map((r: any) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  let prizes: Prize[] = [];
  let reviews: ReviewData[] = [];
  try {
    prizes = await getPrizes();
  } catch (error) {
    console.error('Error fetching prizes:', error);
  }
  reviews = await getReviews();

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight">
            <span className="shimmer">Win Premium Tech & Luxury Cars</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gold mb-2">
            Tickets from PKR 50
          </p>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6">
            Pakistan's Trusted Lucky Draw Platform
          </p>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4 text-xs sm:text-sm flex-wrap">
            <div className="flex items-center gap-1.5 bg-navy-light/50 border border-gold/10 rounded-full px-3 py-1.5">
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">SSL Secure</span>
            </div>
            <div className="flex items-center gap-1.5 bg-navy-light/50 border border-gold/10 rounded-full px-3 py-1.5">
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">100% Transparent</span>
            </div>
            <div className="flex items-center gap-1.5 bg-navy-light/50 border border-gold/10 rounded-full px-3 py-1.5">
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">100% Fair Draws</span>
            </div>
          </div>

          {/* Instant Checkout Text */}
          <p className="text-gray-500 text-xs mt-4">
            Instant checkout with EasyPaisa, JazzCash & Credit/Debit Cards
          </p>
        </section>

        {/* Trusted By Stats */}
        <section className="container mx-auto px-4 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Trusted by <span className="text-gold">10,000+</span> Pakistanis
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Instant, easy payments with top Pakistani methods. 100% verified and transparent draws.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-4 glow-hover">
                <div className="text-3xl mb-2">🏆</div>
                <p className="text-white font-bold text-sm">Select a Prize</p>
                <p className="text-gray-500 text-xs mt-1">Choose from premium tech and luxury cars</p>
              </div>
              <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-4 glow-hover">
                <div className="text-3xl mb-2">🎫</div>
                <p className="text-white font-bold text-sm">Buy Ticket(s)</p>
                <p className="text-gray-500 text-xs mt-1">Purchase tickets instantly starting from PKR 50</p>
              </div>
              <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-4 glow-hover">
                <div className="text-3xl mb-2">⏱️</div>
                <p className="text-white font-bold text-sm">Track Draw Timer</p>
                <p className="text-gray-500 text-xs mt-1">Watch the live draw timer count down to zero</p>
              </div>
              <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-4 glow-hover">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-white font-bold text-sm">See Winners Live</p>
                <p className="text-gray-500 text-xs mt-1">Winners are announced and prizes delivered fast</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prize Cards Grid */}
        <section className="container mx-auto px-4 py-6 sm:py-8">
          {prizes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {prizes.map((prize) => (
                <PrizeCard key={prize.id} prize={prize} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No active prizes at the moment</p>
              <p className="text-gray-500 text-sm">Check back soon for exciting prizes!</p>
            </div>
          )}
        </section>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="container mx-auto px-4 py-8 sm:py-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">
              <span className="text-gradient">What Our Winners Say</span>
            </h3>
            <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm">Verified reviews from real participants</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        )}

        {/* How It Works */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            <span className="text-gradient">How It Works</span>
          </h3>
          <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm">
            Instant, easy payments with top Pakistani methods. 100% verified and transparent draws.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-navy-light/50 border border-gold/10 hover:border-gold/30 transition-all glow-hover">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                1
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Choose Your Prize</h4>
              <p className="text-gray-400 text-sm sm:text-base">Select from our premium tech gadgets, bikes, or luxury cars</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-navy-light/50 border border-gold/10 hover:border-gold/30 transition-all glow-hover">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                2
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Buy Tickets</h4>
              <p className="text-gray-400 text-sm sm:text-base">Purchase tickets securely via JazzCash, EasyPaisa, or card</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-navy-light/50 border border-gold/10 hover:border-gold/30 transition-all glow-hover">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-pakistan-green rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-3 sm:mb-4 shadow-lg">
                3
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Win Big!</h4>
              <p className="text-gray-400 text-sm sm:text-base">Transparent draw process - winners announced publicly</p>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap opacity-70">
            <span className="text-gray-500 text-xs">Payment methods for Pakistan:</span>
            <span className="text-white font-semibold text-sm">JazzCash</span>
            <span className="text-white font-semibold text-sm">EasyPaisa</span>
            <span className="text-white font-semibold text-sm">VISA</span>
            <span className="text-white font-semibold text-sm">Mastercard</span>
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-3 flex-wrap text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-pakistan-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Payment methods for Pakistan
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-pakistan-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              SSL encryption for security
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-pakistan-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Fully audited and fair draws
            </span>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="container mx-auto px-4 py-8 sm:py-12 mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            <span className="text-gradient">Why Trust Jeeto Pakistan?</span>
          </h3>
          <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm">
            Built for Pakistan. Designed for trust and transparency.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all glow-hover">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-white font-semibold mb-1">Secure & Safe</h4>
              <p className="text-gray-400 text-sm">256-bit SSL encryption protects all your data and transactions.</p>
            </div>
            <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all glow-hover">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h4 className="text-white font-semibold mb-1">Complete Transparency</h4>
              <p className="text-gray-400 text-sm">Every draw is verifiable. Winners are publicly announced and verified.</p>
            </div>
            <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all glow-hover">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h4 className="text-white font-semibold mb-1">Instant Payouts</h4>
              <p className="text-gray-400 text-sm">Winners receive prizes within days. Fast, guaranteed delivery across Pakistan.</p>
            </div>
            <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all glow-hover">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h4 className="text-white font-semibold mb-1">Premium Prizes</h4>
              <p className="text-gray-400 text-sm">Only genuine, brand-new items. Apple devices, cars, gold, and more.</p>
            </div>
            <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all glow-hover">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h4 className="text-white font-semibold mb-1">Community First</h4>
              <p className="text-gray-400 text-sm">Built by Pakistanis, for Pakistanis. Real support team available 6 days a week.</p>
            </div>
            <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-5 hover:border-gold/30 transition-all glow-hover">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-white font-semibold mb-1">Mobile Friendly</h4>
              <p className="text-gray-400 text-sm">Optimized for all devices. Buy tickets and track draws from your phone.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
