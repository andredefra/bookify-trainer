import { SessionRequest } from "@/hooks/useSessionSales";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Video, MapPin, Mail, Phone, User, CheckCircle2, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

interface SessionRequestCardProps {
  request: SessionRequest;
  onViewDetails: (request: SessionRequest) => void;
  onApprove: (request: SessionRequest) => void;
  onDecline: (request: SessionRequest) => void;
  onAddToCRM?: (request: SessionRequest) => void;
}

export function SessionRequestCard({ request, onViewDetails, onApprove, onDecline, onAddToCRM }: SessionRequestCardProps) {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const messagePreview = request.message.slice(0, 80);
  const needsTruncation = request.message.length > 80;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header with Type Badge */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold text-lg">{request.clientName}</h3>
              {request.requesterType === 'prospect' ? (
                <Badge variant="default" className="mt-1">
                  🆕 NEW PROSPECT
                </Badge>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">
                    👤 EXISTING CLIENT
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {request.previousSessionsCount} sessions completed
                  </span>
                </div>
              )}
            </div>
          </div>
          <Badge variant="outline" className="text-lg font-bold">
            {formatCurrency(request.price)}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {request.clientEmail}
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            {request.clientPhone}
          </div>
        </div>

        {/* Session Details */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-muted/30 rounded-lg">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Session</p>
            <p className="font-medium text-sm">{request.sessionTitle}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Type</p>
            <Badge variant="outline" className="gap-1">
              {request.sessionType === 'video' ? (
                <>
                  <Video className="h-3 w-3" />
                  Video
                </>
              ) : (
                <>
                  <MapPin className="h-3 w-3" />
                  In-person
                </>
              )}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Requested Date</p>
            <div className="flex items-center gap-1 text-sm">
              <CalendarDays className="h-3 w-3" />
              {format(new Date(request.requestedDate), 'MMM dd, yyyy')}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Time & Duration</p>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="h-3 w-3" />
              {request.requestedTime} ({request.duration}min)
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Message</p>
          <p className="text-sm leading-relaxed">
            {showFullMessage || !needsTruncation ? request.message : `${messagePreview}...`}
            {needsTruncation && (
              <button
                onClick={() => setShowFullMessage(!showFullMessage)}
                className="ml-2 text-primary hover:underline text-xs font-medium"
              >
                {showFullMessage ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        </div>

        {/* Request Date */}
        <div className="text-xs text-muted-foreground">
          Requested {format(new Date(request.requestDate), 'MMM dd, yyyy \'at\' HH:mm')}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t flex-wrap">
          {onAddToCRM && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAddToCRM(request)}
              className="gap-1"
            >
              📋 Add to CRM
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(request)}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            View Details
          </Button>
          <div className="ml-auto flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDecline(request)}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Decline
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onApprove(request)}
              className="gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Accept
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
