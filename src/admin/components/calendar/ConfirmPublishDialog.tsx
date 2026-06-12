import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateContent } from "../../hooks/useContent";
import type { MktContent } from "../../types";
import { it } from "../../i18n/it";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  post: MktContent | null;
  onClose: (didPublish?: boolean) => void;
}

export default function ConfirmPublishDialog({ post, onClose }: Props) {
  const update = useUpdateContent();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (post) {
      setDate(post.scheduled_date ?? new Date().toISOString().slice(0, 10));
      setTime((post.scheduled_time ?? "12:00").slice(0, 5));
      setUrl(post.published_link ?? "");
    }
  }, [post]);

  if (!post) return null;

  const submit = () => {
    if (!url.trim()) return toast.error("URL Instagram obbligatorio.");
    if (!/^https?:\/\//.test(url.trim())) return toast.error("URL non valido (deve iniziare con http).");
    update.mutate(
      {
        id: post.id,
        patch: {
          scheduled_date: date,
          scheduled_time: time + ":00",
          published_link: url.trim(),
          published_at: new Date().toISOString(),
          status: "Posted",
        },
      },
      {
        onSuccess: () => {
          toast.success("Post marcato come pubblicato.");
          onClose(true);
        },
        onError: (e: Error) => toast.error(e.message),
      }
    );
  };

  return (
    <Dialog open={!!post} onOpenChange={(o) => !o && onClose(false)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{it.publish.confirmTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>{it.publish.actualDate}</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label>{it.publish.actualTime}</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>{it.publish.url}</Label>
            <Input placeholder={it.publish.urlPlaceholder} value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose(false)}>{it.common.cancel}</Button>
          <Button onClick={submit} disabled={update.isPending}>
            <CheckCircle2 className="h-4 w-4" /> {it.publish.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
