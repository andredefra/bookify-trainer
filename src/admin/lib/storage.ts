import { sb } from "./sb";

export type MktBucket = "mkt-media" | "mkt-assets" | "mkt-brand-docs";

export async function uploadToBucket(bucket: MktBucket, file: File, prefix = "") {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${prefix}${prefix ? "/" : ""}${crypto.randomUUID()}.${ext}`;
  const { error } = await sb.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  return path;
}

export async function getSignedUrl(bucket: MktBucket, path: string, expiresIn = 60 * 60) {
  const { data, error } = await sb.storage.from(bucket).createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl as string;
}

export function bucketAndPathFromUrl(url: string): { bucket: MktBucket; path: string } | null {
  // Stored value can be "bucket://path" or just a path with bucket name encoded.
  const m = url.match(/^(mkt-[a-z-]+):\/(.+)$/);
  if (!m) return null;
  return { bucket: m[1] as MktBucket, path: m[2] };
}

export function packBucketUrl(bucket: MktBucket, path: string) {
  return `${bucket}:/${path}`;
}
