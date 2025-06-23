
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SessionLocationProps {
  address?: string;
  locationNotes?: string;
  latitude?: number;
  longitude?: number;
}

export function SessionLocationDisplay({ 
  address, 
  locationNotes, 
  latitude, 
  longitude 
}: SessionLocationProps) {
  if (!address) return null;

  const handleGetDirections = () => {
    let url = '';
    
    // Check if we have coordinates
    if (latitude && longitude) {
      // Use coordinates for more accurate directions
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        // iOS - use Apple Maps
        url = `maps://maps.apple.com/?daddr=${latitude},${longitude}`;
      } else {
        // Android/Web - use Google Maps
        url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      }
    } else {
      // Fallback to address-based directions
      const encodedAddress = encodeURIComponent(address);
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        // iOS - use Apple Maps
        url = `maps://maps.apple.com/?q=${encodedAddress}`;
      } else {
        // Android/Web - use Google Maps
        url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      }
    }
    
    // Try to open native app first, fallback to web
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.click();
  };

  const handleViewOnMap = () => {
    let url = '';
    
    if (latitude && longitude) {
      url = `https://www.google.com/maps/@${latitude},${longitude},15z`;
    } else {
      const encodedAddress = encodeURIComponent(address);
      url = `https://www.google.com/maps/search/${encodedAddress}`;
    }
    
    window.open(url, '_blank');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
          Session Location
          <Badge variant="outline" className="ml-2">In-Person</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address */}
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-1">Address</h4>
          <p className="text-sm">{address}</p>
        </div>

        {/* Location Notes */}
        {locationNotes && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">Additional Instructions</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{locationNotes}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button 
            onClick={handleGetDirections}
            className="flex items-center justify-center"
            size="sm"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
          
          <Button 
            onClick={handleViewOnMap}
            variant="outline"
            className="flex items-center justify-center"
            size="sm"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Map
          </Button>
        </div>

        {/* Simple embedded map preview */}
        {latitude && longitude && (
          <div className="mt-4">
            <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO6TnYAnoD4N8Q&q=${latitude},${longitude}&zoom=15`}
                allowFullScreen
                className="rounded-md"
                title="Session Location Map"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
