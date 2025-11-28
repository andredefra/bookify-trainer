
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SalesContact } from "./types";

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (contact: Omit<SalesContact, 'id' | 'createdAt' | 'lastUpdated'>) => void;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    source?: string;
    value?: number;
    notes?: string;
    nextAction?: string;
    nextActionDate?: string;
  };
}

export function AddLeadDialog({ open, onOpenChange, onAdd, initialData }: AddLeadDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    source: '',
    value: '',
    notes: '',
    nextAction: '',
    nextActionDate: ''
  });

  // Pre-fill form when initialData changes
  useEffect(() => {
    if (initialData && open) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        company: initialData.company || '',
        source: initialData.source || '',
        value: initialData.value?.toString() || '',
        notes: initialData.notes || '',
        nextAction: initialData.nextAction || '',
        nextActionDate: initialData.nextActionDate || ''
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      status: 'lead'
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
      nextActionDate: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Enter the details of the new potential client.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
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
                placeholder="E.g. Website, Referral, Social Media"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value ($)
              </Label>
              <Input
                id="value"
                name="value"
                type="number"
                value={formData.value}
                onChange={handleChange}
                className="col-span-3"
                min="0"
                step="1"
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
                placeholder="E.g. Call, Send proposal"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nextActionDate" className="text-right">
                Date
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
          </div>
          
          <DialogFooter>
            <Button type="submit">Add Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
