## Obiettivo
Nel dialog "Client Profile" del trainer (tab Overview), aggiungere sezioni con più informazioni provenienti dal profilo cliente, così da non lasciare la vista quasi vuota.

## Modifiche

### 1. `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/OverviewTab.tsx`
Estendere il contenuto della card Overview aggiungendo, sotto le sezioni esistenti (ClientSummary, UpcomingSessions, BasicMeasurements), tre nuovi blocchi:

- **Health & Medical Info**
  - Food Allergies & Intolerances
  - Health Conditions
  - Physical Limitations & Injuries
  - Medical Certificate: nome file mock (`Certificato_Medico_Sportivo_2024.pdf`), data scadenza, badge stato (Valido / In scadenza / Scaduto) coerente con `HealthDocumentsUpload`, pulsante "Download" (mock/toast)

- **Fitness Preferences**
  - Fitness Goals (badge list)
  - Experience Level
  - Preferred Workout Time

Icone Lucide (`Heart`, `AlertTriangle`, `FileText`, `Target`, `Clock`) coerenti col resto della UI. Layout in griglia responsive 1 col mobile / 2 col desktop.

### 2. `src/components/trainer/dashboard/tabs/clients/data/clientDetails.ts` (o il file mock esistente che produce `mockClientDetails`)
Estendere l'oggetto con i nuovi campi mock (in italiano/inglese come il resto della UI):
```ts
allergies: "Lattosio, frutta secca"
healthConditions: "Ipertensione lieve (in trattamento)"
physicalLimitations: "Pregressa distorsione ginocchio destro — evitare salti massimali"
medicalCertificate: {
  fileName: "Certificato_Medico_Sportivo_2024.pdf",
  expiryDate: "2026-07-19",
  sizeKB: 348
}
fitnessGoals: ["Weight loss", "Muscle tone", "Cardiovascular health"]
experienceLevel: "Intermediate"
preferredWorkoutTime: "Early morning (6–9 AM)"
```
I valori vengono usati da tutti i client mock (stesso mock condiviso già oggi).

### 3. Tipi
Aggiornare l'interfaccia `mockClientDetails` in `OverviewTab.tsx` e in `ClientProfileTabContent.tsx` per includere i nuovi campi opzionali, in modo che TypeScript resti pulito senza toccare le altre tab.

### 4. Search
I nuovi campi vengono passati anche a `useTabSearchResults` così la search interna al profilo li include (estensione minima dell'hook per matchare i nuovi testi nella tab Overview).

## Fuori scope
- Nessuna modifica al dashboard cliente, al DB o alle altre tab (Programs/Packages/Sales/Notes).
- Nessuna logica reale di download del certificato: solo mock + toast, come già fatto altrove nel demo.
