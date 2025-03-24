
import { Calendar, MessageSquare, Settings, Users, Dumbbell, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  messageRequests: {
    id: number;
    from: string;
    preview: string;
    time: string;
  }[];
}

export function DashboardSidebar({ activeTab, setActiveTab, messageRequests }: DashboardSidebarProps) {
  const navItems = [
    {
      name: "overview",
      label: "Overview",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: "sessions",
      label: "Sessions",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "clients",
      label: "Clients",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "programs",
      label: "Programs",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      name: "messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      notification: messageRequests.length > 0 ? messageRequests.length : undefined,
    },
    {
      name: "settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="col-span-12 lg:col-span-3">
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant={activeTab === item.name ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === item.name ? "" : "text-muted-foreground"}`}
                  onClick={() => setActiveTab(item.name)}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                  {item.notification && (
                    <span className="ml-auto bg-primary text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                      {item.notification}
                    </span>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
