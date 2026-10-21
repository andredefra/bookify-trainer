// Read-only help assistant for the whole admin area (Gemini + read-only data tools).
// No tool here writes to the database.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { geminiRaw, geminiErrorInfo, type GeminiContent } from "../_shared/gemini.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PAGES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/branding": "Branding",
  "/admin/content-plan": "Piano Contenuti",
  "/admin/calendar": "Calendario",
  "/admin/crm": "CRM",
  "/admin/waitlist": "Waitlist",
  "/admin/settings": "Impostazioni",
};

const GUIDE = `Sei l'assistente di aiuto dell'area admin di MyPersonal (marketing di MyPersonal.fit). Rispondi SEMPRE in italiano, in modo breve e pratico (passi numerati quando spieghi "come faccio a…").
Non puoi modificare nulla: puoi solo leggere i dati con gli strumenti disponibili. Se l'utente chiede di cambiare qualcosa, spiega dove e come farlo a mano. Non inventare numeri: usa gli strumenti per i dati.

Sezioni dell'admin:
- Dashboard (/admin): panoramica; card "Bilanciamento persona" raggruppata per mercato: Italia (Giulia, Lorenzo, Matteo) e India (Rohan, Priya, Arjun), obiettivo ≈ 33% per persona in ciascun mercato.
- Branding (/admin/branding): documenti di brand (strategia, tono di voce, persona, brief). Caricandone uno, l'AI lo classifica, scrive un riassunto e propone nuove persona. I documenti attivi sono il contesto per tutta l'AI.
- Piano Contenuti (/admin/content-plan): fasi del piano e post (hook, copy, CTA, media prompt, persona, formato, funnel). Stati: bozza → Validated → Scheduled → Posted. Dal post si genera/riscrive la copy con l'AI e c'è una chat sul singolo post che propone modifiche da accettare a mano. Import CSV disponibile.
- Calendario (/admin/calendar): post programmati per data/ora; l'AI può distribuire i post "Validated" di una fase in date future rispettando la sequenza; conferma di pubblicazione.
- CRM (/admin/crm): opportunità in colonne per fase (drag & drop) e membri; si possono promuovere iscritti dalla Waitlist.
- Waitlist (/admin/waitlist): due tab, "Clienti" (iscritti dall'app, colonna "Si allena con PT / da solo") e "Personal trainer". Ogni tab ha contatori (totale, con consenso, 7 e 30 giorni), ricerca, filtro consenso, export CSV, promozione al CRM. "Aggiungi iscritto" apre un modulo (Nome*, Email*, Telefono, Città, Lingua, Consenso, Note; email già presente → "Già in lista"). "Importa CSV" carica un export di Google Forms/Fogli Google, mostra un'anteprima con mappatura colonne e salta righe doppie o senza email. Dal 21 ottobre 2026 le richieste dei personal trainer arrivano dai Google Form.
- Impostazioni (/admin/settings): registro dei connettori e stato AI verificato in tempo reale (pulsante "Verifica"). Le chiavi si inseriscono nei Secrets di Supabase.`;

const TOOLS = [
  {
    name: "waitlist_counts",
    description: "Conta iscritti alla waitlist per audience e periodo.",
    parameters: {
      type: "object",
      properties: {
        audience: { type: "string", enum: ["user", "trainer", "all"], description: "user = Clienti, trainer = Personal trainer" },
        days: { type: "integer", description: "Ultimi N giorni (ometti per il totale)" },
      },
      required: ["audience"],
    },
  },
  { name: "crm_counts_by_stage", description: "Numero di opportunità CRM per fase.", parameters: { type: "object", properties: {} } },
  {
    name: "posts_summary",
    description: "Conteggio dei post per stato, opzionalmente filtrati per data programmata (YYYY-MM-DD).",
    parameters: {
      type: "object",
      properties: { from: { type: "string" }, to: { type: "string" } },
    },
  },
  { name: "personas_balance", description: "Persona con mercato (Italia/India) e numero di post per persona.", parameters: { type: "object", properties: {} } },
  { name: "brand_docs_list", description: "Elenco dei documenti di brand con tipo, stato e se attivi.", parameters: { type: "object", properties: {} } },
];

type Admin = ReturnType<typeof createClient>;

async function runTool(admin: Admin, name: string, args: Record<string, unknown>) {
  switch (name) {
    case "waitlist_counts": {
      let q = admin.from("waitlist").select("id", { count: "exact", head: true });
      const aud = String(args.audience ?? "all");
      if (aud !== "all") q = q.eq("audience", aud);
      const days = Number(args.days);
      if (days > 0) q = q.gte("created_at", new Date(Date.now() - days * 86400000).toISOString());
      const { count, error } = await q;
      if (error) return { error: error.message };
      return { audience: aud, days: days > 0 ? days : null, count: count ?? 0 };
    }
    case "crm_counts_by_stage": {
      const { data, error } = await admin.from("mkt_crm_opportunities").select("stage");
      if (error) return { error: error.message };
      const by: Record<string, number> = {};
      for (const r of data ?? []) by[r.stage] = (by[r.stage] ?? 0) + 1;
      return { total: data?.length ?? 0, by_stage: by };
    }
    case "posts_summary": {
      let q = admin.from("mkt_content").select("status, scheduled_date");
      if (typeof args.from === "string") q = q.gte("scheduled_date", args.from);
      if (typeof args.to === "string") q = q.lte("scheduled_date", args.to);
      const { data, error } = await q;
      if (error) return { error: error.message };
      const by: Record<string, number> = {};
      for (const r of data ?? []) by[r.status ?? "—"] = (by[r.status ?? "—"] ?? 0) + 1;
      return { total: data?.length ?? 0, by_status: by };
    }
    case "personas_balance": {
      const [{ data: personas }, { data: posts }] = await Promise.all([
        admin.from("mkt_personas").select("id, name, market"),
        admin.from("mkt_content").select("persona_id"),
      ]);
      const counts: Record<string, number> = {};
      for (const p of posts ?? []) if (p.persona_id) counts[p.persona_id] = (counts[p.persona_id] ?? 0) + 1;
      return {
        personas: (personas ?? []).map((p) => ({
          name: p.name,
          market: p.market === "in" ? "India" : "Italia",
          posts: counts[p.id] ?? 0,
        })),
      };
    }
    case "brand_docs_list": {
      const { data, error } = await admin.from("mkt_brand_docs")
        .select("title, doc_type, processing_status, is_active");
      if (error) return { error: error.message };
      return { docs: data ?? [] };
    }
    default:
      return { error: "Strumento sconosciuto" };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    const { data: userRes } = await admin.auth.getUser(token);
    const email = userRes?.user?.email ?? null;
    if (!email) return json({ error: "Unauthenticated" }, 401);
    const { data: adminRow } = await admin.from("mkt_admins").select("id").ilike("email", email).maybeSingle();
    if (!adminRow) return json({ error: "Forbidden" }, 403);

    let body: { message?: string; path?: string; history?: Array<{ role: string; content: string }> } = {};
    try { body = await req.json(); } catch { /* ignore */ }
    const message = String(body.message ?? "").trim().slice(0, 2000);
    if (!message) return json({ error: "message required" }, 400);
    const path = String(body.path ?? "/admin").replace(/\/+$/, "") || "/admin";
    const pageName = PAGES[path] ?? "Admin";
    const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

    const system = `${GUIDE}\n\nOggi è ${new Date().toISOString().slice(0, 10)}. L'utente si trova nella pagina: ${pageName} (${path}).`;
    const contents: GeminiContent[] = [
      ...history
        .filter((h) => typeof h.content === "string" && h.content)
        .map((h) => ({ role: (h.role === "assistant" ? "model" : "user") as "user" | "model", parts: [{ text: h.content.slice(0, 4000) }] })),
      { role: "user", parts: [{ text: message }] },
    ];

    for (let step = 0; step < 5; step++) {
      const parts = await geminiRaw({ system, contents, tools: TOOLS });
      const calls = parts.filter((p) => p.functionCall) as Array<{ functionCall: { name: string; args?: Record<string, unknown> } }>;
      if (calls.length === 0) {
        const text = parts.map((p) => (typeof p.text === "string" ? p.text : "")).join("").trim();
        return json({ text: text || "Non ho una risposta per questa domanda.", page: pageName });
      }
      contents.push({ role: "model", parts });
      const responses = [];
      for (const c of calls) {
        const result = await runTool(admin, c.functionCall.name, c.functionCall.args ?? {});
        responses.push({ functionResponse: { name: c.functionCall.name, response: result } });
      }
      contents.push({ role: "user", parts: responses });
    }
    return json({ text: "Non sono riuscito a completare la risposta: prova a riformulare la domanda.", page: pageName });
  } catch (e) {
    const info = geminiErrorInfo(e);
    return json({ error: info.message }, info.status);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
