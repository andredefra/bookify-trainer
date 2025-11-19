
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ClientPackage } from "@/hooks/useClientPackages";

const createPackageAssignment = async (
  packageData: ClientPackage,
  clientId: string,
  assignmentId?: string
) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + (packageData.validity_days || 90));

  // If there's an existing assignment (proposed), update it
  if (assignmentId) {
    const { data, error } = await supabase
      .from('client_package_assignments')
      .update({
        purchase_date: new Date().toISOString().split('T')[0],
        expiry_date: expiryDate.toISOString().split('T')[0],
        total_paid: packageData.price,
        status: 'active'
      })
      .eq('id', assignmentId)
      .select()
      .single();

    return { data, error };
  }

  // Otherwise create a new assignment
  const { data, error } = await supabase
    .from('client_package_assignments')
    .insert({
      client_id: clientId,
      trainer_id: packageData.trainer_id,
      package_id: packageData.id,
      purchase_date: new Date().toISOString().split('T')[0],
      expiry_date: expiryDate.toISOString().split('T')[0],
      sessions_used: 0,
      sessions_total: packageData.sessions_count,
      total_paid: packageData.price,
      status: 'active'
    })
    .select()
    .single();

  return { data, error };
};

export function usePackagePayment() {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (
    e: React.FormEvent, 
    packageData: ClientPackage,
    assignmentId: string | undefined,
    onComplete: () => void, 
    onClose: () => void
  ) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(async () => {
      // Get current user or use demo client
      const { data: { user } } = await supabase.auth.getUser();
      const clientId = user?.id || '00000000-0000-0000-0000-000000000002';

      // Create or update package assignment
      const { error } = await createPackageAssignment(packageData, clientId, assignmentId);

      setLoading(false);

      if (error) {
        console.error('Error creating package assignment:', error);
        toast({
          title: "Purchase Failed",
          description: "Failed to create package assignment. Please try again.",
          variant: "destructive"
        });
        return;
      }

      let message = "";
      switch (paymentMethod) {
        case 'card':
          message = "Payment processed successfully with credit card";
          break;
        case 'klarna':
          message = "Klarna payment set up successfully. First installment charged.";
          break;
        case 'paypal':
          message = "PayPal payment completed successfully";
          break;
        case 'cash':
          message = "Cash payment arranged. Pay your trainer directly.";
          break;
      }
      
      toast({
        title: "Payment Successful",
        description: message,
      });
      
      onClose();
      onComplete();
    }, 2000);
  };

  return {
    paymentMethod,
    setPaymentMethod,
    loading,
    cardNumber,
    setCardNumber,
    cardHolder,
    setCardHolder,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    handleSubmit
  };
}
