
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "./settings/ProfileTab";
import { NotificationsTab } from "./settings/NotificationsTab";
import { IntegrationsTab } from "./settings/IntegrationsTab";
import { InvoicingSection } from "./settings/InvoicingSection";
import { BillingTab } from "./settings/BillingTab";


interface SettingsTabProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
    gymName?: string;
  } | null;
}

export function SettingsTab({ user }: SettingsTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your gym profile and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
          
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ProfileTab user={user} />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationsTab />
        </TabsContent>
        
        <TabsContent value="invoicing">
          <InvoicingSection />
        </TabsContent>
        
        
        <TabsContent value="billing">
          <BillingTab user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
