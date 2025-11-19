
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { GOAL_TEMPLATES } from "./data/goalTemplates";
import { PREDEFINED_UNITS } from "./data/unitsList";
import { customGoalTypesService, CustomGoalTemplate } from "./services/customGoalTypesService";

interface ManageGoalTypesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGoalTypesUpdated?: () => void;
}

export function ManageGoalTypesDialog({ open, onOpenChange, onGoalTypesUpdated }: ManageGoalTypesDialogProps) {
  const [customTypes, setCustomTypes] = useState<CustomGoalTemplate[]>(
    customGoalTypesService.getCustomGoalTypes()
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    guide: "",
    examplePlaceholder: "",
    unit: "",
    customUnit: "",
    defaultTarget: 0
  });

  const resetForm = () => {
    setFormData({
      title: "",
      guide: "",
      examplePlaceholder: "",
      unit: "",
      customUnit: "",
      defaultTarget: 0
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (type: CustomGoalTemplate) => {
    setFormData({
      title: type.title,
      guide: type.guide,
      examplePlaceholder: type.examplePlaceholder,
      unit: type.customUnit ? 'custom' : type.unit,
      customUnit: type.customUnit || "",
      defaultTarget: type.defaultTarget || 0
    });
    setEditingId(type.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (!deleteConfirmId) return;
    
    if (customGoalTypesService.deleteCustomGoalType(deleteConfirmId)) {
      setCustomTypes(customGoalTypesService.getCustomGoalTypes());
      toast.success("Goal type deleted successfully");
      onGoalTypesUpdated?.();
    } else {
      toast.error("Failed to delete goal type");
    }
    
    setDeleteConfirmId(null);
  };

  const handleSave = () => {
    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (formData.title.length > 50) {
      toast.error("Title must be less than 50 characters");
      return;
    }
    if (!formData.guide.trim()) {
      toast.error("Guide is required");
      return;
    }
    if (formData.guide.length > 500) {
      toast.error("Guide must be less than 500 characters");
      return;
    }
    if (!formData.examplePlaceholder.trim()) {
      toast.error("Example placeholder is required");
      return;
    }
    if (!formData.examplePlaceholder.startsWith("E.g. ")) {
      toast.error("Example placeholder must start with 'E.g. '");
      return;
    }
    if (formData.examplePlaceholder.length > 100) {
      toast.error("Example placeholder must be less than 100 characters");
      return;
    }
    if (!formData.unit) {
      toast.error("Unit is required");
      return;
    }
    if (formData.unit === 'custom' && !formData.customUnit.trim()) {
      toast.error("Custom unit is required");
      return;
    }

    // Check for duplicate title
    if (customGoalTypesService.checkDuplicateTitle(formData.title, editingId || undefined)) {
      toast.error("A goal type with this title already exists");
      return;
    }

    const finalUnit = formData.unit === 'custom' ? formData.customUnit : formData.unit;
    
    if (editingId) {
      // Update existing
      if (customGoalTypesService.updateCustomGoalType(editingId, {
        title: formData.title,
        name: formData.title,
        guide: formData.guide,
        description: formData.guide,
        examplePlaceholder: formData.examplePlaceholder,
        unit: finalUnit,
        customUnit: formData.unit === 'custom' ? formData.customUnit : undefined,
        defaultTarget: formData.defaultTarget
      })) {
        toast.success("Goal type updated successfully");
      } else {
        toast.error("Failed to update goal type");
        return;
      }
    } else {
      // Create new
      const typeKey = formData.title.toLowerCase().replace(/\s+/g, '_');
      customGoalTypesService.saveCustomGoalType({
        type: typeKey,
        name: formData.title,
        title: formData.title,
        description: formData.guide,
        guide: formData.guide,
        unit: finalUnit,
        customUnit: formData.unit === 'custom' ? formData.customUnit : undefined,
        examplePlaceholder: formData.examplePlaceholder,
        defaultTarget: formData.defaultTarget,
        examples: formData.guide.split('\n').filter(line => line.trim().startsWith('-'))
      });
      toast.success("Goal type created successfully");
    }

    setCustomTypes(customGoalTypesService.getCustomGoalTypes());
    resetForm();
    onGoalTypesUpdated?.();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Goal Types</DialogTitle>
            <DialogDescription>
              View predefined goal types and create custom ones tailored to your needs
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Predefined Goal Types */}
            <div>
              <h3 className="text-sm font-medium mb-3">Predefined Goal Types</h3>
              <div className="space-y-2">
                {Object.values(GOAL_TEMPLATES).map((template) => (
                  <div
                    key={template.type}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{template.name}</span>
                        <Badge variant="secondary" className="text-xs">Predefined</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                      <p className="text-xs text-muted-foreground">Unit: {template.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Goal Types */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Custom Goal Types</h3>
                {!showForm && (
                  <Button
                    size="sm"
                    onClick={() => setShowForm(true)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Custom Type
                  </Button>
                )}
              </div>

              {customTypes.length === 0 && !showForm && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No custom goal types yet. Create one to get started!
                </p>
              )}

              <div className="space-y-2">
                {customTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{type.title}</span>
                        <Badge variant="default" className="text-xs bg-purple-600">Custom</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Unit: {type.customUnit || type.unit}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(type)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(type.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add/Edit Form */}
              {showForm && (
                <div className="mt-4 p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {editingId ? 'Edit Goal Type' : 'Add New Goal Type'}
                    </h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={resetForm}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g. Swimming Distance"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        maxLength={50}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.title.length}/50 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="guide">Guide *</Label>
                      <Textarea
                        id="guide"
                        placeholder="Improve swimming distance and endurance&#10;Examples:&#10;- Swim 1000m without stopping&#10;- Complete 50 laps in the pool"
                        value={formData.guide}
                        onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                        maxLength={500}
                        rows={5}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.guide.length}/500 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="examplePlaceholder">Example Placeholder *</Label>
                      <Input
                        id="examplePlaceholder"
                        placeholder="E.g. Swim 1000m without stopping"
                        value={formData.examplePlaceholder}
                        onChange={(e) => setFormData({ ...formData, examplePlaceholder: e.target.value })}
                        maxLength={100}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Must start with "E.g. " ({formData.examplePlaceholder.length}/100)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="unit">Unit *</Label>
                      <Select
                        value={formData.unit}
                        onValueChange={(value) => setFormData({ ...formData, unit: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {PREDEFINED_UNITS.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.unit === 'custom' && (
                      <div>
                        <Label htmlFor="customUnit">Custom Unit *</Label>
                        <Input
                          id="customUnit"
                          placeholder="e.g. laps, rounds"
                          value={formData.customUnit}
                          onChange={(e) => setFormData({ ...formData, customUnit: e.target.value })}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="defaultTarget">Default Target Value</Label>
                      <Input
                        id="defaultTarget"
                        type="number"
                        value={formData.defaultTarget}
                        onChange={(e) => setFormData({ ...formData, defaultTarget: parseFloat(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      {editingId ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Goal Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this custom goal type? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
