
import { useEffect, useRef } from 'react';
import { Calendar, CreditCard, Users, Clock, ListChecks, MessageSquare, Globe } from 'lucide-react';

const Features = () => {
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

  const features = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "AI Scheduling",
      description: "Intelligent scheduling system that optimizes your calendar and maximizes session availability."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Stripe Integration",
      description: "Get paid automatically with pre-authorizations and post-session charging."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Private & Group Sessions",
      description: "Manage individual clients or create group sessions with waitlists and maximums."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Google Calendar Sync",
      description: "Two-way calendar synchronization ensures your schedule is always up to date."
    },
    {
      icon: <ListChecks className="h-6 w-6 text-primary" />,
      title: "Waitlist System",
      description: "Automatically fill cancellations and manage client requests for popular sessions."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Integrated Messaging",
      description: "Built-in messaging system allows for direct communication between trainers and clients."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Personal Trainer Page",
      description: "Custom URL and profile to showcase your services and availability to potential clients."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl md:text-4xl font-display font-bold tracking-tight text-primary mb-6">
            Everything You Need to Run Your Training Business
          </h2>
          <p className="reveal reveal-delay-1 text-lg text-muted-foreground">
            Powerful tools that work together to streamline your workflow and enhance your client experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`reveal reveal-delay-${index % 3} p-6 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 max-w-3xl mx-auto text-center">
          <h3 className="reveal text-2xl md:text-3xl font-display font-bold tracking-tight text-primary mb-6">
            Showcase your brand with your personal trainer page
          </h3>
          <p className="reveal reveal-delay-1 text-lg text-muted-foreground mb-8">
            Share your unique URL (personal.ai/trainername) with potential clients to showcase your services, availability, and client reviews.
          </p>
          
          <div className="reveal reveal-delay-2 p-4 bg-secondary/50 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center space-x-2 p-2 mb-2 rounded bg-white/70 border-b border-black/5">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto pr-8 text-xs text-muted-foreground">
                personal.ai/johndoe
              </div>
            </div>
            <div className="h-[300px] bg-[url('/placeholder.svg')] bg-center bg-cover rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
