
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "./membership/plansData";

interface MembershipSectionProps {
  user: {
    plan?: string;
    name?: string;
    email: string;
  };
}

export function MembershipSection({ user }: MembershipSectionProps) {
  const [currentPlan, setCurrentPlan] = useState<string>(user.plan || "freemium");

  const handlePlanChange = (planId: string) => {
    if (planId === currentPlan) return;
    
    // Here you would typically call an API to change the plan
    setCurrentPlan(planId);
    toast.success(`Switched to ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan successfully`);
  };

  const handleDeleteAccount = () => {
    // Here you would typically call an API to delete the account
    toast.success("Your account has been scheduled for deletion");
  };

  // Find the current plan details
  const activePlan = plans.find(plan => plan.id === currentPlan) || plans[0];

  return (
    <div className="space-y-6">
      {/* Current Plan Summary */}
      <div className="rounded-lg border p-4 bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Your Current Plan</h3>
            <p className="text-sm text-muted-foreground">You are currently on the {activePlan.name} plan</p>
          </div>
          <Badge className="self-start sm:self-center bg-primary/80 hover:bg-primary px-3 py-1">
            {activePlan.name}
          </Badge>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Check className="h-4 w-4 mr-2 text-green-500" /> 
            <span>{activePlan.features[0]}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Check className="h-4 w-4 mr-2 text-green-500" /> 
            <span>{activePlan.features[1] || "Basic support"}</span>
          </div>
        </div>
      </div>
      
      {/* Available Plans */}
      <h3 className="text-lg font-semibold mt-8">Available Plans</h3>
      <p className="text-sm text-muted-foreground mb-4">Choose the plan that works best for your training business</p>
      
      <div className="grid grid-cols-1 gap-4">
        {plans.filter(plan => plan.id !== "gym").map((plan) => (
          <Card 
            key={plan.id}
            className={`overflow-hidden transition-all ${
              currentPlan === plan.id 
                ? "ring-2 ring-primary" 
                : "hover:border-primary/50"
            }`}
          >
            <div className="p-5">
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 text-sm">/month</span>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0">
                  {currentPlan === plan.id ? (
                    <Badge variant="secondary" className="font-medium">Current Plan</Badge>
                  ) : (
                    <Button 
                      onClick={() => handlePlanChange(plan.id)}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Switch to {plan.name}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Expand to Studio Section */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="rounded-lg border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 p-6">
          <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Expand to Studio</h3>
                <Badge className="bg-green-500 hover:bg-green-600 text-white">25% Trainer Discount</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Become both a Personal Trainer and Studio Admin. Manage your own studio while keeping all your trainer features.
              </p>
              
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-primary">€66.75</span>
                <span className="text-muted-foreground line-through">€89</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Unlimited Trainers",
                  "Unlimited Clients", 
                  "Reduced Pro Pricing (€19/month)",
                  "Direct Chat with Clients",
                  "Comprehensive Client Results",
                  "Integrated with Gym Management",
                  "White Label Options"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto"
                onClick={() => toast.success("Studio plan added! You're now both a PT and Studio Admin")}
              >
                Add Studio Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Account Section */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="flex items-center text-lg font-semibold text-destructive">
          <AlertCircle className="mr-2 h-5 w-5" />
          Delete Account
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button 
          variant="destructive" 
          className="mt-4"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
