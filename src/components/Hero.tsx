
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { CalendarCheck, CreditCard, MessageSquare, Bot } from 'lucide-react';

const Hero = () => {
  const isMobile = useIsMobile();
  const elementRef = useRef<HTMLDivElement>(null);

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

  return (
    <section 
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(245, 245, 247, 0.5) 0%, rgba(250, 250, 252, 0.2) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-8 md:space-y-10">
          <h1 className="reveal text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-primary mx-auto max-w-4xl md:leading-tight text-balance">
            The All-in-One Scheduling and Payment Platform for Personal Trainers
          </h1>
          
          <p className="reveal reveal-delay-1 mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            Simplify your calendar, fill your sessions, and get paid automatically — with AI support for client management and scheduling.
          </p>
          
          <div className="reveal reveal-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3 md:py-4 bg-primary text-white rounded-full text-base md:text-lg font-medium button-hover"
            >
              Try the Demo
            </Link>
            <Link
              to="/find-trainer"
              className="w-full sm:w-auto px-8 py-3 md:py-4 bg-white text-primary rounded-full text-base md:text-lg font-medium border border-primary/10 button-hover"
            >
              Looking for a trainer?
            </Link>
          </div>
        </div>

        {/* Dashboard preview */}
        <div 
          ref={elementRef}
          className="reveal reveal-delay-3 mt-16 md:mt-24 mb-10 md:mb-16 max-w-5xl mx-auto rounded-2xl shadow-2xl glass overflow-hidden"
        >
          <div className="relative">
            <div className="p-2 bg-secondary rounded-t-2xl border-b border-black/5">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="bg-white">
              <div className="h-[400px] md:h-[500px] bg-[url('/dashboard-preview.png')] bg-center bg-cover"></div>
            </div>
          </div>
        </div>

        {/* Feature overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          <div className="reveal flex flex-col items-center text-center p-6 rounded-xl glass">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <CalendarCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-muted-foreground">Sync with Google Calendar and let clients book directly based on your availability.</p>
          </div>
          
          <div className="reveal reveal-delay-1 flex flex-col items-center text-center p-6 rounded-xl glass">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Automated Payments</h3>
            <p className="text-muted-foreground">Connect your Stripe account and get paid automatically when sessions are completed.</p>
          </div>
          
          <div className="reveal reveal-delay-2 flex flex-col items-center text-center p-6 rounded-xl glass">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
            <p className="text-muted-foreground">Let AI handle client inquiries when you're unavailable or in a training session.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
