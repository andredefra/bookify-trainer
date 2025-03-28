
import { useState } from "react";
import { toast } from "sonner";
import { CurrentPlanDisplay } from "./membership/CurrentPlanDisplay";
import { PlanCard } from "./membership/PlanCard";
import { DeleteAccountSection } from "./membership/DeleteAccountSection";
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Current Membership</h3>
        <p className="text-sm text-muted-foreground">Manage your membership plan and account status.</p>
        <CurrentPlanDisplay currentPlan={currentPlan} />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Available Plans</h3>
        <p className="text-sm text-muted-foreground">Choose the plan that best fits your needs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id}
              {...plan}
              currentPlan={currentPlan}
              onSelectPlan={handlePlanChange}
            />
          ))}
        </div>
      </div>
      
      <DeleteAccountSection onDeleteAccount={handleDeleteAccount} />
    </div>
  );
}
