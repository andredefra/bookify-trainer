
import { Star } from "lucide-react";

interface MobileTrainerHeaderProps {
  image: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  status: "online" | "in-session" | "offline";
}

export function MobileTrainerHeader({ 
  image, 
  name, 
  specialty, 
  rating, 
  reviews, 
  status 
}: MobileTrainerHeaderProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "online":
        return "bg-emerald-500";
      case "in-session":
        return "bg-amber-500";
      default:
        return "bg-slate-500";
    }
  };
  
  return (
    <>
      <div className="h-14 w-14 rounded-full overflow-hidden mr-3 flex-shrink-0 relative">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(status)}`}></div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-base truncate">{name}</h3>
        <p className="text-xs text-muted-foreground">{specialty}</p>
        <div className="flex items-center mt-1">
          <Star className="h-3 w-3 text-amber-500" />
          <span className="ml-1 text-xs font-medium">{rating}</span>
          <span className="ml-1 text-xs text-muted-foreground">({reviews})</span>
        </div>
      </div>
    </>
  );
}
