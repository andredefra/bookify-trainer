
import { useDrag } from "react-dnd";
import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { SalesContact } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Calendar, Euro, Edit, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditableContactDialog } from "./EditableContactDialog";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useSalesEntries } from "@/context/SalesEntriesContext";

interface SalesCardProps {
  contact: SalesContact;
  onUpdateContact: (updatedContact: SalesContact) => void;
}

export function SalesCard({ contact, onUpdateContact }: SalesCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
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
        className={`shadow-sm cursor-grab ${isDragging ? 'opacity-40' : 'opacity-100'} hover:shadow-md transition-shadow bg-card ${isMobile ? 'text-xs' : ''}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <CardContent className={isMobile ? 'p-2.5' : 'p-4'}>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-start">
              <h3 className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>{contact.name}</h3>
              <div className="flex items-center gap-1.5">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} p-0`} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditDialog(true);
                  }}
                >
                  <Edit className={`${isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'} text-muted-foreground`} />
                </Button>
                <Badge className={`${statusColors[contact.status]} ${isMobile ? 'text-[0.65rem] px-1.5' : ''}`}>
                  {contact.status === 'lead' && 'Lead'}
                  {contact.status === 'prospect' && 'Prospect'}
                  {contact.status === 'client' && 'Client'}
                  {contact.status === 'lost' && 'Lost'}
                  {contact.status === 'terminated' && 'Terminated'}
                </Badge>
              </div>
            </div>
            
            {contact.company && (
              <div className={`flex items-center ${isMobile ? 'text-[0.65rem]' : 'text-xs'} text-muted-foreground`}>
                <Building className={`${isMobile ? 'h-2.5 w-2.5 mr-1' : 'h-3 w-3 mr-1.5'} flex-shrink-0`} />
                <span className="truncate">{contact.company}</span>
              </div>
            )}
            
            <div className={`flex items-center ${isMobile ? 'text-[0.65rem]' : 'text-xs'} text-muted-foreground`}>
              <Mail className={`${isMobile ? 'h-2.5 w-2.5 mr-1' : 'h-3 w-3 mr-1.5'} flex-shrink-0`} />
              <span className="truncate">{contact.email}</span>
            </div>
            
            {contact.phone && (
              <div className={`flex items-center ${isMobile ? 'text-[0.65rem]' : 'text-xs'} text-muted-foreground`}>
                <Phone className={`${isMobile ? 'h-2.5 w-2.5 mr-1' : 'h-3 w-3 mr-1.5'} flex-shrink-0`} />
                <span>{contact.phone}</span>
              </div>
            )}
            
            {contact.nextActionDate && (
              <div className={`flex items-start ${isMobile ? 'text-[0.65rem]' : 'text-xs'}`}>
                <Calendar className={`${isMobile ? 'h-2.5 w-2.5 mr-1 mt-0.5' : 'h-3 w-3 mr-1.5 mt-0.5'} flex-shrink-0 text-muted-foreground`} />
                <div>
                  <span className="text-muted-foreground">{formatDate(contact.nextActionDate)}</span>
                  {contact.nextAction && (
                    <p className={`${isMobile ? 'text-[0.65rem]' : 'text-xs'} mt-0.5`}>{contact.nextAction}</p>
                  )}
                </div>
              </div>
            )}
            
            {contact.value && (
              <div className={`flex items-center ${isMobile ? 'text-[0.65rem]' : 'text-xs'} text-muted-foreground`}>
                <Euro className={`${isMobile ? 'h-2.5 w-2.5 mr-1' : 'h-3 w-3 mr-1.5'} flex-shrink-0`} />
                <span>{contact.value}€</span>
              </div>
            )}

            {contact.clientSince && contact.status === 'client' && (
              <div className={`${isMobile ? 'text-[0.65rem] mt-1 pt-1.5' : 'text-xs mt-1 pt-2'} border-t border-muted`}>
                <span className="text-green-600 font-medium">Client since: {getClientSinceText()}</span>
              </div>
            )}

            {contact.source && (
              <div className={`${isMobile ? 'text-[0.65rem]' : 'text-xs'} text-muted-foreground mt-1`}>
                <span className="font-medium">Source:</span> {contact.source}
              </div>
            )}
            
            {contact.notes && (
              <div className={`${isMobile ? 'text-[0.65rem] mt-1 pt-1.5' : 'text-xs mt-1 pt-2'} border-t border-muted`}>
                <p className="line-clamp-2 text-muted-foreground">{contact.notes}</p>
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
