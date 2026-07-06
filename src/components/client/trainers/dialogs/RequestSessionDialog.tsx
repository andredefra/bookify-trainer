import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";
import { TrainerData } from "../data/trainerData";

interface RequestSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainer: TrainerData;
  trainerId: number;
}

interface Slot {
  id: string;
  date: string;
  time: string;
}

const newSlot = (): Slot => ({
  id: crypto.randomUUID(),
  date: "",
  time: "",
});

export function RequestSessionDialog({
  open,
  onOpenChange,
  trainer,
  trainerId,
}: RequestSessionDialogProps) {
  const [slots, setSlots] = useState<Slot[]>([newSlot()]);
  const [message, setMessage] = useState("");

  const addSlot = () => {
    if (slots.length >= 3) return;
    setSlots([...slots, newSlot()]);
  };

  const removeSlot = (id: string) => {
    if (slots.length === 1) return;
    setSlots(slots.filter((s) => s.id !== id));
  };

  const updateSlot = (id: string, patch: Partial<Slot>) => {
    setSlots(slots.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const validSlots = slots.filter((s) => s.date && s.time);

  const handleSubmit = () => {
    if (validSlots.length === 0) {
      toast.error("Add at least one date and time you'd be available");
      return;
    }
    if (!message.trim()) {
      toast.error("Add a short message for the trainer");
      return;
    }

    const request = {
      id: crypto.randomUUID(),
      trainerId,
      trainerName: trainer.name,
      trainerImage: trainer.image,
      proposedSlots: validSlots.map(({ date, time }) => ({ date, time })),
      message: message.trim(),
      status: "awaiting_trainer" as const,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("client-session-requests") || "[]",
    );
    localStorage.setItem(
      "client-session-requests",
      JSON.stringify([request, ...existing]),
    );
    window.dispatchEvent(new Event("client-session-requests-changed"));

    toast.success(
      `Request sent. ${trainer.name.split(" ")[0]} will review your proposed times and reply.`,
    );

    setSlots([newSlot()]);
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request an event</DialogTitle>
          <DialogDescription>
            Propose up to 3 dates that work for you. The trainer will confirm
            one and send a final invitation.
          </DialogDescription>
        </DialogHeader>

        {/* Trainer summary */}
        <div className="flex items-center gap-3 rounded-lg border p-3 bg-muted/30">
          <Avatar className="h-12 w-12">
            <AvatarImage src={trainer.image} alt={trainer.name} />
            <AvatarFallback>{trainer.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{trainer.name}</p>
          </div>
        </div>

        {/* Proposed slots */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Propose timeslots</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addSlot}
              disabled={slots.length >= 3}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add option
            </Button>
          </div>
          <div className="space-y-2">
            {slots.map((slot, idx) => (
              <div key={slot.id} className="flex items-center gap-2">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="date"
                      value={slot.date}
                      onChange={(e) =>
                        updateSlot(slot.id, { date: e.target.value })
                      }
                      className="pl-8"
                      aria-label={`Date option ${idx + 1}`}
                    />
                  </div>
                  <Input
                    type="time"
                    value={slot.time}
                    onChange={(e) =>
                      updateSlot(slot.id, { time: e.target.value })
                    }
                    aria-label={`Time option ${idx + 1}`}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSlot(slot.id)}
                  disabled={slots.length === 1}
                  aria-label="Remove option"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="req-msg">Message to trainer</Label>
          <Textarea
            id="req-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi! I'd like to book a session to work on…"
            rows={4}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Send request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
