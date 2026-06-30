
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, X, Loader2, Calendar as CalendarIcon, Pencil, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { differenceInDays } from "date-fns";
import { safeFormatDate } from "@/utils/safeFormatDate";

interface UploadedDoc {
  name: string;
  path: string;
  size: number;
  uploadedAt: string;
  expiryDate?: string; // ISO yyyy-MM-dd
  isMock?: boolean;
}

const MAX_DOCS = 10;
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const EXPIRY_STORAGE_KEY = "health-docs-expiry";
const DEMO_EMAIL = "andrea.mypersonal.fit@gmail.com";

function readExpiryMap(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(EXPIRY_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeExpiryMap(map: Record<string, string>) {
  localStorage.setItem(EXPIRY_STORAGE_KEY, JSON.stringify(map));
}

function isDemoAndrea(): boolean {
  try {
    const raw = localStorage.getItem("demo-user");
    if (!raw) return false;
    const u = JSON.parse(raw);
    return (u?.email || "").toLowerCase() === DEMO_EMAIL;
  } catch {
    return false;
  }
}

function getStatus(expiry?: string): { label: string; variant: "secondary" | "destructive" | "default"; className: string; days: number | null } {
  if (!expiry) return { label: "Nessuna scadenza", variant: "secondary", className: "bg-muted text-muted-foreground", days: null };
  const days = differenceInDays(new Date(expiry), new Date());
  if (days < 0) return { label: `Scaduto da ${Math.abs(days)}g`, variant: "destructive", className: "bg-red-100 text-red-700 border-red-200", days };
  if (days <= 30) return { label: `In scadenza tra ${days}g`, variant: "secondary", className: "bg-amber-100 text-amber-700 border-amber-200", days };
  return { label: "Valido", variant: "secondary", className: "bg-green-100 text-green-700 border-green-200", days };
}

export function HealthDocumentsUpload() {
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingExpiry, setPendingExpiry] = useState<string>("");
  const [editingDoc, setEditingDoc] = useState<UploadedDoc | null>(null);
  const [editExpiry, setEditExpiry] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  // Notify once per session when something is expiring or expired
  useEffect(() => {
    if (documents.length === 0) return;
    const alerted = sessionStorage.getItem("health-docs-alerted");
    if (alerted) return;
    const issues = documents
      .map((d) => ({ doc: d, st: getStatus(d.expiryDate) }))
      .filter((x) => x.st.days !== null && x.st.days <= 30);
    if (issues.length > 0) {
      const first = issues[0];
      const cleanName = first.doc.name.replace(/^\d+_/, "");
      if (first.st.days! < 0) {
        toast.error(`Documento medico scaduto: ${cleanName}`, { description: "Aggiorna il documento il prima possibile." });
      } else {
        toast.warning(`Documento medico in scadenza: ${cleanName}`, { description: `Mancano ${first.st.days} giorni. Ricordati di aggiornarlo.` });
      }
      sessionStorage.setItem("health-docs-alerted", "1");
    }
  }, [documents]);

  const buildMockDoc = (): UploadedDoc => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 18);
    const uploaded = new Date();
    uploaded.setMonth(uploaded.getMonth() - 6);
    return {
      name: "Certificato_Medico_Sportivo_2024.pdf",
      path: "__mock__/certificato-medico-sportivo-2024.pdf",
      size: 348 * 1024,
      uploadedAt: uploaded.toISOString(),
      expiryDate: expiry.toISOString().slice(0, 10),
      isMock: true,
    };
  };

  const loadDocuments = async () => {
    const expiryMap = readExpiryMap();
    const { data: { user } } = await supabase.auth.getUser();

    // Demo mode (no auth user): only show mock for Andrea
    if (!user) {
      if (isDemoAndrea()) {
        setDocuments([buildMockDoc()]);
      } else {
        setDocuments([]);
      }
      return;
    }

    const { data, error } = await supabase.storage
      .from("user-media")
      .list(`health-documents/${user.id}`, { sortBy: { column: "created_at", order: "desc" } });

    const realDocs: UploadedDoc[] = !error && data
      ? data
          .filter((f) => f.name.endsWith(".pdf"))
          .map((f) => {
            const path = `health-documents/${user.id}/${f.name}`;
            return {
              name: f.name,
              path,
              size: f.metadata?.size || 0,
              uploadedAt: f.created_at || "",
              expiryDate: expiryMap[path],
            };
          })
      : [];

    // Inject mock doc for Andrea (always visible to demo dev users)
    const finalDocs = isDemoAndrea() ? [buildMockDoc(), ...realDocs] : realDocs;
    setDocuments(finalDocs);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    if (file.type !== "application/pdf") {
      toast.error(`"${file.name}" non è un file PDF`);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`"${file.name}" supera il limite di 20MB`);
      return;
    }
    if (documents.filter((d) => !d.isMock).length >= MAX_DOCS) {
      toast.error(`Massimo ${MAX_DOCS} documenti consentiti`);
      return;
    }

    setPendingFile(file);
    setPendingExpiry("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConfirmUpload = async () => {
    if (!pendingFile || !pendingExpiry) {
      toast.error("Inserisci la data di scadenza");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Devi essere loggato per caricare documenti");
      return;
    }

    setUploading(true);
    const safeName = `${Date.now()}_${pendingFile.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const path = `health-documents/${user.id}/${safeName}`;

    const { error } = await supabase.storage.from("user-media").upload(path, pendingFile);
    if (error) {
      toast.error(`Caricamento di "${pendingFile.name}" fallito`);
    } else {
      const map = readExpiryMap();
      map[path] = pendingExpiry;
      writeExpiryMap(map);
      toast.success(`"${pendingFile.name}" caricato`);
      setPendingFile(null);
      setPendingExpiry("");
      sessionStorage.removeItem("health-docs-alerted");
      await loadDocuments();
    }
    setUploading(false);
  };

  const handleDelete = async (doc: UploadedDoc) => {
    if (doc.isMock) {
      toast.info("Documento demo non eliminabile");
      return;
    }
    const { error } = await supabase.storage.from("user-media").remove([doc.path]);
    if (error) {
      toast.error("Eliminazione fallita");
    } else {
      const map = readExpiryMap();
      delete map[doc.path];
      writeExpiryMap(map);
      toast.success("Documento eliminato");
      setDocuments((prev) => prev.filter((d) => d.path !== doc.path));
    }
  };

  const handleView = (doc: UploadedDoc) => {
    if (doc.isMock) {
      toast.info("Documento demo (mockup) — non apribile");
      return;
    }
    const { data } = supabase.storage.from("user-media").getPublicUrl(doc.path);
    if (data?.publicUrl) window.open(data.publicUrl, "_blank");
  };

  const saveEditedExpiry = () => {
    if (!editingDoc || !editExpiry) return;
    if (editingDoc.isMock) {
      // Update mock in state only
      setDocuments((prev) => prev.map((d) => (d.path === editingDoc.path ? { ...d, expiryDate: editExpiry } : d)));
    } else {
      const map = readExpiryMap();
      map[editingDoc.path] = editExpiry;
      writeExpiryMap(map);
      setDocuments((prev) => prev.map((d) => (d.path === editingDoc.path ? { ...d, expiryDate: editExpiry } : d)));
    }
    sessionStorage.removeItem("health-docs-alerted");
    toast.success("Data di scadenza aggiornata");
    setEditingDoc(null);
    setEditExpiry("");
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Reminder banner
  const expiringDocs = documents
    .map((d) => ({ doc: d, st: getStatus(d.expiryDate) }))
    .filter((x) => x.st.days !== null && x.st.days <= 30);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      {expiringDocs.length > 0 && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-amber-900">
              {expiringDocs.some((x) => (x.st.days ?? 0) < 0)
                ? "Hai documenti medici scaduti"
                : "Documenti medici in scadenza"}
            </p>
            <ul className="text-xs text-amber-800 mt-1 space-y-0.5">
              {expiringDocs.map(({ doc, st }) => (
                <li key={doc.path}>
                  • {doc.name.replace(/^\d+_/, "")} — <span className="font-medium">{st.label}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-amber-700 mt-2">
              Riceverai un promemoria automatico 30 giorni prima della scadenza. Aggiorna il documento per restare in regola.
            </p>
          </div>
        </div>
      )}

      <Label className="flex items-center gap-1 mb-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        Documenti Medici (PDF)
      </Label>
      <p className="text-xs text-muted-foreground mb-3">
        Carica fino a {MAX_DOCS} documenti PDF (es. certificato medico sportivo, esami, referti). Max 20MB ciascuno. La data di scadenza è obbligatoria — riceverai un reminder 30 giorni prima.
      </p>

      {documents.length > 0 && (
        <div className="space-y-2 mb-3">
          {documents.map((doc) => {
            const status = getStatus(doc.expiryDate);
            return (
              <div
                key={doc.path}
                className="flex items-center justify-between p-2 rounded-lg border bg-muted/30 gap-2"
              >
                <button
                  type="button"
                  onClick={() => handleView(doc)}
                  className="flex items-center gap-2 min-w-0 flex-1 text-left hover:underline"
                >
                  <FileText className="h-4 w-4 shrink-0 text-red-500" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm truncate">{doc.name.replace(/^\d+_/, "")}</span>
                      {doc.isMock && (
                        <Badge variant="outline" className="text-[10px] h-5">Demo</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <Badge className={`text-[10px] h-5 ${status.className}`} variant="outline">
                        {status.label}
                      </Badge>
                      {doc.expiryDate && (
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          Scade il {safeFormatDate(doc.expiryDate, "dd/MM/yyyy")}
                        </span>
                      )}
                      {doc.size > 0 && (
                        <span className="text-[11px] text-muted-foreground">{formatSize(doc.size)}</span>
                      )}
                    </div>
                  </div>
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => {
                    setEditingDoc(doc);
                    setEditExpiry(doc.expiryDate || "");
                  }}
                  title="Modifica scadenza"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => handleDelete(doc)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {documents.filter((d) => !d.isMock).length < MAX_DOCS && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileSelect}
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
                Caricamento...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Carica PDF
              </>
            )}
          </Button>
          <span className="text-xs text-muted-foreground ml-2">
            {documents.filter((d) => !d.isMock).length}/{MAX_DOCS} documenti
          </span>
        </div>
      )}

      {/* Expiry date dialog for new upload */}
      <Dialog open={!!pendingFile} onOpenChange={(open) => { if (!open) { setPendingFile(null); setPendingExpiry(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Data di scadenza</DialogTitle>
            <DialogDescription>
              Inserisci la data di scadenza del documento. Riceverai un reminder 30 giorni prima.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {pendingFile && (
              <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                <FileText className="h-4 w-4 text-red-500" />
                <span className="text-sm truncate">{pendingFile.name}</span>
              </div>
            )}
            <div>
              <Label htmlFor="expiry-date">Scadenza *</Label>
              <Input
                id="expiry-date"
                type="date"
                min={today}
                value={pendingExpiry}
                onChange={(e) => setPendingExpiry(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setPendingFile(null); setPendingExpiry(""); }}>
              Annulla
            </Button>
            <Button onClick={handleConfirmUpload} disabled={!pendingExpiry || uploading}>
              {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
              Carica
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit expiry dialog */}
      <Dialog open={!!editingDoc} onOpenChange={(open) => { if (!open) { setEditingDoc(null); setEditExpiry(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifica data di scadenza</DialogTitle>
            <DialogDescription>
              {editingDoc?.name.replace(/^\d+_/, "")}
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="edit-expiry-date">Scadenza *</Label>
            <Input
              id="edit-expiry-date"
              type="date"
              value={editExpiry}
              onChange={(e) => setEditExpiry(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditingDoc(null); setEditExpiry(""); }}>
              Annulla
            </Button>
            <Button onClick={saveEditedExpiry} disabled={!editExpiry}>
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
