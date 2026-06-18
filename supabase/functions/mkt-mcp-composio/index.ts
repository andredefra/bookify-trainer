// MCP gateway for Composio Instagram tools.
// Operations: list_tools, call_tool
// We talk to the MCP server over HTTP using JSON-RPC 2.0 (Streamable HTTP transport).
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

async function mcpRequest(url: string, method: string, params: unknown, authToken?: string | null) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // MCP Streamable HTTP requires both
    "Accept": "application/json, text/event-stream",
  };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  const res = await fetch(url, {
    method: "POST", headers,
    body: JSON.stringify({ jsonrpc: "2.0", id: crypto.randomUUID(), method, params }),
  });
  const ct = res.headers.get("content-type") ?? "";
  let payload: unknown;
  if (ct.includes("text/event-stream")) {
    const text = await res.text();
    // Parse SSE: take last `data:` line
    const lines = text.split("\n").filter((l) => l.startsWith("data:"));
    const last = lines[lines.length - 1]?.slice(5).trim() ?? "{}";
    try { payload = JSON.parse(last); } catch { payload = { raw: text }; }
  } else {
    try { payload = await res.json(); } catch { payload = { raw: await res.text() }; }
  }
  return { ok: res.ok, status: res.status, payload };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Admin gate
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  const { data: userRes } = await admin.auth.getUser(token);
  const email = userRes?.user?.email ?? null;
  if (!email) return json({ error: "Unauthenticated" }, 401);
  const { data: adminRow } = await admin.from("mkt_admins").select("id").ilike("email", email).maybeSingle();
  if (!adminRow) return json({ error: "Forbidden" }, 403);

  let body: { op?: string; connectionId?: string; toolName?: string; arguments?: Record<string, unknown> } = {};
  try { body = await req.json(); } catch { /* noop */ }

  if (!body.connectionId) return json({ error: "connectionId required" }, 400);

  const { data: conn, error: cErr } = await admin
    .from("mkt_mcp_connections").select("*").eq("id", body.connectionId).maybeSingle();
  if (cErr || !conn) return json({ error: "Connection not found" }, 404);

  const tokens = (conn.oauth_tokens ?? {}) as Record<string, unknown>;
  const authToken = (tokens.access_token as string | undefined) ?? (tokens.api_key as string | undefined) ?? null;

  if (body.op === "list_tools") {
    const r = await mcpRequest(conn.mcp_url, "tools/list", {}, authToken);
    const tools = (r.payload as { result?: { tools?: Array<{ name: string }> } })?.result?.tools ?? [];
    const names = tools.map((t) => t.name);
    await admin.from("mkt_mcp_connections").update({
      status: r.ok ? "ready" : "failed",
      last_check_at: new Date().toISOString(),
      last_error: r.ok ? null : `HTTP ${r.status}: ${JSON.stringify(r.payload).slice(0, 300)}`,
    }).eq("id", conn.id);
    return json({ ok: r.ok, tools: names, raw: r.payload });
  }

  if (body.op === "call_tool") {
    if (!body.toolName) return json({ error: "toolName required" }, 400);
    const r = await mcpRequest(conn.mcp_url, "tools/call", {
      name: body.toolName, arguments: body.arguments ?? {},
    }, authToken);
    return json({ ok: r.ok, status: r.status, result: r.payload });
  }

  return json({ error: "Unknown op" }, 400);
});
