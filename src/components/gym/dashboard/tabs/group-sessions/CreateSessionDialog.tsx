import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { GymGroupSession } from "@/hooks/gym/useGymGroupSessions";
import { SESSION_TYPES, DIFFICULTY_LEVELS, RECURRENCE_PATTERNS } from "@/constants/sessionTypes";

interface CreateSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateSession: (sessionData: Omit<GymGroupSession, 'id' | 'gym_id' | 'created_at' | 'updated_at'>) => void;
}

export function CreateSessionDialog({ open, onOpenChange, onCreateSession }: CreateSessionDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    max_participants: 20,
    duration_minutes: 60,
    session_type: "group_class",
    difficulty_level: "intermediate",
    requirements: "",
    equipment_needed: "",
    location: "",
    is_recurring: false,
    recurrence_pattern: "",
    status: "active" as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateSession(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      title: "",
      description: "",
      max_participants: 20,
      duration_minutes: 60,
      session_type: "group_class",
      difficulty_level: "intermediate",
      requirements: "",
      equipment_needed: "",
      location: "",
      is_recurring: false,
      recurrence_pattern: "",
      status: "active"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <div className="p-1">
        <DialogHeader>
          <DialogTitle>Create New Group Session</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Session Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Morning HIIT Blast"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="session_type">Session Type</Label>
              <Select value={formData.session_type} onValueChange={(value) => setFormData({ ...formData, session_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background max-h-60 overflow-auto">
                  {SESSION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the session and its benefits"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_participants">Max Participants</Label>
              <Input
                id="max_participants"
                type="number"
                value={formData.max_participants}
                onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
                min="1"
                max="50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Duration (minutes)</Label>
              <Input
                id="duration_minutes"
                type="number"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                min="15"
                max="180"
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Nota:</strong> Le sessioni di gruppo sono incluse nei pacchetti clienti. 
              I clienti con pacchetti attivi possono partecipare senza costi aggiuntivi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty_level">Difficulty Level</Label>
              <Select value={formData.difficulty_level} onValueChange={(value) => setFormData({ ...formData, difficulty_level: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Studio A, Pool Area"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Input
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="e.g., Basic fitness level required"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipment_needed">Equipment Needed</Label>
            <Input
              id="equipment_needed"
              value={formData.equipment_needed}
              onChange={(e) => setFormData({ ...formData, equipment_needed: e.target.value })}
              placeholder="e.g., Yoga mats, dumbbells, resistance bands"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_recurring"
              checked={formData.is_recurring}
              onCheckedChange={(checked) => setFormData({ ...formData, is_recurring: !!checked })}
            />
            <Label htmlFor="is_recurring">Recurring Session</Label>
          </div>

          {formData.is_recurring && (
            <div className="space-y-2">
              <Label htmlFor="recurrence_pattern">Recurrence Pattern</Label>
              <Select value={formData.recurrence_pattern} onValueChange={(value) => setFormData({ ...formData, recurrence_pattern: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background">
                  {RECURRENCE_PATTERNS.map((pattern) => (
                    <SelectItem key={pattern.value} value={pattern.value}>
                      {pattern.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Session
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}