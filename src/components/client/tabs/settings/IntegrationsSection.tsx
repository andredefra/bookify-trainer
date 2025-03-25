
import { FitnessAppIntegration } from "@/components/client/settings/FitnessAppIntegration";

interface IntegrationsSectionProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    plan?: string; 
  };
}

export function IntegrationsSection({ user }: IntegrationsSectionProps) {
  return <FitnessAppIntegration user={user} />;
}
