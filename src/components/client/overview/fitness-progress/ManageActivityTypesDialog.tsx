import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2, Edit, Save, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { ActivityType, ActivityField, GoalImpact } from "./types";
import { customActivityTypesService } from "./services/customActivityTypesService";
import { PREDEFINED_ACTIVITY_TYPES, getAllActivityTypes } from "./data/activityTemplates";
import { GOAL_TEMPLATES } from "./data/goalTemplates";
import { PREDEFINED_UNITS } from "./data/unitsList";

interface ManageActivityTypesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageActivityTypesDialog({ open, onOpenChange }: ManageActivityTypesDialogProps) {
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>(getAllActivityTypes());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState<Partial<ActivityType>>({
    title: "",
    description: "",
    icon: "Activity",
    fields: [],
    calorieCalculation: { method: "per-minute", value: 5 },
    goalImpacts: []
  });

  const refreshActivityTypes = () => {
    setActivityTypes(getAllActivityTypes());
  };

  const handleSave = () => {
    if (!formData.title?.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (formData.fields!.length === 0) {
      toast.error("Please add at least one field");
      return;
    }

    if (customActivityTypesService.checkDuplicateTitle(formData.title, editingId || undefined)) {
      toast.error("An activity type with this title already exists");
      return;
    }

    if (editingId) {
      customActivityTypesService.updateCustomActivityType(editingId, formData as ActivityType);
      toast.success("Activity type updated successfully");
    } else {
      customActivityTypesService.saveCustomActivityType(formData as any);
      toast.success("Activity type created successfully");
    }

    resetForm();
    refreshActivityTypes();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this activity type?")) {
      customActivityTypesService.deleteCustomActivityType(id);
      toast.success("Activity type deleted");
      refreshActivityTypes();
    }
  };

  const handleEdit = (activityType: ActivityType) => {
    setFormData(activityType);
    setEditingId(activityType.id);
    setIsAdding(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "Activity",
      fields: [],
      calorieCalculation: { method: "per-minute", value: 5 },
      goalImpacts: []
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const addField = () => {
    setFormData({
      ...formData,
      fields: [
        ...(formData.fields || []),
        { name: "", label: "", type: "number", required: false, placeholder: "" }
      ]
    });
  };

  const updateField = (index: number, updates: Partial<ActivityField>) => {
    const newFields = [...(formData.fields || [])];
    newFields[index] = { ...newFields[index], ...updates };
    setFormData({ ...formData, fields: newFields });
  };

  const removeField = (index: number) => {
    setFormData({
      ...formData,
      fields: formData.fields?.filter((_, i) => i !== index) || []
    });
  };

  const addGoalImpact = () => {
    const firstGoalType = Object.keys(GOAL_TEMPLATES)[0];
    setFormData({
      ...formData,
      goalImpacts: [
        ...(formData.goalImpacts || []),
        { goalType: firstGoalType, unitMapping: "mins", calculation: "add", sourceField: "" }
      ]
    });
  };

  const updateGoalImpact = (index: number, updates: Partial<GoalImpact>) => {
    const newImpacts = [...(formData.goalImpacts || [])];
    newImpacts[index] = { ...newImpacts[index], ...updates };
    setFormData({ ...formData, goalImpacts: newImpacts });
  };

  const removeGoalImpact = (index: number) => {
    setFormData({
      ...formData,
      goalImpacts: formData.goalImpacts?.filter((_, i) => i !== index) || []
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Manage Activity Types</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)]">
          {!isAdding ? (
            <div className="space-y-4">
              <Button onClick={() => setIsAdding(true)} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Activity Type
              </Button>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">Predefined Types</h3>
                {PREDEFINED_ACTIVITY_TYPES.map(type => (
                  <div key={type.id} className="p-3 border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{type.title}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                      <Badge variant="secondary">Built-in</Badge>
                    </div>
                  </div>
                ))}
              </div>

              {customActivityTypesService.getCustomActivityTypes().length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">Custom Types</h3>
                  {customActivityTypesService.getCustomActivityTypes().map(type => (
                    <div key={type.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{type.title}</h4>
                            <Badge variant="default" className="bg-purple-500">Custom</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(type)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(type.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{editingId ? "Edit" : "Add"} Activity Type</h3>
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="fields">Fields</TabsTrigger>
                  <TabsTrigger value="calories">Calories</TabsTrigger>
                  <TabsTrigger value="goals">Goal Impact</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Yoga Session"
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe this activity type"
                      maxLength={200}
                    />
                  </div>

                  <div>
                    <Label htmlFor="icon">Icon</Label>
                    <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activity">Activity</SelectItem>
                        <SelectItem value="Heart">Heart</SelectItem>
                        <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                        <SelectItem value="Sparkles">Sparkles</SelectItem>
                        <SelectItem value="Zap">Zap</SelectItem>
                        <SelectItem value="Waves">Waves</SelectItem>
                        <SelectItem value="Target">Target</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="fields" className="space-y-4">
                  <Button onClick={addField} size="sm" variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field
                  </Button>

                  {formData.fields?.map((field, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">Field {index + 1}</h4>
                        <Button size="sm" variant="ghost" onClick={() => removeField(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Field Name</Label>
                          <Input
                            value={field.name}
                            onChange={(e) => updateField(index, { name: e.target.value })}
                            placeholder="duration"
                          />
                        </div>
                        <div>
                          <Label>Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(index, { label: e.target.value })}
                            placeholder="Duration (minutes)"
                          />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <Select value={field.type} onValueChange={(value: any) => updateField(index, { type: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Unit</Label>
                          <Input
                            value={field.unit || ""}
                            onChange={(e) => updateField(index, { unit: e.target.value })}
                            placeholder="mins, km, etc."
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.required}
                            onCheckedChange={(checked) => updateField(index, { required: !!checked })}
                          />
                          <Label>Required</Label>
                        </div>
                      </div>

                      {field.type === "select" && (
                        <div>
                          <Label>Options (comma-separated)</Label>
                          <Input
                            value={field.options?.join(", ") || ""}
                            onChange={(e) => updateField(index, { options: e.target.value.split(",").map(s => s.trim()) })}
                            placeholder="Light, Moderate, Vigorous"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="calories" className="space-y-4">
                  <div>
                    <Label>Calculation Method</Label>
                    <Select
                      value={formData.calorieCalculation?.method}
                      onValueChange={(value: any) => setFormData({
                        ...formData,
                        calorieCalculation: { ...formData.calorieCalculation!, method: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Value</SelectItem>
                        <SelectItem value="per-minute">Per Minute</SelectItem>
                        <SelectItem value="per-distance">Per Distance</SelectItem>
                        <SelectItem value="met">MET-based</SelectItem>
                        <SelectItem value="formula">Custom Formula</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.calorieCalculation?.method === "fixed" ||
                    formData.calorieCalculation?.method === "per-minute" ||
                    formData.calorieCalculation?.method === "per-distance") && (
                    <div>
                      <Label>Value (kcal)</Label>
                      <Input
                        type="number"
                        value={formData.calorieCalculation?.value || ""}
                        onChange={(e) => setFormData({
                          ...formData,
                          calorieCalculation: { ...formData.calorieCalculation!, value: Number(e.target.value) }
                        })}
                        placeholder="e.g., 150 for fixed, or 5 for per-minute"
                      />
                    </div>
                  )}

                  {formData.calorieCalculation?.method === "met" && (
                    <div>
                      <Label>MET Value</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.calorieCalculation?.metValue || ""}
                        onChange={(e) => setFormData({
                          ...formData,
                          calorieCalculation: { ...formData.calorieCalculation!, metValue: Number(e.target.value) }
                        })}
                        placeholder="e.g., 3.0 for light, 8.0 for vigorous"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Formula: MET × weight(kg) × duration(hours)
                      </p>
                    </div>
                  )}

                  {formData.calorieCalculation?.method === "formula" && (
                    <div>
                      <Label>Custom Formula</Label>
                      <Input
                        value={formData.calorieCalculation?.formula || ""}
                        onChange={(e) => setFormData({
                          ...formData,
                          calorieCalculation: { ...formData.calorieCalculation!, formula: e.target.value }
                        })}
                        placeholder="e.g., duration * 5 + intensity * 2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use field names as variables (e.g., duration, distance)
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="goals" className="space-y-4">
                  <Button onClick={addGoalImpact} size="sm" variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal Impact
                  </Button>

                  {formData.goalImpacts?.map((impact, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">Impact {index + 1}</h4>
                        <Button size="sm" variant="ghost" onClick={() => removeGoalImpact(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>Goal Type</Label>
                          <Select
                            value={impact.goalType}
                            onValueChange={(value) => updateGoalImpact(index, { goalType: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(GOAL_TEMPLATES).map(([key, template]) => (
                                <SelectItem key={key} value={key}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Unit Mapping</Label>
                          <Select
                            value={impact.unitMapping}
                            onValueChange={(value) => updateGoalImpact(index, { unitMapping: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {PREDEFINED_UNITS.map(unit => (
                                <SelectItem key={unit.value} value={unit.value}>
                                  {unit.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Calculation</Label>
                          <Select
                            value={impact.calculation}
                            onValueChange={(value: any) => updateGoalImpact(index, { calculation: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="add">Add</SelectItem>
                              <SelectItem value="max">Max</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Source Field</Label>
                          <Select
                            value={impact.sourceField}
                            onValueChange={(value) => updateGoalImpact(index, { sourceField: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="calculated_calories">Calculated Calories</SelectItem>
                              {formData.fields?.map(field => (
                                <SelectItem key={field.name} value={field.name}>
                                  {field.label || field.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!formData.goalImpacts || formData.goalImpacts.length === 0) && (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Add at least one goal impact to track progress
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? "Update" : "Create"} Activity Type
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
