
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface LogActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function LogActivityDialog({ open, onOpenChange, onSubmit }: LogActivityDialogProps) {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [activityType, setActivityType] = useState<string>("general");
  const [formData, setFormData] = useState({
    steps: "",
    calories: "",
    minutes: "",
    distance: "",
    cardioMinutes: "",
    strengthWeight: "",
    exerciseName: "",
    exerciseId: "",
    reps: "",
    sets: "",
    note: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: date.toISOString(),
      ...formData
    });
    
    // Reset form
    setFormData({
      steps: "",
      calories: "",
      minutes: "",
      distance: "",
      cardioMinutes: "",
      strengthWeight: "",
      exerciseName: "",
      exerciseId: "",
      reps: "",
      sets: "",
      note: ""
    });
    setActivityType("general");
    setDate(new Date());
  };

  const renderActivityFields = () => {
    switch (activityType) {
      case "cardio":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  value={formData.distance}
                  onChange={(e) => setFormData({...formData, distance: e.target.value})}
                  placeholder="5.0"
                />
              </div>
              <div>
                <Label htmlFor="cardioMinutes">Duration (minutes)</Label>
                <Input
                  id="cardioMinutes"
                  type="number"
                  value={formData.cardioMinutes}
                  onChange={(e) => setFormData({...formData, cardioMinutes: e.target.value})}
                  placeholder="30"
                />
              </div>
            </div>
          </>
        );
      
      case "strength":
        return (
          <>
            <div>
              <Label htmlFor="exerciseName">Exercise Name</Label>
              <Input
                id="exerciseName"
                value={formData.exerciseName}
                onChange={(e) => setFormData({...formData, exerciseName: e.target.value})}
                placeholder="Bench Press"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="strengthWeight">Weight (kg)</Label>
                <Input
                  id="strengthWeight"
                  type="number"
                  step="0.5"
                  value={formData.strengthWeight}
                  onChange={(e) => setFormData({...formData, strengthWeight: e.target.value})}
                  placeholder="80"
                />
              </div>
              <div>
                <Label htmlFor="sets">Sets</Label>
                <Input
                  id="sets"
                  type="number"
                  value={formData.sets}
                  onChange={(e) => setFormData({...formData, sets: e.target.value})}
                  placeholder="3"
                />
              </div>
              <div>
                <Label htmlFor="reps">Reps</Label>
                <Input
                  id="reps"
                  type="number"
                  value={formData.reps}
                  onChange={(e) => setFormData({...formData, reps: e.target.value})}
                  placeholder="10"
                />
              </div>
            </div>
          </>
        );
      
      default:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="steps">Steps</Label>
                <Input
                  id="steps"
                  type="number"
                  value={formData.steps}
                  onChange={(e) => setFormData({...formData, steps: e.target.value})}
                  placeholder="10000"
                />
              </div>
              <div>
                <Label htmlFor="calories">Calories Burned</Label>
                <Input
                  id="calories"
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  placeholder="300"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="minutes">Active Minutes</Label>
              <Input
                id="minutes"
                type="number"
                value={formData.minutes}
                onChange={(e) => setFormData({...formData, minutes: e.target.value})}
                placeholder="30"
              />
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'max-w-[95vw] h-[90vh] overflow-y-auto' : 'max-w-md'}`}>
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align={isMobile ? "center" : "start"}>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="activityType">Activity Type</Label>
            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Activity</SelectItem>
                <SelectItem value="cardio">Cardiovascular Exercise</SelectItem>
                <SelectItem value="strength">Strength Training</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderActivityFields()}

          <div>
            <Label htmlFor="note">Notes (optional)</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({...formData, note: e.target.value})}
              placeholder="Any additional notes about your activity..."
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Log Activity</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
