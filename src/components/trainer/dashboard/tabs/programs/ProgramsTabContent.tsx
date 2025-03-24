
import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ProgramListItem } from "./ProgramListItem";
import { AssignedProgramItem } from "./AssignedProgramItem";

interface ProgramsTabContentProps {
  programs: {
    id: number;
    title: string;
    type: string;
    clientCount: number;
    lastUpdated: string;
  }[];
  clients: {
    id: number;
    name: string;
    email: string;
  }[];
  setShowAssignDialog: (show: boolean) => void;
  setActiveClient: (client: string | null) => void;
}

export function ProgramsTabContent({ 
  programs, 
  clients, 
  setShowAssignDialog, 
  setActiveClient 
}: ProgramsTabContentProps) {
  const handleAssign = () => {
    setActiveClient(null);
    setShowAssignDialog(true);
  };

  const handleChangeProgram = (clientName: string) => {
    setActiveClient(clientName);
    setShowAssignDialog(true);
  };

  return (
    <>
      <TabsContent value="programs">
        <div className="space-y-4">
          {programs.map((program) => (
            <ProgramListItem 
              key={program.id} 
              program={program} 
              onAssign={handleAssign}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="assigned">
        <div className="space-y-4">
          {clients.map((client) => (
            <AssignedProgramItem 
              key={client.id} 
              client={client} 
              currentProgram={client.id % 2 === 0 ? "Strength & Conditioning" : "Weight Loss Program"}
              onChangeProgram={handleChangeProgram}
            />
          ))}
        </div>
      </TabsContent>
    </>
  );
}
