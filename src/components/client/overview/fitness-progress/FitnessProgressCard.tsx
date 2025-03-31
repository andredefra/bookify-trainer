
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

import { ProgressItem, FitnessProgressCardProps } from "./types";
import { GoalsList } from "./GoalsList";
import { AddGoalDialog } from "./AddGoalDialog";
import { UpdateGoalDialog } from "./UpdateGoalDialog";
import { LogActivityDialog } from "./LogActivityDialog";
import { DeleteGoalDialog } from "./DeleteGoalDialog";
import { calculateProgress, getCurrentDate } from "./utils";

export function FitnessProgressCard({ 
  progressData: initialProgressData, 
  connectedApps = { googleFit: false, appleHealth: false } 
}: FitnessProgressCardProps) {
  const [progressData, setProgressData] = useState<ProgressItem[]>(initialProgressData);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openLogDialog, setOpenLogDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<ProgressItem | null>(null);
  const isMobile = useIsMobile();
  
  // Add a new goal
  const onSubmit = (data: any) => {
    const newGoal: ProgressItem = {
      id: `goal-${Date.now()}`,
      goal: data.goal,
      current: Number(data.current),
      target: Number(data.target),
      unit: data.unit,
      progress: calculateProgress(Number(data.current), Number(data.target)),
      lastUpdated: getCurrentDate()
    };
    
    setProgressData([...progressData, newGoal]);
    setOpenDialog(false);
    toast.success("New fitness goal added!");
  };

  // Update an existing goal
  const onUpdateSubmit = (data: any) => {
    if (!selectedGoal) return;
    
    const updatedProgressData = progressData.map(item => {
      if (item.id === selectedGoal.id || (item.goal === selectedGoal.goal && !item.id)) {
        const updatedItem = {
          ...item,
          current: Number(data.current),
          progress: calculateProgress(Number(data.current), item.target),
          lastUpdated: getCurrentDate()
        };
        return updatedItem;
      }
      return item;
    });
    
    setProgressData(updatedProgressData);
    setOpenUpdateDialog(false);
    setSelectedGoal(null);
    toast.success("Goal progress updated!");
  };

  // Manual activity logging
  const onLogSubmit = (data: any) => {
    // Find goals related to the logged activities and update them
    const updatedProgressData = progressData.map(item => {
      let updatedCurrent = item.current;
      
      // Update step count goal
      if (item.unit === "steps" && data.steps > 0) {
        updatedCurrent += Number(data.steps);
      }
      
      // Update calories goal
      if (item.unit === "kcal" && data.calories > 0) {
        updatedCurrent += Number(data.calories);
      }
      
      // Update workout minutes goal
      if (item.unit === "mins" && data.minutes > 0) {
        updatedCurrent += Number(data.minutes);
      }
      
      if (updatedCurrent !== item.current) {
        return {
          ...item,
          current: updatedCurrent,
          progress: calculateProgress(updatedCurrent, item.target),
          lastUpdated: getCurrentDate()
        };
      }
      
      return item;
    });
    
    setProgressData(updatedProgressData);
    setOpenLogDialog(false);
    toast.success("Activity logged successfully!");
  };

  // Delete a goal
  const handleDeleteGoal = () => {
    if (!selectedGoal) return;
    
    const filteredProgressData = progressData.filter(item => 
      !(item.id === selectedGoal.id || (item.goal === selectedGoal.goal && !item.id))
    );
    
    setProgressData(filteredProgressData);
    setOpenDeleteDialog(false);
    setSelectedGoal(null);
    toast.success("Goal deleted successfully!");
  };

  // Set up goal for editing
  const handleEditGoal = (goal: ProgressItem) => {
    setSelectedGoal(goal);
    setOpenUpdateDialog(true);
  };

  // Set up goal for deletion
  const handleDeletePrompt = (goal: ProgressItem) => {
    setSelectedGoal(goal);
    setOpenDeleteDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col space-y-2 pb-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Fitness Progress</CardTitle>
              <CardDescription>Track your journey toward your goals</CardDescription>
            </div>
          </div>
          
          {/* Action buttons with responsive layout */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2">
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="w-full sm:w-auto"
              onClick={() => setOpenLogDialog(true)}
            >
              Log Activity
            </Button>
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="w-full sm:w-auto"
              onClick={() => setOpenDialog(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <GoalsList 
            progressData={progressData}
            onEditGoal={handleEditGoal}
            onDeletePrompt={handleDeletePrompt}
          />
          
          {/* Show app connection status if no fitness apps are connected */}
          {progressData.length > 0 && !connectedApps.googleFit && !connectedApps.appleHealth && (
            <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
              <p className="flex items-center gap-1">
                <span>⚠️</span> Connect a fitness app in Settings to automatically update your progress.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddGoalDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSubmit={onSubmit}
      />
      
      <UpdateGoalDialog 
        open={openUpdateDialog}
        onOpenChange={setOpenUpdateDialog}
        onSubmit={onUpdateSubmit}
        selectedGoal={selectedGoal}
      />
      
      <LogActivityDialog 
        open={openLogDialog}
        onOpenChange={setOpenLogDialog}
        onSubmit={onLogSubmit}
      />
      
      <DeleteGoalDialog 
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onDelete={handleDeleteGoal}
        selectedGoal={selectedGoal}
      />
    </>
  );
}
