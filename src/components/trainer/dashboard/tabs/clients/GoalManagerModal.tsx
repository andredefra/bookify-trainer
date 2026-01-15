
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus, Edit, CheckCircle, Target, Calendar, Trophy, X } from "lucide-react";

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
}

interface GoalManagerModalProps {
  client: ClientItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGoal: () => void;
  onViewProgress: () => void;
}

// Mock goals data
const mockGoals = {
  active: [
    { id: 1, text: "Lose 5kg", targetDate: "Aug 30, 2023" },
    { id: 2, text: "Run 10K", targetDate: "Sep 15, 2023" },
    { id: 3, text: "Strength Training", targetDate: "Oct 1, 2023" }
  ],
  completed: [
    { id: 4, text: "Attend 10 sessions", completedDate: "Jul 15, 2023" }
  ]
};

export function GoalManagerModal({ 
  client, 
  open, 
  onOpenChange, 
  onAddGoal,
  onViewProgress 
}: GoalManagerModalProps) {
  const isMobile = useIsMobile();

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg p-4 md:p-6 overflow-y-auto max-h-[85vh]">
        <DialogHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <DialogTitle className="text-lg">Goal Manager - {client.name}</DialogTitle>
          </div>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardContent className="px-0 pt-0 space-y-4">
            {/* Action button */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                className="w-full sm:w-auto flex items-center justify-center"
                onClick={onAddGoal}
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add Goal
              </Button>
            </div>
            
            {/* Active goals section */}
            <div className="active-goals-section pt-2">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Trophy className="h-4 w-4 mr-1.5 text-primary" />
                {isMobile ? "Current Goals" : "Active Goals"}
              </h3>
              <div className="goals-list space-y-3">
                {mockGoals.active.map((goal) => (
                  <div key={goal.id} className="goal-item flex flex-col p-4 bg-muted/50 rounded-md">
                    <div className="goal-content flex flex-col gap-2">
                      <div className="flex-1">
                        <div className="font-medium">{goal.text}</div>
                        <div className="text-xs text-muted-foreground mt-1">Target date: {goal.targetDate}</div>
                      </div>
                      
                      <div className="goal-actions flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mt-1 gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 py-1 text-xs flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> In progress
                        </Badge>
                        
                        <Button variant="ghost" size="sm" className="h-8 px-2 flex items-center">
                          <Edit className="h-3.5 w-3.5 mr-1.5" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Completed goals section */}
            <div className="completed-goals-section pt-2 border-t border-border">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1.5 text-blue-600" />
                Completed Goals
              </h3>
              {mockGoals.completed.map((goal) => (
                <div key={goal.id} className="completed-goal-item p-4 bg-muted/50 rounded-md">
                  <div className="flex flex-col gap-2">
                    <div className="flex-1">
                      <div className="font-medium">{goal.text}</div>
                      <div className="text-xs text-muted-foreground mt-1">Completed on {goal.completedDate}</div>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-1 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Completed
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
