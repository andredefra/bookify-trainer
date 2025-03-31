
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function NotificationsSection() {
  const [notifications, setNotifications] = useState({
    email: true,
    session: true,
    workout: true,
    marketing: false
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Choose which notifications you'd like to receive
        </p>
      </div>
      
      <Card className="border shadow-sm">
        <div className="p-4 space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start justify-between space-y-0">
              <div className="space-y-0.5">
                <Label className="text-base" htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive emails about your account</p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={notifications.email}
                onCheckedChange={() => handleToggle('email')}
              />
            </div>
            
            <div className="flex items-start justify-between space-y-0">
              <div className="space-y-0.5">
                <Label className="text-base" htmlFor="session-reminders">Session Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
              </div>
              <Switch 
                id="session-reminders" 
                checked={notifications.session}
                onCheckedChange={() => handleToggle('session')}
              />
            </div>
            
            <div className="flex items-start justify-between space-y-0">
              <div className="space-y-0.5">
                <Label className="text-base" htmlFor="workout-notifications">Workout Notifications</Label>
                <p className="text-sm text-muted-foreground">Daily workout reminders</p>
              </div>
              <Switch 
                id="workout-notifications" 
                checked={notifications.workout}
                onCheckedChange={() => handleToggle('workout')}
              />
            </div>
            
            <div className="flex items-start justify-between space-y-0">
              <div className="space-y-0.5">
                <Label className="text-base" htmlFor="marketing-notifications">Marketing</Label>
                <p className="text-sm text-muted-foreground">Receive promotions and news</p>
              </div>
              <Switch 
                id="marketing-notifications" 
                checked={notifications.marketing}
                onCheckedChange={() => handleToggle('marketing')}
              />
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-start">
        <Button onClick={handleSaveNotifications}>Save Preferences</Button>
      </div>
    </div>
  );
}
