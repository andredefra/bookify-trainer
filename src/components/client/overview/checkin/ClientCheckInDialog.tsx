import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Loader2, Scale, Ruler, Smile, Zap, Moon } from 'lucide-react';
import { CheckInSettings, CheckInMeasurements, CheckInSubmission } from '@/hooks/useClientCheckIns';

interface ClientCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: CheckInSettings | null;
  pendingSubmission?: CheckInSubmission;
  onSubmit: (data: {
    submissionId?: string;
    weight?: number;
    measurements?: CheckInMeasurements;
    mood_rating?: number;
    energy_level?: number;
    sleep_quality?: number;
    notes?: string;
    custom_answers?: Record<string, string>;
  }) => Promise<boolean>;
}

export function ClientCheckInDialog({
  open,
  onOpenChange,
  settings,
  pendingSubmission,
  onSubmit
}: ClientCheckInDialogProps) {
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState<string>(pendingSubmission?.weight?.toString() || '');
  const [measurements, setMeasurements] = useState<CheckInMeasurements>(
    pendingSubmission?.measurements || {}
  );
  const [moodRating, setMoodRating] = useState<number>(pendingSubmission?.mood_rating || 7);
  const [energyLevel, setEnergyLevel] = useState<number>(pendingSubmission?.energy_level || 7);
  const [sleepQuality, setSleepQuality] = useState<number>(pendingSubmission?.sleep_quality || 7);
  const [notes, setNotes] = useState<string>(pendingSubmission?.notes || '');
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>(
    pendingSubmission?.custom_answers || {}
  );

  const handleSubmit = async () => {
    setLoading(true);
    const success = await onSubmit({
      submissionId: pendingSubmission?.id,
      weight: weight ? parseFloat(weight) : undefined,
      measurements: Object.keys(measurements).length > 0 ? measurements : undefined,
      mood_rating: settings?.include_mood ? moodRating : undefined,
      energy_level: settings?.include_mood ? energyLevel : undefined,
      sleep_quality: settings?.include_mood ? sleepQuality : undefined,
      notes: notes || undefined,
      custom_answers: Object.keys(customAnswers).length > 0 ? customAnswers : undefined
    });
    setLoading(false);
    if (success) {
      onOpenChange(false);
    }
  };

  const getMoodEmoji = (value: number) => {
    if (value >= 8) return '😊';
    if (value >= 6) return '🙂';
    if (value >= 4) return '😐';
    if (value >= 2) return '😕';
    return '😞';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Check-in</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Weight */}
          {settings?.include_weight && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Weight (kg)
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          )}

          {/* Measurements */}
          {settings?.include_measurements && (
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Body Measurements (cm)
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Waist</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={measurements.waist || ''}
                    onChange={(e) => setMeasurements(prev => ({ 
                      ...prev, 
                      waist: e.target.value ? parseFloat(e.target.value) : undefined 
                    }))}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Hips</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={measurements.hips || ''}
                    onChange={(e) => setMeasurements(prev => ({ 
                      ...prev, 
                      hips: e.target.value ? parseFloat(e.target.value) : undefined 
                    }))}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Thighs</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={measurements.thighs || ''}
                    onChange={(e) => setMeasurements(prev => ({ 
                      ...prev, 
                      thighs: e.target.value ? parseFloat(e.target.value) : undefined 
                    }))}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Arms</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="cm"
                    value={measurements.arms || ''}
                    onChange={(e) => setMeasurements(prev => ({ 
                      ...prev, 
                      arms: e.target.value ? parseFloat(e.target.value) : undefined 
                    }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mood & Energy */}
          {settings?.include_mood && (
            <>
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Smile className="h-4 w-4" />
                  Mood {getMoodEmoji(moodRating)}
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[moodRating]}
                    onValueChange={([value]) => setMoodRating(value)}
                    min={1}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-8 text-center font-medium">{moodRating}/10</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Energy Level
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[energyLevel]}
                    onValueChange={([value]) => setEnergyLevel(value)}
                    min={1}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-8 text-center font-medium">{energyLevel}/10</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Sleep Quality
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[sleepQuality]}
                    onValueChange={([value]) => setSleepQuality(value)}
                    min={1}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-8 text-center font-medium">{sleepQuality}/10</span>
                </div>
              </div>
            </>
          )}

          {/* Custom Questions */}
          {settings?.custom_questions && settings.custom_questions.length > 0 && (
            <div className="space-y-3">
              {settings.custom_questions.map((q) => (
                <div key={q.id} className="space-y-2">
                  <Label>{q.question}</Label>
                  <Textarea
                    placeholder="Your answer..."
                    value={customAnswers[q.id] || ''}
                    onChange={(e) => setCustomAnswers(prev => ({
                      ...prev,
                      [q.id]: e.target.value
                    }))}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          {settings?.include_notes && (
            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Textarea
                placeholder="How are you feeling? Any updates for your trainer?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Submit Check-in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
