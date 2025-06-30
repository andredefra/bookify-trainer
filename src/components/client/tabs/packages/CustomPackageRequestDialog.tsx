
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Package, User, DollarSign, Clock, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CustomPackageRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestSubmitted: () => void;
}

export function CustomPackageRequestDialog({ 
  open, 
  onOpenChange, 
  onRequestSubmitted 
}: CustomPackageRequestDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    packageType: '',
    sessionsCount: '',
    duration: '',
    budget: '',
    goals: '',
    specialRequests: '',
    preferredTrainer: '',
    contactMethod: 'email'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate request submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Custom Package Request Submitted",
        description: "We'll review your request and get back to you within 24 hours with a personalized quote.",
      });
      
      // Reset form
      setFormData({
        packageType: '',
        sessionsCount: '',
        duration: '',
        budget: '',
        goals: '',
        specialRequests: '',
        preferredTrainer: '',
        contactMethod: 'email'
      });
      
      onOpenChange(false);
      onRequestSubmitted();
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Request Custom Package
          </DialogTitle>
          <DialogDescription>
            Tell us what you're looking for and we'll create a personalized training package just for you
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Type Selection */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Package className="h-4 w-4" />
                Package Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="packageType">Package Type</Label>
                  <Select onValueChange={(value) => handleInputChange('packageType', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('sessionsCount', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('duration', value)}>
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
                  <Select onValueChange={(value) => handleInputChange('budget', value)}>
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

          {/* Goals and Requirements */}
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
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requirements or Requests</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any specific requirements, preferences, injuries to consider, equipment availability, schedule constraints, etc."
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trainer Preference */}
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
                    onChange={(e) => handleInputChange('preferredTrainer', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                  <Select onValueChange={(value) => handleInputChange('contactMethod', value)} defaultValue="email">
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

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-800 font-medium mb-1">What happens next?</p>
                <ul className="text-blue-700 space-y-1">
                  <li>• We'll review your request within 24 hours</li>
                  <li>• A suitable trainer will be matched to your needs</li>
                  <li>• You'll receive a personalized quote and package details</li>
                  <li>• Free consultation call to discuss your package</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="sm:w-auto w-full"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !formData.packageType || !formData.goals}
              className="sm:flex-1 w-full"
            >
              {loading ? "Submitting Request..." : "Submit Custom Package Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
