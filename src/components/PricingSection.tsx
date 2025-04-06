
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { plans } from '@/components/trainer/dashboard/tabs/settings/membership/plansData';
import { PricingHeader } from './pricing/PricingHeader';
import { PlanCard } from './pricing/PlanCard';
import { PricingFooter } from './pricing/PricingFooter';

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

  const handleBillingChange = (isAnnual: boolean) => {
    setAnnual(isAnnual);
  };

  // Plan features
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
  
  const gymFeatures = [
    t('pricing.features.unlimitedTrainers'),
    t('pricing.features.unlimitedClients'),
    t('pricing.features.reducedProPricing'),
    t('pricing.features.directClientChat'),
    t('pricing.features.clientResults'),
    t('pricing.features.gymIntegration'),
  ];

  // Plans configuration for personal trainers
  const trainerPricingPlans = [
    {
      name: t('pricing.standard.title'),
      price: t('pricing.standard.price'),
      priceAnnual: t('pricing.standard.price'),
      period: t('pricing.standard.period'),
      fee: t('pricing.standard.fee'),
      features: standardFeatures,
      ctaText: t('pricing.standard.cta'),
      ctaLink: '/register?plan=standard',
      isPopular: false,
      isGymPlan: false
    },
    {
      name: t('pricing.freemium.title'),
      price: t('pricing.freemium.price'),
      priceAnnual: t('pricing.freemium.price'),
      period: t('pricing.freemium.period'),
      fee: t('pricing.freemium.fee'),
      features: freemiumFeatures,
      ctaText: t('pricing.freemium.cta'),
      ctaLink: '/register',
      isPopular: false,
      isGymPlan: false
    },
    {
      name: t('pricing.pro.title'),
      price: annual ? t('pricing.pro.priceAnnual') : t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      fee: t('pricing.pro.fee'),
      features: proFeatures,
      ctaText: t('pricing.pro.cta'),
      ctaLink: '/register?plan=pro',
      isPopular: true,
      isGymPlan: false
    }
  ];

  // Gym plan configuration (separate)
  const gymPlan = {
    name: t('pricing.gym.title'),
    price: annual ? t('pricing.gym.priceAnnual') : t('pricing.gym.price'),
    period: t('pricing.gym.period'),
    fee: t('pricing.gym.fee'),
    features: gymFeatures,
    ctaText: t('pricing.gym.cta'),
    ctaLink: '/register?plan=gym',
    isPopular: false,
    isGymPlan: true
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <PricingHeader 
          titleText={t('pricing.title')}
          subtitleText={t('pricing.subtitle')}
          clientsAccessText={t('pricing.clientsAccess')}
          monthlyText={t('pricing.monthly')}
          annualText={t('pricing.annual')}
          saveText={t('pricing.save')}
          onBillingChange={handleBillingChange}
        />

        {/* Personal Trainer Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {trainerPricingPlans.map((plan, index) => (
            <PlanCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              fee={plan.fee}
              features={plan.features}
              ctaText={plan.ctaText}
              ctaLink={plan.ctaLink}
              isPopular={plan.isPopular}
              isGymPlan={plan.isGymPlan}
              isDelayed={index > 1}
              Icon={index < plans.length ? plans[index].icon : undefined}
            />
          ))}
        </div>
        
        {/* Gym Plan - Separate section with different styling */}
        <div id="gym-pricing" className="mt-20 pt-12 border-t border-gray-100">
          <h3 className="text-2xl font-display font-bold text-center mb-6 reveal">
            {t('pricing.forGyms')}
          </h3>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10 reveal reveal-delay-1">
            {t('pricing.gymPlanDescription')}
          </p>
          <div className="max-w-lg mx-auto">
            <PlanCard
              name={gymPlan.name}
              price={gymPlan.price}
              period={gymPlan.period}
              fee={gymPlan.fee}
              features={gymPlan.features}
              ctaText={gymPlan.ctaText}
              ctaLink={gymPlan.ctaLink}
              isPopular={false}
              isGymPlan={true}
              isDelayed={false}
              Icon={plans[3].icon}
            />
          </div>
        </div>

        <PricingFooter
          disclaimerText={t('pricing.disclaimer1').replace('All plans', 'Pro plan')}
          clientsAccessText={t('pricing.disclaimer2')}
        />
      </div>
    </section>
  );
};

export default PricingSection;
