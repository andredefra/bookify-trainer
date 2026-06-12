import { useCallback, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Upload, RefreshCw, Sparkles, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import {
  useBrandDocs, useUpsertBrandDoc, useDeleteBrandDoc,
  useBrandAssets, useUpsertBrandAsset, useDeleteBrandAsset,
  usePersonas,
} from "../hooks/useLookups";
import { uploadToBucket, packBucketUrl, getSignedUrl, bucketAndPathFromUrl } from "../lib/storage";
import { processBrandDoc } from "../lib/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { it } from "../i18n/it";
import type { MktBrandDoc } from "../types";

const ASSET_TYPES = ["logo", "color", "font", "reference_image", "other"];

function AssetThumb({ url }: { url: string | null }) {
  const [signed, setSigned] = useState<string | null>(null);
  if (!url) return null;
  const parsed = bucketAndPathFromUrl(url);
  if (!parsed) return null;
  if (!signed) {
    getSignedUrl(parsed.bucket, parsed.path).then(setSigned).catch(() => {});
    return <div className="h-20 w-20 bg-muted rounded animate-pulse" />;
  }
  return <img src={signed} alt="" className="h-20 w-20 object-cover rounded border" />;
}

function ProcessingBadge({ doc }: { doc: MktBrandDoc }) {
  const map = {
    pending: { icon: Clock, label: it.doc.pending, cls: "bg-muted text-muted-foreground" },
    processing: { icon: Sparkles, label: it.doc.processing, cls: "bg-primary/15 text-primary animate-pulse" },
    done: { icon: CheckCircle2, label: it.doc.done, cls: "bg-emerald-100 text-emerald-900" },
    failed: { icon: AlertCircle, label: it.doc.failed, cls: "bg-destructive/15 text-destructive" },
  } as const;
  const s = map[doc.processing_status] ?? map.pending;
  const Icon = s.icon;
  return <Badge variant="secondary" className={`gap-1 ${s.cls}`}><Icon className="h-3 w-3" />{s.label}</Badge>;
}

async function readFileText(file: File): Promise<string> {
  if (file.type.startsWith("text/") || /\.(txt|md|csv|json)$/i.test(file.name)) {
    return await file.text();
  }
  return ""; // PDFs/DOCX server-side parsing not implemented in v1; user can paste content.
}

export default function Branding() {
  const qc = useQueryClient();
  const { data: docs = [] } = useBrandDocs();
  const upsertDoc = useUpsertBrandDoc();
  const delDoc = useDeleteBrandDoc();
  const { data: assets = [] } = useBrandAssets();
  const upsertAsset = useUpsertBrandAsset();
  const delAsset = useDeleteBrandAsset();
  const { data: personas = [] } = usePersonas();

  const [dragOverDocs, setDragOverDocs] = useState(false);
  const [dragOverAssets, setDragOverAssets] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: "", asset_type: "reference_image", hex: "", notes: "" });

  // Upload a doc file → create row → upload → trigger AI processing
  const handleDocFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files);
    for (const file of arr) {
      try {
        const text = await readFileText(file);
        const created = await upsertDoc.mutateAsync({
          title: file.name,
          doc_type: null,
          content: text,
          is_active: true,
          processing_status: "pending",
        });
        try {
          const path = await uploadToBucket("mkt-brand-docs", file, created.id);
          await upsertDoc.mutateAsync({ id: created.id, file_url: packBucketUrl("mkt-brand-docs", path) });
        } catch (e) {
          console.warn("Upload file fallito (bucket mancante?):", e);
        }
        await processBrandDoc(created.id);
        toast.success(`${file.name}: elaborazione AI avviata.`);
      } catch (e) {
        toast.error(`${file.name}: ${(e as Error).message}`);
      }
    }
    qc.invalidateQueries({ queryKey: ["mkt_brand_docs"] });
    qc.invalidateQueries({ queryKey: ["mkt_personas"] });
  }, [upsertDoc, qc]);

  const reprocess = useMutation({
    mutationFn: (id: string) => processBrandDoc(id),
    onSuccess: () => {
      toast.success("Rielaborazione avviata.");
      qc.invalidateQueries({ queryKey: ["mkt_brand_docs"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const uploadAssetFile = useMutation({
    mutationFn: async ({ id, file }: { id: string; file: File }) => {
      const path = await uploadToBucket("mkt-assets", file, id);
      await upsertAsset.mutateAsync({ id, file_url: packBucketUrl("mkt-assets", path) });
    },
    onSuccess: () => {
      toast.success("Asset caricato.");
      qc.invalidateQueries({ queryKey: ["mkt_brand_assets"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleAssetFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files);
    for (const file of arr) {
      try {
        const created = await upsertAsset.mutateAsync({
          name: file.name,
          asset_type: file.type.startsWith("image/") ? "reference_image" : "other",
        });
        await uploadAssetFile.mutateAsync({ id: created.id, file });
      } catch (e) {
        toast.error(`${file.name}: ${(e as Error).message}`);
      }
    }
  }, [upsertAsset, uploadAssetFile]);

  const aiPersonas = personas.filter((p) => p.is_ai_generated);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{it.nav.branding}</h1>
        <p className="text-sm text-muted-foreground">
          Carica documenti di strategia/brand: l'AI li classifica, ne fa un recap e estrae le persona target.
        </p>
      </div>

      {/* Brand Documents */}
      <Card>
        <CardHeader><CardTitle className="text-base">Brand Documents</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <label
            onDragOver={(e) => { e.preventDefault(); setDragOverDocs(true); }}
            onDragLeave={() => setDragOverDocs(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOverDocs(false);
              if (e.dataTransfer.files?.length) handleDocFiles(e.dataTransfer.files);
            }}
            className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
              dragOverDocs ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:bg-muted/40"
            }`}
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm">{it.doc.dropHere}</span>
            <span className="text-xs text-muted-foreground">.txt, .md, .csv, .json (PDF/DOCX: incolla il testo manualmente)</span>
            <input
              type="file"
              multiple
              className="hidden"
              accept=".txt,.md,.csv,.json,.pdf,.docx,text/*"
              onChange={(e) => e.target.files && handleDocFiles(e.target.files)}
            />
          </label>

          {docs.length === 0 && <p className="text-sm text-muted-foreground">{it.common.empty}</p>}

          {docs.map((d) => (
            <div key={d.id} className="border rounded-md p-3 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <Input
                  value={d.title}
                  className="max-w-md"
                  onChange={(e) => upsertDoc.mutate({ id: d.id, title: e.target.value })}
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <ProcessingBadge doc={d} />
                  {d.doc_type && <Badge variant="outline" className="text-[10px]">{d.doc_type}</Badge>}
                  <div className="flex items-center gap-2 text-xs">
                    <span>Attivo</span>
                    <Switch
                      checked={d.is_active}
                      onCheckedChange={(v) => upsertDoc.mutate({ id: d.id, is_active: v })}
                    />
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => reprocess.mutate(d.id)} title={it.doc.retry}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => delDoc.mutate(d.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {d.recap && (
                <div className="rounded-md bg-primary/5 p-2 text-xs">
                  <p className="font-medium text-primary mb-1">{it.doc.recap}</p>
                  <p className="whitespace-pre-wrap">{d.recap}</p>
                </div>
              )}
              {d.processing_status === "failed" && d.processing_error && (
                <p className="text-xs text-destructive">{d.processing_error}</p>
              )}

              <details>
                <summary className="text-xs text-muted-foreground cursor-pointer">Contenuto testuale</summary>
                <Textarea
                  rows={4}
                  placeholder="Contenuto plain-text usato dall'AI..."
                  defaultValue={d.content ?? ""}
                  onBlur={(e) => {
                    if (e.target.value !== d.content) {
                      upsertDoc.mutate({ id: d.id, content: e.target.value, processing_status: "pending" });
                    }
                  }}
                  className="mt-2"
                />
              </details>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI-extracted personas */}
      {aiPersonas.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Target Persona rilevate dall'AI</CardTitle></CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {aiPersonas.map((p) => (
                <div key={p.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{p.name}</p>
                    <Badge variant="outline" className="text-[10px] gap-1">
                      <Sparkles className="h-3 w-3" /> AI
                    </Badge>
                  </div>
                  {p.age_range && <p className="text-xs text-muted-foreground">{p.age_range}</p>}
                  {p.copy_focus && <p className="text-xs mt-1 line-clamp-2">{p.copy_focus}</p>}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Le trovi anche in Dashboard. Modificabili dalla sezione Personas.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Brand Assets */}
      <Card>
        <CardHeader><CardTitle className="text-base">Brand Assets</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <label
            onDragOver={(e) => { e.preventDefault(); setDragOverAssets(true); }}
            onDragLeave={() => setDragOverAssets(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOverAssets(false);
              if (e.dataTransfer.files?.length) handleAssetFiles(e.dataTransfer.files);
            }}
            className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
              dragOverAssets ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:bg-muted/40"
            }`}
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm">Trascina loghi, immagini o font</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleAssetFiles(e.target.files)}
            />
          </label>

          {/* Color add (manual) */}
          <div className="grid md:grid-cols-4 gap-2 p-3 border rounded-md">
            <Input
              placeholder="Nome colore"
              value={newAsset.name}
              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
            />
            <Select value={newAsset.asset_type} onValueChange={(v) => setNewAsset({ ...newAsset, asset_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{ASSET_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
            <Input
              placeholder="#hex (se colore)"
              value={newAsset.hex}
              onChange={(e) => setNewAsset({ ...newAsset, hex: e.target.value })}
            />
            <Button
              size="sm"
              onClick={() => {
                if (!newAsset.name) return toast.error("Nome richiesto");
                upsertAsset.mutate(newAsset, {
                  onSuccess: () => {
                    setNewAsset({ name: "", asset_type: "reference_image", hex: "", notes: "" });
                    toast.success("Asset creato.");
                  },
                });
              }}
            >
              <Plus className="h-4 w-4" /> Aggiungi
            </Button>
          </div>

          {assets.length === 0 && <p className="text-sm text-muted-foreground">{it.common.empty}</p>}

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {assets.map((a) => (
              <div key={a.id} className="border rounded-md p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.asset_type}</p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => delAsset.mutate(a.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {a.asset_type === "color" && a.hex && (
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded border" style={{ background: a.hex }} />
                    <span className="text-xs">{a.hex}</span>
                  </div>
                )}
                {a.file_url && <AssetThumb url={a.file_url} />}
                {a.notes && <p className="text-xs text-muted-foreground">{a.notes}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
