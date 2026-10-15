
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
  availableLabel: string;
  stats: { clientsHelped: number; goalsHit: string; avgProgress: string };
  packages?: { name: string }[];
  classes?: { name: string }[];
}

export const demoTrainers: DemoTrainer[] = [
  {
    id: 't1', slug: 'giulia-ferrero', name: 'Giulia Ferrero', title: 'Personal Trainer certificata', location: 'Milano', rating: 4.9, reviews: 38, hourlyRate: 50, yearsExperience: 6,
    packages: [{ name: 'Prova' }, { name: 'Percorso 3 mesi' }, { name: 'Bootcamp 10 ingressi' }],
    classes: [{ name: 'Bootcamp al Parco Sempione' }],
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
    id: 't2', slug: 'matteo-bianchi', name: 'Matteo Bianchi', title: 'Coach di forza e preparatore', location: 'Torino', rating: 4.8, reviews: 52, hourlyRate: 60, yearsExperience: 9,
    packages: [{ name: 'Valutazione della forza' }, { name: 'Coaching forza 3 mesi' }, { name: 'Tecnica dei fondamentali' }],
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
    id: 't3', slug: 'sara-moretti', name: 'Sara Moretti', title: 'Istruttrice pre e post parto', location: 'Bologna', rating: 4.9, reviews: 64, hourlyRate: 45, yearsExperience: 7,
    packages: [{ name: 'Primo incontro' }, { name: 'Ritorno al movimento' }, { name: 'Mobilità in gruppo' }],
    classes: [{ name: 'Movimento dolce post parto' }],
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
    id: 't4', slug: 'lorenzo-greco', name: 'Lorenzo Greco', title: 'Preparatore atletico', location: 'Roma', rating: 4.7, reviews: 29, hourlyRate: 45, yearsExperience: 5,
    packages: [{ name: 'Test atletico' }, { name: 'Preparazione running' }, { name: 'Forza per lo sport' }],
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
    id: 't5', slug: 'chiara-rinaldi', name: 'Chiara Rinaldi', title: 'Chinesiologa e personal trainer', location: 'Firenze', rating: 4.8, reviews: 45, hourlyRate: 55, yearsExperience: 8,
    packages: [{ name: 'Valutazione del movimento' }, { name: 'Forza e postura' }, { name: 'Equilibrio e mobilità' }],
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
    id: 't6', slug: 'davide-ferrara', name: 'Davide Ferrara', title: 'Personal Trainer', location: 'Napoli', rating: 4.6, reviews: 21, hourlyRate: 38, yearsExperience: 3,
    packages: [{ name: 'Prima seduta' }, { name: 'Riparti in sala pesi' }, { name: 'Funzionale outdoor' }],
    classes: [{ name: 'Funzionale per principianti' }],
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
