import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (eventData: any) => void;
  defaultClient?: string;
}

export function CreateEventDialog({ open, onOpenChange, onSubmit, defaultClient }: CreateEventDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "personal_task",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    client: defaultClient ?? "",
    description: ""
  });

  useEffect(() => {
    if (open && defaultClient) {
      setFormData((prev) => ({ ...prev, client: defaultClient }));
    }
  }, [open, defaultClient]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.startDate || !formData.startTime) {
      toast.error("Please fill in required fields");
      return;
    }

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = formData.endDate && formData.endTime 
      ? new Date(`${formData.endDate}T${formData.endTime}`)
      : new Date(startDateTime.getTime() + 60 * 60 * 1000); // Default 1 hour duration

    // Color mapping based on event type
    const getEventColor = (type: string): string => {
      switch (type) {
        case 'session': return 'bg-blue-500';
        case 'sales_activity': return 'bg-green-500';
        case 'program_milestone': return 'bg-purple-500';
        case 'deadline': return 'bg-red-500';
        case 'personal_task': return 'bg-gray-500';
        case 'availability': return 'bg-emerald-500';
        default: return 'bg-blue-500';
      }
    };

    const eventData = {
      title: formData.title,
      type: formData.type,
      start: startDateTime,
      end: endDateTime,
      location: formData.location || undefined,
      client: formData.client || undefined,
      description: formData.description || undefined,
      color: getEventColor(formData.type),
      status: 'scheduled' as const
    };

    if (onSubmit) {
      onSubmit(eventData);
    }

    toast.success("Event created successfully!");
    onOpenChange(false);
    setFormData({
      title: "",
      type: "personal_task",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      location: "",
      client: "",
      description: ""
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
    setFormData({
      title: "",
      type: "personal_task",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      location: "",
      client: "",
      description: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Add a new event to your calendar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Event Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="session">Training Session</SelectItem>
                  <SelectItem value="sales_activity">Sales Activity</SelectItem>
                  <SelectItem value="program_milestone">Program Milestone</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="personal_task">Personal Task</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="client">Client (Optional)</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                placeholder="Client name"
              />
            </div>

            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div>
              <Label htmlFor="startTime">Start Time *</Label>
              <div className="relative">
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  required
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <div className="relative">
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div>
              <Label htmlFor="endTime">End Time</Label>
              <div className="relative">
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Event location"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Event description"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}