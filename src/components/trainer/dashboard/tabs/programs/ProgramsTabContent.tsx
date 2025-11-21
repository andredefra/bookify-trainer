import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ProgramListItem } from "./ProgramListItem";
import { AssignedProgramItem } from "./AssignedProgramItem";
import { ProgramClientsDialog } from "../clients/ClientProfileTabs/ProgramClientsDialog";
import { TrainerSessionEditorDialog } from "./TrainerSessionEditorDialog";
import { TrainingProgram } from "@/data/training/types";

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
  const [showSessionEditor, setShowSessionEditor] = useState(false);
  const [selectedClientForEdit, setSelectedClientForEdit] = useState<typeof clients[0] | null>(null);
  const [programForEdit, setProgramForEdit] = useState<TrainingProgram | null>(null);

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

  const handleViewProgress = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    // Mock program data - in real app, fetch from client_packages.training_program_data
    const mockProgram: TrainingProgram = {
      id: `prog-${clientId}`,
      title: clientId % 2 === 0 ? "Strength & Conditioning" : "Weight Loss Program",
      week: "Week 1",
      trainerName: "Demo Trainer",
      sessions: [
        {
          id: "session-1",
          sessionNumber: 1,
          title: "Upper Body Strength",
          exercises: [
            {
              id: "ex-1",
              name: "Bench Press",
              sets: 4,
              reps: "8-10",
              weight: 60,
              notes: "Focus on form",
              setsData: []
            },
            {
              id: "ex-2",
              name: "Rows",
              sets: 4,
              reps: "10-12",
              weight: 50,
              notes: "Controlled movement",
              setsData: []
            }
          ],
          completed: false
        },
        {
          id: "session-2",
          sessionNumber: 2,
          title: "Lower Body Strength",
          exercises: [
            {
              id: "ex-3",
              name: "Squats",
              sets: 4,
              reps: "8-10",
              weight: 80,
              notes: "Full depth",
              setsData: []
            }
          ],
          completed: false
        }
      ],
      targetFrequency: 3,
      totalSessions: 12
    };

    setSelectedClientForEdit(client);
    setProgramForEdit(mockProgram);
    setShowSessionEditor(true);
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
              onViewProgress={handleViewProgress}
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

      {/* Trainer Session Editor Dialog */}
      {selectedClientForEdit && programForEdit && (
        <TrainerSessionEditorDialog
          open={showSessionEditor}
          onOpenChange={setShowSessionEditor}
          clientId={String(selectedClientForEdit.id)}
          clientName={selectedClientForEdit.name}
          program={programForEdit}
          onSave={() => {
            // Refresh program data if needed
            setShowSessionEditor(false);
          }}
        />
      )}
    </>
  );
}
