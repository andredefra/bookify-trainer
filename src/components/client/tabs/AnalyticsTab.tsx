
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WorkoutAnalytics } from "@/components/client/analytics/WorkoutAnalytics";
import { StatisticsSection } from "../analytics/sections/StatisticsSection";
import { GoalsProgress } from "../analytics/sections/GoalsProgress";
import { getMockBodyMeasurements, readBodyMeasurements } from "@/components/client/overview/fitness-progress/measurementStorage";

export function AnalyticsTab({ hideAI = false }: { hideAI?: boolean } = {}) {
  const navigate = useNavigate();

  // Default progress data, aligned with the current Overview seed
  const getDefaultProgressData = () => ([
    {
      goal: "Lose Weight",
      current: 82,
      target: 76,
      unit: "kg",
      progress: 60,
      goalType: "weight_management",
      targetDate: "2026-12-31",
      createdAt: "2026-03-01",
      lastUpdated: "2026-07-01",
      source: "personal",
    },
    {
      goal: "Monthly Step Target",
      current: 210000,
      target: 300000,
      unit: "steps",
      progress: 70,
      goalType: "activity_level",
      targetDate: "2026-07-31",
      createdAt: "2026-07-01",
      lastUpdated: "2026-07-08",
      source: "personal",
    },
    {
      goal: "Bench Press 1RM",
      current: 90,
      target: 100,
      unit: "kg",
      progress: 90,
      goalType: "strength_progress",
      targetDate: "2026-12-31",
      exerciseName: "Bench Press",
      createdAt: "2026-03-01",
      lastUpdated: "2026-07-01",
      source: "trainer",
      trainerName: "Sarah Johnson",
    },
    {
      goal: "Run 5K",
      current: 28,
      target: 25,
      unit: "min",
      progress: 80,
      goalType: "cardiovascular_endurance",
      targetDate: "2026-10-31",
      createdAt: "2026-03-01",
      lastUpdated: "2026-07-01",
      source: "personal",
    },
  ]);

  // Get progress data from localStorage or use mock data
  const getProgressData = () => {
    const defaults = getDefaultProgressData();
    try {
      const stored = localStorage.getItem('fitness-progress-data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure the two key cards are always present
          const merged = [...parsed];
          for (const requiredType of ['weight_management', 'activity_level']) {
            if (!merged.some((g: any) => g?.goalType === requiredType)) {
              const missing = defaults.find(g => g.goalType === requiredType);
              if (missing) merged.push(missing);
            }
          }
          return merged;
        }
      }
    } catch (error) {
      console.log('No stored progress data found, using defaults');
    }
    return defaults;
  };

  // Get body measurements from localStorage or use mock data
  const getBodyMeasurements = () => {
    const measurements = readBodyMeasurements();
    return measurements.length > 0 ? measurements : getMockBodyMeasurements();
  };

  const progressData = getProgressData();
  const bodyMeasurements = getBodyMeasurements();

  const handleGoToIntegrations = () => {
    navigate('/client-dashboard', { 
      state: { 
        activeTab: 'settings', 
        settingsSection: 'integrations' 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Analytics</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Track your fitness progress</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleGoToIntegrations}
            className="shrink-0"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Apps</span>
          </Button>
        </div>
      </div>

      {/* Mobile-optimized Content */}
      <div className="p-4 space-y-6">
        {/* Connection Alert - Mobile friendly */}
        <Alert className="border-info/20 bg-info/5">
          <InfoIcon className="h-4 w-4 text-info shrink-0" />
          <AlertDescription className="text-sm">
            Connect fitness apps for automatic sync
          </AlertDescription>
        </Alert>

        {/* Statistics Cards - Mobile Stack */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Quick Stats</h2>
          <StatisticsSection progressData={progressData} bodyMeasurements={bodyMeasurements} />
        </div>

        {/* Goals Progress - Mobile optimized */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Goals Progress</h2>
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <GoalsProgress progressData={progressData} bodyMeasurements={bodyMeasurements} />
            </CardContent>
          </Card>
        </div>

        {/* Workout Analytics - Mobile optimized */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Workout Insights</h2>
          <WorkoutAnalytics progressData={progressData} hideAI={hideAI} />
        </div>
      </div>
    </div>
  );
}
