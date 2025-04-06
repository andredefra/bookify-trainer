
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function IntegrationsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connect with other services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Google Calendar</h4>
                <p className="text-sm text-muted-foreground">Sync gym schedules with Google Calendar</p>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
