import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Users, Calendar, Search, Edit, Trash2, Eye, Copy, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StudioCreateProgramDialog } from "./programs/StudioCreateProgramDialog";
import { ProgramDetailsDialog } from "./programs/ProgramDetailsDialog";
import { AssignProgramDialog } from "./programs/AssignProgramDialog";

export interface ProgramExercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  clients: number;
  weeks: number;
  status: "active" | "draft" | "archived";
  trainerId?: string;
  trainerName?: string;
  createdAt: string;
  exercises?: ProgramExercise[];
}

export function ProgramsTab() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const [programs, setPrograms] = useState<Program[]>([
    { 
      id: "1", 
      name: "12-Week Transformation", 
      description: "Complete body transformation program with progressive overload",
      clients: 8,
      weeks: 12,
      status: "active",
      trainerName: "Marco Rossi",
      trainerId: "1",
      createdAt: "2024-01-15",
      exercises: [
        { id: "1", name: "Barbell Squat", sets: 4, reps: "8-10", rest: "90s", notes: "Keep core tight" },
        { id: "2", name: "Bench Press", sets: 4, reps: "8-10", rest: "90s" },
        { id: "3", name: "Deadlift", sets: 3, reps: "6-8", rest: "120s", notes: "Focus on form" },
      ]
    },
    { 
      id: "2", 
      name: "Beginner Strength", 
      description: "Foundation strength building for newcomers",
      clients: 5,
      weeks: 8,
      status: "active",
      trainerName: "Laura Bianchi",
      trainerId: "2",
      createdAt: "2024-02-01",
      exercises: [
        { id: "1", name: "Goblet Squat", sets: 3, reps: "12-15", rest: "60s" },
        { id: "2", name: "Push-ups", sets: 3, reps: "10-12", rest: "60s" },
      ]
    },
    { 
      id: "3", 
      name: "HIIT Intensive", 
      description: "High intensity interval training for fat loss",
      clients: 12,
      weeks: 6,
      status: "active",
      trainerName: "Giuseppe Verde",
      trainerId: "3",
      createdAt: "2024-01-20",
      exercises: [
        { id: "1", name: "Burpees", sets: 4, reps: "30s", rest: "15s" },
        { id: "2", name: "Mountain Climbers", sets: 4, reps: "30s", rest: "15s" },
        { id: "3", name: "Jump Squats", sets: 4, reps: "30s", rest: "15s" },
      ]
    },
    { 
      id: "4", 
      name: "Yoga & Flexibility", 
      description: "Improve flexibility and mindfulness",
      clients: 6,
      weeks: 8,
      status: "draft",
      createdAt: "2024-03-01",
      exercises: []
    },
  ]);

  const trainers = [
    { id: "1", name: "Marco Rossi" },
    { id: "2", name: "Laura Bianchi" },
    { id: "3", name: "Giuseppe Verde" },
  ];

  const clients = [
    { id: "c1", name: "Sarah Johnson" },
    { id: "c2", name: "Michael Brown" },
    { id: "c3", name: "Emma Wilson" },
    { id: "c4", name: "Sofia Martinez" },
  ];

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.trainerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProgramCreated = (programData: any, trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    const program: Program = {
      id: Date.now().toString(),
      name: programData.title || "New Program",
      description: programData.description || programData.objective || "",
      weeks: programData.duration || 8,
      clients: 0,
      status: "draft",
      trainerId: trainerId,
      trainerName: trainer?.name,
      createdAt: new Date().toISOString().split('T')[0],
      exercises: [],
    };

    setPrograms([program, ...programs]);
    
    toast({
      title: "Program Created",
      description: `${program.name} has been created successfully`,
    });
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id));
    toast({
      title: "Program Deleted",
      description: "The program has been removed",
    });
  };

  const handleDuplicateProgram = (program: Program) => {
    const duplicated: Program = {
      ...program,
      id: Date.now().toString(),
      name: `${program.name} (Copy)`,
      status: "draft",
      clients: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPrograms([duplicated, ...programs]);
    toast({
      title: "Program Duplicated",
      description: `${duplicated.name} has been created`,
    });
  };

  const handleToggleStatus = (id: string) => {
    setPrograms(programs.map(p => {
      if (p.id === id) {
        const newStatus = p.status === "active" ? "draft" : "active";
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  const handleViewDetails = (program: Program) => {
    setSelectedProgram(program);
    setIsDetailsDialogOpen(true);
  };

  const handleEditProgram = (program: Program) => {
    setSelectedProgram(program);
    // Open create dialog in edit mode - reusing the same dialog
    setIsCreateDialogOpen(true);
  };

  const handleAssignProgram = (program: Program) => {
    setSelectedProgram(program);
    setIsAssignDialogOpen(true);
  };

  const handleAssignToClient = (clientId: string, trainerId: string, startDate: string) => {
    if (selectedProgram) {
      setPrograms(programs.map(p => 
        p.id === selectedProgram.id ? { ...p, clients: p.clients + 1 } : p
      ));
      const client = clients.find(c => c.id === clientId);
      toast({
        title: "Program Assigned",
        description: `${selectedProgram.name} assigned to ${client?.name}`,
      });
    }
    setIsAssignDialogOpen(false);
  };

  const stats = {
    total: programs.length,
    active: programs.filter(p => p.status === "active").length,
    totalClients: programs.reduce((sum, p) => sum + p.clients, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Training Programs</h1>
          <p className="text-muted-foreground">Create and manage training programs for your studio</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Program
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <p className="text-sm text-muted-foreground">Active Programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{stats.totalClients}</div>
            <p className="text-sm text-muted-foreground">Clients Enrolled</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search programs..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate">{program.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{program.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleViewDetails(program)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEditProgram(program)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Program
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAssignProgram(program)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign to Client
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicateProgram(program)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleStatus(program.id)}>
                    {program.status === "active" ? "Set as Draft" : "Activate"}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => handleDeleteProgram(program.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{program.clients} clients</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{program.weeks} weeks</span>
                </div>
              </div>
              {program.trainerName && (
                <p className="text-xs text-muted-foreground mb-3">
                  Trainer: <span className="font-medium">{program.trainerName}</span>
                </p>
              )}
              <div className="flex items-center justify-between">
                <Badge variant={program.status === "active" ? "default" : "secondary"}>
                  {program.status}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(program)}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No programs found. Create your first program to get started.</p>
        </div>
      )}

      {/* Create Dialog - Reuses Trainer's ProgramCreationForm with trainer selection */}
      <StudioCreateProgramDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        trainers={trainers}
        onProgramCreated={handleProgramCreated}
      />

      {/* Details & Assign Dialogs */}
      {selectedProgram && (
        <>
          <ProgramDetailsDialog
            open={isDetailsDialogOpen}
            onOpenChange={setIsDetailsDialogOpen}
            program={selectedProgram}
            onEdit={() => {
              setIsDetailsDialogOpen(false);
              setIsCreateDialogOpen(true);
            }}
            onAssign={() => {
              setIsDetailsDialogOpen(false);
              setIsAssignDialogOpen(true);
            }}
          />

          <AssignProgramDialog
            open={isAssignDialogOpen}
            onOpenChange={setIsAssignDialogOpen}
            program={selectedProgram}
            clients={clients}
            trainers={trainers}
            onAssign={handleAssignToClient}
          />
        </>
      )}
    </div>
  );
}
