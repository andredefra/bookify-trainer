
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from "./SidebarNavigation";

interface DesktopSidebarProps {
  activeTab: string;
  handleTabClick: (tab: string) => void;
}

export function DesktopSidebar({ activeTab, handleTabClick }: DesktopSidebarProps) {
  return (
    <div
      className={cn(
        "pb-12 w-20 md:w-60 flex-shrink-0 bg-white border-r hidden lg:block relative"
      )}
    >
      <ScrollArea className="py-6 h-full">
        <div className="flex flex-col flex-1 space-y-1 px-2 md:px-6">
          <SidebarNavigation 
            activeTab={activeTab} 
            handleTabClick={handleTabClick} 
          />
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
