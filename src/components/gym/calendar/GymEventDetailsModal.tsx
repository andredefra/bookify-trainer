import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, Users, Edit, Trash2, AlertTriangle } from "lucide-react";
import { GymCalendarEvent } from "@/hooks/gym/useGymCalendar";
import { cn } from "@/lib/utils";

interface GymEventDetailsModalProps {
  event: GymCalendarEvent | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (event: GymCalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

export function GymEventDetailsModal({ 
  event, 
  open, 
  onClose, 
  onEdit, 
  onDelete 
}: GymEventDetailsModalProps) {
  if (!event) return null;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const startDateTime = formatDateTime(event.start_datetime);
  const endDateTime = formatDateTime(event.end_datetime);

  const getEventTypeInfo = (category: string) => {
    switch (category) {
      case 'session':
        return { 
          label: 'Training Session', 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Users
        };
      case 'sales_activity':
        return { 
          label: 'Sales Activity', 
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: User
        };
      case 'program_milestone':
        return { 
          label: 'Program Milestone', 
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Calendar
        };
      case 'deadline':
        return { 
          label: 'Deadline', 
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertTriangle
        };
      case 'personal_task':
        return { 
          label: 'Personal Task', 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: User
        };
      case 'availability':
        return { 
          label: 'Available Slot', 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock
        };
      default:
        return { 
          label: 'Event', 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Calendar
        };
    }
  };

  const eventTypeInfo = getEventTypeInfo(event.event_category);
  const EventIcon = eventTypeInfo.icon;

  const calculateDuration = () => {
    const start = new Date(event.start_datetime);
    const end = new Date(event.end_datetime);
    const durationMs = end.getTime() - start.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
    }
    return `${minutes}m`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <EventIcon className="h-5 w-5" />
            Event Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Event Title and Type */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <Badge className={cn("text-xs", eventTypeInfo.color)}>
              {eventTypeInfo.label}
            </Badge>
          </div>

          {/* Event Details Cards */}
          <div className="space-y-3">
            {/* Date & Time */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Date & Time</div>
                    <div className="text-sm text-muted-foreground">
                      {startDateTime.date}
                    </div>
                    <div className="text-sm">
                      {startDateTime.time} - {endDateTime.time} ({calculateDuration()})
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trainer */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Trainer</div>
                    <div className="text-sm text-muted-foreground">
                      {event.trainer_name || `Trainer ${event.trainer_id.slice(-4)}`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client (if applicable) */}
            {event.client_id && (
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Client</div>
                      <div className="text-sm text-muted-foreground">
                        {event.client_name || `Client ${event.client_id.slice(-4)}`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location (if applicable) */}
            {event.location && (
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Location</div>
                      <div className="text-sm text-muted-foreground">
                        {event.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description (if applicable) */}
            {event.description && (
              <Card>
                <CardContent className="p-3">
                  <div className="font-medium text-sm mb-1">Description</div>
                  <div className="text-sm text-muted-foreground">
                    {event.description}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event)}
                className="flex-1 gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(event.id)}
                className="flex-1 gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}