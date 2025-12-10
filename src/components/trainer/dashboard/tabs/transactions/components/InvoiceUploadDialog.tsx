import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface InvoiceUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: {
    id: number;
    client: string;
    name: string;
    amount: number;
    date: string;
  } | null;
  onUploadAndSend: (transactionId: number, file: File, sendToClient: boolean, sendEmail: boolean) => void;
}

export const InvoiceUploadDialog = ({
  open,
  onOpenChange,
  transaction,
  onUploadAndSend,
}: InvoiceUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [sendToClient, setSendToClient] = useState(true);
  const [sendEmail, setSendEmail] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file || !transaction) return;
    onUploadAndSend(transaction.id, file, sendToClient, sendEmail);
    setFile(null);
    setSendToClient(true);
    setSendEmail(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    setFile(null);
    setSendToClient(true);
    setSendEmail(false);
    onOpenChange(false);
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Invoice</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Transaction Info */}
          <div className="bg-muted/50 rounded-lg p-3 space-y-1 text-sm">
            <p><span className="text-muted-foreground">Client:</span> {transaction.client}</p>
            <p><span className="text-muted-foreground">Service:</span> {transaction.name}</p>
            <p><span className="text-muted-foreground">Amount:</span> €{transaction.amount.toFixed(2)}</p>
            <p><span className="text-muted-foreground">Date:</span> {transaction.date}</p>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag & drop your invoice PDF here
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              or click to browse
            </p>
          </div>

          {/* File Preview */}
          {file && (
            <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendToClient"
                checked={sendToClient}
                onCheckedChange={(checked) => setSendToClient(checked as boolean)}
              />
              <Label htmlFor="sendToClient" className="text-sm">
                Send to client via messages
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendEmail"
                checked={sendEmail}
                onCheckedChange={(checked) => setSendEmail(checked as boolean)}
              />
              <Label htmlFor="sendEmail" className="text-sm">
                Send email notification to client
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!file}>
            <Upload className="h-4 w-4 mr-2" />
            Upload & Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
