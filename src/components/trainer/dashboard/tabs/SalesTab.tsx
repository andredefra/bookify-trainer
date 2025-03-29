import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SalesKanban } from "./sales/SalesKanban";
import { SalesMetrics } from "./sales/SalesMetrics";
import { AddLeadDialog } from "./sales/AddLeadDialog";
import { toast } from "sonner";

export interface SalesContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "lead" | "prospect" | "client" | "lost" | "terminated";
  notes?: string;
  company?: string;
  source?: string;
  assignedTo?: string;
  createdAt: string;
  lastUpdated: string;
  clientSince?: string;
  value?: number;
  nextAction?: string;
  nextActionDate?: string;
}

// Sample data
const INITIAL_CONTACTS: SalesContact[] = [
  {
    id: "1",
    name: "Marco Rossi",
    email: "marco.rossi@example.com",
    phone: "+39 123 456 7890",
    status: "lead",
    notes: "Interested in personal training sessions",
    source: "Website",
    createdAt: "2023-01-15T09:00:00Z",
    lastUpdated: "2023-01-15T09:00:00Z",
    value: 500,
    nextAction: "Follow up call",
    nextActionDate: "2023-01-20T10:00:00Z"
  },
  {
    id: "2",
    name: "Laura Bianchi",
    email: "laura.b@example.com",
    phone: "+39 234 567 8901",
    status: "prospect",
    notes: "Had a sample session, considering 10-session package",
    source: "Referral",
    createdAt: "2023-01-10T14:30:00Z",
    lastUpdated: "2023-01-14T16:00:00Z",
    value: 1200,
    nextAction: "Send proposal",
    nextActionDate: "2023-01-18T14:00:00Z"
  },
  {
    id: "3",
    name: "Giovanni Verdi",
    email: "g.verdi@example.com",
    status: "client",
    company: "Verdi Fitness",
    notes: "Corporate client - group sessions twice a week",
    source: "LinkedIn",
    createdAt: "2022-11-20T11:15:00Z",
    lastUpdated: "2023-01-07T09:30:00Z",
    clientSince: "2022-12-01T08:00:00Z",
    value: 5000
  },
  {
    id: "4",
    name: "Francesca Neri",
    email: "f.neri@example.com",
    status: "lost",
    notes: "Price too high for client budget",
    source: "Instagram Ad",
    createdAt: "2022-12-05T10:00:00Z",
    lastUpdated: "2022-12-15T11:30:00Z",
    value: 800
  },
  {
    id: "5",
    name: "Antonio Russo",
    email: "a.russo@example.com",
    phone: "+39 345 678 9012",
    status: "terminated",
    notes: "Relocated to another city",
    clientSince: "2022-06-15T08:00:00Z",
    createdAt: "2022-06-01T09:45:00Z",
    lastUpdated: "2022-12-20T16:15:00Z",
    value: 3600
  },
  {
    id: "6",
    name: "Sofia Esposito",
    email: "s.esposito@example.com",
    status: "client",
    notes: "Weekly personal training sessions",
    source: "Website",
    createdAt: "2022-10-10T15:30:00Z",
    lastUpdated: "2023-01-05T14:00:00Z",
    clientSince: "2022-10-17T08:00:00Z",
    value: 2400
  }
];

export function SalesTab() {
  const [contacts, setContacts] = useState<SalesContact[]>(INITIAL_CONTACTS);
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);

  const handleMoveContact = (id: string, newStatus: SalesContact['status']) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => {
        if (contact.id === id) {
          const now = new Date().toISOString();
          
          // If moving to client status, set clientSince if not already set
          const clientSince = newStatus === 'client' && !contact.clientSince 
            ? now 
            : contact.clientSince;
            
          return { 
            ...contact, 
            status: newStatus, 
            lastUpdated: now,
            clientSince
          };
        }
        return contact;
      })
    );
  };

  const handleUpdateContact = (updatedContact: SalesContact) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => {
        if (contact.id === updatedContact.id) {
          const now = new Date().toISOString();
          
          // Handle clientSince logic when status changes to client
          const wasClient = contact.status === 'client';
          const isNowClient = updatedContact.status === 'client';
          
          let clientSince = contact.clientSince;
          
          if (!wasClient && isNowClient) {
            // Status changed to client, set clientSince if not already set
            clientSince = clientSince || now;
          } else if (!isNowClient) {
            // Not a client anymore, keep clientSince for historical data
          }
          
          toast.success(`Contatto aggiornato: ${updatedContact.name}`);
          
          return { 
            ...updatedContact, 
            lastUpdated: now,
            clientSince
          };
        }
        return contact;
      })
    );
  };

  const handleAddContact = (newContact: Omit<SalesContact, 'id' | 'createdAt' | 'lastUpdated'>) => {
    const now = new Date().toISOString();
    const id = `${contacts.length + 1}`;
    
    setContacts(prevContacts => [
      ...prevContacts,
      {
        ...newContact,
        id,
        createdAt: now,
        lastUpdated: now,
      }
    ]);
    
    setShowAddLeadDialog(false);
  };

  const clientContacts = contacts.filter(contact => contact.status === 'client');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Gestione Vendite</CardTitle>
            <CardDescription>Gestisci i tuoi lead, prospects e clienti in un unico posto</CardDescription>
          </div>
          <Button 
            className="self-start sm:self-center mt-2 sm:mt-0" 
            onClick={() => setShowAddLeadDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuovo Lead
          </Button>
        </CardHeader>
        <CardContent>
          {clientContacts.length > 0 && (
            <div className="mb-6">
              <SalesMetrics clients={clientContacts} />
            </div>
          )}
          
          <DndProvider backend={HTML5Backend}>
            <SalesKanban 
              contacts={contacts} 
              onMoveContact={handleMoveContact}
              onUpdateContact={handleUpdateContact} 
            />
          </DndProvider>
        </CardContent>
      </Card>

      <AddLeadDialog 
        open={showAddLeadDialog} 
        onOpenChange={setShowAddLeadDialog} 
        onAdd={handleAddContact} 
      />
    </div>
  );
}
