
import { useState } from "react";
import { SalesContact } from "./types";
import { SalesColumn } from "./SalesColumn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ProspectToClientDialog } from "./ProspectToClientDialog";

interface SalesKanbanProps {
  contacts: SalesContact[];
  onMoveContact: (id: string, status: SalesContact['status']) => void;
  onUpdateContact: (updatedContact: SalesContact) => void;
  onConfirmClientConversion?: (id: string) => void;
  onAddContact: (status: SalesContact['status']) => void;
}

export function SalesKanban({ contacts, onMoveContact, onUpdateContact, onConfirmClientConversion, onAddContact }: SalesKanbanProps) {
  const [showProspectDialog, setShowProspectDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState<SalesContact | null>(null);
  
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  
  // Organize contacts by status
  const grouped: Record<SalesContact['status'], SalesContact[]> = {
    lead: [],
    prospect: [],
    client: [],
    lost: [],
    terminated: []
  };
  
  contacts.forEach(contact => {
    grouped[contact.status].push(contact);
  });

  const handleMoveContact = (id: string, status: SalesContact['status']) => {
    // If moving to client, show confirmation dialog
    if (status === 'client') {
      const contact = contacts.find(c => c.id === id);
      if (contact) {
        setSelectedContact(contact);
        setShowProspectDialog(true);
        return;
      }
    }
    onMoveContact(id, status);
  };

  const handleConfirmConversion = () => {
    if (selectedContact && onConfirmClientConversion) {
      onConfirmClientConversion(selectedContact.id);
    }
  };
  
  return (
    <div className={cn(
      "w-full flex flex-col overflow-hidden bg-background/50 rounded-md border",
      isMobile && "h-[50vh] min-h-[350px] max-h-[500px]",
      isTablet && "h-[60vh] min-h-[400px] max-h-[600px]",
      !isMobile && !isTablet && "h-[70vh] min-h-[500px] max-h-[800px]"
    )}>
      <ScrollArea className="w-full h-full" orientation="both">
        <div className={cn(
          "flex h-full min-w-max",
          isMobile && "gap-2 p-2",
          isTablet && "gap-3 p-2.5", 
          !isMobile && !isTablet && "gap-4 p-3"
        )}>
          <SalesColumn 
            title="Lead" 
            contacts={grouped.lead} 
            status="lead"
            onMoveContact={handleMoveContact}
            onUpdateContact={onUpdateContact}
            onAddContact={() => onAddContact('lead')}
          />
          <SalesColumn 
            title="Prospect" 
            contacts={grouped.prospect} 
            status="prospect"
            onMoveContact={handleMoveContact}
            onUpdateContact={onUpdateContact}
            onAddContact={() => onAddContact('prospect')}
          />
          <SalesColumn 
            title="Client" 
            contacts={grouped.client} 
            status="client"
            onMoveContact={handleMoveContact}
            onUpdateContact={onUpdateContact}
            onAddContact={() => onAddContact('client')}
          />
          <SalesColumn 
            title="Lost" 
            contacts={grouped.lost} 
            status="lost"
            onMoveContact={handleMoveContact}
            onUpdateContact={onUpdateContact}
            onAddContact={() => onAddContact('lost')}
          />
          <SalesColumn 
            title="Terminated" 
            contacts={grouped.terminated} 
            status="terminated"
            onMoveContact={handleMoveContact}
            onUpdateContact={onUpdateContact}
            onAddContact={() => onAddContact('terminated')}
          />
        </div>
      </ScrollArea>
      
      <ProspectToClientDialog
        open={showProspectDialog}
        onOpenChange={setShowProspectDialog}
        contact={selectedContact}
        onConfirm={handleConfirmConversion}
      />
    </div>
  );
}
