
import { FitnessAppIntegration } from "@/components/client/settings/fitness-integrations/FitnessAppIntegration";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Scale, Smartphone, Watch, Shield } from "lucide-react";

interface IntegrationsSectionProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    plan?: string; 
  };
}

export function IntegrationsSection({ user }: IntegrationsSectionProps) {
  return (
    <div className="space-y-6">
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Fitness App Integrations
          </CardTitle>
          <CardDescription>
            Connect with your favorite fitness apps to sync your health and activity data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FitnessAppIntegration user={user} />
        </CardContent>
      </Card>
      
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Smart Scale & Body Composition
          </CardTitle>
          <CardDescription>
            Connect smart scales and fitness devices for automatic body composition tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Smartphone className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium">Zepp Life (Xiaomi)</h4>
                <p className="text-sm text-muted-foreground">Mi Smart Scale, body composition, fitness data</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>

          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Scale className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Fitbit Aria</h4>
                <p className="text-sm text-muted-foreground">Smart scale with BMI and body fat percentage</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>

          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Watch className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-medium">Garmin Connect</h4>
                <p className="text-sm text-muted-foreground">Body composition scales and fitness metrics</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>

          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-100 p-2 rounded-full">
                <Smartphone className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h4 className="font-medium">Samsung Health</h4>
                <p className="text-sm text-muted-foreground">Galaxy Watch, smart scales, and body composition</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mt-4">
        <div className="flex gap-3">
          <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-700 mb-1">Privacy & Data Accuracy</h3>
            <p className="text-sm text-amber-600">
              Smart scale and body composition data provides more accurate insights when combined with manual measurements. 
              Your data is only shared with the apps you choose to connect, and our algorithms use multiple data points 
              to provide the most realistic body composition analysis based on your age, height, and fitness profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
