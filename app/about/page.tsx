import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
          <span className="text-gradient">Built for Pakistan. Designed for Trust.</span>
        </h1>
        <p className="text-gray-300 text-center text-lg mb-10 max-w-2xl mx-auto">
          Jeeto Pakistan is a premium, Pakistan-first digital lucky draw platform created to bring transparency, fairness, and excitement to online prize draws.
        </p>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          We believe winning should be simple, secure, and verifiable — not confusing or risky.
        </p>

        {/* Transparency Section */}
        <section className="mb-12">
          <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-gold text-3xl">🔒</span>
              Our Commitment to Transparency
            </h2>
            <p className="text-gray-300 mb-5">
              Every draw on Jeeto Pakistan is conducted using verified, auditable selection logic.
              From ticket purchase to winner announcement, each step is designed to be:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Transparent', 'Fair', 'Traceable', 'Secure'].map((item) => (
                <div key={item} className="bg-navy/50 border border-gold/20 rounded-lg p-4 text-center hover:border-gold/40 transition-all">
                  <span className="text-gold text-lg">✔</span>
                  <p className="text-white font-semibold mt-1">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 mt-5 text-sm">
              We never select winners manually, and we never alter results.
            </p>
          </div>
        </section>

        {/* Real Prizes Section */}
        <section className="mb-12">
          <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-gold text-3xl">🏆</span>
              Real Prizes. Real Winners.
            </h2>
            <p className="text-gray-300 mb-3">
              All prizes displayed on our platform — including Apple devices and luxury vehicles — are real, pre-verified items.
            </p>
            <p className="text-gray-300">
              Our winners are real people, and every winning ticket is recorded and publicly verified (with privacy protected).
            </p>
          </div>
        </section>

        {/* Safe Payments Section */}
        <section className="mb-12">
          <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-gold text-3xl">💳</span>
              Safe & Local Payments
            </h2>
            <p className="text-gray-300 mb-5">
              Jeeto Pakistan supports trusted local and international payment methods, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Easypaisa', 'JazzCash', 'Debit / Credit Cards'].map((method) => (
                <div key={method} className="bg-navy/50 border border-gold/20 rounded-lg px-4 py-3 text-center">
                  <p className="text-white font-medium">{method}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-400 mt-5 text-sm">
              No hidden charges. No surprise fees.
            </p>
          </div>
        </section>

        {/* Why People Trust Us */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gold/5 to-pakistan-green/5 border border-gold/20 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              ⭐ Why People Trust Jeeto Pakistan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {[
                'Pakistan-focused platform',
                'Transparent draw system',
                'Verified winners & reviews',
                'Clear rules and policies',
                'Secure payment processing',
              ].map((reason) => (
                <div key={reason} className="flex items-center gap-2">
                  <span className="text-gold">✔</span>
                  <span className="text-gray-300">{reason}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-gold/10 text-center">
              <p className="text-gray-400 italic text-sm">
                We are not a gambling website.
              </p>
              <p className="text-white font-semibold mt-1">
                We are a digital prize platform built on fairness and trust.
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="mb-12">
          <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <span className="text-gold text-3xl">🌟</span>
              Our Vision
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              To become Pakistan's most trusted digital prize platform,
              where anyone can participate confidently and win transparently.
            </p>
          </div>
        </section>

        {/* Our Promise */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-gold/10 to-pakistan-green/10 border border-gold/20 rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="text-gold text-3xl">📢</span>
              Our Promise to You
            </h2>
            <p className="text-gray-300 mb-4">We promise:</p>
            <ul className="space-y-3">
              {[
                'Honest draws',
                'Clear communication',
                'Respect for user privacy',
                'Continuous improvement',
              ].map((promise) => (
                <li key={promise} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
                  <span className="text-gray-300">{promise}</span>
                </li>
              ))}
            </ul>
            <p className="text-white font-semibold mt-6 text-center">
              Your trust matters to us — and we work every day to earn it.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
