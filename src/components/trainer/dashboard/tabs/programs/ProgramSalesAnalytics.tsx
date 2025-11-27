import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { useProgramSales } from "@/hooks/useProgramSales";
import { format } from "date-fns";

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
    pendingRequests,
    totalSalesCount,
    loading,
    confirmPurchase,
    rejectPurchase,
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
    {
      title: "Pending",
      value: pendingRequests.length.toString(),
      subtitle: "requests",
      icon: AlertCircle,
      badge: true,
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
                ? "Quick view of program sales - confirmed sales sync to Transactions" 
                : "Manage your program sales and purchase requests"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                    {kpi.subtitle && (
                      <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
                    )}
                  </div>
                  {kpi.change && (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      {kpi.change}
                    </span>
                  )}
                  {kpi.badge && pendingRequests.length > 0 && (
                    <Badge variant="destructive" className="h-5">
                      New
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pending Requests Table */}
        {pendingRequests.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Pending Purchase Requests</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 text-xs font-medium">Client</th>
                    <th className="text-left p-3 text-xs font-medium hidden sm:table-cell">Package</th>
                    <th className="text-right p-3 text-xs font-medium">Price</th>
                    <th className="text-right p-3 text-xs font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pendingRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-sm">{request.clientName}</p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            {request.clientEmail}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(request.requestDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        <div>
                          <p className="text-sm font-medium">{request.packageTitle}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {request.packageType}
                          </Badge>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span className="font-semibold">
                          {formatCurrency(request.price)}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => confirmPurchase(request.id, isProTrainer)}
                            className="h-8"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Confirm</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectPurchase(request.id)}
                            className="h-8"
                          >
                            <X className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Reject</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No pending purchase requests</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="flex items-center justify-between pt-4 border-t text-sm text-muted-foreground">
          <span>Total Confirmed Sales: {totalSalesCount}</span>
          {isProTrainer && (
            <span className="text-xs">✨ Syncs with Transactions automatically</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
