// Schedules Validated posts of a plan phase to FUTURE dates/times.
// The AI respects global sequence (phase_index ASC, then sequence_number ASC):
// posts of an earlier phase are always scheduled before posts of a later one.
// Updates status → "Scheduled".
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    if (!LOVABLE_API_KEY) return json({ error: "LOVABLE_API_KEY not configured" }, 500);

    // Authn + admin allowlist
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: userRes } = await admin.auth.getUser(token);
    const email = userRes?.user?.email ?? null;
    if (!email) return json({ error: "Unauthenticated" }, 401);
    const { data: adminRow } = await admin
      .from("mkt_admins").select("id").ilike("email", email).maybeSingle();
    if (!adminRow) return json({ error: "Forbidden" }, 403);

    const body = await req.json();
    const phaseId = String(body?.phaseId ?? "");
    if (!phaseId) return json({ error: "phaseId required" }, 400);

    // Load phase
    const { data: phase, error: pe } = await admin
      .from("mkt_plan_phases").select("*").eq("id", phaseId).single();
    if (pe || !phase) return json({ error: "Phase not found" }, 404);
    if (phase.status === "closed") return json({ error: "Phase is closed" }, 400);

    // Load Validated posts of this phase in sequence order
    const { data: posts, error: pErr } = await admin
      .from("mkt_content")
      .select("id, sequence_number, persona_id, content_format, content_type, funnel_stage, hook")
      .eq("plan_phase_id", phaseId)
      .eq("status", "Validated")
      .order("sequence_number", { ascending: true, nullsFirst: false });
    if (pErr) throw pErr;
    if (!posts || posts.length === 0) return json({ scheduled: 0, assignments: [] });

    // Determine earliest allowed start date based on previously Scheduled/Posted posts
    // of THIS phase or any EARLIER phase — to respect the global sequence.
    const { data: earlierPhases } = await admin
      .from("mkt_plan_phases")
      .select("id")
      .lte("phase_index", phase.phase_index);
    const earlierIds = (earlierPhases ?? []).map((p: { id: string }) => p.id);

    let earliestStart = new Date();
    earliestStart.setDate(earliestStart.getDate() + 1); // start from tomorrow

    if (earlierIds.length > 0) {
      const { data: alreadyDated } = await admin
        .from("mkt_content")
        .select("scheduled_date")
        .in("plan_phase_id", earlierIds)
        .in("status", ["Scheduled", "Posted"])
        .not("scheduled_date", "is", null)
        .order("scheduled_date", { ascending: false })
        .limit(1);
      const lastDate = alreadyDated?.[0]?.scheduled_date as string | undefined;
      if (lastDate) {
        const after = new Date(lastDate + "T00:00:00Z");
        after.setUTCDate(after.getUTCDate() + 1);
        if (after > earliestStart) earliestStart = after;
      }
    }
    const earliestStr = earliestStart.toISOString().slice(0, 10);

    // Load personas + active brand docs as strategy context
    const { data: personas } = await admin
      .from("mkt_personas").select("id, name, age_range, description, copy_focus");
    const personaMap = new Map((personas ?? []).map((p) => [p.id, p]));
    const { data: docs } = await admin.from("mkt_brand_docs")
      .select("title, recap, content").eq("is_active", true);
    const brandCtx = (docs ?? [])
      .map((d: { title: string; recap: string | null; content: string | null }) =>
        `### ${d.title}\n${d.recap ?? d.content?.slice(0, 800) ?? ""}`)
      .join("\n\n");

    const enriched = posts.map((p, i) => ({
      seq: p.sequence_number ?? i + 1,
      id: p.id,
      persona: p.persona_id ? personaMap.get(p.persona_id)?.name ?? "—" : "—",
      format: p.content_format ?? "—",
      content_type: p.content_type ?? "—",
      funnel: p.funnel_stage ?? "—",
      hook: (p.hook ?? "").slice(0, 80),
    }));

    const systemPrompt = `Sei un planner social per un account Instagram italiano B2B (PT indipendenti).
Distribuisci i post elencati in date FUTURE a partire da ${earliestStr} (incluso).
Rispetta RIGOROSAMENTE l'ordine di "seq" (post #5 dopo #4, sempre crescente per data/ora).
Scegli il giorno migliore (Lun-Dom) e l'orario ottimale (HH:MM, formato 24h) in base a:
- persona target: Giulia (24-28, social/classi) ama serale 19-21 e weekend mattina; Matteo (30-38, analitico) preferisce 7-9 e 20-22 feriali; Lorenzo (28-35, in-sala) 12-14 e 21-23.
- formato: Reel prime time (18-21); Carosello 7-9 o 19-21; Post 12-14; Story/Sondaggio 12-14.
- distribuzione uniforme (1-2 post al giorno max), evita più di 2 post lo stesso giorno.
Restituisci SOLO JSON valido con la chiave "assignments" array di oggetti { "id": string, "scheduled_date": "YYYY-MM-DD", "scheduled_time": "HH:MM" }.
Non aggiungere testo extra.

${brandCtx ? `## Contesto strategia\n${brandCtx}\n` : ""}`;

    const userPrompt = `Fase: ${phase.label ?? "Fase " + phase.phase_index} (index ${phase.phase_index})
${phase.description ? `Descrizione: ${phase.description}\n` : ""}Inizio non prima di: ${earliestStr}
Post da calendarizzare (in ordine seq):
${JSON.stringify(enriched, null, 2)}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
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
      const status = aiRes.status === 429 || aiRes.status === 402 ? aiRes.status : 500;
      return json({ error: `AI gateway: ${aiRes.status} ${text}` }, status);
    }

    const aiJson = await aiRes.json();
    const raw = aiJson?.choices?.[0]?.message?.content ?? "{}";
    let parsed: { assignments?: Array<{ id: string; scheduled_date: string; scheduled_time: string }> } = {};
    try { parsed = JSON.parse(raw); } catch { parsed = {}; }
    const assignments = Array.isArray(parsed.assignments) ? parsed.assignments : [];

    // Validate + persist
    const validIds = new Set(posts.map((p) => p.id));
    const okAssignments = assignments.filter(
      (a) => validIds.has(a.id) &&
             /^\d{4}-\d{2}-\d{2}$/.test(a.scheduled_date) &&
             /^\d{2}:\d{2}$/.test(a.scheduled_time) &&
             a.scheduled_date >= earliestStr
    );

    let scheduled = 0;
    for (const a of okAssignments) {
      const { error } = await admin.from("mkt_content")
        .update({
          scheduled_date: a.scheduled_date,
          scheduled_time: a.scheduled_time + ":00",
          status: "Scheduled",
        })
        .eq("id", a.id);
      if (!error) scheduled++;
    }

    return json({ scheduled, assignments: okAssignments });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return json({ error: msg }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
