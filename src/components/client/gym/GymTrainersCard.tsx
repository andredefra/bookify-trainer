import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Star, CheckCircle2, User, Calendar } from "lucide-react";
import { getGymTrainers } from "@/data/gymTrainersMockData";
import { useState } from "react";
import { TrainerProfileDialog } from "../trainers/TrainerProfileDialog";

interface GymTrainersCardProps {
  gymId?: string;
}

export function GymTrainersCard({ gymId }: GymTrainersCardProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<{ id: number; name: string } | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  if (!gymId) {
    return null;
  }

  const trainers = getGymTrainers(gymId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "in-session": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "Online";
      case "in-session": return "In Session";
      case "offline": return "Offline";
      default: return "Unknown";
    }
  };

  const handleViewProfile = (id: number, name: string) => {
    setSelectedTrainer({ id, name });
    setShowProfile(true);
  };

  const handleBookSession = (name: string) => {
    // Navigate to sessions tab or open booking dialog
    console.log("Book session with", name);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gym Trainers
            </div>
            <Badge variant="secondary">{trainers.length} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trainers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No trainers available</p>
            </div>
          ) : (
            <>
              {trainers.map((trainer) => (
                <div 
                  key={trainer.id} 
                  className="border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={trainer.image} alt={trainer.name} />
                      <AvatarFallback>
                        {trainer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{trainer.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {trainer.specialty}
                          </p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className="shrink-0 bg-green-100 text-green-800 flex items-center gap-1"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{trainer.rating}</span>
                          <span>({trainer.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(trainer.status)}`} />
                          <span>{getStatusText(trainer.status)}</span>
                        </div>
                        <span className="font-medium">${trainer.hourlyRate}/hr</span>
                      </div>
                      
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 text-xs flex-1"
                          onClick={() => handleViewProfile(trainer.id, trainer.name)}
                        >
                          <User className="h-3 w-3 mr-1" />
                          View Profile
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="h-7 text-xs flex-1"
                          onClick={() => handleBookSession(trainer.name)}
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full mt-2 text-sm"
                onClick={() => {
                  // Navigate to trainers tab with gym filter active
                  console.log("Browse all gym trainers");
                }}
              >
                Browse All Gym Trainers
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <TrainerProfileDialog
        open={showProfile}
        onOpenChange={setShowProfile}
        trainerId={selectedTrainer?.id}
        trainerName={selectedTrainer?.name}
        onBookSession={handleBookSession}
        onSendMessage={() => {}}
      />
    </>
  );
}
