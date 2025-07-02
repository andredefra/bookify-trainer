
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EquipmentImageGalleryProps {
  equipmentImages: { [equipment: string]: string };
  className?: string;
}

export function EquipmentImageGallery({ equipmentImages, className }: EquipmentImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = Object.entries(equipmentImages || {});
  
  if (images.length === 0) {
    return (
      <div className={cn("flex items-center justify-center p-8 bg-gray-50 rounded-md", className)}>
        <ImageIcon className="h-8 w-8 text-gray-400 mr-2" />
        <span className="text-sm text-gray-500">No equipment images available</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const [currentEquipment, currentImageUrl] = images[currentIndex];

  return (
    <div className={cn("space-y-3", className)}>
      {/* Main Image */}
      <div className="relative rounded-lg overflow-hidden bg-gray-100">
        <img
          src={currentImageUrl}
          alt={currentEquipment}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80';
          }}
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentEquipment}
        </div>
        
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
          {images.map(([equipment, imageUrl], index) => (
            <button
              key={equipment}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                index === currentIndex 
                  ? "border-primary ring-2 ring-primary/20" 
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={imageUrl}
                alt={equipment}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
