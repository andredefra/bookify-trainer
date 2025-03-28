
import { SettingsTabContent } from "./settings/SettingsTabContent";

interface SettingsTabProps {
  user: {
    email: string;
    type: string;
    name?: string;
    plan?: string;
  };
  goals: string[];
  activeSection?: string;
}

export function SettingsTab({ user, goals, activeSection }: SettingsTabProps) {
  return (
    <SettingsTabContent user={user} goals={goals} activeSection={activeSection} />
  );
}
