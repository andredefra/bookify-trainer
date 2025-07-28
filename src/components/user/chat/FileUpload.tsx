import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FileUploadProps {
  onFileSelect: (file: File, url: string) => void;
  disabled?: boolean;
}

export function FileUpload({ onFileSelect, disabled }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const acceptedTypes = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    'video/*': ['.mp4', '.webm', '.mov'],
    'audio/*': ['.mp3', '.wav', '.m4a'],
    'application/pdf': ['.pdf'],
    'text/*': ['.txt']
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getFileType = (file: File): 'image' | 'video' | 'audio' | 'file' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return 'file';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File troppo grande',
        description: 'Il file non può superare i 10MB',
        variant: 'destructive'
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `chat-media/${fileName}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, selectedFile);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      onFileSelect(selectedFile, publicUrl);
      setSelectedFile(null);
      
      toast({
        title: 'File caricato',
        description: 'Il file è stato caricato con successo'
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Errore caricamento',
        description: 'Impossibile caricare il file',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {selectedFile && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          {getFileIcon(selectedFile.type)}
          <span className="text-sm font-medium truncate flex-1">
            {selectedFile.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {(selectedFile.size / 1024 / 1024).toFixed(1)}MB
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={clearFile}
            disabled={isUploading}
          >
            <X className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? 'Caricamento...' : 'Invia'}
          </Button>
        </div>
      )}

      <div className="space-y-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading || !!selectedFile}
          className="w-fit"
        >
          <Upload className="h-4 w-4 mr-2" />
          Allega file
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Supportati: Immagini (JPG, PNG, GIF), Video (MP4, MOV), Audio (MP3, WAV), PDF, documenti di testo (max 10MB)
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={Object.keys(acceptedTypes).join(',')}
        onChange={handleFileSelect}
      />
    </div>
  );
}