
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { GOAL_TEMPLATES } from "../analytics/data/goalTemplates";
import { GoalType } from "@/components/client/overview/fitness-progress/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, TrendingUp } from "lucide-react";

interface ClientGoalsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedClient: string | null;
}

export function ClientGoalsDialog({ open, onOpenChange, selectedClient }: ClientGoalsDialogProps) {
  const [selectedGoalType, setSelectedGoalType] = useState<GoalType | null>(null);
  const [formData, setFormData] = useState({
    goalType: "",
    description: "",
    current: "",
    target: "",
    targetDate: "",
    exerciseId: "",
    notes: "",
    frequencyValue: "3",
    frequencyPeriod: "weekly"
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedGoalType(null);
      setFormData({
        goalType: "",
        description: "",
        current: "",
        target: "",
        targetDate: "",
        exerciseId: "",
        notes: "",
        frequencyValue: "3",
        frequencyPeriod: "weekly"
      });
    }
  }, [open]);

  const handleGoalTypeChange = (type: GoalType) => {
    setSelectedGoalType(type);
    const template = GOAL_TEMPLATES[type];
    
    // Set default target date (3 months from now)
    const defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() + 3);
    
    setFormData(prev => ({
      ...prev,
      goalType: type,
      target: template.defaultTarget?.toString() || "",
      targetDate: defaultDate.toISOString().split('T')[0]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedTemplate = selectedGoalType ? GOAL_TEMPLATES[selectedGoalType] : null;

  const getCurrentGoals = () => {
    if (selectedClient === "Sarah Johnson") {
      return [
        {
          type: "weight_management",
          description: "Lose 5kg",
          current: "68.5kg",
          target: "65kg",
          deadline: "Aug 30, 2024",
          progress: "70%"
        },
        {
          type: "strength_progress", 
          description: "Bench Press 60kg",
          current: "50kg",
          target: "60kg",
          deadline: "Jul 15, 2024",
          progress: "83%"
        }
      ];
    }
    
    if (selectedClient === "Mike Peterson") {
      return [
        {
          type: "cardiovascular_endurance",
          description: "Run 10K under 45 min",
          current: "48 min",
          target: "45 min",
          deadline: "Sep 15, 2024",
          progress: "60%"
        }
      ];
    }
    
    return [];
  };

  const currentGoals = getCurrentGoals();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {selectedClient ? `Set Goals for ${selectedClient}` : "Set Client Goals"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Current Goals Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Current Goals ({currentGoals.length})
            </h4>
            
            {currentGoals.length > 0 ? (
              <div className="space-y-2">
                {currentGoals.map((goal, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {GOAL_TEMPLATES[goal.type as GoalType]?.name}
                          </Badge>
                          <span className="text-xs text-gray-500">{goal.progress}</span>
                        </div>
                        <p className="font-medium text-sm">{goal.description}</p>
                        <div className="text-xs text-gray-600 mt-1">
                          {goal.current} → {goal.target} by {goal.deadline}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-red-500 hover:text-red-700">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                No goals set yet for this client.
              </div>
            )}
          </div>

          {/* Add New Goal Section */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-4">Add New Goal</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-type">Goal Type</Label>
                <Select value={formData.goalType} onValueChange={handleGoalTypeChange}>
                  <SelectTrigger id="goal-type">
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(GOAL_TEMPLATES).map((template) => (
                      <SelectItem key={template.type} value={template.type}>
                        <div className="flex flex-col">
                          <span>{template.name}</span>
                          <span className="text-xs text-gray-500">{template.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplate && (
                <>
                  <div className="p-3 bg-blue-50 rounded-lg border">
                    <h5 className="font-medium text-blue-900 text-sm">{selectedTemplate.name}</h5>
                    <p className="text-xs text-blue-700 mt-1">{selectedTemplate.description}</p>
                    <div className="mt-2">
                      <p className="text-xs text-blue-600 font-medium">Examples:</p>
                      <ul className="text-xs text-blue-600 list-disc list-inside">
                        {selectedTemplate.examples.slice(0, 2).map((example, idx) => (
                          <li key={idx}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Goal Description</Label>
                    <Input 
                      id="description" 
                      placeholder={`e.g., ${selectedTemplate.examples[0]}`}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  {selectedTemplate.requiresExercise && (
                    <div className="space-y-2">
                      <Label htmlFor="exercise">Exercise</Label>
                      <Input 
                        id="exercise" 
                        placeholder="e.g., Bench Press, Squat, Deadlift"
                        value={formData.exerciseId}
                        onChange={(e) => handleInputChange('exerciseId', e.target.value)}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current">Current Value ({selectedTemplate.unit})</Label>
                      <Input 
                        id="current" 
                        type="number" 
                        step="0.1"
                        value={formData.current}
                        onChange={(e) => handleInputChange('current', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target">Target Value ({selectedTemplate.unit})</Label>
                      <Input 
                        id="target" 
                        type="number" 
                        step="0.1"
                        value={formData.target}
                        onChange={(e) => handleInputChange('target', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Target Date
                    </Label>
                    <Input 
                      type="date" 
                      id="deadline" 
                      value={formData.targetDate}
                      onChange={(e) => handleInputChange('targetDate', e.target.value)}
                    />
                  </div>

                  {selectedTemplate.requiresFrequency && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="frequency">Frequency</Label>
                        <Input 
                          id="frequency" 
                          type="number" 
                          min="1"
                          value={formData.frequencyValue}
                          onChange={(e) => handleInputChange('frequencyValue', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="period">Period</Label>
                        <Select 
                          value={formData.frequencyPeriod} 
                          onValueChange={(value) => handleInputChange('frequencyPeriod', value)}
                        >
                          <SelectTrigger id="period">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Additional details, motivation tips, or specific instructions"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={() => onOpenChange(false)}
            disabled={!selectedGoalType || !formData.description || !formData.target}
          >
            Save Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
