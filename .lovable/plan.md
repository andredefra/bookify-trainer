## Remove Neck & Shoulders from Body Measurements

Rimuovo i campi Neck e Shoulders dal dialog di log, dalla history e dal card Measurements in Analytics. WHtR/WHR (usati per lo status "Healthy Range") non ne hanno bisogno. La formula Navy Body Fat (che usa il collo) resterà nel codice ma non verrà più calcolata perché mancherà l'input — l'app la gestisce già graziosamente restituendo `null`.

### File da modificare

1. **`BodyMeasurementsDialog.tsx`** — rimuovere i due `FormField` (shoulders, neck) e i default values. Layout resta a 2 colonne con Waist/Hips/Thighs/Arms.

2. **`BodyMeasurementsHistoryDialog.tsx`** — rimuovere le colonne Shoulders e Neck (header + celle), aggiornare il filtro `hasAnyValue` a `waist || hips || thighs || arms`.

3. **`BodyMeasurementsCard.tsx`** (Analytics) — rimuovere i due `renderMeasurementItem` per neck e shoulders (le 2 righe corrispondenti); anche le variabili `neckTrend` e `shouldersTrend` non più necessarie.

4. **`useBodyMeasurements.ts`** — nel mock seed togliere `neck` e `shoulders` per coerenza (i dati vecchi in localStorage con quei campi non danno fastidio ma non verranno più mostrati).

### Cosa NON tocco

- `types.ts` `BodyMeasurements` interface: lascio `neck?` e `shoulders?` come optional per retro-compatibilità con dati salvati.
- `bodyFatCalculations.ts` e `utils.ts`: la formula Navy resta ma non riceverà più `neck` → body fat non calcolato (comportamento già previsto).
- `trendCalculations.ts` `getBodyFatTrend`: idem, ritornerà `null` quando manca neck.
- Nessuna modifica a DB, RLS, o profilo utente.
