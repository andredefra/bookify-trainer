
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Phone, Euro, Calendar, Target, Dumbbell } from "lucide-react";
import { UnifiedClient } from "../../types/UnifiedClient";

interface ClientProfileDialogProps {
  client: UnifiedClient | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientProfileDialog({ client, open, onOpenChange }: ClientProfileDialogProps) {
  if (!client) return null;

  const clientSinceDate = client.clientSince ? new Date(client.clientSince).toLocaleDateString() : 'N/A';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {client.name}
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Client
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Complete client profile and activity overview
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] pr-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Client since: {clientSinceDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Activity Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div>Total Sessions: <span className="font-medium">{client.sessions}</span></div>
                    <div>Last Session: <span className="font-medium">{client.lastSession}</span></div>
                    {client.value && (
                      <div className="flex items-center gap-1">
                        Client Value: 
                        <Euro className="h-3 w-3" />
                        <span className="font-medium">{client.value}</span>
                      </div>
                    )}
                    {client.source && (
                      <div>Source: <span className="font-medium">{client.source}</span></div>
                    )}
                  </div>
                </div>
              </div>
              
              {client.notes && (
                <div className="space-y-2">
                  <h4 className="font-medium">Notes</h4>
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                    {client.notes}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="goals" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-medium">Current Goals</h4>
                {client.goals && client.goals.length > 0 ? (
                  <div className="space-y-3">
                    {client.goals.map((goal) => (
                      <div key={goal.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                        <div className="flex items-center gap-3">
                          <Target className="h-4 w-4 text-blue-600" />
                          <div>
                            <div className="font-medium">{goal.description}</div>
                            <div className="text-xs text-muted-foreground capitalize">{goal.type}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{goal.progress}%</div>
                          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No goals set yet.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="programs" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-medium">Assigned Programs</h4>
                {client.programs && client.programs.length > 0 ? (
                  <div className="space-y-3">
                    {client.programs.map((program, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                        <Dumbbell className="h-4 w-4 text-purple-600" />
                        <div>
                          <div className="font-medium">{program.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{program.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No programs assigned yet.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-medium">Training Notes</h4>
                {client.notes ? (
                  <div className="p-3 bg-muted/30 rounded-md">
                    <p className="text-sm">{client.notes}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No notes available.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
