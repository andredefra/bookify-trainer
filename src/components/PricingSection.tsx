
import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const [annual, setAnnual] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const freemiumFeatures = [
    "Unlimited Sessions",
    "Google Calendar Integration",
    "Personal Trainer Page",
    "Client Messaging",
    "Stripe Integration",
    "Client Management",
  ];

  const proFeatures = [
    "Everything in Freemium",
    "Lower Transaction Fee (5%)",
    "Custom Branding",
    "Priority Support",
    "Advanced Analytics",
    "Waitlist Management",
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl md:text-4xl font-display font-bold tracking-tight text-primary mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="reveal reveal-delay-1 text-lg text-muted-foreground mb-10">
            Choose the plan that works best for your business. No hidden fees or long-term commitments.
          </p>
          
          <div className="reveal reveal-delay-2 inline-flex p-1 bg-secondary rounded-full mb-10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !annual ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                annual ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'
              }`}
            >
              Annual <span className="text-xs font-normal text-emerald-600 ml-1">Save 15%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Freemium Plan */}
          <div className="reveal flex flex-col p-8 rounded-2xl border border-border bg-white shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">Freemium</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-4xl font-display font-bold">€0</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="text-muted-foreground">
                + 7.5% transaction fee
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {freemiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/register" 
              className="w-full px-6 py-3 bg-white text-primary border border-primary/20 rounded-full text-center font-medium button-hover"
            >
              Start for Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="reveal reveal-delay-1 flex flex-col p-8 rounded-2xl border-2 border-primary bg-white shadow-xl relative">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
              RECOMMENDED
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">Pro</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-4xl font-display font-bold">
                  {annual ? '€24' : '€29'}
                </span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="text-muted-foreground">
                + 5% transaction fee
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/register?plan=pro" 
              className="w-full px-6 py-3 bg-primary text-white rounded-full text-center font-medium button-hover"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            All plans include secure payment processing via Stripe. Transaction fees are charged only on successful payments. 
            You can upgrade, downgrade, or cancel your subscription at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
