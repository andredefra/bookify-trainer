
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabBadge } from "../shared/TabBadge";
import { useTrainerPlan } from "@/context/TrainerPlanContext";

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
  const plan = useTrainerPlan();
  const showPrograms = plan !== "basic";
  const showPackages = plan === "pro";

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

        {showPrograms && (
          <TabsTrigger
            value="programs"
            className="relative"
            onClick={() => onTabChange("programs")}
          >
            Programs
            <TabBadge count={matchCounts.programs} />
          </TabsTrigger>
        )}

        {showPackages && (
          <TabsTrigger
            value="packages"
            className="relative"
            onClick={() => onTabChange("packages")}
          >
            Packages
            <TabBadge count={matchCounts.packages} />
          </TabsTrigger>
        )}

        <TabsTrigger
          value="sales"
          className="relative"
          onClick={() => onTabChange("sales")}
        >
          Sales
          <TabBadge count={matchCounts.sales} />
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
