
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
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
  handleViewSessionDetails: (session: SessionItem) => void;
  handleRegisterForSession: (session: SessionItem) => void;
  handlePaymentSubmit: () => void;
  handleAddToCalendar: (session: SessionItem) => void;
  handleCancelSession: (session: SessionItem) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
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
        status: "pending" as SessionStatus,
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
