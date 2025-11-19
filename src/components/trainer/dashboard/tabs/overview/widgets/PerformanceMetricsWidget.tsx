import { BaseWidget } from "./BaseWidget";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Users, Target, Star, Zap } from "lucide-react";
import { PerformanceMetric } from "./types";

export function PerformanceMetricsWidget() {
  const metrics: PerformanceMetric[] = [
    {
      id: "retention",
      label: "Client Retention",
      value: "94%",
      trend: "up",
      trendValue: "+2%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      id: "completion",
      label: "Session Completion",
      value: "98%",
      trend: "up",
      trendValue: "+5%",
      icon: Target,
      color: "text-green-500"
    },
    {
      id: "satisfaction",
      label: "Avg. Rating",
      value: "4.8",
      trend: "neutral",
      trendValue: "0%",
      icon: Star,
      color: "text-yellow-500"
    },
    {
      id: "growth",
      label: "Growth Rate",
      value: "+15%",
      trend: "up",
      trendValue: "+3%",
      icon: Zap,
      color: "text-purple-500"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return TrendingUp;
      case "down":
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <BaseWidget
      title="Performance Metrics"
      className="col-span-full lg:col-span-2"
    >
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = getTrendIcon(metric.trend);
          const trendColor = getTrendColor(metric.trend);

          return (
            <div
              key={metric.id}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-accent`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 ${trendColor}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="text-xs font-semibold">{metric.trendValue}</span>
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          );
        })}
      </div>
    </BaseWidget>
  );
}
