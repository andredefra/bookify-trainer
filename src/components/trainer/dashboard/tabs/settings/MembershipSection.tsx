
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check, Crown, Shield, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface MembershipSectionProps {
  user: {
    plan?: string;
    name?: string;
    email: string;
  };
}

export function MembershipSection({ user }: MembershipSectionProps) {
  const [currentPlan, setCurrentPlan] = useState<string>(user.plan || "free");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "€0",
      period: "forever",
      description: "Basic features for individual trainers",
      features: [
        "Up to 5 clients",
        "Basic workout templates",
        "Session scheduling",
        "Basic analytics"
      ],
      limitations: [
        "No custom branding",
        "Limited program creation",
        "No payment processing"
      ],
      isPopular: false,
      icon: Shield
    },
    {
      id: "pro",
      name: "Pro",
      price: "€29",
      period: "per month",
      description: "Advanced features for growing trainers",
      features: [
        "Unlimited clients",
        "Advanced program builder",
        "Client performance tracking",
        "Payment processing",
        "Marketing tools",
        "Email notifications"
      ],
      limitations: [],
      isPopular: true,
      icon: Crown
    },
    {
      id: "business",
      name: "Business",
      price: "€79",
      period: "per month",
      description: "Complete solution for training businesses",
      features: [
        "Multiple trainer accounts",
        "Team management",
        "Custom branding",
        "Advanced analytics",
        "API access",
        "Priority support",
        "Client app white-labeling"
      ],
      limitations: [],
      isPopular: false,
      icon: Shield
    }
  ];

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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Current Membership</h3>
        <p className="text-sm text-muted-foreground">Manage your membership plan and account status.</p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium flex items-center">
                {currentPlan === "pro" && <Crown className="h-5 w-5 mr-2 text-amber-500" />}
                {currentPlan === "business" && <Shield className="h-5 w-5 mr-2 text-indigo-600" />}
                {currentPlan === "free" && <Shield className="h-5 w-5 mr-2 text-gray-500" />}
                {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} Plan
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentPlan === "free" 
                  ? "Basic access with limited features" 
                  : currentPlan === "pro" 
                    ? "Full access to all trainer features" 
                    : "Complete business training solution"}
              </p>
            </div>
            
            {currentPlan !== "free" && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Active
              </Badge>
            )}
          </div>
          
          {currentPlan !== "free" && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-medium">Billing cycle</p>
              <p className="text-sm text-muted-foreground">
                Next payment on {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Available Plans</h3>
        <p className="text-sm text-muted-foreground">Choose the plan that best fits your needs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {plans.map((plan) => (
            <Card key={plan.id} className={`p-4 flex flex-col h-full border ${plan.isPopular ? 'border-primary shadow-sm' : ''} ${currentPlan === plan.id ? 'bg-primary/5' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <plan.icon className={`h-5 w-5 mr-2 ${plan.isPopular ? 'text-amber-500' : 'text-primary'}`} />
                  <h3 className="font-medium">{plan.name}</h3>
                </div>
                {plan.isPopular && (
                  <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                )}
              </div>
              
              <div className="mb-4">
                <div className="text-2xl font-bold">{plan.price} <span className="text-sm font-normal text-muted-foreground">{plan.period}</span></div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="mt-auto">
                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                      <span className="text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-auto" 
                  variant={currentPlan === plan.id ? "outline" : "default"}
                  disabled={currentPlan === plan.id}
                  onClick={() => handlePlanChange(plan.id)}
                >
                  {currentPlan === plan.id ? "Current Plan" : "Select Plan"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Account Management</h3>
        <p className="text-sm text-muted-foreground">Manage your account status and data.</p>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start">
                    <AlertCircle className="text-amber-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-amber-800">
                      If you have active clients, they will lose access to the programs you've created for them.
                    </span>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>Delete Account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
