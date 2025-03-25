
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface PreferencesSectionProps {
  goals: string[];
}

export function PreferencesSection({ goals }: PreferencesSectionProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(goals);

  const handleGoalToggle = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Fitness Goals</h3>
        <div className="space-y-2">
          {["Weight loss", "Muscle tone", "Flexibility", "Cardiovascular health", "Strength building", "Athletic performance"].map((goal) => (
            <div key={goal} className="flex items-center">
              <input
                type="checkbox"
                id={`goal-${goal}`}
                checked={selectedGoals.includes(goal)}
                onChange={() => handleGoalToggle(goal)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={`goal-${goal}`} className="ml-2 text-sm cursor-pointer">
                {goal}
              </label>
            </div>
          ))}
        </div>
        <Button className="mt-4">Save Goals</Button>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-2">Language & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="language">Language</Label>
            <select id="language" className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <Label htmlFor="units">Measurement Units</Label>
            <select id="units" className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option>Metric (kg, cm)</option>
              <option>Imperial (lb, in)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
