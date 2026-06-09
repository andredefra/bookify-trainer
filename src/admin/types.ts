export type MktStatus = "Draft" | "Approval" | "Validated" | "Scheduled" | "Posted";
export type MktGenType = "copy" | "media_prompt";
export type MktMonthStatus = "open" | "closed";

export interface MktPlanMonth {
  id: string;
  month_index: number;
  label: string | null;
  start_date: string;
  end_date: string;
  status: MktMonthStatus;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MktPersona {
  id: string;
  name: string;
  age_range: string | null;
  description: string | null;
  pain: string | null;
  solution: string | null;
  copy_focus: string | null;
  created_at: string;
}

export interface MktContent {
  id: string;
  plan_month_id: string | null;
  sequence_number: number | null;
  scheduled_date: string | null;
  scheduled_time: string | null;
  social_channel: string | null;
  persona_id: string | null;
  funnel_stage: string | null;
  content_format: string | null;
  content_type: string | null;
  objective: string | null;
  situation: string | null;
  hook: string | null;
  post_copy: string | null;
  cta: string | null;
  media_prompt: string | null;
  media_url: string | null;
  status: MktStatus;
  published_link: string | null;
  views: number | null;
  dms_received: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface MktGeneration {
  id: string;
  content_id: string;
  gen_type: MktGenType;
  output: string;
  is_selected: boolean;
  created_at: string;
}

export interface MktBrandDoc {
  id: string;
  title: string;
  doc_type: string | null;
  content: string | null;
  file_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface MktBrandAsset {
  id: string;
  name: string;
  asset_type: string | null;
  file_url: string | null;
  hex: string | null;
  notes: string | null;
  created_at: string;
}

export interface MktConnector {
  id: string;
  connector_name: string;
  status: "active" | "not_configured" | "coming_soon" | string;
  config: Record<string, unknown> | null;
  notes: string | null;
  created_at: string;
}

/** A post is fully locked when Posted or its month is closed. */
export function isPostReadOnly(post: MktContent, month?: MktPlanMonth | null): boolean {
  if (post.status === "Posted") return true;
  if (month?.status === "closed") return true;
  return false;
}
