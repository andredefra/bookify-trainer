import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SessionRequest } from "@/hooks/useSessionSales";
import { Calendar, Clock, DollarSign, Mail, MapPin, Phone, User, MessageSquare, TrendingUp } from "lucide-react";
import { format } from "date-fns";

interface SessionRequestDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: SessionRequest | null;
  onApprove: (request: SessionRequest) => void;
  onDecline: (request: SessionRequest) => void;
  onAddToCRM: (request: SessionRequest) => void;
}

export function SessionRequestDetailDialog({
  open,
  onOpenChange,
  request,
  onApprove,
  onDecline,
  onAddToCRM
}: SessionRequestDetailDialogProps) {
  if (!request) return null;

  const isProspect = request.requesterType === 'prospect';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-2xl">{request.clientName}</DialogTitle>
            <Badge variant={isProspect ? "default" : "secondary"} className="text-xs">
              {isProspect ? "🆕 NEW PROSPECT" : "👤 EXISTING CLIENT"}
            </Badge>
          </div>
          <DialogDescription>
            Session request details and contact information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Prospect Alert with Add to CRM */}
          {isProspect && (
            <Alert className="border-primary/50 bg-primary/5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <AlertDescription className="flex items-center justify-between">
                <span className="text-sm">
                  This is a new prospect! Add them to your CRM to track and nurture this lead.
                </span>
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => {
                    onAddToCRM(request);
                    onOpenChange(false);
                  }}
                  className="ml-4"
                >
                  📋 Add to CRM as Lead
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-7">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${request.clientEmail}`} className="hover:underline">
                  {request.clientEmail}
                </a>
              </div>
              {request.clientPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${request.clientPhone}`} className="hover:underline">
                    {request.clientPhone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Session Details</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{request.sessionTitle}</span>
                <Badge variant="outline">{request.sessionType}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(request.requestedDate), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{request.requestedTime} ({request.duration} min)</span>
                </div>
                {request.sessionType === 'in-person' && (
                  <div className="flex items-center gap-2 col-span-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>In-person session</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">€{request.price}</span>
              </div>
            </div>
          </div>

          {/* Client Message */}
          {request.message && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Client Message
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 text-sm italic border-l-4 border-primary/50">
                "{request.message}"
              </div>
            </div>
          )}

          {/* Client History (for existing clients) */}
          {!isProspect && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Client History</h3>
              <div className="bg-muted/30 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Previous Sessions:</span>
                  <span className="font-medium">12 completed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Client Since:</span>
                  <span className="font-medium">March 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Revenue:</span>
                  <span className="font-medium text-primary">€540</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onDecline(request)}
          >
            Decline
          </Button>
          <Button
            onClick={() => onApprove(request)}
            className="bg-primary"
          >
            Accept Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
