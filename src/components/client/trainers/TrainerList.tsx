
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarketplaceTrainerCard } from "./MarketplaceTrainerCard";

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  availability: string;
  image: string;
}

interface TrainerListProps {
  trainers: Trainer[];
  onBookSession: (trainerName: string) => void;
}

export function TrainerList({ trainers, onBookSession }: TrainerListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-350px)] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        {trainers.map((trainer) => (
          <MarketplaceTrainerCard 
            key={trainer.id} 
            trainer={trainer} 
            onBookSession={onBookSession} 
          />
        ))}
      </div>
    </ScrollArea>
  );
}
