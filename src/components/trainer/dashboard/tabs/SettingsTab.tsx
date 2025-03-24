
import { CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SettingsTabProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
  } | null;
}

export function SettingsTab({ user }: SettingsTabProps) {
  if (!user) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your profile and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Trainer Profile</h3>
            <p className="text-sm text-muted-foreground">This information will be displayed on your public profile page.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Your Name</label>
                  <input type="text" defaultValue={user.name || "Demo Trainer"} className="w-full mt-1 px-3 py-2 border border-border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <textarea className="w-full mt-1 px-3 py-2 border border-border rounded-md h-24" placeholder="Tell clients about yourself and your training approach..." />
                </div>
                <div>
                  <label className="text-sm font-medium">Specializations</label>
                  <input type="text" className="w-full mt-1 px-3 py-2 border border-border rounded-md" placeholder="e.g. HIIT, Yoga, Strength Training" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Availability</h3>
            <p className="text-sm text-muted-foreground">Set your working hours and preferences for bookings.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="text-sm text-green-700 font-medium flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Google Calendar integration will be available in the full version
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">AI Assistant Settings</h3>
            <p className="text-sm text-muted-foreground">Configure how your AI assistant interacts with clients.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enable AI Assistant</span>
                  <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300">
                    <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">AI Response Style</label>
                  <select className="w-full mt-1 px-3 py-2 border border-border rounded-md">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Motivational</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-end pt-6">
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
