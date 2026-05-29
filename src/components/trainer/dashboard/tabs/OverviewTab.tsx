import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, Calendar, Settings } from "lucide-react";
import { TrainerSessionItem } from "@/types/sessions";
import { QuickActionsWidget } from "./overview/widgets/QuickActionsWidget";
import { TodaysAgendaWidget } from "./overview/widgets/TodaysAgendaWidget";
import { RevenueChartWidget } from "./overview/widgets/RevenueChartWidget";
import { ClientActivityWidget } from "./overview/widgets/ClientActivityWidget";
import { MessagesWidget } from "./overview/widgets/MessagesWidget";
import { PerformanceMetricsWidget } from "./overview/widgets/PerformanceMetricsWidget";
import { PackageSalesWidget } from "./overview/widgets/PackageSalesWidget";
import { GoalsWidget } from "./overview/widgets/GoalsWidget";
import { RecentActivitiesWidget } from "./overview/widgets/RecentActivitiesWidget";
import { ExpirationAlertsWidget } from "./overview/widgets/ExpirationAlertsWidget";
import { WidgetSettingsDialog } from "./overview/WidgetSettingsDialog";
import { useWidgetLayout } from "@/hooks/useWidgetLayout";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { Button } from "@/components/ui/button";
import { AddClientDialog } from "../../dialogs/AddClientDialog";
import { RecordPaymentDialog } from "../../dialogs/RecordPaymentDialog";
import { SetGoalDialog } from "../../dialogs/SetGoalDialog";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./overview/widget-grid.css";
import { useTrainerPlan } from "@/context/TrainerPlanContext";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface OverviewTabProps {
  upcomingSessions: TrainerSessionItem[];
  clients: Array<{ id: number; name: string; sessions: number; lastSession: string }>;
  messageRequests: Array<{ id: number; from: string; preview: string; time: string }>;
  onNavigateToTab?: (tab: string) => void;
}

export function OverviewTab({ upcomingSessions, clients, messageRequests, onNavigateToTab }: OverviewTabProps) {
  const plan = useTrainerPlan();
  const stats = {
    totalClients: clients.length,
    monthlyRevenue: 3200,
    upcomingToday: upcomingSessions.length,
  };

  const { layout, enabledWidgets: rawEnabledWidgets, saveLayout, toggleWidget, resetToDefault } = useWidgetLayout();
  const enabledWidgets = plan === "basic"
    ? rawEnabledWidgets.filter((w) => w !== "expiration-alerts")
    : rawEnabledWidgets;
  const [showSettings, setShowSettings] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [showSetGoal, setShowSetGoal] = useState(false);

  const handleLayoutChange = (newLayout: Layout[]) => {
    saveLayout(newLayout);
  };

  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case "quick-actions":
        return (
          <QuickActionsWidget
            onAddClient={() => setShowAddClient(true)}
            onScheduleSession={() => onNavigateToTab?.("calendar")}
            onCreatePackage={() => onNavigateToTab?.("packages")}
            onSendMessage={() => onNavigateToTab?.("messages")}
            onRecordPayment={() => setShowRecordPayment(true)}
            onSetGoal={() => setShowSetGoal(true)}
          />
        );
      case "todays-agenda":
        return <TodaysAgendaWidget />;
      case "messages":
        return <MessagesWidget />;
      case "expiration-alerts":
        return <ExpirationAlertsWidget />;
      case "revenue-chart":
        return <RevenueChartWidget />;
      case "client-activity":
        return <ClientActivityWidget />;
      case "performance-metrics":
        return <PerformanceMetricsWidget />;
      case "package-sales":
        return <PackageSalesWidget />;
      case "goals":
        return <GoalsWidget />;
      case "recent-activities":
        return <RecentActivitiesWidget />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top 3 KPI Cards + Settings Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                  <p className="text-2xl font-bold">{stats.totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">€{stats.monthlyRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-orange-100">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Today's Sessions</p>
                  <p className="text-2xl font-bold">{stats.upcomingToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSettings(true)}
          className="shrink-0"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Modular Widget Grid with Drag & Drop */}
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 0 }}
            cols={{ lg: 2, md: 2, sm: 1, xs: 1 }}
        rowHeight={180}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".widget-drag-handle"
        isDraggable={true}
        isResizable={true}
        compactType="vertical"
        preventCollision={false}
      >
        {enabledWidgets.map((widgetId) => (
          <div key={widgetId} className="widget-fade-in">
            {renderWidget(widgetId)}
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Dialogs */}
      <WidgetSettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        enabledWidgets={enabledWidgets}
        onToggleWidget={toggleWidget}
        onReset={resetToDefault}
      />
      <AddClientDialog
        open={showAddClient}
        onOpenChange={setShowAddClient}
      />
      <RecordPaymentDialog
        open={showRecordPayment}
        onOpenChange={setShowRecordPayment}
      />
      <SetGoalDialog
        open={showSetGoal}
        onOpenChange={setShowSetGoal}
      />
    </div>
  );
}
