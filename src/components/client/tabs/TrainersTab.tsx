
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star, CreditCard, ArrowLeft, UsersRound } from "lucide-react";
import { toast } from "sonner";
import { PaymentDialog } from "@/components/shared/PaymentDialog";
import { TrainerMarketplace } from "@/components/client/trainers/TrainerMarketplace";
import { TrainersGrid } from "@/components/client/trainers/TrainersGrid";
import { PaymentsTable } from "@/components/client/trainers/PaymentsTable";

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
  const [activeTab, setActiveTab] = useState<"trainers" | "payments" | "marketplace" | "followed">("trainers");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{name: string, amount: number} | null>(null);
  const [followedTrainers, setFollowedTrainers] = useState<number[]>([]);
  
  // Load followed trainers from localStorage on component mount
  useEffect(() => {
    const storedFollowedTrainers = localStorage.getItem('followedTrainers');
    if (storedFollowedTrainers) {
      setFollowedTrainers(JSON.parse(storedFollowedTrainers));
    } else {
      // If no followed trainers in localStorage, automatically follow my trainers
      const myTrainerIds = myTrainers.map(trainer => trainer.id);
      setFollowedTrainers(myTrainerIds);
      localStorage.setItem('followedTrainers', JSON.stringify(myTrainerIds));
    }
  }, []);

  // Save followed trainers to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('followedTrainers', JSON.stringify(followedTrainers));
  }, [followedTrainers]);
  
  const handlePayTrainer = (trainer: string, amount: number = 45) => {
    setSelectedTrainer({ name: trainer, amount });
    setShowPaymentDialog(true);
  };

  const handlePaymentComplete = () => {
    if (selectedTrainer) {
      toast.success(`Payment to ${selectedTrainer.name} completed successfully`);
    }
    setShowPaymentDialog(false);
  };

  const handleFollowToggle = (trainerId: number, trainerName: string) => {
    if (followedTrainers.includes(trainerId)) {
      // Unfollow
      setFollowedTrainers(followedTrainers.filter(id => id !== trainerId));
      toast.success(`You have unfollowed ${trainerName}`);
    } else {
      // Follow
      setFollowedTrainers([...followedTrainers, trainerId]);
      toast.success(`You are now following ${trainerName}. You'll see their group events in your feed.`);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {activeTab === "marketplace" ? "Find New Trainer" : 
               activeTab === "followed" ? "Followed Trainers" : 
               "My Trainers"}
            </CardTitle>
            <CardDescription>
              {activeTab === "marketplace" 
                ? "Browse trainers and book sessions" 
                : activeTab === "followed"
                ? "Trainers you follow and their group events"
                : "Your personal training team"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {activeTab === "marketplace" || activeTab === "followed" ? (
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("trainers")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Trainers
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab(
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
                  onClick={() => setActiveTab("marketplace")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Find New Trainer
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">What does following a trainer do?</h3>
              <p className="text-sm text-muted-foreground">
                When you follow trainers, you'll see their group events and promotions in your feed even if you're not directly 
                invited. This helps you discover new training opportunities and stay connected with trainers you're interested in.
              </p>
            </div>
            
            {followedTrainers.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
                <UsersRound className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-medium text-center">You're not following any trainers yet</h3>
                <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                  Follow trainers to see their group events and sessions
                </p>
                <Button onClick={() => setActiveTab("marketplace")}>
                  Browse Trainers
                </Button>
              </div>
            ) : (
              <TrainersGrid 
                trainers={myTrainers.filter(trainer => followedTrainers.includes(trainer.id))} 
                onPayClick={handlePayTrainer}
                followedTrainers={followedTrainers}
                onFollowToggle={handleFollowToggle}
              />
            )}
          </div>
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
            name: `Training Session with ${selectedTrainer.name}`,
            price: selectedTrainer.amount,
            description: "Personal training session payment"
          }}
          onPaymentComplete={handlePaymentComplete}
          title={`Pay ${selectedTrainer.name}`}
          description="Complete payment for personal training services"
        />
      )}
    </Card>
  );
}
