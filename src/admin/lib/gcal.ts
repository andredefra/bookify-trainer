import type { MktContent, MktPersona } from "../types";

/**
 * Builds a Google Calendar "TEMPLATE" URL the operator can click to add a
 * reminder event for a scheduled IG post. 15-min event in UTC, no OAuth.
 */
export function buildGoogleCalendarLink(post: MktContent, persona?: MktPersona | null): string | null {
  if (!post.scheduled_date) return null;
  const time = post.scheduled_time ?? "09:00:00";
  const [hh, mm] = time.split(":");
  const start = new Date(`${post.scheduled_date}T${hh}:${mm ?? "00"}:00`);
  if (Number.isNaN(start.getTime())) return null;
  const end = new Date(start.getTime() + 15 * 60 * 1000);

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const text = `POST IG — ${persona?.name ?? "MyPersonal"} (${post.content_format ?? "Post"})`;
  const details = `Copia il testo e scarica il media dal pannello admin, poi pubblica su Instagram.\n\n${post.post_copy ?? ""}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text,
    dates: `${fmt(start)}/${fmt(end)}`,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
