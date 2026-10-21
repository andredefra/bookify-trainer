import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ImagePlus, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadToBucket, packBucketUrl } from "../../lib/storage";
import { sb } from "../../lib/sb";
import { toast } from "sonner";
import type { MktContent } from "../../types";
import MediaThumb from "./MediaThumb";

const MAX_FILES = 10;

interface Props {
  post: MktContent;
  onChange: () => void;
}

function initialList(post: MktContent): string[] {
  if (post.media_urls && post.media_urls.length) return [...post.media_urls];
  return post.media_url ? [post.media_url] : [];
}

export default function MediaUploader({ post, onChange }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [list, setList] = useState<string[]>(() => initialList(post));

  useEffect(() => {
    setList(initialList(post));
  }, [post.id]);

  const save = async (next: string[]) => {
    const { error } = await sb
      .from("mkt_content")
      .update({ media_urls: next, media_url: next[0] ?? null })
      .eq("id", post.id);
    if (error) throw error;
  };

  const persist = useMutation({
    mutationFn: save,
    onSuccess: () => onChange(),
    onError: (e: Error) => {
      toast.error(e.message);
      setList(initialList(post));
    },
  });

  const update = (next: string[]) => {
    setList(next);
    persist.mutate(next);
  };

  const upload = useMutation({
    mutationFn: async () => {
      const room = MAX_FILES - list.length;
      if (room <= 0) throw new Error(`Massimo ${MAX_FILES} media per post.`);
      const sorted = [...files].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })
      );
      if (sorted.length > room) toast.warning(`Caricati solo i primi ${room} file (massimo ${MAX_FILES}).`);
      const added: string[] = [];
      for (const f of sorted.slice(0, room)) {
        const path = await uploadToBucket("mkt-media", f, post.id);
        added.push(packBucketUrl("mkt-media", path));
      }
      const next = [...list, ...added];
      await save(next);
      return next;
    },
    onSuccess: (next) => {
      setList(next);
      toast.success("Media caricati.");
      setFiles([]);
      onChange();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    update(next);
  };

  const remove = (i: number) => update(list.filter((_, k) => k !== i));

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Media</p>
        <span className="text-xs text-muted-foreground">
          {list.length}/{MAX_FILES}
        </span>
      </div>

      {list.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {list.map((v, i) => (
            <div key={`${v}-${i}`} className="relative border rounded-md overflow-hidden">
              <MediaThumb value={v} controls className="w-full aspect-square" />
              <span className="absolute top-1 left-1 bg-background/90 text-foreground text-[10px] font-mono rounded px-1">
                {i + 1}
              </span>
              <button
                type="button"
                title="Rimuovi"
                aria-label="Rimuovi"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-background/90 rounded p-0.5 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="flex justify-between bg-muted/80 px-1 py-0.5">
                <button
                  type="button"
                  title="Sposta a sinistra"
                  aria-label="Sposta a sinistra"
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                  className="disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  title="Sposta a destra"
                  aria-label="Sposta a destra"
                  disabled={i === list.length - 1}
                  onClick={() => move(i, 1)}
                  className="disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
        className="block w-full text-sm"
      />
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          onClick={() => upload.mutate()}
          disabled={!files.length || upload.isPending || list.length >= MAX_FILES}
        >
          <ImagePlus className="h-4 w-4" /> {upload.isPending ? "Caricamento..." : "Carica media"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled
          title="Disponibile in v2 — usa il caricamento manuale per ora"
        >
          <Sparkles className="h-4 w-4" /> Genera con AI (prossimamente)
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Il caricamento manuale resta sempre disponibile, anche quando l'AI sarà attiva.
      </p>
    </Card>
  );
}
