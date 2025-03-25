
import { useEffect } from 'react';
import { ArrowRight, Calendar, Share, CreditCard } from 'lucide-react';

const HowItWorks = () => {
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

  const steps = [
    {
      number: "01",
      title: "Create your profile and sync your Google Calendar",
      description: "Set up your profile with your services, pricing, and availability. Connect your Google Calendar to sync your existing schedule.",
      icon: Calendar
    },
    {
      number: "02",
      title: "Share your personal page and set session rules",
      description: "Share your custom URL with clients. Set up your working hours, session types, and booking rules.",
      icon: Share
    },
    {
      number: "03",
      title: "Get booked and paid automatically via Stripe",
      description: "Clients book available slots and pre-authorize payment. Get paid automatically after sessions are completed.",
      icon: CreditCard
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl md:text-4xl font-display font-bold tracking-tight text-primary mb-6">
            How It Works
          </h2>
          <p className="reveal reveal-delay-1 text-lg text-muted-foreground">
            Getting started is simple. Follow these steps to streamline your training business.
          </p>
        </div>

        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={`reveal reveal-delay-${index} relative`}
              >
                <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="h-48 flex items-center justify-center bg-primary/5">
                    <Icon className="w-24 h-24 text-primary/60" />
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-5xl font-display font-bold text-primary/10">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-16 transform -translate-x-8">
                      <ArrowRight className="w-6 h-6 text-primary/20" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <div className="reveal bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h3 className="text-2xl font-display font-bold mb-4">Ready to transform your training business?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of personal trainers who have simplified their scheduling and increased their revenue.
                </p>
                <button className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-full text-base font-medium button-hover">
                  Get Started for Free
                </button>
              </div>
              <div className="h-64 md:h-auto bg-cover bg-center" 
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop')",
                  backgroundPosition: "center 30%"
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
