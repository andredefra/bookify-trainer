import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, ExternalLink } from 'lucide-react';

interface ExerciseVideoPlayerProps {
  videoUrl?: string;
  exerciseName: string;
  triggerButton?: React.ReactNode;
}

export function ExerciseVideoPlayer({ videoUrl, exerciseName, triggerButton }: ExerciseVideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const noVideoTrigger = (
    <Button variant="outline" size="sm" className="h-8" disabled>
      <Play className="h-3 w-3 mr-1 opacity-50" />
      No video available
    </Button>
  );

  if (!videoUrl) {
    return triggerButton || noVideoTrigger;
  }

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="h-8">
      <Play className="h-3 w-3 mr-1" />
      Watch Video
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{exerciseName} - Tutorial</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(videoUrl, '_blank')}
              className="h-8"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Open in YouTube
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full rounded-lg"
            allowFullScreen
            title={`${exerciseName} tutorial video`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}