export default function Footer() {
  const paymentMethods = [
    { name: 'EasyPaisa', logo: '🟢' },
    { name: 'JazzCash', logo: '🎵' },
    { name: 'Visa', logo: '💳' },
    { name: 'Mastercard', logo: '💳' },
    { name: 'Apple Pay', logo: '🍎' },
  ];

  return (
    <footer className="border-t border-gold/20 bg-navy-dark mt-16">
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
  );
}
