
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

interface TrainerCardHeaderProps {
  image: string;
  name: string;
  status: "online" | "in-session" | "offline";
}

export function TrainerCardHeader({ image, name, status }: TrainerCardHeaderProps) {
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

  const getStatusText = (status: string) => {
    switch(status) {
      case "online":
        return "Available";
      case "in-session":
        return "In Session";
      default:
        return "Offline";
    }
  };
  
  return (
    <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
      <img 
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2">
        <Badge 
          variant="secondary" 
          className={`flex items-center gap-1.5 px-2 py-1 ${getStatusColor(status)} text-white`}
        >
          <Circle className="h-2 w-2 fill-white text-white" />
          <span className="text-xs font-medium">{getStatusText(status)}</span>
        </Badge>
      </div>
    </div>
  );
}
