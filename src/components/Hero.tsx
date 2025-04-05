
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { CalendarCheck, CreditCard, MessageSquare, Bot } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const isMobile = useIsMobile();
  const elementRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    console.log("Attempting to load dashboard image");
  }, []);
  
  return <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden" 
    style={{
      backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 md:space-y-10">
          <h1 className="reveal text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-primary mx-auto max-w-4xl md:leading-tight text-balance">{t('hero.title')}</h1>
          
          <p className="reveal reveal-delay-1 mx-auto max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed text-balance">
            {t('hero.subtitle')}
          </p>
          
          <div className="reveal reveal-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link to="/register" className="w-full sm:w-auto px-6 py-3 md:py-4 bg-primary text-white rounded-full text-base md:text-lg font-medium button-hover">
              {t('hero.cta')}
            </Link>
          </div>
        </div>

        <div ref={elementRef} className="reveal reveal-delay-3 mt-12 md:mt-24 mb-8 md:mb-16 max-w-5xl mx-auto rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl glass overflow-hidden">
          <div className="relative">
            <div className="p-1 md:p-2 bg-secondary rounded-t-xl md:rounded-t-2xl border-b border-black/5">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            <div className="bg-white">
              {isMobile ? (
                <div className="flex items-center justify-center" style={{ margin: 0, padding: 0 }}>
                  <img 
                    src="/lovable-uploads/5be2c47e-b243-42fd-8993-9e3e1fe5da3e.png" 
                    alt="Sales dashboard analytics" 
                    className="w-full h-auto"
                    style={{ display: 'block', maxHeight: '280px' }}
                    onError={(e) => {
                      console.error("Image failed to load, using fallback");
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600";
                    }}
                  />
                </div>
              ) : (
                <img 
                  src="/lovable-uploads/5be2c47e-b243-42fd-8993-9e3e1fe5da3e.png" 
                  alt="Sales dashboard analytics" 
                  className="w-full h-[500px] object-contain object-center"
                  onError={(e) => {
                    console.error("Image failed to load, using fallback");
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600";
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mt-12 md:mt-16">
          <div className="reveal flex flex-col items-center text-center p-4 md:p-6 rounded-lg md:rounded-xl glass">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary/10 mb-3 md:mb-4">
              <CalendarCheck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">{t('features.smartScheduling')}</h3>
            <p className="text-sm md:text-base text-muted-foreground">{t('features.smartSchedulingDesc')}</p>
          </div>
          
          <div className="reveal reveal-delay-1 flex flex-col items-center text-center p-4 md:p-6 rounded-lg md:rounded-xl glass">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary/10 mb-3 md:mb-4">
              <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">{t('features.automatedPayments')}</h3>
            <p className="text-sm md:text-base text-muted-foreground">{t('features.automatedPaymentsDesc')}</p>
          </div>
          
          <div className="reveal reveal-delay-2 flex flex-col items-center text-center p-4 md:p-6 rounded-lg md:rounded-xl glass">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary/10 mb-3 md:mb-4">
              <Bot className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">{t('features.aiAssistant')}</h3>
            <p className="text-sm md:text-base text-muted-foreground">{t('features.aiAssistantDesc')}</p>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
