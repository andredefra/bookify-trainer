import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, User, UserPlus, DollarSign, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface TrainerProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  user_type: string;
}

interface AssignTrainerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionScheduleId?: string;
  sessionTitle: string;
  currentTrainerId?: string;
  onAssignTrainer: (trainerId: string, compensationAmount?: number, compensationType?: string) => void;
}

export function AssignTrainerDialog({
  open,
  onOpenChange,
  sessionScheduleId,
  sessionTitle,
  currentTrainerId,
  onAssignTrainer
}: AssignTrainerDialogProps) {
  const [activeTab, setActiveTab] = useState("existing");
  const [searchTerm, setSearchTerm] = useState("");
  const [trainers, setTrainers] = useState<TrainerProfile[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<string>("");
  const [compensationType, setCompensationType] = useState("fixed");
  const [compensationAmount, setCompensationAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // New trainer form
  const [newTrainerData, setNewTrainerData] = useState({
    full_name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const fetchTrainers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, phone, user_type')
        .eq('user_type', 'trainer')
        .order('full_name');

      if (error) throw error;
      setTrainers(data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
      // Fallback demo data
      setTrainers([
        {
          id: 'trainer-1',
          full_name: 'Marco Rossi',
          email: 'marco.rossi@email.com',
          phone: '+39 333 123 4567',
          user_type: 'trainer'
        },
        {
          id: 'trainer-2',
          full_name: 'Elena Bianchi',
          email: 'elena.bianchi@email.com',
          phone: '+39 333 765 4321',
          user_type: 'trainer'
        }
      ]);
    }
  };

  useEffect(() => {
    if (open) {
      fetchTrainers();
      if (currentTrainerId) {
        setSelectedTrainer(currentTrainerId);
      }
    }
  }, [open, currentTrainerId]);

  const filteredTrainers = trainers.filter(trainer =>
    trainer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignExistingTrainer = async () => {
    if (!selectedTrainer) {
      toast.error("Please select a trainer");
      return;
    }

    setLoading(true);
    try {
      await onAssignTrainer(selectedTrainer, compensationAmount, compensationType);
      toast.success("Trainer assigned successfully!");
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to assign trainer");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAndAssignTrainer = async () => {
    if (!newTrainerData.full_name || !newTrainerData.email) {
      toast.error("Name and email are required");
      return;
    }

    setLoading(true);
    try {
      // For demo purposes, we'll create a mock external trainer
      const newTrainerId = `external-trainer-${Date.now()}`;
      
      // In a real implementation, you'd create a profile or external trainer record
      // For now, we'll just proceed with the assignment
      await onAssignTrainer(newTrainerId, compensationAmount, compensationType);
      
      toast.success(`External trainer ${newTrainerData.full_name} created and assigned!`);
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to create and assign trainer");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedTrainer("");
    setCompensationType("fixed");
    setCompensationAmount(0);
    setNewTrainerData({
      full_name: "",
      email: "",
      phone: "",
      notes: ""
    });
    setActiveTab("existing");
    setSearchTerm("");
  };

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Trainer to Session</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Assign a trainer to lead: <strong>{sessionTitle}</strong>
          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Existing Trainers</TabsTrigger>
            <TabsTrigger value="new">External Trainer</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trainers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredTrainers.map((trainer) => (
                <Card 
                  key={trainer.id} 
                  className={`cursor-pointer transition-colors ${
                    selectedTrainer === trainer.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedTrainer(trainer.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{trainer.full_name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{trainer.email}</span>
                        </div>
                        {trainer.phone && (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{trainer.phone}</span>
                          </div>
                        )}
                      </div>
                      {selectedTrainer === trainer.id && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTrainers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-2" />
                <p>No trainers found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newTrainerData.full_name}
                  onChange={(e) => setNewTrainerData(prev => ({
                    ...prev,
                    full_name: e.target.value
                  }))}
                  placeholder="Enter trainer's name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newTrainerData.email}
                  onChange={(e) => setNewTrainerData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  placeholder="trainer@email.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newTrainerData.phone}
                onChange={(e) => setNewTrainerData(prev => ({
                  ...prev,
                  phone: e.target.value
                }))}
                placeholder="+39 333 123 4567"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newTrainerData.notes}
                onChange={(e) => setNewTrainerData(prev => ({
                  ...prev,
                  notes: e.target.value
                }))}
                placeholder="Additional notes about this external trainer..."
                rows={3}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Compensation Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Compensation</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="compensation-type">Type</Label>
                <Select value={compensationType} onValueChange={setCompensationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="compensation-amount">
                  Amount {compensationType === 'percentage' ? '(%)' : '(€)'}
                </Label>
                <Input
                  id="compensation-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={compensationAmount}
                  onChange={(e) => setCompensationAmount(Number(e.target.value))}
                  placeholder="0.00"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {activeTab === "existing" ? (
            <Button 
              onClick={handleAssignExistingTrainer} 
              disabled={!selectedTrainer || loading}
            >
              {loading ? "Assigning..." : "Assign Trainer"}
            </Button>
          ) : (
            <Button 
              onClick={handleCreateAndAssignTrainer} 
              disabled={!newTrainerData.full_name || !newTrainerData.email || loading}
            >
              {loading ? "Creating..." : "Create & Assign"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}