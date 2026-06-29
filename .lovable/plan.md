## Obiettivo
Nella pagina di onboarding gym/studio (`/gym-onboarding/:token`), mostrare la **Partita IVA** inserita dal trainer e richiedere alla palestra di confermarla (o correggerla) prima di completare l'onboarding.

## Modifiche

### `src/pages/GymOnboarding.tsx`
1. Aggiungere stato `vat` inizializzato da `invite.vat`.
2. Nella card "1. Confirm entity details", aggiungere una nuova riga con il campo **Partita IVA *** (max 11, solo cifre, helper "11 cifre numeriche").
3. Aggiungere una checkbox obbligatoria sotto al campo: *"Confermo che la Partita IVA è corretta"*.
4. Validazione in `handleSubmit`:
   - VAT obbligatoria, 11 cifre, checksum P.IVA italiana valida (stesso algoritmo già usato in `MyGymsSection.tsx` — estrarre in util condivisa `src/utils/validatePartitaIVA.ts` per evitare duplicazione).
   - Checkbox conferma deve essere true → toast "Conferma la Partita IVA per continuare".
5. Passare `vat` a `updateInvite(...)` insieme agli altri campi.

### `src/utils/validatePartitaIVA.ts` (nuovo)
Esporta `isValidPartitaIVA(value: string): boolean`. Refactor leggero: `MyGymsSection.tsx` importa da qui invece di tenere la funzione locale.

### `src/utils/mockGymInvites.ts`
`updateInvite` già accetta partial di `MockGymInvite` (che ora ha `vat?`), quindi nessun cambio strutturale — solo verificare che `vat` venga persistito nel record dell'invito esistente (già supportato).

Nessuna modifica DB / edge function — flusso interamente localStorage demo.
