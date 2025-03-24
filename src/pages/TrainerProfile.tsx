
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import refactored components
import { TrainerHeader } from "@/components/trainer/TrainerHeader";
import { TrainerInfo } from "@/components/trainer/TrainerInfo";
import { MarketingSection } from "@/components/trainer/MarketingSection";
import { registerSchema } from "@/components/trainer/RegisterForm";
import { bookingSchema } from "@/components/trainer/BookingForm";
import { SessionDialogs } from "@/components/trainer/SessionDialogs";
import { ChatDialog } from "@/components/trainer/ChatDialog";
import { TabsSection } from "@/components/trainer/TabsSection";

// Import mock data
import { 
  trainerData as defaultTrainerData, 
  testimonials, 
  aiConversation,
  getTrainerById,
  Trainer
} from "@/data/trainerMockData";

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState<Trainer>(defaultTrainerData);
  const { toast } = useToast();
  const [showRegister, setShowRegister] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // In a real app, this would be an API call
    if (id) {
      const fetchedTrainer = getTrainerById(id);
      if (fetchedTrainer) {
        setTrainer(fetchedTrainer);
      }
    }
  }, [id]);

  const handleBookSession = () => {
    if (!isLoggedIn) {
      setShowRegister(true);
    } else {
      setShowBookingForm(true);
    }
  };

  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("Register data:", data);
    setIsLoggedIn(true);
    setShowRegister(false);
    setShowBookingForm(true);
    toast({
      title: "Registration successful",
      description: "You can now book a session with Sarah.",
    });
  };

  const onBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    console.log("Booking data:", data);
    setShowBookingForm(false);
    toast({
      title: "Booking successful",
      description: `Your session with ${trainer.name} has been booked for ${data.date.toLocaleDateString()} at ${data.time}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <TrainerHeader trainer={trainer} />
          
          <div className="md:col-span-2 space-y-6">
            <TrainerInfo 
              trainer={trainer} 
              onBookSession={handleBookSession}
              onMessageClick={() => setOpenMessageDialog(true)}
            />
          </div>
          
          <TabsSection 
            trainer={trainer} 
            testimonials={testimonials} 
            onBookSession={handleBookSession} 
          />
          
          <MarketingSection trainerName={trainer.name} />
          
          {/* Dialogs */}
          <SessionDialogs 
            trainerName={trainer.name}
            showRegister={showRegister}
            showBookingForm={showBookingForm}
            onRegisterSubmit={onRegisterSubmit}
            onBookingSubmit={onBookingSubmit}
            onRegisterCancel={() => setShowRegister(false)}
            onBookingCancel={() => setShowBookingForm(false)}
          />
          
          <ChatDialog 
            open={openMessageDialog}
            onOpenChange={setOpenMessageDialog}
            trainerName={trainer.name}
            conversation={aiConversation}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainerProfile;
