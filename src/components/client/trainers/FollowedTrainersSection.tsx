
import { Button } from "@/components/ui/button";
import { UsersRound } from "lucide-react";
import { TrainersGrid } from "./TrainersGrid";

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
}

interface FollowedTrainersSectionProps {
  followedTrainers: number[];
  allTrainers: Trainer[];
  onPayClick: (trainer: string, amount: number, trainerPlan?: string) => void;
  onFollowToggle: (id: number, name: string) => void;
  onBrowseTrainers: () => void;
}

export function FollowedTrainersSection({
  followedTrainers,
  allTrainers,
  onPayClick,
  onFollowToggle,
  onBrowseTrainers
}: FollowedTrainersSectionProps) {
  const filteredTrainers = allTrainers.filter(trainer => followedTrainers.includes(trainer.id));
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">What does following a trainer do?</h3>
        <p className="text-sm text-muted-foreground">
          When you follow trainers, you'll see their group events and promotions in your feed even if you're not directly 
          invited. This helps you discover new training opportunities and stay connected with trainers you're interested in.
        </p>
      </div>
      
      {followedTrainers.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
          <UsersRound className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-center">You're not following any trainers yet</h3>
          <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
            Follow trainers to see their group events and sessions
          </p>
          <Button onClick={onBrowseTrainers}>
            Browse Trainers
          </Button>
        </div>
      ) : (
        <TrainersGrid 
          trainers={filteredTrainers} 
          onPayClick={onPayClick}
          followedTrainers={followedTrainers}
          onFollowToggle={onFollowToggle}
        />
      )}
    </div>
  );
}
