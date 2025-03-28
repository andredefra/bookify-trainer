
import { useState, useEffect } from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusSelectorProps {
  className?: string;
  defaultStatus?: "online" | "in-session" | "offline";
}

export function StatusSelector({ className, defaultStatus = "online" }: StatusSelectorProps) {
  const [status, setStatus] = useState<"online" | "in-session" | "offline">(() => {
    // Load status from localStorage if available
    const savedStatus = localStorage.getItem('trainer-status');
    if (savedStatus && ["online", "in-session", "offline"].includes(savedStatus)) {
      return savedStatus as "online" | "in-session" | "offline";
    }
    return defaultStatus;
  });

  useEffect(() => {
    // Sync status with localStorage when component mounts
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

  return (
    <Select value={status} onValueChange={(value) => handleStatusChange(value as "online" | "in-session" | "offline")}>
      <SelectTrigger className={cn("w-full h-9", className)}>
        <div className="flex items-center space-x-2">
          <Circle className={cn("h-3 w-3 fill-current", {
            "text-emerald-500": status === "online",
            "text-amber-500": status === "in-session",
            "text-slate-500": status === "offline",
          })} />
          <span>
            {status === "online" ? "Available" : 
             status === "in-session" ? "In Session" : "Offline"}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="online">
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
  );
}
