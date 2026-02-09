export default function Footer() {
  const paymentMethods = [
    { name: 'EasyPaisa', logo: '🟢' },
    { name: 'JazzCash', logo: '🎵' },
    { name: 'Visa', logo: '💳' },
    { name: 'Mastercard', logo: '💳' },
    { name: 'Apple Pay', logo: '🍎' },
  ];

  return (
    <>
      {/* Trust Badges Section */}
      <section className="border-y border-gold/20 bg-navy-light/30 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 font-medium">SSL Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 font-medium">100% Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 font-medium">Shariah Friendly</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gold/20 bg-navy-dark mt-0">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <img src="/images/jeetopakistan.jpeg" alt="Jeeto Pakistan" className="h-10 rounded mb-3" />
            <p className="text-sm text-gray-400">
              Pakistan's trusted lucky draw platform. Win premium tech gadgets and luxury cars with transparent draws.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-gold transition-colors">
                  My Dashboard
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-gold transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-gold transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/terms" className="text-gray-400 hover:text-gold transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-gold transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@jeetopakistan.com</li>
              <li>Phone: +92 300 1234567</li>
              <li>Hours: Mon-Sat, 9 AM - 6 PM</li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-6 pb-6 border-b border-gold/20">
          <h3 className="text-center text-sm text-gray-400 mb-4">Secure Payment Methods</h3>
          <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-navy-light px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <span className="text-xl sm:text-2xl">{method.logo}</span>
                <span className="ml-2 text-xs sm:text-sm text-gray-300">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2026 Jeeto Pakistan. All rights reserved.</p>
          <p className="mt-2">Trusted Pakistani Lucky Draw Platform</p>
        </div>
      </div>
    </footer>
    </>
  );
}
