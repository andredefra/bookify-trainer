
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, CalendarCheck, Clock } from "lucide-react";

interface TrainerInfoProps {
  trainer: {
    bio: string;
    specialties: string[];
    hourlyRate: number;
  };
  onBookSession: () => void;
  onMessageClick: () => void;
}

export const TrainerInfo = ({ trainer, onBookSession, onMessageClick }: TrainerInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {trainer.specialties.map((specialty) => (
          <Badge key={specialty} variant="secondary">{specialty}</Badge>
        ))}
      </div>
      
      <p className="text-base leading-relaxed">{trainer.bio}</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1" onClick={onBookSession}>
          <CalendarCheck className="mr-2 h-4 w-4" />
          Book a Session
        </Button>
        
        <Button variant="outline" className="flex-1" onClick={onMessageClick}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">€{trainer.hourlyRate}</span>
              <span className="text-muted-foreground">/hour</span>
            </div>
            <div className="flex items-center text-sm text-emerald-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Available today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
