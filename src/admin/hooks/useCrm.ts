import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";

export const CRM_STAGES = [
  "nuovo",
  "contattato",
  "in_conversazione",
  "demo_fatta",
  "contratto_inviato",
  "firmato",
  "perso",
] as const;
export type CrmStage = (typeof CRM_STAGES)[number];
export const CRM_PERSONAS = ["giulia", "matteo", "lorenzo"] as const;
export const CRM_SOURCES = ["dm", "waitlist", "outreach", "referral", "other"] as const;

export interface CrmOpportunity {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  instagram_handle: string | null;
  persona: string | null;
  source: string;
  stage: CrmStage;
  value_eur: number | null;
  next_step: string | null;
  next_step_date: string | null;
  lost_reason: string | null;
  notes: string | null;
  waitlist_id: string | null;
  sort_order: number;
}

const KEY = ["mkt", "crm", "opportunities"];

export function useCrmOpportunities() {
  return useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const { data, error } = await sb
        .from("mkt_crm_opportunities")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as CrmOpportunity[];
    },
  });
}

export function useSaveOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (o: Partial<CrmOpportunity>) => {
      const { id, created_at, updated_at, ...rest } = o as any;
      if (id) {
        const { error } = await sb.from("mkt_crm_opportunities").update(rest).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await sb.from("mkt_crm_opportunities").insert(rest);
        if (error) throw error;
      }
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

/** Optimistic stage/order move used by drag & drop. */
export function useMoveOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: { id: string; stage: CrmStage; sort_order: number; lost_reason?: string | null }) => {
      const { id, ...patch } = p;
      const { error } = await sb.from("mkt_crm_opportunities").update(patch).eq("id", id);
      if (error) throw error;
    },
    onMutate: async (p) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<CrmOpportunity[]>(KEY);
      qc.setQueryData<CrmOpportunity[]>(KEY, (rows) =>
        (rows ?? []).map((r) => (r.id === p.id ? { ...r, ...p } : r))
      );
      return { prev };
    },
    onError: (_e, _p, ctx) => ctx?.prev && qc.setQueryData(KEY, ctx.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_crm_opportunities").delete().eq("id", id);
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

/** Opportunities already created from the given waitlist signups, keyed by waitlist_id. */
export function useOpportunitiesForWaitlist(ids: string[]) {
  return useQuery({
    queryKey: ["mkt", "crm", "byWaitlist", ids],
    enabled: ids.length > 0,
    queryFn: async () => {
      const { data, error } = await sb.from("mkt_crm_opportunities").select("id,waitlist_id").in("waitlist_id", ids);
      if (error) throw error;
      const m: Record<string, string> = {};
      (data ?? []).forEach((r: any) => (m[r.waitlist_id] = r.id));
      return m;
    },
  });
}

export class AlreadyPromotedError extends Error {}

/** Creates a CRM opportunity from a waitlist signup. Never writes to the waitlist row. */
export function usePromoteWaitlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (w: { id: string; full_name: string; email: string; phone: string | null; city: string | null }) => {
      const { data: existing, error: e1 } = await sb
        .from("mkt_crm_opportunities").select("id").eq("waitlist_id", w.id).limit(1);
      if (e1) throw e1;
      if (existing?.length) throw new AlreadyPromotedError();
      const { data: last } = await sb
        .from("mkt_crm_opportunities").select("sort_order").eq("stage", "nuovo")
        .order("sort_order", { ascending: false }).limit(1);
      const sort_order = last?.length ? Number(last[0].sort_order) + 1 : 1;
      const { error } = await sb.from("mkt_crm_opportunities").insert({
        full_name: w.full_name, email: w.email, phone: w.phone, city: w.city,
        source: "waitlist", stage: "nuovo", waitlist_id: w.id, sort_order,
      });
      if (error) throw error;
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["mkt", "crm"] }),
  });
}
