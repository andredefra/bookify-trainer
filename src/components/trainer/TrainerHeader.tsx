
import { MapPin, Star, Clock, User, Award, Verified, ThumbsUp } from "lucide-react";
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
          
          {/* New enhanced section for Trainer Highlights */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4 flex items-start space-x-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Certified Trainer</h3>
                <p className="text-sm text-muted-foreground">Internationally recognized certifications</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 flex items-start space-x-3">
              <div className="bg-primary/10 rounded-full p-2">
                <Verified className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Identity Verified</h3>
                <p className="text-sm text-muted-foreground">Background checked & verified</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 flex items-start space-x-3">
              <div className="bg-primary/10 rounded-full p-2">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">80+ Clients</h3>
                <p className="text-sm text-muted-foreground">Experienced with diverse needs</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4 flex items-start space-x-3">
              <div className="bg-primary/10 rounded-full p-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">90% Success Rate</h3>
                <p className="text-sm text-muted-foreground">Clients achieve their fitness goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
