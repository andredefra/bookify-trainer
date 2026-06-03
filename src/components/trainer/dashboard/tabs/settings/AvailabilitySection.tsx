
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

type CalProvider = "google" | "outlook" | "apple";
interface ConnectedCalendar {
  id: string;
  provider: CalProvider;
  email: string;
  primary: boolean;
  twoWaySync: boolean;
}

const PROVIDER_LABEL: Record<CalProvider, string> = {
  google: "Google Calendar",
  outlook: "Outlook / Microsoft 365",
  apple: "Apple iCloud",
};

export function AvailabilitySection() {
  // Week days
  const weekdays = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  
  // Time slots for availability
  const timeSlots = [
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
  ];
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Set Your Availability</h3>
        <p className="text-sm text-muted-foreground">Define when you're available for client sessions.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            {weekdays.map((day) => (
              <div key={day} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox id={`enable-${day.toLowerCase()}`} />
                  <Label htmlFor={`enable-${day.toLowerCase()}`}>{day}</Label>
                </div>
                
                <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`${day.toLowerCase()}-start`}>Start Time</Label>
                    <Select disabled={day === "Sunday"}>
                      <SelectTrigger id={`${day.toLowerCase()}-start`}>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.slice(0, -1).map((time) => (
                          <SelectItem key={`${day}-${time}-start`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor={`${day.toLowerCase()}-end`}>End Time</Label>
                    <Select disabled={day === "Sunday"}>
                      <SelectTrigger id={`${day.toLowerCase()}-end`}>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.slice(1).map((time) => (
                          <SelectItem key={`${day}-${time}-end`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Break time - only show if day is enabled */}
                {day !== "Sunday" && (
                  <div className="ml-6 mt-2">
                    <div className="flex items-center space-x-2 my-2">
                      <Checkbox id={`break-${day.toLowerCase()}`} />
                      <Label htmlFor={`break-${day.toLowerCase()}`}>Add Break</Label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${day.toLowerCase()}-break-start`}>Break Start</Label>
                        <Select disabled>
                          <SelectTrigger id={`${day.toLowerCase()}-break-start`}>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={`${day}-${time}-break-start`} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor={`${day.toLowerCase()}-break-end`}>Break End</Label>
                        <Select disabled>
                          <SelectTrigger id={`${day.toLowerCase()}-break-end`}>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={`${day}-${time}-break-end`} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Session Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="session-duration">Default Session Duration</Label>
                <Select>
                  <SelectTrigger id="session-duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="booking-buffer">Buffer Between Sessions</Label>
                <Select>
                  <SelectTrigger id="booking-buffer">
                    <SelectValue placeholder="Select buffer time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No buffer</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Calendar Integration</h3>
        <p className="text-sm text-muted-foreground">Sync with external calendars to prevent double bookings.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="text-sm text-green-700 font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Google Calendar integration will be available in the full version
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
