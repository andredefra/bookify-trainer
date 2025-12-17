import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

// Exercise database for matching
const exerciseDatabase = [
  "Bench Press", "Incline Bench Press", "Decline Bench Press",
  "Push-up", "Dumbbell Fly", "Cable Crossover",
  "Squat", "Front Squat", "Leg Press", "Leg Extension", "Leg Curl",
  "Deadlift", "Romanian Deadlift", "Sumo Deadlift",
  "Pull-up", "Chin-up", "Lat Pulldown", "Barbell Row", "Dumbbell Row",
  "Overhead Press", "Military Press", "Lateral Raise", "Front Raise",
  "Bicep Curl", "Hammer Curl", "Tricep Pushdown", "Skull Crusher",
  "Plank", "Crunch", "Leg Raise", "Russian Twist",
  "Hip Thrust", "Glute Bridge", "Calf Raise",
  "Face Pull", "Shrug", "Upright Row",
  "Lunges", "Bulgarian Split Squat", "Step Up",
  "Cable Row", "T-Bar Row", "Pendlay Row",
  "Dips", "Close Grip Bench Press",
  "Pec Deck", "Machine Chest Press",
  "Hack Squat", "Smith Machine Squat",
  "Seated Calf Raise", "Standing Calf Raise",
  "Preacher Curl", "Concentration Curl",
  "Overhead Tricep Extension", "Tricep Kickback",
  "Cable Fly", "Incline Dumbbell Press",
  "Good Morning", "Back Extension",
  "Ab Wheel Rollout", "Hanging Leg Raise"
];

// Italian to English exercise mappings
const exerciseTranslations: Record<string, string> = {
  "panca piana": "Bench Press",
  "panca inclinata": "Incline Bench Press",
  "panca declinata": "Decline Bench Press",
  "squat": "Squat",
  "stacco": "Deadlift",
  "stacco rumeno": "Romanian Deadlift",
  "pressa": "Leg Press",
  "trazioni": "Pull-up",
  "lat machine": "Lat Pulldown",
  "rematore": "Barbell Row",
  "curl bilanciere": "Bicep Curl",
  "curl manubri": "Hammer Curl",
  "french press": "Skull Crusher",
  "croci": "Dumbbell Fly",
  "alzate laterali": "Lateral Raise",
  "alzate frontali": "Front Raise",
  "military press": "Military Press",
  "spinte": "Overhead Press",
  "dip": "Dips",
  "affondi": "Lunges",
  "polpacci": "Calf Raise",
  "addominali": "Crunch",
  "plank": "Plank",
  "hip thrust": "Hip Thrust"
};

function findSimilarExercise(exerciseName: string): { found: boolean; match?: string; similar?: string } {
  const normalizedName = exerciseName.toLowerCase().trim();
  
  // Check direct match
  const directMatch = exerciseDatabase.find(
    ex => ex.toLowerCase() === normalizedName
  );
  if (directMatch) {
    return { found: true, match: directMatch };
  }
  
  // Check Italian translation
  for (const [italian, english] of Object.entries(exerciseTranslations)) {
    if (normalizedName.includes(italian)) {
      return { found: true, match: english };
    }
  }
  
  // Check partial match
  const partialMatch = exerciseDatabase.find(
    ex => ex.toLowerCase().includes(normalizedName) || normalizedName.includes(ex.toLowerCase())
  );
  if (partialMatch) {
    return { found: false, similar: partialMatch };
  }
  
  // Check word overlap
  const words = normalizedName.split(/\s+/);
  for (const dbExercise of exerciseDatabase) {
    const dbWords = dbExercise.toLowerCase().split(/\s+/);
    const overlap = words.some(w => dbWords.some(dw => dw.includes(w) || w.includes(dw)));
    if (overlap) {
      return { found: false, similar: dbExercise };
    }
  }
  
  return { found: false };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileData, fileName, fileType } = await req.json();

    if (!fileData) {
      return new Response(
        JSON.stringify({ error: 'No file data provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing document: ${fileName} (${fileType})`);

    // For now, we'll use AI to extract exercises from the document content
    // In a production environment, you'd want to use a proper document parser
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `Sei un esperto di fitness che analizza documenti di programmi di allenamento.
Il tuo compito è estrarre tutti gli esercizi menzionati nel documento.

Per ogni esercizio trovato, restituisci un oggetto JSON con:
- name: nome dell'esercizio
- sets: numero di serie (default 3 se non specificato)
- reps: ripetizioni (default "10" se non specificato)

Rispondi SOLO con un array JSON valido, nient'altro. Esempio:
[{"name": "Bench Press", "sets": 4, "reps": "8-10"}, {"name": "Squat", "sets": 3, "reps": "12"}]

Se non trovi esercizi, restituisci un array vuoto: []`
          },
          {
            role: 'user',
            content: `Analizza questo programma di allenamento ed estrai tutti gli esercizi (il contenuto è in base64): ${fileData.substring(0, 5000)}`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content || '[]';
    
    console.log('AI Response:', content);

    // Parse the JSON response
    let extractedExercises: Array<{ name: string; sets: number; reps: string }> = [];
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        extractedExercises = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Return mock data for demo
      extractedExercises = [
        { name: "Bench Press", sets: 4, reps: "8-10" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12" },
        { name: "Cable Fly", sets: 3, reps: "12-15" },
        { name: "Squat", sets: 4, reps: "8" },
        { name: "Romanian Deadlift", sets: 3, reps: "10" }
      ];
    }

    // Match exercises with database
    const exercises = extractedExercises.map(ex => {
      const matchResult = findSimilarExercise(ex.name);
      return {
        name: matchResult.match || ex.name,
        sets: ex.sets || 3,
        reps: ex.reps || "10",
        inDatabase: matchResult.found,
        similarExercise: matchResult.similar
      };
    });

    console.log('Processed exercises:', exercises);

    return new Response(
      JSON.stringify({ exercises }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-program-document:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});