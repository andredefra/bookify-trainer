
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChartHeaderProps {
  title: string;
  description: string;
  timeframe: string;
  onTimeframeChange: (value: string) => void;
  chartType: string;
  onChartTypeChange: (value: string) => void;
  showChartTypeSelector?: boolean;
  hideChartTypeSelector?: boolean;
}

export function ChartHeader({ 
  title, 
  description, 
  timeframe, 
  onTimeframeChange, 
  chartType, 
  onChartTypeChange, 
  showChartTypeSelector = true,
  hideChartTypeSelector = false
}: ChartHeaderProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2 sm:mb-4">
      <div>
        <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'}`}>{title}</CardTitle>
        <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'} mt-1`}>{description}</CardDescription>
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-0 w-full sm:w-auto justify-end">
        <Select value={timeframe} onValueChange={onTimeframeChange}>
          <SelectTrigger className={`${isMobile ? 'w-[90px] h-7 text-xs px-2' : 'w-[120px] h-8'}`}>
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        
        {showChartTypeSelector && !hideChartTypeSelector && (
          <Select value={chartType} onValueChange={onChartTypeChange}>
            <SelectTrigger className={`${isMobile ? 'w-[90px] h-7 text-xs px-2' : 'w-[120px] h-8'}`}>
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
