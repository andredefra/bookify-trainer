
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

export function AvailabilityCalendar() {
  const [selectedTrainers, setSelectedTrainers] = useState<string[]>([]);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Calendario Trainers</h2>
          <p className="text-muted-foreground">
            Visualizza disponibilità e sessioni dei trainers
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
            Lista
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-6">
          {selectedTrainers.length > 0 ? (
            <TimelineCalendar selectedTrainers={selectedTrainers} />
          ) : (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                Seleziona almeno un trainer per visualizzare il calendario
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {trainers
              .filter(trainer => selectedTrainers.includes(trainer.id))
              .map(trainer => {
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
                            {realtimeStatus?.status === "busy" ? "Occupato" : "Disponibile"}
                          </Badge>
                          {realtimeStatus?.nextAvailableTime && (
                            <span className="text-xs text-muted-foreground">
                              Prossima disponibilità: {new Date(realtimeStatus.nextAvailableTime).toLocaleTimeString('it-IT', {
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
            
            {selectedTrainers.length === 0 && (
              <Card className="p-8 text-center">
                <div className="text-muted-foreground">
                  Seleziona dei trainers per visualizzare la loro disponibilità
                </div>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
