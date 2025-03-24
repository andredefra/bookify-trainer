
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  metrics: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
}

export function MetricCard({ title, metrics }: MetricCardProps) {
  return (
    <Card className="h-full shadow-sm hover:shadow transition-shadow w-full">
      <CardHeader className="py-1 px-2">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        <div className="grid grid-cols-3 gap-1 w-full">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-1 rounded-lg bg-gray-50">
              <div className="text-base font-bold">{metric.value}</div>
              <div className="flex items-center gap-0.5 text-[9px] text-muted-foreground mt-0.5">
                {metric.icon}
                <span>{metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
