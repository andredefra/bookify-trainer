import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import {
  useBrandDocs, useUpsertBrandDoc, useDeleteBrandDoc,
  useBrandAssets, useUpsertBrandAsset, useDeleteBrandAsset,
} from "../hooks/useLookups";
import { uploadToBucket, packBucketUrl, getSignedUrl, bucketAndPathFromUrl } from "../lib/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { it } from "../i18n/it";

const DOC_TYPES = ["strategy", "brand_guideline", "master_prompt", "tone_of_voice", "other"];
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

export default function Branding() {
  const qc = useQueryClient();
  const { data: docs = [] } = useBrandDocs();
  const upsertDoc = useUpsertBrandDoc();
  const delDoc = useDeleteBrandDoc();
  const { data: assets = [] } = useBrandAssets();
  const upsertAsset = useUpsertBrandAsset();
  const delAsset = useDeleteBrandAsset();

  const [newDoc, setNewDoc] = useState({ title: "", doc_type: "other", content: "" });
  const [newAsset, setNewAsset] = useState({ name: "", asset_type: "reference_image", hex: "", notes: "" });

  const uploadDocFile = useMutation({
    mutationFn: async ({ id, file }: { id: string; file: File }) => {
      const path = await uploadToBucket("mkt-brand-docs", file, id);
      await upsertDoc.mutateAsync({ id, file_url: packBucketUrl("mkt-brand-docs", path) });
    },
    onSuccess: () => toast.success("File caricato."),
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{it.nav.branding}</h1>
        <p className="text-sm text-muted-foreground">
          Documenti e asset visivi. I documenti attivi vengono passati all'AI come contesto.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Documenti</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-2 p-3 border rounded-md">
            <Input
              placeholder="Titolo"
              value={newDoc.title}
              onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
            />
            <Select value={newDoc.doc_type} onValueChange={(v) => setNewDoc({ ...newDoc, doc_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{DOC_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={() => {
                if (!newDoc.title) return toast.error("Titolo richiesto");
                upsertDoc.mutate(newDoc, {
                  onSuccess: () => {
                    setNewDoc({ title: "", doc_type: "other", content: "" });
                    toast.success("Documento creato.");
                  },
                });
              }}
            >
              <Plus className="h-4 w-4" /> Aggiungi
            </Button>
          </div>

          {docs.length === 0 && <p className="text-sm text-muted-foreground">{it.common.empty}</p>}

          {docs.map((d) => (
            <div key={d.id} className="border rounded-md p-3 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <Input
                  value={d.title}
                  className="max-w-md"
                  onChange={(e) => upsertDoc.mutate({ id: d.id, title: e.target.value })}
                />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span>Attivo</span>
                    <Switch
                      checked={d.is_active}
                      onCheckedChange={(v) => upsertDoc.mutate({ id: d.id, is_active: v })}
                    />
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => delDoc.mutate(d.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                rows={4}
                placeholder="Contenuto plain-text usato dall'AI..."
                defaultValue={d.content ?? ""}
                onBlur={(e) => upsertDoc.mutate({ id: d.id, content: e.target.value })}
              />
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="file"
                  onChange={(e) => e.target.files?.[0] && uploadDocFile.mutate({ id: d.id, file: e.target.files[0] })}
                />
                {d.file_url && <span className="text-muted-foreground">File presente.</span>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Brand assets</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-2 p-3 border rounded-md">
            <Input
              placeholder="Nome"
              value={newAsset.name}
              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
            />
            <Select value={newAsset.asset_type} onValueChange={(v) => setNewAsset({ ...newAsset, asset_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{ASSET_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
            <Input
              placeholder="#hex (per colori)"
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
                {!a.file_url && a.asset_type !== "color" && (
                  <input
                    type="file"
                    className="text-xs"
                    onChange={(e) => e.target.files?.[0] && uploadAssetFile.mutate({ id: a.id, file: e.target.files[0] })}
                  />
                )}
                {a.notes && <p className="text-xs text-muted-foreground">{a.notes}</p>}
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Asset (logo / immagini) sono salvati per la generazione AI di immagini (v2). In v1 l'AI per la copy usa solo i documenti.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
