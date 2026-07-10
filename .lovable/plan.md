
## Obiettivo
Nella sezione "La mia palestra" (client basic, `MyGymBasicTab`):
1. Aggiungere una **barra di ricerca** (nome palestra) + **filtro città** nel `ConnectGymCard`.
2. Prima di connettere, l'utente deve **compilare i dati del piano** (data iscrizione, scadenza iscrizione, scadenza certificato medico). Solo dopo si abilita la connessione, e i dati risultano già precompilati nella card "Il mio piano".

## Modifiche

### 1. `src/components/client/tabs/mygym-basic/ConnectGymCard.tsx`
- Estendere `DEMO_GYMS` con un campo `city` (Milano per tutte quelle attuali) e aggiungere qualche palestra di altre città per rendere utile il filtro (es. Roma, Torino).
- Aggiungere sopra la lista:
  - `Input` con icona `Search` per ricerca per nome/indirizzo.
  - `Select` per città (popolato dinamicamente dalle città uniche di `DEMO_GYMS`, con opzione "Tutte le città").
- Filtrare la lista in base ai due criteri. Empty state se nessun risultato.
- Dopo aver selezionato una palestra e premuto "Connetti", **aprire un `Dialog`** con il form del piano (stessi 3 campi di `MembershipPlanCard`: `joinDate`, `expiryDate`, `certificateExpiryDate`, tutti `type="date"`). Bottone "Conferma e connetti" disabilitato finché almeno `joinDate` non è compilata (le scadenze restano opzionali per non bloccare).
- Estendere la prop `onConnected` per passare anche il piano: `onConnected(conn, plan)`.

### 2. `src/components/client/tabs/MyGymBasicTab.tsx`
- Aggiornare `handleConnected` per ricevere `(conn, plan)` e salvare entrambi in localStorage (`CONN_KEY` e `PLAN_KEY`), aggiornando anche lo stato `plan` così la `MembershipPlanCard` mostra subito i dati precompilati.

### 3. Nessuna modifica a `MembershipPlanCard.tsx`
Legge già da `plan` via prop, quindi i dati appaiono automaticamente.

## Note tecniche
- Tutto client-side, nessun cambio DB/Supabase.
- Solo UI/presentazione, coerente con lo stile shadcn esistente (`Input`, `Select`, `Dialog`, `Button`).
- Testi in italiano come nel resto del tab.
