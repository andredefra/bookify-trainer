
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, TrendingUp, Users, Target } from "lucide-react";
import { TrainerProgramDetailsDialog } from "./TrainerProgramDetailsDialog";
import { currentProgram } from "@/data/training";

interface ProgramClientsDialogProps {
  program: {
    id: number;
    title: string;
    type: string;
    clientCount: number;
    lastUpdated: string;
    objective?: string;
    duration?: number;
    isPaid?: boolean;
    price?: number;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock client data for the program
const mockProgramClients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    startDate: "2024-03-01",
    adherence: 85,
    completedSessions: 6,
    totalSessions: 32,
    currentWeek: 3,
    status: "active",
    lastSession: "2024-03-15"
  },
  {
    id: 2,
    name: "Mike Peterson",
    email: "mike@example.com", 
    startDate: "2024-02-15",
    adherence: 92,
    completedSessions: 12,
    totalSessions: 32,
    currentWeek: 4,
    status: "active",
    lastSession: "2024-03-14"
  },
  {
    id: 3,
    name: "Lisa Garcia",
    email: "lisa@example.com",
    startDate: "2024-03-10",
    adherence: 76,
    completedSessions: 4,
    totalSessions: 32,
    currentWeek: 2,
    status: "active",
    lastSession: "2024-03-13"
  }
];

export function ProgramClientsDialog({ program, open, onOpenChange }: ProgramClientsDialogProps) {
  const [selectedClient, setSelectedClient] = useState<typeof mockProgramClients[0] | null>(null);
  const [showClientProgram, setShowClientProgram] = useState(false);

  if (!program) return null;

  const handleViewClientProgram = (client: typeof mockProgramClients[0]) => {
    setSelectedClient(client);
    setShowClientProgram(true);
  };

  const getStatusBadge = (adherence: number) => {
    if (adherence >= 85) return { variant: "default" as const, text: "Excellent" };
    if (adherence >= 70) return { variant: "secondary" as const, text: "Good" };
    return { variant: "destructive" as const, text: "Needs Attention" };
  };

  const avgAdherence = Math.round(mockProgramClients.reduce((sum, client) => sum + client.adherence, 0) / mockProgramClients.length);
  const totalCompletedSessions = mockProgramClients.reduce((sum, client) => sum + client.completedSessions, 0);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl p-4 md:p-6 overflow-y-auto max-h-[90vh]">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg md:text-xl">
              Clients in {program.title}
            </DialogTitle>
          </DialogHeader>
          
          {/* Program Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                Program Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Clients:</span>
                  <p className="font-medium text-lg">{mockProgramClients.length}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Average Adherence:</span>
                  <p className="font-medium text-lg">{avgAdherence}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Sessions:</span>
                  <p className="font-medium text-lg">{totalCompletedSessions}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Program Duration:</span>
                  <p className="font-medium text-lg">{program.duration} weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clients List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Assigned Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProgramClients.map((client) => {
                  const statusBadge = getStatusBadge(client.adherence);
                  const progressPercentage = (client.completedSessions / client.totalSessions) * 100;

                  return (
                    <div key={client.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{client.name}</h4>
                            <p className="text-sm text-muted-foreground">{client.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={statusBadge.variant}>{statusBadge.text}</Badge>
                          <span className="text-xs text-muted-foreground">{client.adherence}% adherence</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Started:</span>
                          <p className="font-medium">{new Date(client.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Week:</span>
                          <p className="font-medium">{client.currentWeek} of {program.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Sessions:</span>
                          <p className="font-medium">{client.completedSessions}/{client.totalSessions}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Session:</span>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(client.lastSession).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewClientProgram(client)}
                          className="flex items-center gap-1"
                        >
                          <TrendingUp className="h-4 w-4" />
                          View Progress
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      {/* Client Program Details Dialog */}
      <TrainerProgramDetailsDialog 
        program={currentProgram}
        open={showClientProgram}
        onOpenChange={setShowClientProgram}
        clientName={selectedClient?.name}
      />
    </>
  );
}
