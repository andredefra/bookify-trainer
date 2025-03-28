
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProgramDialog } from "./programs/CreateProgramDialog";
import { AssignProgramDialog } from "./programs/AssignProgramDialog";
import { ProgramsTabContent } from "./programs/ProgramsTabContent";
import { currentProgram } from "@/data/training/mockPrograms/currentProgram";
import { Exercise } from "@/data/training/types";

export function ProgramsTab() {
  const [showProgramForm, setShowProgramForm] = useState(false);
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showEditProgram, setShowEditProgram] = useState(false);
  const [activeProgramId, setActiveProgramId] = useState<number | null>(null);
  
  // Sample exercises we can use for our programs
  const sampleExercises: Exercise[] = currentProgram.days[0].exercises.map(ex => ({
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
  
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 overflow-visible">
        <div>
          <CardTitle>Training Programs</CardTitle>
          <CardDescription>Create and manage training programs for your clients</CardDescription>
        </div>
        <Button 
          className="flex items-center self-start sm:self-auto w-full sm:w-auto"
          onClick={() => setShowProgramForm(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Program
        </Button>
      </CardHeader>
      <CardContent>
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
        
        {/* Edit Program Dialog */}
        <CreateProgramDialog 
          open={showEditProgram} 
          onOpenChange={setShowEditProgram}
          editMode={true}
          program={activeProgram}
        />
      </CardContent>
    </Card>
  );
}
