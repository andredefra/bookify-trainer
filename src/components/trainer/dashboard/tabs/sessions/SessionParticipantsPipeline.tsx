import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { SessionParticipant } from "@/hooks/useSessionSales";
import { 
  User, 
  UserPlus, 
  MessageCircle, 
  Eye,
  Building2,
  Globe,
  CalendarCheck
} from "lucide-react";

interface SessionParticipantsPipelineProps {
  participants: SessionParticipant[];
  onAddToCRM: (participantId: string) => void;
}

function SourceBadge({ source }: { source: SessionParticipant['source'] }) {
  const config = {
    gym: { 
      icon: <Building2 className="h-3 w-3" />, 
      label: 'Gym',
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    },
    marketplace: { 
      icon: <Globe className="h-3 w-3" />, 
      label: 'Marketplace',
      className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    },
    public_session: { 
      icon: <CalendarCheck className="h-3 w-3" />, 
      label: 'Public Session',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    },
  };

  const { icon, label, className } = config[source];

  return (
    <Badge variant="outline" className={`gap-1 ${className}`}>
      {icon}
      {label}
    </Badge>
  );
}

export function SessionParticipantsPipeline({ 
  participants, 
  onAddToCRM 
}: SessionParticipantsPipelineProps) {
  // Separate leads and existing clients
  const potentialLeads = participants.filter(p => !p.isExistingClient && !p.addedToCRM);
  const addedLeads = participants.filter(p => !p.isExistingClient && p.addedToCRM);
  const existingClients = participants.filter(p => p.isExistingClient);

  const renderParticipantCard = (participant: SessionParticipant) => (
    <Card key={participant.id} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {participant.isExistingClient ? (
              <Badge className="bg-green-500 text-white gap-1">
                <User className="h-3 w-3" />
                Client
              </Badge>
            ) : participant.addedToCRM ? (
              <Badge variant="secondary" className="gap-1">
                <UserPlus className="h-3 w-3" />
                Lead
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-900/20">
                <UserPlus className="h-3 w-3" />
                New
              </Badge>
            )}
            <SourceBadge source={participant.source} />
          </div>
          
          <h4 className="font-medium text-sm truncate">{participant.participantName}</h4>
          <p className="text-xs text-muted-foreground truncate">{participant.participantEmail}</p>
          {participant.participantPhone && (
            <p className="text-xs text-muted-foreground">{participant.participantPhone}</p>
          )}
          
          <div className="mt-2 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">{participant.sessionTitle}</p>
            <p>{format(new Date(participant.sessionDate), "MMM dd, yyyy")}</p>
            {participant.checkInTime && (
              <p>Check-in: {participant.checkInTime}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {!participant.isExistingClient && !participant.addedToCRM && (
            <Button
              size="sm"
              onClick={() => onAddToCRM(participant.id)}
              className="h-8"
            >
              <UserPlus className="h-3 w-3 mr-1" />
              Add to CRM
            </Button>
          )}
          
          {participant.isExistingClient && (
            <Button size="sm" variant="outline" className="h-8">
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          )}
          
          <Button size="sm" variant="ghost" className="h-8">
            <MessageCircle className="h-3 w-3 mr-1" />
            Contact
          </Button>
        </div>
      </div>
    </Card>
  );

  if (participants.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">No participants found</p>
        <p className="text-xs mt-1">Participants from public sessions will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Potential Leads - Not yet in CRM */}
      {potentialLeads.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-sm">Potential Leads</h3>
            <Badge variant="destructive" className="h-5 px-2">
              {potentialLeads.length}
            </Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {potentialLeads.map(renderParticipantCard)}
          </div>
        </div>
      )}

      {/* Added to CRM */}
      {addedLeads.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-sm">Added to CRM</h3>
            <Badge variant="secondary" className="h-5 px-2">
              {addedLeads.length}
            </Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {addedLeads.map(renderParticipantCard)}
          </div>
        </div>
      )}

      {/* Existing Clients */}
      {existingClients.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-sm">Existing Clients</h3>
            <Badge className="bg-green-500 h-5 px-2">
              {existingClients.length}
            </Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {existingClients.map(renderParticipantCard)}
          </div>
        </div>
      )}
    </div>
  );
}
