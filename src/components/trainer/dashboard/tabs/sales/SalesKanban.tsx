
import { useMemo } from "react";
import { SalesContact } from "./types";
import { SalesColumn } from "./SalesColumn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SalesKanbanProps {
  contacts: SalesContact[];
  onMoveContact: (id: string, status: SalesContact['status']) => void;
  onUpdateContact: (updatedContact: SalesContact) => void;
}

export function SalesKanban({ contacts, onMoveContact, onUpdateContact }: SalesKanbanProps) {
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
