import { sb } from "./sb";

export type AiMode = "generate" | "rewrite" | "shorten" | "retone";

export interface GenerateCopyResult {
  generation: {
    id: string;
    content_id: string;
    gen_type: "copy";
    output: string;
    is_selected: boolean;
    created_at: string;
  };
}

/**
 * Calls the `mkt-generate-copy` edge function. The function builds the system
 * prompt from the post + persona + active brand docs and appends every result
 * to mkt_generations (no row is ever overwritten).
 *
 * TODO(v3): expose an agentic variant that can also write back to the DB.
 */
export async function generateCopy(postId: string, mode: AiMode): Promise<GenerateCopyResult> {
  const { data, error } = await sb.functions.invoke("mkt-generate-copy", {
    body: { postId, mode },
  });
  if (error) throw new Error(error.message || "AI request failed");
  if (data?.error) throw new Error(data.error);
  return data as GenerateCopyResult;
}
