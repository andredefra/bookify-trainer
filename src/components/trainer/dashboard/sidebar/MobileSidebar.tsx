
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { StatusSelector } from "./StatusSelector";
import { SidebarNavigation } from "./SidebarNavigation";

interface MobileSidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  activeTab: string;
  handleTabClick: (tab: string) => void;
}

export function MobileSidebar({ 
  showSidebar, 
  setShowSidebar, 
  activeTab, 
  handleTabClick 
}: MobileSidebarProps) {
  // Default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";

  return (
    <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
      <SheetContent side="left" className="p-0 w-[270px] max-w-[80vw]">
        <div className="flex flex-col h-full">
          {/* Mobile sidebar header with profile info */}
          <div className="border-b p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={defaultImage} alt="Trainer" />
                  <AvatarFallback>T</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Trainer</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary text-xs h-5 mt-1">
                    Pro
                  </Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSidebar(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Status selector */}
            <div className="mt-3">
              <StatusSelector />
            </div>
          </div>
          
          {/* Navigation menu */}
          <ScrollArea className="flex-1">
            <SidebarNavigation activeTab={activeTab} handleTabClick={handleTabClick} />
            
            <Separator className="my-4" />
            
            {/* Upcoming sessions section */}
            <div className="p-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Upcoming
              </div>
              <div className="flex flex-col space-y-2">
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-sm font-medium">Sarah J. Session</p>
                  <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-sm font-medium">Mike P. Session</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
