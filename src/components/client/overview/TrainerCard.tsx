
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { PaymentDialog } from "@/components/shared/PaymentDialog";
import { TrainerItem } from "./trainers/TrainerItem";
import { BookSessionDialog } from "./trainers/BookSessionDialog";
import { z } from "zod";
import { bookingSchema } from "@/components/trainer/BookingForm";

export function TrainerCard() {
  const navigate = useNavigate();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  
  // Mock user plan - in a real app, this would come from your user context or state
  const userPlan = localStorage.getItem('user-plan') || "freemium";
  
  const handleBookSession = (trainerName: string) => {
    setSelectedTrainer(trainerName);
    setShowBookingDialog(true);
  };
  
  const handlePayTrainer = (trainerName: string) => {
    setSelectedTrainer(trainerName);
    setShowPaymentDialog(true);
  };
  
  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast.success(`Session booked successfully with ${selectedTrainer} for ${data.date.toLocaleDateString()} at ${data.time}`);
    setShowBookingDialog(false);
  };
  
  const handlePaymentComplete = () => {
    toast.success(`Payment to ${selectedTrainer} completed successfully`);
    setShowPaymentDialog(false);
  };
  
  const handleMessageTrainer = (trainerName: string) => {
    navigate('/client-dashboard?tab=messages');
    toast.success(`Opening chat with ${trainerName}`);
  };

  const trainersData = [
    {
      name: "Sarah Johnson",
      specialty: "Personal Trainer",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop"
    },
    {
      name: "Alex Thompson",
      specialty: "HIIT Specialist",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
    }
  ];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>My Trainers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trainersData.map((trainer, index) => (
            <TrainerItem
              key={index}
              name={trainer.name}
              specialty={trainer.specialty}
              image={trainer.image}
              onMessageClick={() => handleMessageTrainer(trainer.name)}
              onPayClick={() => handlePayTrainer(trainer.name)}
              onBookClick={() => handleBookSession(trainer.name)}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t flex flex-col sm:flex-row justify-between gap-2 py-4">
        <Button 
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => navigate('/client-dashboard', { 
            state: { 
              activeTab: "trainers"
            } 
          })}
        >
          View All Trainers
        </Button>
        <Button 
          variant="link" 
          className="w-full sm:w-auto"
          onClick={() => navigate('/client-dashboard', { 
            state: { 
              activeTab: "trainers", 
              discoverTrainers: true 
            } 
          })}
        >
          Find more trainers
        </Button>
      </CardFooter>
      
      {/* Session Booking Dialog */}
      <BookSessionDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        selectedTrainer={selectedTrainer}
        onSubmit={handleBookingSubmit}
      />
      
      {/* Payment Dialog */}
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        item={{
          id: `trainer-payment-${Date.now()}`,
          name: `Payment to ${selectedTrainer}`,
          price: 45,
          description: "Direct payment for trainer services",
          reference: "Direct Payment"
        }}
        onPaymentComplete={handlePaymentComplete}
        title={`Pay ${selectedTrainer}`}
        description="Complete payment for trainer services"
        isPremiumFeature={true}
        userPlan={userPlan}
      />
    </Card>
  );
}
