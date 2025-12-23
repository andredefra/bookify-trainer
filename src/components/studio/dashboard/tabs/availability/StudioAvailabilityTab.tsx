import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Calendar, Users, Settings } from "lucide-react";
import { ShiftStatsCards } from "./components/ShiftStatsCards";
import { StudioShiftCalendar } from "./components/StudioShiftCalendar";
import { TrainersAvailabilityView } from "./components/TrainersAvailabilityView";
import { ShiftRequestsManager } from "./components/ShiftRequestsManager";
import { 
  mockStudioShifts, 
  mockTrainerAvailability,
  mockShiftRequests 
} from "./data/studioAvailabilityData";

export function StudioAvailabilityTab() {
  const [activeSubTab, setActiveSubTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Availability & Shifts</h1>
        <p className="text-muted-foreground">
          Manage trainer schedules, availability, and shift requests
        </p>
      </div>

      {/* Stats */}
      <ShiftStatsCards 
        shifts={mockStudioShifts}
        requests={mockShiftRequests}
      />

      {/* Tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="h-4 w-4" />
            Shift Calendar
          </TabsTrigger>
          <TabsTrigger value="availability" className="gap-2">
            <Users className="h-4 w-4" />
            Trainer Availability
          </TabsTrigger>
          <TabsTrigger value="manage" className="gap-2">
            <Settings className="h-4 w-4" />
            Manage Shifts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Today's Schedule Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border bg-muted/30">
              <h3 className="font-semibold mb-4">Today's Schedule</h3>
              <div className="space-y-3">
                {mockStudioShifts
                  .filter(s => s.date === new Date().toISOString().split('T')[0])
                  .slice(0, 4)
                  .map((shift) => (
                    <div key={shift.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-medium">{shift.trainerName}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {shift.startTime} - {shift.endTime}
                      </span>
                    </div>
                  ))}
                {mockStudioShifts.filter(s => s.date === new Date().toISOString().split('T')[0]).length === 0 && (
                  <p className="text-muted-foreground">No shifts scheduled for today</p>
                )}
              </div>
            </div>
            
            <div className="p-4 rounded-lg border bg-muted/30">
              <h3 className="font-semibold mb-4">Pending Requests ({mockShiftRequests.filter(r => r.status === "pending").length})</h3>
              <div className="space-y-3">
                {mockShiftRequests
                  .filter(r => r.status === "pending")
                  .slice(0, 3)
                  .map((request) => (
                    <div key={request.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{request.trainerName}</p>
                        <p className="text-sm text-muted-foreground capitalize">{request.type.replace('_', ' ')}</p>
                      </div>
                      <button 
                        className="text-sm text-primary hover:underline"
                        onClick={() => setActiveSubTab("manage")}
                      >
                        Review
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Mini Calendar */}
          <StudioShiftCalendar shifts={mockStudioShifts} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <StudioShiftCalendar shifts={mockStudioShifts} />
        </TabsContent>

        <TabsContent value="availability" className="mt-6">
          <TrainersAvailabilityView availability={mockTrainerAvailability} />
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <ShiftRequestsManager requests={mockShiftRequests} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
