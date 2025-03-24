
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProgramDialog } from "./programs/CreateProgramDialog";
import { AssignProgramDialog } from "./programs/AssignProgramDialog";
import { ProgramsTabContent } from "./programs/ProgramsTabContent";

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
          
          <ProgramsTabContent
            programs={programs}
            clients={clients}
            setShowAssignDialog={setShowAssignDialog}
            setActiveClient={setActiveClient}
          />
        </Tabs>
        
        {/* Create Program Dialog */}
        <CreateProgramDialog 
          open={showProgramForm} 
          onOpenChange={setShowProgramForm} 
        />
        
        {/* Assign Program Dialog */}
        <AssignProgramDialog 
          open={showAssignDialog} 
          onOpenChange={setShowAssignDialog}
          activeClient={activeClient}
          clients={clients}
          programs={programs}
        />
      </CardContent>
    </Card>
  );
}
