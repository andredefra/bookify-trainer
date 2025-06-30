
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Package, CreditCard } from "lucide-react";
import { toast } from "sonner";

interface AssignPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (packageId: number, clientId: string) => void;
  packageData: {
    id: number;
    title: string;
    type: string;
    sessions?: number;
    price: number;
    description?: string;
  } | null;
}

// Mock clients data - in real app this would come from props or API
const mockClients = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.com" },
  { id: "2", name: "Mike Peterson", email: "mike@example.com" },
  { id: "3", name: "Emma Davis", email: "emma@example.com" },
  { id: "4", name: "John Smith", email: "john@example.com" },
];

export function AssignPackageDialog({ open, onOpenChange, onAssign, packageData }: AssignPackageDialogProps) {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAssign = async () => {
    if (!selectedClient || !packageData) return;

    setIsLoading(true);
    try {
      await onAssign(packageData.id, selectedClient);
      toast.success("Package assigned successfully!");
      setSelectedClient("");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to assign package");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedClientData = mockClients.find(client => client.id === selectedClient);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Package to Client</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Info */}
          {packageData && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{packageData.title}</h3>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{packageData.type.replace('_', ' ')}</Badge>
                  {packageData.sessions && (
                    <span>{packageData.sessions} sessions</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  <span>€{packageData.price}</span>
                </div>
                {packageData.description && (
                  <p className="mt-2">{packageData.description}</p>
                )}
              </div>
            </div>
          )}

          {/* Client Selection */}
          <div className="space-y-2">
            <Label htmlFor="client-select">Select Client</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger id="client-select">
                <SelectValue placeholder="Choose a client" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-xs text-muted-foreground">{client.email}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Confirmation */}
          {selectedClientData && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm">
                <strong>{packageData?.title}</strong> will be assigned to{" "}
                <strong>{selectedClientData.name}</strong>
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedClient || isLoading}
          >
            {isLoading ? "Assigning..." : "Assign Package"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
