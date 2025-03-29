
import { useMemo } from "react";
import { SalesContact } from "./types";
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
    <div className="w-full h-[calc(100vh-300px)] overflow-hidden">
      <ScrollArea orientation="horizontal" className="w-full h-full">
        <div className="flex gap-3 p-1 min-w-max h-full">
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
            title="Lost" 
            contacts={columns.lost} 
            status="lost"
            onMoveContact={onMoveContact}
            onUpdateContact={onUpdateContact}
          />
          <SalesColumn 
            title="Terminated" 
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
