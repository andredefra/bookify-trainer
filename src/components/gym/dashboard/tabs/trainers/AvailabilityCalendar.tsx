
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Circle, Calendar as CalendarIcon, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";
import { useTrainerRealTimeStatus } from "@/hooks/gym/useTrainerRealTimeStatus";
import { TimelineCalendar } from "./timeline/TimelineCalendar";
import { TrainerSelector } from "./timeline/TrainerSelector";
import { AppointmentListView } from "./timeline/AppointmentListView";

export function AvailabilityCalendar() {
  const [selectedTrainers, setSelectedTrainers] = useState<string[]>([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const { trainers, loading } = useGymTrainersData();
  const { getTrainerStatus } = useTrainerRealTimeStatus();

  // Auto-select all trainers when data loads
  useEffect(() => {
    if (trainers.length > 0 && selectedTrainers.length === 0) {
      setSelectedTrainers(trainers.map(t => t.id));
    }
  }, [trainers, selectedTrainers.length]);
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "available": return "bg-green-500";
      case "busy": return "bg-red-500";
      default: return "bg-slate-400";
    }
  };

  const getStatusText = (trainerId: string) => {
    const status = getTrainerStatus(trainerId);
    if (!status) return "Unknown";
    
    if (status.status === "busy" && status.currentSession) {
      const endTime = new Date(status.currentSession.endTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `Busy until ${endTime}`;
    }
    
    return status.status === "available" ? "Available" : "Busy";
  };

  if (loading) {
    return <div className="p-4">Loading trainers...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Trainer Schedule & Availability</h2>
          <p className="text-muted-foreground">
            View trainer schedules, appointments, and available booking slots
          </p>
        </div>
        <TrainerSelector 
          selectedTrainers={selectedTrainers}
          onTrainersChange={setSelectedTrainers}
        />
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="timeline" className="gap-2">
            <LayoutGrid className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-6">
          {selectedTrainers.length > 0 ? (
            <TimelineCalendar 
              selectedTrainers={selectedTrainers} 
              currentWeek={currentWeek}
              onWeekChange={setCurrentWeek}
            />
          ) : (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                Select at least one trainer to view their schedule
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {selectedTrainers.length > 0 ? (
            <AppointmentListView 
              selectedTrainers={selectedTrainers}
              currentWeek={currentWeek}
            />
          ) : (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                Select trainers to view their availability and appointments
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
