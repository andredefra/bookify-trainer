
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { bookingSchema } from "@/components/trainer/BookingForm";

import { SessionDetailsDialog } from "./SessionDetailsDialog";
import { PaymentDialog } from "./PaymentDialog";
import { BookingDialog } from "./BookingDialog";
import { MySessionsTab } from "./MySessionsTab";
import { SessionDiscoveryTab } from "./SessionDiscoveryTab";
import { PastSessionsTab } from "./PastSessionsTab";

interface SessionItem {
  id: number;
  name: string;
  trainer: string;
  time: string;
  date: string;
  status: string;
  price?: number;
  attendees?: number;
  maxAttendees?: number;
  description?: string;
}

interface SessionsTabContentProps {
  upcomingSessions: SessionItem[];
}

export function SessionsTabContent({ upcomingSessions }: SessionsTabContentProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session');
  
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSessionDetailsDialog, setShowSessionDetailsDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("Select a trainer");
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  
  // Available trainers for booking
  const availableTrainers = [
    { id: 1, name: "Sarah Johnson", speciality: "Personal Trainer" },
    { id: 2, name: "Alex Thompson", speciality: "HIIT Specialist" },
  ];

  // Available public sessions
  const availableSessions = [
    { 
      id: 101, 
      name: "HIIT Morning Workout", 
      trainer: "Sarah Johnson", 
      time: "08:00 - 09:00", 
      date: "Monday, July 3", 
      status: "available", 
      price: 25,
      attendees: 8,
      maxAttendees: 15,
      description: "Start your day with a high-intensity interval training session designed to boost your metabolism and energy levels."
    },
    { 
      id: 102, 
      name: "Yoga for Beginners", 
      trainer: "Alex Thompson", 
      time: "18:00 - 19:00", 
      date: "Tuesday, July 4", 
      status: "available", 
      price: 20,
      attendees: 12,
      maxAttendees: 20,
      description: "A gentle introduction to yoga fundamentals, focusing on proper alignment and breathing techniques."
    },
    { 
      id: 103, 
      name: "Core Strength", 
      trainer: "Sarah Johnson", 
      time: "17:00 - 18:00", 
      date: "Wednesday, July 5", 
      status: "available", 
      price: 30,
      attendees: 5,
      maxAttendees: 12,
      description: "Focus on building core strength and stability with a series of targeted exercises for your abdominals, lower back, and pelvis."
    }
  ];

  // Featured session
  const featuredSession = { 
    id: 999, 
    name: "HIIT Workout (Featured)",
    trainer: "Sarah Johnson", 
    time: "10:00 - 11:00", 
    date: "Tomorrow", 
    status: "available", 
    price: 35,
    attendees: 12,
    maxAttendees: 20,
    description: "A premium high-intensity interval training session with one of our top trainers. This session is designed for all fitness levels with modifications provided."
  };

  // Past sessions
  const pastSessions = [
    {
      id: 201,
      name: "Strength Training",
      trainer: "Sarah Johnson",
      time: "15:00 - 16:00",
      date: "Last week"
    },
    {
      id: 202,
      name: "Cardio Kickboxing",
      trainer: "Alex Thompson",
      time: "10:00 - 11:00",
      date: "2 weeks ago"
    }
  ];
  
  useEffect(() => {
    // If a session ID is passed in the URL, find that session
    if (sessionId) {
      const session = upcomingSessions.find(s => s.id === parseInt(sessionId));
      if (session) {
        setSelectedSession(session);
        setShowSessionDetailsDialog(true);
      }
    }
  }, [sessionId, upcomingSessions]);
  
  const handleBookSession = () => {
    setShowBookingDialog(true);
  };
  
  const handleBookingSubmit = (data: z.infer<typeof bookingSchema>) => {
    toast.success(`Session booked successfully for ${data.date.toLocaleDateString()} at ${data.time}`);
    setShowBookingDialog(false);
    
    // Automatically show payment dialog after booking
    if (selectedTrainer) {
      const mockSession = {
        id: Math.floor(Math.random() * 1000),
        name: "Personal Training",
        trainer: selectedTrainer,
        time: data.time,
        date: data.date.toLocaleDateString(),
        status: "pending",
        price: 45
      };
      setSelectedSession(mockSession);
      setShowPaymentDialog(true);
    }
  };
  
  const handleViewSessionDetails = (session: SessionItem) => {
    setSelectedSession(session);
    setShowSessionDetailsDialog(true);
  };
  
  const handleRegisterForSession = (session: SessionItem) => {
    setSelectedSession(session);
    setShowPaymentDialog(true);
    setShowSessionDetailsDialog(false);
  };
  
  const handlePaymentSubmit = () => {
    toast.success("Payment successful! You're now registered for the session.");
    setShowPaymentDialog(false);
    // In a real app, this would update the session status in the database
  };

  const handleAddToCalendar = (session: SessionItem) => {
    toast.success(`Added ${session.name} to your calendar`);
  };

  const handleCancelSession = (session: SessionItem) => {
    toast.success(`Cancelled ${session.name} session`);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Discover and register for live training sessions</CardDescription>
          </div>
          <Button 
            className="flex items-center"
            onClick={handleBookSession}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Book Private Session
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">My Sessions</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <MySessionsTab
              upcomingSessions={upcomingSessions}
              featuredSession={featuredSession}
              onViewDetails={handleViewSessionDetails}
              onRegister={handleRegisterForSession}
              onAddToCalendar={handleAddToCalendar}
              onCancel={handleCancelSession}
            />
          </TabsContent>
          
          <TabsContent value="discover">
            <SessionDiscoveryTab
              availableSessions={availableSessions}
              onViewDetails={handleViewSessionDetails}
              onRegister={handleRegisterForSession}
            />
          </TabsContent>
          
          <TabsContent value="past">
            <PastSessionsTab pastSessions={pastSessions} />
          </TabsContent>
        </Tabs>
        
        {/* Dialogs */}
        <BookingDialog 
          open={showBookingDialog}
          onOpenChange={setShowBookingDialog}
          selectedTrainer={selectedTrainer}
          setSelectedTrainer={setSelectedTrainer}
          availableTrainers={availableTrainers}
          onSubmit={handleBookingSubmit}
        />
        
        <SessionDetailsDialog
          open={showSessionDetailsDialog}
          onOpenChange={setShowSessionDetailsDialog}
          session={selectedSession}
          onRegister={handleRegisterForSession}
        />
        
        <PaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          session={selectedSession}
          onPaymentComplete={handlePaymentSubmit}
        />
      </CardContent>
    </Card>
  );
}
