import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sb } from "../lib/sb";
import { applyTextBatches, TEXT_FIELDS, type TextChange, type TextValues } from "../lib/contentTextUpdate";

export function useContentTextUpdate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ changes, onProgress }: { changes: TextChange[]; onProgress: (completed: number) => void }) =>
      applyTextBatches(changes, async (change) => {
        const patch: Partial<TextValues> = {};
        for (const field of TEXT_FIELDS) {
          if (Object.prototype.hasOwnProperty.call(change.patch, field)) patch[field] = change.patch[field];
        }
        let query = sb.from("mkt_content").update(patch).eq("id", change.id).eq("plan_phase_id", change.phaseId).eq("sequence_number", change.sequence);
        // Do not overwrite edits made after the preview/backup was generated.
        for (const field of Object.keys(patch) as (keyof TextValues)[]) {
          query = change.before[field] === null ? query.is(field, null) : query.eq(field, change.before[field]);
        }
        const { data, error } = await query.select("id").single();
        if (error || !data) throw new Error("Post modificato nel frattempo o aggiornamento non consentito. Ricarica l'anteprima.");
      }, onProgress),
    onSettled: () => qc.invalidateQueries({ queryKey: ["mkt_content"] }),
  });
}