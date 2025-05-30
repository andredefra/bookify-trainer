
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Copy, Link2, Mail, Phone, UserCheck, UserX, Crown, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { TrainerSessionItem } from "@/types/sessions";
import { SessionParticipant, WaitingListEntry } from "@/types/sessionParticipants";
import { toast } from "sonner";

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
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  if (!session) return null;

  const generateInviteLink = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/book-session/${session.id}?invite=${Date.now()}`;
    setInviteLink(link);
    toast.success("Invite link generated!");
  };

  const copyInviteLink = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied to clipboard!");
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'unpaid':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
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
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl p-4 md:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg md:text-xl">
            Session Participants - {session.name}
          </DialogTitle>
        </DialogHeader>
        
        {/* Session Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCheck className="h-5 w-5" />
              Session Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Total Booked:</span>
                <p className="font-medium text-lg">{participants.length}/{session.maxParticipants}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Existing Clients:</span>
                <p className="font-medium text-lg">{clientCount}</p>
              </div>
              <div>
                <span className="text-muted-foreground">New Users:</span>
                <p className="font-medium text-lg">{nonClientCount}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Waiting List:</span>
                <p className="font-medium text-lg">{waitingList.length}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
              <div>
                <span className="text-muted-foreground">Paid:</span>
                <p className="font-medium text-lg text-green-600">{paidCount}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Pending:</span>
                <p className="font-medium text-lg text-yellow-600">{pendingCount}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Unpaid:</span>
                <p className="font-medium text-lg text-red-600">{participants.length - paidCount - pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invite Link Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Link2 className="h-5 w-5" />
              Session Invite Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={generateInviteLink} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Link2 className="h-4 w-4" />
                Generate Invite Link
              </Button>
              {inviteLink && (
                <>
                  <div className="flex-1 p-2 bg-gray-50 rounded border text-sm break-all">
                    {inviteLink}
                  </div>
                  <Button 
                    onClick={copyInviteLink} 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Booked Participants */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCheck className="h-5 w-5" />
              Booked Participants ({participants.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {participants.map((participant) => (
                <div key={participant.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          {participant.name}
                          {participant.isClient ? (
                            <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200">
                              <Crown className="h-3 w-3 mr-1" />
                              Client
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                              New User
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">{participant.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge 
                        variant="outline" 
                        className={`flex items-center gap-1 ${getPaymentStatusColor(participant.paymentStatus)}`}
                      >
                        {getPaymentStatusIcon(participant.paymentStatus)}
                        {participant.paymentStatus.charAt(0).toUpperCase() + participant.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Booked:</span>
                      <p className="font-medium">{new Date(participant.bookedAt).toLocaleDateString()}</p>
                    </div>
                    {participant.phone && (
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <p className="font-medium flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {participant.phone}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Message
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Waiting List */}
        {waitingList.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5" />
                Waiting List ({waitingList.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waitingList.map((entry) => (
                  <div key={entry.id} className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-yellow-100 text-yellow-700 font-medium">
                            {entry.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            {entry.name}
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                              #{entry.priority}
                            </Badge>
                            {entry.isClient ? (
                              <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200">
                                <Crown className="h-3 w-3 mr-1" />
                                Client
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                                New User
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-muted-foreground">{entry.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Added:</span>
                        <p className="font-medium">{new Date(entry.addedAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Priority:</span>
                        <p className="font-medium">#{entry.priority}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                          Promote
                        </Button>
                        <Button size="sm" variant="outline">
                          Notify
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
