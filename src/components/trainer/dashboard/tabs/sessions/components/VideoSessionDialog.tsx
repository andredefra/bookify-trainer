
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Video, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { TrainerSessionItem } from "@/types/sessions";

interface VideoSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: TrainerSessionItem | null;
}

export function VideoSessionDialog({ open, onOpenChange, session }: VideoSessionDialogProps) {
  const [sessionUrl, setSessionUrl] = useState<string>("");
  const [isLive, setIsLive] = useState(false);

  // Generate a unique session URL when the dialog opens
  useEffect(() => {
    if (open && session) {
      // In a real app, this would be a secure unique URL from the backend
      // For demo purposes, we're generating a fake URL based on session ID
      const baseUrl = window.location.origin;
      const uniqueCode = `${session.id}-${Math.random().toString(36).substring(2, 8)}`;
      setSessionUrl(`${baseUrl}/video-session/${uniqueCode}`);
      setIsLive(false);
    }
  }, [open, session]);

  const handleCopyLink = () => {
    if (sessionUrl) {
      navigator.clipboard.writeText(sessionUrl);
      toast.success("Session link copied to clipboard");
    }
  };

  const handleStartLiveSession = () => {
    setIsLive(true);
    toast.success("Video session started successfully!");
    // In a real implementation, this would connect to a video service
  };

  const handleEndSession = () => {
    setIsLive(false);
    toast.success("Video session ended");
    // In a real implementation, this would disconnect from the video service
    onOpenChange(false);
  };

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      // Only allow closing if not live
      if (!isLive || !isOpen) {
        onOpenChange(isOpen);
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            {session.name} - Video Session
          </DialogTitle>
          <DialogDescription>
            {isLive ? "Your video session is now live. Share the link with your participants." : "Start your video session and share the link with your participants."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isLive && (
            <div className="border rounded-lg p-4 bg-green-50 text-green-700 mb-4">
              <div className="font-medium">Session is LIVE</div>
              <div className="text-sm">Participants: {session.participants} connected</div>
            </div>
          )}

          <div className="space-y-2">
            <div className="font-medium text-sm">Session Link</div>
            <div className="flex gap-2">
              <Input 
                value={sessionUrl} 
                readOnly 
                className="flex-1"
              />
              <Button size="icon" variant="outline" onClick={handleCopyLink} title="Copy link">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Share this link with your participants so they can join the video session.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="font-medium text-sm">Session Details</div>
            <div className="text-sm">
              <div><span className="font-medium">Date:</span> {typeof session.date === 'string' ? session.date : session.date.toLocaleDateString()}</div>
              <div><span className="font-medium">Time:</span> {session.time}</div>
              <div><span className="font-medium">Participants:</span> {session.participants}/{session.maxParticipants}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          {!isLive ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleStartLiveSession} className="gap-2">
                <Video className="h-4 w-4" />
                Start Live Session
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleCopyLink} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
              <Button variant="destructive" onClick={handleEndSession}>
                End Session
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
