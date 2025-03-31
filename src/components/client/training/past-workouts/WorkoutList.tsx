
import { WorkoutListItem } from "./WorkoutListItem";
import { WorkoutLog } from "./types";

interface WorkoutListProps {
  workouts: WorkoutLog[];
  onSelectWorkout: (workout: WorkoutLog) => void;
}

export function WorkoutList({ workouts, onSelectWorkout }: WorkoutListProps) {
  return (
    <div className="space-y-3">
      {workouts.map((workout) => (
        <WorkoutListItem 
          key={workout.id}
          workout={workout}
          onClick={() => onSelectWorkout(workout)}
        />
      ))}
    </div>
  );
}
