import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GymMember } from "@/hooks/gym/useGymMembers";

interface CreateMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateMember: (memberData: Omit<GymMember, 'id' | 'totalSessions' | 'currentPackages'>) => Promise<GymMember>;
}

export function CreateMemberDialog({ open, onOpenChange, onCreateMember }: CreateMemberDialogProps) {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    membershipType: string;
    status: 'active' | 'inactive' | 'suspended';
  }>({
    name: '',
    email: '',
    phone: '',
    membershipType: 'basic',
    status: 'active' as const
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    try {
      await onCreateMember({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        membershipType: formData.membershipType,
        joinDate: new Date().toISOString(),
        status: formData.status
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        membershipType: 'basic',
        status: 'active'
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to create member:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter member's full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="membershipType">Membership Type</Label>
            <Select
              value={formData.membershipType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, membershipType: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'active' | 'inactive' | 'suspended') => 
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.name || !formData.email}
              className="flex-1"
            >
              {loading ? 'Creating...' : 'Create Member'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}