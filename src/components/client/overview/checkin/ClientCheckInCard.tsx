import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck, ChevronRight, AlertTriangle, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { useClientCheckIns } from '@/hooks/useClientCheckIns';
import { ClientCheckInDialog } from './ClientCheckInDialog';
import { ClientCheckInHistoryDialog } from './ClientCheckInHistoryDialog';
import { CheckInHistoryItem } from './CheckInHistoryItem';
import { Skeleton } from '@/components/ui/skeleton';

interface ClientCheckInCardProps {
  clientId: string;
  useMocks?: boolean;
}

export function ClientCheckInCard({ clientId, useMocks }: ClientCheckInCardProps) {
  const [showCheckInDialog, setShowCheckInDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  
  const {
    submissions,
    settings,
    loading,
    pendingCheckIn,
    recentCheckIns,
    hasNewFeedback,
    nextCheckInDate,
    submitCheckIn
  } = useClientCheckIns(clientId, { useMocks });

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Don't show card if no check-in settings
  if (!settings) {
    return null;
  }

  const isOverdue = pendingCheckIn?.status === 'overdue';
  const isPending = !!pendingCheckIn;

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Weekly Check-in
              {hasNewFeedback && (
                <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                  New Feedback
                </Badge>
              )}
            </CardTitle>
            <Button 
              variant={isPending ? "default" : "outline"} 
              size="sm"
              onClick={() => setShowCheckInDialog(true)}
            >
              {isPending ? 'Complete Check-in' : 'New Check-in'}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Urgency Banner */}
          {isPending && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              isOverdue 
                ? 'bg-destructive/10 text-destructive border border-destructive/20' 
                : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20'
            }`}>
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">
                {isOverdue 
                  ? 'Your check-in is overdue! Please complete it now.'
                  : 'Your weekly check-in is due today!'
                }
              </span>
            </div>
          )}

          {/* Next Check-in Date (if no pending) */}
          {!isPending && nextCheckInDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next check-in: {format(nextCheckInDate, 'EEEE, MMMM d')}</span>
            </div>
          )}

          {/* Recent Check-ins */}
          {recentCheckIns.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Recent Check-ins</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recentCheckIns.slice(0, 2).map((submission) => (
                  <CheckInHistoryItem 
                    key={submission.id} 
                    submission={submission} 
                    compact 
                    onClick={() => setShowHistoryDialog(true)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {recentCheckIns.length === 0 && !isPending && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                No check-ins yet. Complete your first check-in to track your progress!
              </p>
            </div>
          )}

          {/* View History Link */}
          {submissions.length > 0 && (
            <Button 
              variant="ghost" 
              className="w-full justify-between text-muted-foreground hover:text-foreground"
              onClick={() => setShowHistoryDialog(true)}
            >
              <span>View Full History</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>

      <ClientCheckInDialog
        open={showCheckInDialog}
        onOpenChange={setShowCheckInDialog}
        settings={settings}
        pendingSubmission={pendingCheckIn}
        onSubmit={submitCheckIn}
      />

      <ClientCheckInHistoryDialog
        open={showHistoryDialog}
        onOpenChange={setShowHistoryDialog}
        submissions={submissions}
      />
    </>
  );
}
