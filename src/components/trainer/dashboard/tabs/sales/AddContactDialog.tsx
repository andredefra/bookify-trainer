
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SalesContact } from "./types";

interface AddContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (contact: Omit<SalesContact, 'id' | 'createdAt' | 'lastUpdated'>) => void;
  defaultStatus?: SalesContact['status'];
}

export function AddContactDialog({ open, onOpenChange, onAdd, defaultStatus = 'lead' }: AddContactDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    value: '',
    notes: '',
    nextAction: '',
    nextActionDate: '',
    gymStudio: 'MyPersonal Studio — Turin',
    status: defaultStatus
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: SalesContact['status']) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onAdd({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      source: formData.source || undefined,
      value: formData.value ? parseFloat(formData.value) : undefined,
      notes: formData.notes || undefined,
      nextAction: formData.nextAction || undefined,
      nextActionDate: formData.nextActionDate || undefined,
      gymStudio: formData.gymStudio || undefined,
      status: formData.status
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      source: '',
      value: '',
      notes: '',
      nextAction: '',
      nextActionDate: '',
      gymStudio: 'MyPersonal Studio — Turin',
      status: defaultStatus
    });
    
    onOpenChange(false);
  };

  const getTitle = () => {
    switch (formData.status) {
      case 'lead': return 'Add New Lead';
      case 'prospect': return 'Add New Prospect';
      case 'client': return 'Add New Client';
      case 'lost': return 'Add Lost Contact';
      case 'terminated': return 'Add Terminated Contact';
      default: return 'Add Contact';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            Enter the contact details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Type *
              </Label>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source" className="text-right">
                Source
              </Label>
              <Input
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g., Instagram, Referral, Website"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value (€)
              </Label>
              <Input
                id="value"
                name="value"
                type="number"
                step="0.01"
                value={formData.value}
                onChange={handleChange}
                className="col-span-3"
                placeholder="0.00"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nextAction" className="text-right">
                Next Action
              </Label>
              <Input
                id="nextAction"
                name="nextAction"
                value={formData.nextAction}
                onChange={handleChange}
                className="col-span-3"
                placeholder="e.g., Follow-up call, Send proposal"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nextActionDate" className="text-right">
                Action Date
              </Label>
              <Input
                id="nextActionDate"
                name="nextActionDate"
                type="date"
                value={formData.nextActionDate}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="gymStudio" className="text-right pt-2">
                Gym / Studio
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="gymStudio"
                  name="gymStudio"
                  value={formData.gymStudio}
                  readOnly
                  tabIndex={-1}
                  className="bg-muted cursor-not-allowed"
                />
                <p className="text-[11px] text-muted-foreground">
                  Auto-fetched from the client's registered gym / studio.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Contact</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
