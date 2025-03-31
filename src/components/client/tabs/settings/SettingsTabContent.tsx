
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
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b mb-6">
            <ScrollArea className="pb-2">
              <TabsList className="h-auto inline-flex flex-wrap gap-2 bg-transparent p-0">
                <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Account
                </TabsTrigger>
                <TabsTrigger value="payments" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Payments
                </TabsTrigger>
                <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="integrations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Integrations
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Notifications
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>
          
          <div>
            <TabsContent value="account" className="mt-0">
              <AccountSection user={user} />
            </TabsContent>
            
            <TabsContent value="payments" className="mt-0">
              <PaymentsSection />
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-0">
              <PreferencesSection goals={goals} />
            </TabsContent>
            
            <TabsContent value="integrations" className="mt-0">
              <IntegrationsSection user={user} />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-0">
              <NotificationsSection />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
