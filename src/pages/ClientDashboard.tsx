
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClientProfile } from "@/components/ClientProfile";
import { ClientHeader } from "@/components/client/ClientHeader";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Overview } from "@/components/client/tabs/Overview";
import { SessionsTab } from "@/components/client/tabs/SessionsTab";
import { TrainersTab } from "@/components/client/tabs/TrainersTab";
import { MessagesTab } from "@/components/client/tabs/MessagesTab";
import { SettingsTab } from "@/components/client/tabs/SettingsTab";
import { AnalyticsTab } from "@/components/client/tabs/AnalyticsTab";
import { TrainingProgramTab } from "@/components/client/tabs/TrainingProgramTab";
import { TrainingLogTab } from "@/components/client/tabs/TrainingLogTab";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SessionItem, SessionStatus } from "@/types/sessions";
import { useIsMobile } from "@/hooks/use-mobile";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const [user, setUser] = useState<{
    name?: string, 
    email: string, 
    type: string, 
    plan?: string,
    profileImage?: string
  } | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSettingsSection, setActiveSettingsSection] = useState<string | undefined>(undefined);
  
  const upcomingSessions: SessionItem[] = [
    { id: 1, name: "Morning HIIT", trainer: "Alex Thompson", time: "09:00 - 10:00", date: "Today", status: "confirmed" as SessionStatus, price: 45 },
    { id: 2, name: "Personal Training", trainer: "Sarah Johnson", time: "13:00 - 14:00", date: "Tomorrow", status: "confirmed" as SessionStatus },
    { id: 3, name: "Yoga Basics", trainer: "Sarah Johnson", time: "17:30 - 18:30", date: "Thursday", status: "confirmed" as SessionStatus, price: 35 },
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

  useEffect(() => {
    if (location.state) {
      if (location.state.activeTab) {
        setActiveTab(location.state.activeTab);
      }
      if (location.state.settingsSection) {
        setActiveSettingsSection(location.state.settingsSection);
      }
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    navigate('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const unreadMessageCount = trainerMessages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader 
        user={user} 
        onLogout={handleLogout}
        onMobileMenuClick={() => setShowSidebar(!showSidebar)}
      />

      <div className="flex flex-1 overflow-hidden">
        <ClientSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          unreadMessageCount={unreadMessageCount}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          user={user}
        />
        
        <main className="dashboard-main flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
          <div className="dashboard-container mx-auto max-w-6xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="overview" className="mt-0">
                <Overview 
                  progressData={progressData}
                  upcomingSessions={upcomingSessions}
                  trainerMessages={trainerMessages}
                />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <AnalyticsTab />
              </TabsContent>

              <TabsContent value="sessions" className="mt-0">
                <SessionsTab upcomingSessions={upcomingSessions} />
              </TabsContent>

              <TabsContent value="training-program" className="mt-0">
                <TrainingProgramTab />
              </TabsContent>

              <TabsContent value="training-log" className="mt-0">
                <TrainingLogTab />
              </TabsContent>

              <TabsContent value="trainers" className="mt-0">
                <TrainersTab />
              </TabsContent>

              <TabsContent value="messages" className="mt-0">
                <MessagesTab messages={trainerMessages} />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <SettingsTab user={user} goals={goals} activeSection={activeSettingsSection} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
