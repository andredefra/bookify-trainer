import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Calendar, Users } from "lucide-react";
import { useSessionSales } from "@/hooks/useSessionSales";
import { SessionSalesHistoryTable } from "./SessionSalesHistoryTable";
import { SessionParticipantsPipeline } from "./SessionParticipantsPipeline";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface SessionSalesContentProps {
  trainerId?: string;
  isProTrainer?: boolean;
}

export function SessionSalesContent({ trainerId, isProTrainer = false }: SessionSalesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"all" | "pipeline">("all");

  const {
    weeklyRevenue,
    previousWeekRevenue,
    monthlyRevenue,
    previousMonthRevenue,
    quarterlyRevenue,
    previousQuarterRevenue,
    allSales,
    sessionParticipants,
    loading,
    confirmCashPayment,
    rejectCashPayment,
    markNoShow,
    updateInvoiceStatus,
    addParticipantToCRM,
  } = useSessionSales(trainerId);

  const calculateChange = (current: number, previous: number): string => {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(0)}%`;
  };

  // Count potential leads (not existing clients, not added to CRM)
  const potentialLeadsCount = sessionParticipants.filter(
    p => !p.isExistingClient && !p.addedToCRM
  ).length;

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
  ];

  // Filter sales based on search
  const filteredSales = allSales.filter(
    (sale) =>
      sale.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter participants based on search
  const filteredParticipants = sessionParticipants.filter(
    (p) =>
      p.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.participantEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              </div>
            </div>
          );
        })}
      </div>

      {/* Sub-tabs and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Tabs value={activeSubTab} onValueChange={(v) => setActiveSubTab(v as "all" | "pipeline")} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All Sales</TabsTrigger>
                <TabsTrigger value="pipeline">
                  <Users className="h-4 w-4 mr-1" />
                  Participants Pipeline
                  {potentialLeadsCount > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {potentialLeadsCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={activeSubTab === "all" ? "Search sales..." : "Search participants..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Content based on active sub-tab */}
          {activeSubTab === "pipeline" ? (
            <SessionParticipantsPipeline 
              participants={filteredParticipants}
              onAddToCRM={addParticipantToCRM}
            />
          ) : (
            <SessionSalesHistoryTable 
              sales={filteredSales}
              isProTrainer={isProTrainer}
              onConfirmCashPayment={confirmCashPayment}
              onRejectCashPayment={rejectCashPayment}
              onMarkNoShow={markNoShow}
              onUpdateInvoiceStatus={updateInvoiceStatus}
            />
          )}

          {/* Footer Info */}
          {isProTrainer && activeSubTab === "all" && (
            <div className="mt-6 pt-4 border-t text-center text-xs text-muted-foreground">
              ✨ Confirmed payments automatically sync to Transactions tab
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
