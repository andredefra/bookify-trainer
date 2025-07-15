import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { ShiftStats } from "../shifts/ShiftStats";
import { ShiftCalendar } from "../shifts/ShiftCalendar";
import { TrainerAvailabilityManager } from "../shifts/TrainerAvailabilityManager";

export function AvailabilityTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Clock className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Availability & Shifts</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10 gap-1 sm:gap-0 p-1">
          <TabsTrigger value="overview" className="text-xs sm:text-sm py-2 sm:py-1.5 min-h-[44px] sm:min-h-0">
            Overview
          </TabsTrigger>
          <TabsTrigger value="calendar" className="text-xs sm:text-sm py-2 sm:py-1.5 min-h-[44px] sm:min-h-0">
            Shift Calendar
          </TabsTrigger>
          <TabsTrigger value="availability" className="text-xs sm:text-sm py-2 sm:py-1.5 min-h-[44px] sm:min-h-0">
            Manage Availability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ShiftStats />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <ShiftCalendar />
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <TrainerAvailabilityManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}