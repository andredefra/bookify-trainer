import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FitnessAppListProps {
  googleFitConnected: boolean;
  appleHealthConnected: boolean;
  setGoogleFitConnected: (connected: boolean) => void;
  setAppleHealthConnected: (connected: boolean) => void;
}

export function FitnessAppList({
  googleFitConnected,
  appleHealthConnected,
  setGoogleFitConnected,
  setAppleHealthConnected
}: FitnessAppListProps) {
  const { toast } = useToast();

  const handleGoogleFitConnect = () => {
    if (!googleFitConnected) {
      setTimeout(() => {
        setGoogleFitConnected(true);
        localStorage.setItem('googleFitConnected', 'true');
        
        updateGoalsFromFitnessApp('Google Fit');
        updateBodyCompositionData('Google Fit');
        
        toast({
          title: "Google Fit connected",
          description: "Your Google Fit account has been successfully connected"
        });
      }, 1000);
    } else {
      setGoogleFitConnected(false);
      localStorage.setItem('googleFitConnected', 'false');
      
      toast({
        title: "Google Fit disconnected",
        description: "Your Google Fit account has been disconnected"
      });
    }
  };

  const handleAppleHealthConnect = () => {
    if (!appleHealthConnected) {
      setTimeout(() => {
        setAppleHealthConnected(true);
        localStorage.setItem('appleHealthConnected', 'true');
        
        updateGoalsFromFitnessApp('Apple Health');
        updateBodyCompositionData('Apple Health');
        
        toast({
          title: "Apple Health connected",
          description: "Your Apple Health account has been successfully connected"
        });
      }, 1000);
    } else {
      setAppleHealthConnected(false);
      localStorage.setItem('appleHealthConnected', 'false');
      
      toast({
        title: "Apple Health disconnected",
        description: "Your Apple Health account has been disconnected"
      });
    }
  };

  // Simulate updating fitness goals from connected app
  const updateGoalsFromFitnessApp = (appName: string) => {
    const goalsString = localStorage.getItem('fitnessGoals');
    if (!goalsString) return;
    
    try {
      const goals = JSON.parse(goalsString);
      let updated = false;
      
      // Update steps goal if exists
      const stepsGoal = goals.find((g: any) => g.unit === 'steps');
      if (stepsGoal) {
        const simSteps = Math.floor(Math.random() * 9000) + 1000;
        stepsGoal.current = simSteps;
        stepsGoal.progress = Math.min(100, Math.round((simSteps / stepsGoal.target) * 100));
        stepsGoal.lastUpdated = new Date().toISOString();
        updated = true;
      }
      
      if (updated) {
        localStorage.setItem('fitnessGoals', JSON.stringify(goals));
      }
    } catch (err) {
      console.error("Error updating goals:", err);
    }
  };

  // Simulate updating body composition data from smart scales/fitness apps
  const updateBodyCompositionData = (appName: string) => {
    try {
      // Get existing body measurements or create new
      const existingMeasurements = localStorage.getItem('body-measurements-data');
      let measurements = existingMeasurements ? JSON.parse(existingMeasurements) : [];
      
      // Add new measurement with realistic body composition data
      const newMeasurement = {
        id: `smart-scale-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        weight: Math.round((65 + Math.random() * 10) * 10) / 10, // 65-75kg range
        bodyFat: Math.round((15 + Math.random() * 8) * 10) / 10, // 15-23% range
        muscleMass: Math.round((30 + Math.random() * 10) * 10) / 10, // 30-40kg range
        bmi: Math.round((20 + Math.random() * 5) * 10) / 10, // 20-25 BMI range
        waist: Math.round(82 + Math.random() * 6), // 82-88cm
        hips: Math.round(95 + Math.random() * 4), // 95-99cm
        source: appName.toLowerCase().replace(' ', '_'),
        deviceType: 'smart_scale'
      };
      
      measurements.unshift(newMeasurement);
      
      // Keep only last 10 measurements
      if (measurements.length > 10) {
        measurements = measurements.slice(0, 10);
      }
      
      localStorage.setItem('body-measurements-data', JSON.stringify(measurements));
      
      // Also update fitness-progress-data for weight goals
      const progressString = localStorage.getItem('fitness-progress-data');
      if (progressString) {
        const progressData = JSON.parse(progressString);
        const weightGoal = progressData.find((g: any) => g.unit === 'kg' && g.goalType === 'weight_management');
        
        if (weightGoal) {
          weightGoal.current = newMeasurement.weight;
          weightGoal.progress = Math.min(100, Math.round(((weightGoal.target - newMeasurement.weight) / (weightGoal.target - 70)) * 100));
          weightGoal.lastUpdated = new Date().toISOString();
          localStorage.setItem('fitness-progress-data', JSON.stringify(progressData));
        }
      }
      
      toast({
        title: "Body composition updated",
        description: `New smart scale data synced from ${appName} - Weight: ${newMeasurement.weight}kg, Body Fat: ${newMeasurement.bodyFat}%`
      });
      
    } catch (err) {
      console.error("Error updating body composition:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Google Fit</h3>
          <p className="text-sm text-muted-foreground">
            Connect to sync steps, workouts, and smart scale data
          </p>
        </div>
        <Button 
          variant={googleFitConnected ? "destructive" : "default"} 
          onClick={handleGoogleFitConnect}
        >
          {googleFitConnected ? "Disconnect" : "Connect"}
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Apple Health</h3>
          <p className="text-sm text-muted-foreground">
            Connect to sync comprehensive health and body composition data
          </p>
        </div>
        <Button 
          variant={appleHealthConnected ? "destructive" : "default"} 
          onClick={handleAppleHealthConnect}
        >
          {appleHealthConnected ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </div>
  );
}
