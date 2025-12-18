import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar } from "lucide-react";
import { useProgramSales } from "@/hooks/useProgramSales";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface ProgramSalesAnalyticsProps {
  trainerId?: string;
  isProTrainer?: boolean;
}

export function ProgramSalesAnalytics({ trainerId, isProTrainer = false }: ProgramSalesAnalyticsProps) {
  const {
    weeklyRevenue,
    monthlyRevenue,
    quarterlyRevenue,
    totalSalesCount,
    pendingCashPayments,
    loading,
  } = useProgramSales(trainerId);

  const kpiCards = [
    {
      title: "This Week",
      value: formatCurrency(weeklyRevenue),
      icon: TrendingUp,
      change: "+15%",
    },
    {
      title: "This Month",
      value: formatCurrency(monthlyRevenue),
      icon: Calendar,
      change: "+8%",
    },
    {
      title: "Quarter",
      value: formatCurrency(quarterlyRevenue),
      icon: TrendingUp,
      change: "+12%",
    },
  ];

  if (loading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Loading sales data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              📊 Program Sales
              {isProTrainer && (
                <Badge variant="secondary" className="text-xs">
                  Pro
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {isProTrainer 
                ? "Quick view of program sales - sales sync to Transactions" 
                : "Manage your program sales"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="p-4 bg-card border rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{kpi.title}</span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold">
                      {kpi.value}
                    </div>
                  </div>
                  {kpi.change && (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      {kpi.change}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="flex items-center justify-between pt-4 border-t text-sm text-muted-foreground">
          <span>Total Sales: {totalSalesCount}</span>
          {pendingCashPayments.length > 0 && (
            <Badge variant="secondary">{pendingCashPayments.length} pending cash</Badge>
          )}
          {isProTrainer && (
            <span className="text-xs">✨ Syncs with Transactions automatically</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
