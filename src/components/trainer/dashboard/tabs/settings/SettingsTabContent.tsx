
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { ProfileSection } from "./ProfileSection";
import { AvailabilitySection } from "./AvailabilitySection";
import { IntegrationsSection } from "./IntegrationsSection";
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
  
  const [selectedTab, setSelectedTab] = useState("profile");

  const handleSaveChanges = () => {
    // Here you would typically save the changes to a database
    // For this demo, we'll just show a success toast
    toast.success("Settings saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your profile and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileSection user={user} />
          </TabsContent>
          
          <TabsContent value="availability">
            <AvailabilitySection />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationsSection />
          </TabsContent>
          
          <TabsContent value="billing">
            <BillingSection user={user} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t flex justify-end pt-6">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
