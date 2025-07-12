
import { CardContent } from "@/components/ui/card";
import { TrainerMarketplace } from "./TrainerMarketplace";
import { TrainersGrid } from "./TrainersGrid";
import { PaymentsTable } from "./PaymentsTable";
import { FollowedTrainersSection } from "./FollowedTrainersSection";
import { MyTrainerExplanation } from "./MyTrainerExplanation";
import { useIsMobile } from "@/hooks/use-mobile";

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  status?: "online" | "in-session" | "offline";
  hourlyRate?: number;
  nextAvailability?: string;
  location?: string;
  plan?: string;
  education?: string;
  bio?: string;
  certifications?: string[];
  specialties?: string[];
  experience?: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  availability?: {
    monday?: string[];
    tuesday?: string[];
    wednesday?: string[];
    thursday?: string[];
    friday?: string[];
    saturday?: string[];
    sunday?: string[];
  };
}

interface Payment {
  id: number;
  trainer: string;
  amount: number;
  date: string;
  type: string;
}

interface TrainersTabContentProps {
  activeTab: "trainers" | "payments" | "marketplace" | "followed";
  myTrainers: Trainer[];
  paymentHistory: Payment[];
  followedTrainers: number[];
  onPayClick: (trainer: string, amount: number, trainerPlan?: string) => void;
  onFollowToggle: (id: number, name: string) => void;
  onTabChange: (tab: "trainers" | "payments" | "marketplace" | "followed") => void;
}

export function TrainersTabContent({
  activeTab,
  myTrainers,
  paymentHistory,
  followedTrainers,
  onPayClick,
  onFollowToggle,
  onTabChange
}: TrainersTabContentProps) {
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return <TrainerMarketplace />;
      
      case "trainers":
        return (
          <>
            <MyTrainerExplanation />
            <TrainersGrid 
              trainers={myTrainers} 
              onPayClick={onPayClick} 
              followedTrainers={followedTrainers}
              onFollowToggle={onFollowToggle}
            />
          </>
        );
      
      case "followed":
        return (
          <FollowedTrainersSection 
            followedTrainers={followedTrainers}
            allTrainers={myTrainers}
            onPayClick={onPayClick}
            onFollowToggle={onFollowToggle}
            onBrowseTrainers={() => onTabChange("marketplace")}
          />
        );
      
      case "payments":
        return <PaymentsTable payments={paymentHistory} />;
      
      default:
        return null;
    }
  };

  return (
    <CardContent className={`space-y-4 ${isMobile ? "px-3 sm:px-6" : ""}`}>
      {renderContent()}
    </CardContent>
  );
}
