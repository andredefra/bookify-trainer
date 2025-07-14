import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

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
      reduced_fee_hours?: number;
      reduced_fee_percentage?: number;
      full_fee_percentage?: number;
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
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    trainerId: "",
    free_cancellation_hours: 48,
    reduced_fee_hours: 24,
    reduced_fee_percentage: 50,
    full_fee_percentage: 100
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
        free_cancellation_hours: formData.free_cancellation_hours,
        reduced_fee_hours: formData.reduced_fee_hours,
        reduced_fee_percentage: formData.reduced_fee_percentage,
        full_fee_percentage: formData.full_fee_percentage
      }
    );
    
    onOpenChange(false);
    
    // Reset form
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      trainerId: "",
      free_cancellation_hours: 48,
      reduced_fee_hours: 24,
      reduced_fee_percentage: 50,
      full_fee_percentage: 100
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('groupSessions.scheduleSession')}: {sessionTitle}
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
                {t('groupSessions.cancellationPolicy')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="free_cancellation_hours">
                    {t('groupSessions.freeCancellationHours')} *
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
                    Hours before session for free cancellation
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reduced_fee_hours">
                    {t('groupSessions.reducedFeeHours')} *
                  </Label>
                  <Input
                    id="reduced_fee_hours"
                    type="number"
                    value={formData.reduced_fee_hours}
                    onChange={(e) => setFormData({ ...formData, reduced_fee_hours: parseInt(e.target.value) })}
                    min="0"
                    max="168"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Hours before session for reduced fee cancellation
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reduced_fee_percentage">
                    {t('groupSessions.reducedFeePercentage')} *
                  </Label>
                  <Input
                    id="reduced_fee_percentage"
                    type="number"
                    value={formData.reduced_fee_percentage}
                    onChange={(e) => setFormData({ ...formData, reduced_fee_percentage: parseInt(e.target.value) })}
                    min="0"
                    max="100"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Percentage of session lost for reduced fee cancellation
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="full_fee_percentage">
                    {t('groupSessions.fullFeePercentage')} *
                  </Label>
                  <Input
                    id="full_fee_percentage"
                    type="number"
                    value={formData.full_fee_percentage}
                    onChange={(e) => setFormData({ ...formData, full_fee_percentage: parseInt(e.target.value) })}
                    min="0"
                    max="100"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Percentage of session lost for late cancellation
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Members use sessions from their pre-paid packages. No refunds are given - only the session is lost from their package based on the cancellation timing.
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