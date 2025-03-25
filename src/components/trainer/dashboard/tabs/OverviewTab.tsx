
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateSessionDialog } from "../dialogs/CreateSessionDialog";
import { Badge } from "@/components/ui/badge";

interface SessionItem {
  id: number;
  name: string;
  time: string;
  date: string;
  participants: number;
  maxParticipants: number;
  waitingList?: number;
  paymentStatus?: {
    paid: number;
    pending: number;
    total: number;
  };
}

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
}

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
}

interface OverviewTabProps {
  upcomingSessions: SessionItem[];
  clients: ClientItem[];
  messageRequests: MessageItem[];
}

export function OverviewTab({ upcomingSessions, clients, messageRequests }: OverviewTabProps) {
  const [showCreateSessionDialog, setShowCreateSessionDialog] = useState(false);
  
  // Add payment status and waiting list to mock data if not available
  const sessionsWithPaymentInfo = upcomingSessions.map(session => ({
    ...session,
    waitingList: session.waitingList || 0,
    paymentStatus: session.paymentStatus || {
      paid: Math.floor(Math.random() * session.participants),
      pending: Math.floor(Math.random() * session.participants),
      get total() { return this.paid + this.pending; }
    }
  }));
  
  return (
    <div className="space-y-6">
      <UpcomingSessionsCard 
        sessions={sessionsWithPaymentInfo} 
        onNewSession={() => setShowCreateSessionDialog(true)} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentClientsCard clients={clients} />
        <MessageRequestsCard messages={messageRequests} />
      </div>
      
      <CreateSessionDialog 
        open={showCreateSessionDialog} 
        onOpenChange={setShowCreateSessionDialog}
        onSubmit={(data) => {
          // Here you would typically save the session to your database
          console.log("New session data:", data);
          toast.success("Session created successfully!");
          setShowCreateSessionDialog(false);
        }}
      />
    </div>
  );
}

function UpcomingSessionsCard({ sessions, onNewSession }: { sessions: SessionItem[], onNewSession: () => void }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>Your scheduled training sessions</CardDescription>
        </div>
        <Button className="flex items-center" onClick={onNewSession}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">{session.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {session.date} • {session.time}
                </div>
                <div className="flex mt-2 gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {session.paymentStatus.paid} paid
                  </Badge>
                  {session.paymentStatus.pending > 0 && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      {session.paymentStatus.pending} pending
                    </Badge>
                  )}
                  {session.waitingList > 0 && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {session.waitingList} waiting
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 text-sm">
                  <span className="font-medium">{session.participants}/{session.maxParticipants}</span> booked
                </div>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-center py-4">
        <Button variant="link">View all sessions</Button>
      </CardFooter>
    </Card>
  );
}

function RecentClientsCard({ clients }: { clients: ClientItem[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Clients</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {clients.slice(0, 3).map((client) => (
            <div key={client.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{client.name}</div>
                <div className="text-xs text-muted-foreground">
                  Last session: {client.lastSession}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Message
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MessageRequestsCard({ messages }: { messages: MessageItem[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Message Requests</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{message.from}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[220px]">
                  {message.preview}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {message.time}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Reply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
