
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { TrendingUp, Calendar, Target, MessageSquare, Edit, Save, X } from "lucide-react";
import { TrainingProgram } from "@/data/training";

interface TrainerProgramDetailsDialogProps {
  program: TrainingProgram | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName?: string;
}

// Mock client progress data
const mockClientProgress = {
  adherence: 85, // percentage
  completedSessions: 6,
  totalSessions: 32,
  currentWeek: 3,
  totalWeeks: 8,
  exerciseProgress: [
    {
      exerciseId: "ex-1",
      exerciseName: "Bench Press",
      currentWeight: 75,
      previousWeight: 70,
      maxWeight: 80,
      lastPerformed: "2024-03-15",
      progressTrend: "increasing"
    },
    {
      exerciseId: "ex-4",
      exerciseName: "Squats",
      currentWeight: 85,
      previousWeight: 80,
      maxWeight: 90,
      lastPerformed: "2024-03-14",
      progressTrend: "increasing"
    },
    {
      exerciseId: "ex-2",
      exerciseName: "Pull-ups",
      currentWeight: 0, // bodyweight
      previousWeight: 0,
      maxWeight: 5, // added weight
      lastPerformed: "2024-03-13",
      progressTrend: "stable"
    }
  ],
  trainerNotes: [
    {
      id: "note-1",
      date: "2024-03-15",
      content: "Great progress on bench press. Client is maintaining good form with increased weight."
    },
    {
      id: "note-2", 
      date: "2024-03-10",
      content: "Focus needed on squat depth. Working on mobility exercises."
    }
  ]
};

export function TrainerProgramDetailsDialog({ 
  program, 
  open, 
  onOpenChange,
  clientName = "Client"
}: TrainerProgramDetailsDialogProps) {
  const [editingNotes, setEditingNotes] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [trainerNotes, setTrainerNotes] = useState(mockClientProgress.trainerNotes);

  if (!program) return null;

  const handleSaveNote = () => {
    if (newNote.trim()) {
      const newNoteObj = {
        id: `note-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        content: newNote.trim()
      };
      setTrainerNotes([newNoteObj, ...trainerNotes]);
      setNewNote("");
    }
    setEditingNotes(false);
  };

  const progressPercentage = (mockClientProgress.completedSessions / mockClientProgress.totalSessions) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-5xl p-4 md:p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg md:text-xl">
            Trainer View - {program.title} for {clientName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                Client Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Program Adherence</span>
                <Badge variant={mockClientProgress.adherence >= 80 ? "default" : "secondary"}>
                  {mockClientProgress.adherence}%
                </Badge>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Sessions Completed</span>
                  <span className="text-sm font-medium">
                    {mockClientProgress.completedSessions}/{mockClientProgress.totalSessions}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Current Week</span>
                <span className="text-sm font-medium">
                  Week {mockClientProgress.currentWeek} of {mockClientProgress.totalWeeks}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Exercise Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Exercise Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockClientProgress.exerciseProgress.map((exercise) => (
                  <div key={exercise.exerciseId} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{exercise.exerciseName}</h4>
                      <Badge 
                        variant={exercise.progressTrend === "increasing" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {exercise.progressTrend}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Current:</span>
                        <p className="font-medium">{exercise.currentWeight}kg</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Previous:</span>
                        <p className="font-medium">{exercise.previousWeight}kg</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Max:</span>
                        <p className="font-medium">{exercise.maxWeight}kg</p>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Last: {new Date(exercise.lastPerformed).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trainer Notes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5" />
                  Trainer Notes
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setEditingNotes(!editingNotes)}
                >
                  {editingNotes ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {editingNotes ? "Cancel" : "Add Note"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editingNotes && (
                <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                  <Textarea
                    placeholder="Add your notes about this client's progress, form, or recommendations..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="mb-3"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveNote}>
                      <Save className="h-4 w-4 mr-1" />
                      Save Note
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingNotes(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                {trainerNotes.length > 0 ? (
                  trainerNotes.map((note) => (
                    <div key={note.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{note.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No trainer notes yet. Click "Add Note" to start tracking your observations.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Program Details Summary */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Program Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <p className="font-medium">{program.duration} weeks</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Frequency:</span>
                  <p className="font-medium">{program.targetFrequency}x/week</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Objective:</span>
                  <p className="font-medium">{program.objective}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Sessions:</span>
                  <p className="font-medium">{program.totalSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
