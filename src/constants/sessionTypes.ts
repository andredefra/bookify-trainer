export const SESSION_TYPES = [
  { value: "hiit", label: "HIIT (Allenamento Intervallato ad Alta Intensità)", category: "cardio" },
  { value: "yoga", label: "Yoga", category: "flexibility" },
  { value: "pilates", label: "Pilates", category: "flexibility" },
  { value: "strength", label: "Allenamento di Forza", category: "strength" },
  { value: "cardio", label: "Cardio", category: "cardio" },
  { value: "zumba", label: "Zumba", category: "dance" },
  { value: "crossfit", label: "CrossFit", category: "strength" },
  { value: "spinning", label: "Spinning", category: "cardio" },
  { value: "bootcamp", label: "Bootcamp", category: "strength" },
  { value: "aqua_fitness", label: "Acqua Fitness", category: "cardio" },
  { value: "dance", label: "Danza", category: "dance" },
  { value: "martial_arts", label: "Arti Marziali", category: "specialty" },
  { value: "meditation", label: "Meditazione e Mindfulness", category: "wellness" },
  { value: "stretching", label: "Stretching e Flessibilità", category: "flexibility" },
  { value: "functional", label: "Allenamento Funzionale", category: "strength" },
  { value: "barre", label: "Barre", category: "flexibility" },
  { value: "cycling", label: "Ciclismo Indoor", category: "cardio" },
  { value: "boxing", label: "Boxe", category: "specialty" },
  { value: "calisthenics", label: "Calisthenics", category: "strength" },
  { value: "circuit", label: "Circuit Training", category: "strength" },
  { value: "toning", label: "Tonificazione", category: "strength" },
  { value: "tabata", label: "Tabata", category: "cardio" },
  { value: "water_aerobics", label: "Aerobica in Acqua", category: "cardio" },
  { value: "stretching_relax", label: "Stretching e Relax", category: "wellness" },
  { value: "group_class", label: "Classe di Gruppo (Generica)", category: "general" }
] as const;

export const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Principiante" },
  { value: "intermediate", label: "Intermedio" },
  { value: "advanced", label: "Avanzato" },
  { value: "all_levels", label: "Tutti i Livelli" }
] as const;

export const RECURRENCE_PATTERNS = [
  { value: "daily", label: "Giornaliero" },
  { value: "weekly", label: "Settimanale" },
  { value: "biweekly", label: "Bi-settimanale" },
  { value: "monthly", label: "Mensile" }
] as const;

export function formatSessionType(sessionType: string): string {
  const type = SESSION_TYPES.find(t => t.value === sessionType);
  return type ? type.label : sessionType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function getSessionTypesByCategory() {
  const categories = SESSION_TYPES.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  }, {} as Record<string, typeof SESSION_TYPES[number][]>);
  
  return categories;
}