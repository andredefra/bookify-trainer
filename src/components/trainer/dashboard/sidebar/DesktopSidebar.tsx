
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from "./SidebarNavigation";
import { TrainerSessionItem } from "@/types/sessions";

interface DesktopSidebarProps {
  activeTab: string;
  handleTabClick: (tab: string) => void;
  upcomingSessions?: TrainerSessionItem[];
}

export function DesktopSidebar({ activeTab, handleTabClick, upcomingSessions = [] }: DesktopSidebarProps) {
  // Get the first two upcoming sessions to display in sidebar
  const nextSessions = upcomingSessions.slice(0, 2);
  
  return (
    <div
      className={cn(
        // Responsive width: icon-only on tablet, full width on desktop
        "pb-12 w-16 md:w-20 lg:w-60 xl:w-64 flex-shrink-0 bg-white border-r hidden md:block relative",
        "transition-all duration-200 ease-in-out"
      )}
    >
      <ScrollArea className="py-6 h-full">
        <div className="flex flex-col flex-1 space-y-1 px-2 lg:px-6">
          <SidebarNavigation 
            activeTab={activeTab} 
            handleTabClick={handleTabClick} 
          />
        </div>
        <Separator className="my-4 lg:mb-4 lg:mt-6" />
        <div className="px-2 lg:px-6">
          <div className="text-xs lg:text-sm font-medium text-muted-foreground hidden lg:block mb-2">
            Upcoming
          </div>
          <div className="lg:flex flex-col space-y-1 hidden">
            {nextSessions.length > 0 ? (
              nextSessions.map((session) => {
                // Format date if it's a Date object
                const formattedDate = session.date instanceof Date 
                  ? session.date.toLocaleDateString() 
                  : session.date;
                
                return (
                  <Button key={session.id} variant="ghost" className="justify-start cursor-default">
                    <div className="flex flex-col items-start">
                      <span className="text-xs">{session.name}</span>
                      <span className="text-xs text-muted-foreground">{formattedDate}, {session.time.split(' - ')[0]}</span>
                    </div>
                  </Button>
                );
              })
            ) : (
              <Button variant="ghost" className="justify-start cursor-default">
                <div className="flex flex-col items-start">
                  <span className="text-xs">No upcoming sessions</span>
                </div>
              </Button>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
