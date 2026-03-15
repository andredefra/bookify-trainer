
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface UploadedDoc {
  name: string;
  path: string;
  size: number;
  uploadedAt: string;
}

const MAX_DOCS = 10;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export function HealthDocumentsUpload() {
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.storage
      .from("user-media")
      .list(`health-documents/${user.id}`, { sortBy: { column: "created_at", order: "desc" } });

    if (!error && data) {
      setDocuments(
        data
          .filter((f) => f.name.endsWith(".pdf"))
          .map((f) => ({
            name: f.name,
            path: `health-documents/${user.id}/${f.name}`,
            size: f.metadata?.size || 0,
            uploadedAt: f.created_at || "",
          }))
      );
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be logged in to upload documents");
      return;
    }

    const remaining = MAX_DOCS - documents.length;
    if (remaining <= 0) {
      toast.error(`Maximum of ${MAX_DOCS} documents allowed`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remaining);
    setUploading(true);

    for (const file of filesToUpload) {
      if (file.type !== "application/pdf") {
        toast.error(`"${file.name}" is not a PDF file`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds 20MB limit`);
        continue;
      }

      const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const path = `health-documents/${user.id}/${safeName}`;

      const { error } = await supabase.storage.from("user-media").upload(path, file);
      if (error) {
        toast.error(`Failed to upload "${file.name}"`);
      } else {
        toast.success(`"${file.name}" uploaded`);
      }
    }

    await loadDocuments();
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (doc: UploadedDoc) => {
    const { error } = await supabase.storage.from("user-media").remove([doc.path]);
    if (error) {
      toast.error("Failed to delete document");
    } else {
      toast.success("Document deleted");
      setDocuments((prev) => prev.filter((d) => d.path !== doc.path));
    }
  };

  const handleView = (doc: UploadedDoc) => {
    const { data } = supabase.storage.from("user-media").getPublicUrl(doc.path);
    if (data?.publicUrl) {
      window.open(data.publicUrl, "_blank");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <Label className="flex items-center gap-1 mb-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        Medical Documents (PDF)
      </Label>
      <p className="text-xs text-muted-foreground mb-3">
        Upload up to {MAX_DOCS} PDF documents (e.g., medical reports, lab results, prescriptions). Max 20MB each.
      </p>

      {documents.length > 0 && (
        <div className="space-y-2 mb-3">
          {documents.map((doc) => (
            <div
              key={doc.path}
              className="flex items-center justify-between p-2 rounded-lg border bg-muted/30"
            >
              <button
                type="button"
                onClick={() => handleView(doc)}
                className="flex items-center gap-2 min-w-0 flex-1 text-left hover:underline"
              >
                <FileText className="h-4 w-4 shrink-0 text-red-500" />
                <span className="text-sm truncate">{doc.name.replace(/^\d+_/, "")}</span>
                {doc.size > 0 && (
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatSize(doc.size)}
                  </span>
                )}
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={() => handleDelete(doc)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {documents.length < MAX_DOCS && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </>
            )}
          </Button>
          <span className="text-xs text-muted-foreground ml-2">
            {documents.length}/{MAX_DOCS} documents
          </span>
        </div>
      )}
    </div>
  );
}
