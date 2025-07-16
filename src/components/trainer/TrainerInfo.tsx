
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, CalendarCheck, Clock, ExternalLink, Building2, MapPin } from "lucide-react";

interface TrainerInfoProps {
  trainer: {
    bio: string;
    specialties: string[];
    hourlyRate: number;
  };
  onBookSession: () => void;
  onMessageClick: () => void;
  primaryGym?: {
    id: string;
    name: string;
    location?: string;
    logo_url?: string;
    gym_type?: string;
  };
}

export const TrainerInfo = ({ trainer, onBookSession, onMessageClick, primaryGym }: TrainerInfoProps) => {
  return (
    <div className="space-y-6 mb-10">
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
          
          <Button 
            variant="link" 
            className="mt-4 p-0 h-auto text-sm flex items-center text-blue-600 hover:text-blue-800" 
            onClick={onBookSession}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View availability calendar
          </Button>
        </CardContent>
      </Card>
      
      {primaryGym && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Training Location
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-3">
              {primaryGym.logo_url ? (
                <img 
                  src={primaryGym.logo_url} 
                  alt={`${primaryGym.name} logo`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-base">{primaryGym.name}</div>
                {primaryGym.gym_type && (
                  <div className="text-sm text-primary font-medium">{primaryGym.gym_type}</div>
                )}
                {primaryGym.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{primaryGym.location}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
