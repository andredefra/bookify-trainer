
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  period: string;
  icon?: React.ReactNode;
  color?: string;
}

export function StatCard({ title, value, change, trend, period, icon, color }: StatCardProps) {
  return (
    <Card className="p-0.5 border-l-2 shadow-sm hover:shadow transition-shadow h-full w-full" style={{ borderLeftColor: color || '#e5e7eb' }}>
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-medium text-muted-foreground">{title}</h3>
        <div className="bg-gray-100 rounded-full p-0.5">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline space-x-0.5">
        <span className="text-sm font-bold">{value}</span>
        <span className={`text-[9px] font-medium flex items-center ${
          trend === "up" ? "text-green-600" : 
          trend === "down" ? "text-red-600" : 
          "text-gray-600"
        }`}>
          {change}
          {trend === "up" ? <ArrowUpRight className="h-2 w-2 ml-0.5" /> : 
           trend === "down" ? <ArrowDownRight className="h-2 w-2 ml-0.5" /> : null}
        </span>
      </div>
      <span className="text-[8px] text-muted-foreground block">{period}</span>
    </Card>
  );
}
