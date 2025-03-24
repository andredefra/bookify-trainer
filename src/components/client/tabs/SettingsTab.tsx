
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Info, CreditCard, Wallet } from "lucide-react";
import { FitnessAppIntegration } from "@/components/client/settings/FitnessAppIntegration";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SettingsTabProps {
  user: { email: string; type: string; name?: string; plan?: string; };
  goals: string[];
}

export function SettingsTab({ user, goals }: SettingsTabProps) {
  const [activeTab, setActiveTab] = useState("account");
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(goals);
  const [paymentMethod, setPaymentMethod] = useState<string>("none");

  const handleGoalToggle = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSaveAccount = () => {
    toast.success("Account information saved successfully");
  };

  const handleSavePaymentMethod = (method: string) => {
    setPaymentMethod(method);
    toast.success(`${method} set as your default payment method`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              
              <div className="pt-2">
                <Button onClick={handleSaveAccount}>Save Changes</Button>
              </div>
            </div>
            
            <Separator />
            
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-700 mb-1">Client Account</h3>
                  <p className="text-sm text-blue-600">
                    The app is always free for clients. Premium features like custom training programs and advanced progress tracking are available based on your trainer's subscription plan.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <p className="text-sm text-muted-foreground">
                Add and manage your payment methods for quick checkout when booking sessions
              </p>
              
              <div className="grid gap-4">
                <div 
                  className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-primary ${paymentMethod === "creditCard" ? "bg-primary/5 border-primary" : ""}`}
                  onClick={() => setPaymentMethod("creditCard")}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Credit/Debit Card</h4>
                      {paymentMethod === "creditCard" && (
                        <p className="text-xs text-muted-foreground">Default payment method</p>
                      )}
                    </div>
                  </div>
                  
                  {paymentMethod === "creditCard" && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="•••" type="password" />
                        </div>
                      </div>
                      <Button onClick={() => handleSavePaymentMethod("creditCard")}>Save Card</Button>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-primary ${paymentMethod === "paypal" ? "bg-primary/5 border-primary" : ""}`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.0001 6.4V17.5C19.0001 17.7652 18.8947 18.0196 18.7072 18.2071C18.5197 18.3946 18.2653 18.5 18.0001 18.5H15.0701L15.8301 20.72C15.9701 21.16 15.5701 21.59 15.1001 21.5H10.8601C10.6901 21.5 10.5301 21.42 10.4301 21.29L6.43005 14.29C6.29005 14.05 6.34005 13.75 6.55005 13.57L10.0001 10.5H5.70005C5.60127 10.4994 5.50361 10.4796 5.41322 10.4416C5.32282 10.4036 5.24147 10.3482 5.17429 10.2785C5.10712 10.2087 5.05552 10.1253 5.02255 10.0336C4.98958 9.94189 4.97598 9.84363 4.98005 9.74536L5.48005 4.74536C5.48846 4.61933 5.53322 4.49923 5.6097 4.4026C5.68618 4.30597 5.79073 4.2378 5.90733 4.20716C6.02393 4.17652 6.14752 4.18509 6.25905 4.23159C6.37058 4.27809 6.46441 4.36 6.52505 4.46536L8.00005 6.41536V3.5C8.00005 3.23478 8.10541 2.98043 8.29294 2.7929C8.48048 2.60536 8.73483 2.5 9.00005 2.5H18.0001C18.2653 2.5 18.5197 2.60536 18.7072 2.7929C18.8947 2.98043 19.0001 3.23478 19.0001 3.5V6.4Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">PayPal</h4>
                      {paymentMethod === "paypal" && (
                        <p className="text-xs text-muted-foreground">Default payment method</p>
                      )}
                    </div>
                  </div>
                  
                  {paymentMethod === "paypal" && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <Label htmlFor="paypalEmail">PayPal Email</Label>
                        <Input id="paypalEmail" type="email" placeholder="your-email@example.com" />
                      </div>
                      <Button onClick={() => handleSavePaymentMethod("paypal")}>Connect PayPal</Button>
                    </div>
                  )}
                </div>
                
                <div 
                  className={`border rounded-lg p-4 transition-all cursor-pointer hover:border-primary ${paymentMethod === "googlePay" ? "bg-primary/5 border-primary" : ""}`}
                  onClick={() => setPaymentMethod("googlePay")}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full">
                      <Wallet className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Google Pay</h4>
                      {paymentMethod === "googlePay" && (
                        <p className="text-xs text-muted-foreground">Default payment method</p>
                      )}
                    </div>
                  </div>
                  
                  {paymentMethod === "googlePay" && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Click the button below to connect to your Google Pay account. You'll be redirected to Google to complete the setup.
                      </p>
                      <Button onClick={() => handleSavePaymentMethod("googlePay")}>Connect Google Pay</Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mt-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-700">
                      Your payment information is securely stored. Your card details are never shared with trainers directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">Fitness Goals</h3>
              <div className="space-y-2">
                {["Weight loss", "Muscle tone", "Flexibility", "Cardiovascular health", "Strength building", "Athletic performance"].map((goal) => (
                  <div key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`goal-${goal}`}
                      checked={selectedGoals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor={`goal-${goal}`} className="ml-2 text-sm cursor-pointer">
                      {goal}
                    </label>
                  </div>
                ))}
              </div>
              <Button className="mt-4">Save Goals</Button>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Language & Region</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select id="language" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="units">Measurement Units</Label>
                  <select id="units" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>Metric (kg, cm)</option>
                    <option>Imperial (lb, in)</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <FitnessAppIntegration user={user} />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Receive emails about your account</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Session Reminders</h3>
                  <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Workout Notifications</h3>
                  <p className="text-sm text-muted-foreground">Daily workout reminders</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Marketing</h3>
                  <p className="text-sm text-muted-foreground">Receive promotions and news</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
