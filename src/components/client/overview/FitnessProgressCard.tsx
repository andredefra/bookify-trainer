
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";

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

export function FitnessProgressCard({ progressData }: FitnessProgressCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Fitness Progress</CardTitle>
          <CardDescription>Track your journey toward your goals</CardDescription>
        </div>
        <Button variant="outline" className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {progressData.map((item) => (
            <div key={item.goal} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{item.goal}</span>
                <span className="text-sm text-muted-foreground">
                  {item.current} / {item.target} {item.unit}
                </span>
              </div>
              <Progress value={item.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
