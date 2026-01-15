import { memo } from 'react';
import { cn } from '@/lib/utils';

interface ExercisePlaceholderAnimatedProps {
  category: string;
  exerciseName: string;
  className?: string;
}

const categoryColors: Record<string, { primary: string; secondary: string; accent: string }> = {
  chest: { primary: '#ef4444', secondary: '#f97316', accent: '#fbbf24' },
  back: { primary: '#3b82f6', secondary: '#06b6d4', accent: '#22d3d8' },
  legs: { primary: '#22c55e', secondary: '#10b981', accent: '#34d399' },
  shoulders: { primary: '#f97316', secondary: '#fbbf24', accent: '#fcd34d' },
  arms: { primary: '#a855f7', secondary: '#ec4899', accent: '#f472b6' },
  core: { primary: '#6366f1', secondary: '#8b5cf6', accent: '#a78bfa' },
  cardio: { primary: '#ec4899', secondary: '#f43f5e', accent: '#fb7185' },
  functional: { primary: '#14b8a6', secondary: '#06b6d4', accent: '#22d3d8' },
  flexibility: { primary: '#06b6d4', secondary: '#0ea5e9', accent: '#38bdf8' },
  plyometric: { primary: '#f59e0b', secondary: '#fbbf24', accent: '#fcd34d' },
};

const categoryIcons: Record<string, string> = {
  chest: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v-2h-2v2zm0-4h2V7h-2v5z',
  back: 'M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 17c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',
  legs: 'M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7',
  shoulders: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z',
  arms: 'M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 5.28c-1.23-.37-2.22-1.17-2.8-2.18l-1-1.6c-.41-.65-1.11-1-1.84-1-.78 0-1.59.5-1.78 1.44S7 23 7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1 1.15 2.41 2.01 4 2.34V9.78z',
  core: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
  cardio: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  functional: 'M13 3v18h-2V3h2zm0 0v18h-2V3h2zM3 13h8v2H3v-2zm10 0h8v2h-8v-2z',
  flexibility: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  plyometric: 'M11 6.5l-1 4.5H7.5l3 6.5 1-4.5H14l-3-6.5z',
};

export const ExercisePlaceholderAnimated = memo(({ 
  category, 
  exerciseName,
  className 
}: ExercisePlaceholderAnimatedProps) => {
  const colors = categoryColors[category] || categoryColors.functional;
  
  // Create a unique animation delay based on exercise name hash
  const hash = exerciseName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const animDelay = (hash % 5) * 0.2;
  
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Animated gradient background */}
      <svg 
        viewBox="0 0 200 150" 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Animated gradient */}
          <linearGradient id={`grad-${hash}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary}>
              <animate 
                attributeName="stop-color" 
                values={`${colors.primary};${colors.secondary};${colors.accent};${colors.primary}`}
                dur="4s" 
                repeatCount="indefinite"
                begin={`${animDelay}s`}
              />
            </stop>
            <stop offset="50%" stopColor={colors.secondary}>
              <animate 
                attributeName="stop-color" 
                values={`${colors.secondary};${colors.accent};${colors.primary};${colors.secondary}`}
                dur="4s" 
                repeatCount="indefinite"
                begin={`${animDelay}s`}
              />
            </stop>
            <stop offset="100%" stopColor={colors.accent}>
              <animate 
                attributeName="stop-color" 
                values={`${colors.accent};${colors.primary};${colors.secondary};${colors.accent}`}
                dur="4s" 
                repeatCount="indefinite"
                begin={`${animDelay}s`}
              />
            </stop>
          </linearGradient>
          
          {/* Pulsing circle for animation effect */}
          <radialGradient id={`pulse-${hash}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3">
              <animate 
                attributeName="stop-opacity" 
                values="0.3;0.1;0.3" 
                dur="2s" 
                repeatCount="indefinite"
                begin={`${animDelay + 0.5}s`}
              />
            </stop>
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Background */}
        <rect width="200" height="150" fill={`url(#grad-${hash})`} />
        
        {/* Animated pulse overlay */}
        <ellipse cx="100" cy="75" rx="80" ry="60" fill={`url(#pulse-${hash})`}>
          <animate 
            attributeName="rx" 
            values="70;90;70" 
            dur="3s" 
            repeatCount="indefinite"
            begin={`${animDelay}s`}
          />
          <animate 
            attributeName="ry" 
            values="55;70;55" 
            dur="3s" 
            repeatCount="indefinite"
            begin={`${animDelay}s`}
          />
        </ellipse>
        
        {/* Stylized figure silhouette */}
        <g transform="translate(70, 35)" opacity="0.4">
          {/* Animated figure - simplified workout pose */}
          <circle cx="30" cy="10" r="10" fill="white">
            <animate 
              attributeName="cy" 
              values="10;8;10" 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${animDelay}s`}
            />
          </circle>
          <line x1="30" y1="20" x2="30" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round">
            <animate 
              attributeName="y2" 
              values="50;48;50" 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${animDelay}s`}
            />
          </line>
          {/* Arms */}
          <line x1="30" y1="28" x2="10" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round">
            <animate 
              attributeName="x2" 
              values="10;5;10" 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${animDelay + 0.1}s`}
            />
            <animate 
              attributeName="y2" 
              values="40;35;40" 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${animDelay + 0.1}s`}
            />
          </line>
          <line x1="30" y1="28" x2="50" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round">
            <animate 
              attributeName="x2" 
              values="50;55;50" 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${animDelay + 0.1}s`}
            />
            <animate 
              attributeName="y2" 
              values="40;35;40" 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${animDelay + 0.1}s`}
            />
          </line>
          {/* Legs */}
          <line x1="30" y1="50" x2="15" y2="75" stroke="white" strokeWidth="3" strokeLinecap="round">
            <animate 
              attributeName="y1" 
              values="50;48;50" 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${animDelay}s`}
            />
          </line>
          <line x1="30" y1="50" x2="45" y2="75" stroke="white" strokeWidth="3" strokeLinecap="round">
            <animate 
              attributeName="y1" 
              values="50;48;50" 
              dur="1.5s" 
              repeatCount="indefinite"
              begin={`${animDelay}s`}
            />
          </line>
        </g>
        
        {/* Decorative moving particles */}
        <circle cx="30" cy="30" r="3" fill="white" opacity="0.4">
          <animate attributeName="cy" values="30;120;30" dur="6s" repeatCount="indefinite" begin={`${animDelay}s`} />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="6s" repeatCount="indefinite" begin={`${animDelay}s`} />
        </circle>
        <circle cx="170" cy="100" r="2" fill="white" opacity="0.3">
          <animate attributeName="cy" values="100;20;100" dur="5s" repeatCount="indefinite" begin={`${animDelay + 1}s`} />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="5s" repeatCount="indefinite" begin={`${animDelay + 1}s`} />
        </circle>
        <circle cx="50" cy="120" r="2" fill="white" opacity="0.3">
          <animate attributeName="cy" values="120;40;120" dur="7s" repeatCount="indefinite" begin={`${animDelay + 0.5}s`} />
        </circle>
      </svg>
    </div>
  );
});

ExercisePlaceholderAnimated.displayName = 'ExercisePlaceholderAnimated';
