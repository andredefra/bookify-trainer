
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarketplaceTrainerCard } from "./MarketplaceTrainerCard";
import { MarketplaceTrainer } from "./hooks/useTrainerMarketplace";

interface TrainerListProps {
  trainers: MarketplaceTrainer[];
  onBookSession: (trainerName: string) => void;
  followedTrainers?: number[];
  onFollowToggle?: (id: number, name: string) => void;
  isMyTrainersView?: boolean;
}

export function TrainerList({ 
  trainers, 
  onBookSession, 
  followedTrainers = [],
  onFollowToggle,
  isMyTrainersView = false
}: TrainerListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-350px)] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        {trainers.map((trainer) => (
          <MarketplaceTrainerCard 
            key={trainer.id} 
            trainer={trainer} 
            onBookSession={onBookSession} 
            followedTrainers={followedTrainers}
            onFollowToggle={onFollowToggle}
            isMyTrainersView={isMyTrainersView}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
