
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, CalendarDays, List } from "lucide-react";
import { SessionItem } from "@/types/sessions";

import { SessionDetailsDialog } from "./dialogs/SessionDetailsDialog";
import { PaymentDialog } from "./dialogs/PaymentDialog";
import { BookingDialog } from "./dialogs/BookingDialog";
import { MySessionsTab } from "./MySessionsTab";
import { SessionDiscoveryTab } from "./SessionDiscoveryTab";
import { PastSessionsTab } from "./PastSessionsTab";
import { CalendarSessionView } from "./CalendarSessionView";
import { SessionProvider, useSessionContext } from "./SessionContext";
import { availableTrainers, availableSessions, featuredSession, pastSessions } from "./sessionData";

interface SessionsTabContentProps {
  upcomingSessions: SessionItem[];
}

function SessionsTabContentInner({ upcomingSessions }: SessionsTabContentProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  
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
  
  // Combine upcoming sessions with available sessions for the calendar view
  const allSessions = [...upcomingSessions, ...availableSessions];
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Training Sessions</CardTitle>
            <CardDescription>Discover and register for live training sessions</CardDescription>
          </div>
          <div className="flex gap-2">
            {/* View toggle buttons */}
            <div className="hidden sm:flex mr-2 bg-muted rounded-md p-1">
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="h-4 w-4 mr-1" /> List
              </Button>
              <Button 
                variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('calendar')}
                className="px-3"
              >
                <CalendarDays className="h-4 w-4 mr-1" /> Calendar
              </Button>
            </div>
            <Button 
              className="flex items-center"
              onClick={handleBookSession}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Book Private Session
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'calendar' ? (
          <CalendarSessionView 
            sessions={allSessions} 
            onViewDetails={handleViewSessionDetails}
            onRegister={handleRegisterForSession}
          />
        ) : (
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
        )}
        
        {/* Small screen view toggle */}
        <div className="sm:hidden flex mt-4 bg-muted rounded-md p-1 w-full">
          <Button 
            variant={viewMode === 'list' ? 'default' : 'ghost'} 
            onClick={() => setViewMode('list')}
            className="flex-1"
          >
            <List className="h-4 w-4 mr-1" /> List
          </Button>
          <Button 
            variant={viewMode === 'calendar' ? 'default' : 'ghost'} 
            onClick={() => setViewMode('calendar')}
            className="flex-1"
          >
            <CalendarDays className="h-4 w-4 mr-1" /> Calendar
          </Button>
        </div>
        
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
