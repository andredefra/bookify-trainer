import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, Users, Package } from 'lucide-react';
import { useSessionBooking } from '@/hooks/gym/useSessionBooking';
import { useGymTrainerAssignments } from '@/hooks/gym/useGymTrainerAssignments';

interface SessionBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionSchedule: {
    id: string;
    start_datetime: string;
    end_datetime: string;
    gym_group_session_id: string;
    session?: {
      title: string;
      max_participants: number;
      duration_minutes: number;
    };
  } | null;
}

export function SessionBookingDialog({
  open,
  onOpenChange,
  sessionSchedule
}: SessionBookingDialogProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [validation, setValidation] = useState<any>(null);
  
  const { validateBooking, bookSession, loading } = useSessionBooking();
  const { availableClients } = useGymTrainerAssignments();

  // Demo clients if none available
  const clients = availableClients.length > 0 ? availableClients : [
    { id: '44444444-4444-4444-4444-444444444444', name: 'Maria Rodriguez', email: 'maria@example.com' },
    { id: '55555555-5555-5555-5555-555555555555', name: 'John Smith', email: 'john@example.com' },
    { id: '66666666-6666-6666-6666-666666666666', name: 'Lisa Brown', email: 'lisa@example.com' },
    { id: '77777777-8888-8888-8888-777777777777', name: 'David Wilson', email: 'david@example.com' }
  ];

  // Validate booking when client changes
  useEffect(() => {
    if (selectedClient && sessionSchedule) {
      validateBooking(selectedClient, sessionSchedule.id).then(setValidation);
    }
  }, [selectedClient, sessionSchedule, validateBooking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !sessionSchedule || !validation?.canBook) return;

    const success = await bookSession(
      selectedClient,
      sessionSchedule.id,
      selectedPackage || undefined
    );

    if (success) {
      setSelectedClient('');
      setSelectedPackage('');
      setValidation(null);
      onOpenChange(false);
    }
  };

  if (!sessionSchedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Session</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Session Info */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {sessionSchedule.session?.title || 'Group Session'}
            </h4>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(sessionSchedule.start_datetime).toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {sessionSchedule.session?.max_participants || 20} max
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Validation Results */}
            {validation && (
              <div className="space-y-3">
                {!validation.canBook ? (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {validation.reason}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-2">
                    <Label>Available Packages</Label>
                    <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select package (optional - will use first available)" />
                      </SelectTrigger>
                      <SelectContent>
                        {validation.packagesAvailable.map((pkg: any) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{pkg.title}</span>
                              <div className="flex gap-2">
                                <Badge variant="secondary">
                                  {pkg.sessions_remaining === Infinity ? '∞' : pkg.sessions_remaining} left
                                </Badge>
                                {pkg.expires_at && (
                                  <Badge variant="outline">
                                    Expires {new Date(pkg.expires_at).toLocaleDateString()}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !validation?.canBook}
              >
                {loading ? 'Booking...' : 'Book Session'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}