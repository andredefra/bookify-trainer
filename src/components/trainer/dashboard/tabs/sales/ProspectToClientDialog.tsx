import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Send, Users } from "lucide-react";
import { SalesContact } from "./types";
import { ClientInvitationService } from "@/services/clientInvitationService";
import { useToast } from "@/hooks/use-toast";

interface ProspectToClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: SalesContact | null;
  onConfirm: () => void;
}

export function ProspectToClientDialog({ 
  open, 
  onOpenChange, 
  contact, 
  onConfirm 
}: ProspectToClientDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSendInvitation = async () => {
    if (!contact) return;

    setIsLoading(true);
    try {
      const isDemo = typeof window !== 'undefined' && !!localStorage.getItem('demo-user');
      const finalMessage = message || `Ciao ${contact.name}, ti invito a diventare mio cliente per iniziare il nostro percorso di allenamento personalizzato!`;

      if (isDemo) {
        const existing = JSON.parse(localStorage.getItem('demo-client-invitations') || '[]');
        const invitation = {
          id: crypto.randomUUID(),
          client_email: contact.email,
          client_name: contact.name,
          lead_id: contact.id,
          message: finalMessage,
          status: 'pending',
          created_at: new Date().toISOString(),
        };
        localStorage.setItem('demo-client-invitations', JSON.stringify([invitation, ...existing]));
      } else {
        await ClientInvitationService.createInvitation({
          client_email: contact.email,
          client_name: contact.name,
          lead_id: contact.id,
          message: finalMessage,
        });
      }

      toast({
        title: "Invito inviato!",
        description: `L'invito è stato inviato a ${contact.name}. Riceverai una notifica quando risponderà.`,
      });

      onConfirm();
      onOpenChange(false);
    } catch (error) {
      console.error('Errore invio invito:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'invio dell'invito. Riprova.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Converti in Cliente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Importante:</strong> Facendo questo il tuo prospect apparirà anche nella sezione "Clienti" e diventerà un tuo cliente attivo. Sarà inviato un invito a <strong>{contact.name}</strong> per confermare la relazione trainer-cliente.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="client-info">Cliente</Label>
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invitation-message">Messaggio Personalizzato (Opzionale)</Label>
            <Textarea
              id="invitation-message"
              placeholder={`Ciao ${contact.name}, ti invito a diventare mio cliente per iniziare il nostro percorso di allenamento personalizzato!`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-primary/5 p-3 rounded-md">
            <h4 className="text-sm font-medium text-primary mb-1">Cosa succede dopo?</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• {contact.name} riceverà una notifica di invito</li>
              <li>• Dovrà accettare per diventare tuo cliente</li>
              <li>• Una volta accettato, apparirà nella sezione Clienti</li>
              <li>• Riceverai una notifica della sua risposta</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={handleSendInvitation} disabled={isLoading}>
            {isLoading ? (
              "Invio..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Invia Invito
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}