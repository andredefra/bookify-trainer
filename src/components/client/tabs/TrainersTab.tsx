
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star, CreditCard, ArrowLeft } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"trainers" | "payments" | "marketplace">("trainers");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{name: string, amount: number} | null>(null);
  
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
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {activeTab === "marketplace" ? "Find New Trainer" : "My Trainers"}
            </CardTitle>
            <CardDescription>
              {activeTab === "marketplace" 
                ? "Browse trainers and book sessions" 
                : "Your personal training team"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {activeTab === "marketplace" ? (
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
                  onClick={() => setActiveTab(activeTab === "trainers" ? "payments" : "trainers")}
                >
                  {activeTab === "trainers" ? (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      View Payments
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
          <TrainersGrid trainers={myTrainers} onPayClick={handlePayTrainer} />
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
