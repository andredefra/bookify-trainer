// Contextual chat about a single post draft.
// Returns assistant reply + structured field-level diff proposals.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_FIELDS = ["hook", "post_copy", "cta", "media_prompt", "notes"] as const;
type AllowedField = typeof ALLOWED_FIELDS[number];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  if (!LOVABLE_API_KEY) return json({ error: "LOVABLE_API_KEY not configured" }, 500);

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  const { data: userRes } = await admin.auth.getUser(token);
  const email = userRes?.user?.email ?? null;
  if (!email) return json({ error: "Unauthenticated" }, 401);
  const { data: adminRow } = await admin
    .from("mkt_admins").select("id").ilike("email", email).maybeSingle();
  if (!adminRow) return json({ error: "Forbidden" }, 403);

  let body: {
    postId?: string;
    message?: string;
    history?: Array<{ role: "user" | "assistant"; content: string }>;
  } = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const postId = body.postId;
  const message = (body.message ?? "").trim();
  const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
  if (!postId || !message) return json({ error: "postId and message required" }, 400);

  const { data: post, error: pErr } = await admin
    .from("mkt_content").select("*").eq("id", postId).single();
  if (pErr || !post) return json({ error: "Post not found" }, 404);

  let persona: Record<string, unknown> | null = null;
  if (post.persona_id) {
    const { data: pr } = await admin
      .from("mkt_personas").select("*").eq("id", post.persona_id).maybeSingle();
    persona = pr;
  }

  const { data: docs } = await admin.from("mkt_brand_docs")
    .select("title, recap, content").eq("is_active", true);
  const brandCtx = (docs ?? [])
    .map((d: { title: string; recap: string | null; content: string | null }) =>
      `### ${d.title}\n${d.recap ?? d.content?.slice(0, 800) ?? ""}`)
    .join("\n\n");

  const systemPrompt = `Sei un copywriter italiano per Instagram B2B (PT indipendenti).
L'utente sta lavorando su un singolo post. Rispondi conversando in italiano, poi proponi modifiche concrete sui campi del post.

Campi modificabili: ${ALLOWED_FIELDS.join(", ")}.

Restituisci SOLO JSON valido:
{
  "reply": "breve risposta conversazionale (max 3 frasi)",
  "proposals": [
    { "field": "hook" | "post_copy" | "cta" | "media_prompt" | "notes",
      "current_value": "valore attuale (può essere vuoto)",
      "proposed_value": "nuovo valore proposto",
      "rationale": "perché in 1 frase" }
  ]
}
Includi una proposta solo per i campi che vuoi davvero modificare. Se l'utente fa solo una domanda, "proposals": [].

${brandCtx ? `## Contesto brand\n${brandCtx}\n` : ""}

## Stato attuale del post
hook: ${post.hook ?? "(vuoto)"}
post_copy: ${post.post_copy ?? "(vuoto)"}
cta: ${post.cta ?? "(vuoto)"}
media_prompt: ${post.media_prompt ?? "(vuoto)"}
notes: ${post.notes ?? "(vuoto)"}
format: ${post.content_format ?? "—"} · funnel: ${post.funnel_stage ?? "—"} · objective: ${post.objective ?? "—"}
persona: ${persona ? `${persona.name} — ${persona.copy_focus ?? ""}` : "—"}`;

  const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map((h) => ({ role: h.role, content: h.content })),
        { role: "user", content: message },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!aiRes.ok) {
    const text = await aiRes.text();
    const status = aiRes.status === 429 || aiRes.status === 402 ? aiRes.status : 500;
    return json({ error: `AI gateway ${aiRes.status}: ${text.slice(0, 200)}` }, status);
  }

  const aiJson = await aiRes.json();
  const raw = aiJson?.choices?.[0]?.message?.content ?? "{}";
  let parsed: { reply?: string; proposals?: Array<{ field?: string; current_value?: string; proposed_value?: string; rationale?: string }> } = {};
  try { parsed = JSON.parse(raw); } catch { parsed = {}; }

  const proposals = (parsed.proposals ?? [])
    .filter((p) => p.field && ALLOWED_FIELDS.includes(p.field as AllowedField) && typeof p.proposed_value === "string")
    .map((p) => ({
      field: p.field as AllowedField,
      current_value: typeof p.current_value === "string" ? p.current_value : "",
      proposed_value: p.proposed_value as string,
      rationale: p.rationale ?? "",
    }));

  // Persist chat-diff turn in mkt_generations for history.
  await admin.from("mkt_generations").insert({
    content_id: postId,
    gen_type: "chat_diff",
    output: JSON.stringify({ user: message, reply: parsed.reply ?? "", proposals }),
    is_selected: false,
  });

  return json({ reply: parsed.reply ?? "", proposals });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
