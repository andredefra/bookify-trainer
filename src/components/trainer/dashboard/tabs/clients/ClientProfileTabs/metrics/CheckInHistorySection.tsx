import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCheckInSubmissions, CheckInSubmission } from "@/hooks/useCheckInSubmissions";
import { CheckInSubmissionCard } from "./CheckInSubmissionCard";
import { CheckInDetailDialog } from "./CheckInDetailDialog";
import { ClipboardList, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface CheckInHistorySectionProps {
  clientId: string;
}

export function CheckInHistorySection({ clientId }: CheckInHistorySectionProps) {
  const { 
    submissions, 
    pendingReview, 
    reviewed, 
    pending, 
    overdue,
    isLoading,
    addTrainerFeedback,
    markAsReviewed,
    getPreviousSubmission,
    getWellnessTrends,
  } = useCheckInSubmissions(clientId);

  const [selectedSubmission, setSelectedSubmission] = useState<CheckInSubmission | null>(null);
  const [previousSubmission, setPreviousSubmission] = useState<CheckInSubmission | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleViewDetails = (submission: CheckInSubmission) => {
    setSelectedSubmission(submission);
    setPreviousSubmission(getPreviousSubmission(submission.id));
    setDetailDialogOpen(true);
  };

  const handleMarkReviewed = async (submissionId: string) => {
    await markAsReviewed(submissionId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="font-medium mb-1">No Check-ins Yet</h3>
        <p className="text-sm text-muted-foreground">
          Configure check-ins to start tracking your client's progress.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="text-xs">
            All
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {submissions.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="needs-review" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Review
            {pendingReview.length > 0 && (
              <Badge variant="default" className="ml-1 h-5 px-1.5 bg-blue-500">
                {pendingReview.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="text-xs">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Done
          </TabsTrigger>
          <TabsTrigger value="overdue" className="text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-3">
            {submissions.map((submission, index) => (
              <CheckInSubmissionCard
                key={submission.id}
                submission={submission}
                weekNumber={submissions.length - index}
                onViewDetails={() => handleViewDetails(submission)}
                onMarkReviewed={
                  submission.status === 'completed' && !submission.trainer_reviewed_at
                    ? () => handleMarkReviewed(submission.id)
                    : undefined
                }
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="needs-review" className="mt-4">
          {pendingReview.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">All check-ins reviewed!</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {pendingReview.map((submission, index) => (
                <CheckInSubmissionCard
                  key={submission.id}
                  submission={submission}
                  weekNumber={pendingReview.length - index}
                  onViewDetails={() => handleViewDetails(submission)}
                  onMarkReviewed={() => handleMarkReviewed(submission.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviewed" className="mt-4">
          {reviewed.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No reviewed check-ins yet</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {reviewed.map((submission, index) => (
                <CheckInSubmissionCard
                  key={submission.id}
                  submission={submission}
                  weekNumber={reviewed.length - index}
                  onViewDetails={() => handleViewDetails(submission)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="overdue" className="mt-4">
          {overdue.length === 0 && pending.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No pending or overdue check-ins</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {[...overdue, ...pending].map((submission, index) => (
                <CheckInSubmissionCard
                  key={submission.id}
                  submission={submission}
                  onViewDetails={() => handleViewDetails(submission)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CheckInDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        submission={selectedSubmission}
        previousSubmission={previousSubmission}
        wellnessTrends={getWellnessTrends()}
        onSaveFeedback={addTrainerFeedback}
        onMarkReviewed={markAsReviewed}
      />
    </div>
  );
}
