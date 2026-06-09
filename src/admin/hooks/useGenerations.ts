import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";
import type { MktGeneration, MktContent } from "../types";

export function useGenerations(contentId: string | null) {
  return useQuery({
    queryKey: ["mkt_generations", contentId],
    enabled: !!contentId,
    queryFn: async (): Promise<MktGeneration[]> => {
      const { data, error } = await sb
        .from("mkt_generations")
        .select("*")
        .eq("content_id", contentId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as MktGeneration[];
    },
  });
}

export function useSelectGeneration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ generation }: { generation: MktGeneration }) => {
      await sb.from("mkt_generations").update({ is_selected: false }).eq("content_id", generation.content_id);
      const { error } = await sb.from("mkt_generations").update({ is_selected: true }).eq("id", generation.id);
      if (error) throw error;
      const patch: Partial<MktContent> =
        generation.gen_type === "media_prompt"
          ? { media_prompt: generation.output }
          : { post_copy: generation.output };
      const { error: e2 } = await sb.from("mkt_content").update(patch).eq("id", generation.content_id);
      if (e2) throw e2;
    },
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ["mkt_generations", v.generation.content_id] });
      qc.invalidateQueries({ queryKey: ["mkt_content"] });
    },
  });
}
