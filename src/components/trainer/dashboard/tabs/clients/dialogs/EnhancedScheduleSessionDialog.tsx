import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, AlertTriangle, CreditCard, Package, Clock, Euro } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useClientPackages } from "@/hooks/useClientPackages";

interface EnhancedScheduleSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientName: string;
  clientId?: string;
}

type PaymentMode = 'package' | 'paid' | 'free' | 'renewal';

export function EnhancedScheduleSessionDialog({ 
  open, 
  onOpenChange, 
  clientName,
  clientId = '00000000-0000-0000-0000-000000000002' // Demo client ID
}: EnhancedScheduleSessionDialogProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [sessionType, setSessionType] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('package');
  const [sessionPrice, setSessionPrice] = useState("50");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const { packages, loading: packagesLoading } = useClientPackages();
  
  // Find active package for this client
  const activePackage = packages.find(pkg => 
    pkg.status === 'active' && 
    pkg.sessions_used < pkg.sessions_total
  );
  
  const expiredPackages = packages.filter(pkg => pkg.status === 'expired');
  const hasActivePackage = !!activePackage;
  const remainingSessions = activePackage ? activePackage.sessions_total - activePackage.sessions_used : 0;
  const packageExpiringSoon = activePackage && new Date(activePackage.expiry_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const handleScheduleSession = async () => {
    if (!date || !time || !sessionType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (paymentMode === 'package' && !hasActivePackage) {
      toast({
        title: "Error", 
        description: "No active package available. Please select a different payment method.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate session scheduling with different logic based on payment mode
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let successMessage = "";
      switch (paymentMode) {
        case 'package':
          successMessage = `Session scheduled using package (${remainingSessions - 1} sessions remaining)`;
          break;
        case 'paid':
          successMessage = `Paid session scheduled (€${sessionPrice})`;
          break;
        case 'free':
          successMessage = `Complimentary session scheduled`;
          break;
        case 'renewal':
          successMessage = `Session scheduled - Package renewal required`;
          break;
      }
      
      toast({
        title: "Session Scheduled Successfully",
        description: `${successMessage} with ${clientName} for ${format(date, "PPP")} at ${time}`,
      });
      
      // Reset form
      setDate(undefined);
      setTime("");
      setDuration("60");
      setSessionType("");
      setNotes("");
      setPaymentMode('package');
      setSessionPrice("50");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentModeColor = (mode: PaymentMode) => {
    switch (mode) {
      case 'package': return 'bg-green-50 border-green-200 text-green-800';
      case 'paid': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'free': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'renewal': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Session with {clientName}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Client Package Status - Left Column */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Package Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {packagesLoading ? (
                  <div className="text-sm text-muted-foreground">Loading package info...</div>
                ) : hasActivePackage ? (
                  <>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm font-medium text-green-800">
                        {activePackage.package.title}
                      </div>
                      <div className="text-xs text-green-600 mt-1">
                        {remainingSessions} sessions remaining
                      </div>
                      <div className="text-xs text-green-600">
                        Expires: {format(new Date(activePackage.expiry_date), "PPP")}
                      </div>
                    </div>
                    
                    {packageExpiringSoon && (
                      <Alert className="border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800 text-sm">
                          Package expires in less than 7 days
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                ) : (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm font-medium text-yellow-800">
                      No Active Package
                    </div>
                    <div className="text-xs text-yellow-600 mt-1">
                      Client needs to purchase a package or pay per session
                    </div>
                  </div>
                )}
                
                {expiredPackages.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Recent Packages:</div>
                    {expiredPackages.slice(0, 2).map((pkg) => (
                      <div key={pkg.id} className="p-2 bg-gray-50 border border-gray-200 rounded text-xs">
                        <div className="font-medium">{pkg.package.title}</div>
                        <div className="text-gray-600">Expired: {format(new Date(pkg.expiry_date), "PP")}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Mode Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  {hasActivePackage && (
                    <div 
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-all",
                        paymentMode === 'package' ? getPaymentModeColor('package') : 'border-gray-200 hover:border-gray-300'
                      )}
                      onClick={() => setPaymentMode('package')}
                    >
                      <div className="flex items-center gap-2">
                        <input type="radio" checked={paymentMode === 'package'} onChange={() => {}} />
                        <div>
                          <div className="text-sm font-medium">Use Package Session</div>
                          <div className="text-xs text-muted-foreground">Free for client</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-all",
                      paymentMode === 'paid' ? getPaymentModeColor('paid') : 'border-gray-200 hover:border-gray-300'
                    )}
                    onClick={() => setPaymentMode('paid')}
                  >
                    <div className="flex items-center gap-2">
                      <input type="radio" checked={paymentMode === 'paid'} onChange={() => {}} />
                      <div>
                        <div className="text-sm font-medium">Paid Session</div>
                        <div className="text-xs text-muted-foreground">Single session payment</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-all",
                      paymentMode === 'free' ? getPaymentModeColor('free') : 'border-gray-200 hover:border-gray-300'
                    )}
                    onClick={() => setPaymentMode('free')}
                  >
                    <div className="flex items-center gap-2">
                      <input type="radio" checked={paymentMode === 'free'} onChange={() => {}} />
                      <div>
                        <div className="text-sm font-medium">Complimentary Session</div>
                        <div className="text-xs text-muted-foreground">Free session (trainer decision)</div>
                      </div>
                    </div>
                  </div>

                  {!hasActivePackage && (
                    <div 
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-all",
                        paymentMode === 'renewal' ? getPaymentModeColor('renewal') : 'border-gray-200 hover:border-gray-300'
                      )}
                      onClick={() => setPaymentMode('renewal')}
                    >
                      <div className="flex items-center gap-2">
                        <input type="radio" checked={paymentMode === 'renewal'} onChange={() => {}} />
                        <div>
                          <div className="text-sm font-medium">Schedule + Package Renewal</div>
                          <div className="text-xs text-muted-foreground">Propose new package to client</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {paymentMode === 'paid' && (
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm">Session Price (€)</Label>
                    <div className="flex items-center">
                      <Euro className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="5"
                        value={sessionPrice}
                        onChange={(e) => setSessionPrice(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Session Details - Right Columns */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Session Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date*</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time*</Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Session Type*</Label>
                    <Select value={sessionType} onValueChange={setSessionType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Training</SelectItem>
                        <SelectItem value="assessment">Fitness Assessment</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="program-review">Program Review</SelectItem>
                        <SelectItem value="group">Small Group Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Session Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes for the session (goals, special requirements, etc.)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Payment Summary */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium mb-2">Session Summary:</div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Client: {clientName}</div>
                    <div>Type: {sessionType || 'Not selected'}</div>
                    <div>Duration: {duration} minutes</div>
                    <div className="flex items-center gap-2">
                      <span>Payment:</span>
                      <Badge variant="secondary" className={getPaymentModeColor(paymentMode)}>
                        {paymentMode === 'package' && 'Package Session'}
                        {paymentMode === 'paid' && `€${sessionPrice}`}
                        {paymentMode === 'free' && 'Complimentary'}
                        {paymentMode === 'renewal' && 'Renewal Required'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleScheduleSession} disabled={isLoading}>
            {isLoading ? "Scheduling..." : "Schedule Session"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}