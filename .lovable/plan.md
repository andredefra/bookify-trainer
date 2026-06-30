## Aggiunte alla Payment History (demo Andrea)

Aggiungere voci mock aggiuntive nella Payment History del client Basic con stati realistici e simulazioni funzionanti.

### 1. Nuove entries mock nel bridge (`src/lib/demoTransactionsBridge.ts`)

Aggiungere al `SEED` queste transazioni "storiche" così la tabella mostra più vita:

- **2025-05-20 — Session — €50 — Card** → `invoiceStatus: "sent_to_client"`, con `invoiceNumber: "INV-2025-0042"` e `invoiceIssuedAt` → badge **"Invoice Available"** + bottone **Download PDF**.
- **2025-05-10 — Program — €200 — Card** → `refundStatus: "approved"`, `refundProcessedAt` + `refundReason` → badge **"Refund Processed"** + bottone **Download Refund Receipt**.
- **2025-04-28 — Session — €45 — Cash** → `invoiceStatus: "none"` (pagamento contanti senza fattura richiesta).
- **2025-04-15 — Package — €300 — Card** → `invoiceStatus: "sent_to_client"` con numero fattura → **Download PDF**.
- **2025-03-30 — Session — €50 — Card** → `refundStatus: "rejected"`, `refundReason` + `refundRejectedAt` → badge **"Refund Rejected"** (read-only, nessuna azione).

Estendere `DemoTransaction` con i campi opzionali nuovi: `invoiceNumber`, `invoiceIssuedAt`, `refundProcessedAt`, `refundRejectedAt`, `refundReceiptNumber`.

### 2. Generazione PDF reale lato client

Creare `src/lib/demoInvoicePdf.ts` con due funzioni:
- `downloadInvoicePdf(tx)` → genera un PDF fattura italiano (intestazione "Sarah Johnson — Personal Trainer", P.IVA mock, cliente "Andrea M.", riga servizio, imponibile, totale, numero fattura, data) e fa partire il download.
- `downloadRefundReceiptPdf(tx)` → genera PDF "Ricevuta di Rimborso" con importo, motivo, data processamento.

Implementazione: usare **jsPDF** (libreria leggera, ~50KB), già compatibile con bundle Vite. Verrà aggiunta come dipendenza.

### 3. UI: `PaymentsTable.tsx`

Nella colonna **Receipts** estendere la logica esistente:
- `invoiceStatus === "sent_to_client"` + `invoiceNumber` → mostrare badge verde **"Invoice Available"** + icona Download cliccabile che chiama `downloadInvoicePdf(tx)`.
- `refundStatus === "approved"` → badge verde **"Refund Processed"** + icona Download → `downloadRefundReceiptPdf(tx)`.
- `refundStatus === "rejected"` → badge grigio/rosso **"Refund Rejected"** (tooltip con motivo, nessun bottone).
- Lasciare invariati i badge esistenti "Invoice Requested" e "Refund Pending".

### 4. Reset seed

Visto che il seed è già stato salvato in `localStorage` dell'utente, aggiungere un check di versione: bump della costante `SEED_VERSION` nel bridge in modo che al prossimo load le nuove entry mock vengano scritte (preservando le eventuali transazioni create dal trainer demo durante la sessione, oppure semplicemente ricaricando il seed completo — è una demo).

### File toccati

- `src/lib/demoTransactionsBridge.ts` — nuovi campi + nuove entries + versioning seed
- `src/lib/demoInvoicePdf.ts` — **nuovo**, generatore PDF
- `src/components/client/trainers/PaymentsTable.tsx` — nuovi badge + bottoni download
- `package.json` — aggiunta `jspdf`

### Note tecniche

- Tutto resta lato client (localStorage + jsPDF in-browser), nessuna modifica a Supabase/edge functions — coerente col pattern demo Andrea.
- I PDF generati sono reali e scaricabili (non placeholder), così gli sviluppatori vedono il flusso completo.
