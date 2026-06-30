
import { useState, useEffect } from "react";

import { AccountSection } from "./AccountSection";
import { PaymentsSection } from "./PaymentsSection";
import { IntegrationsSection } from "./IntegrationsSection";
import { NotificationsSection } from "./NotificationsSection";
import { MyGymSection } from "./MyGymSection";
import { SubscriptionsSection } from "./SubscriptionsSection";

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

  const handleNavigateToSubscriptions = () => {
    setActiveTab("subscriptions");
  };

  useEffect(() => {
    if (activeSection) {
      setActiveTab(activeSection);
    }
  }, [activeSection]);

  const tabs: { id: string; label: string }[] = [
    { id: "account", label: "Account" },
    { id: "payments", label: "Payments" },
    { id: "integrations", label: "Integrations" },
    { id: "mygym", label: "My Gym or Studio" },
    { id: "notifications", label: "Notifications" },
    { id: "subscriptions", label: "Subscriptions" },
  ];

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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center p-3 md:p-4 hover:bg-muted/50 transition-colors ${
                  activeTab === tab.id ? "bg-primary/5 text-primary border-primary md:border-l-2 md:border-t-0" : ""
                } md:border-l-2 md:border-transparent whitespace-nowrap`}
              >
                <span className="flex-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {activeTab === "account" && "Account Settings"}
            {activeTab === "payments" && "Payment Settings"}
            {activeTab === "integrations" && "App Integrations"}
            {activeTab === "mygym" && "My Gym or Studio"}
            {activeTab === "notifications" && "Notification Settings"}
            {activeTab === "subscriptions" && "Subscription & Billing"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {activeTab === "account" && "Manage your personal information and preferences"}
            {activeTab === "payments" && "Manage your payment methods"}
            {activeTab === "integrations" && "Connect with your favorite fitness apps"}
            {activeTab === "mygym" && "Manage your membership and sessions"}
            {activeTab === "notifications" && "Choose which notifications you want to receive"}
            {activeTab === "subscriptions" && "Manage your subscription and AI features"}
          </p>
        </div>
        
        <div className="space-y-6">
          {activeTab === "account" && (
            <AccountSection 
              user={user}
              goals={goals}
              onNavigateToSubscriptions={handleNavigateToSubscriptions}
            />
          )}
          {activeTab === "payments" && <PaymentsSection />}
          {activeTab === "integrations" && <IntegrationsSection user={user} />}
          {activeTab === "mygym" && <MyGymSection user={user} />}
          {activeTab === "notifications" && <NotificationsSection />}
          {activeTab === "subscriptions" && <SubscriptionsSection />}
        </div>
      </div>
    </div>
  );
}
