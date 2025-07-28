import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Target, Heart, Utensils, RefreshCw, Calendar, Activity, Trophy, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProgramAnalysis {
  overallProgress: {
    completionRate: number;
    adherenceScore: number;
    progressTrend: 'improving' | 'stable' | 'declining';
    weeklyConsistency: number;
  };
  performanceMetrics: {
    strengthProgression: string;
    volumeProgression: string;
    intensityTrend: string;
    recoveryIndicators: string;
  };
  goalAlignment: {
    goalsOnTrack: string[];
    areasNeedingFocus: string[];
    adjustmentSuggestions: string[];
  };
  healthIntegration: {
    heartRateZoneAnalysis?: string;
    recoveryAssessment?: string;
    sleepImpact?: string;
    calorieBalance?: string;
  };
  recommendations: {
    weeklyAdjustments: string[];
    exerciseModifications: string[];
    recoveryOptimization: string[];
    nutritionTips: string[];
  };
  insights: {
    strengthAreas: string[];
    improvementOpportunities: string[];
    motivationalNotes: string;
    nextMilestone: string;
  };
}

interface ProgramAnalysisCardProps {
  programData: any;
  workoutLogs?: any[];
  fitnessData?: any;
  userProfile?: any;
  onAnalysisComplete?: (analysis: ProgramAnalysis) => void;
}

export function ProgramAnalysisCard({ 
  programData, 
  workoutLogs = [],
  fitnessData, 
  userProfile,
  onAnalysisComplete 
}: ProgramAnalysisCardProps) {
  const [analysis, setAnalysis] = useState<ProgramAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const analyzeProgram = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-training-program', {
        body: {
          programData: {
            programId: programData.id,
            programTitle: programData.title,
            durationWeeks: programData.duration_weeks,
            currentWeek: programData.progress.currentWeek,
            completedSessions: programData.progress.completed,
            totalSessions: programData.progress.total,
            goals: programData.goals,
            difficulty: programData.difficulty_level,
            startDate: programData.started_at
          },
          workoutLogs,
          fitnessData,
          userProfile
        }
      });

      if (error) throw error;

      if (data.success) {
        setAnalysis(data.analysis);
        onAnalysisComplete?.(data.analysis);
        toast({
          title: "Program Analysis completed",
          description: "AI has successfully analyzed your training program"
        });
      } else {
        throw new Error(data.error || 'Error during analysis');
      }
    } catch (error) {
      console.error('Error analyzing program:', error);
      toast({
        title: "Analysis error",
        description: "Unable to analyze the training program",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      case 'declining': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'stable': return '📊';
      case 'declining': return '📉';
      default: return '📊';
    }
  };

  if (!analysis) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Program Analysis
          </CardTitle>
          <CardDescription>
            Get comprehensive insights on your training program progress, performance trends, and personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>{workoutLogs.length} workout sessions analyzed</span>
            </div>
            {fitnessData && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>Fitness tracker data integrated</span>
              </div>
            )}
            <Button 
              onClick={analyzeProgram} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Program...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Training Program
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Program Analysis
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={analyzeProgram}
              disabled={isLoading}
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Math.round(analysis.overallProgress.completionRate)}%</div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                {getProgressTrendIcon(analysis.overallProgress.progressTrend)}
                <span className={getProgressTrendColor(analysis.overallProgress.progressTrend)}>
                  {analysis.overallProgress.progressTrend.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Progress Trend</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Math.round(analysis.overallProgress.adherenceScore)}/10</div>
              <p className="text-sm text-muted-foreground">Adherence Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Math.round(analysis.overallProgress.weeklyConsistency)}%</div>
              <p className="text-sm text-muted-foreground">Weekly Consistency</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h5 className="font-medium text-blue-600 mb-1">💪 Strength Progression</h5>
              <p className="text-sm text-muted-foreground">{analysis.performanceMetrics.strengthProgression}</p>
            </div>
            <div>
              <h5 className="font-medium text-green-600 mb-1">📊 Volume Progression</h5>
              <p className="text-sm text-muted-foreground">{analysis.performanceMetrics.volumeProgression}</p>
            </div>
            <div>
              <h5 className="font-medium text-orange-600 mb-1">🔥 Intensity Trend</h5>
              <p className="text-sm text-muted-foreground">{analysis.performanceMetrics.intensityTrend}</p>
            </div>
            <div>
              <h5 className="font-medium text-purple-600 mb-1">🛌 Recovery Indicators</h5>
              <p className="text-sm text-muted-foreground">{analysis.performanceMetrics.recoveryIndicators}</p>
            </div>
          </CardContent>
        </Card>

        {/* Goal Alignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4" />
              Goal Alignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h5 className="font-medium text-green-600 mb-1">✅ Goals On Track</h5>
              <ul className="text-sm space-y-1">
                {analysis.goalAlignment.goalsOnTrack.map((goal, index) => (
                  <li key={index} className="text-muted-foreground">• {goal}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-600 mb-1">🎯 Areas Needing Focus</h5>
              <ul className="text-sm space-y-1">
                {analysis.goalAlignment.areasNeedingFocus.map((area, index) => (
                  <li key={index} className="text-muted-foreground">• {area}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-600 mb-1">💡 Adjustment Suggestions</h5>
              <ul className="text-sm space-y-1">
                {analysis.goalAlignment.adjustmentSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-muted-foreground">• {suggestion}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Integration */}
      {analysis.healthIntegration && Object.keys(analysis.healthIntegration).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4" />
              Health & Fitness Tracker Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {analysis.healthIntegration.heartRateZoneAnalysis && (
                <div>
                  <span className="font-medium">Heart Rate Analysis:</span>
                  <p className="text-muted-foreground">{analysis.healthIntegration.heartRateZoneAnalysis}</p>
                </div>
              )}
              {analysis.healthIntegration.recoveryAssessment && (
                <div>
                  <span className="font-medium">Recovery Assessment:</span>
                  <p className="text-muted-foreground">{analysis.healthIntegration.recoveryAssessment}</p>
                </div>
              )}
              {analysis.healthIntegration.sleepImpact && (
                <div>
                  <span className="font-medium">Sleep Impact:</span>
                  <p className="text-muted-foreground">{analysis.healthIntegration.sleepImpact}</p>
                </div>
              )}
              {analysis.healthIntegration.calorieBalance && (
                <div>
                  <span className="font-medium">Calorie Balance:</span>
                  <p className="text-muted-foreground">{analysis.healthIntegration.calorieBalance}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4" />
            Recommendations & Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-blue-600 mb-2">📅 Weekly Adjustments</h5>
              <ul className="text-sm space-y-1">
                {analysis.recommendations.weeklyAdjustments.map((adjustment, index) => (
                  <li key={index} className="text-muted-foreground">• {adjustment}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-600 mb-2">🏋️ Exercise Modifications</h5>
              <ul className="text-sm space-y-1">
                {analysis.recommendations.exerciseModifications.map((modification, index) => (
                  <li key={index} className="text-muted-foreground">• {modification}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-600 mb-2">😴 Recovery Optimization</h5>
              <ul className="text-sm space-y-1">
                {analysis.recommendations.recoveryOptimization.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">• {tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-600 mb-2">🍎 Nutrition Tips</h5>
              <ul className="text-sm space-y-1">
                {analysis.recommendations.nutritionTips.map((tip, index) => (
                  <li key={index} className="text-muted-foreground">• {tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Insights Section */}
          <div className="border-t pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-green-600 mb-2">💪 Strength Areas</h5>
                <ul className="text-sm space-y-1">
                  {analysis.insights.strengthAreas.map((strength, index) => (
                    <li key={index} className="text-muted-foreground">• {strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-600 mb-2">🚀 Improvement Opportunities</h5>
                <ul className="text-sm space-y-1">
                  {analysis.insights.improvementOpportunities.map((opportunity, index) => (
                    <li key={index} className="text-muted-foreground">• {opportunity}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
              <h5 className="font-medium text-primary mb-2">🎉 Motivational Note</h5>
              <p className="text-sm text-muted-foreground">{analysis.insights.motivationalNotes}</p>
            </div>
            
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h5 className="font-medium text-blue-600 mb-1">🎯 Next Milestone</h5>
              <p className="text-sm text-muted-foreground">{analysis.insights.nextMilestone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}