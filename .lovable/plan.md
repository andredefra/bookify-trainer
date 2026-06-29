## Problema

Nel mockup Basic di Andrea (`andrea.mypersonal.fit@gmail.com`) cliccando "Invia Invito" appare l'errore "Errore durante l'invio dell'invito. Riprova."

**Causa:** `ProspectToClientDialog` chiama `ClientInvitationService.createInvitation()` che fa un `INSERT` reale su Supabase (`client_invitations`). L'utente demo Andrea non è autenticato realmente (UUID hardcoded `00000000-0000-0000-0000-000000000002`) → la insert fallisce per RLS / sessione assente.

## Fix proposto

Aggiungere un branch "demo mode" in `src/components/trainer/dashboard/tabs/sales/ProspectToClientDialog.tsx`:

1. Rilevare demo mode tramite `localStorage.getItem('demo-user')` (pattern già usato nel progetto — vedi memoria Core).
2. Se demo: saltare la chiamata a Supabase, simulare successo:
   - Salvare l'invito in `localStorage` (es. chiave `demo-client-invitations`) per coerenza con altri flow demo.
   - Mostrare toast di successo identico al flusso reale.
   - Chiamare `onConfirm()` per spostare il prospect nella colonna Client del funnel.
3. In modalità non-demo: comportamento attuale invariato.

Nessuna modifica al DB, alle edge function o ad altri componenti. Solo frontend, isolato al dialog.

## File toccati

- `src/components/trainer/dashboard/tabs/sales/ProspectToClientDialog.tsx` (unico file modificato)
