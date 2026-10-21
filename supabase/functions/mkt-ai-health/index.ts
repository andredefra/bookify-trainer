// Live AI health check: a tiny Gemini call. Never returns the key.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { geminiText, GeminiError, GEMINI_MODEL } from "../_shared/gemini.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
  const { data: userRes } = await admin.auth.getUser(token);
  const email = userRes?.user?.email ?? null;
  if (!email) return json({ error: "Unauthenticated" }, 401);
  const { data: adminRow } = await admin.from("mkt_admins").select("id").ilike("email", email).maybeSingle();
  if (!adminRow) return json({ error: "Forbidden" }, 403);

  try {
    await geminiText({ prompt: "Rispondi solo: ok" });
    return json({ status: "active", label: "Attivo (Gemini)", model: GEMINI_MODEL });
  } catch (e) {
    if (e instanceof GeminiError && e.code === "missing_key") return json({ status: "missing_key", label: "Chiave mancante" });
    if (e instanceof GeminiError && e.code === "invalid_key") return json({ status: "invalid_key", label: "Chiave non valida" });
    const msg = e instanceof Error ? e.message : String(e);
    return json({ status: "error", label: `Errore: ${msg}` });
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
