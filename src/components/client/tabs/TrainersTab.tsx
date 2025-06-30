
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { PaymentDialog } from "@/components/shared/PaymentDialog";
import { TrainerMarketplace } from "@/components/client/trainers/TrainerMarketplace";
import { TrainersGrid } from "@/components/client/trainers/TrainersGrid";
import { PaymentsTable } from "@/components/client/trainers/PaymentsTable";
import { useFollowedTrainers } from "@/components/client/trainers/hooks/useFollowedTrainers";
import { FollowedTrainersSection } from "@/components/client/trainers/FollowedTrainersSection";
import { NavigationButtons } from "@/components/client/trainers/NavigationButtons";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for payment history
const paymentHistory = [
  { id: 1, trainer: "Sarah Johnson", amount: 50, date: "2023-06-15", type: "Session" },
  { id: 2, trainer: "Sarah Johnson", amount: 45, date: "2023-06-08", type: "Session" },
  { id: 3, trainer: "Alex Thompson", amount: 120, date: "2023-06-01", type: "Program" },
];

// Mock data for trainers
const myTrainers = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    specialty: "Personal Trainer", 
    rating: 4.9, 
    reviews: 48,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop"
  },
  { 
    id: 2, 
    name: "Alex Thompson", 
    specialty: "HIIT Specialist", 
    rating: 4.7, 
    reviews: 32,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
  }
];

export function TrainersTab() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<"trainers" | "payments" | "marketplace" | "followed">("trainers");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{name: string, amount: number} | null>(null);
  
  // Force myTrainers to be included in the default trainers
  const { followedTrainers, handleFollowToggle } = useFollowedTrainers(myTrainers);
  
  // Mock user plan - in a real app, this would come from your user context or state
  const userPlan = localStorage.getItem('user-plan') || "freemium";
  
  // Check if we should show the marketplace tab based on navigation state
  useEffect(() => {
    if (location.state?.discoverTrainers) {
      setActiveTab("marketplace");
    }
  }, [location.state]);
  
  // Add explicit logs for debugging
  console.log("myTrainers in TrainersTab:", myTrainers.map(t => `${t.id} - ${t.name}`));
  console.log("followedTrainers in TrainersTab:", followedTrainers);
  
  // Force initialization of followedTrainers with myTrainers on component mount
  useEffect(() => {
    if (followedTrainers.length === 0) {
      const trainerIds = myTrainers.map(trainer => trainer.id);
      localStorage.setItem('followedTrainers', JSON.stringify(trainerIds));
    }
  }, [followedTrainers]);
  
  const handlePayTrainer = (trainer: string, amount: number = 45) => {
    setSelectedTrainer({ name: trainer, amount });
    setShowPaymentDialog(true);
  };

  const handlePaymentComplete = () => {
    if (selectedTrainer) {
      toast({
        title: "Payment Complete",
        description: `Payment to ${selectedTrainer.name} completed successfully`,
        variant: "default",
      });
    }
    setShowPaymentDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center justify-between'}`}>
          <div>
            <CardTitle>
              {activeTab === "marketplace" ? "Find New Trainer" : 
               activeTab === "followed" ? "Followed Trainers" : 
               activeTab === "payments" ? "Payment History" :
               "My Trainers"}
            </CardTitle>
            <CardDescription>
              {activeTab === "marketplace" 
                ? "Browse trainers and book sessions" 
                : activeTab === "followed"
                ? "Trainers you follow and their group events"
                : activeTab === "payments"
                ? "View your past payments to trainers"
                : "Your personal training team"}
            </CardDescription>
          </div>
          <NavigationButtons 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            isMobile={isMobile}
          />
        </div>
      </CardHeader>
      <CardContent className={isMobile ? "px-3 sm:px-6" : undefined}>
        {activeTab === "marketplace" ? (
          <TrainerMarketplace />
        ) : activeTab === "trainers" ? (
          <TrainersGrid 
            trainers={myTrainers} 
            onPayClick={handlePayTrainer} 
            followedTrainers={followedTrainers}
            onFollowToggle={handleFollowToggle}
          />
        ) : activeTab === "followed" ? (
          <FollowedTrainersSection 
            followedTrainers={followedTrainers}
            allTrainers={myTrainers}
            onPayClick={handlePayTrainer}
            onFollowToggle={handleFollowToggle}
            onBrowseTrainers={() => setActiveTab("marketplace")}
          />
        ) : (
          <PaymentsTable payments={paymentHistory} />
        )}
      </CardContent>
      
      {/* Payment Dialog */}
      {selectedTrainer && (
        <PaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          item={{
            id: `trainer-payment-${Date.now()}`,
            name: `Payment to ${selectedTrainer.name}`,
            price: selectedTrainer.amount,
            description: "Direct payment for trainer services",
            reference: "Direct Payment"
          }}
          onPaymentComplete={handlePaymentComplete}
          title={`Pay ${selectedTrainer.name}`}
          description="Complete payment for trainer services"
          isPremiumFeature={true}
          userPlan={userPlan}
        />
      )}
    </Card>
  );
}
