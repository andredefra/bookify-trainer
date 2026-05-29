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
import { toast } from "sonner";
import { TrainerData } from "../data/trainerData";

interface ContactTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainer: TrainerData;
  trainerId: number;
}

export function ContactTrainerDialog({
  open,
  onOpenChange,
  trainer,
  trainerId,
}: ContactTrainerDialogProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!body.trim()) {
      toast.error("Write a message before sending");
      return;
    }

    const request = {
      id: crypto.randomUUID(),
      trainerId,
      trainerName: trainer.name,
      fromName: "You",
      subject: subject.trim(),
      body: body.trim(),
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("trainer-contact-requests") || "[]",
    );
    localStorage.setItem(
      "trainer-contact-requests",
      JSON.stringify([request, ...existing]),
    );
    window.dispatchEvent(new Event("trainer-contact-requests-changed"));

    toast.success(
      `Message sent to ${trainer.name.split(" ")[0]}. You'll be notified when they reply.`,
    );

    setSubject("");
    setBody("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send a message</DialogTitle>
          <DialogDescription>
            Introduce yourself. The trainer can choose to reply and start a
            conversation.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 rounded-lg border p-3 bg-muted/30">
          <Avatar className="h-10 w-10">
            <AvatarImage src={trainer.image} alt={trainer.name} />
            <AvatarFallback>{trainer.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold leading-tight">{trainer.name}</p>
            <p className="text-xs text-muted-foreground">{trainer.title}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="msg-subject">Subject (optional)</Label>
          <Input
            id="msg-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="E.g. Interested in your coaching"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="msg-body">Message</Label>
          <Textarea
            id="msg-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Hi! I'd love to ask you a couple of questions about…"
            rows={5}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Send message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
