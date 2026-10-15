INSERT INTO public.mkt_brand_docs (title, content, is_active, processing_status, doc_type) VALUES
('06 — Prodotto: Trainer Hub, mappa funzionale', $doc$# Trainer Hub — mappa funzionale
Fonte: Product Documentation: Trainer area. Mappa dei moduli e delle funzioni lato trainer, da usare per sapere cosa possiamo dire e mostrare.

## Modulo Impostazioni PT e profilo business
Centro di comando per identità professionale, regole operative (disponibilità e pagamenti) e configurazione dell'automazione AI. Alimenta il profilo pubblico sul marketplace.
1. Disponibilità in tempo reale e delega all'AI — tre stati nel menu in alto: Disponibile (notifiche dirette immediate), In sessione (notifiche silenziate, l'auto-reply AI risponde alle domande base e prepara richieste di appuntamento secondo le regole del calendario), Offline (l'AI gestisce le aspettative). Quando non è "Disponibile" l'AI fa da segretaria e propone orari che diventano richieste in attesa di approvazione.
2. Configurazione del profilo pubblico — nome professionale, titolo, foto, bio, anni di esperienza, specializzazioni a tag, lingue parlate, interruttore per pubblicare o nascondere il profilo.
3. Orari e disponibilità — griglia settimanale con inizio e fine per ogni giorno, blocchi di pausa, durata di default della sessione e tempo cuscinetto fra sessioni. Sono i limiti rigidi entro cui l'AI può proporre.
4. Affiliazione a studio o palestra — ricerca della struttura, richiesta di collegamento con workflow in attesa / approvata / rifiutata, badge verificato sul profilo una volta approvata.
5. Impostazioni commerciali — pagamenti e fatturazione.
6. Abbonamento e AI — gestione del proprio piano e dell'add-on AI.
7. Profilo sul marketplace pubblico.

## Modulo reputazione e gestione recensioni
1. Dashboard analytics delle recensioni.
2. Lista recensioni e moderazione, con risposta e nascondi.
3. Richiesta di modifica, cioè il sistema di contestazione.
4. Sincronizzazione sul profilo pubblico.
Nota: è una funzione Basic reale e live, non va mai presentata come beta o roadmap.

## Modulo business analytics e AI
1. Analytics sui ricavi (Pro).
2. Performance di pacchetti e vendite (Pro).
3. Retention dei clienti e demografiche.
4. Riepilogo AI del business e chat (esclusiva AI Pro).

## Modulo transazioni e gestione finanziaria
1. Registro transazioni e dashboard.
2. Flusso di conferma dei pagamenti in contanti.
3. Inserimento manuale di una transazione.
4. Gestione fatture (bozze e caricamenti).
5. Monitoraggio delle rate.

## Modulo comunicazione e automazione
1. Inbox unificata e gestione messaggi.
2. Chat ricca bidirezionale.
3. Template di messaggio.
4. Motore di regole di automazione.
5. Analytics sull'automazione.$doc$, true, 'pending', null),

('07 — Prodotto: Client Hub, mappa funzionale', $doc$# Client Hub — mappa funzionale
Fonte: Product Documentation: Client area. Serve a ricordare quanto è completo il lato cliente: è l'argomento di vendita più forte verso il trainer.

## Impostazioni cliente
Account (anagrafica, foto, età, altezza, sesso; dati medici in campi liberi: allergie e intolleranze, condizioni di salute, limitazioni e infortuni; contatto di emergenza) · pagamenti (metodi salvati, solo ultime quattro cifre, mai condivisi con il trainer) · preferenze (obiettivi fitness multi-selezione, livello di esperienza, lingua, unità metriche o imperiali, orario preferito di allenamento) · integrazioni · la mia palestra o studio · notifiche · abbonamenti e fatturazione.

## Dashboard e tracking attività
1. Progressi e obiettivi in vista.
2. Log attività con stima delle calorie.
3. Log biometrico: peso e misure corporee.
4. Gestione obiettivi, anche personalizzati.
5. Accesso rapido e check-in richiesti dal trainer.

## Sessioni e prenotazioni
Scoperta delle sessioni, dettaglio e iscrizione, checkout e pagamenti, prenotazione di sessioni private, inviti a sessione, calendario e storico.

## La mia palestra o studio
Dashboard della struttura e stato dell'abbonamento, marketplace dei pacchetti, elenco dei trainer della palestra, hub di comunicazione, catalogo di servizi e classi.

## I miei pacchetti
Pacchetti attivi, gestione delle sessioni del pacchetto, rate e gestione finanziaria, marketplace, richiesta di un pacchetto su misura, checkout flessibile, archivio storico.

## Programma di allenamento ed esecuzione
1. Dashboard dei programmi e storico.
2. Gestione del programma (panoramica e fatturazione).
3. Session Player del workout.
4. Log degli esercizi e database esercizi.
5. AI Workout Coach (funzione Pro).

## Workout log e allenamento autonomo
Dashboard settimanale, costruttore manuale dell'allenamento, database e selettore esercizi, analytics AI e coach (fascia Pro).

## Marketplace trainer e team
I miei trainer, scoperta di nuovi trainer, trainer seguiti, storico pagamenti e ricevute.

## Analytics e insight
Aggregazione dati e stato delle connessioni, statistiche di performance, progressi sugli obiettivi e metriche corporee, assistente AI di analisi (add-on Pro).

## Messaggistica
Passaggio fra più trainer, chat con testo ricco, condivisione di foto e video.

## Integrazioni dati
App salute per passi e attività (Apple Health, Google Fit) e bilance smart per peso e composizione corporea (per esempio Xiaomi, Fitbit).$doc$, true, 'pending', null),

('08 — Formati editoriali, master prompt, hashtag e calendario', $doc$# Formati editoriali, master prompt, hashtag e calendario
Fonte: Brand Guidelines v1.0, parte B — Social Playbook.

## Gli 8 formati
1. REEL · Feature sneak peek — screen recording dell'app a 1.5x. Il prodotto si vende da solo.
2. STORIA · Sondaggio trappola — domanda chirurgica sul dolore, DM qualificato a chi vota.
3. STORIA · Build in public — dietro le quinte dei founder. "Stiamo assassinando Excel."
4. CAROSELLO · Mini-training — 3–5 slide educative B2B. Norma tecnica contro feature dell'app.
5. POST · Meme / frustrazione — sarcasmo sui drammi della categoria. Thumb-stopping.
6. CAROSELLO · Switch prima / dopo — il caos vecchia scuola contro il sistema unico.
7. POST · Verità scomoda — opinione impopolare in stile tweet. Genera dibattito.
8. STORIA · Countdown FOMO — "restano 11 posti". Spinge il contratto PT Premium.

## Il master prompt AI
Da incollare nell'assistente per generare i testi, compilando solo le parti fra parentesi.

"Agisci come un personal trainer indipendente italiano di 30 anni, sul pezzo, che parla ad altri colleghi. Stai documentando il tuo nuovo strumento B2B MyPersonal.fit. Tono informale, da collega a collega, leggermente esasperato dal modo vecchia scuola di lavorare (Excel, agende di carta, caos su WhatsApp).
Crea un testo per un [FORMATO: Reel / Carosello / Storia]. Target: [Giulia / Matteo / Lorenzo]. Dolore da toccare: [il dolore specifico]. La nostra soluzione: [feature Essential].
Struttura: hook che colpisce il dolore poi 2 righe su cosa abbiamo creato poi chiudi con una domanda per i commenti poi CTA: [scrivi 'BETA' in DM per uno dei 25 posti]. Max 3–4 emoji, nessun formalismo."

## Hashtag — pescare i PT giusti
Hashtag di problema, il lavoro tecnico del PT, non influencer ma trainer puri:
#personaltraineritalia #vitadappt #schedaallenamento #programmaallenamento #gestioneclienti #allenamentofunzionale

## Geolocalizzazione
Niente "Milano" generico. Si taggano i luoghi dove vivono le personas: studi PT a Milano, bootcamp al parco, centri yoga, zone business, aree fitness vicino alla metro.
Metodo: segnare quale mix pesca meglio e raddoppiare su quello.

## Quando pubblicare
| Slot | Orario | Chi scrolla |
|---|---|---|
| Mattinieri | 05:00–08:00 | PT in viaggio verso il primo cliente |
| Pausa pranzo | 11:00–13:00 | Pausa e scroll del feed |
| Fine turno | 17:00–19:00 | Picco di attenzione sui Reel |
Giorni migliori: martedì, mercoledì, giovedì.

## Regola 33 / 33 / 33
Effort diviso in tre fra Giulia, Matteo e Lorenzo fino al lancio. Dopo due settimane i dati ruotano la pipeline verso la persona che converte di più.
Obiettivo: 25–50 PT pionieri. Una sola CTA per post.

## Template pronti da esportare
Post 1080×1080: cover "VS", problema/incubo, soluzione dashboard. Storia 9:16: sondaggio, build in public, countdown FOMO. Post: verità scomoda.$doc$, true, 'pending', null),

('09 — Sito web e canali: stato e convenzioni', $doc$# Sito web e canali — stato e convenzioni
Aggiornato al 15 ottobre 2026.

## Struttura del sito pubblico
Tre famiglie di pagine:
- Italiano in euro: /it per i trainer, /user per gli utenti finali.
- Inglese in euro, per chi parla inglese ma è in Europa: / per i trainer, /user-en per gli utenti.
- Inglese-India in rupie, in arrivo: una pagina trainer e una utenti, con prezzi dedicati al mercato indiano.
Il selettore della lingua è unico su tutto il sito pubblico: bandiera più codice sul bottone, nome esteso nel menu.

## Waitlist dell'app consumer
L'app per gli utenti finali non è ancora aperta. Sulle pagine utenti il piano a pagamento è spento e marcato "Disponibile dopo i primi 100", il contatore dei posti dice "coming soon" e tutti i bottoni di iscrizione aprono un form di lista d'attesa.
Il form raccoglie nome, email, città, telefono facoltativo e la domanda "ti alleni da solo o con un personal trainer", più una spunta separata e non pre-selezionata per il consenso a essere contattati. Vengono salvati anche lingua, pagina di provenienza e parametri UTM della campagna.
La lista si consulta ed esporta in CSV dall'area admin, sezione Waitlist.

## Dove NON sbagliare
- Non promettere pagamenti automatici via Stripe o il collegamento del conto bancario finché il binario non esiste davvero: i pagamenti digitali sono del piano Pro.
- Non usare più i nomi vecchi "Personal.ai" e "Trainer.ai", né gli indirizzi di esempio tipo personal.ai/nometrainer. Il nome dell'assistente è "Trainer AI di MyPersonal".
- Una sola ragione sociale nei footer e nelle pagine legali.
- La parola "cruscotto" è vietata ovunque.

## Hook approvato per la home trainer
4 APP SLEGATE E LA DOMENICA A INCROCIARE EXCEL.
Sottotitolo: Lead, schede, calendario e incassi in un posto solo. La domenica te la tieni.
La parola "DOMENICA" va in oro.$doc$, true, 'pending', null);

INSERT INTO public.mkt_brand_assets (name, asset_type, hex, notes) VALUES
('Nero', 'color', '#0A0A0A', 'Canvas principale, 60% della superficie. Tutto nasce sul nero.'),
('Oro Power', 'color', '#F6C124', 'Primario, 10%. Brand, evidenza, CTA, parole chiave.'),
('Bianco', 'color', '#FFFFFF', 'Testo principale e titoli su nero, 30%.'),
('Crema UI', 'color', '#ECE7DB', 'Superficie della dashboard prodotto negli screenshot.'),
('Rosso Problema', 'color', '#FB3B2E', 'Accento semantico: vecchia scuola, caos, errore, il "prima". Mai sui pulsanti d''azione.'),
('Lime Soluzione', 'color', '#C6F24E', 'Accento semantico: risultato, il "dopo", conferma positiva.'),
('Magenta Pop', 'color', '#FF4FA3', 'Evidenza secondaria, energia, contrasto sui titoli.'),
('Archivo', 'font', null, 'Espanso, peso 900, sempre MAIUSCOLO. Titoloni e hook, pieno schermo.'),
('JetBrains Mono', 'font', null, 'Pesi 700 e 800. Wordmark mypersonal.fit, etichette, numeri, badge, prezzi.'),
('Inter', 'font', null, 'Pesi 400–700. Corpo del testo, didascalie, paragrafi.');