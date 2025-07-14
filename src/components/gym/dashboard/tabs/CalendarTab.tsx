import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, CalendarDays } from "lucide-react";
import { useGymCalendar, GymCalendarEvent } from "@/hooks/gym/useGymCalendar";
import { GymCalendarView } from "@/components/gym/calendar/GymCalendarView";
import { GymEventDetailsModal } from "@/components/gym/calendar/GymEventDetailsModal";
import { CreateGymEventDialog } from "@/components/gym/calendar/CreateGymEventDialog";
import { useToast } from "@/hooks/use-toast";

export function CalendarTab() {
  const [selectedEvent, setSelectedEvent] = useState<GymCalendarEvent | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  
  const { 
    events, 
    trainers,
    stats,
    loading, 
    error, 
    createEvent, 
    updateEvent, 
    deleteEvent 
  } = useGymCalendar();
  
  const { toast } = useToast();

  const handleEventClick = (event: GymCalendarEvent) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleCreateEvent = async (eventData: Partial<GymCalendarEvent>) => {
    const result = await createEvent(eventData);
    if (result.success) {
      toast({
        title: "Event Created",
        description: "The event has been successfully created."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive"
      });
    }
    return result;
  };

  const handleDeleteEvent = async (eventId: string) => {
    const result = await deleteEvent(eventId);
    if (result.success) {
      setShowEventDetails(false);
      setSelectedEvent(null);
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading calendar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">Failed to load calendar</div>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Calendar</h1>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">
              scheduled sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Week
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weeklyBookings}</div>
            <p className="text-xs text-muted-foreground">
              total bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Trainers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTrainers}</div>
            <p className="text-xs text-muted-foreground">
              with appointments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilization Rate
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.utilizationRate}%</div>
            <p className="text-xs text-muted-foreground">
              facility usage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Gym Calendar</CardTitle>
          <CardDescription>
            Manage trainer appointments and facility bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GymCalendarView
            events={events}
            trainers={trainers}
            onEventClick={handleEventClick}
            onCreateEvent={() => setShowCreateEvent(true)}
          />
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <GymEventDetailsModal
        event={selectedEvent}
        open={showEventDetails}
        onClose={() => {
          setShowEventDetails(false);
          setSelectedEvent(null);
        }}
        onDelete={handleDeleteEvent}
      />

      {/* Create Event Dialog */}
      <CreateGymEventDialog
        open={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onCreateEvent={handleCreateEvent}
        trainers={trainers}
      />
    </div>
  );
}