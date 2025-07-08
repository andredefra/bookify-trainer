
import { Badge } from "@/components/ui/badge";

interface TabBadgeProps {
  count: number;
}

export function TabBadge({ count }: TabBadgeProps) {
  // Only show badge if there are actual search results
  if (count <= 0) return null;
  
  return (
    <Badge 
      variant="secondary" 
      className="ml-1 bg-primary/10 text-primary absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full border border-primary/20"
    >
      {count > 99 ? '99+' : count}
    </Badge>
  );
}
