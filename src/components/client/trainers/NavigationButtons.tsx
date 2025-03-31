
import { Button } from "@/components/ui/button";
import { Users, CreditCard, Search, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationButtonsProps {
  activeTab: "trainers" | "payments" | "marketplace" | "followed";
  onTabChange: (tab: "trainers" | "payments" | "marketplace" | "followed") => void;
  isMobile?: boolean;
}

export function NavigationButtons({ 
  activeTab, 
  onTabChange,
  isMobile = false 
}: NavigationButtonsProps) {
  if (isMobile) {
    return (
      <div className="flex justify-between w-full">
        <Button
          variant={activeTab === "trainers" ? "default" : "outline"}
          size="sm"
          className="flex-1"
          onClick={() => onTabChange("trainers")}
        >
          <Users className="h-4 w-4 mr-1" />
          My Trainers
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-2">
              More
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onTabChange("followed")}>
              <Star className="h-4 w-4 mr-2" />
              Followed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTabChange("marketplace")}>
              <Search className="h-4 w-4 mr-2" />
              Find Trainers
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onTabChange("payments")}>
              <CreditCard className="h-4 w-4 mr-2" />
              Payments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant={activeTab === "trainers" ? "default" : "outline"}
        size="sm"
        onClick={() => onTabChange("trainers")}
      >
        <Users className="h-4 w-4 mr-2" />
        My Trainers
      </Button>
      <Button
        variant={activeTab === "followed" ? "default" : "outline"}
        size="sm"
        onClick={() => onTabChange("followed")}
      >
        <Star className="h-4 w-4 mr-2" />
        Followed
      </Button>
      <Button
        variant={activeTab === "marketplace" ? "default" : "outline"}
        size="sm"
        onClick={() => onTabChange("marketplace")}
      >
        <Search className="h-4 w-4 mr-2" />
        Find Trainers
      </Button>
      <Button
        variant={activeTab === "payments" ? "default" : "outline"}
        size="sm"
        onClick={() => onTabChange("payments")}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Payments
      </Button>
    </div>
  );
}
