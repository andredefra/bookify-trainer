
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
    // In a real app, this would trigger OAuth flow
    if (!googleFitConnected) {
      setTimeout(() => {
        setGoogleFitConnected(true);
        // Save to localStorage
        localStorage.setItem('googleFitConnected', 'true');
        
        // Simulate updating fitness goals
        updateGoalsFromFitnessApp('Google Fit');
        
        toast({
          title: "Google Fit connected",
          description: "Your Google Fit account has been successfully connected"
        });
      }, 1000);
    } else {
      setGoogleFitConnected(false);
      // Remove from localStorage
      localStorage.setItem('googleFitConnected', 'false');
      
      toast({
        title: "Google Fit disconnected",
        description: "Your Google Fit account has been disconnected"
      });
    }
  };

  const handleAppleHealthConnect = () => {
    // In a real app, this would trigger Apple Health permission flow
    if (!appleHealthConnected) {
      setTimeout(() => {
        setAppleHealthConnected(true);
        // Save to localStorage
        localStorage.setItem('appleHealthConnected', 'true');
        
        // Simulate updating fitness goals
        updateGoalsFromFitnessApp('Apple Health');
        
        toast({
          title: "Apple Health connected",
          description: "Your Apple Health account has been successfully connected"
        });
      }, 1000);
    } else {
      setAppleHealthConnected(false);
      // Remove from localStorage
      localStorage.setItem('appleHealthConnected', 'false');
      
      toast({
        title: "Apple Health disconnected",
        description: "Your Apple Health account has been disconnected"
      });
    }
  };

  // Simulate updating fitness goals from connected app
  const updateGoalsFromFitnessApp = (appName: string) => {
    // Load existing goals from localStorage
    const goalsString = localStorage.getItem('fitnessGoals');
    if (!goalsString) return;
    
    try {
      const goals = JSON.parse(goalsString);
      let updated = false;
      
      // Update steps goal if exists
      const stepsGoal = goals.find((g: any) => g.unit === 'steps');
      if (stepsGoal) {
        // Simulate getting data from fitness app (random steps between 1000-10000)
        const simSteps = Math.floor(Math.random() * 9000) + 1000;
        stepsGoal.current = simSteps;
        stepsGoal.progress = Math.min(100, Math.round((simSteps / stepsGoal.target) * 100));
        stepsGoal.lastUpdated = new Date().toISOString();
        updated = true;
      }
      
      // Could do the same for other metrics like workouts, calories, etc.
      
      if (updated) {
        localStorage.setItem('fitnessGoals', JSON.stringify(goals));
        toast({
          title: "Goals Updated",
          description: `Your fitness goals have been updated with ${appName} data`
        });
      }
    } catch (err) {
      console.error("Error updating goals:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">Google Fit</h3>
          <p className="text-sm text-muted-foreground">
            Connect to your Google Fit account
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
            Connect to your Apple Health account
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
