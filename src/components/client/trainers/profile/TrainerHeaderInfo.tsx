import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { TrainerData } from "../data/trainerData";
import { RequestSessionDialog } from "../dialogs/RequestSessionDialog";
import { ContactTrainerDialog } from "../dialogs/ContactTrainerDialog";

interface TrainerHeaderInfoProps {
  trainer: TrainerData;
  trainerId: number;
  averageRating: number;
}

export function TrainerHeaderInfo({
  trainer,
  trainerId,
  averageRating,
}: TrainerHeaderInfoProps) {
  const [showRequest, setShowRequest] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const canBookSessions = (trainer.plan ?? "essential") !== "basic";

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h1 className="text-3xl font-bold text-foreground">{trainer.name}</h1>
          <div className="flex gap-1 flex-wrap">
            {trainer.highlights.map((highlight) => (
              <Badge
                key={highlight}
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        <h2 className="text-xl text-muted-foreground mb-4">{trainer.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{trainer.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{trainer.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm">
              {averageRating.toFixed(1)} ({trainer.reviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 lg:min-w-[200px]">
        {canBookSessions && (
          <Button
            size="lg"
            onClick={() => setShowRequest(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Session
          </Button>
        )}
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowContact(true)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Send Message
        </Button>
        {!canBookSessions && (
          <p className="text-xs text-muted-foreground text-center">
            This trainer isn't accepting session bookings — you can still
            message them.
          </p>
        )}
      </div>

      <RequestSessionDialog
        open={showRequest}
        onOpenChange={setShowRequest}
        trainer={trainer}
        trainerId={trainerId}
      />
      <ContactTrainerDialog
        open={showContact}
        onOpenChange={setShowContact}
        trainer={trainer}
        trainerId={trainerId}
      />
    </div>
  );
}
