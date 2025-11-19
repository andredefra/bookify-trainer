
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart2, 
  PieChart as PieChartIcon, 
  Target, 
  Brain, 
  Scale, 
  Activity,
  TrendingUp,
  TrendingDown,
  Flame,
  Clock,
  Zap,
  Award,
  Heart,
  RefreshCw
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

// Import our types
import { 
  WorkoutAnalyticsProps, 
  WeeklyDataItem, 
  GoalProgressItem, 
  AnalyticsStats,
  AIInsights,
  TrendData,
  FitnessTrackerData,
  BodyCompositionData
} from "./types";

// Import our chart components
import { WeeklyActivityChart } from "./charts/WeeklyActivityChart";
import { WorkoutTypesChart } from "./charts/WorkoutTypesChart";
import { GoalsProgressChart } from "./charts/GoalsProgressChart";
import { AnalyticsChat } from "./AnalyticsChat";

// Import activity type utilities
import { generateWorkoutTypesFromData, getDefaultWorkoutTypes } from "./utils/workoutTypeUtils";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export function WorkoutAnalytics({ 
  progressData,
  weeklyData,
  workoutTypes,
  fitnessTrackerData,
  bodyCompositionData
}: WorkoutAnalyticsProps) {
  const [timeframe, setTimeframe] = useState("1month");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const isMobile = useIsMobile();

  // Enhanced analytics data state
  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats | null>(null);
  const [aiInsights, setAIInsights] = useState<AIInsights | null>(null);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [bodyComposition, setBodyComposition] = useState<BodyCompositionData[]>([]);

  // Generate dynamic fitness tracker data based on progress
  const generateDynamicFitnessData = (progressData: any[]): FitnessTrackerData => {
    if (!progressData?.length) {
      return {
        steps: 6000,
        calories: 250,
        heartRate: 120,
        activeTime: 20,
        distance: 3.0,
        sleepHours: 7.0
      };
    }
    
    const avgProgress = progressData.reduce((sum, goal) => sum + goal.progress, 0) / progressData.length;
    const activityMultiplier = Math.max(0.5, avgProgress / 100);
    
    return {
      steps: Math.round(6000 + (activityMultiplier * 4000)),
      calories: Math.round(250 + (activityMultiplier * 200) + Math.random() * 50),
      heartRate: Math.round(120 + (activityMultiplier * 25)),
      activeTime: Math.round(20 + (activityMultiplier * 40)),
      distance: Math.round((3.0 + (activityMultiplier * 3.0)) * 10) / 10,
      sleepHours: Math.round((7.0 + (activityMultiplier * 1.5)) * 10) / 10
    };
  };

  const defaultFitnessData = fitnessTrackerData || generateDynamicFitnessData(progressData);

  // Helper functions - defined before use
  const calculateStreak = (data: any[]): number => {
    return Math.floor(Math.random() * 7) + 1;
  };

  const extractTopGoalCategories = (data: any[]): string[] => {
    const categories = data.reduce((acc, goal) => {
      const type = goal.goalType || 'general';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(categories)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 3)
      .map(([category]) => category);
  };

  const calculateWeeklyTrend = (data: any[]): number => {
    if (!data || data.length === 0) return 0;
    
    // Calculate average progress for current vs previous period
    const avgProgress = data.reduce((sum, goal) => sum + goal.progress, 0) / data.length;
    const baseProgress = 50; // Simulated baseline
    return Math.round(avgProgress - baseProgress);
  };

  const generatePersonalizedInsights = (data: any[], avgProgress: number, achievedGoals: number): string[] => {
    const insights: string[] = [];
    
    if (achievedGoals > 0) {
      insights.push(`You've completed ${achievedGoals} goals - great commitment!`);
    }
    
    const strengthGoals = data.filter(goal => goal.goalType === 'strength_progress');
    const weightGoals = data.filter(goal => goal.goalType === 'weight_management');
    const activityGoals = data.filter(goal => goal.goalType === 'activity_level');
    
    if (strengthGoals.length > 0) {
      const avgStrengthProgress = strengthGoals.reduce((sum, goal) => sum + goal.progress, 0) / strengthGoals.length;
      insights.push(`Your strength training is ${avgStrengthProgress > 70 ? 'excellent' : avgStrengthProgress > 40 ? 'progressing well' : 'getting started'}`);
    }
    
    if (weightGoals.length > 0) {
      insights.push(`Weight management goals are ${weightGoals[0].progress > 60 ? 'on track' : 'needing attention'}`);
    }
    
    if (activityGoals.length > 0) {
      insights.push(`Daily activity consistency is ${activityGoals[0].progress > 80 ? 'outstanding' : 'building momentum'}`);
    }
    
    return insights.slice(0, 3);
  };

  const generateSmartImprovementAreas = (data: any[], avgProgress: number, topCategories: string[]): string[] => {
    const areas: string[] = [];
    
    if (avgProgress < 30) {
      areas.push("Establish daily tracking routine");
      areas.push("Set smaller, achievable milestones");
    } else if (avgProgress < 60) {
      areas.push("Increase workout intensity gradually");
      areas.push("Add variety to your routine");
    } else {
      areas.push("Consider advanced training techniques");
      areas.push("Optimize nutrition timing");
    }
    
    // Add specific areas based on goal types
    if (topCategories.includes('weight_management')) {
      areas.push("Track macronutrient intake");
    }
    if (topCategories.includes('strength_progress')) {
      areas.push("Progressive overload planning");
    }
    
    return areas.slice(0, 3);
  };

  const generateContextualMotivation = (avgProgress: number, achievedGoals: number, weeklyTrend: number): string => {
    if (weeklyTrend > 10) {
      return "🔥 Amazing progress this week! You're crushing your goals!";
    } else if (weeklyTrend > 0) {
      return "📈 Steady improvement - consistency is key to success!";
    } else if (weeklyTrend < -10) {
      return "💪 Every setback is a setup for a comeback. Let's get back on track!";
    } else if (achievedGoals > 2) {
      return "🎯 Goal achiever! Your dedication is paying off beautifully!";
    } else if (avgProgress > 60) {
      return "⭐ You're in the sweet spot - maintain this momentum!";
    } else {
      return "🌱 Growing stronger every day. Small steps, big results!";
    }
  };

  const generateImprovementAreas = (data: any[], avgProgress: number) => {
    if (avgProgress < 30) return ["Goal consistency", "Daily activity tracking"];
    if (avgProgress < 60) return ["Progressive goals", "Measurement frequency"];
    return ["Advanced metrics", "Long-term planning"];
  };

  const generateMotivation = (avgProgress: number, achievedGoals: number) => {
    if (achievedGoals > 2) return "Excellent progress! Keep up the momentum!";
    if (avgProgress > 60) return "You're doing great! Stay consistent!";
    if (avgProgress > 30) return "Good start! Focus on consistency.";
    return "Every journey starts with a single step!";
  };

  // Generate comprehensive analytics from progress data
  const generateComprehensiveAnalytics = () => {
    if (!progressData?.length) {
      // Return basic structure with zero values
      setAnalyticsStats({
        totalWorkouts: 0,
        weeklyAverage: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalMinutes: 0,
        totalCaloriesBurned: 0,
        averageIntensity: "none",
        avgStepsPerDay: defaultFitnessData.steps,
        avgCaloriesPerDay: defaultFitnessData.calories
      });
      
      setAIInsights({
        totalAnalyses: 0,
        averageCaloriesPerWorkout: 0,
        dominantIntensity: "none",
        topGoalCategories: [],
        improvementAreas: ["Start setting fitness goals"],
        currentMotivation: "Begin your fitness journey!",
        fitnessScore: 0,
        progressTrend: 'stable'
      });
      
      setTrendData([]);
      setBodyComposition(generateBodyCompositionData());
      return;
    }

    // Calculate comprehensive stats
    const totalGoals = progressData.length;
    const achievedGoals = progressData.filter(goal => goal.progress >= 100).length;
    const avgProgress = progressData.reduce((sum, goal) => sum + goal.progress, 0) / totalGoals;
    
    // Calculate dynamic workout data based on goal progress
    const simulatedWorkouts = Math.max(1, Math.floor(avgProgress / 8) + achievedGoals);
    const avgWorkoutDuration = 35 + (avgProgress / 100) * 25; // 35-60 min based on progress
    const totalMinutes = Math.round(simulatedWorkouts * avgWorkoutDuration);
    
    // Dynamic calorie calculation based on intensity and fitness level
    const caloriesPerMinute = avgProgress > 70 ? 12 : avgProgress > 40 ? 9 : 6;
    const totalCaloriesBurned = Math.round(totalMinutes * caloriesPerMinute + Math.random() * 100);
    
    setAnalyticsStats({
      totalWorkouts: simulatedWorkouts,
      weeklyAverage: Math.round((simulatedWorkouts / getWeeksInTimeframe()) * 10) / 10,
      currentStreak: calculateStreak(progressData),
      longestStreak: Math.max(7, calculateStreak(progressData) + 2),
      totalMinutes,
      totalCaloriesBurned,
      averageIntensity: avgProgress > 70 ? "high" : avgProgress > 40 ? "moderate" : "low",
      avgStepsPerDay: defaultFitnessData.steps,
      avgCaloriesPerDay: defaultFitnessData.calories
    });

    // Generate detailed AI insights based on actual progress
    const topCategories = extractTopGoalCategories(progressData);
    const personalizedInsights = generatePersonalizedInsights(progressData, avgProgress, achievedGoals);
    const weeklyTrend = calculateWeeklyTrend(progressData);
    
    setAIInsights({
      totalAnalyses: totalGoals,
      averageCaloriesPerWorkout: Math.round((totalMinutes * caloriesPerMinute) / Math.max(simulatedWorkouts, 1)),
      dominantIntensity: avgProgress > 70 ? "high" : avgProgress > 40 ? "moderate" : "low",
      topGoalCategories: topCategories,
      improvementAreas: generateSmartImprovementAreas(progressData, avgProgress, topCategories),
      currentMotivation: generateContextualMotivation(avgProgress, achievedGoals, weeklyTrend),
      fitnessScore: Math.round(avgProgress),
      progressTrend: weeklyTrend > 5 ? 'improving' : weeklyTrend < -5 ? 'declining' : 'stable',
      personalizedInsights,
      weeklyProgressChange: weeklyTrend
    });

    // Generate trend data
    setTrendData(generateTrendData());
    setBodyComposition(generateBodyCompositionData());
  };

  const getWeeksInTimeframe = () => {
    switch (timeframe) {
      case '1month': return 4;
      case '3months': return 12;
      case '6months': return 24;
      case '1year': return 52;
      default: return 4;
    }
  };

  const generateTrendData = (): TrendData[] => {
    const periods = getPeriodsForTimeframe();
    return periods.map((period, index) => ({
      period,
      workouts: Math.floor(Math.random() * 6) + 2,
      minutes: Math.floor(Math.random() * 200) + 100,
      calories: Math.floor(Math.random() * 800) + 400,
      steps: Math.floor(Math.random() * 3000) + 7000,
      weight: 75 - (index * 0.2),
      goalProgress: Math.min(100, (index + 1) * 15 + Math.random() * 10)
    }));
  };

  const getPeriodsForTimeframe = () => {
    switch (timeframe) {
      case '1month': return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      case '3months': return ['Month 1', 'Month 2', 'Month 3'];
      case '6months': return ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
      case '1year': return ['Q1', 'Q2', 'Q3', 'Q4'];
      default: return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    }
  };

  const generateBodyCompositionData = (): BodyCompositionData[] => {
    const dataPoints = timeframe === '1year' ? 12 : timeframe === '6months' ? 6 : 4;
    return Array.from({ length: dataPoints }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (dataPoints - 1 - i));
      const weight = 75 - (i * 0.3);
      return {
        date: date.toISOString().split('T')[0],
        weight: Math.round(weight * 10) / 10,
        bodyFat: Math.round((18 - i * 0.2) * 10) / 10,
        muscleMass: Math.round((62 + i * 0.3) * 10) / 10,
        bmi: Math.round((weight / (1.8 * 1.8)) * 10) / 10
      };
    });
  };

  const runAIAnalysis = async () => {
    setIsLoadingAI(true);
    // Simulate AI analysis
    setTimeout(() => {
      // Update insights with enhanced analysis
      if (aiInsights) {
        setAIInsights({
          ...aiInsights,
          fitnessScore: Math.min(100, aiInsights.fitnessScore + 5),
          improvementAreas: ["Advanced goal setting", "Nutrition tracking"],
          currentMotivation: "AI analysis complete! You're making great progress!"
        });
      }
      setIsLoadingAI(false);
    }, 2000);
  };

  useEffect(() => {
    generateComprehensiveAnalytics();
  }, [progressData, timeframe]);

  // Helper functions
  const generateWeeklyDataFromLogs = (progressData: any[]): WeeklyDataItem[] => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      minutes: Math.floor(Math.random() * 60) + 30,
      calories: Math.floor(Math.random() * 400) + 200,
      steps: Math.floor(Math.random() * 5000) + 5000,
      distance: Math.round((Math.random() * 5 + 2) * 100) / 100,
    }));
  };

  const convertToGoalProgress = (progressData: any[]): GoalProgressItem[] => {
    return progressData.map(item => ({
      type: item.goalType,
      name: item.goal,
      current: item.current,
      target: item.target,
      unit: item.unit,
      progress: item.progress
    }));
  };

  // Generate data from real progress data or defaults
  const actualWeeklyData = weeklyData || generateWeeklyDataFromLogs(progressData);
  const goalsProgress = convertToGoalProgress(progressData);
  const actualActivityTypes = workoutTypes || generateWorkoutTypesFromData(progressData);

  if (!analyticsStats || !aiInsights) {
    return (
      <Card className="col-span-12 border shadow-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Analytics...</h2>
          <p className="text-muted-foreground">Analyzing your fitness data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-12 border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3">
          <div>
            <CardTitle className="text-lg">Fitness Analytics</CardTitle>
            <CardDescription className="text-sm mt-1">
              Insights from your fitness data
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={runAIAnalysis} disabled={isLoadingAI} variant="outline" size="sm" className="flex-1 sm:flex-none">
              {isLoadingAI ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Brain className="h-4 w-4 mr-2" />}
              <span className="hidden xs:inline">AI </span>Analysis
            </Button>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Goals</p>
                  <p className="text-2xl font-bold">{analyticsStats.totalWorkouts}</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fitness Score</p>
                  <p className="text-2xl font-bold">{aiInsights.fitnessScore}</p>
                </div>
                <Award className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Steps</p>
                  <p className="text-2xl font-bold">{analyticsStats.avgStepsPerDay.toLocaleString()}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progress Trend</p>
                  <div className="flex items-center gap-1">
                    {aiInsights.progressTrend === 'improving' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm capitalize">{aiInsights.progressTrend}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full h-auto gap-1 p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 py-2">Overview</TabsTrigger>
            <TabsTrigger value="ai-insights" className="text-xs sm:text-sm px-2 py-2">AI Insights</TabsTrigger>
            <TabsTrigger value="activity" className="text-xs sm:text-sm px-2 py-2">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="goalProgress" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-insights">
            <div className="space-y-4">
              {/* Enhanced Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{aiInsights.fitnessScore}</div>
                    <p className="text-xs text-muted-foreground">Fitness Score</p>
                    <div className="mt-2">
                      <Progress value={aiInsights.fitnessScore} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold capitalize mb-1">{aiInsights.dominantIntensity}</div>
                    <p className="text-xs text-muted-foreground">Activity Level</p>
                    <Badge variant={aiInsights.dominantIntensity === 'high' ? 'default' : 'secondary'} className="mt-2">
                      {aiInsights.progressTrend}
                    </Badge>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-bold mb-1">
                      {aiInsights.weeklyProgressChange && aiInsights.weeklyProgressChange > 0 ? '+' : ''}{aiInsights.weeklyProgressChange || 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">Weekly Change</p>
                    {aiInsights.progressTrend === 'improving' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mx-auto mt-2" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-orange-500 mx-auto mt-2" />
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Personalized Insights */}
              {aiInsights.personalizedInsights && aiInsights.personalizedInsights.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      Personalized Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {aiInsights.personalizedInsights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                          <p className="text-sm text-foreground">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Motivation & Improvement Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">💪 Motivation</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">{aiInsights.currentMotivation}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">🎯 Focus Areas</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {aiInsights.improvementAreas.map((area, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                          <span className="text-sm text-foreground">{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <WeeklyActivityChart weeklyData={actualWeeklyData} chartType="bar" />
          </TabsContent>
        </Tabs>

        {/* AI Analytics Chat Section */}
        <div className="mt-6">
          <AnalyticsChat 
            analyticsStats={analyticsStats} 
            progressData={progressData} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
