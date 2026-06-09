import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";
import type { MktContent, MktStatus } from "../types";

const KEY = ["mkt_content"];

export function useContent() {
  return useQuery({
    queryKey: KEY,
    queryFn: async (): Promise<MktContent[]> => {
      const { data, error } = await sb
        .from("mkt_content")
        .select("*")
        .order("scheduled_date", { ascending: true, nullsFirst: false })
        .order("scheduled_time", { ascending: true, nullsFirst: true });
      if (error) throw error;
      return (data ?? []) as MktContent[];
    },
  });
}

export function useUpdateContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<MktContent> }) => {
      const { data, error } = await sb.from("mkt_content").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data as MktContent;
    },
    onMutate: async ({ id, patch }) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<MktContent[]>(KEY);
      qc.setQueryData<MktContent[]>(KEY, (old) =>
        (old ?? []).map((c) => (c.id === id ? { ...c, ...patch } : c))
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useCreateContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (patch: Partial<MktContent>) => {
      const { data, error } = await sb
        .from("mkt_content")
        .insert({ status: "Draft" as MktStatus, ...patch })
        .select()
        .single();
      if (error) throw error;
      return data as MktContent;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await sb.from("mkt_content").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useBulkCreateContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rows: Partial<MktContent>[]) => {
      const payload = rows.map((r) => ({ status: "Draft" as MktStatus, ...r }));
      const { data, error } = await sb.from("mkt_content").insert(payload).select();
      if (error) throw error;
      return data as MktContent[];
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
