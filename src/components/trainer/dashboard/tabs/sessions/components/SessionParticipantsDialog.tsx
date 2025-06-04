
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, UserCheck, Crown, Clock, CheckCircle2, XCircle } from "lucide-react";
import { TrainerSessionItem } from "@/types/sessions";
import { SessionParticipant, WaitingListEntry } from "@/types/sessionParticipants";

interface SessionParticipantsDialogProps {
  session: TrainerSessionItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SessionParticipantsDialog({ 
  session, 
  open, 
  onOpenChange 
}: SessionParticipantsDialogProps) {
  if (!session) return null;

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'unpaid':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'unpaid':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Mock data for demonstration
  const mockParticipants: SessionParticipant[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      isClient: true,
      paymentStatus: 'paid',
      bookedAt: '2024-03-10T09:30:00Z',
      phone: '+1234567890'
    },
    {
      id: '2',
      name: 'Mike Peterson',
      email: 'mike@example.com',
      isClient: true,
      paymentStatus: 'paid',
      bookedAt: '2024-03-10T10:15:00Z'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma@example.com',
      isClient: false,
      paymentStatus: 'pending',
      bookedAt: '2024-03-11T14:20:00Z',
      phone: '+1987654321'
    },
    {
      id: '4',
      name: 'John Smith',
      email: 'john@example.com',
      isClient: false,
      paymentStatus: 'unpaid',
      bookedAt: '2024-03-11T16:45:00Z'
    }
  ];

  const mockWaitingList: WaitingListEntry[] = [
    {
      id: '5',
      name: 'Lisa Garcia',
      email: 'lisa@example.com',
      isClient: true,
      addedAt: '2024-03-12T08:30:00Z',
      priority: 1
    },
    {
      id: '6',
      name: 'David Chen',
      email: 'david@example.com',
      isClient: false,
      addedAt: '2024-03-12T11:20:00Z',
      priority: 2
    }
  ];

  const participants = session.participantDetails || mockParticipants.slice(0, session.participants);
  const waitingList = session.waitingListDetails || (session.waitingList ? mockWaitingList.slice(0, session.waitingList) : []);

  const clientCount = participants.filter(p => p.isClient).length;
  const nonClientCount = participants.filter(p => !p.isClient).length;
  const paidCount = participants.filter(p => p.paymentStatus === 'paid').length;
  const pendingCount = participants.filter(p => p.paymentStatus === 'pending').length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">
            {session.name} - Participants
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {typeof session.date === 'string' ? session.date : session.date.toLocaleDateString()} • {session.time}
          </p>
        </DialogHeader>
        
        {/* Session Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{participants.length}/{session.maxParticipants}</p>
            <p className="text-sm text-muted-foreground">Booked</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{clientCount}</p>
            <p className="text-sm text-muted-foreground">Clients</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{paidCount}</p>
            <p className="text-sm text-muted-foreground">Paid</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{waitingList.length}</p>
            <p className="text-sm text-muted-foreground">Waiting</p>
          </div>
        </div>

        {/* Booked Participants */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCheck className="h-5 w-5" />
              Booked Participants ({participants.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{participant.name}</h4>
                      {participant.isClient ? (
                        <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          Client
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">New</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{participant.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge 
                    variant="outline" 
                    className={`flex items-center gap-1 text-xs ${getPaymentStatusColor(participant.paymentStatus)}`}
                  >
                    {getPaymentStatusIcon(participant.paymentStatus)}
                    {participant.paymentStatus}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Waiting List */}
        {waitingList.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5" />
                Waiting List ({waitingList.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {waitingList.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-yellow-100 text-yellow-700 text-xs">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium truncate">{entry.name}</h4>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300 text-xs">
                          #{entry.priority}
                        </Badge>
                        {entry.isClient && (
                          <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Client
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{entry.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button size="sm" variant="default" className="h-8 px-3 bg-green-600 hover:bg-green-700 text-xs">
                      Promote
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 px-3 text-xs">
                      Notify
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
