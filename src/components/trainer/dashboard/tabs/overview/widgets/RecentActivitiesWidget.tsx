import { BaseWidget } from "./BaseWidget";
import { Activity, Calendar, MessageSquare, CreditCard, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ActivityItem {
  id: string;
  type: "session" | "program" | "message" | "payment" | "client";
  client: string;
  action: string;
  time: string;
}

export function RecentActivitiesWidget() {
  const allActivities: ActivityItem[] = [
    { id: "1", type: "session", client: "Marco Rossi", action: "Session completed", time: "1h ago" },
    { id: "2", type: "program", client: "Anna Bianchi", action: "New program assigned", time: "2h ago" },
    { id: "3", type: "message", client: "Luca Verdi", action: "Message received", time: "3h ago" },
    { id: "4", type: "payment", client: "Sofia Nero", action: "Payment received €150", time: "1d ago" },
    { id: "5", type: "client", client: "Giovanni Blu", action: "New client added", time: "1d ago" },
    { id: "6", type: "session", client: "Maria Rosa", action: "Session scheduled", time: "2d ago" },
    { id: "7", type: "payment", client: "Paolo Verde", action: "Payment received €200", time: "2d ago" },
    { id: "8", type: "program", client: "Laura Gialla", action: "Program updated", time: "3d ago" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "session":
        return Calendar;
      case "program":
        return Activity;
      case "message":
        return MessageSquare;
      case "payment":
        return CreditCard;
      case "client":
        return UserPlus;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "session":
        return "text-blue-500 bg-blue-50";
      case "program":
        return "text-green-500 bg-green-50";
      case "message":
        return "text-purple-500 bg-purple-50";
      case "payment":
        return "text-yellow-500 bg-yellow-50";
      case "client":
        return "text-orange-500 bg-orange-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const filterActivities = (type?: string) => {
    if (!type) return allActivities;
    return allActivities.filter(a => a.type === type);
  };

  const ActivityList = ({ activities }: { activities: ActivityItem[] }) => (
    <div className="space-y-3">
      {activities.slice(0, 8).map((activity) => {
        const Icon = getActivityIcon(activity.type);
        const colorClass = getActivityColor(activity.type);

        return (
          <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
            <div className={`p-2 rounded-lg ${colorClass}`}>
              <Icon className="h-4 w-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.client}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
            </div>

            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <BaseWidget
      title="Recent Activities"
      icon={Activity}
      className="col-span-full lg:col-span-2"
    >
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="session">Sessions</TabsTrigger>
          <TabsTrigger value="payment">Payments</TabsTrigger>
          <TabsTrigger value="program">Programs</TabsTrigger>
          <TabsTrigger value="message">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <ActivityList activities={filterActivities()} />
        </TabsContent>
        
        <TabsContent value="session" className="mt-4">
          <ActivityList activities={filterActivities("session")} />
        </TabsContent>
        
        <TabsContent value="payment" className="mt-4">
          <ActivityList activities={filterActivities("payment")} />
        </TabsContent>
        
        <TabsContent value="program" className="mt-4">
          <ActivityList activities={filterActivities("program")} />
        </TabsContent>
        
        <TabsContent value="message" className="mt-4">
          <ActivityList activities={filterActivities("message")} />
        </TabsContent>
      </Tabs>

      <Button variant="outline" className="w-full mt-4">
        Load More Activities
      </Button>
    </BaseWidget>
  );
}
