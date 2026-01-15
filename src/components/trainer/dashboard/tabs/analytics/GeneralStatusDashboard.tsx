import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCheckInAnalytics } from "@/hooks/useCheckInAnalytics";
import { WeightProgressChart } from "./charts/WeightProgressChart";
import { WellnessTrendsChart } from "./charts/WellnessTrendsChart";
import { Moon, Zap, Smile, Scale, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface GeneralStatusDashboardProps {
  clientId: string;
  clientName: string;
}

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: number | null;
  trendLabel?: string;
  iconColor?: string;
}

function KpiCard({ title, value, icon: Icon, trend, trendLabel, iconColor = "text-primary" }: KpiCardProps) {
  const hasTrend = trend !== null && trend !== undefined;
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className={cn("h-4 w-4", iconColor)} />
        <span>{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold">{value}</span>
        {hasTrend && (
          <span className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            isPositive && "text-green-600 dark:text-green-400",
            isNegative && "text-red-600 dark:text-red-400",
            !isPositive && !isNegative && "text-muted-foreground"
          )}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : isNegative ? (
              <TrendingDown className="h-3 w-3" />
            ) : (
              <Minus className="h-3 w-3" />
            )}
            {isPositive ? "+" : ""}{trend.toFixed(1)}
            {trendLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export function GeneralStatusDashboard({ clientId, clientName }: GeneralStatusDashboardProps) {
  const { weightData, wellnessData, kpis, isLoading, hasData } = useCheckInAnalytics(clientId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General Status</CardTitle>
          <CardDescription>Loading check-in analytics...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General Status</CardTitle>
          <CardDescription>Aggregated health and progress overview from check-ins</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[150px] flex flex-col items-center justify-center text-muted-foreground">
            <Scale className="h-10 w-10 mb-2 opacity-50" />
            <p className="text-sm">No check-in data available for {clientName}</p>
            <p className="text-xs mt-1">Configure check-ins to start tracking progress</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General Status</CardTitle>
          <CardDescription>
            Aggregated health and progress overview from check-ins (Last 30 days)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* KPI Summary Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KpiCard
              title="Avg. Sleep"
              value={kpis.avgSleep ? `${kpis.avgSleep.toFixed(1)}/10` : "—"}
              icon={Moon}
              trend={kpis.sleepTrend}
              iconColor="text-indigo-500"
            />
            <KpiCard
              title="Avg. Energy"
              value={kpis.avgEnergy ? `${kpis.avgEnergy.toFixed(1)}/10` : "—"}
              icon={Zap}
              trend={kpis.energyTrend}
              iconColor="text-green-500"
            />
            <KpiCard
              title="Avg. Mood"
              value={kpis.avgMood ? `${kpis.avgMood.toFixed(1)}/10` : "—"}
              icon={Smile}
              trend={kpis.moodTrend}
              iconColor="text-amber-500"
            />
            <KpiCard
              title="Weight Δ"
              value={kpis.weightChange !== null ? `${kpis.weightChange > 0 ? '+' : ''}${kpis.weightChange.toFixed(1)}kg` : "—"}
              icon={Scale}
              trend={null}
              iconColor="text-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <WeightProgressChart data={weightData} />
        <WellnessTrendsChart data={wellnessData} />
      </div>
    </div>
  );
}
