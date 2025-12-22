import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import { 
  Search, 
  MoreVertical, 
  UserCircle, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  RefreshCw,
  Clock,
  CheckCircle,
  Mail,
  Users
} from "lucide-react";
import { ProgramStatsDialog } from "@/components/trainer/dashboard/tabs/programs/ProgramStatsDialog";
import { ManageProgramTrainersDialog } from "./ManageProgramTrainersDialog";

export interface AssignedProgram {
  id: string;
  programId: string;
  programName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  primaryTrainerId: string;
  primaryTrainerName: string;
  assignedTrainerIds: string[];
  startDate: string;
  estimatedEndDate: string;
  sessionsCompleted: number;
  totalSessions: number;
  completionPercentage: number;
  status: 'on_track' | 'behind_schedule' | 'ahead_of_schedule' | 'expired';
  isPaid: boolean;
  price: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  daysUntilExpiry: number;
}

interface Trainer {
  id: string;
  name: string;
}

interface StudioAssignedProgramsContentProps {
  trainers: Trainer[];
}

// Mock data for assigned programs
const mockAssignedPrograms: AssignedProgram[] = [
  {
    id: "ap1",
    programId: "1",
    programName: "12-Week Transformation",
    clientId: "c1",
    clientName: "Sarah Johnson",
    clientEmail: "sarah@example.com",
    primaryTrainerId: "1",
    primaryTrainerName: "Marco Rossi",
    assignedTrainerIds: ["1", "2"],
    startDate: "2024-01-15",
    estimatedEndDate: "2024-04-07",
    sessionsCompleted: 8,
    totalSessions: 24,
    completionPercentage: 33,
    status: "on_track",
    isPaid: true,
    price: 299,
    paymentStatus: "completed",
    daysUntilExpiry: 45,
  },
  {
    id: "ap2",
    programId: "2",
    programName: "Beginner Strength",
    clientId: "c2",
    clientName: "Michael Brown",
    clientEmail: "michael@example.com",
    primaryTrainerId: "2",
    primaryTrainerName: "Laura Bianchi",
    assignedTrainerIds: ["2"],
    startDate: "2024-02-01",
    estimatedEndDate: "2024-03-28",
    sessionsCompleted: 12,
    totalSessions: 16,
    completionPercentage: 75,
    status: "ahead_of_schedule",
    isPaid: true,
    price: 199,
    paymentStatus: "completed",
    daysUntilExpiry: 5,
  },
  {
    id: "ap3",
    programId: "3",
    programName: "HIIT Intensive",
    clientId: "c3",
    clientName: "Emma Wilson",
    clientEmail: "emma@example.com",
    primaryTrainerId: "3",
    primaryTrainerName: "Giuseppe Verde",
    assignedTrainerIds: ["3", "1"],
    startDate: "2024-01-20",
    estimatedEndDate: "2024-03-01",
    sessionsCompleted: 4,
    totalSessions: 12,
    completionPercentage: 33,
    status: "behind_schedule",
    isPaid: false,
    price: 149,
    paymentStatus: "pending",
    daysUntilExpiry: -5,
  },
  {
    id: "ap4",
    programId: "1",
    programName: "12-Week Transformation",
    clientId: "c4",
    clientName: "Sofia Martinez",
    clientEmail: "sofia@example.com",
    primaryTrainerId: "1",
    primaryTrainerName: "Marco Rossi",
    assignedTrainerIds: ["1"],
    startDate: "2024-03-01",
    estimatedEndDate: "2024-05-24",
    sessionsCompleted: 2,
    totalSessions: 24,
    completionPercentage: 8,
    status: "on_track",
    isPaid: true,
    price: 299,
    paymentStatus: "completed",
    daysUntilExpiry: 60,
  },
];

// Mock stats data for the dialog
const mockStatsData = {
  clientName: "Sarah Johnson",
  programName: "12-Week Transformation",
  totalSessions: 24,
  completedSessions: 8,
  progressPercentage: 33,
  totalVolume: 45000,
  averageSessionDuration: 55,
  bestLifts: [
    { exercise: "Squat", weight: 80, date: "2024-02-15" },
    { exercise: "Bench Press", weight: 60, date: "2024-02-20" },
    { exercise: "Deadlift", weight: 100, date: "2024-02-25" },
  ],
  weeklyVolume: [
    { week: "W1", volume: 4500 },
    { week: "W2", volume: 5200 },
    { week: "W3", volume: 5800 },
    { week: "W4", volume: 6100 },
    { week: "W5", volume: 5900 },
    { week: "W6", volume: 6500 },
    { week: "W7", volume: 7000 },
    { week: "W8", volume: 7200 },
  ],
  sessions: [
    {
      id: "s1",
      sessionNumber: 1,
      title: "Full Body Day 1",
      completedDate: "2024-01-17",
      duration: 55,
      totalVolume: 5600,
      exercises: [
        { name: "Barbell Squat", weightUsed: 60, maxAchieved: 65, sets: 4, reps: "8-10" },
        { name: "Bench Press", weightUsed: 50, maxAchieved: 55, sets: 4, reps: "8-10" },
      ],
      completed: true,
    },
    {
      id: "s2",
      sessionNumber: 2,
      title: "Full Body Day 2",
      completedDate: "2024-01-19",
      duration: 50,
      totalVolume: 5200,
      exercises: [
        { name: "Deadlift", weightUsed: 80, maxAchieved: 85, sets: 3, reps: "6-8" },
        { name: "Rows", weightUsed: 40, maxAchieved: 45, sets: 4, reps: "10-12" },
      ],
      completed: true,
    },
    {
      id: "s3",
      sessionNumber: 3,
      title: "Full Body Day 3",
      totalVolume: 0,
      exercises: [],
      completed: false,
    },
  ],
};

export function StudioAssignedProgramsContent({ trainers }: StudioAssignedProgramsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [trainerFilter, setTrainerFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [assignedPrograms, setAssignedPrograms] = useState<AssignedProgram[]>(mockAssignedPrograms);
  
  // Dialog states
  const [selectedProgram, setSelectedProgram] = useState<AssignedProgram | null>(null);
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false);
  const [isTrainersDialogOpen, setIsTrainersDialogOpen] = useState(false);

  const filteredPrograms = assignedPrograms.filter((program) => {
    const matchesSearch =
      program.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.primaryTrainerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTrainer = trainerFilter === "all" || program.primaryTrainerId === trainerFilter;
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "expiring" && program.daysUntilExpiry <= 7 && program.daysUntilExpiry >= 0) ||
      (statusFilter === "expired" && program.daysUntilExpiry < 0) ||
      (statusFilter === "on_track" && program.status === "on_track") ||
      (statusFilter === "behind" && program.status === "behind_schedule");
    
    return matchesSearch && matchesTrainer && matchesStatus;
  });

  const getStatusIcon = (status: AssignedProgram["status"]) => {
    switch (status) {
      case "on_track":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "ahead_of_schedule":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "behind_schedule":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "expired":
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (program: AssignedProgram) => {
    if (program.daysUntilExpiry < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (program.daysUntilExpiry <= 7) {
      return <Badge className="bg-orange-100 text-orange-800">Expires in {program.daysUntilExpiry}d</Badge>;
    } else if (program.status === "ahead_of_schedule") {
      return <Badge className="bg-blue-100 text-blue-800">Ahead</Badge>;
    } else if (program.status === "behind_schedule") {
      return <Badge variant="destructive">Behind</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">On Track</Badge>;
    }
  };

  const handleViewStats = (program: AssignedProgram) => {
    setSelectedProgram(program);
    setIsStatsDialogOpen(true);
  };

  const handleManageTrainers = (program: AssignedProgram) => {
    setSelectedProgram(program);
    setIsTrainersDialogOpen(true);
  };

  const handleTrainersUpdate = (primaryId: string, trainerIds: string[]) => {
    if (selectedProgram) {
      const primaryTrainer = trainers.find((t) => t.id === primaryId);
      setAssignedPrograms((prev) =>
        prev.map((p) =>
          p.id === selectedProgram.id
            ? {
                ...p,
                primaryTrainerId: primaryId,
                primaryTrainerName: primaryTrainer?.name || p.primaryTrainerName,
                assignedTrainerIds: trainerIds,
              }
            : p
        )
      );
    }
    setIsTrainersDialogOpen(false);
  };

  // Stats
  const totalActive = assignedPrograms.filter((p) => p.daysUntilExpiry >= 0).length;
  const expiringSoon = assignedPrograms.filter((p) => p.daysUntilExpiry <= 7 && p.daysUntilExpiry >= 0).length;
  const behindSchedule = assignedPrograms.filter((p) => p.status === "behind_schedule").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{assignedPrograms.length}</div>
                <p className="text-sm text-muted-foreground">Total Assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{totalActive}</div>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{expiringSoon}</div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{behindSchedule}</div>
                <p className="text-sm text-muted-foreground">Behind Schedule</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client, program or trainer..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={trainerFilter} onValueChange={setTrainerFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Trainer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trainers</SelectItem>
            {trainers.map((trainer) => (
              <SelectItem key={trainer.id} value={trainer.id}>
                {trainer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="on_track">On Track</SelectItem>
            <SelectItem value="behind">Behind Schedule</SelectItem>
            <SelectItem value="expiring">Expiring Soon</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assigned Programs List */}
      <div className="space-y-4">
        {filteredPrograms.map((program) => (
          <Card
            key={program.id}
            className={`${
              program.daysUntilExpiry < 0
                ? "border-red-200 bg-red-50/50"
                : program.daysUntilExpiry <= 7
                ? "border-orange-200 bg-orange-50/50"
                : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Client & Program Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{program.clientName}</h3>
                    {getStatusBadge(program)}
                    {program.paymentStatus === "completed" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid €{program.price}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pending €{program.price}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {program.programName}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress: {program.completionPercentage}%</span>
                      <span>
                        {program.sessionsCompleted}/{program.totalSessions} sessions
                      </span>
                    </div>
                    <Progress value={program.completionPercentage} className="h-2" />
                  </div>

                  {/* Trainer & Dates */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <UserCircle className="h-3 w-3" />
                      {program.primaryTrainerName}
                      {program.assignedTrainerIds.length > 1 && (
                        <span className="ml-1 text-muted-foreground">
                          +{program.assignedTrainerIds.length - 1}
                        </span>
                      )}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {program.startDate} → {program.estimatedEndDate}
                    </Badge>
                    <a
                      href={`mailto:${program.clientEmail}`}
                      className="flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      <Mail className="h-3 w-3" />
                      {program.clientEmail}
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewStats(program)}
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Stats
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleManageTrainers(program)}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Change PT
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Client Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                      <DropdownMenuItem>Extend Program</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel Assignment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No assigned programs found matching your filters.
          </div>
        )}
      </div>

      {/* Stats Dialog */}
      <ProgramStatsDialog
        open={isStatsDialogOpen}
        onOpenChange={setIsStatsDialogOpen}
        statsData={selectedProgram ? { ...mockStatsData, clientName: selectedProgram.clientName, programName: selectedProgram.programName } : null}
      />

      {/* Trainers Management Dialog */}
      {selectedProgram && (
        <ManageProgramTrainersDialog
          open={isTrainersDialogOpen}
          onOpenChange={setIsTrainersDialogOpen}
          programName={selectedProgram.programName}
          clientName={selectedProgram.clientName}
          currentPrimaryTrainerId={selectedProgram.primaryTrainerId}
          currentAssignedTrainerIds={selectedProgram.assignedTrainerIds}
          availableTrainers={trainers}
          onSave={handleTrainersUpdate}
        />
      )}
    </div>
  );
}
