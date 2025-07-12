
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGymTrainersData } from "@/hooks/gym/useGymTrainersData";
import { useTrainerRealTimeStatus } from "@/hooks/gym/useTrainerRealTimeStatus";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AvailabilityList() {
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
    <div className="space-y-8">
      {trainers.map((trainer) => {
        const realtimeStatus = getTrainerStatus(trainer.id);
        const statusColor = getStatusColor(realtimeStatus?.status || 'offline');

        return (
          <div key={trainer.id} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium">{trainer.name}</h3>
                <div className="flex items-center">
                  <Circle className={`h-2 w-2 ${statusColor} mr-1`} />
                  <span className="text-xs text-muted-foreground">{getStatusText(trainer.id)}</span>
                </div>
                <Badge variant="outline" className={
                  realtimeStatus?.status === "available" 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : "bg-red-50 text-red-700 border-red-200"
                }>
                  {realtimeStatus?.status === "busy" ? "Busy" : "Available"}
                </Badge>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                {weekdays.map((day) => (
                  <div key={day} className="bg-background p-3 rounded-md border">
                    <h4 className="font-medium text-sm mb-2">{day}</h4>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="w-full text-center">
                        {realtimeStatus?.status === "busy" ? "Busy" : "Available"}
                      </Badge>
                      <p className="text-xs text-muted-foreground text-center">
                        Real-time status
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
