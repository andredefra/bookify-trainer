export const SESSION_TYPES = [
  { value: "hiit", label: "HIIT (High-Intensity Interval Training)", category: "cardio" },
  { value: "yoga", label: "Yoga", category: "flexibility" },
  { value: "pilates", label: "Pilates", category: "flexibility" },
  { value: "strength", label: "Strength Training", category: "strength" },
  { value: "cardio", label: "Cardio", category: "cardio" },
  { value: "zumba", label: "Zumba", category: "dance" },
  { value: "crossfit", label: "CrossFit", category: "strength" },
  { value: "spinning", label: "Spinning", category: "cardio" },
  { value: "bootcamp", label: "Bootcamp", category: "strength" },
  { value: "aqua_fitness", label: "Aqua Fitness", category: "cardio" },
  { value: "dance", label: "Dance", category: "dance" },
  { value: "martial_arts", label: "Martial Arts", category: "specialty" },
  { value: "meditation", label: "Meditation & Mindfulness", category: "wellness" },
  { value: "stretching", label: "Stretching & Flexibility", category: "flexibility" },
  { value: "functional", label: "Functional Training", category: "strength" },
  { value: "barre", label: "Barre", category: "flexibility" },
  { value: "cycling", label: "Indoor Cycling", category: "cardio" },
  { value: "boxing", label: "Boxing", category: "specialty" },
  { value: "group_class", label: "Group Class (Generic)", category: "general" }
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