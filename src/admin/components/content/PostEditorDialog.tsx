import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateContent, useDeleteContent } from "../../hooks/useContent";
import { usePersonas } from "../../hooks/useLookups";
import { generateCopy, type AiMode } from "../../lib/ai";
import { toast } from "sonner";
import type { MktContent } from "../../types";
import { it } from "../../i18n/it";
import MediaUploader from "./MediaUploader";
import GenerationsHistoryPanel from "./GenerationsHistoryPanel";
import { Trash2 } from "lucide-react";

interface Props {
  post: MktContent | null;
  onClose: () => void;
}

const FORMATS = ["Reel", "Carosello", "Post", "Video", "Sondaggio"];
const FUNNELS = ["Awareness", "Consideration", "Conversion"];

export default function PostEditorDialog({ post, onClose }: Props) {
  const [draft, setDraft] = useState<MktContent | null>(post);
  const { data: personas = [] } = usePersonas();
  const update = useUpdateContent();
  const del = useDeleteContent();
  const qc = useQueryClient();

  useEffect(() => setDraft(post), [post]);

  const ai = useMutation({
    mutationFn: async (mode: AiMode) => {
      if (!draft) return;
      return generateCopy(draft.id, mode);
    },
    onSuccess: () => {
      toast.success("Generazione creata.");
      if (draft) qc.invalidateQueries({ queryKey: ["mkt_generations", draft.id] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!draft) return null;

  const save = () => {
    update.mutate(
      {
        id: draft.id,
        patch: {
          scheduled_date: draft.scheduled_date,
          scheduled_time: draft.scheduled_time,
          persona_id: draft.persona_id,
          funnel_stage: draft.funnel_stage,
          content_format: draft.content_format,
          hook: draft.hook,
          post_copy: draft.post_copy,
          cta: draft.cta,
          media_prompt: draft.media_prompt,
          notes: draft.notes,
        },
      },
      { onSuccess: () => toast.success("Salvato.") }
    );
  };

  const moveTo = (status: "Draft" | "Approval" | "Validated") => {
    update.mutate({ id: draft.id, patch: { status } }, { onSuccess: () => toast.success(`Stato: ${it.status[status]}`) });
  };

  return (
    <Dialog open={!!post} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editor post</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Data</Label>
                <Input
                  type="date"
                  value={draft.scheduled_date ?? ""}
                  onChange={(e) => setDraft({ ...draft, scheduled_date: e.target.value || null })}
                />
              </div>
              <div>
                <Label>Ora</Label>
                <Input
                  type="time"
                  value={draft.scheduled_time?.slice(0, 5) ?? ""}
                  onChange={(e) => setDraft({ ...draft, scheduled_time: e.target.value || null })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Persona</Label>
                <Select
                  value={draft.persona_id ?? "none"}
                  onValueChange={(v) => setDraft({ ...draft, persona_id: v === "none" ? null : v })}
                >
                  <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">—</SelectItem>
                    {personas.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Formato</Label>
                <Select
                  value={draft.content_format ?? "none"}
                  onValueChange={(v) => setDraft({ ...draft, content_format: v === "none" ? null : v })}
                >
                  <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">—</SelectItem>
                    {FORMATS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Funnel</Label>
              <Select
                value={draft.funnel_stage ?? "none"}
                onValueChange={(v) => setDraft({ ...draft, funnel_stage: v === "none" ? null : v })}
              >
                <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">—</SelectItem>
                  {FUNNELS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Hook</Label>
              <Textarea value={draft.hook ?? ""} onChange={(e) => setDraft({ ...draft, hook: e.target.value })} rows={2} />
            </div>

            <div>
              <Label>Post copy</Label>
              <Textarea value={draft.post_copy ?? ""} onChange={(e) => setDraft({ ...draft, post_copy: e.target.value })} rows={6} />
            </div>

            <div>
              <Label>CTA</Label>
              <Input value={draft.cta ?? ""} onChange={(e) => setDraft({ ...draft, cta: e.target.value })} />
            </div>

            <div>
              <Label>Media prompt</Label>
              <Textarea value={draft.media_prompt ?? ""} onChange={(e) => setDraft({ ...draft, media_prompt: e.target.value })} rows={2} />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => ai.mutate("generate")} disabled={ai.isPending}>{it.ai.generate}</Button>
              <Button size="sm" variant="outline" onClick={() => ai.mutate("rewrite")} disabled={ai.isPending}>{it.ai.rewrite}</Button>
              <Button size="sm" variant="outline" onClick={() => ai.mutate("shorten")} disabled={ai.isPending}>{it.ai.shorten}</Button>
              <Button size="sm" variant="outline" onClick={() => ai.mutate("retone")} disabled={ai.isPending}>{it.ai.retone}</Button>
              {ai.isPending && <span className="text-xs text-muted-foreground self-center">{it.ai.generating}</span>}
            </div>
          </div>

          <div className="space-y-4">
            <MediaUploader post={draft} onChange={() => qc.invalidateQueries({ queryKey: ["mkt_content"] })} />
            <GenerationsHistoryPanel contentId={draft.id} />
          </div>
        </div>

        <DialogFooter className="flex-wrap gap-2 sm:justify-between">
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={() => moveTo("Draft")}>→ Bozza</Button>
            <Button size="sm" variant="outline" onClick={() => moveTo("Approval")}>→ Approvazione</Button>
            <Button size="sm" onClick={() => moveTo("Validated")}>→ Validato</Button>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                if (confirm("Eliminare questo post?")) {
                  del.mutate(draft.id, { onSuccess: () => { toast.success("Eliminato."); onClose(); } });
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={onClose}>{it.common.cancel}</Button>
            <Button size="sm" onClick={save}>{it.common.save}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
