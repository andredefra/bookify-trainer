import { format } from 'date-fns';
import { CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CheckInSubmission } from '@/hooks/useClientCheckIns';

interface CheckInHistoryItemProps {
  submission: CheckInSubmission;
  onClick?: () => void;
  compact?: boolean;
}

export function CheckInHistoryItem({ submission, onClick, compact = false }: CheckInHistoryItemProps) {
  const getStatusIcon = () => {
    switch (submission.status) {
      case 'reviewed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (submission.status) {
      case 'reviewed':
        return <Badge variant="default" className="bg-green-500/10 text-green-600 text-xs">Reviewed</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="text-xs">Pending Review</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-500 text-xs">Due</Badge>;
      case 'overdue':
        return <Badge variant="destructive" className="text-xs">Overdue</Badge>;
      default:
        return null;
    }
  };

  const getMoodEmoji = (rating?: number) => {
    if (!rating) return null;
    if (rating >= 8) return '😊';
    if (rating >= 6) return '🙂';
    if (rating >= 4) return '😐';
    if (rating >= 2) return '😕';
    return '😞';
  };

  const displayDate = submission.completed_at 
    ? format(new Date(submission.completed_at), 'MMM d')
    : format(new Date(submission.due_date), 'MMM d');

  if (compact) {
    return (
      <div 
        className="p-3 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">{displayDate}</span>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {submission.weight && (
            <span>{submission.weight}kg</span>
          )}
          {submission.mood_rating && (
            <span>{getMoodEmoji(submission.mood_rating)} {submission.mood_rating}/10</span>
          )}
        </div>
        
        {submission.trainer_feedback && (
          <div className="mt-2 flex items-start gap-1.5 text-xs text-primary">
            <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">"{submission.trainer_feedback}"</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="p-4 rounded-lg border bg-card hover:bg-accent/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="font-medium">
            {format(new Date(submission.due_date), 'MMMM d, yyyy')}
          </span>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        {submission.weight && (
          <div>
            <span className="text-muted-foreground">Weight:</span>{' '}
            <span className="font-medium">{submission.weight}kg</span>
          </div>
        )}
        {submission.mood_rating && (
          <div>
            <span className="text-muted-foreground">Mood:</span>{' '}
            <span className="font-medium">{getMoodEmoji(submission.mood_rating)} {submission.mood_rating}/10</span>
          </div>
        )}
        {submission.energy_level && (
          <div>
            <span className="text-muted-foreground">Energy:</span>{' '}
            <span className="font-medium">{submission.energy_level}/10</span>
          </div>
        )}
        {submission.sleep_quality && (
          <div>
            <span className="text-muted-foreground">Sleep:</span>{' '}
            <span className="font-medium">{submission.sleep_quality}/10</span>
          </div>
        )}
      </div>
      
      {submission.trainer_feedback && (
        <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-2 text-sm">
            <MessageSquare className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground mb-1">Trainer Feedback</p>
              <p className="text-foreground">{submission.trainer_feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
