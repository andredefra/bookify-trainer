import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { workoutLog, fitnessData, userProfile } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Prepare context for AI analysis
    const analysisPrompt = `
Analizza questo workout e fornisci insights personalizzati:

WORKOUT DATA:
- Nome: ${workoutLog.name}
- Data: ${workoutLog.date}
- Durata: ${workoutLog.duration || 'Non specificata'}
- Esercizi: ${workoutLog.exercises.map(ex => `${ex.name} (${ex.setsData?.length || 0} sets)`).join(', ')}
- Note: ${workoutLog.notes || 'Nessuna nota'}

DETTAGLI ESERCIZI:
${workoutLog.exercises.map(ex => `
- ${ex.name}:
  ${ex.setsData?.map(set => `Set ${set.setNumber}: ${set.actualReps || set.targetReps} reps${set.weight ? ` x ${set.weight}kg` : ''}`).join('\n  ') || 'Nessun dettaglio sets'}
  ${ex.notes ? `Note: ${ex.notes}` : ''}
`).join('\n')}

FITNESS DATA (se disponibile):
${fitnessData ? `
- Passi: ${fitnessData.steps || 'N/A'}
- Calorie registrate: ${fitnessData.calories || 'N/A'}
- Frequenza cardiaca media: ${fitnessData.heartRate || 'N/A'}
- Tempo attivo: ${fitnessData.activeTime || 'N/A'}
` : 'Dati fitness non disponibili'}

USER PROFILE:
- Peso: ${userProfile?.weight || 'Non specificato'}kg
- Altezza: ${userProfile?.height || 'Non specificata'}cm
- Età: ${userProfile?.age || 'Non specificata'}
- Livello fitness: ${userProfile?.fitnessLevel || 'Non specificato'}
- Obiettivi: ${userProfile?.goals || 'Non specificati'}

Fornisci un'analisi completa in JSON con questa struttura:
{
  "caloriesBurned": number, // Stima calorie bruciate basata su esercizi e dati utente
  "workoutIntensity": "low" | "moderate" | "high",
  "muscleGroupsWorked": string[], // Gruppi muscolari allenati
  "volumeAnalysis": {
    "totalVolume": number, // Volume totale (peso x reps x sets)
    "comparison": string // Confronto con workout precedenti se possibile
  },
  "insights": {
    "strengths": string[], // Punti di forza del workout
    "improvements": string[], // Aree di miglioramento
    "progressNotes": string // Note sui progressi
  },
  "recommendations": {
    "nextWorkout": string, // Suggerimenti per il prossimo workout
    "recovery": string, // Consigli per il recupero
    "nutrition": string // Suggerimenti nutrizionali
  },
  "fitnessIntegration": {
    "heartRateZone": string, // Zona frequenza cardiaca stimata
    "activityType": string, // Tipo di attività per fitness tracker
    "estimatedMET": number // Equivalente metabolico
  }
}

Rispondi SOLO con il JSON, senza testo aggiuntivo.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'Sei un esperto personal trainer e nutrizionista che analizza workout per fornire insights basati su scienza e esperienza. Calcola sempre stime accurate delle calorie bruciate considerando il tipo di esercizio, intensità, durata e caratteristiche dell\'utente.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log('AI Analysis Response:', analysisText);

    try {
      const analysis = JSON.parse(analysisText);
      
      return new Response(JSON.stringify({
        success: true,
        analysis,
        workoutId: workoutLog.id
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      
      // Fallback analysis if JSON parsing fails
      const fallbackAnalysis = {
        caloriesBurned: estimateCalories(workoutLog, userProfile),
        workoutIntensity: "moderate",
        muscleGroupsWorked: extractMuscleGroups(workoutLog.exercises),
        volumeAnalysis: {
          totalVolume: calculateTotalVolume(workoutLog.exercises),
          comparison: "Analisi volume disponibile dopo più workout"
        },
        insights: {
          strengths: ["Workout completato con successo"],
          improvements: ["Continua con costanza"],
          progressNotes: "Mantieni la regolarità per vedere progressi"
        },
        recommendations: {
          nextWorkout: "Continua con il tuo programma attuale",
          recovery: "Riposo adeguato tra le sessioni",
          nutrition: "Mantieni un'alimentazione bilanciata"
        },
        fitnessIntegration: {
          heartRateZone: "Zona 2-3",
          activityType: "Strength Training",
          estimatedMET: 6.0
        }
      };

      return new Response(JSON.stringify({
        success: true,
        analysis: fallbackAnalysis,
        workoutId: workoutLog.id,
        note: "Analisi di fallback utilizzata"
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in analyze-workout function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Helper functions
function estimateCalories(workoutLog: any, userProfile: any): number {
  const duration = parseInt(workoutLog.duration) || 45;
  const weight = userProfile?.weight || 70;
  const exerciseCount = workoutLog.exercises.length;
  
  // Basic calorie estimation: 3-6 calories per minute based on intensity
  const baseRate = exerciseCount > 5 ? 6 : exerciseCount > 3 ? 4.5 : 3;
  return Math.round(baseRate * duration * (weight / 70));
}

function extractMuscleGroups(exercises: any[]): string[] {
  const muscleGroups = new Set<string>();
  
  exercises.forEach(exercise => {
    const name = exercise.name.toLowerCase();
    if (name.includes('push') || name.includes('chest') || name.includes('bench')) {
      muscleGroups.add('Petto');
    }
    if (name.includes('pull') || name.includes('row') || name.includes('lat')) {
      muscleGroups.add('Schiena');
    }
    if (name.includes('squat') || name.includes('leg')) {
      muscleGroups.add('Gambe');
    }
    if (name.includes('shoulder') || name.includes('press')) {
      muscleGroups.add('Spalle');
    }
    if (name.includes('bicep') || name.includes('curl')) {
      muscleGroups.add('Bicipiti');
    }
    if (name.includes('tricep') || name.includes('dip')) {
      muscleGroups.add('Tricipiti');
    }
    if (name.includes('core') || name.includes('abs') || name.includes('plank')) {
      muscleGroups.add('Core');
    }
  });
  
  return Array.from(muscleGroups);
}

function calculateTotalVolume(exercises: any[]): number {
  return exercises.reduce((total, exercise) => {
    if (exercise.setsData) {
      return total + exercise.setsData.reduce((exerciseTotal: number, set: any) => {
        const reps = set.actualReps || parseInt(set.targetReps) || 0;
        const weight = set.weight || 0;
        return exerciseTotal + (reps * weight);
      }, 0);
    }
    return total;
  }, 0);
}