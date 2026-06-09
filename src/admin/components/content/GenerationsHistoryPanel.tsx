import { useGenerations, useSelectGeneration } from "../../hooks/useGenerations";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GenerationsHistoryPanel({ contentId }: { contentId: string }) {
  const { data: gens = [], isLoading } = useGenerations(contentId);
  const select = useSelectGeneration();

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Generazioni</p>
      {isLoading && <p className="text-xs text-muted-foreground">Caricamento...</p>}
      {!isLoading && gens.length === 0 && (
        <p className="text-xs text-muted-foreground">Nessuna generazione ancora. Usa le azioni AI per crearne.</p>
      )}
      <div className="max-h-80 overflow-y-auto space-y-2">
        {gens.map((g) => (
          <div
            key={g.id}
            className={`p-3 rounded-md border text-sm ${g.is_selected ? "border-primary bg-primary/5" : "border-border"}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">
                {new Date(g.created_at).toLocaleString("it-IT")} · {g.gen_type}
              </span>
              {g.is_selected ? (
                <span className="text-xs text-primary">Selezionata</span>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    select.mutate(
                      { generation: g },
                      { onSuccess: () => toast.success("Generazione applicata.") }
                    )
                  }
                >
                  Usa questa
                </Button>
              )}
            </div>
            <p className="whitespace-pre-wrap text-sm">{g.output}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
