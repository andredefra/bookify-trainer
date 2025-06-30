
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

interface TrainerPreferenceSectionProps {
  formData: {
    preferredTrainer: string;
    contactMethod: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export function TrainerPreferenceSection({ formData, onInputChange }: TrainerPreferenceSectionProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <User className="h-4 w-4" />
          Trainer Preference
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="preferredTrainer">Preferred Trainer (Optional)</Label>
            <Input
              id="preferredTrainer"
              placeholder="Enter trainer name or 'No preference'"
              value={formData.preferredTrainer}
              onChange={(e) => onInputChange('preferredTrainer', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactMethod">Preferred Contact Method</Label>
            <Select onValueChange={(value) => onInputChange('contactMethod', value)} defaultValue="email">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="message">In-App Message</SelectItem>
                <SelectItem value="video">Video Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
