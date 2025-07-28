import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  LayoutDashboard, 
  Calendar,
  BookOpen,
  BarChart3,
  Users,
  MessageCircle,
  Settings,
  X,
  LogOut,
  User
} from "lucide-react";

interface User {
  name?: string;
  email: string;
  type: string;
  plan?: string;
}

interface UserSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  user: User;
  onLogout: () => void;
}

// Sidebar items based on MVP specifications
const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "training-program", label: "Training Program", icon: Calendar },
  { id: "training-log", label: "Training Log", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "my-trainers", label: "My Trainers", icon: Users },
  { id: "messages", label: "Messages", icon: MessageCircle, badge: true },
  { id: "settings", label: "Settings", icon: Settings },
];

export function UserSidebar({
  activeTab,
  setActiveTab,
  showSidebar,
  setShowSidebar,
  user,
  onLogout
}: UserSidebarProps) {
  const isMobile = useIsMobile();
  
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative lg:translate-x-0 z-50 lg:z-auto
        w-72 h-full bg-white border-r border-border
        transition-transform duration-300 ease-in-out
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? 'top-16' : 'top-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          {isMobile && (
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* User Profile Section */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-white">
                  {getUserInitials(user.name, user.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {user.name || user.email}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">
                    {user.plan || 'Free'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start space-x-3 ${
                  activeTab === item.id 
                    ? "bg-primary text-white" 
                    : "hover:bg-muted"
                }`}
                onClick={() => handleTabClick(item.id)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    1
                  </span>
                )}
              </Button>
            ))}
          </nav>

          <Separator />

          {/* Quick Stats */}
          <div className="p-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-foreground mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Workouts this week</span>
                    <span className="text-xs font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Goals completed</span>
                    <span className="text-xs font-medium">2/3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Current streak</span>
                    <span className="text-xs font-medium">7 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Logout Button */}
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}