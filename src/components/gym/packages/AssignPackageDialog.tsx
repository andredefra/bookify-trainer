import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { GymPackage } from '@/hooks/gym/useGymPackages';
import { useGymTrainerAssignments } from '@/hooks/gym/useGymTrainerAssignments';

interface AssignPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packages: GymPackage[];
  onAssign: (packageId: string, clientId: string, trainerId: string) => Promise<any>;
}

export function AssignPackageDialog({ 
  open, 
  onOpenChange, 
  packages, 
  onAssign 
}: AssignPackageDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('');
  
  const { assignments } = useGymTrainerAssignments();

  // Get unique clients and trainers from assignments
  const clients = assignments.map(a => ({ id: a.client_id, name: `Client ${a.client_id.slice(0, 8)}` }));
  const trainers = assignments.map(a => ({ id: a.trainer_id, name: `Trainer ${a.trainer_id.slice(0, 8)}` }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !selectedClient || !selectedTrainer) return;

    setLoading(true);
    try {
      await onAssign(selectedPackage, selectedClient, selectedTrainer);
      setSelectedPackage('');
      setSelectedClient('');
      setSelectedTrainer('');
      onOpenChange(false);
    } catch (error) {
      console.error('Error assigning package:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedPackageData = packages.find(p => p.id === selectedPackage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Package to Client</DialogTitle>
          <DialogDescription>
            Select a package and assign it to a client with their trainer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="package">Package</Label>
            <Select value={selectedPackage} onValueChange={setSelectedPackage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a package" />
              </SelectTrigger>
              <SelectContent>
                {packages.filter(p => p.is_active).map(pkg => (
                  <SelectItem key={pkg.id} value={pkg.id}>
                    {pkg.title} - €{pkg.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPackageData && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">{selectedPackageData.description}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Type: {selectedPackageData.package_type}</span>
                <span>Duration: {selectedPackageData.duration_days ? `${selectedPackageData.duration_days} days` : 'Unlimited'}</span>
              </div>
              {selectedPackageData.session_limit && (
                <p className="text-sm">Sessions: {selectedPackageData.session_limit}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trainer">Trainer</Label>
            <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
              <SelectTrigger>
                <SelectValue placeholder="Select a trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map(trainer => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !selectedPackage || !selectedClient || !selectedTrainer}
            >
              {loading ? 'Assigning...' : 'Assign Package'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}