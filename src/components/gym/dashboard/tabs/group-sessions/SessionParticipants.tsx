import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Clock, X, ArrowUp, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  participant_id: string;
  booking_status: 'confirmed' | 'waitlisted' | 'cancelled';
  waitlist_position?: number;
  booked_at: string;
  notes?: string;
}

interface SessionParticipantsProps {
  sessionScheduleId: string;
  sessionTitle: string;
  maxParticipants: number;
}

export function SessionParticipants({ sessionScheduleId, sessionTitle, maxParticipants }: SessionParticipantsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, [sessionScheduleId]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('gym_session_bookings')
        .select('*')
        .eq('session_schedule_id', sessionScheduleId)
        .order('booked_at', { ascending: true });

      if (error) throw error;
      setBookings((data || []) as Booking[]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('gym_session_bookings')
        .update({ booking_status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Booking Cancelled",
        description: "Participant booking has been cancelled",
      });

      fetchBookings(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel booking",
        variant: "destructive",
      });
    }
  };

  const handlePromoteFromWaitlist = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('gym_session_bookings')
        .update({ 
          booking_status: 'confirmed',
          waitlist_position: null 
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Promoted from Waitlist",
        description: "Participant has been confirmed for the session",
      });

      fetchBookings(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to promote participant",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading participants...</div>;
  }

  const confirmedBookings = bookings.filter(b => b.booking_status === 'confirmed');
  const waitlistBookings = bookings.filter(b => b.booking_status === 'waitlisted')
    .sort((a, b) => (a.waitlist_position || 0) - (b.waitlist_position || 0));
  const availableSpots = maxParticipants - confirmedBookings.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Session Participants</h4>
        <Badge variant="outline">
          {confirmedBookings.length}/{maxParticipants} confirmed
        </Badge>
      </div>

      {/* Session Status */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="font-medium text-green-900">Confirmed</div>
          <div className="text-lg font-bold text-green-700">{confirmedBookings.length}</div>
        </div>
        <div className="text-center p-2 bg-orange-50 rounded">
          <div className="font-medium text-orange-900">Waitlist</div>
          <div className="text-lg font-bold text-orange-700">{waitlistBookings.length}</div>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="font-medium text-blue-900">Available</div>
          <div className="text-lg font-bold text-blue-700">{Math.max(0, availableSpots)}</div>
        </div>
      </div>

      {/* Confirmed Participants */}
      {confirmedBookings.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              Confirmed Participants ({confirmedBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {confirmedBookings.map((booking, index) => (
              <div key={booking.id} className="flex items-center justify-between p-2 bg-green-50 rounded">
                <div className="flex-1">
                  <div className="font-medium text-sm">Participant {index + 1}</div>
                  <div className="text-xs text-muted-foreground">
                    Booked: {new Date(booking.booked_at).toLocaleDateString()}
                  </div>
                  {booking.notes && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Note: {booking.notes}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    title="Send notification"
                  >
                    <Mail className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleCancelBooking(booking.id)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
                    title="Cancel booking"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Waitlist */}
      {waitlistBookings.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Waitlist ({waitlistBookings.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {waitlistBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    Position {booking.waitlist_position}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Added: {new Date(booking.booked_at).toLocaleDateString()}
                  </div>
                  {booking.notes && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Note: {booking.notes}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  {availableSpots > 0 && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handlePromoteFromWaitlist(booking.id)}
                      className="h-6 w-6 p-0 text-green-600 hover:text-green-700"
                      title="Promote to confirmed"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    title="Send notification"
                  >
                    <Mail className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleCancelBooking(booking.id)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
                    title="Remove from waitlist"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Auto-promotion alert */}
      {waitlistBookings.length > 0 && availableSpots > 0 && (
        <Alert>
          <ArrowUp className="h-4 w-4" />
          <AlertDescription>
            {availableSpots} spot(s) available. You can promote waitlisted participants to confirmed status.
          </AlertDescription>
        </Alert>
      )}

      {confirmedBookings.length === 0 && waitlistBookings.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Users className="mx-auto h-8 w-8 mb-2" />
          <p>No participants registered yet</p>
        </div>
      )}
    </div>
  );
}