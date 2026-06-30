import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ClientHeader } from "@/components/client/ClientHeader";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { Overview } from "@/components/client/tabs/Overview";
import { TrainersTab } from "@/components/client/tabs/TrainersTab";
import { MessagesTab } from "@/components/client/tabs/MessagesTab";
import { SettingsTab } from "@/components/client/tabs/SettingsTab";
import { AnalyticsTab } from "@/components/client/tabs/AnalyticsTab";
import { TrainingLogTab } from "@/components/client/tabs/TrainingLogTab";
import { MyCalendarTab } from "@/components/client/tabs/MyCalendarTab";
import { MyGymBasicTab } from "@/components/client/tabs/MyGymBasicTab";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";
import { addDays } from "date-fns";

const ClientDashboardBasic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSettingsSection, setActiveSettingsSection] = useState<string | undefined>(undefined);
  const mainRef = useRef<HTMLDivElement | null>(null);

  const initialGoals = useMemo<ProgressItem[]>(() => {
    const now = new Date().toISOString();
    const mk = (
      goal: string, current: number, target: number, unit: string,
      goalType: string, daysToTarget: number,
      source: "personal" | "trainer", trainerName?: string,
      exerciseName?: string,
    ): ProgressItem => {
      const isReverse = current > target;
      const progress = isReverse
        ? Math.max(0, Math.min(100, Math.round(((current - Math.min(current, target)) / Math.max(1, current - target)) * 0)) ) // placeholder, overwritten
        : Math.max(0, Math.min(100, Math.round((current / target) * 100)));
      // Simple progress: percent toward target accounting for reverse goals (e.g. weight loss, run time)
      const p = isReverse
        ? Math.max(0, Math.min(100, Math.round(((100 - ((current - target) / current) * 100))))) // close enough for demo
        : progress;
      return {
        id: `seed-${goal.toLowerCase().replace(/\s+/g, "-")}`,
        goal,
        current,
        target,
        unit,
        progress: p,
        lastUpdated: now,
        createdAt: now,
        source,
        trainerName,
        trainerId: source === "trainer" ? "trainer-marco" : undefined,
        goalType,
        targetDate: addDays(new Date(), daysToTarget).toISOString(),
        exerciseName,
        logs: [{
          id: `seed-log-${goal}`,
          date: now,
          value: current,
          source: "manual",
          note: "Initial value",
        }],
      };
    };
    return [
      mk("Lose Weight", 82, 76, "kg", "weight_loss", 60, "personal"),
      mk("Bench Press 1RM", 70, 90, "kg", "strength", 90, "trainer", "Marco Rossi", "Bench Press"),
      mk("Run 5K", 28, 25, "min", "endurance", 75, "trainer", "Marco Rossi"),
    ];
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('demo-user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (!userData.profileImage) {
        userData.profileImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&auto=format&fit=crop&crop=face";
      }
      setUser(userData);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (location.state) {
      const s: any = location.state;
      if (s.activeTab) setActiveTab(s.activeTab);
      if (s.settingsSection) setActiveSettingsSection(s.settingsSection);
    }
  }, [location.state]);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    navigate('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader
        user={user}
        onLogout={handleLogout}
        onMobileMenuClick={() => setShowSidebar(!showSidebar)}
      />

      <div className="flex flex-1 overflow-hidden">
        <ClientSidebar
          variant="basic"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          user={user}
          onLogout={handleLogout}
        />

        <main ref={mainRef} className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="overview" className="mt-0">
                <Overview progressData={initialGoals} upcomingSessions={[]} variant="basic" />
              </TabsContent>
              <TabsContent value="mygym" className="mt-0">
                <MyGymBasicTab />
              </TabsContent>
              <TabsContent value="training-log" className="mt-0">
                <TrainingLogTab hideAI />
              </TabsContent>
              <TabsContent value="trainers" className="mt-0">
                <TrainersTab />
              </TabsContent>
              <TabsContent value="analytics" className="mt-0">
                <AnalyticsTab hideAI />
              </TabsContent>
              <TabsContent value="my-calendar" className="mt-0">
                <MyCalendarTab upcomingSessions={[]} />
              </TabsContent>
              <TabsContent value="messages" className="mt-0">
                <MessagesTab />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <SettingsTab user={user} goals={[]} activeSection={activeSettingsSection} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboardBasic;
