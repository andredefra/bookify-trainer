import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { parseCsv, matchPersonas, CSV_TEMPLATE, type ParsedRow } from "../../lib/csv";
import { usePersonas } from "../../hooks/useLookups";
import { useBulkCreateContent } from "../../hooks/useContent";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  planMonthId?: string | null;
}

export default function CsvImportDialog({ open, onClose, planMonthId }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const { data: personas = [] } = usePersonas();
  const bulk = useBulkCreateContent();

  const onFile = async (file: File) => {
    const text = await file.text();
    const parsed = parseCsv(text);
    setRows(matchPersonas(parsed, personas));
  };

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "mkt_content_template.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const confirmImport = () => {
    if (rows.length === 0) return;
    if (!planMonthId) {
      toast.error("Seleziona o crea un mese prima di importare.");
      return;
    }
    const payload = rows.map((r, i) => ({
      plan_month_id: planMonthId,
      sequence_number: r.sequence_number ?? i + 1,
      social_channel: r.social_channel,
      persona_id: r.persona_id,
      funnel_stage: r.funnel_stage,
      content_format: r.content_format,
      content_type: r.content_type,
      objective: r.objective,
      situation: r.situation,
      post_copy: r.post_copy,
      cta: r.cta,
      media_prompt: r.media_prompt,
      media_url: r.media_url,
      published_link: r.published_link,
    }));
    bulk.mutate(payload, {
      onSuccess: () => {
        toast.success(`${payload.length} post importati.`);
        setRows([]);
        onClose();
      },
      onError: (e: Error) => toast.error(e.message),
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Importa template (CSV)</DialogTitle></DialogHeader>

        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Header allineati al tracker Excel: #, Day, Social Media Channel, Tipo Format, Tipo Persona, Obiettivo,
            Fase del Funnel, Situazione, Post Copy / Text, Content type, CTA, Media Prompt, Media Links, Status.
            La sequenza dei post (#) sarà rispettata dall'AI in fase di calendarizzazione. L'URL del post pubblicato
            si compila in fase di "Segna come pubblicato".
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={downloadTemplate}>Scarica template</Button>
            <Button size="sm" onClick={() => fileRef.current?.click()}>Seleziona file CSV</Button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
            />
          </div>

          {rows.length > 0 && (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">Persona</th>
                    <th className="text-left p-2">Formato</th>
                    <th className="text-left p-2">Funnel</th>
                    <th className="text-left p-2">Obiettivo</th>
                    <th className="text-left p-2">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2 font-mono">#{r.sequence_number ?? i + 1}</td>
                      <td className="p-2">
                        {r.persona_name ?? "—"}
                        {!r._personaMatched && <span className="text-destructive ml-1">(non trovata)</span>}
                      </td>
                      <td className="p-2">{r.content_format ?? "—"}</td>
                      <td className="p-2">{r.funnel_stage ?? "—"}</td>
                      <td className="p-2 truncate max-w-[160px]">{r.objective ?? "—"}</td>
                      <td className="p-2 truncate max-w-xs">{r.post_copy ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annulla</Button>
          <Button onClick={confirmImport} disabled={rows.length === 0 || bulk.isPending}>
            Importa {rows.length > 0 ? `(${rows.length})` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
