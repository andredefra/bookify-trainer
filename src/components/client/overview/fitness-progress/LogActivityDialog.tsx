import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Settings } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAllActivityTypes, getActivityTypeById } from "./data/activityTemplates";
import { estimateCaloriesPreview } from "./utils/calorieCalculator";
import { ActivityType } from "./types";
import { ExerciseSelectorField } from "./fields/ExerciseSelectorField";
import { ExerciseData } from "@/data/exercises/types";

interface LogActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onManageActivityTypes?: () => void;
  goals?: ProgressItem[];
}

export function LogActivityDialog({ open, onOpenChange, onSubmit, onManageActivityTypes }: LogActivityDialogProps) {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [activityTypeId, setActivityTypeId] = useState<string>("general");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedExercises, setSelectedExercises] = useState<Record<string, ExerciseData>>({});
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | undefined>();

  useEffect(() => {
    setActivityTypes(getAllActivityTypes());
  }, [open]);

  useEffect(() => {
    const activity = getActivityTypeById(activityTypeId);
    setSelectedActivity(activity);
    
    const newFormData: Record<string, any> = { note: formData.note || "" };
    activity?.fields.forEach(field => {
      newFormData[field.name] = "";
    });
    setFormData(newFormData);
    setSelectedExercises({});
  }, [activityTypeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const enhancedFormData = { ...formData };
    Object.entries(selectedExercises).forEach(([fieldName, exercise]) => {
      enhancedFormData[`${fieldName}_metadata`] = {
        id: exercise.id,
        name: exercise.name,
        category: exercise.category,
        muscleGroups: exercise.muscleGroup,
        equipment: exercise.equipment,
        difficulty: exercise.difficulty
      };
    });
    
    onSubmit({
      date: date.toISOString(),
      activityTypeId,
      ...enhancedFormData
    });
    
    setFormData({ note: "" });
    setSelectedExercises({});
    setActivityTypeId("general");
    setDate(new Date());
    onOpenChange(false);
  };

  const renderActivityFields = () => {
    if (!selectedActivity) return null;

    return (
      <>
        {selectedActivity.fields.map((field) => (
          <div key={field.name}>
            {field.type === 'exercise-selector' ? (
              <ExerciseSelectorField
                value={formData[field.name] || null}
                onChange={(exerciseId, exercise) => {
                  setFormData({ ...formData, [field.name]: exerciseId });
                  setSelectedExercises(prev => ({ ...prev, [field.name]: exercise }));
                }}
                filterCategory={field.filterCategory}
                label={field.label}
                required={field.required}
              />
            ) : (
              <>
                <Label htmlFor={field.name}>
                  {field.label} {field.required && <span className="text-destructive">*</span>}
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={formData[field.name] || ""}
                    onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || "Select..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === "number" ? (
                  <Input
                    id={field.name}
                    type="number"
                    value={formData[field.name] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type="text"
                    value={formData[field.name] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    placeholder={field.placeholder}
                  />
                )}
                {field.helperText && (
                  <p className="text-xs text-muted-foreground mt-1">{field.helperText}</p>
                )}
              </>
            )}
          </div>
        ))}
      </>
    );
  };

  const caloriePreview = selectedActivity ? estimateCaloriesPreview(selectedActivity, formData) : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Activity Type</Label>
            <Select value={activityTypeId} onValueChange={setActivityTypeId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center gap-2">
                      {type.title}
                      {type.isCustom && <Badge variant="secondary" className="text-xs">Custom</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {renderActivityFields()}

          {caloriePreview && (
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-primary">{caloriePreview}</p>
            </div>
          )}

          <div>
            <Label htmlFor="note">Notes (Optional)</Label>
            <Textarea
              id="note"
              value={formData.note || ""}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Log Activity</Button>
            {onManageActivityTypes && (
              <Button type="button" variant="outline" onClick={onManageActivityTypes}>
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
