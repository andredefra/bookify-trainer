
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent } from "@/components/ui/card";
import { SalesKanban } from "./sales/SalesKanban";
import { SalesMetrics } from "./sales/SalesMetrics";
import { AddLeadDialog } from "./sales/AddLeadDialog";
import { SalesHeader } from "./sales/SalesHeader";
import { useSalesContacts } from "./sales/useSalesContacts";

export function SalesTab() {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
  const { 
    contacts, 
    clientContacts, 
    handleMoveContact, 
    handleUpdateContact, 
    handleAddContact 
  } = useSalesContacts();

  return (
    <div className="space-y-6">
      <Card>
        <SalesHeader onAddLead={() => setShowAddLeadDialog(true)} />
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
