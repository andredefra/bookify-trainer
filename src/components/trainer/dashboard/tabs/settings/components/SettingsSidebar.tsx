
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SettingsSidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

export function SettingsSidebar({ selectedSection, setSelectedSection }: SettingsSidebarProps) {
  const sections = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "availability", label: "Availability", icon: "📅" },
    { id: "membership", label: "Membership", icon: "🌟" },
    { id: "invoicing", label: "Invoicing", icon: "📄" },
    { id: "billing", label: "Billing", icon: "💳" }
  ];

  return (
    <div className="w-full md:w-64 border-r bg-muted/20">
      <ScrollArea className="h-full max-h-[calc(100vh-12rem)]">
        <nav className="flex flex-col divide-y divide-border">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${
                selectedSection === section.id
                  ? "bg-primary/5 text-primary" 
                  : ""
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3">{section.icon}</span>
                <span>{section.label}</span>
              </div>
              <ChevronRight className={`h-4 w-4 ml-auto ${selectedSection === section.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
