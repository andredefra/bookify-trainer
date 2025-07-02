
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Link, Image } from 'lucide-react';
import { toast } from 'sonner';
import { getEquipmentImage } from '@/data/exercises/equipmentImageMap';

interface EditEquipmentImagesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: string[];
  currentImages: { [equipment: string]: string };
  onSave: (images: { [equipment: string]: string }) => void;
}

export function EditEquipmentImagesDialog({
  open,
  onOpenChange,
  equipment,
  currentImages,
  onSave
}: EditEquipmentImagesDialogProps) {
  const [images, setImages] = useState<{ [equipment: string]: string }>(currentImages || {});
  const [newUrl, setNewUrl] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');

  const handleAddImage = () => {
    if (!selectedEquipment || !newUrl) {
      toast.error('Please select equipment and enter image URL');
      return;
    }

    try {
      new URL(newUrl); // Validate URL
      setImages(prev => ({
        ...prev,
        [selectedEquipment]: newUrl
      }));
      setNewUrl('');
      setSelectedEquipment('');
      toast.success('Image added successfully');
    } catch {
      toast.error('Please enter a valid URL');
    }
  };

  const handleRemoveImage = (equipment: string) => {
    setImages(prev => {
      const newImages = { ...prev };
      delete newImages[equipment];
      return newImages;
    });
  };

  const handleUseDefault = (equipment: string) => {
    setImages(prev => ({
      ...prev,
      [equipment]: getEquipmentImage(equipment)
    }));
  };

  const handleSave = () => {
    onSave(images);
    onOpenChange(false);
    toast.success('Equipment images updated successfully');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Equipment Images</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add New Image Section */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <Label className="font-medium">Add Equipment Image</Label>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="equipment-select">Equipment</Label>
                    <select
                      id="equipment-select"
                      value={selectedEquipment}
                      onChange={(e) => setSelectedEquipment(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">Select equipment...</option>
                      {equipment.map(eq => (
                        <option key={eq} value={eq}>{eq}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="image-url">Image URL</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="image-url"
                        type="url"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1"
                      />
                      <Button onClick={handleAddImage} size="sm">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Images */}
          <div>
            <Label className="font-medium">Current Equipment Images</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {equipment.map(eq => (
                <Card key={eq} className="relative">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{eq}</Badge>
                      {images[eq] && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveImage(eq)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    {images[eq] ? (
                      <img
                        src={images[eq]}
                        alt={eq}
                        className="w-full h-24 object-cover rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getEquipmentImage(eq);
                        }}
                      />
                    ) : (
                      <div className="w-full h-24 bg-gray-100 rounded flex flex-col items-center justify-center">
                        <Image className="h-6 w-6 text-gray-400 mb-1" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUseDefault(eq)}
                        >
                          Use Default
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Images
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
