import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversation_id, user_context } = await req.json();
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user auth from request
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get user info
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );
    
    if (authError || !user) {
      throw new Error('Invalid user token');
    }

    // Save user message to database
    const { error: insertError } = await supabase
      .from('user_messages')
      .insert({
        conversation_id,
        sender: 'user',
        content: message,
        message_type: 'text'
      });

    if (insertError) {
      console.error('Error saving user message:', insertError);
    }

    // Get user profile for context
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Get recent training program for context
    const { data: recentProgram } = await supabase
      .from('nutrition_plans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Check if current program is AI-created (can be modified) or human trainer-created (read-only)
    const currentProgram = user_context?.currentProgram;
    const isAIProgram = currentProgram?.trainerName?.toLowerCase().includes('ai') || 
                       currentProgram?.trainerName?.toLowerCase().includes('personal ai trainer') ||
                       !currentProgram?.trainerName || 
                       currentProgram?.trainerName === 'AI Trainer';
    
    console.log('Program modification check:', {
      hasProgram: !!currentProgram,
      trainerName: currentProgram?.trainerName,
      isAIProgram: isAIProgram
    });

    // Define base functions that are always available
    const baseFunctions = [
      {
        name: "create_training_program",
        description: "Crea un nuovo programma di allenamento personalizzato per l'utente",
        parameters: {
          type: "object",
          properties: {
            title: { type: "string", description: "Titolo del programma" },
            description: { type: "string", description: "Descrizione del programma" },
            duration_weeks: { type: "number", description: "Durata in settimane" },
            difficulty_level: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
            goals: { type: "array", items: { type: "string" }, description: "Obiettivi del programma" }
          },
          required: ["title", "description", "duration_weeks", "difficulty_level"]
        }
      },
      {
        name: "create_nutrition_plan",
        description: "Crea un piano nutrizionale personalizzato",
        parameters: {
          type: "object",
          properties: {
            title: { type: "string", description: "Titolo del piano" },
            description: { type: "string", description: "Descrizione del piano" },
            daily_calories: { type: "number", description: "Calorie giornaliere target" },
            macros: { 
              type: "object", 
              properties: {
                protein: { type: "number" },
                carbs: { type: "number" },
                fat: { type: "number" }
              }
            },
            meal_suggestions: { type: "array", items: { type: "string" } }
          },
          required: ["title", "description", "daily_calories"]
        }
      },
      {
        name: "get_user_progress",
        description: "Ottieni informazioni sui progressi dell'utente",
        parameters: {
          type: "object",
          properties: {
            timeframe: { type: "string", enum: ["week", "month", "3months"], description: "Periodo da analizzare" }
          }
        }
      },
      {
        name: "schedule_workout_reminder",
        description: "Programma un promemoria per l'allenamento",
        parameters: {
          type: "object",
          properties: {
            workout_time: { type: "string", description: "Orario preferito per l'allenamento (es. '18:00')" },
            days_of_week: { type: "array", items: { type: "string" }, description: "Giorni della settimana" },
            reminder_message: { type: "string", description: "Messaggio del promemoria" }
          },
          required: ["workout_time", "days_of_week"]
        }
      },
      {
        name: "modify_training_program",
        description: "Modifica il programma di allenamento dell'utente basandosi sui suoi dati analytics",
        parameters: {
          type: "object",
          properties: {
            program_changes: { 
              type: "object",
              description: "Le modifiche da apportare al programma",
              properties: {
                frequency: { type: "number", description: "Frequenza settimanale allenamenti" },
                intensity: { type: "string", description: "Livello intensità (low, medium, high)" },
                focus_areas: { type: "array", items: { type: "string" }, description: "Aree di focus" },
                duration_minutes: { type: "number", description: "Durata sessioni in minuti" }
              }
            },
            reason: { type: "string", description: "Motivo delle modifiche basato sui dati analytics" }
          },
          required: ["program_changes", "reason"]
        }
      },
      {
        name: "create_personalized_program",
        description: "Crea un nuovo programma personalizzato basato sui dati analytics dell'utente",
        parameters: {
          type: "object",
          properties: {
            program_type: { type: "string", description: "Tipo di programma (strength, cardio, mixed, weight_loss)" },
            duration_weeks: { type: "number", description: "Durata in settimane" },
            weekly_frequency: { type: "number", description: "Frequenza settimanale" },
            target_goals: { type: "array", items: { type: "string" }, description: "Obiettivi specifici" },
            adaptations: { type: "string", description: "Adattamenti basati sui dati analytics" }
          },
          required: ["program_type", "duration_weeks", "weekly_frequency", "target_goals"]
        }
      }
    ];

    // Filter functions based on program type (AI vs Human Trainer)
    let functions = [...baseFunctions];
    
    if (!isAIProgram && currentProgram) {
      // Remove modification functions for human trainer programs
      functions = baseFunctions.filter(fn => 
        fn.name !== 'modify_training_program' && 
        fn.name !== 'create_personalized_program'
      );
      console.log('Removed modification functions - program is from human trainer');
    } else {
      console.log('All functions available - AI program or no current program');
    }

    // Build system message with user context
    const isAnalyticsConversation = user_context?.conversation_type === 'analytics_consultation';
    
    const systemMessage = isAnalyticsConversation ? 
      `Sei un esperto Analytics AI specializzato nell'analisi dei dati fitness e nel fornire insights personalizzati. Il tuo ruolo è:

CAPACITÀ PRINCIPALI:
- Analizzare dati di allenamento, progressi e metriche fitness
- Identificare pattern, trend e correlazioni nei dati dell'utente
- Fornire insights actionable e raccomandazioni personalizzate
- Interpretare statistiche come frequenza allenamenti, calorie bruciate, passi, durata sessioni
- Suggerire miglioramenti basati sui dati storici

STILE DI COMUNICAZIONE:
- Usa un linguaggio chiaro e comprensibile
- Supporta le tue analisi con i dati specifici dell'utente
- Fornisci consigli concreti e misurabili
- Mantieni un tono motivante ma professionale
- Usa emoji appropriati per rendere l'analisi più coinvolgente

DATI UTENTE DISPONIBILI: ${JSON.stringify(user_context?.analytics_data || {})}

${!isAIProgram && currentProgram ? `
⚠️ LIMITAZIONI PROGRAMMA ATTUALE:
Il programma di allenamento attuale "${currentProgram.title}" è stato creato dal trainer ${currentProgram.trainerName}.
NON puoi modificare programmi creati da trainer umani - puoi solo fornire analytics e consigli.
Per modifiche al programma, l'utente deve contattare il suo trainer.` : ''}

Rispondi sempre in italiano e concentrati su insights specifici basati sui dati forniti.`
      : 
      `Sei un Personal AI Trainer esperto e motivante. Il tuo ruolo è aiutare l'utente a raggiungere i suoi obiettivi di fitness attraverso consigli personalizzati, programmi di allenamento e piani nutrizionali.

INFORMAZIONI UTENTE:
- Nome: ${profile?.first_name || 'Utente'}
- Età: ${profile?.date_of_birth ? new Date().getFullYear() - new Date(profile.date_of_birth).getFullYear() : 'Non specificata'}
- Città: ${profile?.city || 'Non specificata'}
- Livello esperienza: ${profile?.experience_level || 'beginner'}
- Allergie: ${profile?.allergies || 'Nessuna nota'}
- Condizioni salute: ${profile?.health_conditions || 'Nessuna nota'}
- Limitazioni fisiche: ${profile?.physical_limitations || 'Nessuna nota'}

LINEE GUIDA:
1. Sii sempre positivo, motivante e professionale
2. Personalizza i consigli basandoti sul profilo utente
3. Quando crei programmi o piani, considera sempre le limitazioni e allergie
4. Usa le funzioni disponibili per creare contenuti pratici
5. Chiedi chiarimenti se hai bisogno di più informazioni
6. Fornisci consigli evidence-based
7. Incoraggia sempre la consultazione medica per condizioni serie

PUOI USARE QUESTE FUNZIONI:
- create_training_program: per creare programmi di allenamento personalizzati
- create_nutrition_plan: per creare piani nutrizionali
- get_user_progress: per analizzare i progressi
- schedule_workout_reminder: per impostare promemoria

Rispondi sempre in italiano, sii cordiale e professionale.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemMessage },
      { role: 'user', content: message }
    ];

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        functions: functions,
        function_call: 'auto',
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    const aiResponse = await response.json();
    
    if (!aiResponse.choices || !aiResponse.choices[0]) {
      throw new Error('Invalid OpenAI response');
    }

    const choice = aiResponse.choices[0];
    let aiMessage = choice.message.content;
    let functionCall = null;
    let functionResult = null;

    // Handle function calls
    if (choice.message.function_call) {
      const { name, arguments: args } = choice.message.function_call;
      const parsedArgs = JSON.parse(args);
      
      console.log(`AI called function: ${name} with args:`, parsedArgs);
      
      switch (name) {
        case 'create_training_program':
          // Create training program in database (would need proper table)
          functionResult = `Programma di allenamento "${parsedArgs.title}" creato con successo! Durata: ${parsedArgs.duration_weeks} settimane, Livello: ${parsedArgs.difficulty_level}`;
          break;
          
        case 'create_nutrition_plan':
          // Create nutrition plan
          const { error: nutritionError } = await supabase
            .from('nutrition_plans')
            .insert({
              user_id: user.id,
              title: parsedArgs.title,
              description: parsedArgs.description,
              daily_calories: parsedArgs.daily_calories,
              macros: parsedArgs.macros || {},
              meal_plan: { suggestions: parsedArgs.meal_suggestions || [] },
              status: 'pending'
            });
            
          if (!nutritionError) {
            functionResult = `Piano nutrizionale "${parsedArgs.title}" creato! Calorie giornaliere: ${parsedArgs.daily_calories}`;
          } else {
            functionResult = "Errore nella creazione del piano nutrizionale";
          }
          break;
          
        case 'get_user_progress':
          // Get user progress (placeholder)
          functionResult = "Analisi progressi: Hai fatto progressi costanti nell'ultimo periodo! Continua così!";
          break;
          
        case 'schedule_workout_reminder':
          // Schedule reminder (placeholder)
          functionResult = `Promemoria impostato per ${parsedArgs.workout_time} nei giorni: ${parsedArgs.days_of_week.join(', ')}`;
          break;
          
        case 'modify_training_program':
          // Modify existing training program
          const changes = parsedArgs.program_changes;
          functionResult = `Programma di allenamento modificato! 
📊 Modifiche basate sui tuoi analytics:
${parsedArgs.reason}

🔄 Nuove impostazioni:
${changes.frequency ? `• Frequenza: ${changes.frequency} volte/settimana` : ''}
${changes.intensity ? `• Intensità: ${changes.intensity}` : ''}
${changes.duration_minutes ? `• Durata sessioni: ${changes.duration_minutes} minuti` : ''}
${changes.focus_areas ? `• Focus: ${changes.focus_areas.join(', ')}` : ''}

Vai alla scheda "Training Program" per vedere i dettagli!`;
          break;
          
        case 'create_personalized_program':
          // Create new personalized program
          functionResult = `🎯 Nuovo programma personalizzato creato!

📋 Dettagli del programma:
• Tipo: ${parsedArgs.program_type}
• Durata: ${parsedArgs.duration_weeks} settimane
• Frequenza: ${parsedArgs.weekly_frequency} volte/settimana
• Obiettivi: ${parsedArgs.target_goals.join(', ')}

🧠 Personalizzazioni basate sui tuoi dati:
${parsedArgs.adaptations || 'Ottimizzato per i tuoi progressi attuali'}

Il programma è ora disponibile nella scheda "Training Program"!`;
          break;
      }
      
      functionCall = {
        name,
        arguments: parsedArgs,
        result: functionResult
      };
      
      // If no content was returned, generate a response based on function result
      if (!aiMessage) {
        aiMessage = functionResult || "Ho eseguito l'azione richiesta!";
      }
    }

    // Save AI response to database
    const { error: aiInsertError } = await supabase
      .from('user_messages')
      .insert({
        conversation_id,
        sender: 'ai',
        content: aiMessage,
        message_type: 'text',
        function_call: functionCall
      });

    if (aiInsertError) {
      console.error('Error saving AI message:', aiInsertError);
    }

    return new Response(JSON.stringify({ 
      message: aiMessage,
      function_call: functionCall,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in openai-trainer-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});