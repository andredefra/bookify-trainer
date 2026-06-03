import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "./settings/ProfileTab";
import { NotificationsTab } from "./settings/NotificationsTab";
import { IntegrationsTab } from "./settings/IntegrationsTab";
import { InvoicingSection } from "./settings/InvoicingSection";
import { BillingTab } from "./settings/BillingTab";
import { BrandingSettingsTab } from "@/components/shared/BrandingSettingsTab";


interface SettingsTabProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
    gymName?: string;
  } | null;
  isInvited?: boolean;
}

export function SettingsTab({ user, isInvited = false }: SettingsTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your gym profile and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {!isInvited && <TabsTrigger value="integrations">Integrations</TabsTrigger>}
          {!isInvited && <TabsTrigger value="invoicing">Invoicing</TabsTrigger>}
          {!isInvited && <TabsTrigger value="billing">Billing</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab user={user} />
        </TabsContent>

        <TabsContent value="branding">
          <BrandingSettingsTab
            entityType="gym"
            onSave={(data) => console.log('Saving gym branding:', data)}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>

        {!isInvited && (
          <>
            <TabsContent value="integrations">
              <IntegrationsTab />
            </TabsContent>

            <TabsContent value="invoicing">
              <InvoicingSection />
            </TabsContent>

            <TabsContent value="billing">
              <BillingTab user={user} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
