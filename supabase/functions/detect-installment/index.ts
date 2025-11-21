import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { clientName, amount, transactions, date } = await req.json();
    
    console.log(`Analyzing installment pattern for ${clientName}, amount: €${amount}`);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Filter client's transactions
    const clientTransactions = transactions.filter((t: any) => t.client === clientName);
    
    console.log(`Found ${clientTransactions.length} previous transactions for ${clientName}`);

    const systemPrompt = `You are an expert financial pattern analyst for a personal training business.
Analyze the transaction history and determine if the new payment is likely part of an installment plan.

Consider:
1. Similar amounts (±10% tolerance) - look for recurring payments with similar values
2. Regular time intervals (weekly, monthly, bi-monthly) - identify consistent payment schedules
3. Similar descriptions or package references - match transaction names/types
4. Existing installment patterns - check if previous transactions already marked as installments

Return ONLY valid JSON with this exact structure:
{
  "isLikelyInstallment": boolean,
  "suggestedInstallmentNumber": number (1-based, e.g., 1, 2, 3),
  "totalInstallmentsDetected": number (minimum 2),
  "confidence": number (0-1, e.g., 0.85),
  "reasoning": "brief explanation in English",
  "parentTransactionId": "string or null (ID of first payment in series)"
}

Be conservative - only suggest installments when there's clear evidence of a payment series.`;

    const userPrompt = `New payment to analyze:
- Client: ${clientName}
- Amount: €${amount}
- Date: ${date}

Previous transactions for this client:
${JSON.stringify(clientTransactions.map((t: any) => ({
  id: t.id,
  amount: t.amount,
  date: t.date,
  name: t.name,
  type: t.type,
  isInstallment: t.isInstallment,
  installmentNumber: t.installmentNumber,
  totalInstallments: t.totalInstallments
})), null, 2)}

Analyze if this new payment is likely an installment and provide the structured JSON response.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiData = await response.json();
    const aiContent = aiData.choices[0].message.content;
    
    console.log('AI raw response:', aiContent);

    // Parse the JSON response from AI
    let detectionResult;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = aiContent.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) || 
                        aiContent.match(/(\{[\s\S]*\})/);
      const jsonString = jsonMatch ? jsonMatch[1] : aiContent;
      detectionResult = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return a safe default
      detectionResult = {
        isLikelyInstallment: false,
        suggestedInstallmentNumber: 1,
        totalInstallmentsDetected: 1,
        confidence: 0,
        reasoning: 'Unable to analyze pattern - insufficient data',
        parentTransactionId: null
      };
    }

    console.log('Detection result:', detectionResult);

    return new Response(JSON.stringify(detectionResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in detect-installment function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        isLikelyInstallment: false,
        confidence: 0,
        reasoning: 'Error analyzing pattern'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
