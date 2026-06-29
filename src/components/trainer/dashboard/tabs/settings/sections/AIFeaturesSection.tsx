import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, Users, BarChart3, MessageCircle, Clock, Dumbbell } from 'lucide-react';

export function AIFeaturesSection() {
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>AI Features</CardTitle>
            </div>
            <Badge className="bg-gradient-to-r from-amber-500 to-purple-500 text-white">
              <Clock className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
          </div>
          <CardDescription>
            Stiamo preparando funzionalità AI potenti per i trainer. Resta sintonizzato.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Promo Card */}
            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border-2 border-dashed border-purple-200 dark:border-purple-800">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI Plus — Coming Soon</h3>
                <div className="text-sm text-muted-foreground">
                  Soon from <span className="font-semibold text-primary">€1.99/month</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supercharge your training business with AI-powered insights
                </p>
              </div>
            </div>

            {/* Features preview */}
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg opacity-80">
                  <div className="p-2 bg-muted rounded-lg text-muted-foreground">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{feature.title}</span>
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4 border-amber-300 text-amber-700 dark:text-amber-400">
                        Coming soon
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              variant="outline"
              disabled
            >
              <Clock className="h-4 w-4 mr-2" />
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
