
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bell, Mail, Calendar, MessageSquare, Tag } from "lucide-react";

export function NotificationsSection() {
  const [notifications, setNotifications] = useState({
    email: true,
    session: true,
    workout: true,
    marketing: false,
    messages: true
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
      <Card className="border shadow-sm overflow-hidden">
        <div className="divide-y">
          <div className="p-5 flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium" htmlFor="email-notifications">Email Notifications</Label>
                <Switch 
                  id="email-notifications" 
                  checked={notifications.email}
                  onCheckedChange={() => handleToggle('email')}
                />
              </div>
              <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
            </div>
          </div>
          
          <div className="p-5 flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium" htmlFor="session-reminders">Calendar Reminders</Label>
                <Switch 
                  id="session-reminders" 
                  checked={notifications.session}
                  onCheckedChange={() => handleToggle('session')}
                />
              </div>
              <p className="text-sm text-muted-foreground">Get reminded about upcoming events in your calendar</p>
            </div>
          </div>
          
          <div className="p-5 flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium" htmlFor="workout-notifications">Workout Reminders</Label>
                <Switch 
                  id="workout-notifications" 
                  checked={notifications.workout}
                  onCheckedChange={() => handleToggle('workout')}
                />
              </div>
              <p className="text-sm text-muted-foreground">Daily reminders to complete your workout plan</p>
            </div>
          </div>
          
          <div className="p-5 flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium" htmlFor="message-notifications">Message Alerts</Label>
                <Switch 
                  id="message-notifications" 
                  checked={notifications.messages}
                  onCheckedChange={() => handleToggle('messages')}
                />
              </div>
              <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
            </div>
          </div>
          
          <div className="p-5 flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium" htmlFor="marketing-notifications">Marketing</Label>
                <Switch 
                  id="marketing-notifications" 
                  checked={notifications.marketing}
                  onCheckedChange={() => handleToggle('marketing')}
                />
              </div>
              <p className="text-sm text-muted-foreground">Receive promotions, news and updates</p>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveNotifications} className="px-6">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
