import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  File, 
  X, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Loader2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ParsedExercise {
  name: string;
  sets: number;
  reps: string;
  inDatabase: boolean;
  similarExercise?: string;
}

interface ProgramDocumentUploaderProps {
  onDocumentParsed: (exercises: ParsedExercise[]) => void;
}

export function ProgramDocumentUploader({ onDocumentParsed }: ProgramDocumentUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [parsedExercises, setParsedExercises] = useState<ParsedExercise[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && acceptedTypes.includes(droppedFile.type)) {
      setFile(droppedFile);
    } else {
      toast.error("Formato non supportato. Usa PDF o Word.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (acceptedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        toast.error("Formato non supportato. Usa PDF o Word.");
      }
    }
  };

  const analyzeDocument = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Simulate progress for UX
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      // Convert file to base64
      const reader = new FileReader();
      const fileBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Call edge function
      const { data, error } = await supabase.functions.invoke('analyze-program-document', {
        body: {
          fileData: fileBase64,
          fileName: file.name,
          fileType: file.type
        }
      });

      clearInterval(progressInterval);

      if (error) throw error;

      setProgress(100);
      
      const exercises: ParsedExercise[] = data?.exercises || [];
      setParsedExercises(exercises);
      
      // Short delay before notifying parent
      setTimeout(() => {
        onDocumentParsed(exercises);
      }, 500);

    } catch (error) {
      console.error('Error analyzing document:', error);
      toast.error("Errore nell'analisi del documento");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setParsedExercises([]);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusIcon = (exercise: ParsedExercise) => {
    if (exercise.inDatabase) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    if (exercise.similarExercise) {
      return <HelpCircle className="h-4 w-4 text-amber-500" />;
    }
    return <AlertCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (exercise: ParsedExercise) => {
    if (exercise.inDatabase) {
      return <Badge variant="secondary" className="text-[10px] bg-green-100 text-green-700">Nel DB</Badge>;
    }
    if (exercise.similarExercise) {
      return <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700">Simile</Badge>;
    }
    return <Badge variant="secondary" className="text-[10px] bg-red-100 text-red-700">Non trovato</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-medium text-sm">Importa Scheda</h3>
        <p className="text-xs text-muted-foreground">
          Carica un documento Word o PDF con la tua scheda
        </p>
      </div>

      {/* Upload Zone */}
      {!file ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25 hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">Trascina il file qui</p>
          <p className="text-xs text-muted-foreground mt-1">oppure clicca per selezionare</p>
          <p className="text-xs text-muted-foreground mt-2">PDF, DOC, DOCX (max 10MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      ) : (
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={clearFile}
              disabled={isAnalyzing}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          {isAnalyzing && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground">Analisi in corso...</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          {/* Analyze Button */}
          {!isAnalyzing && parsedExercises.length === 0 && (
            <Button 
              className="w-full mt-4 gap-2" 
              onClick={analyzeDocument}
            >
              <Sparkles className="h-4 w-4" />
              Analizza con AI
            </Button>
          )}
        </Card>
      )}

      {/* Parsed Results */}
      {parsedExercises.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Esercizi trovati</p>
            <Badge variant="secondary">{parsedExercises.length}</Badge>
          </div>
          
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {parsedExercises.map((exercise, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
              >
                {getStatusIcon(exercise)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{exercise.name}</p>
                  {exercise.similarExercise && (
                    <p className="text-xs text-muted-foreground">
                      Simile: {exercise.similarExercise}
                    </p>
                  )}
                </div>
                {getStatusBadge(exercise)}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={clearFile}>
              Annulla
            </Button>
            <Button size="sm" className="flex-1" onClick={() => onDocumentParsed(parsedExercises)}>
              Importa
            </Button>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-muted/50 rounded-lg p-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong>Come funziona:</strong> L'AI analizzerà il documento per estrarre gli esercizi e verificherà se sono presenti nel nostro database. Per esercizi non trovati, suggerirà alternative simili.
        </p>
      </div>
    </div>
  );
}