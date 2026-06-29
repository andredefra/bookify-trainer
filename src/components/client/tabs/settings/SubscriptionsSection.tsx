import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Sparkles, Zap, Crown, CreditCard, BarChart2 } from "lucide-react";
import { toast } from "sonner";
import { useClientSubscription } from "@/hooks/useClientSubscription";
import { useAIAccess } from "@/hooks/useAIAccess";
import { useState } from "react";
import { ClientUpgradeDialog } from "./ClientUpgradeDialog";

export function SubscriptionsSection() {
  const { subscription, loading: subLoading, upgradeToProViaMock, downgradeToFreeViaMock } = useClientSubscription();
  const { monthlyUsage, loading: usageLoading } = useAIAccess();
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  if (subLoading || usageLoading) {
    return <div className="text-muted-foreground">Loading subscription...</div>;
  }
  
  const isPro = subscription?.isPro || false;
  const maxRequests = isPro ? 100 : 5;
  const usagePercent = (monthlyUsage / maxRequests) * 100;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {isPro ? (
                  <>
                    <Crown className="h-5 w-5 text-amber-500" />
                    AI Plan
                  </>
                ) : (
                  'Free Plan'
                )}
              </CardTitle>
              <CardDescription>
                {isPro 
                  ? 'Unlimited AI coaching and advanced features'
                  : 'Basic access with limited AI features'}
              </CardDescription>
            </div>
            
            {isPro ? (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                Active
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                Coming Soon
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Monthly AI Usage</span>
              <span className="text-sm text-muted-foreground">
                {monthlyUsage}/{maxRequests} requests
              </span>
            </div>
            <Progress value={usagePercent} className="h-2" />
            {!isPro && monthlyUsage >= 3 && (
              <p className="text-xs text-muted-foreground mt-2">
                You're approaching your monthly limit. Upgrade for unlimited access!
              </p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Your Features</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                {isPro ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Zap className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">AI Workout Coach {!isPro && '(AI Plan)'}</p>
                  <p className="text-xs text-muted-foreground">
                    {isPro 
                      ? 'Unlimited AI chat during workouts'
                      : `${Math.max(0, 5 - monthlyUsage)} free requests/month remaining`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                {isPro ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Sparkles className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">Exercise Demos {!isPro && '(AI Plan)'}</p>
                  <p className="text-xs text-muted-foreground">AI-generated setup images and videos</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                {isPro ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <BarChart2 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">Advanced Workout Insights {!isPro && '(AI Plan)'}</p>
                  <p className="text-xs text-muted-foreground">AI-powered analytics and fitness score</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {!isPro && (
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Upgrade to AI Plan
            </CardTitle>
            <CardDescription>
              Unlock unlimited AI coaching for just €1.99/month
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm">Unlimited AI chat during workouts</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm">Form analysis with AI Vision</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm">AI-generated exercise demos</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm">Advanced workout insights & AI analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm">Priority support</span>
              </div>
            </div>
            
            <Button 
              onClick={() => setShowUpgrade(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Upgrade Now - €1.99/month
            </Button>
          </CardContent>
        </Card>
      )}
      
      {isPro && subscription?.startDate && (
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">AI Plan - €1.99/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started</span>
                <span>{new Date(subscription.startDate).toLocaleDateString()}</span>
              </div>
              {subscription.endDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next billing</span>
                  <span>{new Date(subscription.endDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Subscription
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full mt-2 text-muted-foreground"
              onClick={async () => {
                await downgradeToFreeViaMock();
                toast.info('Downgraded to Free plan (Demo)');
              }}
            >
              Downgrade to Free (Demo)
            </Button>
          </CardContent>
        </Card>
      )}
      
        <ClientUpgradeDialog 
          open={showUpgrade}
          onOpenChange={setShowUpgrade}
          onUpgrade={upgradeToProViaMock}
        />
    </div>
  );
}
