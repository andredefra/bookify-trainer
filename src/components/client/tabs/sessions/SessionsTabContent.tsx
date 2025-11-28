
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionItem } from "@/types/sessions";
import { useMediaQuery } from "@/hooks/use-mobile";
import { toast } from "sonner";

import { MySessionsTab } from "./MySessionsTab";
import { SessionDiscoveryTab } from "./SessionDiscoveryTab";
import { PastSessionsTab } from "./PastSessionsTab";
import { CalendarSessionView } from "./CalendarSessionView";
import { SessionProvider, useSessionContext } from "./SessionContext";
import { availableTrainers, availableSessions, featuredSession, pastSessions, invitedSessions } from "./sessionData";
import { SessionsHeader } from "./components/SessionsHeader";
import { ViewToggle } from "./components/ViewToggle";
import { SessionDialogs } from "./components/SessionDialogs";
import { MobileTabsView } from "./components/mobile/MobileTabsView";

interface SessionsTabContentProps {
  upcomingSessions: SessionItem[];
}

function SessionsTabContentInner({ upcomingSessions }: SessionsTabContentProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const isMobile = useMediaQuery("(max-width: 640px)");
  
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
  
  // Handler for joining a video session
  const handleJoinSession = (session: SessionItem) => {
    toast.success(`Joining ${session.name} session with ${session.trainer}`);
    
    // In a real app, this would launch the video session interface
    window.open(`/video-session/${session.id}`, '_blank');
  };
  
  useEffect(() => {
    // If a session ID is passed in the URL, find that session
    if (sessionId) {
      const session = upcomingSessions.find(s => s.id === parseInt(sessionId));
      if (session) {
        setSelectedSession(session);
        setShowSessionDetailsDialog(true);
      }
    }
    
    // Check if navigated with state to show discover tab
    if (location.state?.activeTab === 'sessions' && location.state?.discoverActive) {
      setActiveTab('discover');
    }
  }, [sessionId, upcomingSessions, setSelectedSession, setShowSessionDetailsDialog, location.state]);
  
  // Combine upcoming sessions with available sessions for the calendar view
  const allSessions = [...upcomingSessions, ...availableSessions];
  
  return (
    <Card>
      <CardHeader className="pb-0 sm:pb-5">
        <SessionsHeader 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onBookSession={handleBookSession}
          isMobile={isMobile}
        />
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        {viewMode === 'calendar' ? (
          <CalendarSessionView 
            sessions={allSessions} 
            onViewDetails={handleViewSessionDetails}
            onRegister={handleRegisterForSession}
          />
        ) : isMobile ? (
          <MobileTabsView
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            upcomingSessions={upcomingSessions}
            availableSessions={availableSessions}
            pastSessions={pastSessions}
            featuredSession={featuredSession}
            onViewDetails={handleViewSessionDetails}
            onRegister={handleRegisterForSession}
            onAddToCalendar={handleAddToCalendar}
            onCancel={handleCancelSession}
            onJoinSession={handleJoinSession}
          />
        ) : (
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">My Sessions</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="past">Past Sessions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <MySessionsTab
                upcomingSessions={upcomingSessions}
                invitedSessions={invitedSessions}
                onViewDetails={handleViewSessionDetails}
                onRegister={handleRegisterForSession}
                onAddToCalendar={handleAddToCalendar}
                onCancel={handleCancelSession}
              />
            </TabsContent>
            
            <TabsContent value="discover">
              <SessionDiscoveryTab
                availableSessions={availableSessions}
                featuredSession={featuredSession}
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
        {!isMobile && (
          <ViewToggle 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            isMobile={true} 
          />
        )}
        
        {/* Dialogs */}
        <SessionDialogs 
          showBookingDialog={showBookingDialog}
          setShowBookingDialog={setShowBookingDialog}
          showPaymentDialog={showPaymentDialog}
          setShowPaymentDialog={setShowPaymentDialog}
          showSessionDetailsDialog={showSessionDetailsDialog}
          setShowSessionDetailsDialog={setShowSessionDetailsDialog}
          selectedTrainer={selectedTrainer}
          setSelectedTrainer={setSelectedTrainer}
          selectedSession={selectedSession}
          availableTrainers={availableTrainers}
          onBookingSubmit={handleBookingSubmit}
          onPaymentComplete={handlePaymentSubmit}
          onRegister={handleRegisterForSession}
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
