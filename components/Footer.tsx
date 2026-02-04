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
      <div className="container mx-auto px-4 py-8">
        {/* Payment Methods */}
        <div className="mb-6">
          <h3 className="text-center text-sm text-gray-400 mb-4">Secure Payment Methods</h3>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-navy-light px-6 py-3 rounded-lg border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <span className="text-2xl">{method.logo}</span>
                <span className="ml-2 text-sm text-gray-300">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2026 Jeeto.pk. All rights reserved.</p>
          <p className="mt-2">Trusted Pakistani Lucky Draw Platform</p>
        </div>
      </div>
    </footer>
  );
}
