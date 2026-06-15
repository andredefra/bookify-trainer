import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUpdateContent, useDeleteContent } from "../../hooks/useContent";
import { usePersonas } from "../../hooks/useLookups";
import { generateCopy, type AiMode } from "../../lib/ai";
import { toast } from "sonner";
import type { MktContent, MktPlanPhase, PostDiffProposal } from "../../types";
import { isPostReadOnly } from "../../types";
import { it } from "../../i18n/it";
import MediaUploader from "./MediaUploader";
import GenerationsHistoryPanel from "./GenerationsHistoryPanel";
import PostAiChatPanel from "./PostAiChatPanel";
import ConfirmPublishDialog from "../calendar/ConfirmPublishDialog";
import { Trash2, Lock, CheckCircle2 } from "lucide-react";

interface Props {
  post: MktContent | null;
  onClose: () => void;
  planPhase?: MktPlanPhase | null;
}

const FORMATS = ["Reel", "Carosello", "Post", "Video", "Sondaggio", "Story"];
const FUNNELS = ["Awareness", "Consideration", "Conversion"];
const CHANNELS = ["Instagram", "TikTok", "LinkedIn", "Facebook"];

export default function PostEditorDialog({ post, onClose, planPhase }: Props) {
  const [draft, setDraft] = useState<MktContent | null>(post);
  const [publishOpen, setPublishOpen] = useState(false);
  const { data: personas = [] } = usePersonas();
  const update = useUpdateContent();
  const del = useDeleteContent();
  const qc = useQueryClient();

  useEffect(() => setDraft(post), [post]);

  const readOnly = !!(draft && isPostReadOnly(draft, planPhase));

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
    if (readOnly) return toast.error("Post bloccato (Pubblicato o fase chiusa).");
    update.mutate(
      {
        id: draft.id,
        patch: {
          sequence_number: draft.sequence_number,
          social_channel: draft.social_channel,
          persona_id: draft.persona_id,
          funnel_stage: draft.funnel_stage,
          content_format: draft.content_format,
          content_type: draft.content_type,
          objective: draft.objective,
          situation: draft.situation,
          hook: draft.hook,
          post_copy: draft.post_copy,
          cta: draft.cta,
          media_prompt: draft.media_prompt,
          notes: draft.notes,
          scheduled_date: draft.scheduled_date,
          scheduled_time: draft.scheduled_time,
        },
      },
      { onSuccess: () => toast.success("Salvato.") }
    );
  };

  const updateMetrics = () => {
    update.mutate(
      {
        id: draft.id,
        patch: {
          views: draft.views,
          dms_received: draft.dms_received,
          published_link: draft.published_link,
        },
      },
      { onSuccess: () => toast.success("Metriche aggiornate.") }
    );
  };

  const moveTo = (status: "Draft" | "Approval" | "Validated") => {
    if (readOnly) return toast.error("Post bloccato.");
    update.mutate({ id: draft.id, patch: { status } }, { onSuccess: () => toast.success(`Stato: ${it.status[status]}`) });
  };

  const applyProposal = (p: PostDiffProposal) => {
    setDraft((d) => (d ? { ...d, [p.field]: p.proposed_value } : d));
  };

  const isScheduled = draft.status === "Scheduled";
  const isPosted = draft.status === "Posted";
  const editableDates = !readOnly; // editable in Draft/Approval/Validated/Scheduled

  return (
    <>
      <Dialog open={!!post} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 flex-wrap">
              Editor post
              {draft.sequence_number != null && (
                <Badge variant="outline" className="font-mono">#{draft.sequence_number}</Badge>
              )}
              <Badge variant="secondary">{it.status[draft.status]}</Badge>
              {readOnly && (
                <Badge variant="secondary" className="gap-1">
                  <Lock className="h-3 w-3" /> {it.common.readOnly}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Sequenza (#)</Label>
                  <Input
                    type="number"
                    min={1}
                    value={draft.sequence_number ?? ""}
                    disabled={readOnly}
                    onChange={(e) => setDraft({ ...draft, sequence_number: e.target.value ? Number(e.target.value) : null })}
                  />
                </div>
                <div>
                  <Label>Canale</Label>
                  <Select
                    value={draft.social_channel ?? "Instagram"}
                    onValueChange={(v) => setDraft({ ...draft, social_channel: v })}
                    disabled={readOnly}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CHANNELS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Tipo Persona</Label>
                  <Select
                    value={draft.persona_id ?? "none"}
                    onValueChange={(v) => setDraft({ ...draft, persona_id: v === "none" ? null : v })}
                    disabled={readOnly}
                  >
                    <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">—</SelectItem>
                      {personas.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tipo Format</Label>
                  <Select
                    value={draft.content_format ?? "none"}
                    onValueChange={(v) => setDraft({ ...draft, content_format: v === "none" ? null : v })}
                    disabled={readOnly}
                  >
                    <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">—</SelectItem>
                      {FORMATS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Fase del Funnel</Label>
                  <Select
                    value={draft.funnel_stage ?? "none"}
                    onValueChange={(v) => setDraft({ ...draft, funnel_stage: v === "none" ? null : v })}
                    disabled={readOnly}
                  >
                    <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">—</SelectItem>
                      {FUNNELS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Content type</Label>
                  <Input
                    value={draft.content_type ?? ""}
                    disabled={readOnly}
                    placeholder="es. Video step-by-step"
                    onChange={(e) => setDraft({ ...draft, content_type: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Obiettivo</Label>
                <Input
                  value={draft.objective ?? ""}
                  disabled={readOnly}
                  placeholder="es. Brand awareness, Lead gen"
                  onChange={(e) => setDraft({ ...draft, objective: e.target.value })}
                />
              </div>

              <div>
                <Label>Situazione</Label>
                <Textarea
                  value={draft.situation ?? ""}
                  disabled={readOnly}
                  rows={2}
                  placeholder="Contesto/scenario rappresentato"
                  onChange={(e) => setDraft({ ...draft, situation: e.target.value })}
                />
              </div>

              <div>
                <Label>Hook</Label>
                <Textarea value={draft.hook ?? ""} disabled={readOnly} rows={2}
                  onChange={(e) => setDraft({ ...draft, hook: e.target.value })} />
              </div>

              <div>
                <Label>Post Copy / Text</Label>
                <Textarea value={draft.post_copy ?? ""} disabled={readOnly} rows={6}
                  onChange={(e) => setDraft({ ...draft, post_copy: e.target.value })} />
              </div>

              <div>
                <Label>CTA</Label>
                <Input value={draft.cta ?? ""} disabled={readOnly}
                  onChange={(e) => setDraft({ ...draft, cta: e.target.value })} />
              </div>

              <div>
                <Label>Media Prompt</Label>
                <Textarea value={draft.media_prompt ?? ""} disabled={readOnly} rows={2}
                  onChange={(e) => setDraft({ ...draft, media_prompt: e.target.value })} />
              </div>

              <div>
                <Label>Note</Label>
                <Textarea value={draft.notes ?? ""} disabled={readOnly} rows={2}
                  onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Data{isScheduled ? " (Calendarizzata)" : ""}</Label>
                  <Input
                    type="date"
                    value={draft.scheduled_date ?? ""}
                    disabled={!editableDates}
                    onChange={(e) => setDraft({ ...draft, scheduled_date: e.target.value || null })}
                  />
                </div>
                <div>
                  <Label>Ora</Label>
                  <Input
                    type="time"
                    value={(draft.scheduled_time ?? "").slice(0, 5)}
                    disabled={!editableDates}
                    onChange={(e) => setDraft({ ...draft, scheduled_time: e.target.value ? e.target.value + ":00" : null })}
                  />
                </div>
              </div>
              {!isScheduled && !isPosted && (
                <p className="text-[11px] text-muted-foreground">
                  Data/ora qui sono opzionali. Saranno scelte automaticamente dal "Calendarizza con AI".
                </p>
              )}

              {!readOnly && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => ai.mutate("generate")} disabled={ai.isPending}>{it.ai.generate}</Button>
                  <Button size="sm" variant="outline" onClick={() => ai.mutate("rewrite")} disabled={ai.isPending}>{it.ai.rewrite}</Button>
                  <Button size="sm" variant="outline" onClick={() => ai.mutate("shorten")} disabled={ai.isPending}>{it.ai.shorten}</Button>
                  <Button size="sm" variant="outline" onClick={() => ai.mutate("retone")} disabled={ai.isPending}>{it.ai.retone}</Button>
                  {ai.isPending && <span className="text-xs text-muted-foreground self-center">{it.ai.generating}</span>}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Tabs defaultValue="ai">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="ai">AI Assistant</TabsTrigger>
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="history">{it.ai.history}</TabsTrigger>
                </TabsList>
                <TabsContent value="ai" className="mt-3">
                  <PostAiChatPanel post={draft} onApplyProposal={applyProposal} disabled={readOnly} />
                </TabsContent>
                <TabsContent value="media" className="mt-3">
                  <MediaUploader post={draft} onChange={() => qc.invalidateQueries({ queryKey: ["mkt_content"] })} />
                </TabsContent>
                <TabsContent value="history" className="mt-3">
                  <GenerationsHistoryPanel contentId={draft.id} />
                </TabsContent>
              </Tabs>

              {isPosted && (
                <div className="border rounded-md p-3 space-y-2">
                  <p className="text-xs font-medium">Metriche</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Views</Label>
                      <Input type="number" value={draft.views ?? ""}
                        onChange={(e) => setDraft({ ...draft, views: e.target.value ? Number(e.target.value) : null })} />
                    </div>
                    <div>
                      <Label className="text-xs">DMs ricevuti</Label>
                      <Input type="number" value={draft.dms_received ?? ""}
                        onChange={(e) => setDraft({ ...draft, dms_received: e.target.value ? Number(e.target.value) : null })} />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">URL pubblicato</Label>
                    <Input value={draft.published_link ?? ""}
                      onChange={(e) => setDraft({ ...draft, published_link: e.target.value })} />
                  </div>
                  <Button size="sm" onClick={updateMetrics}>Aggiorna metriche</Button>
                </div>
              )}

              {isScheduled && (
                <div className="border rounded-md p-3 bg-primary/5">
                  <p className="text-xs font-medium mb-2">Pronto per pubblicare?</p>
                  <Button size="sm" onClick={() => setPublishOpen(true)}>
                    <CheckCircle2 className="h-4 w-4" /> {it.publish.markPublished}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex-wrap gap-2 sm:justify-between">
            <div className="flex gap-2 flex-wrap">
              {!readOnly && !isScheduled && (
                <>
                  <Button size="sm" variant="outline" onClick={() => moveTo("Draft")}>→ Bozza</Button>
                  <Button size="sm" variant="outline" onClick={() => moveTo("Approval")}>→ Approvazione</Button>
                  <Button size="sm" onClick={() => moveTo("Validated")}>→ Validato</Button>
                </>
              )}
            </div>
            <div className="flex gap-2">
              {!readOnly && (
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
              )}
              <Button size="sm" variant="outline" onClick={onClose}>{readOnly ? "Chiudi" : it.common.cancel}</Button>
              {!readOnly && <Button size="sm" onClick={save}>{it.common.save}</Button>}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmPublishDialog
        post={publishOpen ? draft : null}
        onClose={(didPublish) => {
          setPublishOpen(false);
          if (didPublish) onClose();
        }}
      />
    </>
  );
}
