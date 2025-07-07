import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { useClientPostponements, ClientPostponementNotification } from "@/hooks/useClientPostponements";
import { PostponementNotificationDialog } from "./PostponementNotificationDialog";

export function PostponementNotifications() {
  const { 
    postponements, 
    loading, 
    getPendingPostponements, 
    respondToPostponement 
  } = useClientPostponements();
  
  const [selectedPostponement, setSelectedPostponement] = useState<ClientPostponementNotification | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const pendingPostponements = getPendingPostponements();

  const handleViewPostponement = (postponement: ClientPostponementNotification) => {
    setSelectedPostponement(postponement);
    setShowDialog(true);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Loading postponement notifications...
      </div>
    );
  }

  if (pendingPostponements.length === 0) {
    return null; // Don't show anything if no pending postponements
  }

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <div className="flex-1">
            <p className="font-medium text-orange-800">Session Postponement Requests</p>
            <p className="text-sm text-orange-700">
              You have {pendingPostponements.length} session{pendingPostponements.length > 1 ? 's' : ''} that need{pendingPostponements.length === 1 ? 's' : ''} your response
            </p>
          </div>
        </div>

        {pendingPostponements.map(postponement => {
          const isExpired = new Date(postponement.deadline_for_responses) < new Date();
          
          return (
            <div key={postponement.id} className="p-4 bg-card border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium">{postponement.session_name}</h4>
                  <p className="text-sm text-muted-foreground">with {postponement.trainer_name}</p>
                </div>
                <Badge variant={isExpired ? "destructive" : "secondary"}>
                  {isExpired ? "Expired" : "Pending"}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">From:</span>
                  <span className="line-through">{formatDateTime(postponement.original_start)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium text-green-600">{formatDateTime(postponement.new_start)}</span>
                </div>
                {postponement.reason && (
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground text-xs mt-0.5">Reason:</span>
                    <span className="text-xs">{postponement.reason}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Respond by {formatDateTime(postponement.deadline_for_responses)}</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewPostponement(postponement)}
                className="w-full mt-3"
                disabled={isExpired}
              >
                {isExpired ? "Expired" : "Respond"}
              </Button>
            </div>
          );
        })}
      </div>

      <PostponementNotificationDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        postponement={selectedPostponement}
        onRespond={respondToPostponement}
      />
    </>
  );
}