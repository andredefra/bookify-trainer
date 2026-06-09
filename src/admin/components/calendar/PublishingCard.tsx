import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { getSignedUrl, bucketAndPathFromUrl } from "../../lib/storage";
import { useUpdateContent } from "../../hooks/useContent";
import { usePersonas } from "../../hooks/useLookups";
import { buildGoogleCalendarLink } from "../../lib/gcal";
import type { MktContent } from "../../types";
import { Copy, Download, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  post: MktContent | null;
  onClose: () => void;
}

export default function PublishingCard({ post, onClose }: Props) {
  const { data: personas = [] } = usePersonas();
  const update = useUpdateContent();
  const [publishedLink, setPublishedLink] = useState("");

  useEffect(() => setPublishedLink(post?.published_link ?? ""), [post]);

  const download = useMutation({
    mutationFn: async () => {
      if (!post?.media_url) throw new Error("Nessun media caricato.");
      const parsed = bucketAndPathFromUrl(post.media_url);
      if (!parsed) throw new Error("URL media non valido.");
      const url = await getSignedUrl(parsed.bucket, parsed.path, 60 * 60);
      window.open(url, "_blank");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!post) return null;
  const persona = personas.find((p) => p.id === post.persona_id);
  const gcalUrl = buildGoogleCalendarLink(post, persona);

  return (
    <Dialog open={!!post} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Publishing Card</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            {post.scheduled_date} {post.scheduled_time?.slice(0, 5)} · {persona?.name ?? "—"} · {post.content_format ?? "—"}
          </div>
          {post.hook && <p className="font-medium">{post.hook}</p>}
          {post.post_copy && (
            <pre className="whitespace-pre-wrap bg-muted p-3 rounded-md text-sm font-sans">{post.post_copy}</pre>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(post.post_copy ?? "");
                toast.success("Testo copiato.");
              }}
            >
              <Copy className="h-4 w-4" /> Copia testo
            </Button>
            <Button size="sm" variant="outline" onClick={() => download.mutate()} disabled={!post.media_url}>
              <Download className="h-4 w-4" /> Scarica media
            </Button>
            {gcalUrl && (
              <Button size="sm" variant="outline" asChild>
                <a href={gcalUrl} target="_blank" rel="noreferrer">
                  <CalendarIcon className="h-4 w-4" /> Aggiungi a Google Calendar
                </a>
              </Button>
            )}
          </div>

          <div className="pt-2 space-y-2">
            <Label>Conferma pubblicato — URL Instagram</Label>
            <Input
              placeholder="https://www.instagram.com/p/..."
              value={publishedLink}
              onChange={(e) => setPublishedLink(e.target.value)}
            />
            <Button
              size="sm"
              onClick={() => {
                if (!publishedLink.trim()) return toast.error("Incolla un URL prima.");
                update.mutate(
                  { id: post.id, patch: { published_link: publishedLink.trim(), status: "Posted" } },
                  {
                    onSuccess: () => {
                      toast.success("Post marcato come pubblicato.");
                      onClose();
                    },
                  }
                );
              }}
            >
              <CheckCircle2 className="h-4 w-4" /> Conferma pubblicato
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Chiudi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
