
import { CheckCircle2, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlanDetailsDialog } from './PlanDetailsDialog';
import { useLanguage } from '@/context/LanguageContext';

interface PlanCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  fee: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isPopular?: boolean;
  isDelayed?: boolean;
  Icon?: LucideIcon;
  isGymPlan?: boolean;
  transactionFeeNote?: string;
  showContactForm?: boolean;
  onContactClick?: () => void;
  isLaunchOffer?: boolean;
  planType?: 'basic' | 'essential' | 'pro';
  comingSoon?: boolean;
}

export const PlanCard = ({
  name,
  price,
  originalPrice,
  period,
  fee,
  features,
  ctaText,
  ctaLink,
  isPopular = false,
  isDelayed = false,
  Icon,
  isGymPlan = false,
  transactionFeeNote,
  showContactForm = false,
  onContactClick,
  isLaunchOffer = false,
  planType,
  comingSoon = false
}: PlanCardProps) => {
  const { t } = useLanguage();
  const revealClass = `reveal ${isDelayed ? 'reveal-delay-' + (isPopular ? '1' : '2') : ''}`;
  
  return (
    <div className={`${revealClass} flex flex-col p-8 rounded-2xl border ${
      isPopular ? 'border-2 border-primary shadow-xl' : 
      isGymPlan ? 'border-2 border-gray-800 shadow-lg' : 
      'border-border shadow-sm'
    } ${isGymPlan ? 'bg-gray-50' : 'bg-white'} relative`}>
      {comingSoon && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold py-1.5 px-4 rounded-full z-10 uppercase tracking-wide">
          Coming Soon
        </div>
      )}
      {isLaunchOffer && (
        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full animate-pulse">
          🚀 LAUNCH OFFER
        </div>
      )}
      
      
      <div className={comingSoon ? 'opacity-40 pointer-events-none' : ''}>
      <div className="mb-6">
        <h3 className={`text-xl font-semibold ${isGymPlan ? 'text-gray-800' : 'text-primary'} mb-2`}>{name}</h3>
        <div className="flex items-baseline mb-1">
          {originalPrice && isLaunchOffer ? (
            <div className="flex flex-col">
              <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>
              <div className="flex items-baseline">
                <span className="text-4xl font-display font-bold text-green-600">{price}</span>
                <span className="text-muted-foreground ml-2">{period}</span>
              </div>
            </div>
          ) : (
            <>
              <span className="text-4xl font-display font-bold">{price}</span>
              <span className="text-muted-foreground ml-2">{period}</span>
            </>
          )}
        </div>
        {fee && (
          <p className="text-muted-foreground text-sm">
            {fee}
          </p>
        )}
        {/* Completely removing the transactionFeeNote paragraph */}
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {/* Show inherited features for Essential and Pro plans */}
        {planType === 'essential' && (
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-primary font-medium">{t('pricing.detailedFeatures.everythingInBasic.name')}</span>
          </li>
        )}
        {planType === 'pro' && (
          <li className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-primary font-medium">{t('pricing.detailedFeatures.everythingInEssential.name')}</span>
          </li>
        )}
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className={`h-5 w-5 ${isGymPlan ? 'text-gray-700' : 'text-emerald-500'} mr-2 flex-shrink-0 mt-0.5`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-4 pt-2">
        {/* Primary CTA Button */}
        <div>
          {showContactForm ? (
            <Button
              onClick={onContactClick}
              className={`w-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${
                isPopular 
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                  : isGymPlan
                    ? 'bg-gray-800 hover:bg-gray-900 text-white'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
              size="lg"
            >
              {ctaText}
            </Button>
          ) : (
            <Button
              asChild
              className={`w-full font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${
                isPopular 
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                  : isGymPlan
                    ? 'bg-gray-800 hover:bg-gray-900 text-white'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              }`}
              size="lg"
            >
              <Link 
                to={ctaLink}
                target={isGymPlan ? "_blank" : undefined}
                rel={isGymPlan ? "noopener noreferrer" : undefined}
              >
                {ctaText}
              </Link>
            </Button>
          )}
        </div>
        
        {/* Discover Details Button */}
        {planType && !isGymPlan && (
          <div className="flex justify-center">
            <PlanDetailsDialog 
              planType={planType}
              triggerText={t('pricing.discoverDetails')}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground border border-muted hover:border-border px-4 py-2"
              >
                {t('pricing.discoverDetails')}
              </Button>
            </PlanDetailsDialog>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
