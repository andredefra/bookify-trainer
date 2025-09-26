import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, 
  Activity, 
  Trophy, 
  TrendingUp, 
  Clock,
  Flame,
  Target,
  BarChart3
} from "lucide-react";

interface WorkoutInsight {
  exercise: string;
  category: 'strength' | 'cardio' | 'flexibility';
  averageWeight: number;
  personalRecord: number;
  totalSessions: number;
  progressTrend: number; // percentage change
  consistency: number; // percentage
  lastSession: string;
}

interface ClientWorkoutInsightsProps {
  clientName?: string;
  insights?: WorkoutInsight[];
}

const defaultInsights: WorkoutInsight[] = [
  {
    exercise: "Bench Press",
    category: "strength",
    averageWeight: 82.5,
    personalRecord: 95,
    totalSessions: 12,
    progressTrend: 15.2,
    consistency: 89,
    lastSession: "2024-03-15"
  },
  {
    exercise: "Squats",
    category: "strength", 
    averageWeight: 95.0,
    personalRecord: 115,
    totalSessions: 15,
    progressTrend: 22.8,
    consistency: 94,
    lastSession: "2024-03-14"
  },
  {
    exercise: "Deadlift",
    category: "strength",
    averageWeight: 110.0,
    personalRecord: 130,
    totalSessions: 10,
    progressTrend: 8.5,
    consistency: 76,
    lastSession: "2024-03-13"
  },
  {
    exercise: "Running",
    category: "cardio",
    averageWeight: 0, // Duration instead
    personalRecord: 32, // minutes for 5K
    totalSessions: 18,
    progressTrend: -12.3, // improvement in time (negative is good)
    consistency: 85,
    lastSession: "2024-03-16"
  }
];

export function ClientWorkoutInsights({ clientName, insights = defaultInsights }: ClientWorkoutInsightsProps) {
  const strengthInsights = insights.filter(i => i.category === 'strength');
  const cardioInsights = insights.filter(i => i.category === 'cardio');
  
  const totalSessions = insights.reduce((sum, insight) => sum + insight.totalSessions, 0);
  const averageConsistency = Math.round(insights.reduce((sum, insight) => sum + insight.consistency, 0) / insights.length);
  const topPerformer = insights.reduce((top, current) => 
    current.consistency > top.consistency ? current : top
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength': return <Dumbbell className="h-4 w-4" />;
      case 'cardio': return <Activity className="h-4 w-4" />;
      case 'flexibility': return <Target className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'cardio': return 'text-green-600 bg-green-50 border-green-200';
      case 'flexibility': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatWeight = (weight: number) => weight > 0 ? `${weight}kg` : 'N/A';
  const formatTrend = (trend: number, isCardio: boolean = false) => {
    const absValue = Math.abs(trend);
    const isPositive = isCardio ? trend < 0 : trend > 0; // For cardio, negative trend is good
    return {
      value: `${isPositive ? '+' : '-'}${absValue.toFixed(1)}%`,
      color: isPositive ? 'text-green-600' : 'text-red-600'
    };
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-purple-500 rounded-md p-1.5">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-medium">
                {clientName ? `${clientName}'s Workout Insights` : 'Client Workout Performance'}
              </h3>
              <p className="text-xs text-muted-foreground">Personal records, averages and consistency tracking</p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-700">{totalSessions}</div>
            <div className="text-xs text-blue-600">Total Sessions</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-700">{averageConsistency}%</div>
            <div className="text-xs text-green-600">Avg Consistency</div>
          </div>
          <div className="text-center p-3 bg-amber-50 rounded-lg">
            <Flame className="h-5 w-5 text-amber-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-amber-700 truncate">{topPerformer.exercise}</div>
            <div className="text-xs text-amber-600">Top Exercise</div>
          </div>
        </div>

        {/* Strength Training Insights */}
        {strengthInsights.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-blue-600" />
              Strength Training
            </h4>
            <div className="space-y-3">
              {strengthInsights.map((insight, index) => {
                const trend = formatTrend(insight.progressTrend);
                return (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(insight.category)}>
                          {getCategoryIcon(insight.category)}
                          <span className="ml-1">{insight.exercise}</span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">PR: {formatWeight(insight.personalRecord)}</div>
                        <div className={`text-xs ${trend.color} flex items-center gap-1`}>
                          <TrendingUp className="h-3 w-3" />
                          {trend.value}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Average Weight</div>
                        <div className="font-medium">{formatWeight(insight.averageWeight)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Sessions</div>
                        <div className="font-medium">{insight.totalSessions}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Consistency</span>
                        <span>{insight.consistency}%</span>
                      </div>
                      <Progress value={insight.consistency} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cardio Insights */}
        {cardioInsights.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              Cardio Training
            </h4>
            <div className="space-y-3">
              {cardioInsights.map((insight, index) => {
                const trend = formatTrend(insight.progressTrend, true);
                return (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getCategoryColor(insight.category)}>
                          {getCategoryIcon(insight.category)}
                          <span className="ml-1">{insight.exercise}</span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Best: {insight.personalRecord} min</div>
                        <div className={`text-xs ${trend.color} flex items-center gap-1`}>
                          <TrendingUp className="h-3 w-3" />
                          {trend.value}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Sessions</div>
                        <div className="font-medium">{insight.totalSessions}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Last Session</div>
                        <div className="font-medium">{new Date(insight.lastSession).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Consistency</span>
                        <span>{insight.consistency}%</span>
                      </div>
                      <Progress value={insight.consistency} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}