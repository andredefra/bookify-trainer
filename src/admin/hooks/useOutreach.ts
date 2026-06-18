import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";
import type {
  MktMcpConnection, MktOutreachList, MktOutreachContact,
  MktDmPreset, MktOutreachRun, MktOutreachAction, MktOutreachReply,
} from "../types-outreach";

// ===== MCP connections =====
export function useMcpConnections() {
  return useQuery({
    queryKey: ["mkt_mcp_connections"],
    queryFn: async (): Promise<MktMcpConnection[]> => {
      const { data, error } = await sb.from("mkt_mcp_connections").select("*").order("created_at");
      if (error) throw error;
      return (data ?? []) as MktMcpConnection[];
    },
  });
}

export function useUpsertMcpConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { id?: string; provider: string; email: string | null; mcp_url: string; oauth_tokens?: Record<string, unknown> | null }) => {
      if (input.id) {
        const { data, error } = await sb.from("mkt_mcp_connections")
          .update({ email: input.email, mcp_url: input.mcp_url, oauth_tokens: input.oauth_tokens ?? null })
          .eq("id", input.id).select().single();
        if (error) throw error;
        return data;
      }
      const { data, error } = await sb.from("mkt_mcp_connections").insert({
        provider: input.provider, email: input.email, mcp_url: input.mcp_url,
        oauth_tokens: input.oauth_tokens ?? null, status: input.oauth_tokens ? "ready" : "pending",
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_mcp_connections"] }),
  });
}

export function useDeleteMcpConnection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_mcp_connections").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_mcp_connections"] }),
  });
}

export async function testMcpConnection(id: string): Promise<{ ok: boolean; tools: string[]; error?: string }> {
  const { data, error } = await sb.functions.invoke("mkt-mcp-composio", { body: { op: "list_tools", connectionId: id } });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data;
}

// ===== Lists =====
export function useOutreachLists() {
  return useQuery({
    queryKey: ["mkt_outreach_lists"],
    queryFn: async (): Promise<MktOutreachList[]> => {
      const { data, error } = await sb.from("mkt_outreach_lists").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MktOutreachList[];
    },
  });
}

export function useCreateList() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { name: string; instagram_target_page?: string | null }) => {
      const { data, error } = await sb.from("mkt_outreach_lists").insert(input).select().single();
      if (error) throw error;
      return data as MktOutreachList;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_outreach_lists"] }),
  });
}

export function useDeleteList() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_outreach_lists").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_outreach_lists"] }),
  });
}

// ===== Contacts =====
export function useOutreachContacts(listId: string | null) {
  return useQuery({
    queryKey: ["mkt_outreach_contacts", listId],
    enabled: !!listId,
    queryFn: async (): Promise<MktOutreachContact[]> => {
      const { data, error } = await sb.from("mkt_outreach_contacts").select("*")
        .eq("list_id", listId).order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MktOutreachContact[];
    },
  });
}

export function useBulkInsertContacts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rows: Array<Partial<MktOutreachContact> & { list_id: string; username: string }>) => {
      const { data, error } = await sb.from("mkt_outreach_contacts")
        .upsert(rows, { onConflict: "list_id,username" }).select();
      if (error) throw error;
      return data;
    },
    onSuccess: (_d, vars) => {
      qc.invalidateQueries({ queryKey: ["mkt_outreach_contacts", vars[0]?.list_id] });
    },
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_outreach_contacts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_outreach_contacts"] }),
  });
}

// ===== DM presets =====
export function useDmPresets() {
  return useQuery({
    queryKey: ["mkt_dm_presets"],
    queryFn: async (): Promise<MktDmPreset[]> => {
      const { data, error } = await sb.from("mkt_dm_presets").select("*").order("created_at");
      if (error) throw error;
      return (data ?? []) as MktDmPreset[];
    },
  });
}

export function useUpsertPreset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Partial<MktDmPreset> & { name: string; body_template: string }) => {
      if (input.id) {
        const { data, error } = await sb.from("mkt_dm_presets").update(input).eq("id", input.id).select().single();
        if (error) throw error;
        return data;
      }
      const { data, error } = await sb.from("mkt_dm_presets").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_dm_presets"] }),
  });
}

export function useDeletePreset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_dm_presets").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_dm_presets"] }),
  });
}

// ===== Runs =====
export function useOutreachRuns() {
  return useQuery({
    queryKey: ["mkt_outreach_runs"],
    queryFn: async (): Promise<MktOutreachRun[]> => {
      const { data, error } = await sb.from("mkt_outreach_runs").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MktOutreachRun[];
    },
  });
}

export function useCreateRun() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { name: string; list_id: string; mcp_connection_id: string | null; config?: Record<string, unknown> }) => {
      const { data, error } = await sb.from("mkt_outreach_runs").insert({
        name: input.name, list_id: input.list_id, mcp_connection_id: input.mcp_connection_id,
        status: "draft", ...(input.config ? { config: input.config } : {}),
      }).select().single();
      if (error) throw error;
      return data as MktOutreachRun;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_outreach_runs"] }),
  });
}

export function useUpdateRunStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const patch: Record<string, unknown> = { status };
      if (status === "running") patch.started_at = new Date().toISOString();
      if (status === "done") patch.finished_at = new Date().toISOString();
      const { error } = await sb.from("mkt_outreach_runs").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mkt_outreach_runs"] }),
  });
}

export async function generateRunActions(runId: string): Promise<{ created: number }> {
  const { data, error } = await sb.functions.invoke("mkt-outreach-execute", { body: { op: "generate", runId } });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data;
}

export async function tickRunActions(runId?: string): Promise<{ executed: number; failed: number }> {
  const { data, error } = await sb.functions.invoke("mkt-outreach-execute", { body: { op: "tick", runId } });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data;
}

export async function pollReplies(): Promise<{ polled: number; new_replies: number }> {
  const { data, error } = await sb.functions.invoke("mkt-outreach-poll-replies", { body: {} });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data;
}

// ===== Actions / Replies =====
export function useRunActions(runId: string | null) {
  return useQuery({
    queryKey: ["mkt_outreach_actions", runId],
    enabled: !!runId,
    queryFn: async (): Promise<MktOutreachAction[]> => {
      const { data, error } = await sb.from("mkt_outreach_actions").select("*")
        .eq("run_id", runId).order("scheduled_for");
      if (error) throw error;
      return (data ?? []) as MktOutreachAction[];
    },
  });
}

export function useReplies() {
  return useQuery({
    queryKey: ["mkt_outreach_replies"],
    queryFn: async (): Promise<MktOutreachReply[]> => {
      const { data, error } = await sb.from("mkt_outreach_replies").select("*")
        .order("received_at", { ascending: false }).limit(200);
      if (error) throw error;
      return (data ?? []) as MktOutreachReply[];
    },
  });
}
