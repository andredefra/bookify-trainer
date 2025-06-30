
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
      shortLabel: "Pay"
    }
  ];

  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-2 w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="flex items-center justify-center gap-1.5 h-9"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs font-medium">{tab.shortLabel}</span>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <Button
            key={tab.id}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className="flex items-center gap-2 h-9"
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm">{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
