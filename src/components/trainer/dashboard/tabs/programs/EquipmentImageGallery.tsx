
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image, ZoomIn, X } from 'lucide-react';

interface EquipmentImageGalleryProps {
  equipmentImages: { [equipment: string]: string };
  className?: string;
}

export function EquipmentImageGallery({ equipmentImages, className }: EquipmentImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{ equipment: string; url: string } | null>(null);
  
  const equipmentEntries = Object.entries(equipmentImages);
  
  if (equipmentEntries.length === 0) {
    return null;
  }

  return (
    <>
      <div className={className}>
        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
          <Image className="h-4 w-4 text-purple-500" />
          Equipment ({equipmentEntries.length})
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {equipmentEntries.map(([equipment, imageUrl]) => (
            <div key={equipment} className="relative group cursor-pointer">
              <div 
                className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 border-2 border-transparent hover:border-blue-300 transition-all duration-200"
                onClick={() => setSelectedImage({ equipment, url: imageUrl })}
              >
                <img
                  src={imageUrl}
                  alt={equipment}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                  <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <Badge variant="secondary" className="text-xs bg-white/90 text-gray-800">
                    {equipment}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="capitalize">{selectedImage?.equipment}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImage(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.equipment}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop';
                }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
