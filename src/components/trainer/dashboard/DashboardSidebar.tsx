
import { useMediaQuery } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  MessageSquare,
  Settings,
  CreditCard,
  LineChart
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface DashboardSidebarProps {
  showSidebar: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({
  showSidebar,
  activeTab,
  setActiveTab,
}: DashboardSidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!showSidebar && !isDesktop) {
    return null;
  }

  const navigationItems = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      href: "overview",
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
    <div
      className={cn(
        "pb-12 w-20 md:w-60 flex-shrink-0 bg-white border-r",
        isDesktop ? "relative block" : "fixed inset-y-0 left-0 z-10"
      )}
    >
      <ScrollArea className="py-6 h-full">
        <div className="flex flex-col flex-1 space-y-1 px-2 md:px-6">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              variant={activeTab === item.href ? "default" : "ghost"}
              className={cn(
                "justify-start",
                !isDesktop && "justify-center md:justify-start"
              )}
              onClick={() => setActiveTab(item.href)}
            >
              <item.icon className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline-flex">{item.title}</span>
            </Button>
          ))}
        </div>
        <Separator className="my-4 md:mb-4 md:mt-6" />
        <div className="px-2 md:px-6">
          <div className="text-xs md:text-sm font-medium text-muted-foreground hidden md:block mb-2">
            Upcoming
          </div>
          <div className="md:flex flex-col space-y-1 hidden">
            <Button variant="ghost" className="justify-start cursor-default">
              <div className="flex flex-col items-start">
                <span className="text-xs">Sarah J. Session</span>
                <span className="text-xs text-muted-foreground">Today, 2:00 PM</span>
              </div>
            </Button>
            <Button variant="ghost" className="justify-start cursor-default">
              <div className="flex flex-col items-start">
                <span className="text-xs">Mike P. Session</span>
                <span className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</span>
              </div>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
