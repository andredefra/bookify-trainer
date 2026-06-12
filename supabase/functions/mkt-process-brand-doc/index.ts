// Async-style processing of a brand doc:
// - Sets status to "processing"
// - Uses Lovable AI to classify, recap, and extract personas
// - Updates the doc row + inserts any net-new personas with is_ai_generated=true
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  if (!LOVABLE_API_KEY) return json({ error: "LOVABLE_API_KEY not configured" }, 500);

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Authn + admin allowlist
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  const { data: userRes } = await admin.auth.getUser(token);
  const email = userRes?.user?.email ?? null;
  if (!email) return json({ error: "Unauthenticated" }, 401);
  const { data: adminRow } = await admin
    .from("mkt_admins").select("id").ilike("email", email).maybeSingle();
  if (!adminRow) return json({ error: "Forbidden" }, 403);

  let body: { docId?: string } = {};
  try { body = await req.json(); } catch { /* ignore */ }
  const docId = body.docId;
  if (!docId) return json({ error: "docId required" }, 400);

  // Mark processing immediately, then kick off async work (do not await).
  await admin.from("mkt_brand_docs")
    .update({ processing_status: "processing", processing_error: null })
    .eq("id", docId);

  // Fire-and-forget background work. We intentionally do not await.
  processDoc(admin, LOVABLE_API_KEY, docId).catch(async (err) => {
    const msg = err instanceof Error ? err.message : String(err);
    await admin.from("mkt_brand_docs")
      .update({ processing_status: "failed", processing_error: msg })
      .eq("id", docId);
  });

  return json({ ok: true });
});

type Admin = ReturnType<typeof createClient>;

async function processDoc(admin: Admin, apiKey: string, docId: string) {
  const { data: doc, error } = await admin
    .from("mkt_brand_docs").select("*").eq("id", docId).single();
  if (error || !doc) throw new Error("Doc not found");

  const content = (doc.content ?? "").trim();
  if (!content) {
    await admin.from("mkt_brand_docs").update({
      processing_status: "done",
      recap: "(Documento vuoto: nessun contenuto testuale da elaborare. Incolla il testo o carica un file con testo estraibile.)",
      doc_type: doc.doc_type ?? "other",
      processed_at: new Date().toISOString(),
    }).eq("id", docId);
    return;
  }

  const systemPrompt = `Sei un assistente che analizza documenti di marketing/branding italiani.
Riceverai il contenuto di un documento. Devi:
1) Classificarlo (doc_type) tra: strategy, tone_of_voice, persona_profile, product_brief, brand_guideline, other.
2) Scrivere un recap conciso in italiano (3-5 frasi, massimo 600 caratteri) che cattura l'essenza utilizzabile come contesto AI.
3) Estrarre eventuali Target Persona descritte (nome, fascia d'età, descrizione/dolore, soluzione che cerchi, focus per copy).

Restituisci SOLO JSON valido con questa shape:
{
  "doc_type": "strategy" | "tone_of_voice" | "persona_profile" | "product_brief" | "brand_guideline" | "other",
  "recap": "...",
  "personas": [
    { "name": "...", "age_range": "...", "description": "...", "pain": "...", "solution": "...", "copy_focus": "..." }
  ]
}
Se nessuna persona è descritta, restituisci "personas": [].`;

  const userPrompt = `## Titolo: ${doc.title}\n\n## Contenuto:\n${content.slice(0, 12000)}`;

  const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!aiRes.ok) {
    const text = await aiRes.text();
    throw new Error(`AI gateway ${aiRes.status}: ${text.slice(0, 200)}`);
  }

  const aiJson = await aiRes.json();
  const raw = aiJson?.choices?.[0]?.message?.content ?? "{}";
  let parsed: {
    doc_type?: string;
    recap?: string;
    personas?: Array<{ name?: string; age_range?: string; description?: string; pain?: string; solution?: string; copy_focus?: string }>;
  } = {};
  try { parsed = JSON.parse(raw); } catch { parsed = {}; }

  const docType = parsed.doc_type ?? "other";
  const recap = (parsed.recap ?? "").slice(0, 1200);

  await admin.from("mkt_brand_docs").update({
    processing_status: "done",
    doc_type: docType,
    recap,
    processed_at: new Date().toISOString(),
    processing_error: null,
  }).eq("id", docId);

  // Persona extraction: dedupe by case-insensitive name.
  const personas = Array.isArray(parsed.personas) ? parsed.personas : [];
  if (personas.length === 0) return;

  const { data: existing } = await admin.from("mkt_personas").select("id, name");
  const existingNames = new Set((existing ?? []).map((p) => p.name.toLowerCase().trim()));

  const toInsert = personas
    .filter((p) => p?.name && !existingNames.has(p.name.toLowerCase().trim()))
    .map((p) => ({
      name: p.name!.slice(0, 80),
      age_range: p.age_range?.slice(0, 40) ?? null,
      description: p.description ?? null,
      pain: p.pain ?? null,
      solution: p.solution ?? null,
      copy_focus: p.copy_focus ?? null,
      is_ai_generated: true,
      source_doc_id: docId,
    }));

  if (toInsert.length > 0) {
    await admin.from("mkt_personas").insert(toInsert);
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
