import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Scale, Ruler, Brain, FileText } from "lucide-react";
import { MeasurementGuidePopover } from "@/components/client/overview/fitness-progress/MeasurementGuidePopover";

interface ManualCheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
}

export function ManualCheckInDialog({
  open,
  onOpenChange,
  clientId,
  clientName,
}: ManualCheckInDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [weight, setWeight] = useState("");
  const [measurements, setMeasurements] = useState({
    chest: "",
    waist: "",
    hips: "",
    quadriceps: "",
    arms: "",
    shoulders: "",
    neck: "",
  });
  const [moodRating, setMoodRating] = useState([5]);
  const [energyLevel, setEnergyLevel] = useState([5]);
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const trainerId = "00000000-0000-0000-0000-000000000001";
      
      // Create a completed check-in submission
      const { error } = await supabase.from("check_in_submissions").insert({
        client_id: clientId,
        trainer_id: trainerId,
        settings_id: "00000000-0000-0000-0000-000000000000", // Placeholder for manual entries
        due_date: new Date().toISOString().split("T")[0],
        status: "reviewed",
        completed_at: new Date().toISOString(),
        trainer_reviewed_at: new Date().toISOString(),
        weight: weight ? parseFloat(weight) : null,
        measurements: {
          chest: measurements.chest ? parseFloat(measurements.chest) : null,
          waist: measurements.waist ? parseFloat(measurements.waist) : null,
          
          hips: measurements.hips ? parseFloat(measurements.hips) : null,
          quadriceps: measurements.quadriceps ? parseFloat(measurements.quadriceps) : null,
          arms: measurements.arms ? parseFloat(measurements.arms) : null,
          shoulders: measurements.shoulders ? parseFloat(measurements.shoulders) : null,
          neck: measurements.neck ? parseFloat(measurements.neck) : null,
        },
        mood_rating: moodRating[0],
        energy_level: energyLevel[0],
        notes: notes || null,
      });

      if (error) throw error;

      toast({
        title: "Metrics logged successfully",
        description: `Data recorded for ${clientName}`,
      });
      
      // Reset form
      setWeight("");
      setMeasurements({ chest: "", waist: "", abdomen: "", hips: "", quadriceps: "", arms: "", shoulders: "", neck: "" });
      setMoodRating([5]);
      setEnergyLevel([5]);
      setNotes("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error logging metrics:", error);
      toast({
        title: "Error",
        description: "Failed to log metrics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log Metrics for {clientName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Weight */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Weight (kg)
            </Label>
            <Input
              type="number"
              step="0.1"
              placeholder="e.g. 75.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Body Measurements */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Body Measurements (cm)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Chest</Label>
                <Input type="number" step="0.1" placeholder="cm"
                  value={measurements.chest}
                  onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Waist</Label>
                <Input type="number" step="0.1" placeholder="cm"
                  value={measurements.waist}
                  onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Abdomen</Label>
                <Input type="number" step="0.1" placeholder="cm"
                  value={measurements.abdomen}
                  onChange={(e) => setMeasurements({ ...measurements, abdomen: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Hips</Label>
                <Input type="number" step="0.1" placeholder="cm"
                  value={measurements.hips}
                  onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Quadriceps</Label>
                <Input type="number" step="0.1" placeholder="cm"
                  value={measurements.quadriceps}
                  onChange={(e) => setMeasurements({ ...measurements, quadriceps: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Arms</Label>
                <Input type="number" step="0.1" placeholder="cm"
                  value={measurements.arms}
                  onChange={(e) => setMeasurements({ ...measurements, arms: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Shoulders</Label>
                <Input type="number" step="0.1" placeholder="cm"
                  value={measurements.shoulders}
                  onChange={(e) => setMeasurements({ ...measurements, shoulders: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Neck</Label>
                <Input type="number" step="0.1" placeholder="cm"
                  value={measurements.neck}
                  onChange={(e) => setMeasurements({ ...measurements, neck: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Mood & Energy */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Mood & Energy
            </Label>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Mood Rating</span>
                  <span>{moodRating[0]}/10</span>
                </div>
                <Slider
                  value={moodRating}
                  onValueChange={setMoodRating}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Energy Level</span>
                  <span>{energyLevel[0]}/10</span>
                </div>
                <Slider
                  value={energyLevel}
                  onValueChange={setEnergyLevel}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </Label>
            <Textarea
              placeholder="Additional observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Metrics"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
