import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { bookingSchema } from "@/components/trainer/BookingForm";
import { SessionItem } from "@/types/sessions";

import { UpcomingSessionItem } from "./sessions/UpcomingSessionItem";
import { FeaturedSessionItem } from "./sessions/FeaturedSessionItem";
import { BookSessionDialog } from "./sessions/BookSessionDialog";
import { SessionPaymentDialog } from "./sessions/SessionPaymentDialog";

interface UpcomingSessionsCardProps {
  upcomingSessions: SessionItem[];
}

export function UpcomingSessionsCard({ upcomingSessions }: UpcomingSessionsCardProps) {
  const navigate = useNavigate();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  
  const handleBookSession = (trainer: string) => {
    setSelectedTrainer(trainer);
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
  
  const handleRegisterForSession = (session: SessionItem) => {
    setSelectedSession(session);
    setShowPaymentDialog(true);
  };
  
  const handlePaymentSubmit = () => {
    toast.success("Payment successful! You're now registered for the session.");
    setShowPaymentDialog(false);
    // In a real app, this would update the session status in the database
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Live training sessions you can join</CardDescription>
        </div>
        <Button 
          onClick={() => navigate('/client-dashboard?tab=sessions')}
          className="flex items-center mr-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Find Sessions
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingSessions.map((session) => (
            <UpcomingSessionItem
              key={session.id}
              session={session}
              onRegister={handleRegisterForSession}
            />
          ))}

          {/* Demo upcoming session that can be joined */}
          <FeaturedSessionItem onRegister={handleRegisterForSession} />
        </div>
        
        {/* Dialogs */}
        <BookSessionDialog
          open={showBookingDialog}
          onOpenChange={setShowBookingDialog}
          selectedTrainer={selectedTrainer}
          onSubmit={handleBookingSubmit}
        />

        <SessionPaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          session={selectedSession}
          onPaymentSubmit={handlePaymentSubmit}
        />
      </CardContent>
    </Card>
  );
}
