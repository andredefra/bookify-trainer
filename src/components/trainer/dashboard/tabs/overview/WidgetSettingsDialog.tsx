import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { WIDGET_CATALOG, getCoreWidgetIds } from "./widgetConfig";
import { RotateCcw } from "lucide-react";
import { useTrainerPlan } from "@/context/TrainerPlanContext";

const BASIC_HIDDEN_WIDGETS = ["expiration-alerts", "revenue-chart", "package-sales", "goals"];

interface WidgetSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enabledWidgets: string[];
  onToggleWidget: (widgetId: string) => void;
  onReset: () => void;
}

export function WidgetSettingsDialog({
  open,
  onOpenChange,
  enabledWidgets,
  onToggleWidget,
  onReset
}: WidgetSettingsDialogProps) {
  const plan = useTrainerPlan();
  const filtered = plan === "basic"
    ? WIDGET_CATALOG.filter((w) => !BASIC_HIDDEN_WIDGETS.includes(w.id))
    : WIDGET_CATALOG;
  const coreWidgets = filtered.filter(w => w.isCore);
  const optionalWidgets = filtered.filter(w => !w.isCore);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Dashboard Widgets</DialogTitle>
          <DialogDescription>
            Configure which widgets to display on your dashboard. Core widgets are always visible but can be reordered.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Core Widgets */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Core Widgets</h4>
            <div className="space-y-3">
              {coreWidgets.map(widget => (
                <div key={widget.id} className="flex items-center justify-between">
                  <Label htmlFor={widget.id} className="text-sm font-normal">
                    {widget.title}
                  </Label>
                  <Switch
                    id={widget.id}
                    checked={true}
                    disabled={true}
                    className="opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Optional Widgets */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Optional Widgets</h4>
            <div className="space-y-3">
              {optionalWidgets.map(widget => (
                <div key={widget.id} className="flex items-center justify-between">
                  <Label htmlFor={widget.id} className="text-sm font-normal cursor-pointer">
                    {widget.title}
                  </Label>
                  <Switch
                    id={widget.id}
                    checked={enabledWidgets.includes(widget.id)}
                    onCheckedChange={() => onToggleWidget(widget.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Default
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
