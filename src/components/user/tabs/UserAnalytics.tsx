import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, Settings } from "lucide-react";
import { WorkoutAnalytics } from "@/components/client/analytics/WorkoutAnalytics";
import { StatisticsSection } from "@/components/client/analytics/sections/StatisticsSection";
import { GoalsProgress } from "@/components/client/analytics/sections/GoalsProgress";
import { getMockBodyMeasurements, readBodyMeasurements } from "@/components/client/overview/fitness-progress/measurementStorage";

export function UserAnalytics() {
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
    const measurements = readBodyMeasurements();
    return measurements.length > 0 ? measurements : getMockBodyMeasurements();
  };

  const progressData = getProgressData();
  const bodyMeasurements = getBodyMeasurements();

  const handleGoToIntegrations = () => {
    navigate('/user-dashboard', { 
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
          <WorkoutAnalytics progressData={progressData} />
        </div>
      </div>
    </div>
  );
}