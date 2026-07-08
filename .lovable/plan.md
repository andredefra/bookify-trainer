## Fix: mocks non attivi perché `clientId` viene sovrascritto

Il problema: in `Overview.tsx` `clientId` parte come demo UUID, poi `useEffect` chiama `supabase.auth.getUser()` e lo sostituisce con l'ID reale dell'utente autenticato. La mia iniezione di mock in `useClientCheckIns` scattava solo per `DEMO_CLIENT_ID`, quindi in pratica non si attivava mai per l'utente loggato.

### Modifica

1. **`src/hooks/useClientCheckIns.ts`** — aggiungere un secondo parametro opzionale `options?: { useMocks?: boolean }`. Quando `useMocks` è true (oppure `clientId === DEMO_CLIENT_ID`), il fetch salta Supabase e restituisce i mock; anche `submitCheckIn` mantiene la logica solo-locale già presente.

2. **`src/components/client/overview/checkin/ClientCheckInCard.tsx`** — accettare prop opzionale `useMocks?: boolean` e passarla al hook.

3. **`src/components/client/tabs/Overview.tsx`** — passare `useMocks={isBasic}` a `<ClientCheckInCard />`. Sulla dashboard basic (mock/demo) l'utente vede sempre i 4 check-in fittizi.

Nessuna modifica a DB, RLS o layout.
