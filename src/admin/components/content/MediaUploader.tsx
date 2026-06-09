import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ImagePlus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadToBucket, packBucketUrl } from "../../lib/storage";
import { sb } from "../../lib/sb";
import { toast } from "sonner";
import type { MktContent } from "../../types";

interface Props {
  post: MktContent;
  onChange: () => void;
}

export default function MediaUploader({ post, onChange }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const upload = useMutation({
    mutationFn: async () => {
      if (!file) return;
      const path = await uploadToBucket("mkt-media", file, post.id);
      const url = packBucketUrl("mkt-media", path);
      const { error } = await sb.from("mkt_content").update({ media_url: url }).eq("id", post.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Media caricato.");
      setFile(null);
      onChange();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Media</p>
        {post.media_url && <span className="text-xs text-muted-foreground">Caricato</span>}
      </div>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm"
      />
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" onClick={() => upload.mutate()} disabled={!file || upload.isPending}>
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
