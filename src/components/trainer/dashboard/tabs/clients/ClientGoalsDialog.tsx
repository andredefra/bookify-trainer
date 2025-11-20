import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getAllGoalTemplates } from "@/components/client/overview/fitness-progress/data/goalTemplates";
import { GoalType, GoalTemplate } from "@/components/client/overview/fitness-progress/types";
import { Badge } from "@/components/ui/badge";
import { Settings2, Target, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClientGoalsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClient: string | null;
  onManageGoalTypes?: () => void;
}

export function ClientGoalsDialog({ open, onOpenChange, selectedClient, onManageGoalTypes }: ClientGoalsDialogProps) {
  const [selectedGoalType, setSelectedGoalType] = useState<GoalType | null>(null);
  const [allTemplates, setAllTemplates] = useState(getAllGoalTemplates());
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      goalType: "",
      goal: "",
      current: 0,
      target: 0,
      targetDate: "",
      exerciseId: "",
      frequencyValue: 3,
      frequencyPeriod: "weekly"
    }
  });

  const refreshTemplates = () => {
    setAllTemplates(getAllGoalTemplates());
  };

  const handleGoalTypeChange = (type: GoalType) => {
    setSelectedGoalType(type);
    const template = allTemplates[type];
    form.setValue('goalType', type);
    form.setValue('target', template.defaultTarget || 0);
    
    // Set a default target date (3 months from now)
    const defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 3);
    form.setValue('targetDate', defaultDate.toISOString().split('T')[0]);
  };

  const handleSubmit = (data: any) => {
    const goalData = {
      ...data,
      goalType: selectedGoalType,
      unit: selectedGoalType ? allTemplates[selectedGoalType].unit : 'units',
      frequency: allTemplates[selectedGoalType]?.requiresFrequency ? {
        value: data.frequencyValue,
        period: data.frequencyPeriod
      } : undefined,
      clientName: selectedClient
    };
    
    // Here you would typically save to database
    console.log('Saving goal for client:', goalData);
    
    toast({
      title: "Goal Created",
      description: `Goal successfully set for ${selectedClient}`,
    });
    
    form.reset();
    setSelectedGoalType(null);
    onOpenChange(false);
  };

  const selectedTemplate = selectedGoalType ? allTemplates[selectedGoalType] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {selectedClient ? `Set Goals for ${selectedClient}` : "Set Client Goals"}
          </DialogTitle>
          <DialogDescription>
            Create a specific, measurable fitness goal with a target date for your client.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="goalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Type</FormLabel>
                  <Select onValueChange={(value) => handleGoalTypeChange(value as GoalType)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a goal type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(allTemplates).map((template) => (
                        <SelectItem key={template.type} value={template.type}>
                          <div className="flex items-center gap-2">
                            <span>{template.name}</span>
                            {template.isCustom && (
                              <Badge variant="default" className="text-xs bg-purple-600">Custom</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedTemplate && (
              <>
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg space-y-2">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    {selectedTemplate.description}
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Examples: {selectedTemplate.examples.join(', ')}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Description</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={selectedTemplate.examplePlaceholder || `e.g., ${selectedTemplate.examples[0]}`}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedTemplate.requiresExercise && (
                  <FormField
                    control={form.control}
                    name="exerciseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exercise</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Bench Press, Squat, Deadlift"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="current"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Value ({selectedTemplate.unit})</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1"
                            {...field} 
                            onChange={e => field.onChange(Number(e.target.value))} 
                          />
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
                        <FormLabel>Target Value ({selectedTemplate.unit})</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1"
                            {...field} 
                            onChange={e => field.onChange(Number(e.target.value))} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="targetDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedTemplate.requiresFrequency && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="frequencyValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequency</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1"
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="frequencyPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Period</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </>
            )}
            
            <DialogFooter className="flex-col sm:flex-row gap-2">
              {onManageGoalTypes && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    onManageGoalTypes();
                    refreshTemplates();
                  }}
                  className="gap-2 sm:mr-auto"
                >
                  <Settings2 className="h-4 w-4" />
                  Manage Goal Types
                </Button>
              )}
              <div className="flex gap-2 sm:ml-auto">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={!selectedGoalType}
                >
                  Save Goal
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
