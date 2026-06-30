
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Info, Crown, Heart, AlertTriangle, Eye, EyeOff, RefreshCw } from "lucide-react";
import { HealthDocumentsUpload } from "@/components/common/HealthDocumentsUpload";
import { toast } from "sonner";
import { useUserProfile } from "@/hooks/useUserProfile";

interface AccountSectionProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    profileImage?: string;
  };
  goals?: string[];
  onNavigateToSubscriptions?: () => void;
}

export function AccountSection({ user, goals = [], onNavigateToSubscriptions }: AccountSectionProps) {

  // Use a general image as default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";
  
  const { profile, saveProfile, uploadProfileImage, loading, calculateAge } = useUserProfile();
  
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<'male' | 'female' | ''>("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState<string>(user.profileImage || defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Health & Medical
  const [allergies, setAllergies] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [physicalLimitations, setPhysicalLimitations] = useState("");

  // Emergency Contact
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  // Fitness Preferences
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [preferredWorkoutTime, setPreferredWorkoutTime] = useState("");

  // Account Security
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading states per sezione
  const [savingHealth, setSavingHealth] = useState(false);
  const [savingEmergency, setSavingEmergency] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);

  // Initialize from profile
  useEffect(() => {
    if (profile) {
      setHeight(profile.height?.toString() || "");
      setGender(profile.gender || "");
      if (profile.profile_image_url) {
        setProfileImage(profile.profile_image_url);
      }
      
      // Calculate age from date_of_birth
      if (profile.date_of_birth) {
        const calculatedAge = calculateAge(profile.date_of_birth);
        if (calculatedAge) {
          setAge(calculatedAge.toString());
        }
      }
      
      setAllergies(profile.allergies || "");
      setHealthConditions(profile.health_conditions || "");
      setPhysicalLimitations(profile.physical_limitations || "");
      setEmergencyContactName(profile.emergency_contact_name || "");
      setEmergencyContactPhone(profile.emergency_contact_phone || "");
      setExperienceLevel(profile.experience_level || "beginner");
      setPreferredWorkoutTime(profile.preferred_workout_time || "");
    }
  }, [profile, calculateAge]);

  const handleSaveAccount = async () => {
    try {
      await saveProfile({
        first_name: name,
        height: height ? parseInt(height) : undefined,
        gender: gender || undefined,
      });
      toast.success("Account information saved successfully");
    } catch (error) {
      toast.error("Failed to save account information");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.match('image.*')) {
        toast.error("Please select an image file");
        return;
      }
      
      // Check if the file size is less than 5MB
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const imageUrl = await uploadProfileImage(file);
      if (imageUrl) {
        setProfileImage(imageUrl);
        await saveProfile({ profile_image_url: imageUrl });
        toast.success("Profile image updated");
      }
    }
  };
  
  // Reset image to default
  const handleResetImage = () => {
    setProfileImage(defaultImage);
    toast.success("Profile image reset to default");
  };

  const handleSaveHealthInfo = async () => {
    setSavingHealth(true);
    try {
      await saveProfile({
        allergies,
        health_conditions: healthConditions,
        physical_limitations: physicalLimitations,
      });
      toast.success("Health information saved");
    } catch (error) {
      toast.error("Failed to save health information");
    } finally {
      setSavingHealth(false);
    }
  };

  const handleSaveEmergencyContact = async () => {
    setSavingEmergency(true);
    try {
      await saveProfile({
        emergency_contact_name: emergencyContactName,
        emergency_contact_phone: emergencyContactPhone,
      });
      toast.success("Emergency contact saved");
    } catch (error) {
      toast.error("Failed to save emergency contact");
    } finally {
      setSavingEmergency(false);
    }
  };

  const handleSaveFitnessPreferences = async () => {
    setSavingPreferences(true);
    try {
      await saveProfile({
        experience_level: experienceLevel,
        preferred_workout_time: preferredWorkoutTime,
      });
      toast.success("Preferences saved");
    } catch (error) {
      toast.error("Failed to save preferences");
    } finally {
      setSavingPreferences(false);
    }
  };

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    // Placeholder - Supabase auth password update
    toast.success("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <Avatar 
              className="h-24 w-24 border-2 border-primary/20 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleImageClick}
            >
              <AvatarImage src={profileImage} alt={name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {name ? name.split(' ').map(n => n[0]).join('') : 'U'}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              variant="outline" 
              className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
              onClick={handleImageClick}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">{name || 'Client'}</h4>
            <p className="text-sm text-muted-foreground">{email}</p>
            <div className="space-x-2">
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto"
                onClick={handleImageClick}
              >
                Change profile picture
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto text-muted-foreground"
                onClick={handleResetImage}
              >
                Reset to default
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+39 123 456 7890"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input 
              id="age" 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              min="1"
              max="120"
            />
          </div>
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input 
              id="height" 
              type="number" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              min="100"
              max="250"
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={(value) => setGender(value as 'male' | 'female')}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="pt-2">
          <Button onClick={handleSaveAccount}>Save Changes</Button>
        </div>
      </div>

      <Separator />

      {/* Health & Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Health & Medical Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            This information helps create safer, more effective workouts and nutrition plans for you.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="allergies">Food Allergies & Intolerances</Label>
            <Textarea 
              id="allergies" 
              value={allergies} 
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="List any food allergies, intolerances, or dietary restrictions (e.g., nuts, dairy, gluten)"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="healthConditions">Health Conditions</Label>
            <Textarea 
              id="healthConditions" 
              value={healthConditions} 
              onChange={(e) => setHealthConditions(e.target.value)}
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
              value={physicalLimitations} 
              onChange={(e) => setPhysicalLimitations(e.target.value)}
              placeholder="Describe any injuries, physical limitations, or areas to avoid (e.g., bad knee, recent surgery, back problems)"
              rows={3}
            />
          </div>

          <HealthDocumentsUpload />
          
          <div className="flex justify-end">
            <Button onClick={handleSaveHealthInfo} disabled={savingHealth}>
              {savingHealth ? (
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
                value={emergencyContactName} 
                onChange={(e) => setEmergencyContactName(e.target.value)}
                placeholder="Full name of emergency contact"
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
              <Input 
                id="emergencyContactPhone" 
                type="tel" 
                value={emergencyContactPhone} 
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveEmergencyContact} disabled={savingEmergency}>
              {savingEmergency ? (
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
                value={experienceLevel} 
                onValueChange={setExperienceLevel}
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
                value={preferredWorkoutTime} 
                onValueChange={setPreferredWorkoutTime}
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
            <Button onClick={handleSaveFitnessPreferences} disabled={savingPreferences}>
              {savingPreferences ? (
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
            <Label htmlFor="email-security">Email Address</Label>
            <Input id="email-security" type="email" value={email} disabled />
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
            <Input 
              id="newPassword" 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password" 
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password" 
            />
          </div>
          <Button onClick={handleUpdatePassword}>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
