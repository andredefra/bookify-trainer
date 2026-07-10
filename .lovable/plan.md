## Problema 1 — Disconnessione palestra fallisce

In `MyGymSection.tsx`, `handleDisconnect` fa una UPDATE su `gym_connection_requests` usando `connection.id`. Ma nel caso demo (utente non loggato / nessuna riga in DB), `useGymConnection` carica una connessione fittizia con `id: 'demo-connection-id'` — la UPDATE non colpisce nessuna riga reale e/o fallisce con RLS, quindi vediamo "Failed to disconnect from gym."

### Fix
In `src/components/client/tabs/settings/MyGymSection.tsx`:
- Riconoscere il caso demo: se `connection.id === 'demo-connection-id'` (o non c'è un utente autenticato), **saltare la chiamata Supabase** e disconnettere localmente (svuotare lo stato via un nuovo `clearDemoConnection` esposto da `useGymConnection`, oppure semplicemente ricaricare demo → cambiamo la firma minimamente).
- Mostrare comunque il toast "Disconnected" e chiamare `refetch()` (che ora, in demo, ricarica lo stato "connesso"). Quindi in demo esporremo invece un `disconnectDemo()` che imposta `connection = null` in stato locale.

In `src/hooks/useGymConnection.ts`:
- Aggiungere una funzione `disconnect()` che:
  - se `connection?.id === 'demo-connection-id'` → `setConnection(null); setPackages([]); setCommunications([])` e ritorna successo.
  - altrimenti → esegue la UPDATE su Supabase come oggi, poi `fetchGymConnection()`.
- `MyGymSection` userà `disconnect()` invece della UPDATE inline.

Nessuna modifica DB / RLS.

## Problema 2 — X di chiusura sui toast

Il progetto usa **sonner** (`src/components/ui/sonner.tsx`) montato in `App.tsx`. Sonner supporta `closeButton` come prop del `<Toaster />` che aggiunge una X su ogni toast.

### Fix
In `src/components/ui/sonner.tsx`:
- Aggiungere `closeButton` al `<Sonner />`.
- Aggiungere in `toastOptions.classNames.closeButton` uno stile coerente col design system (bordo/foreground tramite token, niente colori hardcoded), così la X è visibile anche sui toast destructive.

Nessun'altra modifica: tutti i `toast(...)` esistenti guadagnano automaticamente la X.

## File toccati
- `src/hooks/useGymConnection.ts` (+ funzione `disconnect`)
- `src/components/client/tabs/settings/MyGymSection.tsx` (usa `disconnect`)
- `src/components/ui/sonner.tsx` (abilita `closeButton`)
