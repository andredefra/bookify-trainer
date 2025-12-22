import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Users, Calendar, Search, Edit, Trash2, Eye, Copy, UserPlus, UserCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StudioCreateProgramDialog } from "./programs/StudioCreateProgramDialog";
import { StudioProgramDetailsDialog } from "./programs/StudioProgramDetailsDialog";
import { AssignProgramDialog } from "./programs/AssignProgramDialog";
import { StudioAssignedProgramsContent } from "./programs/StudioAssignedProgramsContent";
import { StudioProgramSalesContent } from "./programs/StudioProgramSalesContent";
import { ManageProgramTrainersDialog } from "./programs/ManageProgramTrainersDialog";

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
  assignedTrainerIds?: string[];
  createdAt: string;
  exercises?: ProgramExercise[];
}

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

export function ProgramsTab() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isTrainersDialogOpen, setIsTrainersDialogOpen] = useState(false);

  const [programs, setPrograms] = useState<Program[]>([
    { id: "1", name: "12-Week Transformation", description: "Complete body transformation program", clients: 8, weeks: 12, status: "active", trainerName: "Marco Rossi", trainerId: "1", assignedTrainerIds: ["1", "2"], createdAt: "2024-01-15", exercises: [] },
    { id: "2", name: "Beginner Strength", description: "Foundation strength building", clients: 5, weeks: 8, status: "active", trainerName: "Laura Bianchi", trainerId: "2", assignedTrainerIds: ["2"], createdAt: "2024-02-01", exercises: [] },
    { id: "3", name: "HIIT Intensive", description: "High intensity interval training", clients: 12, weeks: 6, status: "active", trainerName: "Giuseppe Verde", trainerId: "3", assignedTrainerIds: ["3", "1"], createdAt: "2024-01-20", exercises: [] },
    { id: "4", name: "Yoga & Flexibility", description: "Improve flexibility and mindfulness", clients: 6, weeks: 8, status: "draft", createdAt: "2024-03-01", exercises: [] },
  ]);

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
      description: programData.description || "",
      weeks: programData.duration || 8,
      clients: 0,
      status: "draft",
      trainerId,
      trainerName: trainer?.name,
      assignedTrainerIds: [trainerId],
      createdAt: new Date().toISOString().split('T')[0],
      exercises: [],
    };
    setPrograms([program, ...programs]);
    toast({ title: "Program Created", description: `${program.name} has been created` });
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id));
    toast({ title: "Program Deleted" });
  };

  const handleDuplicateProgram = (program: Program) => {
    const duplicated: Program = { ...program, id: Date.now().toString(), name: `${program.name} (Copy)`, status: "draft", clients: 0, createdAt: new Date().toISOString().split('T')[0] };
    setPrograms([duplicated, ...programs]);
    toast({ title: "Program Duplicated" });
  };

  const handleToggleStatus = (id: string) => {
    setPrograms(programs.map(p => p.id === id ? { ...p, status: p.status === "active" ? "draft" : "active" } : p));
  };

  const handleManageTrainers = (program: Program) => {
    setSelectedProgram(program);
    setIsTrainersDialogOpen(true);
  };

  const handleTrainersUpdate = (primaryId: string, trainerIds: string[]) => {
    if (selectedProgram) {
      const primaryTrainer = trainers.find(t => t.id === primaryId);
      setPrograms(prev => prev.map(p => p.id === selectedProgram.id ? { ...p, trainerId: primaryId, trainerName: primaryTrainer?.name, assignedTrainerIds: trainerIds } : p));
    }
    setIsTrainersDialogOpen(false);
  };

  const stats = { total: programs.length, active: programs.filter(p => p.status === "active").length, totalClients: programs.reduce((sum, p) => sum + p.clients, 0) };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Training Programs</h1>
          <p className="text-muted-foreground">Create and manage training programs for your studio</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}><Plus className="h-4 w-4 mr-2" />Create Program</Button>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="assigned">Assigned Programs</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card><CardContent className="pt-6"><div className="text-2xl font-bold">{stats.total}</div><p className="text-sm text-muted-foreground">Total Programs</p></CardContent></Card>
            <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-green-600">{stats.active}</div><p className="text-sm text-muted-foreground">Active Programs</p></CardContent></Card>
            <Card><CardContent className="pt-6"><div className="text-2xl font-bold text-primary">{stats.totalClients}</div><p className="text-sm text-muted-foreground">Clients Enrolled</p></CardContent></Card>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search programs..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{program.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{program.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setSelectedProgram(program); setIsDetailsDialogOpen(true); }}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedProgram(program); setIsCreateDialogOpen(true); }}><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedProgram(program); setIsAssignDialogOpen(true); }}><UserPlus className="h-4 w-4 mr-2" />Assign</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManageTrainers(program)}><UserCircle className="h-4 w-4 mr-2" />Manage Trainers</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateProgram(program)}><Copy className="h-4 w-4 mr-2" />Duplicate</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(program.id)}>{program.status === "active" ? "Set as Draft" : "Activate"}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProgram(program.id)}><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1"><Users className="h-4 w-4" />{program.clients}</div>
                    <div className="flex items-center gap-1"><Calendar className="h-4 w-4" />{program.weeks}w</div>
                  </div>
                  {program.trainerName && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <UserCircle className="h-3 w-3" />{program.trainerName}
                      {program.assignedTrainerIds && program.assignedTrainerIds.length > 1 && <Badge variant="secondary" className="text-xs ml-1">+{program.assignedTrainerIds.length - 1}</Badge>}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Badge variant={program.status === "active" ? "default" : "secondary"}>{program.status}</Badge>
                    <Button variant="outline" size="sm" onClick={() => { setSelectedProgram(program); setIsDetailsDialogOpen(true); }}>View</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {filteredPrograms.length === 0 && <div className="text-center py-12 text-muted-foreground">No programs found.</div>}
        </TabsContent>

        <TabsContent value="assigned"><StudioAssignedProgramsContent trainers={trainers} /></TabsContent>
        <TabsContent value="sales"><StudioProgramSalesContent trainers={trainers} /></TabsContent>
      </Tabs>

      <StudioCreateProgramDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} trainers={trainers} onProgramCreated={handleProgramCreated} />
      
      {selectedProgram && (
        <>
          <StudioProgramDetailsDialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen} program={selectedProgram} onEdit={() => { setIsDetailsDialogOpen(false); setIsCreateDialogOpen(true); }} onAssign={() => { setIsDetailsDialogOpen(false); setIsAssignDialogOpen(true); }} />
          <AssignProgramDialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen} program={selectedProgram} clients={clients} trainers={trainers} onAssign={() => { setPrograms(programs.map(p => p.id === selectedProgram.id ? { ...p, clients: p.clients + 1 } : p)); setIsAssignDialogOpen(false); toast({ title: "Program Assigned" }); }} />
          <ManageProgramTrainersDialog open={isTrainersDialogOpen} onOpenChange={setIsTrainersDialogOpen} programName={selectedProgram.name} clientName="" currentPrimaryTrainerId={selectedProgram.trainerId || ""} currentAssignedTrainerIds={selectedProgram.assignedTrainerIds || []} availableTrainers={trainers} onSave={handleTrainersUpdate} />
        </>
      )}
    </div>
  );
}
