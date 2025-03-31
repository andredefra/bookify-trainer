
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface DurationSelectorProps {
  duration: string;
  onDurationChange: (duration: string) => void;
}

export function DurationSelector({ duration, onDurationChange }: DurationSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
      <div className="relative">
        <Input
          type="number"
          value={duration}
          onChange={(e) => onDurationChange(e.target.value)}
          placeholder="e.g., 45"
          className="w-full pl-9"
        />
        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
}
