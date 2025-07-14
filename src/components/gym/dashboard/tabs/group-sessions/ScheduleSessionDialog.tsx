import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


interface ScheduleSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionTitle: string;
  sessionId: string;
  onScheduleSession: (
    sessionId: string,
    startDateTime: string,
    endDateTime: string,
    trainerId?: string,
    cancellationPolicy?: {
      free_cancellation_hours?: number;
    }
  ) => void;
}

export function ScheduleSessionDialog({
  open,
  onOpenChange,
  sessionTitle,
  sessionId,
  onScheduleSession
}: ScheduleSessionDialogProps) {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    trainerId: "",
    free_cancellation_hours: 48
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${formData.date}T${formData.startTime}`).toISOString();
    const endDateTime = new Date(`${formData.date}T${formData.endTime}`).toISOString();
    
    onScheduleSession(
      sessionId,
      startDateTime,
      endDateTime,
      formData.trainerId || undefined,
      {
        free_cancellation_hours: formData.free_cancellation_hours
      }
    );
    
    onOpenChange(false);
    
    // Reset form
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      trainerId: "",
      free_cancellation_hours: 48
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule Session: {sessionTitle}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-4 w-4" />
                Schedule Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainerId">Trainer ID (Optional)</Label>
                <Input
                  id="trainerId"
                  value={formData.trainerId}
                  onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
                  placeholder="Enter trainer ID to assign"
                />
              </div>
            </CardContent>
          </Card>

          {/* Cancellation Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings2 className="h-4 w-4" />
                Cancellation Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="free_cancellation_hours">
                    Free Cancellation Hours *
                  </Label>
                  <Input
                    id="free_cancellation_hours"
                    type="number"
                    value={formData.free_cancellation_hours}
                    onChange={(e) => setFormData({ ...formData, free_cancellation_hours: parseInt(e.target.value) })}
                    min="0"
                    max="168"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Hours before session for free cancellation. Late cancellations will lose the session from member's package.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Members use sessions from their pre-paid packages. Cancellations within the free hours keep the session in their package. Late cancellations lose the session from their package - no monetary refunds.
                </p>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Session
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}