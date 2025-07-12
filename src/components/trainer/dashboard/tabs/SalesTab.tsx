
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent } from "@/components/ui/card";
import { SalesKanban } from "./sales/SalesKanban";
import { SalesMetrics } from "./sales/SalesMetrics";
import { SalesTimeAnalytics } from "./sales/analytics/SalesTimeAnalytics";
import { AddLeadDialog } from "./sales/AddLeadDialog";
import { SalesHeader } from "./sales/SalesHeader";
import { useSalesContacts } from "./sales/useSalesContacts";

export function SalesTab() {
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false);
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
        <SalesHeader onAddLead={() => setShowAddLeadDialog(true)} />
        <CardContent className="p-2 sm:p-3 md:p-4 lg:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Time-based Analytics */}
          <div className="w-full overflow-hidden">
            <SalesTimeAnalytics contacts={contacts} />
          </div>
          
          {/* Sales Funnel Section */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">Sales Funnel</h3>
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
                />
              </DndProvider>
            </div>
          </div>
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
