import { useMemo, useState } from "react";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useContent, useCreateContent } from "../hooks/useContent";
import { usePersonas } from "../hooks/useLookups";
import PostEditorDialog from "../components/content/PostEditorDialog";
import CsvImportDialog from "../components/content/CsvImportDialog";
import type { MktContent, MktStatus } from "../types";
import { it } from "../i18n/it";
import { toast } from "sonner";

const WORKING: MktStatus[] = ["Draft", "Approval"];

export default function ContentPlan() {
  const { data: posts = [] } = useContent();
  const { data: personas = [] } = usePersonas();
  const create = useCreateContent();
  const [editing, setEditing] = useState<MktContent | null>(null);
  const [importOpen, setImportOpen] = useState(false);

  const grouped = useMemo(() => {
    const m: Record<MktStatus, MktContent[]> = { Draft: [], Approval: [], Validated: [], Posted: [] };
    posts.forEach((p) => m[p.status as MktStatus]?.push(p));
    return m;
  }, [posts]);

  const personaName = (id: string | null) => personas.find((p) => p.id === id)?.name ?? "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{it.nav.contentPlan}</h1>
          <p className="text-sm text-muted-foreground">La factory: bozze e approvazioni.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setImportOpen(true)}>
            <Upload className="h-4 w-4" /> Importa CSV
          </Button>
          <Button
            size="sm"
            onClick={() =>
              create.mutate(
                {},
                {
                  onSuccess: (p) => {
                    toast.success("Nuovo post creato.");
                    setEditing(p);
                  },
                }
              )
            }
          >
            <Plus className="h-4 w-4" /> Nuovo post
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {WORKING.map((status) => (
          <div key={status}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium">{it.status[status]}</h2>
              <Badge variant="secondary">{grouped[status].length}</Badge>
            </div>
            <div className="space-y-2 min-h-32">
              {grouped[status].length === 0 ? (
                <p className="text-xs text-muted-foreground p-3">Nessun post.</p>
              ) : (
                grouped[status].map((p) => (
                  <Card
                    key={p.id}
                    className="p-3 cursor-pointer hover:bg-muted/40 transition-colors"
                    onClick={() => setEditing(p)}
                  >
                    <p className="text-sm font-medium line-clamp-1">
                      {p.hook || p.post_copy?.slice(0, 80) || "Nuovo post"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {personaName(p.persona_id)} · {p.content_format ?? "—"} · {p.funnel_stage ?? "—"}
                    </p>
                    {p.scheduled_date && (
                      <p className="text-xs text-muted-foreground mt-1">
                        📅 {p.scheduled_date} {p.scheduled_time?.slice(0, 5) ?? ""}
                      </p>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <PostEditorDialog post={editing} onClose={() => setEditing(null)} />
      <CsvImportDialog open={importOpen} onClose={() => setImportOpen(false)} />
    </div>
  );
}
