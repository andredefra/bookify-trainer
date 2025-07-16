import { Building2, MapPin, Phone, Globe, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type GymInfo } from "@/hooks/useTrainerGymAffiliations";

interface GymInfoCardProps {
  gym: GymInfo;
  isPrimary?: boolean;
  onChangePrimary?: () => void;
  showActions?: boolean;
}

export function GymInfoCard({ gym, isPrimary, onChangePrimary, showActions = true }: GymInfoCardProps) {
  return (
    <Card className={isPrimary ? "ring-2 ring-primary/20 bg-primary/5" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {gym.logo_url ? (
            <img 
              src={gym.logo_url} 
              alt={`${gym.name} logo`}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">{gym.name}</h3>
              {isPrimary && (
                <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                  <Star className="w-3 h-3 mr-1 fill-primary" />
                  Primary
                </Badge>
              )}
            </div>
            
            {gym.gym_type && (
              <div className="text-sm text-primary font-medium mb-1">{gym.gym_type}</div>
            )}
            
            {gym.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{gym.description}</p>
            )}
            
            <div className="space-y-1">
              {gym.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{gym.location}</span>
                </div>
              )}
              
              {gym.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{gym.phone}</span>
                </div>
              )}
              
              {gym.website && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <a 
                    href={`https://${gym.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    {gym.website}
                  </a>
                </div>
              )}
            </div>
            
            {gym.amenities && gym.amenities.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-medium text-muted-foreground mb-1">Amenities:</div>
                <div className="flex flex-wrap gap-1">
                  {gym.amenities.slice(0, 4).map((amenity) => (
                    <Badge key={amenity} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {gym.amenities.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{gym.amenities.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {showActions && !isPrimary && onChangePrimary && (
            <div className="flex-shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={onChangePrimary}
              >
                Set as Primary
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}