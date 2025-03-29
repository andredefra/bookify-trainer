
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabBadge } from "../shared/TabBadge";

interface ClientProfileTabListProps {
  activeTab: string;
  matchCounts: Record<string, number>;
  onTabChange: (value: string) => void;
}

export function ClientProfileTabList({ 
  activeTab, 
  matchCounts, 
  onTabChange 
}: ClientProfileTabListProps) {
  return (
    <ScrollArea className="w-full pb-1">
      <TabsList className="mb-4 w-max">
        <TabsTrigger 
          value="overview" 
          className="relative"
          onClick={() => onTabChange("overview")}
        >
          Overview
          <TabBadge count={matchCounts.overview} />
        </TabsTrigger>
        
        <TabsTrigger 
          value="goals" 
          className="relative"
          onClick={() => onTabChange("goals")}
        >
          Goals
          <TabBadge count={matchCounts.goals} />
        </TabsTrigger>
        
        <TabsTrigger 
          value="metrics" 
          className="relative"
          onClick={() => onTabChange("metrics")}
        >
          Metrics
          <TabBadge count={matchCounts.metrics} />
        </TabsTrigger>
        
        <TabsTrigger 
          value="programs" 
          className="relative"
          onClick={() => onTabChange("programs")}
        >
          Programs
          <TabBadge count={matchCounts.programs} />
        </TabsTrigger>
        
        <TabsTrigger 
          value="notes" 
          className="relative"
          onClick={() => onTabChange("notes")}
        >
          Notes
          <TabBadge count={matchCounts.notes} />
        </TabsTrigger>
      </TabsList>
    </ScrollArea>
  );
}
