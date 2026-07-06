
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SalesContact } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useSalesEntries } from "@/context/SalesEntriesContext";
import { Lock } from "lucide-react";

interface EditableContactDialogProps {
  contact: SalesContact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedContact: SalesContact) => void;
}

export function EditableContactDialog({ 
  contact, 
  open, 
  onOpenChange, 
  onSave 
}: EditableContactDialogProps) {
  const [formData, setFormData] = useState<SalesContact>({...contact});
  const { getTotal } = useSalesEntries();
  const lockedValue = getTotal(formData.email);
  const isClient = formData.status === "client";

  const handleChange = (field: keyof SalesContact, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = isClient ? { ...formData, value: lockedValue } : formData;
    onSave(payload);
    onOpenChange(false);
  };
  
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'yyyy-MM-dd');
    } catch (e) {
      return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                value={formData.name} 
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={(value: SalesContact['status']) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => handleChange('email', e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={formData.phone || ''} 
                onChange={(e) => handleChange('phone', e.target.value)} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                value={formData.company || ''} 
                onChange={(e) => handleChange('company', e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input 
                id="source" 
                value={formData.source || ''} 
                onChange={(e) => handleChange('source', e.target.value)} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value" className="flex items-center gap-1">
                Value ($){isClient && <Lock className="h-3 w-3 text-muted-foreground" />}
              </Label>
              <Input
                id="value"
                type="number"
                min="0"
                step="0.01"
                value={isClient ? lockedValue.toFixed(2) : (formData.value ?? '')}
                onChange={(e) => handleChange('value', parseFloat(e.target.value) || undefined)}
                readOnly={isClient}
                tabIndex={isClient ? -1 : undefined}
                className={isClient ? "bg-muted cursor-not-allowed" : undefined}
              />
              {isClient && (
                <p className="text-[11px] text-muted-foreground">
                  Auto-calculated from this client's Sales — Entries.
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nextActionDate">Next Action Date</Label>
              <Input 
                id="nextActionDate" 
                type="date" 
                value={formatDateForInput(formData.nextActionDate)} 
                onChange={(e) => handleChange('nextActionDate', e.target.value ? new Date(e.target.value).toISOString() : undefined)} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nextAction">Next Action</Label>
            <Input 
              id="nextAction" 
              value={formData.nextAction || ''} 
              onChange={(e) => handleChange('nextAction', e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gymStudio" className="flex items-center gap-1">
              Gym / Studio <Lock className="h-3 w-3 text-muted-foreground" />
            </Label>
            <Input
              id="gymStudio"
              value={formData.gymStudio || '—'}
              readOnly
              tabIndex={-1}
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-[11px] text-muted-foreground">
              Auto-fetched from the client's registered gym / studio.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              value={formData.notes || ''} 
              onChange={(e) => handleChange('notes', e.target.value)} 
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
