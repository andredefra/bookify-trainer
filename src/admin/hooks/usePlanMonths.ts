import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";
import type { MktPlanMonth } from "../types";

const KEY = ["mkt_plan_months"];

export function usePlanMonths() {
  return useQuery({
    queryKey: KEY,
    queryFn: async (): Promise<MktPlanMonth[]> => {
      const { data, error } = await sb
        .from("mkt_plan_months")
        .select("*")
        .order("month_index", { ascending: true });
      if (error) throw error;
      return (data ?? []) as MktPlanMonth[];
    },
  });
}

export function useCreatePlanMonth() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { start_date: string; end_date: string; label?: string | null }) => {
      const { data: existing } = await sb
        .from("mkt_plan_months")
        .select("month_index")
        .order("month_index", { ascending: false })
        .limit(1);
      const next = (existing?.[0]?.month_index ?? 0) + 1;
      const { data, error } = await sb
        .from("mkt_plan_months")
        .insert({
          month_index: next,
          label: input.label ?? `Mese ${next}`,
          start_date: input.start_date,
          end_date: input.end_date,
          status: "open",
        })
        .select()
        .single();
      if (error) throw error;
      return data as MktPlanMonth;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useUpdatePlanMonth() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<MktPlanMonth> }) => {
      const { data, error } = await sb
        .from("mkt_plan_months")
        .update(patch)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as MktPlanMonth;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useClosePlanMonth() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb
        .from("mkt_plan_months")
        .update({ status: "closed", closed_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
