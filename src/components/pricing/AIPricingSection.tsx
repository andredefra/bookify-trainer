import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Check } from 'lucide-react';

const AIPricingSection = () => {
  const { t } = useLanguage();

  const clientFeatures = [
    t('aiPricing.client.features.trainingPrograms'),
    t('aiPricing.client.features.aiWorkoutCoach'),
    t('aiPricing.client.features.formAnalysis'),
    t('aiPricing.client.features.exerciseDemos'),
    t('aiPricing.client.features.advancedInsights'),
  ];

  const trainerFeatures = [
    t('aiPricing.trainer.features.businessInsights'),
    t('aiPricing.trainer.features.chatAssistant'),
    t('aiPricing.trainer.features.clientAnalytics'),
    t('aiPricing.trainer.features.smartRecommendations'),
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('aiPricing.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('aiPricing.subtitle')}
          </p>
        </div>

        {/* Two cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Client AI Plan Card */}
          <Card className="relative overflow-hidden border-2 border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-orange-50/30 reveal">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Crown className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('aiPricing.client.title')}</h3>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                    {t('aiPricing.client.badge')}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold text-amber-600">{t('aiPricing.client.price')}</span>
                <span className="text-muted-foreground">{t('aiPricing.client.period')}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {t('aiPricing.client.description')}
              </p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {clientFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full mt-6 border-amber-300 hover:bg-amber-50"
              >
                {t('aiPricing.client.cta')}
              </Button>
            </CardContent>
          </Card>

          {/* Trainer AI Plus Card */}
          <Card className="relative overflow-hidden border-2 border-violet-200/50 bg-gradient-to-br from-violet-50/50 to-purple-50/30 reveal reveal-delay-1">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <Sparkles className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('aiPricing.trainer.title')}</h3>
                  <Badge variant="secondary" className="bg-violet-100 text-violet-700 hover:bg-violet-100">
                    {t('aiPricing.trainer.badge')}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-4xl font-bold text-violet-600">{t('aiPricing.trainer.price')}</span>
                <span className="text-muted-foreground">{t('aiPricing.trainer.period')}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {t('aiPricing.trainer.description')}
              </p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {trainerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full mt-6 border-violet-300 hover:bg-violet-50"
              >
                {t('aiPricing.trainer.cta')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIPricingSection;
