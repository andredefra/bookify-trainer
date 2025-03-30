
import { Image, FileText, Video } from "lucide-react";
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
