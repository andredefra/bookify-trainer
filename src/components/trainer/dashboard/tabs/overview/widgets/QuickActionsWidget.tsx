import { BaseWidget } from "./BaseWidget";
import { Button } from "@/components/ui/button";
import { UserPlus, Calendar, Package, MessageSquare, CreditCard, Target } from "lucide-react";
import { QuickAction } from "./types";

export function QuickActionsWidget() {
  const actions: QuickAction[] = [
    {
      id: "add-client",
      label: "Add Client",
      icon: UserPlus,
      onClick: () => console.log("Add client"),
      variant: "default"
    },
    {
      id: "schedule-session",
      label: "Schedule",
      icon: Calendar,
      onClick: () => console.log("Schedule"),
      variant: "secondary"
    },
    {
      id: "create-package",
      label: "New Package",
      icon: Package,
      onClick: () => console.log("New package"),
      variant: "outline"
    },
    {
      id: "send-message",
      label: "Message",
      icon: MessageSquare,
      onClick: () => console.log("Message"),
      variant: "outline"
    },
    {
      id: "record-payment",
      label: "Payment",
      icon: CreditCard,
      onClick: () => console.log("Payment"),
      variant: "outline"
    },
    {
      id: "set-goal",
      label: "Set Goal",
      icon: Target,
      onClick: () => console.log("Set goal"),
      variant: "outline"
    }
  ];

  return (
    <BaseWidget title="Quick Actions" className="col-span-full lg:col-span-1">
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant={action.variant}
              onClick={action.onClick}
              className="h-auto py-4 flex flex-col items-center gap-2"
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </BaseWidget>
  );
}
