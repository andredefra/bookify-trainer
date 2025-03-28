
import { useState, useEffect } from "react";
import { Circle } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface StatusSelectorProps {
  initialStatus?: "online" | "in-session" | "offline";
}

export function StatusSelector({ initialStatus = "online" }: StatusSelectorProps) {
  const [status, setStatus] = useState<"online" | "in-session" | "offline">(initialStatus);

  useEffect(() => {
    const savedStatus = localStorage.getItem('trainer-status');
    if (savedStatus && ["online", "in-session", "offline"].includes(savedStatus)) {
      setStatus(savedStatus as "online" | "in-session" | "offline");
    }
  }, []);

  const handleStatusChange = (newStatus: "online" | "in-session" | "offline") => {
    setStatus(newStatus);
    localStorage.setItem('trainer-status', newStatus);
    
    const statusMessages = {
      "online": "You're now shown as available to clients",
      "in-session": "You're now shown as in a session",
      "offline": "You're now shown as offline to clients"
    };
    
    toast.success(statusMessages[newStatus]);
  };

  return (
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
  );
}
