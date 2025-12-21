import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Users, Dumbbell, Clock, User, Edit, UserPlus } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface ProgramWeek {
  weekNumber: number;
  sessions: {
    day: string;
    exercises: Exercise[];
  }[];
}

interface Program {
  id: string;
  name: string;
  description: string;
  clients: number;
  weeks: number;
  status: "active" | "draft" | "archived";
  trainerName?: string;
  createdAt: string;
  exercises?: Exercise[];
  weeklyPlan?: ProgramWeek[];
}

interface ProgramDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: Program | null;
  onEdit: (program: Program) => void;
  onAssign: (program: Program) => void;
}

// Sample exercises data for display
const sampleExercises: Exercise[] = [
  { id: "1", name: "Barbell Squat", sets: 4, reps: "8-10", rest: "90s", notes: "Focus on depth" },
  { id: "2", name: "Romanian Deadlift", sets: 3, reps: "10-12", rest: "60s" },
  { id: "3", name: "Leg Press", sets: 3, reps: "12-15", rest: "60s" },
  { id: "4", name: "Walking Lunges", sets: 3, reps: "12 each", rest: "45s" },
  { id: "5", name: "Leg Curl", sets: 3, reps: "12-15", rest: "45s" },
  { id: "6", name: "Calf Raises", sets: 4, reps: "15-20", rest: "30s" },
];

export function ProgramDetailsDialog({
  open,
  onOpenChange,
  program,
  onEdit,
  onAssign,
}: ProgramDetailsDialogProps) {
  if (!program) return null;

  const exercises = program.exercises || sampleExercises;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{program.name}</DialogTitle>
            <Badge variant={program.status === "active" ? "default" : "secondary"}>
              {program.status}
            </Badge>
          </div>
          <DialogDescription>{program.description}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-6">
            {/* Program Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{program.weeks} weeks</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">{program.clients} clients</p>
                  <p className="text-xs text-muted-foreground">Enrolled</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Dumbbell className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">{exercises.length} exercises</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>

            {program.trainerName && (
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Created by:</span>
                <span className="font-medium">{program.trainerName}</span>
              </div>
            )}

            <Separator />

            {/* Exercises List */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                Exercises
              </h4>
              <div className="space-y-2">
                {exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="flex items-center justify-between p-3 bg-background border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{exercise.name}</p>
                        {exercise.notes && (
                          <p className="text-xs text-muted-foreground">{exercise.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{exercise.sets} sets</span>
                      <span>×</span>
                      <span>{exercise.reps}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {exercise.rest}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Enrolled Clients (if any) */}
            {program.clients > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Enrolled Clients ({program.clients})
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {["Sarah Johnson", "Michael Brown", "Emma Wilson", "Sofia Martinez"]
                    .slice(0, program.clients)
                    .map((name, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 bg-muted/30 rounded-md text-sm"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                          {name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span>{name}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              onAssign(program);
              onOpenChange(false);
            }}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Assign to Client
          </Button>
          <Button
            onClick={() => {
              onEdit(program);
              onOpenChange(false);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Program
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
