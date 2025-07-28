
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WorkoutAnalytics } from "@/components/client/analytics/WorkoutAnalytics";
import { StatisticsSection } from "../analytics/sections/StatisticsSection";
import { GoalsProgress } from "../analytics/sections/GoalsProgress";

export function AnalyticsTab() {
  const navigate = useNavigate();

  // Get progress data from localStorage or use mock data
  const getProgressData = () => {
    try {
      const stored = localStorage.getItem('fitness-progress-data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.log('No stored progress data found, using defaults');
    }
    
    // Default progress data
    return [
      { 
        goal: "Lose weight for summer", 
        current: 68, 
        target: 65, 
        unit: "kg", 
        progress: 75,
        goalType: "weight_management",
        targetDate: "2024-06-30",
        createdAt: "2024-03-01",
        lastUpdated: "2024-03-15"
      },
      { 
        goal: "Daily steps target", 
        current: 8500, 
        target: 10000, 
        unit: "steps", 
        progress: 85,
        goalType: "activity_level",
        targetDate: "2024-12-31",
        frequency: { value: 10000, period: "daily" },
        createdAt: "2024-03-01",
        lastUpdated: "2024-03-15"
      },
      { 
        goal: "Bench press strength", 
        current: 70, 
        target: 80, 
        unit: "kg", 
        progress: 87,
        goalType: "strength_progress",
        targetDate: "2024-05-31",
        exerciseName: "Bench Press",
        createdAt: "2024-03-01",
        lastUpdated: "2024-03-15"
      },
    ];
  };

  // Get body measurements from localStorage or use mock data
  const getBodyMeasurements = () => {
    try {
      const stored = localStorage.getItem('body-measurements-data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.log('No stored body measurements found, using defaults');
    }
    
    // Default body measurements data
    return [
      {
        id: "measurement-1",
        date: "2024-03-15",
        height: 175,
        gender: "male" as const,
        waist: 82,
        hips: 95,
        thighs: 55,
        shoulders: 110,
        arms: 32,
        neck: 38,
        source: "manual"
      },
      {
        id: "measurement-2", 
        date: "2024-03-01",
        height: 175,
        gender: "male" as const,
        waist: 85,
        hips: 97,
        thighs: 56,
        shoulders: 109,
        arms: 31,
        neck: 39,
        source: "manual"
      }
    ];
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
    <div className="space-y-6 animate-fade-in">
      {/* Header Section with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Track your fitness journey and performance insights
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleGoToIntegrations}
            className="hover-scale"
          >
            <Settings className="h-4 w-4 mr-2" />
            Connect Apps
          </Button>
        </div>
      </div>

      {/* Integration Notice */}
      <Alert className="border-info/20 bg-info/5 animate-scale-in">
        <InfoIcon className="h-4 w-4 text-info" />
        <AlertDescription className="text-sm">
          <strong>Pro tip:</strong> Connect your fitness apps for automatic data sync and richer insights.
        </AlertDescription>
      </Alert>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column - Main Analytics */}
        <div className="xl:col-span-8 space-y-6">
          {/* Progress Overview */}
          <Card className="shadow-sm animate-fade-in">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Goals Progress</CardTitle>
                  <CardDescription className="text-sm">
                    Your current progress toward fitness goals
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <GoalsProgress progressData={progressData} bodyMeasurements={bodyMeasurements} />
            </CardContent>
          </Card>

          {/* Workout Analytics */}
          <div className="animate-fade-in [animation-delay:100ms]">
            <WorkoutAnalytics progressData={progressData} />
          </div>
        </div>

        {/* Right Column - Statistics Sidebar */}
        <div className="xl:col-span-4">
          <div className="sticky top-6 animate-fade-in [animation-delay:200ms]">
            <StatisticsSection progressData={progressData} bodyMeasurements={bodyMeasurements} />
          </div>
        </div>
      </div>
    </div>
  );
}
