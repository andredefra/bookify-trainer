
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  MessageSquare,
  Settings,
  CreditCard,
  LineChart,
  FolderKanban
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mobile";

interface SidebarNavigationProps {
  activeTab: string;
  handleTabClick: (tab: string) => void;
}

export function SidebarNavigation({ activeTab, handleTabClick }: SidebarNavigationProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const navigationItems = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      href: "overview",
    },
    {
      title: "Vendite",
      icon: FolderKanban,
      href: "sales",
    },
    {
      title: "Clients",
      icon: Users,
      href: "clients",
    },
    {
      title: "Programs",
      icon: Dumbbell,
      href: "programs",
    },
    {
      title: "Sessions",
      icon: Calendar,
      href: "sessions",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "messages",
      badge: 3,
    },
    {
      title: "Transactions",
      icon: CreditCard,
      href: "transactions",
    },
    {
      title: "Analytics",
      icon: LineChart,
      href: "analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "settings",
    },
  ];

  return (
    <div className="flex flex-col space-y-1 p-2">
      {navigationItems.map((item) => (
        <Button
          key={item.href}
          variant={activeTab === item.href ? "default" : "ghost"}
          className={cn(
            "justify-start relative",
            !isDesktop && "justify-center md:justify-start"
          )}
          onClick={() => handleTabClick(item.href)}
          type="button" 
          tabIndex={0}
          data-lpignore="true"
        >
          <item.icon className="w-5 h-5 md:mr-2" />
          <span className="hidden md:inline-flex">{item.title}</span>
          {item.badge && (
            <Badge className="ml-auto">{item.badge}</Badge>
          )}
        </Button>
      ))}
    </div>
  );
}
