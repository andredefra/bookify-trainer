
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WorkoutAnalytics } from "@/components/client/analytics/WorkoutAnalytics";
import { StatisticsSection } from "../analytics/sections/StatisticsSection";

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
    <div className="space-y-6 w-full">
      <Card className="w-full shadow-sm bg-white/80 backdrop-blur-sm border-slate-200">
        <CardHeader className="py-4 px-5">
          <CardTitle className="text-xl font-bold text-slate-800">Fitness Analytics Dashboard</CardTitle>
          <CardDescription className="text-slate-600">
            Track your progress and visualize your fitness journey with real-time data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <Alert className="bg-blue-50 border-blue-100 shadow-sm mb-6">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-sm text-blue-700">
              <div className="space-y-2">
                <p>Your analytics are based on your manually logged workouts, fitness goals and body measurements.</p>
                <p>
                  <span className="font-medium">Want to automate data collection?</span> Connect your fitness and health apps to automatically sync your data without manual entry.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleGoToIntegrations}
                  className="mt-2 bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Go to Integrations
                </Button>
              </div>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-8">
            <WorkoutAnalytics progressData={progressData} />
            
            <StatisticsSection progressData={progressData} bodyMeasurements={bodyMeasurements} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
