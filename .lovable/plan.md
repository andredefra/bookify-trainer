## Obiettivo
Sostituire `docs/trainer-dashboard/basic-vs-pro-features.md` con un documento riorganizzato in due macro-sezioni nette — **Trainer** e **Client** — ciascuna con i propri piani e le proprie funzionalità AI. Niente Gym, niente Studio.

## File
- Riscrivere: `docs/trainer-dashboard/basic-vs-pro-features.md`
  (manteniamo lo stesso percorso così i link esistenti continuano a funzionare; in cima aggiungiamo una nota che il doc copre sia Trainer che Client)

## Struttura del nuovo documento

### 1. Overview
- Scopo del doc, scope (solo Trainer + Client; Gym e Studio esclusi).
- Riferimento demo: `andrea.mypersonal.fit@gmail.com` = Trainer Basic.
- Modello a piani impilati (Pro ⊃ Essential ⊃ Basic; Client Pro ⊃ Client Free).

### 2. TRAINER — Funzionalità per piano

#### 2.1 Basic (piano gratuito — account Andrea)
Per ogni feature: cos'è / dove vive (tab + file) / struttura / flow / limiti.
Features: Sales Management (base, no fatturazione), Personal Page, Client Management + **Client Workouts View** (cross-ref a `client-workouts-view.md`), Messaging, Calendar, Reviews (read-only), Analytics base, Google Calendar sync.

#### 2.2 Essential (include tutto Basic)
Tabella riassuntiva "Everything in Basic" + dettaglio Essential-only:
Sessions booking, Waitlist, Programs (wizard, routines, circuits, periodizzazione), Session analytics, Program analytics, Exercise list (DB read-only), Exercise management (DB privato), Cash payments + dialog conferma, Payment installments, Transactions, Business analytics base.

#### 2.3 Pro (include tutto Essential)
Tabella "Everything in Essential" + dettaglio Pro-only:
Packages (session-based + duration), Services, Full payments (Stripe e-commerce), Pro installments, Invoicing (draft → sent + receipts), Transactions estese, Business dashboard, Advanced analytics (filtri tempo + vista aggregata clienti + AI contestuale), Priority support.

#### 2.4 Trainer AI — Add-on AI Plus (€1.99/mese)
Sezione dedicata: AI Business Insights, AI Chat Assistant, AI Client Analytics, Smart Recommendations, AI Installment Detection, Context-aware analytics, Program Assistant (chatbot + upload Word/PDF).

#### 2.5 Matrice riassuntiva Trainer
Tabella: Feature × Basic / Essential / Pro / AI Plus.

### 3. CLIENT — Funzionalità per piano

#### 3.1 Client Free
Per ogni feature: cos'è / dove vive / struttura / flow / limiti.
Features: Overview & progress, Training program & log workout, Sessions (incluso accept/decline postponement), Packages (view + acquisto/rinnovo), Trainers view, Messaging col trainer, Check-ins, Settings & health documents.

#### 3.2 Client Pro
Differenze rispetto a Free (capability gating).

#### 3.3 Client AI
- **Free tier**: 5 richieste/mese, accesso limitato.
- **Pro tier**: 100/giorno, insights avanzati.
Feature AI dettagliate: AI Workout Coach (chat contestuale durante workout), Multi-modal (text/foto/video → text/image/YouTube), AI Visual Demos (Gemini flash image gen), AI Form Analysis (OpenAI Vision, Pro), Personalized Advice, AI Workout Analysis inline, Realtime Voice Assistant.

#### 3.4 Matrice riassuntiva Client
Tabella: Feature × Free / Pro, con colonna AI.

### 4. Demo account quick reference
- Trainer demo: `andrea.mypersonal.fit@gmail.com` (Basic), UUID `00000000-0000-0000-0000-000000000002`, flag `demo-user` in localStorage.
- Dove vive il popup "Coming Soon" per upgrade (`PlanCard`).

### 5. Related docs
Link a: `client-workouts-view.md`, `docs/client-area/REQUIREMENTS.md`, `docs/trainer-dashboard/REQUIREMENTS.md`, `docs/pricing-plans/REQUIREMENTS.md`, `docs/ai/TECHNICAL.md`, `docs/billing/TECHNICAL.md`.

## Fonti che consolido
- `src/components/pricing/utils/planFeatures.ts` + `src/translations/en.ts` (`pricing.detailedFeatures.*`).
- `docs/trainer-dashboard/REQUIREMENTS.md`, `docs/client-area/REQUIREMENTS.md`, `docs/pricing-plans/REQUIREMENTS.md`.
- Memorie progetto su AI (Workout Assistant, Form Analysis, Program Assistant, Client AI Plan limits), pagamenti Essential vs Pro, packages, invoicing.

## Fuori scope
- Nessuna modifica al codice o alle traduzioni.
- Niente sezioni Gym o Studio.
- Versione italiana non generata salvo richiesta.
