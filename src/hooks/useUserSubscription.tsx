import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscription_status: 'free' | 'paid' | 'early_adopter';
  subscription_tier?: string;
  early_adopter_number?: number;
  hasPersonalAIAccess: boolean;
}

interface TrainerAssignment {
  id: string;
  trainer_id: string;
  assignment_type: 'human' | 'ai';
  status: 'active' | 'inactive' | 'pending';
}

export function useUserSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [trainerAssignment, setTrainerAssignment] = useState<TrainerAssignment | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch subscription data
      const { data: subscriptionData } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch trainer assignment
      const { data: trainerData } = await supabase
        .from('user_trainer_assignments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      // Determine if user has Personal AI access
      const hasPersonalAIAccess = subscriptionData ? 
        (subscriptionData.subscription_status === 'paid' || 
         (subscriptionData.subscription_status === 'early_adopter' && 
          subscriptionData.early_adopter_number <= 100)) : false;

      setSubscription(subscriptionData ? {
        subscription_status: subscriptionData.subscription_status as 'free' | 'paid' | 'early_adopter',
        subscription_tier: subscriptionData.subscription_tier,
        early_adopter_number: subscriptionData.early_adopter_number,
        hasPersonalAIAccess
      } : null);
      setTrainerAssignment(trainerData ? {
        id: trainerData.id,
        trainer_id: trainerData.trainer_id,
        assignment_type: trainerData.assignment_type as 'human' | 'ai',
        status: trainerData.status as 'active' | 'inactive' | 'pending'
      } : null);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateSubscription = async (status: 'free' | 'paid' | 'early_adopter', tier?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: user.id,
          subscription_status: status,
          subscription_tier: tier,
          subscription_start_date: status === 'paid' ? new Date().toISOString() : null
        });

      if (!error) {
        await fetchUserData();
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return {
    subscription,
    trainerAssignment,
    loading,
    refetch: fetchUserData,
    updateSubscription
  };
}