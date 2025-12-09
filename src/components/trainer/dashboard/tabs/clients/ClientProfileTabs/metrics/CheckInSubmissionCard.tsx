import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckInSubmission } from "@/hooks/useCheckInSubmissions";
import { format } from "date-fns";
import { 
  Scale, 
  Camera, 
  MessageSquare, 
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

interface CheckInSubmissionCardProps {
  submission: CheckInSubmission;
  onViewDetails: () => void;
  onMarkReviewed?: () => void;
  weekNumber?: number;
}

const getMoodEmoji = (rating: number | null) => {
  if (!rating) return "😐";
  if (rating >= 8) return "😊";
  if (rating >= 6) return "🙂";
  if (rating >= 4) return "😐";
  if (rating >= 2) return "😕";
  return "😔";
};

const getEnergyIcon = (level: number | null) => {
  if (!level) return "⚡";
  if (level >= 7) return "⚡⚡";
  if (level >= 4) return "⚡";
  return "🔋";
};

const getStatusBadge = (submission: CheckInSubmission) => {
  if (submission.status === 'pending') {
    return <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
  }
  if (submission.status === 'overdue') {
    return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Overdue</Badge>;
  }
  if (submission.trainer_reviewed_at) {
    return <Badge variant="secondary" className="text-green-600 border-green-300 bg-green-50"><CheckCircle2 className="h-3 w-3 mr-1" />Reviewed</Badge>;
  }
  return <Badge variant="default" className="bg-blue-500">Needs Review</Badge>;
};

export function CheckInSubmissionCard({ 
  submission, 
  onViewDetails, 
  onMarkReviewed,
  weekNumber 
}: CheckInSubmissionCardProps) {
  const photoCount = submission.photos?.length || 0;
  const hasNotes = !!submission.notes;
  const needsReview = submission.status === 'completed' && !submission.trainer_reviewed_at;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-medium text-sm">
              {weekNumber ? `Week ${weekNumber} Check-in` : 'Check-in'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {format(new Date(submission.due_date), 'MMM d, yyyy')}
            </p>
          </div>
          {getStatusBadge(submission)}
        </div>

        {submission.status !== 'pending' && (
          <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
            {submission.weight && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Scale className="h-3.5 w-3.5" />
                <span>{submission.weight} kg</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span>{getMoodEmoji(submission.mood_rating)}</span>
              <span className="text-muted-foreground text-xs">
                {submission.mood_rating ? `${submission.mood_rating}/10` : '-'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>{getEnergyIcon(submission.energy_level)}</span>
              <span className="text-muted-foreground text-xs">
                {submission.energy_level ? `${submission.energy_level}/10` : '-'}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          {photoCount > 0 && (
            <div className="flex items-center gap-1">
              <Camera className="h-3.5 w-3.5" />
              <span>{photoCount} photos</span>
            </div>
          )}
          {hasNotes && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="truncate max-w-[150px]">"{submission.notes}"</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onViewDetails}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            View Details
          </Button>
          {needsReview && onMarkReviewed && (
            <Button 
              variant="default" 
              size="sm"
              onClick={onMarkReviewed}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Mark Reviewed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
