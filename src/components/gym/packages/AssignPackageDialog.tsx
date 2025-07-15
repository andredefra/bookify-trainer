import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GymPackage } from '@/hooks/gym/useGymPackages';
import { useGymTrainerAssignments } from '@/hooks/gym/useGymTrainerAssignments';
import { useGymNotifications } from '@/hooks/gym/useGymNotifications';
import { toast } from 'sonner';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { GymMember } from '@/types/gym/members';

interface AssignPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packages: GymPackage[];
  selectedMember?: GymMember | null;
  onAssign: (assignmentData: PackageAssignmentData) => Promise<any>;
}

interface PackageAssignmentData {
  packageId: string;
  clientId: string;
  trainerId?: string;
  startDate: Date;
  endDate?: Date;
  sessionsUsed: number;
  totalPaid: number;
  paymentStatus: string;
  customPackage?: {
    title: string;
    description: string;
    packageType: string;
    sessionsTotal: number;
    price: number;
    durationDays?: number;
  };
}

export function AssignPackageDialog({ 
  open, 
  onOpenChange, 
  packages, 
  selectedMember,
  onAssign 
}: AssignPackageDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [sessionsUsed, setSessionsUsed] = useState<number>(0);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<string>('paid');
  const [isCustomPackage, setIsCustomPackage] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customType, setCustomType] = useState('sessions');
  const [customSessions, setCustomSessions] = useState<number>(10);
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [customDurationDays, setCustomDurationDays] = useState<number | undefined>();
  
  const { availableTrainers, availableClients } = useGymTrainerAssignments();
  const { createNotification } = useGymNotifications();

  // Use consistent demo data
  const clients = availableClients.length > 0 ? availableClients : [
    { id: '44444444-4444-4444-4444-444444444444', name: 'Maria Rodriguez', email: 'maria@example.com' },
    { id: '55555555-5555-5555-5555-555555555555', name: 'John Smith', email: 'john@example.com' },
    { id: '66666666-6666-6666-6666-666666666666', name: 'Lisa Brown', email: 'lisa@example.com' },
    { id: '77777777-8888-8888-8888-777777777777', name: 'David Wilson', email: 'david@example.com' }
  ];
  
  const trainers = availableTrainers.length > 0 ? availableTrainers : [
    { id: '22222222-2222-2222-2222-222222222222', name: 'Alex Johnson', email: 'alex@fitlifegym.com' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Sarah Wilson', email: 'sarah@fitlifegym.com' },
    { id: '77777777-1111-1111-1111-777777777777', name: 'Mike Rodriguez', email: 'mike@fitlifegym.com' }
  ];

  // Reset form when dialog opens/closes or member changes
  useEffect(() => {
    if (open) {
      if (selectedMember) {
        setSelectedClient(selectedMember.id);
      }
      // Reset other fields
      setSelectedPackage('');
      setSelectedTrainer('');
      setStartDate(new Date());
      setEndDate(undefined);
      setSessionsUsed(0);
      setTotalPaid(0);
      setPaymentStatus('paid');
      setIsCustomPackage(false);
      setCustomTitle('');
      setCustomDescription('');
      setCustomType('sessions');
      setCustomSessions(10);
      setCustomPrice(0);
      setCustomDurationDays(undefined);
    }
  }, [open, selectedMember]);

  // Update price and end date when package is selected
  useEffect(() => {
    if (selectedPackage && !isCustomPackage) {
      const packageData = packages.find(p => p.id === selectedPackage);
      if (packageData) {
        setTotalPaid(packageData.price);
        if (packageData.duration_days) {
          const calculatedEndDate = new Date(startDate);
          calculatedEndDate.setDate(calculatedEndDate.getDate() + packageData.duration_days);
          setEndDate(calculatedEndDate);
        }
      }
    }
  }, [selectedPackage, startDate, packages, isCustomPackage]);

  // Update end date for custom packages
  useEffect(() => {
    if (isCustomPackage && customDurationDays) {
      const calculatedEndDate = new Date(startDate);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + customDurationDays);
      setEndDate(calculatedEndDate);
    }
  }, [isCustomPackage, customDurationDays, startDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isCustomPackage) {
      if (!customTitle || !selectedClient) return;
    } else {
      if (!selectedPackage || !selectedClient) return;
    }

    // Validation
    if (isCustomPackage && sessionsUsed > customSessions) {
      toast.error('Sessions used cannot exceed total sessions');
      return;
    }

    if (!isCustomPackage) {
      const packageData = packages.find(p => p.id === selectedPackage);
      if (packageData?.session_limit && sessionsUsed > packageData.session_limit) {
        toast.error('Sessions used cannot exceed package limit');
        return;
      }
    }

    setLoading(true);
    try {
      const assignmentData: PackageAssignmentData = {
        packageId: selectedPackage,
        clientId: selectedClient,
        trainerId: (selectedTrainer && selectedTrainer !== 'none') ? selectedTrainer : undefined,
        startDate,
        endDate,
        sessionsUsed,
        totalPaid,
        paymentStatus,
        ...(isCustomPackage && {
          customPackage: {
            title: customTitle,
            description: customDescription,
            packageType: customType,
            sessionsTotal: customSessions,
            price: customPrice,
            durationDays: customDurationDays
          }
        })
      };

      await onAssign(assignmentData);
      
      // Create notification for successful assignment (only if trainer is assigned)
      const selectedClientName = clients.find(c => c.id === selectedClient)?.name || 'Client';
      const packageName = isCustomPackage ? customTitle : (selectedPackageData?.title || 'Package');
      
      if (selectedTrainer && selectedTrainer !== 'none') {
        await createNotification(
          selectedTrainer,
          'trainer',
          'package_assigned',
          'New Package Assignment',
          `${packageName} assigned to ${selectedClientName}`
        );
      }
      
      toast.success('Package assigned successfully!');
      onOpenChange(false);
    } catch (error) {
      console.error('Error assigning package:', error);
      toast.error('Failed to assign package');
    } finally {
      setLoading(false);
    }
  };

  const selectedPackageData = packages.find(p => p.id === selectedPackage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Package to Member</DialogTitle>
          <DialogDescription>
            {selectedMember ? 
              `Assign a package to ${selectedMember.name}` : 
              'Select a package and assign it to a member with manual configuration'
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="existing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="existing" 
              onClick={() => setIsCustomPackage(false)}
            >
              Existing Package
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              onClick={() => setIsCustomPackage(true)}
            >
              Custom Package
            </TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
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
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{selectedPackageData.title}</CardTitle>
                    <CardDescription>{selectedPackageData.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Type: {selectedPackageData.package_type}</div>
                      <div>Price: €{selectedPackageData.price}</div>
                      <div>Duration: {selectedPackageData.duration_days ? `${selectedPackageData.duration_days} days` : 'Unlimited'}</div>
                      <div>Sessions: {selectedPackageData.session_limit || 'Unlimited'}</div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!selectedMember && (
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
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(startDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => date && setStartDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {endDate && (
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(endDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedPackageData?.session_limit && (
                  <div className="space-y-2">
                    <Label htmlFor="sessionsUsed">
                      Sessions Already Used (out of {selectedPackageData.session_limit} total)
                    </Label>
                    <Input
                      id="sessionsUsed"
                      type="number"
                      min="0"
                      max={selectedPackageData.session_limit}
                      value={sessionsUsed}
                      onChange={(e) => setSessionsUsed(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="totalPaid">Amount Paid (€)</Label>
                  <Input
                    id="totalPaid"
                    type="number"
                    min="0"
                    step="0.01"
                    value={totalPaid}
                    onChange={(e) => setTotalPaid(Number(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainer">Trainer (Optional)</Label>
                <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trainer (optional for gym-only access)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No specific trainer (gym access only)</SelectItem>
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
                  disabled={loading || !selectedPackage || !selectedClient}
                >
                  {loading ? 'Assigning...' : 'Assign Package'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customTitle">Package Title</Label>
                  <Input
                    id="customTitle"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Custom Package"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customPrice">Price (€)</Label>
                  <Input
                    id="customPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customDescription">Description</Label>
                <Textarea
                  id="customDescription"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Package description..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customType">Package Type</Label>
                  <Select value={customType} onValueChange={setCustomType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sessions">Session Package</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customSessions">Total Sessions</Label>
                  <Input
                    id="customSessions"
                    type="number"
                    min="1"
                    value={customSessions}
                    onChange={(e) => setCustomSessions(Number(e.target.value))}
                    placeholder="10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customDurationDays">Duration (Days)</Label>
                  <Input
                    id="customDurationDays"
                    type="number"
                    min="1"
                    value={customDurationDays || ''}
                    onChange={(e) => setCustomDurationDays(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="30"
                  />
                </div>
              </div>

              {!selectedMember && (
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
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(startDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => date && setStartDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {endDate && (
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(endDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {customSessions > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="sessionsUsedCustom">
                      Sessions Already Used (out of {customSessions} total)
                    </Label>
                    <Input
                      id="sessionsUsedCustom"
                      type="number"
                      min="0"
                      max={customSessions}
                      value={sessionsUsed}
                      onChange={(e) => setSessionsUsed(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="totalPaidCustom">Amount Paid (€)</Label>
                  <Input
                    id="totalPaidCustom"
                    type="number"
                    min="0"
                    step="0.01"
                    value={totalPaid}
                    onChange={(e) => setTotalPaid(Number(e.target.value))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatusCustom">Payment Status</Label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainerCustom">Trainer (Optional)</Label>
                <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trainer (optional for gym-only access)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No specific trainer (gym access only)</SelectItem>
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
                  disabled={loading || !customTitle || !selectedClient}
                >
                  {loading ? 'Creating...' : 'Create & Assign'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}