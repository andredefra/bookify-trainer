import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useConfirmCashPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: string) => {
      const { data, error } = await supabase
        .from('gym_package_assignments')
        .update({ 
          payment_status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('id', transactionId)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gym-transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
      toast.success("Cash payment confirmed successfully");
    },
    onError: (error) => {
      console.error('Error confirming cash payment:', error);
      toast.error("Failed to confirm cash payment");
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