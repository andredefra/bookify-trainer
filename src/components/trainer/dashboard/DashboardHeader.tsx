
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Circle, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  name?: string;
  customName?: string;
  onMobileMenuClick: () => void;
  user?: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
  onLogout?: () => void;
}

export function DashboardHeader({ name, customName, onMobileMenuClick, user, onLogout }: DashboardHeaderProps) {
  const [status, setStatus] = useState<"online" | "in-session" | "offline">("online");
  const displayName = user?.name || name || customName || "Trainer";
  // Use the same default image as in ProfileSection
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";

  useEffect(() => {
    // Load status from localStorage if available
    const savedStatus = localStorage.getItem('trainer-status');
    if (savedStatus && ["online", "in-session", "offline"].includes(savedStatus)) {
      setStatus(savedStatus as "online" | "in-session" | "offline");
    }
  }, []);

  const handleStatusChange = (newStatus: "online" | "in-session" | "offline") => {
    setStatus(newStatus);
    // Save status to localStorage
    localStorage.setItem('trainer-status', newStatus);
    
    // Show toast notification
    const statusMessages = {
      "online": "You're now shown as available to clients",
      "in-session": "You're now shown as in a session",
      "offline": "You're now shown as offline to clients"
    };
    
    toast.success(statusMessages[newStatus]);
  };

  // Create a dummy user if none provided for backward compatibility
  const dummyUser = user || {
    name: displayName,
    email: "trainer@example.com",
    type: "trainer"
  };
  
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="font-display text-xl font-bold text-primary">Personal.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Select value={status} onValueChange={(value) => handleStatusChange(value as "online" | "in-session" | "offline")}>
                  <SelectTrigger className="w-[140px] h-8">
                    <SelectValue placeholder="Set your status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online" className="flex items-center">
                      <div className="flex items-center">
                        <Circle className="h-3 w-3 mr-2 text-emerald-500 fill-emerald-500" />
                        <span>Available</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="in-session">
                      <div className="flex items-center">
                        <Circle className="h-3 w-3 mr-2 text-amber-500 fill-amber-500" />
                        <span>In Session</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="offline">
                      <div className="flex items-center">
                        <Circle className="h-3 w-3 mr-2 text-slate-500 fill-slate-500" />
                        <span>Offline</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImage || defaultImage} alt={displayName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{displayName}</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {dummyUser.type === 'trainer' ? 'Trainer' : 'Client'}
              </Badge>
              {dummyUser.plan && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {dummyUser.plan === 'pro' ? 'Pro Plan' : 'Freemium'}
                </Badge>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              Log out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
