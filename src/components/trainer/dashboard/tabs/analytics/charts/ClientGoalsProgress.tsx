import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Award, Calendar } from "lucide-react";

interface ClientGoal {
  id: string;
  name: string;
  type: 'weight_management' | 'strength_progress' | 'cardiovascular_endurance' | 'body_composition' | 'activity_level';
  current: number;
  target: number;
  unit: string;
  progress: number;
  deadline: string;
  status: 'on_track' | 'behind' | 'achieved';
}

interface ClientGoalsProgressProps {
  clientName?: string;
  goals?: ClientGoal[];
}

const defaultGoals: ClientGoal[] = [
  {
    id: '1',
    name: 'Target Weight Loss',
    type: 'weight_management',
    current: 68.5,
    target: 65,
    unit: 'kg',
    progress: 70,
    deadline: '2024-06-15',
    status: 'on_track'
  },
  {
    id: '2',
    name: 'Bench Press Maximum',
    type: 'strength_progress',
    current: 75,
    target: 80,
    unit: 'kg',
    progress: 94,
    deadline: '2024-05-30',
    status: 'on_track'
  },
  {
    id: '3',
    name: '5K Running Distance',
    type: 'cardiovascular_endurance',
    current: 3.2,
    target: 5,
    unit: 'km',
    progress: 64,
    deadline: '2024-07-01',
    status: 'on_track'
  },
  {
    id: '4',
    name: 'Body Fat Percentage',
    type: 'body_composition',
    current: 22,
    target: 15,
    unit: '%',
    progress: 43,
    deadline: '2024-08-01',
    status: 'behind'
  },
  {
    id: '5',
    name: 'Daily Step Count',
    type: 'activity_level',
    current: 8500,
    target: 10000,
    unit: 'steps',
    progress: 85,
    deadline: '2024-12-31',
    status: 'on_track'
  }
];

export function ClientGoalsProgress({ clientName, goals = defaultGoals }: ClientGoalsProgressProps) {
  const achievedGoals = goals.filter(goal => goal.status === 'achieved').length;
  const onTrackGoals = goals.filter(goal => goal.status === 'on_track').length;
  const averageProgress = Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'achieved': return 'bg-green-500';
      case 'on_track': return 'bg-blue-500';
      case 'behind': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'achieved': return <Badge className="bg-green-100 text-green-800 border-green-200">Achieved</Badge>;
      case 'on_track': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">On Track</Badge>;
      case 'behind': return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Behind</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weight_management': return '⚖️';
      case 'strength_progress': return '💪';
      case 'cardiovascular_endurance': return '🏃';
      case 'body_composition': return '📏';
      case 'activity_level': return '🚶';
      default: return '🎯';
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 rounded-md p-1.5">
              <Target className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-medium">
                {clientName ? `${clientName}'s Goals Progress` : 'Client Goals Progress'}
              </h3>
              <p className="text-xs text-muted-foreground">Current goal tracking and achievements</p>
            </div>
          </div>
        </div>

        {/* Goals Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Award className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-700">{achievedGoals}</div>
            <div className="text-xs text-green-600">Achieved</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-700">{onTrackGoals}</div>
            <div className="text-xs text-blue-600">On Track</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <Target className="h-5 w-5 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-purple-700">{averageProgress}%</div>
            <div className="text-xs text-purple-600">Avg Progress</div>
          </div>
        </div>

        {/* Individual Goals */}
        <div className="space-y-4">
          {goals.map((goal) => {
            const isReverse = goal.type === 'body_composition' && goal.unit === '%'; // For body fat % where lower is better
            const progressValue = isReverse 
              ? Math.max(0, Math.min(100, ((goal.target - goal.current + goal.target) / goal.target) * 100))
              : goal.progress;

            return (
              <div key={goal.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getTypeIcon(goal.type)}</span>
                    <div>
                      <h4 className="font-medium text-sm">{goal.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Target: {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(goal.status)}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress 
                    value={progressValue} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progressValue.toFixed(0)}% complete</span>
                    <span>
                      {isReverse 
                        ? `${(goal.current - goal.target).toFixed(1)} ${goal.unit} to go`
                        : `${(goal.target - goal.current).toFixed(1)} ${goal.unit} to go`
                      }
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}