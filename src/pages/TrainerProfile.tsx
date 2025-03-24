
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import { TrainerHeader } from "@/components/trainer/TrainerHeader";
import { TrainerInfo } from "@/components/trainer/TrainerInfo";
import { AboutTab } from "@/components/trainer/AboutTab";
import { ExperienceTab } from "@/components/trainer/ExperienceTab";
import { ReviewsTab } from "@/components/trainer/ReviewsTab";
import { AvailabilityTab } from "@/components/trainer/AvailabilityTab";
import { AIChatDialog } from "@/components/trainer/AIChatDialog";
import { MarketingSection } from "@/components/trainer/MarketingSection";
import { RegisterForm, registerSchema } from "@/components/trainer/RegisterForm";
import { BookingForm, bookingSchema } from "@/components/trainer/BookingForm";

// Mock data
const trainerData = {
  id: "t1",
  name: "Sarah Johnson",
  title: "Certified Personal Trainer",
  bio: "Dedicated fitness professional with 8+ years of experience helping clients achieve their health and fitness goals. Specialized in strength training, weight loss, and nutrition coaching.",
  location: "New York, NY",
  rating: 4.9,
  reviews: 124,
  hourlyRate: 50,
  specialties: ["Strength Training", "HIIT", "Weight Loss", "Nutrition"],
  certifications: ["NASM CPT", "ACE Nutrition Specialist", "Precision Nutrition Level 1"],
  availability: {
    monday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    tuesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    wednesday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    thursday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    friday: ["9:00 AM - 12:00 PM", "2:00 PM - 6:00 PM"],
    saturday: ["10:00 AM - 2:00 PM"],
    sunday: []
  },
  education: "Bachelor's in Exercise Science, University of California",
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
  profileImage: "/placeholder.svg",
  status: "in-session",
  nextAvailability: "Today at 4:00 PM"
};

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    image: "/placeholder.svg",
    text: "Sarah completely transformed my approach to fitness. In just 3 months, I've lost 15 pounds and feel stronger than ever.",
    rating: 5
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    image: "/placeholder.svg",
    text: "Working with Sarah has been life-changing. She knows exactly how to push me while making workouts enjoyable.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chang",
    image: "/placeholder.svg",
    text: "Sarah's nutrition advice alongside the training program helped me finally break through my weight loss plateau.",
    rating: 4
  }
];

const aiConversation = [
  {
    sender: "client",
    message: "Hi, I need to reschedule my private session this week. Can I move it to Tuesday?",
    time: "10:23 AM"
  },
  {
    sender: "ai",
    message: "Hello! I see you currently have a session scheduled for Thursday at 3:00 PM. Let me check Sarah's availability for Tuesday. She has open slots at 10:00 AM and 4:00 PM on Tuesday. Would either of those work for you?",
    time: "10:24 AM"
  },
  {
    sender: "client",
    message: "4:00 PM on Tuesday works for me. Can you book that?",
    time: "10:26 AM"
  },
  {
    sender: "ai",
    message: "Perfect! I've rescheduled your session to Tuesday at 4:00 PM with Sarah. You'll receive a confirmation email shortly. Sarah has been notified of this change. Is there anything else you need help with?",
    time: "10:27 AM"
  }
];

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(trainerData);
  const { toast } = useToast();
  const [showRegister, setShowRegister] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
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
          
          <Tabs defaultValue="about" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <AboutTab certifications={trainer.certifications} education={trainer.education} />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceTab experience={trainer.experience} />
            </TabsContent>
            
            <TabsContent value="reviews">
              <ReviewsTab testimonials={testimonials} />
            </TabsContent>
            
            <TabsContent value="availability">
              <AvailabilityTab 
                availability={trainer.availability}
                trainerName={trainer.name}
                onViewCalendar={handleBookSession}
              />
            </TabsContent>
          </Tabs>
          
          <MarketingSection trainerName={trainer.name} />
          
          {/* Dialogs */}
          <Dialog>
            <DialogTrigger className="hidden" />
            
            {showRegister ? (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create an account to book a session</DialogTitle>
                  <DialogDescription>
                    Join Personal.ai to book sessions with {trainer.name} and other trainers.
                  </DialogDescription>
                </DialogHeader>
                
                <RegisterForm 
                  onSubmit={onRegisterSubmit}
                  onCancel={() => setShowRegister(false)}
                />
              </DialogContent>
            ) : showBookingForm ? (
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Book a Session with {trainer.name}</DialogTitle>
                  <DialogDescription>
                    Select a date and time for your session
                  </DialogDescription>
                </DialogHeader>
                
                <BookingForm 
                  trainerName={trainer.name}
                  onSubmit={onBookingSubmit}
                  onCancel={() => setShowBookingForm(false)}
                />
              </DialogContent>
            ) : null}
          </Dialog>
          
          <Dialog open={openMessageDialog} onOpenChange={setOpenMessageDialog}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>Chat with AI Assistant</span>
                  <Badge variant="outline" className="ml-2 text-xs">Sarah is in session</Badge>
                </DialogTitle>
                <DialogDescription>
                  Our AI assistant can help you with scheduling, basic questions, and more while Sarah is unavailable.
                </DialogDescription>
              </DialogHeader>
              
              <AIChatDialog 
                trainerName={trainer.name}
                conversation={aiConversation}
              />
            </DialogContent>
          </Dialog>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrainerProfile;
