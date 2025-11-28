import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { PackageSessionBooking, SessionType } from '@/types/packageSessions';
import { cn } from '@/lib/utils';

interface ClientProposeSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: PackageSessionBooking | null;
  onPropose: (
    bookingId: string,
    datetime: Date,
    sessionType: SessionType,
    location: string,
    notes: string,
    durationMinutes: number,
    proposedBy: 'client'
  ) => Promise<void>;
}

export const ClientProposeSessionDialog = ({
  open,
  onOpenChange,
  session,
  onPropose,
}: ClientProposeSessionDialogProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('09:00');
  const [sessionType, setSessionType] = useState<SessionType>('in-person');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!session || !date) return;

    const [hours, minutes] = time.split(':').map(Number);
    const datetime = new Date(date);
    datetime.setHours(hours, minutes, 0, 0);

    try {
      setSubmitting(true);
      await onPropose(
        session.id,
        datetime,
        sessionType,
        location,
        notes,
        60, // default 60 minutes
        'client'
      );
      onOpenChange(false);
      // Reset form
      setDate(undefined);
      setTime('09:00');
      setSessionType('in-person');
      setLocation('');
      setNotes('');
    } catch (error) {
      console.error('Error proposing session:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Propose Session Time</DialogTitle>
          <DialogDescription>
            Session #{session.sessionNumber} - Suggest a time that works for you
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Session Type</Label>
            <Select value={sessionType} onValueChange={(value) => setSessionType(value as SessionType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="video">Video Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {sessionType === 'in-person' && (
            <div className="space-y-2">
              <Label>Location</Label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Main Gym, Studio A"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or information..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!date || submitting}>
            {submitting ? 'Proposing...' : 'Propose This Time'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};