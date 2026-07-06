
import { CardContent } from "@/components/ui/card";
import { TrainerMarketplace } from "./TrainerMarketplace";
import { TrainersGrid } from "./TrainersGrid";
import { PaymentsTable } from "./PaymentsTable";
import { FollowedTrainersSection } from "./FollowedTrainersSection";
import { MyTrainerExplanation } from "./MyTrainerExplanation";
import { TrainersGymFilter } from "./TrainersGymFilter";
import { useIsMobile } from "@/hooks/use-mobile";
import { getGymTrainers } from "@/data/gymTrainersMockData";

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
  allTrainers?: Trainer[];
  paymentHistory: Payment[];
  followedTrainers: number[];
  onPayClick: (trainer: string, amount: number, trainerPlan?: string) => void;
  onFollowToggle: (id: number, name: string) => void;
  onTabChange: (tab: "trainers" | "payments" | "marketplace" | "followed") => void;
  isGymFilterActive?: boolean;
  onToggleGymFilter?: () => void;
  gymConnection?: any;
}

export function TrainersTabContent({
  activeTab,
  myTrainers,
  allTrainers,
  paymentHistory,
  followedTrainers,
  onPayClick,
  onFollowToggle,
  onTabChange,
  isGymFilterActive = false,
  onToggleGymFilter,
  gymConnection
}: TrainersTabContentProps) {
  const isMobile = useIsMobile();

  // Filter trainers based on gym connection
  const getFilteredTrainers = () => {
    if (!isGymFilterActive || !gymConnection) {
      return myTrainers;
    }
    
    // Filter trainers who work at the connected gym using mock data
    const gymTrainers = getGymTrainers(gymConnection.gym_id);
    const gymTrainerIds = gymTrainers.map(t => t.id);
    return myTrainers.filter(trainer => gymTrainerIds.includes(trainer.id));
  };

  const filteredTrainers = getFilteredTrainers();
  
  // Calculate gym trainers count based on context
  const myGymTrainersCount = gymConnection ? 
    myTrainers.filter(trainer => {
      const gymTrainers = getGymTrainers(gymConnection.gym_id);
      const gymTrainerIds = gymTrainers.map(t => t.id);
      return gymTrainerIds.includes(trainer.id);
    }).length : 0;
  
  const allGymTrainersCount = gymConnection ? getGymTrainers(gymConnection.gym_id).length : 0;

  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return (
          <div className="space-y-4">
            {gymConnection && onToggleGymFilter && (
              <TrainersGymFilter
                isGymFilterActive={isGymFilterActive}
                onToggleGymFilter={onToggleGymFilter}
                gymName={gymConnection.gym_name}
                gymTrainersCount={allGymTrainersCount}
              />
            )}
            <TrainerMarketplace 
              isGymFilterActive={isGymFilterActive}
              gymId={gymConnection?.gym_id}
            />
          </div>
        );
      
      case "trainers":
        return (
          <div className="space-y-4">
            {gymConnection && onToggleGymFilter && (
              <TrainersGymFilter
                isGymFilterActive={isGymFilterActive}
                onToggleGymFilter={onToggleGymFilter}
                gymName={gymConnection.gym_name}
                gymTrainersCount={myGymTrainersCount}
              />
            )}
            <MyTrainerExplanation />
            <TrainersGrid 
              trainers={filteredTrainers} 
              onPayClick={onPayClick} 
              followedTrainers={followedTrainers}
              onFollowToggle={onFollowToggle}
            />
          </div>
        );
      
      case "followed":
        return (
          <FollowedTrainersSection 
            followedTrainers={followedTrainers}
            allTrainers={allTrainers ?? myTrainers}
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
