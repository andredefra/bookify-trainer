import { supabase } from "@/integrations/supabase/client";
import { TransactionType } from "@/components/trainer/dashboard/tabs/transactions/types/transactionTypes";

export interface InstallmentDetectionResult {
  isLikelyInstallment: boolean;
  suggestedInstallmentNumber: number;
  totalInstallmentsDetected: number;
  confidence: number;
  reasoning: string;
  parentTransactionId: string | null;
}

export function useInstallmentDetection() {
  const detectPattern = async (
    clientName: string,
    amount: number,
    allTransactions: TransactionType[]
  ): Promise<InstallmentDetectionResult> => {
    try {
      // Filter transactions for the selected client
      const clientTransactions = allTransactions.filter(t => t.client === clientName);
      
      console.log(`Detecting installment pattern for ${clientName} with amount €${amount}`);
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('detect-installment', {
        body: {
          clientName,
          amount,
          transactions: clientTransactions,
          date: new Date().toISOString()
        }
      });

      if (error) {
        console.error('Error detecting installment:', error);
        return {
          isLikelyInstallment: false,
          suggestedInstallmentNumber: 1,
          totalInstallmentsDetected: 1,
          confidence: 0,
          reasoning: 'Error analyzing pattern',
          parentTransactionId: null
        };
      }

      return data as InstallmentDetectionResult;
    } catch (error) {
      console.error('Exception in detectPattern:', error);
      return {
        isLikelyInstallment: false,
        suggestedInstallmentNumber: 1,
        totalInstallmentsDetected: 1,
        confidence: 0,
        reasoning: 'Error analyzing pattern',
        parentTransactionId: null
      };
    }
  };

  return { detectPattern };
}
