
import { FitnessAppIntegration } from "@/components/client/settings/fitness-integrations/FitnessAppIntegration";
import { Card } from "@/components/ui/card";

interface IntegrationsSectionProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    plan?: string; 
  };
}

export function IntegrationsSection({ user }: IntegrationsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Fitness App Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect with your favorite fitness apps to sync data
        </p>
      </div>
      
      <FitnessAppIntegration user={user} />
    </div>
  );
}
