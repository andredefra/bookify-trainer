
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientProfile } from "@/components/ClientProfile";
import { ClientHeader } from "@/components/client/ClientHeader";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Overview } from "@/components/client/tabs/Overview";
import { SessionsTab } from "@/components/client/tabs/SessionsTab";
import { TrainersTab } from "@/components/client/tabs/TrainersTab";
import { MessagesTab } from "@/components/client/tabs/MessagesTab";
import { SettingsTab } from "@/components/client/tabs/SettingsTab";
import { AnalyticsTab } from "@/components/client/tabs/AnalyticsTab";
import { useIsMobile } from "@/hooks/use-mobile";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{name?: string, email: string, type: string, plan?: string} | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();
  
  const upcomingSessions = [
    { id: 1, name: "Morning HIIT", trainer: "Alex Thompson", time: "09:00 - 10:00", date: "Today", status: "confirmed" },
    { id: 2, name: "Personal Training", trainer: "Sarah Johnson", time: "13:00 - 14:00", date: "Tomorrow", status: "pending" },
    { id: 3, name: "Yoga Basics", trainer: "Michael Chen", time: "17:30 - 18:30", date: "Thursday", status: "confirmed" },
  ];
  
  const trainerMessages = [
    { id: 1, from: "Sarah Johnson", preview: "Great job in our last session! I've adjusted your program for next week.", time: "10 min ago", read: false },
    { id: 2, from: "Alex Thompson", preview: "Here's the nutrition plan we discussed. Let me know if you have questions.", time: "Yesterday", read: true },
  ];
  
  const progressData = [
    { goal: "Weight goal", current: 68, target: 65, unit: "kg", progress: 75 },
    { goal: "Weekly workouts", current: 3, target: 4, unit: "sessions", progress: 75 },
    { goal: "Daily steps", current: 8500, target: 10000, unit: "steps", progress: 85 },
  ];

  const goals = ["Weight loss", "Muscle tone", "Flexibility"];

  useEffect(() => {
    const storedUser = localStorage.getItem('demo-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    navigate('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const unreadMessageCount = trainerMessages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientHeader user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user.name || user.email.split('@')[0]}
          </h1>
          <p className="text-muted-foreground">Track your progress and manage your fitness journey.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {!isMobile && (
            <div className="col-span-12 lg:col-span-3">
              <ClientSidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                unreadMessageCount={unreadMessageCount}
              />
              
              <div className="mt-6">
                <ClientProfile 
                  name={user.name || "Demo Client"}
                  email={user.email}
                  since="March 2023"
                  sessions={24}
                  goals={goals}
                />
              </div>
            </div>
          )}

          <div className={`col-span-12 ${isMobile ? 'lg:col-span-12' : 'lg:col-span-9'}`}>
            {activeTab === "overview" && (
              <Overview 
                progressData={progressData}
                upcomingSessions={upcomingSessions}
                trainerMessages={trainerMessages}
              />
            )}

            {activeTab === "analytics" && (
              <AnalyticsTab />
            )}

            {activeTab === "sessions" && (
              <SessionsTab upcomingSessions={upcomingSessions} />
            )}

            {activeTab === "trainers" && (
              <TrainersTab />
            )}

            {activeTab === "messages" && (
              <MessagesTab messages={trainerMessages} />
            )}

            {activeTab === "settings" && (
              <SettingsTab user={user} goals={goals} />
            )}
          </div>
        </div>
      </div>
      
      {isMobile && (
        <ClientSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          unreadMessageCount={unreadMessageCount}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
