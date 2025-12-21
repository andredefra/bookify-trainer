import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, FileText, Package, Briefcase, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface ServiceRequest {
  id: string;
  trainerName: string;
  clientName: string;
  requestType: 'program' | 'package' | 'service';
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  commissionRate: number;
  notes: string;
  createdAt: string;
}

// Mock data for demo
const mockRequests: ServiceRequest[] = [
  {
    id: '1',
    trainerName: 'Alex Johnson',
    clientName: 'Maria Rodriguez',
    requestType: 'program',
    status: 'pending',
    commissionRate: 25,
    notes: 'Client wants weight loss program, 3x/week',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    trainerName: 'Sarah Williams',
    clientName: 'John Smith',
    requestType: 'package',
    status: 'accepted',
    commissionRate: 20,
    notes: '10 session package for strength training',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    trainerName: 'Mike Chen',
    clientName: 'Emma Davis',
    requestType: 'service',
    status: 'completed',
    commissionRate: 15,
    notes: 'Nutrition consultation service',
    createdAt: '2024-01-05'
  }
];

const mockTrainers = [
  { id: '1', name: 'Alex Johnson' },
  { id: '2', name: 'Sarah Williams' },
  { id: '3', name: 'Mike Chen' },
];

const mockClients = [
  { id: '1', name: 'Maria Rodriguez' },
  { id: '2', name: 'John Smith' },
  { id: '3', name: 'Emma Davis' },
  { id: '4', name: 'David Wilson' },
];

export function ServiceRequestsTab() {
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [requestType, setRequestType] = useState<'program' | 'package' | 'service'>('program');
  const [notes, setNotes] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><CheckCircle className="w-3 h-3 mr-1" /> Accepted</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" /> Declined</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'program': return <FileText className="w-4 h-4 text-primary" />;
      case 'package': return <Package className="w-4 h-4 text-primary" />;
      case 'service': return <Briefcase className="w-4 h-4 text-primary" />;
      default: return null;
    }
  };

  const handleCreateRequest = () => {
    if (!selectedTrainer || !selectedClient) {
      toast.error("Please select both trainer and client");
      return;
    }

    const trainer = mockTrainers.find(t => t.id === selectedTrainer);
    const client = mockClients.find(c => c.id === selectedClient);

    const newRequest: ServiceRequest = {
      id: Date.now().toString(),
      trainerName: trainer?.name || '',
      clientName: client?.name || '',
      requestType,
      status: 'pending',
      commissionRate: 25, // Default from contract
      notes,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRequests([newRequest, ...requests]);
    setIsDialogOpen(false);
    setSelectedTrainer('');
    setSelectedClient('');
    setNotes('');
    toast.success(`Request sent to ${trainer?.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Service Requests</h1>
          <p className="text-muted-foreground">Request programs, packages, and services from your trainers</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Service Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Client</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map(client => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Trainer</Label>
                <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTrainers.map(trainer => (
                      <SelectItem key={trainer.id} value={trainer.id}>{trainer.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Request Type</Label>
                <Select value={requestType} onValueChange={(v: 'program' | 'package' | 'service') => setRequestType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="program">Training Program</SelectItem>
                    <SelectItem value="package">Session Package</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes for Trainer</Label>
                <Textarea 
                  placeholder="Describe what the client needs..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Commission Rate:</strong> 25% (from trainer contract)
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateRequest}>Send Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {requests.map(request => (
          <Card key={request.id}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {getTypeIcon(request.requestType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{request.clientName}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-medium">{request.trainerName}</span>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">{request.requestType}</p>
                    {request.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{request.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(request.status)}
                  <span className="text-xs text-muted-foreground">{request.commissionRate}% commission</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {requests.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No service requests yet. Create your first request to assign work to trainers.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}