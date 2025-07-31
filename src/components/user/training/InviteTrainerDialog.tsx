import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Mail } from "lucide-react";
import { toast } from "sonner";

interface InviteTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteTrainerDialog({ open, onOpenChange }: InviteTrainerDialogProps) {
  const [formData, setFormData] = useState({
    trainerEmail: '',
    trainerName: '',
    message: 'Hi! I found your trainer profile and I\'d love to work with you. Could you help me with a personalized training program?'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would implement the actual invitation logic
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success("Invitation sent successfully! The trainer will receive your message.");
      onOpenChange(false);
      setFormData({
        trainerEmail: '',
        trainerName: '',
        message: 'Hi! I found your trainer profile and I\'d love to work with you. Could you help me with a personalized training program?'
      });
    } catch (error) {
      toast.error("Failed to send invitation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite a Trainer
          </DialogTitle>
          <DialogDescription>
            Invite a personal trainer to work with you. They'll receive your message and can start creating personalized programs for you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trainerEmail">Trainer Email *</Label>
            <Input
              id="trainerEmail"
              type="email"
              placeholder="trainer@example.com"
              value={formData.trainerEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, trainerEmail: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainerName">Trainer Name (Optional)</Label>
            <Input
              id="trainerName"
              placeholder="Trainer's name"
              value={formData.trainerName}
              onChange={(e) => setFormData(prev => ({ ...prev, trainerName: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Write a message to the trainer..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100">How it works:</p>
                <ul className="mt-1 text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• The trainer will receive an email invitation</li>
                  <li>• They can accept and start creating programs for you</li>
                  <li>• You'll be notified when they respond</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.trainerEmail}>
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}