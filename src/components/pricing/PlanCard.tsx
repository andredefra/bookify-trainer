
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
  Icon
}: PlanCardProps) => {
  const revealClass = `reveal ${isDelayed ? 'reveal-delay-' + (isPopular ? '1' : '2') : ''}`;
  
  return (
    <div className={`${revealClass} flex flex-col p-8 rounded-2xl border ${
      isPopular ? 'border-2 border-primary shadow-xl' : 'border-border shadow-sm'
    } bg-white relative`}>
      {isPopular && (
        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
          RECOMMENDED
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary mb-2">{name}</h3>
        <div className="flex items-baseline mb-1">
          <span className="text-4xl font-display font-bold">{price}</span>
          <span className="text-muted-foreground ml-2">{period}</span>
        </div>
        <p className="text-muted-foreground">
          {fee}
        </p>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link 
        to={ctaLink}
        className={`w-full px-6 py-3 ${
          isPopular 
            ? 'bg-primary text-white' 
            : 'bg-white text-primary border border-primary/20'
        } rounded-full text-center font-medium button-hover`}
      >
        {ctaText}
      </Link>
    </div>
  );
};
