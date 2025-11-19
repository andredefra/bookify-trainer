
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getAllGoalTemplates } from "./data/goalTemplates";
import { GoalType } from "./types";
import { Badge } from "@/components/ui/badge";
import { Settings2 } from "lucide-react";

interface AddGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onManageGoalTypes?: () => void;
}

export function AddGoalDialog({ open, onOpenChange, onSubmit, onManageGoalTypes }: AddGoalDialogProps) {
  const [selectedGoalType, setSelectedGoalType] = useState<GoalType | null>(null);
  const [allTemplates, setAllTemplates] = useState(getAllGoalTemplates());
  
  const form = useForm({
    defaultValues: {
      goalType: "",
      goal: "",
      current: 0,
      target: 0,
      targetDate: "",
      exerciseId: "",
      frequencyValue: 1,
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
      } : undefined
    };
    
    onSubmit(goalData);
    form.reset();
    setSelectedGoalType(null);
  };

  const selectedTemplate = selectedGoalType ? allTemplates[selectedGoalType] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Fitness Goal</DialogTitle>
          <DialogDescription>
            Create a specific, measurable fitness goal with a target date.
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
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">{selectedTemplate.name}</h4>
                  <p className="text-sm text-blue-700 mt-1">{selectedTemplate.description}</p>
                  <div className="mt-2">
                    <p className="text-xs text-blue-600 font-medium">Examples:</p>
                    <ul className="text-xs text-blue-600 list-disc list-inside">
                      {selectedTemplate.examples.slice(0, 2).map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Description</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={`E.g., ${selectedTemplate.examples[0]}`} 
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
                  Add Goal
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
