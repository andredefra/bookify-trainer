import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckInSubmission } from "@/hooks/useCheckInSubmissions";
import { format } from "date-fns";
import {
  Scale,
  Ruler,
  Camera,
  Smile,
  Zap,
  Moon,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";

interface CheckInDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: CheckInSubmission | null;
  onSaveFeedback: (submissionId: string, feedback: string) => Promise<void>;
  onMarkReviewed: (submissionId: string) => Promise<void>;
}

const getMoodEmoji = (rating: number) => {
  if (rating >= 9) return "😄";
  if (rating >= 7) return "😊";
  if (rating >= 5) return "🙂";
  if (rating >= 3) return "😐";
  return "😔";
};

const RatingBar = ({ value, max = 10, color }: { value: number; max?: number; color: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <span className="text-sm font-medium w-8">{value}/{max}</span>
  </div>
);

export function CheckInDetailDialog({
  open,
  onOpenChange,
  submission,
  onSaveFeedback,
  onMarkReviewed,
}: CheckInDetailDialogProps) {
  const [feedback, setFeedback] = useState(submission?.trainer_feedback || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!submission) return null;

  const measurements = submission.measurements || {};
  const hasMeasurements = Object.keys(measurements).length > 0;
  const isReviewed = !!submission.trainer_reviewed_at;

  const handleSaveFeedback = async () => {
    setIsSaving(true);
    await onSaveFeedback(submission.id, feedback);
    setIsSaving(false);
  };

  const handleMarkReviewed = async () => {
    await onMarkReviewed(submission.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Check-in Details</DialogTitle>
            <Badge variant={isReviewed ? "secondary" : "default"}>
              {isReviewed ? "Reviewed" : "Pending Review"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(submission.due_date), 'MMMM d, yyyy')}
            {submission.completed_at && (
              <span> • Completed {format(new Date(submission.completed_at), 'MMM d, h:mm a')}</span>
            )}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Weight */}
          {submission.weight && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Scale className="h-4 w-4 text-blue-500" />
                Weight
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <span className="text-2xl font-bold">{submission.weight}</span>
                <span className="text-muted-foreground ml-1">kg</span>
              </div>
            </div>
          )}

          {/* Measurements */}
          {hasMeasurements && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Ruler className="h-4 w-4 text-purple-500" />
                Body Measurements
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(measurements).map(([key, value]) => (
                  <div key={key} className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground capitalize">{key}</p>
                    <p className="font-semibold">{value} cm</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photos */}
          {submission.photos && submission.photos.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Camera className="h-4 w-4 text-green-500" />
                Progress Photos
              </div>
              <div className="grid grid-cols-3 gap-2">
                {submission.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center text-muted-foreground"
                  >
                    <Camera className="h-8 w-8" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mood, Energy, Sleep */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Smile className="h-4 w-4 text-amber-500" />
              How They're Feeling
            </div>
            
            <div className="space-y-4 bg-muted/50 rounded-lg p-4">
              {submission.mood_rating && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mood</span>
                    <span className="text-lg">{getMoodEmoji(submission.mood_rating)}</span>
                  </div>
                  <RatingBar value={submission.mood_rating} color="bg-amber-500" />
                </div>
              )}
              
              {submission.energy_level && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Energy
                    </span>
                  </div>
                  <RatingBar value={submission.energy_level} color="bg-green-500" />
                </div>
              )}
              
              {submission.sleep_quality && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Moon className="h-3 w-3" /> Sleep Quality
                    </span>
                  </div>
                  <RatingBar value={submission.sleep_quality} color="bg-indigo-500" />
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {submission.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MessageSquare className="h-4 w-4 text-slate-500" />
                Client Notes
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm italic">"{submission.notes}"</p>
              </div>
            </div>
          )}

          {/* Custom Answers */}
          {Object.keys(submission.custom_answers || {}).length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Custom Questions</div>
              <div className="space-y-2">
                {Object.entries(submission.custom_answers).map(([question, answer]) => (
                  <div key={question} className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">{question}</p>
                    <p className="text-sm mt-1">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Trainer Feedback */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Your Feedback</div>
            <Textarea
              placeholder="Write feedback for your client..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
            />
            {submission.trainer_reviewed_at && (
              <p className="text-xs text-muted-foreground">
                Reviewed on {format(new Date(submission.trainer_reviewed_at), 'MMM d, yyyy h:mm a')}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            variant="outline"
            onClick={handleSaveFeedback}
            disabled={isSaving || !feedback.trim()}
          >
            <Send className="h-4 w-4 mr-1" />
            {isSaving ? "Saving..." : "Send Feedback"}
          </Button>
          {!isReviewed && (
            <Button onClick={handleMarkReviewed}>
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Mark as Reviewed
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
