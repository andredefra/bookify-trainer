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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Shift Calendar</TabsTrigger>
          <TabsTrigger value="availability">Manage Availability</TabsTrigger>
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