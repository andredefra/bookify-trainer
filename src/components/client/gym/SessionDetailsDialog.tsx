import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Users, User, Star, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface SessionDetails {
  id: string;
  title: string;
  description: string;
  session_type: string;
  difficulty_level: string;
  duration_minutes: number;
  max_participants: number;
  start_datetime: string;
  end_datetime: string;
  assigned_trainer_name?: string;
  location: string;
  status: string;
  available_spots: number;
  is_booked: boolean;
  requirements?: string[];
  equipment_needed?: string[];
  benefits?: string[];
  trainer_bio?: string;
  trainer_rating?: number;
  cancellation_policy?: string;
}

interface SessionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionDetails | null;
  onBookSession?: (sessionId: string) => Promise<void>;
  onCancelBooking?: (sessionId: string) => Promise<void>;
}

export function SessionDetailsDialog({ 
  open, 
  onOpenChange, 
  session,
  onBookSession,
  onCancelBooking
}: SessionDetailsDialogProps) {
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  if (!session) return null;

  const handleBookSession = async () => {
    if (!onBookSession) return;
    
    setProcessing(true);
    try {
      await onBookSession(session.id);
      toast({
        title: "Session Booked",
        description: `Successfully booked ${session.title}`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Unable to book session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!onCancelBooking) return;
    
    setProcessing(true);
    try {
      await onCancelBooking(session.id);
      toast({
        title: "Booking Cancelled",
        description: `Cancelled booking for ${session.title}`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Cancellation Failed",
        description: "Unable to cancel booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'yoga': 'bg-purple-100 text-purple-800',
      'hiit': 'bg-red-100 text-red-800',
      'pilates': 'bg-pink-100 text-pink-800',
      'swimming': 'bg-blue-100 text-blue-800',
      'weight_training': 'bg-orange-100 text-orange-800',
      'cardio': 'bg-emerald-100 text-emerald-800',
      'dance': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Session Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold">{session.title}</h2>
                  <Badge variant="secondary" className={getTypeColor(session.session_type)}>
                    {session.session_type}
                  </Badge>
                  <Badge variant="secondary" className={getDifficultyColor(session.difficulty_level)}>
                    {session.difficulty_level}
                  </Badge>
                  {session.is_booked && (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Booked
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{session.description}</p>
              </div>
            </div>

            {/* Session Info */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">
                        {format(new Date(session.start_datetime), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">
                        {format(new Date(session.start_datetime), 'HH:mm')} - {format(new Date(session.end_datetime), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{session.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Availability</p>
                      <p className="text-muted-foreground">
                        {session.available_spots}/{session.max_participants} spots
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trainer Info */}
          {session.assigned_trainer_name && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4" />
                      <h3 className="font-medium">Trainer</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{session.assigned_trainer_name}</p>
                        {session.trainer_rating && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">
                              {session.trainer_rating}/5
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {session.trainer_bio && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {session.trainer_bio}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements */}
            {session.requirements && session.requirements.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {session.requirements.map((requirement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Equipment */}
            {session.equipment_needed && session.equipment_needed.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3">Equipment Needed</h3>
                  <ul className="space-y-2">
                    {session.equipment_needed.map((equipment, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {equipment}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {session.benefits && session.benefits.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {session.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Cancellation Policy */}
            {session.cancellation_policy && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-3">Cancellation Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    {session.cancellation_policy}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            {session.is_booked ? (
              <Button 
                variant="destructive"
                className="flex-1"
                onClick={handleCancelBooking}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Cancelling...
                  </>
                ) : (
                  'Cancel Booking'
                )}
              </Button>
            ) : (
              <Button 
                className="flex-1"
                onClick={handleBookSession}
                disabled={processing || session.available_spots === 0}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Booking...
                  </>
                ) : session.available_spots === 0 ? (
                  'Session Full'
                ) : (
                  'Book Session'
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}