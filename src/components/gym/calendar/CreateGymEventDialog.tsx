import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";
import { GymCalendarEvent } from "@/hooks/gym/useGymCalendar";

interface CreateGymEventDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: Partial<GymCalendarEvent>) => Promise<{ success: boolean; error?: any }>;
  trainers?: { id: string; name: string }[];
  clients?: { id: string; name: string }[];
}

export function CreateGymEventDialog({ 
  open, 
  onClose, 
  onCreateEvent, 
  trainers = [], 
  clients = [] 
}: CreateGymEventDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    start_datetime: '',
    end_datetime: '',
    event_category: 'personal_task' as const,
    trainer_id: '',
    client_id: '',
    description: '',
    location: '',
    color: '#3B82F6'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.start_datetime || !formData.end_datetime || !formData.trainer_id) {
      return;
    }

    setLoading(true);
    try {
      const result = await onCreateEvent({
        ...formData,
        client_id: formData.client_id || undefined
      });

      if (result.success) {
        setFormData({
          title: '',
          start_datetime: '',
          end_datetime: '',
          event_category: 'personal_task',
          trainer_id: '',
          client_id: '',
          description: '',
          location: '',
          color: '#3B82F6'
        });
        onClose();
      }
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const eventCategories = [
    { value: 'session', label: 'Training Session', color: '#3B82F6' },
    { value: 'sales_activity', label: 'Sales Activity', color: '#10B981' },
    { value: 'program_milestone', label: 'Program Milestone', color: '#8B5CF6' },
    { value: 'deadline', label: 'Deadline', color: '#EF4444' },
    { value: 'personal_task', label: 'Personal Task', color: '#6B7280' },
    { value: 'availability', label: 'Available Slot', color: '#F59E0B' }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter event title"
              required
              className="min-h-[44px]"
            />
          </div>

          {/* Event Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Event Type *</Label>
            <Select
              value={formData.event_category}
              onValueChange={(value: any) => {
                const category = eventCategories.find(c => c.value === value);
                setFormData(prev => ({ 
                  ...prev, 
                  event_category: value,
                  color: category?.color || '#3B82F6'
                }));
              }}
            >
              <SelectTrigger className="min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventCategories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      {category.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Trainer */}
          <div className="space-y-2">
            <Label htmlFor="trainer">Trainer *</Label>
            <Select
              value={formData.trainer_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, trainer_id: value }))}
            >
              <SelectTrigger className="min-h-[44px]">
                <SelectValue placeholder="Select trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.length > 0 ? (
                  trainers.map(trainer => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="demo-trainer">Demo Trainer</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Client (Optional) */}
          {(formData.event_category as string) === 'session' && (
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
                <Select
                  value={formData.client_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, client_id: value }))}
                >
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue placeholder="Select client (optional)" />
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No client selected</SelectItem>
                  {clients.length > 0 ? (
                    clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="demo-client">Demo Client</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="start">Start Date & Time *</Label>
              <Input
                id="start"
                type="datetime-local"
                value={formData.start_datetime}
                onChange={(e) => setFormData(prev => ({ ...prev, start_datetime: e.target.value }))}
                required
                className="min-h-[44px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End Date & Time *</Label>
              <Input
                id="end"
                type="datetime-local"
                value={formData.end_datetime}
                onChange={(e) => setFormData(prev => ({ ...prev, end_datetime: e.target.value }))}
                required
                className="min-h-[44px]"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter location"
              className="min-h-[44px]"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 min-h-[44px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.title || !formData.start_datetime || !formData.end_datetime || !formData.trainer_id}
              className="flex-1 min-h-[44px]"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}