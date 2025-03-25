
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ClientInviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientInviteDialog({ open, onOpenChange }: ClientInviteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite New Client</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="client-email">Client Email</Label>
            <Input id="client-email" placeholder="client@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-name">Client Name (Optional)</Label>
            <Input id="client-name" placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Personalized Message</Label>
            <Input id="message" placeholder="I'd like to invite you to train with me..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="program">Assign Program (Optional)</Label>
            <Select>
              <SelectTrigger id="program">
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strength">Strength & Conditioning</SelectItem>
                <SelectItem value="weight-loss">Weight Loss Program</SelectItem>
                <SelectItem value="mobility">Flexibility & Recovery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
