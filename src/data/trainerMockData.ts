
// Mock trainer data for development and testing

export interface Trainer {
  id: string;
  slug?: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  specialties: string[];
  certifications: string[];
  availability: {
    [key: string]: string[];
  };
  education: string;
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  profileImage: string;
  status: "online" | "offline" | "in-session";
  nextAvailability: string;
}

export interface Testimonial {
  id: number;
  name: string;
  image: string;
  text: string;
  rating: number;
}

export interface Message {
  sender: "client" | "ai" | "trainer";
  message: string;
  time: string;
  attachments?: {
    name: string;
    type: string;
    url?: string;
  }[];
}

export type TrainerCredential = 'certified' | 'verified' | 'topRated' | 'nutrition';

export interface TrainerPackage {
  name: string;
  subtitle: string;
  price: number;
  unit: string;
  includes: string[];
  featured: boolean;
}

export interface TrainerClass {
  weekday: string;
  day: number;
  name: string;
  venue: string;
  time: string;
  level: string;
  capacity: number;
  booked: number;
}

export interface PublicBookingSelection {
  name: string;
  dateLabel?: string;
  time?: string;
}

export interface PublicTrainerReview {
  name: string;
  rating: number;
  date: string;
  text: string;
  reply?: string;
}

export type WeeklySlot = { start: string; end: string; break?: { start: string; end: string }; closed?: false } | { closed: true };
export interface PublicTrainerSchedule {
  weekly: WeeklySlot[]; // Monday through Sunday
  upcoming: { date: string; booked: number }[];
  sessionMinutes: number;
  gapMinutes: number;
}

function demoSchedule(weekly: WeeklySlot[], bookings: number[]): PublicTrainerSchedule {
  const upcoming = bookings.map((booked, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    const slot = weekly[(date.getDay() + 6) % 7];
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return { date: dateString, booked: slot.closed ? 0 : booked };
  });
  return { weekly, upcoming, sessionMinutes: 60, gapMinutes: 15 };
}

// Complete public demo records; legacy profile consumers receive an adapter below.
export interface DemoTrainer extends Omit<Trainer, 'certifications' | 'education' | 'experience' | 'availability' | 'status' | 'nextAvailability'> {
  slug: string;
  languages: string[];
  yearsExperience: number;
  primaryGym: { name: string; verified: boolean } | null;
  certifications: { title: string; org: string; expiry: string | null }[];
  education: { title: string; org: string; years: string }[];
  experience: { role: string; org: string; from: string; to: string; description: string }[];
  credentials: TrainerCredential[];
  filterTags: string[];
  availableLabel: string;
  stats: { clientsHelped: number; goalsHit: string; avgProgress: string };
  packages?: TrainerPackage[];
  classes?: TrainerClass[];
  publicReviews: PublicTrainerReview[];
  schedule: PublicTrainerSchedule;
}

export const demoTrainers: DemoTrainer[] = [
  {
    publicReviews: [
      {"name": "Marta Conti", "rating": 5, "date": "2026-10-10", "text": "Prima saltavo gli allenamenti quando uscivo tardi dal lavoro. Con due sedute brevi e la scheda in app riesco a tenere il ritmo anche nelle settimane piene.", "reply": "Abbiamo tenuto pochi esercizi e due orari fissi: continuiamo a usare il diario per adattare le settimane."},
      {"name": "Elena Riva", "rating": 4.9, "date": "2026-09-26", "text": "Al bootcamp ho imparato a fare gli affondi senza perdere equilibrio. Quando un esercizio è troppo impegnativo Giulia mi dà una variante, così resto nel gruppo."},
      {"name": "Paolo Neri", "rating": 4.8, "date": "2026-09-12", "text": "Dopo tre mesi so scegliere i carichi senza andare a caso. I check-in mi hanno aiutato a guardare anche le misure e non soltanto il peso."}
    ],
    schedule: demoSchedule([{"start": "07:00", "end": "21:00", "break": {"start": "13:00", "end": "16:30"}}, {"start": "07:00", "end": "21:00", "break": {"start": "13:00", "end": "16:30"}}, {"start": "07:30", "end": "20:30", "break": {"start": "13:00", "end": "16:00"}}, {"start": "07:00", "end": "21:00", "break": {"start": "13:00", "end": "16:30"}}, {"start": "07:00", "end": "19:30", "break": {"start": "12:30", "end": "15:30"}}, { closed: true }, { closed: true }], [5, 0, 0, 4, 3, 0, 6]),
    id: 't1', slug: 'giulia-ferrero', name: 'Giulia Ferrero', title: 'Personal Trainer certificata', location: 'Milano', rating: 4.9, reviews: 38, hourlyRate: 50, yearsExperience: 6,
    filterTags: ['weight-loss', 'strength', 'group-bootcamp', 'pre-post-natal'],
    packages: [
      { name: 'Prova', subtitle: 'Per capire se ci troviamo', price: 45, unit: '1 seduta', includes: ['1 seduta individuale', 'Valutazione iniziale', "Accesso all'app"], featured: false },
      { name: 'Percorso 3 mesi', subtitle: 'Il programma completo', price: 390, unit: '12 sedute · €32 a seduta', includes: ['12 sedute individuali', 'Scheda aggiornata ogni 4 settimane', 'Check-in misure e foto', 'Supporto in chat'], featured: true },
      { name: 'Bootcamp', subtitle: 'Classi di gruppo al parco', price: 80, unit: '10 ingressi · 3 mesi', includes: ['10 classi a scelta', 'Martedì e giovedì 19:00', "Lista d'attesa automatica"], featured: false },
    ],
    classes: [
      { weekday: 'Mar', day: 20, name: 'Bootcamp', venue: 'Parco Sempione', time: '19:00 — 20:00', level: 'livello intermedio', capacity: 12, booked: 8 },
      { weekday: 'Gio', day: 22, name: 'Bootcamp', venue: 'Parco Sempione', time: '19:00 — 20:00', level: 'livello intermedio', capacity: 12, booked: 11 },
      { weekday: 'Sab', day: 24, name: 'Functional', venue: 'Studio MP', time: '10:00 — 11:00', level: 'tutti i livelli', capacity: 10, booked: 10 },
    ],
    credentials: ['certified', 'verified', 'topRated', 'nutrition'], availableLabel: 'Disponibile oggi', stats: { clientsHelped: 64, goalsHit: '78%', avgProgress: '61%' },
    primaryGym: { name: 'Virgin Active Bicocca', verified: true }, languages: ['Italiano', 'Inglese', 'Spagnolo'],
    specialties: ['Ricomposizione corporea', 'Dimagrimento', 'Forza per principianti', 'Bootcamp di gruppo', 'Post-gravidanza', 'Nutrizione'],
    bio: 'Lavoro con chi vuole rimettersi in forma senza stravolgere la propria vita. Costruisco percorsi uno a uno partendo dal tempo e dalle abitudini di ciascuno. Il martedì e il giovedì tengo bootcamp al Parco Sempione: ci alleniamo insieme, con esercizi adattati al livello di ogni persona.',
    profileImage: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=85',
    certifications: [
      { title: 'Personal Trainer ISSA', org: 'ISSA Europe', expiry: null },
      { title: 'Functional Training Specialist', org: 'NASM', expiry: '2027-05-31' },
      { title: 'BLSD primo soccorso', org: 'Croce Rossa Italiana', expiry: '2028-01-12' },
      { title: 'Istruttrice Pre e Post Parto', org: 'FIF', expiry: null }
    ],
    education: [ { title: 'Laurea in Scienze Motorie', org: 'Università degli Studi di Milano', years: '2015 — 2018' }, { title: 'Master in Nutrizione applicata allo sport', org: 'Scuola di Nutrizione Salernitana', years: '2020' } ],
    experience: [
      { role: 'Personal Trainer indipendente', org: 'Studio proprio e outdoor — Milano', from: '2021', to: 'present', description: 'Seguo percorsi individuali e organizzo bootcamp al Parco Sempione due volte a settimana.' },
      { role: 'Trainer di sala e istruttrice corsi', org: 'Virgin Active — Milano Bicocca', from: '2019', to: '2021', description: 'Ho seguito i nuovi iscritti in sala pesi e condotto corsi di allenamento funzionale.' },
      { role: 'Istruttrice corsi di gruppo', org: 'Palestra Olimpia — Monza', from: '2018', to: '2019', description: 'Ho guidato piccoli gruppi con esercizi di forza e mobilità.' }
    ]
  },
  {
    publicReviews: [
      {"name": "Luca Serra", "rating": 4.9, "date": "2026-10-08", "text": "Registravo lo squat ma non capivo cosa correggere. Matteo mi ha fatto lavorare sulla profondità e ora le serie hanno una tecnica più costante.", "reply": "Il confronto dei video è servito a scegliere una correzione alla volta. Manteniamo lo stesso lavoro nel prossimo blocco."},
      {"name": "Andrea Costa", "rating": 4.8, "date": "2026-09-24", "text": "Il programma tiene conto delle mie tre giornate libere. Ho smesso di aggiungere esercizi a caso e riesco a seguire la progressione dei carichi."},
      {"name": "Marco Villa", "rating": 4.7, "date": "2026-09-05", "text": "Nelle settimane con turni notturni abbiamo ridotto il volume invece di saltare tutto. Le revisioni online mi hanno aiutato a continuare."}
    ],
    schedule: demoSchedule([{"start": "10:00", "end": "20:00", "break": {"start": "14:00", "end": "15:30"}}, {"start": "12:00", "end": "21:00", "break": {"start": "16:00", "end": "17:00"}}, {"start": "10:00", "end": "18:00"}, {"start": "12:00", "end": "21:00", "break": {"start": "16:00", "end": "17:00"}}, {"start": "10:00", "end": "18:00"}, {"start": "09:00", "end": "13:00"}, { closed: true }], [3, 2, 0, 4, 0, 2, 3]),
    id: 't2', slug: 'matteo-bianchi', name: 'Matteo Bianchi', title: 'Coach di forza e preparatore', location: 'Torino', rating: 4.8, reviews: 52, hourlyRate: 60, yearsExperience: 9,
    filterTags: ['strength', 'online'],
    packages: [
      { name: 'Valutazione della forza', subtitle: 'Test e controllo delle alzate', price: 70, unit: '1 incontro', includes: ['Test di forza sui fondamentali', 'Analisi della tecnica', 'Indicazioni sui carichi di partenza'], featured: false },
      { name: 'Coaching forza 3 mesi', subtitle: 'Programma e revisioni settimanali', price: 540, unit: '12 settimane · €45 a settimana', includes: ['Programmazione per 12 settimane', 'Revisione video delle alzate', 'Aggiornamento settimanale dei carichi', 'Supporto in chat'], featured: true },
      { name: 'Programmazione online', subtitle: 'Una scheda da seguire in autonomia', price: 180, unit: '1 mese · rinnovabile', includes: ['Scheda di forza per 4 settimane', 'Diario dei carichi in app', 'Revisione di fine mese'], featured: false },
    ],
    credentials: ['certified', 'topRated'], availableLabel: 'Disponibile oggi', stats: { clientsHelped: 88, goalsHit: '81%', avgProgress: '67%' }, primaryGym: null, languages: ['Italiano', 'Inglese'],
    specialties: ['Forza', 'Powerlifting', 'Ipertrofia', 'Coaching online', 'Periodizzazione'],
    bio: 'Lavoro soprattutto online con atleti amatoriali che vogliono smettere di improvvisare. Programmo sul lungo periodo, controllo i video delle alzate e aggiorno i carichi in base ai dati del diario. Uso un metodo scientifico, ma tengo conto anche del sonno, del lavoro e delle settimane in cui allenarsi è più difficile.',
    profileImage: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=85',
    certifications: [ { title: 'Personal Trainer', org: 'ISSA Europe', expiry: null }, { title: 'Tecnico di powerlifting', org: 'FIPL', expiry: null } ],
    education: [ { title: 'Laurea in Scienze Motorie', org: 'Università degli Studi di Torino', years: '2012 — 2015' }, { title: 'Laurea magistrale in Scienze dello Sport', org: 'Università degli Studi di Torino', years: '2015 — 2017' } ],
    experience: [
      { role: 'Coach di forza indipendente', org: 'Coaching online — Torino', from: '2020', to: 'present', description: 'Seguo atleti amatoriali con programmi a blocchi e revisioni settimanali delle alzate.' },
      { role: 'Personal Trainer di sala', org: 'Palestra indipendente — Torino', from: '2017', to: '2020', description: 'Ho accompagnato principianti e praticanti di powerlifting nella progressione dei fondamentali.' }
    ]
  },
  {
    publicReviews: [
      {"name": "Francesca Galli", "rating": 5, "date": "2026-10-09", "text": "Dopo il parto non sapevo da dove ricominciare. Siamo partite dalla respirazione e ora riesco a fare una seduta senza voler recuperare tutto subito.", "reply": "Continuiamo con gradualità e seguendo le indicazioni dei professionisti sanitari che ti accompagnano."},
      {"name": "Laura Bassi", "rating": 4.9, "date": "2026-09-22", "text": "Nel gruppo ognuna ha tempi diversi. Sara mi ha mostrato varianti che riesco a ripetere anche a casa mentre il bambino dorme."},
      {"name": "Silvia Ricci", "rating": 4.8, "date": "2026-09-03", "text": "Passavo molte ore seduta e mi sentivo rigida. Gli esercizi brevi di mobilità sono diventati una pausa che riesco a fare tutti i giorni."}
    ],
    schedule: demoSchedule([{"start": "08:30", "end": "13:30", "break": {"start": "10:00", "end": "10:30"}}, {"start": "09:00", "end": "13:00"}, {"start": "08:30", "end": "13:30", "break": {"start": "10:00", "end": "10:30"}}, {"start": "09:00", "end": "14:00", "break": {"start": "11:30", "end": "12:00"}}, {"start": "08:30", "end": "12:30"}, { closed: true }, { closed: true }], [2, 0, 0, 3, 2, 1, 0]),
    id: 't3', slug: 'sara-moretti', name: 'Sara Moretti', title: 'Istruttrice pre e post parto', location: 'Bologna', rating: 4.9, reviews: 64, hourlyRate: 45, yearsExperience: 7,
    filterTags: ['pre-post-natal', 'posture'],
    packages: [
      { name: 'Primo incontro', subtitle: 'Respirazione e movimenti di base', price: 40, unit: '1 seduta', includes: ['1 seduta individuale', 'Valutazione della mobilità', 'Esercizi di respirazione da ripetere a casa'], featured: false },
      { name: 'Ritorno al movimento', subtitle: 'Riprendere con incontri individuali', price: 320, unit: '10 sedute · €32 a seduta', includes: ['10 sedute individuali', 'Esercizi di mobilità e forza', 'Scheda per il lavoro a casa', 'Check-in sul percorso'], featured: true },
      { name: 'Mobilità in gruppo', subtitle: 'Incontri di movimento in piccoli gruppi', price: 70, unit: '8 ingressi · 2 mesi', includes: ['8 classi in piccolo gruppo', 'Esercizi di respirazione e mobilità', 'Movimenti adattati al proprio livello'], featured: false },
    ],
    classes: [
      { weekday: 'Lun', day: 19, name: 'Movimento dolce post parto', venue: 'Studio Wellness Lab', time: '10:30 — 11:30', level: 'principianti', capacity: 8, booked: 5 },
      { weekday: 'Mer', day: 21, name: 'Movimento dolce post parto', venue: 'Studio Wellness Lab', time: '10:30 — 11:30', level: 'principianti', capacity: 8, booked: 8 },
    ],
    credentials: ['certified', 'verified', 'topRated'], availableLabel: 'Libera da giovedì', stats: { clientsHelped: 71, goalsHit: '85%', avgProgress: '72%' }, primaryGym: { name: 'Wellness Lab Bologna', verified: true }, languages: ['Italiano', 'Inglese'],
    specialties: ['Pre e post parto', 'Mobilità', 'Pavimento pelvico', 'Rieducazione al movimento'],
    bio: 'Seguo donne in gravidanza e nel ritorno al movimento dopo il parto, rispettando le indicazioni del medico e dei professionisti sanitari. Parto da respirazione, mobilità e gesti quotidiani, poi introduco la forza con gradualità. Al Wellness Lab lavoro in piccoli gruppi e in incontri individuali, senza chiedere a tutte lo stesso ritmo.',
    profileImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=85',
    certifications: [ { title: 'Istruttrice Pre e Post Parto', org: 'FIF', expiry: null }, { title: 'Personal Trainer', org: 'ISSA Europe', expiry: null }, { title: 'BLSD primo soccorso', org: 'Croce Rossa Italiana', expiry: '2028-03-15' } ],
    education: [ { title: 'Laurea in Scienze Motorie', org: 'Università di Bologna', years: '2013 — 2016' }, { title: 'Laurea magistrale in Scienze e Tecniche delle Attività Motorie Preventive e Adattate', org: 'Università di Bologna', years: '2016 — 2018' } ],
    experience: [
      { role: 'Istruttrice pre e post parto', org: 'Wellness Lab Bologna', from: '2022', to: 'present', description: 'Conduco incontri individuali e piccoli gruppi per il ritorno graduale al movimento.' },
      { role: 'Istruttrice di mobilità', org: 'Studio motorio indipendente — Bologna', from: '2019', to: '2022', description: 'Ho seguito adulti sedentari con percorsi di mobilità e forza di base.' }
    ]
  },
  {
    publicReviews: [
      {"name": "Stefano Morelli", "rating": 4.8, "date": "2026-10-07", "text": "Correvo sempre allo stesso ritmo. Con le sedute distinte e il lavoro di forza riesco a gestire meglio le uscite lunghe.", "reply": "Teniamo separate le giornate impegnative e ripetiamo i test prima di aumentare ancora il lavoro."},
      {"name": "Giovanni Rosi", "rating": 4.7, "date": "2026-09-20", "text": "Gioco a calcetto e non avevo mai programmato il lavoro in sala. Adesso gli allenamenti non mi lasciano stanco il giorno della partita."},
      {"name": "Alessia Fabbri", "rating": 4.6, "date": "2026-09-01", "text": "Ho imparato un riscaldamento che riesco a rifare da sola prima della corsa. I test ripetuti mi fanno capire cosa sta cambiando."}
    ],
    schedule: demoSchedule([{"start": "06:30", "end": "15:00", "break": {"start": "10:30", "end": "11:30"}}, {"start": "07:00", "end": "16:00", "break": {"start": "12:00", "end": "13:00"}}, { closed: true }, {"start": "06:30", "end": "15:00", "break": {"start": "10:30", "end": "11:30"}}, {"start": "07:00", "end": "14:00"}, {"start": "08:00", "end": "12:00"}, { closed: true }], [2, 3, 0, 4, 1, 0, 2]),
    id: 't4', slug: 'lorenzo-greco', name: 'Lorenzo Greco', title: 'Preparatore atletico', location: 'Roma', rating: 4.7, reviews: 29, hourlyRate: 45, yearsExperience: 5,
    filterTags: ['running', 'strength'],
    packages: [
      { name: 'Test atletico', subtitle: 'Un punto di partenza per allenarsi', price: 40, unit: '1 valutazione', includes: ['Test di corsa e forza', 'Valutazione della coordinazione', 'Indicazioni per il programma'], featured: false },
      { name: 'Preparazione running', subtitle: 'Corsa e forza nella stessa settimana', price: 350, unit: '10 sedute · €35 a seduta', includes: ['10 sedute individuali', 'Programma settimanale di corsa', 'Esercizi di forza per runner', 'Ripetizione dei test iniziali'], featured: true },
      { name: 'Forza per lo sport', subtitle: 'Lavoro in sala per il proprio sport', price: 240, unit: '8 sedute · €30 a seduta', includes: ['8 sedute di forza', 'Esercizi per coordinazione e stabilità', 'Scheda da ripetere tra gli incontri'], featured: false },
    ],
    credentials: ['certified', 'verified'], availableLabel: 'Disponibile oggi', stats: { clientsHelped: 43, goalsHit: '74%', avgProgress: '58%' }, primaryGym: { name: 'Centro Sportivo Tre Fontane', verified: true }, languages: ['Italiano'],
    specialties: ['Preparazione atletica', 'Running', 'Forza funzionale', 'Sport di squadra'],
    bio: 'Preparo runner amatoriali e chi pratica sport di squadra. Alterno lavoro sul campo e forza in sala, organizzando le sedute attorno alle partite e agli allenamenti della settimana. Al Tre Fontane parto da test semplici e ripetibili: preferisco pochi dati utili a programmi che nessuno riesce a seguire.',
    profileImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=85',
    certifications: [ { title: 'Personal Trainer', org: 'ISSA Europe', expiry: null }, { title: 'BLSD primo soccorso', org: 'Croce Rossa Italiana', expiry: '2028-02-10' } ],
    education: [ { title: 'Laurea in Scienze Motorie', org: 'Università degli Studi di Roma Foro Italico', years: '2015 — 2018' }, { title: 'Laurea magistrale in Scienza e Tecnica dello Sport', org: 'Università degli Studi di Roma Foro Italico', years: '2018 — 2020' } ],
    experience: [
      { role: 'Preparatore atletico', org: 'Centro Sportivo Tre Fontane — Roma', from: '2023', to: 'present', description: 'Organizzo lavoro di forza e corsa per sportivi amatoriali e piccoli gruppi.' },
      { role: 'Preparatore atletico settore giovanile', org: 'Associazione sportiva dilettantistica — Roma', from: '2021', to: '2023', description: 'Ho curato riscaldamento, coordinazione e preparazione fisica nelle squadre giovanili.' }
    ]
  },
  {
    publicReviews: [
      {"name": "Anna Martini", "rating": 4.9, "date": "2026-10-06", "text": "Mi appoggiavo sempre quando facevo gli esercizi di equilibrio. Ora riesco a ripetere quelli concordati a casa senza cercare subito una sedia.", "reply": "Continuiamo con gli stessi appoggi a portata di mano e aumentiamo la difficoltà soltanto quando il movimento è stabile."},
      {"name": "Roberto Guidi", "rating": 4.8, "date": "2026-09-18", "text": "Dopo mesi fermo ho ripreso con carichi piccoli. Chiara mi ha insegnato a distinguere lo sforzo dai segnali da riferire al fisioterapista."},
      {"name": "Monica Ferri", "rating": 4.7, "date": "2026-08-30", "text": "La scheda contiene pochi movimenti che so eseguire. La ripeto tra un incontro e l’altro e non devo più ricordare una lista lunga di esercizi."}
    ],
    schedule: demoSchedule([{"start": "09:00", "end": "18:00", "break": {"start": "13:00", "end": "14:30"}}, {"start": "09:30", "end": "17:30", "break": {"start": "13:00", "end": "14:00"}}, {"start": "09:00", "end": "18:00", "break": {"start": "13:00", "end": "14:30"}}, {"start": "09:30", "end": "17:30", "break": {"start": "13:00", "end": "14:00"}}, {"start": "09:00", "end": "15:00", "break": {"start": "12:00", "end": "12:30"}}, { closed: true }, { closed: true }], [1, 0, 0, 3, 2, 0, 4]),
    id: 't5', slug: 'chiara-rinaldi', name: 'Chiara Rinaldi', title: 'Chinesiologa e personal trainer', location: 'Firenze', rating: 4.8, reviews: 45, hourlyRate: 55, yearsExperience: 8,
    filterTags: ['posture'],
    packages: [
      { name: 'Valutazione del movimento', subtitle: 'Osservare come ti muovi', price: 50, unit: '1 incontro', includes: ['Valutazione di mobilità ed equilibrio', 'Prova dei movimenti di base', 'Indicazioni per gli esercizi a casa'], featured: false },
      { name: 'Forza e postura', subtitle: 'Esercizi individuali da imparare e ripetere', price: 430, unit: '10 sedute · €43 a seduta', includes: ['10 sedute individuali', 'Esercizi progressivi di forza', 'Scheda di mobilità per casa', 'Check-in sui movimenti'], featured: true },
      { name: 'Equilibrio e mobilità Over 60', subtitle: 'Muoversi con esercizi guidati', price: 300, unit: '10 sedute · €30 a seduta', includes: ['10 sedute individuali', 'Esercizi di equilibrio e mobilità', 'Lavoro sui gesti quotidiani', 'Scheda per continuare a casa'], featured: false },
    ],
    credentials: ['certified', 'verified'], availableLabel: 'Libera da lunedì', stats: { clientsHelped: 59, goalsHit: '79%', avgProgress: '64%' }, primaryGym: { name: 'Studio Movimento Firenze', verified: true }, languages: ['Italiano', 'Inglese', 'Francese'],
    specialties: ['Postura', 'Rieducazione al movimento', 'Mal di schiena', 'Over 60'],
    bio: 'Lavoro con adulti che vogliono muoversi con più sicurezza, spesso dopo lunghi periodi di inattività. Costruisco sedute di forza, equilibrio e mobilità con esercizi che si possono ripetere anche a casa. Quando c’è dolore mi coordino con il professionista sanitario di riferimento, senza sostituire il suo lavoro.',
    profileImage: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=85',
    certifications: [ { title: 'Personal Trainer', org: 'FIF', expiry: null }, { title: 'BLSD primo soccorso', org: 'Croce Rossa Italiana', expiry: '2028-04-20' } ],
    education: [ { title: 'Laurea in Scienze Motorie', org: 'Università degli Studi di Firenze', years: '2012 — 2015' }, { title: 'Laurea magistrale in Scienze e Tecniche delle Attività Motorie Preventive e Adattate', org: 'Università degli Studi di Firenze', years: '2015 — 2017' } ],
    experience: [
      { role: 'Chinesiologa e personal trainer', org: 'Studio Movimento Firenze', from: '2021', to: 'present', description: 'Seguo adulti e over 60 con percorsi individuali di forza, equilibrio e mobilità.' },
      { role: 'Istruttrice di attività motoria adattata', org: 'Centro motorio indipendente — Firenze', from: '2018', to: '2021', description: 'Ho condotto piccoli gruppi per persone sedentarie con esercizi progressivi.' }
    ]
  },
  {
    publicReviews: [
      {"name": "Antonio Russo", "rating": 4.7, "date": "2026-10-05", "text": "Entravo in sala e usavo le macchine che trovavo libere. Adesso ho una sequenza di esercizi e segno i carichi, quindi so cosa fare quando arrivo.", "reply": "Il diario ci aiuta a cambiare i carichi senza fretta. Continuiamo a controllare prima la tecnica."},
      {"name": "Valentina Esposito", "rating": 4.6, "date": "2026-09-16", "text": "Al parco temevo di non stare dietro agli altri. Davide mi ha dato tempi di recupero adatti e ho finito la classe senza dovermi fermare a metà."},
      {"name": "Gennaro De Luca", "rating": 4.5, "date": "2026-08-28", "text": "Dopo una pausa lunga ho ripreso due volte a settimana. Le spiegazioni sui movimenti mi hanno tolto il dubbio di sbagliare ogni esercizio."}
    ],
    schedule: demoSchedule([{"start": "14:30", "end": "20:30", "break": {"start": "17:00", "end": "17:30"}}, {"start": "15:00", "end": "21:00", "break": {"start": "17:30", "end": "18:00"}}, {"start": "14:00", "end": "20:00"}, {"start": "15:00", "end": "21:00", "break": {"start": "17:30", "end": "18:00"}}, {"start": "14:30", "end": "20:30"}, {"start": "08:30", "end": "12:30"}, { closed: true }], [4, 2, 0, 3, 5, 0, 2]),
    id: 't6', slug: 'davide-ferrara', name: 'Davide Ferrara', title: 'Personal Trainer', location: 'Napoli', rating: 4.6, reviews: 21, hourlyRate: 38, yearsExperience: 3,
    filterTags: ['weight-loss'],
    packages: [
      { name: 'Prima seduta', subtitle: 'Imparare i primi esercizi', price: 30, unit: '1 seduta', includes: ['1 seduta individuale', 'Prova delle attrezzature', 'Indicazioni sui carichi iniziali'], featured: false },
      { name: 'Riparti in sala pesi', subtitle: 'Un percorso per tornare ad allenarsi', price: 280, unit: '10 sedute · €28 a seduta', includes: ['10 sedute individuali', 'Scheda con i movimenti di base', 'Diario dei carichi in app', 'Revisione della tecnica'], featured: true },
      { name: 'Funzionale outdoor', subtitle: 'Allenamenti di gruppo al parco', price: 90, unit: '10 ingressi · 3 mesi', includes: ['10 classi di gruppo', 'Esercizi a corpo libero', 'Movimenti adattati ai principianti', "Accesso alla lista d'attesa"], featured: false },
    ],
    classes: [
      { weekday: 'Mar', day: 20, name: 'Funzionale per principianti', venue: 'Parco Virgiliano', time: '18:30 — 19:30', level: 'principianti', capacity: 15, booked: 9 },
      { weekday: 'Ven', day: 23, name: 'Funzionale per principianti', venue: 'Parco Virgiliano', time: '18:30 — 19:30', level: 'principianti', capacity: 15, booked: 14 },
    ],
    credentials: ['certified'], availableLabel: 'Disponibile oggi', stats: { clientsHelped: 27, goalsHit: '70%', avgProgress: '55%' }, primaryGym: null, languages: ['Italiano'],
    specialties: ['Dimagrimento', 'Allenamento funzionale', 'Primo approccio alla sala pesi'],
    bio: 'Seguo chi entra in sala pesi per la prima volta o vuole riprendere dopo una pausa. Spiego gli esercizi, scelgo pochi movimenti da imparare bene e tengo un diario dei carichi. Per chi vuole dimagrire cerco prima una routine sostenibile di allenamento, senza promesse sul peso o scadenze impossibili.',
    profileImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=85',
    certifications: [ { title: 'Personal Trainer', org: 'ISSA Europe', expiry: null } ],
    education: [ { title: 'Laurea in Scienze Motorie', org: 'Università degli Studi di Napoli Parthenope', years: '2018 — 2021' }, { title: 'Laurea magistrale in Scienze Motorie per la Prevenzione ed il Benessere', org: 'Università degli Studi di Napoli Parthenope', years: '2021 — 2023' } ],
    experience: [
      { role: 'Personal Trainer indipendente', org: 'Coaching individuale e outdoor — Napoli', from: '2024', to: 'present', description: 'Seguo principianti con sedute individuali e programmi essenziali da ripetere in autonomia.' },
      { role: 'Trainer di sala', org: 'Palestra indipendente — Napoli', from: '2023', to: '2024', description: 'Ho accompagnato i nuovi iscritti nell’utilizzo delle attrezzature e nei primi esercizi con i pesi.' }
    ]
  }
];

function toLegacyTrainer(record: DemoTrainer): Trainer {
  return {
    ...record,
    certifications: record.certifications.map(item => `${item.title} — ${item.org}`),
    education: record.education.map(item => `${item.title}, ${item.org} (${item.years})`).join('; '),
    experience: record.experience.map(item => ({ title: item.role, company: item.org, period: `${item.from} — ${item.to}`, description: item.description })),
    availability: { monday: ['09:00 - 12:00', '14:00 - 18:00'], tuesday: ['09:00 - 12:00'], wednesday: ['14:00 - 18:00'], thursday: ['09:00 - 12:00'], friday: ['09:00 - 12:00'], saturday: [], sunday: [] },
    status: 'online', nextAvailability: record.availableLabel
  };
}

export const trainerData: Trainer = toLegacyTrainer(demoTrainers[0]);

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Wilson",
    image: "/placeholder.svg",
    text: "Sarah completely transformed my approach to fitness. In just 3 months, I've lost 15 pounds and feel stronger than ever.",
    rating: 5
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    image: "/placeholder.svg",
    text: "Working with Sarah has been life-changing. She knows exactly how to push me while making workouts enjoyable.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chang",
    image: "/placeholder.svg",
    text: "Sarah's nutrition advice alongside the training program helped me finally break through my weight loss plateau.",
    rating: 4
  }
];

export const aiConversation: Message[] = [
  {
    sender: "client",
    message: "Hi, I need to reschedule my private session this week. Can I move it to Tuesday?",
    time: "10:23 AM"
  },
  {
    sender: "ai",
    message: "Hello! I see you currently have a session scheduled for Thursday at 3:00 PM. Let me check Sarah's availability for Tuesday. She has open slots at 10:00 AM and 4:00 PM on Tuesday. Would either of those work for you?",
    time: "10:24 AM"
  },
  {
    sender: "client",
    message: "4:00 PM on Tuesday works for me. Can you book that?",
    time: "10:26 AM"
  },
  {
    sender: "ai",
    message: "Perfect! I've rescheduled your session to Tuesday at 4:00 PM with Sarah. You'll receive a confirmation email shortly. Sarah has been notified of this change. Is there anything else you need help with?",
    time: "10:27 AM"
  }
];

export function getTrainerById(id: string): Trainer | undefined {
  const record = demoTrainers.find(trainer => trainer.id === id || trainer.id === `t${id}` || trainer.slug === id);
  return record ? toLegacyTrainer(record) : undefined;
}
