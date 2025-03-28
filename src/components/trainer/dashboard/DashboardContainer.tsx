
import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { OverviewTab } from "./tabs/OverviewTab";
import { ClientsTab } from "./tabs/ClientsTab";
import { ProgramsTab } from "./tabs/ProgramsTab";
import { SessionsTab } from "./tabs/SessionsTab";
import { MessagesTab } from "./tabs/MessagesTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { TransactionsTab } from "./tabs/TransactionsTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { useMediaQuery } from "@/hooks/use-mobile";
import { TrainerSessionItem } from "@/types/sessions";

interface DashboardContainerProps {
  customName?: string;
}

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
}

interface MessageItem {
  id: number;
  from: string;
  preview: string;
  time: string;
}

// Mock data for the dashboard
const mockUpcomingSessions: TrainerSessionItem[] = [
  {
    id: 1,
    name: "Group HIIT Class",
    date: "May 10, 2023",
    time: "10:00 AM - 11:00 AM",
    participants: 8,
    maxParticipants: 12,
    waitingList: 2,
    paymentStatus: {
      paid: 6,
      pending: 2,
      total: 8
    }
  },
  {
    id: 2,
    name: "Personal Training - John",
    date: "May 11, 2023",
    time: "2:00 PM - 3:00 PM",
    participants: 1,
    maxParticipants: 1,
    waitingList: 0,
    paymentStatus: {
      paid: 1,
      pending: 0,
      total: 1
    }
  },
  {
    id: 3,
    name: "Yoga Fundamentals",
    date: "May 12, 2023",
    time: "9:00 AM - 10:00 AM",
    participants: 10,
    maxParticipants: 15,
    waitingList: 0,
    paymentStatus: {
      paid: 8,
      pending: 2,
      total: 10
    }
  }
];

const mockClients: ClientItem[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    sessions: 12,
    lastSession: "2 days ago"
  },
  {
    id: 2,
    name: "Mike Peterson",
    sessions: 8,
    lastSession: "1 week ago"
  },
  {
    id: 3,
    name: "Emma Thompson",
    sessions: 24,
    lastSession: "Yesterday"
  },
  {
    id: 4,
    name: "John Davis",
    sessions: 5,
    lastSession: "3 days ago"
  }
];

const mockMessageRequests: MessageItem[] = [
  {
    id: 1,
    from: "Sarah Johnson",
    preview: "Hi, I need to reschedule my session for tomorrow.",
    time: "10 min ago"
  },
  {
    id: 2,
    from: "Mike Peterson",
    preview: "Thanks for the great session yesterday! I have a question about my workout plan.",
    time: "2 hours ago"
  },
  {
    id: 3,
    from: "Emma Thompson",
    preview: "I'd like to book additional sessions this month. Do you have availability?",
    time: "1 day ago"
  }
];

export function DashboardContainer({ customName }: DashboardContainerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Get user data from localStorage
  const storedUser = localStorage.getItem('demo-user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const name = user?.name || customName || "Trainer";

  const handleLogout = () => {
    localStorage.removeItem('demo-user');
    window.location.href = '/';
  };

  const mockUserData = {
    name: name,
    email: "trainer@personal.ai",
    type: "trainer",
    plan: "pro",
    profileImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab 
          upcomingSessions={mockUpcomingSessions} 
          clients={mockClients} 
          messageRequests={mockMessageRequests} 
        />;
      case "clients":
        return <ClientsTab clients={mockClients} />;
      case "programs":
        return <ProgramsTab />;
      case "sessions":
        return <SessionsTab upcomingSessions={mockUpcomingSessions} />;
      case "messages":
        return <MessagesTab messageRequests={mockMessageRequests} />;
      case "transactions":
        return <TransactionsTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "settings":
        return <SettingsTab user={mockUserData} />;
      default:
        return <OverviewTab 
          upcomingSessions={mockUpcomingSessions} 
          clients={mockClients} 
          messageRequests={mockMessageRequests} 
        />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader
          name={name}
          onLogout={handleLogout}
          onMobileMenuClick={() => setShowSidebar(!showSidebar)}
          showMobileMenuButton={!isDesktop}
        />

        <main className="flex-1 overflow-y-auto pb-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
