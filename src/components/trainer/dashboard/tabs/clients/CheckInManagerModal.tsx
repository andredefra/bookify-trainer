import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings } from "lucide-react";
import { CheckInHistorySection } from "./ClientProfileTabs/metrics/CheckInHistorySection";
import { ConfigureCheckInsDialog } from "./ClientProfileTabs/metrics/ConfigureCheckInsDialog";
import { ManualCheckInDialog } from "./ClientProfileTabs/metrics/ManualCheckInDialog";
import { useCheckInSettings } from "@/hooks/useCheckInSettings";

interface ClientItem {
  id: number;
  name: string;
  sessions: number;
  lastSession: string;
}

interface CheckInManagerModalProps {
  client: ClientItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckInManagerModal({ 
  client, 
  open, 
  onOpenChange 
}: CheckInManagerModalProps) {
  const [showConfigureDialog, setShowConfigureDialog] = useState(false);
  const [showManualCheckInDialog, setShowManualCheckInDialog] = useState(false);
  
  // Use a mock client ID for demo purposes - properly padded to 12 digits
  const clientId = client ? `00000000-0000-0000-0000-${String(client.id).padStart(12, '0')}` : "";
  
  const { settings } = useCheckInSettings(clientId);
  
  if (!client) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DialogTitle>Check-ins - {client.name}</DialogTitle>
                {settings?.enabled && (
                  <Badge variant="secondary" className="text-xs">
                    {settings.frequency === 'weekly' ? 'Weekly' : 
                     settings.frequency === 'biweekly' ? 'Bi-weekly' : 
                     settings.frequency === 'monthly' ? 'Monthly' : 'Custom'} Check-ins
                  </Badge>
                )}
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowManualCheckInDialog(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Log Check-in
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowConfigureDialog(true)}
              >
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
            </div>
            
            {/* Check-in history */}
            <CheckInHistorySection clientId={clientId} />
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Configure Check-ins Dialog */}
      <ConfigureCheckInsDialog
        open={showConfigureDialog}
        onOpenChange={setShowConfigureDialog}
        clientId={clientId}
        clientName={client.name}
      />
      
      {/* Manual Check-in Dialog */}
      <ManualCheckInDialog
        open={showManualCheckInDialog}
        onOpenChange={setShowManualCheckInDialog}
        clientId={clientId}
        clientName={client.name}
      />
    </>
  );
}
