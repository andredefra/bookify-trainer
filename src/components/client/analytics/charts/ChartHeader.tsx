
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChartHeaderProps {
  title: string;
  description: string;
  timeframe: string;
  onTimeframeChange: (value: string) => void;
  chartType: string;
  onChartTypeChange: (value: string) => void;
  showChartTypeSelector?: boolean;
}

export function ChartHeader({ 
  title, 
  description, 
  timeframe, 
  onTimeframeChange, 
  chartType, 
  onChartTypeChange, 
  showChartTypeSelector = true 
}: ChartHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
      <div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={timeframe} onValueChange={onTimeframeChange}>
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        
        {showChartTypeSelector && (
          <Select value={chartType} onValueChange={onChartTypeChange}>
            <SelectTrigger className="w-[120px] h-8">
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
