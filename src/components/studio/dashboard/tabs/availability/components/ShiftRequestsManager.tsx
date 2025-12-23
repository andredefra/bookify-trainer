import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, Clock, Calendar, ArrowRightLeft, Plus } from "lucide-react";
import { ShiftRequest } from "../data/studioAvailabilityData";
import { format } from "date-fns";
import { toast } from "sonner";

interface ShiftRequestsManagerProps {
  requests: ShiftRequest[];
}

export function ShiftRequestsManager({ requests }: ShiftRequestsManagerProps) {
  const pendingRequests = requests.filter(r => r.status === "pending");
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "swap": return <ArrowRightLeft className="h-4 w-4" />;
      case "time_off": return <Calendar className="h-4 w-4" />;
      case "extra_shift": return <Plus className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      swap: "bg-blue-100 text-blue-700",
      time_off: "bg-rose-100 text-rose-700",
      extra_shift: "bg-emerald-100 text-emerald-700",
      change: "bg-amber-100 text-amber-700"
    };
    const labels: Record<string, string> = {
      swap: "Swap Request",
      time_off: "Time Off",
      extra_shift: "Extra Shift",
      change: "Schedule Change"
    };
    return { style: styles[type], label: labels[type] };
  };

  const handleApprove = (request: ShiftRequest) => {
    toast.success(`Approved ${request.trainerName}'s request`);
  };

  const handleReject = (request: ShiftRequest) => {
    toast.success(`Rejected ${request.trainerName}'s request`);
  };

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Pending Requests
              {pendingRequests.length > 0 && (
                <Badge className="bg-amber-500">{pendingRequests.length}</Badge>
              )}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending requests
            </div>
          ) : (
            pendingRequests.map((request) => {
              const typeBadge = getTypeBadge(request.type);
              return (
                <div 
                  key={request.id}
                  className="p-4 rounded-lg border bg-muted/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {request.trainerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{request.trainerName}</h4>
                          <Badge className={typeBadge.style}>
                            {getTypeIcon(request.type)}
                            <span className="ml-1">{typeBadge.label}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {request.reason}
                        </p>
                        {request.requestedDate && (
                          <p className="text-sm mt-2">
                            <span className="text-muted-foreground">Requested date: </span>
                            <span className="font-medium">
                              {format(new Date(request.requestedDate), "EEEE, MMM d, yyyy")}
                            </span>
                            {request.requestedTime && (
                              <span className="text-muted-foreground"> at {request.requestedTime}</span>
                            )}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          Submitted {format(new Date(request.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50"
                        onClick={() => handleReject(request)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleApprove(request)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              <span>Create Shift</span>
              <span className="text-xs text-muted-foreground">Assign a new shift to a trainer</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Bulk Schedule</span>
              <span className="text-xs text-muted-foreground">Schedule multiple shifts at once</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col">
              <ArrowRightLeft className="h-6 w-6 mb-2" />
              <span>Swap Shifts</span>
              <span className="text-xs text-muted-foreground">Swap shifts between trainers</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
