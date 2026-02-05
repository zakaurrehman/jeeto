import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          <span className="text-gradient">Terms & Conditions</span>
        </h1>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="mb-3">
              By accessing and using Jeeto.pk, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">2. Eligibility</h2>
            <p className="mb-3">
              You must be at least 18 years of age to participate in our lucky draws. By using this service, you represent and warrant that you meet this age requirement.
            </p>
            <p className="mb-3">
              Participants must be residents of Pakistan with a valid Pakistani phone number and payment method.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">3. Ticket Purchases</h2>
            <p className="mb-3">
              All ticket purchases are final and non-refundable. Once a ticket is purchased, it cannot be canceled, exchanged, or refunded under any circumstances.
            </p>
            <p className="mb-3">
              Payment must be completed through our authorized payment gateways (JazzCash, EasyPaisa, or credit/debit cards). We do not accept cash or alternative payment methods.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">4. Draw Process</h2>
            <p className="mb-3">
              Winners are selected through a transparent, random draw process conducted on the specified draw date for each prize.
            </p>
            <p className="mb-3">
              The draw will proceed when all tickets for a prize are sold or on the scheduled draw date, whichever comes first.
            </p>
            <p className="mb-3">
              Winners will be notified via email and phone within 48 hours of the draw. Winner announcements will also be posted on our website and social media channels.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">5. Prize Claim</h2>
            <p className="mb-3">
              Winners must claim their prizes within 30 days of the draw date. Unclaimed prizes will be forfeited and may be re-drawn or donated.
            </p>
            <p className="mb-3">
              Winners must provide valid identification and complete any required documentation before receiving their prize.
            </p>
            <p className="mb-3">
              Prizes are awarded as-is and cannot be exchanged for cash or alternative items.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">6. User Conduct</h2>
            <p className="mb-3">
              Users must not engage in any fraudulent activity, including but not limited to:
            </p>
            <ul className="list-disc list-inside ml-4 mb-3 space-y-1">
              <li>Creating multiple accounts to manipulate draws</li>
              <li>Using stolen payment methods</li>
              <li>Attempting to hack or manipulate our systems</li>
              <li>Providing false information during registration</li>
            </ul>
            <p className="mb-3">
              Violation of these terms may result in immediate account suspension and legal action.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p className="mb-3">
              Jeeto.pk shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>
            <p className="mb-3">
              We are not responsible for any technical issues, payment gateway failures, or delays beyond our reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">8. Changes to Terms</h2>
            <p className="mb-3">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">9. Governing Law</h2>
            <p className="mb-3">
              These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of Pakistani courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">10. Contact Information</h2>
            <p className="mb-3">
              If you have any questions about these Terms & Conditions, please contact us through our Contact page or email us at support@jeeto.pk.
            </p>
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
