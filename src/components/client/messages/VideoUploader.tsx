import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Video, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface VideoUploaderProps {
  onVideoUploaded: (url: string, thumbnail: string, duration: number, size: number) => void;
  maxSizeMB?: number;
}

export function VideoUploader({ onVideoUploaded, maxSizeMB = 100 }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateThumbnail = (videoFile: File): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        video.currentTime = 1;
      };
      
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      
      video.src = URL.createObjectURL(videoFile);
    });
  };

  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      toast.error(`Video size must be less than ${maxSizeMB}MB`);
      return;
    }

    setUploading(true);

    try {
      const video = document.createElement('video');
      video.preload = 'metadata';
      const duration = await new Promise<number>((resolve) => {
        video.onloadedmetadata = () => resolve(Math.round(video.duration));
        video.src = URL.createObjectURL(file);
      });

      const thumbnail = await generateThumbnail(file);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat-media')
        .getPublicUrl(filePath);

      const thumbnailBlob = await (await fetch(thumbnail)).blob();
      const thumbnailPath = `thumbnails/${fileName}.jpg`;
      
      await supabase.storage
        .from('chat-media')
        .upload(thumbnailPath, thumbnailBlob);

      const { data: { publicUrl: thumbnailUrl } } = supabase.storage
        .from('chat-media')
        .getPublicUrl(thumbnailPath);

      setPreview(publicUrl);
      onVideoUploaded(publicUrl, thumbnailUrl, duration, file.size);
      toast.success('Video uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoSelect}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative">
          <video
            ref={videoRef}
            src={preview}
            controls
            className="w-full rounded-lg max-h-64"
          />
          <Button
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => setPreview(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Video className="h-4 w-4 mr-2" />
              Upload Video
            </>
          )}
        </Button>
      )}
    </div>
  );
}
