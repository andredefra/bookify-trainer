
import { useState } from "react";
import { Calendar, User, MessageSquare, Settings, LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClientSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadMessageCount: number;
}

export function ClientSidebar({ activeTab, setActiveTab, unreadMessageCount }: ClientSidebarProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <nav className="flex flex-col divide-y divide-border">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "overview" ? "bg-primary/5 text-primary" : ""}`}
          >
            <LineChart className="w-5 h-5 mr-3" />
            <span>Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab("sessions")}
            className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "sessions" ? "bg-primary/5 text-primary" : ""}`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            <span>Sessions</span>
          </button>
          <button 
            onClick={() => setActiveTab("trainers")}
            className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "trainers" ? "bg-primary/5 text-primary" : ""}`}
          >
            <User className="w-5 h-5 mr-3" />
            <span>My Trainers</span>
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "messages" ? "bg-primary/5 text-primary" : ""}`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            <span>Messages</span>
            {unreadMessageCount > 0 && (
              <Badge className="ml-auto">{unreadMessageCount}</Badge>
            )}
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "settings" ? "bg-primary/5 text-primary" : ""}`}
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </button>
        </nav>
      </CardContent>
    </Card>
  );
}
