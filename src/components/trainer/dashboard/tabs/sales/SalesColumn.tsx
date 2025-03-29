
import { useDrop } from "react-dnd";
import { SalesContact } from "../SalesTab";
import { SalesCard } from "./SalesCard";

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
      className={`w-[260px] sm:w-[280px] md:w-[300px] rounded-md flex flex-col ${isOver ? 'bg-muted/50' : 'bg-muted/20'}`}
    >
      <div className="p-3 font-medium text-sm border-b bg-muted/30 flex justify-between items-center sticky top-0">
        <span>{title}</span>
        <span className="text-xs font-normal px-2 py-1 bg-muted rounded-full">
          {contacts.length}
        </span>
      </div>
      <div className="flex flex-col gap-2 p-2 h-full overflow-y-auto max-h-[70vh]">
        {contacts.map(contact => (
          <SalesCard 
            key={contact.id} 
            contact={contact} 
            onUpdateContact={onUpdateContact}
          />
        ))}
      </div>
    </div>
  );
}
