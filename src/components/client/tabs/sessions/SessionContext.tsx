
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { bookingSchema } from "@/components/trainer/BookingForm";
import { SessionItem, SessionStatus } from "@/types/sessions";

interface SessionContextType {
  showBookingDialog: boolean;
  setShowBookingDialog: (show: boolean) => void;
  showPaymentDialog: boolean;
  setShowPaymentDialog: (show: boolean) => void;
  showSessionDetailsDialog: boolean;
  setShowSessionDetailsDialog: (show: boolean) => void;
  selectedTrainer: string;
  setSelectedTrainer: (trainer: string) => void;
  selectedSession: SessionItem | null;
  setSelectedSession: (session: SessionItem | null) => void;
  handleBookSession: () => void;
  handleBookingSubmit: (data: z.infer<typeof bookingSchema>) => void;
  handleSessionRequest: (data: z.infer<typeof bookingSchema>) => void;
  handleViewSessionDetails: (session: SessionItem) => void;
  handleRegisterForSession: (session: SessionItem) => void;
  handlePaymentSubmit: () => void;
  handleAddToCalendar: (session: SessionItem) => void;
  handleCancelSession: (session: SessionItem) => void;
}

const defaultSessionContext: SessionContextType = {
  showBookingDialog: false,
  setShowBookingDialog: () => {},
  showPaymentDialog: false,
  setShowPaymentDialog: () => {},
  showSessionDetailsDialog: false,
  setShowSessionDetailsDialog: () => {},
  selectedTrainer: "Select a trainer",
  setSelectedTrainer: () => {},
  selectedSession: null,
  setSelectedSession: () => {},
  handleBookSession: () => {},
  handleBookingSubmit: () => {},
  handleSessionRequest: () => {},
  handleViewSessionDetails: () => {},
  handleRegisterForSession: () => {},
  handlePaymentSubmit: () => {},
  handleAddToCalendar: () => {},
  handleCancelSession: () => {},
};

const SessionContext = createContext<SessionContextType>(defaultSessionContext);

export const useSessionContext = () => {
  const context = useContext(SessionContext);

  // Avoid blank screen if provider is missing; log a warning for debugging.
  if (context === defaultSessionContext) {
    console.warn("useSessionContext is being used without SessionProvider. Falling back to default no-op context.");
  }

  return context;
};

interface SessionProviderProps {
  children: ReactNode;
  upcomingSessions: SessionItem[];
}

export const SessionProvider = ({ children, upcomingSessions }: SessionProviderProps) => {
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSessionDetailsDialog, setShowSessionDetailsDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState("Select a trainer");
  const [selectedSession, setSelectedSession] = useState<SessionItem | null>(null);
  
  const handleBookSession = () => {
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
      const mockSession = {
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

  const handleSessionRequest = (data: z.infer<typeof bookingSchema>) => {
    toast({
      title: "Request Sent",
      description: `Your session request for ${data.date.toLocaleDateString()} at ${data.time} has been sent. You'll be notified when approved.`,
      variant: "default",
    });
    setShowBookingDialog(false);
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
    toast({
      title: "Payment Successful",
      description: "You're now registered for the session.",
      variant: "default",
    });
    setShowPaymentDialog(false);
    // In a real app, this would update the session status in the database
  };

  const handleAddToCalendar = (session: SessionItem) => {
    toast({
      title: "Added to Calendar",
      description: `Added ${session.name} to your calendar`,
      variant: "default",
    });
  };

  const handleCancelSession = (session: SessionItem) => {
    toast({
      title: "Session Cancelled",
      description: `Cancelled ${session.name} session`,
      variant: "default",
    });
  };
  
  const value = {
    showBookingDialog,
    setShowBookingDialog,
    showPaymentDialog,
    setShowPaymentDialog,
    showSessionDetailsDialog,
    setShowSessionDetailsDialog,
    selectedTrainer,
    setSelectedTrainer,
    selectedSession,
    setSelectedSession,
    handleBookSession,
    handleBookingSubmit,
    handleSessionRequest,
    handleViewSessionDetails,
    handleRegisterForSession,
    handlePaymentSubmit,
    handleAddToCalendar,
    handleCancelSession
  };
  
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
