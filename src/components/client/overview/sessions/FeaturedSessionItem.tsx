
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { SessionItem, SessionStatus } from "@/types/sessions";

interface FeaturedSessionItemProps {
  onRegister: (session: SessionItem) => void;
}

export function FeaturedSessionItem({ onRegister }: FeaturedSessionItemProps) {
  const featuredSession: SessionItem = {
    id: 999,
    name: "HIIT Workout",
    trainer: "Sarah Johnson",
    time: "10:00 - 11:00",
    date: "Tomorrow",
    status: "available",
    price: 35,
    attendees: 12,
    maxAttendees: 20
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg">
      <div>
        <h3 className="font-medium">{featuredSession.name}</h3>
        <div className="text-sm text-muted-foreground">
          With {featuredSession.trainer} • {featuredSession.date} • {featuredSession.time}
        </div>
        <div className="text-sm font-medium mt-1">
          €{featuredSession.price}
        </div>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <Users className="h-3.5 w-3.5 mr-1" />
          <span>{featuredSession.attendees}/{featuredSession.maxAttendees} attending</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="default" 
          size="sm" 
          className="flex items-center"
          onClick={() => onRegister(featuredSession)}
        >
          Register Now
        </Button>
      </div>
    </div>
  );
}
