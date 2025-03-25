
import { SettingsTabContent } from "./settings/SettingsTabContent";

interface SettingsTabProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
}

export function SettingsTab({ user }: SettingsTabProps) {
  return <SettingsTabContent user={user} />;
}
