
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AccountSection } from "./AccountSection";
import { PaymentsSection } from "./PaymentsSection";
import { PreferencesSection } from "./PreferencesSection";
import { IntegrationsSection } from "./IntegrationsSection";
import { NotificationsSection } from "./NotificationsSection";

interface SettingsTabContentProps {
  user: { 
    email: string; 
    type: string; 
    name?: string; 
    plan?: string; 
  };
  goals: string[];
  activeSection?: string;
}

export function SettingsTabContent({ user, goals, activeSection }: SettingsTabContentProps) {
  const [activeTab, setActiveTab] = useState("account");
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (activeSection) {
      setActiveTab(activeSection);
    }
  }, [activeSection]);

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
          <ScrollArea className="w-full">
            <TabsList className="mb-6 w-full flex flex-wrap justify-start">
              <TabsTrigger value="account" className="flex-shrink-0">Account</TabsTrigger>
              <TabsTrigger value="payments" className="flex-shrink-0">Payments</TabsTrigger>
              <TabsTrigger value="preferences" className="flex-shrink-0">Preferences</TabsTrigger>
              <TabsTrigger value="integrations" className="flex-shrink-0">Integrations</TabsTrigger>
              <TabsTrigger value="notifications" className="flex-shrink-0">Notifications</TabsTrigger>
            </TabsList>
          </ScrollArea>
          
          <TabsContent value="account">
            <AccountSection user={user} />
          </TabsContent>
          
          <TabsContent value="payments">
            <PaymentsSection />
          </TabsContent>
          
          <TabsContent value="preferences">
            <PreferencesSection goals={goals} />
          </TabsContent>
          
          <TabsContent value="integrations">
            <IntegrationsSection user={user} />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationsSection />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
