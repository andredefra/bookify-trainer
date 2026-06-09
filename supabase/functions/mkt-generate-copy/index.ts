import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const DEFAULT_TONE = `Agisci come un Personal Trainer indipendente italiano di ~30 anni, molto sul pezzo, che parla da collega a collega ad altri PT italiani. Stai documentando la creazione del tuo strumento B2B MyPersonal.fit. Tono informale, amichevole, leggermente esasperato dal modo 'vecchia scuola' (Excel, agende di carta, caos su WhatsApp) in cui i PT italiani lavorano ancora. Niente formalismi né spocchia. Massimo 3-4 emoji. Struttura: hook forte sul dolore → 2 righe sulla soluzione → domanda per i commenti → CTA chiara.`;

const MODE_INSTRUCTIONS: Record<string, string> = {
  generate: "Genera una copy completa per Instagram a partire dal contesto del post.",
  rewrite: "Riscrivi la copy esistente mantenendo il messaggio principale ma cambiando struttura e parole.",
  shorten: "Accorcia la copy esistente del 30-40% mantenendo hook e CTA.",
  retone: "Riscrivi la copy cambiando tono pur mantenendo il significato.",
  chat: "Rispondi alla domanda dell'utente in modo conciso, suggerendo idee di copy se pertinente. Non scrivere nel database.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Authn: require caller's JWT to identify them and check admin allowlist
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: userRes } = await admin.auth.getUser(token);
    const email = userRes?.user?.email ?? null;
    if (!email) {
      return new Response(JSON.stringify({ error: "Unauthenticated" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: adminRow } = await admin
      .from("mkt_admins").select("id").ilike("email", email).maybeSingle();
    if (!adminRow) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const mode = String(body?.mode ?? "generate");
    const postId = body?.postId ?? null;
    const userPrompt = body?.prompt ?? "";

    // Brand context (active docs)
    const { data: docs } = await admin.from("mkt_brand_docs").select("title, content").eq("is_active", true);
    const brandCtx = (docs ?? [])
      .filter((d: { content: string | null }) => d.content)
      .map((d: { title: string; content: string | null }) => `### ${d.title}\n${d.content}`)
      .join("\n\n");

    let postCtx = "";
    let post: Record<string, unknown> | null = null;
    let persona: Record<string, unknown> | null = null;

    if (postId) {
      const { data: p } = await admin.from("mkt_content").select("*").eq("id", postId).single();
      post = p;
      if (p?.persona_id) {
        const { data: pr } = await admin.from("mkt_personas").select("*").eq("id", p.persona_id).maybeSingle();
        persona = pr;
      }
      postCtx = `## Post corrente
Funnel: ${post?.funnel_stage ?? "-"}
Formato: ${post?.content_format ?? "-"}
Hook: ${post?.hook ?? "-"}
Copy esistente: ${post?.post_copy ?? "-"}
CTA: ${post?.cta ?? "-"}
Media prompt: ${post?.media_prompt ?? "-"}

## Persona target
${persona ? `${persona.name} (${persona.age_range ?? ""})\n${persona.description ?? ""}\nDolore: ${persona.pain ?? ""}\nSoluzione: ${persona.solution ?? ""}\nFocus copy: ${persona.copy_focus ?? ""}` : "Non specificata."}`;
    }

    const systemPrompt = `${DEFAULT_TONE}

${brandCtx ? `## Contesto brand\n${brandCtx}` : ""}

${postCtx}

${MODE_INSTRUCTIONS[mode] ?? MODE_INSTRUCTIONS.generate}
Rispondi SOLO con il testo finale del post, senza preamboli o spiegazioni.`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: mode === "chat" ? userPrompt : "Genera l'output ora." },
        ],
      }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      return new Response(JSON.stringify({ error: `AI gateway: ${aiRes.status} ${text}` }), {
        status: aiRes.status === 429 || aiRes.status === 402 ? aiRes.status : 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiJson = await aiRes.json();
    const text = aiJson?.choices?.[0]?.message?.content ?? "";

    if (mode === "chat") {
      return new Response(JSON.stringify({ text }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!postId) {
      return new Response(JSON.stringify({ error: "postId required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Append (never overwrite) to mkt_generations
    const { data: gen, error: insErr } = await admin
      .from("mkt_generations")
      .insert({ content_id: postId, gen_type: "copy", output: text, is_selected: false })
      .select()
      .single();
    if (insErr) throw insErr;

    return new Response(JSON.stringify({ generation: gen, text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
