
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientProfile } from "@/components/ClientProfile";
import { ClientProfileTabContent } from "./ClientProfileTabs/ClientProfileTabContent";
import { ProfileDialogFooter } from "./ClientProfileTabs/ProfileDialogFooter";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock client details for demonstration
const mockClientDetails = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  since: "March 2023",
  sessions: 12,
  goals: ["Lose 5kg", "Run 10K", "Strength Training"],
  lastActivity: "Yesterday",
  upcomingSessions: ["Personal Training - Tomorrow at 10:00 AM"],
  weight: "65kg",
  height: "168cm",
  bodyFat: "24%",
  notes: "Prefers morning sessions. Has a previous knee injury to be mindful of."
};

interface ClientProfileDialogProps {
  client: {
    id: number;
    name: string;
    sessions: number;
    lastSession: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientProfileDialog({ client, open, onOpenChange }: ClientProfileDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  if (!client) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Client Profile</DialogTitle>
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search client information..." 
              className="w-full pl-9 bg-muted/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar with client profile summary */}
          <div>
            <ClientProfile 
              name={client.name}
              email={mockClientDetails.email}
              since={mockClientDetails.since}
              sessions={client.sessions}
              goals={mockClientDetails.goals}
            />
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2">
            <ClientProfileTabContent 
              client={client}
              mockClientDetails={mockClientDetails}
              searchQuery={searchQuery}
            />
          </div>
        </div>
        
        <ProfileDialogFooter onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
