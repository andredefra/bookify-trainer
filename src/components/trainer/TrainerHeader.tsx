
import { MapPin, Star, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface TrainerHeaderProps {
  trainer: {
    profileImage: string;
    name: string;
    title: string;
    location: string;
    rating: number;
    reviews: number;
    status: string;
    nextAvailability: string;
  };
}

export const TrainerHeader = ({ trainer }: TrainerHeaderProps) => {
  const getStatusBadge = () => {
    switch (trainer.status) {
      case "online":
        return <Badge className="bg-emerald-500">Online</Badge>;
      case "in-session":
        return <Badge className="bg-amber-500">In Session</Badge>;
      case "offline":
        return <Badge className="bg-slate-500">Offline</Badge>;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (trainer.status) {
      case "online":
        return "Available now";
      case "in-session":
        return `Next available: ${trainer.nextAvailability}`;
      case "offline":
        return `Next available: ${trainer.nextAvailability}`;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-6">
        <Link 
          to="/find-trainer" 
          className="text-primary hover:underline inline-flex items-center gap-1"
        >
          ← Back to trainers
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-1">
          <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm">
            <div className="aspect-square relative">
              <img 
                src={trainer.profileImage} 
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-display font-bold tracking-tight text-primary">{trainer.name}</h1>
              {getStatusBadge()}
            </div>
            <p className="text-lg text-muted-foreground">{trainer.title}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{trainer.location}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="font-medium">{trainer.rating}</span>
              <span className="text-muted-foreground">({trainer.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{getStatusMessage()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
