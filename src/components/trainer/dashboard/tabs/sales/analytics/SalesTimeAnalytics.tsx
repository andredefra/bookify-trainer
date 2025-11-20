
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SalesTimeAnalyticsProps, TimeFrame } from "./types";
import { useTimeAnalytics } from "./useTimeAnalytics";
import { MetricsCards } from "./MetricsCards";
import { TimeFrameSelector } from "./TimeFrameSelector";
import { SalesChart } from "./SalesChart";

export function SalesTimeAnalytics({ contacts }: SalesTimeAnalyticsProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("week");
  const [customPeriod, setCustomPeriod] = useState(7); // Default 7 days
  
  // Use the hook to generate analytics data
  const analytics = useTimeAnalytics(contacts, timeFrame, customPeriod);

  return (
    <div className="space-y-4">
      <Tabs value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)} className="w-full">
        <TimeFrameSelector 
          timeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
          customPeriod={customPeriod}
          onCustomPeriodChange={setCustomPeriod}
        />

        <MetricsCards analytics={analytics} timeFrame={timeFrame} />

        <TabsContent value={timeFrame}>
          <SalesChart analytics={analytics} timeFrame={timeFrame} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
