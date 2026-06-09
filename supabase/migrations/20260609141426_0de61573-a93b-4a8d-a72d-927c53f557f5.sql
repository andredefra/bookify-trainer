
DELETE FROM public.mkt_personas WHERE lower(name) IN ('andrea', 'luca', 'marco');

UPDATE public.mkt_personas SET
  age_range = '24-28',
  description = 'La Social Olistica. PT dal volto fresco, molto attiva sui social (Reels, TikTok). Alterna insegnamento online a classi di gruppo fisiche (Bootcamp al parco, salette affittate).',
  pain = 'Formidabile nell''attirare attenzione ma disastrosa nel convertirla. Perde lead nei DM perché risponde 4 ore dopo. Gestisce le classi di gruppo su pezzi di carta: se due disdicono, i posti restano vuoti.',
  solution = 'Modulo Vetrina + CRM Sales & Waitlist (Essential). Landing "Link-in-bio" connessa alla Sales Dashboard. Feature magica: Lista d''Attesa automatica quando una classe è piena. Zero attrito, classi sempre piene.',
  copy_focus = 'Ti sei mai persa un potenziale cliente su Instagram perché gli hai risposto 3 ore dopo ed era andato da un altro trainer? Trasforma il tuo traffico social in incassi reali con le liste d''attesa di MyPersonal.'
WHERE lower(name) = 'giulia';

UPDATE public.mkt_personas SET
  age_range = '30-38',
  description = 'Il Coach Analitico. Esperto tecnico, nerd della sala pesi. Periodizzazioni complesse, metodo scientifico per la ricomposizione corporea (online e ibrido).',
  pain = 'Cerca dettaglio tecnico ma il metodo non scala. Domeniche pomeriggio a incrociare dati su Excel/Drive. I 15 clienti online lo bombardano lunedì mattina di file Word, foto compresse, vocali e PDF ritoccati con note indecifrabili sui pesi.',
  solution = 'Modulo Client Hub + Fitness Progress & Goal Display (Basic/Essential). Web-App cliente con Player Workout interattivo, log di pesi/serie/rep in tempo reale, Check-in (peso, scale bio-feedback 0-10 per sonno/umore), tutto storicizzato in dashboard.',
  copy_focus = 'Le tue domeniche valgono di più di un refresh sui file Excel dei tuoi atleti per ricalcolare tonnellaggi e progressioni in Word illeggibili. Rivoluziona la User Experience dei tuoi clienti con il vero Hub Tracker B2B.'
WHERE lower(name) = 'matteo';

UPDATE public.mkt_personas SET
  age_range = '28-35',
  description = 'L''In-Sala H24. Personal trainer in affitto "flat" o a percentuale in palestre commerciali/franchising. Bacino utenza offline, sul floor. Amichevole, sommerso dal 1-to-1 da mattina a sera.',
  pain = 'Passa la giornata seguendo persone in sala, non può usare il cellulare. Notifiche WhatsApp che deconcentrano; disdette dell''ultimo minuto ("sto male") lette troppo tardi: slot bruciato, niente reschedule, zero possibilità di chiamare uno di riserva.',
  solution = 'Modulo Automazione Scheduling + Calendar + In-Session Status Toggle (Essential). Bot scaccia-ansia connesso a Google Calendar. Toggle "In Session" che silenzia notifiche e fa gestire al bot lo slittamento appuntamenti senza interrompere il cliente in pedana.',
  copy_focus = 'Ti scocciano le lezioni annullate all''ultimo che vedi due ore dopo da WhatsApp facendoti perdere la cassa certa della lezione vuota delle 18? Ti serve la Toggle "In sessione": metti MyPersonal e fai in modo che il bot lavori gli slittamenti calendar per te senza farti perdere un colpo.'
WHERE lower(name) = 'lorenzo';
