import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Calendar, CheckCircle, XCircle, Info } from "lucide-react";
import { ClientInvitation } from "@/types/clientInvitations";
import { ClientInvitationService } from "@/services/clientInvitationService";
import { useToast } from "@/hooks/use-toast";

interface TrainerInvitationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitation: ClientInvitation | null;
  onResponse: () => void;
}

export function TrainerInvitationDialog({ 
  open, 
  onOpenChange, 
  invitation,
  onResponse 
}: TrainerInvitationDialogProps) {
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResponse = async (status: 'accepted' | 'declined') => {
    if (!invitation) return;

    setIsLoading(true);
    try {
      await ClientInvitationService.respondToInvitation({
        invitation_id: invitation.id,
        status,
        response_message: responseMessage
      });

      toast({
        title: status === 'accepted' ? "Invito Accettato!" : "Invito Rifiutato",
        description: status === 'accepted' 
          ? "Sei ora un cliente di questo personal trainer. Benvenuto!"
          : "Hai rifiutato l'invito del personal trainer.",
      });

      onResponse();
      onOpenChange(false);
    } catch (error) {
      console.error('Errore risposta invito:', error);
      toast({
        title: "Errore",
        description: "Errore durante la risposta all'invito. Riprova.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!invitation) return null;

  const isExpired = new Date(invitation.expires_at) < new Date();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Richiesta Personal Trainer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Un personal trainer ha chiesto di essere il tuo allenatore personale. 
              Accettando, avrai accesso ai suoi programmi e servizi personalizzati.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Nome Personal Trainer:</span>
              <span className="text-sm">{invitation.client_name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data Richiesta:</span>
              <span className="text-sm">
                {new Date(invitation.created_at).toLocaleDateString('it-IT')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Scade il:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {new Date(invitation.expires_at).toLocaleDateString('it-IT')}
                </span>
                {isExpired && <Badge variant="destructive">Scaduto</Badge>}
              </div>
            </div>
          </div>

          {invitation.message && (
            <div className="space-y-2">
              <Label>Messaggio del Personal Trainer:</Label>
              <div className="p-3 bg-muted rounded-md text-sm">
                {invitation.message}
              </div>
            </div>
          )}

          {!isExpired && invitation.status === 'pending' && (
            <div className="space-y-2">
              <Label htmlFor="response-message">La tua risposta (Opzionale)</Label>
              <Textarea
                id="response-message"
                placeholder="Scrivi un messaggio di risposta..."
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {invitation.status !== 'pending' && (
            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-center gap-2 mb-2">
                {invitation.status === 'accepted' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : invitation.status === 'declined' ? (
                  <XCircle className="h-4 w-4 text-red-600" />
                ) : (
                  <Calendar className="h-4 w-4 text-gray-600" />
                )}
                <span className="text-sm font-medium">
                  {invitation.status === 'accepted' ? 'Accettato' :
                   invitation.status === 'declined' ? 'Rifiutato' : 'Scaduto'}
                </span>
              </div>
              {invitation.response_message && (
                <p className="text-sm text-muted-foreground">
                  "{invitation.response_message}"
                </p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          {!isExpired && invitation.status === 'pending' ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => handleResponse('declined')}
                disabled={isLoading}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Rifiuta
              </Button>
              <Button 
                onClick={() => handleResponse('accepted')}
                disabled={isLoading}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accetta
              </Button>
            </>
          ) : (
            <Button onClick={() => onOpenChange(false)}>
              Chiudi
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}