import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useConnectors } from "../hooks/useLookups";
import { sb } from "../lib/sb";
import { it } from "../i18n/it";

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  active: { label: "Attivo", cls: "bg-emerald-100 text-emerald-900" },
  not_configured: { label: "Non configurato", cls: "bg-amber-100 text-amber-900" },
  coming_soon: { label: "Prossimamente", cls: "bg-muted text-muted-foreground" },
};

interface AiHealth {
  status: "active" | "missing_key" | "invalid_key" | "error";
  label: string;
}

function useAiHealth() {
  return useQuery({
    queryKey: ["mkt_ai_health"],
    staleTime: 0,
    retry: false,
    queryFn: async (): Promise<AiHealth> => {
      const { data, error } = await sb.functions.invoke("mkt-ai-health", { body: {} });
      if (data?.status) return data as AiHealth;
      return { status: "error", label: `Errore: ${data?.error ?? error?.message ?? "risposta non valida"}` };
    },
  });
}

export default function Settings() {
  const { data: connectors = [] } = useConnectors();
  const health = useAiHealth();
  const h = health.data;
  const aiCls =
    h?.status === "active"
      ? "bg-emerald-100 text-emerald-900"
      : h?.status === "missing_key"
        ? "bg-amber-100 text-amber-900"
        : h
          ? "bg-red-100 text-red-900"
          : "bg-muted text-muted-foreground";

  // The AI row comes only from the live check, never from the stored registry row.
  const others = connectors.filter((c) => !/lovable ai/i.test(c.connector_name));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{it.nav.settings}</h1>
        <p className="text-sm text-muted-foreground">
          Registro dei connettori. Le chiavi API riservate si configurano nei Secrets di Supabase, non qui.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">AI (Google Gemini)</CardTitle>
            <Badge variant="secondary" className={aiCls}>
              {health.isFetching ? "Verifica in corso..." : h?.label ?? "—"}
            </Badge>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              Stato verificato con una chiamata di test. Chiave: secret GEMINI_API_KEY in Supabase.
            </p>
            <Button size="sm" variant="outline" onClick={() => health.refetch()} disabled={health.isFetching}>
              <RefreshCw className="h-3.5 w-3.5" /> Verifica
            </Button>
          </CardContent>
        </Card>
        {others.map((c) => {
          const s = STATUS_LABEL[c.status] ?? STATUS_LABEL.not_configured;
          return (
            <Card key={c.id} className={c.status === "coming_soon" ? "opacity-60" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">{c.connector_name}</CardTitle>
                <Badge variant="secondary" className={s.cls}>{s.label}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{c.notes ?? "—"}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
