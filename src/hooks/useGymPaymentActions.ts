import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getCurrentDemoUserId } from "@/utils/demoUserUtils";

export const useConfirmCashPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: string) => {
      console.log('Attempting to confirm cash payment for transaction:', transactionId);
      
      // Check if we're using demo mode
      const demoUser = localStorage.getItem('demo-user');
      let isDemoMode = false;
      let currentUserId = null;
      
      if (demoUser) {
        try {
          const userData = JSON.parse(demoUser);
          if (userData.type === 'gym') {
            isDemoMode = true;
            currentUserId = getCurrentDemoUserId();
            console.log('Demo mode detected for gym user:', currentUserId);
          }
        } catch (error) {
          console.error('Error parsing demo user:', error);
        }
      }
      
      // If not demo mode, check Supabase auth
      if (!isDemoMode) {
        const { data: { user } } = await supabase.auth.getUser();
        currentUserId = user?.id;
        console.log('Supabase auth user:', currentUserId);
      }
      
      if (!currentUserId) {
        throw new Error('User not authenticated');
      }
      
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
      
      // For demo mode, we need to bypass RLS by using a direct update
      // In production, you'd have proper RLS policies
      const { data, error } = await supabase
        .from('gym_package_assignments')
        .update({ 
          payment_status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', transactionId)
        .eq('gym_id', isDemoMode ? '11111111-1111-1111-1111-111111111111' : currentUserId)
        .select();

      if (error) {
        console.error('Error updating payment status:', error);
        throw error;
      }
      
      console.log('Update result:', data);
      
      if (!data || data.length === 0) {
        throw new Error('No transaction updated - check permissions or transaction ID');
      }
      
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