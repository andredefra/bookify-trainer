
import { useMemo } from "react";
import { SalesContact } from "../SalesTab";
import { SalesColumn } from "./SalesColumn";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SalesKanbanProps {
  contacts: SalesContact[];
  onMoveContact: (id: string, status: SalesContact['status']) => void;
  onUpdateContact: (updatedContact: SalesContact) => void;
}

export function SalesKanban({ contacts, onMoveContact, onUpdateContact }: SalesKanbanProps) {
  // Organize contacts by status
  const columns = useMemo(() => {
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
    
    return grouped;
  }, [contacts]);

  return (
    <div className="overflow-x-auto">
      <ScrollArea className="w-full">
        <div className="flex gap-4 min-w-max pb-4">
          <SalesColumn 
            title="Lead" 
            contacts={columns.lead} 
            status="lead"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Prospect" 
            contacts={columns.prospect} 
            status="prospect"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Client" 
            contacts={columns.client} 
            status="client"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Persi" 
            contacts={columns.lost} 
            status="lost"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Terminati" 
            contacts={columns.terminated} 
            status="terminated"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
