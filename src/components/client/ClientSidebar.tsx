
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home,
  Calendar,
  Package,
  Dumbbell,
  BookOpen,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mobile";

interface ClientSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

export function ClientSidebar({ 
  activeTab, 
  setActiveTab, 
  showSidebar, 
  setShowSidebar 
}: ClientSidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const navigationItems = [
    {
      title: "Overview",
      icon: Home,
      href: "overview",
    },
    {
      title: "Sessions",
      icon: Calendar,
      href: "sessions",
    },
    {
      title: "My Packages",
      icon: Package,
      href: "packages",
      badge: 2,
    },
    {
      title: "Training Program",
      icon: Dumbbell,
      href: "training-program",
    },
    {
      title: "Training Log",
      icon: BookOpen,
      href: "training-log",
    },
    {
      title: "Trainers",
      icon: Users,
      href: "trainers",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "analytics",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "messages",
      badge: 2,
    },
    {
      title: "Settings",
      icon: Settings,
      href: "settings",
    },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (!isDesktop) {
      setShowSidebar(false);
    }
  };

  // Desktop sidebar
  if (isDesktop) {
    return (
      <aside className="w-64 bg-white border-r border-border flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant={activeTab === item.href ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabClick(item.href)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
                {item.badge && (
                  <Badge className="ml-auto">{item.badge}</Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
    );
  }

  // Mobile sidebar
  return (
    <>
      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-white border-r border-border z-50 transform transition-transform duration-200 ease-in-out lg:hidden",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant={activeTab === item.href ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleTabClick(item.href)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.title}
                {item.badge && (
                  <Badge className="ml-auto">{item.badge}</Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
