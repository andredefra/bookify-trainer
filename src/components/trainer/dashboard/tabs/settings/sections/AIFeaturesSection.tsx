import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTrainerAISubscription } from '@/hooks/useTrainerAISubscription';
import { TrainerAIUpgradeDialog } from '@/components/trainer/TrainerAIUpgradeDialog';
import { Brain, Sparkles, Users, BarChart3, MessageCircle, Check, Zap, Dumbbell } from 'lucide-react';

export function AIFeaturesSection() {
  const { subscription, loading, hasAIAccess, deactivateAIViaMock } = useTrainerAISubscription();
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const features = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'AI Business Insights',
      description: 'Get automated performance analytics, retention rates, and goal achievement metrics'
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: 'AI Chat Assistant (Business)',
      description: 'Ask questions about your business performance and get intelligent insights'
    },
    {
      icon: <Dumbbell className="h-5 w-5" />,
      title: 'AI Chat Assistant (Training)',
      description: 'Smart exercise recommendations, import programs from documents, and auto-match exercises with your database'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'AI Client Analytics',
      description: 'Deep analysis of individual client progress, trends, and recommendations'
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'Smart Recommendations',
      description: 'Personalized suggestions for training programs and client engagement'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>AI Features</CardTitle>
            </div>
            {hasAIAccess ? (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Zap className="h-3 w-3 mr-1" />
                AI Plus Active
              </Badge>
            ) : (
              <Badge variant="secondary">Free</Badge>
            )}
          </div>
          <CardDescription>
            {hasAIAccess 
              ? 'You have full access to all AI-powered features'
              : 'Unlock powerful AI tools to grow your training business'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasAIAccess ? (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">Your AI Plus Subscription</span>
                </div>
                <div className="text-2xl font-bold text-primary">€1.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                {subscription?.startDate && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Active since {new Date(subscription.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                )}
              </div>
              
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{feature.title}</span>
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={deactivateAIViaMock}
              >
                Manage Subscription
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Promotional Card */}
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border-2 border-dashed border-purple-200 dark:border-purple-800">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">AI Plus for Trainers</h3>
                  <div className="text-3xl font-bold text-primary">
                    €1.99<span className="text-base font-normal text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Supercharge your training business with AI-powered insights
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg opacity-75">
                    <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                      {feature.icon}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{feature.title}</span>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => setShowUpgradeDialog(true)}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Upgrade to AI Plus - €1.99/month
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <TrainerAIUpgradeDialog 
        open={showUpgradeDialog} 
        onOpenChange={setShowUpgradeDialog} 
      />
    </div>
  );
}
