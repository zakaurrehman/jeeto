import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FAQPage() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is Jeeto Pakistan?",
          a: "Jeeto Pakistan is Pakistan's trusted lucky draw platform where you can win premium tech gadgets and luxury cars by purchasing affordable tickets. We offer transparent, Shariah-friendly draws with real prizes."
        },
        {
          q: "Is Jeeto Pakistan legal in Pakistan?",
          a: "Yes, Jeeto Pakistan operates as a legal lucky draw platform in Pakistan. Our draws are conducted transparently and follow all applicable regulations."
        },
        {
          q: "How do I participate?",
          a: "Simply create a free account, browse our active prizes, select the one you want to win, purchase tickets, and wait for the draw date. It's that simple!"
        }
      ]
    },
    {
      category: "Tickets & Payments",
      questions: [
        {
          q: "How much do tickets cost?",
          a: "Ticket prices vary by prize, starting from as low as PKR 50 for smaller items up to PKR 1,000 for luxury prizes like cars. Each prize page shows the exact ticket price."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept JazzCash, EasyPaisa, Visa, Mastercard, and Apple Pay. All payments are processed securely through encrypted gateways."
        },
        {
          q: "Can I get a refund on my tickets?",
          a: "No, all ticket purchases are final and non-refundable. Please make sure you want to participate before completing your purchase."
        },
        {
          q: "How many tickets can I buy?",
          a: "You can purchase as many tickets as you want for any prize (up to the total available). More tickets increase your chances of winning!"
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. We use industry-standard SSL encryption and PCI-DSS compliant payment processors. We never store your complete card details on our servers."
        }
      ]
    },
    {
      category: "Draws & Winners",
      questions: [
        {
          q: "How are winners selected?",
          a: "Winners are selected through a completely random, transparent draw process. Each ticket has an equal chance of winning. The draw is conducted using a verified random number generator."
        },
        {
          q: "When is the draw conducted?",
          a: "Each prize has a specific draw date shown on its page. The draw happens either on that date or when all tickets are sold, whichever comes first."
        },
        {
          q: "How will I know if I won?",
          a: "Winners are notified via email and SMS within 48 hours of the draw. We also announce winners publicly on our website and social media channels."
        },
        {
          q: "What if I don't claim my prize?",
          a: "Winners must claim their prizes within 30 days of the draw. Unclaimed prizes will be forfeited and may be re-drawn or donated to charity."
        },
        {
          q: "Can I see previous winners?",
          a: "Yes! We maintain transparency by publishing winner information on our website. You can see the name and city of each winner along with their winning ticket number."
        }
      ]
    },
    {
      category: "Prizes",
      questions: [
        {
          q: "What prizes can I win?",
          a: "We offer a range of prizes including the latest iPhones, iPads, Apple Watches, and luxury cars like Mercedes C-Class. New prizes are added regularly."
        },
        {
          q: "Are the prizes genuine?",
          a: "Yes, all prizes are 100% genuine and brand new. We provide official warranty and documentation for all tech products and proper registration for vehicles."
        },
        {
          q: "Can I choose a different prize if I win?",
          a: "No, prizes cannot be exchanged for cash or alternative items. You win the specific prize you purchased tickets for."
        },
        {
          q: "How is the prize delivered?",
          a: "Winners can collect their prizes from our office or we can arrange secure delivery within Pakistan. For cars, we handle all registration and transfer formalities."
        }
      ]
    },
    {
      category: "Account & Security",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click 'Sign In' in the top menu and follow the registration process. You'll need a valid email address and phone number."
        },
        {
          q: "I forgot my password. What should I do?",
          a: "Click 'Sign In', then 'Forgot Password'. Enter your email and we'll send you a password reset link."
        },
        {
          q: "Can I have multiple accounts?",
          a: "No, each person is allowed only one account. Creating multiple accounts to manipulate draws is strictly prohibited and will result in account suspension."
        },
        {
          q: "How do I check my ticket history?",
          a: "Log in to your account and visit the Dashboard. You'll see all your purchased tickets, their status, and upcoming draws."
        }
      ]
    },
    {
      category: "Support",
      questions: [
        {
          q: "How can I contact customer support?",
          a: "You can reach us through our Contact page, email us at support@jeetopakistan.com, or call our customer service hotline during business hours."
        },
        {
          q: "What are your business hours?",
          a: "Our customer support team is available Monday to Saturday, 9 AM to 6 PM PKT. We respond to all emails within 24 hours."
        },
        {
          q: "I have a complaint. How do I report it?",
          a: "We take all complaints seriously. Please contact us through the Contact page or email complaints@jeetopakistan.com with detailed information."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
          <span className="text-gradient">Frequently Asked Questions</span>
        </h1>
        <p className="text-gray-400 text-center mb-8 sm:mb-12">
          Find answers to common questions about Jeeto Pakistan
        </p>

        <div className="space-y-8">
          {faqs.map((category, idx) => (
            <section key={idx}>
              <h2 className="text-2xl font-bold text-gold mb-4">{category.category}</h2>
              <div className="space-y-6">
                {category.questions.map((faq, qIdx) => (
                  <div key={qIdx} className="bg-navy-light/50 border border-gold/10 rounded-lg p-4 sm:p-6 hover:border-gold/30 transition-all">
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-br from-gold/10 to-pakistan-green/10 border border-gold/20 rounded-lg text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-300 mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-gold to-pakistan-green text-navy font-semibold px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all"
          >
            Contact Support
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
