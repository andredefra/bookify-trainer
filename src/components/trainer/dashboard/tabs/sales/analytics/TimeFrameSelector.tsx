
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeFrameSelectorProps } from "./types";
import { cn } from "@/lib/utils";

export function TimeFrameSelector({ 
  timeFrame, 
  onTimeFrameChange, 
  customPeriod, 
  onCustomPeriodChange,
  showTitle = true
}: TimeFrameSelectorProps) {
  return (
    <div className="w-full space-y-3">
      {showTitle && <h3 className="text-lg font-semibold">Business Development Metrics</h3>}
      
      <div className="flex justify-center overflow-x-auto pb-2">
        <TabsList className="inline-flex">
          <TabsTrigger value="week" onClick={() => onTimeFrameChange("week")}>Weekly</TabsTrigger>
          <TabsTrigger value="month" onClick={() => onTimeFrameChange("month")}>Monthly</TabsTrigger>
          <TabsTrigger value="quarter" onClick={() => onTimeFrameChange("quarter")}>Quarterly</TabsTrigger>
          <TabsTrigger value="year" onClick={() => onTimeFrameChange("year")}>Yearly</TabsTrigger>
          <TabsTrigger value="custom" onClick={() => onTimeFrameChange("custom")}>Custom</TabsTrigger>
        </TabsList>
      </div>
      
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          timeFrame === "custom" 
            ? "max-h-20 opacity-100" 
            : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onCustomPeriodChange(7)}
            className={customPeriod === 7 ? "bg-primary/10" : ""}
          >
            7 Days
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onCustomPeriodChange(14)}
            className={customPeriod === 14 ? "bg-primary/10" : ""}
          >
            14 Days
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onCustomPeriodChange(30)}
            className={customPeriod === 30 ? "bg-primary/10" : ""}
          >
            30 Days
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onCustomPeriodChange(90)}
            className={customPeriod === 90 ? "bg-primary/10" : ""}
          >
            90 Days
          </Button>
        </div>
      </div>
    </div>
  );
}
