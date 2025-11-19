import { BaseWidget } from "./BaseWidget";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Calendar, MessageSquare, CreditCard, Target } from "lucide-react";
import { ClientActivity } from "./types";
import { Button } from "@/components/ui/button";

export function ClientActivityWidget() {
  const activities: ClientActivity[] = [
    {
      id: "1",
      clientName: "Marco Rossi",
      action: "Completed workout session",
      type: "session",
      timestamp: "2025-11-19T14:30:00",
      relativeTime: "2h ago"
    },
    {
      id: "2",
      clientName: "Anna Bianchi",
      action: "Started new program: Strength Building",
      type: "program",
      timestamp: "2025-11-19T12:00:00",
      relativeTime: "4h ago"
    },
    {
      id: "3",
      clientName: "Luca Verdi",
      action: "Sent a message",
      type: "message",
      timestamp: "2025-11-19T10:15:00",
      relativeTime: "6h ago"
    },
    {
      id: "4",
      clientName: "Sofia Nero",
      action: "Payment received €150",
      type: "payment",
      timestamp: "2025-11-18T16:00:00",
      relativeTime: "1d ago"
    },
    {
      id: "5",
      clientName: "Giovanni Blu",
      action: "Achieved goal: Lose 5kg",
      type: "goal",
      timestamp: "2025-11-18T14:00:00",
      relativeTime: "1d ago"
    }
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
      case "goal":
        return Target;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "session":
        return "text-blue-500";
      case "program":
        return "text-green-500";
      case "message":
        return "text-purple-500";
      case "payment":
        return "text-yellow-500";
      case "goal":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <BaseWidget
      title="Client Activity"
      icon={Activity}
      className="col-span-full lg:col-span-1"
      action={
        <Button variant="ghost" size="sm">View All</Button>
      }
    >
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-accent`}>
                <Icon className={`h-4 w-4 ${colorClass}`} />
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <p className="text-sm font-medium">{activity.clientName}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.relativeTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </BaseWidget>
  );
}
