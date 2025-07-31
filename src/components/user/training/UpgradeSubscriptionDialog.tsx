import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Crown, Check, Zap } from "lucide-react";

interface UpgradeSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: (tier: string) => void;
}

export function UpgradeSubscriptionDialog({ 
  open, 
  onOpenChange, 
  onUpgrade 
}: UpgradeSubscriptionDialogProps) {
  const plans = [
    {
      id: 'basic',
      name: 'Basic AI',
      price: '€9.99',
      period: '/month',
      description: 'Get started with AI-generated training programs',
      features: [
        'Personal AI Trainer',
        'Custom training programs',
        'Progress tracking',
        'Exercise library access'
      ],
      icon: Bot,
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium AI',
      price: '€19.99',
      period: '/month',
      description: 'Advanced AI coaching with personalized nutrition',
      features: [
        'Everything in Basic',
        'Nutrition planning',
        'Advanced analytics',
        'Voice coaching',
        'Priority support'
      ],
      icon: Crown,
      popular: true
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Upgrade to Personal AI Trainer
          </DialogTitle>
          <DialogDescription>
            Choose your plan to unlock AI-powered personal training and custom workout programs.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-blue-100 dark:bg-blue-900'
                  }`}>
                    <plan.icon className={`h-6 w-6 ${
                      plan.popular ? 'text-white' : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                </div>
                
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => onUpgrade(plan.id)}
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="font-medium mb-2">✨ Special Launch Offer</h3>
          <p className="text-sm text-muted-foreground">
            First 100 users get lifetime access to Basic AI for free! 
            Limited spots remaining.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}