
# Medical Documents – Expiry Date & Reminder

## Obiettivo
Aggiungere data di scadenza ai medical documents caricati dal client, con reminder automatico quando manca 1 mese alla scadenza. Inserire un documento mockup in scadenza per il demo user `andrea.mypersonal.fit@gmail.com` così gli sviluppatori vedono il flusso.

## Modifiche

### 1. `src/components/common/HealthDocumentsUpload.tsx`
- Dopo aver selezionato un PDF, aprire un piccolo dialog/inline form con un date picker "Data di scadenza" (obbligatoria) prima di completare l'upload.
- Salvare l'expiry date associata al file in `localStorage` (chiave `health-docs-expiry`) mappata per `path` del file — coerente con il pattern demo già usato (no schema DB changes in questa fase).
- Mostrare per ogni documento in lista:
  - Data di scadenza formattata con `safeFormatDate`.
  - Badge stato: **Valido** (verde), **In scadenza** (giallo, <30 giorni), **Scaduto** (rosso).
- Permettere di modificare la data di scadenza dopo l'upload tramite piccola icona "edit".

### 2. Mock document in scadenza (solo per demo user andrea)
- Al mount, se `demo-user` è andrea, iniettare in stato (senza realmente toccare lo storage) un documento mockup:
  - Nome: `Certificato_Medico_Sportivo_2024.pdf`
  - Size: ~340 KB
  - Uploaded at: 6 mesi fa
  - Expiry date: **oggi + 18 giorni** → status "In scadenza"
- Il pulsante "view" su questo mock apre un placeholder (toast "Demo document") invece di Supabase Storage.

### 3. Reminder in-app
- Nuovo componente leggero `MedicalDocExpiryAlert` mostrato in cima alla pagina Settings → Account (e nella Overview del client basic):
  - Legge da `localStorage` la lista expiry + il mock.
  - Se almeno un documento è in scadenza (<30gg) o scaduto, mostra una card di warning con:
    - Nome del documento
    - Giorni rimanenti / "Scaduto da X giorni"
    - CTA "Aggiorna documento" → scrolla/naviga alla sezione upload.
- Toast `sonner` al primo load della sessione se ci sono documenti in scadenza/scaduti (una sola volta, flag in `sessionStorage`).

### 4. UX/i18n
- Etichette italiane: "Data di scadenza", "In scadenza tra X giorni", "Scaduto", "Aggiorna documento".

## Note tecniche
- Nessuna migration Supabase: tutto in `localStorage` per restare coerenti con la modalità demo (memory rule: preserva il flag `demo-user`).
- Uso di `safeFormatDate` per tutte le date (memory core rule).
- Calcolo giorni con `date-fns/differenceInDays`.
- Il reminder reale "1 mese prima" è simulato lato client (no edge function / no email in questa fase) — solo banner in-app + toast.

## Out of scope
- Email/push notification reali.
- Persistenza su DB Supabase (verrà fatta quando si esce dalla fase demo).
