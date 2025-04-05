
import { useDrop } from "react-dnd";
import { SalesContact } from "./types";
import { SalesCard } from "./SalesCard";
import { useMediaQuery } from "@/hooks/use-mobile";

interface SalesColumnProps {
  title: string;
  contacts: SalesContact[];
  status: SalesContact['status'];
  onMoveContact: (id: string, status: SalesContact['status']) => void;
  onUpdateContact: (updatedContact: SalesContact) => void;
}

export function SalesColumn({ 
  title, 
  contacts, 
  status, 
  onMoveContact,
  onUpdateContact
}: SalesColumnProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
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
      className={`${isMobile ? 'w-[240px]' : 'w-[300px]'} flex flex-col rounded-md ${isOver ? 'bg-muted/80' : 'bg-muted/30'}`}
    >
      <div className="p-3 font-medium border-b bg-muted/50 sticky top-0 z-10 rounded-t-md flex justify-between items-center">
        <span className={`text-sm font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}>{title}</span>
        <span className="text-xs font-normal px-2 py-1 bg-background rounded-full">
          {contacts.length}
        </span>
      </div>
      
      <div className={`flex-1 ${isMobile ? 'p-1.5' : 'p-2'}`}>
        <div className={`flex flex-col ${isMobile ? 'gap-2' : 'gap-3'}`}>
          {contacts.map(contact => (
            <SalesCard 
              key={contact.id} 
              contact={contact} 
              onUpdateContact={onUpdateContact}
            />
          ))}
          
          {contacts.length === 0 && (
            <div className="flex items-center justify-center h-24 text-muted-foreground text-sm border border-dashed rounded-md">
              Drag contacts here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
