
import { Badge } from "@/components/ui/badge";
import { Crown, Shield } from "lucide-react";

interface CurrentPlanDisplayProps {
  currentPlan: string;
}

export function CurrentPlanDisplay({ currentPlan }: CurrentPlanDisplayProps) {
  return (
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
  );
}
