
import { Input } from "@/components/ui/input";
import { DateSelector } from "./DateSelector";
import { DurationSelector } from "./DurationSelector";
import { useWorkoutLogForm } from "./WorkoutLogFormContext";

export function WorkoutFormHeader() {
  const { 
    date, 
    setDate, 
    workoutName, 
    setWorkoutName,
    duration,
    setDuration 
  } = useWorkoutLogForm();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Workout Name</label>
        <Input
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder="e.g., Leg Day, Upper Body, etc."
          className="w-full"
        />
      </div>
      
      <DateSelector date={date} onDateChange={setDate} />
      
      <DurationSelector 
        duration={duration}
        onDurationChange={setDuration}
      />
    </div>
  );
}
