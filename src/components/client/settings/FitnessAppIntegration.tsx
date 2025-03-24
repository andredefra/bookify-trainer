
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface FitnessAppIntegrationProps {
  user: { email: string; type: string; name?: string; plan?: string; };
}

export function FitnessAppIntegration({ user }: FitnessAppIntegrationProps) {
  const { toast } = useToast();
  const [googleFitConnected, setGoogleFitConnected] = useState(false);
  const [appleHealthConnected, setAppleHealthConnected] = useState(false);
  const [dataSync, setDataSync] = useState({
    steps: true,
    heartRate: true,
    sleep: true,
    workouts: true
  });

  const handleGoogleFitConnect = () => {
    // In a real app, this would trigger OAuth flow
    if (!googleFitConnected) {
      setTimeout(() => {
        setGoogleFitConnected(true);
        toast({
          title: "Google Fit connected",
          description: "Your Google Fit account has been successfully connected"
        });
      }, 1000);
    } else {
      setGoogleFitConnected(false);
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
        toast({
          title: "Apple Health connected",
          description: "Your Apple Health account has been successfully connected"
        });
      }, 1000);
    } else {
      setAppleHealthConnected(false);
      toast({
        title: "Apple Health disconnected",
        description: "Your Apple Health account has been disconnected"
      });
    }
  };

  const toggleDataSync = (metric: keyof typeof dataSync) => {
    setDataSync({
      ...dataSync,
      [metric]: !dataSync[metric]
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fitness App Integration</CardTitle>
        <CardDescription>
          Connect your fitness apps to sync your health and activity data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

        {(googleFitConnected || appleHealthConnected) && (
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-3">Data Sync Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="steps-sync" className="cursor-pointer">
                  <div>Steps</div>
                  <div className="text-sm text-muted-foreground">
                    Import daily step count
                  </div>
                </Label>
                <Switch 
                  id="steps-sync" 
                  checked={dataSync.steps} 
                  onCheckedChange={() => toggleDataSync("steps")} 
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="heart-rate-sync" className="cursor-pointer">
                  <div>Heart Rate</div>
                  <div className="text-sm text-muted-foreground">
                    Import heart rate data
                  </div>
                </Label>
                <Switch 
                  id="heart-rate-sync" 
                  checked={dataSync.heartRate} 
                  onCheckedChange={() => toggleDataSync("heartRate")} 
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sleep-sync" className="cursor-pointer">
                  <div>Sleep</div>
                  <div className="text-sm text-muted-foreground">
                    Import sleep tracking data
                  </div>
                </Label>
                <Switch 
                  id="sleep-sync" 
                  checked={dataSync.sleep} 
                  onCheckedChange={() => toggleDataSync("sleep")} 
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="workouts-sync" className="cursor-pointer">
                  <div>Workouts</div>
                  <div className="text-sm text-muted-foreground">
                    Import workouts automatically
                  </div>
                </Label>
                <Switch 
                  id="workouts-sync" 
                  checked={dataSync.workouts} 
                  onCheckedChange={() => toggleDataSync("workouts")} 
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
