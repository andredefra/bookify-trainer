## Diagnosi

Il campo **Partita IVA** è già presente nel codice di `src/pages/GymOnboarding.tsx` (righe 213–245), renderizzato sempre — non è condizionato a `invite.vat`. Quindi il codice è corretto.

Lo screenshot è preso da **`https://mypersonal.fit/gym-onboarding/...`** (dominio custom pubblicato). Quel dominio serve l'**ultima build pubblicata**, che è precedente alle modifiche fatte sulla Partita IVA. Per questo il campo non appare.

## Piano

Nessuna modifica al codice necessaria. Due azioni:

1. **Ripubblicare l'app** così che `mypersonal.fit` (e gli altri custom domain) ricevano la nuova versione con il blocco "Partita IVA + checkbox di conferma".
2. **Verifica post-pubblicazione**: riaprire il link onboarding generato dal trainer e confermare che compaia la sezione gialla "Partita IVA *" tra "City" e "Verification documents", con badge "Pre-compilata dal trainer" quando l'invito contiene già la P.IVA.

Se dopo la ripubblicazione il campo continua a non comparire, allora si tratta di un bug reale e procederò a investigare (es. cache del browser, link generato da una versione vecchia del payload senza i nuovi campi, ecc.).