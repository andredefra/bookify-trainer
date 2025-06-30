
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModificationRequest } from "../types";

interface ModificationRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: string;
  clientName: string;
  onSubmit: (request: ModificationRequest) => void;
}

const modificationReasons = [
  { value: 'inappropriate_language', label: 'Linguaggio inappropriato' },
  { value: 'false_information', label: 'Informazioni false' },
  { value: 'spam', label: 'Spam o contenuto promozionale' },
  { value: 'off_topic', label: 'Fuori argomento' },
  { value: 'other', label: 'Altro' }
];

export function ModificationRequestDialog({
  open,
  onOpenChange,
  reviewId,
  clientName,
  onSubmit
}: ModificationRequestDialogProps) {
  const [reason, setReason] = useState<ModificationRequest['reason']>('inappropriate_language');
  const [message, setMessage] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    onSubmit({
      reviewId,
      reason,
      customReason: reason === 'other' ? customReason : undefined,
      trainerMessage: message
    });

    // Reset form
    setReason('inappropriate_language');
    setMessage('');
    setCustomReason('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Richiedi Modifica Recensione</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Stai richiedendo una modifica alla recensione di <strong>{clientName}</strong>
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Motivo della richiesta</Label>
            <Select value={reason} onValueChange={(value: ModificationRequest['reason']) => setReason(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona un motivo" />
              </SelectTrigger>
              <SelectContent>
                {modificationReasons.map((reasonOption) => (
                  <SelectItem key={reasonOption.value} value={reasonOption.value}>
                    {reasonOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {reason === 'other' && (
            <div className="space-y-2">
              <Label htmlFor="customReason">Specifica il motivo</Label>
              <Textarea
                id="customReason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Descrivi il motivo della richiesta..."
                rows={2}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Messaggio per il cliente</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Scrivi un messaggio educato spiegando perché stai richiedendo questa modifica..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button type="submit" disabled={!message.trim()}>
              Invia Richiesta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
