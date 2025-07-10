import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PlanDetailsDialogProps {
  planType: 'basic' | 'essential' | 'pro';
  triggerText: string;
  children?: React.ReactNode;
}

interface FeatureDetail {
  name: string;
  description: string;
}

export const PlanDetailsDialog = ({ planType, triggerText, children }: PlanDetailsDialogProps) => {
  const { t } = useLanguage();

  const getFeatureDetails = (plan: string): FeatureDetail[] => {
    const features: FeatureDetail[] = [];
    
    if (plan === 'basic') {
      features.push(
        {
          name: t('pricing.detailedFeatures.basic.salesManagement.name'),
          description: t('pricing.detailedFeatures.basic.salesManagement.description')
        },
        {
          name: t('pricing.detailedFeatures.basic.personalPage.name'),
          description: t('pricing.detailedFeatures.basic.personalPage.description')
        },
        {
          name: t('pricing.detailedFeatures.basic.clientManagement.name'),
          description: t('pricing.detailedFeatures.basic.clientManagement.description')
        },
        {
          name: t('pricing.detailedFeatures.basic.messaging.name'),
          description: t('pricing.detailedFeatures.basic.messaging.description')
        },
        {
          name: t('pricing.detailedFeatures.basic.calendar.name'),
          description: t('pricing.detailedFeatures.basic.calendar.description')
        },
        {
          name: t('pricing.detailedFeatures.basic.analytics.name'),
          description: t('pricing.detailedFeatures.basic.analytics.description')
        }
      );
    } else if (plan === 'essential') {
      // Include Basic features
      features.push(...getFeatureDetails('basic'));
      
      // Add Essential-specific features
      features.push(
        {
          name: t('pricing.detailedFeatures.essential.unlimitedSessions.name'),
          description: t('pricing.detailedFeatures.essential.unlimitedSessions.description')
        },
        {
          name: t('pricing.detailedFeatures.essential.googleCalendar.name'),
          description: t('pricing.detailedFeatures.essential.googleCalendar.description')
        },
        {
          name: t('pricing.detailedFeatures.essential.waitlist.name'),
          description: t('pricing.detailedFeatures.essential.waitlist.description')
        },
        {
          name: t('pricing.detailedFeatures.essential.programs.name'),
          description: t('pricing.detailedFeatures.essential.programs.description')
        },
        {
          name: t('pricing.detailedFeatures.essential.unlimitedMessaging.name'),
          description: t('pricing.detailedFeatures.essential.unlimitedMessaging.description')
        },
        {
          name: t('pricing.detailedFeatures.essential.sessionAnalytics.name'),
          description: t('pricing.detailedFeatures.essential.sessionAnalytics.description')
        }
      );
    } else if (plan === 'pro') {
      // Include Essential features (which includes Basic)
      features.push(...getFeatureDetails('essential'));
      
      // Add Pro-specific features
      features.push(
        {
          name: t('pricing.detailedFeatures.pro.packages.name'),
          description: t('pricing.detailedFeatures.pro.packages.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.services.name'),
          description: t('pricing.detailedFeatures.pro.services.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.payments.name'),
          description: t('pricing.detailedFeatures.pro.payments.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.installments.name'),
          description: t('pricing.detailedFeatures.pro.installments.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.invoicing.name'),
          description: t('pricing.detailedFeatures.pro.invoicing.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.transactions.name'),
          description: t('pricing.detailedFeatures.pro.transactions.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.salesCrm.name'),
          description: t('pricing.detailedFeatures.pro.salesCrm.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.reviews.name'),
          description: t('pricing.detailedFeatures.pro.reviews.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.advancedAnalytics.name'),
          description: t('pricing.detailedFeatures.pro.advancedAnalytics.description')
        },
        {
          name: t('pricing.detailedFeatures.pro.prioritySupport.name'),
          description: t('pricing.detailedFeatures.pro.prioritySupport.description')
        }
      );
    }
    
    return features;
  };

  const features = getFeatureDetails(planType);

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
            <div 
              key={index}
              className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {planType === 'basic' && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Upgrade to Essential or Pro to unlock unlimited features and advanced business tools.
            </p>
          </div>
        )}
        
        {planType === 'essential' && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Upgrade to Pro to unlock payment processing, advanced analytics, and business management tools.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};