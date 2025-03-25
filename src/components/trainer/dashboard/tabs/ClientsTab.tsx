
import { Plus, Target, Dumbbell, Eye } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ClientProfileDialog } from "./clients/ClientProfileDialog";

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
}

interface ClientsTabProps {
  clients: ClientItem[];
}

export function ClientsTab({ clients }: ClientsTabProps) {
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [activeClient, setActiveClient] = useState<ClientItem | null>(null);
  
  const goalTypes = [
    "Weight Loss", "Muscle Gain", "Endurance", "Flexibility", "Strength", "Recovery"
  ];
  
  const handleViewProfile = (client: ClientItem) => {
    setActiveClient(client);
    setShowProfileDialog(true);
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Client Management</CardTitle>
              <CardDescription>Manage your client list and track progress</CardDescription>
            </div>
            <Button className="flex items-center" onClick={() => setShowClientDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Invite Client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="font-medium">{client.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {client.sessions} sessions • Last: {client.lastSession}
                    </div>
                    
                    {/* Sample goals and programs for demo */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {client.id === 1 && (
                        <>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Target className="h-3 w-3 mr-1" />
                            Lose 5kg
                          </Badge>
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            <Dumbbell className="h-3 w-3 mr-1" />
                            Strength Program
                          </Badge>
                        </>
                      )}
                      {client.id === 2 && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Target className="h-3 w-3 mr-1" />
                          Run 10K
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedClient(client.name);
                        setShowGoalDialog(true);
                      }}
                    >
                      <Target className="mr-1 h-4 w-4" />
                      Set Goals
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewProfile(client)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Add Client Dialog */}
      <Dialog open={showClientDialog} onOpenChange={setShowClientDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="client-email">Client Email</Label>
              <Input id="client-email" placeholder="client@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name (Optional)</Label>
              <Input id="client-name" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Personalized Message</Label>
              <Input id="message" placeholder="I'd like to invite you to train with me..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Assign Program (Optional)</Label>
              <Select>
                <SelectTrigger id="program">
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength & Conditioning</SelectItem>
                  <SelectItem value="weight-loss">Weight Loss Program</SelectItem>
                  <SelectItem value="mobility">Flexibility & Recovery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClientDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowClientDialog(false)}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Set Goals Dialog */}
      <Dialog open={showGoalDialog} onOpenChange={setShowGoalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedClient ? `Set Goals for ${selectedClient}` : "Set Client Goals"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goal-type">Goal Type</Label>
              <Select>
                <SelectTrigger id="goal-type">
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  {goalTypes.map(type => (
                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target">Target Value</Label>
              <Input id="target" placeholder="e.g. 5kg, 10km, etc." />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Target Date</Label>
              <Input type="date" id="deadline" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional details about this goal" />
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Current Goals</h4>
              
              {selectedClient === "Sarah Johnson" && (
                <div className="space-y-2">
                  <div className="p-2 bg-blue-50 rounded flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">Lose 5kg</span>
                      <span className="text-xs text-muted-foreground ml-2">by Aug 30, 2023</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-red-500">
                      Remove
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedClient === "Mike Peterson" && (
                <div className="space-y-2">
                  <div className="p-2 bg-green-50 rounded flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">Run 10K</span>
                      <span className="text-xs text-muted-foreground ml-2">by Sep 15, 2023</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-red-500">
                      Remove
                    </Button>
                  </div>
                </div>
              )}
              
              {(selectedClient !== "Sarah Johnson" && selectedClient !== "Mike Peterson") && (
                <div className="text-sm text-muted-foreground">
                  No goals set yet.
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGoalDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowGoalDialog(false)}>Save Goals</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Detailed Client Profile Dialog */}
      <ClientProfileDialog 
        client={activeClient}
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
      />
    </>
  );
}
