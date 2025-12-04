import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Sparkles, Check, Dumbbell, Brain, BarChart3, MessageSquare, Users, Lightbulb, Video, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AIFeatureDialogProps {
  type: 'client' | 'trainer';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AIFeatureDialog = ({ type, open, onOpenChange }: AIFeatureDialogProps) => {
  const { t } = useLanguage();

  const clientFeatures = [
    {
      icon: Brain,
      name: t('aiPricing.client.features.aiWorkoutCoach'),
      description: "Your personal AI coach guides you through every workout with real-time tips, form corrections, and motivation.",
      details: [
        "Ask questions during your workout and get instant answers",
        "Receive personalized tips based on your current exercise",
        "Get suggestions for weight adjustments and rest times",
        "Voice-enabled hands-free assistance"
      ]
    },
    {
      icon: Video,
      name: t('aiPricing.client.features.exerciseDemos'),
      description: "Never wonder how to perform an exercise again with AI-generated visual demonstrations.",
      details: [
        "On-demand exercise demonstrations for any movement",
        "Multiple angles and variations shown",
        "Equipment setup guidance included",
        "Search from 1000+ exercise library"
      ]
    },
    {
      icon: BarChart3,
      name: t('aiPricing.client.features.advancedInsights'),
      description: "Deep analytics powered by AI to understand your progress and optimize your training.",
      details: [
        "Body composition trend analysis",
        "Performance predictions and goal tracking",
        "Personalized workout recommendations",
        "Recovery and fatigue monitoring"
      ]
    }
  ];

  const trainerFeatures = [
    {
      icon: TrendingUp,
      name: t('aiPricing.trainer.features.businessInsights'),
      description: "Make data-driven decisions with AI-powered business analytics.",
      details: [
        "Revenue forecasting and trend analysis",
        "Client retention predictions",
        "Seasonal demand patterns",
        "Growth opportunity identification"
      ]
    },
    {
      icon: MessageSquare,
      name: t('aiPricing.trainer.features.chatAssistant'),
      description: "Your AI assistant helps manage client communications and content creation.",
      details: [
        "Generate workout program descriptions",
        "Draft professional client messages",
        "Answer common client questions automatically",
        "Create social media content"
      ]
    },
    {
      icon: Users,
      name: t('aiPricing.trainer.features.clientAnalytics'),
      description: "Comprehensive performance tracking for all your clients in one place.",
      details: [
        "Individual progress dashboards",
        "Comparative client performance metrics",
        "Goal achievement tracking",
        "Automated progress reports"
      ]
    },
    {
      icon: Lightbulb,
      name: t('aiPricing.trainer.features.smartRecommendations'),
      description: "AI suggests the perfect programs and adjustments for each client.",
      details: [
        "Personalized program suggestions",
        "Exercise substitution recommendations",
        "Load progression optimization",
        "Recovery-based training adjustments"
      ]
    }
  ];

  const isClient = type === 'client';
  const features = isClient ? clientFeatures : trainerFeatures;
  const Icon = isClient ? Crown : Sparkles;
  const colorClass = isClient ? 'amber' : 'violet';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 bg-${colorClass}-100 rounded-lg`}>
              <Icon className={`h-6 w-6 text-${colorClass}-600`} />
            </div>
            <div>
              <DialogTitle className="text-xl">
                {isClient ? t('aiPricing.client.title') : t('aiPricing.trainer.title')}
              </DialogTitle>
              <DialogDescription>
                {isClient ? t('aiPricing.client.description') : t('aiPricing.trainer.description')}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border ${isClient ? 'border-amber-200 bg-amber-50/50' : 'border-violet-200 bg-violet-50/50'}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isClient ? 'bg-amber-100' : 'bg-violet-100'}`}>
                  <feature.icon className={`h-5 w-5 ${isClient ? 'text-amber-600' : 'text-violet-600'}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{feature.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                  <ul className="space-y-1.5">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className={`text-2xl font-bold ${isClient ? 'text-amber-600' : 'text-violet-600'}`}>
                {isClient ? t('aiPricing.client.price') : t('aiPricing.trainer.price')}
              </span>
              <span className="text-muted-foreground ml-1">
                {isClient ? t('aiPricing.client.period') : t('aiPricing.trainer.period')}
              </span>
            </div>
          </div>
          <Button 
            className={`w-full ${isClient ? 'bg-amber-500 hover:bg-amber-600' : 'bg-violet-500 hover:bg-violet-600'}`}
            onClick={() => onOpenChange(false)}
          >
            {isClient ? t('aiPricing.client.cta') : t('aiPricing.trainer.cta')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIFeatureDialog;
