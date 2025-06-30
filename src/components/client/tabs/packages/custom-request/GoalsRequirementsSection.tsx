
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface GoalsRequirementsSectionProps {
  formData: {
    goals: string;
    specialRequests: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export function GoalsRequirementsSection({ formData, onInputChange }: GoalsRequirementsSectionProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Your Goals & Requirements
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goals">Fitness Goals</Label>
            <Textarea
              id="goals"
              placeholder="Describe your fitness goals (e.g., weight loss, muscle gain, improve strength, prepare for event, etc.)"
              value={formData.goals}
              onChange={(e) => onInputChange('goals', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requirements or Requests</Label>
            <Textarea
              id="specialRequests"
              placeholder="Any specific requirements, preferences, injuries to consider, equipment availability, schedule constraints, etc."
              value={formData.specialRequests}
              onChange={(e) => onInputChange('specialRequests', e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
