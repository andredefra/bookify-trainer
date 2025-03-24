
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FitnessAppIntegration } from "@/components/client/settings/FitnessAppIntegration";

interface SettingsTabProps {
  user: { email: string; type: string; name?: string; plan?: string; };
  goals: string[];
}

export function SettingsTab({ user, goals }: SettingsTabProps) {
  const [activeTab, setActiveTab] = useState("account");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(goals);

  const handleGoalToggle = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              
              <div className="pt-2">
                <Button>Save Changes</Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Account Plan</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.plan || "Free Plan"}</p>
                  <p className="text-sm text-muted-foreground">Basic features</p>
                </div>
                <Button variant="outline">Upgrade</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">Fitness Goals</h3>
              <div className="space-y-2">
                {["Weight loss", "Muscle tone", "Flexibility", "Cardiovascular health", "Strength building", "Athletic performance"].map((goal) => (
                  <div key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`goal-${goal}`}
                      checked={selectedGoals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`goal-${goal}`} className="ml-2 text-sm cursor-pointer">
                      {goal}
                    </label>
                  </div>
                ))}
              </div>
              <Button className="mt-4">Save Goals</Button>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Language & Region</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select id="language" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="units">Measurement Units</Label>
                  <select id="units" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Metric (kg, cm)</option>
                    <option>Imperial (lb, in)</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <FitnessAppIntegration user={user} />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive emails about your account</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Session Reminders</h3>
                  <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Workout Notifications</h3>
                  <p className="text-sm text-muted-foreground">Daily workout reminders</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing</h3>
                  <p className="text-sm text-muted-foreground">Receive promotions and news</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
