import { useState } from "react";
import { PlusCircle, Settings } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProgramDialog } from "./programs/CreateProgramDialog";
import { AssignProgramDialog } from "./programs/AssignProgramDialog";
import { ExerciseLibraryDialog } from "./programs/ExerciseLibraryDialog";
import { ProgramsTabContent } from "./programs/ProgramsTabContent";
import { currentProgram } from "@/data/training/mockPrograms/currentProgram";
import { Exercise } from "@/data/training/types";
import { ProgramProgressCard } from './programs/ProgramProgressCard';
import { ProgramExpirationAlert } from './programs/ProgramExpirationAlert';
import { useProgramAssignments } from '@/hooks/useProgramAssignments';
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export function ProgramsTab() {
  const [showProgramForm, setShowProgramForm] = useState(false);
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showEditProgram, setShowEditProgram] = useState(false);
  const [activeProgramId, setActiveProgramId] = useState<number | null>(null);
  
  // Get current demo user ID for data isolation
  const currentUserId = getCurrentDemoUserId();
  console.log('ProgramsTab - Using user ID:', currentUserId);
  
  // Mock programs with extended data and exercises
  const sampleExercises: Exercise[] = currentProgram.sessions[0].exercises.map(ex => ({
    ...ex,
    id: Math.random().toString(36).substring(2, 9)
  }));
  
  const cardioExercises: Exercise[] = [
    {
      id: "ex-c1",
      name: "Treadmill Running",
      sets: 3,
      reps: "10 minutes",
      notes: "7-8 RPE intensity"
    },
    {
      id: "ex-c2",
      name: "Jumping Jacks",
      sets: 4,
      reps: "30 seconds",
      notes: "Full range of motion"
    }
  ];
  
  const mobilityExercises: Exercise[] = [
    {
      id: "ex-m1",
      name: "Hip Flexor Stretch",
      sets: 3,
      reps: "30 seconds each side",
      notes: "Feel a gentle stretch"
    },
    {
      id: "ex-m2",
      name: "Shoulder Dislocates",
      sets: 2,
      reps: "10 reps",
      notes: "Use a resistance band"
    }
  ];
  
  // Mock programs with extended data and exercises
  const programs = [
    { 
      id: 1, 
      title: "Strength & Conditioning", 
      type: "strength", 
      clientCount: 3, 
      lastUpdated: "2 days ago", 
      objective: "Build muscle",
      duration: 8,
      isPaid: true,
      price: 49.99,
      exercises: sampleExercises
    },
    { 
      id: 2, 
      title: "Weight Loss Program", 
      type: "cardio", 
      clientCount: 5, 
      lastUpdated: "5 days ago",
      objective: "Lose weight",
      duration: 12,
      isPaid: true,
      price: 69.99,
      exercises: cardioExercises
    },
    { 
      id: 3, 
      title: "Flexibility & Recovery", 
      type: "mobility", 
      clientCount: 2, 
      lastUpdated: "1 week ago",
      objective: "Improve mobility",
      duration: 4,
      isPaid: false,
      exercises: mobilityExercises
    },
    { 
      id: 4, 
      title: "Beginners Workout Plan", 
      type: "general", 
      clientCount: 7, 
      lastUpdated: "3 days ago",
      objective: "Learn basics",
      duration: 6,
      isPaid: false,
      exercises: sampleExercises.slice(0, 2)
    },
  ];
  
  // Mock clients
  const clients = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com" },
    { id: 2, name: "Mike Peterson", email: "mike@example.com" },
    { id: 3, name: "Lisa Garcia", email: "lisa@example.com" },
    { id: 4, name: "David Kim", email: "david@example.com" },
  ];

  // Find active program
  const activeProgram = activeProgramId 
    ? programs.find(p => p.id === activeProgramId) 
    : null;
  
  const { programProgress, updateSessionsCompleted } = useProgramAssignments();
  
  // Filter expiring programs (within 7 days or expired)
  const expiringPrograms = programProgress.filter(p => 
    p.daysUntilExpiry <= 7 || p.status === 'expired'
  );

  const handleContactClient = (clientName: string) => {
    console.log(`Contacting client: ${clientName}`);
    // Here you could open a message dialog or navigate to messages
  };
  
  return (
    <ErrorBoundary>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 overflow-visible">
          <div>
            <CardTitle>Training Programs</CardTitle>
            <CardDescription>Create and manage training programs for your clients</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              variant="outline"
              className="flex items-center w-full sm:w-auto"
              onClick={() => setShowExerciseLibrary(true)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Manage Exercises
            </Button>
            <Button 
              className="flex items-center w-full sm:w-auto"
              onClick={() => setShowProgramForm(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Program
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Expiration Alert */}
          <ProgramExpirationAlert expiringPrograms={expiringPrograms} />
          
          {/* Program Progress Cards */}
          {programProgress.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Client Progress Monitoring</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {programProgress.map((progress) => (
                  <ProgramProgressCard
                    key={progress.id}
                    progress={progress}
                    onUpdateSessions={updateSessionsCompleted}
                    onContactClient={handleContactClient}
                  />
                ))}
              </div>
            </div>
          )}
          
          <Tabs defaultValue="programs" className="w-full">
            <TabsList className="mb-6 w-full sm:w-auto">
              <TabsTrigger value="programs" className="flex-1 sm:flex-none">My Programs</TabsTrigger>
              <TabsTrigger value="assigned" className="flex-1 sm:flex-none">Assigned Programs</TabsTrigger>
            </TabsList>
            
            <ProgramsTabContent
              programs={programs}
              clients={clients}
              setShowAssignDialog={setShowAssignDialog}
              setActiveClient={setActiveClient}
              setShowEditProgram={setShowEditProgram}
              setActiveProgramId={setActiveProgramId}
            />
          </Tabs>
          
          {/* Dialogs */}
          <CreateProgramDialog 
            open={showProgramForm} 
            onOpenChange={setShowProgramForm} 
          />

          <ErrorBoundary>
            <ExerciseLibraryDialog
              open={showExerciseLibrary}
              onOpenChange={setShowExerciseLibrary}
            />
          </ErrorBoundary>
          
          <AssignProgramDialog 
            open={showAssignDialog} 
            onOpenChange={setShowAssignDialog}
            activeClient={activeClient}
            clients={clients}
            programs={programs}
          />
          
          <CreateProgramDialog 
            open={showEditProgram} 
            onOpenChange={setShowEditProgram}
            editMode={true}
            program={activeProgram}
          />
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}
