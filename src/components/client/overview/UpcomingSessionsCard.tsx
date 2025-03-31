
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { bookingSchema } from "@/components/trainer/BookingForm";
import { SessionItem, SessionStatus } from "@/types/sessions";

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
    toast({
      title: "Session Booked",
      description: `Session booked successfully for ${data.date.toLocaleDateString()} at ${data.time}`,
      variant: "default",
    });
    setShowBookingDialog(false);
    
    // Automatically show payment dialog after booking
    if (selectedTrainer) {
      const mockSession: SessionItem = {
        id: Math.floor(Math.random() * 1000),
        name: "Personal Training",
        trainer: selectedTrainer,
        time: data.time,
        date: data.date.toLocaleDateString(),
        status: "pending" as SessionStatus,
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
    toast({
      title: "Payment Successful",
      description: "You're now registered for the session.",
      variant: "default",
    });
    setShowPaymentDialog(false);
    // In a real app, this would update the session status in the database
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Live training sessions you can join</CardDescription>
          </div>
          <Button 
            onClick={() => navigate('/client-dashboard?tab=sessions')}
            className="flex items-center justify-center self-start sm:self-auto"
            size="sm"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Find Sessions</span>
            <span className="sm:hidden">Find</span>
          </Button>
        </div>
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
