import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useConnectors } from "../hooks/useLookups";
import { it } from "../i18n/it";

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  active: { label: "Attivo", cls: "bg-emerald-100 text-emerald-900" },
  not_configured: { label: "Non configurato", cls: "bg-amber-100 text-amber-900" },
  coming_soon: { label: "Prossimamente", cls: "bg-muted text-muted-foreground" },
};

export default function Settings() {
  const { data: connectors = [] } = useConnectors();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{it.nav.settings}</h1>
        <p className="text-sm text-muted-foreground">
          Registro dei connettori. Le chiavi API riservate si configurano nei Secrets di Supabase, non qui.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {connectors.map((c) => {
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
