import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Reply, X } from "lucide-react";
import { safeFormatDate } from "@/utils/safeFormatDate";

export type ContactRelationship = "prospect" | "crm" | "client";

export interface ContactRequest {
  id: string;
  trainerId: number;
  trainerName: string;
  fromName: string;
  subject?: string;
  body: string;
  status: "pending" | "replied" | "denied";
  relationship?: ContactRelationship;
  createdAt: string;
}

interface Props {
  request: ContactRequest;
  onReply: (request: ContactRequest) => void;
  onDeny: (request: ContactRequest) => void;
}

export function ContactRequestCard({ request, onReply, onDeny }: Props) {
  return (
    <Card className="p-4 border-primary/30 bg-primary/5">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              New contact
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            {safeFormatDate(request.createdAt, "MMM d, HH:mm")}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium">{request.fromName}</p>
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
              Prospect
            </Badge>
          </div>
          {request.subject && (
            <p className="text-sm font-semibold mt-1">{request.subject}</p>
          )}
          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
            {request.body}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => onReply(request)}
            className="flex-1 gap-1"
          >
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDeny(request)}
            className="flex-1 gap-1"
          >
            <X className="h-4 w-4" />
            Deny
          </Button>
        </div>
      </div>
    </Card>
  );
}
