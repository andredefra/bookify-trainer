import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Calendar, AlertCircle, Check, X } from "lucide-react";
import { useProgramSales } from "@/hooks/useProgramSales";
import { SalesHistoryTable } from "./SalesHistoryTable";
import { format } from "date-fns";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface ProgramSalesContentProps {
  trainerId?: string;
  isProTrainer?: boolean;
}

export function ProgramSalesContent({ trainerId, isProTrainer = false }: ProgramSalesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"all" | "pending">("all");

  const {
    weeklyRevenue,
    previousWeekRevenue,
    monthlyRevenue,
    previousMonthRevenue,
    quarterlyRevenue,
    previousQuarterRevenue,
    pendingRequests,
    allSales,
    loading,
    confirmPurchase,
    rejectPurchase,
  } = useProgramSales(trainerId);

  const calculateChange = (current: number, previous: number): string => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(0)}%`;
  };

  const kpiCards = [
    {
      title: "This Week",
      value: formatCurrency(weeklyRevenue),
      icon: TrendingUp,
      change: calculateChange(weeklyRevenue, previousWeekRevenue),
      isPositive: weeklyRevenue >= previousWeekRevenue,
    },
    {
      title: "This Month",
      value: formatCurrency(monthlyRevenue),
      icon: Calendar,
      change: calculateChange(monthlyRevenue, previousMonthRevenue),
      isPositive: monthlyRevenue >= previousMonthRevenue,
    },
    {
      title: "Last Month",
      value: formatCurrency(previousMonthRevenue),
      icon: Calendar,
      subtitle: "comparison",
    },
    {
      title: "Quarter",
      value: formatCurrency(quarterlyRevenue),
      icon: TrendingUp,
      change: calculateChange(quarterlyRevenue, previousQuarterRevenue),
      isPositive: quarterlyRevenue >= previousQuarterRevenue,
    },
    {
      title: "Pending",
      value: pendingRequests.length.toString(),
      subtitle: "requests",
      icon: AlertCircle,
      badge: true,
    },
  ];

  // Filter sales based on search
  const filteredSales = allSales.filter(
    (sale) =>
      sale.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.packageTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading sales data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="p-4 bg-card border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{kpi.title}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  {kpi.subtitle && (
                    <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
                  )}
                </div>
                {kpi.change && (
                  <span className={`text-xs ${
                    kpi.isPositive 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
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

      {/* Sub-tabs and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Tabs value={activeSubTab} onValueChange={(v) => setActiveSubTab(v as "all" | "pending")} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Sales</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending Requests
                  {pendingRequests.length > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {pendingRequests.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search client or package..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Content based on active sub-tab */}
          {activeSubTab === "pending" ? (
            pendingRequests.length > 0 ? (
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
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No pending purchase requests</p>
              </div>
            )
          ) : (
            <SalesHistoryTable sales={filteredSales} />
          )}

          {/* Footer Info */}
          {isProTrainer && (
            <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
              ✨ Confirmed sales automatically sync to Transactions tab
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
