import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Hourglass, Euro, X } from "lucide-react";
import { safeFormatDate } from "@/utils/safeFormatDate";

export interface PendingSessionRequest {
  id: string;
  trainerId: number;
  trainerName: string;
  trainerImage?: string;
  hourlyRate: number;
  duration: number;
  estimatedPrice: number;
  proposedSlots: { date: string; time: string }[];
  message: string;
  status: "awaiting_trainer" | "declined" | "confirmed";
  createdAt: string;
}

interface Props {
  request: PendingSessionRequest;
  onCancel: (id: string) => void;
}

export function PendingRequestCard({ request, onCancel }: Props) {
  return (
    <Card className="p-6 border-amber-200 bg-amber-50/40 dark:bg-amber-950/10">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={request.trainerImage} alt={request.trainerName} />
              <AvatarFallback>{request.trainerName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Hourglass className="w-4 h-4 text-amber-600" />
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 border-amber-200"
                >
                  Awaiting trainer
                </Badge>
              </div>
              <h3 className="font-semibold">Session request</h3>
              <p className="text-sm text-muted-foreground">
                with {request.trainerName} · {request.duration} min
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold flex items-center justify-end gap-1">
              <Euro className="w-4 h-4" />
              {request.estimatedPrice}
            </div>
            <p className="text-xs text-muted-foreground">Estimated</p>
          </div>
        </div>

        {request.message && (
          <div className="bg-background/60 rounded-lg p-3 border border-border">
            <p className="text-sm italic">"{request.message}"</p>
          </div>
        )}

        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground uppercase">
            Proposed times
          </p>
          <div className="grid sm:grid-cols-3 gap-2">
            {request.proposedSlots.map((slot, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-sm rounded-md border bg-background px-2 py-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{safeFormatDate(slot.date, "MMM d")}</span>
                <Clock className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                <span>{slot.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(request.id)}
            className="text-muted-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel request
          </Button>
        </div>
      </div>
    </Card>
  );
}
