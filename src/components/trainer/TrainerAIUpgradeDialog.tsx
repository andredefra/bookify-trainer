import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTrainerAISubscription } from '@/hooks/useTrainerAISubscription';
import { Brain, Sparkles, Check, BarChart3, Users, MessageCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrainerAIUpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TrainerAIUpgradeDialog({ open, onOpenChange }: TrainerAIUpgradeDialogProps) {
  const { activateAIViaMock } = useTrainerAISubscription();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    // In demo mode, just activate mock
    await activateAIViaMock();
    toast({
      title: 'AI Plus Activated!',
      description: 'You now have access to all AI-powered features.',
    });
    onOpenChange(false);
  };

  const features = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'AI Business Insights',
      description: 'Performance analytics, retention rates, goal metrics'
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: 'AI Chat Assistant',
      description: 'Ask questions about your business performance'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'AI Client Analytics',
      description: 'Deep analysis of client progress and trends'
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Smart Recommendations',
      description: 'Personalized training and engagement suggestions'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
            <Brain className="h-8 w-8" />
          </div>
          <DialogTitle className="text-2xl">AI Plus for Trainers</DialogTitle>
          <DialogDescription>
            Supercharge your training business with AI-powered insights
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Price */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">
              €1.99<span className="text-lg font-normal text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Cancel anytime</p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{feature.title}</span>
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            className="w-full h-12 text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={handleUpgrade}
          >
            <Zap className="h-5 w-5 mr-2" />
            Upgrade to AI Plus Now
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By upgrading, you agree to our terms of service. Your subscription will automatically renew each month.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
