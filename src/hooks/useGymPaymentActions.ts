import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useConfirmCashPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: string) => {
      console.log('Attempting to confirm cash payment for transaction:', transactionId);
      
      // First, let's check the current user
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user?.id);
      
      // Check the transaction before updating
      const { data: existingTransaction, error: fetchError } = await supabase
        .from('gym_package_assignments')
        .select('*')
        .eq('id', transactionId)
        .single();
        
      if (fetchError) {
        console.error('Error fetching transaction:', fetchError);
        throw fetchError;
      }
      
      console.log('Existing transaction:', existingTransaction);
      
      const { data, error } = await supabase
        .from('gym_package_assignments')
        .update({ 
          payment_status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', transactionId)
        .select();

      if (error) {
        console.error('Error updating payment status:', error);
        throw error;
      }
      
      console.log('Update result:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Payment confirmation successful:', data);
      queryClient.invalidateQueries({ queryKey: ['gym-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
      toast.success("Cash payment confirmed successfully");
    },
    onError: (error) => {
      console.error('Error confirming cash payment:', error);
      toast.error(`Failed to confirm cash payment: ${error.message}`);
    }
  });
};

export const useMarkInvoiceSent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: string) => {
      // Note: This would need a new column in the database to track invoice status
      // For now, we'll just show success message as the invoice integration handles the actual sending
      return { success: true, transactionId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gym-transactions'] });
      toast.success("Invoice integration opened successfully");
    },
    onError: (error) => {
      console.error('Error marking invoice as sent:', error);
      toast.error("Failed to process invoice");
    }
  });
};