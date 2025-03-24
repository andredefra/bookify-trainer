
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { SessionItem } from "@/types/sessions";

import { SessionDetailsDialog } from "./dialogs/SessionDetailsDialog";
import { PaymentDialog } from "./dialogs/PaymentDialog";
import { BookingDialog } from "./dialogs/BookingDialog";
import { MySessionsTab } from "./MySessionsTab";
import { SessionDiscoveryTab } from "./SessionDiscoveryTab";
import { PastSessionsTab } from "./PastSessionsTab";
import { SessionProvider, useSessionContext } from "./SessionContext";
import { availableTrainers, availableSessions, featuredSession, pastSessions } from "./sessionData";

interface SessionsTabContentProps {
  upcomingSessions: SessionItem[];
}

function SessionsTabContentInner({ upcomingSessions }: SessionsTabContentProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session');
  
  const {
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
    handleViewSessionDetails,
    handleRegisterForSession,
    handlePaymentSubmit,
    handleAddToCalendar,
    handleCancelSession,
    handleBookingSubmit
  } = useSessionContext();
  
  useEffect(() => {
    // If a session ID is passed in the URL, find that session
    if (sessionId) {
      const session = upcomingSessions.find(s => s.id === parseInt(sessionId));
      if (session) {
        setSelectedSession(session);
        setShowSessionDetailsDialog(true);
      }
    }
  }, [sessionId, upcomingSessions, setSelectedSession, setShowSessionDetailsDialog]);
  
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

export function SessionsTabContent({ upcomingSessions }: SessionsTabContentProps) {
  return (
    <SessionProvider upcomingSessions={upcomingSessions}>
      <SessionsTabContentInner upcomingSessions={upcomingSessions} />
    </SessionProvider>
  );
}
