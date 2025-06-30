
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceIconSelector } from "./ServiceIconSelector";
import { AdditionalService } from "./types";

interface CreateServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (service: Omit<AdditionalService, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function CreateServiceDialog({ open, onOpenChange, onSubmit }: CreateServiceDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "" as AdditionalService['category'],
    icon: "MessageCircle",
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.category) return;

    onSubmit(formData);
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "" as AdditionalService['category'],
      icon: "MessageCircle",
      isActive: true
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crea Nuovo Servizio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome del servizio</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="es. Supporto WhatsApp 24/7"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrivi il servizio che offri..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prezzo (€)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value: AdditionalService['category']) => 
                  setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consulenza</SelectItem>
                  <SelectItem value="nutrition">Nutrizione</SelectItem>
                  <SelectItem value="support">Supporto</SelectItem>
                  <SelectItem value="wellness">Benessere</SelectItem>
                  <SelectItem value="other">Altro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Icona</Label>
            <ServiceIconSelector
              value={formData.icon}
              onChange={(icon) => setFormData({ ...formData, icon })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annulla
            </Button>
            <Button type="submit">Crea Servizio</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
