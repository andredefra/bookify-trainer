import { useState, useMemo } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, Calendar, Euro, Info } from "lucide-react";
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
  const [duration, setDuration] = useState<"60" | "90">("60");
  const [message, setMessage] = useState("");

  const estimatedPrice = useMemo(
    () => Math.round(trainer.hourlyRate * (parseInt(duration) / 60)),
    [trainer.hourlyRate, duration],
  );

  const availabilitySummary = useMemo(() => {
    const days = Object.entries(trainer.availability)
      .filter(([, slots]) => slots[0] && slots[0] !== "Closed")
      .map(([day, slots]) => `${day.slice(0, 3)}: ${slots.join(", ")}`);
    return days.join(" · ");
  }, [trainer.availability]);

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
      hourlyRate: trainer.hourlyRate,
      duration: parseInt(duration),
      estimatedPrice,
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

    // reset & close
    setSlots([newSlot()]);
    setDuration("60");
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a session</DialogTitle>
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
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Euro className="h-3.5 w-3.5" />€{trainer.hourlyRate}/hour
            </p>
          </div>
        </div>

        {availabilitySummary && (
          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>Trainer availability — {availabilitySummary}</span>
          </p>
        )}

        {/* Duration */}
        <div className="space-y-2">
          <Label>Session duration</Label>
          <Select
            value={duration}
            onValueChange={(v) => setDuration(v as "60" | "90")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="60">60 minutes</SelectItem>
              <SelectItem value="90">90 minutes</SelectItem>
            </SelectContent>
          </Select>
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

        {/* Estimated price */}
        <div className="rounded-lg border p-3 bg-muted/30 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Estimated price</p>
            <p className="text-xs text-muted-foreground">
              Trainer may adjust the price or offer the session for free.
            </p>
          </div>
          <p className="text-2xl font-bold flex items-center gap-1">
            <Euro className="h-5 w-5" />
            {estimatedPrice}
          </p>
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
