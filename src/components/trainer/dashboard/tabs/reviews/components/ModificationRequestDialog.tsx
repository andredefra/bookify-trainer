
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
  { value: 'inappropriate_language', label: 'Inappropriate language' },
  { value: 'false_information', label: 'False information' },
  { value: 'spam', label: 'Spam or promotional content' },
  { value: 'off_topic', label: 'Off topic' },
  { value: 'other', label: 'Other' }
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
          <DialogTitle>Request Review Modification</DialogTitle>
          <p className="text-sm text-muted-foreground">
            You are requesting a modification to the review by <strong>{clientName}</strong>
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for request</Label>
            <Select value={reason} onValueChange={(value: ModificationRequest['reason']) => setReason(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
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
              <Label htmlFor="customReason">Specify the reason</Label>
              <Textarea
                id="customReason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Describe the reason for your request..."
                rows={2}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message to client</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a polite message explaining why you're requesting this modification..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!message.trim()}>
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
