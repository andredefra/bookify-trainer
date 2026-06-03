
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
  const [calendars, setCalendars] = useState<ConnectedCalendar[]>([
    { id: "cal-1", provider: "google", email: "trainer@gmail.com", primary: true, twoWaySync: true },
  ]);

  const addCalendar = (provider: CalProvider) => {
    const id = `cal-${Date.now()}`;
    const placeholderEmail =
      provider === "google" ? "new-account@gmail.com"
      : provider === "outlook" ? "new-account@outlook.com"
      : "new-account@icloud.com";
    setCalendars((prev) => [
      ...prev,
      { id, provider, email: placeholderEmail, primary: prev.length === 0, twoWaySync: true },
    ]);
    toast.success(`${PROVIDER_LABEL[provider]} connected`);
  };

  const disconnect = (id: string) => {
    setCalendars((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (next.length && !next.some((c) => c.primary)) next[0].primary = true;
      return next;
    });
    toast.success("Calendar disconnected");
  };

  const setPrimary = (id: string) =>
    setCalendars((prev) => prev.map((c) => ({ ...c, primary: c.id === id })));

  const toggleSync = (id: string, value: boolean) =>
    setCalendars((prev) => prev.map((c) => (c.id === id ? { ...c, twoWaySync: value } : c)));

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
      
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-medium">Calendar Integration</h3>
          <p className="text-sm text-muted-foreground">
            Connect multiple calendars to block your availability across all of them. The primary calendar is where new sessions are created.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4 space-y-3">
          {calendars.length === 0 ? (
            <div className="text-sm text-muted-foreground py-6 text-center">
              No calendars connected yet.
            </div>
          ) : (
            <div className="space-y-2">
              {calendars.map((cal) => (
                <div
                  key={cal.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-md border p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center shrink-0">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium truncate">{cal.email}</span>
                        {cal.primary && (
                          <Badge variant="secondary" className="text-xs">Primary</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{PROVIDER_LABEL[cal.provider]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`sync-${cal.id}`}
                        checked={cal.twoWaySync}
                        onCheckedChange={(v) => toggleSync(cal.id, v)}
                      />
                      <Label htmlFor={`sync-${cal.id}`} className="text-xs text-muted-foreground">
                        Two-way sync
                      </Label>
                    </div>
                    {!cal.primary && (
                      <Button variant="ghost" size="sm" onClick={() => setPrimary(cal.id)}>
                        <Star className="h-4 w-4 mr-1" />
                        Set primary
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => disconnect(cal.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add calendar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => addCalendar("google")}>
                  Google Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCalendar("outlook")}>
                  Outlook / Microsoft 365
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => addCalendar("apple")}>
                  Apple iCloud
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
