import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Clock, AlertCircle, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SessionSchedule {
  id: string;
  start_datetime: string;
  end_datetime: string;
  gym_group_session_id: string;
  session: {
    title: string;
    max_participants: number;
    difficulty_level: string;
    location?: string;
  };
}

interface SessionBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionSchedule: SessionSchedule | null;
}

interface BookingStats {
  confirmedCount: number;
  waitlistCount: number;
  isFullyBooked: boolean;
  nextWaitlistPosition: number;
}

export function SessionBookingDialog({ open, onOpenChange, sessionSchedule }: SessionBookingDialogProps) {
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingStats, setBookingStats] = useState<BookingStats>({
    confirmedCount: 0,
    waitlistCount: 0,
    isFullyBooked: false,
    nextWaitlistPosition: 1
  });
  
  const { toast } = useToast();

  useEffect(() => {
    if (open && sessionSchedule) {
      fetchBookingStats();
    }
  }, [open, sessionSchedule]);

  const fetchBookingStats = async () => {
    if (!sessionSchedule) return;

    try {
      const { data: bookings, error } = await supabase
        .from('gym_session_bookings')
        .select('booking_status, waitlist_position')
        .eq('session_schedule_id', sessionSchedule.id);

      if (error) throw error;

      const confirmedCount = bookings?.filter(b => b.booking_status === 'confirmed').length || 0;
      const waitlistBookings = bookings?.filter(b => b.booking_status === 'waitlisted') || [];
      const waitlistCount = waitlistBookings.length;
      const maxPosition = Math.max(0, ...waitlistBookings.map(b => b.waitlist_position || 0));
      
      setBookingStats({
        confirmedCount,
        waitlistCount,
        isFullyBooked: confirmedCount >= sessionSchedule.session.max_participants,
        nextWaitlistPosition: maxPosition + 1
      });
    } catch (error) {
      console.error('Error fetching booking stats:', error);
    }
  };

  const handleBookParticipant = async () => {
    if (!sessionSchedule || !participantEmail || !participantName) return;

    setLoading(true);
    try {
      // Create temporary participant ID for demo
      const participantId = `demo-participant-${Date.now()}`;

      const bookingData = {
        session_schedule_id: sessionSchedule.id,
        participant_id: participantId,
        booking_status: bookingStats.isFullyBooked ? 'waitlisted' : 'confirmed',
        waitlist_position: bookingStats.isFullyBooked ? bookingStats.nextWaitlistPosition : null,
        notes: notes || null
      };

      const { error } = await supabase
        .from('gym_session_bookings')
        .insert(bookingData);

      if (error) throw error;

      toast({
        title: bookingStats.isFullyBooked ? "Added to Waitlist" : "Booking Confirmed",
        description: bookingStats.isFullyBooked 
          ? `${participantName} has been added to the waitlist (position ${bookingStats.nextWaitlistPosition})`
          : `${participantName} has been successfully booked for the session`,
      });

      // Reset form and close
      setParticipantEmail("");
      setParticipantName("");
      setNotes("");
      onOpenChange(false);
      
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message || "Unable to book participant",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!sessionSchedule) return null;

  const availableSpots = sessionSchedule.session.max_participants - bookingStats.confirmedCount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Book Participant
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Session Info */}
          <div className="bg-muted/30 p-3 rounded-lg space-y-2">
            <h4 className="font-medium truncate">{sessionSchedule.session.title}</h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(sessionSchedule.start_datetime).toLocaleString()}
              </div>
              <Badge variant="outline" className="text-xs">
                {sessionSchedule.session.difficulty_level}
              </Badge>
            </div>
          </div>

          {/* Booking Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Confirmed</span>
              </div>
              <div className="text-lg font-bold text-green-700">
                {bookingStats.confirmedCount}/{sessionSchedule.session.max_participants}
              </div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Waitlist</span>
              </div>
              <div className="text-lg font-bold text-orange-700">
                {bookingStats.waitlistCount}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="participant_name">Participant Name *</Label>
              <Input
                id="participant_name"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Enter participant name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="participant_email">Email *</Label>
              <Input
                id="participant_email"
                type="email"
                value={participantEmail}
                onChange={(e) => setParticipantEmail(e.target.value)}
                placeholder="participant@email.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requirements or notes..."
                rows={2}
              />
            </div>
          </div>

          {/* Status Alert */}
          {bookingStats.isFullyBooked && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Session is fully booked. Participant will be added to waitlist at position {bookingStats.nextWaitlistPosition}.
              </AlertDescription>
            </Alert>
          )}

          {availableSpots > 0 && availableSpots <= 3 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Only {availableSpots} spots remaining in this session.
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBookParticipant}
              disabled={loading || !participantEmail || !participantName}
              className="flex-1"
            >
              {loading ? "Booking..." : bookingStats.isFullyBooked ? "Add to Waitlist" : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}