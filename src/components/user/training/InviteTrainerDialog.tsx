import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Gift, Star } from "lucide-react";
import { toast } from "sonner";

interface InviteTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteTrainerDialog({ open, onOpenChange }: InviteTrainerDialogProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    gym: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would implement the actual invitation logic
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success("Invitation sent successfully! We'll contact the personal trainer for you.");
      onOpenChange(false);
      setFormData({
        firstName: '',
        lastName: '',
        city: '',
        phone: '',
        gym: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast.error("Error sending invitation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite a Personal Trainer
          </DialogTitle>
          <DialogDescription>
            Fill in your personal trainer's details and we'll contact them to invite them to the platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Incentive Banner */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-2">
              <Gift className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-900 dark:text-green-100 mb-1">🎁 Exclusive Bonus!</p>
                <p className="text-green-800 dark:text-green-200">
                  <strong>Get 1 FREE month of Personal AI subscription</strong> for each trainer you invite to the platform (maximum 12 invitations).
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Trainer's first name"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Trainer's last name"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="trainer@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 555 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="New York, Los Angeles, etc."
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gym">Gym/Studio</Label>
              <Input
                id="gym"
                placeholder="Gym name"
                value={formData.gym}
                onChange={(e) => setFormData(prev => ({ ...prev, gym: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message with Personal Trainer Information</Label>
            <Textarea
              id="message"
              placeholder="Tell us about the trainer: specializations, experience, why you recommend them..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Star className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100">How it works:</p>
                <ul className="mt-1 text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• We'll contact the trainer directly to invite them</li>
                  <li>• You'll get 1 free month of Personal AI if they sign up</li>
                  <li>• We'll notify you when the trainer joins the platform</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.city}>
              {isLoading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}