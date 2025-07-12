import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateGymPackageData } from '@/hooks/gym/useGymPackages';

interface CreatePackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateGymPackageData) => Promise<any>;
}

export function CreatePackageDialog({ open, onOpenChange, onSubmit }: CreatePackageDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateGymPackageData>({
    title: '',
    description: '',
    package_type: 'monthly',
    price: 0,
    duration_days: 30,
    session_limit: undefined,
    trainer_commission_percentage: 20
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        ...formData,
        price: Number(formData.price),
        duration_days: formData.package_type === 'unlimited' ? undefined : Number(formData.duration_days),
        session_limit: formData.session_limit ? Number(formData.session_limit) : undefined,
        trainer_commission_percentage: Number(formData.trainer_commission_percentage)
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        package_type: 'monthly',
        price: 0,
        duration_days: 30,
        session_limit: undefined,
        trainer_commission_percentage: 20
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating package:', error);
    } finally {
      setLoading(false);
    }
  };

  const packageTypes = [
    { value: 'daily', label: 'Daily', defaultDays: 1 },
    { value: 'weekly', label: 'Weekly', defaultDays: 7 },
    { value: 'monthly', label: 'Monthly', defaultDays: 30 },
    { value: 'quarterly', label: 'Quarterly', defaultDays: 90 },
    { value: 'yearly', label: 'Yearly', defaultDays: 365 },
    { value: 'unlimited', label: 'Unlimited', defaultDays: null }
  ];

  const handlePackageTypeChange = (value: string) => {
    const selectedType = packageTypes.find(t => t.value === value);
    setFormData(prev => ({
      ...prev,
      package_type: value,
      duration_days: selectedType?.defaultDays || undefined
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Package</DialogTitle>
          <DialogDescription>
            Create a new gym package that can be assigned to clients.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Package Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Premium Monthly Package"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Package description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="package_type">Package Type</Label>
              <Select value={formData.package_type} onValueChange={handlePackageTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {packageTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (€)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                required
              />
            </div>
          </div>

          {formData.package_type !== 'unlimited' && (
            <div className="space-y-2">
              <Label htmlFor="duration_days">Duration (Days)</Label>
              <Input
                id="duration_days"
                type="number"
                min="1"
                value={formData.duration_days || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, duration_days: Number(e.target.value) }))}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="session_limit">Session Limit (Optional)</Label>
            <Input
              id="session_limit"
              type="number"
              min="1"
              value={formData.session_limit || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                session_limit: e.target.value ? Number(e.target.value) : undefined 
              }))}
              placeholder="Leave empty for unlimited sessions"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainer_commission">Trainer Commission (%)</Label>
            <Input
              id="trainer_commission"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formData.trainer_commission_percentage}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                trainer_commission_percentage: Number(e.target.value) 
              }))}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Package'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}