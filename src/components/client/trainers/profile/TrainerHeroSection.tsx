
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrainerData } from "../data/trainerData";

interface TrainerHeroSectionProps {
  trainer: TrainerData;
}

export function TrainerHeroSection({ trainer }: TrainerHeroSectionProps) {
  return (
    <div className="relative">
      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
      <div className="absolute -bottom-16 left-8">
        <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
          <AvatarImage src={trainer.image} alt={trainer.name} />
          <AvatarFallback className="text-2xl">{trainer.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
