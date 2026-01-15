import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeltaBadgeProps {
  current: number;
  previous: number | null;
  unit: string;
  invert?: boolean; // For weight loss goals where decrease is positive
  className?: string;
}

export function DeltaBadge({ current, previous, unit, invert = false, className }: DeltaBadgeProps) {
  if (previous === null || previous === undefined) {
    return null;
  }

  const delta = current - previous;
  const absDelta = Math.abs(delta);
  
  // Skip if no change or very minimal change
  if (absDelta < 0.01) {
    return (
      <span className={cn(
        "inline-flex items-center gap-1 text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-muted",
        className
      )}>
        <Minus className="h-3 w-3" />
        No change
      </span>
    );
  }

  const isDecrease = delta < 0;
  // For weight/waist, decrease is usually good. For muscle, increase is good.
  const isPositiveChange = invert ? isDecrease : !isDecrease;

  return (
    <span className={cn(
      "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
      isPositiveChange 
        ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30" 
        : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
      className
    )}>
      {isDecrease ? (
        <TrendingDown className="h-3 w-3" />
      ) : (
        <TrendingUp className="h-3 w-3" />
      )}
      {isDecrease ? "↓" : "↑"} {absDelta.toFixed(1)}{unit}
    </span>
  );
}
