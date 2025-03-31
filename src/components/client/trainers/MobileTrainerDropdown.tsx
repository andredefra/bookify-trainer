
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface MobileTrainerDropdownProps {
  id: number;
  name: string;
  navigate: NavigateFunction;
  isFollowing: boolean;
  onFollowToggle: (id: number, name: string) => void;
  onPayClick: (trainer: string, amount: number) => void;
}

export function MobileTrainerDropdown({ 
  id, 
  name, 
  navigate, 
  isFollowing, 
  onFollowToggle, 
  onPayClick 
}: MobileTrainerDropdownProps) {
  return (
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
  );
}
