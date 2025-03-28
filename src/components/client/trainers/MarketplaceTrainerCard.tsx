
import { Star, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrainerCardProps {
  trainer: {
    id: string;
    name: string;
    specialty: string;
    location: string;
    rating: number;
    reviews: number;
    price: string;
    availability: string;
    image: string;
  };
  onBookSession: (trainerName: string) => void;
}

export function MarketplaceTrainerCard({ trainer, onBookSession }: TrainerCardProps) {
  return (
    <div className="bg-background rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div 
          className="h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${trainer.image})` }}
        ></div>
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{trainer.name}</h3>
              <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              {trainer.price}/session
            </Badge>
          </div>
          
          <div className="flex items-center mt-2 text-sm">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{trainer.location}</span>
          </div>
          
          <div className="flex items-center mt-2 text-sm">
            <Star className="h-4 w-4 mr-1 text-amber-500" />
            <span>{trainer.rating}</span>
            <span className="text-muted-foreground ml-1">({trainer.reviews} reviews)</span>
          </div>
          
          <div className="mt-2 flex items-center text-sm text-emerald-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{trainer.availability}</span>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => onBookSession(trainer.name)}
            >
              Book Session
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
