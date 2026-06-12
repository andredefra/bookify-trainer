import { sb } from "./sb";
import type { PostDiffProposal } from "../types";

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

export async function generateCopy(postId: string, mode: AiMode): Promise<GenerateCopyResult> {
  const { data, error } = await sb.functions.invoke("mkt-generate-copy", {
    body: { postId, mode },
  });
  if (error) throw new Error(error.message || "AI request failed");
  if (data?.error) throw new Error(data.error);
  return data as GenerateCopyResult;
}

export interface ScheduleMonthResult {
  scheduled: number;
  assignments: Array<{ id: string; scheduled_date: string; scheduled_time: string }>;
}

export async function scheduleMonth(monthId: string): Promise<ScheduleMonthResult> {
  const { data, error } = await sb.functions.invoke("mkt-schedule-month", {
    body: { monthId },
  });
  if (error) throw new Error(error.message || "AI scheduling failed");
  if (data?.error) throw new Error(data.error);
  return data as ScheduleMonthResult;
}

export interface ChatPostResult {
  reply: string;
  proposals: PostDiffProposal[];
}

/** Contextual chat for a single post draft. Returns AI reply + field-level diff proposals. */
export async function chatPost(
  postId: string,
  history: Array<{ role: "user" | "assistant"; content: string }>,
  userMessage: string
): Promise<ChatPostResult> {
  const { data, error } = await sb.functions.invoke("mkt-chat-post", {
    body: { postId, history, message: userMessage },
  });
  if (error) throw new Error(error.message || "AI chat failed");
  if (data?.error) throw new Error(data.error);
  return data as ChatPostResult;
}

/** Triggers async AI processing for a brand doc (classify + recap + persona extraction). */
export async function processBrandDoc(docId: string): Promise<{ ok: true }> {
  const { data, error } = await sb.functions.invoke("mkt-process-brand-doc", {
    body: { docId },
  });
  if (error) throw new Error(error.message || "Doc processing failed to start");
  if (data?.error) throw new Error(data.error);
  return data as { ok: true };
}
