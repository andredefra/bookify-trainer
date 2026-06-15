import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";
import type { MktPlanPhase } from "../types";

const KEY = ["mkt_plan_phases"];

// NOTE: the underlying table was renamed from `mkt_plan_months` → `mkt_plan_phases`
// (and `month_index` → `phase_index`). Until generated types catch up we cast
// the typed client to access the new identifiers.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const t = sb as any;

export function usePlanPhases() {
  return useQuery({
    queryKey: KEY,
    queryFn: async (): Promise<MktPlanPhase[]> => {
      const { data, error } = await t
        .from("mkt_plan_phases")
        .select("*")
        .order("phase_index", { ascending: true });
      if (error) throw error;
      return (data ?? []) as MktPlanPhase[];
    },
  });
}

export function useCreatePlanPhase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      label?: string | null;
      description?: string | null;
      target_post_count?: number | null;
    }) => {
      const { data: existing } = await t
        .from("mkt_plan_phases")
        .select("phase_index")
        .order("phase_index", { ascending: false })
        .limit(1);
      const next = (existing?.[0]?.phase_index ?? 0) + 1;
      const { data, error } = await t
        .from("mkt_plan_phases")
        .insert({
          phase_index: next,
          label: input.label ?? `Fase ${next}`,
          description: input.description ?? null,
          target_post_count: input.target_post_count ?? null,
          status: "open",
        })
        .select()
        .single();
      if (error) throw error;
      return data as MktPlanPhase;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useUpdatePlanPhase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<MktPlanPhase> }) => {
      const { data, error } = await t
        .from("mkt_plan_phases")
        .update(patch)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as MktPlanPhase;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useClosePlanPhase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await t
        .from("mkt_plan_phases")
        .update({ status: "closed", closed_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
