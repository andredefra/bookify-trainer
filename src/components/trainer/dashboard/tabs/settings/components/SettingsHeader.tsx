
import React from "react";

interface SettingsHeaderProps {
  selectedSection: string;
}

export function SettingsHeader({ selectedSection }: SettingsHeaderProps) {
  const getSectionTitle = (section: string) => {
    switch (section) {
      case "profile": return "Profile";
      case "availability": return "Availability";
      case "membership": return "Membership";
      case "billing": return "Billing";
      default: return "Settings";
    }
  };

  return (
    <div className="hidden md:block mb-6">
      <h2 className="text-2xl font-bold">
        {getSectionTitle(selectedSection)}
      </h2>
      <p className="text-muted-foreground">
        Manage your {selectedSection} settings
      </p>
    </div>
  );
}
