
import { SettingsTabContent } from "./settings/SettingsTabContent";

interface SettingsTabProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    plan?: string; 
  };
  goals: string[];
}

export function SettingsTab({ user, goals }: SettingsTabProps) {
  return <SettingsTabContent user={user} goals={goals} />;
}
