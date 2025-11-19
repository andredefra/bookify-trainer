import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, GripVertical } from "lucide-react";

interface BaseWidgetProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function BaseWidget({
  title,
  description,
  icon: Icon,
  action,
  children,
  className,
  contentClassName
}: BaseWidgetProps) {
  return (
    <Card className={cn("flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="widget-drag-handle p-1 -ml-2 rounded hover:bg-muted cursor-move">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {action}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("flex-1 overflow-y-auto", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
