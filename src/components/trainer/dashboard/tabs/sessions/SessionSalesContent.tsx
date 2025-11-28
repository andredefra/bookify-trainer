import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Calendar, AlertCircle, Check, X, Inbox } from "lucide-react";
import { useSessionSales, SessionRequest } from "@/hooks/useSessionSales";
import { SessionSalesHistoryTable } from "./SessionSalesHistoryTable";
import { SessionRequestCard } from "./SessionRequestCard";
import { ApproveSessionRequestDialog } from "./ApproveSessionRequestDialog";
import { DeclineRequestDialog } from "./DeclineRequestDialog";
import { format } from "date-fns";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface SessionSalesContentProps {
  trainerId?: string;
  isProTrainer?: boolean;
}

export function SessionSalesContent({ trainerId, isProTrainer = false }: SessionSalesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"all" | "pending" | "requests">("all");
  const [selectedRequest, setSelectedRequest] = useState<SessionRequest | null>(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);

  const {
    weeklyRevenue,
    previousWeekRevenue,
    monthlyRevenue,
    previousMonthRevenue,
    quarterlyRevenue,
    previousQuarterRevenue,
    pendingPayments,
    allSales,
    sessionRequests,
    loading,
    confirmPayment,
    rejectPayment,
    approveRequest,
    declineRequest,
  } = useSessionSales(trainerId);

  const calculateChange = (current: number, previous: number): string => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(0)}%`;
  };

  const handleApproveClick = (request: SessionRequest) => {
    setSelectedRequest(request);
    setApproveDialogOpen(true);
  };

  const handleDeclineClick = (request: SessionRequest) => {
    setSelectedRequest(request);
    setDeclineDialogOpen(true);
  };

  const handleApproveConfirm = (requestId: string, paymentMethod: 'cash' | 'online') => {
    approveRequest(requestId, paymentMethod, isProTrainer);
  };

  const handleDeclineConfirm = (requestId: string, reason?: string) => {
    declineRequest(requestId, reason);
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
      value: pendingPayments.length.toString(),
      subtitle: "payments",
      icon: AlertCircle,
      badge: true,
    },
  ];

  // Filter sales based on search
  const filteredSales = allSales.filter(
    (sale) =>
      sale.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase())
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
                {kpi.badge && pendingPayments.length > 0 && (
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
            <Tabs value={activeSubTab} onValueChange={(v) => setActiveSubTab(v as "all" | "pending" | "requests")} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Sales</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending Payments
                  {pendingPayments.length > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {pendingPayments.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="requests">
                  Requests
                  {sessionRequests.length > 0 && (
                    <Badge variant="default" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {sessionRequests.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search client or session..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Content based on active sub-tab */}
          {activeSubTab === "requests" ? (
            sessionRequests.length > 0 ? (
              <div className="space-y-4">
                {sessionRequests.map((request) => (
                  <SessionRequestCard
                    key={request.id}
                    request={request}
                    onViewDetails={(req) => {
                      setSelectedRequest(req);
                      // Could open a detail dialog here if needed
                    }}
                    onApprove={handleApproveClick}
                    onDecline={handleDeclineClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Inbox className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">No session requests</p>
                <p className="text-xs mt-1">New session requests will appear here</p>
              </div>
            )
          ) : activeSubTab === "pending" ? (
            pendingPayments.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-3 text-xs font-medium">Client</th>
                      <th className="text-left p-3 text-xs font-medium hidden sm:table-cell">Session</th>
                      <th className="text-right p-3 text-xs font-medium">Price</th>
                      <th className="text-right p-3 text-xs font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {pendingPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-sm">{payment.clientName}</p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(payment.requestDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </td>
                        <td className="p-3 hidden sm:table-cell">
                          <div>
                            <p className="text-sm font-medium">{payment.sessionTitle}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {payment.sessionType}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <span className="font-semibold">
                            {formatCurrency(payment.price)}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => confirmPayment(payment.id, isProTrainer)}
                              className="h-8"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              <span className="hidden sm:inline">Confirm</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => rejectPayment(payment.id)}
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
                <p className="text-sm">No pending payments</p>
              </div>
            )
          ) : (
            <SessionSalesHistoryTable sales={filteredSales} />
          )}

          {/* Footer Info */}
          {isProTrainer && (
            <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
              ✨ Confirmed payments automatically sync to Transactions tab
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approve Request Dialog */}
      <ApproveSessionRequestDialog
        open={approveDialogOpen}
        onOpenChange={setApproveDialogOpen}
        request={selectedRequest}
        isProTrainer={isProTrainer}
        onConfirm={handleApproveConfirm}
      />

      {/* Decline Request Dialog */}
      <DeclineRequestDialog
        open={declineDialogOpen}
        onOpenChange={setDeclineDialogOpen}
        request={selectedRequest}
        onConfirm={handleDeclineConfirm}
      />
    </div>
  );
}
