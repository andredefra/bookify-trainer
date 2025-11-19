
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Settings } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAllActivityTypes, getActivityTypeById } from "./data/activityTemplates";
import { estimateCaloriesPreview } from "./utils/calorieCalculator";
import { ActivityType } from "./types";

interface LogActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onManageActivityTypes?: () => void;
}

export function LogActivityDialog({ open, onOpenChange, onSubmit, onManageActivityTypes }: LogActivityDialogProps) {
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date>(new Date());
  const [activityTypeId, setActivityTypeId] = useState<string>("general");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | undefined>();

  useEffect(() => {
    setActivityTypes(getAllActivityTypes());
  }, [open]);

  useEffect(() => {
    const activity = getActivityTypeById(activityTypeId);
    setSelectedActivity(activity);
    
    const newFormData: Record<string, any> = { note: formData.note || "" };
    activity?.fields.forEach(field => {
      newFormData[field.name] = "";
    });
    setFormData(newFormData);
  }, [activityTypeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: date.toISOString(),
      activityTypeId,
      ...formData
    });
    
    setFormData({ note: "" });
    setActivityTypeId("general");
    setDate(new Date());
    onOpenChange(false);
  };

  const renderActivityFields = () => {
    if (!selectedActivity) return null;

    return (
      <>
        {selectedActivity.fields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={field.name}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            {field.type === "select" ? (
              <Select
                value={formData[field.name] || ""}
                onValueChange={(value) => setFormData({ ...formData, [field.name]: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder || "Select..."} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "number" ? (
              <Input
                id={field.name}
                type="number"
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                step={field.step}
              />
            ) : (
              <Input
                id={field.name}
                type="text"
                value={formData[field.name] || ""}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isMobile ? "max-w-[95vw]" : "max-w-md"}>
        <DialogHeader>
          <DialogTitle>Log Activity</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={(newDate) => newDate && setDate(newDate)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="activityType">Activity Type</Label>
            <Select value={activityTypeId} onValueChange={setActivityTypeId}>
              <SelectTrigger id="activityType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    <div className="flex items-center gap-2">
                      <span>{type.title}</span>
                      {type.isCustom && <Badge variant="secondary" className="text-xs bg-purple-500">Custom</Badge>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {renderActivityFields()}

          {selectedActivity && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">
                {estimateCaloriesPreview(selectedActivity, formData)}
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="note">Notes (Optional)</Label>
            <Textarea id="note" value={formData.note || ""} onChange={(e) => setFormData({...formData, note: e.target.value})} placeholder="Any additional details..." rows={2} />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Log Activity</Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>

          {onManageActivityTypes && (
            <Button type="button" variant="ghost" size="sm" onClick={onManageActivityTypes} className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Manage Activity Types
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
