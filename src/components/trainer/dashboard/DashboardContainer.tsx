
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { OverviewTab } from "./tabs/OverviewTab";
import { SessionsTab } from "./tabs/SessionsTab";
import { ClientsTab } from "./tabs/ClientsTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { ProgramsTab } from "./tabs/ProgramsTab";
import { toast } from "sonner";

export function DashboardContainer() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{name?: string, email: string, type: string, plan?: string} | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data
  const upcomingSessions = [
    { id: 1, name: "Morning HIIT", time: "09:00 - 10:00", date: "Today", participants: 4, maxParticipants: 6, price: 25 },
    { id: 2, name: "Personal Training with Sarah", time: "13:00 - 14:00", date: "Today", participants: 1, maxParticipants: 1, price: 50 },
    { id: 3, name: "Yoga Basics", time: "17:30 - 18:30", date: "Tomorrow", participants: 8, maxParticipants: 10, price: 20 },
  ];
  
  const clients = [
    { id: 1, name: "Sarah Johnson", sessions: 12, lastSession: "Yesterday" },
    { id: 2, name: "Mike Peterson", sessions: 5, lastSession: "3 days ago" },
    { id: 3, name: "Lisa Garcia", sessions: 8, lastSession: "Last week" },
    { id: 4, name: "David Kim", sessions: 2, lastSession: "2 weeks ago" },
  ];
  
  const messageRequests = [
    { id: 1, from: "Sarah Johnson", preview: "Hi, I need to reschedule my session tomorrow...", time: "10 min ago" },
    { id: 2, from: "New Client", preview: "I'm interested in your personal training services...", time: "2 hours ago" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('demo-user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Set a flag in localStorage to indicate if the trainer has premium features
      // This is used in the client dashboard to show appropriate UI
      localStorage.setItem('trainerIsPremium', userData.plan === 'pro' ? 'true' : 'false');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    localStorage.removeItem('trainerIsPremium');
    navigate('/');
  };

  const isPremium = user?.plan === 'pro';

  useEffect(() => {
    // Show toast with information about client access
    if (user && !toast.dismiss) {
      toast.info(
        "Your clients can access the app for free. Premium features like custom training programs are only available with a Pro subscription.",
        { duration: 6000 }
      );
    }
  }, [user]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user.name || user.email.split('@')[0]}
          </h1>
          <p className="text-muted-foreground">Manage your sessions, clients, and business all in one place.</p>
          {!isPremium && (
            <p className="text-sm text-amber-600 mt-2">
              You're on the basic plan. Upgrade to Pro to access premium features for you and your clients.
            </p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <DashboardSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            messageRequests={messageRequests}
          />

          <div className="col-span-12 lg:col-span-9">
            {activeTab === "overview" && (
              <OverviewTab 
                upcomingSessions={upcomingSessions} 
                clients={clients} 
                messageRequests={messageRequests}
              />
            )}

            {activeTab === "sessions" && (
              <SessionsTab upcomingSessions={upcomingSessions} />
            )}

            {activeTab === "clients" && (
              <ClientsTab clients={clients} />
            )}
            
            {activeTab === "programs" && (
              <ProgramsTab />
            )}

            {activeTab === "messages" && (
              <MessagesTab messageRequests={messageRequests} />
            )}

            {activeTab === "settings" && (
              <SettingsTab user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
