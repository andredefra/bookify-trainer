import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  Ruler, 
  Camera, 
  Smile, 
  FileText, 
  Plus, 
  Trash2,
  Clock,
  CalendarDays
} from "lucide-react";
import { useCheckInSettings, CheckInSettingsInput, CustomQuestion } from "@/hooks/useCheckInSettings";

interface ConfigureCheckInsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
}

type Frequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

const frequencyLabels: Record<Frequency, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  biweekly: 'Every 2 Weeks',
  monthly: 'Monthly'
};

const frequencyDescriptions: Record<Frequency, string> = {
  daily: 'Client logs every day',
  weekly: 'Client logs once per week',
  biweekly: 'Client logs every two weeks',
  monthly: 'Client logs once per month'
};

export function ConfigureCheckInsDialog({
  open,
  onOpenChange,
  clientId,
  clientName
}: ConfigureCheckInsDialogProps) {
  const { settings, isLoading, saveSettings } = useCheckInSettings(clientId);
  
  const [enabled, setEnabled] = useState(true);
  const [frequency, setFrequency] = useState<Frequency>('weekly');
  const [reminderTime, setReminderTime] = useState('09:00');
  const [includeWeight, setIncludeWeight] = useState(true);
  const [includeMeasurements, setIncludeMeasurements] = useState(true);
  const [includePhotos, setIncludePhotos] = useState(false);
  const [includeMood, setIncludeMood] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(true);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing settings
  useEffect(() => {
    if (settings) {
      setEnabled(settings.enabled);
      setFrequency(settings.frequency);
      setReminderTime(settings.reminder_time || '09:00');
      setIncludeWeight(settings.include_weight);
      setIncludeMeasurements(settings.include_measurements);
      setIncludePhotos(settings.include_photos);
      setIncludeMood(settings.include_mood);
      setIncludeNotes(settings.include_notes);
      setCustomQuestions(settings.custom_questions || []);
    }
  }, [settings]);

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const question: CustomQuestion = {
      id: crypto.randomUUID(),
      question: newQuestion.trim(),
      type: 'text'
    };
    
    setCustomQuestions(prev => [...prev, question]);
    setNewQuestion('');
  };

  const handleRemoveQuestion = (id: string) => {
    setCustomQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    const input: CheckInSettingsInput = {
      frequency,
      enabled,
      reminder_time: reminderTime,
      reminder_days_before: 1,
      include_weight: includeWeight,
      include_measurements: includeMeasurements,
      include_photos: includePhotos,
      include_mood: includeMood,
      include_notes: includeNotes,
      custom_questions: customQuestions
    };
    
    const result = await saveSettings(input);
    
    setIsSaving(false);
    
    if (result) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            Configure Check-ins
          </DialogTitle>
          <DialogDescription>
            Set up periodic check-ins for <span className="font-medium">{clientName}</span>. 
            They'll receive reminders to log their progress.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Check-ins</Label>
              <p className="text-xs text-muted-foreground">
                Activate automatic check-in reminders
              </p>
            </div>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          <Separator />

          {/* Frequency Selection */}
          <div className="space-y-2">
            <Label>Check-in Frequency</Label>
            <Select value={frequency} onValueChange={(v) => setFrequency(v as Frequency)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(frequencyLabels) as Frequency[]).map(freq => (
                  <SelectItem key={freq} value={freq}>
                    <div className="flex flex-col">
                      <span>{frequencyLabels[freq]}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {frequencyDescriptions[frequency]}
            </p>
          </div>

          {/* Reminder Time */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Reminder Time
            </Label>
            <Input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-32"
            />
            <p className="text-xs text-muted-foreground">
              Client will receive a reminder at this time
            </p>
          </div>

          <Separator />

          {/* What to Include */}
          <div className="space-y-3">
            <Label>What to Include</Label>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <Scale className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Weight</p>
                    <p className="text-xs text-muted-foreground">Track body weight</p>
                  </div>
                </div>
                <Switch checked={includeWeight} onCheckedChange={setIncludeWeight} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <Ruler className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Body Measurements</p>
                    <p className="text-xs text-muted-foreground">Chest, waist, hips, quadriceps, arms</p>
                  </div>
                </div>
                <Switch checked={includeMeasurements} onCheckedChange={setIncludeMeasurements} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <Camera className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Progress Photos</p>
                    <p className="text-xs text-muted-foreground">Front, side, back photos</p>
                  </div>
                </div>
                <Switch checked={includePhotos} onCheckedChange={setIncludePhotos} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <Smile className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Mood & Energy</p>
                    <p className="text-xs text-muted-foreground">How they're feeling</p>
                  </div>
                </div>
                <Switch checked={includeMood} onCheckedChange={setIncludeMood} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Notes</p>
                    <p className="text-xs text-muted-foreground">Free-form text notes</p>
                  </div>
                </div>
                <Switch checked={includeNotes} onCheckedChange={setIncludeNotes} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Custom Questions */}
          <div className="space-y-3">
            <Label>Custom Questions (Optional)</Label>
            <p className="text-xs text-muted-foreground">
              Add specific questions for your client to answer
            </p>
            
            {customQuestions.length > 0 && (
              <div className="space-y-2">
                {customQuestions.map((q) => (
                  <div key={q.id} className="flex items-center gap-2 p-2 rounded-lg border bg-muted/50">
                    <span className="flex-1 text-sm">{q.question}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleRemoveQuestion(q.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-2">
              <Textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="e.g., Did you follow the meal plan this week?"
                className="min-h-[60px]"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddQuestion}
              disabled={!newQuestion.trim()}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || isLoading}>
            {isSaving ? 'Saving...' : settings ? 'Update Check-ins' : 'Enable Check-ins'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
