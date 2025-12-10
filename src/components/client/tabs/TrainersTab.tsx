
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { PaymentDialog } from "@/components/shared/PaymentDialog";
import { useFollowedTrainers } from "@/components/client/trainers/hooks/useFollowedTrainers";
import { TrainersTabHeader } from "@/components/client/trainers/TrainersTabHeader";
import { TrainersTabContent } from "@/components/client/trainers/TrainersTabContent";
import { useLocation } from "react-router-dom";
import { useGymConnection } from "@/hooks/useGymConnection";

// Mock data for payment history
const paymentHistory = [
  { id: 1, trainer: "Sarah Johnson", amount: 50, date: "2023-06-15", type: "Session", invoiceSent: true },
  { id: 2, trainer: "Sarah Johnson", amount: 45, date: "2023-06-08", type: "Session", invoiceSent: false },
  { id: 3, trainer: "Alex Thompson", amount: 120, date: "2023-06-01", type: "Program", invoiceSent: true, refundStatus: 'pending' as const },
];

const myTrainers = [
  { 
    id: 1, 
    name: "Sarah Johnson", 
    specialty: "Personal Trainer", 
    rating: 4.9, 
    reviews: 124,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop",
    status: "in-session" as const,
    hourlyRate: 50,
    nextAvailability: "Today at 4:00 PM",
    location: "New York, NY",
    plan: "pro",
    education: "Bachelor's in Exercise Science, University of California",
    bio: "Dedicated fitness professional with 8+ years of experience helping clients achieve their health and fitness goals. Specialized in strength training, weight loss, and nutrition coaching.",
    certifications: ["NASM CPT", "ACE Nutrition Specialist", "Precision Nutrition Level 1"],
    specialties: ["Strength Training", "HIIT", "Weight Loss", "Nutrition"],
    experience: [
      {
        title: "Senior Personal Trainer",
        company: "FitLife Gym",
        period: "2019 - Present",
        description: "Working with 20+ clients weekly on personalized fitness programs."
      },
      {
        title: "Fitness Instructor",
        company: "Urban Health Club",
        period: "2016 - 2019",
        description: "Led group fitness classes and provided one-on-one training."
      }
    ],
    availability: {
      monday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      tuesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      wednesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      friday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
      saturday: ["10:00 AM - 2:00 PM"],
      sunday: []
    }
  },
  { 
    id: 2, 
    name: "Alex Thompson", 
    specialty: "HIIT Specialist", 
    rating: 4.7, 
    reviews: 98,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop",
    status: "online" as const,
    hourlyRate: 45,
    nextAvailability: "Available now",
    location: "Los Angeles, CA",
    plan: "freemium",
    education: "Master's in Kinesiology, UCLA",
    bio: "High-energy trainer focused on HIIT and cardiovascular fitness. I believe in pushing limits while maintaining proper form and safety. Specialized in helping clients break through plateaus.",
    certifications: ["CrossFit Level 2", "HIIT Certified", "First Aid CPR"],
    specialties: ["HIIT", "CrossFit", "Cardio", "Agility Training"],
    experience: [
      {
        title: "HIIT Specialist",
        company: "Elite Fitness Center",
        period: "2020 - Present",
        description: "Leading high-intensity interval training classes and personal sessions."
      },
      {
        title: "CrossFit Coach",
        company: "CrossFit Downtown",
        period: "2018 - 2020",
        description: "Coached athletes in Olympic lifting and functional movements."
      }
    ],
    availability: {
      monday: ["5:00 AM - 7:00 PM"],
      tuesday: ["5:00 AM - 7:00 PM"],
      wednesday: ["6:00 AM - 8:00 PM"],
      thursday: ["5:00 AM - 7:00 PM"],
      friday: ["5:00 AM - 6:00 PM"],
      saturday: ["8:00 AM - 4:00 PM"],
      sunday: ["9:00 AM - 3:00 PM"]
    }
  }
];

export function TrainersTab() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"trainers" | "payments" | "marketplace" | "followed">("trainers");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{name: string, amount: number, plan?: string} | null>(null);
  const [isGymFilterActive, setIsGymFilterActive] = useState(false);
  
  const { followedTrainers, handleFollowToggle } = useFollowedTrainers(myTrainers);
  const { connection: gymConnection } = useGymConnection();
  const userPlan = localStorage.getItem('user-plan') || "freemium";
  
  // Check if we should show the marketplace tab based on navigation state
  useEffect(() => {
    if (location.state?.discoverTrainers) {
      setActiveTab("marketplace");
    }
  }, [location.state]);
  
  useEffect(() => {
    if (followedTrainers.length === 0) {
      const trainerIds = myTrainers.map(trainer => trainer.id);
      localStorage.setItem('followedTrainers', JSON.stringify(trainerIds));
    }
  }, [followedTrainers]);
  
  const handlePayTrainer = (trainer: string, amount: number = 45, trainerPlan: string = "freemium") => {
    setSelectedTrainer({ name: trainer, amount, plan: trainerPlan });
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
    <div className="space-y-6">
      <Card>
        <TrainersTabHeader 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <TrainersTabContent
          activeTab={activeTab}
          myTrainers={myTrainers}
          paymentHistory={paymentHistory}
          followedTrainers={followedTrainers}
          onPayClick={handlePayTrainer}
          onFollowToggle={handleFollowToggle}
          onTabChange={setActiveTab}
          isGymFilterActive={isGymFilterActive}
          onToggleGymFilter={() => setIsGymFilterActive(!isGymFilterActive)}
          gymConnection={gymConnection}
        />
        
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
            isClientPayment={true}
            trainerPlan={selectedTrainer.plan || "freemium"}
          />
        )}
      </Card>
    </div>
  );
}
