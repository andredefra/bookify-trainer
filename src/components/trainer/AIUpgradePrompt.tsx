import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Lock } from 'lucide-react';
import { TrainerAIUpgradeDialog } from './TrainerAIUpgradeDialog';

interface AIUpgradePromptProps {
  feature?: string;
  className?: string;
}

export function AIUpgradePrompt({ feature = 'AI Features', className }: AIUpgradePromptProps) {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);

  return (
    <>
      <Card className={`border-2 border-dashed border-purple-200 dark:border-purple-800 ${className}`}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="relative inline-flex">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                <Brain className="h-10 w-10 text-purple-500" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-muted rounded-full border-2 border-background">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Unlock {feature}</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Get AI-powered insights to grow your training business. 
                Analyze client performance, get smart recommendations, and more.
              </p>
            </div>

            <div className="pt-2">
              <div className="text-2xl font-bold text-primary mb-2">
                €1.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => setShowUpgradeDialog(true)}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Upgrade to AI Plus
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Cancel anytime • Instant access
            </p>
          </div>
        </CardContent>
      </Card>

      <TrainerAIUpgradeDialog 
        open={showUpgradeDialog} 
        onOpenChange={setShowUpgradeDialog} 
      />
    </>
  );
}
