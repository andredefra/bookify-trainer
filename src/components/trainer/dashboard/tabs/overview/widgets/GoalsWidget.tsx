import { BaseWidget } from "./BaseWidget";
import { Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { TrainerGoal } from "./types";

export function GoalsWidget() {
  const goals: TrainerGoal[] = [
    {
      id: "clients",
      title: "Reach 50 Active Clients",
      current: 38,
      target: 50,
      unit: "clients",
      color: "bg-blue-500"
    },
    {
      id: "revenue",
      title: "€5000 Monthly Revenue",
      current: 3200,
      target: 5000,
      unit: "€",
      color: "bg-green-500"
    },
    {
      id: "sessions",
      title: "Complete 200 Sessions",
      current: 156,
      target: 200,
      unit: "sessions",
      color: "bg-purple-500"
    }
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <BaseWidget
      title="My Goals"
      icon={Target}
      className="col-span-full lg:col-span-1"
    >
      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          const progressColor = getProgressColor(percentage);

          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{goal.title}</p>
                <span className="text-sm font-semibold">
                  {percentage.toFixed(0)}%
                </span>
              </div>
              
              <div className="relative">
                <Progress value={percentage} className="h-2" />
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full transition-all ${progressColor}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {goal.current} / {goal.target} {goal.unit}
                </span>
                <span>
                  {goal.target - goal.current} {goal.unit} to go
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </BaseWidget>
  );
}
