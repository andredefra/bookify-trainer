// Outreach execution engine.
// op=generate: creates pending actions (follow/dm/comment) for all `new` contacts in a run, with randomized delays.
// op=tick: picks due `pending` actions, executes them (or dry-run), respects daily caps, updates statuses.
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

function rand(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min));
}

interface Preset {
  id: string; channel: "dm" | "comment"; gender: "m" | "f" | "any";
  city_filter: "milan" | "non_milan" | "any"; age_bucket: string; body_template: string; is_active: boolean;
}

function scorePreset(p: Preset, c: { gender: string | null; is_milan: boolean; age_bucket: string | null }, channel: "dm" | "comment"): number {
  if (p.channel !== channel || !p.is_active) return -1;
  let s = 0;
  if (p.gender === "any") s += 1; else if (p.gender === c.gender) s += 5; else return -1;
  const cityWanted = c.is_milan ? "milan" : "non_milan";
  if (p.city_filter === "any") s += 1; else if (p.city_filter === cityWanted) s += 4; else return -1;
  if (p.age_bucket === "any") s += 1; else if (p.age_bucket === c.age_bucket) s += 3;
  return s;
}

function pickPreset(presets: Preset[], contact: { gender: string | null; is_milan: boolean; age_bucket: string | null }, channel: "dm" | "comment"): Preset | null {
  let best: Preset | null = null;
  let bestScore = -1;
  for (const p of presets) {
    const s = scorePreset(p, contact, channel);
    if (s > bestScore) { bestScore = s; best = p; }
  }
  return best;
}

function fillTemplate(tpl: string, c: { creator: string | null; username: string }) {
  return tpl.replace(/\{\{creator\}\}/g, c.creator ?? c.username).replace(/\{\{username\}\}/g, c.username);
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
  return { ok: res.ok, status: res.status, payload };
}

// Map outreach step → expected Composio Instagram tool name.
// Real Composio tool names should be configured later; these defaults cover common variants.
function toolNameFor(step: string): string {
  if (step === "follow") return "INSTAGRAM_FOLLOW_USER";
  if (step === "dm") return "INSTAGRAM_SEND_DM";
  if (step === "comment") return "INSTAGRAM_COMMENT_ON_POST";
  return step;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");
  const { data: userRes } = await admin.auth.getUser(token);
  const email = userRes?.user?.email ?? null;
  if (!email) return json({ error: "Unauthenticated" }, 401);
  const { data: adminRow } = await admin.from("mkt_admins").select("id").ilike("email", email).maybeSingle();
  if (!adminRow) return json({ error: "Forbidden" }, 403);

  let body: { op?: string; runId?: string } = {};
  try { body = await req.json(); } catch { /* noop */ }

  // -------- op: generate --------
  if (body.op === "generate") {
    if (!body.runId) return json({ error: "runId required" }, 400);
    const { data: run } = await admin.from("mkt_outreach_runs").select("*").eq("id", body.runId).maybeSingle();
    if (!run) return json({ error: "Run not found" }, 404);

    const { data: contacts } = await admin.from("mkt_outreach_contacts").select("*")
      .eq("list_id", run.list_id).eq("status", "new");

    const { data: presets } = await admin.from("mkt_dm_presets").select("*").eq("is_active", true);

    const cfg = run.config ?? {};
    const steps: string[] = Array.isArray(cfg.steps) ? cfg.steps : ["follow", "dm", "comment"];
    const stepMinSec = cfg.step_delay_min_sec ?? 30;
    const stepMaxSec = cfg.step_delay_max_sec ?? 120;
    const contactMinSec = cfg.contact_delay_min_sec ?? 120;
    const contactMaxSec = cfg.contact_delay_max_sec ?? 600;

    const now = Date.now();
    let cursor = now;
    const inserts: Record<string, unknown>[] = [];

    for (const c of contacts ?? []) {
      let stepCursor = cursor;
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i] as "follow" | "dm" | "comment";
        let presetId: string | null = null;
        if (step === "dm" || step === "comment") {
          const p = pickPreset((presets ?? []) as Preset[], c, step);
          presetId = p?.id ?? null;
        }
        inserts.push({
          run_id: run.id, contact_id: c.id, step, step_order: i, preset_id: presetId,
          scheduled_for: new Date(stepCursor).toISOString(), status: "pending",
        });
        stepCursor += rand(stepMinSec, stepMaxSec) * 1000;
      }
      // mark contact as queued
      await admin.from("mkt_outreach_contacts").update({ status: "queued" }).eq("id", c.id);
      cursor = stepCursor + rand(contactMinSec, contactMaxSec) * 1000;
    }

    if (inserts.length > 0) {
      const { error } = await admin.from("mkt_outreach_actions").insert(inserts);
      if (error) return json({ error: error.message }, 500);
    }
    return json({ created: inserts.length });
  }

  // -------- op: tick --------
  if (body.op === "tick" || !body.op) {
    // Pick due actions for one run (or any) up to a small batch
    let q = admin.from("mkt_outreach_actions").select("*")
      .eq("status", "pending").lte("scheduled_for", new Date().toISOString())
      .order("scheduled_for").limit(10);
    if (body.runId) q = q.eq("run_id", body.runId);
    const { data: due } = await q;

    let executed = 0, failed = 0;
    for (const a of due ?? []) {
      const { data: run } = await admin.from("mkt_outreach_runs").select("*").eq("id", a.run_id).maybeSingle();
      if (!run || run.status !== "running") continue;

      // Daily cap check
      const todayStart = new Date(); todayStart.setUTCHours(0, 0, 0, 0);
      const cap = a.step === "dm" ? (run.config?.daily_cap_dm ?? 30)
                : a.step === "follow" ? (run.config?.daily_cap_follow ?? 50)
                : 9999;
      const { count } = await admin.from("mkt_outreach_actions").select("*", { count: "exact", head: true })
        .eq("run_id", run.id).eq("step", a.step).eq("status", "done").gte("executed_at", todayStart.toISOString());
      if ((count ?? 0) >= cap) {
        // postpone 6h
        await admin.from("mkt_outreach_actions").update({
          scheduled_for: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
        }).eq("id", a.id);
        continue;
      }

      const { data: contact } = await admin.from("mkt_outreach_contacts").select("*").eq("id", a.contact_id).maybeSingle();
      if (!contact) continue;

      let textBody: string | null = null;
      if (a.preset_id) {
        const { data: preset } = await admin.from("mkt_dm_presets").select("*").eq("id", a.preset_id).maybeSingle();
        if (preset) textBody = fillTemplate(preset.body_template, contact);
      }

      const payload = { username: contact.username, text: textBody };
      const dryRun = !!run.config?.dry_run;

      try {
        if (dryRun || !run.mcp_connection_id) {
          await admin.from("mkt_outreach_actions").update({
            status: "done", executed_at: new Date().toISOString(),
            payload, response: { dry_run: true },
          }).eq("id", a.id);
          executed++;
        } else {
          const { data: conn } = await admin.from("mkt_mcp_connections").select("*").eq("id", run.mcp_connection_id).maybeSingle();
          if (!conn) throw new Error("MCP connection missing");
          const tokens = (conn.oauth_tokens ?? {}) as Record<string, unknown>;
          const authToken = (tokens.access_token as string | undefined) ?? (tokens.api_key as string | undefined) ?? null;
          const args: Record<string, unknown> = { username: contact.username };
          if (a.step === "dm") args.message = textBody;
          if (a.step === "comment") args.text = textBody;
          const r = await mcpCallTool(conn.mcp_url, authToken, toolNameFor(a.step), args);
          if (!r.ok) throw new Error(`MCP ${r.status}`);
          await admin.from("mkt_outreach_actions").update({
            status: "done", executed_at: new Date().toISOString(),
            payload, response: r.payload as Record<string, unknown>,
          }).eq("id", a.id);
          executed++;
        }

        // mark contact contacted after first DM
        if (a.step === "dm") {
          await admin.from("mkt_outreach_contacts").update({ status: "contacted" }).eq("id", contact.id);
        }
      } catch (e) {
        failed++;
        await admin.from("mkt_outreach_actions").update({
          status: "failed", executed_at: new Date().toISOString(),
          payload, error: (e as Error).message,
        }).eq("id", a.id);
      }
    }

    return json({ executed, failed });
  }

  return json({ error: "Unknown op" }, 400);
});
