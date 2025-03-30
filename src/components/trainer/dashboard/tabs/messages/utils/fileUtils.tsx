
import { Image, FileText, Video, File } from "lucide-react";
import { ReactNode } from "react";

/**
 * Returns the appropriate icon component based on the file type
 * @param fileType The MIME type of the file
 * @returns A React component representing the file type
 */
export const getFileIcon = (fileType: string): ReactNode => {
  if (fileType.startsWith("image/")) return <Image className="h-4 w-4" />;
  if (fileType.startsWith("video/")) return <Video className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
};

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes The size in bytes
 * @returns A formatted string (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

/**
 * Determines if a file is an image based on its MIME type
 * @param fileType The MIME type of the file
 * @returns Boolean indicating if the file is an image
 */
export const isImageFile = (fileType: string): boolean => {
  return fileType.startsWith("image/");
};
