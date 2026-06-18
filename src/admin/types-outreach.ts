export type McpStatus = "pending" | "authenticating" | "ready" | "failed";

export interface MktMcpConnection {
  id: string;
  provider: string;
  email: string | null;
  mcp_url: string;
  oauth_tokens: Record<string, unknown> | null;
  status: McpStatus;
  auth_url: string | null;
  last_error: string | null;
  last_check_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MktOutreachList {
  id: string;
  name: string;
  instagram_target_page: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type Gender = "m" | "f" | "unknown";
export type CityFilter = "milan" | "non_milan" | "any";
export type AgeBucket = "18-24" | "25-34" | "35-44" | "45+" | "unknown" | "any";
export type ContactStatus = "new" | "queued" | "contacted" | "replied" | "skipped" | "failed";

export interface MktOutreachContact {
  id: string;
  list_id: string;
  creator: string | null;
  username: string;
  followers: number | null;
  engagement: number | null;
  er: number | null;
  audience_city: string | null;
  audience_age: string | null;
  avg_reel_plays: number | null;
  avg_views: number | null;
  email: string | null;
  gender: Gender | null;
  age_bucket: AgeBucket | null;
  is_milan: boolean;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export type PresetChannel = "dm" | "comment";

export interface MktDmPreset {
  id: string;
  name: string;
  channel: PresetChannel;
  gender: "m" | "f" | "any";
  city_filter: CityFilter;
  age_bucket: AgeBucket;
  body_template: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type RunStatus = "draft" | "running" | "paused" | "done" | "failed";

export interface RunConfig {
  step_delay_min_sec: number;
  step_delay_max_sec: number;
  contact_delay_min_sec: number;
  contact_delay_max_sec: number;
  daily_cap_dm: number;
  daily_cap_follow: number;
  comment_strategy: "latest" | "latest_of_top_3";
  dry_run: boolean;
  steps: Array<"follow" | "dm" | "comment">;
}

export interface MktOutreachRun {
  id: string;
  list_id: string;
  mcp_connection_id: string | null;
  name: string;
  status: RunStatus;
  config: RunConfig;
  started_at: string | null;
  finished_at: string | null;
  last_tick_at: string | null;
  stats: Record<string, number>;
  created_at: string;
  updated_at: string;
}

export type ActionStep = "follow" | "dm" | "comment";
export type ActionStatus = "pending" | "done" | "failed" | "skipped";

export interface MktOutreachAction {
  id: string;
  run_id: string;
  contact_id: string;
  step: ActionStep;
  step_order: number;
  preset_id: string | null;
  scheduled_for: string;
  status: ActionStatus;
  payload: Record<string, unknown> | null;
  response: Record<string, unknown> | null;
  error: string | null;
  executed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MktOutreachReply {
  id: string;
  action_id: string | null;
  contact_id: string;
  channel: "dm" | "comment";
  text: string | null;
  sentiment: "positive" | "neutral" | "negative" | null;
  received_at: string;
  raw: Record<string, unknown> | null;
  created_at: string;
}
