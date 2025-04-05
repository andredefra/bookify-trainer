
import { useMemo } from "react";
import { SalesContact } from "./types";
import { SalesColumn } from "./SalesColumn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-mobile";

interface SalesKanbanProps {
  contacts: SalesContact[];
  onMoveContact: (id: string, status: SalesContact['status']) => void;
  onUpdateContact: (updatedContact: SalesContact) => void;
}

export function SalesKanban({ contacts, onMoveContact, onUpdateContact }: SalesKanbanProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
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
  
  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col overflow-hidden bg-background/50 rounded-md border">
      <ScrollArea className="w-full h-full" orientation="both">
        <div className={`flex gap-3 p-3 min-w-max h-full ${isMobile ? 'gap-2 p-2' : 'gap-4 p-3'}`}>
          <SalesColumn 
            title="Lead" 
            contacts={grouped.lead} 
            status="lead"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Prospect" 
            contacts={grouped.prospect} 
            status="prospect"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Client" 
            contacts={grouped.client} 
            status="client"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Lost" 
            contacts={grouped.lost} 
            status="lost"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Terminated" 
            contacts={grouped.terminated} 
            status="terminated"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
