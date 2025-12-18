import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { PackageSalesHistoryTable } from "./PackageSalesHistoryTable";
import { PackageSale } from "@/hooks/usePackageSales";

interface PackageSalesContentProps {
  weeklyRevenue: number;
  previousWeekRevenue: number;
  monthlyRevenue: number;
  previousMonthRevenue: number;
  quarterlyRevenue: number;
  previousQuarterRevenue: number;
  allSales: PackageSale[];
  loading: boolean;
  isProTrainer?: boolean;
  onConfirmCashPayment: (id: string) => void;
  onRejectCashPayment: (id: string) => void;
  onMarkNoShow: (id: string) => void;
  onUpdateInvoiceStatus: (id: string, status: 'none' | 'draft' | 'sent_to_client', url?: string) => void;
}

export function PackageSalesContent({
  weeklyRevenue,
  previousWeekRevenue,
  monthlyRevenue,
  previousMonthRevenue,
  quarterlyRevenue,
  previousQuarterRevenue,
  allSales,
  loading,
  isProTrainer = false,
  onConfirmCashPayment,
  onRejectCashPayment,
  onMarkNoShow,
  onUpdateInvoiceStatus,
}: PackageSalesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const calculatePercentageChange = (current: number, previous: number): { value: number; isPositive: boolean } => {
    if (previous === 0) return { value: current > 0 ? 100 : 0, isPositive: current > 0 };
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change), isPositive: change >= 0 };
  };

  const weeklyChange = calculatePercentageChange(weeklyRevenue, previousWeekRevenue);
  const monthlyChange = calculatePercentageChange(monthlyRevenue, previousMonthRevenue);
  const quarterlyChange = calculatePercentageChange(quarterlyRevenue, previousQuarterRevenue);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards - 4 cards without Pending */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{weeklyRevenue.toFixed(2)}</div>
            <div className={`flex items-center text-xs mt-1 ${weeklyChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {weeklyChange.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {weeklyChange.value.toFixed(0)}% vs last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{monthlyRevenue.toFixed(2)}</div>
            <div className={`flex items-center text-xs mt-1 ${monthlyChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {monthlyChange.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {monthlyChange.value.toFixed(0)}% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{previousMonthRevenue.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1">For comparison</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quarter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{quarterlyRevenue.toFixed(2)}</div>
            <div className={`flex items-center text-xs mt-1 ${quarterlyChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {quarterlyChange.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {quarterlyChange.value.toFixed(0)}% vs prev quarter
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="font-semibold">All Sales</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search client or package..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[250px]"
              />
            </div>
          </div>

          <PackageSalesHistoryTable 
            sales={allSales} 
            searchQuery={searchQuery}
            isProTrainer={isProTrainer}
            onConfirmCashPayment={onConfirmCashPayment}
            onRejectCashPayment={onRejectCashPayment}
            onMarkNoShow={onMarkNoShow}
            onUpdateInvoiceStatus={onUpdateInvoiceStatus}
          />
        </CardContent>
      </Card>

      {/* Pro Trainer Sync Note */}
      {isProTrainer && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Confirmed sales automatically sync to your Transactions tab</span>
        </div>
      )}
    </div>
  );
}
