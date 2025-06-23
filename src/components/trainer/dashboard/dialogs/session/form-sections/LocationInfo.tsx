
import { MapPin, Navigation } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { SessionFormValues } from "../SessionFormSchema";
import { useState } from "react";

export const LocationInfo = () => {
  const { control, watch, setValue } = useFormContext<SessionFormValues>();
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const mode = watch("mode");
  
  // Only show location fields for in-person sessions
  if (mode !== "in-person") {
    return null;
  }

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
        
        // Reverse geocoding to get address (simplified - in real app would use Google Maps API)
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=it`)
          .then(response => response.json())
          .then(data => {
            if (data.display_name || data.locality) {
              setValue("address", data.display_name || `${data.locality}, ${data.countryName}`);
            }
          })
          .catch(error => {
            console.error("Error getting address:", error);
          })
          .finally(() => {
            setIsGettingLocation(false);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please enter the address manually.");
        setIsGettingLocation(false);
      }
    );
  };

  return (
    <>
      <div className="md:col-span-2">
        <h4 className="text-sm font-medium mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          Location Details
        </h4>
      </div>

      {/* Address */}
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Address *</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input 
                  placeholder="e.g., Palestra Fitness, Via Roma 123, Milano" 
                  {...field} 
                />
              </FormControl>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                disabled={isGettingLocation}
                className="flex items-center whitespace-nowrap"
              >
                <Navigation className="w-4 h-4 mr-1" />
                {isGettingLocation ? "..." : "Use Current"}
              </Button>
            </div>
            <FormDescription>
              Enter the full address where the session will take place
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Location Notes */}
      <FormField
        control={control}
        name="locationNotes"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Additional Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="e.g., Enter through the main entrance and go to the red room on the right"
                className="resize-none"
                rows={3}
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Provide additional instructions to help clients find the exact location
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
