import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PackagePayment {
  id: string;
  packageAssignmentId: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate?: string;
  dueDate?: string;
  notes?: string;
  createdAt: string;
}

export const usePackagePayments = (packageAssignmentId?: string) => {
  const [payments, setPayments] = useState<PackagePayment[]>([]);
  const [packagePrice, setPackagePrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async (assignmentId: string) => {
    try {
      setLoading(true);

      // Fetch payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('client_package_payments')
        .select('*')
        .eq('package_assignment_id', assignmentId)
        .order('created_at', { ascending: true });

      if (paymentsError) throw paymentsError;

      // Fetch package price
      const { data: assignmentData, error: assignmentError } = await supabase
        .from('client_package_assignments')
        .select('package_id, client_packages!inner(price)')
        .eq('id', assignmentId)
        .single();

      if (assignmentError) throw assignmentError;

      const transformedPayments = (paymentsData || []).map((payment) => ({
        id: payment.id,
        packageAssignmentId: payment.package_assignment_id,
        amount: payment.amount,
        paymentMethod: payment.payment_method || 'stripe',
        paymentStatus: payment.payment_status || 'pending',
        paymentDate: payment.payment_date || undefined,
        dueDate: (payment as any).due_date || undefined,
        notes: payment.notes,
        createdAt: payment.created_at,
      }));

      setPayments(transformedPayments);
      setPackagePrice(assignmentData.client_packages?.price || 0);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payment information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (packageAssignmentId) {
      fetchPayments(packageAssignmentId);
    }
  }, [packageAssignmentId]);

  const recordPayment = async (
    amount: number,
    paymentMethod: string,
    paymentDate: string,
    notes?: string
  ) => {
    if (!packageAssignmentId) return;

    try {
      const { error } = await supabase.from('client_package_payments').insert({
        package_assignment_id: packageAssignmentId,
        amount,
        payment_method: paymentMethod as 'cash' | 'stripe' | 'installments',
        payment_status: 'paid',
        payment_date: paymentDate,
        notes,
      });

      if (error) throw error;

      // Update total_paid in package assignment
      const totalPaid = payments
        .filter((p) => p.paymentStatus === 'completed')
        .reduce((sum, p) => sum + p.amount, 0) + amount;

      await supabase
        .from('client_package_assignments')
        .update({ total_paid: totalPaid })
        .eq('id', packageAssignmentId);

      toast.success('Payment recorded successfully');
      await fetchPayments(packageAssignmentId);
    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error('Failed to record payment');
    }
  };

  const totalPaid = payments
    .filter((p) => p.paymentStatus === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const remainingAmount = packagePrice - totalPaid;

  const nextPayment = payments.find((p) => p.paymentStatus === 'pending');

  return {
    payments,
    packagePrice,
    totalPaid,
    remainingAmount,
    nextPayment,
    loading,
    recordPayment,
    refetch: packageAssignmentId ? () => fetchPayments(packageAssignmentId) : async () => {},
  };
};
