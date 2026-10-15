import { Link } from 'react-router-dom';
import { CalendarCheck, CalendarDays, CreditCard, Bot, Table2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const oldTools = [Table2, MessageCircle, CalendarDays, CreditCard];
  const features = [
    { icon: CalendarCheck, title: 'features.smartScheduling', description: 'features.smartSchedulingDesc' },
    { icon: CreditCard, title: 'features.automatedPayments', description: 'features.automatedPaymentsDesc' },
    { icon: Bot, title: 'features.aiAssistant', description: 'features.aiAssistantDesc' },
  ];

  return (
    <section className="trainer-brand bg-brand-canvas text-brand-text pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="mx-auto max-w-2xl font-brand-mono text-xs font-bold uppercase leading-relaxed text-brand-text/60 sm:text-sm">{t('hero.positioning')}</p>
          <div className="mt-6 opacity-75">
            <div aria-hidden="true" className="flex justify-center gap-3 sm:gap-4">
              {oldTools.map((Icon, index) => (
                <div key={index} className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-brand-border bg-brand-surface sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 text-brand-text/80 sm:h-7 sm:w-7" strokeWidth={1.5} />
                  <span className="absolute h-0.5 w-[140%] -rotate-45 bg-brand-pain" />
                </div>
              ))}
            </div>
            <p className="mt-3 font-brand-mono text-xs font-bold uppercase text-brand-pain">{t('hero.oldWay')}</p>
          </div>
          <h1 className="trainer-headline mx-auto mt-7 max-w-6xl leading-[1.08] text-balance">
            <span className="block text-2xl sm:text-4xl lg:text-[40px] xl:text-[44px]">{t('hero.problem')}</span>
            <span className="block text-4xl text-brand-highlight sm:text-5xl lg:text-[60px] xl:text-[64px]">{t('hero.payoff')}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-text/70 md:text-xl">{t('hero.subtitle')}</p>
          <Button asChild size="lg" className="mt-8 h-12 rounded-full px-8 text-base font-semibold md:h-14 md:px-10">
            <Link to="/register">{t('hero.cta')}</Link>
          </Button>
        </div>

        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-lg border border-brand-border bg-brand-screen md:mt-16">
          <div className="flex h-9 items-center gap-2 border-b border-brand-canvas/10 bg-brand-screen px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-pain" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-highlight" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-result" />
          </div>
          <div className="bg-brand-screen p-2 md:p-5">
            <img src="/lovable-uploads/ec9840eb-8606-47a2-bb42-c3a7d3fada14.png" alt="Sales dashboard analytics" className="block h-auto w-full object-contain md:max-h-[500px]" />
          </div>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-lg border border-brand-border bg-brand-surface p-6 text-left">
              <Icon className="mb-5 h-6 w-6 text-brand-highlight" />
              <h3 className="mb-2 text-base font-semibold text-brand-text">{t(title)}</h3>
              <p className="text-sm leading-relaxed text-brand-text/60">{t(description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Hero;
