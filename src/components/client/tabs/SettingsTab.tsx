
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SettingsTabProps {
  user: {name?: string, email: string, type: string, plan?: string};
  goals: string[];
}

export function SettingsTab({ user, goals }: SettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your profile and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Profile Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Your Name</label>
                  <input 
                    type="text" 
                    defaultValue={user.name || "Demo Client"} 
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    defaultValue={user.email} 
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md" 
                    disabled 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Fitness Goals</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Current Goals</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {goals.map((goal) => (
                      <Badge key={goal} variant="secondary">
                        {goal}
                        <button className="ml-1 text-muted-foreground hover:text-foreground">×</button>
                      </Badge>
                    ))}
                    <Badge variant="outline" className="cursor-pointer">
                      + Add Goal
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Session Reminders</span>
                  <div className="relative inline-block w-10 h-5 rounded-full bg-primary">
                    <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Trainer Messages</span>
                  <div className="relative inline-block w-10 h-5 rounded-full bg-primary">
                    <div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress Updates</span>
                  <div className="relative inline-block w-10 h-5 rounded-full bg-gray-300">
                    <div className="absolute left-1 top-1 w-3 h-3 rounded-full bg-white"></div>
                  </div>
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
