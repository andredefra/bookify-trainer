
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (activeSection) {
      setActiveTab(activeSection);
    }
  }, [activeSection]);

  return (
    <div className="flex flex-col md:flex-row md:gap-6 bg-white rounded-lg border shadow-sm">
      {/* Sidebar navigation */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r md:min-h-[70vh]">
        <div className="p-4 md:p-6 border-b">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your account settings
          </p>
        </div>
        <div className="h-full max-h-[calc(100vh-14rem)]">
          <div className="flex flex-row md:flex-col p-2 md:p-0 overflow-x-auto md:overflow-x-visible">
            <button
              onClick={() => setActiveTab("account")}
              className={`flex-shrink-0 flex items-center p-3 md:p-4 hover:bg-muted/50 transition-colors ${
                activeTab === "account" ? "bg-primary/5 text-primary border-primary md:border-l-2 md:border-t-0" : ""
              } md:border-l-2 md:border-transparent whitespace-nowrap`}
            >
              <span className="flex-1">Account</span>
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`flex-shrink-0 flex items-center p-3 md:p-4 hover:bg-muted/50 transition-colors ${
                activeTab === "payments" ? "bg-primary/5 text-primary border-primary md:border-l-2 md:border-t-0" : ""
              } md:border-l-2 md:border-transparent whitespace-nowrap`}
            >
              <span className="flex-1">Payments</span>
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`flex-shrink-0 flex items-center p-3 md:p-4 hover:bg-muted/50 transition-colors ${
                activeTab === "preferences" ? "bg-primary/5 text-primary border-primary md:border-l-2 md:border-t-0" : ""
              } md:border-l-2 md:border-transparent whitespace-nowrap`}
            >
              <span className="flex-1">Preferences</span>
            </button>
            <button
              onClick={() => setActiveTab("integrations")}
              className={`flex-shrink-0 flex items-center p-3 md:p-4 hover:bg-muted/50 transition-colors ${
                activeTab === "integrations" ? "bg-primary/5 text-primary border-primary md:border-l-2 md:border-t-0" : ""
              } md:border-l-2 md:border-transparent whitespace-nowrap`}
            >
              <span className="flex-1">Integrations</span>
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex-shrink-0 flex items-center p-3 md:p-4 hover:bg-muted/50 transition-colors ${
                activeTab === "notifications" ? "bg-primary/5 text-primary border-primary md:border-l-2 md:border-t-0" : ""
              } md:border-l-2 md:border-transparent whitespace-nowrap`}
            >
              <span className="flex-1">Notifications</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {activeTab === "account" && "Account Settings"}
            {activeTab === "payments" && "Payment Settings"}
            {activeTab === "preferences" && "Preferences"}
            {activeTab === "integrations" && "App Integrations"}
            {activeTab === "notifications" && "Notification Settings"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {activeTab === "account" && "Manage your personal information"}
            {activeTab === "payments" && "Manage your payment methods"}
            {activeTab === "preferences" && "Customize your fitness goals and preferences"}
            {activeTab === "integrations" && "Connect with your favorite fitness apps"}
            {activeTab === "notifications" && "Choose which notifications you want to receive"}
          </p>
        </div>
        
        <div className="space-y-6">
          {activeTab === "account" && <AccountSection user={user} />}
          {activeTab === "payments" && <PaymentsSection />}
          {activeTab === "preferences" && <PreferencesSection goals={goals} />}
          {activeTab === "integrations" && <IntegrationsSection user={user} />}
          {activeTab === "notifications" && <NotificationsSection />}
        </div>
      </div>
    </div>
  );
}
