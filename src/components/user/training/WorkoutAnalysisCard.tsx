import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Zap, Target, Heart, Utensils, RefreshCw, AlertTriangle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAIAccess } from "@/hooks/useAIAccess";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WorkoutAnalysis {
  caloriesBurned: number;
  workoutIntensity: 'low' | 'moderate' | 'high';
  muscleGroupsWorked: string[];
  volumeAnalysis: {
    totalVolume: number;
    comparison: string;
  };
  insights: {
    strengths: string[];
    improvements: string[];
    progressNotes: string;
  };
  recommendations: {
    nextWorkout: string;
    recovery: string;
    nutrition: string;
  };
  fitnessIntegration: {
    heartRateZone: string;
    activityType: string;
    estimatedMET: number;
  };
}

interface WorkoutAnalysisCardProps {
  workoutLog: any;
  fitnessData?: any;
  userProfile?: any;
  onAnalysisComplete?: (analysis: WorkoutAnalysis) => void;
}

export function WorkoutAnalysisCard({ 
  workoutLog, 
  fitnessData, 
  userProfile,
  onAnalysisComplete 
}: WorkoutAnalysisCardProps) {
  const [analysis, setAnalysis] = useState<WorkoutAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { monthlyUsage, isPro, checkAIAccess, trackAIUsage, loading: aiLoading } = useAIAccess();

  const FREE_LIMIT = 5;
  const maxRequests = isPro ? 100 : FREE_LIMIT;
  const remaining = Math.max(0, maxRequests - monthlyUsage);
  const isAtLimit = remaining === 0 && !isPro;

  const analyzeWorkout = async () => {
    const access = await checkAIAccess('chat');
    if (!access.hasAccess) {
      toast({
        title: "AI limit reached",
        description: access.reason === 'rate_limit_exceeded' 
          ? `You've used all ${maxRequests} AI requests this month. Upgrade to Pro for unlimited access.`
          : "Subscribe to access AI features.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-workout', {
        body: {
          workoutLog,
          fitnessData,
          userProfile
        }
      });

      if (error) throw error;

      if (data.success) {
        await trackAIUsage('workout_analysis');
        setAnalysis(data.analysis);
        onAnalysisComplete?.(data.analysis);
        toast({
          title: "Analysis completed",
          description: "AI has successfully analyzed your workout"
        });
      } else {
        throw new Error(data.error || 'Errore durante l\'analisi');
      }
    } catch (error) {
      console.error('Error analyzing workout:', error);
      toast({
        title: "Analysis error",
        description: "Unable to analyze the workout",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'destructive';
      case 'moderate': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case 'high': return '🔥';
      case 'moderate': return '⚡';
      case 'low': return '💚';
      default: return '⚡';
    }
  };

  const UsageBadge = () => {
    if (aiLoading) return null;
    const used = monthlyUsage;
    const isLow = !isPro && remaining <= 2 && remaining > 0;
    const isOut = !isPro && remaining === 0;
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">
              AI Requests: <span className="font-semibold text-foreground">{used}/{maxRequests}</span> used this month
            </span>
          </div>
          {!isPro && (
            <Badge variant={isOut ? "destructive" : isLow ? "outline" : "secondary"} className="text-xs">
              {isOut ? "Limit reached" : `${remaining} left`}
            </Badge>
          )}
        </div>
        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${isOut ? 'bg-destructive' : isLow ? 'bg-amber-500' : 'bg-primary'}`}
            style={{ width: `${Math.min(100, (used / maxRequests) * 100)}%` }}
          />
        </div>
        {isOut && !isPro && (
          <Alert variant="destructive" className="py-2">
            <AlertTriangle className="h-3.5 w-3.5" />
            <AlertDescription className="text-xs">
              You've used all free AI requests this month. Upgrade to Pro for unlimited analyses.
            </AlertDescription>
          </Alert>
        )}
        {isLow && !isPro && (
          <p className="text-xs text-amber-600">
            ⚠️ Only {remaining} AI {remaining === 1 ? 'request' : 'requests'} remaining this month
          </p>
        )}
      </div>
    );
  };

  if (!analysis) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <Brain className="h-5 w-5 text-primary" />
             AI Workout Analysis
             {workoutLog?.name && <span className="text-muted-foreground font-normal text-base">— {workoutLog.name}</span>}
           </CardTitle>
          <CardDescription>
            Get personalized insights on your training with AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UsageBadge />
          <Button 
            onClick={analyzeWorkout} 
            disabled={isLoading || isAtLimit}
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze Workout
              </>
            )}
          </Button>
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
             AI Workout Analysis
             {workoutLog?.name && <span className="text-muted-foreground font-normal text-base">— {workoutLog.name}</span>}
           </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={analyzeWorkout}
              disabled={isLoading || isAtLimit}
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <UsageBadge />
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analysis.caloriesBurned}</div>
              <p className="text-sm text-muted-foreground">Calories Burned</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                {getIntensityIcon(analysis.workoutIntensity)}
                <Badge variant={getIntensityColor(analysis.workoutIntensity)} className="text-xs">
                  {analysis.workoutIntensity.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Intensity</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analysis.volumeAnalysis.totalVolume}</div>
              <p className="text-sm text-muted-foreground">Total Volume (kg)</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analysis.fitnessIntegration.estimatedMET}</div>
              <p className="text-sm text-muted-foreground">Estimated MET</p>
            </div>
          </div>

          {/* Muscle Groups */}
          <div>
            <h4 className="font-medium mb-2">Muscle Groups Trained</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.muscleGroupsWorked.map((muscle, index) => (
                <Badge key={index} variant="outline">
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Strengths & Improvements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h5 className="font-medium text-green-600 mb-1">💪 Strengths</h5>
              <ul className="text-sm space-y-1">
                {analysis.insights.strengths.map((strength, index) => (
                  <li key={index} className="text-muted-foreground">• {strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-600 mb-1">🎯 Areas for Improvement</h5>
              <ul className="text-sm space-y-1">
                {analysis.insights.improvements.map((improvement, index) => (
                  <li key={index} className="text-muted-foreground">• {improvement}</li>
                ))}
              </ul>
            </div>
            {analysis.insights.progressNotes && (
              <div>
                <h5 className="font-medium text-blue-600 mb-1">📈 Progress Notes</h5>
                <p className="text-sm text-muted-foreground">{analysis.insights.progressNotes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h5 className="font-medium flex items-center gap-1 mb-1">
                <Zap className="h-3 w-3" />
                Next Workout
              </h5>
              <p className="text-sm text-muted-foreground">{analysis.recommendations.nextWorkout}</p>
            </div>
            <div>
              <h5 className="font-medium flex items-center gap-1 mb-1">
                <Heart className="h-3 w-3" />
                Recovery
              </h5>
              <p className="text-sm text-muted-foreground">{analysis.recommendations.recovery}</p>
            </div>
            <div>
              <h5 className="font-medium flex items-center gap-1 mb-1">
                <Utensils className="h-3 w-3" />
                Nutrition
              </h5>
              <p className="text-sm text-muted-foreground">{analysis.recommendations.nutrition}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fitness Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Heart className="h-4 w-4" />
            Fitness Tracker Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Heart Rate Zone:</span>
              <p className="text-muted-foreground">{analysis.fitnessIntegration.heartRateZone}</p>
            </div>
            <div>
              <span className="font-medium">Activity Type:</span>
              <p className="text-muted-foreground">{analysis.fitnessIntegration.activityType}</p>
            </div>
            <div>
              <span className="font-medium">MET Equivalent:</span>
              <p className="text-muted-foreground">{analysis.fitnessIntegration.estimatedMET} MET</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}