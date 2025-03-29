
import { useDrag } from "react-dnd";
import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { SalesContact } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Calendar, Euro, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditableContactDialog } from "./EditableContactDialog";

interface SalesCardProps {
  contact: SalesContact;
  onUpdateContact: (updatedContact: SalesContact) => void;
}

export function SalesCard({ contact, onUpdateContact }: SalesCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'contact',
    item: { id: contact.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const statusColors = {
    lead: "bg-blue-100 text-blue-800",
    prospect: "bg-purple-100 text-purple-800",
    client: "bg-green-100 text-green-800",
    lost: "bg-red-100 text-red-800",
    terminated: "bg-gray-100 text-gray-800"
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: it });
    } catch (e) {
      return dateString;
    }
  };

  const getClientSinceText = () => {
    if (!contact.clientSince) return '';
    try {
      return formatDistanceToNow(new Date(contact.clientSince), { 
        addSuffix: true, 
        locale: it 
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <>
      <Card 
        ref={drag} 
        className={`shadow-sm cursor-grab ${isDragging ? 'opacity-40' : 'opacity-100'}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <CardContent className="p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-sm truncate">{contact.name}</h3>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditDialog(true);
                  }}
                >
                  <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
                <Badge className={statusColors[contact.status]}>
                  {contact.status === 'lead' && 'Lead'}
                  {contact.status === 'prospect' && 'Prospect'}
                  {contact.status === 'client' && 'Client'}
                  {contact.status === 'lost' && 'Lost'}
                  {contact.status === 'terminated' && 'Terminated'}
                </Badge>
              </div>
            </div>
            
            {contact.company && (
              <p className="text-xs text-muted-foreground">{contact.company}</p>
            )}
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{contact.email}</span>
            </div>
            
            {contact.phone && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{contact.phone}</span>
              </div>
            )}
            
            {contact.nextActionDate && (
              <div className="flex items-center text-xs">
                <Calendar className="h-3 w-3 mr-1 flex-shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">{formatDate(contact.nextActionDate)}</span>
                {contact.nextAction && (
                  <span className="ml-1 text-xs truncate">- {contact.nextAction}</span>
                )}
              </div>
            )}
            
            {contact.value && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Euro className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{contact.value}€</span>
              </div>
            )}

            {contact.clientSince && contact.status === 'client' && (
              <div className="text-xs mt-1 pt-1 border-t border-muted">
                <span className="text-green-600 font-medium">Client since: {getClientSinceText()}</span>
              </div>
            )}

            {contact.source && (
              <div className="text-xs text-muted-foreground mt-1">
                Source: {contact.source}
              </div>
            )}
            
            {contact.notes && (
              <div className="text-xs text-muted-foreground mt-1 pt-1 border-t border-muted line-clamp-2">
                {contact.notes}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <EditableContactDialog 
        contact={contact}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSave={onUpdateContact}
      />
    </>
  );
}
