
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { AvailabilityList } from "./AvailabilityList";

export function TrainerAvailability() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Availability Schedule</CardTitle>
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "calendar" | "list")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode}>
            <TabsContent value="calendar" className="mt-0">
              <AvailabilityCalendar />
            </TabsContent>
            <TabsContent value="list" className="mt-0">
              <AvailabilityList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
