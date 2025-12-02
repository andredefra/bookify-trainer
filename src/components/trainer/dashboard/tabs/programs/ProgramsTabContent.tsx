import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ProgramListItem } from "./ProgramListItem";
import { AssignedProgramItem } from "./AssignedProgramItem";
import { ProgramClientsDialog } from "../clients/ClientProfileTabs/ProgramClientsDialog";
import { TrainerSessionEditorDialog } from "./TrainerSessionEditorDialog";
import { ProgramStatsDialog } from "./ProgramStatsDialog";
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
  const [showStatsDialog, setShowStatsDialog] = useState(false);
  const [selectedClientForStats, setSelectedClientForStats] = useState<typeof clients[0] | null>(null);

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

  const handleViewStats = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    setSelectedClientForStats(client);
    setShowStatsDialog(true);
  };

  // Generate mock stats data for a client
  const generateStatsData = (client: typeof clients[0]) => {
    const programName = client.id % 2 === 0 ? "Strength & Conditioning" : "Weight Loss Program";
    return {
      clientName: client.name,
      programName,
      totalSessions: 12,
      completedSessions: client.id % 3 === 0 ? 6 : client.id % 2 === 0 ? 9 : 4,
      progressPercentage: client.id % 3 === 0 ? 50 : client.id % 2 === 0 ? 75 : 33,
      totalVolume: 45000 + (client.id * 1000),
      averageSessionDuration: 55 + (client.id % 10),
      bestLifts: [
        { exercise: "Bench Press", weight: 85 + (client.id * 2), date: "2024-11-15" },
        { exercise: "Squat", weight: 110 + (client.id * 3), date: "2024-11-20" },
        { exercise: "Deadlift", weight: 130 + (client.id * 2), date: "2024-11-18" },
        { exercise: "Shoulder Press", weight: 50 + client.id, date: "2024-11-22" },
        { exercise: "Barbell Row", weight: 70 + client.id, date: "2024-11-19" },
      ],
      weeklyVolume: [
        { week: "Week 1", volume: 8500 + (client.id * 100) },
        { week: "Week 2", volume: 9200 + (client.id * 150) },
        { week: "Week 3", volume: 9800 + (client.id * 120) },
        { week: "Week 4", volume: 10500 + (client.id * 200) },
        { week: "Week 5", volume: 11000 + (client.id * 180) },
        { week: "Week 6", volume: 11800 + (client.id * 220) },
      ],
      sessions: [
        {
          id: "s1",
          sessionNumber: 1,
          title: "Upper Body Strength",
          completedDate: "Nov 5",
          duration: 58,
          totalVolume: 4200,
          exercises: [
            { name: "Bench Press", weightUsed: 70, maxAchieved: 85, sets: 4, reps: "8-10" },
            { name: "Barbell Rows", weightUsed: 55, maxAchieved: 70, sets: 4, reps: "10-12" },
            { name: "Shoulder Press", weightUsed: 40, maxAchieved: 50, sets: 3, reps: "8-10" },
            { name: "Lateral Raises", weightUsed: 10, maxAchieved: 0, sets: 3, reps: "12-15" },
          ],
          completed: true
        },
        {
          id: "s2",
          sessionNumber: 2,
          title: "Lower Body Strength",
          completedDate: "Nov 8",
          duration: 62,
          totalVolume: 5800,
          exercises: [
            { name: "Squats", weightUsed: 90, maxAchieved: 110, sets: 4, reps: "8-10" },
            { name: "Romanian Deadlifts", weightUsed: 70, maxAchieved: 85, sets: 4, reps: "8-10" },
            { name: "Leg Press", weightUsed: 120, maxAchieved: 0, sets: 3, reps: "12-15" },
            { name: "Calf Raises", weightUsed: 60, maxAchieved: 0, sets: 4, reps: "15-20" },
          ],
          completed: true
        },
        {
          id: "s3",
          sessionNumber: 3,
          title: "Full Body & Core",
          completedDate: "Nov 12",
          duration: 55,
          totalVolume: 4900,
          exercises: [
            { name: "Deadlifts", weightUsed: 100, maxAchieved: 130, sets: 4, reps: "6-8" },
            { name: "Pull-ups", weightUsed: 0, maxAchieved: 0, sets: 3, reps: "8-10" },
            { name: "Dumbbell Press", weightUsed: 25, maxAchieved: 0, sets: 3, reps: "10-12" },
            { name: "Plank", weightUsed: 0, maxAchieved: 0, sets: 3, reps: "60 sec" },
          ],
          completed: true
        },
        {
          id: "s4",
          sessionNumber: 4,
          title: "Push Day",
          completedDate: undefined,
          duration: undefined,
          totalVolume: 0,
          exercises: [
            { name: "Incline Bench Press", weightUsed: 0, maxAchieved: 0, sets: 4, reps: "8-10" },
            { name: "Dumbbell Flyes", weightUsed: 0, maxAchieved: 0, sets: 3, reps: "12-15" },
            { name: "Tricep Pushdowns", weightUsed: 0, maxAchieved: 0, sets: 3, reps: "12-15" },
          ],
          completed: false
        },
        {
          id: "s5",
          sessionNumber: 5,
          title: "Pull Day",
          completedDate: undefined,
          duration: undefined,
          totalVolume: 0,
          exercises: [
            { name: "Lat Pulldowns", weightUsed: 0, maxAchieved: 0, sets: 4, reps: "10-12" },
            { name: "Seated Rows", weightUsed: 0, maxAchieved: 0, sets: 4, reps: "10-12" },
            { name: "Bicep Curls", weightUsed: 0, maxAchieved: 0, sets: 3, reps: "10-12" },
          ],
          completed: false
        },
      ]
    };
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
              notes: "Focus on form and full range of motion",
              setsData: []
            },
            {
              id: "ex-2",
              name: "Barbell Rows",
              sets: 4,
              reps: "10-12",
              weight: 50,
              notes: "Keep back straight, controlled movement",
              setsData: []
            },
            {
              id: "ex-3",
              name: "Shoulder Press",
              sets: 3,
              reps: "8-10",
              weight: 35,
              notes: "Press overhead, avoid arching back",
              setsData: []
            },
            {
              id: "ex-4",
              name: "Lateral Raises",
              sets: 3,
              reps: "12-15",
              weight: 10,
              notes: "Light weight, focus on shoulders",
              setsData: []
            },
            {
              id: "ex-5",
              name: "Tricep Dips",
              sets: 3,
              reps: "10-12",
              notes: "Use assisted machine if needed",
              setsData: []
            },
            {
              id: "ex-6",
              name: "Bicep Curls",
              sets: 3,
              reps: "10-12",
              weight: 12,
              notes: "Alternate arms or both together",
              setsData: []
            },
            {
              id: "ex-7",
              name: "Face Pulls",
              sets: 3,
              reps: "15-20",
              weight: 20,
              notes: "Great for rear delts and posture",
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
              id: "ex-8",
              name: "Squats",
              sets: 4,
              reps: "8-10",
              weight: 80,
              notes: "Go to parallel or below",
              setsData: []
            },
            {
              id: "ex-9",
              name: "Romanian Deadlifts",
              sets: 4,
              reps: "8-10",
              weight: 70,
              notes: "Feel the stretch in hamstrings",
              setsData: []
            },
            {
              id: "ex-10",
              name: "Leg Press",
              sets: 3,
              reps: "12-15",
              weight: 120,
              notes: "Full range of motion",
              setsData: []
            },
            {
              id: "ex-11",
              name: "Walking Lunges",
              sets: 3,
              reps: "10 per leg",
              weight: 15,
              notes: "Hold dumbbells, keep torso upright",
              setsData: []
            },
            {
              id: "ex-12",
              name: "Leg Curls",
              sets: 3,
              reps: "12-15",
              weight: 40,
              notes: "Controlled tempo",
              setsData: []
            },
            {
              id: "ex-13",
              name: "Calf Raises",
              sets: 4,
              reps: "15-20",
              weight: 60,
              notes: "Full stretch and contraction",
              setsData: []
            }
          ],
          completed: false
        },
        {
          id: "session-3",
          sessionNumber: 3,
          title: "Full Body & Core",
          exercises: [
            {
              id: "ex-14",
              name: "Deadlifts",
              sets: 4,
              reps: "6-8",
              weight: 90,
              notes: "Heavy compound movement",
              setsData: []
            },
            {
              id: "ex-15",
              name: "Pull-ups",
              sets: 3,
              reps: "8-10",
              notes: "Use assistance if needed",
              setsData: []
            },
            {
              id: "ex-16",
              name: "Dumbbell Chest Press",
              sets: 3,
              reps: "10-12",
              weight: 25,
              notes: "Each hand",
              setsData: []
            },
            {
              id: "ex-17",
              name: "Cable Rows",
              sets: 3,
              reps: "12-15",
              weight: 45,
              notes: "Squeeze shoulder blades together",
              setsData: []
            },
            {
              id: "ex-18",
              name: "Plank",
              sets: 3,
              reps: "60 sec",
              notes: "Hold position, engage core",
              setsData: []
            },
            {
              id: "ex-19",
              name: "Russian Twists",
              sets: 3,
              reps: "20 per side",
              weight: 10,
              notes: "Medicine ball or plate",
              setsData: []
            },
            {
              id: "ex-20",
              name: "Leg Raises",
              sets: 3,
              reps: "12-15",
              notes: "Controlled lowering",
              setsData: []
            },
            {
              id: "ex-21",
              name: "Mountain Climbers",
              sets: 3,
              reps: "30 sec",
              notes: "High intensity finisher",
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
              onViewStats={handleViewStats}
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

      {/* Program Stats Dialog */}
      <ProgramStatsDialog
        open={showStatsDialog}
        onOpenChange={setShowStatsDialog}
        statsData={selectedClientForStats ? generateStatsData(selectedClientForStats) : null}
      />
    </>
  );
}
