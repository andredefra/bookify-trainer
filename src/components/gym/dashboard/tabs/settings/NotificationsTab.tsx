
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function NotificationsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Member Alerts</h4>
                <p className="text-sm text-muted-foreground">Get notified when a new member joins</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Trainer Reports</h4>
                <p className="text-sm text-muted-foreground">Weekly performance reports from trainers</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">System Notifications</h4>
                <p className="text-sm text-muted-foreground">Updates about the platform</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          
          <Button>Save Notification Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
