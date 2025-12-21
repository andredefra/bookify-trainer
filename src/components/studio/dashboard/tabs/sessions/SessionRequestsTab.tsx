import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, Clock, User, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";

export interface SessionRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  requestedDate: string;
  requestedTime: string;
  preferredTrainer?: string;
  sessionType: "personal" | "group";
  message?: string;
  status: "pending" | "approved" | "declined";
  createdAt: string;
}

interface SessionRequestsTabProps {
  requests: SessionRequest[];
  onApprove: (request: SessionRequest, trainerId: string) => void;
  onDecline: (request: SessionRequest, reason: string) => void;
  trainers: { id: string; name: string }[];
}

export function SessionRequestsTab({ 
  requests, 
  onApprove, 
  onDecline, 
  trainers 
}: SessionRequestsTabProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<Record<string, string>>({});
  
  const pendingRequests = requests.filter(r => r.status === "pending");
  const processedRequests = requests.filter(r => r.status !== "pending");

  const handleApprove = (request: SessionRequest) => {
    const trainerId = selectedTrainer[request.id] || trainers[0]?.id || "";
    onApprove(request, trainerId);
  };

  const handleDecline = (request: SessionRequest) => {
    onDecline(request, "Schedule conflict");
  };

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 bg-muted/20 rounded-lg border border-dashed">
        <Clock className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No session requests</p>
        <p className="text-sm text-muted-foreground">Client requests will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingRequests.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Badge variant="default">{pendingRequests.length}</Badge>
            Pending Requests
          </h3>
          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {request.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-semibold">{request.clientName}</h4>
                        <p className="text-sm text-muted-foreground">{request.clientEmail}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {format(new Date(request.requestedDate), "MMM dd, yyyy")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {request.requestedTime}
                          </span>
                          <Badge variant="secondary">
                            {request.sessionType === "personal" ? "Personal" : "Group"}
                          </Badge>
                        </div>
                        
                        {request.message && (
                          <div className="mt-2 p-2 bg-muted/50 rounded-md text-sm">
                            <MessageSquare className="h-3 w-3 inline mr-1" />
                            {request.message}
                          </div>
                        )}
                        
                        {request.preferredTrainer && (
                          <p className="text-sm mt-2">
                            <span className="text-muted-foreground">Preferred trainer:</span>{" "}
                            <span className="font-medium">{request.preferredTrainer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <select
                        className="px-3 py-2 border rounded-md text-sm bg-background"
                        value={selectedTrainer[request.id] || ""}
                        onChange={(e) => setSelectedTrainer({
                          ...selectedTrainer,
                          [request.id]: e.target.value
                        })}
                      >
                        <option value="">Assign trainer...</option>
                        {trainers.map(trainer => (
                          <option key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleApprove(request)}
                          disabled={!selectedTrainer[request.id]}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDecline(request)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {processedRequests.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {processedRequests.slice(0, 5).map((request) => (
              <Card key={request.id} className="opacity-75">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {request.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{request.clientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(request.requestedDate), "MMM dd")} at {request.requestedTime}
                        </p>
                      </div>
                    </div>
                    <Badge variant={request.status === "approved" ? "default" : "destructive"}>
                      {request.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
