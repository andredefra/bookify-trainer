
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTrainerPlan } from "@/context/TrainerPlanContext";

interface SettingsSidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

export function SettingsSidebar({ selectedSection, setSelectedSection }: SettingsSidebarProps) {
  const plan = useTrainerPlan();

  const allSections = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "public-profile", label: "My Public Profile", icon: "🌟" },
    { id: "availability", label: "Availability", icon: "📅" },
    { id: "my-gyms", label: "My Studio or Gym", icon: "🏢" },
    { id: "payment-settings", label: "Payment Settings", icon: "💰" },
    { id: "invoicing", label: "Invoicing", icon: "🧾" },
    { id: "ai-features", label: "AI Features", icon: "🤖" },
    { id: "membership", label: "Membership", icon: "⭐" },
    { id: "billing", label: "Billing", icon: "💳" }
  ];

  // Basic: no Installment Plans, no Payment Reminders (part of Payment Settings),
  //        no Invoicing. Essential: no Invoicing.
  const planExcludes: Record<string, string[]> = {
    basic: ["payment-settings", "invoicing"],
    essential: ["invoicing"],
    pro: [],
  };
  const excluded = planExcludes[plan] || [];
  const sections = allSections.filter((s) => !excluded.includes(s.id));

  // If the currently selected section was filtered out, fall back to profile.
  useEffect(() => {
    if (!sections.find((s) => s.id === selectedSection)) {
      setSelectedSection("profile");
    }
  }, [plan, selectedSection, sections, setSelectedSection]);

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
