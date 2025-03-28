
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { ProfileSection } from "./ProfileSection";
import { AvailabilitySection } from "./AvailabilitySection";
import { MembershipSection } from "./MembershipSection";
import { BillingSection } from "./BillingSection";

interface SettingsTabContentProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
}

export function SettingsTabContent({ user }: SettingsTabContentProps) {
  if (!user) return null;
  
  // Set the default profile image
  const updatedUser = {
    ...user,
    profileImage: user.profileImage || "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
  };
  
  const [selectedTab, setSelectedTab] = useState("profile");

  const handleSaveChanges = () => {
    // Here you would typically save the changes to a database
    // For this demo, we'll just show a success toast
    toast.success("Settings saved successfully");
    
    // Save the updated profile image to localStorage if it was changed
    const demoUser = JSON.parse(localStorage.getItem('demo-user') || '{}');
    if (demoUser.email === user.email) {
      demoUser.profileImage = updatedUser.profileImage;
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your profile and preferences</CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden p-0 sm:p-6">
        <Tabs defaultValue="profile" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6 grid grid-cols-2 sm:grid-cols-4 w-full">
            <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
            <TabsTrigger value="availability" className="text-xs sm:text-sm">Availability</TabsTrigger>
            <TabsTrigger value="membership" className="text-xs sm:text-sm">Membership</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs sm:text-sm">Billing</TabsTrigger>
          </TabsList>
          
          <div className="px-4 sm:px-0 overflow-x-hidden">
            <TabsContent value="profile">
              <ProfileSection user={updatedUser} />
            </TabsContent>
            
            <TabsContent value="availability">
              <AvailabilitySection />
            </TabsContent>
            
            <TabsContent value="membership">
              <MembershipSection user={updatedUser} />
            </TabsContent>
            
            <TabsContent value="billing">
              <BillingSection user={updatedUser} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t flex justify-end pt-6">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
