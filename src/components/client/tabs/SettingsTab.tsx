
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
    <div className="space-y-4">
      <SettingsTabContent user={user} goals={goals} activeSection={activeSection} />
    </div>
  );
}
