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

/** Distribute Validated posts of a month across [start_date, end_date] using AI. */
export async function scheduleMonth(monthId: string): Promise<ScheduleMonthResult> {
  const { data, error } = await sb.functions.invoke("mkt-schedule-month", {
    body: { monthId },
  });
  if (error) throw new Error(error.message || "AI scheduling failed");
  if (data?.error) throw new Error(data.error);
  return data as ScheduleMonthResult;
}
