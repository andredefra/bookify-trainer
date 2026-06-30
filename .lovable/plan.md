
# Subscriptions Section – Free Plan only + dim AI stats

## Obiettivo
Nel client demo `andrea.mypersonal.fit@gmail.com`, area Settings → Subscriptions, lasciare solo la card "Free Plan" segnata Coming Soon, oscurare la sezione Monthly Usage / Features (l'AI non è ancora disponibile), e rimuovere la card "Upgrade to AI Plan".

## Modifiche – `src/components/client/tabs/settings/SubscriptionsSection.tsx`

1. **Rimuovere la card "Upgrade to AI Plan"** (righe 123-170) completamente.
2. **Rimuovere la card "Billing Information"** ramo Pro (non rilevante in fase di lancio Basic). Mantenere solo la card Free Plan.
3. **Card "Free Plan"**:
   - Conservare titolo "Free Plan", description "Basic access with limited AI features", badge "Coming Soon".
   - Avvolgere il contenuto `CardContent` (Monthly AI Usage + Your Features) in un wrapper con `opacity-50 pointer-events-none select-none` per oscurarlo, così resta visibile ma chiaramente non attivo.
   - Sostituire i valori dinamici di usage con valori statici "0/0 requests" e barra di progresso a 0.
   - Rimuovere il testo "You're approaching your monthly limit…".
   - Aggiungere sopra il blocco oscurato un piccolo overlay/nota: "Le funzionalità AI non sono ancora disponibili. Saranno attivate al lancio dell'AI Plan."
4. **Pulire import non più usati** (`Crown`, `CreditCard`, `ClientUpgradeDialog`, `toast`, `upgradeToProViaMock`, `downgradeToFreeViaMock`, `useState`, hook `useAIAccess` non più necessario se mostriamo valori statici). Mantenere solo ciò che serve.

## Out of scope
- Nessuna modifica a hook, traduzioni globali o ad altre pagine.
- Nessuna modifica DB.
