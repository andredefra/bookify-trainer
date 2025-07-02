
import { Images } from 'lucide-react';

interface EquipmentThumbnailProps {
  equipmentImages: { [equipment: string]: string };
  className?: string;
}

export function EquipmentThumbnail({ equipmentImages, className }: EquipmentThumbnailProps) {
  const imageCount = Object.keys(equipmentImages || {}).length;
  
  if (imageCount === 0) {
    return null;
  }

  const firstImage = Object.values(equipmentImages)[0];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="relative">
        <img
          src={firstImage}
          alt="Equipment"
          className="w-8 h-8 rounded object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <Images className="w-3 h-3 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
      </div>
      {imageCount > 1 && (
        <span className="text-xs text-muted-foreground">+{imageCount - 1}</span>
      )}
    </div>
  );
}
