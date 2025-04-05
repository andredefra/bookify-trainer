
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, Bell, Circle, LogOut } from "lucide-react";
import { StatusSelector } from "./header/StatusSelector";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { HeaderActions } from "./header/HeaderActions";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface DashboardHeaderProps {
  name: string;
  onLogout: () => void;
  onMobileMenuClick: () => void;
  showMobileMenuButton: boolean;
}

export function DashboardHeader({
  name,
  onLogout,
  onMobileMenuClick,
  showMobileMenuButton
}: DashboardHeaderProps) {
  // Default profile image
  const defaultImage = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80";

  // State to track current status
  const [status, setStatus] = useState<"online" | "in-session" | "offline">("online");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  // Load status from localStorage on component mount
  useEffect(() => {
    const savedStatus = localStorage.getItem('trainer-status');
    if (savedStatus && ["online", "in-session", "offline"].includes(savedStatus)) {
      setStatus(savedStatus as "online" | "in-session" | "offline");
    }
  }, []);

  // Listen for status changes from other components
  useEffect(() => {
    const handleStatusChange = (event: CustomEvent) => {
      const newStatus = event.detail;
      if (newStatus && ["online", "in-session", "offline"].includes(newStatus)) {
        setStatus(newStatus as "online" | "in-session" | "offline");
      }
    };

    window.addEventListener('trainer-status-change', handleStatusChange as EventListener);
    
    return () => {
      window.removeEventListener('trainer-status-change', handleStatusChange as EventListener);
    };
  }, []);

  // Get status color for the indicator
  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "text-emerald-500 fill-emerald-500";
      case "in-session":
        return "text-amber-500 fill-amber-500";
      case "offline":
        return "text-slate-500 fill-slate-500";
    }
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem('demo-user');
    
    // Show success toast
    toast.success("Logged out successfully!");
    
    // Execute the passed onLogout function
    onLogout();
    
    // Navigate to the landing page
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {showMobileMenuButton && (
              <Button variant="ghost" size="icon" onClick={onMobileMenuClick}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <span className="font-display text-xl font-bold text-primary">MyPersonal.fit</span>
          </div>
          
          <HeaderActions
            displayName={name}
            status={status}
            onLogout={handleLogout}
            user={{
              name,
              email: `${name.toLowerCase()}@example.com`,
              type: "trainer",
              plan: "pro"
            }}
          />
        </div>
      </div>
    </header>
  );
}

