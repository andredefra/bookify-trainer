
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SalesContact } from "../SalesTab";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

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
  
  const handleChange = (field: keyof SalesContact, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
          <DialogTitle>Modifica Contatto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name"
                value={formData.name} 
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Stato</Label>
              <Select 
                value={formData.status}
                onValueChange={(value: SalesContact['status']) => handleChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                  <SelectItem value="client">Cliente</SelectItem>
                  <SelectItem value="lost">Perso</SelectItem>
                  <SelectItem value="terminated">Terminato</SelectItem>
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
              <Label htmlFor="phone">Telefono</Label>
              <Input 
                id="phone" 
                value={formData.phone || ''} 
                onChange={(e) => handleChange('phone', e.target.value)} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Azienda</Label>
              <Input 
                id="company" 
                value={formData.company || ''} 
                onChange={(e) => handleChange('company', e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source">Fonte</Label>
              <Input 
                id="source" 
                value={formData.source || ''} 
                onChange={(e) => handleChange('source', e.target.value)} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Valore (€)</Label>
              <Input 
                id="value" 
                type="number" 
                min="0"
                step="0.01"
                value={formData.value || ''} 
                onChange={(e) => handleChange('value', parseFloat(e.target.value) || undefined)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nextActionDate">Data prossima azione</Label>
              <Input 
                id="nextActionDate" 
                type="date" 
                value={formatDateForInput(formData.nextActionDate)} 
                onChange={(e) => handleChange('nextActionDate', e.target.value ? new Date(e.target.value).toISOString() : undefined)} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nextAction">Prossima azione</Label>
            <Input 
              id="nextAction" 
              value={formData.nextAction || ''} 
              onChange={(e) => handleChange('nextAction', e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Note</Label>
            <Textarea 
              id="notes" 
              value={formData.notes || ''} 
              onChange={(e) => handleChange('notes', e.target.value)} 
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button type="submit">Salva</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
