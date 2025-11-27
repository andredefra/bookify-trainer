import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { PackageSessionBooking, SessionType } from '@/types/packageSessions';
import { cn } from '@/lib/utils';

interface BookSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: PackageSessionBooking;
  clientName: string;
  packageTitle: string;
  onBookSession: (
    sessionId: string,
    datetime: Date,
    sessionType: SessionType,
    location: string,
    notes: string,
    durationMinutes: number
  ) => Promise<void>;
}

export const BookSessionDialog = ({
  open,
  onOpenChange,
  session,
  clientName,
  packageTitle,
  onBookSession,
}: BookSessionDialogProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('10:00');
  const [sessionType, setSessionType] = useState<SessionType>('in-person');
  const [location, setLocation] = useState('Main Gym');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('60');
  const [sendNotification, setSendNotification] = useState(true);
  const [addToCalendar, setAddToCalendar] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!date) {
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const datetime = new Date(date);
    datetime.setHours(hours, minutes, 0, 0);

    setLoading(true);
    try {
      await onBookSession(
        session.id,
        datetime,
        sessionType,
        location,
        notes,
        parseInt(duration)
      );
      onOpenChange(false);
      // Reset form
      setDate(undefined);
      setTime('10:00');
      setSessionType('in-person');
      setLocation('Main Gym');
      setNotes('');
      setDuration('60');
    } catch (error) {
      // Error handled in parent
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Session #{session.sessionNumber}</DialogTitle>
          <DialogDescription>
            Package: {packageTitle} ({clientName})
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
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
                <SelectItem value="120">120 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Session Type</Label>
            <Select value={sessionType} onValueChange={(v) => setSessionType(v as SessionType)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-person">🏋️ In-person</SelectItem>
                <SelectItem value="video">🎥 Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Main Gym"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes for this session..."
              rows={3}
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notification"
                checked={sendNotification}
                onCheckedChange={(checked) => setSendNotification(checked as boolean)}
              />
              <label
                htmlFor="notification"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Send notification to client
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="calendar"
                checked={addToCalendar}
                onCheckedChange={(checked) => setAddToCalendar(checked as boolean)}
              />
              <label
                htmlFor="calendar"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add to my calendar
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!date || loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Propose Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
