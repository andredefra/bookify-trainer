
import { CheckCircle2, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlanCardProps {
  name: string;
  price: string;
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
}

export const PlanCard = ({
  name,
  price,
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
  onContactClick
}: PlanCardProps) => {
  const revealClass = `reveal ${isDelayed ? 'reveal-delay-' + (isPopular ? '1' : '2') : ''}`;
  
  return (
    <div className={`${revealClass} flex flex-col p-8 rounded-2xl border ${
      isPopular ? 'border-2 border-primary shadow-xl' : 
      isGymPlan ? 'border-2 border-gray-800 shadow-lg' : 
      'border-border shadow-sm'
    } ${isGymPlan ? 'bg-gray-50' : 'bg-white'} relative`}>
      {isPopular && (
        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
          RECOMMENDED
        </div>
      )}
      
      {isGymPlan && (
        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gray-800 text-white text-xs font-medium py-1 px-3 rounded-full">
          FOR GYMS
        </div>
      )}
      
      <div className="mb-6">
        <h3 className={`text-xl font-semibold ${isGymPlan ? 'text-gray-800' : 'text-primary'} mb-2`}>{name}</h3>
        <div className="flex items-baseline mb-1">
          <span className="text-4xl font-display font-bold">{price}</span>
          <span className="text-muted-foreground ml-2">{period}</span>
        </div>
        {fee && (
          <p className="text-muted-foreground text-sm">
            {fee}
          </p>
        )}
        {/* Completely removing the transactionFeeNote paragraph */}
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className={`h-5 w-5 ${isGymPlan ? 'text-gray-700' : 'text-emerald-500'} mr-2 flex-shrink-0 mt-0.5`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {showContactForm ? (
        <button
          onClick={onContactClick}
          className={`w-full px-6 py-3 ${
            isPopular 
              ? 'bg-primary text-white' 
              : isGymPlan
                ? 'bg-gray-800 text-white hover:bg-gray-900'
                : 'bg-white text-primary border border-primary/20'
          } rounded-full text-center font-medium button-hover`}
        >
          {ctaText}
        </button>
      ) : (
        <Link 
          to={ctaLink}
          target={isGymPlan ? "_blank" : undefined}
          rel={isGymPlan ? "noopener noreferrer" : undefined}
          className={`w-full px-6 py-3 ${
            isPopular 
              ? 'bg-primary text-white' 
              : isGymPlan
                ? 'bg-gray-800 text-white hover:bg-gray-900'
                : 'bg-white text-primary border border-primary/20'
          } rounded-full text-center font-medium button-hover`}
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
};
