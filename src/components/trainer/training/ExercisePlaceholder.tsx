import { Dumbbell } from 'lucide-react';

interface ExercisePlaceholderProps {
  category?: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  chest: 'from-red-500/20 to-red-600/10',
  back: 'from-blue-500/20 to-blue-600/10',
  legs: 'from-green-500/20 to-green-600/10',
  shoulders: 'from-orange-500/20 to-orange-600/10',
  arms: 'from-purple-500/20 to-purple-600/10',
  core: 'from-indigo-500/20 to-indigo-600/10',
  cardio: 'from-pink-500/20 to-pink-600/10',
  functional: 'from-teal-500/20 to-teal-600/10',
  flexibility: 'from-cyan-500/20 to-cyan-600/10',
  plyometric: 'from-amber-500/20 to-amber-600/10',
};

const categoryIcons: Record<string, string> = {
  chest: '🏋️',
  back: '💪',
  legs: '🦵',
  shoulders: '🤸',
  arms: '💪',
  core: '🎯',
  cardio: '🏃',
  functional: '⚡',
  flexibility: '🧘',
  plyometric: '🔥',
};

export function ExercisePlaceholder({ category = 'functional', className = '' }: ExercisePlaceholderProps) {
  const gradientClass = categoryColors[category] || categoryColors.functional;
  const emoji = categoryIcons[category] || '🏋️';
  
  return (
    <div 
      className={`
        w-full h-full flex items-center justify-center 
        bg-gradient-to-br ${gradientClass}
        rounded-lg border border-border/50
        ${className}
      `}
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <div className="text-4xl animate-pulse">{emoji}</div>
        <Dumbbell className="h-6 w-6 opacity-50" />
        <span className="text-xs opacity-60">No demo available</span>
      </div>
    </div>
  );
}
