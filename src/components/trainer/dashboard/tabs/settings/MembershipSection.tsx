
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
      {/* Current Plan Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium mb-2">Current Membership</h3>
        <p className="text-sm text-muted-foreground mb-3">Manage your membership plan and account status.</p>
        <CurrentPlanDisplay currentPlan={currentPlan} />
      </div>
      
      {/* Available Plans Section */}
      <div>
        <h3 className="text-lg font-medium mb-2">Available Plans</h3>
        <p className="text-sm text-muted-foreground mb-3">Choose the plan that best fits your needs.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      
      {/* Delete Account Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <DeleteAccountSection onDeleteAccount={handleDeleteAccount} />
      </div>
    </div>
  );
}
