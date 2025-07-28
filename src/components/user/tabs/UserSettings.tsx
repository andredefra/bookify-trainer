import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  CreditCard, 
  Settings as SettingsIcon, 
  Zap, 
  Bell,
  Eye,
  EyeOff,
  Apple,
  Smartphone,
  Activity
} from "lucide-react";

interface User {
  name?: string;
  email: string;
  plan?: string;
  type: string;
}

interface UserSettingsProps {
  user: User;
}

export function UserSettings({ user }: UserSettingsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1">
          <TabsTrigger value="account" className="flex items-center justify-center gap-1 text-xs lg:text-sm p-2 lg:p-3">
            <User className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center justify-center gap-1 text-xs lg:text-sm p-2 lg:p-3">
            <CreditCard className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center justify-center gap-1 text-xs lg:text-sm p-2 lg:p-3">
            <SettingsIcon className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center justify-center gap-1 text-xs lg:text-sm p-2 lg:p-3">
            <Zap className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Apps</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center justify-center gap-1 text-xs lg:text-sm p-2 lg:p-3 col-span-2 lg:col-span-1">
            <Bell className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user.name?.split(' ')[0] || ''} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user.name?.split(' ')[1] || ''} />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="currentPassword" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Settings */}
        <TabsContent value="payments" className="space-y-4">
          {/* Early Access Status Banner */}
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 p-2 rounded-full text-lg">
                  🎉
                </div>
                <h3 className="text-lg font-bold">Early Access - First 100 Users!</h3>
              </div>
              <p className="text-white/90 mb-4">
                Congratulations! You have free access to all AI features until 2026. 
                You can decide when to cancel the AI subscription and add a personal trainer.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  ✨ Full AI Access
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  🆓 Free until 2026
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  👨‍💼 Personal trainer available
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Plan
                <Badge variant="default" className="bg-green-600">
                  Early Access - Free
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                You're among the first 100 users! You have complete access to all AI features at no cost until 2026. 
                From 2026 you can choose whether to continue with the AI subscription or switch to a personal trainer.
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Unlimited access to AI features
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Personalized workout programs
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Advanced analytics
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Personal trainer option available
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-3">
                  No payment method required until 2026
                </p>
                <p className="text-xs text-muted-foreground">
                  You can add a payment method when you decide to continue with the AI subscription or add a personal trainer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <div className="text-muted-foreground mb-2">
                  <CreditCard className="h-8 w-8 mx-auto mb-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No billing until 2026
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Billing history will appear here when you start paying for services.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Settings */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <p className="text-sm text-muted-foreground">Used for scheduling and reminders</p>
                </div>
                <Select defaultValue="cet">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cet">CET (Central European Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="units">Unit System</Label>
                  <p className="text-sm text-muted-foreground">Metric or Imperial measurements</p>
                </div>
                <Select defaultValue="metric">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric</SelectItem>
                    <SelectItem value="imperial">Imperial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workout Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="difficulty">Default Workout Difficulty</Label>
                  <p className="text-sm text-muted-foreground">Your preferred workout intensity</p>
                </div>
                <Select defaultValue="intermediate">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="workoutDuration">Preferred Workout Duration</Label>
                  <p className="text-sm text-muted-foreground">Default session length</p>
                </div>
                <Select defaultValue="45">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="90">90 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health & Fitness Apps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Apple className="h-8 w-8" />
                  <div>
                    <p className="font-medium">Apple Health</p>
                    <p className="text-sm text-muted-foreground">Sync workouts and health data</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium">Fitbit</p>
                    <p className="text-sm text-muted-foreground">Connect your Fitbit device</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-8 w-8" />
                  <div>
                    <p className="font-medium">MyFitnessPal</p>
                    <p className="text-sm text-muted-foreground">Nutrition tracking integration</p>
                  </div>
                </div>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Export your workout data, progress tracking, and analytics in various formats.
              </p>
              <div className="flex gap-2">
                <Button variant="outline">Export CSV</Button>
                <Button variant="outline">Export JSON</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="workoutReminders">Workout Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminded about scheduled workouts</p>
                </div>
                <Switch 
                  checked={workoutReminders} 
                  onCheckedChange={setWorkoutReminders}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="progressUpdates">Progress Updates</Label>
                  <p className="text-sm text-muted-foreground">Weekly progress summaries</p>
                </div>
                <Switch 
                  checked={progressUpdates} 
                  onCheckedChange={setProgressUpdates}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">Enable Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="space-y-3">
                <Label>Notification Schedule</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="morningTime" className="text-sm">Morning Reminders</Label>
                    <Input type="time" defaultValue="08:00" />
                  </div>
                  <div>
                    <Label htmlFor="eveningTime" className="text-sm">Evening Reminders</Label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Coach Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="aiTips">Daily Tips from Trainer.ai</Label>
                  <p className="text-sm text-muted-foreground">Receive personalized fitness tips</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="aiCheckins">Weekly Check-ins</Label>
                  <p className="text-sm text-muted-foreground">AI coach progress reviews</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}