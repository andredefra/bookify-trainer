import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, Repeat } from "lucide-react";

type BuilderMode = "weekly" | "daily";

interface BuilderModeToggleProps {
  mode: BuilderMode;
  onModeChange: (mode: BuilderMode) => void;
}

export function BuilderModeToggle({ mode, onModeChange }: BuilderModeToggleProps) {
  return (
    <div className="flex items-center justify-center mb-4">
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(value) => value && onModeChange(value as BuilderMode)}
        className="bg-muted p-1 rounded-lg"
      >
        <ToggleGroupItem
          value="weekly"
          aria-label="Weekly Pattern"
          className="px-4 py-2 data-[state=on]:bg-background data-[state=on]:shadow-sm"
        >
          <Repeat className="h-4 w-4 mr-2" />
          Weekly Pattern
        </ToggleGroupItem>
        <ToggleGroupItem
          value="daily"
          aria-label="Daily Schedule"
          className="px-4 py-2 data-[state=on]:bg-background data-[state=on]:shadow-sm"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Daily Schedule
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
