
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent } from "@/components/ui/card";
import { SalesKanban } from "./sales/SalesKanban";
import { SalesMetrics } from "./sales/SalesMetrics";
import { SalesTimeAnalytics } from "./sales/analytics/SalesTimeAnalytics";
import { AddContactDialog } from "./sales/AddContactDialog";
import { SalesHeader } from "./sales/SalesHeader";
import { useSalesContacts } from "./sales/useSalesContacts";
import { SalesContact } from "./sales/types";

export function SalesTab() {
  const [showAddContactDialog, setShowAddContactDialog] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState<SalesContact['status']>('lead');
  const { 
    contacts, 
    clientContacts,
    prospectContacts,
    handleMoveContact, 
    handleUpdateContact, 
    handleAddContact,
    handleConfirmClientConversion
  } = useSalesContacts();

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4 max-w-full overflow-hidden">
      <Card className="w-full">
        <SalesHeader onAddLead={() => { setDefaultStatus('lead'); setShowAddContactDialog(true); }} />
        <CardContent className="p-2 sm:p-3 md:p-4 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Time-based Analytics */}
          <div className="w-full overflow-hidden">
            <SalesTimeAnalytics contacts={contacts} />
          </div>
          
          {/* Sales Funnel Section */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">Clients Funnel</h3>
            </div>
            
            {/* Client and Prospect Metrics */}
            {(clientContacts.length > 0 || prospectContacts.length > 0) && (
              <div className="w-full overflow-hidden">
                <SalesMetrics clients={clientContacts} prospects={prospectContacts} />
              </div>
            )}
            
            {/* Kanban Board */}
            <div className="w-full overflow-hidden">
              <DndProvider backend={HTML5Backend}>
                <SalesKanban 
                  contacts={contacts} 
                  onMoveContact={handleMoveContact}
                  onUpdateContact={handleUpdateContact}
                  onConfirmClientConversion={handleConfirmClientConversion}
                  onAddContact={(status) => { setDefaultStatus(status); setShowAddContactDialog(true); }}
                />
              </DndProvider>
            </div>
          </div>
        </CardContent>
      </Card>

      <AddContactDialog 
        open={showAddContactDialog} 
        onOpenChange={setShowAddContactDialog} 
        onAdd={handleAddContact}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
