
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

interface TrainerCardHeaderProps {
  image: string;
  name: string;
  status: "online" | "in-session" | "offline";
}

export function TrainerCardHeader({ image, name, status }: TrainerCardHeaderProps) {
  const getStatusConfig = (status: string) => {
    switch(status) {
      case "online":
        return {
          color: "bg-emerald-500 text-white border-emerald-500",
          text: "Available",
          dotColor: "fill-white text-white",
          glowClass: "shadow-emerald-500/30"
        };
      case "in-session":
        return {
          color: "bg-amber-500 text-white border-amber-500",
          text: "In Session",
          dotColor: "fill-white text-white",
          glowClass: "shadow-amber-500/30"
        };
      default:
        return {
          color: "bg-slate-500 text-white border-slate-500",
          text: "Offline",
          dotColor: "fill-white text-white",
          glowClass: "shadow-slate-500/30"
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  
  return (
    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
      <img 
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      <div className="absolute top-3 right-3">
        <Badge 
          variant="secondary" 
          className={`flex items-center gap-1.5 px-3 py-1.5 shadow-lg ${statusConfig.color} ${statusConfig.glowClass} backdrop-blur-sm`}
        >
          <Circle className={`h-2 w-2 ${statusConfig.dotColor} animate-pulse`} />
          <span className="text-xs font-semibold">{statusConfig.text}</span>
        </Badge>
      </div>
    </div>
  );
}
