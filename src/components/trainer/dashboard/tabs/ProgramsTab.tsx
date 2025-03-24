
import { useState } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgramCreationForm } from "@/components/trainer/training/ProgramCreationForm";

export function ProgramsTab() {
  const [showProgramForm, setShowProgramForm] = useState(false);
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  // Mock programs
  const programs = [
    { id: 1, title: "Strength & Conditioning", type: "strength", clientCount: 3, lastUpdated: "2 days ago" },
    { id: 2, title: "Weight Loss Program", type: "cardio", clientCount: 5, lastUpdated: "5 days ago" },
    { id: 3, title: "Flexibility & Recovery", type: "mobility", clientCount: 2, lastUpdated: "1 week ago" },
  ];
  
  // Mock clients
  const clients = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com" },
    { id: 2, name: "Mike Peterson", email: "mike@example.com" },
    { id: 3, name: "Lisa Garcia", email: "lisa@example.com" },
    { id: 4, name: "David Kim", email: "david@example.com" },
  ];
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Training Programs</CardTitle>
            <CardDescription>Create and manage training programs for your clients</CardDescription>
          </div>
          <Button className="flex items-center" onClick={() => setShowProgramForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Program
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="programs">
          <TabsList className="mb-6">
            <TabsTrigger value="programs">My Programs</TabsTrigger>
            <TabsTrigger value="assigned">Assigned Programs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="programs">
            <div className="space-y-4">
              {programs.map((program) => (
                <div key={program.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{program.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      Type: {program.type} • Assigned to {program.clientCount} clients • Last updated: {program.lastUpdated}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowAssignDialog(true)}
                    >
                      Assign
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assigned">
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">{client.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      Current program: {client.id % 2 === 0 ? "Strength & Conditioning" : "Weight Loss Program"}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setActiveClient(client.name);
                        setShowAssignDialog(true);
                      }}
                    >
                      Change Program
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Progress
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Create Program Dialog */}
        <Dialog open={showProgramForm} onOpenChange={setShowProgramForm}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Create New Training Program</DialogTitle>
            </DialogHeader>
            <ProgramCreationForm 
              onSave={() => setShowProgramForm(false)}
              onCancel={() => setShowProgramForm(false)}
            />
          </DialogContent>
        </Dialog>
        
        {/* Assign Program Dialog */}
        <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {activeClient ? `Assign Program to ${activeClient}` : "Assign Program to Client"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {!activeClient && (
                <div className="space-y-2">
                  <Label htmlFor="client">Select Client</Label>
                  <Select>
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id.toString()}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="program">Select Program</Label>
                <Select>
                  <SelectTrigger id="program">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map(program => (
                      <SelectItem key={program.id} value={program.id.toString()}>
                        {program.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input type="date" id="startDate" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Add any specific instructions" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowAssignDialog(false)}>Assign Program</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
