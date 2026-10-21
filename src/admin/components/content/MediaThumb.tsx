import { useQuery } from "@tanstack/react-query";
import { bucketAndPathFromUrl, getSignedUrl } from "../../lib/storage";

const VIDEO_EXT = /\.(mp4|mov|webm|m4v|avi|mkv)$/i;

export function isVideoPath(path: string) {
  return VIDEO_EXT.test(path);
}

/** Signed URL cached by path (signed for 1h, cached 50 min). */
export function useSignedMediaUrl(value: string | null | undefined) {
  const parsed = value ? bucketAndPathFromUrl(value) : null;
  return useQuery({
    queryKey: ["mkt_signed_url", parsed?.bucket, parsed?.path],
    enabled: !!parsed,
    staleTime: 50 * 60 * 1000,
    gcTime: 55 * 60 * 1000,
    queryFn: () => getSignedUrl(parsed!.bucket, parsed!.path, 60 * 60),
  });
}

interface Props {
  value: string;
  className?: string;
  /** Show video player with controls (editor) or a muted preview (list). */
  controls?: boolean;
}

export default function MediaThumb({ value, className = "", controls = false }: Props) {
  const parsed = bucketAndPathFromUrl(value);
  const { data: url } = useSignedMediaUrl(value);

  if (!parsed) {
    if (/^https?:\/\//i.test(value)) {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center justify-center text-[10px] underline text-primary break-all p-1 bg-muted ${className}`}
        >
          Link esterno
        </a>
      );
    }
    return (
      <div className={`flex items-center justify-center text-[10px] text-muted-foreground break-all p-1 bg-muted ${className}`}>
        {value}
      </div>
    );
  }

  if (!url) return <div className={`bg-muted animate-pulse ${className}`} />;

  if (isVideoPath(parsed.path)) {
    return controls ? (
      <video src={url} controls preload="metadata" className={`object-cover bg-muted ${className}`} />
    ) : (
      <video src={url} muted preload="metadata" className={`object-cover bg-muted ${className}`} />
    );
  }
  return <img src={url} alt="" loading="lazy" className={`object-cover bg-muted ${className}`} />;
}
