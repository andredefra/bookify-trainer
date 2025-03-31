
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CreditCard } from "lucide-react";
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
  
  const handleRegisterClick = () => {
    // Explicitly call onRegister with the session
    console.log("Register button clicked for featured session");
    onRegister(featuredSession);
  };
  
  // Format date if it's a Date object
  const formattedDate = featuredSession.date instanceof Date 
    ? featuredSession.date.toLocaleDateString() 
    : featuredSession.date;
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg">
      <div>
        <h3 className="font-medium">{featuredSession.name}</h3>
        <div className="text-sm text-muted-foreground">
          With {featuredSession.trainer} • {formattedDate} • {featuredSession.time}
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
          variant="secondary" 
          size="sm" 
          className="flex items-center" 
          onClick={handleRegisterClick}
        >
          <CreditCard className="h-3.5 w-3.5 mr-1" />
          Register
        </Button>
      </div>
    </div>
  );
}
