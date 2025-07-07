import { useState } from "react";
import { ClientHeader } from "./ClientHeader";
import { ClientSidebar } from "./ClientSidebar";
import { Overview } from "./tabs/Overview";
import { SessionsTab } from "./tabs/SessionsTab";
import { TrainingProgramTab } from "./tabs/TrainingProgramTab";
import { TrainingLogTab } from "./tabs/TrainingLogTab";
import { TrainersTab } from "./tabs/TrainersTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { MyPackagesTab } from "./tabs/packages/MyPackagesTab";
import { useIsMobile } from "@/hooks/use-mobile";
import { SessionItem } from "@/types/sessions";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";
import { PostponementNotifications } from "./notifications/PostponementNotifications";
import { useClientPostponements } from "@/hooks/useClientPostponements";

// Sample upcoming sessions data
const upcomingSessions: SessionItem[] = [
  {
    id: 1,
    name: "Morning HIIT",
    trainer: "John Doe",
    date: "Today",
    time: "09:00 - 10:00",
    price: 50,
    status: "confirmed",
    attendees: 5,
    maxAttendees: 10,
    location: "Studio A",
    description: "High-intensity interval training session"
  },
  {
    id: 2,
    name: "Personal Training",
    trainer: "John Doe",
    date: "Tomorrow",
    time: "13:00 - 14:00",
    price: 0, // Part of package
    status: "confirmed",
    attendees: 1,
    maxAttendees: 1,
    location: "Main Gym",
    description: "One-on-one personal training session",
    packageSession: true
  }
];

// Sample messages data
const trainerMessages = [
  { id: 1, from: "John Doe", preview: "Great progress on your training!", time: "2h ago", read: false },
  { id: 2, from: "Jane Smith", preview: "Don't forget your session tomorrow", time: "1d ago", read: true },
];

// Sample progress data
const progressData: ProgressItem[] = [
  { 
    goal: "Lose weight for summer", 
    current: 68, 
    target: 65, 
    unit: "kg", 
    progress: 75,
    goalType: "weight_management",
    targetDate: "2024-06-30",
    createdAt: "2024-03-01",
    lastUpdated: "2024-03-15"
  },
  { 
    goal: "Daily steps target", 
    current: 8500, 
    target: 10000, 
    unit: "steps", 
    progress: 85,
    goalType: "activity_level",
    targetDate: "2024-12-31",
    frequency: { value: 10000, period: "daily" },
    createdAt: "2024-03-01",
    lastUpdated: "2024-03-15"
  }
];

// Sample user data with profile image
const sampleUser = {
  name: "Demo Client",
  email: "client@demo.com",
  type: "client",
  plan: "pro",
  profileImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&auto=format&fit=crop&crop=face"
};

const goals = ["Weight loss", "Muscle gain", "Flexibility"];

interface ClientDashboardProps {
  customName?: string;
}

export function ClientDashboard({ customName }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const isMobile = useIsMobile();
  const { getPendingPostponements } = useClientPostponements();
  
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const pendingPostponements = getPendingPostponements();
  // For now, use 0 as base unread count since we don't have message notifications implemented
  const baseUnreadCount = trainerMessages.filter(m => !m.read).length;
  const totalUnreadCount = baseUnreadCount + pendingPostponements.length;

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader
        name={customName || "Client Dashboard"} 
        user={sampleUser}
        onLogout={handleLogout}
        onMobileMenuClick={() => setShowSidebar(!showSidebar)}
        showMobileMenuButton={isMobile}
      />
      <div className="flex flex-1 overflow-hidden">
        <ClientSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          user={sampleUser}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Postponement Notifications - Show at the top when there are pending ones */}
            {pendingPostponements.length > 0 && (
              <PostponementNotifications />
            )}
            
            {activeTab === "overview" && (
              <Overview 
                progressData={progressData}
                upcomingSessions={upcomingSessions}
                trainerMessages={trainerMessages}
              />
            )}
            {activeTab === "sessions" && <SessionsTab upcomingSessions={upcomingSessions} />}
            {activeTab === "packages" && <MyPackagesTab />}
            {activeTab === "training-program" && <TrainingProgramTab />}
            {activeTab === "training-log" && <TrainingLogTab />}
            {activeTab === "trainers" && <TrainersTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
            {activeTab === "messages" && <MessagesTab messages={trainerMessages} />}
            {activeTab === "settings" && <SettingsTab user={sampleUser} goals={goals} />}
          </div>
        </main>
      </div>
    </div>
  );
}
