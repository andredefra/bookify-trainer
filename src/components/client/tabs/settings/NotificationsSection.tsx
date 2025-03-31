
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="mr-2">
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-muted-foreground">Receive emails about your account</p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="mr-2">
            <h3 className="font-medium">Session Reminders</h3>
            <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
          </div>
          <Switch id="session-reminders" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="mr-2">
            <h3 className="font-medium">Workout Notifications</h3>
            <p className="text-sm text-muted-foreground">Daily workout reminders</p>
          </div>
          <Switch id="workout-notifications" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="mr-2">
            <h3 className="font-medium">Marketing</h3>
            <p className="text-sm text-muted-foreground">Receive promotions and news</p>
          </div>
          <Switch id="marketing-notifications" />
        </div>
      </div>
    </div>
  );
}
