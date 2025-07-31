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
  Activity,
  Crown,
  Calendar,
  RefreshCw
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";

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
  
  const {
    subscribed,
    subscription_tier,
    subscription_start_date,
    subscription_end_date,
    early_adopter_number,
    isEarlyAdopter,
    loading,
    error,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  } = useSubscription();

  const handleUpgradeToPersonalAI = async () => {
    try {
      // This would be the Stripe price ID for the $4.99/month Personal AI subscription
      await createCheckout('price_1234567890abcdef'); // Replace with actual price ID
      toast.success("Redirecting to checkout...");
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Failed to start checkout process");
    }
  };

  const handleManageSubscription = async () => {
    try {
      await openCustomerPortal();
      toast.success("Opening subscription management...");
    } catch (error) {
      console.error('Portal error:', error);
      toast.error("Failed to open subscription management");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSubscriptionEndDate = () => {
    if (isEarlyAdopter && subscription_start_date) {
      const startDate = new Date(subscription_start_date);
      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);
      return endDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return formatDate(subscription_end_date);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="flex flex-wrap lg:grid lg:grid-cols-5 gap-1 p-1 h-auto">
          <TabsTrigger value="account" className="flex items-center justify-center gap-1.5 text-xs lg:text-sm px-3 py-2 min-w-0 flex-1 lg:flex-none">
            <User className="h-4 w-4 shrink-0" />
            <span className="truncate">Account</span>
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center justify-center gap-1.5 text-xs lg:text-sm px-3 py-2 min-w-0 flex-1 lg:flex-none">
            <Crown className="h-4 w-4 shrink-0" />
            <span className="truncate">Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center justify-center gap-1.5 text-xs lg:text-sm px-3 py-2 min-w-0 flex-1 lg:flex-none">
            <SettingsIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center justify-center gap-1.5 text-xs lg:text-sm px-3 py-2 min-w-0 flex-1 lg:flex-none">
            <Zap className="h-4 w-4 shrink-0" />
            <span className="truncate">Apps</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center justify-center gap-1.5 text-xs lg:text-sm px-3 py-2 min-w-0 flex-1 lg:flex-none">
            <Bell className="h-4 w-4 shrink-0" />
            <span className="truncate">Notifications</span>
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

        {/* Subscription Settings */}
        <TabsContent value="subscription" className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Loading subscription details...</span>
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                  <Button onClick={checkSubscription} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Early Adopter Status Banner */}
              {isEarlyAdopter && (
                <Card className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Crown className="h-6 w-6" />
                      <h3 className="text-lg font-bold">Early Adopter #{early_adopter_number}</h3>
                    </div>
                    <p className="text-white/90 mb-4">
                      Congratulations! You're among the first 100 users and have free access to Personal AI Trainer until{' '}
                      <strong>{getSubscriptionEndDate()}</strong> (1 year from registration).
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-white/20 text-white hover:bg-white/30">
                        ✨ Full AI Access
                      </Badge>
                      <Badge className="bg-white/20 text-white hover:bg-white/30">
                        🆓 Free for 1 Year
                      </Badge>
                      <Badge className="bg-white/20 text-white hover:bg-white/30">
                        👑 Early Adopter
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Current Subscription Status */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Current Subscription</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={subscribed ? "default" : "secondary"}
                      className={subscribed ? "bg-green-600" : ""}
                    >
                      {isEarlyAdopter 
                        ? `Early Adopter #${early_adopter_number}` 
                        : subscription_tier || (subscribed ? "Active" : "Inactive")
                      }
                    </Badge>
                    <Button onClick={checkSubscription} size="sm" variant="ghost">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Status</Label>
                      <p className="text-sm text-muted-foreground">
                        {subscribed ? "Active subscription" : "No active subscription"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Plan</Label>
                      <p className="text-sm text-muted-foreground">
                        {isEarlyAdopter 
                          ? "Early Adopter (Free)" 
                          : subscription_tier || "None"
                        }
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Started</Label>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(subscription_start_date)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {isEarlyAdopter ? "Billing starts" : "Next billing"}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {getSubscriptionEndDate()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Included Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        Personal AI Trainer
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        Unlimited workout programs
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        Progress tracking & analytics
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">✓</span>
                        Nutrition planning
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEarlyAdopter ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <h4 className="font-medium mb-2">Future Billing Information</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Your early adopter period will end on <strong>{getSubscriptionEndDate()}</strong>. 
                          After this date, you can choose to:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                          <li>• Continue with Personal AI Trainer for $4.99/month</li>
                          <li>• Switch to a human trainer</li>
                          <li>• Use the free basic features</li>
                        </ul>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        No action needed now. We'll notify you before your early adopter period ends.
                      </p>
                    </div>
                  ) : subscribed ? (
                    <div className="space-y-3">
                      <Button onClick={handleManageSubscription} className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Manage Subscription
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Cancel, update payment method, or change plans
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <h4 className="font-medium mb-2">Upgrade to Personal AI Trainer</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Get unlimited access to our Personal AI Trainer for just $4.99/month.
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-4 mb-3">
                          <li>• Personalized workout programs</li>
                          <li>• Real-time form corrections</li>
                          <li>• Advanced progress analytics</li>
                          <li>• Nutrition guidance</li>
                        </ul>
                      </div>
                      <Button onClick={handleUpgradeToPersonalAI} className="w-full">
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade to Personal AI - $4.99/month
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Billing History */}
              {subscribed && !isEarlyAdopter && (
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-6">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No billing history available yet
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Your billing history will appear here after your first payment
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
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