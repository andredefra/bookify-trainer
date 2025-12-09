import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MetricsChart } from "./metrics/MetricsChart";
import { RecentMeasurements } from "./metrics/RecentMeasurements";
import { ConfigureCheckInsDialog } from "./metrics/ConfigureCheckInsDialog";
import { CheckInHistorySection } from "./metrics/CheckInHistorySection";
import { useCheckInSettings } from "@/hooks/useCheckInSettings";
import { useCheckInSubmissions } from "@/hooks/useCheckInSubmissions";
import { 
  Plus, 
  ChevronDown, 
  ClipboardList, 
  CalendarCheck, 
  History,
  Settings2,
  BarChart3
} from "lucide-react";

interface MetricsTabProps {
  searchQuery?: string;
  clientMetrics?: {
    weight: string;
    height: string;
    bodyFat: string;
  };
  clientId?: string;
  clientName?: string;
}

export function MetricsTab({ 
  searchQuery = "", 
  clientMetrics,
  clientId = "00000000-0000-0000-0000-000000000002",
  clientName = "Client"
}: MetricsTabProps) {
  const [showConfigureDialog, setShowConfigureDialog] = useState(false);
  const { settings } = useCheckInSettings(clientId);
  const { pendingReview } = useCheckInSubmissions(clientId);
  
  const frequencyLabel = settings?.frequency 
    ? settings.frequency.charAt(0).toUpperCase() + settings.frequency.slice(1)
    : null;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Body Metrics & Check-ins</h3>
            {settings?.enabled && (
              <Badge variant="secondary" className="text-xs">
                <CalendarCheck className="h-3 w-3 mr-1" />
                {frequencyLabel} Check-ins
              </Badge>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Record New
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => {/* TODO: Open manual log dialog */}}>
                <ClipboardList className="h-4 w-4 mr-2" />
                Log Manually
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowConfigureDialog(true)}>
                <Settings2 className="h-4 w-4 mr-2" />
                Configure Check-ins
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {/* TODO: Open history */}}>
                <History className="h-4 w-4 mr-2" />
                View Check-in History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="metrics" className="text-xs">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="check-ins" className="text-xs">
              <ClipboardList className="h-3.5 w-3.5 mr-1.5" />
              Check-ins
              {pendingReview.length > 0 && (
                <Badge variant="default" className="ml-1.5 h-5 px-1.5 bg-blue-500">
                  {pendingReview.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="mt-0">
            <MetricsChart />
            <RecentMeasurements 
              searchQuery={searchQuery}
              clientMetrics={clientMetrics}
            />
          </TabsContent>

          <TabsContent value="check-ins" className="mt-0">
            <CheckInHistorySection clientId={clientId} />
          </TabsContent>
        </Tabs>
        
        <ConfigureCheckInsDialog
          open={showConfigureDialog}
          onOpenChange={setShowConfigureDialog}
          clientId={clientId}
          clientName={clientName}
        />
      </CardContent>
    </Card>
  );
}
