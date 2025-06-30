
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Search, CreditCard, Heart } from "lucide-react";

interface NavigationButtonsProps {
  activeTab: "trainers" | "payments" | "marketplace" | "followed";
  onTabChange: (tab: "trainers" | "payments" | "marketplace" | "followed") => void;
  isMobile: boolean;
}

export function NavigationButtons({ activeTab, onTabChange, isMobile }: NavigationButtonsProps) {
  const tabs = [
    { 
      id: "trainers" as const, 
      label: "My Trainers", 
      icon: Users, 
      shortLabel: "Mine"
    },
    { 
      id: "followed" as const, 
      label: "Followed", 
      icon: Heart, 
      shortLabel: "Following"
    },
    { 
      id: "marketplace" as const, 
      label: "Find Trainers", 
      icon: Search, 
      shortLabel: "Find"
    },
    { 
      id: "payments" as const, 
      label: "Payments", 
      icon: CreditCard, 
      shortLabel: "Payments"
    }
  ];

  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-2 w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="flex-1 min-w-0"
            >
              <Icon className="h-3.5 w-3.5 mr-1.5 shrink-0" />
              <span className="truncate text-xs">{tab.shortLabel}</span>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <Button
            key={tab.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
