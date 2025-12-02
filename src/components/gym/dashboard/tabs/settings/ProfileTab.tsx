
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ProfileTabProps {
  user: {
    name?: string;
    email: string;
    gymName?: string;
  } | null;
}

export function ProfileTab({ user }: ProfileTabProps) {
  const [gymName, setGymName] = useState(user?.gymName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [adminName, setAdminName] = useState(user?.name || "");
  const [facilityType, setFacilityType] = useState<'studio' | 'gym'>('studio');
  const [saving, setSaving] = useState(false);

  const handleSaveProfile = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      // Update localStorage for demo
      const userData = JSON.parse(localStorage.getItem('demo-user') || '{}');
      userData.gymName = gymName;
      userData.name = adminName;
      userData.email = email;
      userData.facilityType = facilityType;
      localStorage.setItem('demo-user', JSON.stringify(userData));
      
      setSaving(false);
      toast.success("Profile settings saved successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Studio Profile</CardTitle>
          <CardDescription>Manage your studio's profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gymName">Studio Name</Label>
            <Input
              id="gymName"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              placeholder="Enter studio name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facilityType">Facility Type</Label>
            <Select value={facilityType} onValueChange={(val) => setFacilityType(val as 'studio' | 'gym')}>
              <SelectTrigger>
                <SelectValue placeholder="Select facility type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Personal Training Studio</SelectItem>
                <SelectItem value="gym">Gym / Fitness Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@yourgym.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="adminName">Administrator Name</Label>
            <Input
              id="adminName"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          
          <Button onClick={handleSaveProfile} disabled={saving}>
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Studio Details</CardTitle>
          <CardDescription>Additional information about your studio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Enter studio address"
              defaultValue="123 Fitness St, Milan, Italy"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                defaultValue="+39 123 456 7890"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="Enter website URL"
                defaultValue="https://yourgym.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
              placeholder="Enter a brief description of your gym"
              defaultValue="A modern fitness facility with state-of-the-art equipment, expert trainers, and a supportive community."
            />
          </div>
          
          <Button>Save Details</Button>
        </CardContent>
      </Card>
    </div>
  );
}
