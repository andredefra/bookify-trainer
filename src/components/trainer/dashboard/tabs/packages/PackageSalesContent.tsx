import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, DollarSign, Sparkles } from "lucide-react";
import { PackageSalesHistoryTable } from "./PackageSalesHistoryTable";
import { PackageSale } from "@/hooks/usePackageSales";
import { format } from "date-fns";

interface PackageSalesContentProps {
  weeklyRevenue: number;
  previousWeekRevenue: number;
  monthlyRevenue: number;
  previousMonthRevenue: number;
  quarterlyRevenue: number;
  previousQuarterRevenue: number;
  pendingRequests: PackageSale[];
  confirmedSales: PackageSale[];
  allSales: PackageSale[];
  loading: boolean;
  onConfirmPurchase: (id: string) => void;
  onRejectPurchase: (id: string) => void;
  isProTrainer?: boolean;
}

export function PackageSalesContent({
  weeklyRevenue,
  previousWeekRevenue,
  monthlyRevenue,
  previousMonthRevenue,
  quarterlyRevenue,
  previousQuarterRevenue,
  pendingRequests,
  confirmedSales,
  allSales,
  loading,
  onConfirmPurchase,
  onRejectPurchase,
  isProTrainer = false,
}: PackageSalesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("all");

  const calculatePercentageChange = (current: number, previous: number): { value: number; isPositive: boolean } => {
    if (previous === 0) return { value: current > 0 ? 100 : 0, isPositive: current > 0 };
    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change), isPositive: change >= 0 };
  };

  const weeklyChange = calculatePercentageChange(weeklyRevenue, previousWeekRevenue);
  const monthlyChange = calculatePercentageChange(monthlyRevenue, previousMonthRevenue);
  const quarterlyChange = calculatePercentageChange(quarterlyRevenue, previousQuarterRevenue);

  const getPackageTypeBadge = (type: string) => {
    switch (type) {
      case 'sessions_only':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Sessions</Badge>;
      case 'program_only':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Program</Badge>;
      case 'hybrid':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Hybrid</Badge>;
      case 'service':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">Service</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

        <Card className={pendingRequests.length > 0 ? "border-yellow-500/50" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {pendingRequests.length > 0 ? "Awaiting confirmation" : "No pending requests"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Sales</TabsTrigger>
                <TabsTrigger value="pending" className="relative">
                  Pending Requests
                  {pendingRequests.length > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {pendingRequests.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
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

            <TabsContent value="all" className="mt-0">
              <PackageSalesHistoryTable sales={allSales} searchQuery={searchQuery} />
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending requests</p>
                  <p className="text-sm">All package purchases have been processed</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className="border-yellow-500/30">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{request.clientName}</h4>
                              {getPackageTypeBadge(request.packageType)}
                            </div>
                            <p className="text-sm text-muted-foreground">{request.packageTitle}</p>
                            <p className="text-xs text-muted-foreground">
                              Requested: {format(new Date(request.requestDate), 'MMM dd, yyyy')}
                            </p>
                            {request.sessionsTotal && request.sessionsTotal > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {request.sessionsTotal} sessions included
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xl font-bold">€{request.price.toFixed(2)}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onRejectPurchase(request.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => onConfirmPurchase(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
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
