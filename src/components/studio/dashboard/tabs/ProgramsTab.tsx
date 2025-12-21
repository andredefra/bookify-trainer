import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Users, Calendar, Search, Edit, Trash2, Eye, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Program {
  id: string;
  name: string;
  description: string;
  clients: number;
  weeks: number;
  status: "active" | "draft" | "archived";
  trainerId?: string;
  trainerName?: string;
  createdAt: string;
}

export function ProgramsTab() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([
    { 
      id: "1", 
      name: "12-Week Transformation", 
      description: "Complete body transformation program with progressive overload",
      clients: 8,
      weeks: 12,
      status: "active",
      trainerName: "Marco Rossi",
      createdAt: "2024-01-15"
    },
    { 
      id: "2", 
      name: "Beginner Strength", 
      description: "Foundation strength building for newcomers",
      clients: 5,
      weeks: 8,
      status: "active",
      trainerName: "Laura Bianchi",
      createdAt: "2024-02-01"
    },
    { 
      id: "3", 
      name: "HIIT Intensive", 
      description: "High intensity interval training for fat loss",
      clients: 12,
      weeks: 6,
      status: "active",
      trainerName: "Giuseppe Verde",
      createdAt: "2024-01-20"
    },
    { 
      id: "4", 
      name: "Yoga & Flexibility", 
      description: "Improve flexibility and mindfulness",
      clients: 6,
      weeks: 8,
      status: "draft",
      createdAt: "2024-03-01"
    },
  ]);

  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    weeks: "8",
    trainerId: "",
  });

  const trainers = [
    { id: "1", name: "Marco Rossi" },
    { id: "2", name: "Laura Bianchi" },
    { id: "3", name: "Giuseppe Verde" },
  ];

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.trainerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProgram = () => {
    if (!newProgram.name.trim()) {
      toast({
        title: "Error",
        description: "Program name is required",
        variant: "destructive",
      });
      return;
    }

    const trainer = trainers.find(t => t.id === newProgram.trainerId);
    const program: Program = {
      id: Date.now().toString(),
      name: newProgram.name,
      description: newProgram.description,
      weeks: parseInt(newProgram.weeks) || 8,
      clients: 0,
      status: "draft",
      trainerId: newProgram.trainerId,
      trainerName: trainer?.name,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setPrograms([program, ...programs]);
    setNewProgram({ name: "", description: "", weeks: "8", trainerId: "" });
    setIsCreateDialogOpen(false);
    
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
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Program</DialogTitle>
              <DialogDescription>
                Create a training program that can be assigned to clients by your trainers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., 12-Week Transformation"
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the program goals and methodology..."
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weeks">Duration (weeks)</Label>
                  <Input
                    id="weeks"
                    type="number"
                    min="1"
                    max="52"
                    value={newProgram.weeks}
                    onChange={(e) => setNewProgram({ ...newProgram, weeks: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assign to Trainer</Label>
                  <Select
                    value={newProgram.trainerId}
                    onValueChange={(value) => setNewProgram({ ...newProgram, trainerId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id}>
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProgram}>Create Program</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Program
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
                <Button variant="outline" size="sm">View Details</Button>
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
    </div>
  );
}
