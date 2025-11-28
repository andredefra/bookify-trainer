import { SessionItem } from "@/types/sessions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Video, Calendar, Clock, Euro } from "lucide-react";

interface InvitedSessionCardProps {
  session: SessionItem;
  onAccept: (session: SessionItem) => void;
  onDecline: (session: SessionItem) => void;
}

export function InvitedSessionCard({ session, onAccept, onDecline }: InvitedSessionCardProps) {
  return (
    <Card className="p-6 border-primary/20 bg-primary/5">
      <div className="space-y-4">
        {/* Header with badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Invited by Trainer
              </Badge>
            </div>
            <h3 className="font-semibold text-lg">{session.name}</h3>
            <p className="text-sm text-muted-foreground">with {session.trainer}</p>
          </div>
          {session.paymentRequired && session.price && (
            <div className="text-right">
              <div className="text-2xl font-bold text-primary flex items-center justify-end gap-1">
                <Euro className="w-5 h-5" />
                {session.price}
              </div>
              <p className="text-xs text-muted-foreground">Payment required</p>
            </div>
          )}
        </div>

        {/* Trainer Message */}
        {session.inviteMessage && (
          <div className="bg-background/50 rounded-lg p-4 border border-border">
            <p className="text-sm italic text-foreground">"{session.inviteMessage}"</p>
          </div>
        )}

        {/* Session Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{typeof session.date === 'string' ? session.date : session.date.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{session.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm col-span-2">
            {session.mode === 'video' ? (
              <>
                <Video className="w-4 h-4 text-muted-foreground" />
                <span>Video Session</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="line-clamp-1">{session.address}</span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        {session.description && (
          <p className="text-sm text-muted-foreground">{session.description}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            onClick={() => onAccept(session)}
            className="flex-1"
            size="lg"
          >
            {session.paymentRequired && session.price ? (
              <>Accept & Pay €{session.price}</>
            ) : (
              <>Accept Invitation</>
            )}
          </Button>
          <Button 
            onClick={() => onDecline(session)}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Decline
          </Button>
        </div>
      </div>
    </Card>
  );
}
