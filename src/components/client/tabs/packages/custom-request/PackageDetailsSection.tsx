
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package } from "lucide-react";

interface PackageDetailsSectionProps {
  formData: {
    packageType: string;
    sessionsCount: string;
    duration: string;
    budget: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export function PackageDetailsSection({ formData, onInputChange }: PackageDetailsSectionProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Package className="h-4 w-4" />
          Package Details
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="packageType">Package Type</Label>
            <Select onValueChange={(value) => onInputChange('packageType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal_training">Personal Training Only</SelectItem>
                <SelectItem value="program_only">Training Program Only</SelectItem>
                <SelectItem value="hybrid">Personal Training + Program</SelectItem>
                <SelectItem value="nutrition_combo">Training + Nutrition Coaching</SelectItem>
                <SelectItem value="specialized">Specialized Service</SelectItem>
                <SelectItem value="group_training">Group Training Package</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionsCount">Number of Sessions</Label>
            <Select onValueChange={(value) => onInputChange('sessionsCount', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select session count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 sessions</SelectItem>
                <SelectItem value="6-10">6-10 sessions</SelectItem>
                <SelectItem value="11-20">11-20 sessions</SelectItem>
                <SelectItem value="21+">21+ sessions</SelectItem>
                <SelectItem value="ongoing">Ongoing program</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Program Duration</Label>
            <Select onValueChange={(value) => onInputChange('duration', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-month">1 month</SelectItem>
                <SelectItem value="3-months">3 months</SelectItem>
                <SelectItem value="6-months">6 months</SelectItem>
                <SelectItem value="12-months">12 months</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select onValueChange={(value) => onInputChange('budget', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-100">Under €100</SelectItem>
                <SelectItem value="100-250">€100 - €250</SelectItem>
                <SelectItem value="250-500">€250 - €500</SelectItem>
                <SelectItem value="500-1000">€500 - €1,000</SelectItem>
                <SelectItem value="1000+">€1,000+</SelectItem>
                <SelectItem value="flexible">Budget flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
