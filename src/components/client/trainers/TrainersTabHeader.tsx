
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { NavigationButtons } from "./NavigationButtons";
import { useIsMobile } from "@/hooks/use-mobile";

interface TrainersTabHeaderProps {
  activeTab: "trainers" | "payments" | "marketplace" | "followed";
  onTabChange: (tab: "trainers" | "payments" | "marketplace" | "followed") => void;
}

export function TrainersTabHeader({ activeTab, onTabChange }: TrainersTabHeaderProps) {
  const isMobile = useIsMobile();

  const getHeaderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return {
          title: "Find New Trainer",
          description: "Browse trainers and book sessions"
        };
      case "followed":
        return {
          title: "Followed Trainers", 
          description: "Trainers you follow and their group events"
        };
      case "payments":
        return {
          title: "Payment History",
          description: "View your past payments to trainers"
        };
      default:
        return {
          title: "My Trainers",
          description: "Your personal training team"
        };
    }
  };

  const { title, description } = getHeaderContent();

  return (
    <CardHeader>
      <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <NavigationButtons 
          activeTab={activeTab} 
          onTabChange={onTabChange}
          isMobile={isMobile}
        />
      </div>
    </CardHeader>
  );
}
