// Poll DMs/comments via Composio MCP for contacts that have been DM'd.
// Stores new replies with AI sentiment via Lovable AI Gateway.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function mcpCallTool(mcpUrl: string, authToken: string | null, name: string, args: Record<string, unknown>) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json", "Accept": "application/json, text/event-stream",
  };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  const res = await fetch(mcpUrl, {
    method: "POST", headers,
    body: JSON.stringify({ jsonrpc: "2.0", id: crypto.randomUUID(), method: "tools/call", params: { name, arguments: args } }),
  });
  const ct = res.headers.get("content-type") ?? "";
  let payload: unknown;
  if (ct.includes("text/event-stream")) {
    const text = await res.text();
    const lines = text.split("\n").filter((l) => l.startsWith("data:"));
    payload = JSON.parse(lines[lines.length - 1]?.slice(5).trim() ?? "{}");
  } else {
    try { payload = await res.json(); } catch { payload = { raw: await res.text() }; }
  }
  return { ok: res.ok, payload };
}

async function classify(text: string, key: string): Promise<"positive" | "neutral" | "negative"> {
  try {
    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "Reply with one word only: positive, neutral, or negative." },
          { role: "user", content: text.slice(0, 1000) },
        ],
      }),
    });
    const j = await r.json();
    const out = (j?.choices?.[0]?.message?.content ?? "").toLowerCase().trim();
    if (out.includes("positive")) return "positive";
    if (out.includes("negative")) return "negative";
    return "neutral";
  } catch { return "neutral"; }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY") ?? "";
  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  const { data: userRes } = await admin.auth.getUser(token);
  const email = userRes?.user?.email ?? null;
  if (!email) return json({ error: "Unauthenticated" }, 401);
  const { data: adminRow } = await admin.from("mkt_admins").select("id").ilike("email", email).maybeSingle();
  if (!adminRow) return json({ error: "Forbidden" }, 403);

  // For each contacted contact (recent), poll DMs
  const { data: contacts } = await admin.from("mkt_outreach_contacts")
    .select("*").eq("status", "contacted").limit(50);

  let polled = 0, newReplies = 0;
  for (const c of contacts ?? []) {
    // find the DM action for this contact to get the run/connection
    const { data: act } = await admin.from("mkt_outreach_actions")
      .select("*").eq("contact_id", c.id).eq("step", "dm").eq("status", "done").limit(1).maybeSingle();
    if (!act) continue;
    const { data: run } = await admin.from("mkt_outreach_runs").select("*").eq("id", act.run_id).maybeSingle();
    if (!run || !run.mcp_connection_id || run.config?.dry_run) continue;
    const { data: conn } = await admin.from("mkt_mcp_connections").select("*").eq("id", run.mcp_connection_id).maybeSingle();
    if (!conn) continue;
    const tokens = (conn.oauth_tokens ?? {}) as Record<string, unknown>;
    const authTok = (tokens.access_token as string | undefined) ?? (tokens.api_key as string | undefined) ?? null;

    polled++;
    const r = await mcpCallTool(conn.mcp_url, authTok, "INSTAGRAM_GET_DM_THREAD", { username: c.username });
    const result = r.payload as { result?: { content?: Array<{ text?: string }> } };
    const messages = result?.result?.content ?? [];
    for (const m of messages) {
      const text = (m.text ?? "").trim();
      if (!text) continue;
      // skip if already stored
      const { data: existing } = await admin.from("mkt_outreach_replies")
        .select("id").eq("contact_id", c.id).eq("text", text).maybeSingle();
      if (existing) continue;
      const sentiment = LOVABLE_API_KEY ? await classify(text, LOVABLE_API_KEY) : "neutral";
      await admin.from("mkt_outreach_replies").insert({
        action_id: act.id, contact_id: c.id, channel: "dm", text, sentiment, raw: m as Record<string, unknown>,
      });
      await admin.from("mkt_outreach_contacts").update({ status: "replied" }).eq("id", c.id);
      newReplies++;
    }
  }

  return json({ polled, new_replies: newReplies });
});
