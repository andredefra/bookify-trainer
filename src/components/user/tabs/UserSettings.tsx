import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  RefreshCw,
  Upload,
  Camera,
  MapPin,
  Heart,
  AlertTriangle
} from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { HealthDocumentsUpload } from "@/components/common/HealthDocumentsUpload";
import { useUserProfile, UserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";

interface User {
  name?: string;
  email: string;
  plan?: string;
  type: string;
}

interface UserSettingsProps {
  user: User;
  activeSection?: string;
}

export function UserSettings({ user, activeSection }: UserSettingsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const {
    profile,
    loading: profileLoading,
    saving: profileSaving,
    saveProfile,
    uploadProfileImage,
    calculateAge,
  } = useUserProfile();

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

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

  const handleSaveProfile = async () => {
    const success = await saveProfile(formData);
    if (success) {
      // Profile saved successfully
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadProfileImage(file);
    if (imageUrl) {
      setFormData(prev => ({ ...prev, profile_image_url: imageUrl }));
      await saveProfile({ ...formData, profile_image_url: imageUrl });
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

      <Tabs defaultValue={activeSection || "account"} className="space-y-6">
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
          {profileLoading ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Loading profile...</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Profile Picture & Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Profile Picture & Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={formData.profile_image_url} alt="Profile" />
                        <AvatarFallback className="text-lg">
                          {formData.first_name?.[0]}{formData.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="flex-1 space-y-3 text-center sm:text-left">
                      <h3 className="text-lg font-medium">
                        {formData.first_name} {formData.last_name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.date_of_birth && `${calculateAge(formData.date_of_birth)} years old`}
                        {formData.city && ` • ${formData.city}`}
                      </p>
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Change Picture
                      </Button>
                    </div>
                  </div>

                  {/* Basic Information Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.first_name || ''} 
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.last_name || ''} 
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input 
                        id="dateOfBirth" 
                        type="date" 
                        value={formData.date_of_birth || ''} 
                        onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                      />
                      {formData.date_of_birth && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Age: {calculateAge(formData.date_of_birth)} years
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city" className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        City
                      </Label>
                      <Input 
                        id="city" 
                        value={formData.city || ''} 
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={profileSaving}>
                      {profileSaving ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Health & Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Health & Medical Information
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    This information helps our Personal AI Trainer create safer, more effective workouts and nutrition plans for you.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="allergies">Food Allergies & Intolerances</Label>
                    <Textarea 
                      id="allergies" 
                      value={formData.allergies || ''} 
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      placeholder="List any food allergies, intolerances, or dietary restrictions (e.g., nuts, dairy, gluten)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="healthConditions">Health Conditions</Label>
                    <Textarea 
                      id="healthConditions" 
                      value={formData.health_conditions || ''} 
                      onChange={(e) => handleInputChange('health_conditions', e.target.value)}
                      placeholder="List any medical conditions, medications, or health concerns (e.g., diabetes, high blood pressure)"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="physicalLimitations" className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Physical Limitations & Injuries
                    </Label>
                    <Textarea 
                      id="physicalLimitations" 
                      value={formData.physical_limitations || ''} 
                      onChange={(e) => handleInputChange('physical_limitations', e.target.value)}
                      placeholder="Describe any injuries, physical limitations, or areas to avoid (e.g., bad knee, recent surgery, back problems)"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={profileSaving}>
                      {profileSaving ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Health Information'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Someone we can contact in case of emergency during training sessions.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContactName">Contact Name</Label>
                      <Input 
                        id="emergencyContactName" 
                        value={formData.emergency_contact_name || ''} 
                        onChange={(e) => handleInputChange('emergency_contact_name', e.target.value)}
                        placeholder="Full name of emergency contact"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                      <Input 
                        id="emergencyContactPhone" 
                        type="tel" 
                        value={formData.emergency_contact_phone || ''} 
                        onChange={(e) => handleInputChange('emergency_contact_phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={profileSaving}>
                      {profileSaving ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Emergency Contact'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Fitness Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Fitness Preferences</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Help us personalize your training experience.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experienceLevel">Experience Level</Label>
                      <Select 
                        value={formData.experience_level || 'beginner'} 
                        onValueChange={(value) => handleInputChange('experience_level', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="preferredWorkoutTime">Preferred Workout Time</Label>
                      <Select 
                        value={formData.preferred_workout_time || ''} 
                        onValueChange={(value) => handleInputChange('preferred_workout_time', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="early_morning">Early Morning (5-7 AM)</SelectItem>
                          <SelectItem value="morning">Morning (7-10 AM)</SelectItem>
                          <SelectItem value="midday">Midday (10 AM-2 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (2-6 PM)</SelectItem>
                          <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                          <SelectItem value="night">Night (9 PM+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={profileSaving}>
                      {profileSaving ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Preferences'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Account Security */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user.email} disabled />
                    <p className="text-xs text-muted-foreground mt-1">
                      Contact support to change your email address
                    </p>
                  </div>
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
            </>
          )}
        </TabsContent>

        {/* Subscription Settings */}
        <TabsContent value="subscription" className="space-y-4">
          {/* Early Adopter Status Banner - Dark Theme */}
          <Card className="bg-gradient-to-r from-gray-900 to-black text-white border-0">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Crown className="h-6 w-6 text-yellow-400" />
                <h3 className="text-lg font-bold">Early Adopter #47 - Personal AI Access</h3>
              </div>
              <p className="text-white/90 mb-4">
                Congratulations! You're among the first 100 users and have free access to Personal AI Trainer until one year from your registration date. 
                After that, you can continue for $4.99/month or choose other options.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-600/20 text-green-400 border border-green-600/30">
                  ✨ Personal AI Active
                </Badge>
                <Badge className="bg-yellow-600/20 text-yellow-400 border border-yellow-600/30">
                  👑 Early Adopter #47
                </Badge>
                <Badge className="bg-blue-600/20 text-blue-400 border border-blue-600/30">
                  🆓 Free until 1 year from registration
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Plan
                <Badge variant="default" className="bg-green-600">
                  Personal AI - Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                You're among the first 100 users! You have complete access to Personal AI Trainer at no cost until 1 year from your registration date. 
                From that date you can choose whether to continue with the Personal AI subscription ($4.99/month) or switch to a human trainer.
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Personal AI Trainer (Unlimited access)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Personalized workout programs
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Real-time form corrections & guidance
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Advanced progress analytics
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Nutrition planning assistance
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">✓</span>
                  Human trainer option available
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <p className="text-sm text-green-600 font-medium">
                    Active - Early Adopter
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Early Adopter Number</Label>
                  <p className="text-sm text-muted-foreground">
                    #47 of first 100 users
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Free Period Ends</Label>
                  <p className="text-sm text-muted-foreground">
                    1 year from registration date
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Then</Label>
                  <p className="text-sm text-muted-foreground">
                    $4.99/month or choose other options
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-medium mb-2">Future Options</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  When your free early adopter period ends, you can choose:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Continue with Personal AI Trainer for $4.99/month</li>
                  <li>• Switch to a human trainer</li>
                  <li>• Use basic features for free</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  We'll notify you well before your free period ends.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-3">
                  No payment required during early adopter period
                </p>
                <p className="text-xs text-muted-foreground">
                  You can add a payment method when you decide to continue with Personal AI after your free period ends.
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
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No billing during early adopter period
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Billing history will appear here when payments begin.
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
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <Select defaultValue="system">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="colorScheme">Accent Color</Label>
                  <p className="text-sm text-muted-foreground">Customize your accent color</p>
                </div>
                <Select defaultValue="blue">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Animations</Label>
                  <p className="text-sm text-muted-foreground">Enable interface animations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve the app with usage data</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="crashReports">Crash Reports</Label>
                  <p className="text-sm text-muted-foreground">Automatically send crash reports</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataSharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                </div>
                <Switch />
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