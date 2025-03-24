
import { Calendar, Users, MessageSquare, Settings, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  messageRequests: { id: number; from: string; preview: string; time: string }[];
}

export function DashboardSidebar({ activeTab, setActiveTab, messageRequests }: DashboardSidebarProps) {
  return (
    <div className="col-span-12 lg:col-span-3">
      <Card>
        <CardContent className="p-0">
          <nav className="flex flex-col divide-y divide-border">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "overview" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              <span>Overview</span>
            </button>
            <button 
              onClick={() => setActiveTab("sessions")}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "sessions" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Clock className="w-5 h-5 mr-3" />
              <span>Sessions</span>
            </button>
            <button 
              onClick={() => setActiveTab("clients")}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "clients" ? "bg-primary/5 text-primary" : ""}`}
            >
              <Users className="w-5 h-5 mr-3" />
              <span>Clients</span>
            </button>
            <button 
              onClick={() => setActiveTab("messages")}
              className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${activeTab === "messages" ? "bg-primary/5 text-primary" : ""}`}
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              <span>Messages</span>
              {messageRequests.length > 0 && (
                <Badge className="ml-auto">{messageRequests.length}</Badge>
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
      
      <TrainerStatusCard />
    </div>
  );
}

function TrainerStatusCard() {
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Availability</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Active
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI Assistant</span>
            <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200">
              Off
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Sessions Today</span>
            <span className="font-medium">3</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
