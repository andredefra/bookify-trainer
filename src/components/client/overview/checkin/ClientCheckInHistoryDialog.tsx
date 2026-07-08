import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckInSubmission } from '@/hooks/useClientCheckIns';
import { CheckInHistoryItem } from './CheckInHistoryItem';

interface ClientCheckInHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submissions: CheckInSubmission[];
}

export function ClientCheckInHistoryDialog({
  open,
  onOpenChange,
  submissions
}: ClientCheckInHistoryDialogProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<CheckInSubmission | null>(null);

  const completedSubmissions = submissions.filter(s => 
    s.status === 'completed' || s.status === 'reviewed'
  );
  const reviewedSubmissions = submissions.filter(s => s.status === 'reviewed');
  const pendingSubmissions = submissions.filter(s => 
    s.status === 'pending' || s.status === 'overdue'
  );

  if (selectedSubmission) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <button 
              onClick={() => setSelectedSubmission(null)}
              className="text-sm text-muted-foreground hover:text-foreground mb-2 text-left"
            >
              ← Back to history
            </button>
            <DialogTitle>Check-in Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <CheckInHistoryItem submission={selectedSubmission} compact={false} />
            
            {selectedSubmission.measurements && Object.keys(selectedSubmission.measurements).length > 0 && (
              <div className="p-3 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">Measurements</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {selectedSubmission.measurements.chest && (
                    <div><span className="text-muted-foreground">Chest:</span> {selectedSubmission.measurements.chest}cm</div>
                  )}
                  {selectedSubmission.measurements.waist && (
                    <div><span className="text-muted-foreground">Waist:</span> {selectedSubmission.measurements.waist}cm</div>
                  )}
                  {selectedSubmission.measurements.abdomen && (
                    <div><span className="text-muted-foreground">Abdomen:</span> {selectedSubmission.measurements.abdomen}cm</div>
                  )}
                  {selectedSubmission.measurements.hips && (
                    <div><span className="text-muted-foreground">Hips:</span> {selectedSubmission.measurements.hips}cm</div>
                  )}
                  {(selectedSubmission.measurements.quadriceps ?? selectedSubmission.measurements.thighs) && (
                    <div><span className="text-muted-foreground">Quadriceps:</span> {selectedSubmission.measurements.quadriceps ?? selectedSubmission.measurements.thighs}cm</div>
                  )}
                  {selectedSubmission.measurements.arms && (
                    <div><span className="text-muted-foreground">Arms:</span> {selectedSubmission.measurements.arms}cm</div>
                  )}
                </div>
              </div>
            )}

            {selectedSubmission.notes && (
              <div className="p-3 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">Your Notes</h4>
                <p className="text-sm text-muted-foreground">{selectedSubmission.notes}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Check-in History</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({completedSubmissions.length})</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed ({reviewedSubmissions.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            <TabsContent value="all" className="space-y-3 m-0">
              {completedSubmissions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No check-ins yet</p>
              ) : (
                completedSubmissions.map((submission) => (
                  <CheckInHistoryItem 
                    key={submission.id} 
                    submission={submission}
                    onClick={() => setSelectedSubmission(submission)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="reviewed" className="space-y-3 m-0">
              {reviewedSubmissions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No reviewed check-ins</p>
              ) : (
                reviewedSubmissions.map((submission) => (
                  <CheckInHistoryItem 
                    key={submission.id} 
                    submission={submission}
                    onClick={() => setSelectedSubmission(submission)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-3 m-0">
              {pendingSubmissions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No pending check-ins</p>
              ) : (
                pendingSubmissions.map((submission) => (
                  <CheckInHistoryItem 
                    key={submission.id} 
                    submission={submission}
                    onClick={() => setSelectedSubmission(submission)}
                  />
                ))
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
