
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Target, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProgressItem {
  id?: string;
  goal: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  lastUpdated?: string;
}

interface FitnessProgressCardProps {
  progressData: ProgressItem[];
  connectedApps?: {
    googleFit: boolean;
    appleHealth: boolean;
  };
}

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
  
  // Get current date in ISO format for tracking updates
  const getCurrentDate = () => new Date().toISOString();
  
  // Form for adding new goals
  const form = useForm({
    defaultValues: {
      goal: "",
      current: 0,
      target: 0,
      unit: "kg"
    }
  });

  // Form for updating existing goals
  const updateForm = useForm({
    defaultValues: {
      current: 0
    }
  });
  
  // Form for manually logging activity
  const logForm = useForm({
    defaultValues: {
      steps: 0,
      calories: 0,
      minutes: 0,
      date: new Date().toISOString().split('T')[0]
    }
  });

  // Reset update form when selected goal changes
  useEffect(() => {
    if (selectedGoal) {
      updateForm.setValue('current', selectedGoal.current);
    }
  }, [selectedGoal, updateForm]);

  // Calculate progress percentage and ensure it's between 0-100
  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
  };

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
    form.reset();
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
    updateForm.reset();
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
    logForm.reset();
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
    updateForm.setValue('current', goal.current);
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
          <div className="space-y-6">
            {progressData.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Target className="mx-auto h-12 w-12 opacity-50 mb-2" />
                <p>No goals added yet. Click 'Add Goal' to get started.</p>
              </div>
            ) : (
              progressData.map((item) => (
                <div key={item.id || item.goal} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="font-medium">{item.goal}</span>
                    <div className="flex flex-row items-center justify-between sm:justify-end gap-2">
                      <span className="text-sm text-muted-foreground">
                        {item.current} / {item.target} {item.unit}
                      </span>
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditGoal(item)}
                          className="h-7 w-7"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeletePrompt(item)}
                          className="h-7 w-7 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                  <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-muted-foreground gap-1">
                    <span>{item.progress}% complete</span>
                    {item.lastUpdated && (
                      <span className="text-right sm:text-left">Last updated: {new Date(item.lastUpdated).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {/* Show app connection status if no fitness apps are connected */}
            {progressData.length > 0 && !connectedApps.googleFit && !connectedApps.appleHealth && (
              <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                <p className="flex items-center gap-1">
                  <span>⚠️</span> Connect a fitness app in Settings to automatically update your progress.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Goal Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Fitness Goal</DialogTitle>
            <DialogDescription>
              Create a new fitness goal to track your progress.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Weight Goal, Daily Steps" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="current"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Value</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Value</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                        <SelectItem value="steps">Steps</SelectItem>
                        <SelectItem value="mins">Minutes</SelectItem>
                        <SelectItem value="km">Kilometers (km)</SelectItem>
                        <SelectItem value="sessions">Sessions</SelectItem>
                        <SelectItem value="%">Percentage (%)</SelectItem>
                        <SelectItem value="kcal">Calories (kcal)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Goal</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Update Goal Dialog */}
      <Dialog open={openUpdateDialog} onOpenChange={setOpenUpdateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Goal Progress</DialogTitle>
            <DialogDescription>
              Update your current progress for {selectedGoal?.goal}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-4">
              <FormField
                control={updateForm.control}
                name="current"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Value</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {selectedGoal && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Target: {selectedGoal.target} {selectedGoal.unit}</span>
                </div>
              )}
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenUpdateDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Progress</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Log Activity Dialog */}
      <Dialog open={openLogDialog} onOpenChange={setOpenLogDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log Daily Activity</DialogTitle>
            <DialogDescription>
              Manually log your activities to update your goals.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...logForm}>
            <form onSubmit={logForm.handleSubmit(onLogSubmit)} className="space-y-4">
              <FormField
                control={logForm.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={logForm.control}
                name="steps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Steps</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={logForm.control}
                name="calories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calories Burned (kcal)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={logForm.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Minutes</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenLogDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Log Activity</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Goal Confirmation */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the goal "{selectedGoal?.goal}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedGoal(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGoal} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
