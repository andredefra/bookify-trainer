
import { FitnessAppIntegration } from "@/components/client/settings/fitness-integrations/FitnessAppIntegration";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Database, Shield } from "lucide-react";

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
            <Database className="h-5 w-5 text-primary" />
            Other Integrations
          </CardTitle>
          <CardDescription>
            Connect to other services that help with your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Database className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Nutrition Tracker</h4>
                <p className="text-sm text-muted-foreground">Sync your meal data</p>
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
            <h3 className="font-medium text-amber-700 mb-1">Privacy Information</h3>
            <p className="text-sm text-amber-600">
              Your data is only shared with the apps you choose to connect. You can disconnect any app at any time to stop sharing data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
