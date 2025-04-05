
import { useState, useEffect } from 'react';
import { CheckCircle2, Users, Briefcase, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const PricingSection = () => {
  const [annual, setAnnual] = useState(false);
  const { t } = useLanguage();
  
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

  const standardFeatures = [
    t('pricing.features.personalTrainerPage'),
    t('pricing.features.clientMessaging'),
    t('pricing.features.clientManagement'),
  ];
  
  const freemiumFeatures = [
    t('pricing.features.unlimitedSessions'),
    t('pricing.features.personalTrainerPage'),
    t('pricing.features.clientMessaging'),
    t('pricing.features.clientManagement'),
  ];

  const proFeatures = [
    t('pricing.features.everythingFreemium'),
    t('pricing.features.googleCalendar'),
    t('pricing.features.digitalCashPayments'),
    t('pricing.features.prioritySupport'),
    t('pricing.features.advancedAnalytics'),
    t('pricing.features.customPrograms'),
  ];
  
  const gymTrainerFeatures = [
    t('pricing.features.everythingPro'),
    t('pricing.features.gymBranding'),
    t('pricing.features.gymClientAccess'),
    t('pricing.features.directMessaging'),
  ];
  
  const gymFeatures = [
    t('pricing.features.whiteLabel'),
    t('pricing.features.unlimitedTrainers'),
    t('pricing.features.unlimitedClients'),
    t('pricing.features.brandedTrainerPages'),
    t('pricing.features.directClientCommunication'),
    t('pricing.features.analyticsAccess'),
    t('pricing.features.crmIntegration'),
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="reveal text-3xl md:text-4xl font-display font-bold tracking-tight text-primary mb-6">
            {t('pricing.title')}
          </h2>
          <p className="reveal reveal-delay-1 text-lg text-muted-foreground mb-5">
            {t('pricing.subtitle')}
          </p>
          
          <div className="reveal reveal-delay-2 flex items-center justify-center gap-2 mb-6">
            <Users className="h-5 w-5 text-emerald-600" />
            <p className="text-emerald-700 font-medium">
              {t('pricing.clientsAccess')}
            </p>
          </div>
          
          <div className="reveal reveal-delay-2 inline-flex p-1 bg-secondary rounded-full mb-10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !annual ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                annual ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'
              }`}
            >
              {t('pricing.annual')} <span className="text-xs font-normal text-emerald-600 ml-1">{t('pricing.save')}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Standard Plan */}
          <div className="reveal flex flex-col p-8 rounded-2xl border border-border bg-white shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">Standard</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-4xl font-display font-bold">€5</span>
                <span className="text-muted-foreground ml-2">{t('pricing.freemium.period')}</span>
              </div>
              <p className="text-muted-foreground">
                {t('pricing.freemium.fee')}
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {standardFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/register?plan=standard" 
              className="w-full px-6 py-3 bg-white text-primary border border-primary/20 rounded-full text-center font-medium button-hover"
            >
              {t('pricing.freemium.cta')}
            </Link>
          </div>
          
          {/* Basic Plan (formerly Freemium) */}
          <div className="reveal flex flex-col p-8 rounded-2xl border border-border bg-white shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">{t('pricing.freemium.title')}</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-4xl font-display font-bold">{t('pricing.freemium.price')}</span>
                <span className="text-muted-foreground ml-2">{t('pricing.freemium.period')}</span>
              </div>
              <p className="text-muted-foreground">
                {t('pricing.freemium.fee')}
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
              {t('pricing.freemium.cta')}
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="reveal reveal-delay-1 flex flex-col p-8 rounded-2xl border-2 border-primary bg-white shadow-xl relative">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
              {t('pricing.pro.recommended')}
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">{t('pricing.pro.title')}</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-4xl font-display font-bold">
                  {annual ? t('pricing.pro.priceAnnual') : t('pricing.pro.price')}
                </span>
                <span className="text-muted-foreground ml-2">{t('pricing.pro.period')}</span>
              </div>
              <p className="text-muted-foreground">
                {t('pricing.pro.fee')}
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
              {t('pricing.pro.cta')}
            </Link>
          </div>
        </div>
        
        {/* Business Plans */}
        <div className="mt-20 mb-6 text-center">
          <h3 className="text-2xl font-display font-bold text-primary mb-4">
            {t('pricing.business.title')}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.business.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Gym Trainer Plan */}
          <div className="reveal flex flex-col p-8 rounded-2xl border border-border bg-white shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">{t('pricing.gymTrainer.title')}</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-4xl font-display font-bold">{t('pricing.gymTrainer.price')}</span>
                <span className="text-muted-foreground ml-2">{t('pricing.gymTrainer.period')}</span>
              </div>
              <p className="text-muted-foreground">
                {t('pricing.gymTrainer.fee')}
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {gymTrainerFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-sm text-amber-600 mb-4 font-medium">
              * {t('pricing.gymTrainer.note')}
            </p>

            <Link 
              to="/register?plan=gym-trainer" 
              className="w-full px-6 py-3 bg-white text-primary border border-primary/20 rounded-full text-center font-medium button-hover"
            >
              {t('pricing.gymTrainer.cta')}
            </Link>
          </div>
          
          {/* Gym Plan */}
          <div className="reveal reveal-delay-1 flex flex-col p-8 rounded-2xl border border-primary/30 bg-white shadow-lg">            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">{t('pricing.gym.title')}</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-4xl font-display font-bold">
                  {annual ? t('pricing.gym.priceAnnual') : t('pricing.gym.price')}
                </span>
                <span className="text-muted-foreground ml-2">{t('pricing.gym.period')}</span>
              </div>
              <p className="text-muted-foreground">
                {t('pricing.gym.fee')}
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              {gymFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Link 
              to="/register?plan=gym" 
              className="w-full px-6 py-3 bg-primary/90 text-white rounded-full text-center font-medium button-hover"
            >
              {t('pricing.gym.cta')}
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.disclaimer1').replace('All plans', 'Pro plan')}
          </p>
          <p className="text-sm text-primary font-medium mt-4 max-w-2xl mx-auto">
            {t('pricing.disclaimer2')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
