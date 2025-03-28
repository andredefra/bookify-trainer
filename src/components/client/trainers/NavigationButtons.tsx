
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, PlusCircle, Star, UsersRound } from "lucide-react";

interface NavigationButtonsProps {
  activeTab: "trainers" | "payments" | "marketplace" | "followed";
  onTabChange: (tab: "trainers" | "payments" | "marketplace" | "followed") => void;
}

export function NavigationButtons({ activeTab, onTabChange }: NavigationButtonsProps) {
  return (
    <div className="flex gap-2">
      {activeTab === "marketplace" || activeTab === "followed" ? (
        <Button 
          variant="outline" 
          onClick={() => onTabChange("trainers")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Trainers
        </Button>
      ) : (
        <>
          <Button 
            variant="outline" 
            onClick={() => onTabChange(
              activeTab === "trainers" 
                ? "payments" 
                : activeTab === "payments"
                ? "followed"
                : "trainers"
            )}
          >
            {activeTab === "trainers" ? (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                View Payments
              </>
            ) : activeTab === "payments" ? (
              <>
                <UsersRound className="mr-2 h-4 w-4" />
                Followed Trainers
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                View Trainers
              </>
            )}
          </Button>
          <Button 
            className="flex items-center"
            onClick={() => onTabChange("marketplace")}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Find New Trainer
          </Button>
        </>
      )}
    </div>
  );
}
