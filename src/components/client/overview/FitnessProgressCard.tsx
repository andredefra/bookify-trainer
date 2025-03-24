
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Target } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ProgressItem {
  goal: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
}

interface FitnessProgressCardProps {
  progressData: ProgressItem[];
}

export function FitnessProgressCard({ progressData: initialProgressData }: FitnessProgressCardProps) {
  const [progressData, setProgressData] = useState<ProgressItem[]>(initialProgressData);
  const [openDialog, setOpenDialog] = useState(false);
  
  const form = useForm({
    defaultValues: {
      goal: "",
      current: 0,
      target: 0,
      unit: "kg"
    }
  });

  const onSubmit = (data: any) => {
    const newGoal: ProgressItem = {
      goal: data.goal,
      current: Number(data.current),
      target: Number(data.target),
      unit: data.unit,
      progress: Math.min(100, Math.round((Number(data.current) / Number(data.target)) * 100))
    };
    
    setProgressData([...progressData, newGoal]);
    form.reset();
    setOpenDialog(false);
    toast.success("New fitness goal added!");
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Fitness Progress</CardTitle>
            <CardDescription>Track your journey toward your goals</CardDescription>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setOpenDialog(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
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
                <div key={item.goal} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.goal}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.current} / {item.target} {item.unit}
                    </span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

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
    </>
  );
}
