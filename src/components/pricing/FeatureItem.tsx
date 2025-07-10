import { CheckCircle } from 'lucide-react';
import { FeatureDetail } from './types';

interface FeatureItemProps {
  feature: FeatureDetail;
}

export const FeatureItem = ({ feature }: FeatureItemProps) => {
  return (
    <div 
      className={`border border-border rounded-lg p-6 hover:shadow-md transition-shadow ${
        feature.isInheritedFeature ? 'bg-primary/5 border-primary/20' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <CheckCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${
          feature.isInheritedFeature ? 'text-primary' : 'text-emerald-600'
        }`} />
        <div className="flex-1">
          <h3 className={`font-semibold text-lg mb-2 ${
            feature.isInheritedFeature ? 'text-primary' : 'text-foreground'
          }`}>
            {feature.name}
          </h3>
          <p className={`leading-relaxed ${
            feature.isInheritedFeature ? 'text-primary/80' : 'text-muted-foreground'
          }`}>
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};