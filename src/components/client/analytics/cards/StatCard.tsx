
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
    <Card className="p-3 border-l-4 shadow-sm hover:shadow transition-shadow h-auto" style={{ borderLeftColor: color || '#e5e7eb' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
        <div className="bg-gray-100 rounded-full p-1">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-lg font-bold">{value}</span>
        <span className={`text-xs font-medium flex items-center ${
          trend === "up" ? "text-green-600" : 
          trend === "down" ? "text-red-600" : 
          "text-gray-600"
        }`}>
          {change}
          {trend === "up" ? <ArrowUpRight className="h-3 w-3 ml-0.5" /> : 
           trend === "down" ? <ArrowDownRight className="h-3 w-3 ml-0.5" /> : null}
        </span>
      </div>
      <span className="text-xs text-muted-foreground block mt-0.5">{period}</span>
    </Card>
  );
}
