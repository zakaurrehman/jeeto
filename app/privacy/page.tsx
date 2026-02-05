import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          <span className="text-gradient">Privacy Policy</span>
        </h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc list-inside ml-4 mb-3 space-y-1">
              <li>Create an account on Jeeto.pk</li>
              <li>Purchase tickets for lucky draws</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p className="mb-3">
              This information may include your name, email address, phone number, payment information, and transaction history.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside ml-4 mb-3 space-y-1">
              <li>Process your ticket purchases and payments</li>
              <li>Conduct lucky draws and notify winners</li>
              <li>Send you important updates about your account and transactions</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations and prevent fraud</li>
              <li>Send promotional emails (only with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">3. Payment Information</h2>
            <p className="mb-3">
              We partner with trusted payment gateways (JazzCash, EasyPaisa, and card processors) to handle your payment information securely.
            </p>
            <p className="mb-3">
              We do not store your complete credit card numbers or payment credentials on our servers. All payment data is encrypted and processed through PCI-DSS compliant payment processors.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">4. Information Sharing</h2>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside ml-4 mb-3 space-y-1">
              <li>With payment processors to complete transactions</li>
              <li>With email service providers to send notifications</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, safety, or property</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">5. Data Security</h2>
            <p className="mb-3">
              We implement industry-standard security measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside ml-4 mb-3 space-y-1">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure database storage with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="mb-3">
              However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">6. Cookies and Tracking</h2>
            <p className="mb-3">
              We use cookies and similar tracking technologies to enhance your experience on our website. Cookies help us:
            </p>
            <ul className="list-disc list-inside ml-4 mb-3 space-y-1">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve our services</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="mb-3">
              You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p className="mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside ml-4 mb-3 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your data</li>
            </ul>
            <p className="mb-3">
              To exercise these rights, please contact us at privacy@jeeto.pk.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">8. Winner Privacy</h2>
            <p className="mb-3">
              When you win a prize, we may publicly announce your name and city on our website and social media channels for transparency purposes.
            </p>
            <p className="mb-3">
              We will not share your full address, phone number, or other sensitive personal details publicly without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">9. Children's Privacy</h2>
            <p className="mb-3">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">10. Changes to Privacy Policy</h2>
            <p className="mb-3">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a notice on our website. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">11. Contact Us</h2>
            <p className="mb-3">
              If you have any questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none ml-4 mb-3 space-y-1">
              <li>Email: privacy@jeeto.pk</li>
              <li>Support: support@jeeto.pk</li>
            </ul>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Last Updated: February 5, 2026
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
