
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
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (activeSection) {
      setActiveTab(activeSection);
    }
  }, [activeSection]);

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b px-4 py-2 sm:px-0 sm:py-0 sm:border-0">
            <ScrollArea className="w-full max-w-full">
              <TabsList className="h-auto flex flex-nowrap justify-start w-full sm:w-auto sm:inline-flex sm:h-10 bg-transparent sm:bg-muted p-0 sm:p-1 space-x-2 overflow-x-auto">
                <TabsTrigger value="account" className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:data-[state=active]:bg-background sm:data-[state=active]:text-foreground">Account</TabsTrigger>
                <TabsTrigger value="payments" className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:data-[state=active]:bg-background sm:data-[state=active]:text-foreground">Payments</TabsTrigger>
                <TabsTrigger value="preferences" className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:data-[state=active]:bg-background sm:data-[state=active]:text-foreground">Preferences</TabsTrigger>
                <TabsTrigger value="integrations" className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:data-[state=active]:bg-background sm:data-[state=active]:text-foreground">Integrations</TabsTrigger>
                <TabsTrigger value="notifications" className="flex-shrink-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:data-[state=active]:bg-background sm:data-[state=active]:text-foreground">Notifications</TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>
          
          <div className="p-4 sm:p-0 sm:mt-6">
            <TabsContent value="account" className="m-0">
              <AccountSection user={user} />
            </TabsContent>
            
            <TabsContent value="payments" className="m-0">
              <PaymentsSection />
            </TabsContent>
            
            <TabsContent value="preferences" className="m-0">
              <PreferencesSection goals={goals} />
            </TabsContent>
            
            <TabsContent value="integrations" className="m-0">
              <IntegrationsSection user={user} />
            </TabsContent>
            
            <TabsContent value="notifications" className="m-0">
              <NotificationsSection />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
