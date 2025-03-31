
import { useNavigate } from "react-router-dom";
import { Star, DollarSign, UserPlus, UserMinus, Circle, MessageSquare, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface MobileTrainerCardProps {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  status?: "online" | "in-session" | "offline";
  onPayClick: (trainer: string, amount: number) => void;
  isFollowing: boolean;
  onFollowToggle: (id: number, name: string) => void;
}

export function MobileTrainerCard({ 
  id, 
  name, 
  specialty, 
  rating, 
  reviews, 
  image, 
  status = "offline",
  onPayClick,
  isFollowing,
  onFollowToggle
}: MobileTrainerCardProps) {
  const navigate = useNavigate();

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
    <Card className="overflow-hidden">
      <div className="flex items-center p-3">
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => navigate(`/trainer/${id}`)}>
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFollowToggle(id, name)}>
              {isFollowing ? "Unfollow" : "Follow"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPayClick(name, (id === 1) ? 45 : 50)}>
              Make Payment
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/client-dashboard?tab=messages')}>
              Message
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="px-3 pb-3 grid grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => navigate(`/trainer/${id}`)}
        >
          Profile
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => navigate('/client-dashboard?tab=messages')}
        >
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          Chat
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onPayClick(name, (id === 1) ? 45 : 50)}
        >
          <DollarSign className="h-3.5 w-3.5 mr-1" />
          Pay
        </Button>
      </div>
    </Card>
  );
}
