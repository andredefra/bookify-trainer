
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
    <Card className="h-full shadow-sm hover:shadow transition-shadow">
      <CardHeader className="py-2 px-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50">
              <div className="text-base font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
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
