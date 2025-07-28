
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
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your progress and visualize your fitness journey
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleGoToIntegrations}
          className="self-start lg:self-center"
        >
          <Settings className="h-4 w-4 mr-2" />
          Connect Apps
        </Button>
      </div>

      {/* Integration Alert */}
      <Alert className="border-info/20 bg-info/5">
        <InfoIcon className="h-4 w-4 text-info" />
        <AlertDescription className="text-sm">
          Connect your fitness apps to automatically sync data and get richer insights.
        </AlertDescription>
      </Alert>

      {/* Progress Overview - Full Width Card */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Progress Overview</CardTitle>
          <CardDescription>
            Current status of your fitness goals and measurements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoalsProgress progressData={progressData} bodyMeasurements={bodyMeasurements} />
        </CardContent>
      </Card>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Workout Analytics - Takes 2 columns on large screens */}
        <div className="xl:col-span-2">
          <WorkoutAnalytics progressData={progressData} />
        </div>
        
        {/* Statistics Section - Takes 1 column */}
        <div className="xl:col-span-1">
          <StatisticsSection progressData={progressData} bodyMeasurements={bodyMeasurements} />
        </div>
      </div>
    </div>
  );
}
