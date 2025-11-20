
import { useDrop } from "react-dnd";
import { SalesContact } from "./types";
import { SalesCard } from "./SalesCard";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SalesColumnProps {
  title: string;
  contacts: SalesContact[];
  status: SalesContact['status'];
  onMoveContact: (id: string, status: SalesContact['status']) => void;
  onUpdateContact: (updatedContact: SalesContact) => void;
  onAddContact?: () => void;
}

export function SalesColumn({ 
  title, 
  contacts, 
  status, 
  onMoveContact,
  onUpdateContact,
  onAddContact
}: SalesColumnProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'contact',
    drop: (item: { id: string }) => {
      onMoveContact(item.id, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop} 
      className={cn(
        "flex flex-col rounded-md h-full transition-colors duration-200",
        isMobile && "min-w-[180px] w-[180px]",
        isTablet && "min-w-[220px] w-[220px]",
        !isMobile && !isTablet && "min-w-[280px] w-[280px]",
        isOver ? "bg-muted/80" : "bg-muted/30"
      )}
    >
      <div className="p-3 font-medium border-b bg-muted/50 sticky top-0 z-10 rounded-t-md flex justify-between items-center gap-2">
        <span className={cn(
          "font-semibold",
          isMobile && "text-xs",
          isTablet && "text-sm",
          !isMobile && !isTablet && "text-sm"
        )}>
          {title}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-normal px-2 py-1 bg-background rounded-full">
            {contacts.length}
          </span>
          {onAddContact && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6"
              onClick={onAddContact}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className={cn(
        "flex-1 overflow-y-auto",
        isMobile && "p-1.5",
        isTablet && "p-2",
        !isMobile && !isTablet && "p-2"
      )}>
        <div className={cn(
          "flex flex-col min-h-full",
          isMobile && "gap-2",
          isTablet && "gap-2.5",
          !isMobile && !isTablet && "gap-3"
        )}>
          {contacts.map(contact => (
            <SalesCard 
              key={contact.id} 
              contact={contact} 
              onUpdateContact={onUpdateContact}
            />
          ))}
          
          {contacts.length === 0 && (
            <div className={cn(
              "flex items-center justify-center h-24 text-muted-foreground text-sm border border-dashed rounded-md",
              isMobile && "h-16 text-xs"
            )}>
              {isMobile ? "Drag here" : "Drag contacts here"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
