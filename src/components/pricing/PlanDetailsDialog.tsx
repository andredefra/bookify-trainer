import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { PlanDetailsDialogProps } from './types';
import { getFeatureDetails } from './utils/planFeatures';
import { FeatureItem } from './FeatureItem';
import { PlanNote } from './PlanNote';

export const PlanDetailsDialog = ({ planType, triggerText, children }: PlanDetailsDialogProps) => {
  const { t } = useLanguage();

  const features = getFeatureDetails(planType, t);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="w-full mt-2">
            <Info className="w-4 h-4 mr-2" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {t(`pricing.detailedFeatures.${planType}.title`)}
          </DialogTitle>
          <p className="text-muted-foreground text-lg">
            {t(`pricing.detailedFeatures.${planType}.subtitle`)}
          </p>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} />
          ))}
        </div>
        
        <PlanNote planType={planType} />
      </DialogContent>
    </Dialog>
  );
};