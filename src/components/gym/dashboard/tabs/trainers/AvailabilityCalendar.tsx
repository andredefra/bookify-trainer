
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";
import { useTrainerRealTimeStatus } from "@/hooks/gym/useTrainerRealTimeStatus";

export function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { trainers, loading } = useGymTrainersData();
  const { getTrainerStatus } = useTrainerRealTimeStatus();
  
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
      const endTime = new Date(status.currentSession.endTime).toLocaleTimeString('it-IT', {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border shadow p-3 pointer-events-auto"
          initialFocus
        />
      </div>
      <div className="md:col-span-2">
        <h3 className="font-medium mb-4">
          Trainers available on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h3>
        <div className="space-y-4">
          {trainers.map(trainer => {
            const realtimeStatus = getTrainerStatus(trainer.id);
            const statusColor = getStatusColor(realtimeStatus?.status || 'offline');
            
            return (
              <Card key={trainer.id} className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{trainer.name}</h4>
                      <div className="flex items-center">
                        <Circle className={`h-2 w-2 ${statusColor} mr-1`} />
                        <span className="text-xs text-muted-foreground">{getStatusText(trainer.id)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={
                        realtimeStatus?.status === "available" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : "bg-red-50 text-red-700 border-red-200"
                      }>
                        {realtimeStatus?.status === "busy" ? "Busy" : "Available"}
                      </Badge>
                      {realtimeStatus?.nextAvailableTime && (
                        <span className="text-xs text-muted-foreground">
                          Next available: {new Date(realtimeStatus.nextAvailableTime).toLocaleTimeString('it-IT', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          
          {trainers.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No trainers found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
