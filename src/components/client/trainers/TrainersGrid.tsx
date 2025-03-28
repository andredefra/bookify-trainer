
import { TrainerCard } from "./TrainerCard";

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
}

interface TrainersGridProps {
  trainers: Trainer[];
  onPayClick: (trainer: string, amount: number) => void;
  followedTrainers: number[];
  onFollowToggle: (id: number, name: string) => void;
}

export function TrainersGrid({ trainers, onPayClick, followedTrainers, onFollowToggle }: TrainersGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          id={trainer.id}
          name={trainer.name}
          specialty={trainer.specialty}
          rating={trainer.rating}
          reviews={trainer.reviews}
          image={trainer.image}
          onPayClick={onPayClick}
          isFollowing={followedTrainers.includes(trainer.id)}
          onFollowToggle={onFollowToggle}
        />
      ))}
    </div>
  );
}
