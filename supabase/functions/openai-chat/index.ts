import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversation_id, action_type, plan_id } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle plan acceptance
    if (action_type === 'accept_plan' && plan_id) {
      const { error } = await supabase
        .from('training_plans')
        .update({ 
          status: 'accepted',
          started_at: new Date().toISOString()
        })
        .eq('id', plan_id);

      if (error) throw error;

      return new Response(JSON.stringify({ 
        success: true,
        message: 'Piano accettato con successo! Lo troverai nella sezione Training Program.' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user profile for personalized responses
    const authHeader = req.headers.get('authorization')?.replace('Bearer ', '');
    let userProfile = null;
    
    if (authHeader) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .single();
      userProfile = profile;
    }

    // Get conversation history
    const { data: messages } = await supabase
      .from('user_messages')
      .select('*')
      .eq('conversation_id', conversation_id)
      .order('created_at', { ascending: true })
      .limit(20);

    // Build conversation context
    const conversationMessages = messages?.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    })) || [];

    conversationMessages.push({
      role: 'user',
      content: message
    });

    // Create personalized system prompt
    const systemPrompt = `Sei un AI Personal Trainer e nutrizionista esperto specializzato in fitness e benessere. 

INFORMAZIONI UTENTE:
${userProfile ? `
- Nome: ${userProfile.first_name || 'Non specificato'}
- Età: ${userProfile.age || 'Non specificata'}
- Peso: ${userProfile.weight || 'Non specificato'}kg
- Altezza: ${userProfile.height || 'Non specificata'}cm
- Livello fitness: ${userProfile.fitness_level || 'Non specificato'}
- Obiettivi: ${userProfile.fitness_goals ? JSON.stringify(userProfile.fitness_goals) : 'Non specificati'}
- Condizioni mediche: ${userProfile.medical_conditions || 'Nessuna'}
` : 'Profilo utente non disponibile - chiedi informazioni per personalizzare i consigli.'}

CAPACITÀ:
- Consigli su allenamento personalizzati
- Piani nutrizionali bilanciati
- Motivazione e supporto
- Creazione di programmi di allenamento completi
- Suggerimenti su esercizi e tecnica

QUANDO CREARE UN PIANO:
Se l'utente chiede un piano di allenamento personalizzato, rispondi con:
1. Una descrizione del piano
2. Alla fine aggiungi ESATTAMENTE questo formato:
[CREA_PIANO]
{
  "title": "Titolo del piano",
  "description": "Descrizione dettagliata",
  "duration_weeks": 8,
  "difficulty_level": "beginner/intermediate/advanced",
  "goals": ["obiettivo1", "obiettivo2"],
  "plan_data": {
    "weeks": [
      {
        "week": 1,
        "days": [
          {
            "day": 1,
            "exercises": [
              {"name": "Squat", "sets": 3, "reps": "10-12", "rest": "60s"}
            ]
          }
        ]
      }
    ]
  }
}
[/CREA_PIANO]

Rispondi sempre in italiano, sii professionale ma amichevole.`;

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationMessages
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let aiResponse = data.choices[0].message.content;

    // Check if AI wants to create a training plan
    const planMatch = aiResponse.match(/\[CREA_PIANO\](.*?)\[\/CREA_PIANO\]/s);
    let planId = null;
    
    if (planMatch) {
      try {
        const planData = JSON.parse(planMatch[1].trim());
        
        // Get user ID from auth header
        const { data: { user } } = await supabase.auth.getUser(authHeader);
        
        if (user) {
          const { data: plan, error: planError } = await supabase
            .from('training_plans')
            .insert({
              user_id: user.id,
              title: planData.title,
              description: planData.description,
              duration_weeks: planData.duration_weeks,
              difficulty_level: planData.difficulty_level,
              goals: planData.goals,
              plan_data: planData.plan_data,
              status: 'pending'
            })
            .select()
            .single();

          if (!planError && plan) {
            planId = plan.id;
            // Remove the plan creation syntax from the response
            aiResponse = aiResponse.replace(/\[CREA_PIANO\].*?\[\/CREA_PIANO\]/s, '').trim();
          }
        }
      } catch (error) {
        console.error('Error creating plan:', error);
      }
    }

    // Save messages
    await supabase.from('user_messages').insert({
      conversation_id,
      sender: 'user',
      content: message,
      message_type: 'text'
    });

    await supabase.from('user_messages').insert({
      conversation_id,
      sender: 'ai',
      content: aiResponse,
      message_type: 'text'
    });

    return new Response(JSON.stringify({ 
      response: aiResponse,
      conversation_id,
      plan_id: planId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in openai-chat:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});