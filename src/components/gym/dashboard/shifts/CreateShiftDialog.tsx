import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTrainerShifts } from '@/hooks/gym/useTrainerShifts';
import { useGymTrainersData } from '@/hooks/gym/useGymTrainersData';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface CreateShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateShiftDialog({ open, onOpenChange }: CreateShiftDialogProps) {
  const [trainerId, setTrainerId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [shiftType, setShiftType] = useState<'regular' | 'overtime' | 'substitute'>('regular');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createShift } = useTrainerShifts();
  const { trainers } = useGymTrainersData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trainerId || !startDate || !startTime || !endDate || !endTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}:00.000Z`);
    const endDateTime = new Date(`${endDate}T${endTime}:00.000Z`);

    if (endDateTime <= startDateTime) {
      toast.error('End time must be after start time');
      return;
    }

    setIsLoading(true);

    try {
      await createShift({
        gym_id: '11111111-1111-1111-1111-111111111111', // Demo gym ID
        trainer_id: trainerId,
        start_datetime: startDateTime.toISOString(),
        end_datetime: endDateTime.toISOString(),
        status: 'scheduled',
        shift_type: shiftType,
        notes: notes || undefined
      });

      toast.success('Shift created successfully');
      onOpenChange(false);
      
      // Reset form
      setTrainerId('');
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');
      setShiftType('regular');
      setNotes('');
    } catch (error) {
      console.error('Error creating shift:', error);
      toast.error('Failed to create shift');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Shift</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trainer">Trainer *</Label>
            <Select value={trainerId} onValueChange={setTrainerId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shiftType">Shift Type</Label>
            <Select value={shiftType} onValueChange={(value: 'regular' | 'overtime' | 'substitute') => setShiftType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="overtime">Overtime</SelectItem>
                <SelectItem value="substitute">Substitute</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes about this shift..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Shift'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}