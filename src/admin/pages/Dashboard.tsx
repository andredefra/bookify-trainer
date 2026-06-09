import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { usePersonas } from "../hooks/useLookups";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { it } from "../i18n/it";
import type { MktContent, MktStatus } from "../types";

function formatDateTime(d?: string | null, t?: string | null) {
  if (!d) return "—";
  const time = t ? t.slice(0, 5) : "";
  return `${d}${time ? " · " + time : ""}`;
}

const STATUSES: MktStatus[] = ["Draft", "Approval", "Validated", "Scheduled", "Posted"];

export default function Dashboard() {
  const { data: posts = [] } = useContent();
  const { data: personas = [] } = usePersonas();

  const counts = useMemo(() => {
    const m: Record<MktStatus, number> = { Draft: 0, Approval: 0, Validated: 0, Scheduled: 0, Posted: 0 };
    posts.forEach((p) => {
      m[p.status as MktStatus] = (m[p.status as MktStatus] ?? 0) + 1;
    });
    return m;
  }, [posts]);

  const validated = useMemo(
    () =>
      posts
        .filter((p) => p.status === "Validated" && p.scheduled_date)
        .sort((a, b) =>
          `${a.scheduled_date}T${a.scheduled_time ?? "00:00"}`.localeCompare(
            `${b.scheduled_date}T${b.scheduled_time ?? "00:00"}`
          )
        ),
    [posts]
  );
  const next: MktContent | undefined = validated[0];
  const nextPersona = personas.find((p) => p.id === next?.persona_id);

  const upcoming = useMemo(() => {
    const upcomingPosts = posts.filter(
      (p) => (p.status === "Validated" || p.status === "Posted") && p.persona_id
    );
    const byPersona = new Map<string, number>();
    upcomingPosts.forEach((p) => {
      if (p.persona_id) byPersona.set(p.persona_id, (byPersona.get(p.persona_id) ?? 0) + 1);
    });
    const total = upcomingPosts.length || 1;
    return personas.map((p) => ({
      name: p.name,
      pct: Math.round(((byPersona.get(p.id) ?? 0) / total) * 100),
    }));
  }, [posts, personas]);

  const thisWeek = useMemo(() => {
    const now = new Date();
    const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return posts.filter((p) => {
      if (!p.scheduled_date) return false;
      const d = new Date(p.scheduled_date);
      return d >= new Date(now.toDateString()) && d <= in7;
    });
  }, [posts]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{it.nav.dashboard}</h1>
        <p className="text-sm text-muted-foreground">Panoramica del calendario editoriale.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Prossimo post da pubblicare</CardTitle>
        </CardHeader>
        <CardContent>
          {next ? (
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-medium">{formatDateTime(next.scheduled_date, next.scheduled_time)}</p>
                <p className="text-sm text-muted-foreground">
                  {nextPersona?.name ?? "—"} · {next.content_format ?? "—"}
                </p>
              </div>
              <Link to="/admin/calendar">
                <Button size="sm">Vai alla Publishing Card</Button>
              </Link>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nessun post validato in coda.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATUSES.map((s) => (
          <Card key={s}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{it.status[s]}</p>
              <p className="text-2xl font-semibold mt-1">{counts[s]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bilanciamento persona (Validated + Posted)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">{it.common.empty}</p>
          ) : (
            upcoming.map((u) => (
              <div key={u.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{u.name}</span>
                  <span className="text-muted-foreground">{u.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${u.pct}%` }} />
                </div>
              </div>
            ))
          )}
          <p className="text-xs text-muted-foreground pt-2">
            Suggerimento: distribuzione bilanciata ≈ {Math.round(100 / Math.max(1, personas.length))}% per persona.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Questa settimana</CardTitle>
        </CardHeader>
        <CardContent>
          {thisWeek.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nessun post nei prossimi 7 giorni.</p>
          ) : (
            <ul className="divide-y">
              {thisWeek.map((p) => {
                const persona = personas.find((x) => x.id === p.persona_id);
                return (
                  <li key={p.id} className="py-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{p.hook || p.post_copy?.slice(0, 60) || "—"}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(p.scheduled_date, p.scheduled_time)} · {persona?.name ?? "—"} ·{" "}
                        {p.content_format ?? "—"}
                      </p>
                    </div>
                    <Badge variant="secondary">{it.status[p.status as MktStatus]}</Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
