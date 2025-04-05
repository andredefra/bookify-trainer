
import { Users } from 'lucide-react';
import { useState } from 'react';

interface PricingHeaderProps {
  titleText: string;
  subtitleText: string;
  clientsAccessText: string;
  monthlyText: string;
  annualText: string;
  saveText: string;
  onBillingChange: (isAnnual: boolean) => void;
}

export const PricingHeader = ({
  titleText,
  subtitleText,
  clientsAccessText,
  monthlyText,
  annualText,
  saveText,
  onBillingChange
}: PricingHeaderProps) => {
  const [annual, setAnnual] = useState(false);
  
  const handleBillingChange = (isAnnual: boolean) => {
    setAnnual(isAnnual);
    onBillingChange(isAnnual);
  };
  
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="reveal text-3xl md:text-4xl font-display font-bold tracking-tight text-primary mb-6">
        {titleText}
      </h2>
      <p className="reveal reveal-delay-1 text-lg text-muted-foreground mb-5">
        {subtitleText}
      </p>
      
      <div className="reveal reveal-delay-2 flex items-center justify-center gap-2 mb-6">
        <Users className="h-5 w-5 text-emerald-600" />
        <p className="text-emerald-700 font-medium">
          {clientsAccessText}
        </p>
      </div>
      
      <div className="reveal reveal-delay-2 inline-flex p-1 bg-secondary rounded-full mb-10">
        <button
          onClick={() => handleBillingChange(false)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !annual ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'
          }`}
        >
          {monthlyText}
        </button>
        <button
          onClick={() => handleBillingChange(true)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            annual ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'
          }`}
        >
          {annualText} <span className="text-xs font-normal text-emerald-600 ml-1">{saveText}</span>
        </button>
      </div>
    </div>
  );
};
