
import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ProgramListItem } from "./ProgramListItem";
import { AssignedProgramItem } from "./AssignedProgramItem";
import { ProgramClientsDialog } from "../clients/ClientProfileTabs/ProgramClientsDialog";

interface ProgramsTabContentProps {
  programs: {
    id: number;
    title: string;
    type: string;
    clientCount: number;
    lastUpdated: string;
    objective?: string;
    duration?: number;
    isPaid?: boolean;
    price?: number;
  }[];
  clients: {
    id: number;
    name: string;
    email: string;
  }[];
  setShowAssignDialog: (show: boolean) => void;
  setActiveClient: (client: string | null) => void;
  setShowEditProgram: (show: boolean) => void;
  setActiveProgramId: (programId: number | null) => void;
}

export function ProgramsTabContent({ 
  programs, 
  clients, 
  setShowAssignDialog, 
  setActiveClient,
  setShowEditProgram,
  setActiveProgramId
}: ProgramsTabContentProps) {
  const [showProgramClients, setShowProgramClients] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

  const handleAssign = () => {
    setActiveClient(null);
    setShowAssignDialog(true);
  };

  const handleChangeProgram = (clientName: string) => {
    setActiveClient(clientName);
    setShowAssignDialog(true);
  };

  const handleEdit = (programId: number) => {
    console.log("Editing program with ID:", programId);
    setActiveProgramId(programId);
    setShowEditProgram(true);
  };

  const handleViewClients = (program: typeof programs[0]) => {
    setSelectedProgram(program);
    setShowProgramClients(true);
  };

  return (
    <>
      <TabsContent value="programs" className="space-y-4 mt-2">
        {programs.length > 0 ? (
          programs.map((program) => (
            <ProgramListItem 
              key={program.id} 
              program={program} 
              onAssign={handleAssign}
              onEdit={() => handleEdit(program.id)}
              onViewClients={() => handleViewClients(program)}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No programs found. Create your first program.</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="assigned" className="space-y-4 mt-2">
        {clients.length > 0 ? (
          clients.map((client) => (
            <AssignedProgramItem 
              key={client.id} 
              client={client} 
              currentProgram={client.id % 2 === 0 ? "Strength & Conditioning" : "Weight Loss Program"}
              onChangeProgram={() => handleChangeProgram(client.name)}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No clients found. Invite clients to assign programs.</p>
          </div>
        )}
      </TabsContent>

      {/* Program Clients Dialog */}
      <ProgramClientsDialog 
        program={selectedProgram}
        open={showProgramClients}
        onOpenChange={setShowProgramClients}
      />
    </>
  );
}
