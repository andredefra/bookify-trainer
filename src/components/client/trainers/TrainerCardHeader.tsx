
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
          glowClass: "shadow-emerald-500/20"
        };
      case "in-session":
        return {
          color: "bg-amber-500 text-white border-amber-500",
          text: "In Session",
          dotColor: "fill-white text-white",
          glowClass: "shadow-amber-500/20"
        };
      default:
        return {
          color: "bg-slate-500 text-white border-slate-500",
          text: "Offline",
          dotColor: "fill-white text-white",
          glowClass: "shadow-slate-500/20"
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  
  return (
    <div className="relative aspect-[5/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      <img 
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
      <div className="absolute top-2 right-2 z-10">
        <Badge 
          variant="secondary" 
          className={`flex items-center gap-1 px-2 py-1 shadow-sm ${statusConfig.color} ${statusConfig.glowClass} backdrop-blur-sm text-xs font-medium whitespace-nowrap`}
        >
          <Circle className={`h-1.5 w-1.5 ${statusConfig.dotColor} animate-pulse shrink-0`} />
          <span className="text-xs">{statusConfig.text}</span>
        </Badge>
      </div>
    </div>
  );
}
