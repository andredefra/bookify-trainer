
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star, CreditCard, DollarSign, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "sonner";
import { PaymentDialog } from "@/components/shared/PaymentDialog";
import { TrainerMarketplace } from "@/components/client/trainers/TrainerMarketplace";

// Mock data for payment history
const paymentHistory = [
  { id: 1, trainer: "Sarah Johnson", amount: 50, date: "2023-06-15", type: "Session" },
  { id: 2, trainer: "Sarah Johnson", amount: 45, date: "2023-06-08", type: "Session" },
  { id: 3, trainer: "Alex Thompson", amount: 120, date: "2023-06-01", type: "Program" },
];

export function TrainersTab() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"trainers" | "payments" | "marketplace">("trainers");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<{name: string, amount: number} | null>(null);
  
  const handlePayTrainer = (trainer: string, amount: number = 45) => {
    setSelectedTrainer({ name: trainer, amount });
    setShowPaymentDialog(true);
  };

  const handlePaymentComplete = () => {
    if (selectedTrainer) {
      toast.success(`Payment to ${selectedTrainer.name} completed successfully`);
    }
    setShowPaymentDialog(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {activeTab === "marketplace" ? "Find New Trainer" : "My Trainers"}
            </CardTitle>
            <CardDescription>
              {activeTab === "marketplace" 
                ? "Browse trainers and book sessions" 
                : "Your personal training team"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {activeTab === "marketplace" ? (
              <Button 
                variant="outline" 
                onClick={() => setActiveTab("trainers")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Trainers
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab(activeTab === "trainers" ? "payments" : "trainers")}
                >
                  {activeTab === "trainers" ? (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      View Payments
                    </>
                  ) : (
                    <>
                      <Star className="mr-2 h-4 w-4" />
                      View Trainers
                    </>
                  )}
                </Button>
                <Button 
                  className="flex items-center"
                  onClick={() => setActiveTab("marketplace")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Find New Trainer
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === "marketplace" ? (
          <TrainerMarketplace />
        ) : activeTab === "trainers" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1374&auto=format&fit=crop" 
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Personal Trainer</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="ml-1 text-sm font-medium">4.9</span>
                  <span className="ml-1 text-xs text-muted-foreground">(48 reviews)</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" onClick={() => navigate('/trainer/1')}>View Profile</Button>
                  <Button variant="outline" size="sm">Message</Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => handlePayTrainer("Sarah Johnson", 45)}
                  >
                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                    Pay
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" 
                  alt="Alex Thompson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">Alex Thompson</h3>
                <p className="text-sm text-muted-foreground">HIIT Specialist</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="ml-1 text-sm font-medium">4.7</span>
                  <span className="ml-1 text-xs text-muted-foreground">(32 reviews)</span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" onClick={() => navigate('/trainer/2')}>View Profile</Button>
                  <Button variant="outline" size="sm">Message</Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handlePayTrainer("Alex Thompson", 50)}
                  >
                    <DollarSign className="h-3.5 w-3.5 mr-1" />
                    Pay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Trainer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.trainer}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>€{payment.amount}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Receipt</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Payment Methods
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Payment Dialog */}
      {selectedTrainer && (
        <PaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          item={{
            id: `trainer-payment-${Date.now()}`,
            name: `Training Session with ${selectedTrainer.name}`,
            price: selectedTrainer.amount,
            description: "Personal training session payment"
          }}
          onPaymentComplete={handlePaymentComplete}
          title={`Pay ${selectedTrainer.name}`}
          description="Complete payment for personal training services"
        />
      )}
    </Card>
  );
}
