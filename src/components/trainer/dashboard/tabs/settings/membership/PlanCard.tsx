import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Plan } from "./types";

interface PlanProps extends Plan {
  currentPlan: string;
  onSelectPlan: (planId: string) => void;
}

export function PlanCard({
  id,
  name,
  price,
  period,
  description,
  features,
  limitations,
  isPopular,
  icon: Icon,
  currentPlan,
  onSelectPlan
}: PlanProps) {
  const isActive = currentPlan === id;

  return (
    <Card className={`p-4 flex flex-col h-full border ${isPopular ? 'border-primary shadow-sm' : ''} ${isActive ? 'bg-primary/5' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <Icon className={`h-5 w-5 mr-2 ${isPopular ? 'text-amber-500' : 'text-primary'}`} />
          <h3 className="font-medium">{name}</h3>
        </div>
        {isPopular && (
          <Badge className="bg-primary text-primary-foreground">Popular</Badge>
        )}
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold">{price} <span className="text-sm font-normal text-muted-foreground">{period}</span></div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <div className="mt-auto">
        <div className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
          
          {limitations.map((limitation, index) => (
            <div key={index} className="flex items-start">
              <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
              <span className="text-sm">{limitation}</span>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full mt-auto" 
          variant={isActive ? "outline" : "default"}
          disabled={isActive}
          onClick={() => onSelectPlan(id)}
        >
          {isActive ? "Current Plan" : "Select Plan"}
        </Button>
      </div>
    </Card>
  );
}
