import { BaseWidget } from "./BaseWidget";
import { Button } from "@/components/ui/button";
import { UserPlus, Calendar, Package, MessageSquare, CreditCard, Target } from "lucide-react";

interface QuickActionsWidgetProps {
  onAddClient?: () => void;
  onScheduleSession?: () => void;
  onCreatePackage?: () => void;
  onSendMessage?: () => void;
  onRecordPayment?: () => void;
  onSetGoal?: () => void;
}

export function QuickActionsWidget({
  onAddClient,
  onScheduleSession,
  onCreatePackage,
  onSendMessage,
  onRecordPayment,
  onSetGoal
}: QuickActionsWidgetProps) {
  const actions = [
    {
      id: "add-client",
      label: "Add Client",
      icon: UserPlus,
      onClick: onAddClient,
      variant: "default" as const
    },
    {
      id: "schedule-session",
      label: "Schedule",
      icon: Calendar,
      onClick: onScheduleSession,
      variant: "secondary" as const
    },
    {
      id: "create-package",
      label: "New Package",
      icon: Package,
      onClick: onCreatePackage,
      variant: "outline" as const
    },
    {
      id: "send-message",
      label: "Message",
      icon: MessageSquare,
      onClick: onSendMessage,
      variant: "outline" as const
    },
    {
      id: "record-payment",
      label: "Payment",
      icon: CreditCard,
      onClick: onRecordPayment,
      variant: "outline" as const
    },
    {
      id: "set-goal",
      label: "Set Goal",
      icon: Target,
      onClick: onSetGoal,
      variant: "outline" as const
    }
  ];

  return (
    <BaseWidget title="Quick Actions">
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
