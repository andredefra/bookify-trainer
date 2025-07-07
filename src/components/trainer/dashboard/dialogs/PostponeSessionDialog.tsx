import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, Users, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useSessionPostponements } from "@/hooks/useSessionPostponements";
import { CalendarEvent } from "@/hooks/useCalendarEvents";

interface PostponeSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
  participants?: Array<{ id: string; email: string; name: string; paid_amount?: number }>;
}

export function PostponeSessionDialog({ 
  open, 
  onOpenChange, 
  event,
  participants = []
}: PostponeSessionDialogProps) {
  const [formData, setFormData] = useState({
    newDate: "",
    newStartTime: "",
    newEndTime: "",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { canPostponeSession, createPostponement } = useSessionPostponements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!event) return;
    
    if (!formData.newDate || !formData.newStartTime || !formData.newEndTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const originalStart = new Date(event.start);
      const originalEnd = new Date(event.end);
      const newStart = new Date(`${formData.newDate}T${formData.newStartTime}`);
      const newEnd = new Date(`${formData.newDate}T${formData.newEndTime}`);

      // Validate new end time is after start time
      if (newEnd <= newStart) {
        toast.error("End time must be after start time");
        return;
      }

      const result = await createPostponement(
        event.id,
        originalStart,
        originalEnd,
        newStart,
        newEnd,
        participants,
        formData.reason || undefined
      );

      if (result.success) {
        toast.success("Session postponement request sent to participants");
        onOpenChange(false);
        setFormData({
          newDate: "",
          newStartTime: "",
          newEndTime: "",
          reason: ""
        });
      } else {
        toast.error(result.error || "Failed to postpone session");
      }
    } catch (error) {
      console.error('Error postponing session:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setFormData({
      newDate: "",
      newStartTime: "",
      newEndTime: "",
      reason: ""
    });
  };

  if (!event) return null;

  const canPostpone = canPostponeSession(new Date(event.start));
  const hoursUntilSession = Math.round((new Date(event.start).getTime() - new Date().getTime()) / (1000 * 60 * 60));
  const participantsWithRefunds = participants.filter(p => p.paid_amount);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Postpone Session</DialogTitle>
          <DialogDescription>
            Reschedule this session and notify all participants
          </DialogDescription>
        </DialogHeader>

        {!canPostpone && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Cannot postpone session</span>
            </div>
            <p className="text-sm text-destructive/80 mt-1">
              Sessions can only be postponed at least 12 hours before the start time. 
              This session starts in {hoursUntilSession} hours.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Current Session Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-sm mb-2">Current Session</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{new Date(event.start).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {new Date(event.start).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })} - {new Date(event.end).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{participants.length} participants</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newDate">New Date *</Label>
                <div className="relative">
                  <Input
                    id="newDate"
                    type="date"
                    value={formData.newDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, newDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    disabled={!canPostpone}
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <Label htmlFor="newStartTime">New Start Time *</Label>
                <div className="relative">
                  <Input
                    id="newStartTime"
                    type="time"
                    value={formData.newStartTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, newStartTime: e.target.value }))}
                    required
                    disabled={!canPostpone}
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <Label htmlFor="newEndTime">New End Time *</Label>
                <div className="relative">
                  <Input
                    id="newEndTime"
                    type="time"
                    value={formData.newEndTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, newEndTime: e.target.value }))}
                    required
                    disabled={!canPostpone}
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Postponement</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Explain why you need to postpone this session..."
                rows={3}
                disabled={!canPostpone}
              />
            </div>

            {/* Warning about refunds */}
            {participantsWithRefunds.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-orange-700 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Refund Notice</span>
                </div>
                <p className="text-sm text-orange-600">
                  {participantsWithRefunds.length} participant(s) have paid for this session. 
                  If they decline the postponement, automatic refunds will be processed.
                </p>
              </div>
            )}

            {/* Participants info */}
            {participants.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-sm text-blue-900 mb-2">
                  Notification Recipients ({participants.length})
                </h4>
                <div className="space-y-1">
                  {participants.map((participant, index) => (
                    <div key={participant.id} className="text-xs text-blue-700 flex items-center justify-between">
                      <span>{participant.name} ({participant.email})</span>
                      {participant.paid_amount && (
                        <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          Paid €{participant.paid_amount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!canPostpone || isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? "Sending..." : "Send Postponement Request"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}